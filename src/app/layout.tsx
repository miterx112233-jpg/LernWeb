import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ProgressProvider } from '@/context/ProgressContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const siteTitle = 'LernDev — พื้นฐานและความรู้ Software Engineer ในยุค AI';
const siteDesc =
  'คลังความรู้และ Roadmap สำหรับคนที่อยากเป็น Software Engineer ในยุคที่ AI เขียนโค้ดได้ เรียงลำดับจาก Basic ไปจนถึง Advanced';
const siteUrl = 'https://miterx112233-jpg.github.io/LernWeb';
const ogImageUrl = `${siteUrl}/images/og-image.png`;

export const viewport: Viewport = {
  themeColor: '#1D4ED8',
  width: 'device-width',
  initialScale: 1
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDesc,
  manifest: `${basePath}/manifest.json`,
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'LernDev'
  },
  icons: {
    icon: [
      { url: `${basePath}/icons/icon-192.png`, sizes: '192x192', type: 'image/png' },
      { url: `${basePath}/icons/icon-512.png`, sizes: '512x512', type: 'image/png' }
    ],
    apple: [{ url: `${basePath}/icons/apple-touch-icon.png`, sizes: '180x180', type: 'image/png' }]
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    title: siteTitle,
    description: siteDesc,
    siteName: 'LernDev',
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: 'LernDev — Roadmap & พื้นฐาน Software Engineer ในยุค AI'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDesc,
    images: [ogImageUrl]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" data-theme="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Anuphan:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
        />
      </head>
      <body>
        <ProgressProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ProgressProvider>
      </body>
    </html>
  );
}
