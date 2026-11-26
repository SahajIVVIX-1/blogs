'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Icon } from '@/components/ui';

/**
 * In-page search palette (opens over the current page, no navigation).
 *  - blog number:   "2244", "#2244", "blog 2244"
 *  - dates:         "2026-01-01", "1 Jan 2026", "jan 2026", "2026", "01/01/2026", "2026-01"
 *  - words:         title, summary, tags, category, phase, paper authors (instant, local index)
 *  - article text:  Pagefind full-text index (when the site was built with it), with excerpts
 * Open with the header Search button or Ctrl/Cmd + K. Esc closes.
 */

type Row = [number, string, string, string, string, string, string, string, number];
interface Doc {
  n: number;
  url: string;
  title: string;
  date: string; // yyyy-mm-dd
  cat: string;
  tags: string;
  summary: string;
  authors: string;
  phase: number;
  hay: string; // lowercase haystack of everything but the title
  tl: string; // lowercase title
}
interface Hit {
  key: string;
  url: string;
  title: string;
  meta: string;
  excerpt?: string;
  note?: string;
}

const MONTHS = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
const CAT: Record<string, string> = { study: 'Study', ai: 'AI', papers: 'Paper', projects: 'Project', personal: 'Mindset' };
const pad = (n: number) => String(n).padStart(2, '0');
const prettyDate = (iso: string) => {
  const [y, m, d] = iso.split('-').map(Number);
  return `${d} ${MONTHS[m - 1].slice(0, 3).replace(/^./, (c) => c.toUpperCase())} ${y}`;
};
const monthIdx = (w: string) => (w.length >= 3 ? MONTHS.findIndex((m) => m.startsWith(w)) : -1);
const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** Parse the whole query as a date or date range; returns an ISO prefix like 2026-01-01 / 2026-01 / 2026. */
function parseDate(q: string): string | null {
  const s = q.trim().toLowerCase().replace(/,/g, ' ').replace(/\s+/g, ' ');
  let m: RegExpMatchArray | null;
  if ((m = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/))) return `${m[1]}-${pad(+m[2])}-${pad(+m[3])}`;
  if ((m = s.match(/^(\d{4})[-/](\d{1,2})$/))) return `${m[1]}-${pad(+m[2])}`;
  if ((m = s.match(/^(\d{1,2})[/.-](\d{1,2})[/.-](\d{4})$/))) return `${m[3]}-${pad(+m[2])}-${pad(+m[1])}`;
  if ((m = s.match(/^(\d{1,2})(?:st|nd|rd|th)? ([a-z]{3,9}) (\d{4})$/)) && monthIdx(m[2]) >= 0) return `${m[3]}-${pad(monthIdx(m[2]) + 1)}-${pad(+m[1])}`;
  if ((m = s.match(/^([a-z]{3,9}) (\d{1,2})(?:st|nd|rd|th)? (\d{4})$/)) && monthIdx(m[1]) >= 0) return `${m[3]}-${pad(monthIdx(m[1]) + 1)}-${pad(+m[2])}`;
  if ((m = s.match(/^([a-z]{3,9}) (\d{4})$/)) && monthIdx(m[1]) >= 0) return `${m[2]}-${pad(monthIdx(m[1]) + 1)}`;
  if ((m = s.match(/^(20\d{2})$/))) return m[1];
  return null;
}

function highlight(text: string, terms: string[]) {
  const ts = terms.filter((t) => t.length > 1);
  if (!ts.length) return text;
  const re = new RegExp(`(${ts.map(esc).join('|')})`, 'ig');
  return text.split(re).map((part, i) =>
    i % 2 === 1 ? (
      <mark key={i} className="sp-mark">
        {part}
      </mark>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    )
  );
}

