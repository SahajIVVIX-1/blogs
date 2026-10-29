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
import { existsSync } from 'node:fs';
import path from 'node:path';
import { ROOT, cachedFetch } from './lib/cache.mjs';
import { writePost } from './lib/post.mjs';

const now = new Date().toISOString();

// `arxiv: <id>` fills paper metadata, sources and (licence permitting) the figure from the data that
// scripts/fetch.mjs and scripts/paper-assets.mjs saved, so titles/authors/links are never retyped.
const clip = (t, n) => (t.length > n ? t.slice(0, t.lastIndexOf(' ', n)) + ' …' : t);

async function fromArxiv(date, id, fm) {
  const dir = path.join(ROOT, 'data/sources', date);
  const meta = JSON.parse(await readFile(path.join(dir, `arxiv-${id}.json`), 'utf8'));
  const assets = existsSync(path.join(dir, `paper-${id}.json`)) ? JSON.parse(await readFile(path.join(dir, `paper-${id}.json`), 'utf8')) : {};
  const hf = JSON.parse(await readFile(path.join(dir, 'hf-daily.json'), 'utf8'));
  const lic = meta.license ?? null;
  // Hugging Face sometimes auto-links an unrelated or unofficial repo; keep it only if the paper itself cites it
  let code;
  if (meta.github) {
    const repo = meta.github.replace(/^https?:\/\/github\.com\//i, '').replace(/\/$/, '').toLowerCase();
    const html = assets.html ? (await cachedFetch(assets.html)).body.toLowerCase() : '';
    if ((meta.abstract + html).toLowerCase().includes(`github.com/${repo}`)) code = meta.github;
  }
  const out = {
    title: fm.title || `Paper summary: ${meta.title}`,
    papers: [{ title: meta.title, authors: meta.authors, year: Number(meta.published.slice(0, 4)), arxiv: meta.abs, pdf: meta.pdf, code, license: lic ?? 'arXiv non-exclusive licence' }],
    sources: [
      { title: `${meta.title} (arXiv:${id})`, url: meta.abs, publisher: 'arXiv', fetched_at: meta.fetched_at },
      { title: `Hugging Face Daily Papers, ${date}`, url: `https://huggingface.co/papers?date=${date}`, publisher: 'Hugging Face', fetched_at: hf.fetched_at },
      ...(assets.limitations || assets.conclusion ? [{ title: `${meta.title} (arXiv HTML full text)`, url: assets.html, publisher: 'arXiv', fetched_at: meta.fetched_at }] : []),
      ...(code ? [{ title: 'Code repository (linked in the paper)', url: code, publisher: 'GitHub', fetched_at: meta.fetched_at }] : []),
    ],
  };
  if (assets.figure) {
    const first = meta.authors[0].split(' ').pop();
    const licName = /by-sa/.test(lic) ? 'CC BY-SA 4.0' : /by\//.test(lic) ? 'CC BY 4.0' : /zero|publicdomain/.test(lic) ? 'CC0 1.0' : lic;
    out.cover = assets.figure.path;
    out.cover_credit = `Figure from <a href="${meta.abs}">${first}${meta.authors.length > 1 ? ' et al.' : ''} (${meta.published.slice(0, 4)})</a>, licensed <a href="${lic}">${licName}</a>. ${clip(assets.figure.caption.replace(/"/g, '&quot;'), 220)}`;
    out.images = [{ src: assets.figure.path, alt: `Figure from the paper "${meta.title}"`, credit: out.cover_credit }];
  }
  return out;
}
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
      else if (k === 'arxiv') Object.assign(fm, await fromArxiv(date, v, fm));
    }
    fm.draft = false;
    await writePost({ date, slug, fm, body, overwrite: true });
    count++;
  }
}
console.log(`wrote ${count} posts`);
