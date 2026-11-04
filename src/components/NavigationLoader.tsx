'use client';

import React, { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function NavigationLoader() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const [showPill, setShowPill] = useState(false);
  const [pillText, setPillText] = useState('Loading...');

  const timerRef = useRef<NodeJS.Timeout[]>([]);
  const activeRef = useRef(false);
  const lastPathRef = useRef(pathname);

  const clearTimers = () => {
    timerRef.current.forEach((t) => clearTimeout(t));
    timerRef.current = [];
  };

  const startLoading = (text = 'Loading...') => {
    clearTimers();
    activeRef.current = true;
    setPillText(text);
    setVisible(true);
    setProgress(15);

    // Progressive glide
    timerRef.current.push(
      setTimeout(() => {
        if (activeRef.current) setProgress(38);
      }, 100)
    );

    timerRef.current.push(
      setTimeout(() => {
        if (activeRef.current) {
          setProgress(65);
          setShowPill(true); // Show floating Medium-style indicator if taking > 120ms
        }
      }, 180)
    );

    timerRef.current.push(
      setTimeout(() => {
        if (activeRef.current) setProgress(85);
      }, 400)
    );

    timerRef.current.push(
      setTimeout(() => {
        if (activeRef.current) setProgress(92);
      }, 900)
    );

    // Hard safety timeout: auto-finish within 3.5s so loader NEVER gets stuck
    timerRef.current.push(
      setTimeout(() => {
        if (activeRef.current) {
          finishLoading();
        }
      }, 3500)
    );
  };

  const finishLoading = () => {
    clearTimers();
    if (!activeRef.current && progress === 0) return;
    activeRef.current = false;
    setProgress(100);
    setShowPill(false);

    // Fade out and reset
    timerRef.current.push(
      setTimeout(() => {
        setVisible(false);
        timerRef.current.push(
          setTimeout(() => {
            setProgress(0);
          }, 200)
        );
      }, 200)
    );
  };

  // Route change detector
  useEffect(() => {
    if (lastPathRef.current !== pathname) {
      lastPathRef.current = pathname;
      finishLoading();
      // Scroll to top smoothly on page transition
      try {
        window.scrollTo(0, 0);
      } catch {}
    }
  }, [pathname]);

  // Global click interceptor for internal links
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      // Ignore right clicks or meta/ctrl/shift clicks
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (e.defaultPrevented) return;

      const target = (e.target as HTMLElement)?.closest('a');
      if (!target || !target.href) return;

      // Ignore download, external, new tab, or target="_blank"
      if (target.target === '_blank' || target.hasAttribute('download')) return;

      try {
        const url = new URL(target.href, window.location.origin);
        // Only internal links
        if (url.origin !== window.location.origin) return;

        // Ignore hash jumps or identical pathname
        if (url.pathname === window.location.pathname) {
          return;
        }

        // Determine nice loading label based on target
        let label = 'Loading...';
        if (/^\/\d{4}\/\d{2}\/\d{2}\//.test(url.pathname)) {
          label = 'Opening article...';
        } else if (url.pathname.includes('/personal')) {
          label = 'Loading essays...';
        } else if (url.pathname.includes('/study')) {
          label = 'Loading study notes...';
        } else if (url.pathname.includes('/papers')) {
          label = 'Loading research papers...';
        } else if (url.pathname.includes('/ai')) {
          label = 'Loading AI releases...';
        } else if (url.pathname.includes('/learning-path')) {
          label = 'Loading curriculum...';
        } else if (url.pathname.includes('/search')) {
          label = 'Opening search...';
        }

        startLoading(label);
      } catch {}
    };

    const handlePopState = () => {
      startLoading('Navigating...');
    };

    document.addEventListener('click', handleDocumentClick, { capture: true });
    window.addEventListener('popstate', handlePopState);

    return () => {
      clearTimers();
      document.removeEventListener('click', handleDocumentClick, { capture: true });
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  if (!visible && progress === 0) return null;

  return (
    <>
      {/* Medium-style Top Progress Bar */}
      <div
        className="fixed top-0 left-0 right-0 z-[99999] pointer-events-none h-[3px] bg-transparent"
        aria-hidden="true"
      >
        <div
          className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400 transition-all duration-200 ease-out relative"
          style={{
            width: `${progress}%`,
            opacity: visible ? 1 : 0,
            boxShadow: progress > 0 ? '0 0 12px rgba(16, 185, 129, 0.8), 0 0 4px rgba(245, 158, 11, 0.6)' : 'none',
          }}
        >
          {/* Subtle pulse glow on the tip of the progress bar */}
          {visible && progress < 100 && (
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-r from-transparent to-white/90 animate-pulse shadow-[0_0_8px_#10b981]" />
          )}
        </div>
      </div>

      {/* Medium-style floating status indicator pill */}
      {showPill && (
        <div
          className="fixed bottom-6 right-6 z-[99998] pointer-events-none flex items-center gap-2.5 rounded-full border border-border/80 bg-surface/90 px-4 py-2 shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-2 duration-150"
          role="status"
          aria-live="polite"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
          </span>
          <span className="font-mono text-xs font-medium text-ink">
            {pillText}
          </span>
        </div>
      )}
    </>
  );
}
