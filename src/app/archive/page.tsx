import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { allPosts, byDay, postUrl, fmtDate } from '@/lib/posts';
import ArchiveHashScroll from '@/components/ArchiveHashScroll';

export const metadata: Metadata = {
  title: 'Chronological <em>archive</em>',
  description: 'Every single article from August 2023 onward, organized chronologically by year, month, and day.',
};

export default function ArchivePage() {
  const posts = allPosts();
  const days = byDay(posts);
  const tree = new Map<string, Map<string, string[]>>();

  for (const k of [...days.keys()].sort().reverse()) {
    const y = k.slice(0, 4);
    const m = k.slice(0, 7);
    if (!tree.has(y)) tree.set(y, new Map());
    if (!tree.get(y)!.has(m)) tree.get(y)!.set(m, []);
    tree.get(y)!.get(m)!.push(k);
  }

  const monthName = (m: string) =>
    new Date(m + '-01T00:00:00Z').toLocaleDateString('en-GB', {
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC',
    });

  return (
    <div className="space-y-12">
      <ArchiveHashScroll />
      <section className="space-y-4">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold text-ink-muted">
          <span>🗄️</span>
          <span>Complete Chronology</span>
        </div>
        <h1 className="text-3xl sm:text-5xl tracking-tight text-ink">
          Chronological Archive
        </h1>
        <p className="max-w-3xl text-sm leading-relaxed text-ink-muted sm:text-base">
          Every single entry from 4 August 2023 onward, organized by year, month, and day. Total of {posts.length.toLocaleString()} entries across {days.size} active recording days.
        </p>
      </section>

      {/* Years Tree */}
      <section className="space-y-10">
        {[...tree].map(([y, months]) => (
          <div key={y} className="space-y-4">
            <h2 className="text-2xl text-ink border-b border-border pb-2">
              📅 Year {y}
            </h2>

            <div className="space-y-3">
              {[...months].map(([m, ks]) => {
                const count = ks.reduce((n, k) => n + days.get(k)!.length, 0);
                return (
                  <details
                    key={m}
                    open={m.startsWith('2026') || m.startsWith('2025-12')}
                    className="group rounded-xl border border-border bg-surface p-4 transition-colors"
                  >
                    <summary className="flex cursor-pointer items-center justify-between font-semibold text-ink select-none">
                      <span className="font-serif text-lg">{monthName(m)}</span>
                      <span className="rounded-md border border-border bg-canvas px-2.5 py-0.5 text-xs text-ink-muted">
                        {count} post{count > 1 ? 's' : ''}
                      </span>
                    </summary>

                    <div className="mt-4 space-y-4 border-t border-border/60 pt-4">
                      {ks.map((k) => {
                        const dayPosts = days.get(k)!;
                        return (
                          <div key={k} id={`date-${k}`} className="rounded-lg border border-border/70 bg-canvas/60 p-4 space-y-2">
                            <div className="flex items-center justify-between text-xs font-mono text-emerald-400 font-semibold">
                              <span>📍 {fmtDate(k)}</span>
                              <span className="text-ink-muted">{dayPosts.length} article{dayPosts.length > 1 ? 's' : ''}</span>
                            </div>

                            <ul className="space-y-1.5 pt-1">
                              {dayPosts.map((p) => (
                                <li key={p.id} className="flex items-baseline justify-between gap-3 text-xs">
                                  <Link
                                    href={postUrl(p)}
                                    prefetch={false}
                                    className="font-medium text-ink hover:text-emerald-400 transition-colors"
                                  >
                                    {p.data.title}
                                  </Link>
                                  <span className="text-ink-muted whitespace-nowrap text-[11px] capitalize">
                                    {p.data.categories[0]}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        );
                      })}
                    </div>
                  </details>
                );
              })}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
