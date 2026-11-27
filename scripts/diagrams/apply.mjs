// node scripts/diagrams/apply.mjs [--write] [--only papers|ai|study] [--filter substr] [--dump file.json]
// Replaces / inserts a post-specific Mermaid flowchart in each published post.
import fs from 'node:fs';
import path from 'node:path';
import { readPost, writePostText, walkPosts } from './lib.mjs';
import { paperDiagram, paperFallbackDiagram, loadAbstracts } from './papers.mjs';
import { aiDiagram } from './ai.mjs';
import { loadStudy, studyDiagram } from './study.mjs';

const arg = (name) => (process.argv.includes(name) ? process.argv[process.argv.indexOf(name) + 1] : null);
const WRITE = process.argv.includes('--write');
const only = arg('--only');
const filter = arg('--filter');
const abstracts = loadAbstracts();
const study = loadStudy();

const FENCE = /```mermaid\n[\s\S]*?\n```/;
const stats = {};
const bump = (k) => (stats[k] = (stats[k] || 0) + 1);
const codes = [];

for (const f of walkPosts()) {
  if (filter && !f.includes(filter)) continue;
  const p = readPost(f);
  const { data } = p.fm;
  if (data.draft) { bump('skip-draft'); continue; }
  const cat = data.categories?.[0];
  if (only && only !== cat) continue;
  let code = null;
  try {
    if (cat === 'papers') {
      const id = (data.papers?.[0]?.arxiv || '').match(/(\d{4}\.\d{4,5})/)?.[1];
      const a = id && abstracts.get(id);
      const hasCode = !!data.papers?.[0]?.code;
      code = a
        ? paperDiagram({ title: data.title, abstract: a, tags: data.tags, arxivId: id, hasCode })
        : paperFallbackDiagram({ title: data.title, card: data.card, tags: data.tags, arxivId: id, hasCode });
      bump(a ? 'papers-abstract' : 'papers-fallback');
    } else if (cat === 'ai') {
      code = aiDiagram({ title: data.title, publisher: data.sources?.[0]?.publisher, tags: data.tags, summary: data.summary, body: p.fm.content });
      bump(code ? 'ai' : 'ai-none');
    } else if (cat === 'study') {
      code = studyDiagram(study, data);
      bump(code ? 'study-authored' : 'study-missing');
    } else { bump('other-' + cat); continue; }
  } catch (e) { bump('ERROR'); console.log('ERR', path.basename(f), e.message.slice(0, 300)); continue; }
  if (!code) continue;
  codes.push(code);
  let text = p.text;
  const block = '```mermaid\n' + code + '\n```';
  const ASCII = /```text\n(?:(?!```)[\s\S])*?\+-{10,}\+(?:(?!```)[\s\S])*?```/;
  if (FENCE.test(text)) text = text.replace(FENCE, () => block);
  else if (ASCII.test(text)) { text = text.replace(ASCII, () => block); bump('ascii-replaced'); }
  else if (cat === 'ai' && text.includes('## Why it matters')) {
    text = text.replace('## Why it matters', () => `## How it fits together\n\nThe flowchart below maps this announcement's main points and what depends on them.\n\n${block}\n\n## Why it matters`);
  } else { bump('no-slot'); console.log('NOSLOT', f); continue; }
  if (WRITE && text !== p.text) writePostText(f, text, p.crlf);
}
console.log(WRITE ? 'WRITTEN' : 'DRY RUN', stats);
const dump = arg('--dump');
if (dump) fs.writeFileSync(dump, JSON.stringify([...new Set(codes)]));
