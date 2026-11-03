import React from 'react';
import Link from 'next/link';
import { allPosts, stats as getStats, phaseProgress, byDay, dayKey, CATEGORY_LABEL } from '@/lib/posts';
import StatsStrip from '@/components/StatsStrip';
import PhaseGrid from '@/components/PhaseGrid';
import PostList from '@/components/PostList';
import Heatmap from '@/components/Heatmap';

export default function HomePage() {
  const posts = allPosts();
  const stats = getStats(posts);
  const phases = phaseProgress(posts);

  const studyPosts = posts.filter((p) => p.data.categories.includes('study'));
  const paperPosts = posts.filter((p) => p.data.categories.includes('papers'));
  const aiPosts = posts.filter((p) => p.data.categories.includes('ai'));
  const projectPosts = posts.filter((p) => p.data.categories.includes('projects'));

  // Prepare heatmap data
  const daysMap: Record<string, { count: number; categories: string[] }> = {};
  const dayGroups = byDay(posts);
  for (const [key, ps] of dayGroups.entries()) {
    daysMap[key] = {
      count: ps.length,
      categories: [...new Set(ps.flatMap((p) => p.data.categories.map((c) => CATEGORY_LABEL[c])))],
    };
  }

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-b from-surface to-canvas p-6 sm:p-10">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
          <span>✦</span>
          <span>Engineering Notebook & Research Log</span>
        </div>

        <h1 className="mt-4 font-serif text-3xl font-bold tracking-tight text-ink sm:text-5xl lg:text-6xl max-w-4xl leading-tight">
          Engineering in Public: From Core Math to Autonomous AI
        </h1>

        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-ink-muted sm:text-base">
          I&apos;m <strong>Sahaj Saliya</strong>, B.Tech ICT student at PDEU, Gandhinagar (2023–2027). This site is my day-by-day technical log: in-depth curriculum study notes with runnable code, arXiv research paper breakdowns, and verified AI release summaries.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/learning-path/"
            className="rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition-colors hover:bg-emerald-400"
          >
            Explore 15-Phase Curriculum →
          </Link>
          <Link
            href="/papers/"
            className="rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:border-emerald-500 hover:text-emerald-400"
          >
            Browse Papers ({paperPosts.length})
          </Link>
          <Link
            href="/study/"
            className="rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:border-indigo-500 hover:text-indigo-400"
          >
            Study Guides ({studyPosts.length})
          </Link>
          <Link
            href="/search/"
            className="rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:border-border hover:bg-subtle"
          >
            🔍 Instant Search
          </Link>
        </div>
      </section>

      {/* Activity Calendar Heatmap */}
      <Heatmap daysMap={daysMap} />

      {/* Metric Counters Strip */}
      <StatsStrip stats={stats} />

      {/* Curriculum Roadmap Preview */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div>
            <h2 className="font-serif text-2xl font-bold text-ink">Curriculum Roadmaps</h2>
            <p className="text-xs text-ink-muted">Step-by-step master tracks spanning 15 phases from Python to Agentic Systems.</p>
          </div>
          <Link
            href="/learning-path/"
            className="text-xs font-semibold text-emerald-400 hover:underline"
          >
            View All 15 Phases →
          </Link>
        </div>
        <PhaseGrid phases={phases} limit={6} />
      </section>

      {/* Recent Posts Stream */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div>
            <h2 className="font-serif text-2xl font-bold text-ink">Recent Technical Posts</h2>
            <p className="text-xs text-ink-muted">Every post links its verified public sources, math formulations, and code outputs.</p>
          </div>
          <Link
            href="/archive/"
            className="text-xs font-semibold text-emerald-400 hover:underline"
          >
            View Full Chronological Archive →
          </Link>
        </div>

        {/* Quick Filter Tabs */}
        <div className="flex flex-wrap gap-2 text-xs">
          <Link href="/archive/" className="rounded-lg border border-emerald-500/50 bg-emerald-500/10 px-3 py-1.5 font-semibold text-emerald-400">
            All Posts ({posts.length})
          </Link>
          <Link href="/study/" className="rounded-lg border border-border bg-surface px-3 py-1.5 text-ink-muted hover:border-indigo-500 hover:text-ink">
            📚 Study Notes ({studyPosts.length})
          </Link>
          <Link href="/papers/" className="rounded-lg border border-border bg-surface px-3 py-1.5 text-ink-muted hover:border-emerald-500 hover:text-ink">
            📄 Research Papers ({paperPosts.length})
          </Link>
          <Link href="/ai/" className="rounded-lg border border-border bg-surface px-3 py-1.5 text-ink-muted hover:border-amber-500 hover:text-ink">
            ⚡ AI Releases ({aiPosts.length})
          </Link>
        </div>

        <PostList posts={posts.slice(0, 12)} />

        <div className="text-center pt-4">
          <Link
            href="/archive/"
            className="inline-block rounded-xl border border-border bg-surface px-6 py-3 text-sm font-semibold text-ink transition-all hover:border-emerald-500 hover:text-emerald-400"
          >
            Browse All {posts.length.toLocaleString()} Articles in Archive →
          </Link>
        </div>
      </section>
    </div>
  );
}
