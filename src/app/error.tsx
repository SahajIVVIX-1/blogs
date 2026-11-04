'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error for diagnostics
    console.error('Captured client-side navigation exception:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16 animate-in fade-in duration-300">
      <div className="relative mb-6">
        <div className="h-16 w-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-2xl text-amber-400">
          ⚡
        </div>
        <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-canvas border border-amber-500/40 text-[9px] text-amber-400">
          ●
        </span>
      </div>

      <span className="font-mono text-xs font-semibold uppercase tracking-wider text-amber-400">
        Safe Client Recovery
      </span>
      <h1 className="mt-2 font-serif text-2xl sm:text-3xl font-bold text-ink">
        Interface Navigation Recovered
      </h1>
      <p className="mt-2.5 max-w-md text-xs sm:text-sm text-ink-muted leading-relaxed">
        A transient client-side state issue was caught and contained. Click below to refresh the page smoothly.
      </p>

      {error?.message && (
        <div className="mt-4 max-w-lg rounded-lg border border-border bg-surface/80 p-3 font-mono text-[11px] text-ink-muted break-all text-left">
          {error.message}
        </div>
      )}

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={() => {
            try {
              reset();
            } catch {
              window.location.reload();
            }
          }}
          className="rounded-xl bg-emerald-500 px-5 py-2.5 text-xs font-semibold text-slate-950 transition-all hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/20 active:scale-95"
        >
          ↻ Recover & Reload
        </button>
        <Link
          href="/"
          className="rounded-xl border border-border bg-surface px-5 py-2.5 text-xs font-medium text-ink transition-colors hover:border-emerald-500 hover:text-emerald-400"
        >
          ← Return to Handbook Home
        </Link>
      </div>
    </div>
  );
}
