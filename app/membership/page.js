'use client';

import Link from 'next/link';
import { useAnimateOnScroll } from '@/lib/useAnimateOnScroll';
import { 
  Award, 
  Network, 
  FileText, 
  CheckCircle2, 
  Users, 
  Globe, 
  ShieldCheck,
  Download
} from 'lucide-react';

const membershipCards = [
  {
    icon: Award,
    title: 'Membership Benefits',
    description: 'GNAAP members benefit from strong representation on key publishing issues, both nationally and internationally.',
    link: '#benefits'
  },
  {
    icon: Network,
    title: 'Membership classifications',
    description: 'The Association of Membership has three types of membership: Corporate, Individual and Associate members.',
    link: '#classifications'
  },
  {
    icon: FileText,
    title: 'Membership Forms',
    description: 'You can fill any of the membership forms online easily.',
    link: '#forms'
  }
];

export default function MembershipPage() {
  const ref1 = useAnimateOnScroll();
  const ref2 = useAnimateOnScroll();
  const ref3 = useAnimateOnScroll();
  const ref4 = useAnimateOnScroll();

  return (
    <>
      {/* ── Page Hero ── */}
      <section className="pt-40 pb-20 hero-bg relative overflow-hidden text-white">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: `radial-gradient(circle, #C9983B 1.5px, transparent 1.5px)`, backgroundSize: '28px 28px' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="section-label text-gold-400 mb-5 block">Join the Association</span>
          <h1 className="font-display font-bold text-5xl sm:text-6xl leading-tight max-w-2xl">
            Membership <span className="text-gold-shimmer">Hub</span>
          </h1>
          <p className="font-body text-cream-300 text-lg mt-6 max-w-xl leading-relaxed">
            Discover the advantages of joining Ghana's premier network for authors and publishers.
          </p>
        </div>
      </section>

      {/* ── Main Navigation Cards (From image_3c2cbd.png) ── */}
      <section ref={ref1} className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {membershipCards.map((card, i) => (
              <div 
                key={card.title} 
                className={`flex flex-col items-center text-center p-10 rounded-[2.5rem] border-2 border-gold-500 bg-white shadow-sm transition-transform hover:-translate-y-2 animate-on-scroll delay-${(i + 1) * 100}`}
              >
                <div className="mb-8">
                  <card.icon className="w-20 h-20 text-ink stroke-[1.25]" />
                </div>
                <h3 className="font-display font-bold text-3xl text-gold-600 mb-6 leading-tight">
                  {card.title}
                </h3>
                <p className="font-body text-ink-muted text-lg leading-relaxed mb-10 min-h-[100px]">
                  {card.description}
                </p>
                <Link
                  href={card.link}
                  className="mt-auto px-8 py-3 bg-gold-500 hover:bg-gold-600 text-white font-body font-bold rounded-lg transition-colors text-lg"
                >
                  Read More
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Detailed Benefits Section ── */}
      <section ref={ref2} id="benefits" className="py-24 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="section-label mb-4 block animate-on-scroll">Why Join?</span>
              <h2 className="font-display font-bold text-4xl text-ink mb-8 animate-on-scroll delay-100">
                Member Advantages
              </h2>
              <div className="space-y-6">
                {[
                  { icon: Globe, t: 'National & International Representation', d: 'GNAAP provides a strong voice for members on key publishing policies at home and abroad.' },
                  { icon: Users, t: 'Vibrant Professional Network', d: 'Connect with a community of over 500 authors, researchers, and publishers across Ghana.' },
                  { icon: ShieldCheck, t: 'Copyright Advocacy', d: 'We advocate for the protection of your intellectual property and rights as a creator.' }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 animate-on-scroll">
                    <div className="w-12 h-12 bg-white rounded-xl border border-gold-300 flex items-center justify-center shrink-0">
                      <item.icon className="w-6 h-6 text-gold-600" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-xl text-ink">{item.t}</h4>
                      <p className="font-body text-ink-muted text-sm">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-forest-600 rounded-3xl p-12 text-white relative overflow-hidden">
               <h3 className="font-display font-bold text-3xl mb-6">Collective Impact</h3>
               <p className="font-body text-cream-200 mb-8">
                 By joining GNAAP, you become part of a unified body dedicated to preserving national 
                 culture through high-quality book development and literary excellence.
               </p>
               <ul className="space-y-4">
                 {['Access to Workshops', 'Listing in Member Directory', 'Policy Advocacy', 'Awards Eligibility'].map((text) => (
                   <li key={text} className="flex items-center gap-3">
                     <CheckCircle2 className="w-5 h-5 text-gold-400" />
                     <span className="font-body font-medium">{text}</span>
                   </li>
                 ))}
               </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Classifications Section ── */}
      <section ref={ref3} id="classifications" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="section-label justify-center mb-4 block">Classifications</span>
          <h2 className="font-display font-bold text-4xl text-ink mb-12">Types of Membership</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Corporate Members', desc: 'Established publishing houses and literary organisations operating in the industry.' },
              { title: 'Individual Members', desc: 'Authors, poets, playwrights, and independent creators producing original works.' },
              { title: 'Associate Members', desc: 'Students, researchers, and professionals associated with the literary community.' }
            ].map((type) => (
              <div key={type.title} className="p-8 rounded-2xl bg-cream-50 border border-cream-200 text-center card-lift">
                <h4 className="font-display font-bold text-2xl text-forest-700 mb-4">{type.title}</h4>
                <p className="font-body text-ink-muted leading-relaxed">{type.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Forms Section ── */}
      <section ref={ref4} id="forms" className="py-24 bg-forest-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display font-bold text-4xl mb-8">Ready to Apply?</h2>
          <p className="font-body text-cream-200 text-lg mb-10">
            Download our membership forms below or contact our secretariat for guidance on the application process.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <button className="flex items-center gap-3 px-10 py-4 bg-gold-500 hover:bg-gold-600 text-ink font-bold rounded-full transition-all shadow-lg">
              <Download className="w-5 h-5" />
              Download Application Form
            </button>
            <Link href="/contact" className="flex items-center gap-3 px-10 py-4 border-2 border-white/30 hover:bg-white hover:text-forest-700 font-bold rounded-full transition-all">
              Contact Secretariat
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}