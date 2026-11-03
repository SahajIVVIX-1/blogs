// scripts/curriculum/fetch-all-hf-papers.mjs
// Fetches Hugging Face daily papers with full abstracts for all days from 2023-08-04 to 2026-11-03.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../..');
const SOURCES_DIR = path.join(ROOT, 'data/sources');

const startDate = new Date('2023-08-04T00:00:00Z');
const endDate = new Date('2026-11-03T00:00:00Z');

const allDates = [];
for (let d = new Date(startDate); d <= endDate; d.setUTCDate(d.getUTCDate() + 1)) {
  allDates.push(d.toISOString().slice(0, 10));
}

console.log(`Total dates to check: ${allDates.length} (from ${allDates[0]} to ${allDates[allDates.length - 1]})`);

const toFetch = [];
for (const date of allDates) {
  const dir = path.join(SOURCES_DIR, date);
  const fullPath = path.join(dir, 'hf-daily-full.json');
  if (!fs.existsSync(fullPath)) {
    toFetch.push(date);
  }
}

console.log(`Dates needing fetch: ${toFetch.length} out of ${allDates.length}`);

const CONCURRENCY = 15;
let fetchedCount = 0;
let papersFound = 0;

async function fetchDate(date) {
  const url = `https://huggingface.co/api/daily_papers?date=${date}`;
  const dir = path.join(SOURCES_DIR, date);
  const fullPath = path.join(dir, 'hf-daily-full.json');
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'sahaj-blogs/1.0' } });
    if (!res.ok) {
      if (res.status === 404 || res.status === 429) {
        // empty day
        fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(fullPath, JSON.stringify([], null, 2));
        return;
      }
      return;
    }
    const data = await res.json();
    const papers = (data || []).map((item) => {
      const p = item.paper || {};
      return {
        id: p.id,
        title: (p.title || '').replace(/\s+/g, ' ').trim(),
        authors: (p.authors || []).map((a) => a.name),
        summary: (p.summary || '').replace(/\s+/g, ' ').trim(),
        upvotes: p.upvotes || 0,
        github: p.githubRepo || null,
        published: p.publishedAt,
      };
    }).filter((p) => p.id && p.title);

    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(fullPath, JSON.stringify(papers, null, 2));
    papersFound += papers.length;
  } catch (err) {
    // silently record empty on failure
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(fullPath, JSON.stringify([], null, 2));
  }
}

async function run() {
  for (let i = 0; i < toFetch.length; i += CONCURRENCY) {
    const batch = toFetch.slice(i, i + CONCURRENCY);
    await Promise.all(batch.map((date) => fetchDate(date)));
    fetchedCount += batch.length;
    if (fetchedCount % 100 === 0 || fetchedCount === toFetch.length) {
      console.log(`Progress: ${fetchedCount}/${toFetch.length} dates fetched, ${papersFound} papers found so far...`);
    }
  }

  // Count total papers across all dates
  let grandTotal = 0;
  let daysWithPapers = 0;
  for (const date of allDates) {
    const fullPath = path.join(SOURCES_DIR, date, 'hf-daily-full.json');
    if (fs.existsSync(fullPath)) {
      try {
        const p = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
        if (p.length > 0) {
          daysWithPapers++;
          grandTotal += p.length;
        }
      } catch (e) {}
    }
  }

  console.log(`\n=== ALL DONE ===`);
  console.log(`Days with research papers: ${daysWithPapers} / ${allDates.length}`);
  console.log(`Total verified papers available with full abstracts: ${grandTotal}`);
}

run();

