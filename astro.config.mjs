import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// The one place the base path lives. Pages URL: https://info.sahaj.si/blogs/
export const BASE = '/blogs';

// Posts write images as /images/...; prefix the base path and lazy-load them.
function rehypeImages() {
  const walk = (node) => {
    if (node.tagName === 'img' && node.properties?.src?.startsWith('/images/')) {
      node.properties.src = BASE + node.properties.src;
      node.properties.loading = 'lazy';
      node.properties.decoding = 'async';
    }
    node.children?.forEach(walk);
  };
  return (tree) => walk(tree);
}

export default defineConfig({
  site: 'https://info.sahaj.si',
  base: BASE,
  trailingSlash: 'always',
  integrations: [mdx(), sitemap()],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex, rehypeImages],
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark-dimmed' },
      wrap: true,
    },
  },
});
