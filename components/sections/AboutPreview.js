'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useAnimateOnScroll } from '@/lib/useAnimateOnScroll';
import { ArrowRight, CheckCircle2, Quote } from 'lucide-react';

const highlights = [
  'Officially registered literary professional body in Ghana',
  'Advocating for authors, publishers, and the reading public',
  'Facilitating workshops, training, and publication support',
  'Collaborating with schools, universities, and government',
  'Promoting culturally relevant and values-driven books',
  'Building bridges with African and global literary networks',
];

export default function AboutPreview() {
  const ref = useAnimateOnScroll();

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — Visual Section */}
          <div className="relative animate-on-scroll">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] max-w-md mx-auto lg:mx-0 shadow-2xl border border-cream-200 bg-cream-100">
              
              
              <Image 
                src="/vision-bg.jpeg" 
                alt="GNAAP Vision"
                fill
                priority
                quality={100}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 450px"
              />

              {/* Minimal Overlay - Only enough to read white text */}
              <div className="absolute inset-0 bg-black/30" /> 
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

              {/* Quote Content */}
              <div className="relative z-10 h-full flex flex-col items-center justify-center px-10 text-center">
                <Quote className="w-12 h-12 text-gold-400 mx-auto mb-6 drop-shadow-lg" />
                
                <p className="font-display text-white text-2xl sm:text-3xl leading-snug font-medium italic mb-8 drop-shadow-md">
                  To be a leading association in Africa committed to transforming society
                  through literary excellence.
                </p>
                
                <div className="flex items-center justify-center gap-4">
                  <div className="h-px w-8 bg-gold-500" />
                  <p className="font-body text-gold-400 text-xs tracking-[0.2em] uppercase font-bold drop-shadow-sm">
                    Our Vision
                  </p>
                  <div className="h-px w-8 bg-gold-500" />
                </div>
              </div>
            </div>

            {/* Floating stat card */}
            <div className="absolute -bottom-6 -right-4 lg:right-0 bg-white rounded-2xl shadow-xl border border-cream-300 p-5 max-w-[180px] z-30">
              <div className="font-display font-bold text-4xl text-forest-600 leading-none">80+</div>
              <div className="font-body text-xs text-ink-muted mt-1 leading-snug">Professional members across Ghana</div>
              <div className="mt-3 w-full h-1 bg-cream-200 rounded-full overflow-hidden">
                <div className="h-full bg-gold-500 rounded-full" style={{ width: '85%' }} />
              </div>
            </div>

            {/* Small accent badge */}
            <div className="absolute -top-4 -left-4 bg-gold-500 text-white rounded-2xl px-5 py-3 shadow-lg z-30">
              <div className="font-display font-bold text-xl leading-none">GNAAP</div>
              <p className="font-body text-[10px] uppercase tracking-widest mt-1 opacity-90">Est. 2022</p>
            </div>
          </div>

          {/* Right — Content Section */}
          <div>
            <div className="animate-on-scroll">
              <span className="section-label mb-4 block">About GNAAP</span>
            </div>
            <h2 className="font-display font-bold text-4xl sm:text-5xl text-ink leading-tight mb-6 animate-on-scroll delay-100">
              The Official Voice of<br />
              <span className="text-forest-600">Ghanaian Literature</span>
            </h2>
            <p className="font-body text-ink-muted text-lg leading-relaxed mb-4 animate-on-scroll delay-200">
              The Ghana National Authors & Publishers Association (GNAAP) is the premier
              professional body representing authors, publishers, and literary stakeholders across Ghana.
            </p>
            <p className="font-body text-ink-muted leading-relaxed mb-8 animate-on-scroll delay-300">
              Registered under the Registrar General (CG061340922), we work tirelessly to protect member interests, 
              advance literacy, and position Ghanaian literature on the world stage.
            </p>

            {/* Highlights List */}
            <ul className="grid grid-cols-1 gap-3 mb-10 animate-on-scroll delay-300">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
                  <span className="font-body text-sm text-ink-soft">{item}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/about"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-forest-600 hover:bg-forest-700 text-white font-body font-semibold text-sm rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-forest-600/20 hover:-translate-y-0.5 animate-on-scroll delay-400"
            >
              Learn More About Us
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}