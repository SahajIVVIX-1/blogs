import React from 'react';
import type { Metadata } from 'next';
import { allPosts, phaseProgress } from '@/lib/posts';
import PhaseGrid from '@/components/PhaseGrid';
import PostList from '@/components/PostList';
import { Btn, PageHeader, SectionHead } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Study Notes & Engineering Guides',
  description: 'In-depth, topic-by-topic learning guides organized sequentially from foundational programming and mathematics to modern Agentic AI.',
};

export default function StudyPage() {
  const all = allPosts();
  const posts = all.filter((p) => p.data.categories.includes('study') || p.data.categories.includes('projects'));
  const phases = phaseProgress(all);

  return (
    <div>
      <PageHeader
        eyebrow="Structured curriculum tracks"
        title={<>Study notes &amp; engineering <em>guides</em></>}
        lede="In-depth, topic-by-topic guides organised sequentially from foundational programming and mathematics to modern agentic AI. Every guide includes conceptual explanations, derivations, runnable code and verified outputs."
        actions={<Btn href="/learning-path/" icon="map">Vertical learning roadmap</Btn>}
      />

      <section>
        <SectionHead kicker="Tracks" title={<>Fifteen <em>phases</em></>} sub="Open any track to explore its sequential lessons and topics." />
        <PhaseGrid phases={phases} />
      </section>

      <section className="section">
        <SectionHead
          kicker="All guides"
          title={<>Every study <em>guide</em></>}
          sub={`${posts.length.toLocaleString()} notes, newest first, across all phases.`}
        />
        <PostList posts={posts} />
      </section>
    </div>
  );
}
