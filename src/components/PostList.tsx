import React from 'react';
import Link from 'next/link';
import { postUrl, fmtDate, formatBlogNo, CATEGORY_LABEL, CATEGORY_ICON, readingTime, phaseOf, type Post } from '@/lib/constants';

interface PostListProps {
  posts: Post[];
  showDate?: boolean;
}

export default function PostList({ posts, showDate = true }: PostListProps) {
  const getBadgeClass = (cat: string) => {
    switch (cat) {
      case 'study':
        return 'border-indigo-500/30 bg-indigo-500/10 text-indigo-400';
      case 'ai':
        return 'border-purple-500/30 bg-purple-500/10 text-purple-400';
      case 'papers':
        return 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400';
      case 'projects':
        return 'border-cyan-500/30 bg-cyan-500/10 text-cyan-400';
      case 'personal':
        return 'border-amber-500/30 bg-amber-500/10 text-amber-400';
      default:
        return 'border-border bg-subtle text-ink-muted';
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((p) => {
        const cat = p.data.categories[0] ?? 'study';
        const phase = phaseOf(p.data.phase);
        const read = readingTime(p);
        const url = postUrl(p);

        return (
          <article
            key={p.id}
            className="group relative flex flex-col justify-between rounded-xl border border-border/80 bg-surface/70 p-5 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-500/40 hover:bg-surface hover:shadow-xl hover:shadow-emerald-500/5"
          >
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 font-medium ${getBadgeClass(cat)}`}>
                  {CATEGORY_ICON[cat]} {CATEGORY_LABEL[cat]}
                </span>
                {p.number && (
                  <span className="font-mono text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 rounded px-1.5 py-0.5">
                    #{formatBlogNo(p.number)}
                  </span>
                )}
                {phase && (
                  <span className="rounded-md border border-border bg-canvas/80 px-2 py-0.5 text-[11px] text-ink-muted">
                    Phase {phase.n}
                  </span>
                )}
                <span className="ml-auto text-[11px] text-ink-muted font-mono">{read}</span>
              </div>

              <h3 className="mt-3 font-serif text-lg font-bold leading-snug text-ink group-hover:text-emerald-400 transition-colors">
                <Link href={url} className="after:absolute after:inset-0">
                  {p.data.title}
                </Link>
              </h3>

              {p.data.summary && (
                <p className="mt-2.5 line-clamp-3 text-xs leading-relaxed text-ink-muted">
                  {p.data.summary}
                </p>
              )}
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-border/60 pt-3 text-xs text-ink-muted">
              <div className="text-[11px]">
                {showDate && <span>{fmtDate(p.data.date)}</span>}
                {p.data.sources.length > 0 && (
                  <span className="text-ink-muted/70"> · {p.data.sources.length} src</span>
                )}
              </div>
              <span className="font-semibold text-emerald-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5 text-xs">
                Read <span>→</span>
              </span>
            </div>
          </article>
        );
      })}
    </div>
  );
}
