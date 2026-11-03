'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { href: '/learning-path/', label: 'Curriculum' },
  { href: '/study/', label: 'Study Notes' },
  { href: '/papers/', label: 'Research Papers' },
  { href: '/ai/', label: 'AI Updates' },
  { href: '/archive/', label: 'Archive' },
  { href: '/search/', label: 'Search' },
  { href: '/about/', label: 'About' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
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
  }, []);

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

