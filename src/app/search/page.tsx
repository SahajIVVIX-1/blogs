'use client';

import React, { useEffect, useState } from 'react';
import { TOTAL_POSTS } from '@/lib/constants';

declare global {
  interface Window {
    PagefindUI: any;
  }
}

export default function SearchPage() {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    let script: HTMLScriptElement | null = null;
    let link: HTMLLinkElement | null = null;

    const initUI = () => {
      try {
        const container = document.getElementById('search-container');
        if (container && window.PagefindUI) {
          container.innerHTML = '';
          new window.PagefindUI({
            element: '#search-container',
            showSubResults: true,
            showImages: false,
            autofocus: true,
          });
          setLoaded(true);
        }
      } catch (e) {
        setError(true);
      }
    };

    // If PagefindUI is already in memory from a previous page visit, initialize immediately!
    if (typeof window !== 'undefined' && window.PagefindUI) {
      initUI();
    } else {
      // Ensure stylesheet exists
      if (!document.querySelector('link[href="/pagefind/pagefind-ui.css"]')) {
        link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = '/pagefind/pagefind-ui.css';
        document.head.appendChild(link);
      }

      // Load Pagefind UI Script
      script = document.createElement('script');
      script.src = '/pagefind/pagefind-ui.js';
      script.async = true;
      script.onload = () => {
        initUI();
      };
      script.onerror = () => {
        setError(true);
      };
      document.body.appendChild(script);
    }

    return () => {
      // Clean up injected elements if needed
      const container = document.getElementById('search-container');
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl text-ink">Search <em>handbooks</em> &amp; papers</h1>
        <p className="text-xs text-ink-muted">
          Instant client-side full-text search indexing all {TOTAL_POSTS.toLocaleString()} engineering posts, research digests, and topics.
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

