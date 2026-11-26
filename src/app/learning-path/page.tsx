import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { allPosts, phaseProgress, postUrl, fmtDate } from '@/lib/posts';
import { PageHeader, Icon, Chip } from '@/components/ui';
import PhaseHashOpen from '@/components/PhaseHashOpen';

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
    <div>
      <PhaseHashOpen />
      <PageHeader
        eyebrow="15-phase master curriculum"
        title={<>Learning path &amp; technical <em>roadmap</em></>}
        lede="A rigorous sequence of 15 curriculum tracks covering software engineering, statistics, classical machine learning, deep neural networks, computer vision, transformers, LLMs and agentic workflows."
      />

      {/* Overall progress */}
      <div className="mb-16 max-w-3xl">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <p className="eyebrow">Overall progress</p>
          <p className="font-mono text-sm text-ink"><b className="font-medium text-accent">{totalDone.toLocaleString()}</b> / {total.toLocaleString()} topics &middot; {overallPct}%</p>
        </div>
        <div className="bar mt-4" style={{ height: 3 }}><i style={{ width: `${overallPct}%` }} /></div>
        <p className="mt-3 text-sm text-ink-muted">From 4 August 2023 to today. Guides are published continuously following verified academic curricula.</p>
      </div>

      {/* Phases */}
      <div className="border-t border-border">
        {phases.map((ph) => {
          const pct = Math.min(100, Math.round((ph.done / Math.max(1, ph.total)) * 100));
          const isComplete = pct === 100;

          return (
            <section key={ph.n} id={`phase-${ph.n}`} className="border-b border-border py-8 sm:py-10">
              <div className="grid gap-6 md:grid-cols-[4rem_minmax(0,1fr)_minmax(220px,320px)] md:gap-10">
                <span className="pt-2 font-mono text-xs tracking-wider text-ink-muted">{String(ph.n).padStart(2, '0')}</span>
                <div>
                  <h2 className="text-[clamp(1.5rem,2.6vw,2.2rem)] leading-tight">{ph.name}</h2>
                  <p className="mt-2 font-mono text-[11.5px] text-ink-muted">Phase {ph.n} &middot; {fmtDate(ph.from)} &ndash; {fmtDate(ph.to)}</p>
                </div>
                <div>
                  <div className="bar"><i style={{ width: `${pct}%` }} /></div>
                  <div className="bar-meta">
                    <span>{ph.done} / {ph.total} guides</span>
                    <b className="inline-flex items-center gap-1.5">{isComplete && <Icon name="check" size={12} />}{isComplete ? 'Completed' : `${pct}%`}</b>
                  </div>
                </div>
              </div>

              <details className="group mt-6 md:ml-[calc(4rem+2.5rem)]">
                <summary className="btn btn-ghost btn-sm inline-flex list-none select-none [&::-webkit-details-marker]:hidden">
                  <span>Topics ({ph.topics.length}) &middot; Guides ({ph.posts.length})</span>
                  <Icon name="chevron" size={14} className="transition-transform group-open:rotate-180" />
                </summary>

                <ol className="mt-5">
                  {ph.topics.map((topic, idx) => {
                    const stepNum = idx + 1;
                    const post = ph.posts.find((p) => p.data.step === stepNum);
                    return (
                      <li key={idx} className="flex flex-col gap-1 border-t border-border/60 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                        <div className="flex items-baseline gap-4">
                          <span className="w-8 shrink-0 font-mono text-[11.5px] text-ink-muted">{String(stepNum).padStart(2, '0')}</span>
                          {post ? (
                            <Link href={postUrl(post)} prefetch={false} className="tok-link text-[15px] text-ink">{topic}</Link>
                          ) : (
                            <span className="text-[15px] text-ink-muted">{topic}</span>
                          )}
                        </div>
                        <div className="pl-12 sm:pl-0">
                          {post ? (
                            <Link href={postUrl(post)} prefetch={false} className="lnk">Read guide<Icon name="arrow" size={11} /></Link>
                          ) : (
                            <Chip>In progress</Chip>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </details>
            </section>
          );
        })}
      </div>
    </div>
  );
}
