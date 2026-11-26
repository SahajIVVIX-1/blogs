import React from 'react';
import Link from 'next/link';

interface StatsProps {
  stats: {
    days: number;
    total: number;
    papers: number;
    ai: number;
    study: number;
    projects: number;
    personal?: number;
    streak: number;
  };
}

export default function StatsStrip({ stats }: StatsProps) {
  const items = [
    { label: 'Total Articles', value: stats.total.toLocaleString(), href: '/archive/', icon: '📚', color: 'emerald' },
    { label: 'Active Days', value: stats.days.toLocaleString(), href: '/archive/', icon: '🗓️', color: 'blue' },
    { label: 'Study Modules', value: stats.study.toLocaleString(), href: '/study/', icon: '🧠', color: 'indigo' },
    { label: 'Research Papers', value: stats.papers.toLocaleString(), href: '/papers/', icon: '📄', color: 'teal' },
    { label: 'AI Updates', value: stats.ai.toLocaleString(), href: '/ai/', icon: '⚡', color: 'purple' },
    ...(stats.personal
      ? [{ label: 'Personal & Mindset', value: stats.personal.toLocaleString(), href: '/personal/', icon: '🌱', color: 'amber' }]
      : []),
  ];

  return (
    <div className={`grid grid-cols-2 gap-3 sm:grid-cols-3 ${items.length === 6 ? 'lg:grid-cols-6' : 'lg:grid-cols-5'}`}>
      {items.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className="group relative overflow-hidden rounded-xl border border-border/80 bg-surface/70 p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-500/40 hover:bg-surface hover:shadow-lg hover:shadow-emerald-500/5"
        >
          <div className="flex items-center justify-between text-xs font-medium text-ink-muted">
            <span className="truncate">{item.label}</span>
            <span className="text-base select-none">{item.icon}</span>
          </div>
          <div className="mt-2 font-serif text-2xl tracking-tight text-ink group-hover:text-emerald-400 transition-colors">
            {item.value}
          </div>
        </Link>
      ))}
    </div>
  );
}

