'use client';

import Link from 'next/link';
import { useAnimateOnScroll } from '@/lib/useAnimateOnScroll';
import { ArrowRight, BookOpen } from 'lucide-react';

export default function CTABanner() {
  const ref = useAnimateOnScroll();

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-forest-600 rounded-3xl overflow-hidden">
          {/* Background patterns */}
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage: `radial-gradient(circle, #C9983B 1.5px, transparent 1.5px)`,
                backgroundSize: '30px 30px',
              }}
            />
            <div className="absolute -right-20 -top-20 w-80 h-80 bg-forest-700 rounded-full opacity-60" />
            <div className="absolute -left-10 -bottom-10 w-64 h-64 bg-gold-500/15 rounded-full" />
          </div>

          {/* Floating books */}
          <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-10 hidden lg:block animate-float">
            <BookOpen className="w-56 h-56 text-white" />
          </div>

          <div className="relative px-8 sm:px-12 lg:px-16 py-16 sm:py-20 max-w-2xl animate-on-scroll">
            <span className="section-label text-gold-400 mb-5 block">Join the Movement</span>
            <h2 className="font-display font-bold text-4xl sm:text-5xl text-white leading-tight mb-6">
              Be Part of Ghana's<br />
              <span className="text-gold-shimmer">Literary Future</span>
            </h2>
            <p className="font-body text-cream-300 text-lg leading-relaxed mb-10">
              Whether you are an aspiring writer, a seasoned author, or a publishing professional —
              GNAAP is your home. Join hundreds of members who are shaping the narrative of
              Ghana's literary landscape.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/membership"
                className="group inline-flex items-center gap-2 px-7 py-3.5 bg-gold-500 hover:bg-gold-400 text-white font-body font-semibold text-sm rounded-full transition-all duration-200 hover:shadow-xl hover:shadow-gold-500/30 hover:-translate-y-0.5"
              >
                Become a Member
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white font-body font-semibold text-sm rounded-full border border-white/20 transition-all duration-200 hover:-translate-y-0.5"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
