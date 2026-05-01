import Link from 'next/link';
import { BookOpen, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const footerLinks = {
  Organisation: [
    { label: 'About Us',    href: '/about' },
    { label: 'Objectives',  href: '/about#objectives' },
    { label: 'Leadership',  href: '/about#leadership' },
    { label: 'Stakeholders', href: '/about#stakeholders' },
  ],
  Membership: [
    { label: 'Benefits',          href: '/membership#benefits' },
    { label: 'Classifications',   href: '/membership#classifications' },
    { label: 'Membership Forms',  href: '/membership#forms' },
    { label: 'Join Today',        href: '/membership' },
  ],
  Resources: [
    { label: 'Bookstore',   href: '/bookstore' },
    { label: 'News',        href: '/news' },
    { label: 'Media',       href: '/news#media' },
    { label: 'Contact',     href: '/contact' },
  ],
};

const socials = [
  { Icon: Facebook,  href: '#', label: 'Facebook' },
  { Icon: Twitter,   href: '#', label: 'Twitter' },
  { Icon: Instagram, href: '#', label: 'Instagram' },
  { Icon: Linkedin,  href: '#', label: 'LinkedIn' },
];

export default function Footer() {
  return (
    <footer className="bg-forest-600 text-cream-200 relative overflow-hidden">
      {/* Decorative circle */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-forest-700 rounded-full -translate-y-1/2 translate-x-1/3 opacity-50" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold-500/10 rounded-full translate-y-1/2 -translate-x-1/3" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top section */}
        <div className="py-16 grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-gold-500 rounded-lg">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-display font-bold text-xl text-white">GNAAP</span>
                <span className="block text-[10px] tracking-[0.15em] uppercase text-gold-400">
                  Ghana National Authors & Publishers
                </span>
              </div>
            </Link>
            <p className="font-body text-sm text-cream-300 leading-relaxed max-w-xs mb-8">
              Championing literacy, empowering writers, and transforming Ghanaian society through the power of culturally rich, value-driven literary works.
            </p>
            {/* Contact info */}
            <div className="space-y-3">
              {[
                { Icon: Mail,    text: 'info@gnaaponline.com' },
                { Icon: Phone,   text: '+233 (0) 123 456 789' },
                { Icon: MapPin,  text: 'Accra, Ghana' },
              ].map(({ Icon, text }) => (
                <div key={text} className="flex items-center gap-3 text-sm text-cream-300">
                  <Icon className="w-4 h-4 text-gold-400 shrink-0" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-body font-semibold text-white text-sm tracking-widest uppercase mb-5">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-cream-300 hover:text-gold-400 transition-colors duration-200 font-body"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="divider-gold opacity-30" />

        {/* Bottom bar */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-cream-400 font-body">
            © {new Date().getFullYear()} Ghana National Authors & Publishers. All rights reserved.
          </p>
          {/* Socials */}
          <div className="flex items-center gap-4">
            {socials.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-gold-500 flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
              >
                <Icon className="w-3.5 h-3.5 text-white" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
