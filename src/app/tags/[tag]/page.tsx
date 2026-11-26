import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { allPosts } from '@/lib/posts';
import PostList from '@/components/PostList';
import { Btn, PageHeader } from '@/components/ui';

interface TagPageProps {
  params: Promise<{
    tag: string;
  }>;
}

export async function generateStaticParams() {
  const posts = allPosts();
  const tags = new Set<string>();

  for (const p of posts) {
    for (const t of p.data.tags) {
      if (t) tags.add(t);
    }
  }

  return [...tags].map((tag) => ({
    tag,
  }));
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  return {
    title: `#${decoded}`,
    description: `Articles and research papers cataloged under #${decoded}.`,
  };
}

export default async function TagDetailPage({ params }: TagPageProps) {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  const posts = allPosts().filter((p) => p.data.tags.includes(decoded));

  if (posts.length === 0) {
    notFound();
  }

  return (
    <div>
      <PageHeader
        eyebrow="Topic filter"
        title={<>#{decoded}</>}
        lede={`${posts.length} verified technical article${posts.length > 1 ? 's' : ''} tagged with #${decoded}.`}
        actions={<Btn href="/tags/" variant="ghost" icon="tag" trailing={null}>All tags</Btn>}
      />
      <PostList posts={posts} />
    </div>
  );
}
