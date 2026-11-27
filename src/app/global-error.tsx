'use client';

import React, { useEffect, useState } from 'react';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Last-resort boundary. Almost every error here is a transient loading glitch, so it silently reloads the page
 * (at most once every 15 s, so a real bug can never cause a loop) and only then shows a calm screen.
 */
export default function RootGlobalError({ error }: GlobalErrorProps) {
  const [reloading, setReloading] = useState(false);

  useEffect(() => {
    console.error('Root client error:', error);
    let recent = false;
    try {
      recent = Date.now() - Number(sessionStorage.getItem('errReloadAt') || 0) < 15000;
    } catch {}
    if (!recent) {
      setReloading(true);
      try {
        sessionStorage.setItem('errReloadAt', String(Date.now()));
      } catch {}
      const t = setTimeout(() => window.location.reload(), 50);
      return () => clearTimeout(t);
    }
  }, [error]);

  return (
    <html lang="en">
      <body style={{ margin: 0, minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 24, background: '#0B1020', color: '#ECE8DE', fontFamily: "'Inter Tight', ui-sans-serif, system-ui, sans-serif" }}>
        <main style={{ maxWidth: 460, width: '100%' }}>
          <p style={{ margin: 0, font: "500 11.5px/1 'JetBrains Mono', ui-monospace, monospace", letterSpacing: '.08em', textTransform: 'uppercase', color: '#FF8A5B' }}>
            {reloading ? 'Reloading' : 'Something went wrong'}
          </p>
          <h1 style={{ margin: '18px 0 0', fontWeight: 450, fontSize: 'clamp(2rem, 8vw, 3rem)', lineHeight: 1.05, letterSpacing: '-.03em' }}>
            {reloading ? 'One moment…' : 'Please reload the page.'}
          </h1>
          {!reloading && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 28 }}>
              <button onClick={() => window.location.reload()} style={{ minHeight: 44, padding: '0 20px', borderRadius: 999, border: 0, background: '#FF8A5B', color: '#1A0B04', font: "500 14.5px/1 'Inter Tight', sans-serif", cursor: 'pointer' }}>
                Reload page
              </button>
              <a href="/" style={{ minHeight: 44, display: 'inline-flex', alignItems: 'center', padding: '0 20px', borderRadius: 999, border: '1px solid #2A3557', color: '#ECE8DE', textDecoration: 'none', font: "500 14.5px/1 'Inter Tight', sans-serif" }}>
                Go home
              </a>
            </div>
          )}
        </main>
      </body>
    </html>
  );
}
