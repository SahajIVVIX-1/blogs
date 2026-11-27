import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  allPosts,
  getPostBySlug,
  slugOf,
  dayKey,
  postUrl,
  fmtDate,
  formatBlogNo,
  readingTime,
  phases,
  CATEGORY_LABEL,
  type Post,
} from '@/lib/posts';
import { markdownToHtml } from '@/lib/markdown';
import PaperCard from '@/components/PaperCard';
import MermaidRender from '@/components/MermaidRender';
import { Icon, Chip, CATEGORY_ICON_NAME } from '@/components/ui';
import ReadingProgressBar from '@/components/ReadingProgressBar';

interface PageProps {
  params: Promise<{
    year: string;
    month: string;
    day: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = allPosts();
  return posts.map((p) => {
    const [year, month, day] = dayKey(p.data.date).split('-');
    return {
      year,
      month,
      day,
      slug: slugOf(p),
    };
  });
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { year, month, day, slug } = await params;
  const post = getPostBySlug(year, month, day, slug);
  if (!post) return { title: 'Not Found' };

  return {
    title: post.data.title,
    description: post.data.summary,
    openGraph: {
      title: post.data.title,
      description: post.data.summary,
      type: 'article',
      publishedTime: post.data.date.toISOString(),
      tags: post.data.tags,
    },
  };
}

export default async function PostDetailPage({ params }: PageProps) {
  const { year, month, day, slug } = await params;
  const post = getPostBySlug(year, month, day, slug);

  if (!post) {
    notFound();
  }

  const posts = allPosts();
  const d = post.data;
  const phase = d.phase ? phases.find((p) => p.n === d.phase) : undefined;
  const key = dayKey(d.date);
  const read = readingTime(post);

  // Curriculum Prev/Next navigation
  let prev: Post | undefined;
  let next: Post | undefined;

  if (d.phase) {
    const studyPosts = posts
      .filter((q) => q.data.phase === d.phase && q.data.step)
      .sort((a, b) => a.data.step! - b.data.step!);
    const idx = studyPosts.findIndex((q) => q.id === post.id);
    if (idx > 0) prev = studyPosts[idx - 1];
    if (idx >= 0 && idx < studyPosts.length - 1) next = studyPosts[idx + 1];
  }

  const html = await markdownToHtml(post.body);

  return (
    <article className="mx-auto max-w-[1120px]" data-pagefind-body data-blog-no={formatBlogNo(post.number)}>
      <ReadingProgressBar />
      <MermaidRender />
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 font-mono text-[11.5px] uppercase tracking-wider text-ink-muted">
        <Link prefetch={false} href="/" className="tok-link">Home</Link>
        <span aria-hidden="true">/</span>
        {phase ? (
          <>
            <Link prefetch={false} href="/study/" className="tok-link">Study</Link>
            <span aria-hidden="true">/</span>
            <Link prefetch={false} href={`/learning-path/#phase-${phase.n}`} className="tok-link">Phase {phase.n}</Link>
          </>
        ) : (
          <Link prefetch={false} href={`/${d.categories[0]}/`} className="tok-link">
            {CATEGORY_LABEL[d.categories[0]] ?? 'Archive'}
          </Link>
        )}
        <span aria-hidden="true">/</span>
        <span className="text-ink">#{formatBlogNo(post.number)}</span>
      </nav>

      {/* Meta */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        {post.number && <Chip accent>Blog #{formatBlogNo(post.number)}</Chip>}
        {d.categories.map((c) => (
          <span key={c} data-pagefind-filter="category">
            <Chip>
              <Icon name={CATEGORY_ICON_NAME[c] ?? 'book'} size={12} />
              {CATEGORY_LABEL[c]}
            </Chip>
          </span>
        ))}
        {phase && (
          <Link prefetch={false} href={`/learning-path/#phase-${phase.n}`} className="chip hover:border-accent hover:text-accent">
            Phase {phase.n} &middot; {phase.name} {d.step ? `(Step ${d.step})` : ''}
          </Link>
        )}
        <Chip><Icon name="clock" size={12} />{read}</Chip>
        <Chip><Icon name="calendar" size={12} />{fmtDate(d.date)}</Chip>
      </div>

      {/* Title */}
      <h1 className="max-w-[26ch] text-[clamp(2rem,4.4vw,3.6rem)] leading-[1.05] tracking-tight text-ink">
        {d.title}
      </h1>

      {/* Abstract */}
      {d.summary && (
        <p className="mt-8 max-w-[70ch] border-l-2 border-accent pl-5 text-[clamp(1.25rem,.7vw+1.1rem,1.6rem)] italic leading-snug text-ink-soft" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
          {d.summary}
        </p>
      )}

      {/* Research Paper Card */}
      {d.card && d.papers[0] && (
        <PaperCard card={d.card} paper={d.papers[0]} />
      )}

      {/* Markdown Content */}
      <div
        className="prose dark:prose-invert max-w-none mt-8 text-ink text-base leading-relaxed"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      {/* Tags */}
      {d.tags && d.tags.length > 0 && (
        <div className="mt-14 flex flex-wrap items-center gap-2 border-t border-border pt-6">
          <span className="eyebrow mr-2">Tags</span>
          {d.tags.map((t) => (
            <Link prefetch={false} key={t} href={`/tags/${t}/`} className="chip hover:border-accent hover:text-accent">
              #{t}
            </Link>
          ))}
        </div>
      )}

      {/* Verified primary sources */}
      {d.sources && d.sources.length > 0 && (
        <section className="mt-12 border-t border-border pt-8">
          <p className="eyebrow">Verified sources</p>
          <ol className="mt-5 space-y-3">
            {d.sources.map((s, idx) => (
              <li key={idx} className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-2 text-[15px]">
                <span className="font-mono text-[11.5px] text-ink-muted">{String(idx + 1).padStart(2, '0')}</span>
                <span>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="tok-link text-ink">
                    {s.title}
                  </a>
                  <span className="text-ink-muted"> &mdash; {s.publisher}</span>
                </span>
              </li>
            ))}
          </ol>
          {!d.categories.includes('study') && (
            <p className="mt-4 text-sm text-ink-muted">
              This article is a factual summary composed strictly from verified public technical reports and official releases.
            </p>
          )}
        </section>
      )}

      {/* Author */}
      <section className="mt-14 grid gap-5 border-t border-border pt-8 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center">
        <span className="author-logo" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="logo-l" src="/brand/logo-light.webp" alt="" width="56" height="56" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="logo-d" src="/brand/logo-dark.webp" alt="" width="56" height="56" />
        </span>
        <div>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h4 className="text-lg">Sahaj Saliya</h4>
            <span className="font-mono text-[11.5px] text-ink-muted">PDEU Gandhinagar &middot; 2023-2027</span>
          </div>
          <p className="mt-1.5 max-w-[70ch] text-[15px] leading-relaxed text-ink-muted">
            B.Tech ICT student researching LLMs, autonomous multi-agent architectures, computer vision and cognitive frameworks for deep learning.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <a href="https://info.sahaj.si" className="lnk">Portfolio<Icon name="up" size={11} /></a>
            <a href="https://github.com/SahajIVVIX-1" target="_blank" rel="noopener noreferrer" className="lnk">GitHub<Icon name="up" size={11} /></a>
            <a href="https://x.com/SahajS59" target="_blank" rel="noopener noreferrer" className="lnk">X<Icon name="up" size={11} /></a>
          </div>
        </div>
      </section>

      {/* Pager */}
      {(prev || next) && (
        <nav className="mt-14 grid gap-4 border-t border-border pt-8 sm:grid-cols-2" aria-label="Curriculum Navigation">
          {prev ? (
            <Link prefetch={false} href={postUrl(prev)} className="group block rounded-none border-l-2 border-border pl-5 transition-colors hover:border-accent">
              <span className="eyebrow" style={{ color: 'var(--ink-3)' }}>Previous</span>
              <span className="mt-2 block text-lg leading-snug text-ink transition-colors group-hover:text-accent">{prev.data.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link prefetch={false} href={postUrl(next)} className="group block border-l-2 border-border pl-5 transition-colors hover:border-accent sm:text-right sm:border-l-0 sm:border-r-2 sm:pl-0 sm:pr-5">
              <span className="eyebrow" style={{ color: 'var(--ink-3)' }}>Next</span>
              <span className="mt-2 block text-lg leading-snug text-ink transition-colors group-hover:text-accent">{next.data.title}</span>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      )}
    </article>
  );
}
