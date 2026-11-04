'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { href: '/learning-path/', label: 'Curriculum' },
  { href: '/study/', label: 'Study' },
  { href: '/papers/', label: 'Papers' },
  { href: '/ai/', label: 'AI Releases' },
  { href: '/archive/', label: 'Archive' },
  { href: '/about/', label: 'About' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contextOpen, setContextOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Context State
  const [visitorIp, setVisitorIp] = useState<string>('detecting...');
  const [activeBlogNo, setActiveBlogNo] = useState<string | null>(null);
  const contextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Theme initialization
    try {
      const stored = localStorage.getItem('theme') as 'dark' | 'light' | null;
      if (stored) {
        setTheme(stored);
        document.documentElement.dataset.theme = stored;
        if (stored === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      } else {
        document.documentElement.dataset.theme = 'dark';
        document.documentElement.classList.add('dark');
      }
    } catch (e) {}

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

    return () => {
      window.removeEventListener('sahaj:context', handleContextEvent);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Update active blog number on pathname change
  useEffect(() => {
    const article = document.querySelector('article[data-blog-no]');
    if (article) {
      const no = article.getAttribute('data-blog-no');
      if (no) setActiveBlogNo(no);
    } else if (!/^\/\d{4}\/\d{2}\/\d{2}\//.test(pathname)) {
      setActiveBlogNo(null);
    }
  }, [pathname]);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.dataset.theme = next;
    if (next === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    try {
      localStorage.setItem('theme', next);
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
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-canvas/90 backdrop-blur-md transition-colors">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight text-ink hover:opacity-90">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
          </span>
          <span>Sahaj<span className="text-emerald-400">.</span>blogs</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main Navigation">
          {NAV_LINKS.map(({ href, label }) => {
            const active = pathname === href || pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  active
                    ? 'bg-surface text-ink font-semibold border border-border shadow-sm'
                    : 'text-ink-muted hover:bg-surface/50 hover:text-ink'
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Dynamic Context Chip (Matching info.sahaj.si identity architecture) */}
          <div className="relative" ref={contextRef}>
            <button
              onClick={() => setContextOpen(!contextOpen)}
              className="flex items-center gap-1.5 rounded-lg border border-border bg-surface/80 px-2.5 py-1.5 font-mono text-xs text-ink-muted transition-colors hover:border-emerald-500/50 hover:text-ink"
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
                        <span className="text-[10px] text-ink-muted font-normal">of 4,306 posts</span>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-ink-muted">Archive Catalog</div>
                      <div className="mt-0.5 rounded border border-border bg-canvas/70 px-2 py-1 text-ink">
                        4,306 total indexed entries
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
            className="hidden items-center gap-1.5 rounded-lg border border-border bg-surface/80 px-2.5 py-1.5 text-xs font-medium text-ink-muted transition-colors hover:border-emerald-500/50 hover:text-ink sm:flex"
            aria-label="Search"
          >
            <span>🔍</span>
            <span>Search</span>
            <kbd className="ml-1 rounded border border-border bg-canvas px-1.5 py-0.5 text-[10px] text-ink-muted">⌘K</kbd>
          </Link>

          <button
            onClick={toggleTheme}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-surface text-sm transition-colors hover:bg-subtle text-ink"
            aria-label="Toggle theme"
            title="Toggle theme"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-surface text-ink md:hidden"
            aria-label="Open menu"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="border-b border-border bg-canvas/98 px-4 py-3 md:hidden">
          <nav className="flex flex-col gap-1.5">
            {NAV_LINKS.map(({ href, label }) => {
              const active = pathname === href || pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    active ? 'bg-surface text-ink font-semibold border border-border' : 'text-ink-muted hover:text-ink'
                  }`}
                >
                  {label}
                </Link>
              );
            })}
            <Link
              href="/search/"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 rounded-lg border border-border bg-surface py-2 text-sm text-ink"
            >
              <span>🔍</span>
              <span>Search posts...</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
