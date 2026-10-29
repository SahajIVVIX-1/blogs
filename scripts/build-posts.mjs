// Turns compact authoring files (authoring/*.md) into posts under src/content/posts.
// Each post in an authoring file:
//   === 2023-08-04 | slug | Title
//   cat: study            (study|ai|papers|projects; default study)
//   phase: 1  step: 1     (study only)
//   tags: a, b
//   summary: one line
//   hl: key sentence | another key sentence
//   src: Title | https://url | Publisher        (repeatable)
//   paper: {"title":..., "authors":[...], ...}  (JSON, papers only)
//   card: {"task":..., "method":..., "result":...}
//   cover: images/2023/x.webp
//   credit: html credit line
//   ---
//   markdown body
// usage: node scripts/build-posts.mjs authoring/study-01.md ...
import { readFile } from 'node:fs/promises';
import { writePost } from './lib/post.mjs';

const now = new Date().toISOString();
let count = 0;
for (const f of process.argv.slice(2)) {
  const text = (await readFile(f, 'utf8')).replace(/\r\n/g, '\n');
  for (const chunk of text.split(/^=== /m).slice(1)) {
    const [head, ...rest] = chunk.split(/^---$/m);
    const body = rest.join('---');
    const lines = head.trim().split('\n');
    const [date, slug, title] = lines.shift().split('|').map((s) => s.trim());
    const fm = { title, categories: ['study'], tags: [], summary: '', sources: [], highlights: [] };
    for (const l of lines) {
      const m = l.match(/^(\w+):\s*(.*)$/);
      if (!m) continue;
      const [, k, v] = m;
      if (k === 'cat') fm.categories = v.split(',').map((s) => s.trim());
      else if (k === 'phase') { const [p, s] = v.split(/\s+step:\s*/); fm.phase = +p; if (s) fm.step = +s; }
      else if (k === 'tags') fm.tags = v.split(',').map((s) => s.trim()).filter(Boolean);
      else if (k === 'summary') fm.summary = v;
      else if (k === 'hl') fm.highlights = v.split(' | ').map((s) => s.trim());
      else if (k === 'src') { const [t, url, publisher] = v.split(' | ').map((s) => s.trim()); fm.sources.push({ title: t, url, publisher, fetched_at: now }); }
      else if (k === 'paper') fm.papers = [JSON.parse(v)];
      else if (k === 'card') fm.card = JSON.parse(v);
      else if (k === 'cover') fm.cover = v;
      else if (k === 'credit') fm.cover_credit = v;
      else if (k === 'alt') fm.images = [{ src: fm.cover, alt: v, credit: fm.cover_credit ?? '' }];
    }
    fm.draft = false;
    await writePost({ date, slug, fm, body, overwrite: true });
    count++;
  }
}
console.log(`wrote ${count} posts`);
