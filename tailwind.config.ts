import type { Config } from 'tailwindcss';

const v = (n: string) => `rgb(var(--${n}-rgb) / <alpha-value>)`;
const ramp = () =>
  Object.fromEntries([50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((k) => [k, v('accent')]));

const config: Config = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Instrument Serif"', '"Iowan Old Style"', 'Georgia', 'serif'],
        sans: ['"Inter Tight"', 'ui-sans-serif', 'system-ui', '-apple-system', '"Segoe UI"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', '"Cascadia Mono"', 'Consolas', 'monospace'],
      },
      colors: {
        canvas: v('paper'),
        surface: v('paper-2'),
        subtle: v('paper-3'),
        border: v('rule'),
        'rule-2': v('rule-2'),
        ink: { DEFAULT: v('ink'), light: v('ink'), muted: v('ink-3'), soft: v('ink-2') },
        accent: { DEFAULT: v('accent'), ink: v('accent-ink') },
        // the portfolio has ONE accent (vermilion). Every legacy hue maps onto it.
        emerald: ramp(),
        amber: ramp(),
        indigo: ramp(),
        blue: ramp(),
        sky: ramp(),
        slate: { ...ramp(), 300: v('ink-2'), 400: v('ink-3'), 950: v('accent-ink') },
        category: {
          study: v('accent'),
          ai: v('accent'),
          papers: v('accent'),
          projects: v('accent'),
        },
      },
      typography: ({ theme }: { theme: any }) => ({
        DEFAULT: {
          css: {
            maxWidth: '72ch',
            color: 'inherit',
            a: {
              color: 'rgb(var(--accent-rgb))',
              textDecoration: 'underline',
              textUnderlineOffset: '3px',
              '&:hover': {
                color: 'rgb(var(--accent-rgb))',
              },
            },
            h1: {
              fontFamily: theme('fontFamily.sans').join(', '),
              fontWeight: '450',
              letterSpacing: '-0.02em',
              color: 'inherit',
            },
            h2: {
              fontFamily: theme('fontFamily.sans').join(', '),
              fontWeight: '450',
              letterSpacing: '-0.015em',
              color: 'inherit',
            },
            h3: {
              fontFamily: theme('fontFamily.sans').join(', '),
              fontWeight: '450',
              color: 'inherit',
            },
            em: { fontFamily: theme('fontFamily.serif').join(', '), fontSize: '1.08em' },
            blockquote: { fontFamily: theme('fontFamily.serif').join(', '), fontStyle: 'italic', fontSize: '1.2em', borderLeftColor: 'rgb(var(--accent-rgb))', color: 'rgb(var(--ink-2-rgb))' },
            code: {
              fontFamily: theme('fontFamily.mono').join(', '),
              color: 'rgb(var(--accent-rgb))',
              backgroundColor: 'rgb(var(--paper-3-rgb))',
              padding: '0.2em 0.4em',
              borderRadius: '0.25rem',
              fontWeight: '400',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              backgroundColor: 'rgb(var(--paper-2-rgb)) !important',
              border: '1px solid rgb(var(--rule-rgb))',
              borderRadius: '0.5rem',
              padding: '1.2rem 1.4rem',
              overflowX: 'auto',
              whiteSpace: 'pre !important',
              color: 'rgb(var(--ink-rgb)) !important',
            },
            'pre code': {
              backgroundColor: 'transparent !important',
              padding: '0 !important',
              color: 'inherit !important',
              fontSize: '0.88rem',
              whiteSpace: 'pre !important',
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config;

