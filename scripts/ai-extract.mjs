// node scripts/ai-extract.mjs picks.json out.json
// Fetches each pick's page (or GitHub release notes) and stores readable text for writing the post from the source.
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
import { cachedFetch } from './lib/cache.mjs';

const [, , inFile, outFile] = process.argv;
const picks = JSON.parse(fs.readFileSync(inFile, 'utf8'));
const dec = (s) => s.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;|&#x27;|&rsquo;/g, "'").replace(/&ldquo;|&rdquo;/g, '"').replace(/&mdash;/g, '—').replace(/&ndash;/g, '–').replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n));
const strip = (s) => dec(s.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();

function collect(main) {
  const parts = [];
  for (const m of main.matchAll(/<(h[1-4]|p|li|blockquote|figcaption)[^>]*>([\s\S]*?)<\/\1>/gi)) {
    const t = strip(m[2]);
    if (t.length < 28 && !/^h/i.test(m[1])) continue;
    parts.push((/^h/i.test(m[1]) ? '## ' : /^li/i.test(m[1]) ? '- ' : '') + t);
  }
  const seen = new Set(); // de-duplicate repeated lines
  return parts.filter((p) => (seen.has(p) ? false : (seen.add(p), true))).join('\n');
}

function htmlText(html) {
  const h = html.replace(/<(script|style|noscript|svg|nav|footer|form|button|iframe)[\s\S]*?<\/\1>/gi, ' ');
  const articles = [...h.matchAll(/<article[\s\S]*?<\/article>/gi)].map((m) => m[0]).join('\n');
  let t = articles ? collect(articles) : '';
  if (t.length < 900) t = collect(h.match(/<main[\s\S]*?<\/main>/i)?.[0] ?? '');
  if (t.length < 900) t = collect(h);
  return t;
}

const out = [];
for (const p of picks) {
  let text = '', status = 0, fetched_at = new Date().toISOString();
  try {
    if (p.publisher.startsWith('GitHub')) {
      const repo = p.publisher.replace('GitHub · ', '');
      text = execFileSync('gh', ['api', `repos/${repo}/releases/tags/${p.tag}`, '--jq', '.body'], { encoding: 'utf8', maxBuffer: 1 << 26 });
      status = 200;
    } else {
      const r = await cachedFetch(p.url);
      status = r.status; fetched_at = r.fetched_at;
      text = r.status < 400 ? htmlText(r.body) : '';
    }
  } catch (e) { text = ''; status = -1; }
  out.push({ ...p, status, fetched_at, chars: text.length, text: text.slice(0, 9000) });
  console.log(p.date, status, text.length, p.title.slice(0, 60));
}
fs.writeFileSync(outFile, JSON.stringify(out, null, 1));
