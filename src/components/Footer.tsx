import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mx-auto mt-20 w-full max-w-[1800px] border-t border-border px-[var(--gutter)] py-5 text-[13.5px] leading-snug text-ink-muted">
      <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
        <Link href="/" className="brand" aria-label="Sahaj Saliya, home">
          <svg className="brand-logo" viewBox="0 0 40 40" width="40" height="40" aria-hidden="true" focusable="false" style={{ ['--p' as string]: 100 }}>
            <circle className="ring-track" cx="20" cy="20" r="19.25" />
            <g transform="rotate(-90 20 20)"><circle className="ring-prog" cx="20" cy="20" r="19.25" pathLength="100" /></g>
            <image className="logo-img logo-l" href="/brand/logo-light.webp" x="3" y="3" width="34" height="34" />
            <image className="logo-img logo-d" href="/brand/logo-dark.webp" x="3" y="3" width="34" height="34" />
          </svg>
          <span className="brand-text" aria-hidden="true"><span>Sahaj Saliya</span></span>
        </Link>
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

