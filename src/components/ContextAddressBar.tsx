'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

const THROTTLE = 400; // ms between scroll updates

declare global {
  interface Window {
    __visitorIp?: string;
    __ipPromise?: Promise<string>;
  }
}

// Background, non-blocking IP resolver
function resolveIpInBackground(): Promise<string> {
  // Check in-memory cache
  if (typeof window !== 'undefined' && window.__visitorIp) {
    return Promise.resolve(window.__visitorIp);
  }

  // Check sessionStorage cache
  try {
    const cached = sessionStorage.getItem('visitorIp');
    if (cached && /^[0-9a-fA-F:.]+$/.test(cached)) {
      window.__visitorIp = cached;
      return Promise.resolve(cached);
    }
  } catch {}

  // Check ongoing promise
  if (typeof window !== 'undefined' && window.__ipPromise) {
    return window.__ipPromise;
  }

  // Start background fetch (never blocks page render or interaction)
  const promise = (async () => {
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
      if (data?.ip && /^[0-9a-fA-F:.]+$/.test(data.ip)) {
        window.__visitorIp = data.ip;
        try {
          sessionStorage.setItem('visitorIp', data.ip);
        } catch {}
        return data.ip;
      }
    } catch {}

    return 'anonymous';
  })();

  if (typeof window !== 'undefined') {
    window.__ipPromise = promise;
  }

  return promise;
}

export default function ContextAddressBar() {
  const pathname = usePathname();
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    let cancelled = false;

    // Detect blog number from DOM instantly (0ms synchronous lookup)
    const article = document.querySelector('article[data-blog-no]');
    const blogNo = article ? article.getAttribute('data-blog-no') : null;

    // Background asynchronous IP resolution (website loads instantly!)
    resolveIpInBackground().then(async (ip) => {
      if (cancelled || !mountedRef.current) return;

      // Notify Navbar and UI of live context
      window.dispatchEvent(
        new CustomEvent('sahaj:context', {
          detail: { ip, blogNo, total: 4306 },
        })
      );

      // Preserve existing unrelated query parameters (e.g. ?theme, ?utm_*)
      const existingParams = new URLSearchParams(window.location.search);
      existingParams.delete('context');
      existingParams.delete('blog');
      existingParams.delete('read');
      const rest = existingParams.toString();
      const restSuffix = rest ? `&${rest}` : '';

      const targetQuery = blogNo
        ? `context=you@${ip}&blog=${blogNo}`
        : `context=you@${ip}`;

      // Check if already applied
      const currentSearch = window.location.search;
      if (currentSearch.includes(`context=you@${ip}`)) {
        return;
      }

      // Smooth 3-step typewriter into address bar (clean, instant, zero tab-spinner lag)
      const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
      if (reducedMotion) {
        try {
          window.history.replaceState(
            window.history.state,
            '',
            `${window.location.pathname}?${targetQuery}${restSuffix}${window.location.hash}`
          );
        } catch {}
      } else {
        const steps = [
          `context=you@`,
          `context=you@${ip}`,
          targetQuery,
        ];

        for (const step of steps) {
          if (cancelled) break;
          try {
            window.history.replaceState(
              window.history.state,
              '',
              `${window.location.pathname}?${step}${restSuffix}${window.location.hash}`
            );
          } catch {}
          await new Promise((r) => setTimeout(r, 60));
        }
      }

      // Throttled scroll reading progress on blog posts
      if (blogNo && !cancelled) {
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
    });

    return () => {
      cancelled = true;
      mountedRef.current = false;
    };
  }, [pathname]);

  return null;
}