let docsCache: Doc[] | null = null;
let docsPromise: Promise<Doc[]> | null = null;
function loadDocs(): Promise<Doc[]> {
  if (docsCache) return Promise.resolve(docsCache);
  if (!docsPromise) {
    docsPromise = fetch('/search-index.json')
      .then((r) => r.json())
      .then((rows: Row[]) => {
        docsCache = rows.map(([n, url, title, date, cat, tags, summary, authors, phase]) => {
          const [y, mo, d] = date.split('-').map(Number);
          const dates = `${date} ${d} ${MONTHS[mo - 1]} ${y} ${MONTHS[mo - 1].slice(0, 3)} ${pad(d)}/${pad(mo)}/${y}`;
          return {
            n, url, title, date, cat, tags, summary, authors, phase,
            tl: title.toLowerCase(),
            hay: `#${n} ${String(n).padStart(4, '0')} blog ${n} ${dates} ${cat} ${CAT[cat] ?? ''} ${tags.replace(/-/g, ' ')} ${tags} ${summary} ${authors} ${phase ? `phase ${phase} phase-${phase}` : ''}`.toLowerCase(),
          };
        });
        return docsCache;
      })
      .catch(() => {
        docsPromise = null;
        return [];
      });
  }
  return docsPromise;
}

type PF = { search: (q: string) => Promise<{ results: { data: () => Promise<{ url: string; excerpt: string; meta?: { title?: string } }> }[] }> };
let pfPromise: Promise<PF | null> | null = null;
function loadPagefind(): Promise<PF | null> {
  if (!pfPromise) {
    pfPromise = (async () => {
      try {
        const url = '/pagefind/pagefind.js';
        const mod = await import(/* webpackIgnore: true */ url);
        return mod as PF;
      } catch {
        return null;
      }
    })();
  }
  return pfPromise;
}

