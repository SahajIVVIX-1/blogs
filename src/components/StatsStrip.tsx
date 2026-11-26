import React from 'react';
import Link from 'next/link';
import { Icon, type IconName } from '@/components/ui';

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
  const items: { label: string; value: string; href: string; icon: IconName }[] = [
    { label: 'Articles', value: stats.total.toLocaleString(), href: '/archive/', icon: 'layers' },
    { label: 'Active days', value: stats.days.toLocaleString(), href: '/archive/', icon: 'calendar' },
    { label: 'Study modules', value: stats.study.toLocaleString(), href: '/study/', icon: 'book' },
    { label: 'Research papers', value: stats.papers.toLocaleString(), href: '/papers/', icon: 'paper' },
    { label: 'AI updates', value: stats.ai.toLocaleString(), href: '/ai/', icon: 'bolt' },
    ...(stats.personal
      ? [{ label: 'Mindset essays', value: stats.personal.toLocaleString(), href: '/personal/', icon: 'leaf' as IconName }]
      : []),
  ];

  return (
    <div className="stats" style={{ ['--cols' as string]: items.length }}>
      {items.map((item) => (
        <Link key={item.label} href={item.href} className="stat" prefetch={false}>
          <div className="stat-top">
            <span className="stat-label">{item.label}</span>
            <Icon name={item.icon} size={16} />
          </div>
          <div className="stat-val">{item.value}</div>
          <Icon name="up" size={16} className="stat-arrow absolute right-4 bottom-4" />
        </Link>
      ))}
    </div>
  );
}
