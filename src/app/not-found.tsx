import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
      <div className="text-4xl font-mono font-bold text-emerald-400">404</div>
      <h1 className="text-3xl text-ink">Page Not Found</h1>
      <p className="max-w-md text-sm text-ink-muted">
        The requested technical handbook or research digest could not be located.
      </p>
      <div className="pt-4 flex gap-3">
        <Link
          href="/"
          className="rounded-lg bg-emerald-500 px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-emerald-400"
        >
          Return Home
        </Link>
        <Link
          href="/archive/"
          className="rounded-lg border border-border bg-surface px-4 py-2 text-xs font-semibold text-ink hover:border-emerald-500"
        >
          Browse Archive
        </Link>
      </div>
    </div>
  );
}

