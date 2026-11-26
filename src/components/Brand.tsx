'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * Header brand, ported from info.sahaj.si:
 *  - the ring around the logo is a live scroll-progress indicator (it keeps going round as you read)
 *  - the logo tilts toward the pointer and shows attention ticks on hover
 *  - the wordmark morphs token by token from "blog@sahaj.si" to "Sahaj Saliya" once the page's
 *    title (h1) scrolls under the header, and back again when it returns
 * Both texts are laid out at all times (hidden sizers) so the nav never shifts.
 */
const A = ['blog', '@', 'sah', 'aj', '.si'];
const B = ['Sah', 'aj', ' Sal', 'iya'];
const B_SHORT = ['Sah', 'aj', ' S', '.'];
const TICKS: [number, number, number, number][] = [
  [20, -1, 20, -3.2], [30.5, 1.81, 31, 0.95], [38.19, 9.5, 39.57, 8.7], [41, 20, 41.8, 20],
  [38.19, 30.5, 39.92, 31.5], [30.5, 38.19, 31.1, 39.23], [20, 41, 20, 41.9], [9.5, 38.19, 8.6, 39.75],
  [1.81, 30.5, 0.86, 31.05], [-1, 20, -3.2, 20], [1.81, 9.5, 1.12, 9.1], [9.5, 1.81, 8.75, 0.51],
];

