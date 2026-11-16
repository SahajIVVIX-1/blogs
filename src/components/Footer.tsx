import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-canvas py-12 text-sm text-ink-muted">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex flex-col items-center sm:items-start gap-1">
            <div className="flex items-center gap-2 font-bold text-ink">
              <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
              <span>Sahaj Saliya · AI & Systems Research</span>
            </div>
            <p className="text-xs text-ink-muted">
              Engineering handbook, daily study notes, AI papers & systems architecture.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-xs">
            <Link href="/learning-path/" className="hover:text-ink transition-colors">Curriculum</Link>
            <Link href="/study/" className="hover:text-ink transition-colors">Study</Link>
            <Link href="/papers/" className="hover:text-ink transition-colors">Papers</Link>
            <Link href="/ai/" className="hover:text-ink transition-colors">AI Releases</Link>
            <Link href="/archive/" className="hover:text-ink transition-colors">Archive</Link>
            <Link href="/rss.xml" className="hover:text-ink transition-colors">RSS Feed</Link>
            <a href="https://github.com/SahajIVVIX-1" target="_blank" rel="noopener noreferrer" className="hover:text-ink transition-colors">
              GitHub ↗
            </a>
            <a href="https://x.com/SahajS59" target="_blank" rel="noopener noreferrer" className="hover:text-ink transition-colors">
              X/Twitter ↗
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-border/50 pt-6 text-center text-xs text-ink-muted/80">
          © <span suppressHydrationWarning>{new Date().getFullYear()}</span> Sahaj Saliya. All content published under open technical learning principles.
        </div>
      </div>
    </footer>
  );
}

