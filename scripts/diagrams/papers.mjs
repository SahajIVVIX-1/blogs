// Paper posts: build a flowchart from the paper's own abstract (problem -> approach -> evidence -> release).
import fs from 'node:fs';
import path from 'node:path';
import { clip, hash, dslToMermaid, POSTS_DIR } from './lib.mjs';

const SOURCES = path.resolve(POSTS_DIR, '../../../data/sources');

let abstractIndex = null;
export function loadAbstracts() {
  if (abstractIndex) return abstractIndex;
  abstractIndex = new Map();
  for (const d of fs.readdirSync(SOURCES)) {
    const f = path.join(SOURCES, d, 'hf-daily-full.json');
    if (!fs.existsSync(f)) continue;
    try {
      for (const p of JSON.parse(fs.readFileSync(f, 'utf8'))) if (p.id && p.summary && !abstractIndex.has(p.id)) abstractIndex.set(p.id, p.summary);
    } catch {}
  }
  return abstractIndex;
}

const PROTECT = /\b(e\.g|i\.e|et al|vs|etc|Fig|Eq|Sec|approx|No|Dr|St|U\.S|Inc)\./g;
export function sentences(text) {
  const t = text.replace(/\s+/g, ' ').replace(/\$([^$]+)\$/g, '$1').replace(PROTECT, (m) => m.replace(/\./g, '§'));
  return t
    .split(/(?<=[.!?])\s+(?=[A-Z0-9\("“])/)
    .map((s) => s.replace(/§/g, '.').trim())
    .filter((s) => s.length > 18);
}

const RE = {
  problem: /\b(however|but|challenge|limited|limitation|lack|bottleneck|difficult|fail|remain|yet|struggle|suffer|costly|expensive|unclear|poorly|hinder|fall short|gap|critical|crucial|increasingly|despite)\b/i,
  contribution: /\bwe\s+(?:\w+\s+)?(introduce|propose|present|develop|design|build|study|investigate|address|explore|formulate|construct|release|curate|establish|devise|provide|offer|reformulate|revisit|identify)\b|\b(this|our)\s+(paper|work|report|study|article)\b/i,
  result: /(achieve|outperform|improv|surpass|reduc|increas|boost|state-of-the-art|sota|faster|speed-?up|\d+(\.\d+)?\s?(%|x|×)|extensive experiment|experiments (show|demonstrate)|results (show|demonstrate)|demonstrate|consistently|significant)/i,
  release: /\b(code|models?|data|dataset|checkpoints?|weights?|benchmark)\b.*\b(released|available|open-?source|publicly)\b|\b(open-?source|publicly available|will be released|github)\b/i,
  data: /\b(on|across|over|using)\s+(\d+\s+)?([A-Z][\w-]+(?:\s*,\s*[A-Z][\w-]+)*(?:\s*,?\s*(?:and|or)\s+[A-Z][\w-]+)?)\s*(benchmarks?|datasets?|tasks?)?/,
};

function label(s, n = 108) {
  s = s
    .replace(/^(In|On) (this|the)? ?(paper|work|report|article|study)[,:]?\s*/i, '')
    .replace(/^(To (address|tackle|solve|overcome) (this|these)( \w+)?|To this end|Specifically|Concretely|Furthermore|Moreover|Additionally|In addition|Finally|Overall|Notably|Meanwhile|Besides)[,:]?\s*/i, '')
    .replace(/^We (further |also |then |first |additionally )?/i, '')
    .replace(/\s*\([^)]{0,3}\)/g, '');
  s = s.charAt(0).toUpperCase() + s.slice(1);
  return clip(s.replace(/[.!?]+$/, ''), n);
}

function splitLong(s) {
  if (s.length < 150) return [s];
  const m = s.match(/^(.{60,140}?)(?:;|, while |, and (?=we |to |by |which |the )|, which |, enabling |, allowing |, thereby )\s*(.{30,})$/i);
  return m ? [m[1], m[2]] : [s];
}

function numbers(texts) {
  const found = [];
  for (const t of texts) for (const m of t.matchAll(/(\d+(?:\.\d+)?\s?(?:%|x|×|pp|points?)|\b\d+(?:\.\d+)?B\b|\b\d+K\b|\b\d+M\b)/g)) found.push(m[1].replace(/\s+/g, ''));
  return [...new Set(found)].slice(0, 6);
}

function systemName(title) {
  const t = title.replace(/^Paper summary:\s*/i, '');
  const m = t.match(/^([A-Za-z0-9][\w.\-+]*(?:\s[\w.\-+]+){0,2})\s*[:—–]/);
  return m ? m[1] : null;
}

export function paperDiagram({ title, abstract, tags = [], arxivId, hasCode }) {
  const paperTitle = title.replace(/^Paper summary:\s*/i, '');
  const all = sentences(abstract);
  if (!all.length) return null;
  const sys = systemName(paperTitle);
  const seed = hash(arxivId || paperTitle);

  const problem = [], contrib = [], method = [], result = [], release = [];
  all.forEach((s, i) => {
    if (RE.release.test(s) && i > 0) release.push(s);
    else if (!contrib.length && RE.contribution.test(s)) contrib.push(s);
    else if (contrib.length && RE.result.test(s) && !/^we (propose|introduce|present|develop|design|build)/i.test(s)) result.push(s);
    else if (contrib.length) (RE.contribution.test(s) && contrib.length < 2 ? contrib : method).push(s);
    else if (RE.problem.test(s) || i < 2) problem.push(s);
    else problem.push(s);
  });
  if (!contrib.length && method.length) contrib.push(method.shift());
  if (!contrib.length && problem.length > 1) contrib.push(problem.pop());
  if (!result.length) {
    const last = method.pop();
    if (last) result.push(last);
  }

  const L = {};
  let nid = 0;
  const n = (shape, text) => { const id = 'n' + ++nid; L[id] = { shape, text }; return id; };
  const lines = [];
  const defs = [];
  const def = (shape, text) => { const id = n(shape, text); defs.push(`${id}${shape}=${text}`); return id; };

  // ---- problem / gap
  const prob = problem.flatMap(splitLong).slice(0, 3).map((s) => def('', label(s)));
  // ---- core idea
  const coreText = label(contrib[0] || paperTitle, 104);
  const core = def('@', sys && !coreText.toLowerCase().includes(sys.toLowerCase()) ? `${sys}: ${clip(coreText, 90)}` : coreText);
  const extraContrib = contrib.slice(1, 3).map((s) => def('', label(s)));
  // ---- method detail
  const mnodes = method.flatMap(splitLong).slice(0, 5).map((s) => def('', label(s)));
  // ---- evidence
  const dmm = abstract.match(RE.data);
  const dm = dmm && dmm[4] ? dmm[3] : null;
  const evalNode = def('/', dm ? `Evaluated on ${clip(dm.replace(/\s+/g, ' '), 70)}` : 'Evaluated against baselines');
  const gate = def('?', pickGate(abstract, seed));
  const res = result.flatMap(splitLong).slice(0, 3).map((s) => def('', label(s)));
  const nums = numbers(result.concat(method));
  const numNode = nums.length ? def('#', `Reported: ${nums.join(' · ')}`) : null;
  const rel = release[0] ? def('!', label(release[0], 90)) : def('!', hasCode ? 'Code released with the paper' : `arXiv ${arxivId || ''}`.trim());
  const dom = tags.filter((t) => !/open-source-code/.test(t)).slice(0, 4);
  const domNode = dom.length ? def('', `Area: ${dom.join(' · ')}`) : null;

  // ---- edges: layout varies with the paper
  const iterative = /\b(iterative|self-?improv|feedback|reinforcement|closed-loop|refine|loop|rollout|agent)\b/i.test(abstract);
  const layout = iterative && mnodes.length >= 2 ? 'loop' : mnodes.length >= 3 && seed % 2 ? 'fork' : seed % 3 === 0 ? 'twotrack' : 'story';
  const chain = (...ids) => { const c = ids.filter(Boolean); if (c.length > 1) lines.push(c.join('>')); };

  if (layout === 'story') {
    chain(...prob, core);
    extraContrib.forEach((e) => lines.push(`${core}>${e}`));
    chain(...(extraContrib.length ? [extraContrib.at(-1)] : [core]), ...mnodes, evalNode, gate);
    res.forEach((r) => lines.push(`${gate}-yes>${r}`));
    if (numNode) lines.push(`${res.at(-1) || gate}>${numNode}`);
    lines.push(`${numNode || res.at(-1) || gate}>${rel}`);
    lines.push(`${gate}-no>${rel}`);
    if (domNode) lines.push(`${domNode}>${core}`);
  } else if (layout === 'fork') {
    chain(...prob, core);
    extraContrib.forEach((e) => lines.push(`${core}>${e}`));
    mnodes.forEach((m) => lines.push(`${core}>${m}`));
    mnodes.forEach((m) => lines.push(`${m}>${evalNode}`));
    extraContrib.forEach((e) => lines.push(`${e}>${evalNode}`));
    chain(evalNode, gate);
    res.forEach((r) => lines.push(`${gate}-yes>${r}`));
    lines.push(`${gate}-no>${core}`);
    lines.push(`${numNode || res.at(-1) || gate}>${rel}`);
    if (numNode && res.length) res.forEach((r) => lines.push(`${r}>${numNode}`));
    if (domNode) lines.push(`${domNode}>${prob[0] || core}`);
  } else if (layout === 'twotrack') {
    // problem track and solution track meet at the evaluation
    chain(...prob);
    chain(core, ...extraContrib, ...mnodes);
    lines.push(`${prob.at(-1) || core}>${core}`);
    lines.push(`${mnodes.at(-1) || extraContrib.at(-1) || core}>${evalNode}`);
    lines.push(`${prob[0] || core}>${evalNode}`);
    lines.push(`${evalNode}>${gate}`);
    res.forEach((r) => lines.push(`${gate}-yes>${r}`));
    lines.push(`${gate}-no>${prob[0] || core}`);
    lines.push(`${numNode || res.at(-1) || gate}>${rel}`);
    if (numNode && res.length) res.forEach((r) => lines.push(`${r}>${numNode}`));
    if (domNode) lines.push(`${domNode}>${core}`);
  } else {
    // loop: iterate on the method until it passes the gate
    chain(...prob, core);
    extraContrib.forEach((e) => lines.push(`${core}>${e}`));
    chain(...(extraContrib.length ? [extraContrib.at(-1)] : [core]), ...mnodes);
    lines.push(`${mnodes.at(-1)}>${evalNode}`);
    lines.push(`${evalNode}>${gate}`);
    lines.push(`${gate}-no, refine>${mnodes[0]}`);
    res.forEach((r) => lines.push(`${gate}-yes>${r}`));
    if (numNode && res.length) res.forEach((r) => lines.push(`${r}>${numNode}`));
    lines.push(`${numNode || res.at(-1) || gate}>${rel}`);
    if (domNode) lines.push(`${domNode}>${core}`);
  }
  const groups = [];
  if (prob.length > 1) groups.push(`[Problem and gap: ${prob.join(' ')}]`);
  if (mnodes.length > 1) groups.push(`[How it works: ${mnodes.join(' ')}]`);
  if (res.length > 1) groups.push(`[Evidence: ${res.join(' ')}]`);
  const dsl = [...defs, ...lines, ...groups].join('\n');
  try {
    return dslToMermaid(dsl, paperTitle);
  } catch (e) {
    throw new Error(`paper ${arxivId}: ${e.message}\n${dsl}`);
  }
}

/** Papers without a stored abstract: build the flow from the post's paper card instead. */
export function paperFallbackDiagram({ title, card, tags = [], arxivId, hasCode }) {
  const paperTitle = title.replace(/^Paper summary:\s*/i, '');
  const seed = hash(arxivId || paperTitle);
  const c = card || {};
  const d = [];
  d.push(`a!=${clip(paperTitle, 90)}`);
  d.push(`b=Task: ${clip(c.task || 'the problem the paper addresses', 100)}`);
  d.push(`c@=Method: ${clip(c.method || 'the proposed approach', 100)}`);
  d.push(`e/=Data: ${clip(c.data || 'benchmarks used for evaluation', 100)}`);
  d.push(`f?=${pickGate(`${c.result || ''} ${c.method || ''}`, seed)}`);
  d.push(`g=Result: ${clip(c.result || 'reported improvements over baselines', 100)}`);
  d.push('h=Limitations: scope, data and compute assumptions');
  d.push(`i!=${hasCode ? 'Code released with the paper' : `arXiv ${arxivId || ''}`.trim()}`);
  const dom = tags.filter((t) => !/open-source-code/.test(t)).slice(0, 4);
  if (dom.length) d.push(`j=Area: ${dom.join(' · ')}`);
  d.push('a>b>c>e>f', 'f-yes>g>h>i', 'f-no>c');
  if (dom.length) d.push('j>b');
  return dslToMermaid(d.join('\n'), paperTitle);
}

function pickGate(abstract, seed) {
  if (/benchmark|state-of-the-art|sota|outperform/i.test(abstract)) return ['Beats strong baselines?', 'Better than prior methods?', 'Holds on the benchmarks?'][seed % 3];
  if (/efficien|faster|speed|cost|latency|memory/i.test(abstract)) return ['Gains without quality loss?', 'Efficiency gain holds?'][seed % 2];
  if (/robust|generaliz|zero-shot|transfer/i.test(abstract)) return ['Generalizes beyond training?', 'Robust across settings?'][seed % 2];
  return ['Evidence supports the claim?', 'Result holds up?'][seed % 2];
}
