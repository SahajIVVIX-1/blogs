import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mx-auto mt-20 w-full max-w-[1320px] border-t border-border px-4 py-5 text-[13.5px] leading-snug text-ink-muted sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center gap-x-7 gap-y-2">
        <div className="mr-auto flex flex-wrap gap-x-[18px] gap-y-1">
          <Link href="/learning-path/" className="tok-link text-ink-soft">Curriculum</Link>
          <Link href="/study/" className="tok-link text-ink-soft">Study</Link>
          <Link href="/papers/" className="tok-link text-ink-soft">Papers</Link>
          <Link href="/ai/" className="tok-link text-ink-soft">AI Releases</Link>
          <Link href="/archive/" className="tok-link text-ink-soft">Archive</Link>
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

