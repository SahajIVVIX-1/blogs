import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { allPosts, postUrl, dayKey } from '@/lib/posts';

export const metadata: Metadata = {
  title: 'AI Research Paper Breakdowns',
  description: 'Rigorous, structured summaries of notable machine learning and artificial intelligence papers from arXiv and Hugging Face.',
};

export default function PapersPage() {
  const posts = allPosts().filter((p) => p.data.categories.includes('papers'));
  const rows = posts.map((p) => {
    const paper = p.data.papers[0];
    return {
      date: dayKey(p.data.date),
      title: p.data.title.replace(/^Paper summary:\s*/, ''),
      url: postUrl(p),
      authors: paper ? paper.authors.slice(0, 3).join(', ') + (paper.authors.length > 3 ? ' et al.' : '') : '',
      topic: p.data.tags[0] ?? 'ML',
      arxiv: paper?.arxiv,
      pdf: paper?.pdf,
      code: paper?.code,
    };
  });

  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
          <span>📄</span>
          <span>arXiv & HF Research Digests</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-ink">
          AI Research Paper Breakdowns
        </h1>
        <p className="max-w-3xl text-sm leading-relaxed text-ink-muted sm:text-base">
          Rigorous, structured summaries of notable machine learning and artificial intelligence papers from arXiv (cs.CL, cs.AI, cs.LG, cs.CV) and Hugging Face Daily Papers. Each digest covers the core problem, architecture/method, benchmarks, and key limitations.
        </p>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between text-xs text-ink-muted">
          <span>Showing {rows.length.toLocaleString()} verified research paper digests</span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-border bg-surface">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-border bg-canvas/60 text-ink-muted uppercase tracking-wider text-[11px]">
              <tr>
                <th className="px-4 py-3 font-semibold">Date</th>
                <th className="px-4 py-3 font-semibold">Paper Title</th>
                <th className="px-4 py-3 font-semibold">Authors</th>
                <th className="px-4 py-3 font-semibold">Domain</th>
                <th className="px-4 py-3 font-semibold text-right">Links</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {rows.map((r, idx) => (
                <tr key={idx} className="transition-colors hover:bg-canvas/50">
                  <td className="px-4 py-3 font-mono text-ink-muted whitespace-nowrap">{r.date}</td>
                  <td className="px-4 py-3 font-semibold text-ink">
                    <Link href={r.url} prefetch={false} className="hover:text-emerald-400 transition-colors">
                      {r.title}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-ink-muted">{r.authors}</td>
                  <td className="px-4 py-3">
                    <span className="rounded border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
                      {r.topic}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <div className="inline-flex gap-1.5">
                      {r.arxiv && (
                        <a
                          href={r.arxiv}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded border border-border bg-canvas px-1.5 py-0.5 text-[10px] text-ink-muted hover:text-ink hover:border-emerald-500"
                        >
                          arXiv
                        </a>
                      )}
                      {r.pdf && (
                        <a
                          href={r.pdf}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded border border-border bg-canvas px-1.5 py-0.5 text-[10px] text-ink-muted hover:text-ink hover:border-emerald-500"
                        >
                          PDF
                        </a>
                      )}
                      {r.code && (
                        <a
                          href={r.code}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded border border-border bg-canvas px-1.5 py-0.5 text-[10px] text-ink-muted hover:text-ink hover:border-emerald-500"
                        >
                          Code
                        </a>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
