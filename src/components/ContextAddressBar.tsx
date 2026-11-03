'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

const STEP = 50; // ms per token
const THROTTLE = 450; // ms between scroll updates

declare global {
  interface Window {
    __ip?: string;
    __ipPromise?: Promise<string | null>;
    __blogMap?: Record<string, string>;
  }
}

export default function ContextAddressBar() {
  const pathname = usePathname();
  const typingRef = useRef(false);

  useEffect(() => {
    // 1. Resolve visitor IP
    const getIp = async (): Promise<string> => {
      try {
        const cached = sessionStorage.getItem('visitorIp');
        if (cached && /^[0-9a-fA-F:.]+$/.test(cached)) {
          window.__ip = cached;
          return cached;
        }
      } catch {}

      if (window.__ipPromise) {
        const ip = await window.__ipPromise;
        if (ip) return ip;
      }

      try {
        const ctl = typeof AbortController !== 'undefined' ? new AbortController() : null;
        const timer = setTimeout(() => ctl?.abort(), 3500);
        const res = await fetch('https://api.ipify.org?format=json', {
          signal: ctl?.signal,
          cache: 'no-store',
          referrerPolicy: 'no-referrer',
        });
        clearTimeout(timer);
        const data = await res.json();
        if (data?.ip) {
          window.__ip = data.ip;
          try {
            sessionStorage.setItem('visitorIp', data.ip);
          } catch {}
          return data.ip;
        }
      } catch {}

      return 'anonymous';
    };

    // 2. Detect current blog number if on a post page
    const detectBlogNo = async (): Promise<string | null> => {
      // Check article DOM attribute
      const articleEl = document.querySelector('article[data-blog-no]');
      if (articleEl) {
        const no = articleEl.getAttribute('data-blog-no');
        if (no) return no;
      }

      // Check current path against blog-index.json
      if (/^\/\d{4}\/\d{2}\/\d{2}\/[^/]+\/?$/.test(pathname)) {
        try {
          if (!window.__blogMap) {
            const res = await fetch('/blog-index.json');
            window.__blogMap = await res.json();
          }
          const cleanPath = pathname.endsWith('/') ? pathname : pathname + '/';
          for (const [num, url] of Object.entries(window.__blogMap || {})) {
            if (url === cleanPath) {
              return String(num).padStart(4, '0');
            }
          }
        } catch {}
      }

      return null;
    };

    let cancelled = false;

    async function runTypewriter() {
      if (typingRef.current) return;
      typingRef.current = true;

      const [ip, blogNo] = await Promise.all([getIp(), detectBlogNo()]);
      if (cancelled) return;

      // Broadcast context info to Navbar and UI
      window.dispatchEvent(
        new CustomEvent('sahaj:context', {
          detail: { ip, blogNo, total: 4306 },
        })
      );

      // Preserve other query parameters (e.g. ?theme, ?utm_*)
      const existingParams = new URLSearchParams(window.location.search);
      existingParams.delete('context');
      existingParams.delete('blog');
      existingParams.delete('read');

      const restQuery = existingParams.toString();
      const restSuffix = restQuery ? `&${restQuery}` : '';

      // Construct target tokens:
      // Pattern: context=you@<IP>&blog=<blogNo> (or context=you@<IP> on homepage)
      const targetQuery = blogNo
        ? `context=you@${ip}&blog=${blogNo}`
        : `context=you@${ip}`;

      // Build token stream for animated typing
      const tokens: string[] = ['context', '=', 'you', '@', ...ip.split(/([.:])/).filter(Boolean)];
      if (blogNo) {
        tokens.push('&', 'blog', '=', blogNo);
      }

      // Check prefers-reduced-motion
      const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
      if (reducedMotion) {
        try {
          const finalUrl = `${window.location.pathname}?${targetQuery}${restSuffix}${window.location.hash}`;
          window.history.replaceState(window.history.state, '', finalUrl);
        } catch {}
        typingRef.current = false;
        return;
      }

      // Animate token by token into address bar
      let accumulated = '';
      for (const token of tokens) {
        if (cancelled) break;
        accumulated += token;
        try {
          const currentUrl = `${window.location.pathname}?${accumulated}${restSuffix}${window.location.hash}`;
          window.history.replaceState(window.history.state, '', currentUrl);
        } catch {}
        await new Promise((r) => setTimeout(r, STEP));
      }

      typingRef.current = false;

      // Setup scroll progress tracking on blog post pages
      if (blogNo) {
        let lastScroll = 0;
        let scrollPending: any = null;

        const updateScroll = () => {
          const scrollH = document.documentElement.scrollHeight - window.innerHeight;
          if (scrollH <= 0) return;
          const pct = Math.min(100, Math.max(0, Math.round((window.scrollY / scrollH) * 100)));
          const readVal = `${pct}%`;

          try {
            const scrollUrl = `${window.location.pathname}?context=you@${ip}&blog=${blogNo}&read=${readVal}${restSuffix}${window.location.hash}`;
            window.history.replaceState(window.history.state, '', scrollUrl);
          } catch {}
          lastScroll = performance.now();
          scrollPending = null;
        };

        const onScroll = () => {
          if (scrollPending) return;
          const wait = Math.max(0, THROTTLE - (performance.now() - lastScroll));
          scrollPending = setTimeout(updateScroll, wait);
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        return () => {
          window.removeEventListener('scroll', onScroll);
          if (scrollPending) clearTimeout(scrollPending);
        };
      }
    }

    // Small delay to allow Next.js hydration to stabilize
    const timeout = setTimeout(runTypewriter, 150);

    return () => {
      cancelled = true;
      clearTimeout(timeout);
      typingRef.current = false;
    };
  }, [pathname]);

  return null;
}
