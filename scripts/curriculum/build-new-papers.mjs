// scripts/curriculum/build-new-papers.mjs
// Writes paper posts only for days after the newest existing paper post (never touches existing posts).
//   node scripts/curriculum/build-new-papers.mjs [--from YYYY-MM-DD]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderPaperPost } from './paper-renderer.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../..');
const SOURCES_DIR = path.join(ROOT, 'data/sources');
const POSTS_DIR = path.join(ROOT, 'src/content/posts');

const fromArg = process.argv.includes('--from') ? process.argv[process.argv.indexOf('--from') + 1] : null;

// arXiv ids already published (never duplicate a paper) and the newest paper post date
const existing = new Set();
let newest = '0000-00-00';
(function walk(dir) {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, f.name);
    if (f.isDirectory()) walk(full);
    else if (f.name.endsWith('.md')) {
      const c = fs.readFileSync(full, 'utf8');
      if (!/categories:\s*\[[^\]]*papers/.test(c)) continue;
      const m = c.match(/arxiv:\s*"?(?:https:\/\/arxiv\.org\/abs\/)?([0-9]{4}\.[0-9]{4,5})/);
      if (m) existing.add(m[1]);
      const d = c.match(/^date:\s*"?(\d{4}-\d{2}-\d{2})/m);
      if (d && d[1] > newest) newest = d[1];
    }
  }
})(POSTS_DIR);
const from = fromArg || newest;
console.log(`existing paper ids: ${existing.size}; newest paper post: ${newest}; generating dates > ${from}`);

const dates = fs.readdirSync(SOURCES_DIR).filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(d) && d > from).sort();
let written = 0;
for (const date of dates) {
  const p = path.join(SOURCES_DIR, date, 'hf-daily-full.json');
  if (!fs.existsSync(p)) continue;
  let list = [];
  try { list = JSON.parse(fs.readFileSync(p, 'utf8')); } catch { continue; }
  if (!list.length) continue;
  const sorted = list.sort((a, b) => ((b.upvotes || 0) + (b.github ? 5 : 0)) - ((a.upvotes || 0) + (a.github ? 5 : 0)));
  const count = sorted.length >= 4 && ((sorted[3].upvotes || 0) >= 10 || sorted[3].github) ? 4 : Math.min(3, sorted.length);
  for (let i = 0; i < count; i++) {
    const item = sorted[i];
    if (!item || !item.id || existing.has(item.id)) continue;
    existing.add(item.id);
    const { slug, frontmatter } = renderPaperPost({ date, ...item });
    const [year, month] = date.split('-');
    const dir = path.join(POSTS_DIR, year, month);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, `${date}-${slug}.md`), frontmatter, 'utf8');
    written++;
  }
}
console.log(`new paper posts written: ${written}`);
