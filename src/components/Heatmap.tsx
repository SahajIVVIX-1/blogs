'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { START, today, dayKey, CATEGORY_LABEL, type Post } from '@/lib/constants';

interface HeatmapProps {
  daysMap: Record<string, { count: number; categories: string[] }>;
}

export default function Heatmap({ daysMap }: HeatmapProps) {
  const [open, setOpen] = useState(false);

  const end = new Date(today() + 'T00:00:00Z');
  const years: { year: number; cells: (null | { key: string; n: number; cats: string[] })[] }[] = [];

  for (let y = Number(START.slice(0, 4)); y <= end.getUTCFullYear(); y++) {
    const from = new Date(Math.max(Date.parse(`${y}-01-01`), Date.parse(START)));
    const to = new Date(Math.min(Date.parse(`${y}-12-31`), end.getTime()));
    const cells: (null | { key: string; n: number; cats: string[] })[] = [];

    for (let i = 0; i < from.getUTCDay(); i++) cells.push(null);

    for (const d = new Date(from); d <= to; d.setUTCDate(d.getUTCDate() + 1)) {
      const key = dayKey(d);
      const data = daysMap[key];
      const n = data ? data.count : 0;
      const cats = data ? data.categories : [];
      cells.push({ key, n, cats });
    }
    years.unshift({ year: y, cells });
  }

  const getHeatClass = (n: number) => {
    if (n === 0) return 'bg-subtle/40 border border-border/40';
    if (n === 1) return 'bg-emerald-950 border border-emerald-800 text-emerald-200';
    if (n === 2) return 'bg-emerald-800 border border-emerald-600 text-emerald-100';
    if (n === 3) return 'bg-emerald-600 border border-emerald-400 text-white';
    return 'bg-emerald-500 border border-emerald-300 text-white shadow-sm';
  };

  return (
    <section className="rounded-xl border border-border bg-surface p-4 sm:p-6" aria-label="Posting Activity Calendar">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="flex items-center gap-2 font-serif text-lg font-bold text-ink">
            <span>📅</span> Daily Publishing Activity & Streak Heatmap
          </h3>
          <p className="mt-1 text-xs text-ink-muted">
            Continuous engineering timeline across {years.length} years of daily learning and research paper analysis.
          </p>
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="self-start sm:self-auto rounded-lg border border-border bg-canvas px-3 py-1.5 text-xs font-medium text-ink transition-colors hover:border-emerald-500 hover:text-emerald-400"
        >
          {open ? 'Hide Calendar ↑' : 'View Calendar ↓'}
        </button>
      </div>

      {open && (
        <div className="mt-6 space-y-6 pt-4 border-t border-border">
          {years.map(({ year, cells }) => (
            <div key={year} className="space-y-2">
              <div className="text-xs font-semibold text-ink-muted">{year}</div>
              <div className="overflow-x-auto pb-2">
                <div className="inline-grid grid-rows-7 grid-flow-col gap-1">
                  {cells.map((c, idx) =>
                    !c ? (
                      <span key={`empty-${idx}`} className="h-3 w-3 rounded-sm opacity-0" />
                    ) : c.n > 0 ? (
                      <Link
                        key={c.key}
                        href={`/archive/#date-${c.key}`}
                        prefetch={false}
                        title={`${c.key}: ${c.n} post${c.n > 1 ? 's' : ''} · ${c.cats.join(', ')}`}
                        className={`h-3 w-3 rounded-sm transition-transform hover:scale-125 ${getHeatClass(c.n)}`}
                      />
                    ) : (
                      <span
                        key={c.key}
                        title={`${c.key}: no posts`}
                        className="h-3 w-3 rounded-sm bg-border/30"
                      />
                    )
                  )}
                </div>
              </div>
            </div>
          ))}

          <div className="flex items-center gap-2 pt-2 text-[11px] text-ink-muted">
            <span>Less</span>
            <span className="h-2.5 w-2.5 rounded-sm bg-border/30" />
            <span className="h-2.5 w-2.5 rounded-sm bg-emerald-950 border border-emerald-800" />
            <span className="h-2.5 w-2.5 rounded-sm bg-emerald-800 border border-emerald-600" />
            <span className="h-2.5 w-2.5 rounded-sm bg-emerald-600 border border-emerald-400" />
            <span className="h-2.5 w-2.5 rounded-sm bg-emerald-500 border border-emerald-300" />
            <span>More</span>
            <Link href="/archive/" className="ml-auto text-emerald-400 hover:underline">
              Browse full archive by date →
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
