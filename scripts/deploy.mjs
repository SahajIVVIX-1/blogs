// npm run deploy: builds the last *commit* (not the working tree, so drafts in progress never ship)
// in .tmp/deploy and publishes dist/ to the gh-pages branch through a git worktree.
// (The gh-pages npm package hits ENAMETOOLONG on Windows once the site has ~1000 pages.)
import { execSync } from 'node:child_process';
import { rmSync, mkdirSync, existsSync, symlinkSync, readdirSync, cpSync } from 'node:fs';
import path from 'node:path';
import { ROOT } from './lib/cache.mjs';

const out = path.join(ROOT, '.tmp/deploy');
const site = path.join(ROOT, '.tmp/gh-pages');
const sh = (cmd, cwd = ROOT) => execSync(cmd, { cwd, stdio: 'inherit', env: { ...process.env, NODE_OPTIONS: '--max-old-space-size=8192' } });
const fwd = (p) => p.replaceAll('\\', '/');

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
sh(`git archive HEAD | tar -x -C "${fwd(out)}"`);
if (!existsSync(path.join(out, 'node_modules'))) symlinkSync(path.join(ROOT, 'node_modules'), path.join(out, 'node_modules'), 'junction');
sh('npm.cmd run build', out);

const sha = execSync('git rev-parse --short HEAD', { cwd: ROOT, encoding: 'utf8' }).trim();
sh('git fetch -q origin gh-pages');
if (existsSync(site)) sh(`git worktree remove --force "${fwd(site)}"`);
sh(`git worktree add -f -B gh-pages "${fwd(site)}" origin/gh-pages`);
for (const f of readdirSync(site)) if (f !== '.git') rmSync(path.join(site, f), { recursive: true, force: true });
cpSync(path.join(out, 'dist'), site, { recursive: true });
sh('git add -A', site);
sh(`git commit -q --author="Sahaj Saliya <143813294+SahajIVVIX-1@users.noreply.github.com>" -m "Deploy ${sha}" || echo "nothing to deploy"`, site);
sh('git push -q origin gh-pages', site);
sh(`git worktree remove --force "${fwd(site)}"`);
console.log(`Published ${sha} to gh-pages`);
