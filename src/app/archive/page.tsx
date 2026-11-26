import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { allPosts, byDay, postUrl, fmtDate } from '@/lib/posts';
import ArchiveHashScroll from '@/components/ArchiveHashScroll';
import { PageHeader, Icon } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Chronological Archive',
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
    <div>
      <ArchiveHashScroll />
      <PageHeader
        eyebrow="Complete chronology"
        title={<>Chronological <em>archive</em></>}
        lede={<>Every entry from 4 August 2023 onward, organised by year, month and day. {posts.length.toLocaleString()} entries across {days.size} active recording days.</>}
      />

      {[...tree].map(([y, months]) => (
        <section key={y} className="mb-16">
          <div className="mb-6 flex items-baseline justify-between gap-4">
            <h2 className="font-serif text-[clamp(2.4rem,5vw,4rem)] leading-none tracking-tight" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>{y}</h2>
            <span className="font-mono text-[11px] uppercase tracking-wider text-ink-muted">
              {[...months].reduce((n, [, ks]) => n + ks.reduce((m2, k) => m2 + days.get(k)!.length, 0), 0).toLocaleString()} posts
            </span>
          </div>

          <div className="border-t border-border">
            {[...months].map(([m, ks]) => {
              const count = ks.reduce((n, k) => n + days.get(k)!.length, 0);
              return (
                <details key={m} open={m.startsWith('2026') || m.startsWith('2025-12')} className="group border-b border-border">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 select-none [&::-webkit-details-marker]:hidden">
                    <span className="text-xl tracking-tight text-ink transition-colors group-hover:text-accent" style={{ letterSpacing: '-.02em' }}>{monthName(m)}</span>
                    <span className="flex items-center gap-3">
                      <span className="chip">{count} post{count > 1 ? 's' : ''}</span>
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-rule-2 text-ink-soft transition-transform group-open:rotate-180">
                        <Icon name="chevron" size={14} />
                      </span>
                    </span>
                  </summary>

                  <div className="pb-6">
                    {ks.map((k) => {
                      const dayPosts = days.get(k)!;
                      return (
                        <div key={k} id={`date-${k}`} className="grid gap-2 border-t border-border/60 py-4 md:grid-cols-[9rem_minmax(0,1fr)] md:gap-8">
                          <div className="font-mono text-xs text-accent">{fmtDate(k)}</div>
                          <ul className="space-y-2">
                            {dayPosts.map((p) => (
                              <li key={p.id} className="flex items-baseline justify-between gap-4">
                                <Link href={postUrl(p)} prefetch={false} className="tok-link text-[15px] text-ink">
                                  {p.data.title}
                                </Link>
                                <span className="shrink-0 font-mono text-[11px] capitalize text-ink-muted">{p.data.categories[0]}</span>
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
        </section>
      ))}
    </div>
  );
}
