// npm run deploy: builds the last *commit* (not the working tree, so drafts in progress never ship)
// in .tmp/deploy and publishes dist/ to the gh-pages branch.
import { execSync } from 'node:child_process';
import { rmSync, mkdirSync, existsSync, symlinkSync } from 'node:fs';
import path from 'node:path';
import { ROOT } from './lib/cache.mjs';

const out = path.join(ROOT, '.tmp/deploy');
const sh = (cmd, cwd = ROOT) => execSync(cmd, { cwd, stdio: 'inherit' });

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
sh(`git archive HEAD | tar -x -C "${out.replaceAll('\\', '/')}"`);
if (!existsSync(path.join(out, 'node_modules'))) symlinkSync(path.join(ROOT, 'node_modules'), path.join(out, 'node_modules'), 'junction');
sh('npx astro build && npx pagefind --site dist', out);
const sha = execSync('git rev-parse --short HEAD', { cwd: ROOT, encoding: 'utf8' }).trim();
sh(`npx gh-pages -d .tmp/deploy/dist -b gh-pages --dotfiles -m "Deploy ${sha}"`);
