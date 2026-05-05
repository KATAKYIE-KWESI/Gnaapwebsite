'use client';

import { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Star, Search, BookOpen, Loader2 } from 'lucide-react';

// Categories match the Backend Enum exactly
const categories = ['All', 'Fiction', 'Non-Fiction', 'Poetry', 'Children', 'Academic', 'Biography', 'Drama'];

/**
 * Helper component to render stars based on the average rating
 */
const StarRating = ({ rating }) => {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-3 h-3 ${
            i < Math.floor(rating || 0) 
              ? 'fill-gold-400 text-gold-400' 
              : 'text-cream-300 fill-cream-200'
          }`}
        />
      ))}
    </div>
  );
};

export default function BookstorePage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState('All');
  const [search, setSearch] = useState('');

  // Correctly named ref to avoid conflicts with reserved words
  const scrollRef = useRef(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        
        // Only append if it's a specific category
        if (active !== 'All') params.append('category', active);
        if (search) params.append('search', search);

        const response = await fetch(`${API_URL}/books?${params.toString()}`);
        
        if (!response.ok) throw new Error(`Server responded with ${response.status}`);

        const data = await response.json();
        
        // Ensure we are targeting 'data.books' based on backend structure
        if (data && data.success && Array.isArray(data.books)) {
          setBooks(data.books);
        } else {
          setBooks([]);
        }
      } catch (error) {
        console.error("❌ Bookstore Connection Error:", error);
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    // Debounce avoids hitting the server on every single keystroke in search
    const debounce = setTimeout(fetchBooks, 400);
    return () => clearTimeout(debounce);
  }, [active, search, API_URL]);

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Hero Section */}
      <section className="pt-40 pb-20 hero-bg relative overflow-hidden bg-ink">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: `radial-gradient(circle, #C9983B 1.5px, transparent 1.5px)`, backgroundSize: '28px 28px' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="section-label text-gold-400 mb-5 block">GNAAP Bookstore</span>
          <h1 className="font-display font-bold text-5xl sm:text-6xl text-white leading-tight">
            Discover <span className="text-gold-shimmer">Ghanaian</span><br />Literature
          </h1>
          <p className="font-body text-cream-300 text-lg mt-6 max-w-xl leading-relaxed">
            Explore a curated selection of books by GNAAP member authors — celebrating 
            the richness of Ghanaian culture and thought.
          </p>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="sticky top-20 z-30 bg-white/95 backdrop-blur border-b border-cream-300 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-body font-semibold transition-all ${
                  active === cat ? 'bg-forest-600 text-white shadow-md' : 'bg-cream-100 text-ink-muted hover:bg-cream-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-light" />
            <input
              type="text"
              placeholder="Search titles or authors…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 bg-cream-100 border border-cream-300 rounded-full text-sm font-body focus:outline-none focus:ring-2 focus:ring-gold-400 w-full sm:w-64"
            />
          </div>
        </div>
      </section>

      {/* Books Display Area */}
      <section ref={scrollRef} className="py-16 min-h-[500px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-10 h-10 text-forest-600 animate-spin" />
              <p className="mt-4 font-body text-ink-muted italic">Opening the vault...</p>
            </div>
          ) : books.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {books.map((book, i) => (
                <div key={book._id} className="h-full">
                  <div className="bg-white rounded-2xl border border-cream-300 overflow-hidden group hover:border-gold-300 transition-all duration-300 h-full flex flex-col shadow-sm hover:shadow-md">
                    
                    <div className="bg-forest-800 h-64 relative flex items-center justify-center overflow-hidden">
                      {book.coverImage ? (
                        <img 
                          src={book.coverImage} 
                          alt={book.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="flex flex-col items-center gap-2 opacity-30">
                          <BookOpen className="w-16 h-16 text-white" />
                          <span className="text-white text-[10px] font-body uppercase tracking-widest">No Cover</span>
                        </div>
                      )}
                      <span className="absolute top-4 right-4 bg-forest-900/80 text-white text-[10px] font-body font-bold px-3 py-1 rounded-full uppercase tracking-widest backdrop-blur-sm">
                        {book.category}
                      </span>
                    </div>

                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <StarRating rating={book.avgRating} />
                        <span className="font-body text-xs text-ink-muted">
                          {book.avgRating || 0} ({book.totalReviews || 0})
                        </span>
                      </div>
                      
                      <h3 className="font-display font-bold text-ink text-xl leading-tight mb-1 group-hover:text-forest-600 transition-colors">
                        {book.title}
                      </h3>
                      <p className="font-body text-sm text-ink-muted mb-6 italic">by {book.author}</p>
                      
                      <div className="mt-auto flex items-center justify-between border-t border-cream-100 pt-5">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-ink-light font-body uppercase tracking-tighter">Price</span>
                          <span className="font-display font-bold text-2xl text-forest-700">GH₵ {book.price}</span>
                        </div>
                        <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-forest-600 hover:bg-gold-500 text-white font-body font-bold text-xs rounded-full transition-all active:scale-95">
                          <ShoppingCart className="w-4 h-4" /> Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-cream-300">
              <BookOpen className="w-12 h-12 text-cream-400 mx-auto mb-4" />
              <h3 className="font-display font-bold text-xl text-ink">No books found</h3>
              <p className="font-body text-ink-muted mt-2">Try adjusting your filters or search terms.</p>
              <button 
                onClick={() => { setActive('All'); setSearch(''); }}
                className="mt-6 text-forest-600 font-body font-bold text-sm underline underline-offset-4"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}