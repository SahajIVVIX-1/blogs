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
    streak: number;
  };
}

export default function StatsStrip({ stats }: StatsProps) {
  const items = [
    { label: 'Total Articles', value: stats.total.toLocaleString(), href: '/archive/', icon: '📚' },
    { label: 'Active Days', value: stats.days.toLocaleString(), href: '/archive/', icon: '🗓️' },
    { label: 'Research Papers', value: stats.papers.toLocaleString(), href: '/papers/', icon: '📄' },
    { label: 'AI Updates', value: stats.ai.toLocaleString(), href: '/ai/', icon: '⚡' },
    { label: 'Study Modules', value: stats.study.toLocaleString(), href: '/study/', icon: '🧠' },
    { label: 'Current Streak', value: `${stats.streak}d`, href: '/archive/', icon: '🔥' },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {items.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className="group flex flex-col rounded-xl border border-border bg-surface p-3.5 transition-all hover:border-emerald-500/50 hover:bg-surface/80"
        >
          <div className="flex items-center justify-between text-xs text-ink-muted">
            <span>{item.label}</span>
            <span className="text-sm">{item.icon}</span>
          </div>
          <div className="mt-1.5 font-serif text-2xl font-bold tracking-tight text-ink group-hover:text-emerald-400 transition-colors">
            {item.value}
          </div>
        </Link>
      ))}
    </div>
  );
}

