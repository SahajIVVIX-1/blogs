// npm run new -- --date 2026-10-30 --category ai "Title"
import { parseArgs } from 'node:util';
import { writePost, slugify } from './lib/post.mjs';

const { values: a, positionals } = parseArgs({
  allowPositionals: true,
  options: { date: { type: 'string', default: new Date().toISOString().slice(0, 10) }, category: { type: 'string', default: 'ai' } },
});
const title = positionals.join(' ');
if (!title) { console.error('usage: npm run new -- --date YYYY-MM-DD --category ai|papers|study|projects "Title"'); process.exit(1); }
const { file, skipped } = await writePost({
  date: a.date, slug: slugify(title),
  fm: { title, categories: [a.category], tags: [], summary: '', sources: [], draft: true },
  body: '',
});
console.log(skipped ? `exists: ${file}` : `created: ${file}`);
