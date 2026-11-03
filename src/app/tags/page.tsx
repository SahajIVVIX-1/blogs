import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { allPosts } from '@/lib/posts';

export const metadata: Metadata = {
  title: 'All Topics & Tags',
  description: 'Browse articles and research papers by technical domain tags and topics.',
};

export default function TagsIndexPage() {
  const posts = allPosts();
  const counts = new Map<string, number>();

  for (const p of posts) {
    for (const t of p.data.tags) {
      counts.set(t, (counts.get(t) ?? 0) + 1);
    }
  }

  const sortedTags = [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));

  return (
    <div className="space-y-8">
      <section className="space-y-2">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-ink">Technical Tags & Topics</h1>
        <p className="text-xs text-ink-muted">
          Showing {sortedTags.length.toLocaleString()} technical tags cataloging topics across machine learning, systems, and AI.
        </p>
      </section>

      <div className="flex flex-wrap gap-2.5">
        {sortedTags.map(([tag, count]) => (
          <Link
            key={tag}
            href={`/tags/${tag}/`}
            className="flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs text-ink transition-colors hover:border-emerald-500 hover:text-emerald-400"
          >
            <span>#{tag}</span>
            <span className="rounded bg-canvas px-1.5 py-0.5 text-[10px] text-ink-muted font-mono">{count}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
