import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';
import { StoreProvider } from '@/context/StoreContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Layers from '@/components/Layers';

const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

const body = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'Aura Plus Fine Jewelry',
  description: 'Fine jewelry in 18k gold and sterling silver, made for everyday elegance.',
};

export const viewport = { colorScheme: 'light dark' };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <StoreProvider>
          <Header />
          {children}
          <Footer />
          <Layers />
        </StoreProvider>
      </body>
    </html>
  );
}
