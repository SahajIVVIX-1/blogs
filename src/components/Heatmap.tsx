'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Icon } from '@/components/ui';
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

  // one accent, four intensities
  const heat = (n: number) => (n <= 1 ? '.28' : n === 2 ? '.5' : n === 3 ? '.75' : '1');

  return (
    <section aria-label="Posting Activity Calendar">
      <div className="sec-head" style={{ marginBottom: open ? undefined : 0 }}>
        <div>
          <p className="eyebrow">Activity</p>
          <h2>Every day, <em>on the record</em></h2>
          <p className="sub">
            Continuous engineering timeline across {years.length} years of daily learning and research paper analysis.
          </p>
        </div>
        <button onClick={() => setOpen(!open)} className="btn btn-ghost btn-sm" aria-expanded={open}>
          <Icon name="calendar" size={14} />
          <span>{open ? 'Hide calendar' : 'View calendar'}</span>
          <Icon name="chevron" size={14} className={open ? 'rotate-180 transition-transform' : 'transition-transform'} />
        </button>
      </div>

      {open && (
        <div className="space-y-6 border-t border-border pt-6">
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
                        className="h-3 w-3 rounded-sm transition-transform hover:scale-125"
                        style={{ background: `rgb(var(--accent-rgb) / ${heat(c.n)})` }}
                      />
                    ) : (
                      <span
                        key={c.key}
                        title={`${c.key}: no posts`}
                        className="h-3 w-3 rounded-sm bg-border/50"
                      />
                    )
                  )}
                </div>
              </div>
            </div>
          ))}

          <div className="flex items-center gap-2 pt-2 font-mono text-[11px] text-ink-muted">
            <span>Less</span>
            <span className="h-2.5 w-2.5 rounded-sm bg-border/50" />
            {['.28', '.5', '.75', '1'].map((o) => (
              <span key={o} className="h-2.5 w-2.5 rounded-sm" style={{ background: `rgb(var(--accent-rgb) / ${o})` }} />
            ))}
            <span>More</span>
            <Link prefetch={false} href="/archive/" className="tok-link ml-auto text-ink-soft">
              Browse the archive by date
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
