import React from 'react';
import Link from 'next/link';
import { allPosts, stats as getStats, phaseProgress, byDay, CATEGORY_LABEL, postUrl, fmtDate, formatBlogNo, readingTime } from '@/lib/posts';
import StatsStrip from '@/components/StatsStrip';
import PhaseGrid from '@/components/PhaseGrid';
import PostList from '@/components/PostList';
import { Btn, Icon, SectionHead } from '@/components/ui';
import Heatmap from '@/components/Heatmap';

export default function HomePage() {
  const posts = allPosts();
  const stats = getStats(posts);
  const phases = phaseProgress(posts);

  const studyPosts = posts.filter((p) => p.data.categories.includes('study'));
  const paperPosts = posts.filter((p) => p.data.categories.includes('papers'));
  const aiPosts = posts.filter((p) => p.data.categories.includes('ai'));
  const projectPosts = posts.filter((p) => p.data.categories.includes('projects'));
  const personalPosts = posts.filter((p) => p.data.categories.includes('personal'));

  // Featured personal essay for the editorial spotlight
  const featuredPersonal = personalPosts[0];

  // Prepare heatmap data
  const daysMap: Record<string, { count: number; categories: string[] }> = {};
  const dayGroups = byDay(posts);
  for (const [key, ps] of dayGroups.entries()) {
    daysMap[key] = {
      count: ps.length,
      categories: [...new Set(ps.flatMap((p) => p.data.categories.map((c) => CATEGORY_LABEL[c])))],
    };
  }

  const domains = [
    { href: '/learning-path/', icon: 'map' as const, count: '15 phases', title: <>Curriculum <em>roadmap</em></>, text: 'A sequential path through Python internals, linear algebra, calculus, PyTorch, vision, transformers and autonomous agents.', cta: 'View the path' },
    ...(personalPosts.length > 0
      ? [{ href: '/personal/', icon: 'leaf' as const, count: `${personalPosts.length.toLocaleString()} essays`, title: <>Personal &amp; <em>mindset</em></>, text: 'Deep work, stoic equanimity under technical crises, mental models, habits and lifelong compounding systems.', cta: 'Read essays' }]
      : []),
    { href: '/papers/', icon: 'paper' as const, count: `${paperPosts.length.toLocaleString()} digests`, title: <>arXiv paper <em>digests</em></>, text: 'Rigorous summaries of seminal and daily papers: architectures, equations, benchmarks and limitations.', cta: 'Browse papers' },
    { href: '/ai/', icon: 'bolt' as const, count: `${aiPosts.length.toLocaleString()} releases`, title: <>AI industry <em>releases</em></>, text: 'Factual breakdowns of frontier models, weight releases and system evaluations from leading labs.', cta: 'Track releases' },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="page-head" style={{ borderBottom: 0, marginBottom: 0, paddingBottom: 'clamp(32px, 6vh, 72px)' }}>
        <p className="eyebrow">The intellectual &amp; engineering compendium</p>
        <h1 style={{ maxWidth: '16ch', fontSize: 'clamp(2.6rem, 7.4vw, 6.4rem)', lineHeight: 0.98 }}>
          Frontier AI, core <em>mathematics</em> &amp; the mindset of <em>mastery</em>.
        </h1>
        <p className="lede">
          I&apos;m <strong style={{ fontWeight: 500, color: 'var(--ink)' }}>Sahaj Saliya</strong>, a B.Tech ICT student at PDEU, Gandhinagar (2023–2027). This site documents my daily technical journey: curriculum handbooks with verified math and runnable code, arXiv paper breakdowns, and industry AI releases.
        </p>
        <div className="page-actions">
          <Btn href="/learning-path/" icon="map">15-phase curriculum</Btn>
          <Btn href="/papers/" variant="ghost" icon="paper" trailing={null}>Research papers ({paperPosts.length.toLocaleString()})</Btn>
          <Btn href="/study/" variant="ghost" icon="book" trailing={null}>Study guides ({studyPosts.length.toLocaleString()})</Btn>
          {personalPosts.length > 0 && (
            <Btn href="/personal/" variant="ghost" icon="leaf" trailing={null}>Mindset ({personalPosts.length.toLocaleString()})</Btn>
          )}
        </div>
      </section>

      <StatsStrip stats={stats} />

      {/* Domains */}
      <section className="section">
        <SectionHead kicker="Explore" title={<>Where to <em>start</em></>} sub="Structured tracks across foundational science, state-of-the-art AI, and cognitive mastery." />
        <div className="feat" style={{ ['--cols' as string]: domains.length }}>
          {domains.map((d) => (
            <Link key={d.href} href={d.href} prefetch={false} className="feat-item">
              <span className="feat-ico"><Icon name={d.icon} size={18} /></span>
              <span className="feat-count">{d.count}</span>
              <h3 className="feat-title">{d.title}</h3>
              <p className="feat-text">{d.text}</p>
              <span className="feat-cta">Open <Icon name="arrow" size={14} /></span>
            </Link>
          ))}
        </div>
      </section>

      {/* Spotlight essay */}
      {featuredPersonal && (
        <section className="section">
          <div className="spot">
            <div>
              <p className="eyebrow">
                Spotlight essay{featuredPersonal.number ? ` · #${formatBlogNo(featuredPersonal.number)}` : ''} · {fmtDate(featuredPersonal.data.date)}
              </p>
              <h3>{featuredPersonal.data.title}</h3>
              <p className="sum">{featuredPersonal.data.summary}</p>
            </div>
            <div>
              <Btn href={postUrl(featuredPersonal)} icon="leaf">Read the essay</Btn>
            </div>
          </div>
        </section>
      )}

      {/* Activity */}
      <section className="section">
        <Heatmap daysMap={daysMap} />
      </section>

      {/* Curriculum preview */}
      <section className="section">
        <SectionHead
          kicker="Curriculum"
          title={<>Fifteen phases, <em>one</em> path</>}
          sub="Step-by-step master tracks from Python to agentic systems."
          href="/learning-path/"
          hrefLabel="All 15 phases"
        />
        <PhaseGrid phases={phases} limit={6} />
      </section>

      {/* Latest */}
      <section className="section">
        <SectionHead
          kicker="Latest"
          title={<>Recent <em>dispatches</em></>}
          sub="Every entry links verified primary sources, derivations and actionable takeaways."
          href="/archive/"
          hrefLabel={`Full archive (${posts.length.toLocaleString()})`}
        />
        <div className="tabs">
          <Link href="/archive/" className="tab is-on">All <span className="n">{posts.length.toLocaleString()}</span></Link>
          <Link href="/study/" className="tab"><Icon name="book" size={14} />Study <span className="n">{studyPosts.length.toLocaleString()}</span></Link>
          <Link href="/papers/" className="tab"><Icon name="paper" size={14} />Papers <span className="n">{paperPosts.length.toLocaleString()}</span></Link>
          <Link href="/ai/" className="tab"><Icon name="bolt" size={14} />AI <span className="n">{aiPosts.length.toLocaleString()}</span></Link>
          {personalPosts.length > 0 && (
            <Link href="/personal/" className="tab"><Icon name="leaf" size={14} />Mindset <span className="n">{personalPosts.length.toLocaleString()}</span></Link>
          )}
        </div>
        <PostList posts={posts.slice(0, 10)} />
        <div className="mt-10 flex justify-center">
          <Btn href="/archive/" variant="ghost">Browse all {posts.length.toLocaleString()} articles</Btn>
        </div>
      </section>
    </div>
  );
}
