import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContextAddressBar from '@/components/ContextAddressBar';
import NavigationLoader from '@/components/NavigationLoader';

export const metadata: Metadata = {
  metadataBase: new URL('https://blog.sahaj.si'),
  title: {
    default: 'Sahaj Saliya · AI & Engineering Handbook',
    template: '%s · Sahaj Saliya',
  },
  description: 'Personal day-wise engineering blog, comprehensive study handbooks, AI news, and research paper summaries by Sahaj Saliya.',
  authors: [{ name: 'Sahaj Saliya', url: 'https://blog.sahaj.si' }],
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Sahaj Saliya · AI & Engineering Handbook',
    description: 'Personal day-wise engineering blog, comprehensive study handbooks, AI news, and research paper summaries by Sahaj Saliya.',
    url: 'https://blog.sahaj.si',
    siteName: 'Sahaj Saliya · AI & Engineering Handbook',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    creator: '@SahajS59',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preload" href="/fonts/instrument-serif-latin-400-italic.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/inter-tight-latin-wght-normal.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <meta name="color-scheme" content="light dark" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#F6F2EA" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#0B1020" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var m = localStorage.getItem('theme');
                var dark = m === 'dark' || (m !== 'light' && matchMedia('(prefers-color-scheme: dark)').matches);
                var r = document.documentElement;
                r.dataset.theme = dark ? 'dark' : 'light';
                r.classList.toggle('dark', dark);
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-canvas text-ink flex flex-col antialiased ">
        <Suspense fallback={null}>
          <NavigationLoader />
        </Suspense>
        <Suspense fallback={null}>
          <ContextAddressBar />
        </Suspense>
        <Navbar />
        <main id="main" className="flex-1 w-full max-w-[1800px] mx-auto px-[var(--gutter)] py-8 sm:py-12 animate-in fade-in duration-200">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
