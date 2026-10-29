import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// The one place the base path and site URL live. The repo's Pages custom domain is blog.sahaj.si
// (served at the root). For a project path like https://info.sahaj.si/blogs/ set BASE = '/blogs'.
export const BASE = '/';
export const SITE = 'https://blog.sahaj.si';

// Posts write images as /images/...; prefix the base path and lazy-load them.
function rehypeImages() {
  const walk = (node) => {
    if (node.tagName === 'img' && node.properties?.src?.startsWith('/images/')) {
      node.properties.src = BASE.replace(/\/$/, '') + node.properties.src;
      node.properties.loading = 'lazy';
      node.properties.decoding = 'async';
    }
    node.children?.forEach(walk);
  };
  return (tree) => walk(tree);
}

export default defineConfig({
  site: SITE,
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
