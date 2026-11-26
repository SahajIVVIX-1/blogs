'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { TOTAL_POSTS } from '@/lib/constants';
import Brand from '@/components/Brand';

const NAV_LINKS = [
  { href: '/learning-path/', label: 'Curriculum' },
  { href: '/study/', label: 'Study' },
  { href: '/papers/', label: 'Papers' },
  { href: '/ai/', label: 'AI Releases' },
  { href: '/archive/', label: 'Archive' },
  { href: '/about/', label: 'About' },
];

function applyTheme(mode: 'auto' | 'light' | 'dark') {
  const dark = mode === 'dark' || (mode === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  const root = document.documentElement;
  root.dataset.theme = dark ? 'dark' : 'light';
  root.classList.toggle('dark', dark);
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [theme, setTheme] = useState<'auto' | 'light' | 'dark'>('auto');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contextOpen, setContextOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Context State
  const [visitorIp, setVisitorIp] = useState<string>('detecting...');
  const [activeBlogNo, setActiveBlogNo] = useState<string | null>(null);
  const contextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Theme initialization (the inline script in layout.tsx already applied it before paint)
    try {
      const stored = localStorage.getItem('theme');
      setTheme(stored === 'light' || stored === 'dark' ? stored : 'auto');
    } catch (e) {}
    const sys = window.matchMedia('(prefers-color-scheme: dark)');
    const onSys = () => {
      let m: string | null = null;
      try { m = localStorage.getItem('theme'); } catch (e) {}
      if (m === 'light' || m === 'dark') return;
      applyTheme('auto');
    };
    sys.addEventListener('change', onSys);

    // Check cached visitor IP
    try {
      const cached = sessionStorage.getItem('visitorIp');
      if (cached) {
        setVisitorIp(cached);
      }
    } catch (e) {}

    // Listen to custom sahaj:context event from ContextAddressBar
    const handleContextEvent = (e: Event) => {
      const ce = e as CustomEvent<{ ip?: string; blogNo?: string | null }>;
      if (ce.detail?.ip) {
        setVisitorIp(ce.detail.ip);
      }
      if (ce.detail?.blogNo) {
        setActiveBlogNo(ce.detail.blogNo);
      } else {
        setActiveBlogNo(null);
      }
    };

    window.addEventListener('sahaj:context', handleContextEvent);

    // Close context popover on click outside
    const handleClickOutside = (e: MouseEvent) => {
      if (contextRef.current && !contextRef.current.contains(e.target as Node)) {
        setContextOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    // Global Command/Ctrl + K shortcut to open search
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        router.push('/search/');
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('sahaj:context', handleContextEvent);
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
      sys.removeEventListener('change', onSys);
    };
  }, [router]);

  // Update active blog number on pathname change
  useEffect(() => {
    setMobileMenuOpen(false);
    const article = document.querySelector('article[data-blog-no]');
    if (article) {
      const no = article.getAttribute('data-blog-no');
      if (no) setActiveBlogNo(no);
    } else if (!/^\/\d{4}\/\d{2}\/\d{2}\//.test(pathname)) {
      setActiveBlogNo(null);
    }
  }, [pathname]);

  const toggleTheme = () => {
    const next = theme === 'auto' ? 'light' : theme === 'light' ? 'dark' : 'auto';
    setTheme(next);
    applyTheme(next);
    try {
      if (next === 'auto') localStorage.removeItem('theme');
      else localStorage.setItem('theme', next);
    } catch (e) {}
  };

  const handleCopyLink = () => {
    if (typeof window === 'undefined') return;
    const url = activeBlogNo
      ? `${window.location.origin}/?blog=${activeBlogNo}`
      : window.location.href;
    navigator.clipboard?.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Truncate IP for compact badge: e.g. "110.226...132" or "you"
  const formatIpShort = (ip: string) => {
    if (ip === 'detecting...') return 'syncing';
    if (ip === 'anonymous') return 'anon';
    const parts = ip.split('.');
    if (parts.length === 4) {
      return `${parts[0]}.${parts[1]}...`;
    }
    return ip.slice(0, 8);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-canvas/80 backdrop-blur-[14px] backdrop-saturate-[1.2] transition-colors">
      <div className="flex w-full items-center gap-3 px-[var(--gutter)] py-3.5 sm:gap-4">
        <Brand />

        {/* Desktop Navigation */}
        <nav className="ml-auto hidden items-center gap-5 text-[15px] lg:flex xl:gap-[22px]" aria-label="Main Navigation">
          {NAV_LINKS.map(({ href, label }) => {
            const active = pathname === href || pathname.startsWith(href);
            return (
              <Link key={href} href={href} className="tok-link" aria-current={active ? 'page' : undefined}>
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          {/* Dynamic Context Chip (Matching info.sahaj.si identity architecture) */}
          <div className="relative hidden xl:block" ref={contextRef}>
            <button
              onClick={() => setContextOpen(!contextOpen)}
              className="flex items-center gap-1.5 rounded-full border border-rule-2 bg-transparent px-2.5 py-1.5 font-mono text-xs text-ink-muted transition-colors hover:border-emerald-500/50 hover:text-ink"
              title="Click to view visitor context & unique blog identifier"
              aria-label="Context identifier"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              <span className="font-semibold text-emerald-400">ctx</span>
              <span className="text-ink-muted/60">·</span>
              {activeBlogNo && (
                <>
                  <span className="font-semibold text-ink">#{activeBlogNo}</span>
                  <span className="text-ink-muted/60">·</span>
                </>
              )}
              <span className="hidden sm:inline text-ink-muted">
                {visitorIp && visitorIp !== 'detecting...' ? `you@${formatIpShort(visitorIp)}` : 'you'}
              </span>
              <span className="sm:hidden text-ink-muted">you</span>
            </button>

            {/* Context Dropdown Popover */}
            {contextOpen && (
              <div className="absolute right-0 mt-2 w-80 rounded-xl border border-border bg-surface p-4 shadow-xl z-50 text-xs animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-3 border-b border-border">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                    </span>
                    <span className="font-mono font-bold uppercase tracking-wider text-emerald-400 text-[11px]">
                      Live Context Sync
                    </span>
                  </div>
                  <span className="rounded bg-surface px-1.5 py-0.5 font-mono text-[10px] text-ink-muted border border-border">
                    v2.0
                  </span>
                </div>

                <div className="mt-3 space-y-2.5 font-mono">
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-ink-muted">Visitor Endpoint</div>
                    <div className="mt-0.5 rounded border border-border bg-canvas/70 px-2 py-1 text-ink break-all select-all">
                      {visitorIp && visitorIp !== 'detecting...' ? `you@${visitorIp}` : 'you (resolving in background)'}
                    </div>
                  </div>

                  {activeBlogNo ? (
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-ink-muted">Unique Article Serial</div>
                      <div className="mt-0.5 flex items-center justify-between rounded border border-emerald-500/30 bg-emerald-500/5 px-2 py-1 text-emerald-400 font-bold">
                        <span>Blog #{activeBlogNo}</span>
                        <span className="text-[10px] text-ink-muted font-normal">of {TOTAL_POSTS.toLocaleString()} posts</span>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-ink-muted">Archive Catalog</div>
                      <div className="mt-0.5 rounded border border-border bg-canvas/70 px-2 py-1 text-ink">
                        {TOTAL_POSTS.toLocaleString()} total indexed entries
                      </div>
                    </div>
                  )}

                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-ink-muted">
                      {activeBlogNo ? 'Permanent Shortlink' : 'Dynamic Context URL'}
                    </div>
                    <div className="mt-0.5 rounded border border-border bg-canvas/70 px-2 py-1 text-[11px] text-ink-muted break-all select-all">
                      {activeBlogNo ? `https://blog.sahaj.si/?blog=${activeBlogNo}` : `https://blog.sahaj.si/?context=you@${visitorIp}`}
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between pt-3 border-t border-border">
                  <span className="text-[10px] text-ink-muted">
                    Synced with <a href="https://info.sahaj.si" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">info.sahaj.si</a>
                  </span>
                  <button
                    onClick={handleCopyLink}
                    className="flex items-center gap-1 rounded bg-emerald-500 px-2.5 py-1 text-[11px] font-semibold text-slate-950 transition-colors hover:bg-emerald-400"
                  >
                    <span>{copied ? '✓ Copied' : 'Copy link'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          <Link
            href="/search/"
            className="inline-flex h-9 items-center justify-center gap-2.5 rounded-full border border-rule-2 text-ink-soft transition-colors hover:border-ink-muted hover:text-ink w-9 xl:w-auto xl:pl-3 xl:pr-2"
            aria-label="Search (Ctrl K)"
            title="Search (Ctrl K)"
          >
            <svg viewBox="0 0 16 16" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true"><circle cx="6.8" cy="6.8" r="4.6" /><path d="M10.2 10.2 14 14" /></svg>
            <span className="hidden font-mono text-[.78em] xl:inline">Search</span>
            <kbd className="hidden rounded-md border border-border bg-surface px-1.5 py-1 font-mono text-[11px] leading-none text-ink-soft xl:inline">Ctrl K</kbd>
          </Link>

          <button
            type="button"
            onClick={toggleTheme}
            className="temp"
            data-theme-state={theme}
            aria-label={`temp ${theme}, theme ${theme === 'auto' ? 'follow system' : theme}. Click to change.`}
          >
            <span className="temp-label">temp</span>
            <span className="temp-track" aria-hidden="true"><span className="temp-knob" /></span>
            <span className="temp-val hidden sm:inline">{theme === 'light' ? 'τ 0.2' : theme === 'dark' ? 'τ 0.9' : 'auto'}</span>
          </button>

          {/* Menu button (below 1024px) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-rule-2 text-ink lg:hidden"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
              {mobileMenuOpen ? <path d="M3 3l10 10M13 3L3 13" /> : <path d="M2.5 5h11M2.5 11h11" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Menu panel (below 1024px) */}
      {mobileMenuOpen && (
        <div id="mobile-menu" className="max-h-[calc(100dvh-65px)] overflow-y-auto border-t border-border bg-canvas px-[var(--gutter)] pb-6 pt-3 lg:hidden">
          <nav className="flex flex-col" aria-label="Menu">
            {NAV_LINKS.map(({ href, label }) => {
              const active = pathname === href || pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-current={active ? 'page' : undefined}
                  className={`flex items-baseline justify-between border-b border-border py-3.5 font-serif text-[1.7rem] italic leading-none ${active ? 'text-accent' : 'text-ink'}`}
                >
                  <span>{label}</span>
                  <span className="font-mono text-[11px] not-italic text-ink-muted" aria-hidden="true">→</span>
                </Link>
              );
            })}
            <a href="https://info.sahaj.si/" className="flex items-baseline justify-between border-b border-border py-3.5 font-serif text-[1.7rem] italic leading-none text-ink-soft">
              <span>Portfolio</span>
              <span className="font-mono text-[11px] not-italic text-ink-muted" aria-hidden="true">↗</span>
            </a>
          </nav>
          <p className="mt-5 font-mono text-[11px] text-ink-muted">
            ctx · {activeBlogNo ? `#${activeBlogNo} · ` : ''}{visitorIp && visitorIp !== 'detecting...' ? `you@${formatIpShort(visitorIp)}` : 'you'}
          </p>
        </div>
      )}
    </header>
  );
}
