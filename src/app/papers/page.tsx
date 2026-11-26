import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { allPosts, postUrl, dayKey } from '@/lib/posts';
import { PageHeader, SectionHead, Chip, Icon } from '@/components/ui';

export const metadata: Metadata = {
  title: 'AI Research Paper Breakdowns',
  description: 'Rigorous, structured summaries of notable machine learning and artificial intelligence papers from arXiv and Hugging Face.',
};

// some digests store names without a space ("YijingLin"): put it back
const spaceName = (n: string) => (/\s/.test(n) ? n : n.replace(/([a-z])([A-Z])/g, '$1 $2'));

export default function PapersPage() {
  const posts = allPosts().filter((p) => p.data.categories.includes('papers'));
  const rows = posts.map((p) => {
    const paper = p.data.papers[0];
    return {
      date: dayKey(p.data.date),
      title: p.data.title.replace(/^Paper summary:\s*/, ''),
      url: postUrl(p),
      authors: paper ? paper.authors.slice(0, 3).map(spaceName).join(', ') + (paper.authors.length > 3 ? ' et al.' : '') : '',
      topic: p.data.tags[0] ?? 'ML',
      arxiv: paper?.arxiv,
      pdf: paper?.pdf,
      code: paper?.code,
    };
  });

  return (
    <div>
      <PageHeader
        eyebrow="arXiv & Hugging Face digests"
        title={<>AI research paper <em>breakdowns</em></>}
        lede="Rigorous, structured summaries of notable machine learning papers from arXiv (cs.CL, cs.AI, cs.LG, cs.CV) and Hugging Face Daily Papers. Each digest covers the core problem, the method, benchmarks and key limitations."
      />

      <SectionHead
        kicker="Digests"
        title={<>Every paper, <em>summarised</em></>}
        sub={`${rows.length.toLocaleString()} verified research paper digests, newest first.`}
      />

      <div className="overflow-x-auto">
        <table className="dtable">
          <thead>
            <tr>
              <th>Date</th>
              <th>Paper</th>
              <th className="hidden lg:table-cell">Authors</th>
              <th className="hidden md:table-cell">Domain</th>
              <th className="text-right">Links</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, idx) => (
              <tr key={idx}>
                <td className="t-mono">{r.date}</td>
                <td>
                  <Link href={r.url} prefetch={false} className="t-title">{r.title}</Link>
                  <div className="t-auth mt-1.5 lg:hidden">{r.authors}</div>
                </td>
                <td className="t-auth hidden lg:table-cell">{r.authors}</td>
                <td className="hidden md:table-cell"><Chip accent>{r.topic}</Chip></td>
                <td className="text-right">
                  <div className="inline-flex flex-nowrap justify-end gap-1.5">
                    {r.arxiv && <a href={r.arxiv} target="_blank" rel="noopener noreferrer" className="lnk">arXiv<Icon name="up" size={11} /></a>}
                    {r.pdf && <a href={r.pdf} target="_blank" rel="noopener noreferrer" className="lnk">PDF<Icon name="up" size={11} /></a>}
                    {r.code && <a href={r.code} target="_blank" rel="noopener noreferrer" className="lnk">Code<Icon name="up" size={11} /></a>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
