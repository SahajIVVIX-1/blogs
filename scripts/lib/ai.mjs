// AI updates: official RSS/Atom feeds, GitHub releases, and page metadata for sources without feeds.
import { XMLParser } from 'fast-xml-parser';
import { execFileSync } from 'node:child_process';
import { cachedFetch } from './cache.mjs';

const xml = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '' });
const text = (v) => (typeof v === 'object' && v ? v['#text'] ?? '' : String(v ?? '')).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

export const FEEDS = [
  { publisher: 'OpenAI', url: 'https://openai.com/news/rss.xml' },
  { publisher: 'Hugging Face', url: 'https://huggingface.co/blog/feed.xml' },
  { publisher: 'Google DeepMind', url: 'https://deepmind.google/blog/rss.xml' },
  { publisher: 'Microsoft Research', url: 'https://www.microsoft.com/en-us/research/feed/', paged: true },
  { publisher: 'NVIDIA', url: 'https://blogs.nvidia.com/feed/', paged: true },
];

export const REPOS = [
  'huggingface/transformers', 'pytorch/pytorch', 'langchain-ai/langchain', 'langchain-ai/langgraph',
  'vllm-project/vllm', 'huggingface/diffusers', 'huggingface/peft', 'huggingface/trl', 'modelcontextprotocol/modelcontextprotocol',
];

function parseFeed(body, publisher) {
  const doc = xml.parse(body);
  const items = [].concat(doc.rss?.channel?.item ?? doc.feed?.entry ?? []);
  return items.map((it) => ({
    publisher,
    title: text(it.title),
    url: typeof it.link === 'string' ? it.link : [].concat(it.link)[0]?.href,
    date: new Date(it.pubDate ?? it.published ?? it.updated).toISOString().slice(0, 10),
    description: text(it.description ?? it.summary).slice(0, 600),
  }));
}

export async function feedItems(feed, from, to) {
  const out = [];
  for (let page = 1; page <= (feed.paged ? 400 : 1); page++) {
    const url = feed.paged ? `${feed.url}?paged=${page}` : feed.url;
    const { body, status, fetched_at } = await cachedFetch(url);
    if (status >= 400) break;
    const items = parseFeed(body, feed.publisher).map((i) => ({ ...i, fetched_at }));
    out.push(...items.filter((i) => i.date >= from && i.date <= to));
    if (!items.length || items.at(-1).date < from) break;
  }
  return out;
}

export function githubReleases(repo, from, to) {
  const raw = execFileSync('gh', ['api', '--paginate', `repos/${repo}/releases?per_page=100`, '--jq',
    '.[] | {tag: .tag_name, name: .name, date: .published_at, url: .html_url, prerelease: .prerelease}'], { encoding: 'utf8', maxBuffer: 1 << 28 });
  return raw.trim().split('\n').filter(Boolean).map((l) => JSON.parse(l))
    .filter((r) => !r.prerelease && r.date && r.date.slice(0, 10) >= from && r.date.slice(0, 10) <= to)
    .map((r) => ({ publisher: `GitHub · ${repo}`, title: r.name || r.tag, url: r.url, date: r.date.slice(0, 10), tag: r.tag, repo, fetched_at: new Date().toISOString() }));
}

// minor/major releases only (vX.Y.0); patch releases are noise for a daily log
export const isFeatureRelease = (tag) => /^v?\d+\.\d+(\.0)?$/.test(tag.replace(/^(langchain|langgraph)[-=@]*/, ''));

// For pages without a feed: read the publish date from standard meta tags / JSON-LD.
export async function pageMeta(url) {
  const { body, fetched_at, status } = await cachedFetch(url);
  const pick = (re) => body.match(re)?.[1];
  const date = pick(/"datePublished"\s*:\s*"([^"]+)"/) ?? pick(/property="article:published_time"\s+content="([^"]+)"/) ?? pick(/<time[^>]+datetime="([^"]+)"/);
  const title = pick(/<meta property="og:title" content="([^"]+)"/) ?? pick(/<title>([^<]+)<\/title>/);
  return { url, status, fetched_at, title: title?.trim(), date: date ? new Date(date).toISOString().slice(0, 10) : null };
}
