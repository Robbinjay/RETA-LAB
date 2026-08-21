import type { Metadata } from 'next';
import { Playfair_Display, Public_Sans } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Providers } from '@/components/layout/Providers';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const publicSans = Public_Sans({
  subsets: ['latin'],
  variable: '--font-public-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://retaclub.co.uk'),
  title: {
    template: '%s | Retatrutide UK',
    default: 'Retatrutide UK | Buy Retatrutide UK, Research & Availability Guide',
  },
  description: 'Comprehensive guide to Retatrutide UK. Discover independent research, clinical trial findings, and verified laboratory standards to buy retatrutide UK for research use. Explore all UK retatrutide data.',
  keywords: [
    'Retatrutide UK',
    'buy retatrutide UK',
    'retatrutide',
    'uk retatrutide',
    'retatrutide research UK',
    'triple agonist peptide UK',
    'buy retatrutide peptides',
    'retatrutide 20mg UK',
  ],
  openGraph: {
    title: 'Retatrutide UK | Buy Retatrutide UK & Research Guide',
    description: 'Evidence-based portal on Retatrutide UK. Explore mechanisms of action, legality, and how to buy retatrutide UK for laboratory research.',
    url: 'https://retaclub.co.uk',
    siteName: 'Retatrutide Club UK',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Retatrutide UK | Buy Retatrutide UK & Research Guide',
    description: 'Evidence-based portal on Retatrutide UK. Explore mechanisms of action, legality, and how to buy retatrutide UK for research.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${publicSans.variable}`}>
      <body className="font-sans antialiased text-slate-900 bg-slate-50 flex flex-col min-h-screen" suppressHydrationWarning>
        <Providers>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
