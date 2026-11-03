import { getCollection, type CollectionEntry } from 'astro:content';
import phases from '../data/learning-path.json';

export type Post = CollectionEntry<'posts'>;
export const START = '2023-08-04';

export const CATEGORY_LABEL: Record<string, string> = {
  study: 'Study Note',
  ai: 'AI Update',
  papers: 'Paper Summary',
  projects: 'Project',
};

export const CATEGORY_ICON: Record<string, string> = {
  study: '📚',
  ai: '⚡',
  papers: '📄',
  projects: '🛠️',
};

export const base = (p = '') => `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${p.replace(/^\//, '')}`;

export const dayKey = (d: Date) => d.toISOString().slice(0, 10);
export const dayUrl = (key: string) => base(`${key.replaceAll('-', '/')}/`);
export const slugOf = (p: Post) => p.id.split('/').pop()!.replace(/^\d{4}-\d{2}-\d{2}-/, '');
export const postUrl = (p: Post) => base(`${dayKey(p.data.date).replaceAll('-', '/')}/${slugOf(p)}/`);

export function readingTime(p: Post): string {
  const text = (p.body ?? '') + ' ' + (p.data.summary ?? '');
  const words = text.trim().split(/\s+/).length;
  const mins = Math.max(1, Math.ceil(words / 220));
  return `${mins} min read`;
}

export function phaseOf(n?: number) {
  if (!n) return undefined;
  return phases.find((ph) => ph.n === n);
}

export async function allPosts(): Promise<Post[]> {
  const posts = await getCollection('posts', (p) => !p.data.draft);
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime() || a.id.localeCompare(b.id));
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
  // current streak: consecutive days with posts ending at the latest post day
  const keys = [...days.keys()].sort();
  let streak = 0;
  if (keys.length) {
    const d = new Date(keys[keys.length - 1] + 'T00:00:00Z');
    while (days.has(dayKey(d))) {
      streak++;
      d.setUTCDate(d.getUTCDate() - 1);
    }
  }
  return { days: days.size, total: posts.length, papers: count('papers'), ai: count('ai'), study: count('study'), projects: count('projects'), streak };
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
    day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC',
  });
