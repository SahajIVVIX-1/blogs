import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const POSTS_DIR = path.join(process.cwd(), 'src/content/posts');
const OUT_FILE = path.join(process.cwd(), 'public/blog-index.json');

function getAllFiles(dirPath, arrayOfFiles = []) {
  if (!fs.existsSync(dirPath)) return arrayOfFiles;
  const files = fs.readdirSync(dirPath);
  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else if (file.endsWith('.md') || file.endsWith('.mdx')) {
      arrayOfFiles.push(fullPath);
    }
  }
  return arrayOfFiles;
}

const filePaths = getAllFiles(POSTS_DIR);
const posts = [];

for (const fp of filePaths) {
  const fileContent = fs.readFileSync(fp, 'utf8');
  const { data } = matter(fileContent);
  if (data.draft) continue;

  const filename = path.basename(fp);
  const slug = filename.replace(/\.mdx?$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '');
  const dateVal = data.date ? new Date(data.date) : new Date();
  const dayKey = dateVal.toISOString().slice(0, 10);
  const [year, month, day] = dayKey.split('-');
  const url = `/${year}/${month}/${day}/${slug}/`;

  posts.push({
    id: fp,
    date: dateVal,
    url,
    title: data.title || '',
    cat: Array.isArray(data.categories) ? data.categories[0] || '' : '',
    tags: Array.isArray(data.tags) ? data.tags.join(' ') : '',
    summary: String(data.summary || '').replace(/\s+/g, ' ').slice(0, 240),
    authors: Array.isArray(data.papers) && data.papers[0] && Array.isArray(data.papers[0].authors) ? data.papers[0].authors.slice(0, 6).join(', ') : '',
    phase: data.phase || 0,
  });
}

// Sort chronologically (oldest first)
posts.sort((a, b) => a.date.getTime() - b.date.getTime() || a.id.localeCompare(b.id));

const map = {};
for (let i = 0; i < posts.length; i++) {
  const num = i + 1;
  map[num] = posts[i].url;
  map[String(num).padStart(4, '0')] = posts[i].url;
}

fs.writeFileSync(OUT_FILE, JSON.stringify(map), 'utf8');

// Compact search index for the in-page search palette: [number, url, title, yyyy-mm-dd, category, tags, summary, authors, phase]
const SEARCH_FILE = path.join(process.cwd(), 'public/search-index.json');
const rows = posts.map((p, i) => [i + 1, p.url, p.title, p.date.toISOString().slice(0, 10), p.cat, p.tags, p.summary, p.authors, p.phase]);
fs.writeFileSync(SEARCH_FILE, JSON.stringify(rows), 'utf8');
console.log(`Generated search index with ${rows.length} rows at ${SEARCH_FILE}`);
console.log(`Generated blog index with ${posts.length} entries at ${OUT_FILE}`);

