import React from 'react';
import Link from 'next/link';
import { allPosts, stats as getStats, phaseProgress, byDay, CATEGORY_LABEL, postUrl, fmtDate, formatBlogNo, readingTime } from '@/lib/posts';
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
  const personalPosts = posts.filter((p) => p.data.categories.includes('personal'));

  // Featured personal essay for the editorial spotlight
  const featuredPersonal = personalPosts[0];

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
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl border border-border/80 bg-gradient-to-b from-surface via-surface/80 to-canvas p-6 sm:p-12 shadow-2xl shadow-emerald-500/5">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            <span>THE INTELLECTUAL & ENGINEERING COMPENDIUM</span>
          </div>

          <h1 className="mt-5 font-serif text-3xl font-bold tracking-tight text-ink sm:text-5xl lg:text-6xl max-w-4xl leading-[1.12]">
            Frontier AI, Core Mathematics & The Mindset of Mastery
          </h1>

          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-ink-muted sm:text-base">
            I&apos;m <strong>Sahaj Saliya</strong>, B.Tech ICT student at PDEU, Gandhinagar (2023–2027). This site documents my daily technical journey: sequential curriculum handbooks with verified math derivations and runnable code, arXiv research paper breakdowns, and industry AI releases.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/learning-path/"
              className="rounded-xl bg-emerald-500 px-5 py-3 text-xs font-bold text-slate-950 transition-all hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/20"
            >
              15-Phase Curriculum Roadmap →
            </Link>
            {personalPosts.length > 0 && (
              <Link
                href="/personal/"
                className="rounded-xl border border-amber-500/40 bg-amber-500/10 px-5 py-3 text-xs font-semibold text-amber-300 transition-all hover:bg-amber-500/20 hover:border-amber-500"
              >
                🌱 Personal & Mindset ({personalPosts.length.toLocaleString()})
              </Link>
            )}
            <Link
              href="/papers/"
              className="rounded-xl border border-border/80 bg-surface px-5 py-3 text-xs font-semibold text-ink transition-all hover:border-emerald-500 hover:text-emerald-400"
            >
              📄 Research Papers ({paperPosts.length.toLocaleString()})
            </Link>
            <Link
              href="/study/"
              className="rounded-xl border border-border/80 bg-surface px-5 py-3 text-xs font-semibold text-ink transition-all hover:border-indigo-500 hover:text-indigo-400"
            >
              📚 Study Guides ({studyPosts.length.toLocaleString()})
            </Link>
          </div>
        </div>
      </section>

      {/* Metric Counters Strip */}
      <StatsStrip stats={stats} />

      {/* Category Exploration Showcase */}
      <section className="space-y-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-ink">Compendium Domains</h2>
          <p className="text-xs text-ink-muted">Explore structured tracks across foundational science, state-of-the-art AI, and cognitive mastery.</p>
        </div>

        <div className={`grid grid-cols-1 gap-4 sm:grid-cols-2 ${personalPosts.length > 0 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
          <Link
            href="/learning-path/"
            className="group relative overflow-hidden rounded-2xl border border-indigo-500/30 bg-surface/80 p-6 transition-all hover:-translate-y-1 hover:border-indigo-500 hover:shadow-xl hover:shadow-indigo-500/10"
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl">🗺️</span>
              <span className="rounded-md border border-indigo-500/30 bg-indigo-500/10 px-2 py-0.5 text-xs font-semibold text-indigo-400">
                15 Phases
              </span>
            </div>
            <h3 className="mt-4 font-serif text-lg font-bold text-ink group-hover:text-indigo-400 transition-colors">
              Curriculum Roadmap
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-ink-muted">
              Sequential guide spanning Python internals, linear algebra, calculus, PyTorch, vision, transformers, and autonomous agent swarms.
            </p>
            <div className="mt-4 text-xs font-semibold text-indigo-400 flex items-center gap-1">
              View Path <span>→</span>
            </div>
          </Link>

          {personalPosts.length > 0 && (
            <Link
              href="/personal/"
              className="group relative overflow-hidden rounded-2xl border border-amber-500/30 bg-surface/80 p-6 transition-all hover:-translate-y-1 hover:border-amber-500 hover:shadow-xl hover:shadow-amber-500/10"
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl">🌱</span>
                <span className="rounded-md border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-xs font-semibold text-amber-400">
                  {personalPosts.length.toLocaleString()} Essays
                </span>
              </div>
              <h3 className="mt-4 font-serif text-lg font-bold text-ink group-hover:text-amber-400 transition-colors">
                Personal & Mindset
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-ink-muted">
                Deep work rituals, stoic equanimity under technical crises, mental models, atomic habits, and lifelong compounding systems.
              </p>
              <div className="mt-4 text-xs font-semibold text-amber-400 flex items-center gap-1">
                Read Essays <span>→</span>
              </div>
            </Link>
          )}

          <Link
            href="/papers/"
            className="group relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-surface/80 p-6 transition-all hover:-translate-y-1 hover:border-emerald-500 hover:shadow-xl hover:shadow-emerald-500/10"
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl">📄</span>
              <span className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-400">
                {paperPosts.length.toLocaleString()} Digests
              </span>
            </div>
            <h3 className="mt-4 font-serif text-lg font-bold text-ink group-hover:text-emerald-400 transition-colors">
              arXiv Paper Digests
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-ink-muted">
              Rigorous summaries of seminal and daily papers from arXiv and Hugging Face, detailing architectures, equations, and benchmarks.
            </p>
            <div className="mt-4 text-xs font-semibold text-emerald-400 flex items-center gap-1">
              Browse Papers <span>→</span>
            </div>
          </Link>

          <Link
            href="/ai/"
            className="group relative overflow-hidden rounded-2xl border border-purple-500/30 bg-surface/80 p-6 transition-all hover:-translate-y-1 hover:border-purple-500 hover:shadow-xl hover:shadow-purple-500/10"
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl">⚡</span>
              <span className="rounded-md border border-purple-500/30 bg-purple-500/10 px-2 py-0.5 text-xs font-semibold text-purple-400">
                {aiPosts.length.toLocaleString()} Releases
              </span>
            </div>
            <h3 className="mt-4 font-serif text-lg font-bold text-ink group-hover:text-purple-400 transition-colors">
              AI Industry Releases
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-ink-muted">
              Factual breakdowns of frontier foundation models, weights releases, and system evaluations from leading research labs.
            </p>
            <div className="mt-4 text-xs font-semibold text-purple-400 flex items-center gap-1">
              Track Releases <span>→</span>
            </div>
          </Link>
        </div>
      </section>

      {/* Featured Mindset Essay Spotlight */}
      {featuredPersonal && (
        <section className="relative overflow-hidden rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-surface to-surface p-6 sm:p-8 backdrop-blur-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
                <span>✦ SPOTLIGHT ESSAY ON MINDSET & MASTERY</span>
                {featuredPersonal.number && (
                  <>
                    <span>·</span>
                    <span className="font-mono">#{formatBlogNo(featuredPersonal.number)}</span>
                  </>
                )}
                <span>·</span>
                <span className="font-mono">{fmtDate(featuredPersonal.data.date)}</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-ink hover:text-amber-400 transition-colors">
                <Link href={postUrl(featuredPersonal)}>{featuredPersonal.data.title}</Link>
              </h3>
              <p className="max-w-3xl text-xs sm:text-sm leading-relaxed text-ink-muted">
                {featuredPersonal.data.summary}
              </p>
            </div>
            <Link
              href={postUrl(featuredPersonal)}
              className="shrink-0 rounded-xl bg-amber-500 px-4 py-2.5 text-xs font-bold text-slate-950 transition-colors hover:bg-amber-400"
            >
              Read Full Essay →
            </Link>
          </div>
        </section>
      )}

      {/* Activity Calendar Heatmap */}
      <Heatmap daysMap={daysMap} />

      {/* Curriculum Roadmap Preview */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div>
            <h2 className="font-serif text-2xl font-bold text-ink">Curriculum Tracks (15 Phases)</h2>
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

      {/* Recent Dispatches Stream */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div>
            <h2 className="font-serif text-2xl font-bold text-ink">Latest Technical & Mindset Dispatches</h2>
            <p className="text-xs text-ink-muted">Every entry links verified primary sources, derivations, and actionable takeaways.</p>
          </div>
          <Link
            href="/archive/"
            className="text-xs font-semibold text-emerald-400 hover:underline"
          >
            View Full Archive ({posts.length.toLocaleString()}) →
          </Link>
        </div>

        {/* Quick Filter Tabs */}
        <div className="flex flex-wrap gap-2 text-xs">
          <Link href="/archive/" className="rounded-xl border border-emerald-500/50 bg-emerald-500/10 px-3.5 py-1.5 font-semibold text-emerald-400">
            All Articles ({posts.length.toLocaleString()})
          </Link>
          {personalPosts.length > 0 && (
            <Link href="/personal/" className="rounded-xl border border-amber-500/30 bg-surface px-3.5 py-1.5 text-ink-muted hover:border-amber-500 hover:text-amber-400">
              🌱 Personal & Mindset ({personalPosts.length.toLocaleString()})
            </Link>
          )}
          <Link href="/study/" className="rounded-xl border border-border bg-surface px-3.5 py-1.5 text-ink-muted hover:border-indigo-500 hover:text-ink">
            📚 Study Notes ({studyPosts.length.toLocaleString()})
          </Link>
          <Link href="/papers/" className="rounded-xl border border-border bg-surface px-3.5 py-1.5 text-ink-muted hover:border-emerald-500 hover:text-ink">
            📄 Research Papers ({paperPosts.length.toLocaleString()})
          </Link>
          <Link href="/ai/" className="rounded-xl border border-border bg-surface px-3.5 py-1.5 text-ink-muted hover:border-purple-500 hover:text-ink">
            ⚡ AI Releases ({aiPosts.length.toLocaleString()})
          </Link>
        </div>

        <PostList posts={posts.slice(0, 12)} />

        <div className="text-center pt-6">
          <Link
            href="/archive/"
            className="inline-block rounded-xl border border-border bg-surface px-6 py-3 text-xs font-semibold text-ink transition-all hover:border-emerald-500 hover:text-emerald-400 hover:shadow-lg"
          >
            Browse All {posts.length.toLocaleString()} Articles in Complete Archive →
          </Link>
        </div>
      </section>
    </div>
  );
}
