'use client';

import Link from 'next/link';
import { useAnimateOnScroll } from '@/lib/useAnimateOnScroll';
import { ArrowRight, Calendar, Tag } from 'lucide-react';

// Placeholder articles — replace with real data from your API later
const articles = [
  {
    id: 1,
    category: 'Event',
    date: 'April 15, 2025',
    title: 'GNAAP Annual Literary Conference 2025 Announces Theme',
    excerpt: `This year's conference will centre on the theme "African Stories for a Global Age," bringing together over 200 authors and publishers from across the continent.`,
    readTime: '3 min read', // Added for UI consistency
  },
  {
    id: 2,
    category: 'Membership',
    date: 'March 28, 2025',
    title: 'GNAAP Inducts 35 New Members in Milestone Ceremony',
    excerpt:
      "In a colourful ceremony held in Accra, GNAAP welcomed 35 new members to its growing family of literary professionals committed to transforming Ghana's reading culture.",
    readTime: '4 min read',
  },
  {
    id: 3,
    category: 'Partnership',
    date: 'March 10, 2025',
    title: 'GNAAP Signs MoU with Ghana Education Service',
    excerpt:
      'A new memorandum of understanding will see GNAAP collaborate with the Ghana Education Service to promote reading and book donations in under-resourced schools nationwide.',
    readTime: '5 min read',
  },
];

const categoryColors = {
  Event: 'bg-forest-100 text-forest-700',
  Membership: 'bg-gold-100 text-gold-700',
  Partnership: 'bg-blue-100 text-blue-700',
};

export default function NewsPreview() {
  const ref = useAnimateOnScroll();

  return (
    <section ref={ref} className="py-24 bg-cream-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-6">
          <div>
            <div className="animate-on-scroll">
              <span className="section-label mb-4 block">Latest Updates</span>
            </div>
            <h2 className="font-display font-bold text-4xl sm:text-5xl text-ink animate-on-scroll delay-100 leading-tight">
              News & Announcements
            </h2>
          </div>
          <Link
            href="/news"
            className="group inline-flex items-center gap-2 text-sm font-body font-semibold text-forest-600 hover:text-gold-500 transition-colors animate-on-scroll delay-200 shrink-0"
          >
            View All News
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Articles grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map(({ id, category, date, title, excerpt, readTime }, i) => (
            <article
              key={id}
              className={`animate-on-scroll delay-${(i + 1) * 100} card-lift`}
            >
              <Link href={`/news/${id}`} className="block h-full">
                <div className="bg-white rounded-2xl overflow-hidden h-full border border-cream-300 group hover:border-gold-300 transition-colors duration-300 flex flex-col">
                  {/* Coloured top bar */}
                  <div className="h-1.5 bg-gradient-to-r from-forest-600 to-gold-500" />

                  <div className="p-7 flex flex-col flex-1">
                    {/* Meta */}
                    <div className="flex items-center justify-between mb-5">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[category]}`}>
                        <Tag className="w-3 h-3" />
                        {category}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-ink-muted font-body">
                        <Calendar className="w-3 h-3" />
                        {date}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-display font-semibold text-xl text-ink leading-snug mb-3 group-hover:text-forest-600 transition-colors">
                      {title}
                    </h3>

                    {/* Excerpt */}
                    <p className="font-body text-sm text-ink-muted leading-relaxed flex-1">
                      {excerpt}
                    </p>

                    {/* Read more */}
                    <div className="mt-6 pt-5 border-t border-cream-300 flex items-center justify-between">
                      <span className="text-xs text-ink-light font-body">{readTime}</span>
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-forest-600 group-hover:text-gold-500 transition-colors">
                        Read more <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}