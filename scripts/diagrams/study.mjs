// Study posts: hand-authored diagrams in scripts/diagrams/study/*.txt, keyed by "phase.step".
import fs from 'node:fs';
import path from 'node:path';
import { dslToMermaid } from './lib.mjs';

const DIR = path.resolve(import.meta.dirname, 'study');

export function loadStudy() {
  const map = new Map();
  if (!fs.existsSync(DIR)) return map;
  for (const f of fs.readdirSync(DIR).filter((x) => x.endsWith('.txt')).sort()) {
    let key = null;
    let buf = [];
    const flush = () => { if (key && buf.length) map.set(key, buf.join('\n')); };
    for (const line of fs.readFileSync(path.join(DIR, f), 'utf8').split(/\r?\n/)) {
      const m = line.match(/^@(\d+\.\d+)\b/);
      if (m) { flush(); key = m[1]; buf = []; } else if (key) buf.push(line);
    }
    flush();
  }
  return map;
}

export function studyDiagram(map, data) {
  const key = `${data.phase}.${data.step}`;
  const dsl = map.get(key);
  if (!dsl) return null;
  return dslToMermaid(dsl, data.title);
}
