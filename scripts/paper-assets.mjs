// For each paper draft in data/drafts: fetch the arXiv HTML version (rate-limited, cached), pull out
// the paper's own Limitations / Conclusion text, and — only if the licence allows reuse (CC BY,
// CC BY-SA, CC0) — download the first figure, convert to WebP and record its caption.
// Writes data/sources/<date>/paper-<id>.json and a monthly digest data/digests/papers-YYYY-MM.md
// usage: node scripts/paper-assets.mjs [YYYY-MM ...]
import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { cachedFetch, ROOT } from './lib/cache.mjs';

const months = process.argv.slice(2);
const strip = (h) => h.replace(/<math[\s\S]*?<\/math>/g, ' [math] ').replace(/<[^>]+>/g, ' ')
  .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#\d+;/g, '').replace(/\s+/g, ' ').trim();

function section(html, re) {
  // arXiv HTML (LaTeXML) sections: <section ...><h2 class="ltx_title ...">N Title</h2> ... </section>
  const heads = [...html.matchAll(/<h([23])[^>]*class="ltx_title[^"]*"[^>]*>([\s\S]*?)<\/h\1>/g)];
  for (let i = 0; i < heads.length; i++) {
    if (re.test(strip(heads[i][2]))) {
      const start = heads[i].index + heads[i][0].length;
      const end = heads[i + 1]?.index ?? start + 6000;
      return strip(html.slice(start, end)).slice(0, 900);
    }
  }
  return null;
}

const dirs = (await readdir(path.join(ROOT, 'data/sources'))).filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(d)).sort();
const digest = new Map();
for (const date of dirs) {
  const month = date.slice(0, 7);
  if (months.length && !months.includes(month)) continue;
  const dir = path.join(ROOT, 'data/sources', date);
  for (const f of (await readdir(dir)).filter((f) => f.startsWith('arxiv-'))) {
    const meta = JSON.parse(await readFile(path.join(dir, f), 'utf8'));
    const out = path.join(dir, `paper-${meta.id}.json`);
    let info;
    if (existsSync(out)) info = JSON.parse(await readFile(out, 'utf8'));
    else {
      info = { id: meta.id, html: `https://arxiv.org/html/${meta.id}`, limitations: null, conclusion: null, figure: null };
      const r = await cachedFetch(info.html);
      if (r.status < 400 && r.body.includes('ltx_title')) {
        info.limitations = section(r.body, /limitation/i);
        info.conclusion = section(r.body, /^\s*[\dA-Z.]*\s*(conclusion|discussion)/i);
        if (meta.reusable_figures) {
          const fig = r.body.match(/<figure[^>]*class="ltx_figure[^"]*"[^>]*>([\s\S]*?)<\/figure>/);
          const img = fig?.[1].match(/<img[^>]+src="([^"]+\.(?:png|jpe?g|gif))"/i);
          if (img) {
            const src = new URL(img[1], 'https://arxiv.org/html/').href;
            const bin = await cachedFetch(src, { binary: true });
            if (bin.status < 400) {
              const rel = `images/${date.slice(0, 4)}/paper-${meta.id}.webp`;
              await mkdir(path.join(ROOT, 'public', path.dirname(rel)), { recursive: true });
              await sharp(bin.body).resize({ width: 1600, withoutEnlargement: true }).flatten({ background: '#ffffff' }).webp({ quality: 82 }).toFile(path.join(ROOT, 'public', rel));
              info.figure = { path: rel, src, caption: strip(fig[1].match(/<figcaption[\s\S]*?<\/figcaption>/)?.[0] ?? '').slice(0, 400) };
            }
          }
        }
      }
      await writeFile(out, JSON.stringify(info, null, 2));
      console.log(date, meta.id, info.limitations ? 'L' : '-', info.conclusion ? 'C' : '-', info.figure ? 'F' : '-');
    }
    if (!digest.has(month)) digest.set(month, []);
    const au = meta.authors.length > 4 ? meta.authors.slice(0, 3).join(', ') + ' et al.' : meta.authors.join(', ');
    digest.get(month).push(`### ${date} ${meta.id}\n${meta.title}\nauthors: ${au} (${meta.authors.length})\nlicense: ${meta.license ?? 'arXiv default'} | code: ${meta.github ?? '-'} | cats: ${meta.categories.slice(0, 3).join(',')}\n` +
      `abstract: ${meta.abstract}\n` + (info.limitations ? `limitations: ${info.limitations}\n` : '') + (!info.limitations && info.conclusion ? `conclusion: ${info.conclusion.slice(0, 500)}\n` : '') +
      (info.figure ? `figure: ${info.figure.path} | ${info.figure.caption.slice(0, 200)}\n` : ''));
  }
}
await mkdir(path.join(ROOT, 'data/digests'), { recursive: true });
for (const [m, items] of digest) await writeFile(path.join(ROOT, 'data/digests', `papers-${m}.md`), items.join('\n'));
console.log('digests:', [...digest.keys()].join(' '));
