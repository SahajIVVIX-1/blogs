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
const duplicates = {};

for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  if (/categories:\s*\[.*?(["'])study\1.*?\]/.test(content)) {
    const phaseM = content.match(/phase:\s*(\d+)/);
    const stepM = content.match(/step:\s*(\d+)/);
    if (phaseM && stepM) {
      const key = `p${phaseM[1]}_s${stepM[1]}`;
      duplicates[key] = duplicates[key] || [];
      duplicates[key].push({
        file: f,
        lines: content.split('\n').length,
        size: fs.statSync(f).size
      });
    }
  }
}

let removedCount = 0;
for (const [key, list] of Object.entries(duplicates)) {
  if (list.length > 1) {
    // sort by size descending - keep largest (deep dive)
    list.sort((a, b) => b.size - a.size);
    for (let i = 1; i < list.length; i++) {
      fs.unlinkSync(list[i].file);
      removedCount++;
    }
  }
}

console.log(`Successfully removed ${removedCount} legacy stubs.`);
