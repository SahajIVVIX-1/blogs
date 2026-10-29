// Cached, rate-limited fetch. Every response is stored under data/cache/ so re-runs are cheap.
import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

export const ROOT = path.resolve(import.meta.dirname, '../..');
const CACHE = path.join(ROOT, 'data/cache');
const UA = 'sahaj-blogs-fetcher/1.0 (+https://github.com/SahajIVVIX-1/blogs)';

// minimum gap between requests per host, in ms (arXiv asks for 1 request per 3 seconds)
const GAP = { 'export.arxiv.org': 3100, 'arxiv.org': 3100, default: 600 };
const last = new Map();
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function throttle(host) {
  const gap = GAP[host] ?? GAP.default;
  const wait = (last.get(host) ?? 0) + gap - Date.now();
  if (wait > 0) await sleep(wait);
  last.set(host, Date.now());
}

export async function cachedFetch(url, { binary = false, maxAgeDays = Infinity } = {}) {
  const key = createHash('sha1').update(url).digest('hex');
  const file = path.join(CACHE, key + (binary ? '.bin' : '.txt'));
  const meta = path.join(CACHE, key + '.json');
  if (existsSync(file) && existsSync(meta)) {
    const m = JSON.parse(await readFile(meta, 'utf8'));
    if ((Date.now() - Date.parse(m.fetched_at)) / 864e5 < maxAgeDays) {
      return { body: binary ? await readFile(file) : await readFile(file, 'utf8'), fetched_at: m.fetched_at, status: m.status };
    }
  }
  await mkdir(CACHE, { recursive: true });
  for (let attempt = 0; attempt < 4; attempt++) {
    await throttle(new URL(url).host);
    let res;
    try {
      res = await fetch(url, { headers: { 'user-agent': UA }, signal: AbortSignal.timeout(60000) });
    } catch (e) {
      // network hiccup (ECONNRESET, timeout): back off and retry
      await sleep(5000 * (attempt + 1));
      continue;
    }
    if (res.status === 429 || res.status >= 500) { await sleep(5000 * (attempt + 1)); continue; }
    const body = binary ? Buffer.from(await res.arrayBuffer()) : await res.text();
    const fetched_at = new Date().toISOString();
    if (res.ok) {
      await writeFile(file, body);
      await writeFile(meta, JSON.stringify({ url, fetched_at, status: res.status }));
    }
    return { body, fetched_at, status: res.status };
  }
  throw new Error(`fetch failed after retries: ${url}`);
}

export async function fetchJson(url, opts) {
  const r = await cachedFetch(url, opts);
  if (r.status && r.status >= 400) return { data: null, fetched_at: r.fetched_at, status: r.status };
  return { data: JSON.parse(r.body), fetched_at: r.fetched_at, status: r.status };
}

export async function saveSource(date, name, obj) {
  const dir = path.join(ROOT, 'data/sources', date);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, name + '.json'), JSON.stringify(obj, null, 2));
}

export function* daysBetween(from, to) {
  for (const d = new Date(from + 'T00:00:00Z'); d <= new Date(to + 'T00:00:00Z'); d.setUTCDate(d.getUTCDate() + 1)) {
    yield d.toISOString().slice(0, 10);
  }
}
