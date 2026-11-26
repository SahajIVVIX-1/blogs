'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorProps) {
  const [retrying, setRetrying] = useState(false);

  useEffect(() => {
    console.error('Captured client-side navigation exception:', error);

    // If the error is a transient interrupted stream / network drop ("Connection closed.", "Failed to fetch", etc.)
    // automatically trigger a clean page reload so the user is never stranded on this screen!
    const msg = error?.message || '';
    const isTransientNetworkError =
      /Connection closed|Failed to fetch|Load failed|NetworkError|aborted|enqueueModel|reading 'enqueueModel'|Cannot read properties of null/i.test(msg);

    // Reload at most once per 15 s so a persistent bug can never cause a reload loop.
    let recentlyReloaded = false;
    try {
      const last = Number(sessionStorage.getItem('errReloadAt') || 0);
      recentlyReloaded = Date.now() - last < 15000;
    } catch {}

    if (isTransientNetworkError && !recentlyReloaded) {
      setRetrying(true);
      const timer = setTimeout(() => {
        try {
          sessionStorage.setItem('errReloadAt', String(Date.now()));
          window.location.reload();
        } catch {
          reset();
        }
      }, 60);
      return () => clearTimeout(timer);
    }
  }, [error, reset]);

  return (
    <div className="page-head" style={{ borderBottom: 0, minHeight: '60vh' }}>
      <p className="eyebrow">{retrying ? 'Reconnecting' : 'Safe client recovery'}</p>
      <h1>{retrying ? <>Refreshing the <em>connection</em>&hellip;</> : <>Interface <em>recovered</em>.</>}</h1>
      <p className="lede">
        {retrying
          ? 'Re-establishing the connection with the static handbook cache.'
          : 'A transient client-side issue was caught and contained. Reload to continue smoothly.'}
      </p>

      {error?.message && !retrying && (
        <p className="mt-5 max-w-lg break-all font-mono text-[11px] text-ink-muted">{error.message}</p>
      )}

      <div className="page-actions">
        <button
          onClick={() => {
            try {
              window.location.reload();
            } catch {
              reset();
            }
          }}
          className="btn btn-primary"
        >
          Reload page
        </button>
        <Link href="/" className="btn btn-ghost">Return home</Link>
      </div>
    </div>
  );
}
