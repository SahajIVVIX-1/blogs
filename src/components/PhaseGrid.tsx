import React from 'react';
import Link from 'next/link';
import { fmtDate } from '@/lib/constants';
import { Icon } from '@/components/ui';

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

// "4 Aug 2023" -> "Aug 2023"
const monthYear = (d: string) => fmtDate(d).replace(/^\d+\s+/, '');

export default function PhaseGrid({ phases, limit }: PhaseGridProps) {
  const displayPhases = limit ? phases.slice(0, limit) : phases;

  return (
    <div className="idx">
      {displayPhases.map((ph) => {
        const pct = Math.min(100, Math.round((ph.done / Math.max(1, ph.total)) * 100));
        return (
          <Link key={ph.n} href={`/learning-path/#phase-${ph.n}`} prefetch={false} className="idx-row">
            <span className="idx-n">{String(ph.n).padStart(2, '0')}</span>
            <span>
              <span className="idx-title block">{ph.name}</span>
              <span className="idx-meta block">
                Phase {ph.n} · {monthYear(ph.from)} &ndash; {monthYear(ph.to)}
              </span>
            </span>
            <span className="idx-prog">
              <span className="bar block"><i style={{ width: `${pct}%` }} /></span>
              <span className="bar-meta">
                <span>{ph.done} / {ph.total} guides</span>
                <b>{pct}%</b>
              </span>
            </span>
            <span className="idx-go"><Icon name="arrow" size={16} /></span>
          </Link>
        );
      })}
    </div>
  );
}
