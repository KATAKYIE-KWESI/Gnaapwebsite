'use client';

import { useState } from 'react';
import { useAnimateOnScroll } from '@/lib/useAnimateOnScroll';
import { 
  Target, 
  Eye, 
  Heart, 
  CheckCircle2, 
  Users, 
  ShieldCheck, 
  Landmark 
} from 'lucide-react';

const objectives = [
  'Promote the creation of culturally relevant, values-driven literary works',
  'Advocate for the rights and welfare of authors and publishers across Ghana',
  'Facilitate workshops, training programmes, and publication support',
  'Advance literacy and reading culture from early childhood to adulthood',
  'Collaborate with government, schools, and international literary bodies',
  'Recognise and celebrate excellence in Ghanaian literature and publishing',
  'Build bridges between Ghanaian authors and global publishing markets',
  'Support self-publishing and digital publishing innovations',
];

const leadershipData = {
  executives: [
    { name: 'John Akwasi Amponsah',    role: 'National President', initials: 'JAA' },
    { name: 'James Offeh',   role: 'National Secretary',   initials: 'JO' },
    { name: 'Dent Augustine Theophilus',    role: 'National Treasurer', initials: 'DT' },
    { name: 'Doris Eshung', role: 'Deputy National Treasurer',   initials: 'DE' },
  ],
  council: [
    { name: 'Mr Henric Atta Baah Yeboah',   role: 'Best Brain Publishers', initials: 'HABY' },
    { name: 'Mr Joseph Boison',   role: 'Boison Publication Limited', initials: 'JB' },
    { name: 'Philp Sarpong', role: 'Perfect Grade Publications and Stationery-CEO',initials: 'PS' },
    { name: 'Mr Benjamin Appiah Francis',    role: 'Excellence Publication', initials: 'BAF' },
    { name: 'Mr John Kwaku Damba', role: 'Orion Sirus Limited', initials: 'JKD' },
    { name: 'Mr Alexander Okeyere Baafi', role: 'New Golden Publication', initials: 'AOB' },
    { name: 'Dr Matthew Esuman', role: 'KNUST', initials: 'ME' },
  ],
  leadership: [
    { name: 'John Akwasi Amponsah',    role: 'National President',       initials: 'JAA' },
    { name: 'Saint Godson Kwasi Baah',       role: 'National Vice President',            initials: 'SGKB' },
    { name: 'James Ford Offeh',     role: 'National Secretary',   initials: 'JFO' },
    { name: 'Theophilus Dent Augustine',  role: 'National Treasurer', initials: 'TDA' },
    { name: 'Doris Eshung',   role: ' Deputy National Treasurer',    initials: 'DE' },
    { name: 'Dr. Saeed Adam',       role: 'National Organizer', initials: 'SA' },
  ]
};

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState('executives');
  
  const ref1 = useAnimateOnScroll();
  const ref2 = useAnimateOnScroll();
  const ref3 = useAnimateOnScroll();
  const ref4 = useAnimateOnScroll();

  return (
    <>
      {/* ── Page Hero ── */}
      <section className="pt-40 pb-20 hero-bg relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: `radial-gradient(circle, #C9983B 1.5px, transparent 1.5px)`, backgroundSize: '28px 28px' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="section-label text-gold-400 mb-5 block">Who We Are</span>
          <h1 className="font-display font-bold text-5xl sm:text-6xl text-white leading-tight max-w-2xl">
            About <span className="text-gold-shimmer">GNAAP</span>
          </h1>
          <p className="font-body text-cream-300 text-lg mt-6 max-w-xl leading-relaxed">
            The Ghana National Authors & Publishers Association — Ghana's foremost professional
            body for literary professionals, serving our members and society since our founding.
          </p>
        </div>
      </section>

      {/* ── Brief History & Vision ── */}
      <section ref={ref1} className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <span className="section-label mb-5 block animate-on-scroll">Our History</span>
            <h2 className="font-display font-bold text-4xl text-ink leading-tight mb-6 animate-on-scroll delay-100">
              A Legacy of Ghanaian Literary Excellence
            </h2>
            <div className="space-y-4 font-body text-ink-muted leading-relaxed animate-on-scroll delay-200">
              <p>
               The Ghana National Association of Authors and Publishers is a trade association
               registered under the Registrar General of Ghana with Registration number CG061340922.
              </p>
              <p>
                The Association is established to bring together right holders of literary works in particular and books in general in General and in the diaspora to promote the interest of authors and publishers in Ghana and in the diaspora, preserve national culture through book development, create a common voice for authors and publishers, partner local and international institutions to promote the works of members, motivate and drive excellence in the book industry through ongoing professional development and award schemes, attend conferences and share industry based insights and tit bits among members, partner state and private institution to promote literacy and reading, foster solidarity among members among several other aims.
              </p>
              <p>
                The Association which started with only six members now boasts of over eighty members of right holders across Ghana, including poets, playwrights, researchers, and professors.
              </p>
            </div>
          </div>

          <div className="space-y-6 animate-on-scroll delay-200">
            {[
              { icon: Eye, label: 'Vision', color: 'bg-forest-600', text: 'To be a leading literary association in Africa and the world.' },
              { icon: Target, label: 'Mission', color: 'bg-gold-500', text: 'To create and promote culturally relevant, value-driven books that build skills and transform attitudes.' },
              { icon: Heart, label: 'Core Values', color: 'bg-forest-700', text: 'Excellence · Integrity · Inclusivity · Cultural Pride · Innovation · Collaboration' },
            ].map(({ icon: Icon, label, color, text }) => (
              <div key={label} className="flex gap-5 bg-cream-50 rounded-2xl p-6 border border-cream-300 card-lift">
                <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center shrink-0 mt-0.5`}>
                  <Icon className="w-4.5 h-4.5 text-white" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg text-ink mb-1">{label}</h3>
                  <p className="font-body text-sm text-ink-muted leading-relaxed">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Objectives ── */}
      <section ref={ref2} id="objectives" className="py-24 bg-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mb-14">
            <span className="section-label mb-4 block animate-on-scroll">What We Do</span>
            <h2 className="font-display font-bold text-4xl sm:text-5xl text-ink animate-on-scroll delay-100">Our Objectives</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-on-scroll delay-200">
            {objectives.map((obj) => (
              <div key={obj} className="flex items-start gap-3 bg-white rounded-xl p-5 border border-cream-300 card-lift">
                <CheckCircle2 className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
                <p className="font-body text-sm text-ink-soft leading-relaxed">{obj}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Leadership Tabs ── */}
      <section ref={ref3} id="leadership" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="section-label mb-4 block animate-on-scroll">Governance</span>
            <h2 className="font-display font-bold text-4xl sm:text-5xl text-ink animate-on-scroll delay-100">Leadership Structure</h2>
            
            {/* Tab Controls */}
            <div className="flex flex-wrap justify-center gap-2 mt-10">
              {[
                { id: 'council', label: 'Council Members', icon: Landmark },
                { id: 'executives', label: 'National Executives', icon: ShieldCheck },
                { id: 'leadership', label: 'Leadership', icon: Users },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                    activeTab === tab.id 
                    ? 'bg-gold-500 text-white shadow-lg shadow-gold-500/30' 
                    : 'bg-cream-100 text-ink-soft hover:bg-cream-200'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Leadership Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[300px]">
            {leadershipData[activeTab].map(({ name, role, initials }, i) => (
              <div 
                key={`${activeTab}-${name}`} 
                className="animate-on-scroll card-lift opacity-0"
                style={{ animation: `fadeInUp 0.5s ease forwards ${i * 0.1}s` }}
              >
                <div className="bg-cream-50 rounded-2xl p-7 border border-cream-300 flex items-center gap-5 group hover:border-gold-300 transition-colors h-full">
                  <div className="w-14 h-14 bg-forest-600 rounded-full flex items-center justify-center shrink-0 group-hover:bg-gold-500 transition-colors duration-300 shadow-inner">
                    <span className="font-display font-bold text-white text-lg">{initials}</span>
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-ink text-lg leading-snug">{name}</h3>
                    <p className="font-body text-xs text-gold-600 font-semibold tracking-wide uppercase mt-1">{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stakeholders ── */}
      <section ref={ref4} id="stakeholders" className="py-24 bg-forest-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="section-label text-gold-400 mb-5 block justify-center">Partners</span>
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-white mb-6">Our Stakeholders</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-12">
            {[
              'Ghana Education Service',
              'Ministry of Information',
              'Ghana Library Authority',
              'National Commission on Culture',
              'Ghana Book Trust',
              'African Publishers Network',
            ].map((org) => (
              <div key={org} className="bg-white/10 border border-white/10 rounded-xl p-4 hover:bg-white/20 transition-colors">
                <Users className="w-5 h-5 text-gold-400 mx-auto mb-3" />
                <p className="font-body text-xs text-cream-300 text-center leading-tight">{org}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom styles for the tab animations */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}