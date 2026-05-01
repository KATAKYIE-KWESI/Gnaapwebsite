'use client';

import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, BookOpen, Heart } from 'lucide-react';

const slides = [
  {
    // Ato Aikins — photographed in Accra, Ghana ✓
    src: 'https://images.unsplash.com/photo-1687794504223-8bdc02e25ef6?w=1400&q=85&fit=crop',
    alt: 'School pupils in a classroom in Accra, Ghana',
    caption: 'Nurturing Young Minds in Ghana',
    sub: 'Building a literate generation — one classroom at a time',
  },
  {
    src: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=1400&q=80',
    alt: 'Author speaking at event',
    caption: 'Amplifying Author Voices',
    sub: 'Giving Ghanaian writers the platform they deserve',
  },
  {
    // Santi Vedrí — African school children writing
    src: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=1400&q=85&fit=crop',
    alt: 'African school children writing in class',
    caption: 'Writers Begin Here',
    sub: "Today's pupils are tomorrow's authors and publishers",
  },
  {
    // Doug Linstedt — African children sitting in a classroom
    src: 'https://images.unsplash.com/photo-1473649085228-583485e6e4d7?w=1400&q=85&fit=crop',
    alt: 'Children sitting in a classroom',
    caption: 'The Power of the Written Word',
    sub: 'Transforming society through books, learning, and literature',
  },
  {
    // Felicia Montenegro — young African children sitting together
    src: 'https://images.unsplash.com/photo-1632932693914-89b90ae3d16d?w=1400&q=85&fit=crop',
    alt: 'Young African children learning together',
    caption: 'Learning Together, Growing Together',
    sub: 'Supporting Ghanaian educators and the next generation of readers',
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
    <section className="bg-forest-950 py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gold-500 font-bold tracking-[0.2em] uppercase text-xs">
              <div className="w-10 h-[2px] bg-gold-500" />
              Impact Gallery
            </div>
            <h2 className="font-display font-bold text-white text-4xl sm:text-6xl">
              GNAAP <span className="text-gold-500 italic">In Focus</span>
            </h2>
          </div>
          
          <div className="flex items-center gap-4">
             <button 
               onClick={prev} 
               className="group p-4 rounded-full border border-white/10 bg-white/5 hover:bg-gold-500 hover:border-gold-500 transition-all duration-300"
             >
                <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
             </button>
             <button 
               onClick={next} 
               className="group p-4 rounded-full border border-white/10 bg-white/5 hover:bg-gold-500 hover:border-gold-500 transition-all duration-300"
             >
                <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
             </button>
          </div>
        </div>

        {/* Slider Frame */}
        <div className="relative rounded-[2rem] overflow-hidden shadow-2xl aspect-[16/9] md:aspect-[21/9] group bg-forest-900">
          {slides.map((slide, i) => {
            const isActive = i === current;
            return (
              <div
                key={i}
                className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                  isActive ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-110 z-0'
                }`}
              >
                {/* Background Image with Ken Burns */}
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className={`w-full h-full object-cover transition-transform duration-[15000ms] ease-linear ${
                    isActive ? 'scale-110' : 'scale-100'
                  }`}
                />

                {/* Aesthetic Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/40 to-transparent opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-r from-forest-950/60 to-transparent" />
                
                {/* Text Content - "The Glass Card" */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16">
                  <div className={`max-w-2xl transition-all duration-1000 delay-300 transform ${
                    isActive ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'
                  }`}>
                    {/* Badge */}
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500 text-forest-950 text-xs font-bold uppercase mb-6 shadow-lg shadow-gold-500/20">
                      <BookOpen className="w-3 h-3" />
                      {slide.tag}
                    </span>
                    
                    <h3 className="font-display text-white text-4xl md:text-6xl font-bold leading-tight drop-shadow-md">
                      {slide.caption}
                    </h3>
                    
                    <p className="font-body text-cream-100 text-lg md:text-xl mt-6 leading-relaxed max-w-lg opacity-90">
                      {slide.sub}
                    </p>

                    <div className="mt-8 flex items-center gap-6">
                        <div className="flex items-center gap-2 text-gold-400">
                            <Heart className="w-5 h-5 fill-gold-500" />
                            <span className="text-sm font-medium">GNAAP Initiative</span>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Grainy texture overlay for a "Print" feel */}
          <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/felt.png')]" />
        </div>

        {/* Progress Bar Indicators */}
        <div className="flex justify-center items-center gap-3 mt-12">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="group relative"
            >
              <div className={`h-1.5 transition-all duration-500 rounded-full ${
                i === current ? 'w-16 bg-gold-500' : 'w-4 bg-white/10 group-hover:bg-white/30'
              }`} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}