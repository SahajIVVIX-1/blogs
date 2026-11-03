// scripts/curriculum/build-research-papers.mjs
// Generates 1,000+ comprehensive 2-page deep-dive research paper posts
// and upgrades all existing short paper stubs.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderPaperPost } from './paper-renderer.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../..');
const SOURCES_DIR = path.join(ROOT, 'data/sources');
const POSTS_DIR = path.join(ROOT, 'src/content/posts');

// 1. Identify all existing paper posts in src/content/posts
const existingPaperFiles = [];
function findPosts(dir) {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, f.name);
    if (f.isDirectory()) {
      findPosts(full);
    } else if (f.isFile() && f.name.endsWith('.md')) {
      const c = fs.readFileSync(full, 'utf8');
      const match = c.match(/categories:\s*(\[[^\]]*\]|(?:\n\s*-\s*[^\n]+)+)/);
      if (match && match[1].includes('papers')) {
        const arxivMatch = c.match(/arxiv:\s*"?(https:\/\/arxiv\.org\/abs\/[0-9\.]+|[0-9\.]+)"?/);
        let arxivId = null;
        if (arxivMatch) {
          arxivId = arxivMatch[1].replace('https://arxiv.org/abs/', '').trim();
        }
        existingPaperFiles.push({ file: full, arxivId });
      }
    }
  }
}
findPosts(POSTS_DIR);
console.log(`Found ${existingPaperFiles.length} existing research paper files in posts directory.`);

// Map existing arXiv IDs to their current file paths so we can upgrade them in place
const existingByArxiv = new Map();
for (const item of existingPaperFiles) {
  if (item.arxivId) {
    existingByArxiv.set(item.arxivId, item.file);
  }
}

// 2. Load all cached papers from data/sources/*/hf-daily-full.json
const dates = fs.readdirSync(SOURCES_DIR).filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(d)).sort();

const allCandidates = [];
for (const date of dates) {
  const p = path.join(SOURCES_DIR, date, 'hf-daily-full.json');
  if (fs.existsSync(p)) {
    try {
      const list = JSON.parse(fs.readFileSync(p, 'utf8'));
      if (list && list.length > 0) {
        allCandidates.push({ date, list });
      }
    } catch (e) {}
  }
}

console.log(`Loaded research paper days: ${allCandidates.length} days.`);

// 3. Select top papers per day (targeting 1,000+ total papers)
const selectedPapers = [];
const seenArxivIds = new Set();

for (const { date, list } of allCandidates) {
  // Sort candidates by community upvotes and presence of code
  const sorted = list.sort((a, b) => {
    const scoreA = (a.upvotes || 0) + (a.github ? 5 : 0);
    const scoreB = (b.upvotes || 0) + (b.github ? 5 : 0);
    return scoreB - scoreA;
  });

  // Pick top 3 per day; if day has 4+ strong candidates (upvotes >= 10), pick 4
  const count = sorted.length >= 4 && ((sorted[3].upvotes || 0) >= 10 || sorted[3].github)
    ? 4
    : Math.min(3, sorted.length);

  for (let i = 0; i < count; i++) {
    const item = sorted[i];
    if (item && item.id && !seenArxivIds.has(item.id)) {
      seenArxivIds.add(item.id);
      selectedPapers.push({ date, ...item });
    }
  }
}

console.log(`Total selected landmark research papers to write/upgrade: ${selectedPapers.length}`);

// 4. Generate & write out all posts
let writtenCount = 0;
let upgradedCount = 0;
let newCount = 0;

for (const paper of selectedPapers) {
  const { slug, frontmatter } = renderPaperPost(paper);
  const [year, month] = paper.date.split('-');

  let targetPath;
  if (existingByArxiv.has(paper.id)) {
    // Upgrade existing post in place
    targetPath = existingByArxiv.get(paper.id);
    upgradedCount++;
  } else {
    // Create new post under src/content/posts/YYYY/MM/
    const dir = path.join(POSTS_DIR, year, month);
    fs.mkdirSync(dir, { recursive: true });
    targetPath = path.join(dir, `${paper.date}-${slug}.md`);
    newCount++;
  }

  fs.writeFileSync(targetPath, frontmatter, 'utf8');
  writtenCount++;

  if (writtenCount % 100 === 0 || writtenCount === selectedPapers.length) {
    console.log(`Generated ${writtenCount}/${selectedPapers.length} papers (Upgraded: ${upgradedCount}, New: ${newCount})...`);
  }
}

console.log(`\n=== RESEARCH PAPERS GENERATION COMPLETE ===`);
console.log(`Total papers written: ${writtenCount}`);
console.log(`Upgraded existing paper posts: ${upgradedCount}`);
console.log(`New detailed paper posts created: ${newCount}`);

