'use client';

import { useState } from 'react';
import { useAnimateOnScroll } from '@/lib/useAnimateOnScroll';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';

const contactInfo = [
  { icon: Mail,    label: 'Email',   value: 'info@gnaaponline.com',        sub: 'We respond within 24 hours' },
  { icon: Phone,   label: 'Phone',   value: '+233 (0) 123 456 789',        sub: 'Mon – Sat, 9AM – 5PM' },
  { icon: MapPin,  label: 'Office',  value: 'Accra, Ghana',                sub: 'Visit us at our secretariat' },
  { icon: Clock,   label: 'Hours',   value: 'Mon – Sat: 9AM – 5PM',       sub: 'Closed on public holidays' },
];

export default function ContactPage() {
  const [form, setForm]     = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent]     = useState(false);
  const [loading, setLoading] = useState(false);
  const ref = useAnimateOnScroll();

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    // Simulate API call — replace with real fetch() to your Node backend later
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1500);
  }

  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-20 hero-bg relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: `radial-gradient(circle, #C9983B 1.5px, transparent 1.5px)`, backgroundSize: '28px 28px' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="section-label text-gold-400 mb-5 block">Reach Out</span>
          <h1 className="font-display font-bold text-5xl sm:text-6xl text-white leading-tight">
            Get In <span className="text-gold-shimmer">Touch</span>
          </h1>
          <p className="font-body text-cream-300 text-lg mt-6 max-w-xl leading-relaxed">
            Whether you have a question about membership, a partnership inquiry, or just want
            to say hello — we would love to hear from you.
          </p>
        </div>
      </section>

      <section ref={ref} className="py-24 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* Left — Info cards */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="font-display font-bold text-3xl text-ink mb-8 animate-on-scroll">Contact Information</h2>
            {contactInfo.map(({ icon: Icon, label, value, sub }, i) => (
              <div key={label} className={`animate-on-scroll delay-${(i + 1) * 100} card-lift`}>
                <div className="bg-white rounded-2xl p-5 border border-cream-300 flex items-start gap-4 group hover:border-gold-300 transition-colors">
                  <div className="w-10 h-10 bg-forest-600 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-gold-500 transition-colors duration-300">
                    <Icon className="w-4.5 h-4.5 text-white" />
                  </div>
                  <div>
                    <p className="font-body text-xs font-semibold uppercase tracking-widest text-ink-muted mb-0.5">{label}</p>
                    <p className="font-display font-semibold text-ink text-base">{value}</p>
                    <p className="font-body text-xs text-ink-light mt-0.5">{sub}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Map placeholder */}
            <div className="animate-on-scroll delay-500 rounded-2xl overflow-hidden border border-cream-300 bg-forest-100 h-48 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-10 h-10 text-forest-400 mx-auto mb-2" />
                <p className="font-body text-sm text-forest-600 font-medium">Accra, Ghana</p>
                <p className="font-body text-xs text-ink-muted">Map coming soon</p>
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div className="lg:col-span-3 animate-on-scroll delay-200">
            <div className="bg-white rounded-3xl border border-cream-300 p-8 sm:p-10">
              {sent ? (
                <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-5">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-ink mb-2">Message Sent!</h3>
                  <p className="font-body text-ink-muted max-w-xs leading-relaxed">
                    Thank you for reaching out. Our team will get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
                    className="mt-6 px-6 py-2.5 bg-forest-600 text-white font-body font-semibold text-sm rounded-full hover:bg-forest-700 transition-colors"
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="font-display font-bold text-3xl text-ink mb-2">Send a Message</h2>
                  <p className="font-body text-ink-muted text-sm mb-8">Fill out the form and we'll be in touch shortly.</p>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block font-body text-xs font-semibold text-ink-soft mb-1.5 uppercase tracking-wide">Full Name *</label>
                        <input
                          name="name" value={form.name} onChange={handleChange} required
                          placeholder="Your full name"
                          className="w-full px-4 py-3 bg-cream-50 border border-cream-300 rounded-xl font-body text-sm text-ink placeholder:text-ink-light focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition"
                        />
                      </div>
                      <div>
                        <label className="block font-body text-xs font-semibold text-ink-soft mb-1.5 uppercase tracking-wide">Email Address *</label>
                        <input
                          name="email" value={form.email} onChange={handleChange} required type="email"
                          placeholder="your@email.com"
                          className="w-full px-4 py-3 bg-cream-50 border border-cream-300 rounded-xl font-body text-sm text-ink placeholder:text-ink-light focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block font-body text-xs font-semibold text-ink-soft mb-1.5 uppercase tracking-wide">Subject *</label>
                      <select
                        name="subject" value={form.subject} onChange={handleChange} required
                        className="w-full px-4 py-3 bg-cream-50 border border-cream-300 rounded-xl font-body text-sm text-ink focus:outline-none focus:ring-2 focus:ring-gold-400 transition"
                      >
                        <option value="">Select a subject…</option>
                        <option>Membership Enquiry</option>
                        <option>Partnership Proposal</option>
                        <option>Publication Support</option>
                        <option>Event Information</option>
                        <option>General Enquiry</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-body text-xs font-semibold text-ink-soft mb-1.5 uppercase tracking-wide">Message *</label>
                      <textarea
                        name="message" value={form.message} onChange={handleChange} required
                        rows={5} placeholder="Tell us how we can help…"
                        className="w-full px-4 py-3 bg-cream-50 border border-cream-300 rounded-xl font-body text-sm text-ink placeholder:text-ink-light focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="group inline-flex items-center gap-2 px-7 py-3.5 bg-gold-500 hover:bg-gold-600 disabled:opacity-70 text-white font-body font-semibold text-sm rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-gold-500/25 hover:-translate-y-0.5"
                    >
                      {loading ? 'Sending…' : (
                        <>Send Message <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" /></>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
