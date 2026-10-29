// Fetches a source page (cached), extracts readable text and saves it next to the day's sources,
// so every AI-update post is written from the full article, not just a feed blurb.
// usage: node scripts/read-source.mjs <YYYY-MM-DD> <url> [maxChars]
// GitHub release URLs are read through `gh api` (release notes body).
import { execFileSync } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { cachedFetch, ROOT } from './lib/cache.mjs';

const [date, url, max = '6000'] = process.argv.slice(2);

function htmlToText(html) {
  const main = html.match(/<article[\s\S]*?<\/article>/i)?.[0] ?? html.match(/<main[\s\S]*?<\/main>/i)?.[0] ?? html;
  return main
    .replace(/<(script|style|noscript|svg|nav|footer|header)[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<(h[1-6]|p|li|tr|br|div)[^>]*>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&#39;|&rsquo;/g, "'").replace(/&quot;|&ldquo;|&rdquo;/g, '"')
    .replace(/[ \t]+/g, ' ').replace(/\n\s*\n+/g, '\n').trim();
}

let text, status, fetched_at = new Date().toISOString();
const gh = url.match(/github\.com\/([^/]+\/[^/]+)\/releases\/tag\/(.+)$/);
if (gh) {
  text = execFileSync('gh', ['api', `repos/${gh[1]}/releases/tags/${decodeURIComponent(gh[2])}`, '--jq', '.name + "\n" + .published_at + "\n\n" + .body'], { encoding: 'utf8', maxBuffer: 1 << 26 });
  status = 200;
} else {
  const r = await cachedFetch(url);
  status = r.status; fetched_at = r.fetched_at;
  text = htmlToText(r.body);
}
const dir = path.join(ROOT, 'data/sources', date);
await mkdir(dir, { recursive: true });
const name = url.replace(/^https?:\/\//, '').replace(/[^a-z0-9]+/gi, '-').slice(0, 80);
await writeFile(path.join(dir, name + '.txt'), `${url}\nstatus: ${status}\nfetched_at: ${fetched_at}\n\n${text}`);
console.log(`[${status}] ${url} (${text.length} chars, fetched ${fetched_at})\n`);
console.log(text.slice(0, Number(max)));
