import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ProgressProvider } from '@/context/ProgressContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const viewport: Viewport = {
  themeColor: '#1D4ED8',
  width: 'device-width',
  initialScale: 1
};

export const metadata: Metadata = {
  title: 'LernDev — พื้นฐานและความรู้ Software Engineer ในยุค AI',
  description:
    'คลังความรู้และ Roadmap สำหรับคนที่อยากเป็น Software Engineer ในยุคที่ AI เขียนโค้ดได้ เรียงลำดับจาก Basic ไปจนถึง Advanced',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'LernDev'
  },
  icons: {
    icon: [
      { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' }
    ],
    apple: [{ url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" suppressHydrationWarning>
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
