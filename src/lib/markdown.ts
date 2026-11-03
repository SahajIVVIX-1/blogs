import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import { createHighlighter, type Highlighter } from 'shiki';

let highlighterPromise: Promise<Highlighter> | null = null;

async function getHighlighter(): Promise<Highlighter> {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ['github-dark', 'github-light'],
      langs: [
        'python',
        'javascript',
        'typescript',
        'bash',
        'shell',
        'json',
        'yaml',
        'markdown',
        'html',
        'css',
        'sql',
        'c',
        'cpp',
        'rust',
        'go',
        'diff',
        'text',
      ],
    });
  }
  return highlighterPromise;
}

const LOADED_LANGS = new Set([
  'python', 'javascript', 'typescript', 'bash', 'shell', 'json', 'yaml',
  'markdown', 'html', 'css', 'sql', 'c', 'cpp', 'rust', 'go', 'diff', 'text'
]);

function rehypeShikiPlugin(highlighter: Highlighter) {
  return (tree: any) => {
    function walk(node: any) {
      if (!node || !node.children) return;

      for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i];

        if (child.type === 'element' && child.tagName === 'pre') {
          const codeEl = child.children?.find((c: any) => c.type === 'element' && c.tagName === 'code');
          if (codeEl) {
            const className = (codeEl.properties?.className as string[]) || [];
            const langClass = className.find((c) => c.startsWith('language-'));
            let lang = langClass ? langClass.replace('language-', '').toLowerCase() : 'text';

            if (!LOADED_LANGS.has(lang)) {
              lang = 'text';
            }

            // Extract plain text from code children
            let rawCode = '';
            function extractText(cNode: any) {
              if (cNode.type === 'text') rawCode += cNode.value;
              if (cNode.children) cNode.children.forEach(extractText);
            }
            codeEl.children.forEach(extractText);
            rawCode = rawCode.replace(/\n$/, '');

            try {
              const highlightedHtml = highlighter.codeToHtml(rawCode, {
                lang,
                themes: {
                  light: 'github-light',
                  dark: 'github-dark',
                },
                defaultColor: false,
              });

              // Replace the <pre> node with the raw highlighted HTML
              node.children[i] = {
                type: 'raw',
                value: highlightedHtml,
              };
            } catch (err) {
              // Fallback to original node if highlighting fails
            }
          }
        } else {
          walk(child);
        }
      }
    }

    walk(tree);
  };
}

export async function markdownToHtml(markdown: string): Promise<string> {
  const highlighter = await getHighlighter();

  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMath, { singleDollarTextMath: true })
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeKatex)
    .use(rehypeSlug)
    .use(rehypeShikiPlugin, highlighter)
    .use(rehypeStringify)
    .process(markdown);

  return String(file);
}
