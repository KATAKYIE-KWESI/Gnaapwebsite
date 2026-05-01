'use client';

import { useState } from 'react';
import { useAnimateOnScroll } from '@/lib/useAnimateOnScroll';
import { ShoppingCart, Star, Search, BookOpen } from 'lucide-react';

const books = [
  { id: 1, title: 'Voices from the Volta',       author: 'Kwame Asante',       category: 'Fiction',       price: 'GH₵ 45', rating: 4.8, reviews: 23, color: 'bg-forest-600'  },
  { id: 2, title: 'The Drumming of Ancestors',   author: 'Abena Mensah',       category: 'Poetry',        price: 'GH₵ 35', rating: 4.9, reviews: 41, color: 'bg-gold-600'    },
  { id: 3, title: 'Ghana: A Business Chronicle', author: 'Kofi Boateng',       category: 'Non-Fiction',   price: 'GH₵ 60', rating: 4.7, reviews: 17, color: 'bg-forest-800'  },
  { id: 4, title: 'Children of the Harmattan',   author: 'Akosua Frimpong',    category: 'Fiction',       price: 'GH₵ 40', rating: 5.0, reviews: 58, color: 'bg-gold-700'    },
  { id: 5, title: 'Letters to Accra',            author: 'Yaw Darko',          category: 'Poetry',        price: 'GH₵ 30', rating: 4.6, reviews: 12, color: 'bg-forest-700'  },
  { id: 6, title: 'Publishing in the Digital Age',author: 'Dr. Ama Owusu',    category: 'Non-Fiction',   price: 'GH₵ 55', rating: 4.8, reviews: 29, color: 'bg-ink-soft'    },
];

const categories = ['All', 'Fiction', 'Poetry', 'Non-Fiction'];

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`w-3 h-3 ${s <= Math.round(rating) ? 'text-gold-500 fill-gold-500' : 'text-cream-400'}`}
        />
      ))}
    </div>
  );
}

export default function BookstorePage() {
  const [active, setActive] = useState('All');
  const [search, setSearch] = useState('');
  const ref = useAnimateOnScroll();

  const filtered = books.filter((b) => {
    const matchCat = active === 'All' || b.category === active;
    const matchQ   = b.title.toLowerCase().includes(search.toLowerCase()) ||
                     b.author.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchQ;
  });

  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-20 hero-bg relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: `radial-gradient(circle, #C9983B 1.5px, transparent 1.5px)`, backgroundSize: '28px 28px' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="section-label text-gold-400 mb-5 block">GNAAP Bookstore</span>
          <h1 className="font-display font-bold text-5xl sm:text-6xl text-white leading-tight">
            Discover <span className="text-gold-shimmer">Ghanaian</span><br />Literature
          </h1>
          <p className="font-body text-cream-300 text-lg mt-6 max-w-xl leading-relaxed">
            Explore a curated selection of books by GNAAP member authors — fiction, poetry,
            non-fiction and more, all celebrating the richness of Ghanaian culture and thought.
          </p>
        </div>
      </section>

      {/* Filter bar */}
      <section className="sticky top-20 z-30 bg-white/95 backdrop-blur border-b border-cream-300 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-body font-semibold transition-all ${
                  active === cat ? 'bg-forest-600 text-white' : 'bg-cream-100 text-ink-muted hover:bg-cream-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-light" />
            <input
              type="text"
              placeholder="Search books or authors…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 bg-cream-100 border border-cream-300 rounded-full text-sm font-body focus:outline-none focus:ring-2 focus:ring-gold-400 w-64"
            />
          </div>
        </div>
      </section>

      {/* Books grid */}
      <section ref={ref} className="py-16 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(({ id, title, author, category, price, rating, reviews, color }, i) => (
              <div key={id} className={`animate-on-scroll delay-${Math.min((i % 3 + 1) * 100, 300)} card-lift`}>
                <div className="bg-white rounded-2xl border border-cream-300 overflow-hidden group hover:border-gold-300 transition-colors duration-300 h-full flex flex-col">
                  {/* Book cover visual */}
                  <div className={`${color} h-48 relative flex items-center justify-center overflow-hidden`}>
                    <div className="absolute inset-0 opacity-10"
                      style={{ backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`, backgroundSize: '20px 20px' }} />
                    <BookOpen className="w-20 h-20 text-white/30" />
                    <div className="absolute bottom-4 left-5 right-5">
                      <p className="font-display font-bold text-white text-lg leading-snug line-clamp-2">{title}</p>
                      <p className="font-body text-white/70 text-xs mt-1">{author}</p>
                    </div>
                    <span className="absolute top-3 right-3 bg-white/20 text-white text-[10px] font-body font-semibold px-2 py-1 rounded-full uppercase tracking-wide">
                      {category}
                    </span>
                  </div>

                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <StarRating rating={rating} />
                      <span className="font-body text-xs text-ink-muted">{rating} ({reviews})</span>
                    </div>
                    <h3 className="font-display font-semibold text-ink text-lg leading-snug mb-1 group-hover:text-forest-600 transition-colors">{title}</h3>
                    <p className="font-body text-xs text-ink-muted mb-4">by {author}</p>
                    <div className="mt-auto flex items-center justify-between">
                      <span className="font-display font-bold text-xl text-forest-600">{price}</span>
                      <button className="inline-flex items-center gap-2 px-4 py-2 bg-forest-600 hover:bg-gold-500 text-white font-body font-semibold text-xs rounded-full transition-all duration-200">
                        <ShoppingCart className="w-3.5 h-3.5" /> Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
