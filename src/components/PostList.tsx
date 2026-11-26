import React from 'react';
import Link from 'next/link';
import { postUrl, fmtDate, formatBlogNo, CATEGORY_LABEL, readingTime, phaseOf, type Post } from '@/lib/constants';
import { Icon, Chip, CATEGORY_ICON_NAME } from '@/components/ui';

interface PostListProps {
  posts: Post[];
  showDate?: boolean;
}

export default function PostList({ posts, showDate = true }: PostListProps) {
  return (
    <div className="posts">
      {posts.map((p) => {
        const cat = p.data.categories[0] ?? 'study';
        const phase = phaseOf(p.data.phase);
        const read = readingTime(p);
        const url = postUrl(p);

        return (
          <article key={p.id} className="post-row">
            <div className="post-date">
              {showDate ? fmtDate(p.data.date) : ''}
              {p.number ? <span className="block text-ink-muted/70">#{formatBlogNo(p.number)}</span> : null}
            </div>

            <div>
              <h3 className="post-title">
                <Link href={url} prefetch={false}>{p.data.title}</Link>
              </h3>
              {p.data.summary && <p className="post-sum">{p.data.summary}</p>}
            </div>

            <div className="post-tags">
              <Chip accent>
                <Icon name={CATEGORY_ICON_NAME[cat] ?? 'book'} size={12} />
                {CATEGORY_LABEL[cat]}
              </Chip>
              {phase && <Chip>Phase {phase.n}</Chip>}
              <Chip>
                <Icon name="clock" size={12} />
                {read}
              </Chip>
            </div>

            <span className="post-go" aria-hidden="true"><Icon name="arrow" size={15} /></span>
          </article>
        );
      })}
    </div>
  );
}
