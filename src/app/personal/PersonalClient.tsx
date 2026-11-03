'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

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

  const handleTopicChange = (topicId: string) => {
    setActiveTopic(topicId);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-8">
      {/* Subtopic Filter Bar */}
      <div className="flex flex-wrap items-center gap-2">
        {SUBTOPICS.map((topic) => {
          const isActive = activeTopic === topic.id;
          return (
            <button
              key={topic.id}
              onClick={() => handleTopicChange(topic.id)}
              className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-medium transition-all ${
                isActive
                  ? 'border border-amber-500/50 bg-amber-500/15 text-amber-300 shadow-sm shadow-amber-500/10'
                  : 'border border-border/80 bg-surface/70 text-ink-muted hover:border-amber-500/30 hover:bg-surface hover:text-ink'
              }`}
            >
              <span>{topic.icon}</span>
              <span>{topic.label}</span>
            </button>
          );
        })}
      </div>

      {/* Search and Results Count */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 rounded-xl border border-border/80 bg-surface/50 p-3 sm:p-4 backdrop-blur-sm">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search mindset essays, mental models, focus rituals..."
            className="w-full rounded-lg border border-border bg-canvas/80 px-3.5 py-2 pl-9 text-xs text-ink placeholder-ink-muted focus:border-amber-500/60 focus:outline-none focus:ring-1 focus:ring-amber-500/30"
          />
          <span className="absolute left-3 top-2.5 text-xs text-ink-muted">🔍</span>
          {searchQuery && (
            <button
              onClick={() => { setSearchQuery(''); setCurrentPage(1); }}
              className="absolute right-2.5 top-2 text-xs text-ink-muted hover:text-ink"
            >
              ✕
            </button>
          )}
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-3 text-xs text-ink-muted">
          <span>
            Showing <strong className="text-amber-400 font-mono">{filteredPosts.length.toLocaleString()}</strong> of {posts.length.toLocaleString()} essays
          </span>
          <span className="hidden sm:inline text-border">|</span>
          <span className="font-mono text-[11px]">
            Page {validPage} of {totalPages}
          </span>
        </div>
      </div>

      {/* Grid of Essays */}
      {paginatedPosts.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {paginatedPosts.map((p) => (
            <article
              key={p.id}
              className="group relative flex flex-col justify-between rounded-xl border border-border/80 bg-surface/70 p-5 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-amber-500/40 hover:bg-surface hover:shadow-xl hover:shadow-amber-500/5"
            >
              <div>
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="inline-flex items-center gap-1 rounded-md border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 font-medium text-amber-400">
                    🌱 Personal & Mindset
                  </span>
                  {p.number && (
                    <span className="font-mono text-[11px] font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/30 rounded px-1.5 py-0.5">
                      #{String(p.number).padStart(4, '0')}
                    </span>
                  )}
                  <span className="ml-auto text-[11px] font-mono text-ink-muted">{p.readingTime}</span>
                </div>

                <h3 className="mt-3 font-serif text-lg font-bold leading-snug text-ink group-hover:text-amber-400 transition-colors">
                  <Link href={p.url} className="after:absolute after:inset-0">
                    {p.title}
                  </Link>
                </h3>

                {p.summary && (
                  <p className="mt-2.5 line-clamp-3 text-xs leading-relaxed text-ink-muted">
                    {p.summary}
                  </p>
                )}

                {p.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {p.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded border border-border/60 bg-canvas/60 px-1.5 py-0.5 text-[10px] text-ink-muted"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-border/60 pt-3 text-xs text-ink-muted">
                <span className="text-[11px] font-mono">{p.dateStr}</span>
                <span className="font-semibold text-amber-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5 text-xs">
                  Read Essay <span>→</span>
                </span>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-border p-12 text-center text-xs text-ink-muted">
          No essays found matching your criteria. Try resetting your search or topic filter.
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex flex-wrap items-center justify-center gap-2 pt-6">
          <button
            onClick={() => setCurrentPage(1)}
            disabled={validPage === 1}
            className="rounded-lg border border-border bg-surface px-2.5 py-1.5 text-xs font-medium text-ink-muted hover:text-ink disabled:opacity-40 disabled:hover:text-ink-muted"
          >
            « First
          </button>
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={validPage === 1}
            className="rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-medium text-ink-muted hover:text-ink disabled:opacity-40 disabled:hover:text-ink-muted"
          >
            ← Previous
          </button>

          <span className="px-3 text-xs font-mono text-ink-muted">
            Page <strong className="text-amber-400">{validPage}</strong> / {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={validPage === totalPages}
            className="rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-medium text-ink-muted hover:text-ink disabled:opacity-40 disabled:hover:text-ink-muted"
          >
            Next →
          </button>
          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={validPage === totalPages}
            className="rounded-lg border border-border bg-surface px-2.5 py-1.5 text-xs font-medium text-ink-muted hover:text-ink disabled:opacity-40 disabled:hover:text-ink-muted"
          >
            Last »
          </button>
        </div>
      )}
    </div>
  );
}

