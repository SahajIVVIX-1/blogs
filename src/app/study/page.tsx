import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { allPosts, phaseProgress } from '@/lib/posts';
import PhaseGrid from '@/components/PhaseGrid';
import PostList from '@/components/PostList';

export const metadata: Metadata = {
  title: 'Study Notes & Engineering Guides',
  description: 'In-depth, topic-by-topic learning guides organized sequentially from foundational programming and mathematics to modern Agentic AI.',
};

export default function StudyPage() {
  const all = allPosts();
  const posts = all.filter((p) => p.data.categories.includes('study') || p.data.categories.includes('projects'));
  const phases = phaseProgress(all);

  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-400">
          <span>📚</span>
          <span>Structured Curriculum Tracks</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-ink">
          Study Notes & Engineering Guides
        </h1>
        <p className="max-w-3xl text-sm leading-relaxed text-ink-muted sm:text-base">
          In-depth, topic-by-topic learning guides organized sequentially from foundational programming and mathematics to modern Agentic AI. Every study guide includes conceptual explanations, mathematical derivations, runnable code snippets, and verified outputs.
        </p>
        <div>
          <Link
            href="/learning-path/"
            className="inline-block rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 transition-colors hover:bg-emerald-400"
          >
            View Vertical Learning Roadmap →
          </Link>
        </div>
      </section>

      {/* Phase Overview Grid */}
      <section className="space-y-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-ink">Curriculum Tracks (15 Phases)</h2>
          <p className="text-xs text-ink-muted">Click any track to explore its sequential lessons and topics.</p>
        </div>
        <PhaseGrid phases={phases} />
      </section>

      {/* Guides Feed */}
      <section className="space-y-6">
        <div>
          <h2 className="font-serif text-2xl font-bold text-ink">All Study Guides ({posts.length.toLocaleString()})</h2>
          <p className="text-xs text-ink-muted">Chronological stream of technical study notes across all phases.</p>
        </div>
        <PostList posts={posts} />
      </section>
    </div>
  );
}
