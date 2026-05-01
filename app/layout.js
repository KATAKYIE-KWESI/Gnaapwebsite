import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata = {
  title: {
    default: 'GNAAP — Ghana National Authors & Publishers',
    template: '%s | GNAAP',
  },
  description:
    'Ghana National Authors & Publishers Association — championing literacy, empowering writers, and transforming society through the power of the written word.',
  keywords: ['Ghana', 'authors', 'publishers', 'literary', 'GNAAP', 'books', 'literacy'],
  openGraph: {
    title: 'GNAAP — Ghana National Authors & Publishers',
    description: 'Championing literacy and empowering Ghanaian authors and publishers.',
    url: 'https://gnaaponline.com',
    siteName: 'GNAAP',
    locale: 'en_GH',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jakarta.variable}`}>
      <body className="grain">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