function localSearch(docs: Doc[], query: string): { hits: Doc[]; label: string; terms: string[] } {
  const q = query.trim();
  const ql = q.toLowerCase();

  // blog number
  const num = ql.match(/^(?:#|blog\s*#?|no\.?\s*|number\s*)?0*(\d{1,4})$/);
  if (num && !/^20\d{2}$/.test(ql.replace(/^#/, ''))) {
    const n = +num[1];
    const exact = docs.find((d) => d.n === n);
    if (exact) return { hits: [exact], label: `Blog #${n}`, terms: [] };
  }
  if (/^(?:#|blog\s*#?)\s*\d+$/.test(ql)) {
    return { hits: [], label: '', terms: [] };
  }

  // date
  const dp = parseDate(q);
  if (dp) {
    const hits = docs.filter((d) => d.date.startsWith(dp)).sort((a, b) => (a.date < b.date ? 1 : a.n < b.n ? 1 : -1));
    const pretty = dp.length === 10 ? prettyDate(dp) : dp.length === 7 ? `${MONTHS[+dp.slice(5) - 1]} ${dp.slice(0, 4)}` : dp;
    return { hits, label: `Published ${pretty}`, terms: [] };
  }

  // words (all terms must match somewhere)
  const terms = ql.split(/\s+/).filter(Boolean);
  if (!terms.length) return { hits: [], label: '', terms };
  const scored: { d: Doc; s: number }[] = [];
  for (const d of docs) {
    let s = 0;
    let ok = true;
    for (const t of terms) {
      const inTitle = d.tl.indexOf(t);
      const inHay = d.hay.indexOf(t);
      if (inTitle < 0 && inHay < 0) {
        ok = false;
        break;
      }
      if (inTitle >= 0) s += 6 + (inTitle === 0 || d.tl[inTitle - 1] === ' ' ? 3 : 0);
      if (inHay >= 0) s += 2;
    }
    if (ok) {
      if (d.tl.includes(ql)) s += 8;
      scored.push({ d, s });
    }
  }
  scored.sort((a, b) => b.s - a.s || (a.d.date < b.d.date ? 1 : -1));
  return { hits: scored.map((x) => x.d), label: '', terms };
}

export default function SearchPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [docs, setDocs] = useState<Doc[]>([]);
  const [deep, setDeep] = useState<Hit[]>([]);
  const [deepBusy, setDeepBusy] = useState(false);
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    setOpen(false);
    document.documentElement.style.overflow = '';
    lastFocus.current?.focus?.();
  }, []);

  // open: button/event and Ctrl/Cmd+K
  useEffect(() => {
    const show = () => {
      lastFocus.current = document.activeElement as HTMLElement | null;
      setOpen(true);
    };
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        show();
      } else if (e.key === 'Escape') {
        setOpen((o) => {
          if (o) document.documentElement.style.overflow = '';
          return false;
        });
      }
    };
    window.addEventListener('sahaj:search-open', show);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('sahaj:search-open', show);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    document.documentElement.style.overflow = 'hidden';
    loadDocs().then(setDocs);
    loadPagefind(); // warm up
    const t = setTimeout(() => { inputRef.current?.focus(); inputRef.current?.select(); }, 30);
    return () => clearTimeout(t);
  }, [open]);

  const local = useMemo(() => (docs.length ? localSearch(docs, q) : { hits: [], label: '', terms: [] as string[] }), [docs, q]);

  // deep (article body) search through Pagefind, debounced
  useEffect(() => {
    const term = q.trim();
    if (!open || term.length < 3 || /^#?\d+$/.test(term) || parseDate(term)) {
      setDeep([]);
      setDeepBusy(false);
      return;
    }
    let alive = true;
    setDeepBusy(true);
    const t = setTimeout(async () => {
      const pf = await loadPagefind();
      if (!pf) {
        if (alive) {
          setDeep([]);
          setDeepBusy(false);
        }
        return;
      }
      try {
        const res = await pf.search(term);
        const data = await Promise.all(res.results.slice(0, 12).map((r) => r.data()));
        if (!alive) return;
        setDeep(
          data.map((d) => ({
            key: 'pf:' + d.url,
            url: d.url,
            title: d.meta?.title || d.url,
            meta: '',
            excerpt: d.excerpt,
          }))
        );
      } catch {
        if (alive) setDeep([]);
      } finally {
        if (alive) setDeepBusy(false);
      }
    }, 220);
    return () => {
      alive = false;
      clearTimeout(t);
    };
  }, [q, open]);

  const hits: Hit[] = useMemo(() => {
    const seen = new Set<string>();
    const out: Hit[] = [];
    const byUrl = new Map(docs.map((d) => [d.url.replace(/\/$/, ''), d]));
    const base = q.trim() ? local.hits : docs.slice(-8).reverse();
    for (const d of base.slice(0, 40)) {
      seen.add(d.url.replace(/\/$/, ''));
      out.push({
        key: 'l:' + d.n,
        url: d.url,
        title: d.title,
        meta: [`#${String(d.n).padStart(4, '0')}`, prettyDate(d.date), CAT[d.cat] ?? d.cat, d.phase ? `Phase ${d.phase}` : ''].filter(Boolean).join(' · '),
        excerpt: q.trim() && local.terms.length ? snippet(d, local.terms) : undefined,
      });
    }
    for (const h of deep) {
      const k = h.url.replace(/\/$/, '').replace(/\.html$/, '');
      if (seen.has(k)) continue;
      seen.add(k);
      const d = byUrl.get(k);
      out.push({
        ...h,
        title: d?.title || h.title,
        meta: d ? [`#${String(d.n).padStart(4, '0')}`, prettyDate(d.date), CAT[d.cat] ?? d.cat, d.phase ? `Phase ${d.phase}` : ''].filter(Boolean).join(' · ') : '',
        note: 'Found in article text',
      });
    }
    return out;
  }, [local, deep, docs, q]);

  useEffect(() => setActive(0), [q, open]);
  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>('[data-active="true"]')?.scrollIntoView({ block: 'nearest' });
  }, [active, hits.length]);

  const go = (h?: Hit) => {
    if (!h) return;
    close();
    router.push(h.url);
  };

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => Math.min(hits.length - 1, a + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(0, a - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      go(hits[active]);
    }
  };

  if (!open) return null;
  const terms = local.terms;
  const empty = !q.trim();

  return (
    <div className="sp-backdrop" onMouseDown={(e) => e.target === e.currentTarget && close()} role="presentation">
      <div className="sp-panel" role="dialog" aria-modal="true" aria-label="Search the blog">
        <div className="sp-input-row">
          <Icon name="search" size={18} className="sp-ico" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={onInputKey}
            placeholder="Search words, a date, or a blog number"
            aria-label="Search"
            role="combobox"
            aria-expanded="true"
            aria-controls="sp-list"
            aria-activedescendant={hits[active] ? `sp-${hits[active].key}` : undefined}
            autoComplete="off"
            spellCheck={false}
            className="sp-input"
          />
          {q && (
            <button type="button" className="sp-clear" onClick={() => { setQ(''); inputRef.current?.focus(); }} aria-label="Clear search">
              Clear
            </button>
          )}
          <button type="button" className="sp-esc" onClick={close} aria-label="Close search">
            Esc
          </button>
        </div>

        <div className="sp-status" aria-live="polite">
          {empty ? (
            <span>Latest posts. Try <button type="button" onClick={() => setQ('2244')}>2244</button>, <button type="button" onClick={() => setQ('1 Jan 2026')}>1 Jan 2026</button>, <button type="button" onClick={() => setQ('lora')}>lora</button> or <button type="button" onClick={() => setQ('mindset')}>mindset</button></span>
          ) : local.label ? (
            <span>{local.label} &middot; {hits.length.toLocaleString()} result{hits.length === 1 ? '' : 's'}</span>
          ) : (
            <span>{hits.length.toLocaleString()} result{hits.length === 1 ? '' : 's'}{deepBusy ? ' · searching article text…' : ''}</span>
          )}
        </div>

        <ul id="sp-list" role="listbox" ref={listRef} className="sp-list">
          {hits.map((h, i) => (
            <li
              key={h.key}
              id={`sp-${h.key}`}
              role="option"
              aria-selected={i === active}
              data-active={i === active}
              className="sp-item"
              onMouseMove={() => i !== active && setActive(i)}
              onClick={() => go(h)}
            >
              <div className="sp-item-main">
                <span className="sp-title">{highlight(h.title, terms)}</span>
                {h.meta && <span className="sp-meta">{h.meta}</span>}
                {h.note && <span className="sp-meta">{h.note}</span>}
                {h.excerpt && (h.key.startsWith('pf:') ? <span className="sp-exc" dangerouslySetInnerHTML={{ __html: h.excerpt }} /> : <span className="sp-exc">{highlight(h.excerpt, terms)}</span>)}
              </div>
              <Icon name="arrow" size={15} className="sp-go" />
            </li>
          ))}
          {!empty && hits.length === 0 && !deepBusy && (
            <li className="sp-none">
              Nothing found for &ldquo;{q}&rdquo;. Try fewer words, a blog number (<code>2244</code>) or a date (<code>jan 2026</code>).
            </li>
          )}
        </ul>

        <div className="sp-foot">
          <span><kbd>↑</kbd><kbd>↓</kbd> move</span>
          <span><kbd>Enter</kbd> open</span>
          <span><kbd>Esc</kbd> close</span>
          <span className="sp-foot-r">Searches titles, dates, numbers, tags, authors and article text</span>
        </div>
      </div>
    </div>
  );
}

/** a short context line from the summary around the first matched term */
function snippet(d: Doc, terms: string[]): string | undefined {
  const text = d.summary;
  if (!text) return undefined;
  const lower = text.toLowerCase();
  const idx = terms.map((t) => lower.indexOf(t)).filter((i) => i >= 0).sort((a, b) => a - b)[0];
  if (idx === undefined) return text.length > 140 ? text.slice(0, 140) + '…' : text;
  const start = Math.max(0, idx - 50);
  return (start > 0 ? '…' : '') + text.slice(start, start + 150) + (start + 150 < text.length ? '…' : '');
}
