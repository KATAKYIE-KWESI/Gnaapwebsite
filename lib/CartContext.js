'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems]   = useState([]);
  const [open,  setOpen]    = useState(false);
  const [hydrated, setHydrated] = useState(false);

  /* Load from localStorage on mount */
  useEffect(() => {
    try {
      const saved = localStorage.getItem('gnaap_cart');
      if (saved) setItems(JSON.parse(saved));
    } catch {}
    setHydrated(true);
  }, []);

  /* Persist to localStorage on change */
  useEffect(() => {
    if (hydrated) localStorage.setItem('gnaap_cart', JSON.stringify(items));
  }, [items, hydrated]);

  const add = useCallback((book) => {
    setItems(prev => {
      const exists = prev.find(i => i._id === book._id);
      if (exists) return prev.map(i => i._id === book._id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...book, qty: 1 }];
    });
    setOpen(true);
  }, []);

  const remove = useCallback((bookId) => {
    setItems(prev => prev.filter(i => i._id !== bookId));
  }, []);

  const updateQty = useCallback((bookId, qty) => {
    if (qty < 1) return;
    setItems(prev => prev.map(i => i._id === bookId ? { ...i, qty } : i));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const total    = items.reduce((s, i) => s + i.price * i.qty, 0);
  const count    = items.reduce((s, i) => s + i.qty, 0);

  return (
    <CartContext.Provider value={{ items, add, remove, updateQty, clear, total, count, open, setOpen }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
};