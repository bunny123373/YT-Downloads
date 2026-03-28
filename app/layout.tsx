import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'YT Downloads - Download Video and Audio Instantly',
  description: 'Fast premium YouTube downloader built for modern users. Convert YouTube videos to MP3 or download in HD quality. Free, fast, and easy to use.',
  keywords: ['YouTube downloader', 'YouTube to MP3', 'video downloader', 'YT download', 'free video download'],
  openGraph: {
    title: 'YT Downloads - Download Video and Audio Instantly',
    description: 'Fast premium YouTube downloader. Convert videos to MP3 or download in HD quality.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'YT Downloads',
    description: 'Download YouTube videos and audio instantly',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-dark-950 text-white antialiased">
        {children}
      </body>
    </html>
  );
}
