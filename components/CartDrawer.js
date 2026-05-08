'use client';

import { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingCart, CreditCard, Loader2, CheckCircle } from 'lucide-react';
import { useCart } from '@/lib/CartContext';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
const EMPTY_FORM = { name: '', email: '', phone: '', address: '' };

/**
 * Safety Helper: Prevents "Objects are not valid as a React child" 
 * by checking if the value is an object (like {country: 'Ghana'}) 
 * before rendering.
 */
const renderText = (val) => {
  if (val && typeof val === 'object') {
    return val.country || val.name || JSON.stringify(val);
  }
  return val;
};

function Field({ label, children }) {
  return (
    <div className="space-y-1">
      <label className="block text-xs font-semibold text-ink-muted uppercase tracking-wide font-body">{label}</label>
      {children}
    </div>
  );
}

const Inp = (props) => (
  <input {...props} className="w-full px-3 py-2.5 bg-cream-50 border border-cream-300 rounded-lg text-sm font-body focus:outline-none focus:border-gold-500 transition-colors" />
);

export default function CartDrawer() {
  const { items, remove, updateQty, clear, total, count, open, setOpen } = useCart();
  const [step, setStep] = useState('cart');
  const [form, setForm] = useState(EMPTY_FORM);
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  const f = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }));

  const checkout = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) { 
      setErr('Name, email and phone are required'); 
      return; 
    }
    setErr(''); 
    setStep('processing'); 
    setLoading(true);

    try {
      const res = await fetch(`${API}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: form.name,
          customerEmail: form.email,
          customerPhone: form.phone,
          shippingAddress: form.address,
          items: items.map(i => ({ bookId: i._id, quantity: i.qty, price: i.price })),
          totalAmount: total,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Order failed');

      const url = data.paymentUrl || data.data?.paymentUrl || data.authorization_url || data.data?.authorization_url;
      if (url) {
        clear();
        window.location.href = url;
      } else {
        clear(); 
        setStep('done');
      }
    } catch (err) {
      setErr(err.message);
      setStep('checkout');
    } finally {
      setLoading(false);
    }
  };

  const close = () => {
    setOpen(false);
    setTimeout(() => { setStep('cart'); setForm(EMPTY_FORM); setErr(''); }, 400);
  };

  return (
    <>
      <div
        onClick={close}
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-in-out ${
        open ? 'translate-x-0' : 'translate-x-full'
      }`}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-cream-200 flex-shrink-0">
          <div className="flex items-center gap-3">
            <ShoppingCart size={20} className="text-forest-700" />
            <h2 className="font-display text-xl font-semibold text-forest-800">
              {step === 'checkout' ? 'Checkout' : step === 'done' ? 'Order Placed!' : 'Your Cart'}
            </h2>
            {step === 'cart' && count > 0 && (
              <span className="w-5 h-5 rounded-full bg-gold-500 text-forest-900 text-[10px] font-bold flex items-center justify-center">{count}</span>
            )}
          </div>
          <button onClick={close} className="p-1.5 rounded-lg hover:bg-cream-100 text-ink-muted transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* ── CART VIEW ── */}
        {step === 'cart' && (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-20">
                  <ShoppingCart size={40} className="text-cream-300" />
                  <p className="font-display text-lg font-medium text-ink-DEFAULT">Your cart is empty</p>
                  <button onClick={close} className="mt-2 px-5 py-2.5 bg-forest-700 text-cream-50 text-sm font-body rounded-lg hover:bg-forest-600 transition-colors">
                    Browse Books
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map(item => (
                    <div key={item._id} className="flex gap-4 p-4 bg-cream-50 rounded-2xl border border-cream-200">
                      <div className="w-14 flex-shrink-0 rounded-lg overflow-hidden bg-forest-100" style={{ height: '72px' }}>
                        {item.coverImage
                          ? <img src={item.coverImage} alt={renderText(item.title)} className="w-full h-full object-cover" />
                          : <div className="w-full h-full flex items-center justify-center"><ShoppingCart size={16} className="text-forest-400" /></div>}
                      </div>
                      <div className="flex-1 min-w-0">
                        {/* Fix applied here: renderText() checks for objects */}
                        <p className="font-body font-semibold text-ink-DEFAULT text-sm leading-tight truncate">{renderText(item.title)}</p>
                        <p className="font-body text-xs text-ink-muted mt-0.5 italic">{renderText(item.author)}</p>
                        <p className="font-display font-bold text-forest-700 text-base mt-1">GH₵ {item.price}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button onClick={() => updateQty(item._id, item.qty - 1)} className="w-6 h-6 rounded-full border border-cream-300 flex items-center justify-center hover:bg-cream-200">
                            <Minus size={11} />
                          </button>
                          <span className="text-sm font-body font-medium w-5 text-center">{item.qty}</span>
                          <button onClick={() => updateQty(item._id, item.qty + 1)} className="w-6 h-6 rounded-full border border-cream-300 flex items-center justify-center hover:bg-cream-200">
                            <Plus size={11} />
                          </button>
                          <button onClick={() => remove(item._id)} className="ml-auto p-1 text-ink-light hover:text-red-500">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="px-6 py-5 border-t border-cream-200 space-y-3 bg-cream-50 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <span className="font-body text-sm text-ink-muted">Subtotal ({count} items)</span>
                  <span className="font-display font-bold text-xl text-forest-800">GH₵ {total.toFixed(2)}</span>
                </div>
                <button onClick={() => setStep('checkout')} className="w-full flex items-center justify-center gap-2 py-3 bg-forest-700 hover:bg-forest-600 text-cream-50 font-body font-semibold text-sm rounded-xl">
                  <CreditCard size={16} /> Proceed to Checkout
                </button>
              </div>
            )}
          </>
        )}

        {/* ── CHECKOUT VIEW ── */}
        {step === 'checkout' && (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-5">
              <div className="bg-cream-50 rounded-2xl border border-cream-200 p-4 mb-5">
                <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-3 font-body">Order Summary</p>
                <div className="space-y-1.5">
                  {items.map(item => (
                    <div key={item._id} className="flex justify-between text-sm font-body">
                      {/* Fix applied here as well */}
                      <span className="text-ink-soft truncate mr-4">{renderText(item.title)} × {item.qty}</span>
                      <span className="text-ink-DEFAULT font-medium flex-shrink-0">GH₵ {(item.price * item.qty).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-3 pt-3 border-t border-cream-300">
                  <span className="font-body font-semibold text-ink-DEFAULT">Total</span>
                  <span className="font-display font-bold text-lg text-forest-800">GH₵ {total.toFixed(2)}</span>
                </div>
              </div>

              <form onSubmit={checkout} id="checkout-form" className="space-y-4">
                {err && <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">{err}</div>}
                <Field label="Full Name"><Inp required value={form.name} onChange={f('name')} /></Field>
                <Field label="Email Address"><Inp required type="email" value={form.email} onChange={f('email')} /></Field>
                <Field label="Phone Number"><Inp required value={form.phone} onChange={f('phone')} /></Field>
                <Field label="Delivery Address"><Inp value={form.address} onChange={f('address')} /></Field>
              </form>
            </div>

            <div className="px-6 py-5 border-t border-cream-200 space-y-3 bg-cream-50 flex-shrink-0">
              <button form="checkout-form" type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 py-3 bg-gold-500 hover:bg-gold-400 text-forest-900 font-bold text-sm rounded-xl">
                {loading ? <Loader2 size={16} className="animate-spin" /> : <CreditCard size={16} />}
                {loading ? 'Processing…' : `Pay GH₵ ${total.toFixed(2)}`}
              </button>
            </div>
          </>
        )}

        {/* ── PROCESSING & DONE ── */}
        {step === 'processing' && (
           <div className="flex-1 flex flex-col items-center justify-center gap-5 px-6 text-center">
             <Loader2 size={40} className="animate-spin text-forest-600" />
             <p className="font-display text-xl font-semibold">Creating your order…</p>
           </div>
        )}

        {step === 'done' && (
          <div className="flex-1 flex flex-col items-center justify-center gap-5 px-6 text-center">
            <CheckCircle size={48} className="text-forest-600" />
            <p className="font-display text-2xl font-bold">Order placed!</p>
            <button onClick={close} className="px-6 py-2.5 bg-forest-700 text-cream-50 text-sm rounded-lg">Continue Shopping</button>
          </div>
        )}
      </div>
    </>
  );
}