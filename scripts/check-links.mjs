// Fetches every source URL in the given posts (cached), reports broken links, and stamps
// fetched_at with the time the page was actually fetched.
// usage: node scripts/check-links.mjs <file-or-dir>...
import { readFile, writeFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { cachedFetch, ROOT } from './lib/cache.mjs';

async function files(p) {
  const s = await stat(p);
  if (!s.isDirectory()) return [p];
  return (await Promise.all((await readdir(p)).map((f) => files(path.join(p, f))))).flat().filter((f) => f.endsWith('.md'));
}

let bad = 0, ok = 0;
for (const f of (await Promise.all(process.argv.slice(2).map(files))).flat()) {
  let src = await readFile(f, 'utf8');
  const re = /url: "([^"]+)"\n(\s+)publisher: ("[^"]*")\n\s+fetched_at: "[^"]*"/g;
  const jobs = [...src.matchAll(re)];
  for (const m of jobs) {
    const url = m[1];
    let r;
    try { r = await cachedFetch(url); } catch (e) { r = { status: 'ERR' }; }
    if (r.status === 'ERR' || r.status >= 400) {
      // some sites block bots with 403 but are fine in a browser; report, don't stamp
      console.log(`${r.status}  ${url}  (${path.relative(ROOT, f)})`);
      bad++;
      continue;
    }
    ok++;
    src = src.replace(m[0], `url: "${url}"\n${m[2]}publisher: ${m[3]}\n${m[2]}fetched_at: "${r.fetched_at}"`);
  }
  await writeFile(f, src);
}
console.log(`links ok: ${ok}, problems: ${bad}`);
