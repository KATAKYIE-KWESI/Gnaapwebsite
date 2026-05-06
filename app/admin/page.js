'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  LayoutDashboard, Newspaper, Users, BookOpen, ShoppingCart,
  Calendar, Mail, Bell, LogOut, Search, Plus, ChevronRight,
  Eye, Check, X, Edit, Trash2, Download, Menu, UserCheck,
  Send, MessageSquare, Rss, ShieldCheck, Star, Package,
  AlertCircle, BookMarked, Clock, MapPin, DollarSign,
  RefreshCw, Loader, ImageIcon, Filter, FileText,
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════════
   API CLIENT
═══════════════════════════════════════════════════════════ */
const BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

function getToken() {
  if (typeof window === 'undefined') return '';
  const KEYS = ['adminToken','token','authToken','gnaap_admin_token','accessToken'];
  for (const k of KEYS) { const v = localStorage.getItem(k); if (v) return v; }
  for (let i = 0; i < localStorage.length; i++) {
    const v = localStorage.getItem(localStorage.key(i));
    if (v?.startsWith('ey')) return v;
  }
  return '';
}

async function apiFetch(method, path, body = null, isForm = false) {
  const token = getToken();
  const headers = { ...(token ? { Authorization: `Bearer ${token}` } : {}) };
  if (!isForm) headers['Content-Type'] = 'application/json';
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    ...(body ? { body: isForm ? body : JSON.stringify(body) } : {}),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || `Error ${res.status}`);
  return data;
}

const GET   = (p)       => apiFetch('GET',    p);
const POST  = (p, b, f) => apiFetch('POST',   p, b, f);
const PATCH = (p, b, f) => apiFetch('PATCH',  p, b, f);
const DEL   = (p)       => apiFetch('DELETE', p);

/* ═══════════════════════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════════════════════ */
const fmtDate  = (d) => d ? new Date(d).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' }) : '—';
const initials = (n = '') => n.split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase();
const id       = (x) => x?._id || x?.id || '';

const STATUS_COLORS = {
  published:'bg-forest-100 text-forest-700', draft:'bg-cream-200 text-ink-muted',
  active:'bg-forest-100 text-forest-700',    inactive:'bg-red-100 text-red-700',
  pending:'bg-gold-100 text-gold-700',        approved:'bg-forest-100 text-forest-700',
  rejected:'bg-red-100 text-red-700',         paid:'bg-forest-100 text-forest-700',
  shipped:'bg-blue-100 text-blue-700',        delivered:'bg-forest-100 text-forest-700',
  cancelled:'bg-red-100 text-red-700',        superadmin:'bg-gold-100 text-gold-700',
  admin:'bg-forest-100 text-forest-700',      replied:'bg-blue-100 text-blue-700',
  fair:'bg-teal-100 text-teal-700',           workshop:'bg-purple-100 text-purple-700',
  gala:'bg-gold-100 text-gold-700',           class:'bg-blue-100 text-blue-700',
};
const statusCls = (s) => STATUS_COLORS[s] || 'bg-cream-200 text-ink-muted';

const ACCENT = {
  bg:   { gold:'bg-gold-100', green:'bg-forest-100', amber:'bg-amber-100', red:'bg-red-100', teal:'bg-teal-100', purple:'bg-purple-100' },
  text: { gold:'text-gold-700', green:'text-forest-700', amber:'text-amber-700', red:'text-red-700', teal:'text-teal-700', purple:'text-purple-700' },
};

