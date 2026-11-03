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
console.log('Total posts:', files.length);

const cats = {};
let studyPhases = {};

for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  const catMatch = content.match(/categories:\s*\[(.*?)\]/);
  if (catMatch) {
    const cs = catMatch[1].split(',').map(s => s.trim().replace(/['"]/g, ''));
    for (const c of cs) {
      cats[c] = (cats[c] || 0) + 1;
    }
  }
  const tagMatch = content.match(/tags:\s*\[(.*?)\]/);
  const titleMatch = content.match(/title:\s*["'](.*?)["']/);
  // check if filename has phase indicator like python-, ml-, dl-
  const basename = path.basename(f);
  const phaseMatch = basename.match(/\d{4}-\d{2}-\d{2}-([a-z0-9]+)-/);
  if (phaseMatch) {
    const p = phaseMatch[1];
    studyPhases[p] = (studyPhases[p] || 0) + 1;
  }
}

console.log('Categories:', cats);
console.log('Study prefixes in filename:', studyPhases);