export default function Brand() {
  const pathname = usePathname();
  const brandRef = useRef<HTMLAnchorElement>(null);
  const logoRef = useRef<SVGSVGElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);
  const curRef = useRef<HTMLSpanElement>(null);

  // ring = scroll progress through the page
  useEffect(() => {
    const ring = ringRef.current;
    if (!ring) return;
    let queued = false;
    const set = () => {
      queued = false;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      ring.style.setProperty('--p', (p * 100).toFixed(2));
    };
    const onScroll = () => {
      if (!queued) {
        queued = true;
        requestAnimationFrame(set);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    // pages grow as content/fonts load: re-measure shortly after navigation
    const t1 = setTimeout(set, 150);
    const t2 = setTimeout(set, 900);
    set();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [pathname]);

  // hover: attention ticks + tilt
  useEffect(() => {
    const brand = brandRef.current;
    const logo = logoRef.current;
    if (!brand || !logo) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let off: ReturnType<typeof setTimeout>;
    const enter = () => {
      clearTimeout(off);
      brand.classList.add('is-attn');
    };
    const leave = () => {
      logo.style.transform = '';
      off = setTimeout(() => brand.classList.remove('is-attn'), 700);
    };
    const move = (e: PointerEvent) => {
      if (reduced || e.pointerType === 'touch') return;
      const r = logo.getBoundingClientRect();
      const c = (v: number) => Math.max(-1, Math.min(1, v));
      const dx = c((e.clientX - (r.left + r.width / 2)) / (r.width / 2));
      const dy = c((e.clientY - (r.top + r.height / 2)) / (r.height / 2));
      logo.style.transform = `perspective(120px) rotateX(${(-dy * 8).toFixed(1)}deg) rotateY(${(dx * 8).toFixed(1)}deg)`;
    };
    brand.addEventListener('pointerenter', enter);
    brand.addEventListener('pointerleave', leave);
    brand.addEventListener('pointermove', move);
    return () => {
      clearTimeout(off);
      brand.removeEventListener('pointerenter', enter);
      brand.removeEventListener('pointerleave', leave);
      brand.removeEventListener('pointermove', move);
    };
  }, []);

  // wordmark morph, driven by the page's h1 passing under the header
  useEffect(() => {
    const cur = curRef.current;
    if (!cur) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const compact = () => window.matchMedia('(max-width: 360px)').matches;
    const tokens = (w: 'A' | 'B') => (w === 'A' ? A : compact() ? B_SHORT : B);
    const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
    let shown: 'A' | 'B' = 'A';
    let seq = 0;
    let alive = true;

    const plain = (w: 'A' | 'B') => {
      cur.textContent = w === 'A' ? 'blog@sahaj.si' : compact() ? 'Sahaj S.' : 'Sahaj Saliya';
      cur.classList.remove('is-fade');
      shown = w;
    };
    plain('A');

    const peek = (tok: HTMLElement) => {
      const d = document.createElement('div');
      d.className = 'dist';
      d.setAttribute('aria-hidden', 'true');
      const rows: [string, number][] = [[tok.textContent!.trim(), 0.82], ['ah', 0.1], ['am', 0.05]];
      d.innerHTML = rows
        .map(
          ([t, p], i) =>
            `<div class="dist-row${i ? '' : ' is-pick'}"><span class="dist-tok">${t}</span><span class="dist-bar"><i style="--p:${Math.round(p * 100)}%"></i></span><span class="dist-p">${p.toFixed(2)}</span></div>`
        )
        .join('');
      tok.append(d);
      setTimeout(() => {
        d.classList.add('is-out');
        setTimeout(() => d.remove(), 320);
      }, 380);
    };

    async function go(to: 'A' | 'B') {
      if (to === shown) return;
      const my = ++seq;
      if (reduced) {
        cur!.classList.add('is-fade');
        await wait(160);
        if (my === seq) plain(to);
        return;
      }
      // 1. detokenise the old text, right to left
      cur!.textContent = '';
      const old = tokens(shown).map((t) => {
        const s = document.createElement('span');
        s.className = 'bt-tok';
        s.textContent = t;
        cur!.append(s);
        return s;
      });
      for (let i = old.length - 1; i >= 0; i--) {
        old[i].classList.add('is-out');
        await wait(30);
        if (my !== seq || !alive) return;
      }
      await wait(20);
      if (my !== seq || !alive) return;
      // 2. generate the new text token by token
      cur!.textContent = '';
      const fresh = tokens(to).map((t) => {
        const s = document.createElement('span');
        s.className = 'bt-tok is-in';
        s.textContent = t;
        cur!.append(s);
        return s;
      });
      for (let i = 0; i < fresh.length; i++) {
        requestAnimationFrame(() => fresh[i].classList.add('is-on'));
        if (to === 'B' && i === 1) peek(fresh[i]);
        await wait(38);
        if (my !== seq || !alive) return;
      }
      await wait(40);
      if (my === seq && alive) plain(to);
    }

    let past = false;
    let h1: Element | null = null;
    const head = document.querySelector('header');
    const check = () => {
      if (!h1 || !h1.isConnected) h1 = document.querySelector('main h1');
      if (!h1 || !head) return;
      const bottom = h1.getBoundingClientRect().bottom;
      const hb = head.getBoundingClientRect().bottom;
      if (!past && bottom <= hb) past = true;
      else if (past && bottom > hb + 40) past = false;
      else return;
      go(past ? 'B' : 'A');
    };
    let queued = false;
    const onScroll = () => {
      if (!queued) {
        queued = true;
        requestAnimationFrame(() => {
          queued = false;
          check();
        });
      }
    };
    const onResize = () => {
      if (shown === 'B') plain('B');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    const t = setTimeout(check, 200); // a page opened already scrolled past its title shows the name straight away
    return () => {
      alive = false;
      clearTimeout(t);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [pathname]);

  const onClick = (e: React.MouseEvent) => {
    if (pathname !== '/' || e.metaKey || e.ctrlKey || e.shiftKey || e.button) return;
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Link
      ref={brandRef}
      href="/"
      onClick={onClick}
      className="brand"
      aria-label="blog@sahaj.si, Sahaj Saliya, home"
      title="Sahaj Saliya, home"
    >
      <svg ref={logoRef} className="brand-logo" viewBox="0 0 40 40" width="40" height="40" aria-hidden="true" focusable="false">
        <circle className="ring-track" cx="20" cy="20" r="19.25" />
        <g transform="rotate(-90 20 20)">
          <circle ref={ringRef} className="ring-prog" cx="20" cy="20" r="19.25" pathLength="100" />
        </g>
        <g className="ticks">
          {TICKS.map(([x1, y1, x2, y2], i) => (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />
          ))}
        </g>
        <image className="logo-img logo-l" href="/brand/logo-light.webp" x="3" y="3" width="34" height="34" />
        <image className="logo-img logo-d" href="/brand/logo-dark.webp" x="3" y="3" width="34" height="34" />
      </svg>
      <span className="brand-text" aria-hidden="true">
        <span className="bt-cur" ref={curRef}>blog@sahaj.si</span>
        <span className="bt-size">blog@sahaj.si</span>
        <span className="bt-size">Sahaj Saliya</span>
      </span>
    </Link>
  );
}
