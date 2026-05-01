'use client';

import { useAnimateOnScroll } from '@/lib/useAnimateOnScroll';
import { Lightbulb, Globe, Users, BookMarked } from 'lucide-react';

const pillars = [
  {
    icon: Users,
    title: 'Fostering Community',
    description:
      'Building a vibrant network of Ghanaian authors and publishers who support one another, share knowledge, and celebrate the written word together.',
    accent: 'bg-forest-600',
  },
  {
    icon: BookMarked,
    title: 'Promoting Literacy',
    description:
      'Committed to advancing reading culture across Ghana — from school programmes to national campaigns that make books accessible to all.',
    accent: 'bg-gold-500',
  },
  {
    icon: Globe,
    title: 'National Partnerships',
    description:
      'Working hand-in-hand with government bodies, educational institutions, and international organisations to elevate Ghanaian literature globally.',
    accent: 'bg-forest-700',
  },
  {
    icon: Lightbulb,
    title: 'Empowering Members',
    description:
      'Providing training, resources, advocacy, and opportunities that help our members grow, publish, and share their unique voices with the world.',
    accent: 'bg-gold-600',
  },
];

export default function MissionPillars() {
  const ref = useAnimateOnScroll();

  return (
    <section ref={ref} className="py-24 bg-cream-50 relative overflow-hidden">
      {/* Background text watermark */}
      <div className="absolute -right-10 top-1/2 -translate-y-1/2 font-display font-bold text-[200px] leading-none text-forest-600/5 select-none pointer-events-none hidden lg:block">
        GNAAP
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="max-w-2xl mb-16">
          <div className="animate-on-scroll">
            <span className="section-label mb-4 block">Our Pillars</span>
          </div>
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-ink animate-on-scroll delay-100 leading-tight">
            What We Stand For
          </h2>
          <p className="font-body text-ink-muted mt-4 text-lg leading-relaxed animate-on-scroll delay-200">
            Four commitments that define our mission and guide everything we do as
            Ghana's official literary association.
          </p>
        </div>

        {/* Pillars grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map(({ icon: Icon, title, description, accent }, i) => (
            <div
              key={title}
              className={`animate-on-scroll delay-${(i + 1) * 100} card-lift`}
            >
              <div className="bg-white rounded-2xl p-7 h-full border border-cream-300 group hover:border-gold-300 transition-colors duration-300">
                <div className={`w-12 h-12 ${accent} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-display font-semibold text-xl text-ink mb-3 leading-snug">
                  {title}
                </h3>
                <p className="font-body text-sm text-ink-muted leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
