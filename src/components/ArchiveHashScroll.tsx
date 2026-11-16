'use client';

import { useEffect } from 'react';

export default function ArchiveHashScroll() {
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (!hash || !hash.startsWith('#date-')) return;
      const targetId = hash.slice(1);
      const target = document.getElementById(targetId);
      if (!target) return;

      // Expand parent details if collapsed
      const details = target.closest('details');
      if (details) {
        details.open = true;
      }

      // Smooth scroll to target
      setTimeout(() => {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Briefly add an accent highlight border/ring
        target.classList.add('ring-2', 'ring-emerald-400', 'bg-emerald-500/10');
        setTimeout(() => {
          target.classList.remove('ring-2', 'ring-emerald-400', 'bg-emerald-500/10');
        }, 2500);
      }, 60);
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  return null;
}
