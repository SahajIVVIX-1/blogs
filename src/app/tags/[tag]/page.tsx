import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { allPosts } from '@/lib/posts';
import PostList from '@/components/PostList';

interface TagPageProps {
  params: Promise<{
    tag: string;
  }>;
}

export async function generateStaticParams() {
  const posts = allPosts();
  const tags = new Set<string>();

  for (const p of posts) {
    for (const t of p.data.tags) {
      if (t) tags.add(t);
    }
  }

  return [...tags].map((tag) => ({
    tag,
  }));
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  return {
    title: `#${decoded}`,
    description: `Articles and research papers cataloged under #${decoded}.`,
  };
}

export default async function TagDetailPage({ params }: TagPageProps) {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  const posts = allPosts().filter((p) => p.data.tags.includes(decoded));

  if (posts.length === 0) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <section className="space-y-2">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold text-emerald-400">
          <span>🏷️</span>
          <span>Topic Filter</span>
        </div>
        <h1 className="text-3xl sm:text-4xl text-ink">#{decoded}</h1>
        <p className="text-xs text-ink-muted">
          Showing {posts.length} verified technical article{posts.length > 1 ? 's' : ''} tagged with #{decoded}.
        </p>
      </section>

      <PostList posts={posts} />
    </div>
  );
}
