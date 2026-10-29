import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { allPosts, postUrl } from '../lib/posts';

export async function GET(context: APIContext) {
  const posts = (await allPosts()).slice(0, 60);
  return rss({
    title: "Sahaj's blog",
    description: 'Study notes, AI updates and paper summaries by Sahaj Saliya.',
    site: context.site!,
    items: posts.map((p) => ({
      title: p.data.title,
      pubDate: p.data.date,
      description: p.data.summary,
      link: postUrl(p),
      categories: p.data.categories,
    })),
  });
}