/* ═══════════════════════════════════════════════════════════
   BASE UI COMPONENTS
═══════════════════════════════════════════════════════════ */
const Badge = ({ status }) => (
  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${statusCls(status)}`}>{status}</span>
);

const Spin = ({ size = 18, cls = '' }) => (
  <Loader size={size} className={`animate-spin text-gold-500 ${cls}`}/>
);

function PageLoader() {
  return (
    <div className="flex items-center justify-center py-24">
      <Spin size={26} cls="text-forest-400"/>
    </div>
  );
}

function Err({ msg, onRetry }) {
  if (!msg) return null;
  return (
    <div className="flex items-center justify-between gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-4">
      <div className="flex items-center gap-2 text-red-700 text-sm font-body"><AlertCircle size={14}/>{msg}</div>
      {onRetry && <button onClick={onRetry} className="text-xs underline text-red-600 font-body">Retry</button>}
    </div>
  );
}

function Toast({ msg, onClose }) {
  if (!msg) return null;
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-forest-800 text-cream-50 px-4 py-3 rounded-xl shadow-xl">
      <Check size={15} className="text-gold-400 flex-shrink-0"/>
      <span className="text-sm font-body">{msg}</span>
      <button onClick={onClose}><X size={13} className="text-cream-400 hover:text-cream-100 transition-colors"/></button>
    </div>
  );
}

function ConfirmModal({ msg, onConfirm, onCancel }) {
  if (!msg) return null;
  return (
    <div className="fixed inset-0 z-40 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full">
        <div className="flex items-start gap-3 mb-5">
          <AlertCircle size={20} className="text-red-500 flex-shrink-0 mt-0.5"/>
          <p className="text-ink-DEFAULT font-body text-sm leading-relaxed">{msg}</p>
        </div>
        <div className="flex gap-3 justify-end">
          <button onClick={onCancel} className="px-4 py-2 text-sm border border-cream-300 rounded-lg hover:bg-cream-50 font-body transition-colors">Cancel</button>
          <button onClick={onConfirm} className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 font-body transition-colors">Confirm</button>
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ title, subtitle, action, onAction }) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <h2 className="font-display text-2xl font-semibold text-forest-800">{title}</h2>
        {subtitle && <p className="text-sm text-ink-muted mt-0.5 font-body">{subtitle}</p>}
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
      <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-light"/>
      <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder || 'Search…'}
        className="w-full pl-9 pr-4 py-2 bg-cream-50 border border-cream-300 rounded-lg text-sm font-body focus:outline-none focus:border-gold-500 transition-colors"/>
    </div>
  );
}

function EmptyState({ icon: Icon, title, body, action, onAction }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-14 h-14 rounded-2xl bg-cream-100 flex items-center justify-center mb-4">
        <Icon size={22} className="text-ink-light"/>
      </div>
      <p className="font-display text-base font-medium text-ink-DEFAULT mb-1">{title}</p>
      <p className="text-sm text-ink-muted font-body mb-4">{body}</p>
      {action && <button onClick={onAction} className="inline-flex items-center gap-2 px-4 py-2 bg-forest-700 text-cream-50 text-sm rounded-lg hover:bg-forest-600 font-body transition-colors"><Plus size={13}/>{action}</button>}
    </div>
  );
}

/* ─── FORM FIELD HELPERS ─────────────────────────────────── */
const Field = ({ label, children, className = '' }) => (
  <div className={`space-y-1.5 ${className}`}>
    <label className="block text-xs font-semibold text-ink-muted uppercase tracking-wide font-body">{label}</label>
    {children}
  </div>
);

const Input = ({ className = '', ...p }) => (
  <input {...p} className={`w-full px-3 py-2.5 bg-cream-50 border border-cream-300 rounded-lg text-sm font-body focus:outline-none focus:border-gold-500 transition-colors ${className}`}/>
);

const Textarea = ({ className = '', ...p }) => (
  <textarea {...p} className={`w-full px-3 py-2.5 bg-cream-50 border border-cream-300 rounded-lg text-sm font-body focus:outline-none focus:border-gold-500 transition-colors resize-none ${className}`}/>
);

const Select = ({ children, className = '', ...p }) => (
  <select {...p} className={`w-full px-3 py-2.5 bg-cream-50 border border-cream-300 rounded-lg text-sm font-body focus:outline-none focus:border-gold-500 transition-colors ${className}`}>
    {children}
  </select>
);

function ImagePicker({ label = 'Cover Image', onChange, preview }) {
  const ref = useRef();
  return (
    <Field label={label}>
      <div onClick={() => ref.current.click()}
        className="flex flex-col items-center justify-center gap-2 p-6 border-2 border-dashed border-cream-300 rounded-xl bg-cream-50 cursor-pointer hover:border-gold-400 hover:bg-gold-50/30 transition-colors">
        {preview ? (
          <img src={preview} alt="Preview" className="w-24 h-24 object-cover rounded-lg shadow"/>
        ) : (
          <ImageIcon size={28} className="text-ink-light"/>
        )}
        <span className="text-xs text-ink-muted font-body">{preview ? 'Click to change' : 'Click to upload image'}</span>
        <input ref={ref} type="file" accept="image/*" className="hidden" onChange={e => onChange(e.target.files[0])}/>
      </div>
    </Field>
  );
}

/* ─── SLIDE-OVER MODAL ───────────────────────────────────── */
function SlideOver({ open, onClose, title, children, footer }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-40 flex justify-end">
      <div className="absolute inset-0 bg-black/40" onClick={onClose}/>
      <div className="relative w-full max-w-lg bg-white h-full flex flex-col shadow-2xl">
        <div className="flex items-center justify-between px-6 py-5 border-b border-cream-200">
          <h3 className="font-display text-xl font-semibold text-forest-800">{title}</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-cream-100 text-ink-muted transition-colors"><X size={18}/></button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
          {children}
        </div>
        {footer && (
          <div className="px-6 py-4 border-t border-cream-200 flex gap-3 justify-end bg-cream-50">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

function SaveBtn({ loading, label = 'Save', onClick }) {
  return (
    <button type="submit" onClick={onClick} disabled={loading}
      className="flex items-center gap-2 px-5 py-2.5 bg-forest-700 hover:bg-forest-600 text-cream-50 text-sm font-medium rounded-lg transition-colors disabled:opacity-60 font-body">
      {loading ? <Spin size={14} cls="text-cream-200"/> : <Check size={14}/>}{loading ? 'Saving…' : label}
    </button>
  );
}

function CancelBtn({ onClick }) {
  return (
    <button type="button" onClick={onClick}
      className="px-4 py-2 text-sm border border-cream-300 rounded-lg hover:bg-cream-50 font-body transition-colors">
      Cancel
    </button>
  );
}

/* ═══════════════════════════════════════════════════════════
   DASHBOARD
═══════════════════════════════════════════════════════════ */
function Dashboard({ toast }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  const load = useCallback(() => {
    setLoading(true); setErr('');
    GET('/admin/dashboard')
      .then(d => setStats(d.data || d))
      .catch(() => setErr('Could not load stats'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  const CARDS = [
    { key:'totalMembers',   label:'Active Members',  icon:Users,        color:'gold'   },
    { key:'totalRevenue',   label:'Total Revenue',   icon:DollarSign,   color:'green'  },
    { key:'totalBooks',     label:'Books in Store',  icon:BookOpen,     color:'amber'  },
    { key:'pendingOrders',  label:'Pending Orders',  icon:ShoppingCart, color:'red'    },
    { key:'upcomingEvents', label:'Upcoming Events', icon:Calendar,     color:'teal'   },
    { key:'unreadMessages', label:'Unread Messages', icon:MessageSquare,color:'purple' },
  ];

  return (
    <div className="space-y-8">
      <Err msg={err} onRetry={load}/>
      {loading ? <PageLoader/> : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {CARDS.map((c,i) => (
              <div key={i} className="bg-white rounded-2xl border border-cream-300 p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${ACCENT.bg[c.color]}`}>
                  <c.icon size={20} className={ACCENT.text[c.color]}/>
                </div>
                <div>
                  <p className="text-2xl font-display font-bold text-forest-800">{stats?.[c.key] ?? '—'}</p>
                  <p className="text-xs text-ink-muted font-body mt-0.5">{c.label}</p>
                </div>
              </div>
            ))}
          </div>

          {stats?.monthlyRevenue?.length > 0 && (
            <div className="bg-white rounded-2xl border border-cream-300 p-6">
              <h3 className="font-display text-lg font-semibold text-forest-800 mb-4">Monthly Revenue</h3>
              <div className="flex items-end gap-3 h-32">
                {stats.monthlyRevenue.map((v,i) => {
                  const max = Math.max(...stats.monthlyRevenue.map(m => m.amount||0), 1);
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <span className="text-xs text-ink-muted font-body">₵{((v.amount||0)/1000).toFixed(0)}k</span>
                      <div className="w-full bg-gold-400 rounded-t-md" style={{height:`${((v.amount||0)/max)*100}%`}}/>
                      <span className="text-xs text-ink-light font-body">{v.month||''}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="bg-white rounded-2xl border border-cream-300 p-6">
            <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-3 font-body">System Status</p>
            <div className="space-y-2.5">
              {[['API Server','online'],['MongoDB','online'],['Email (Nodemailer)','online'],['Cloudinary CDN','online'],['Paystack Gateway','online']].map(([k,v]) => (
                <div key={k} className="flex items-center justify-between">
                  <span className="text-sm font-body text-ink-soft">{k}</span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-500"/>
                    <span className="text-xs font-body text-green-600">{v}</span>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={load} className="mt-4 flex items-center gap-1.5 text-xs text-ink-muted hover:text-ink-DEFAULT font-body transition-colors">
              <RefreshCw size={12}/>Refresh
            </button>
          </div>
        </>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   NEWS
═══════════════════════════════════════════════════════════ */
function ArticleForm({ initial, onSave, onClose }) {
  const isEdit = !!initial;
  const [form, setForm] = useState({
    title: initial?.title || '', 
    category: initial?.category || 'General',
    // CHANGED: 'content' to 'body' to match your Mongoose Schema
    body: initial?.body || '', 
    status: initial?.status || 'draft',
  });
  
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(initial?.coverImage || '');
  const [loading, setLoading] = useState(false);

  const pickFile = (f) => { setFile(f); if (f) setPreview(URL.createObjectURL(f)); };

  const submit = async (e) => {
    e.preventDefault(); setLoading(true);
    try {
      const fd = new FormData();
      // This will now correctly append 'body' instead of 'content'
      Object.entries(form).forEach(([k,v]) => fd.append(k, v));
      
      if (file) fd.append('coverImage', file);
      
      if (isEdit) await PATCH(`/news/${id(initial)}`, fd, true);
      else await POST('/news', fd, true);
      
      onSave();
    } catch (err) { alert(err.message); }
    finally { setLoading(false); }
  };

  const f = (k) => (v) => setForm(p => ({...p, [k]: v.target?.value ?? v}));

  return (
    <form onSubmit={submit} className="space-y-4">
      <Field label="Title"><Input required value={form.title} onChange={f('title')} placeholder="Article title"/></Field>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Category">
          <Select value={form.category} onChange={f('category')}>
            {/* Ensure these match your Mongoose Enum: Event, Membership, Partnership, Award, Workshop, General */}
            {['General','Event','Membership','Partnership','Award','Workshop'].map(c => <option key={c}>{c}</option>)}
          </Select>
        </Field>
        <Field label="Status">
          <Select value={form.status} onChange={f('status')}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </Select>
        </Field>
      </div>
      {/* CHANGED: value and onChange to use 'body' */}
      <Field label="Content">
        <Textarea required rows={8} value={form.body} onChange={f('body')} placeholder="Write the article content…"/>
      </Field>
      <ImagePicker label="Cover Image" onChange={pickFile} preview={preview}/>
      <div className="flex gap-3 justify-end pt-2">
        <CancelBtn onClick={onClose}/>
        <SaveBtn loading={loading} label={isEdit ? 'Update Article' : 'Publish Article'}/>
      </div>
    </form>
  );
}


function NewsSection({ toast, setConfirm }) {
  const [items, setItems]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr]         = useState('');
  const [q, setQ]             = useState('');
  const [modal, setModal]     = useState(null); // null | 'new' | article-object

  const load = useCallback(() => {
    setLoading(true); setErr('');
    GET('/news/admin/all')
      .then(d => setItems(d.articles || d.data || []))
      .catch(() => setErr('Failed to load articles'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  const toggleStatus = async (a) => {
    const next = a.status === 'published' ? 'draft' : 'published';
    try { await PATCH(`/news/${id(a)}`, { status: next }); toast(`Article ${next}`); load(); }
    catch (e) { toast(e.message); }
  };

  const del = (a) => setConfirm({
    msg: `Delete "${a.title}"? This cannot be undone.`,
    fn: async () => { try { await DEL(`/news/${id(a)}`); toast('Deleted'); load(); } catch(e){ toast(e.message); } },
  });

  const filtered = items.filter(a => a.title?.toLowerCase().includes(q.toLowerCase()));

  return (
    <div>
      <SectionHeader title="News & Articles" subtitle={`${items.length} articles`} action="New Article" onAction={() => setModal('new')}/>
      <Err msg={err} onRetry={load}/>
      <SearchBar value={q} onChange={setQ} placeholder="Search articles…"/>
      {loading ? <PageLoader/> : (
        <div className="bg-white rounded-2xl border border-cream-300 overflow-hidden">
          <table className="w-full text-sm font-body">
            <thead className="bg-cream-50 border-b border-cream-200">
              <tr>{['Title','Category','Status','Views','Date','Actions'].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wide">{h}</th>
              ))}</tr>
            </thead>
            <tbody className="divide-y divide-cream-100">
              {filtered.map(a => (
                <tr key={id(a)} className="hover:bg-cream-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {a.coverImage
                        ? <img src={a.coverImage} className="w-9 h-9 rounded-lg object-cover flex-shrink-0" alt=""/>
                        : <div className="w-9 h-9 rounded-lg bg-cream-100 flex items-center justify-center flex-shrink-0"><FileText size={14} className="text-ink-light"/></div>}
                      <span className="font-medium text-ink-DEFAULT max-w-[180px] truncate">{a.title}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-ink-muted">{a.category}</td>
                  <td className="px-4 py-3"><Badge status={a.status}/></td>
                  <td className="px-4 py-3 text-ink-muted">{(a.views||0).toLocaleString()}</td>
                  <td className="px-4 py-3 text-ink-muted">{fmtDate(a.createdAt)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <button onClick={() => toggleStatus(a)}
                        className="text-xs px-2.5 py-1 rounded-lg border border-cream-300 hover:bg-cream-100 text-ink-soft transition-colors">
                        {a.status === 'published' ? 'Unpublish' : 'Publish'}
                      </button>
                      <button onClick={() => setModal(a)} className="p-1.5 text-ink-light hover:text-forest-700 transition-colors"><Edit size={13}/></button>
                      <button onClick={() => del(a)} className="p-1.5 text-ink-light hover:text-red-600 transition-colors"><Trash2 size={13}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <EmptyState icon={Newspaper} title="No articles" body="Create your first article." action="New Article" onAction={() => setModal('new')}/>}
        </div>
      )}

      <SlideOver open={!!modal} onClose={() => setModal(null)} title={modal === 'new' ? 'New Article' : 'Edit Article'}>
        <ArticleForm
          key={modal === 'new' ? 'new' : id(modal)}
          initial={modal === 'new' ? null : modal}
          onSave={() => { setModal(null); toast(modal === 'new' ? 'Article created!' : 'Article updated!'); load(); }}
          onClose={() => setModal(null)}
        />
      </SlideOver>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MEMBERS
═══════════════════════════════════════════════════════════ */
function MemberForm({ initial, onSave, onClose }) {
  const isEdit = !!initial;
  const [form, setForm] = useState({
    name: initial?.name || '', email: initial?.email || '',
    phone: initial?.phone || '', region: initial?.region || '',
    membershipType: initial?.membershipType || initial?.type || 'ordinary',
  });
  const [loading, setLoading] = useState(false);
  const f = (k) => (e) => setForm(p => ({...p, [k]: e.target.value}));

  const submit = async (e) => {
    e.preventDefault(); setLoading(true);
    try {
      if (isEdit) await PATCH(`/members/admin/${id(initial)}`, form);
      else         await POST('/members', form);
      onSave();
    } catch (err) { alert(err.message); }
    finally { setLoading(false); }
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <Field label="Full Name"><Input required value={form.name} onChange={f('name')} placeholder="Kwame Asante"/></Field>
      <Field label="Email"><Input required type="email" value={form.email} onChange={f('email')} placeholder="kwame@example.com"/></Field>
      <Field label="Phone"><Input value={form.phone} onChange={f('phone')} placeholder="+233 24 000 0000"/></Field>
      <Field label="Region">
        <Select value={form.region} onChange={f('region')}>
          <option value="">Select region</option>
          {['Greater Accra','Ashanti','Western','Central','Eastern','Volta','Northern','Upper East','Upper West','Bono','Ahafo','Bono East','Oti','North East','Savannah','Western North'].map(r => <option key={r}>{r}</option>)}
        </Select>
      </Field>
      <Field label="Membership Type">
        <Select value={form.membershipType} onChange={f('membershipType')}>
          <option value="ordinary">Ordinary</option>
          <option value="associate">Associate</option>
          <option value="patron">Patron</option>
          <option value="honorary">Honorary</option>
        </Select>
      </Field>
      <div className="flex gap-3 justify-end pt-2">
        <CancelBtn onClick={onClose}/>
        <SaveBtn loading={loading} label={isEdit ? 'Update Member' : 'Add Member'}/>
      </div>
    </form>
  );
}

function MembersSection({ toast, setConfirm }) {
  const [items, setItems]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr]         = useState('');
  const [q, setQ]             = useState('');
  const [modal, setModal]     = useState(null);
  const [viewItem, setViewItem] = useState(null);

  const load = useCallback(() => {
    setLoading(true); setErr('');
    GET('/members/admin/all')
      .then(d => setItems(d.members || d.data || []))
      .catch(() => setErr('Failed to load members'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  const del = (m) => setConfirm({
    msg: `Remove member "${m.name}"?`,
    fn: async () => { try { await DEL(`/members/admin/${id(m)}`); toast('Member removed'); load(); } catch(e){ toast(e.message); } },
  });

  const filtered = items.filter(m =>
    m.name?.toLowerCase().includes(q.toLowerCase()) || m.email?.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div>
      <SectionHeader title="Members Directory" subtitle={`${items.length} members`} action="Add Member" onAction={() => setModal('new')}/>
      <Err msg={err} onRetry={load}/>
      <div className="flex gap-3 mb-4">
        <div className="flex-1"><SearchBar value={q} onChange={setQ} placeholder="Search by name or email…"/></div>
        <button className="flex items-center gap-2 px-3 h-[38px] border border-cream-300 rounded-lg text-sm text-ink-soft hover:bg-cream-50 font-body transition-colors flex-shrink-0">
          <Download size={13}/>Export
        </button>
      </div>
      {loading ? <PageLoader/> : (
        <div className="bg-white rounded-2xl border border-cream-300 overflow-hidden">
          <table className="w-full text-sm font-body">
            <thead className="bg-cream-50 border-b border-cream-200">
              <tr>{['Member','Type','Region','Joined','Status','Actions'].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wide">{h}</th>
              ))}</tr>
            </thead>
            <tbody className="divide-y divide-cream-100">
              {filtered.map(m => (
                <tr key={id(m)} className="hover:bg-cream-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gold-200 flex items-center justify-center text-xs font-bold text-gold-800 flex-shrink-0">{initials(m.name)}</div>
                      <div><p className="font-medium text-ink-DEFAULT">{m.name}</p><p className="text-xs text-ink-muted">{m.email}</p></div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-ink-muted capitalize">{m.membershipType||m.type}</td>
                  <td className="px-4 py-3 text-ink-muted">{m.region||'—'}</td>
                  <td className="px-4 py-3 text-ink-muted">{fmtDate(m.createdAt)}</td>
                  <td className="px-4 py-3"><Badge status={m.isActive===false?'inactive':'active'}/></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <button onClick={() => setViewItem(m)} className="p-1.5 text-ink-light hover:text-forest-700 transition-colors"><Eye size={13}/></button>
                      <button onClick={() => setModal(m)} className="p-1.5 text-ink-light hover:text-forest-700 transition-colors"><Edit size={13}/></button>
                      <button onClick={() => del(m)} className="p-1.5 text-ink-light hover:text-red-600 transition-colors"><Trash2 size={13}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <EmptyState icon={Users} title="No members" body="Try a different search."/>}
        </div>
      )}

      {/* Add / Edit Modal */}
      <SlideOver open={!!modal} onClose={() => setModal(null)} title={modal === 'new' ? 'Add Member' : 'Edit Member'}>
        <MemberForm
          key={modal === 'new' ? 'new' : id(modal)}
          initial={modal === 'new' ? null : modal}
          onSave={() => { setModal(null); toast(modal === 'new' ? 'Member added!' : 'Member updated!'); load(); }}
          onClose={() => setModal(null)}
        />
      </SlideOver>

      {/* View Modal */}
      <SlideOver open={!!viewItem} onClose={() => setViewItem(null)} title="Member Profile">
        {viewItem && (
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-cream-50 rounded-2xl">
              <div className="w-14 h-14 rounded-full bg-gold-200 flex items-center justify-center text-lg font-bold text-gold-800">{initials(viewItem.name)}</div>
              <div>
                <p className="font-display text-lg font-semibold text-forest-800">{viewItem.name}</p>
                <p className="text-sm text-ink-muted font-body">{viewItem.email}</p>
              </div>
            </div>
            {[['Membership Type', viewItem.membershipType||viewItem.type],['Region', viewItem.region||'—'],['Phone', viewItem.phone||'—'],['Joined', fmtDate(viewItem.createdAt)],['Status', viewItem.isActive===false?'Inactive':'Active']].map(([k,v]) => (
              <div key={k} className="flex justify-between py-2.5 border-b border-cream-100">
                <span className="text-sm text-ink-muted font-body">{k}</span>
                <span className="text-sm font-medium text-ink-DEFAULT font-body capitalize">{v}</span>
              </div>
            ))}
          </div>
        )}
      </SlideOver>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   APPLICATIONS
═══════════════════════════════════════════════════════════ */
function ApplicationsSection({ toast }) {
  const [items, setItems]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr]         = useState('');
  const [filter, setFilter]   = useState('all');
  const [acting, setActing]   = useState(null);
  const [view, setView]       = useState(null);

  const load = useCallback(() => {
    setLoading(true); setErr('');
    const qs = filter !== 'all' ? `?status=${filter}` : '';
    GET(`/membership${qs}`)
      .then(d => setItems(d.applications || d.data || []))
      .catch(() => setErr('Failed to load applications'))
      .finally(() => setLoading(false));
  }, [filter]);

  useEffect(() => { load(); }, [load]);

  const act = async (item, action) => {
    setActing(id(item));
    try {
      await PATCH(`/membership/${id(item)}/${action}`);
      toast(action === 'approve' ? 'Approved — Paystack link sent!' : 'Rejected — applicant notified.');
      load();
    } catch (e) { toast(e.message); }
    finally { setActing(null); }
  };

  return (
    <div>
      <SectionHeader title="Membership Applications" subtitle="Review and approve applicants"/>
      <Err msg={err} onRetry={load}/>
      <div className="flex gap-2 mb-5 flex-wrap">
        {['all','pending','approved','rejected'].map(s => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-3 py-1.5 text-sm font-body rounded-lg border capitalize transition-colors ${filter===s?'bg-forest-700 text-cream-50 border-forest-700':'border-cream-300 hover:bg-cream-50'}`}>{s}</button>
        ))}
      </div>
      {loading ? <PageLoader/> : items.length === 0 ? (
        <EmptyState icon={UserCheck} title="No applications" body="No applications match this filter."/>
      ) : (
        <div className="space-y-3">
          {items.map(a => (
            <div key={id(a)} className="bg-white rounded-2xl border border-cream-300 p-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-10 h-10 rounded-full bg-forest-100 flex items-center justify-center text-sm font-bold text-forest-700 flex-shrink-0">{initials(a.name||a.fullName)}</div>
                <div className="min-w-0">
                  <p className="font-medium text-ink-DEFAULT font-body truncate">{a.name||a.fullName}</p>
                  <div className="flex items-center gap-3 mt-0.5 flex-wrap text-xs text-ink-muted font-body">
                    <span className="capitalize">{a.membershipType||a.type} membership</span>
                    <span>Applied: {fmtDate(a.createdAt)}</span>
                    {a.documents?.length > 0 && <span>{a.documents.length} docs</span>}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Badge status={a.status}/>
                {a.status === 'pending' && (
                  <>
                    <button onClick={() => act(a,'approve')} disabled={acting===id(a)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-forest-700 text-cream-50 text-sm rounded-lg hover:bg-forest-600 font-body transition-colors disabled:opacity-60">
                      {acting===id(a)?<Spin size={12}/>:<Check size={12}/>}Approve
                    </button>
                    <button onClick={() => act(a,'reject')} disabled={acting===id(a)}
                      className="flex items-center gap-1.5 px-3 py-1.5 border border-red-200 text-red-600 text-sm rounded-lg hover:bg-red-50 font-body transition-colors disabled:opacity-60">
                      <X size={12}/>Reject
                    </button>
                  </>
                )}
                <button onClick={() => setView(a)} className="p-1.5 text-ink-light hover:text-forest-700 transition-colors"><Eye size={14}/></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* View Application */}
      <SlideOver open={!!view} onClose={() => setView(null)} title="Application Details">
        {view && (
          <div className="space-y-4">
            {[['Name',view.name||view.fullName],['Email',view.email],['Phone',view.phone||'—'],['Type',(view.membershipType||view.type||'').toUpperCase()],['Status',view.status],['Applied',fmtDate(view.createdAt)],['Docs',view.documents?.length||0]].map(([k,v]) => (
              <div key={k} className="flex justify-between py-2.5 border-b border-cream-100">
                <span className="text-sm text-ink-muted font-body">{k}</span>
                <span className="text-sm font-medium text-ink-DEFAULT font-body capitalize">{v}</span>
              </div>
            ))}
            {view.documents?.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-ink-muted uppercase mb-2 font-body">Documents</p>
                <div className="space-y-2">
                  {view.documents.map((d,i) => (
                    <a key={i} href={d} target="_blank" rel="noreferrer"
                      className="flex items-center gap-2 text-sm text-forest-700 hover:text-forest-500 font-body transition-colors">
                      <FileText size={14}/> Document {i+1}
                    </a>
                  ))}
                </div>
              </div>
            )}
            {view.status === 'pending' && (
              <div className="flex gap-3 pt-2">
                <button onClick={() => { act(view,'approve'); setView(null); }}
                  className="flex-1 py-2.5 bg-forest-700 text-cream-50 text-sm rounded-lg hover:bg-forest-600 font-body transition-colors flex items-center justify-center gap-1.5">
                  <Check size={13}/>Approve
                </button>
                <button onClick={() => { act(view,'reject'); setView(null); }}
                  className="flex-1 py-2.5 border border-red-200 text-red-600 text-sm rounded-lg hover:bg-red-50 font-body transition-colors flex items-center justify-center gap-1.5">
                  <X size={13}/>Reject
                </button>
              </div>
            )}
          </div>
        )}
      </SlideOver>

      <div className="mt-6 bg-gold-50 border border-gold-200 rounded-2xl p-5">
        <p className="text-sm font-display font-semibold text-gold-800 mb-2">Payment Flow</p>
        <div className="flex items-center gap-2 flex-wrap">
          {['Apply','Review','Approve','Paystack Link','Payment','Activated'].map((s,i,arr) => (
            <div key={i} className="flex items-center gap-1.5">
              <span className="text-xs font-body text-gold-700 bg-gold-100 px-2 py-1 rounded-md">{s}</span>
              {i<arr.length-1&&<ChevronRight size={11} className="text-gold-400"/>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   BOOKS
═══════════════════════════════════════════════════════════ */
function BookForm({ initial, onSave, onClose }) {
  const isEdit = !!initial;
  const [form, setForm] = useState({
    title: initial?.title||'', author: initial?.author||'',
    category: initial?.category||'Fiction', price: initial?.price||'',
    stock: initial?.stock||'', description: initial?.description||'',
    featured: initial?.featured||false,
  });
  const [file, setFile]         = useState(null);
  const [preview, setPreview]   = useState(initial?.coverImage||'');
  const [loading, setLoading]   = useState(false);
  const f = (k) => (e) => setForm(p => ({...p, [k]: e.target.type==='checkbox'?e.target.checked:e.target.value}));

  const submit = async (e) => {
    e.preventDefault(); setLoading(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k,v]) => fd.append(k, v));
      if (file) fd.append('coverImage', file);
      if (isEdit) await PATCH(`/books/${id(initial)}`, fd, true);
      else         await POST('/books', fd, true);
      onSave();
    } catch (err) { alert(err.message); }
    finally { setLoading(false); }
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <Field label="Book Title"><Input required value={form.title} onChange={f('title')} placeholder="The Kente Weaver's Son"/></Field>
      <Field label="Author"><Input required value={form.author} onChange={f('author')} placeholder="Ama Darko"/></Field>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Category">
          <Select value={form.category} onChange={f('category')}>
            {['Fiction','Non-Fiction','Poetry','Children','Reference','Biography','Self-Help','Academic'].map(c=><option key={c}>{c}</option>)}
          </Select>
        </Field>
        <Field label="Price (₵)"><Input required type="number" min="0" value={form.price} onChange={f('price')} placeholder="45"/></Field>
      </div>
      <Field label="Stock Quantity"><Input required type="number" min="0" value={form.stock} onChange={f('stock')} placeholder="50"/></Field>
      <Field label="Description"><Textarea rows={4} value={form.description} onChange={f('description')} placeholder="Short description of the book…"/></Field>
      <label className="flex items-center gap-2 cursor-pointer">
        <input type="checkbox" checked={form.featured} onChange={f('featured')} className="w-4 h-4 accent-gold-500"/>
        <span className="text-sm font-body text-ink-DEFAULT">Featured on homepage</span>
      </label>
      <ImagePicker label="Cover Image" onChange={(fl)=>{setFile(fl);if(fl)setPreview(URL.createObjectURL(fl));}} preview={preview}/>
      <div className="flex gap-3 justify-end pt-2">
        <CancelBtn onClick={onClose}/>
        <SaveBtn loading={loading} label={isEdit?'Update Book':'Add Book'}/>
      </div>
    </form>
  );
}

function BooksSection({ toast, setConfirm }) {
  const [items, setItems]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr]         = useState('');
  const [q, setQ]             = useState('');
  const [modal, setModal]     = useState(null);

  const load = useCallback(() => {
    setLoading(true); setErr('');
    GET('/books/admin/all')
      .then(d => setItems(d.books||d.data||[]))
      .catch(() => setErr('Failed to load books'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  const del = (b) => setConfirm({
    msg: `Delete "${b.title}"?`,
    fn: async () => { try { await DEL(`/books/${id(b)}`); toast('Book deleted'); load(); } catch(e){ toast(e.message); } },
  });

  const filtered = items.filter(b =>
    b.title?.toLowerCase().includes(q.toLowerCase()) || b.author?.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div>
      <SectionHeader title="Book Store" subtitle={`${items.length} books`} action="Add Book" onAction={() => setModal('new')}/>
      <Err msg={err} onRetry={load}/>
      <SearchBar value={q} onChange={setQ} placeholder="Search title or author…"/>
      {loading ? <PageLoader/> : (
        <div className="bg-white rounded-2xl border border-cream-300 overflow-hidden">
          <table className="w-full text-sm font-body">
            <thead className="bg-cream-50 border-b border-cream-200">
              <tr>{['Book','Author','Category','Price','Stock','Actions'].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wide">{h}</th>
              ))}</tr>
            </thead>
            <tbody className="divide-y divide-cream-100">
              {filtered.map(b => (
                <tr key={id(b)} className="hover:bg-cream-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {b.coverImage
                        ? <img src={b.coverImage} className="w-8 h-10 object-cover rounded shadow-sm flex-shrink-0" alt=""/>
                        : <div className="w-8 h-10 bg-cream-200 rounded flex items-center justify-center flex-shrink-0"><BookOpen size={12} className="text-ink-light"/></div>}
                      <div>
                        <span className="font-medium text-ink-DEFAULT">{b.title}</span>
                        {b.featured && <Star size={12} className="text-gold-500 fill-gold-500 inline ml-1.5"/>}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-ink-muted">{b.author}</td>
                  <td className="px-4 py-3 text-ink-muted">{b.category}</td>
                  <td className="px-4 py-3 font-medium text-forest-700">₵{b.price}</td>
                  <td className="px-4 py-3">
                    <span className={b.stock===0?'text-red-600 font-medium':b.stock<=5?'text-amber-600 font-medium':'text-ink-DEFAULT'}>
                      {b.stock===0?'Out of stock':b.stock}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <button onClick={() => setModal(b)} className="p-1.5 text-ink-light hover:text-forest-700 transition-colors"><Edit size={13}/></button>
                      <button onClick={() => del(b)} className="p-1.5 text-ink-light hover:text-red-600 transition-colors"><Trash2 size={13}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length===0 && <EmptyState icon={BookOpen} title="No books" body="Add your first book." action="Add Book" onAction={() => setModal('new')}/>}
        </div>
      )}

      <SlideOver open={!!modal} onClose={() => setModal(null)} title={modal==='new'?'Add Book':'Edit Book'}>
        <BookForm
          key={modal==='new'?'new':id(modal)}
          initial={modal==='new'?null:modal}
          onSave={() => { setModal(null); toast(modal==='new'?'Book added!':'Book updated!'); load(); }}
          onClose={() => setModal(null)}
        />
      </SlideOver>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   ORDERS
═══════════════════════════════════════════════════════════ */
function OrdersSection({ toast }) {
  const [items, setItems]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr]         = useState('');
  const [filter, setFilter]   = useState('all');
  const [view, setView]       = useState(null);

  const load = useCallback(() => {
    setLoading(true); setErr('');
    GET('/orders/admin')
      .then(d => setItems(d.orders||d.data||[]))
      .catch(() => setErr('Failed to load orders'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  const updateStatus = async (o, status) => {
    try { await PATCH(`/orders/admin/${id(o)}/status`, { status }); toast(`Order marked ${status}`); load(); }
    catch(e) { toast(e.message); }
  };

  const displayed = filter==='all' ? items : items.filter(o => o.status===filter);

  return (
    <div>
      <SectionHeader title="Orders" subtitle={`${items.length} total`}/>
      <Err msg={err} onRetry={load}/>
      <div className="flex gap-2 mb-4 flex-wrap">
        {['all','paid','shipped','delivered','cancelled'].map(s => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-3 py-1.5 text-sm font-body rounded-lg border capitalize transition-colors ${filter===s?'bg-forest-700 text-cream-50 border-forest-700':'border-cream-300 hover:bg-cream-50'}`}>{s}</button>
        ))}
        <button className="ml-auto flex items-center gap-1.5 px-3 py-1.5 text-sm border border-cream-300 rounded-lg hover:bg-cream-50 font-body transition-colors">
          <Download size={13}/>CSV
        </button>
      </div>
      {loading ? <PageLoader/> : displayed.length===0 ? (
        <EmptyState icon={ShoppingCart} title="No orders" body="No orders match this filter."/>
      ) : (
        <div className="space-y-3">
          {displayed.map(o => (
            <div key={id(o)} className="bg-white rounded-2xl border border-cream-300 p-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-cream-100 flex items-center justify-center flex-shrink-0">
                  <Package size={15} className="text-ink-muted"/>
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-ink-DEFAULT font-body">
                    #{o.reference||id(o).slice(-6).toUpperCase()} — {o.customer?.name||o.customerName||'—'}
                  </p>
                  <div className="flex items-center gap-3 mt-0.5 text-xs text-ink-muted font-body flex-wrap">
                    <span>{o.items?.length||0} item(s)</span>
                    <span className="text-forest-700 font-medium">₵{o.totalAmount||o.total||0}</span>
                    <span>{fmtDate(o.createdAt)}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Badge status={o.status}/>
                {o.status==='paid'     && <button onClick={() => updateStatus(o,'shipped')}   className="text-xs px-3 py-1.5 bg-forest-700 text-cream-50 rounded-lg hover:bg-forest-600 font-body transition-colors">Mark Shipped</button>}
                {o.status==='shipped'  && <button onClick={() => updateStatus(o,'delivered')} className="text-xs px-3 py-1.5 bg-forest-700 text-cream-50 rounded-lg hover:bg-forest-600 font-body transition-colors">Mark Delivered</button>}
                <button onClick={() => setView(o)} className="p-1.5 text-ink-light hover:text-forest-700 transition-colors"><Eye size={14}/></button>
              </div>
            </div>
          ))}
        </div>
      )}

      <SlideOver open={!!view} onClose={() => setView(null)} title="Order Details">
        {view && (
          <div className="space-y-4">
            {[['Order Ref',`#${view.reference||id(view).slice(-6).toUpperCase()}`],['Customer',view.customer?.name||view.customerName||'—'],['Email',view.customer?.email||'—'],['Total',`₵${view.totalAmount||view.total||0}`],['Status',view.status],['Date',fmtDate(view.createdAt)]].map(([k,v]) => (
              <div key={k} className="flex justify-between py-2.5 border-b border-cream-100">
                <span className="text-sm text-ink-muted font-body">{k}</span>
                <span className="text-sm font-medium text-ink-DEFAULT font-body capitalize">{v}</span>
              </div>
            ))}
            {view.items?.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-ink-muted uppercase mb-2 font-body">Items</p>
                <div className="space-y-2">
                  {view.items.map((item,i) => (
                    <div key={i} className="flex justify-between text-sm font-body">
                      <span className="text-ink-DEFAULT">{item.book?.title||item.title||`Item ${i+1}`}</span>
                      <span className="text-ink-muted">x{item.quantity||1} · ₵{item.price||0}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {view.shippingAddress && (
              <div>
                <p className="text-xs font-semibold text-ink-muted uppercase mb-1 font-body">Delivery Address</p>
                <p className="text-sm text-ink-DEFAULT font-body">{view.shippingAddress}</p>
              </div>
            )}
          </div>
        )}
      </SlideOver>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   EVENTS
═══════════════════════════════════════════════════════════ */
function EventForm({ initial, onSave, onClose }) {
  const isEdit = !!initial;
  const toDateInput = (d) => d ? new Date(d).toISOString().slice(0,16) : '';
  const [form, setForm] = useState({
    title: initial?.title||'', date: toDateInput(initial?.date||initial?.startDate),
    location: initial?.location||'', type: initial?.type||initial?.eventType||'Workshop',
    description: initial?.description||'', isPaid: initial?.isPaid||false,
    ticketPrice: initial?.ticketPrice||'',
  });
  const [loading, setLoading] = useState(false);
  const f = (k) => (e) => setForm(p => ({...p,[k]:e.target.type==='checkbox'?e.target.checked:e.target.value}));

  const submit = async (e) => {
    e.preventDefault(); setLoading(true);
    try {
      if (isEdit) await PATCH(`/events/${id(initial)}`, form);
      else         await POST('/events', form);
      onSave();
    } catch(err) { alert(err.message); }
    finally { setLoading(false); }
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <Field label="Event Title"><Input required value={form.title} onChange={f('title')} placeholder="Kumasi Book Fair 2025"/></Field>
      <Field label="Date & Time"><Input required type="datetime-local" value={form.date} onChange={f('date')}/></Field>
      <Field label="Location"><Input required value={form.location} onChange={f('location')} placeholder="Kumasi City Mall, Kumasi"/></Field>
      <Field label="Event Type">
        <Select value={form.type} onChange={f('type')}>
          {['Workshop','Fair','Gala','Conference','Class','Launch','Other'].map(t=><option key={t}>{t}</option>)}
        </Select>
      </Field>
      <Field label="Description"><Textarea rows={4} value={form.description} onChange={f('description')} placeholder="Event description…"/></Field>
      <label className="flex items-center gap-2 cursor-pointer">
        <input type="checkbox" checked={form.isPaid} onChange={f('isPaid')} className="w-4 h-4 accent-gold-500"/>
        <span className="text-sm font-body text-ink-DEFAULT">Paid event (requires ticket purchase)</span>
      </label>
      {form.isPaid && (
        <Field label="Ticket Price (₵)"><Input type="number" min="0" value={form.ticketPrice} onChange={f('ticketPrice')} placeholder="50"/></Field>
      )}
      <div className="flex gap-3 justify-end pt-2">
        <CancelBtn onClick={onClose}/>
        <SaveBtn loading={loading} label={isEdit?'Update Event':'Create Event'}/>
      </div>
    </form>
  );
}

function EventsSection({ toast, setConfirm }) {
  const [items, setItems]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr]         = useState('');
  const [modal, setModal]     = useState(null);

  const load = useCallback(() => {
    setLoading(true); setErr('');
    GET('/events/admin/all')
      .then(d => setItems(d.events||d.data||[]))
      .catch(() => setErr('Failed to load events'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  const del = (ev) => setConfirm({
    msg: `Delete "${ev.title}"?`,
    fn: async () => { try { await DEL(`/events/${id(ev)}`); toast('Event deleted'); load(); } catch(e){ toast(e.message); } },
  });

  return (
    <div>
      <SectionHeader title="Events" subtitle={`${items.length} events`} action="Create Event" onAction={() => setModal('new')}/>
      <Err msg={err} onRetry={load}/>
      {loading ? <PageLoader/> : items.length===0 ? (
        <EmptyState icon={Calendar} title="No events yet" body="Create your first event." action="Create Event" onAction={() => setModal('new')}/>
      ) : (
        <div className="grid gap-4">
          {items.map(ev => {
            const d = ev.date||ev.startDate ? new Date(ev.date||ev.startDate) : null;
            return (
              <div key={id(ev)} className="bg-white rounded-2xl border border-cream-300 p-5 flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 min-w-0">
                  <div className="text-center bg-gold-100 rounded-xl px-4 py-3 flex-shrink-0 min-w-[64px]">
                    <p className="text-xs font-body text-gold-700 uppercase tracking-wide">{d?d.toLocaleString('en',{month:'short'}):'—'}</p>
                    <p className="text-2xl font-display font-bold text-gold-800">{d?d.getDate():'—'}</p>
                  </div>
                  <div className="min-w-0">
                    <p className="font-display font-semibold text-forest-800 text-lg truncate">{ev.title}</p>
                    <div className="flex items-center gap-3 mt-1 flex-wrap">
                      {ev.location && <span className="flex items-center gap-1 text-xs text-ink-muted font-body"><MapPin size={11}/>{ev.location}</span>}
                      {ev.type && <Badge status={(ev.type||'').toLowerCase()}/>}
                      <span className="text-xs text-ink-muted font-body">{ev.registrations?.length||ev.registrationCount||0} registered</span>
                      {ev.isPaid && <span className="text-xs text-gold-700 font-body">₵{ev.ticketPrice} ticket</span>}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <button onClick={() => setModal(ev)} className="p-1.5 text-ink-light hover:text-forest-700 transition-colors"><Edit size={15}/></button>
                  <button onClick={() => del(ev)} className="p-1.5 text-ink-light hover:text-red-600 transition-colors"><Trash2 size={15}/></button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <SlideOver open={!!modal} onClose={() => setModal(null)} title={modal==='new'?'Create Event':'Edit Event'}>
        <EventForm
          key={modal==='new'?'new':id(modal)}
          initial={modal==='new'?null:modal}
          onSave={() => { setModal(null); toast(modal==='new'?'Event created!':'Event updated!'); load(); }}
          onClose={() => setModal(null)}
        />
      </SlideOver>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   CONTACT
═══════════════════════════════════════════════════════════ */
function ContactSection({ toast, setConfirm }) {
  const [items, setItems]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [err, setErr]           = useState('');
  const [replyId, setReplyId]   = useState(null);
  const [replyText, setReplyText] = useState('');
  const [sending, setSending]   = useState(false);

  const load = useCallback(() => {
    setLoading(true); setErr('');
    GET('/contact/admin')
      .then(d => setItems(d.messages||d.data||[]))
      .catch(() => setErr('Failed to load messages'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  const markRead = async (m) => {
    if (m.read) return;
    try { await PATCH(`/contact/admin/${id(m)}/read`); load(); } catch {}
  };

  const sendReply = async (m) => {
    if (!replyText.trim()) { toast('Reply cannot be empty'); return; }
    setSending(true);
    try {
      await PATCH(`/contact/admin/${id(m)}/reply`, { reply: replyText });
      toast('Reply sent!'); setReplyId(null); setReplyText(''); load();
    } catch(e) { toast(e.message); }
    finally { setSending(false); }
  };

  const del = (m) => setConfirm({
    msg: `Delete message from "${m.name}"?`,
    fn: async () => { try { await DEL(`/contact/admin/${id(m)}`); toast('Deleted'); load(); } catch(e){ toast(e.message); } },
  });

  const unread = items.filter(m => !m.read).length;

  return (
    <div>
      <SectionHeader title="Contact Messages" subtitle={`${unread} unread`}/>
      <Err msg={err} onRetry={load}/>
      {loading ? <PageLoader/> : items.length===0 ? (
        <EmptyState icon={Mail} title="Inbox empty" body="No contact messages yet."/>
      ) : (
        <div className="space-y-3">
          {items.map(m => (
            <div key={id(m)} onClick={() => markRead(m)}
              className={`bg-white rounded-2xl border p-5 transition-all ${!m.read?'border-gold-300 bg-gold-50/20':'border-cream-300'}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-full bg-forest-100 flex items-center justify-center text-xs font-bold text-forest-700 flex-shrink-0">{initials(m.name)}</div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-medium text-ink-DEFAULT font-body">{m.name}</p>
                      {!m.read && <span className="w-2 h-2 rounded-full bg-gold-500"/>}
                      {m.replied && <Badge status="replied"/>}
                    </div>
                    <p className="text-xs text-ink-muted font-body">{m.email} · {fmtDate(m.createdAt)}</p>
                    <p className="text-sm text-ink-soft font-body mt-1 font-medium">{m.subject}</p>
                    {m.message && <p className="text-xs text-ink-muted font-body mt-0.5 line-clamp-2">{m.message}</p>}
                  </div>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  {!m.replied && (
                    <button onClick={(e) => { e.stopPropagation(); markRead(m); setReplyId(replyId===id(m)?null:id(m)); setReplyText(''); }}
                      className="text-xs px-2.5 py-1.5 bg-forest-700 text-cream-50 rounded-lg hover:bg-forest-600 font-body flex items-center gap-1 transition-colors">
                      <Send size={11}/>Reply
                    </button>
                  )}
                  <button onClick={(e) => { e.stopPropagation(); del(m); }} className="p-1.5 text-ink-light hover:text-red-600 transition-colors"><Trash2 size={13}/></button>
                </div>
              </div>

              {replyId === id(m) && (
                <div className="mt-4 pt-4 border-t border-cream-200" onClick={e => e.stopPropagation()}>
                  <Textarea value={replyText} onChange={e => setReplyText(e.target.value)} rows={4}
                    placeholder={`Reply to ${m.name}…`} className="mb-2"/>
                  <div className="flex justify-end gap-2">
                    <CancelBtn onClick={() => setReplyId(null)}/>
                    <button onClick={() => sendReply(m)} disabled={sending}
                      className="flex items-center gap-1.5 px-4 py-2 bg-forest-700 text-cream-50 text-sm rounded-lg hover:bg-forest-600 font-body transition-colors disabled:opacity-60">
                      {sending?<Spin size={13}/>:<Send size={13}/>}{sending?'Sending…':'Send'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   NEWSLETTER
═══════════════════════════════════════════════════════════ */
function NewsletterSection({ toast }) {
  const [tab, setTab]             = useState('subscribers');
  const [subs, setSubs]           = useState([]);
  const [loading, setLoading]     = useState(true);
  const [subject, setSubject]     = useState('');
  const [body, setBody]           = useState('');
  const [sending, setSending]     = useState(false);

  useEffect(() => {
    GET('/newsletter/admin/subscribers')
      .then(d => setSubs(d.subscribers||d.data||[]))
      .catch(() => toast('Failed to load subscribers'))
      .finally(() => setLoading(false));
  }, []);

  const send = async () => {
    if (!subject||!body) { toast('Subject and message required'); return; }
    setSending(true);
    try {
      const res = await POST('/newsletter/admin/send', { subject, body });
      toast(`Newsletter sent to ${res.sentCount||subs.filter(s=>s.active!==false).length} subscribers!`);
      setSubject(''); setBody('');
    } catch(e) { toast(e.message); }
    finally { setSending(false); }
  };

  const activeCount = subs.filter(s => s.active !== false && s.isActive !== false).length;

  return (
    <div>
      <SectionHeader title="Newsletter" subtitle={`${subs.length} subscribers · ${activeCount} active`}/>
      <div className="flex gap-2 mb-5">
        {['subscribers','broadcast'].map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2 text-sm font-body rounded-lg capitalize transition-colors ${tab===t?'bg-forest-700 text-cream-50':'border border-cream-300 hover:bg-cream-50'}`}>{t}</button>
        ))}
      </div>

      {tab==='subscribers' ? (
        loading ? <PageLoader/> : (
          <div className="bg-white rounded-2xl border border-cream-300 overflow-hidden">
            <table className="w-full text-sm font-body">
              <thead className="bg-cream-50 border-b border-cream-200">
                <tr>{['Email','Joined','Status'].map(h=>(
                  <th key={h} className="px-4 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wide">{h}</th>
                ))}</tr>
              </thead>
              <tbody className="divide-y divide-cream-100">
                {subs.map(s => (
                  <tr key={s._id||s.email} className="hover:bg-cream-50 transition-colors">
                    <td className="px-4 py-3 text-ink-DEFAULT">{s.email}</td>
                    <td className="px-4 py-3 text-ink-muted">{fmtDate(s.createdAt)}</td>
                    <td className="px-4 py-3"><Badge status={s.active!==false&&s.isActive!==false?'active':'inactive'}/></td>
                  </tr>
                ))}
              </tbody>
            </table>
            {subs.length===0 && <EmptyState icon={Rss} title="No subscribers" body="No one has subscribed yet."/>}
          </div>
        )
      ) : (
        <div className="bg-white rounded-2xl border border-cream-300 p-6 space-y-4">
          <p className="text-sm font-body text-ink-muted">Sending to <strong className="text-ink-DEFAULT">{activeCount} active subscribers</strong></p>
          <Field label="Subject"><Input value={subject} onChange={e=>setSubject(e.target.value)} placeholder="GNAAP Newsletter — May 2025"/></Field>
          <Field label="Message"><Textarea rows={8} value={body} onChange={e=>setBody(e.target.value)} placeholder="Write your newsletter content…"/></Field>
          <div className="flex justify-end">
            <button onClick={send} disabled={sending}
              className="flex items-center gap-2 px-5 py-2.5 bg-forest-700 text-cream-50 text-sm font-body rounded-lg hover:bg-forest-600 transition-colors disabled:opacity-60">
              {sending?<Spin size={14}/>:<Send size={14}/>}{sending?'Sending…':'Send Newsletter'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   ADMINS
═══════════════════════════════════════════════════════════ */
function AdminsSection({ toast, setConfirm }) {
  const [items, setItems]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm]       = useState({ name:'', email:'', password:'' });
  const [creating, setCreating] = useState(false);

  const load = useCallback(() => {
    setLoading(true);
    GET('/admin/list')
      .then(d => setItems(d.admins||d.data||[]))
      .catch(() => toast('Failed to load admins'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  const create = async (e) => {
    e.preventDefault(); setCreating(true);
    try {
      await POST('/admin/create', form);
      toast('Admin created!'); setShowForm(false); setForm({name:'',email:'',password:''}); load();
    } catch(e) { toast(e.message); }
    finally { setCreating(false); }
  };

  const del = (a) => setConfirm({
    msg: `Delete admin "${a.name}"?`,
    fn: async () => { try { await DEL(`/admin/${id(a)}`); toast('Admin deleted'); load(); } catch(e){ toast(e.message); } },
  });

  return (
    <div>
      <SectionHeader title="Admin Accounts" subtitle="Superadmin access required" action={showForm?'Cancel':'Create Admin'} onAction={() => setShowForm(p=>!p)}/>

      {showForm && (
        <form onSubmit={create} className="bg-white rounded-2xl border border-cream-300 p-6 mb-5 space-y-4">
          <p className="font-display text-base font-semibold text-forest-800">New Admin Account</p>
          <Field label="Full Name"><Input required value={form.name} onChange={e=>setForm(p=>({...p,name:e.target.value}))} placeholder="Ama Nyarko"/></Field>
          <Field label="Email"><Input required type="email" value={form.email} onChange={e=>setForm(p=>({...p,email:e.target.value}))} placeholder="ama@gnaap.org"/></Field>
          <Field label="Temporary Password"><Input required type="password" value={form.password} onChange={e=>setForm(p=>({...p,password:e.target.value}))} placeholder="Min. 8 characters"/></Field>
          <div className="flex gap-3 justify-end">
            <CancelBtn onClick={() => setShowForm(false)}/>
            <SaveBtn loading={creating} label="Create Admin"/>
          </div>
        </form>
      )}

      {loading ? <PageLoader/> : (
        <div className="space-y-3">
          {items.map(a => (
            <div key={id(a)} className="bg-white rounded-2xl border border-cream-300 p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-forest-700 flex items-center justify-center text-sm font-bold text-cream-50 flex-shrink-0">{initials(a.name)}</div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-ink-DEFAULT font-body">{a.name}</p>
                    <Badge status={a.role}/>
                  </div>
                  <div className="flex items-center gap-3 mt-0.5 text-xs text-ink-muted font-body">
                    <span>{a.email}</span>
                    <span className="flex items-center gap-1"><Clock size={10}/>Last: {a.lastLogin?fmtDate(a.lastLogin):'Never'}</span>
                  </div>
                </div>
              </div>
              {a.role !== 'superadmin' && (
                <button onClick={() => del(a)} className="p-1.5 text-ink-light hover:text-red-600 transition-colors"><Trash2 size={15}/></button>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 bg-forest-50 border border-forest-200 rounded-2xl p-5">
        <p className="text-sm font-display font-semibold text-forest-800 mb-1 flex items-center gap-2"><ShieldCheck size={15}/>Security</p>
        <p className="text-xs font-body text-forest-700">Only superadmins can create or delete admin accounts. All actions are logged. Use strong passwords and rotate them regularly.</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   LOGIN SCREEN
═══════════════════════════════════════════════════════════ */
function LoginScreen({ onLogin }) {
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [loading,  setLoading]  = useState(false);
  const [err,      setErr]      = useState('');

  const submit = async (e) => {
    e?.preventDefault();
    if (!email||!password) { setErr('Email and password required'); return; }
    setLoading(true); setErr('');
    try {
      const res  = await fetch(`${BASE}/auth/admin/login`, {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message||'Login failed');
      const jwt = data.token||data.data?.token||data.accessToken;
      if (!jwt) throw new Error('No token in response — check backend login response');
      localStorage.setItem('adminToken', jwt);
      onLogin(data.admin||data.data?.admin||{ email });
    } catch(e) { setErr(e.message); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-forest-900 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gold-500 flex items-center justify-center mx-auto mb-4 shadow-lg">
            <BookMarked size={24} className="text-forest-900"/>
          </div>
          <h1 className="font-display text-3xl font-bold text-cream-50">GNAAP</h1>
          <p className="text-cream-400 text-sm font-body mt-1">Ghana National Authors & Publishers</p>
        </div>
        <form onSubmit={submit} className="bg-white rounded-2xl shadow-2xl p-8 space-y-4">
          {err && (
            <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl px-3 py-3">
              <AlertCircle size={14} className="text-red-500 flex-shrink-0 mt-0.5"/>
              <p className="text-sm font-body text-red-700">{err}</p>
            </div>
          )}
          <Field label="Email">
            <Input type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="superadmin@gnaap.org"/>
          </Field>
          <Field label="Password">
            <Input type="password" required value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••"/>
          </Field>
          <button type="submit" disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-2.5 bg-forest-700 hover:bg-forest-600 text-cream-50 text-sm font-medium rounded-lg transition-colors disabled:opacity-60 mt-2 font-body">
            {loading && <Spin size={14} cls="text-cream-200"/>}{loading?'Signing in…':'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   NAV + ROOT
═══════════════════════════════════════════════════════════ */
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

export default function AdminPage() {
  const [mounted,     setMounted]     = useState(false);
  const [loggedIn,    setLoggedIn]    = useState(false);
  const [adminUser,   setAdminUser]   = useState(null);
  const [section,     setSection]     = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [toastMsg,    setToastMsg]    = useState('');
  const [confirm,     setConfirm]     = useState(null);

  useEffect(() => {
    setMounted(true);
    if (getToken()) setLoggedIn(true);
  }, []);

  const toast = (msg) => { setToastMsg(msg); setTimeout(() => setToastMsg(''), 3500); };

  const handleLogin  = (admin) => { setAdminUser(admin); setLoggedIn(true); };
  const handleLogout = () => { localStorage.removeItem('adminToken'); setLoggedIn(false); setAdminUser(null); };

  if (!mounted) return <div className="h-screen bg-cream-100"/>;
  if (!loggedIn) return <LoginScreen onLogin={handleLogin}/>;

  const props = { toast, setConfirm };

  const VIEWS = {
    dashboard:    <Dashboard    {...props}/>,
    news:         <NewsSection  {...props}/>,
    members:      <MembersSection {...props}/>,
    applications: <ApplicationsSection {...props}/>,
    books:        <BooksSection {...props}/>,
    orders:       <OrdersSection {...props}/>,
    events:       <EventsSection {...props}/>,
    contact:      <ContactSection {...props}/>,
    newsletter:   <NewsletterSection {...props}/>,
    admins:       <AdminsSection {...props}/>,
  };

  return (
    <div className="flex h-screen bg-cream-100 font-body overflow-hidden">

      {/* SIDEBAR */}
      <aside className={`flex-shrink-0 flex flex-col bg-forest-900 text-cream-200 transition-all duration-300 ${sidebarOpen?'w-60':'w-16'} overflow-hidden`}>
        <div className="flex items-center gap-3 px-4 py-5 border-b border-forest-700">
          <div className="w-8 h-8 rounded-lg bg-gold-500 flex items-center justify-center flex-shrink-0">
            <BookMarked size={15} className="text-forest-900"/>
          </div>
          {sidebarOpen && (
            <div className="min-w-0">
              <p className="font-display text-sm font-bold text-cream-50">GNAAP</p>
              <p className="text-xs text-cream-400 truncate">Admin Panel</p>
            </div>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto py-3 space-y-0.5 px-2">
          {NAV.map(n => (
            <button key={n.id} onClick={() => setSection(n.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                section===n.id?'bg-gold-500 text-forest-900 font-medium':'text-cream-400 hover:bg-forest-700 hover:text-cream-100'
              }`}>
              <n.icon size={16} className="flex-shrink-0"/>
              {sidebarOpen && <span className="truncate">{n.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-forest-700 space-y-1">
          <div className={`flex items-center gap-3 px-3 py-2 ${!sidebarOpen?'justify-center':''}`}>
            <div className="w-7 h-7 rounded-full bg-gold-500 flex items-center justify-center text-xs font-bold text-forest-900 flex-shrink-0">
              {initials(adminUser?.name||'SA')}
            </div>
            {sidebarOpen && (
              <div className="min-w-0">
                <p className="text-xs font-medium text-cream-100 truncate">{adminUser?.name||'Admin'}</p>
                <p className="text-xs text-cream-500 truncate">{adminUser?.email||''}</p>
              </div>
            )}
          </div>
          <button onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-cream-500 hover:text-cream-200 hover:bg-forest-700 transition-all ${!sidebarOpen?'justify-center':''}`}>
            <LogOut size={14} className="flex-shrink-0"/>
            {sidebarOpen && 'Sign Out'}
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="flex items-center gap-4 px-6 py-3.5 bg-white border-b border-cream-200 flex-shrink-0">
          <button onClick={() => setSidebarOpen(p=>!p)} className="p-1.5 rounded-lg hover:bg-cream-100 text-ink-muted transition-colors">
            <Menu size={17}/>
          </button>
          <div className="relative flex-1 max-w-md">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-light"/>
            <input placeholder="Search anything…" className="w-full pl-9 pr-4 py-2 bg-cream-50 border border-cream-200 rounded-xl text-sm font-body focus:outline-none focus:border-gold-400 transition-colors"/>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <button className="relative p-2 rounded-xl hover:bg-cream-100 text-ink-muted transition-colors">
              <Bell size={16}/>
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-red-500"/>
            </button>
            <div className="w-7 h-7 rounded-full bg-gold-200 flex items-center justify-center text-xs font-bold text-gold-800">
              {initials(adminUser?.name||'SA')}
            </div>
          </div>
        </header>

        <div className="flex items-center gap-2 px-6 py-2 bg-cream-50 border-b border-cream-200 text-xs font-body text-ink-muted flex-shrink-0">
          <span>Admin</span><ChevronRight size={11}/><span className="capitalize text-ink-DEFAULT font-medium">{section}</span>
        </div>

        <main className="flex-1 overflow-y-auto p-6">{VIEWS[section]}</main>
      </div>

      <Toast msg={toastMsg} onClose={() => setToastMsg('')}/>
      <ConfirmModal msg={confirm?.msg} onConfirm={() => { confirm?.fn(); setConfirm(null); }} onCancel={() => setConfirm(null)}/>
    </div>
  );
}