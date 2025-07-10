import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NumToWord.ai - Convert Numbers to Words | Free Online Tool',
  description: 'Instantly convert any number to English words with our free online tool. Get currency spellings, number facts, unit conversions, and more. Perfect for writing checks and legal documents.',
  keywords: 'number to words, convert numbers, spell numbers, currency spelling, check writing, number facts, mathematical properties',
  authors: [{ name: 'NumToWord.ai' }],
  creator: 'NumToWord.ai',
  publisher: 'NumToWord.ai',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://numtoword.ai'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://numtoword.ai',
    siteName: 'NumToWord.ai',
    title: 'NumToWord.ai - Convert Numbers to Words',
    description: 'Free online tool to convert any number to English words with currency spellings and number facts.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'NumToWord.ai - Number to Words Converter',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NumToWord.ai - Convert Numbers to Words',
    description: 'Free online tool to convert any number to English words with currency spellings and number facts.',
    images: ['/og-image.jpg'],
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#3B82F6" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'NumToWord.ai',
              description: 'Free online tool to convert numbers to English words with currency spellings and number facts.',
              url: 'https://numtoword.ai',
              applicationCategory: 'UtilityApplication',
              operatingSystem: 'All',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
              },
              author: {
                '@type': 'Organization',
                name: 'NumToWord.ai',
              },
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}