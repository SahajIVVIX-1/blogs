import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mx-auto mt-20 w-full max-w-[1800px] border-t border-border px-[var(--gutter)] py-5 text-[13.5px] leading-snug text-ink-muted">
      <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
        <div className="mr-auto flex flex-wrap gap-x-[18px] gap-y-1">
          <Link prefetch={false} href="/learning-path/" className="tok-link text-ink-soft">Curriculum</Link>
          <Link prefetch={false} href="/study/" className="tok-link text-ink-soft">Study</Link>
          <Link prefetch={false} href="/papers/" className="tok-link text-ink-soft">Papers</Link>
          <Link prefetch={false} href="/ai/" className="tok-link text-ink-soft">AI Releases</Link>
          <Link prefetch={false} href="/archive/" className="tok-link text-ink-soft">Archive</Link>
          <a href="/rss.xml" className="tok-link text-ink-soft">RSS</a>
          <a href="https://info.sahaj.si/" className="tok-link text-ink-soft">Portfolio ↗</a>
          <a href="https://github.com/SahajIVVIX-1" target="_blank" rel="noopener noreferrer" className="tok-link text-ink-soft">GitHub ↗</a>
          <a href="https://x.com/SahajS59" target="_blank" rel="noopener noreferrer" className="tok-link text-ink-soft">X ↗</a>
        </div>
        <p className="m-0">
          © <span suppressHydrationWarning>{new Date().getFullYear()}</span> Sahaj Saliya
        </p>
      </div>
    </footer>
  );
}

