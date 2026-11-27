// node scripts/ai-render.mjs <dir with ai_*.json> <extracts.json> [<extracts2.json>]
// Turns hand-written post specs (title, summary, what, details, why) plus their fetched sources into post files.
import fs from 'node:fs';
import path from 'node:path';
import { writePost, slugify } from './lib/post.mjs';

const [, , dir, ...extractFiles] = process.argv;
const extracts = extractFiles.flatMap((f) => JSON.parse(fs.readFileSync(f, 'utf8')));
const base = JSON.parse(fs.readFileSync(extractFiles[0], 'utf8')).length;
const src = (i) => (i < base ? extracts[i] : extracts[base + (i - 79)]);

let n = 0, skipped = 0;
for (const f of fs.readdirSync(dir).filter((x) => /^ai_[a-z]\.json$/.test(x)).sort()) {
  for (const p of JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'))) {
    const s = src(p.i);
    if (!s) throw new Error('no source for ' + p.i);
    const isRelease = s.publisher.startsWith('GitHub');
    const body = [
      '## What happened', '', p.what, '',
      '## The technical details', '',
      isRelease ? 'From the release notes:' : `From the ${s.publisher} post:`, '',
      ...p.details.map((d) => `- ${d}`), '',
      '## Why it matters', '', p.why,
    ].join('\n');
    const { skipped: sk } = await writePost({
      date: s.date,
      slug: 'ai-' + slugify(p.title),
      fm: {
        title: p.title,
        categories: ['ai'],
        tags: p.tags,
        summary: p.summary,
        sources: [{ title: s.title.replace(/^## a\]:hidden">\s*/, ''), url: s.url, publisher: s.publisher, fetched_at: s.fetched_at }],
        highlights: p.highlights,
        draft: false,
      },
      body,
    });
    sk ? skipped++ : n++;
  }
}
console.log(`written: ${n}, skipped (already exist): ${skipped}`);
