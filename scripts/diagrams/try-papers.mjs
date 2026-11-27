import fs from 'node:fs';
import { readPost, walkPosts } from './lib.mjs';
import { paperDiagram, loadAbstracts } from './papers.mjs';
const abs = loadAbstracts();
let n = 0, miss = 0, err = 0;
const want = process.argv.slice(2);
for (const f of walkPosts()) {
  if (!f.includes('-paper-')) continue;
  const { fm } = readPost(f);
  if (!fm.data.categories?.includes('papers')) continue;
  const id = (fm.data.papers?.[0]?.arxiv || '').match(/(\d{4}\.\d{4,5})/)?.[1];
  const a = abs.get(id);
  if (!a) { miss++; continue; }
  if (want.length && !want.some((w) => f.includes(w))) { n++; continue; }
  try {
    const code = paperDiagram({ title: fm.data.title, abstract: a, tags: fm.data.tags, arxivId: id, hasCode: !!fm.data.papers?.[0]?.code });
    if (want.length) console.log(f.split(/[\/]/).pop() + '\nABSTRACT: ' + a.slice(0, 500) + '\n---\n' + code + '\n');
  } catch (e) { err++; if (err < 4) console.log('ERR', e.message.slice(0, 400)); }
  n++;
}
console.log({ papers: n, noAbstract: miss, errors: err });
