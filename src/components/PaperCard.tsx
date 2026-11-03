import React from 'react';
import type { Paper, PaperCard as PaperCardData } from '@/lib/constants';

interface PaperCardProps {
  card: PaperCardData;
  paper?: Paper;
}

export default function PaperCard({ card, paper }: PaperCardProps) {
  return (
    <aside className="my-8 rounded-xl border border-emerald-500/30 bg-surface/90 p-5 shadow-sm" aria-label="Research Paper Card">
      <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-emerald-400">
        <span>📄</span>
        <span>RESEARCH PAPER CARD</span>
      </div>

      <dl className="mt-4 grid grid-cols-1 gap-x-4 gap-y-3 text-sm sm:grid-cols-4">
        {paper && (
          <>
            <dt className="text-xs font-semibold uppercase tracking-wider text-ink-muted">Paper</dt>
            <dd className="sm:col-span-3 text-ink font-medium">
              <strong>{paper.title}</strong> ({paper.year})
            </dd>

            <dt className="text-xs font-semibold uppercase tracking-wider text-ink-muted">Authors</dt>
            <dd className="sm:col-span-3 text-ink-muted">
              {paper.authors.slice(0, 6).join(', ')}
              {paper.authors.length > 6 ? ' et al.' : ''}
            </dd>
          </>
        )}

        <dt className="text-xs font-semibold uppercase tracking-wider text-ink-muted">Task</dt>
        <dd className="sm:col-span-3 text-ink">{card.task}</dd>

        <dt className="text-xs font-semibold uppercase tracking-wider text-ink-muted">Method</dt>
        <dd className="sm:col-span-3 text-ink">{card.method}</dd>

        {card.data && (
          <>
            <dt className="text-xs font-semibold uppercase tracking-wider text-ink-muted">Dataset</dt>
            <dd className="sm:col-span-3 text-ink">{card.data}</dd>
          </>
        )}

        <dt className="text-xs font-semibold uppercase tracking-wider text-ink-muted">Key Result</dt>
        <dd className="sm:col-span-3 text-emerald-400 font-semibold">{card.result}</dd>

        {paper && (paper.arxiv || paper.pdf || paper.code) && (
          <>
            <dt className="text-xs font-semibold uppercase tracking-wider text-ink-muted">Links</dt>
            <dd className="sm:col-span-3 flex flex-wrap gap-2 pt-1">
              {paper.arxiv && (
                <a
                  href={paper.arxiv}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md border border-border bg-canvas px-2.5 py-1 text-xs font-medium text-ink transition-colors hover:border-emerald-500 hover:text-emerald-400"
                >
                  arXiv Page ↗
                </a>
              )}
              {paper.pdf && (
                <a
                  href={paper.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md border border-border bg-canvas px-2.5 py-1 text-xs font-medium text-ink transition-colors hover:border-emerald-500 hover:text-emerald-400"
                >
                  PDF Full Text ↗
                </a>
              )}
              {paper.code && (
                <a
                  href={paper.code}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md border border-border bg-canvas px-2.5 py-1 text-xs font-medium text-ink transition-colors hover:border-emerald-500 hover:text-emerald-400"
                >
                  Code Repository ↗
                </a>
              )}
            </dd>
          </>
        )}
      </dl>
    </aside>
  );
}
