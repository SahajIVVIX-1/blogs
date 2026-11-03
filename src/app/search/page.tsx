'use client';

import React, { useEffect, useState } from 'react';

declare global {
  interface Window {
    PagefindUI: any;
  }
}

export default function SearchPage() {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Load Pagefind UI CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/pagefind/pagefind-ui.css';
    document.head.appendChild(link);

    // Load Pagefind UI Script
    const script = document.createElement('script');
    script.src = '/pagefind/pagefind-ui.js';
    script.async = true;
    script.onload = () => {
      if (window.PagefindUI) {
        new window.PagefindUI({
          element: '#search-container',
          showSubResults: true,
          showImages: false,
          autofocus: true,
        });
        setLoaded(true);
      }
    };
    script.onerror = () => {
      setError(true);
    };
    document.body.appendChild(script);

    return () => {
      try {
        document.head.removeChild(link);
        document.body.removeChild(script);
      } catch (e) {}
    };
  }, []);

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="space-y-2">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-ink">Search Handbooks & Papers</h1>
        <p className="text-xs text-ink-muted">
          Instant client-side full-text search indexing all 2,780+ engineering posts, research digests, and topics.
        </p>
      </div>

      <div id="search-container" className="min-h-[300px] rounded-xl border border-border bg-surface p-6 shadow-sm">
        {error && (
          <div className="text-xs text-ink-muted py-8 text-center">
            The search index is generated during static export (`npm run build`). It is compiled via Pagefind into the production site.
          </div>
        )}
        {!loaded && !error && (
          <div className="text-xs text-ink-muted py-8 text-center">
            Initializing search index...
          </div>
        )}
      </div>
    </div>
  );
}
