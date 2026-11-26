'use client';

import { useEffect } from 'react';

/**
 * Curriculum chapters are collapsed by default. When the page is opened (or navigated) with #phase-N,
 * scroll to that chapter and open its topic list, as if the button had been pressed.
 */
export default function PhaseHashOpen() {
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const run = (hash: string) => {
      const m = hash.match(/^#phase-(\d+)$/);
      if (!m) return;
      const el = document.getElementById(`phase-${m[1]}`);
      if (!el) return;
      clearTimeout(timer);
      timer = setTimeout(() => {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // open the list once the scroll has mostly arrived, so the motion reads as: go there, then it opens
        setTimeout(() => {
          const d = el.querySelector('details');
          if (d) d.open = true;
          el.classList.add('phase-flash');
          setTimeout(() => el.classList.remove('phase-flash'), 2200);
        }, 420);
      }, 80);
    };

    run(window.location.hash);
    const onHash = () => run(window.location.hash);
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.('a');
      const href = a?.getAttribute('href') || '';
      const i = href.indexOf('#phase-');
      if (i >= 0 && (href.startsWith('#') || href.split('#')[0].replace(/\/$/, '').endsWith('/learning-path'))) run(href.slice(i));
    };
    window.addEventListener('hashchange', onHash);
    window.addEventListener('popstate', onHash);
    document.addEventListener('click', onClick);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('hashchange', onHash);
      window.removeEventListener('popstate', onHash);
      document.removeEventListener('click', onClick);
    };
  }, []);

  return null;
}
