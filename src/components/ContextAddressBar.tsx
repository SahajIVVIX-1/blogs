'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { TOTAL_POSTS } from '@/lib/constants';

const THROTTLE = 500; // ms between scroll updates

declare global {
  interface Window {
    __visitorIp?: string;
    __ipPromise?: Promise<string>;
  }
}

/**
 * Safe Native Browser replaceState:
 * Invokes History.prototype.replaceState directly on window.history,
 * bypassing Next.js App Router's monkey-patched router reducer.
 * This guarantees:
 * 1. Zero spurious ACTION_RESTORE actions dispatched to Next.js
 * 2. Zero router reconciliation crashes
 * 3. Zero hydration conflicts
 * 4. Silky smooth address bar updates
 */
function safeNativeReplaceState(url: string) {
  try {
    if (typeof window === 'undefined') return;
    const proto = History.prototype;
    if (proto && typeof proto.replaceState === 'function') {
      proto.replaceState.call(window.history, window.history.state, '', url);
    } else {
      window.history.replaceState(window.history.state, '', url);
    }
  } catch {}
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
  const scrollCleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    mountedRef.current = true;
    let cancelled = false;

    // Immediately cleanup any previous scroll listeners from previous page
    if (scrollCleanupRef.current) {
      scrollCleanupRef.current();
      scrollCleanupRef.current = null;
    }

    // Direct shortlink support on homepage: ?blog=4305 or ?b=4305
    if (typeof window !== 'undefined' && (pathname === '/' || pathname === '')) {
      try {
        const params = new URLSearchParams(window.location.search);
        const bNum = params.get('blog') || params.get('b');
        if (bNum && /^\d+$/.test(bNum)) {
          fetch('/blog-index.json')
            .then((r) => r.json())
            .then((map) => {
              if (cancelled) return;
              const target = map[bNum] || map[String(bNum).padStart(4, '0')];
              if (target && target !== window.location.pathname) {
                window.location.replace(target);
              }
            })
            .catch(() => {});
        }
      } catch {}
    }

    // Detect blog number from DOM instantly (0ms synchronous lookup)
    const article = document.querySelector('article[data-blog-no]');
    const blogNo = article ? article.getAttribute('data-blog-no') : null;

    // Background asynchronous IP resolution (website loads instantly!)
    resolveIpInBackground().then(async (ip) => {
      if (cancelled || !mountedRef.current) return;

      // Notify Navbar and UI of live context
      try {
        window.dispatchEvent(
          new CustomEvent('sahaj:context', {
            detail: { ip, blogNo, total: TOTAL_POSTS },
          })
        );
      } catch {}

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
      const initialPathname = window.location.pathname;

      if (!currentSearch.includes(`context=you@${ip}`)) {
        // Smooth typewriter into address bar using safe native replaceState
        const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
        if (reducedMotion) {
          if (window.location.pathname === initialPathname) {
            safeNativeReplaceState(
              `${initialPathname}?${targetQuery}${restSuffix}${window.location.hash}`
            );
          }
        } else {
          const steps = [
            `context=you@`,
            `context=you@${ip}`,
            targetQuery,
          ];

          for (const step of steps) {
            if (cancelled || !mountedRef.current || window.location.pathname !== initialPathname) break;
            safeNativeReplaceState(
              `${initialPathname}?${step}${restSuffix}${window.location.hash}`
            );
            await new Promise((r) => setTimeout(r, 60));
          }
        }
      }

      // Throttled scroll reading progress on blog posts
      if (blogNo && !cancelled && mountedRef.current) {
        let lastScrollTime = 0;
        let lastPct = -1;
        let scrollPending: any = null;

        const updateScroll = () => {
          if (cancelled || !mountedRef.current) return;
          const scrollH = document.documentElement.scrollHeight - window.innerHeight;
          if (scrollH <= 50) return;
          const pct = Math.min(100, Math.max(0, Math.round((window.scrollY / scrollH) * 100)));

          // Only update address bar if reading progress moved at least 3% to preserve performance
          if (Math.abs(pct - lastPct) < 3 && pct !== 100 && pct !== 0) return;
          lastPct = pct;

          const readVal = `${pct}%`;
          const scrollUrl = `${window.location.pathname}?context=you@${ip}&blog=${blogNo}&read=${readVal}${restSuffix}${window.location.hash}`;
          safeNativeReplaceState(scrollUrl);
          lastScrollTime = performance.now();
          scrollPending = null;
        };

        const onScroll = () => {
          if (scrollPending) return;
          const wait = Math.max(0, THROTTLE - (performance.now() - lastScrollTime));
          scrollPending = setTimeout(updateScroll, wait);
        };

        window.addEventListener('scroll', onScroll, { passive: true });

        // Store cleanup in ref so React effect cleanup ALWAYS removes this listener!
        scrollCleanupRef.current = () => {
          window.removeEventListener('scroll', onScroll);
          if (scrollPending) clearTimeout(scrollPending);
        };
      }
    });

    return () => {
      cancelled = true;
      mountedRef.current = false;
      if (scrollCleanupRef.current) {
        scrollCleanupRef.current();
        scrollCleanupRef.current = null;
      }
    };
  }, [pathname]);

  return null;
}
