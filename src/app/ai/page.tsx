import React from 'react';
import type { Metadata } from 'next';
import { allPosts } from '@/lib/posts';
import PostList from '@/components/PostList';
import { PageHeader, SectionHead } from '@/components/ui';

export const metadata: Metadata = {
  title: 'AI Releases & Industry Updates',
  description: 'Verified technical summaries of frontier foundation models, architectural shifts, and open-source library releases.',
};

export default function AiPage() {
  const posts = allPosts().filter((p) => p.data.categories.includes('ai'));

  return (
    <div>
      <PageHeader
        eyebrow="Model releases & announcements"
        title={<>AI industry <em>releases</em> &amp; updates</>}
        lede="Verified technical summaries of frontier foundation models, architectural shifts and open-source library releases from OpenAI, Anthropic, Google DeepMind, Meta AI, Mistral and Hugging Face."
      />
      <SectionHead
        kicker="Latest"
        title={<>Latest <em>releases</em></>}
        sub={`${posts.length.toLocaleString()} entries, dated by official announcement date.`}
      />
      <PostList posts={posts} />
    </div>
  );
}
