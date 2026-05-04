='use client';

import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, BookOpen, Heart } from 'lucide-react';

const slides = [
  {
    src: 'https://images.unsplash.com/photo-1687794504223-8bdc02e25ef6?w=1400&q=85&fit=crop',
    alt: 'School pupils in a classroom in Accra, Ghana',
    caption: 'Nurturing Young Minds in Ghana',
    sub: 'Building a literate generation — one classroom at a time',
    tag: 'Education'
  },
  {
    src: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=1400&q=80',
    alt: 'Author speaking at event',
    caption: 'Amplifying Author Voices',
    sub: 'Giving Ghanaian writers the platform they deserve',
    tag: 'Community'
  },
  {
    src: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=1400&q=85&fit=crop',
    alt: 'African school children writing in class',
    caption: 'Writers Begin Here',
    sub: "Today&apos;s pupils are tomorrow&apos;s authors and publishers",
    tag: 'Literacy'
  },
  {
    src: 'https://images.unsplash.com/photo-1473649085228-583485e6e4d7?w=1400&q=85&fit=crop',
    alt: 'Children sitting in a classroom',
    caption: 'The Power of the Written Word',
    sub: 'Transforming society through books, learning, and literature',
    tag: 'Impact'
  },
  {
    src: 'https://images.unsplash.com/photo-1632932693914-89b90ae3d16d?w=1400&q=85&fit=crop',
    alt: 'Young African children learning together',
    caption: 'Learning Together, Growing Together',
    sub: 'Supporting Ghanaian educators and the next generation of readers',
    tag: 'Growth'
  },
];

export default function ImageSlider() {
  const [current, setCurrent] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const goTo = useCallback((index) => {
    if (isExiting) return;
    setIsExiting(true);
    setTimeout(() => {
      setCurrent(index);
      setIsExiting(false);
    }, 500);
  }, [isExiting]);

  const prev = () => goTo((current - 1 + slides.length) % slides.length);
  const next = useCallback(() => goTo((current + 1) % slides.length), [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="bg-forest-950 py-12 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section - Stacked for mobile */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-gold-500 font-bold tracking-[0.2em] uppercase text-[10px] md:text-xs">
              <div className="w-8 md:w-10 h-[2px] bg-gold-500" />
              Impact Gallery
            </div>
            <h2 className="font-display font-bold text-white text-2xl sm:text-6xl">
              GNAAP <span className="text-gold-500 italic">In Focus</span>
            </h2>
          </div>
          
          <div className="flex items-center gap-3">
             <button onClick={prev} className="group p-3 rounded-full border border-white/10 bg-white/5 hover:bg-gold-500 transition-all">
                <ChevronLeft className="w-5 h-5 text-white" />
             </button>
             <button onClick={next} className="group p-3 rounded-full border border-white/10 bg-white/5 hover:bg-gold-500 transition-all">
                <ChevronRight className="w-5 h-5 text-white" />
             </button>
          </div>
        </div>

        {/* Slider Frame - Portrait on mobile, Landscape on desktop */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[3/4] sm:aspect-[16/9] md:aspect-[21/9] bg-forest-900">
          {slides.map((slide, i) => {
            const isActive = i === current;
            return (
              <div
                key={i}
                className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                  isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className={`w-full h-full object-cover transition-transform duration-[10000ms] ${isActive ? 'scale-105' : 'scale-100'}`}
                />

                {/* Darker Overlays for text safety */}
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/70 to-transparent md:via-forest-950/40" />
                
                {/* Text Content - Centered on mobile to avoid bottom cutoff */}
                <div className="absolute inset-0 flex flex-col justify-center md:justify-end p-6 md:p-16">
                  <div className={`max-w-2xl transition-all duration-700 transform ${
                    isActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                  }`}>
                    <span className="inline-block px-3 py-1 rounded-full bg-gold-500 text-forest-950 text-[10px] font-bold uppercase mb-3">
                      {slide.tag}
                    </span>
                    
                    <h3 className="font-display text-white text-2xl md:text-6xl font-bold leading-tight">
                      {slide.caption}
                    </h3>
                    
                    <p className="font-body text-cream-100 text-sm md:text-xl mt-2 md:mt-6 opacity-90 line-clamp-3 md:line-clamp-none">
                      {slide.sub}
                    </p>

                    <div className="mt-4 md:mt-8 flex items-center gap-2 text-gold-400">
                        <Heart className="w-4 h-4 fill-gold-500" />
                        <span className="text-[10px] md:text-sm font-medium uppercase tracking-wider">GNAAP Initiative</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {slides.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} className="p-2">
              <div className={`h-1.5 transition-all duration-300 rounded-full ${
                i === current ? 'w-8 bg-gold-500' : 'w-2 bg-white/20'
              }`} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}