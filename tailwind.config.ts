import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Newsreader', 'Georgia', 'Cambria', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'Courier New', 'monospace'],
      },
      colors: {
        canvas: {
          light: '#f8fafc',
          DEFAULT: '#090d16',
          dark: '#090d16',
        },
        surface: {
          light: '#ffffff',
          DEFAULT: '#0e1526',
          dark: '#0e1526',
        },
        border: {
          light: '#e2e8f0',
          DEFAULT: '#1e293b',
          dark: '#1e293b',
        },
        ink: {
          light: '#0f172a',
          DEFAULT: '#f8fafc',
          muted: '#94a3b8',
        },
        category: {
          study: '#6366f1',
          ai: '#f59e0b',
          papers: '#10b981',
          projects: '#3b82f6',
        },
      },
      typography: ({ theme }: { theme: any }) => ({
        DEFAULT: {
          css: {
            maxWidth: '72ch',
            color: 'inherit',
            a: {
              color: '#38bdf8',
              textDecoration: 'underline',
              textUnderlineOffset: '3px',
              '&:hover': {
                color: '#7dd3fc',
              },
            },
            h1: {
              fontFamily: theme('fontFamily.serif').join(', '),
              fontWeight: '600',
              letterSpacing: '-0.02em',
              color: 'inherit',
            },
            h2: {
              fontFamily: theme('fontFamily.serif').join(', '),
              fontWeight: '600',
              letterSpacing: '-0.015em',
              color: 'inherit',
            },
            h3: {
              fontFamily: theme('fontFamily.serif').join(', '),
              fontWeight: '600',
              color: 'inherit',
            },
            code: {
              fontFamily: theme('fontFamily.mono').join(', '),
              color: '#38bdf8',
              backgroundColor: 'rgba(30, 41, 59, 0.7)',
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
              backgroundColor: '#0d1527 !important',
              border: '1px solid #1e293b',
              borderRadius: '0.5rem',
              padding: '1.2rem 1.4rem',
              overflowX: 'auto',
              whiteSpace: 'pre !important',
              color: '#f1f5f9 !important',
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
