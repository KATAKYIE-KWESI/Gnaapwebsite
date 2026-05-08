'use client';

import { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Star, Search, BookOpen, Loader2, Check } from 'lucide-react';
import { useCart } from '@/lib/CartContext';

const CATEGORIES = ['All', 'Fiction', 'Non-Fiction', 'Poetry', 'Children', 'Academic', 'Biography', 'Drama'];
const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const StarRating = ({ rating }) => (
  <div className="flex gap-0.5">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className={`w-3 h-3 ${i < Math.floor(rating || 0) ? 'fill-gold-400 text-gold-400' : 'text-cream-300 fill-cream-200'}`}/>
    ))}
  </div>
);

function BookCard({ book }) {
  const { add, items } = useCart();
  const [added, setAdded] = useState(false);
  const inCart = items.some(i => i._id === book._id);

  const handleAdd = () => {
    add(book);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="bg-white rounded-2xl border border-cream-300 overflow-hidden group hover:border-gold-300 transition-all duration-300 flex flex-col shadow-sm hover:shadow-md h-full">
      <div className="bg-forest-800 h-64 relative flex items-center justify-center overflow-hidden">
        {book.coverImage ? (
          <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
        ) : (
          <div className="flex flex-col items-center gap-2 opacity-30">
            <BookOpen className="w-16 h-16 text-white"/>
            <span className="text-white text-[10px] font-body uppercase tracking-widest">No Cover</span>
          </div>
        )}
        <span className="absolute top-4 right-4 bg-forest-900/80 text-white text-[10px] font-body font-bold px-3 py-1 rounded-full uppercase tracking-widest backdrop-blur-sm">{book.category}</span>
        {inCart && <span className="absolute top-4 left-4 bg-gold-500 text-forest-900 text-[10px] font-body font-bold px-2.5 py-1 rounded-full">In cart</span>}
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-2">
          <StarRating rating={book.avgRating}/>
          <span className="font-body text-xs text-ink-muted">{(book.avgRating||0).toFixed(1)} ({book.totalReviews||0})</span>
        </div>
        <h3 className="font-display font-bold text-ink text-xl leading-tight mb-1 group-hover:text-forest-600 transition-colors">{book.title}</h3>
        <p className="font-body text-sm text-ink-muted mb-2 italic">by {book.author}</p>
        {book.description && <p className="font-body text-xs text-ink-light leading-relaxed line-clamp-2 mb-3">{book.description}</p>}
        {book.stock === 0 && <p className="text-xs font-body text-red-500 font-medium mb-2">Out of stock</p>}
        <div className="mt-auto flex items-center justify-between border-t border-cream-100 pt-5">
          <div className="flex flex-col">
            <span className="text-[10px] text-ink-light font-body uppercase tracking-tighter">Price</span>
            <span className="font-display font-bold text-2xl text-forest-700">GH₵ {book.price}</span>
          </div>
          <button onClick={handleAdd} disabled={book.stock === 0}
            className={`inline-flex items-center gap-2 px-5 py-2.5 font-body font-bold text-xs rounded-full transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed ${added ? 'bg-forest-600 text-white' : 'bg-forest-600 hover:bg-gold-500 text-white'}`}>
            {added ? <><Check className="w-4 h-4"/>Added!</> : <><ShoppingCart className="w-4 h-4"/>Add to Cart</>}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function BookstorePage() {
  const [books, setBooks]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive]   = useState('All');
  const [search, setSearch]   = useState('');
  const { count, setOpen }    = useCart();
  const scrollRef = useRef(null);

  useEffect(() => {
    const go = async () => {
      setLoading(true);
      try {
        const p = new URLSearchParams();
        if (active !== 'All') p.append('category', active);
        if (search) p.append('search', search);
        const res = await fetch(`${API}/books?${p}`);
        if (!res.ok) throw new Error(res.status);
        const data = await res.json();
        setBooks(data.books || data.data || []);
      } catch { setBooks([]); }
      finally { setLoading(false); }
    };
    const t = setTimeout(go, 400);
    return () => clearTimeout(t);
  }, [active, search]);

  return (
    <div className="min-h-screen bg-cream-50">
      <section className="pt-40 pb-20 hero-bg relative overflow-hidden bg-ink">
        <div className="absolute inset-0 opacity-[0.04]" style={{backgroundImage:`radial-gradient(circle, #C9983B 1.5px, transparent 1.5px)`,backgroundSize:'28px 28px'}}/>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="section-label text-gold-400 mb-5 block">GNAAP Bookstore</span>
          <h1 className="font-display font-bold text-5xl sm:text-6xl text-white leading-tight">
            Discover <span className="text-gold-shimmer">Ghanaian</span><br/>Literature
          </h1>
          <p className="font-body text-cream-300 text-lg mt-6 max-w-xl leading-relaxed">
            Explore a curated selection of books by GNAAP member authors — celebrating the richness of Ghanaian culture and thought.
          </p>
        </div>
      </section>

      <section className="sticky top-20 z-30 bg-white/95 backdrop-blur border-b border-cream-300 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setActive(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-body font-semibold transition-all ${active===cat?'bg-forest-600 text-white shadow-md':'bg-cream-100 text-ink-muted hover:bg-cream-200'}`}>
                {cat}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-light"/>
              <input type="text" placeholder="Search titles or authors…" value={search} onChange={e => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 bg-cream-100 border border-cream-300 rounded-full text-sm font-body focus:outline-none focus:ring-2 focus:ring-gold-400 w-full sm:w-64"/>
            </div>
            <button onClick={() => setOpen(true)}
              className="relative flex items-center gap-2 px-4 py-2 bg-forest-600 text-white text-sm font-body font-semibold rounded-full sm:hidden flex-shrink-0">
              <ShoppingCart className="w-4 h-4"/>
              {count > 0 && <span className="w-4 h-4 rounded-full bg-gold-400 text-forest-900 text-[10px] font-bold flex items-center justify-center">{count}</span>}
            </button>
          </div>
        </div>
      </section>

      <section ref={scrollRef} className="py-16 min-h-[500px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="w-10 h-10 text-forest-600 animate-spin"/>
              <p className="font-body text-ink-muted italic">Opening the vault…</p>
            </div>
          ) : books.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {books.map(book => <BookCard key={book._id} book={book}/>)}
            </div>
          ) : (
            <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-cream-300">
              <BookOpen className="w-12 h-12 text-cream-400 mx-auto mb-4"/>
              <h3 className="font-display font-bold text-xl text-ink">No books found</h3>
              <p className="font-body text-ink-muted mt-2">Try adjusting your filters or search terms.</p>
              <button onClick={() => {setActive('All');setSearch('');}} className="mt-6 text-forest-600 font-body font-bold text-sm underline underline-offset-4">Clear all filters</button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}