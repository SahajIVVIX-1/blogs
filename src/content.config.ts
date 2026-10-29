import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const source = z.object({
  title: z.string(),
  url: z.string().url(),
  publisher: z.string(),
  fetched_at: z.string(),
});

const paper = z.object({
  title: z.string(),
  authors: z.array(z.string()),
  year: z.number(),
  arxiv: z.string().optional(),
  pdf: z.string().optional(),
  code: z.string().optional(),
  license: z.string().optional(),
});

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    categories: z.array(z.enum(['study', 'ai', 'papers', 'projects'])),
    tags: z.array(z.string()).default([]),
    summary: z.string(),
    sources: z.array(source).min(1),
    papers: z.array(paper).default([]),
    cover: z.string().optional(),
    cover_credit: z.string().optional(),
    images: z.array(z.object({ src: z.string(), alt: z.string(), credit: z.string() })).default([]),
    // study-only
    phase: z.number().int().min(1).max(15).optional(),
    step: z.number().int().optional(),
    // key sentences the day page's attention bar marks
    highlights: z.array(z.string()).default([]),
    // paper model-card fields
    card: z
      .object({ task: z.string(), method: z.string(), data: z.string().optional(), result: z.string() })
      .optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
