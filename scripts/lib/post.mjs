// Writing Markdown posts with the site's frontmatter.
import { mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { ROOT } from './cache.mjs';

export const slugify = (s) =>
  s.toLowerCase().replace(/['’]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60).replace(/-$/, '');

const yaml = (v, indent = '') => {
  if (Array.isArray(v)) {
    if (!v.length) return '[]';
    if (v.every((x) => typeof x !== 'object')) return `[${v.map((x) => JSON.stringify(x)).join(', ')}]`;
    return '\n' + v.map((o) => `${indent}  - ` + Object.entries(o).filter(([, x]) => x !== undefined && x !== null)
      .map(([k, x], i) => `${i ? indent + '    ' : ''}${k}: ${yaml(x, indent + '    ')}`).join('\n')).join('\n');
  }
  if (v && typeof v === 'object') {
    return '\n' + Object.entries(v).filter(([, x]) => x !== undefined).map(([k, x]) => `${indent}  ${k}: ${yaml(x, indent + '  ')}`).join('\n');
  }
  return JSON.stringify(v);
};

export function frontmatter(fm) {
  return '---\n' + Object.entries(fm).filter(([, v]) => v !== undefined).map(([k, v]) => `${k}: ${yaml(v)}`).join('\n') + '\n---\n';
}

export function postPath(date, slug, dir = 'src/content/posts') {
  return path.join(ROOT, dir, date.slice(0, 4), date.slice(5, 7), `${date}-${slug}.md`);
}

export async function writePost({ date, slug, fm, body, dir, overwrite = false }) {
  const file = postPath(date, slug, dir);
  if (existsSync(file) && !overwrite) return { file, skipped: true };
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, frontmatter({ ...fm, date }) + '\n' + body.trim() + '\n');
  return { file, skipped: false };
}
