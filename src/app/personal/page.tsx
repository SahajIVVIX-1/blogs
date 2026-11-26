import React from 'react';
import type { Metadata } from 'next';
import { allPosts, postUrl, fmtDate, readingTime } from '@/lib/posts';
import PersonalClient from './PersonalClient';

export const metadata: Metadata = {
  title: 'Personal &amp; <em>mindset</em> handbooks',
  description: 'Reflections on deep work, stoic equanimity, first-principles thinking, compounding engineering habits, and maintaining intellectual vitality.',
};

export default function PersonalPage() {
  const posts = allPosts()
    .filter((p) => p.data.categories.includes('personal'))
    .map((p) => ({
      id: p.id,
      slug: p.slug,
      title: p.data.title,
      dateStr: fmtDate(p.data.date),
      url: postUrl(p),
      summary: p.data.summary,
      tags: p.data.tags || [],
      readingTime: readingTime(p),
      number: p.number,
    }));

  return (
    <div className="space-y-10">
      {/* Editorial Header */}
      <section className="space-y-4">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400">
          <span>🌱</span>
          <span>Essays on Mastery, Focus & Systems</span>
        </div>
        <h1 className="text-3xl sm:text-5xl tracking-tight text-ink">
          Personal & Mindset Handbooks
        </h1>
        <p className="max-w-3xl text-sm leading-relaxed text-ink-muted sm:text-base">
          A dedicated compendium of personal essays, cognitive frameworks, and motivational models. Covering deep work protocols, stoic resilience in engineering crises, mental models for rapid learning, habit systems, and maintaining clarity in an era of information overload.
        </p>

        {/* Highlight Aphorism Banner */}
        <div className="mt-4 rounded-xl border border-amber-500/20 bg-gradient-to-r from-amber-500/5 via-surface to-amber-500/5 p-4 sm:p-5">
          <blockquote className="font-serif text-sm sm:text-base italic text-ink-muted">
            &ldquo;You have power over your mind - not outside events. Realize this, and you will find strength. The happiness of your life depends upon the quality of your thoughts.&rdquo;
          </blockquote>
          <div className="mt-2 text-xs font-medium text-amber-400">
            — Marcus Aurelius, <span className="italic">Meditations</span>
          </div>
        </div>
      </section>

      {/* Interactive Client Post Grid */}
      <PersonalClient posts={posts} />
    </div>
  );
}

