import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { allPosts } from '@/lib/posts';
import { PageHeader } from '@/components/ui';

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
    <div>
      <PageHeader
        eyebrow="Browse by topic"
        title={<>Technical <em>tags</em> &amp; topics</>}
        lede={`${sortedTags.length.toLocaleString()} tags cataloguing topics across machine learning, systems and AI.`}
      />
      <div className="flex flex-wrap gap-2.5">
        {sortedTags.map(([tag, count]) => (
          <Link key={tag} href={`/tags/${tag}/`} prefetch={false} className="tab">
            <span>#{tag}</span>
            <span className="n">{count}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
