import React from 'react';
import type { Metadata } from 'next';
import { allPosts } from '@/lib/posts';
import PostList from '@/components/PostList';

export const metadata: Metadata = {
  title: 'Engineering Projects & Systems',
  description: 'Verified implementations, production suites, open-source AI tooling, and systems software built by Sahaj Saliya.',
};

export default function ProjectsPage() {
  const posts = allPosts().filter((p) => p.data.categories.includes('projects'));

  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-400">
          <span>🛠️</span>
          <span>Implementations & Codebases</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-ink">
          Engineering Projects & Systems
        </h1>
        <p className="max-w-3xl text-sm leading-relaxed text-ink-muted sm:text-base">
          End-to-end software implementations, autonomous agent swarms, computer vision pipelines, developer tooling, and production architectures designed and built by Sahaj Saliya.
        </p>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between text-xs text-ink-muted">
          <h2 className="font-serif text-2xl font-bold text-ink">All Projects ({posts.length.toLocaleString()})</h2>
          <span>Sorted chronologically</span>
        </div>
        <PostList posts={posts} />
      </section>
    </div>
  );
}
