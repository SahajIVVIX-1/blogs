// Runs every ```python run / ```cpp run block in the given posts and writes the real output into the
// ```text block that follows it. Fails loudly if a snippet errors, so no post ships broken code.
// If the output block is followed by ![alt](/images/....webp), the snippet may save a figure to
// $SNIPPET_FIG (PNG); it is converted to WebP (max 1600px wide) at public/images/....webp.
// usage: node scripts/run-snippets.mjs <file-or-dir>...
import { readFile, readdir, stat, mkdir, rm, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import sharp from 'sharp';
import { ROOT } from './lib/cache.mjs';

const PY = path.join(ROOT, '.venv/Scripts/python.exe');
const GPP = process.env.GPP ?? path.join(ROOT, '.tmp/mingw64/bin/g++.exe');
const TMP = path.join(ROOT, '.tmp');
const FIG = path.join(TMP, 'fig.png');
// the output fence may be longer than ``` when the output itself contains backticks
const BLOCK = /```(python|cpp) run\n([\s\S]*?)```\n\nOutput:\n\n(`{3,})text\n[\s\S]*?\3(?!`)(\n\n!\[[^\]]*\]\((\/images\/[^)]+\.webp)\))?/g;

async function files(p) {
  const s = await stat(p);
  if (!s.isDirectory()) return [p];
  return (await Promise.all((await readdir(p)).map((f) => files(path.join(p, f))))).flat().filter((f) => f.endsWith('.md'));
}

function run(lang, code) {
  if (lang === 'python') {
    return execFileSync(PY, ['-I', '-X', 'utf8', '-c', code], {
      cwd: TMP, encoding: 'utf8', timeout: 2400000,
      env: { ...process.env, PYTHONIOENCODING: 'utf-8', MPLBACKEND: 'Agg', SNIPPET_FIG: FIG, TRANSFORMERS_VERBOSITY: 'error', HF_HUB_DISABLE_SYMLINKS_WARNING: '1', TQDM_DISABLE: '1' },
    });
  }
  const exe = path.join(TMP, 'snippet.exe');
  const bin = path.dirname(GPP);
  execFileSync(GPP, ['-std=c++17', '-O1', '-x', 'c++', '-', '-o', exe], { input: code, cwd: TMP, encoding: 'utf8', env: { ...process.env, PATH: bin + path.delimiter + process.env.PATH } });
  return execFileSync(exe, [], { cwd: TMP, encoding: 'utf8', timeout: 60000, env: { ...process.env, PATH: bin + path.delimiter + process.env.PATH } });
}

await mkdir(TMP, { recursive: true });
let n = 0, failed = 0, figs = 0;
for (const f of (await Promise.all(process.argv.slice(2).map(files))).flat()) {
  const src = await readFile(f, 'utf8');
  let out = '', last = 0, changed = false;
  for (const m of src.matchAll(BLOCK)) {
    const [, lang, code, , figLine = '', figPath] = m;
    out += src.slice(last, m.index);
    last = m.index + m[0].length;
    await rm(FIG, { force: true });
    try {
      const result = run(lang, code).replace(/\r\n/g, '\n').trimEnd();
      if (figPath && existsSync(FIG)) {
        const dest = path.join(ROOT, 'public', figPath);
        await mkdir(path.dirname(dest), { recursive: true });
        await sharp(FIG).resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 82 }).toFile(dest);
        figs++;
      } else if (figPath) {
        throw new Error(`expected a figure at $SNIPPET_FIG for ${figPath}`);
      }
      n++; changed = true;
      const fence = '`'.repeat(Math.max(3, ...[...result.matchAll(/`+/g)].map((r) => r[0].length + 1)));
      out += '```' + lang + ' run\n' + code + '```\n\nOutput:\n\n' + fence + 'text\n' + result + '\n' + fence + figLine;
    } catch (e) {
      failed++;
      console.error(`FAIL ${path.relative(ROOT, f)}\n${(e.stderr || e.message).toString().slice(-1200)}`);
      out += m[0];
    }
  }
  out += src.slice(last);
  if (changed) await writeFile(f, out);
}
console.log(`ran ${n} snippets (${figs} figures), ${failed} failed`);
process.exit(failed ? 1 : 0);
