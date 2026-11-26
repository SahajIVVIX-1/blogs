import React from 'react';
import type { Metadata } from 'next';
import { Btn, PageHeader, SectionHead, Icon } from '@/components/ui';

export const metadata: Metadata = {
  title: 'About Sahaj Saliya & This Notebook',
  description: 'Sahaj Saliya, B.Tech ICT Student at Pandit Deendayal Energy University (PDEU), Gandhinagar (2023-2027).',
};

const TRACKS = [
  { icon: 'book' as const, tag: 'Study guides', title: <>Structured technical <em>notes</em></>, text: 'Sequential, topic-by-topic curriculum notes across 15 engineering phases. Every code snippet is executed in a controlled Python / C++ environment before publishing.' },
  { icon: 'paper' as const, tag: 'Paper digests', title: <>Frontier research <em>breakdowns</em></>, text: 'Rigorous breakdowns of breakthrough papers from arXiv and Hugging Face Daily Papers, cataloguing the mathematical formulations, benchmarks and architectures.' },
  { icon: 'bolt' as const, tag: 'AI updates', title: <>Industry <em>releases</em></>, text: 'Concise, factual summaries of foundation model releases, technical reports and major library milestones, straight from official engineering blogs and model cards.' },
];

const PRINCIPLES = [
  ['Verified sources', 'Every article cites primary sources: arXiv DOIs, GitHub repositories, official release announcements.'],
  ['Mathematical rigour', 'Core concepts are explained with complete LaTeX derivations rather than hand-waving analogies.'],
  ['Executable implementations', 'Algorithms ship as complete, self-contained Python / PyTorch code blocks with verified outputs.'],
];

export default function AboutPage() {
  return (
    <div>
      <PageHeader
        eyebrow="About the author"
        title={<>Sahaj <em>Saliya</em></>}
        lede="B.Tech ICT student at Pandit Deendayal Energy University (PDEU), Gandhinagar (2023-2027), focusing on LLMs, generative AI, computer vision and autonomous multi-agent systems."
        actions={
          <>
            <Btn href="https://info.sahaj.si" external icon="map">Portfolio</Btn>
            <Btn href="https://github.com/SahajIVVIX-1" external variant="ghost" icon="code">GitHub</Btn>
            <Btn href="https://www.linkedin.com/in/sahajs59" external variant="ghost">LinkedIn</Btn>
          </>
        }
      />

      <section>
        <SectionHead
          kicker="This notebook"
          title={<>A public engineering <em>journal</em></>}
          sub="Started on 4 August 2023 (my first day at PDEU) and updated continuously. Both a structured learning handbook and an archival log, across three tracks."
        />
        <div className="feat" style={{ ['--cols' as string]: 3 }}>
          {TRACKS.map((t) => (
            <div key={t.tag} className="feat-item" style={{ cursor: 'default' }}>
              <span className="feat-ico"><Icon name={t.icon} size={18} /></span>
              <span className="feat-count">{t.tag}</span>
              <h3 className="feat-title">{t.title}</h3>
              <p className="feat-text">{t.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHead kicker="Principles" title={<>Engineering <em>philosophy</em></>} />
        <ol className="idx" style={{ listStyle: 'none' }}>
          {PRINCIPLES.map(([h, t], i) => (
            <li key={h} className="idx-row" style={{ gridTemplateColumns: '3.2rem minmax(0,1fr)' }}>
              <span className="idx-n">{String(i + 1).padStart(2, '0')}</span>
              <span>
                <span className="idx-title block">{h}</span>
                <span className="mt-2 block max-w-[70ch] text-[15px] leading-relaxed text-ink-muted">{t}</span>
              </span>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
