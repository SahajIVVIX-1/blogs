import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import phasesData from '@/data/learning-path.json';
import {
  type Post,
  type PostData,
  dayKey,
  slugOf,
} from './constants';

export * from './constants';

export const phases = phasesData;

export function phaseOf(n?: number) {
  if (!n) return undefined;
  return phases.find((ph) => ph.n === n);
}

const POSTS_DIR = path.join(process.cwd(), 'src/content/posts');

function getAllFiles(dirPath: string, arrayOfFiles: string[] = []): string[] {
  if (!fs.existsSync(dirPath)) return arrayOfFiles;
  const files = fs.readdirSync(dirPath);

  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else if (file.endsWith('.md') || file.endsWith('.mdx')) {
      arrayOfFiles.push(fullPath);
    }
  }

  return arrayOfFiles;
}

let cachedPosts: Post[] | null = null;

export function allPosts(): Post[] {
  if (cachedPosts) return cachedPosts;

  const filePaths = getAllFiles(POSTS_DIR);
  const posts: Post[] = [];

  for (const filePath of filePaths) {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);

    if (data.draft) continue;

    const relativeId = path.relative(POSTS_DIR, filePath).replaceAll('\\', '/');
    const dateVal = data.date ? new Date(data.date) : new Date();

    const post: Post = {
      id: relativeId,
      slug: slugOf({ id: relativeId } as Post),
      body: content,
      data: {
        title: data.title || '',
        date: dateVal,
        categories: data.categories || ['study'],
        tags: data.tags || [],
        summary: data.summary || '',
        sources: data.sources || [],
        papers: data.papers || [],
        cover: data.cover,
        cover_credit: data.cover_credit,
        images: data.images || [],
        phase: data.phase,
        step: data.step,
        highlights: data.highlights || [],
        card: data.card,
        draft: !!data.draft,
      },
    };

    posts.push(post);
  }

  posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime() || a.id.localeCompare(b.id));
  cachedPosts = posts;
  return posts;
}

export function getPostBySlug(year: string, month: string, day: string, slug: string): Post | undefined {
  const posts = allPosts();
  const targetKey = `${year}-${month}-${day}`;
  return posts.find((p) => {
    return dayKey(p.data.date) === targetKey && slugOf(p) === slug;
  });
}

export function byDay(posts: Post[]): Map<string, Post[]> {
  const m = new Map<string, Post[]>();
  for (const p of posts) {
    const k = dayKey(p.data.date);
    if (!m.has(k)) m.set(k, []);
    m.get(k)!.push(p);
  }
  return m;
}

export function today(): string {
  return new Date().toISOString().slice(0, 10);
}

export function stats(posts: Post[]) {
  const days = byDay(posts);
  const count = (c: string) => posts.filter((p) => p.data.categories.includes(c as any)).length;
  const keys = [...days.keys()].sort();
  let streak = 0;
  if (keys.length) {
    const d = new Date(keys[keys.length - 1] + 'T00:00:00Z');
    while (days.has(dayKey(d))) {
      streak++;
      d.setUTCDate(d.getUTCDate() - 1);
    }
  }
  return {
    days: days.size,
    total: posts.length,
    papers: count('papers'),
    ai: count('ai'),
    study: count('study'),
    projects: count('projects'),
    personal: count('personal'),
    streak,
  };
}

export function phaseProgress(posts: Post[]) {
  return phases.map((ph) => {
    const own = posts
      .filter((p) => p.data.phase === ph.n && p.data.categories.includes('study'))
      .sort((a, b) => (a.data.step ?? 0) - (b.data.step ?? 0) || a.data.date.getTime() - b.data.date.getTime());
    return { ...ph, posts: own, done: own.filter((p) => p.data.step).length, total: ph.topics.length };
  });
}

export const fmtDate = (d: Date | string) =>
  new Date(typeof d === 'string' ? d + 'T00:00:00Z' : d).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
