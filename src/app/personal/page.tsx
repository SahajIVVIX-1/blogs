import React from 'react';
import type { Metadata } from 'next';
import { allPosts, postUrl, fmtDate, readingTime } from '@/lib/posts';
import PersonalClient from './PersonalClient';
import { PageHeader } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Personal & Mindset Handbooks',
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
    <div>
      <PageHeader
        eyebrow="Essays on mastery, focus & systems"
        title={<>Personal &amp; <em>mindset</em> handbooks</>}
        lede="A compendium of personal essays, cognitive frameworks and motivational models: deep work protocols, stoic resilience in engineering crises, mental models for rapid learning, habit systems, and clarity in an era of information overload."
      />

      <figure className="mb-16 max-w-4xl border-l-2 border-accent pl-6 sm:pl-10">
        <blockquote className="text-[clamp(1.4rem,2.6vw,2.2rem)] italic leading-snug text-ink" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
          &ldquo;You have power over your mind &ndash; not outside events. Realize this, and you will find strength. The happiness of your life depends upon the quality of your thoughts.&rdquo;
        </blockquote>
        <figcaption className="mt-4 font-mono text-[11.5px] uppercase tracking-wider text-ink-muted">
          Marcus Aurelius &middot; Meditations
        </figcaption>
      </figure>

      <PersonalClient posts={posts} />
    </div>
  );
}
