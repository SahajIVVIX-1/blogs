import fs from 'node:fs';
import path from 'node:path';

function getFiles(dir) {
  let res = [];
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) res.push(...getFiles(full));
    else if (full.endsWith('.md')) res.push(full);
  }
  return res;
}

const files = getFiles('src/content/posts');
const studyPosts = [];

for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  if (/categories:\s*\[.*?(["'])study\1.*?\]/.test(content)) {
    const phaseMatch = content.match(/phase:\s*(\d+)/);
    const stepMatch = content.match(/step:\s*(\d+)/);
    const dateMatch = content.match(/date:\s*["']?([0-9-]+)/);
    const titleMatch = content.match(/title:\s*["']?(.*?)["']?\r?\n/);
    studyPosts.push({
      file: f,
      phase: phaseMatch ? parseInt(phaseMatch[1], 10) : null,
      step: stepMatch ? parseInt(stepMatch[1], 10) : null,
      date: dateMatch ? dateMatch[1] : null,
      title: titleMatch ? titleMatch[1] : ''
    });
  }
}

console.log('Total study posts found:', studyPosts.length);
const byPhase = {};
for (const p of studyPosts) {
  const ph = p.phase || 'none';
  byPhase[ph] = byPhase[ph] || [];
  byPhase[ph].push(p);
}

for (const [ph, posts] of Object.entries(byPhase)) {
  console.log(`Phase ${ph}: ${posts.length} posts, max step: ${Math.max(...posts.map(x => x.step || 0))}, steps: [${posts.map(x => x.step).filter(Boolean).sort((a,b)=>a-b).join(',')}]`);
}
