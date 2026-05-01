'use client';

import Link from 'next/link';
import { ArrowRight, BookOpen, Users, Award } from 'lucide-react';
import { useEffect, useState } from 'react';

const floatingWords = ['Stories', 'Knowledge', 'Culture', 'Heritage', 'Voices'];

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setWordIndex((i) => (i + 1) % floatingWords.length);
        setVisible(true);
      }, 400);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen hero-bg flex items-center overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large circle */}
        <div className="absolute -right-32 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-forest-700/60 blur-3xl" />
        {/* Gold accent */}
        <div className="absolute right-1/4 bottom-20 w-48 h-48 rounded-full bg-gold-500/10 blur-2xl" />
        {/* Top left accent */}
        <div className="absolute -left-20 top-20 w-72 h-72 rounded-full bg-forest-800/80 blur-2xl" />
        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(#C9983B 1px, transparent 1px), linear-gradient(90deg, #C9983B 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Floating book decorations */}
      <div className="absolute right-8 top-32 opacity-10 animate-float hidden lg:block">
        <BookOpen className="w-40 h-40 text-gold-400" />
      </div>
      <div className="absolute right-32 bottom-32 opacity-8 animate-float hidden lg:block" style={{ animationDelay: '2s' }}>
        <BookOpen className="w-20 h-20 text-cream-200" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt- lg:py-0">
        <div className="max-w-3xl">
          {/* Label */}
          <div className="mb-8 animate-fade-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
            <span className="section-label text-gold-400">
              {/* Est. Ghana · Official Literary Body */}
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display font-bold text-white leading-[1.05] mb-6">
            <span
              className="block text-5xl sm:text-6xl lg:text-7xl animate-fade-up"
              style={{ animationDelay: '0.2s', opacity: 0 }}
            >
              Amplifying
            </span>
            <span
              className="block text-5xl sm:text-6xl lg:text-7xl animate-fade-up"
              style={{ animationDelay: '0.35s', opacity: 0 }}
            >
              Ghanaian
            </span>
            <span
              className="block text-5xl sm:text-6xl lg:text-7xl animate-fade-up"
              style={{ animationDelay: '0.5s', opacity: 0 }}
            >
              <span
                className="text-gold-shimmer inline-block transition-all duration-400"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(10px)',
                  transition: 'opacity 0.4s ease, transform 0.4s ease',
                }}
              >
                {floatingWords[wordIndex]}
              </span>
            </span>
          </h1>

          {/* Sub text */}
          <p
            className="font-body text-cream-300 text-lg sm:text-xl leading-relaxed max-w-xl mb-10 animate-fade-up"
            style={{ animationDelay: '0.65s', opacity: 0 }}
          >
            Ghana National Authors & Publishers Association — the official home for
            writers, publishers, and literary professionals committed to transforming
            society through the power of the written word.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-wrap gap-4 animate-fade-up"
            style={{ animationDelay: '0.8s', opacity: 0 }}
          >
            <Link
              href="/membership"
              className="group inline-flex items-center gap-2 px-7 py-3.5 bg-gold-500 hover:bg-gold-400 text-white font-body font-semibold text-sm rounded-full transition-all duration-200 hover:shadow-xl hover:shadow-gold-500/30 hover:-translate-y-0.5"
            >
              Become a Member
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white font-body font-semibold text-sm rounded-full border border-white/20 transition-all duration-200 hover:-translate-y-0.5"
            >
              Discover GNAAP
            </Link>
          </div>

          {/* Stats row */}
          <div
            className="mt-16 flex flex-wrap gap-8 animate-fade-up"
            style={{ animationDelay: '0.95s', opacity: 0 }}
          >
            {[
              { icon: Users,  value: '500+',  label: 'Active Members' },
              { icon: BookOpen, value: '1,200+', label: 'Published Titles' },
              { icon: Award, value: '15+',   label: 'Years of Impact' },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="p-2 bg-white/10 rounded-lg">
                  <Icon className="w-4 h-4 text-gold-400" />
                </div>
                <div>
                  <div className="font-display font-bold text-white text-2xl leading-none">
                    {value}
                  </div>
                  <div className="font-body text-xs text-cream-400 mt-0.5">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs text-cream-400 font-body tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-cream-400 to-transparent" />
      </div>
    </section>
  );
}
