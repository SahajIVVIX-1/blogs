// Shared helpers for generating Mermaid flowcharts for posts.
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

export const POSTS_DIR = path.resolve(import.meta.dirname, '../../src/content/posts');

export function* walkPosts(dir = POSTS_DIR) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) yield* walkPosts(p);
    else if (e.name.endsWith('.md')) yield p;
  }
}

export const readPost = (file) => {
  const raw = fs.readFileSync(file, 'utf8');
  const crlf = raw.includes('\r\n');
  const text = crlf ? raw.replace(/\r\n/g, '\n') : raw;
  return { file, crlf, text, fm: matter(text) };
};

export const writePostText = (file, text, crlf) => fs.writeFileSync(file, crlf ? text.replace(/\n/g, '\r\n') : text, 'utf8');

/** Mermaid-safe label text (used inside "..." labels). */
export const esc = (s) =>
  String(s)
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/&/g, '#amp;')
    .replace(/"/g, '#quot;')
    .replace(/</g, '#lt;')
    .replace(/>/g, '#gt;');

/** Truncate at a word boundary. */
export const clip = (s, n) => {
  s = String(s).replace(/\s+/g, ' ').trim();
  if (s.length <= n) return s;
  const cut = s.slice(0, n - 1);
  const sp = cut.lastIndexOf(' ');
  return (sp > n * 0.55 ? cut.slice(0, sp) : cut).replace(/[ ,;:(\-–—]+$/, '') + '…';
};

export const hash = (s) => {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
};

const SHAPES = {
  '': (t) => `["${t}"]`,
  '?': (t) => `{"${t}"}`,
  '!': (t) => `(["${t}"])`,
  $: (t) => `[("${t}")]`,
  '@': (t) => `[["${t}"]]`,
  '#': (t) => `{{"${t}"}}`,
  '/': (t) => `[/"${t}"/]`,
};

const HEAD = 'flowchart TD\n';
const TAIL =
  '\n    classDef title fill:transparent,stroke:transparent,font-weight:700;' +
  '\n    classDef term stroke-width:2px;' +
  '\n    classDef store stroke-dasharray:4 3;' +
  '\n    classDef dec stroke-width:2px;';

/**
 * Compact notation -> Mermaid.
 *   a=Label            rectangle           a?=Question   decision      a!=End   terminal (stadium)
 *   a$=Store           cylinder            a@=Module     subroutine    a#=Hex   hexagon     a/=Data  parallelogram
 *   a>b>c              chain               c-yes>d       labelled edge (label sits before the arrow)
 *   [Group title: a b c]    subgraph
 *   dir LR             left-to-right layout
 */
export function dslToMermaid(dsl, title) {
  const nodes = new Map(); // id -> {shape, text}
  const edges = [];
  const groups = [];
  let dir = 'TD';
  for (const raw of dsl.split('\n')) {
    const line = raw.trim();
    if (!line || line.startsWith('# ')) continue;
    if (/^dir\s+(LR|TD|RL|BT)$/i.test(line)) { dir = line.split(/\s+/)[1].toUpperCase(); continue; }
    let m;
    if ((m = line.match(/^\[(.+?):\s*([\w\s]+)\]$/))) { groups.push({ title: m[1].trim(), ids: m[2].trim().split(/\s+/) }); continue; }
    if ((m = line.match(/^([A-Za-z][A-Za-z0-9_]*)([?!$@#/]?)=(.+)$/))) { nodes.set(m[1], { shape: m[2], text: m[3].trim() }); continue; }
    if (line.includes('>')) {
      const parts = line.split('>').map((p) => p.trim());
      for (let i = 0; i < parts.length - 1; i++) {
        const lm = parts[i].match(/^([A-Za-z][A-Za-z0-9_]*)(?:-(.+))?$/);
        const to = parts[i + 1].match(/^([A-Za-z][A-Za-z0-9_]*)/);
        if (!lm || !to) throw new Error('bad edge: ' + line);
        edges.push({ from: lm[1], to: to[1], label: lm[2] ? lm[2].trim() : '' });
      }
      continue;
    }
    throw new Error('unparsed DSL line: ' + line);
  }
  for (const e of edges) for (const id of [e.from, e.to]) if (!nodes.has(id)) throw new Error('edge uses undefined node ' + id);
  const ids = [...nodes.keys()];
  const first = ids[0];
  const inGroup = new Set(groups.flatMap((g) => g.ids));
  const out = [];
  out.push(`flowchart ${dir}`);
  out.push(`    T(["${esc(title)}"]):::title`);
  const nodeLine = (id) => `${id}${SHAPES[nodes.get(id).shape](esc(nodes.get(id).text))}`;
  for (const id of ids.filter((i) => !inGroup.has(i))) out.push('    ' + nodeLine(id));
  groups.forEach((g, gi) => {
    out.push(`    subgraph G${gi}["${esc(g.title)}"]`);
    for (const id of g.ids) { if (!nodes.has(id)) throw new Error('group uses undefined node ' + id); out.push('        ' + nodeLine(id)); }
    out.push('    end');
  });
  out.push(`    T ~~~ ${first}`);
  for (const e of edges) out.push(`    ${e.from} ${e.label ? `-- "${esc(e.label)}" -->` : '-->'} ${e.to}`);
  const cls = { '?': 'dec', '!': 'term', $: 'store' };
  for (const [k, c] of Object.entries(cls)) {
    const l = ids.filter((i) => nodes.get(i).shape === k);
    if (l.length) out.push(`    class ${l.join(',')} ${c}`);
  }
  out.push(TAIL.trim().split('\n').map((s) => '    ' + s.trim()).join('\n'));
  return out.join('\n');
}

export { HEAD, TAIL, SHAPES };
