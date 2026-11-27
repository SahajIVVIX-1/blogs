// AI-update posts: build a flowchart from the post's own detail points.
import { clip, hash, dslToMermaid } from './lib.mjs';

const plain = (s) => s.replace(/\*\*|`/g, '').replace(/\[(.*?)\]\(.*?\)/g, '$1').replace(/\s+/g, ' ').trim();
const section = (text, name) => {
  const m = text.match(new RegExp(`## ${name}\\n([\\s\\S]*?)(?=\\n## |$)`));
  return m ? m[1].trim() : '';
};
const bullets = (s) => s.split('\n').filter((l) => /^- /.test(l)).map((l) => plain(l.slice(2)));
const firstSentence = (s) => plain(s).split(/(?<=[.!?])\s+/)[0] || '';

export function aiDiagram({ title, publisher = '', tags = [], body, summary = '' }) {
  const techSection = section(body, 'The technical details');
  let details = bullets(techSection);
  if (details.length < 2) {
    // older posts: table rows, then plain sentences
    const rows = techSection.split('\n').filter((l) => /^\|.+\|$/.test(l) && !/^\|[\s:-]+\|/.test(l)).slice(1)
      .map((l) => l.split('|').map((c) => plain(c)).filter(Boolean)).filter((c) => c.length >= 2).map((c) => `${c[0]}: ${c.slice(1).join(' · ')}`);
    const sents = plain(techSection.replace(/\|.*\|/g, ' ')).split(/(?<=[.!?])\s+/).filter((s) => s.length > 30);
    details = [...rows, ...sents].slice(0, 7);
  }
  if (details.length < 2) return null;
  const why = firstSentence(section(body, 'Why it matters'));
  const isLib = /github/i.test(publisher);
  const seed = hash(title);
  const breaking = (d) => /\b(breaking|deprecat\w*|removed?|requires?|no longer|drops?|dropped|rollback|sunset|retired|discontinued|upgrade check|not supported|unstable)\b/i.test(d);
  const rollout = (d) => /\b(rolling out|available|rollout|pricing|priced|price|license|access|plan|tier|users?|preview|beta|update[:,])\b/i.test(d);
  const lab = (d, n = 112) => {
    const m = d.match(/^([^:]{3,46}):\s*(.+)$/);
    return clip(m ? `${m[1]}: ${m[2]}` : d, n);
  };
  const feat = details.filter((d) => !breaking(d) && !rollout(d));
  const risk = details.filter(breaking);
  const ship = details.filter((d) => rollout(d) && !breaking(d));
  const mainFeat = (feat.length >= 2 ? feat : details.filter((d) => !breaking(d))).slice(0, 6);

  let k = 0;
  const id = () => 'n' + ++k;
  const defs = [];
  const def = (shape, text) => { const i = id(); defs.push(`${i}${shape}=${text}`); return i; };
  const lines = [];
  const ann = def('!', `${publisher.replace('GitHub · ', '')}: ${clip(title, 70)}`);
  const ctx = def('', clip(plain(summary), 112));
  const fNodes = mainFeat.map((d) => def('', lab(d)));
  const sNodes = ship.slice(0, 3).map((d) => def('/', lab(d, 100)));
  const rNodes = risk.slice(0, 3).map((d) => def('', lab(d, 100)));
  const gate = def('?', isLib ? 'Does upgrading need changes?' : ['Available to me today?', 'Fits production use?', 'Ready beyond the demo?'][seed % 3]);
  const so = def('', why ? clip(why, 116) : 'What this changes for builders');
  const end = def('!', isLib ? 'Upgrade with the checklist above' : 'Track the rollout and follow-up releases');
  const tagNode = tags.length ? def('', `Topics: ${tags.slice(0, 4).join(' · ')}`) : null;

  const chain = (...ids) => { const c = ids.filter(Boolean); if (c.length > 1) lines.push(c.join('>')); };
  chain(ann, ctx);
  const layout = isLib ? 'lib' : fNodes.length >= 4 && seed % 2 ? 'twocol' : 'fork';
  if (layout === 'lib') {
    fNodes.forEach((f) => lines.push(`${ctx}>${f}`));
    fNodes.forEach((f) => lines.push(`${f}>${gate}`));
    rNodes.forEach((r) => lines.push(`${gate}-yes>${r}`));
    rNodes.forEach((r) => lines.push(`${r}>${so}`));
    lines.push(`${gate}-no>${so}`);
    sNodes.forEach((s) => lines.push(`${ctx}>${s}`));
    sNodes.forEach((s) => lines.push(`${s}>${so}`));
  } else if (layout === 'twocol') {
    const h = Math.ceil(fNodes.length / 2);
    chain(ctx, ...fNodes.slice(0, h));
    chain(ctx, ...fNodes.slice(h));
    lines.push(`${fNodes[h - 1]}>${gate}`);
    lines.push(`${fNodes.at(-1)}>${gate}`);
    sNodes.forEach((s) => lines.push(`${gate}-yes>${s}`));
    rNodes.forEach((r) => lines.push(`${gate}-no>${r}`));
    [...sNodes, ...rNodes].forEach((x) => lines.push(`${x}>${so}`));
    if (!sNodes.length && !rNodes.length) lines.push(`${gate}>${so}`);
  } else {
    fNodes.forEach((f) => lines.push(`${ctx}>${f}`));
    fNodes.forEach((f) => lines.push(`${f}>${gate}`));
    sNodes.forEach((s) => lines.push(`${gate}-yes>${s}`));
    rNodes.forEach((r) => lines.push(`${gate}-no>${r}`));
    [...sNodes, ...rNodes].forEach((x) => lines.push(`${x}>${so}`));
    if (!sNodes.length && !rNodes.length) lines.push(`${gate}>${so}`);
  }
  lines.push(`${so}>${end}`);
  if (tagNode) lines.push(`${tagNode}>${ctx}`);
  const groups = [];
  if (fNodes.length > 1) groups.push(`[${isLib ? 'What changed' : 'What it adds'}: ${fNodes.join(' ')}]`);
  if (sNodes.length + rNodes.length > 1) groups.push(`[${isLib ? 'Upgrade notes' : 'Access and limits'}: ${[...sNodes, ...rNodes].join(' ')}]`);
  return dslToMermaid([...defs, ...lines, ...groups].join('\n'), title);
}
