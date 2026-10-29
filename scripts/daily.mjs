// npm run daily: fetch today's AI updates and one paper (drafts land in data/drafts/). Not scheduled yet.
import { execFileSync } from 'node:child_process';
const today = new Date().toISOString().slice(0, 10);
const run = (cat, extra = []) =>
  execFileSync('node', ['scripts/fetch.mjs', '--from', today, '--to', today, '--category', cat, ...extra], { stdio: 'inherit' });
run('ai');
run('papers', ['--papers', 'daily']);
