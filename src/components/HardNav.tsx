'use client';

import { useEffect } from 'react';

/**
 * This is a static site on a CDN. Next's in-browser page loader (soft navigation) can fail on large pages
 * when the CDN streams them in chunks, which showed the "client-side navigation exception" screen.
 * So internal links do an ordinary full page load instead: about a second slower, but it never breaks.
 * (Same-page #hash links, new-tab / modified clicks and downloads keep their normal behaviour.)
 */
export default function HardNav() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement | null)?.closest?.('a');
      if (!a || !a.href) return;
      if ((a.target && a.target !== '_self') || a.hasAttribute('download')) return;
      let url: URL;
      try {
        url = new URL(a.href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;
      if (/\.(xml|pdf|json|txt|zip|png|jpe?g|webp|svg|ico)$/i.test(url.pathname)) return;
      // hash-only change on the same page: let the browser (and the curriculum / archive scripts) handle it
      if (url.pathname === window.location.pathname && url.search === window.location.search) return;
      e.preventDefault();
      e.stopPropagation();
      window.location.assign(url.href);
    };
    // capture phase on document: runs before React / Next see the click
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  return null;
}
