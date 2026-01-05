import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'GetMyBrief - AI-Powered Reel Script Generator',
  description: 'Generate professional reel scripts in seconds. Powerful hooks, 5-shot structure, emotional CTAs. Chrome Extension powered by DeepSeek AI.',
  keywords: ['content creator', 'reels', 'instagram', 'tiktok', 'scripts', 'ai', 'hooks', 'social media'],
  openGraph: {
    title: 'GetMyBrief - AI-Powered Reel Script Generator',
    description: 'Generate professional reel scripts in seconds with AI',
    url: 'https://getmybrief.com',
    siteName: 'GetMyBrief',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GetMyBrief - AI-Powered Reel Script Generator',
    description: 'Generate professional reel scripts in seconds with AI',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
