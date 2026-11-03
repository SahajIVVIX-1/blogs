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
console.log(`Generated blog index with ${posts.length} entries at ${OUT_FILE}`);
