import type { Metadata } from 'next';
import './globals.css';
import { ProgressProvider } from '@/context/ProgressContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'LernWeb — พื้นฐานและความรู้ Software Engineer ในยุค AI',
  description:
    'คลังความรู้และ Roadmap สำหรับคนที่อยากเป็น Software Engineer ในยุคที่ AI เขียนโค้ดได้ เรียงลำดับจาก Basic ไปจนถึง Advanced'
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
