'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAnimateOnScroll } from '@/lib/useAnimateOnScroll';
import { Calendar, Tag, Search, ArrowRight, Loader2 } from 'lucide-react';
import { api } from '@/lib/api'; 

const categories = ['All', 'Event', 'Membership', 'Partnership', 'Award', 'Workshop', 'General'];

const categoryColors = {
  Event: 'bg-forest-100 text-forest-700',
  Membership: 'bg-gold-100 text-gold-700',
  Partnership: 'bg-blue-100 text-blue-700',
  Award: 'bg-purple-100 text-purple-700',
  Workshop: 'bg-orange-100 text-orange-700',
  General: 'bg-cream-200 text-ink-muted',
};

export default function NewsPage() {
  const [items, setItems] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState('All');
  const [search, setSearch] = useState('');
  const ref = useAnimateOnScroll();

  const loadArticles = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get('/news'); 
      const newsData = res.articles || res.data || res;
      setItems(Array.isArray(newsData) ? newsData : []);
    } catch (err) {
      console.error('Failed to load news:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadArticles();
  }, [loadArticles]);

  const filtered = items.filter((n) => {
    const matchCat = active === 'All' || n.category === active;
    const matchQ = n.title?.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchQ;
  });

  const fmtDate = (d) => d ? new Date(d).toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric'
  }) : 'Recently';

  return (
    <div className="pt-24"> {/* This padding prevents the header overlap */}
      
      {/* Hero Section */}
      <section className="relative bg-[#0a2e1f] py-24 overflow-hidden border-b border-white/5">
        {/* Subtle Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-10" 
            style={{ backgroundImage: 'radial-gradient(#ffffff 0.5px, transparent 0.5px)', size: '20px 20px' }}>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            {/* Top Label with Gold Accent */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[2px] w-8 bg-gold-500"></div>
              <span className="text-gold-500 font-display font-bold uppercase tracking-[0.2em] text-xs">
                GNAAP Newsroom
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-[1.1] mb-8">
              Stay <span className="text-gold-shimmer">Informed</span> & <br /> 
             <span className="text-gold-shimmer">Inspired</span>
            </h1>

            {/* Subtext */}
            <p className="font-body text-cream-100/80 text-lg md:text-xl leading-relaxed max-w-2xl">
              Explore a curated selection of updates, articles, and announcements from GNAAP 
              members — celebrating the richness of Ghanaian culture and thought.
            </p>
          </div>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="sticky top-16 z-30 bg-white/80 backdrop-blur-md border-b border-cream-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            {/* Category Buttons */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                    active === cat 
                    ? 'bg-forest-600 text-white shadow-md' 
                    : 'bg-cream-100 text-ink-muted hover:bg-cream-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[300px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted" />
              <input
                type="text"
                placeholder="Search articles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 bg-cream-50 border border-cream-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 transition-all text-ink font-body"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Articles grid */}
      <section ref={ref} className="py-16 bg-cream-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-10 h-10 text-gold-500 animate-spin mb-4" />
              <p className="text-ink-muted font-body">Fetching latest updates...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-body text-ink-muted text-lg">No articles found in this category.</p>
              <button onClick={() => {setActive('All'); setSearch('');}} className="mt-4 text-forest-600 hover:underline">
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((article, i) => (
                <article key={article._id || i} className="card-lift group">
                  <div className="bg-white rounded-2xl border border-cream-300 overflow-hidden h-full flex flex-col hover:border-gold-300 transition-all duration-300 shadow-sm hover:shadow-xl">
                    
                    <div className="relative h-52 overflow-hidden bg-cream-100">
                      <img 
                        src={article.coverImage || 'https://placehold.co/600x400?text=News+Update'} 
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    <div className="p-8 flex flex-col flex-1">
                      <div className="flex items-center justify-between mb-5">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${categoryColors[article.category] || categoryColors.General}`}>
                          <Tag className="w-3 h-3" /> {article.category || 'General'}
                        </span>
                        <span className="flex items-center gap-1.5 text-xs text-ink-muted font-body">
                          <Calendar className="w-3 h-3" /> {fmtDate(article.createdAt)}
                        </span>
                      </div>
                      
                      <h2 className="font-display font-semibold text-xl text-ink leading-tight mb-4 group-hover:text-forest-600 transition-colors">
                        {article.title}
                      </h2>
                      
                      <p className="font-body text-sm text-ink-muted leading-relaxed flex-1 line-clamp-3 mb-6">
                        {article.excerpt || "Dive into the details of this latest update from our organization."}
                      </p>
                      
                      <div className="pt-6 border-t border-cream-200 flex items-center justify-between">
                        <span className="text-xs text-ink-light font-body font-medium italic">{article.readTime || '3 min'} read</span>
                        <a href={`/news/${article.slug}`} className="inline-flex items-center gap-1.5 text-sm font-bold text-forest-600 group-hover:text-gold-600 transition-colors">
                          Read Full Story <ArrowRight className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}