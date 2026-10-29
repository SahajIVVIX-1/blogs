// Fetch the full text of chosen AI-update candidates (by date + title substring) into data/sources/<date>/,
// using the most readable form of each source: Hugging Face blog markdown from the huggingface/blog repo,
// GitHub release notes through `gh`, and page text for everything else.
// usage: node scripts/ai-pick.mjs picks.txt   (lines: YYYY-MM-DD | title substring)
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { cachedFetch, ROOT } from './lib/cache.mjs';

const strip = (h) => h.replace(/<(script|style|noscript|svg|nav|footer|header)[\s\S]*?<\/\1>/gi, ' ')
  .replace(/<(h[1-6]|p|li|tr|br|div)[^>]*>/gi, '\n').replace(/<[^>]+>/g, ' ')
  .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&#39;|&rsquo;/g, "'").replace(/&quot;|&ldquo;|&rdquo;/g, '"')
  .replace(/[ \t]+/g, ' ').replace(/\n\s*\n+/g, '\n').trim();

const picks = (await readFile(process.argv[2], 'utf8')).split('\n').map((l) => l.trim()).filter(Boolean).map((l) => l.split('|').map((s) => s.trim()));
const out = [];
for (const [date, needle] of picks) {
  const cands = JSON.parse(await readFile(path.join(ROOT, 'data/sources', date, 'ai-candidates.json'), 'utf8'));
  const item = cands.find((c) => c.title.toLowerCase().includes(needle.toLowerCase()));
  if (!item) { console.log(`MISSING ${date} ${needle}`); continue; }
  let text = '', via = item.url, fetched_at = new Date().toISOString();
  const gh = item.url.match(/github\.com\/([^/]+\/[^/]+)\/releases\/tag\/(.+)$/);
  const hf = item.url.match(/huggingface\.co\/blog\/(?:([^/]+)\/)?([^/?#]+)/);
  if (gh) {
    text = execFileSync('gh', ['api', `repos/${gh[1]}/releases/tags/${decodeURIComponent(gh[2])}`, '--jq', '.body'], { encoding: 'utf8', maxBuffer: 1 << 26 });
  } else if (hf && !hf[1]) {
    via = `https://raw.githubusercontent.com/huggingface/blog/main/${hf[2]}.md`;
    const r = await cachedFetch(via); fetched_at = r.fetched_at; text = r.status < 400 ? r.body : '';
  }
  if (!text) {
    const r = await cachedFetch(item.url); fetched_at = r.fetched_at;
    text = r.status < 400 ? strip(r.body.match(/<main[\s\S]*?<\/main>/i)?.[0] ?? r.body) : `HTTP ${r.status}`;
    via = item.url;
  }
  const file = path.join(ROOT, 'data/sources', date, `ai-${item.url.replace(/^https?:\/\//, '').replace(/[^a-z0-9]+/gi, '-').slice(0, 70)}.txt`);
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, `${item.title}\n${item.url}\nvia: ${via}\nfetched_at: ${fetched_at}\npublisher: ${item.publisher}\n\n${text}`);
  out.push({ date, title: item.title, url: item.url, publisher: item.publisher, chars: text.length, file: path.relative(ROOT, file) });
  console.log(`${date} [${text.length}] ${item.publisher} | ${item.title}`);
}
await writeFile(path.join(ROOT, 'data/ai-picks.json'), JSON.stringify(out, null, 2));
