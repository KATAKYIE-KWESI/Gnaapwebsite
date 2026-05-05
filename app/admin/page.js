'use client';

import { useState } from 'react';
import {
  LayoutDashboard, Newspaper, Users, BookOpen, ShoppingCart,
  Calendar, Mail, Bell, LogOut, Search, Plus, ChevronRight,
  Eye, Check, X, Edit, Trash2, Download, Menu, UserCheck,
  Send, MessageSquare, Rss, ShieldCheck, Star,
  Package, Filter, AlertCircle, BookMarked,
  Clock, MapPin, DollarSign, RefreshCw,
  Sparkles, Loader, Wand2, Bot,
} from 'lucide-react';

/* ─── ANTHROPIC API HELPER ──────────────────────────────── */
async function callClaude(systemPrompt, userPrompt, maxTokens = 1000) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: maxTokens,
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }],
    }),
  });
  if (!response.ok) throw new Error(`API error: ${response.status}`);
  const data = await response.json();
  return data.content?.[0]?.text || '';
}

/* ─── MOCK DATA ─────────────────────────────────────────── */
const STATS = [
  { label: 'Active Members',   value: 412,       delta: '+18 this month',     icon: Users,         color: 'gold'   },
  { label: 'Total Revenue',    value: '₵84,320', delta: '+₵6,200 this month', icon: DollarSign,    color: 'green'  },
  { label: 'Books in Store',   value: 138,       delta: '23 low stock',       icon: BookOpen,      color: 'amber'  },
  { label: 'Pending Orders',   value: 29,        delta: '7 new today',        icon: ShoppingCart,  color: 'red'    },
  { label: 'Upcoming Events',  value: 6,         delta: 'Next: Sat 10th',     icon: Calendar,      color: 'teal'   },
  { label: 'Unread Messages',  value: 14,        delta: '3 need reply',       icon: MessageSquare, color: 'purple' },
];

const ACTIVITY = [
  { time: '2 min ago',  text: 'New membership application from Abena Owusu',   type: 'membership' },
  { time: '14 min ago', text: 'Order #1089 paid — Kwame Asante (3 books)',      type: 'order'      },
  { time: '1 hr ago',   text: 'Article "Ama Ata Aidoo Legacy" published',       type: 'news'       },
  { time: '2 hr ago',   text: 'Membership approved for Kofi Mensah',            type: 'membership' },
  { time: '3 hr ago',   text: 'Event "Kumasi Book Fair 2025" created',          type: 'event'      },
  { time: '5 hr ago',   text: 'New subscriber: adjoa.amponsah@gmail.com',       type: 'newsletter' },
  { time: '1 day ago',  text: 'Reply sent to contact from Esi Turkson',         type: 'contact'    },
];

const ARTICLES = [
  { id:1, title:'Ama Ata Aidoo: A Literary Giant Legacy', category:'Feature',  status:'published', views:1240, date:'May 1, 2025' },
  { id:2, title:'GNAAP Annual Book Awards 2025 Winners',  category:'Event',    status:'published', views:984,  date:'Apr 28, 2025'},
  { id:3, title:'How to Self-Publish in Ghana: A Guide',  category:'Guide',    status:'draft',     views:0,    date:'May 3, 2025' },
  { id:4, title:'The Rise of Ghanaian YA Fiction',        category:'Analysis', status:'published', views:672,  date:'Apr 22, 2025'},
  { id:5, title:'Writing Workshop Accra — Full Report',   category:'Event',    status:'published', views:441,  date:'Apr 18, 2025'},
];

const MEMBERS = [
  { id:1, name:'Abena Owusu',  type:'Ordinary',  region:'Ashanti',       email:'abena@example.com', joined:'Mar 2024', status:'active'  },
  { id:2, name:'Kwame Asante', type:'Associate', region:'Greater Accra', email:'kwame@example.com', joined:'Jan 2025', status:'active'  },
  { id:3, name:'Esi Turkson',  type:'Patron',    region:'Western',       email:'esi@example.com',   joined:'Oct 2023', status:'active'  },
  { id:4, name:'Kofi Mensah',  type:'Ordinary',  region:'Volta',         email:'kofi@example.com',  joined:'Feb 2025', status:'active'  },
  { id:5, name:'Akua Boateng', type:'Associate', region:'Central',       email:'akua@example.com',  joined:'Dec 2024', status:'inactive'},
];

const APPLICATIONS = [
  { id:1, name:'Adjoa Amponsah', type:'Ordinary',  date:'May 5, 2025',  status:'pending',  docs:3 },
  { id:2, name:'Yaw Darko',      type:'Associate', date:'May 4, 2025',  status:'pending',  docs:2 },
  { id:3, name:'Nana Sarpong',   type:'Patron',    date:'Apr 30, 2025', status:'approved', docs:4 },
  { id:4, name:'Maame Frimpong', type:'Ordinary',  date:'Apr 28, 2025', status:'rejected', docs:1 },
];

const BOOKS = [
  { id:1, title:"The Kente Weaver's Son",  author:'Ama Darko',     category:'Fiction',     price:'₵45', stock:34, featured:true  },
  { id:2, title:'Echoes from Elmina',      author:'Kofi Awoonor',  category:'Poetry',      price:'₵30', stock:12, featured:false },
  { id:3, title:'Business in Ghana Today', author:'J.K. Mensah',   category:'Non-Fiction', price:'₵60', stock:2,  featured:false },
  { id:4, title:'Midnight at Labadi Beach',author:'Yaa Asantewaa', category:'Fiction',     price:'₵50', stock:20, featured:true  },
  { id:5, title:'Adinkra Symbols Decoded', author:'Nana Adjei',    category:'Reference',   price:'₵55', stock:0,  featured:false },
];

const ORDERS = [
  { id:'#1089', customer:'Kwame Asante',   items:3, total:'₵135', status:'paid',      date:'May 5, 2025'  },
  { id:'#1088', customer:'Esi Turkson',    items:1, total:'₵45',  status:'shipped',   date:'May 4, 2025'  },
  { id:'#1087', customer:'Abena Owusu',    items:2, total:'₵90',  status:'delivered', date:'May 2, 2025'  },
  { id:'#1086', customer:'Kojo Addo',      items:4, total:'₵200', status:'paid',      date:'May 1, 2025'  },
  { id:'#1085', customer:'Maame Frimpong', items:1, total:'₵60',  status:'cancelled', date:'Apr 30, 2025' },
];

const EVENTS = [
  { id:1, title:'Kumasi Book Fair 2025',        date:'May 10, 2025', location:'Kumasi City Mall',    type:'Fair',     registrations:184 },
  { id:2, title:'Authors Workshop — Accra',     date:'May 17, 2025', location:'Alisa Hotel, Accra',  type:'Workshop', registrations:42  },
  { id:3, title:'Creative Writing Masterclass', date:'Jun 1, 2025',  location:'Cape Coast University',type:'Class',    registrations:28  },
  { id:4, title:'GNAAP Annual Gala 2025',       date:'Jun 21, 2025', location:'Movenpick Hotel',     type:'Gala',     registrations:310 },
];

