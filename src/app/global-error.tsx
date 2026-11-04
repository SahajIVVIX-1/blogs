'use client';

import React, { useEffect } from 'react';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function RootGlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error('Fatal Root Client Error caught in global-error:', error);
  }, [error]);

  return (
    <html lang="en" data-theme="dark" className="dark">
      <body className="min-h-screen bg-[#0a0f1d] text-[#e2e8f0] flex flex-col items-center justify-center p-6 font-sans">
        <div className="max-w-md w-full rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center backdrop-blur-md shadow-2xl">
          <div className="mx-auto mb-4 h-12 w-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-xl text-emerald-400">
            ⚡
          </div>
          <h2 className="text-xl font-bold tracking-tight text-white font-serif">
            Sahaj Saliya · Handbooks
          </h2>
          <p className="mt-2 text-xs text-slate-400 leading-relaxed">
            The application intercepted a client-side navigation exception. Click below to reload the handbook interface.
          </p>
          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
            <button
              onClick={() => {
                try {
                  reset();
                } catch {
                  window.location.href = '/';
                }
              }}
              className="rounded-lg bg-emerald-500 px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-emerald-400 transition-colors"
            >
              Reload Page
            </button>
            <a
              href="/"
              className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-slate-300 hover:text-white transition-colors"
            >
              Go to Home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
