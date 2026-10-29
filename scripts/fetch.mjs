// npm run fetch -- --from 2023-08-04 --to 2023-08-31 --category papers|ai|study|all [--papers daily|weekly]
// Fetches sources for the range, saves raw data to data/sources/YYYY-MM-DD/, and writes draft
// skeletons (draft: true) to data/drafts/. Posts are finished by hand and moved to src/content/posts.
import { parseArgs } from 'node:util';
import { saveSource, daysBetween } from './lib/cache.mjs';
import { hfDaily, arxivMeta, arxivLicense, reusable, topicOf } from './lib/papers.mjs';
import { FEEDS, REPOS, feedItems, githubReleases, isFeatureRelease } from './lib/ai.mjs';
import { schedule } from './lib/study.mjs';
import { writePost, slugify } from './lib/post.mjs';

const { values: a } = parseArgs({
  options: {
    from: { type: 'string', default: '2023-08-04' },
    to: { type: 'string', default: new Date().toISOString().slice(0, 10) },
    category: { type: 'string', default: 'all' },
    papers: { type: 'string', default: 'weekly' },
  },
});
const want = (c) => a.category === 'all' || a.category === c;
const DRAFTS = 'data/drafts';
const log = (...m) => console.log(new Date().toISOString().slice(11, 19), ...m);

const isoWeek = (d) => {
  const t = new Date(d + 'T00:00:00Z');
  t.setUTCDate(t.getUTCDate() + 4 - (t.getUTCDay() || 7));
  return `${t.getUTCFullYear()}-${Math.ceil(((t - Date.UTC(t.getUTCFullYear(), 0, 1)) / 864e5 + 1) / 7)}`;
};

async function papers() {
  const best = new Map(); // bucket (day or week) -> {date, paper}
  for (const date of daysBetween(a.from, a.to)) {
    const { url, fetched_at, list } = await hfDaily(date);
    if (!list.length) continue;
    await saveSource(date, 'hf-daily', { url, fetched_at, candidates: list.map(({ summary, ...r }) => r) });
    const ranked = list.map((p) => ({ ...p, topic: topicOf(p) })).sort((x, y) =>
      (y.topic !== 'ml') - (x.topic !== 'ml') || y.upvotes - x.upvotes);
    const bucket = a.papers === 'daily' ? date : isoWeek(date);
    if (!best.has(bucket) || ranked[0].upvotes > best.get(bucket).paper.upvotes) best.set(bucket, { date, paper: ranked[0] });
    log('papers', date, list.length, 'candidates');
  }
  for (const { date, paper } of best.values()) {
    const meta = await arxivMeta(paper.id);
    if (!meta) continue;
    const license = await arxivLicense(paper.id);
    await saveSource(date, `arxiv-${paper.id}`, { ...meta, license, reusable_figures: reusable(license), github: paper.github, upvotes: paper.upvotes });
    await writePost({
      dir: DRAFTS, date, slug: slugify(meta.title),
      fm: {
        title: `Paper summary: ${meta.title}`, categories: ['papers'], tags: [paper.topic], summary: 'TODO',
        sources: [
          { title: meta.title, url: meta.abs, publisher: 'arXiv', fetched_at: meta.fetched_at },
          { title: `Hugging Face Daily Papers, ${date}`, url: `https://huggingface.co/papers?date=${date}`, publisher: 'Hugging Face', fetched_at: meta.fetched_at },
        ],
        papers: [{ title: meta.title, authors: meta.authors, year: Number(meta.published.slice(0, 4)), arxiv: meta.abs, pdf: meta.pdf, code: paper.github ?? undefined, license: license ?? 'arXiv non-exclusive (no reuse)' }],
        draft: true,
      },
      body: `<!-- abstract (do not copy):\n${meta.abstract}\n-->\n\n## Problem\n\n## Method\n\n## Key results\n\n## Limitations\n`,
    });
    log('paper draft', date, meta.title);
  }
}

async function ai() {
  const items = [];
  for (const f of FEEDS) { items.push(...(await feedItems(f, a.from, a.to))); log('feed', f.publisher, items.length); }
  for (const r of REPOS) {
    try { items.push(...githubReleases(r, a.from, a.to).filter((x) => isFeatureRelease(x.tag))); } catch (e) { log('gh failed', r, e.message); }
  }
  const byDate = Map.groupBy(items, (i) => i.date);
  for (const [date, list] of byDate) {
    await saveSource(date, 'ai-candidates', list);
    for (const it of list) {
      await writePost({
        dir: DRAFTS, date, slug: slugify(it.title),
        fm: { title: it.title, categories: ['ai'], tags: [], summary: 'TODO',
          sources: [{ title: it.title, url: it.url, publisher: it.publisher, fetched_at: it.fetched_at }], draft: true },
        body: `<!-- ${it.description ?? ''} -->\n\n## What happened\n\n## Why it matters\n`,
      });
    }
  }
  log('ai candidates', items.length);
}

async function study() {
  for (const s of schedule().filter((s) => s.date >= a.from && s.date <= a.to)) {
    const n = String(s.step).padStart(2, '0');
    await writePost({
      dir: DRAFTS, date: s.date, slug: slugify(`${s.phaseName.split(' ')[0]}-${n}-${s.topic}`),
      fm: { title: `${s.phaseName} · ${s.topic}`, categories: ['study'], tags: [], summary: 'TODO', phase: s.phase, step: s.step,
        sources: [], draft: true },
      body: `## Notes\n\n## Code\n\n## Output\n\n## References\n`,
    });
    log('study draft', s.date, s.topic);
  }
}

if (want('study')) await study();
if (want('papers')) await papers();
if (want('ai')) await ai();