const MESSAGES = [
  { id:1, name:'Ama Bonsu',    email:'ama@example.com',   subject:'Membership enquiry',     body:'Hi, I am interested in joining GNAAP as an Ordinary member. Could you please let me know the requirements and fees?', date:'May 5',  read:false, replied:false },
  { id:2, name:'Kwesi Owusu',  email:'kwesi@example.com', subject:'Partnership proposal',   body:'I represent the Ghana Book Fair consortium and would like to explore a co-hosting partnership for the upcoming November fair.',  date:'May 4',  read:false, replied:false },
  { id:3, name:'Grace Tawiah', email:'grace@example.com', subject:'Book donation offer',    body:'Our school library is closing and we have about 200 books to donate. Interested in Ghanaian literature titles.',          date:'May 3',  read:true,  replied:true  },
  { id:4, name:'Samuel Darko', email:'sam@example.com',   subject:'Writing workshop query', body:'When is the next writing workshop in Accra? I missed the last one and would love to register early this time.',           date:'May 2',  read:true,  replied:false },
];

const SUBSCRIBERS = [
  { id:1, email:'abena.owusu@gmail.com',   joined:'May 1, 2025',  active:true  },
  { id:2, email:'kwame.asante@yahoo.com',  joined:'Apr 28, 2025', active:true  },
  { id:3, email:'esi.turkson@outlook.com', joined:'Apr 20, 2025', active:false },
  { id:4, email:'nana.boateng@gmail.com',  joined:'Apr 15, 2025', active:true  },
];

const ADMINS = [
  { id:1, name:'Super Admin',   email:'superadmin@gnaap.org', role:'superadmin', lastLogin:'Today, 9:42 AM'     },
  { id:2, name:'Ama Nyarko',    email:'ama@gnaap.org',        role:'admin',      lastLogin:'Today, 8:15 AM'     },
  { id:3, name:'Bright Asiedu', email:'bright@gnaap.org',     role:'admin',      lastLogin:'Yesterday, 4:30 PM' },
];

/* ─── COLOUR HELPERS ────────────────────────────────────── */
const statusColor = (s) => ({
  published:'bg-forest-100 text-forest-700', draft:'bg-cream-200 text-ink-muted',
  active:'bg-forest-100 text-forest-700', inactive:'bg-red-100 text-red-700',
  pending:'bg-gold-100 text-gold-700', approved:'bg-forest-100 text-forest-700',
  rejected:'bg-red-100 text-red-700', paid:'bg-forest-100 text-forest-700',
  shipped:'bg-blue-100 text-blue-700', delivered:'bg-forest-100 text-forest-700',
  cancelled:'bg-red-100 text-red-700', admin:'bg-forest-100 text-forest-700',
  superadmin:'bg-gold-100 text-gold-700', replied:'bg-blue-100 text-blue-700',
  fair:'bg-teal-100 text-teal-700', workshop:'bg-purple-100 text-purple-700',
  class:'bg-blue-100 text-blue-700', gala:'bg-gold-100 text-gold-700',
}[s] || 'bg-cream-200 text-ink-muted');

const activityIcon = (t) => ({
  membership:<UserCheck size={14}/>, order:<ShoppingCart size={14}/>,
  news:<Newspaper size={14}/>, event:<Calendar size={14}/>,
  newsletter:<Rss size={14}/>, contact:<Mail size={14}/>,
}[t] || <Bell size={14}/>);

const accentBg = (c) => ({
  gold:'bg-gold-100', green:'bg-forest-100', amber:'bg-amber-100',
  red:'bg-red-100', teal:'bg-teal-100', purple:'bg-purple-100',
}[c] || 'bg-cream-200');

const accentText = (c) => ({
  gold:'text-gold-700', green:'text-forest-700', amber:'text-amber-700',
  red:'text-red-700', teal:'text-teal-700', purple:'text-purple-700',
}[c] || 'text-ink-muted');

/* ─── REUSABLE UI ───────────────────────────────────────── */
function Badge({ status }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${statusColor(status)}`}>
      {status}
    </span>
  );
}

function SectionHeader({ title, subtitle, action, onAction }) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <h2 className="font-display text-2xl font-semibold text-forest-800">{title}</h2>
        {subtitle && <p className="text-sm text-ink-muted mt-0.5">{subtitle}</p>}
      </div>
      {action && (
        <button onClick={onAction}
          className="inline-flex items-center gap-2 px-4 py-2 bg-forest-700 hover:bg-forest-600 text-cream-50 text-sm font-medium rounded-lg transition-colors">
          <Plus size={15}/>{action}
        </button>
      )}
    </div>
  );
}

function SearchBar({ value, onChange, placeholder }) {
  return (
    <div className="relative mb-4">
      <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-light"/>
      <input value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder||'Search…'}
        className="w-full pl-9 pr-4 py-2 bg-cream-50 border border-cream-300 rounded-lg text-sm text-ink-DEFAULT placeholder:text-ink-light focus:outline-none focus:border-gold-500 transition-colors font-body"/>
    </div>
  );
}

function Toast({ msg, onClose }) {
  if (!msg) return null;
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-forest-800 text-cream-50 px-4 py-3 rounded-xl shadow-lg">
      <Check size={16} className="text-gold-400 flex-shrink-0"/>
      <span className="text-sm font-body">{msg}</span>
      <button onClick={onClose} className="text-ink-light hover:text-cream-50 ml-2"><X size={14}/></button>
    </div>
  );
}

function ConfirmModal({ msg, onConfirm, onCancel }) {
  if (!msg) return null;
  return (
    <div className="fixed inset-0 z-40 bg-forest-900/60 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full">
        <div className="flex items-start gap-3 mb-4">
          <AlertCircle size={22} className="text-red-500 flex-shrink-0 mt-0.5"/>
          <p className="text-ink-DEFAULT font-body text-sm leading-relaxed">{msg}</p>
        </div>
        <div className="flex gap-3 justify-end">
          <button onClick={onCancel} className="px-4 py-2 text-sm border border-cream-300 rounded-lg hover:bg-cream-50 transition-colors font-body">Cancel</button>
          <button onClick={onConfirm} className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-body">Delete</button>
        </div>
      </div>
    </div>
  );
}

function EmptyState({ icon: Icon, title, body, action, onAction }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-14 h-14 rounded-2xl bg-cream-100 flex items-center justify-center mb-4">
        <Icon size={24} className="text-ink-light"/>
      </div>
      <h3 className="font-display text-lg font-medium text-ink-DEFAULT mb-1">{title}</h3>
      <p className="text-sm text-ink-muted mb-4">{body}</p>
      {action && <button onClick={onAction} className="inline-flex items-center gap-2 px-4 py-2 bg-forest-700 text-cream-50 text-sm rounded-lg hover:bg-forest-600 transition-colors font-body"><Plus size={14}/>{action}</button>}
    </div>
  );
}

/* ─── AI BUTTON ─────────────────────────────────────────── */
function AIButton({ onClick, loading, label = 'Generate with AI', small = false }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`inline-flex items-center gap-2 ${small ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm'} bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium rounded-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed`}
    >
      {loading ? <Loader size={small ? 12 : 14} className="animate-spin"/> : <Sparkles size={small ? 12 : 14}/>}
      {loading ? 'Generating…' : label}
    </button>
  );
}

