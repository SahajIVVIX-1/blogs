import React from 'react';
import Link from 'next/link';
import { fmtDate } from '@/lib/constants';

interface PhaseProgressItem {
  n: number;
  name: string;
  from: string;
  to: string;
  done: number;
  total: number;
  topics: string[];
}

interface PhaseGridProps {
  phases: PhaseProgressItem[];
  limit?: number;
}

export default function PhaseGrid({ phases, limit }: PhaseGridProps) {
  const displayPhases = limit ? phases.slice(0, limit) : phases;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {displayPhases.map((ph) => {
        const pct = Math.min(100, Math.round((ph.done / Math.max(1, ph.total)) * 100));
        return (
          <Link
            key={ph.n}
            href={`/learning-path/#phase-${ph.n}`}
            prefetch={false}
            className="group flex flex-col justify-between rounded-xl border border-border bg-surface p-5 transition-all hover:border-emerald-500/50 hover:bg-surface/80"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-ink-muted">
                <span className="rounded-md border border-indigo-500/30 bg-indigo-500/10 px-2 py-0.5 font-semibold text-indigo-400">
                  Phase {ph.n}
                </span>
                <span>{fmtDate(ph.from).slice(3)} – {fmtDate(ph.to).slice(3)}</span>
              </div>
              <h3 className="mt-3 text-lg text-ink group-hover:text-emerald-400 transition-colors">
                {ph.name}
              </h3>
            </div>

            <div className="mt-6">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-border">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <div className="mt-2 flex items-center justify-between text-xs text-ink-muted">
                <span>{ph.done} of {ph.total} guides</span>
                <span className="font-semibold text-ink">{pct}%</span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
