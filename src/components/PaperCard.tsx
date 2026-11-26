import React from 'react';
import type { Paper, PaperCard as PaperCardData } from '@/lib/constants';
import { Icon } from '@/components/ui';

interface PaperCardProps {
  card: PaperCardData;
  paper?: Paper;
}

export default function PaperCard({ card, paper }: PaperCardProps) {
  return (
    <aside className="my-10 border-y border-border py-6" aria-label="Research Paper Card">
      <p className="eyebrow">Paper card</p>

      <dl className="mt-4 grid grid-cols-1 gap-x-4 gap-y-3 text-sm sm:grid-cols-4">
        {paper && (
          <>
            <dt className="font-mono text-[11px] font-medium uppercase tracking-wider text-ink-muted">Paper</dt>
            <dd className="sm:col-span-3 text-ink font-medium">
              <strong>{paper.title}</strong> ({paper.year})
            </dd>

            <dt className="font-mono text-[11px] font-medium uppercase tracking-wider text-ink-muted">Authors</dt>
            <dd className="sm:col-span-3 text-ink-muted">
              {paper.authors.slice(0, 6).join(', ')}
              {paper.authors.length > 6 ? ' et al.' : ''}
            </dd>
          </>
        )}

        <dt className="font-mono text-[11px] font-medium uppercase tracking-wider text-ink-muted">Task</dt>
        <dd className="sm:col-span-3 text-ink">{card.task}</dd>

        <dt className="font-mono text-[11px] font-medium uppercase tracking-wider text-ink-muted">Method</dt>
        <dd className="sm:col-span-3 text-ink">{card.method}</dd>

        {card.data && (
          <>
            <dt className="font-mono text-[11px] font-medium uppercase tracking-wider text-ink-muted">Dataset</dt>
            <dd className="sm:col-span-3 text-ink">{card.data}</dd>
          </>
        )}

        <dt className="font-mono text-[11px] font-medium uppercase tracking-wider text-ink-muted">Key Result</dt>
        <dd className="sm:col-span-3 text-emerald-400 font-semibold">{card.result}</dd>

        {paper && (paper.arxiv || paper.pdf || paper.code) && (
          <>
            <dt className="font-mono text-[11px] font-medium uppercase tracking-wider text-ink-muted">Links</dt>
            <dd className="sm:col-span-3 flex flex-wrap gap-2 pt-1">
              {paper.arxiv && (
                <a
                  href={paper.arxiv}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lnk"
                >
                  arXiv <Icon name="up" size={12} />
                </a>
              )}
              {paper.pdf && (
                <a
                  href={paper.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lnk"
                >
                  PDF <Icon name="up" size={12} />
                </a>
              )}
              {paper.code && (
                <a
                  href={paper.code}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lnk"
                >
                  Code <Icon name="up" size={12} />
                </a>
              )}
            </dd>
          </>
        )}
      </dl>
    </aside>
  );
}