/* ─── AI ARTICLE WRITER MODAL ───────────────────────────── */
function ArticleWriterModal({ onClose, onSave, toast }) {
  const [title, setTitle]     = useState('');
  const [category, setCategory] = useState('Feature');
  const [brief, setBrief]     = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!title && !brief) { toast('Please enter a title or brief first'); return; }
    setLoading(true);
    try {
      const result = await callClaude(
        `You are a content writer for GNAAP (Ghana National Association of Authors and Publishers). 
Write engaging, culturally relevant articles about Ghanaian literature, authors, publishing, and the literary community. 
Use a warm, professional tone. Return only the article body text, no markdown headers.`,
        `Write a ${category} article for GNAAP's website.
Title: ${title || '(generate a suitable title)'}
Brief/Notes: ${brief || 'Write a compelling piece on this topic for Ghana literary community.'}
Length: approximately 400-500 words.`,
        900
      );
      setContent(result);
      if (!title) setTitle(`${category}: Generated Article`);
      toast('Article generated!');
    } catch (e) {
      toast('AI generation failed — check your connection');
    } finally {
      setLoading(false);
    }
  };

  const save = () => {
    if (!title || !content) { toast('Title and content required'); return; }
    onSave({ title, category, content });
    toast('Article saved as draft!');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-forest-900/70 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-cream-200">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-purple-100 flex items-center justify-center">
              <Wand2 size={14} className="text-purple-600"/>
            </div>
            <h3 className="font-display text-lg font-semibold text-forest-800">AI Article Writer</h3>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-cream-100 text-ink-muted transition-colors"><X size={16}/></button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-body font-medium text-ink-soft mb-1">Article Title</label>
              <input value={title} onChange={e=>setTitle(e.target.value)}
                placeholder="e.g. The Rise of Ghanaian Fantasy Fiction"
                className="w-full px-3 py-2 bg-cream-50 border border-cream-300 rounded-lg text-sm font-body focus:outline-none focus:border-purple-400 transition-colors"/>
            </div>
            <div>
              <label className="block text-xs font-body font-medium text-ink-soft mb-1">Category</label>
              <select value={category} onChange={e=>setCategory(e.target.value)}
                className="w-full px-3 py-2 bg-cream-50 border border-cream-300 rounded-lg text-sm font-body focus:outline-none focus:border-purple-400 transition-colors">
                {['Feature','Event','Guide','Analysis','Interview','Review'].map(c=>(
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-body font-medium text-ink-soft mb-1">Brief / Notes for AI</label>
            <textarea value={brief} onChange={e=>setBrief(e.target.value)} rows={2}
              placeholder="e.g. Cover the growing popularity of Akan-language fiction among young Ghanaian readers, mention key authors…"
              className="w-full px-3 py-2 bg-cream-50 border border-cream-300 rounded-lg text-sm font-body focus:outline-none focus:border-purple-400 transition-colors resize-none"/>
          </div>

          <div className="flex items-center justify-between">
            <label className="block text-xs font-body font-medium text-ink-soft">Generated Content</label>
            <AIButton onClick={generate} loading={loading} label="Generate Article"/>
          </div>

          <textarea value={content} onChange={e=>setContent(e.target.value)} rows={14}
            placeholder="AI-generated article will appear here. You can also write or edit directly…"
            className="w-full px-3 py-2 bg-cream-50 border border-cream-300 rounded-lg text-sm font-body focus:outline-none focus:border-forest-500 transition-colors resize-none leading-relaxed"/>
        </div>

        <div className="flex items-center justify-between px-6 py-4 border-t border-cream-200">
          <p className="text-xs font-body text-ink-muted">Powered by Claude AI — always review before publishing</p>
          <div className="flex gap-3">
            <button onClick={onClose} className="px-4 py-2 text-sm border border-cream-300 rounded-lg hover:bg-cream-50 transition-colors font-body">Cancel</button>
            <button onClick={save} className="px-4 py-2 text-sm bg-forest-700 text-cream-50 rounded-lg hover:bg-forest-600 transition-colors font-body">Save as Draft</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── AI REPLY MODAL ────────────────────────────────────── */
function AIReplyModal({ message, onClose, onSend, toast }) {
  const [reply, setReply] = useState('');
  const [tone, setTone]   = useState('Professional');
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    try {
      const result = await callClaude(
        `You are a customer service representative for GNAAP (Ghana National Association of Authors and Publishers), a professional literary organization in Ghana. 
Write helpful, warm, and professional email replies. Sign off as "GNAAP Secretariat". Return only the email body, no subject line.`,
        `Write a ${tone.toLowerCase()} reply to this message:
Sender: ${message.name} (${message.email})
Subject: ${message.subject}
Message: ${message.body}`,
        600
      );
      setReply(result);
      toast('Reply drafted!');
    } catch (e) {
      toast('AI generation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-forest-900/70 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-cream-200">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center">
              <Bot size={14} className="text-blue-600"/>
            </div>
            <h3 className="font-display text-lg font-semibold text-forest-800">AI Reply Composer</h3>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-cream-100 text-ink-muted"><X size={16}/></button>
        </div>

        <div className="p-6 space-y-4">
          {/* original message */}
          <div className="bg-cream-50 rounded-xl p-4 border border-cream-200">
            <p className="text-xs font-body font-medium text-ink-muted mb-1">Original message from {message.name}</p>
            <p className="text-xs font-body font-semibold text-ink-DEFAULT mb-1">{message.subject}</p>
            <p className="text-sm font-body text-ink-soft leading-relaxed">{message.body}</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1">
              <label className="block text-xs font-body font-medium text-ink-soft mb-1">Tone</label>
              <select value={tone} onChange={e=>setTone(e.target.value)}
                className="w-full px-3 py-2 bg-cream-50 border border-cream-300 rounded-lg text-sm font-body focus:outline-none focus:border-blue-400 transition-colors">
                {['Professional','Warm & Friendly','Formal','Concise'].map(t=><option key={t}>{t}</option>)}
              </select>
            </div>
            <div className="pt-5">
              <AIButton onClick={generate} loading={loading} label="Draft Reply"/>
            </div>
          </div>

          <div>
            <label className="block text-xs font-body font-medium text-ink-soft mb-1">Reply</label>
            <textarea value={reply} onChange={e=>setReply(e.target.value)} rows={8}
              placeholder="AI-generated reply will appear here. Edit as needed before sending…"
              className="w-full px-3 py-2 bg-cream-50 border border-cream-300 rounded-lg text-sm font-body focus:outline-none focus:border-forest-500 transition-colors resize-none leading-relaxed"/>
          </div>
        </div>

        <div className="flex items-center justify-between px-6 py-4 border-t border-cream-200">
          <p className="text-xs font-body text-ink-muted">Review before sending</p>
          <div className="flex gap-3">
            <button onClick={onClose} className="px-4 py-2 text-sm border border-cream-300 rounded-lg hover:bg-cream-50 font-body">Cancel</button>
            <button onClick={()=>{ if(reply){ onSend(message.id, reply); onClose(); }}}
              className="flex items-center gap-2 px-4 py-2 text-sm bg-forest-700 text-cream-50 rounded-lg hover:bg-forest-600 font-body">
              <Send size={13}/>Send Reply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── AI NEWSLETTER GENERATOR ───────────────────────────── */
function AINewsletterPanel({ subject, setSubject, body, setBody, toast, activeCount }) {
  const [topic, setTopic]   = useState('');
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    try {
      const result = await callClaude(
        `You are a newsletter writer for GNAAP (Ghana National Association of Authors and Publishers). 
Write engaging, community-focused newsletters for Ghanaian authors and book lovers. 
Include a warm greeting, main content, upcoming events or opportunities, and a closing call-to-action. 
Use a friendly yet professional tone. Return only the newsletter body text.`,
        `Write a GNAAP newsletter email for ${activeCount} subscribers.
${topic ? `Focus/Theme: ${topic}` : 'Cover general GNAAP news and community updates for May 2025.'}
${subject ? `Subject line is already set as: "${subject}"` : 'Also suggest a subject line at the very start, formatted as: Subject: [your subject line here]'}`,
        1000
      );

      if (!subject && result.startsWith('Subject:')) {
        const lines = result.split('\n');
        const subjectLine = lines[0].replace('Subject:', '').trim();
        setSubject(subjectLine);
        setBody(lines.slice(1).join('\n').trim());
      } else {
        setBody(result);
      }
      toast('Newsletter generated!');
    } catch (e) {
      toast('AI generation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 mb-4">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles size={14} className="text-purple-600"/>
        <p className="text-sm font-display font-semibold text-purple-800">AI Newsletter Generator</p>
      </div>
      <div className="flex gap-2">
        <input value={topic} onChange={e=>setTopic(e.target.value)}
          placeholder="Optional: focus topic or theme (e.g. 'Book Fair recap, new members spotlight')…"
          className="flex-1 px-3 py-2 bg-white border border-purple-200 rounded-lg text-sm font-body focus:outline-none focus:border-purple-400 transition-colors"/>
        <AIButton onClick={generate} loading={loading} label="Generate" small/>
      </div>
    </div>
  );
}

/* ─── AI DASHBOARD INSIGHTS ─────────────────────────────── */
function AIInsightsPanel({ toast }) {
  const [insight, setInsight] = useState('');
  const [loading, setLoading] = useState(false);

  const getInsights = async () => {
    setLoading(true);
    try {
      const result = await callClaude(
        `You are a business analyst for GNAAP (Ghana National Association of Authors and Publishers). 
Provide concise, actionable insights based on organizational data. Be specific and practical. 
Format as 3 short bullet points, each starting with an emoji and action verb.`,
        `Analyze this GNAAP data and provide 3 actionable insights:
- Active Members: 412 (+18 this month)
- Total Revenue: ₵84,320 (+₵6,200 this month)  
- Books in Store: 138 (23 low stock)
- Pending Orders: 29 (7 new today)
- Upcoming Events: 6 (next: Kumasi Book Fair May 10)
- Unread Messages: 14 (3 need reply)
- Pending Applications: 2
- Newsletter Subscribers: 4 (3 active)
- Monthly revenue trend: ₵45k → ₵62k → ₵38k → ₵71k → ₵84k`,
        400
      );
      setInsight(result);
    } catch (e) {
      toast('Could not load AI insights');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-cream-300 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-purple-100 flex items-center justify-center">
            <Bot size={14} className="text-purple-600"/>
          </div>
          <h3 className="font-display text-lg font-semibold text-forest-800">AI Insights</h3>
        </div>
        <AIButton onClick={getInsights} loading={loading} label="Analyse Data" small/>
      </div>

      {loading && (
        <div className="flex items-center gap-3 py-6 justify-center">
          <Loader size={18} className="animate-spin text-purple-500"/>
          <span className="text-sm font-body text-ink-muted">Analysing your data…</span>
        </div>
      )}

      {!loading && !insight && (
        <div className="flex flex-col items-center py-6 text-center">
          <Sparkles size={20} className="text-purple-300 mb-2"/>
          <p className="text-sm font-body text-ink-muted">Click "Analyse Data" to get AI-powered insights from your dashboard metrics.</p>
        </div>
      )}

      {!loading && insight && (
        <div className="space-y-2">
          {insight.split('\n').filter(l=>l.trim()).map((line, i) => (
            <div key={i} className="flex items-start gap-2 p-3 bg-cream-50 rounded-xl">
              <p className="text-sm font-body text-ink-DEFAULT leading-relaxed">{line}</p>
            </div>
          ))}
          <p className="text-xs font-body text-ink-muted pt-1">Powered by Claude AI</p>
        </div>
      )}
    </div>
  );
}

/* ─── SECTION VIEWS ─────────────────────────────────────── */
function Dashboard({ toast }) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {STATS.map((s,i)=>(
          <div key={i} className="bg-white rounded-2xl border border-cream-300 p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${accentBg(s.color)}`}>
              <s.icon size={20} className={accentText(s.color)}/>
            </div>
            <div className="min-w-0">
              <p className="text-2xl font-display font-bold text-forest-800">{s.value}</p>
              <p className="text-xs text-ink-muted font-body mt-0.5">{s.label}</p>
              <p className="text-xs text-gold-600 font-body mt-1">{s.delta}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-cream-300 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-lg font-semibold text-forest-800">Monthly Revenue</h3>
          <span className="text-xs text-ink-muted font-body">Jan – May 2025</span>
        </div>
        <div className="flex items-end gap-3 h-32">
          {[45,62,38,71,84].map((v,i)=>(
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-xs text-ink-muted font-body">₵{v}k</span>
              <div className="w-full bg-gold-400 rounded-t-md" style={{height:`${(v/84)*100}%`}}/>
              <span className="text-xs text-ink-light font-body">{['J','F','M','A','M'][i]}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-cream-300 p-6">
          <h3 className="font-display text-lg font-semibold text-forest-800 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {ACTIVITY.map((a,i)=>(
              <div key={i} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-forest-100 flex items-center justify-center flex-shrink-0 mt-0.5 text-forest-600">
                  {activityIcon(a.type)}
                </div>
                <div className="min-w-0">
                  <p className="text-sm text-ink-DEFAULT font-body leading-snug">{a.text}</p>
                  <p className="text-xs text-ink-light font-body mt-0.5">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <AIInsightsPanel toast={toast}/>

          <div className="bg-white rounded-2xl border border-cream-300 p-6">
            <p className="text-xs font-body text-ink-muted mb-2">System Status</p>
            <div className="space-y-2">
              {[['API Server','online'],['Database','online'],['Email Service','online'],['Paystack','online'],['Claude AI','online']].map(([k,v])=>(
                <div key={k} className="flex items-center justify-between">
                  <span className="text-xs font-body text-ink-soft">{k}</span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block"/>
                    <span className="text-xs font-body text-green-600">{v}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NewsSection({ toast }) {
  const [q, setQ]           = useState('');
  const [items, setItems]   = useState(ARTICLES);
  const [showWriter, setShowWriter] = useState(false);
  const filtered = items.filter(a=>a.title.toLowerCase().includes(q.toLowerCase()));

  const del = (id) => { setItems(p=>p.filter(a=>a.id!==id)); toast('Article deleted'); };
  const pub = (id) => { setItems(p=>p.map(a=>a.id===id?{...a,status:a.status==='published'?'draft':'published'}:a)); toast('Status updated'); };
  const saveArticle = (article) => {
    const newArticle = { id: Date.now(), ...article, status:'draft', views:0, date: new Date().toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'}) };
    setItems(p=>[newArticle, ...p]);
  };

  return (
    <div>
      {showWriter && <ArticleWriterModal onClose={()=>setShowWriter(false)} onSave={saveArticle} toast={toast}/>}
      <SectionHeader title="News & Articles" subtitle={`${items.length} articles`}/>

      <div className="flex items-center gap-3 mb-4">
        <SearchBar value={q} onChange={setQ} placeholder="Search articles…"/>
        <button onClick={()=>setShowWriter(true)}
          className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-sm font-medium rounded-lg transition-all h-[38px]">
          <Wand2 size={14}/>AI Writer
        </button>
        <button className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 bg-forest-700 hover:bg-forest-600 text-cream-50 text-sm font-medium rounded-lg transition-colors h-[38px]">
          <Plus size={15}/>New Article
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-cream-300 overflow-hidden">
        <table className="w-full text-sm font-body">
          <thead className="bg-cream-50 border-b border-cream-200">
            <tr>{['Title','Category','Status','Views','Date','Actions'].map(h=>(
              <th key={h} className="px-4 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wide">{h}</th>
            ))}</tr>
          </thead>
          <tbody className="divide-y divide-cream-100">
            {filtered.map(a=>(
              <tr key={a.id} className="hover:bg-cream-50 transition-colors">
                <td className="px-4 py-3 font-medium text-ink-DEFAULT max-w-xs truncate">{a.title}</td>
                <td className="px-4 py-3 text-ink-muted">{a.category}</td>
                <td className="px-4 py-3"><Badge status={a.status}/></td>
                <td className="px-4 py-3 text-ink-muted">{a.views.toLocaleString()}</td>
                <td className="px-4 py-3 text-ink-muted">{a.date}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button onClick={()=>pub(a.id)} className="text-xs px-2 py-1 rounded border border-cream-300 hover:bg-cream-50 text-ink-soft transition-colors">
                      {a.status==='published'?'Unpublish':'Publish'}
                    </button>
                    <button className="p-1 text-ink-light hover:text-forest-700 transition-colors"><Edit size={14}/></button>
                    <button onClick={()=>del(a.id)} className="p-1 text-ink-light hover:text-red-600 transition-colors"><Trash2 size={14}/></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length===0 && <EmptyState icon={Newspaper} title="No articles found" body="Try a different search."/>}
      </div>
    </div>
  );
}

function MembersSection({ toast }) {
  const [q, setQ] = useState('');
  const filtered = MEMBERS.filter(m=>m.name.toLowerCase().includes(q.toLowerCase())||m.email.includes(q));
  return (
    <div>
      <SectionHeader title="Members Directory" subtitle={`${MEMBERS.length} members`} action="Add Member"/>
      <div className="flex gap-3 mb-4">
        <SearchBar value={q} onChange={setQ} placeholder="Search by name or email…"/>
        <button className="flex items-center gap-2 px-3 py-2 border border-cream-300 rounded-lg text-sm text-ink-soft hover:bg-cream-50 transition-colors font-body h-[38px] flex-shrink-0">
          <Filter size={14}/>Filter
        </button>
        <button className="flex items-center gap-2 px-3 py-2 border border-cream-300 rounded-lg text-sm text-ink-soft hover:bg-cream-50 transition-colors font-body h-[38px] flex-shrink-0">
          <Download size={14}/>Export
        </button>
      </div>
      <div className="bg-white rounded-2xl border border-cream-300 overflow-hidden">
        <table className="w-full text-sm font-body">
          <thead className="bg-cream-50 border-b border-cream-200">
            <tr>{['Member','Type','Region','Joined','Status','Actions'].map(h=>(
              <th key={h} className="px-4 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wide">{h}</th>
            ))}</tr>
          </thead>
          <tbody className="divide-y divide-cream-100">
            {filtered.map(m=>(
              <tr key={m.id} className="hover:bg-cream-50 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gold-200 flex items-center justify-center text-xs font-bold text-gold-800">
                      {m.name.split(' ').map(n=>n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-medium text-ink-DEFAULT">{m.name}</p>
                      <p className="text-xs text-ink-muted">{m.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-ink-muted">{m.type}</td>
                <td className="px-4 py-3 text-ink-muted">{m.region}</td>
                <td className="px-4 py-3 text-ink-muted">{m.joined}</td>
                <td className="px-4 py-3"><Badge status={m.status}/></td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button className="p-1 text-ink-light hover:text-forest-700 transition-colors"><Eye size={14}/></button>
                    <button className="p-1 text-ink-light hover:text-forest-700 transition-colors"><Edit size={14}/></button>
                    <button className="p-1 text-ink-light hover:text-red-600 transition-colors"><Trash2 size={14}/></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ApplicationsSection({ toast }) {
  const [items, setItems] = useState(APPLICATIONS);
  const approve = (id) => { setItems(p=>p.map(a=>a.id===id?{...a,status:'approved'}:a)); toast('Application approved — payment link sent!'); };
  const reject  = (id) => { setItems(p=>p.map(a=>a.id===id?{...a,status:'rejected'}:a)); toast('Application rejected — applicant notified.'); };

  return (
    <div>
      <SectionHeader title="Membership Applications" subtitle="Review and approve applicants"/>
      <div className="flex gap-3 mb-4">
        {['all','pending','approved','rejected'].map(s=>(
          <button key={s} className="px-3 py-1.5 text-sm font-body rounded-lg border border-cream-300 hover:bg-cream-50 capitalize transition-colors">{s}</button>
        ))}
      </div>
      <div className="space-y-3">
        {items.map(a=>(
          <div key={a.id} className="bg-white rounded-2xl border border-cream-300 p-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-forest-100 flex items-center justify-center text-sm font-bold text-forest-700">
                {a.name.split(' ').map(n=>n[0]).join('')}
              </div>
              <div>
                <p className="font-medium text-ink-DEFAULT font-body">{a.name}</p>
                <div className="flex items-center gap-3 mt-0.5">
                  <span className="text-xs text-ink-muted font-body">{a.type} membership</span>
                  <span className="text-xs text-ink-muted font-body">Applied: {a.date}</span>
                  <span className="text-xs text-ink-muted font-body">{a.docs} documents</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge status={a.status}/>
              {a.status==='pending' && (
                <>
                  <button onClick={()=>approve(a.id)} className="flex items-center gap-1.5 px-3 py-1.5 bg-forest-700 text-cream-50 text-sm rounded-lg hover:bg-forest-600 transition-colors font-body">
                    <Check size={13}/>Approve
                  </button>
                  <button onClick={()=>reject(a.id)} className="flex items-center gap-1.5 px-3 py-1.5 border border-red-200 text-red-600 text-sm rounded-lg hover:bg-red-50 transition-colors font-body">
                    <X size={13}/>Reject
                  </button>
                </>
              )}
              <button className="p-1.5 text-ink-light hover:text-forest-700 transition-colors"><Eye size={15}/></button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 bg-gold-50 border border-gold-200 rounded-2xl p-5">
        <p className="text-sm font-display font-semibold text-gold-800 mb-2">Membership Payment Flow</p>
        <div className="flex items-center gap-2 flex-wrap">
          {['Apply','Review','Approve','Paystack Link Sent','Payment','Account Activated'].map((s,i,arr)=>(
            <div key={i} className="flex items-center gap-2">
              <span className="text-xs font-body text-gold-700 bg-gold-100 px-2 py-1 rounded-md">{s}</span>
              {i<arr.length-1 && <ChevronRight size={12} className="text-gold-500"/>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BooksSection({ toast }) {
  const [q, setQ] = useState('');
  const [items, setItems] = useState(BOOKS);
  const filtered = items.filter(b=>b.title.toLowerCase().includes(q.toLowerCase())||b.author.toLowerCase().includes(q.toLowerCase()));
  const del = (id) => { setItems(p=>p.filter(b=>b.id!==id)); toast('Book deleted'); };

  return (
    <div>
      <SectionHeader title="Book Store" subtitle={`${BOOKS.length} books`} action="Add Book"/>
      <SearchBar value={q} onChange={setQ} placeholder="Search by title or author…"/>
      <div className="bg-white rounded-2xl border border-cream-300 overflow-hidden">
        <table className="w-full text-sm font-body">
          <thead className="bg-cream-50 border-b border-cream-200">
            <tr>{['Book','Author','Category','Price','Stock','Featured','Actions'].map(h=>(
              <th key={h} className="px-4 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wide">{h}</th>
            ))}</tr>
          </thead>
          <tbody className="divide-y divide-cream-100">
            {filtered.map(b=>(
              <tr key={b.id} className="hover:bg-cream-50 transition-colors">
                <td className="px-4 py-3 font-medium text-ink-DEFAULT max-w-xs">{b.title}</td>
                <td className="px-4 py-3 text-ink-muted">{b.author}</td>
                <td className="px-4 py-3 text-ink-muted">{b.category}</td>
                <td className="px-4 py-3 font-medium text-forest-700">{b.price}</td>
                <td className="px-4 py-3">
                  <span className={`font-medium ${b.stock===0?'text-red-600':b.stock<=5?'text-amber-600':'text-ink-DEFAULT'}`}>
                    {b.stock===0?'Out of stock':b.stock}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {b.featured && <Star size={15} className="text-gold-500 fill-gold-500"/>}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button className="p-1 text-ink-light hover:text-forest-700 transition-colors"><Edit size={14}/></button>
                    <button onClick={()=>del(b.id)} className="p-1 text-ink-light hover:text-red-600 transition-colors"><Trash2 size={14}/></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function OrdersSection({ toast }) {
  const [items, setItems] = useState(ORDERS);
  const update = (id,status) => { setItems(p=>p.map(o=>o.id===id?{...o,status}:o)); toast(`Order ${id} marked as ${status}`); };

  return (
    <div>
      <SectionHeader title="Orders" subtitle={`${ORDERS.length} total orders`}/>
      <div className="flex gap-3 mb-4 flex-wrap">
        {['all','paid','shipped','delivered','cancelled'].map(s=>(
          <button key={s} className="px-3 py-1.5 text-sm font-body rounded-lg border border-cream-300 hover:bg-cream-50 capitalize transition-colors">{s}</button>
        ))}
        <button className="ml-auto flex items-center gap-2 px-3 py-1.5 text-sm font-body rounded-lg border border-cream-300 hover:bg-cream-50 transition-colors">
          <Download size={13}/>Export CSV
        </button>
      </div>
      <div className="space-y-3">
        {items.map(o=>(
          <div key={o.id} className="bg-white rounded-2xl border border-cream-300 p-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-9 h-9 rounded-xl bg-cream-100 flex items-center justify-center">
                <Package size={16} className="text-ink-muted"/>
              </div>
              <div>
                <p className="font-medium text-ink-DEFAULT font-body">{o.id} — {o.customer}</p>
                <div className="flex items-center gap-3 mt-0.5">
                  <span className="text-xs text-ink-muted font-body">{o.items} book{o.items>1?'s':''}</span>
                  <span className="text-xs font-medium text-forest-700 font-body">{o.total}</span>
                  <span className="text-xs text-ink-muted font-body">{o.date}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge status={o.status}/>
              {o.status==='paid' && (
                <button onClick={()=>update(o.id,'shipped')} className="text-xs px-3 py-1.5 bg-forest-700 text-cream-50 rounded-lg hover:bg-forest-600 transition-colors font-body">
                  Mark Shipped
                </button>
              )}
              {o.status==='shipped' && (
                <button onClick={()=>update(o.id,'delivered')} className="text-xs px-3 py-1.5 bg-forest-700 text-cream-50 rounded-lg hover:bg-forest-600 transition-colors font-body">
                  Mark Delivered
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EventsSection({ toast }) {
  const [items, setItems] = useState(EVENTS);
  const del = (id) => { setItems(p=>p.filter(e=>e.id!==id)); toast('Event deleted'); };

  return (
    <div>
      <SectionHeader title="Events" subtitle={`${EVENTS.length} upcoming events`} action="Create Event"/>
      <div className="grid gap-4">
        {items.map(e=>(
          <div key={e.id} className="bg-white rounded-2xl border border-cream-300 p-5 flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="text-center bg-gold-100 rounded-xl px-4 py-3 flex-shrink-0">
                <p className="text-xs font-body text-gold-700 uppercase tracking-wide">{e.date.split(' ')[0]}</p>
                <p className="text-2xl font-display font-bold text-gold-800">{e.date.split(' ')[1].replace(',','')}</p>
              </div>
              <div>
                <p className="font-display font-semibold text-forest-800 text-lg">{e.title}</p>
                <div className="flex items-center gap-4 mt-1 flex-wrap">
                  <span className="flex items-center gap-1 text-xs text-ink-muted font-body"><MapPin size={11}/>{e.location}</span>
                  <Badge status={e.type.toLowerCase()}/>
                  <span className="text-xs text-ink-muted font-body">{e.registrations} registered</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button className="p-1.5 text-ink-light hover:text-forest-700 transition-colors"><Edit size={15}/></button>
              <button onClick={()=>del(e.id)} className="p-1.5 text-ink-light hover:text-red-600 transition-colors"><Trash2 size={15}/></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactSection({ toast }) {
  const [items, setItems]       = useState(MESSAGES);
  const [replyTarget, setReplyTarget] = useState(null);

  const markRead  = (id) => { setItems(p=>p.map(m=>m.id===id?{...m,read:true}:m)); };
  const del       = (id) => { setItems(p=>p.filter(m=>m.id!==id)); toast('Message deleted'); };
  const sendReply = (id, _replyText) => {
    setItems(p=>p.map(m=>m.id===id?{...m,replied:true,read:true}:m));
    toast('Reply sent!');
  };

  return (
    <div>
      {replyTarget && (
        <AIReplyModal
          message={replyTarget}
          onClose={()=>setReplyTarget(null)}
          onSend={sendReply}
          toast={toast}
        />
      )}
      <SectionHeader title="Contact Messages" subtitle={`${items.filter(m=>!m.read).length} unread`}/>
      <div className="space-y-3">
        {items.map(m=>(
          <div key={m.id} className={`bg-white rounded-2xl border p-5 transition-all ${!m.read?'border-gold-300 bg-gold-50/30':'border-cream-300'}`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-forest-100 flex items-center justify-center text-xs font-bold text-forest-700 flex-shrink-0">
                  {m.name.split(' ').map(n=>n[0]).join('')}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-ink-DEFAULT font-body">{m.name}</p>
                    {!m.read && <span className="w-2 h-2 rounded-full bg-gold-500 inline-block"/>}
                    {m.replied && <Badge status="replied"/>}
                  </div>
                  <p className="text-xs text-ink-muted font-body">{m.email} · {m.date}</p>
                  <p className="text-sm text-ink-soft font-body mt-1">{m.subject}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {!m.read && <button onClick={()=>markRead(m.id)} className="text-xs px-2 py-1 border border-cream-300 rounded-lg hover:bg-cream-50 font-body transition-colors">Mark Read</button>}
                {!m.replied && (
                  <button onClick={()=>{ markRead(m.id); setReplyTarget(m); }}
                    className="text-xs px-2 py-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-body transition-colors flex items-center gap-1">
                    <Bot size={11}/>AI Reply
                  </button>
                )}
                <button onClick={()=>del(m.id)} className="p-1 text-ink-light hover:text-red-600 transition-colors"><Trash2 size={14}/></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function NewsletterSection({ toast }) {
  const [tab, setTab]       = useState('subscribers');
  const [subject, setSubject] = useState('');
  const [body, setBody]     = useState('');
  const activeCount = SUBSCRIBERS.filter(s=>s.active).length;

  return (
    <div>
      <SectionHeader title="Newsletter" subtitle={`${SUBSCRIBERS.length} subscribers`}/>
      <div className="flex gap-2 mb-5">
        {['subscribers','broadcast'].map(t=>(
          <button key={t} onClick={()=>setTab(t)}
            className={`px-4 py-2 text-sm font-body rounded-lg capitalize transition-colors ${tab===t?'bg-forest-700 text-cream-50':'border border-cream-300 hover:bg-cream-50'}`}>
            {t}
          </button>
        ))}
      </div>

      {tab==='subscribers' ? (
        <div className="bg-white rounded-2xl border border-cream-300 overflow-hidden">
          <table className="w-full text-sm font-body">
            <thead className="bg-cream-50 border-b border-cream-200">
              <tr>{['Email','Joined','Status','Actions'].map(h=>(
                <th key={h} className="px-4 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wide">{h}</th>
              ))}</tr>
            </thead>
            <tbody className="divide-y divide-cream-100">
              {SUBSCRIBERS.map(s=>(
                <tr key={s.id} className="hover:bg-cream-50 transition-colors">
                  <td className="px-4 py-3 text-ink-DEFAULT">{s.email}</td>
                  <td className="px-4 py-3 text-ink-muted">{s.joined}</td>
                  <td className="px-4 py-3"><Badge status={s.active?'active':'inactive'}/></td>
                  <td className="px-4 py-3">
                    <button className="p-1 text-ink-light hover:text-red-600 transition-colors"><Trash2 size={14}/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="space-y-4">
          <AINewsletterPanel
            subject={subject} setSubject={setSubject}
            body={body} setBody={setBody}
            toast={toast} activeCount={activeCount}
          />

          <div className="bg-white rounded-2xl border border-cream-300 p-6 space-y-4">
            <p className="text-sm font-body text-ink-muted">Sending to <strong className="text-ink-DEFAULT">{activeCount} active subscribers</strong></p>
            <div>
              <label className="block text-sm font-body text-ink-soft mb-1">Subject</label>
              <input value={subject} onChange={e=>setSubject(e.target.value)} placeholder="e.g. GNAAP Newsletter — May 2025"
                className="w-full px-4 py-2.5 bg-cream-50 border border-cream-300 rounded-lg text-sm font-body focus:outline-none focus:border-gold-500 transition-colors"/>
            </div>
            <div>
              <label className="block text-sm font-body text-ink-soft mb-1">Message</label>
              <textarea value={body} onChange={e=>setBody(e.target.value)} rows={8}
                placeholder="Write your newsletter content or use the AI generator above…"
                className="w-full px-4 py-2.5 bg-cream-50 border border-cream-300 rounded-lg text-sm font-body focus:outline-none focus:border-gold-500 transition-colors resize-none leading-relaxed"/>
            </div>
            <div className="flex items-center justify-between pt-2">
              <p className="text-xs font-body text-ink-muted">Review AI-generated content before sending</p>
              <button onClick={()=>{ if(subject&&body){ toast(`Newsletter sent to ${activeCount} subscribers!`); setSubject(''); setBody(''); }}}
                className="flex items-center gap-2 px-5 py-2.5 bg-forest-700 text-cream-50 text-sm font-body rounded-lg hover:bg-forest-600 transition-colors">
                <Send size={14}/>Send Newsletter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function AdminsSection({ toast }) {
  return (
    <div>
      <SectionHeader title="Admin Accounts" subtitle="Superadmin access required" action="Create Admin"/>
      <div className="space-y-3">
        {ADMINS.map(a=>(
          <div key={a.id} className="bg-white rounded-2xl border border-cream-300 p-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-forest-700 flex items-center justify-center text-sm font-bold text-cream-50">
                {a.name.split(' ').map(n=>n[0]).join('').slice(0,2)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium text-ink-DEFAULT font-body">{a.name}</p>
                  <Badge status={a.role}/>
                </div>
                <div className="flex items-center gap-3 mt-0.5">
                  <span className="text-xs text-ink-muted font-body">{a.email}</span>
                  <span className="flex items-center gap-1 text-xs text-ink-muted font-body"><Clock size={11}/>Last: {a.lastLogin}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-1.5 text-ink-light hover:text-forest-700 transition-colors"><Edit size={15}/></button>
              {a.role!=='superadmin' && <button onClick={()=>toast('Admin account deleted')} className="p-1.5 text-ink-light hover:text-red-600 transition-colors"><Trash2 size={15}/></button>}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 bg-forest-50 border border-forest-200 rounded-2xl p-5">
        <p className="text-sm font-display font-semibold text-forest-800 mb-1 flex items-center gap-2"><ShieldCheck size={16}/>Security Note</p>
        <p className="text-xs font-body text-forest-700">Only superadmins can create or delete admin accounts. All admin actions are logged. Use strong, unique passwords and enable 2FA.</p>
      </div>
    </div>
  );
}

/* ─── NAV CONFIG ────────────────────────────────────────── */
const NAV = [
  { id:'dashboard',    label:'Dashboard',    icon:LayoutDashboard },
  { id:'news',         label:'News',          icon:Newspaper       },
  { id:'members',      label:'Members',       icon:Users           },
  { id:'applications', label:'Applications',  icon:UserCheck       },
  { id:'books',        label:'Books',         icon:BookOpen        },
  { id:'orders',       label:'Orders',        icon:ShoppingCart    },
  { id:'events',       label:'Events',        icon:Calendar        },
  { id:'contact',      label:'Contact',       icon:Mail            },
  { id:'newsletter',   label:'Newsletter',    icon:Rss             },
  { id:'admins',       label:'Admins',        icon:ShieldCheck     },
];

/* ─── ROOT COMPONENT ────────────────────────────────────── */
export default function AdminPage() {
  const [section,     setSection]     = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [globalQ,     setGlobalQ]     = useState('');
  const [toastMsg,    setToastMsg]    = useState('');
  const [confirm,     setConfirm]     = useState(null);

  const toast = (msg) => { setToastMsg(msg); setTimeout(()=>setToastMsg(''), 3500); };

  const SECTION_VIEWS = {
    dashboard:    <Dashboard toast={toast}/>,
    news:         <NewsSection toast={toast}/>,
    members:      <MembersSection toast={toast}/>,
    applications: <ApplicationsSection toast={toast}/>,
    books:        <BooksSection toast={toast}/>,
    orders:       <OrdersSection toast={toast}/>,
    events:       <EventsSection toast={toast}/>,
    contact:      <ContactSection toast={toast}/>,
    newsletter:   <NewsletterSection toast={toast}/>,
    admins:       <AdminsSection toast={toast}/>,
  };

  return (
    <div className="flex h-screen bg-cream-100 font-body overflow-hidden">

      {/* SIDEBAR */}
      <aside className={`flex-shrink-0 flex flex-col bg-forest-900 text-cream-200 transition-all duration-300 ${sidebarOpen?'w-60':'w-16'} overflow-hidden`}>
        <div className="flex items-center gap-3 px-4 py-5 border-b border-forest-700">
          <div className="w-8 h-8 rounded-lg bg-gold-500 flex items-center justify-center flex-shrink-0">
            <BookMarked size={16} className="text-forest-900"/>
          </div>
          {sidebarOpen && (
            <div className="min-w-0">
              <p className="font-display text-sm font-bold text-cream-50 leading-tight">GNAAP</p>
              <p className="text-xs text-cream-400 truncate">Admin Panel</p>
            </div>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto py-3 space-y-0.5 px-2">
          {NAV.map(n=>(
            <button key={n.id} onClick={()=>setSection(n.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                section===n.id
                  ? 'bg-gold-500 text-forest-900 font-medium'
                  : 'text-cream-400 hover:bg-forest-700 hover:text-cream-100'
              }`}>
              <n.icon size={17} className="flex-shrink-0"/>
              {sidebarOpen && <span className="truncate">{n.label}</span>}
            </button>
          ))}
        </nav>

        {/* AI badge in sidebar */}
        {sidebarOpen && (
          <div className="mx-3 mb-2 px-3 py-2 rounded-xl bg-purple-900/40 border border-purple-700/30">
            <div className="flex items-center gap-2">
              <Sparkles size={12} className="text-purple-400"/>
              <p className="text-xs font-body text-purple-300">Claude AI integrated</p>
            </div>
          </div>
        )}

        <div className="p-3 border-t border-forest-700 space-y-1">
          <div className={`flex items-center gap-3 px-3 py-2 ${sidebarOpen?'':'justify-center'}`}>
            <div className="w-7 h-7 rounded-full bg-gold-500 flex items-center justify-center text-xs font-bold text-forest-900 flex-shrink-0">SA</div>
            {sidebarOpen && (
              <div className="min-w-0">
                <p className="text-xs font-medium text-cream-100 truncate">Super Admin</p>
                <p className="text-xs text-cream-500 truncate">superadmin@gnaap.org</p>
              </div>
            )}
          </div>
          <button className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-cream-500 hover:text-cream-200 hover:bg-forest-700 transition-all ${sidebarOpen?'':'justify-center'}`}>
            <LogOut size={15} className="flex-shrink-0"/>
            {sidebarOpen && 'Sign Out'}
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="flex items-center gap-4 px-6 py-3.5 bg-white border-b border-cream-200 flex-shrink-0">
          <button onClick={()=>setSidebarOpen(p=>!p)} className="p-1.5 rounded-lg hover:bg-cream-100 text-ink-muted transition-colors">
            <Menu size={18}/>
          </button>
          <div className="relative flex-1 max-w-md">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-light"/>
            <input value={globalQ} onChange={e=>setGlobalQ(e.target.value)} placeholder="Search anything…"
              className="w-full pl-9 pr-4 py-2 bg-cream-50 border border-cream-200 rounded-xl text-sm font-body focus:outline-none focus:border-gold-400 transition-colors"/>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-50 border border-purple-200">
              <Sparkles size={12} className="text-purple-500"/>
              <span className="text-xs font-body text-purple-600 font-medium">AI Active</span>
            </div>
            <button className="relative p-2 rounded-xl hover:bg-cream-100 text-ink-muted transition-colors">
              <Bell size={17}/>
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500"/>
            </button>
            <button className="p-2 rounded-xl hover:bg-cream-100 text-ink-muted transition-colors">
              <RefreshCw size={17}/>
            </button>
          </div>
        </header>

        <div className="flex items-center gap-2 px-6 py-2.5 bg-cream-50 border-b border-cream-200 text-xs font-body text-ink-muted flex-shrink-0">
          <span>Admin</span>
          <ChevronRight size={12}/>
          <span className="capitalize text-ink-DEFAULT font-medium">{section}</span>
        </div>

        <main className="flex-1 overflow-y-auto p-6">
          {SECTION_VIEWS[section]}
        </main>
      </div>

      <Toast msg={toastMsg} onClose={()=>setToastMsg('')}/>
      <ConfirmModal msg={confirm?.msg} onConfirm={()=>{ confirm?.fn(); setConfirm(null); }} onCancel={()=>setConfirm(null)}/>
    </div>
  );
}