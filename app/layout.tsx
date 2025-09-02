import type { Metadata } from 'next';
import { Inter, Roboto } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';

const inter = Inter({ subsets: ['latin'] });

const roboto = Roboto({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto', 
});

export const metadata: Metadata = {
  title: 'NoteHub',
  description: 'A simple note-taking application built with Next.js',
  openGraph: {
    title: 'NoteHub',
    description: 'A simple note-taking application built with Next.js',
    url: 'https://notehub.vercel.app',
    images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

export default function RootLayout({
  children,
  modal,
}: RootLayoutProps) {
  return (
    <html lang="en" className={`${roboto.variable} ${inter.className}`}>
      <body className={roboto.className}>
        <TanStackProvider>
          <Header />
          <main>
            {children}
          </main>
          {modal}
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}