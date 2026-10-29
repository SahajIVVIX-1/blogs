// Runs every ```python run / ```cpp run block in the given posts and writes the real output into the
// ```text block that follows it. Fails loudly if a snippet errors, so no post ships broken code.
// usage: node scripts/run-snippets.mjs <file-or-dir>...
import { readFile, writeFile, readdir, stat, mkdir } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { ROOT } from './lib/cache.mjs';

const PY = path.join(ROOT, '.venv/Scripts/python.exe');
const GPP = process.env.GPP ?? 'g++';
const TMP = path.join(ROOT, '.tmp');
const BLOCK = /```(python|cpp) run\n([\s\S]*?)```\n\nOutput:\n\n```text\n[\s\S]*?```/g;

async function files(p) {
  const s = await stat(p);
  if (!s.isDirectory()) return [p];
  return (await Promise.all((await readdir(p)).map((f) => files(path.join(p, f))))).flat().filter((f) => f.endsWith('.md'));
}

function run(lang, code) {
  if (lang === 'python') {
    return execFileSync(PY, ['-I', '-c', code], { cwd: TMP, encoding: 'utf8', timeout: 300000, env: { ...process.env, PYTHONIOENCODING: 'utf-8', MPLBACKEND: 'Agg' } });
  }
  const src = path.join(TMP, 'snippet.cpp'), exe = path.join(TMP, 'snippet.exe');
  execFileSync(GPP, ['-std=c++17', '-O1', '-x', 'c++', '-', '-o', exe], { input: code, cwd: TMP, encoding: 'utf8' });
  return execFileSync(exe, [], { cwd: TMP, encoding: 'utf8', timeout: 60000 });
}

await mkdir(TMP, { recursive: true });
let n = 0, failed = 0;
for (const f of (await Promise.all(process.argv.slice(2).map(files))).flat()) {
  const src = await readFile(f, 'utf8');
  let changed = false;
  const out = src.replace(BLOCK, (m, lang, code) => {
    try {
      const result = run(lang, code).replace(/\r\n/g, '\n').trimEnd();
      n++; changed = true;
      return '```' + lang + ' run\n' + code + '```\n\nOutput:\n\n```text\n' + result + '\n```';
    } catch (e) {
      failed++;
      console.error(`FAIL ${path.relative(ROOT, f)}\n${(e.stderr || e.message).toString().slice(0, 800)}`);
      return m;
    }
  });
  if (changed) await writeFile(f, out);
}
console.log(`ran ${n} snippets, ${failed} failed`);
process.exit(failed ? 1 : 0);
