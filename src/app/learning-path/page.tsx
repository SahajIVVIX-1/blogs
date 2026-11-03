import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { allPosts, phaseProgress, postUrl, fmtDate } from '@/lib/posts';

export const metadata: Metadata = {
  title: 'Curriculum Roadmap',
  description: 'Master 15-phase AI curriculum covering mathematics, ML, deep learning, vision, NLP, transformers, LLMs, and autonomous systems.',
};

export default function LearningPathPage() {
  const posts = allPosts();
  const phases = phaseProgress(posts);
  const totalDone = phases.reduce((n, p) => n + p.done, 0);
  const total = phases.reduce((n, p) => n + p.total, 0);
  const overallPct = Math.min(100, Math.round((totalDone / Math.max(1, total)) * 100));

  return (
    <div className="space-y-10">
      {/* Hero Header */}
      <section className="space-y-4">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-400">
          <span>🗺️</span>
          <span>15-Phase Master Curriculum</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-ink">
          Learning Path & Technical Roadmap
        </h1>
        <p className="max-w-3xl text-sm leading-relaxed text-ink-muted sm:text-base">
          A rigorous sequence of 15 curriculum tracks covering software engineering, statistics, classical machine learning, deep neural networks, computer vision, transformers, LLMs, and agentic workflows.
        </p>

        {/* Overall Progress Meter */}
        <div className="mt-6 max-w-xl rounded-xl border border-border bg-surface p-5 shadow-sm">
          <div className="flex items-center justify-between text-sm font-bold text-ink">
            <span>Overall Curriculum Progress</span>
            <span className="text-emerald-400 font-mono">{totalDone} / {total} Topics ({overallPct}%)</span>
          </div>
          <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-border">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500"
              style={{ width: `${overallPct}%` }}
            />
          </div>
          <p className="mt-3 text-xs text-ink-muted">
            From 4 August 2023 to today. Study guides are published continuously following verified academic curricula.
          </p>
        </div>
      </section>

      {/* Detailed Phase Roadmap */}
      <section className="space-y-6">
        {phases.map((ph) => {
          const pct = Math.min(100, Math.round((ph.done / Math.max(1, ph.total)) * 100));
          const isComplete = pct === 100;

          return (
            <div
              key={ph.n}
              id={`phase-${ph.n}`}
              className="rounded-xl border border-border bg-surface p-6 shadow-sm transition-all hover:border-emerald-500/30"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="rounded-md border border-indigo-500/30 bg-indigo-500/10 px-2 py-0.5 font-semibold text-indigo-400">
                      Phase {ph.n}
                    </span>
                    <span className="text-ink-muted">{fmtDate(ph.from)} – {fmtDate(ph.to)}</span>
                  </div>
                  <h2 className="mt-2 font-serif text-xl sm:text-2xl font-bold text-ink">
                    {ph.name}
                  </h2>
                </div>
                <div className="sm:text-right">
                  <div className="font-mono text-sm font-bold text-emerald-400">{ph.done} / {ph.total} guides</div>
                  <div className="text-xs text-ink-muted">{isComplete ? '✓ Completed' : `${pct}% completed`}</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="my-4 h-1.5 w-full overflow-hidden rounded-full bg-border">
                <div
                  className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                  style={{ width: `${pct}%` }}
                />
              </div>

              {/* Topics List Details Accordion */}
              <details
                open={ph.n >= 11}
                className="group mt-4 rounded-lg border border-border bg-canvas/70 p-4 transition-colors"
              >
                <summary className="cursor-pointer font-medium text-xs text-ink-muted hover:text-ink select-none flex items-center justify-between">
                  <span>View Curriculum Topics ({ph.topics.length}) & Published Guides ({ph.posts.length})</span>
                  <span className="text-xs group-open:rotate-180 transition-transform">▼</span>
                </summary>

                <div className="mt-4 grid grid-cols-1 gap-2 pt-2 border-t border-border/50">
                  {ph.topics.map((topic, idx) => {
                    const stepNum = idx + 1;
                    const post = ph.posts.find((p) => p.data.step === stepNum);

                    return (
                      <div
                        key={idx}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-lg border border-border/70 bg-surface/80 px-3.5 py-2 text-xs transition-colors hover:border-emerald-500/40"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="font-mono text-ink-muted w-7 text-right">#{String(stepNum).padStart(2, '0')}</span>
                          {post ? (
                            <Link href={postUrl(post)} className="font-medium text-ink hover:text-emerald-400">
                              {topic}
                            </Link>
                          ) : (
                            <span className="text-ink-muted">{topic}</span>
                          )}
                        </div>

                        <div>
                          {post ? (
                            <Link
                              href={postUrl(post)}
                              className="font-medium text-emerald-400 hover:underline"
                            >
                              Read Guide →
                            </Link>
                          ) : (
                            <span className="rounded bg-subtle px-1.5 py-0.5 text-[10px] text-ink-muted">In Progress</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </details>
            </div>
          );
        })}
      </section>
    </div>
  );
}
