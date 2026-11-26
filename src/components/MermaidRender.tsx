'use client';

import { useEffect } from 'react';

/**
 * Renders every ```mermaid block on the page (emitted as <pre class="mermaid"> by lib/markdown.ts),
 * the way GitHub does. Mermaid is loaded on demand (only on pages that have a diagram), uses the
 * site's colours and fonts, and re-renders when the theme changes.
 */
export default function MermaidRender() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('pre.mermaid'));
    if (!nodes.length) return;
    nodes.forEach((n) => {
      if (!n.dataset.src) n.dataset.src = n.textContent || '';
    });

    let alive = true;
    let running = false;
    let again = false;
    let seq = 0;

    const rgb = (cs: CSSStyleDeclaration, name: string) => `rgb(${cs.getPropertyValue(name).trim().split(/\s+/).join(',')})`;

    const render = async () => {
      if (running) {
        again = true;
        return;
      }
      running = true;
      try {
        const mermaid = (await import('mermaid')).default;
        try {
          await Promise.all([document.fonts.load('500 14px "Inter Tight"'), document.fonts.load('700 14px "Inter Tight"'), document.fonts.ready]);
        } catch {}
        const cs = getComputedStyle(document.documentElement);
        const paper = rgb(cs, '--paper-rgb');
        const paper2 = rgb(cs, '--paper-2-rgb');
        const paper3 = rgb(cs, '--paper-3-rgb');
        const ink = rgb(cs, '--ink-rgb');
        const ink3 = rgb(cs, '--ink-3-rgb');
        const rule2 = rgb(cs, '--rule-2-rgb');
        const accent = rgb(cs, '--accent-rgb');
        const accentHex = (() => { const m = accent.match(/\d+/g) || ['178', '62', '14']; return '#' + m.slice(0, 3).map((x) => (+x).toString(16).padStart(2, '0')).join(''); })();

        mermaid.initialize({
          startOnLoad: false,
          securityLevel: 'strict',
          theme: 'base',
          fontFamily: "'Inter Tight', ui-sans-serif, system-ui, sans-serif",
          flowchart: { htmlLabels: true, curve: 'basis', wrappingWidth: 340, padding: 14, nodeSpacing: 46, rankSpacing: 54, useMaxWidth: true },
          themeVariables: {
            background: paper,
            primaryColor: paper2,
            primaryTextColor: ink,
            primaryBorderColor: rule2,
            secondaryColor: paper3,
            tertiaryColor: paper,
            lineColor: ink3,
            textColor: ink,
            mainBkg: paper2,
            nodeBorder: rule2,
            clusterBkg: paper2,
            edgeLabelBackground: paper,
            titleColor: accent,
            fontSize: '14px',
          },
        });

        for (const n of nodes) {
          if (!alive) return;
          const src = (n.dataset.src || '').replace(/classDef title [^\n]*/, `classDef title fill:transparent,stroke:transparent,color:${accentHex},font-weight:700;`);
          try {
            const { svg } = await mermaid.render(`mmd-${Date.now()}-${seq++}`, src, n);
            if (!alive) return;
            n.innerHTML = svg;
            n.classList.add('is-rendered');
            n.classList.remove('is-failed');
            n.setAttribute('role', 'img');
            const title = /^\s*T\(\["(.+?)"\]\)/m.exec(src)?.[1];
            if (title) n.setAttribute('aria-label', 'Diagram: ' + title.replace(/#amp;/g, '&').replace(/#quot;/g, '"'));
          } catch {
            n.textContent = src;
            n.classList.add('is-failed');
          }
        }
      } finally {
        running = false;
        if (again && alive) {
          again = false;
          render();
        }
      }
    };

    render();

    // theme switches (the Navbar toggles data-theme on <html>)
    const mo = new MutationObserver(() => render());
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    return () => {
      alive = false;
      mo.disconnect();
    };
  }, []);

  return null;
}
