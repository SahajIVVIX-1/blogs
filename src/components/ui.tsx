import React from 'react';
import Link from 'next/link';

/* ---------- icons (16px line icons, currentColor) ---------- */
const PATHS: Record<string, React.ReactNode> = {
  arrow: <path d="M3 8h10M9 4l4 4-4 4" />,
  up: <path d="M5 11l6-6M6 5h5v5" />,
  book: <path d="M3 3.5A1.5 1.5 0 0 1 4.5 2H13v10H4.5A1.5 1.5 0 0 0 3 13.5v-10zM3 13.5A1.5 1.5 0 0 0 4.5 15H13" />,
  map: <path d="M2 4l4-1.5L10 4l4-1.5v9.5L10 13.5 6 12 2 13.5V4zM6 2.5V12M10 4v9.5" />,
  paper: <path d="M4 2h5.5L13 5.5V14H4V2zM9 2v4h4M6 8.5h5M6 11h5" />,
  bolt: <path d="M9 1.5L3.5 9H8l-1 5.5L12.5 7H8l1-5.5z" />,
  leaf: <path d="M3 13c0-5 3-9 10-9 0 7-4 10-8 9.5M3 13c2-3 4-4.5 7-5.5" />,
  code: <path d="M5.5 4.5L2 8l3.5 3.5M10.5 4.5L14 8l-3.5 3.5M9 3l-2 10" />,
  calendar: <path d="M2.5 4h11v9.5h-11V4zM2.5 7h11M5.5 2v3M10.5 2v3" />,
  clock: <path d="M8 2.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11zM8 5v3.2l2 1.3" />,
  grid: <path d="M2.5 2.5h4.5v4.5H2.5zM9 2.5h4.5v4.5H9zM2.5 9h4.5v4.5H2.5zM9 9h4.5v4.5H9z" />,
  layers: <path d="M8 2L2 5.2 8 8.4l6-3.2L8 2zM2 8.2l6 3.2 6-3.2M2 11l6 3.2 6-3.2" />,
  search: <path d="M6.8 2.2a4.6 4.6 0 1 0 0 9.2 4.6 4.6 0 0 0 0-9.2zM10.2 10.2L14 14" />,
  rss: <path d="M3 3a10 10 0 0 1 10 10M3 7a6 6 0 0 1 6 6M3.5 12.5h.01" />,
  tag: <path d="M2.5 2.5h5.2l6 6-5.2 5.2-6-6V2.5zM5.5 5.5h.01" />,
  check: <path d="M3 8.5l3.2 3L13 4.5" />,
  chevron: <path d="M4 6l4 4 4-4" />,
};

export type IconName = keyof typeof PATHS;

export function Icon({ name, size = 16, className }: { name: IconName; size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {PATHS[name]}
    </svg>
  );
}

export const CATEGORY_ICON_NAME: Record<string, IconName> = {
  study: 'book',
  ai: 'bolt',
  papers: 'paper',
  projects: 'code',
  personal: 'leaf',
};

/* ---------- page header: eyebrow, big title, lede, actions ---------- */
export function PageHeader({
  eyebrow,
  title,
  lede,
  actions,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <header className="page-head">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      {lede && <p className="lede">{lede}</p>}
      {actions && <div className="page-actions">{actions}</div>}
    </header>
  );
}

/* ---------- section heading: mono kicker, title, optional side link ---------- */
export function SectionHead({
  kicker,
  title,
  sub,
  href,
  hrefLabel,
}: {
  kicker?: string;
  title: React.ReactNode;
  sub?: React.ReactNode;
  href?: string;
  hrefLabel?: string;
}) {
  return (
    <div className="sec-head">
      <div>
        {kicker && <p className="eyebrow">{kicker}</p>}
        <h2>{title}</h2>
        {sub && <p className="sub">{sub}</p>}
      </div>
      {href && (
        <Link href={href} className="btn btn-ghost btn-sm">
          <span>{hrefLabel ?? 'View all'}</span>
          <Icon name="arrow" size={14} />
        </Link>
      )}
    </div>
  );
}

/* ---------- buttons ---------- */
export function Btn({
  href,
  children,
  variant = 'primary',
  icon,
  trailing = 'arrow',
  external,
}: {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'ghost';
  icon?: IconName;
  trailing?: IconName | null;
  external?: boolean;
}) {
  const cls = `btn ${variant === 'primary' ? 'btn-primary' : 'btn-ghost'}`;
  const inner = (
    <>
      {icon && <Icon name={icon} size={15} />}
      <span>{children}</span>
      {trailing && <Icon name={external ? 'up' : trailing} size={14} className="btn-trail" />}
    </>
  );
  if (external || /^https?:/.test(href) || /\.(xml|pdf)$/.test(href)) {
    return (
      <a href={href} className={cls} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} prefetch={false}>
      {inner}
    </Link>
  );
}

/* ---------- small outlined tag ---------- */
export function Chip({ children, accent }: { children: React.ReactNode; accent?: boolean }) {
  return <span className={`chip${accent ? ' chip-accent' : ''}`}>{children}</span>;
}
