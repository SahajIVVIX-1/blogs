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
  CATEGORY_ICON,
  type Post,
} from '@/lib/posts';
import { markdownToHtml } from '@/lib/markdown';
import PaperCard from '@/components/PaperCard';
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

  const getBadgeClass = (cat: string) => {
    switch (cat) {
      case 'study':
        return 'border-indigo-500/30 bg-indigo-500/10 text-indigo-400';
      case 'ai':
        return 'border-purple-500/30 bg-purple-500/10 text-purple-400';
      case 'papers':
        return 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400';
      case 'projects':
        return 'border-cyan-500/30 bg-cyan-500/10 text-cyan-400';
      case 'personal':
        return 'border-amber-500/30 bg-amber-500/10 text-amber-400';
      default:
        return 'border-border bg-subtle text-ink-muted';
    }
  };

  return (
    <article className="mx-auto max-w-4xl" data-pagefind-body data-blog-no={formatBlogNo(post.number)}>
      <ReadingProgressBar />
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-ink-muted">
        <Link href="/" className="hover:text-ink">Home</Link>
        <span>/</span>
        {phase ? (
          <>
            <Link href="/study/" className="hover:text-ink">Study</Link>
            <span>/</span>
            <Link href={`/learning-path/#phase-${phase.n}`} className="hover:text-ink">
              Phase {phase.n}: {phase.name}
            </Link>
          </>
        ) : (
          <Link href={`/${d.categories[0]}/`} className="hover:text-ink">
            {CATEGORY_LABEL[d.categories[0]] ?? 'Archive'}
          </Link>
        )}
        <span>/</span>
        <span className="text-ink font-mono font-semibold">Blog #{formatBlogNo(post.number)}</span>
      </nav>

      {/* Header Meta */}
      <div className="mb-4 flex flex-wrap items-center gap-2 text-xs">
        {post.number && (
          <span className="inline-flex items-center gap-1 rounded-md border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-xs font-bold text-emerald-400">
            Blog #{formatBlogNo(post.number)}
          </span>
        )}
        {d.categories.map((c) => (
          <span
            key={c}
            className={`inline-flex items-center gap-1 rounded-md border px-2.5 py-0.5 font-medium ${getBadgeClass(c)}`}
            data-pagefind-filter="category"
          >
            {CATEGORY_ICON[c]} {CATEGORY_LABEL[c]}
          </span>
        ))}
        {phase && (
          <Link
            href={`/learning-path/#phase-${phase.n}`}
            className="rounded-md border border-border bg-surface px-2.5 py-0.5 font-medium text-ink-muted hover:text-ink hover:border-emerald-500/50"
          >
            Phase {phase.n} · {phase.name} {d.step ? `(Step ${d.step})` : ''}
          </Link>
        )}
        <span className="text-ink-muted">⏱️ {read}</span>
        <span className="text-ink-muted">· Published {fmtDate(d.date)}</span>
      </div>

      {/* Article Title */}
      <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ink leading-tight">
        {d.title}
      </h1>

      {/* Executive Summary Abstract */}
      {d.summary && (
        <div className="mt-4 rounded-xl border-l-4 border-emerald-500 bg-surface/60 p-4 text-base italic leading-relaxed text-ink-muted">
          {d.summary}
        </div>
      )}

      {/* Research Paper Card */}
      {d.card && d.papers[0] && (
        <PaperCard card={d.card} paper={d.papers[0]} />
      )}

      {/* Markdown Content */}
      <div
        className="prose prose-invert max-w-none mt-8 text-ink text-base leading-relaxed"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      {/* Tags */}
      {d.tags && d.tags.length > 0 && (
        <div className="mt-12 flex flex-wrap items-center gap-2 border-t border-border pt-6 text-xs">
          <span className="font-bold tracking-wider text-ink-muted uppercase">Tags:</span>
          {d.tags.map((t) => (
            <Link
              key={t}
              href={`/tags/${t}/`}
              className="rounded-md border border-border bg-surface px-2.5 py-1 text-ink-muted transition-colors hover:border-emerald-500 hover:text-emerald-400"
            >
              #{t}
            </Link>
          ))}
        </div>
      )}

      {/* Verified Primary Sources */}
      {d.sources && d.sources.length > 0 && (
        <section className="mt-10 rounded-xl border border-border bg-surface p-5">
          <h3 className="font-serif text-lg font-bold text-ink">Verified Primary Sources</h3>
          <ol className="mt-3 list-decimal list-inside space-y-1.5 text-xs text-ink-muted">
            {d.sources.map((s, idx) => (
              <li key={idx}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:underline"
                >
                  {s.title}
                </a>
                <span> — {s.publisher}</span>
              </li>
            ))}
          </ol>
          {!d.categories.includes('study') && (
            <p className="mt-3 text-[11px] text-ink-muted/80">
              This article is a factual summary composed strictly from verified public technical reports and official releases.
            </p>
          )}
        </section>
      )}

      {/* Author Bio Card */}
      <section className="mt-12 rounded-2xl border border-border/80 bg-surface/70 p-6 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 font-serif text-xl font-bold text-slate-950 shadow-md">
            SS
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h4 className="font-serif text-base font-bold text-ink">Sahaj Saliya</h4>
              <span className="text-xs text-ink-muted">PDEU Gandhinagar · 2023–2027</span>
            </div>
            <p className="text-xs leading-relaxed text-ink-muted">
              B.Tech ICT Student researching LLMs, Autonomous Multi-Agent Architectures, Computer Vision, and cognitive frameworks for deep learning.
            </p>
            <div className="flex items-center gap-3 pt-1 text-xs">
              <a href="https://info.sahaj.si" target="_blank" rel="noopener noreferrer" className="font-medium text-emerald-400 hover:underline">
                Portfolio ↗
              </a>
              <span className="text-border">·</span>
              <a href="https://github.com/SahajIVVIX-1" target="_blank" rel="noopener noreferrer" className="text-ink-muted hover:text-ink">
                GitHub ↗
              </a>
              <span className="text-border">·</span>
              <a href="https://x.com/SahajS59" target="_blank" rel="noopener noreferrer" className="text-ink-muted hover:text-ink">
                X / Twitter ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Navigation Pager */}
      {(prev || next) && (
        <nav className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border pt-6" aria-label="Curriculum Navigation">
          {prev ? (
            <Link
              href={postUrl(prev)}
              className="flex w-full sm:w-auto items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-xs font-semibold text-ink transition-colors hover:border-emerald-500 hover:text-emerald-400"
            >
              ← Previous: {prev.data.title}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={postUrl(next)}
              className="flex w-full sm:w-auto items-center justify-end gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-xs font-bold text-slate-950 transition-colors hover:bg-emerald-400 ml-auto"
            >
              Next: {next.data.title} →
            </Link>
          ) : (
            <span />
          )}
        </nav>
      )}
    </article>
  );
}
