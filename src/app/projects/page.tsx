import React from 'react';
import type { Metadata } from 'next';
import { allPosts } from '@/lib/posts';
import PostList from '@/components/PostList';
import { PageHeader, SectionHead } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Engineering Projects & Systems',
  description: 'Verified implementations, production suites, open-source AI tooling, and systems software built by Sahaj Saliya.',
};

export default function ProjectsPage() {
  const posts = allPosts().filter((p) => p.data.categories.includes('projects'));

  return (
    <div>
      <PageHeader
        eyebrow="Implementations & codebases"
        title={<>Engineering <em>projects</em> &amp; systems</>}
        lede="End-to-end software implementations, autonomous agent swarms, computer vision pipelines, developer tooling and production architectures, designed and built by Sahaj Saliya."
      />
      <SectionHead kicker="All projects" title={<>Built, <em>documented</em>, shipped</>} sub={`${posts.length.toLocaleString()} entries, sorted chronologically.`} />
      <PostList posts={posts} />
    </div>
  );
}
