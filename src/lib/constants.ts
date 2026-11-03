import phasesData from '@/data/learning-path.json';

export const phases = phasesData;

export function phaseOf(n?: number) {
  if (!n) return undefined;
  return phases.find((ph) => ph.n === n);
}

export interface Source {
  title: string;
  url: string;
  publisher: string;
  fetched_at: string;
}

export interface Paper {
  title: string;
  authors: string[];
  year: number;
  arxiv?: string;
  pdf?: string;
  code?: string;
  license?: string;
}

export interface PaperCard {
  task: string;
  method: string;
  data?: string;
  result: string;
}

export interface ImageMeta {
  src: string;
  alt: string;
  credit: string;
}

export interface PostData {
  title: string;
  date: Date;
  categories: ('study' | 'ai' | 'papers' | 'projects' | 'personal')[];
  tags: string[];
  summary: string;
  sources: Source[];
  papers: Paper[];
  cover?: string;
  cover_credit?: string;
  images: ImageMeta[];
  phase?: number;
  step?: number;
  highlights: string[];
  card?: PaperCard;
  draft?: boolean;
}

export interface Post {
  id: string;
  slug: string;
  body: string;
  data: PostData;
}

export const START = '2023-08-04';

export const CATEGORY_LABEL: Record<string, string> = {
  study: 'Study Note',
  ai: 'AI Update',
  papers: 'Paper Summary',
  projects: 'Project',
  personal: 'Personal & Mindset',
};

export const CATEGORY_ICON: Record<string, string> = {
  study: '📚',
  ai: '⚡',
  papers: '📄',
  projects: '🛠️',
  personal: '🌱',
};

export const base = (p = '') => {
  const clean = p.replace(/^\//, '');
  return clean ? `/${clean}` : '/';
};

export const dayKey = (d: Date | string) => {
  const dateObj = typeof d === 'string' ? new Date(d) : d;
  return dateObj.toISOString().slice(0, 10);
};

export const dayUrl = (key: string) => base(`${key.replaceAll('-', '/')}/`);

export const slugOf = (p: Post) => {
  const filename = p.id.split(/[\\/]/).pop()!;
  return filename.replace(/\.mdx?$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '');
};

export const postUrl = (p: Post) => {
  const [year, month, day] = dayKey(p.data.date).split('-');
  return base(`${year}/${month}/${day}/${slugOf(p)}/`);
};

export function readingTime(p: Post): string {
  const text = (p.body ?? '') + ' ' + (p.data.summary ?? '');
  const words = text.trim().split(/\s+/).length;
  const mins = Math.max(1, Math.ceil(words / 220));
  return `${mins} min read`;
}

export function today(): string {
  return new Date().toISOString().slice(0, 10);
}

export const fmtDate = (d: Date | string) =>
  new Date(typeof d === 'string' ? d + 'T00:00:00Z' : d).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
