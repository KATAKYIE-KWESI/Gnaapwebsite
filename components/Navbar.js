'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { default as NextImage } from 'next/image'; // Use alias to avoid TypeError
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/',         label: 'Home' },
  { href: '/about',      label: 'About' },
  { href: '/membership', label: 'Membership' },
  { href: '/news',       label: 'News' },
  { href: '/bookstore',  label: 'Bookstore' },
  { href: '/contact',    label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === '/';

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const navBg = scrolled || !isHome 
    ? 'bg-cream-50/95 backdrop-blur-md shadow-sm border-b border-cream-300' 
    : 'bg-transparent';

  const textColor = scrolled || !isHome ? 'text-ink' : 'text-cream-100';
  const logoMainColor = scrolled || !isHome ? 'text-forest-600' : 'text-white';
  const logoSubColor = scrolled || !isHome ? 'text-gold-600' : 'text-gold-400';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* LOGO SECTION */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 overflow-hidden rounded-full bg-white border border-gold-500/20 shadow-sm transition-transform duration-300 group-hover:scale-105">
              <NextImage 
                src="/gnaapimages (1).jpg" 
                alt="GNAAP Logo"
                fill
                className="object-contain p-1"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className={`font-display font-bold text-xl leading-none transition-colors duration-300 ${logoMainColor}`}>
                GNAAP
              </span>
              <span className={`text-[9px] uppercase tracking-[0.15em] font-body font-medium transition-colors duration-300 ${logoSubColor}`}>
                Ghana National Authors & Publishers
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`nav-link text-sm font-body font-medium tracking-wide transition-colors duration-200 ${textColor} ${
                  pathname === href ? 'active text-gold-500' : ''
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/membership"
              className="px-5 py-2.5 bg-gold-500 hover:bg-gold-600 text-white text-sm font-body font-semibold rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-gold-500/25 hover:-translate-y-0.5"
            >
              Join GNAAP
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${textColor}`}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-300 border-t border-cream-200 bg-cream-50 overflow-hidden ${
        menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="px-4 py-6 space-y-4">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`block text-base font-body font-medium text-ink hover:text-gold-500 transition-colors py-1 ${
                pathname === href ? 'text-gold-500 font-bold' : ''
              }`}
            >
              {label}
            </Link>
          ))}
          <div className="pt-2 border-t border-cream-300">
            <Link
              href="/membership"
              className="inline-block w-full text-center px-6 py-3 bg-gold-500 text-white font-semibold rounded-full text-sm"
            >
              Join GNAAP
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}