import fs from 'node:fs';
import path from 'node:path';

export const LP = JSON.parse(fs.readFileSync('src/data/learning-path.json', 'utf8'));

export function getWeekdays(startStr, endStr) {
  const dates = [];
  const curr = new Date(startStr + 'T00:00:00Z');
  const end = new Date(endStr + 'T00:00:00Z');
  while (curr <= end) {
    const day = curr.getUTCDay();
    if (day !== 0 && day !== 6) { // skip weekends
      dates.push(curr.toISOString().slice(0, 10));
    }
    curr.setUTCDate(curr.getUTCDate() + 1);
  }
  return dates;
}

export function assignDates(startDateStr, endDateStr, totalTopics) {
  const weekdays = getWeekdays(startDateStr, endDateStr);
  const assignments = [];
  for (let i = 0; i < totalTopics; i++) {
    // distribute evenly
    const dayIdx = Math.min(weekdays.length - 1, Math.floor((i / totalTopics) * weekdays.length));
    assignments.push(weekdays[dayIdx]);
  }
  return assignments;
}

export function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

export function writePostFile(post) {
  const [year, month] = post.date.split('-');
  const dir = path.join('src', 'content', 'posts', year, month);
  fs.mkdirSync(dir, { recursive: true });

  const fileName = `${post.date}-${post.slug}.md`;
  const filePath = path.join(dir, fileName);

  const frontmatter = [
    '---',
    `title: ${JSON.stringify(post.title)}`,
    `date: "${post.date}"`,
    `categories: ["study"]`,
    `tags: ${JSON.stringify(post.tags)}`,
    `summary: ${JSON.stringify(post.summary)}`,
    'sources:',
    ...post.sources.map(s => `  - title: ${JSON.stringify(s.title)}\n    url: ${JSON.stringify(s.url)}\n    publisher: ${JSON.stringify(s.publisher)}\n    fetched_at: ${JSON.stringify(s.fetched_at || '2026-10-29T16:25:50.000Z')}`),
    ...(post.papers && post.papers.length ? [
      'papers:',
      ...post.papers.map(p => `  - title: ${JSON.stringify(p.title)}\n    authors: ${JSON.stringify(p.authors)}\n    year: ${p.year}\n    arxiv: ${JSON.stringify(p.arxiv || '')}`)
    ] : []),
    'highlights:',
    ...post.highlights.map(h => `  - ${JSON.stringify(h)}`),
    `phase: ${post.phase}`,
    `step: ${post.step}`,
    'draft: false',
    '---',
    '',
    post.body.trim(),
    ''
  ].join('\n');

  fs.writeFileSync(filePath, frontmatter, 'utf8');
  return filePath;
}
