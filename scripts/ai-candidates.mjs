// node scripts/ai-candidates.mjs [--out file.json]
// Lists AI-update candidates (official feeds + feature releases) not yet used by an existing AI post.
import fs from 'node:fs';
import path from 'node:path';
import { FEEDS, REPOS, feedItems, githubReleases, isFeatureRelease } from './lib/ai.mjs';
import { ROOT } from './lib/cache.mjs';

const from = '2023-08-04';
const to = new Date().toISOString().slice(0, 10);
const out = process.argv.includes('--out') ? process.argv[process.argv.indexOf('--out') + 1] : null;

const used = new Set();
(function walk(d) {
  for (const f of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, f.name);
    if (f.isDirectory()) walk(p);
    else if (f.name.endsWith('.md')) {
      const c = fs.readFileSync(p, 'utf8');
      if (!/categories:\s*\["ai"\]/.test(c.slice(0, 600))) continue;
      for (const m of c.matchAll(/url:\s*"([^"]+)"/g)) used.add(m[1].replace(/\/$/, ''));
    }
  }
})(path.join(ROOT, 'src/content/posts'));

const all = [];
for (const feed of FEEDS.filter((f) => !f.paged)) {
  try {
    const items = await feedItems(feed, from, to);
    console.log(feed.publisher, items.length);
    all.push(...items);
  } catch (e) { console.log(feed.publisher, 'ERR', e.message); }
}
for (const repo of REPOS) {
  try {
    const rel = githubReleases(repo, from, to).filter((r) => isFeatureRelease(r.tag));
    console.log(repo, rel.length);
    all.push(...rel);
  } catch (e) { console.log(repo, 'ERR', e.message.slice(0, 80)); }
}
const fresh = all.filter((i) => i.url && !used.has(i.url.replace(/\/$/, ''))).sort((a, b) => a.date.localeCompare(b.date));
console.log('candidates not yet used:', fresh.length, '| already used:', all.length - fresh.length);
if (out) fs.writeFileSync(out, JSON.stringify(fresh.map(({ publisher, title, url, date, description, tag }) => ({ publisher, title, url, date, description, tag })), null, 1));
