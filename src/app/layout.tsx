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
    icon: '/favicon.svg',
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
    <html lang="en" data-theme="dark" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;450;500;600;700&family=JetBrains+Mono:ital,wght@0,400;0,500;0,600;1,400&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;0,6..72,700;1,6..72,400;1,6..72,600&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const t = localStorage.getItem('theme');
                if (t === 'light') {
                  document.documentElement.dataset.theme = 'light';
                  document.documentElement.classList.remove('dark');
                } else {
                  document.documentElement.dataset.theme = 'dark';
                  document.documentElement.classList.add('dark');
                }
              } catch (e) {}

              // Direct shortlink support: ?blog=4305 or ?b=4305
              try {
                var params = new URLSearchParams(location.search);
                var bNum = params.get('blog') || params.get('b');
                if (bNum && (location.pathname === '/' || location.pathname === '')) {
                  fetch('/blog-index.json')
                    .then(function(r) { return r.json(); })
                    .then(function(map) {
                      var target = map[bNum] || map[String(bNum).padStart(4, '0')];
                      if (target) location.replace(target + location.search + location.hash);
                    })
                    .catch(function() {});
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-canvas text-ink flex flex-col antialiased selection:bg-emerald-500/20 selection:text-emerald-300">
        <Suspense fallback={null}>
          <NavigationLoader />
        </Suspense>
        <ContextAddressBar />
        <Navbar />
        <main id="main" className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 animate-in fade-in duration-200">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
