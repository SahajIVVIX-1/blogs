import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Sahaj Saliya & This Notebook',
  description: 'Sahaj Saliya — B.Tech ICT Student at Pandit Deendayal Energy University (PDEU), Gandhinagar (2023–2027).',
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-12">
      <section className="space-y-4">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold text-ink-muted">
          <span>👤</span>
          <span>About the Author</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-ink">
          Sahaj Saliya
        </h1>
        <p className="max-w-3xl text-sm leading-relaxed text-ink-muted sm:text-base">
          B.Tech ICT Student at Pandit Deendayal Energy University (PDEU), Gandhinagar (2023–2027). Focusing on LLMs, Generative AI, Computer Vision, and Autonomous Multi-Agent Systems.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <a
            href="https://info.sahaj.si"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-emerald-500 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-emerald-400"
          >
            Portfolio Website ↗
          </a>
          <a
            href="https://github.com/SahajIVVIX-1"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-border bg-surface px-4 py-2 text-xs font-semibold text-ink hover:border-emerald-500 hover:text-emerald-400"
          >
            GitHub Profile ↗
          </a>
          <a
            href="https://www.linkedin.com/in/sahajs59"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-border bg-surface px-4 py-2 text-xs font-semibold text-ink hover:border-blue-500 hover:text-blue-400"
          >
            LinkedIn ↗
          </a>
        </div>
      </section>

      <section className="space-y-6 pt-4 border-t border-border">
        <h2 className="font-serif text-2xl font-bold text-ink">About This Engineering Notebook</h2>
        <p className="text-sm leading-relaxed text-ink-muted">
          This site is my public engineering journal, starting on <strong>4 August 2023</strong> (my first day at PDEU) and updated continuously. It serves as both a structured learning handbook and an archival log across three primary tracks:
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-indigo-500/30 bg-surface p-5 space-y-2">
            <span className="inline-block rounded border border-indigo-500/30 bg-indigo-500/10 px-2 py-0.5 text-xs font-semibold text-indigo-400">
              Study Guides
            </span>
            <h3 className="font-serif text-base font-bold text-ink">Structured Technical Notes</h3>
            <p className="text-xs leading-relaxed text-ink-muted">
              Sequential, topic-by-topic curriculum notes across 15 engineering phases. Every code snippet is executed in a controlled Python/C++ environment prior to publishing.
            </p>
          </div>

          <div className="rounded-xl border border-emerald-500/30 bg-surface p-5 space-y-2">
            <span className="inline-block rounded border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-400">
              Paper Digests
            </span>
            <h3 className="font-serif text-base font-bold text-ink">Frontier Research Breakdowns</h3>
            <p className="text-xs leading-relaxed text-ink-muted">
              Rigorous breakdowns of breakthrough papers from arXiv and Hugging Face Daily Papers, cataloging mathematical formulations, benchmarks, and architectures.
            </p>
          </div>

          <div className="rounded-xl border border-amber-500/30 bg-surface p-5 space-y-2">
            <span className="inline-block rounded border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-xs font-semibold text-amber-400">
              AI Updates
            </span>
            <h3 className="font-serif text-base font-bold text-ink">Industry Releases</h3>
            <p className="text-xs leading-relaxed text-ink-muted">
              Concise, factual summaries of foundation model releases, technical reports, and major library milestones directly from official engineering blogs and model cards.
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-surface p-6 space-y-3">
          <h3 className="font-serif text-lg font-bold text-ink">Engineering Philosophy</h3>
          <ul className="list-disc list-inside space-y-2 text-xs leading-relaxed text-ink-muted">
            <li><strong>Verified Sources:</strong> Every single article explicitly cites primary sources (arXiv DOIs, GitHub repos, official release announcements).</li>
            <li><strong>Mathematical Rigor:</strong> Core concepts are explained with complete LaTeX derivations rather than hand-waving analogies.</li>
            <li><strong>Executable Implementations:</strong> Algorithms include complete, self-contained Python / PyTorch code blocks with verified outputs.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
