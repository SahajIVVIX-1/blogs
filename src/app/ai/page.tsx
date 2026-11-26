import React from 'react';
import type { Metadata } from 'next';
import { allPosts } from '@/lib/posts';
import PostList from '@/components/PostList';

export const metadata: Metadata = {
  title: 'AI Releases & Industry Updates',
  description: 'Verified technical summaries of frontier foundation models, architectural shifts, and open-source library releases.',
};

export default function AiPage() {
  const posts = allPosts().filter((p) => p.data.categories.includes('ai'));

  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400">
          <span>⚡</span>
          <span>Model Releases & Announcements</span>
        </div>
        <h1 className="text-3xl sm:text-5xl tracking-tight text-ink">
          AI industry <em>releases</em> &amp; updates
        </h1>
        <p className="max-w-3xl text-sm leading-relaxed text-ink-muted sm:text-base">
          Verified technical summaries of frontier foundation models, architectural shifts, and open-source library releases from OpenAI, Anthropic, Google DeepMind, Meta AI, Mistral, and Hugging Face.
        </p>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between text-xs text-ink-muted">
          <h2 className="text-2xl text-ink">Latest Releases ({posts.length.toLocaleString()})</h2>
          <span>Dated by official announcement date</span>
        </div>
        <PostList posts={posts} />
      </section>
    </div>
  );
}
