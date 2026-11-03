import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const SITE_URL = 'https://blog.sahaj.si';
const POSTS_DIR = path.join(process.cwd(), 'src/content/posts');

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

const files = getAllFiles(POSTS_DIR);
const posts = [];

for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  const { data } = matter(content);
  if (data.draft) continue;

  const filename = path.basename(f);
  const slug = filename.replace(/\.mdx?$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '');
  const dateObj = data.date ? new Date(data.date) : new Date();
  const dayKey = dateObj.toISOString().slice(0, 10);
  const [year, month, day] = dayKey.split('-');
  const url = `${SITE_URL}/${year}/${month}/${day}/${slug}/`;

  posts.push({
    title: data.title || '',
    date: dateObj,
    summary: data.summary || '',
    url,
  });
}

posts.sort((a, b) => b.date.getTime() - a.date.getTime());
const topPosts = posts.slice(0, 60);

const escapeXml = (unsafe) =>
  unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
    }
  });

const itemsXml = topPosts
  .map(
    (p) => `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${p.url}</link>
      <guid>${p.url}</guid>
      <pubDate>${p.date.toUTCString()}</pubDate>
      <description>${escapeXml(p.summary)}</description>
    </item>`
  )
  .join('\n');

const rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>Sahaj Saliya · AI &amp; Engineering Handbook</title>
    <link>${SITE_URL}/</link>
    <description>Study notes, AI updates and research paper breakdowns by Sahaj Saliya.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${itemsXml}
  </channel>
</rss>`;

// Write to public/ and out/ (if out/ exists)
fs.writeFileSync(path.join(process.cwd(), 'public/rss.xml'), rssXml, 'utf8');
if (fs.existsSync(path.join(process.cwd(), 'out'))) {
  fs.writeFileSync(path.join(process.cwd(), 'out/rss.xml'), rssXml, 'utf8');
}
console.log(`Generated RSS feed with ${topPosts.length} items`);
