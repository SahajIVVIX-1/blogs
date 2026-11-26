'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Icon, Chip } from '@/components/ui';

interface PersonalPostSummary {
  id: string;
  slug: string;
  title: string;
  dateStr: string;
  url: string;
  summary: string;
  tags: string[];
  readingTime: string;
  number?: number;
}

interface PersonalClientProps {
  posts: PersonalPostSummary[];
}

const SUBTOPICS = [
  { id: 'all', label: 'All Essays', icon: '🌱' },
  { id: 'deep-work', label: 'Deep Work & Focus', icon: '🎯', tags: ['deep-work', 'focus', 'flow-state', 'digital-minimalism'] },
  { id: 'stoicism', label: 'Stoic Resilience', icon: '🏛️', tags: ['stoicism', 'resilience', 'equanimity', 'dichotomy-of-control'] },
  { id: 'habits', label: 'Habits & Systems', icon: '⚡', tags: ['atomic-habits', 'consistency', 'daily-systems', 'compounding'] },
  { id: 'mental-models', label: 'Mental Models', icon: '🧠', tags: ['mental-models', 'first-principles', 'feynman-technique', 'inversion'] },
  { id: 'craftsmanship', label: 'Engineering Craft', icon: '🛠️', tags: ['craftsmanship', 'code-as-art', 'pragmatism', 'architecture'] },
  { id: 'burnout', label: 'Burnout & Recovery', icon: '🔋', tags: ['burnout-prevention', 'imposter-syndrome', 'rest-recovery', 'grit'] },
];

const POSTS_PER_PAGE = 24;

export default function PersonalClient({ posts }: PersonalClientProps) {
  const [activeTopic, setActiveTopic] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPosts = useMemo(() => {
    let result = posts;

    // Filter by topic
    if (activeTopic !== 'all') {
      const topicConfig = SUBTOPICS.find((t) => t.id === activeTopic);
      if (topicConfig && topicConfig.tags) {
        result = result.filter((p) =>
          p.tags.some((t) => topicConfig.tags.includes(t.toLowerCase()))
        );
      }
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.summary.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    return result;
  }, [posts, activeTopic, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  const validPage = Math.min(currentPage, totalPages);
  const startIndex = (validPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  const goToPage = (p: number) => {
    setCurrentPage(p);
    try {
      window.scrollTo({ top: 350, behavior: 'smooth' });
    } catch {}
  };

  const handleTopicChange = (topicId: string) => {
    setActiveTopic(topicId);
    goToPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-8">
      {/* Subtopic filter */}
      <div className="tabs" style={{ marginBottom: 0 }}>
        {SUBTOPICS.map((topic) => (
          <button
            key={topic.id}
            onClick={() => handleTopicChange(topic.id)}
            className={`tab${activeTopic === topic.id ? ' is-on' : ''}`}
            aria-pressed={activeTopic === topic.id}
          >
            {topic.label}
          </button>
        ))}
      </div>

      {/* Search and results count */}
      <div className="flex flex-col items-stretch justify-between gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1 sm:max-w-xl">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted"><Icon name="search" size={15} /></span>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search essays, mental models, focus rituals"
            aria-label="Search essays"
            className="h-11 w-full rounded-full border border-rule-2 bg-transparent pl-11 pr-10 text-[15px] text-ink placeholder-ink-muted outline-none transition-colors focus:border-accent"
          />
          {searchQuery && (
            <button
              onClick={() => { setSearchQuery(''); setCurrentPage(1); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink"
              aria-label="Clear search"
            >
              &#10005;
            </button>
          )}
        </div>
        <p className="font-mono text-[11.5px] uppercase tracking-wider text-ink-muted">
          Showing <b className="font-medium text-accent">{filteredPosts.length.toLocaleString()}</b> of {posts.length.toLocaleString()} essays &middot; page {validPage}/{totalPages}
        </p>
      </div>

      {/* Essays */}
      {paginatedPosts.length > 0 ? (
        <div className="posts">
          {paginatedPosts.map((p) => (
            <article key={p.id} className="post-row">
              <div className="post-date">
                {p.dateStr}
                {p.number ? <span className="block text-ink-muted/70">#{String(p.number).padStart(4, '0')}</span> : null}
              </div>
              <div>
                <h3 className="post-title">
                  <Link href={p.url} prefetch={false}>{p.title}</Link>
                </h3>
                {p.summary && <p className="post-sum">{p.summary}</p>}
              </div>
              <div className="post-tags">
                <Chip accent><Icon name="leaf" size={12} />Mindset</Chip>
                {p.tags.slice(0, 2).map((tag) => <Chip key={tag}>#{tag}</Chip>)}
                <Chip><Icon name="clock" size={12} />{p.readingTime}</Chip>
              </div>
              <span className="post-go" aria-hidden="true"><Icon name="arrow" size={15} /></span>
            </article>
          ))}
        </div>
      ) : posts.length === 0 ? (
        <div className="border-y border-border py-16 text-center">
          <p className="eyebrow justify-center">Coming soon</p>
          <h3 className="mt-5 text-3xl">Essays under <em>preparation</em></h3>
          <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-ink-muted">
            Personal essays on deep work, stoic resilience and mental models are being curated and will be published alongside the engineering handbooks.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/study/" prefetch={false} className="btn btn-primary">Browse study guides <Icon name="arrow" size={14} /></Link>
            <Link href="/papers/" prefetch={false} className="btn btn-ghost">Explore papers</Link>
          </div>
        </div>
      ) : (
        <div className="border-y border-dashed border-border py-14 text-center text-[15px] text-ink-muted">
          No essays match your search. Try resetting the search or topic filter.
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-wrap items-center justify-center gap-2 pt-8">
          <button onClick={() => goToPage(1)} disabled={validPage === 1} className="btn btn-ghost btn-sm disabled:opacity-40">First</button>
          <button onClick={() => goToPage(Math.max(1, validPage - 1))} disabled={validPage === 1} className="btn btn-ghost btn-sm disabled:opacity-40">Previous</button>
          <span className="px-3 font-mono text-xs text-ink-muted">
            Page <b className="font-medium text-accent">{validPage}</b> / {totalPages}
          </span>
          <button onClick={() => goToPage(Math.min(totalPages, validPage + 1))} disabled={validPage === totalPages} className="btn btn-ghost btn-sm disabled:opacity-40">Next</button>
          <button onClick={() => goToPage(totalPages)} disabled={validPage === totalPages} className="btn btn-ghost btn-sm disabled:opacity-40">Last</button>
        </div>
      )}
    </div>
  );
}

