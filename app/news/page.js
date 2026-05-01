'use client';

import { useState } from 'react';
import { useAnimateOnScroll } from '@/lib/useAnimateOnScroll';
import { Calendar, Tag, Search, ArrowRight } from 'lucide-react';

const allNews = [
  { 
    id: 1, 
    category: 'Event', 
    date: 'April 15, 2025', 
    title: 'GNAAP Annual Literary Conference 2025 Announces Theme', 
    excerpt: "This year's conference will centre on \"African Stories for a Global Age,\" bringing together 200+ authors and publishers.", 
    readTime: '3 min' 
  },
  { 
    id: 2, 
    category: 'Membership', 
    date: 'March 28, 2025', 
    title: 'GNAAP Inducts 35 New Members in Milestone Ceremony', 
    excerpt: 'In a colourful ceremony held in Accra, GNAAP welcomed 35 new members to its growing family of literary professionals.', 
    readTime: '4 min' 
  },
  { 
    id: 3, 
    category: 'Partnership', 
    date: 'March 10, 2025', 
    title: 'GNAAP Signs MoU with Ghana Education Service', 
    excerpt: 'A new MoU will see GNAAP collaborate with GES to promote reading and book donations in under-resourced schools.', 
    readTime: '5 min' 
  },
  { 
    id: 4, 
    category: 'Award', 
    date: 'February 20, 2025', 
    title: 'Nominations Open for the GNAAP Literary Awards 2025', 
    excerpt: 'GNAAP invites nominations across 10 categories celebrating the best of Ghanaian literature and publishing.', 
    readTime: '2 min' 
  },
  { 
    id: 5, 
    category: 'Event', 
    date: 'February 5, 2025', 
    title: 'GNAAP at the Accra International Book Fair 2025', 
    excerpt: "GNAAP showcases the works of over 60 member authors at this year's Accra International Book Fair.", 
    readTime: '3 min' 
  },
  { 
    id: 6, 
    category: 'Workshop', 
    date: 'January 18, 2025', 
    title: 'Free Creative Writing Workshop for Young Authors', 
    excerpt: 'GNAAP opens registration for its flagship free creative writing workshop series targeting Ghanaian youth aged 14–25.', 
    readTime: '4 min' 
  },
];

const categories = ['All', 'Event', 'Membership', 'Partnership', 'Award', 'Workshop'];

const categoryColors = {
  Event: 'bg-forest-100 text-forest-700',
  Membership: 'bg-gold-100 text-gold-700',
  Partnership: 'bg-blue-100 text-blue-700',
  Award: 'bg-purple-100 text-purple-700',
  Workshop: 'bg-orange-100 text-orange-700',
};

export default function NewsPage() {
  const [active, setActive] = useState('All');
  const [search, setSearch] = useState('');
  const ref = useAnimateOnScroll();

  const filtered = allNews.filter((n) => {
    const matchCat = active === 'All' || n.category === active;
    const matchQ = n.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchQ;
  });

  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-20 hero-bg relative overflow-hidden bg-ink">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: `radial-gradient(circle, #C9983B 1.5px, transparent 1.5px)`, backgroundSize: '28px 28px' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="section-label text-gold-400 mb-5 block">Stay Informed</span>
          <h1 className="font-display font-bold text-5xl sm:text-6xl text-white leading-tight">
            News & <span className="text-gold-500">Updates</span>
          </h1>
          <p className="font-body text-cream-300 text-lg mt-6 max-w-xl leading-relaxed">
            Stay up to date with the latest happenings, events, partnerships, and announcements from GNAAP.
          </p>
        </div>
      </section>

      {/* Filter & search bar */}
      <section className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-cream-300 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          {/* Category tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-body font-semibold transition-all duration-200 ${
                  active === cat
                    ? 'bg-forest-600 text-white'
                    : 'bg-cream-100 text-ink-muted hover:bg-cream-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-light" />
            <input
              type="text"
              placeholder="Search news…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 bg-cream-100 border border-cream-300 rounded-full text-sm font-body text-ink placeholder:text-ink-light focus:outline-none focus:ring-2 focus:ring-gold-400 w-full sm:w-60"
            />
          </div>
        </div>
      </section>

      {/* Articles grid */}
      <section ref={ref} className="py-16 bg-cream-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-body text-ink-muted text-lg">No articles found. Try a different search or category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(({ id, category, date, title, excerpt, readTime }, i) => (
                <article key={id} className={`animate-on-scroll delay-${Math.min((i % 3 + 1) * 100, 300)} card-lift`}>
                  <div className="bg-white rounded-2xl border border-cream-300 overflow-hidden h-full flex flex-col group hover:border-gold-300 transition-colors duration-300">
                    <div className="h-1.5 bg-gradient-to-r from-forest-600 to-gold-500" />
                    <div className="p-7 flex flex-col flex-1">
                      <div className="flex items-center justify-between mb-5">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[category]}`}>
                          <Tag className="w-3 h-3" /> {category}
                        </span>
                        <span className="flex items-center gap-1.5 text-xs text-ink-muted font-body">
                          <Calendar className="w-3 h-3" /> {date}
                        </span>
                      </div>
                      <h2 className="font-display font-semibold text-xl text-ink leading-snug mb-3 group-hover:text-forest-600 transition-colors">{title}</h2>
                      <p className="font-body text-sm text-ink-muted leading-relaxed flex-1">{excerpt}</p>
                      <div className="mt-6 pt-5 border-t border-cream-300 flex items-center justify-between">
                        <span className="text-xs text-ink-light font-body">{readTime} read</span>
                        <button className="inline-flex items-center gap-1.5 text-xs font-semibold text-forest-600 group-hover:text-gold-500 transition-colors">
                          Read more <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}