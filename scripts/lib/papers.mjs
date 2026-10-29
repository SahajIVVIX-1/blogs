// Hugging Face Daily Papers -> candidates; arXiv API -> exact metadata; arXiv OAI-PMH -> licence.
import { XMLParser } from 'fast-xml-parser';
import { cachedFetch, fetchJson } from './cache.mjs';

const xml = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '' });

const TOPICS = {
  agents: /\bagent|tool use|function call|planning\b/i,
  llm: /language model|\bLLM|instruction|reasoning|RLHF|preference|alignment|in-context|chain-of-thought|token/i,
  nlp: /\btext\b|translation|retrieval|question answering|summari|\bNLP\b/i,
  cv: /image|vision|visual|video|segmentation|detection|3D|pixel/i,
  genai: /diffusion|generat|text-to-|synthesis|GAN\b/i,
};

export function topicOf(p) {
  const text = `${p.title} ${p.summary}`;
  for (const [t, re] of Object.entries(TOPICS)) if (re.test(text)) return t;
  return 'ml';
}

export async function hfDaily(date) {
  const url = `https://huggingface.co/api/daily_papers?date=${date}`;
  const { data, fetched_at } = await fetchJson(url);
  const list = (data ?? []).map((d) => ({
    id: d.paper.id,
    title: d.paper.title.replace(/\s+/g, ' ').trim(),
    authors: d.paper.authors.map((a) => a.name),
    summary: d.paper.summary.replace(/\s+/g, ' ').trim(),
    upvotes: d.paper.upvotes ?? 0,
    github: d.paper.githubRepo ?? null,
    published: d.paper.publishedAt,
  }));
  return { url, fetched_at, list };
}

export async function arxivMeta(id) {
  const url = `https://export.arxiv.org/api/query?id_list=${id}`;
  const { body, fetched_at } = await cachedFetch(url);
  const e = xml.parse(body).feed.entry;
  if (!e || !e.title) return null;
  const links = [].concat(e.link ?? []);
  return {
    id,
    title: String(e.title).replace(/\s+/g, ' ').trim(),
    authors: [].concat(e.author).map((a) => a.name),
    published: e.published,
    abstract: String(e.summary).replace(/\s+/g, ' ').trim(),
    categories: [].concat(e.category ?? []).map((c) => c.term),
    abs: `https://arxiv.org/abs/${id}`,
    pdf: links.find((l) => l.title === 'pdf')?.href?.replace('http:', 'https:') ?? `https://arxiv.org/pdf/${id}`,
    source_url: url,
    fetched_at,
  };
}

export async function arxivLicense(id) {
  const url = `https://export.arxiv.org/oai2?verb=GetRecord&identifier=oai:arXiv.org:${id}&metadataPrefix=arXiv`;
  const { body } = await cachedFetch(url);
  const m = body.match(/<license>([^<]+)<\/license>/);
  return m ? m[1].trim() : null; // null = arXiv default non-exclusive licence (no reuse)
}

export const reusable = (lic) => !!lic && /creativecommons\.org\/(licenses\/by\/|licenses\/by-sa\/|publicdomain)/.test(lic);
