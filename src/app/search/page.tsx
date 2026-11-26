'use client';

import React, { useEffect, useState } from 'react';
import { PageHeader } from '@/components/ui';
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
    <div>
      <PageHeader
        eyebrow="Full-text search"
        title={<>Search <em>handbooks</em> &amp; papers</>}
        lede={`Instant client-side search across all ${TOTAL_POSTS.toLocaleString()} engineering posts, research digests and topics.`}
      />

      <div id="search-container" className="min-h-[300px] max-w-4xl">
        {error && (
          <p className="py-8 text-[15px] text-ink-muted">
            The search index is generated during static export (<code>npm run build</code>) and compiled with Pagefind into the production site.
          </p>
        )}
        {!loaded && !error && (
          <p className="py-8 font-mono text-xs uppercase tracking-wider text-ink-muted">Initializing search index&hellip;</p>
        )}
      </div>
    </div>
  );
}
