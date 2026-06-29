"use client";
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, FolderKanban, FileText, Users, LogOut, 
  Send, Plus, Trash2, CheckCircle2, AlertCircle, ShieldAlert,
  Activity, ArrowLeft, UploadCloud, Edit3
} from 'lucide-react';

export default function AdminDashboardPortal() {
  const { token, userRole, logout, loading } = useAuth();
  const router = useRouter();
  
  // Dashboard Core States
  const [activeTab, setActiveTab] = useState(''); 
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'editor'
  const [status, setStatus] = useState({ type: '', text: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Data Fetching States
  const [projectsList, setProjectsList] = useState([]);
  const [blogsList, setBlogsList] = useState([]);

  // Form States
  const [projectForm, setProjectForm] = useState({ title: '', category: 'process-safety', location: '', duration: '', scope_of_work: '', image_url: '' });
  const [impacts, setImpacts] = useState(['']);
  const [blogForm, setBlogForm] = useState({ title: '', slug: '', excerpt: '', content: '', cover_img: '' });
  const [userForm, setUserForm] = useState({ username: '', email: '', password: '', role: 'ADMIN' });

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  // Role-Based Initialization
  useEffect(() => {
    if (!loading && !token) router.replace('/');
    if (!loading && token && activeTab === '') {
      // Admins skip overview and go straight to content
      if (userRole === 'ADMIN') setActiveTab('projects');
      else setActiveTab('overview');
    }
  }, [token, loading, userRole, activeTab, router]);

  // Fetch Data for Grids
  useEffect(() => {
    if (activeTab === 'projects' && viewMode === 'grid') {
      fetch(`${API_BASE}/api/projects`).then(r => r.json()).then(setProjectsList).catch(console.error);
    }
    if (activeTab === 'blogs' && viewMode === 'grid') {
      fetch(`${API_BASE}/api/blogs`).then(r => r.json()).then(setBlogsList).catch(console.error);
    }
  }, [activeTab, viewMode]);

  if (loading || !token || !activeTab) {
    return (
      <div className="min-h-screen bg-[#0a1628] flex flex-col items-center justify-center space-y-4">
        <Activity className="w-8 h-8 text-[#1db87a] animate-pulse" />
        <span className="font-mono text-[10px] text-[#1db87a] tracking-widest uppercase animate-pulse">Establishing Secure Tunnel...</span>
      </div>
    );
  }

  // ─── MEDIA UPLOAD HANDLER ───
  const handleFileUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      setStatus({ type: 'success', text: 'Uploading media to local server...' });
      const res = await fetch(`${API_BASE}/api/upload`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });
      const data = await res.json();
      
      if (type === 'project') setProjectForm(prev => ({ ...prev, image_url: data.url }));
      if (type === 'blog') setBlogForm(prev => ({ ...prev, cover_img: data.url }));
      
      setStatus({ type: 'success', text: 'Media uploaded successfully.' });
      setTimeout(() => setStatus({ type: '', text: '' }), 3000);
    } catch (err) {
      setStatus({ type: 'error', text: 'Failed to upload media.' });
    }
  };

  // ─── SUBMISSION HANDLER ───
  const handleActionSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', text: '' });
    
    let endpoint = activeTab === 'projects' ? '/api/projects' : activeTab === 'blogs' ? '/api/blogs' : '/api/admin/users';
    let bodyPayload = activeTab === 'projects' ? { ...projectForm, impacts: impacts.filter(i => i.trim() !== '') } : activeTab === 'blogs' ? blogForm : userForm;

    try {
      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(bodyPayload)
      });
      if (!res.ok) throw new Error('Authorization or Payload Validation Failed.');

      setStatus({ type: 'success', text: `Transaction committed successfully.` });
      
      // Reset and go back to grid
      if (activeTab === 'projects') { setProjectForm({ title: '', category: 'process-safety', location: '', duration: '', scope_of_work: '', image_url: '' }); setImpacts(['']); }
      if (activeTab === 'blogs') { setBlogForm({ title: '', slug: '', excerpt: '', content: '', cover_img: '' }); }
      if (activeTab === 'users') { setUserForm({ username: '', email: '', password: '', role: 'ADMIN' }); }
      
      setViewMode('grid');
    } catch (err) {
      setStatus({ type: 'error', text: err.message });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setStatus({ type: '', text: '' }), 5000);
    }
  };

  // ─── SIDEBAR BUILDER ───
  const SIDEBAR_NAV = [];
  if (userRole === 'IT_MANAGER' || userRole === 'IT_EXECUTIVE') {
    SIDEBAR_NAV.push({ id: 'overview', label: 'System Overview', icon: LayoutDashboard });
  }
  SIDEBAR_NAV.push(
    { id: 'projects', label: 'Manage Projects', icon: FolderKanban },
    { id: 'blogs', label: 'Manage Publications', icon: FileText }
  );
  if (userRole === 'IT_MANAGER') {
    SIDEBAR_NAV.push({ id: 'users', label: 'Access Control', icon: Users });
  }

  return (
    <main className="min-h-screen bg-slate-50 flex font-sans overflow-hidden">
      
      {/* ─── LEFT SIDEBAR ─── */}
      <aside className="w-72 bg-[#0a1628] text-white flex flex-col shrink-0 border-r border-[#1db87a]/20 shadow-2xl z-20">
        <div className="h-20 flex items-center px-8 border-b border-white/5">
          <span className="font-sans font-black text-xl tracking-tight">aarvi<span className="text-[#1db87a]">.</span><span className="text-slate-500 text-sm tracking-normal"> OS</span></span>
        </div>
        <div className="p-8 pb-4">
          <div className="text-[9px] font-mono font-black tracking-widest text-slate-500 uppercase mb-1">Active Session</div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#1db87a]/20 border border-[#1db87a]/50 flex items-center justify-center text-[#1db87a]"><ShieldAlert className="w-4 h-4" /></div>
            <div>
              <div className="text-sm font-bold leading-none mb-1">{userRole}</div>
              <div className="text-[10px] font-mono text-[#1db87a]">Authenticated</div>
            </div>
          </div>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          {SIDEBAR_NAV.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setViewMode('grid'); setStatus({type:'',text:''}); }}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-xs font-bold font-mono tracking-wider uppercase transition-all duration-200 cursor-pointer ${isActive ? 'bg-[#1db87a] text-[#0a1628] shadow-lg translate-x-1' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
              >
                <Icon className="w-4 h-4 shrink-0" strokeWidth={isActive ? 2.5 : 2} /> {item.label}
              </button>
            );
          })}
        </nav>
        <div className="p-4 border-t border-white/5">
          <button onClick={logout} className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-bold font-mono tracking-wider uppercase text-rose-400 hover:bg-rose-500/10 transition-all cursor-pointer">
            <LogOut className="w-4 h-4" /> Terminate
          </button>
        </div>
      </aside>

      {/* ─── MAIN CONTENT AREA ─── */}
      <section className="flex-1 h-screen overflow-y-auto relative bg-slate-50">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(15,47,110,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(15,47,110,0.02)_1px,transparent_1px)] bg-size-[32px_32px] pointer-events-none z-0" />

        <div className="max-w-5xl mx-auto px-8 lg:px-12 py-12 relative z-10">
          <header className="mb-8 flex justify-between items-end">
            <div>
              <span className="text-[#1db87a] font-mono text-[10px] font-black tracking-[0.2em] uppercase block mb-2">Corporate Governance Engine</span>
              <h1 className="text-3xl font-black text-[#0a1628] uppercase tracking-tight">{SIDEBAR_NAV.find(n => n.id === activeTab)?.label}</h1>
            </div>
            
            {/* Grid vs Editor Action Button */}
            {activeTab !== 'overview' && activeTab !== 'users' && (
              viewMode === 'grid' ? (
                <button onClick={() => setViewMode('editor')} className="bg-[#0a1628] text-white text-xs font-mono font-bold uppercase tracking-widest px-6 py-3 rounded-lg hover:bg-[#1db87a] transition-all flex items-center gap-2 cursor-pointer shadow-md">
                  <Plus className="w-4 h-4" /> Add New Entry
                </button>
              ) : (
                <button onClick={() => setViewMode('grid')} className="bg-white border border-slate-200 text-slate-700 text-xs font-mono font-bold uppercase tracking-widest px-6 py-3 rounded-lg hover:bg-slate-50 transition-all flex items-center gap-2 cursor-pointer">
                  <ArrowLeft className="w-4 h-4" /> Return to List
                </button>
              )
            )}
          </header>

          {status.text && (
            <div className={`mb-8 p-4 rounded-xl flex items-start gap-3 border shadow-sm ${status.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-rose-50 border-rose-200 text-rose-800'}`}>
              {status.type === 'success' ? <CheckCircle2 className="w-5 h-5 shrink-0 text-[#1db87a] mt-0.5" /> : <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />}
              <span className="text-xs font-bold font-mono uppercase tracking-wide leading-relaxed">{status.text}</span>
            </div>
          )}

          {/* ─── OVERVIEW TAB ─── */}
          {activeTab === 'overview' && (
            <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
               <h3 className="text-lg font-black text-[#0a1628] mb-4">Analytics & System Health</h3>
               <p className="text-sm text-slate-600">The Analytics UI embedded here will be active once Google Looker Studio is linked.</p>
            </div>
          )}

          {/* ─── PROJECTS TAB ─── */}
          {activeTab === 'projects' && (
            <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
              {viewMode === 'grid' ? (
                <div className="space-y-4">
                  {projectsList.length === 0 ? (
                    <div className="text-sm text-slate-500 font-medium">No projects in database. Click "Add New Entry" to begin.</div>
                  ) : (
                    projectsList.map(proj => (
                      <div key={proj.id} className="flex items-center justify-between p-4 border border-slate-100 bg-slate-50 rounded-xl hover:shadow-md transition-shadow">
                        <div>
                          <div className="text-[10px] font-mono text-[#1db87a] uppercase font-bold tracking-wider mb-1">{proj.category}</div>
                          <div className="text-sm font-black text-[#0a1628]">{proj.title}</div>
                        </div>
                        <button className="text-slate-400 hover:text-[#0a1628] cursor-pointer"><Edit3 className="w-4 h-4" /></button>
                      </div>
                    ))
                  )}
                </div>
              ) : (
                <form onSubmit={handleActionSubmit} className="space-y-6 animate-in fade-in">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2 space-y-1">
                      <label className="text-[10px] font-black tracking-widest text-slate-400 uppercase font-mono">Project Title</label>
                      <input required type="text" value={projectForm.title} onChange={e => setProjectForm({...projectForm, title: e.target.value})} className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:border-[#1db87a] outline-none" />
                    </div>
                    
                    {/* Media Upload Box */}
                    <div className="md:col-span-2 space-y-1">
                      <label className="text-[10px] font-black tracking-widest text-slate-400 uppercase font-mono">Cover Media</label>
                      <div className="w-full border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center bg-slate-50 relative overflow-hidden group hover:border-[#1db87a] transition-colors">
                        <input type="file" accept="image/*,video/*" onChange={(e) => handleFileUpload(e, 'project')} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                        <UploadCloud className="w-6 h-6 text-slate-400 mb-2 group-hover:text-[#1db87a] transition-colors" />
                        <div className="text-xs font-bold text-slate-600">{projectForm.image_url ? 'Media Uploaded Successfully (Click to replace)' : 'Click or drag file to upload server media'}</div>
                        {projectForm.image_url && <div className="text-[9px] font-mono text-[#1db87a] mt-1">{projectForm.image_url}</div>}
                      </div>
                    </div>

                    <div className="space-y-1"><label className="text-[10px] font-black tracking-widest text-slate-400 uppercase font-mono">Stream Category</label>
                    <select value={projectForm.category} onChange={e => setProjectForm({...projectForm, category: e.target.value})} className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm bg-white font-bold text-slate-700 outline-none focus:border-[#1db87a]"><option value="process-safety">Process Safety Engineering</option><option value="pipelines">Pipeline Hydraulics</option></select></div>
                    <div className="space-y-1"><label className="text-[10px] font-black tracking-widest text-slate-400 uppercase font-mono">Location</label>
                    <input required type="text" value={projectForm.location} onChange={e => setProjectForm({...projectForm, location: e.target.value})} className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:border-[#1db87a] outline-none" /></div>
                    <div className="space-y-1"><label className="text-[10px] font-black tracking-widest text-slate-400 uppercase font-mono">Duration</label>
                    <input required type="text" value={projectForm.duration} onChange={e => setProjectForm({...projectForm, duration: e.target.value})} className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:border-[#1db87a] outline-none" /></div>
                    <div className="md:col-span-2 space-y-1"><label className="text-[10px] font-black tracking-widest text-slate-400 uppercase font-mono">Scope Matrix</label>
                    <textarea required rows={4} value={projectForm.scope_of_work} onChange={e => setProjectForm({...projectForm, scope_of_work: e.target.value})} className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:border-[#1db87a] outline-none" /></div>
                    
                    <div className="md:col-span-2 space-y-3 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                      <div className="flex justify-between items-center mb-2"><label className="text-[10px] font-black tracking-widest text-slate-500 uppercase font-mono">Impacts</label><button type="button" onClick={() => setImpacts([...impacts, ''])} className="text-[10px] font-mono font-black text-[#1db87a] flex items-center gap-1"><Plus className="w-3 h-3" /> Append Node</button></div>
                      {impacts.map((imp, idx) => (
                        <div key={idx} className="flex gap-2">
                          <input required type="text" value={imp} onChange={e => { let c = [...impacts]; c[idx] = e.target.value; setImpacts(c); }} className="flex-1 px-4 py-2 border border-slate-200 rounded-xl text-xs outline-none" />
                          {impacts.length > 1 && <button type="button" onClick={() => setImpacts(impacts.filter((_, i) => i !== idx))} className="text-slate-400 hover:text-rose-500"><Trash2 className="w-4 h-4" /></button>}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="pt-4 flex justify-end"><SubmitButton isSubmitting={isSubmitting} /></div>
                </form>
              )}
            </div>
          )}

          {/* ─── BLOGS TAB ─── */}
          {activeTab === 'blogs' && (
            <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
              {viewMode === 'grid' ? (
                <div className="space-y-4">
                  {blogsList.length === 0 ? (
                    <div className="text-sm text-slate-500 font-medium">No publications found.</div>
                  ) : (
                    blogsList.map(blog => (
                      <div key={blog.id} className="flex items-center justify-between p-4 border border-slate-100 bg-slate-50 rounded-xl hover:shadow-md">
                        <div>
                          <div className="text-sm font-black text-[#0a1628]">{blog.title}</div>
                          <div className="text-[10px] font-mono text-slate-400">/{blog.slug}</div>
                        </div>
                        <button className="text-slate-400 hover:text-[#0a1628]"><Edit3 className="w-4 h-4" /></button>
                      </div>
                    ))
                  )}
                </div>
              ) : (
                <form onSubmit={handleActionSubmit} className="space-y-6 animate-in fade-in">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1"><label className="text-[10px] font-black tracking-widest text-slate-400 uppercase font-mono">Header</label><input required type="text" value={blogForm.title} onChange={e => setBlogForm({...blogForm, title: e.target.value})} className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#1db87a]" /></div>
                    <div className="space-y-1"><label className="text-[10px] font-black tracking-widest text-slate-400 uppercase font-mono">Slug</label><input required type="text" value={blogForm.slug} onChange={e => setBlogForm({...blogForm, slug: e.target.value.toLowerCase().replace(/ /g, '-')})} className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#1db87a]" /></div>
                    
                    <div className="md:col-span-2 space-y-1">
                      <label className="text-[10px] font-black tracking-widest text-slate-400 uppercase font-mono">Cover Image</label>
                      <div className="w-full border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center bg-slate-50 relative overflow-hidden group hover:border-[#1db87a] transition-colors">
                        <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'blog')} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                        <UploadCloud className="w-6 h-6 text-slate-400 mb-2 group-hover:text-[#1db87a] transition-colors" />
                        <div className="text-xs font-bold text-slate-600">{blogForm.cover_img ? 'Image Attached' : 'Click or drag file to upload'}</div>
                      </div>
                    </div>

                    <div className="md:col-span-2 space-y-1"><label className="text-[10px] font-black tracking-widest text-slate-400 uppercase font-mono">Excerpt</label><input required type="text" value={blogForm.excerpt} onChange={e => setBlogForm({...blogForm, excerpt: e.target.value})} className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#1db87a]" /></div>
                    <div className="md:col-span-2 space-y-1"><label className="text-[10px] font-black tracking-widest text-slate-400 uppercase font-mono">HTML Body</label><textarea required rows={10} value={blogForm.content} onChange={e => setBlogForm({...blogForm, content: e.target.value})} className="w-full px-4 py-3 border border-slate-200 rounded-xl text-xs font-mono outline-none focus:border-[#1db87a]" /></div>
                  </div>
                  <div className="pt-4 flex justify-end"><SubmitButton isSubmitting={isSubmitting} /></div>
                </form>
              )}
            </div>
          )}

          {/* ─── USERS TAB ─── */}
          {activeTab === 'users' && userRole === 'IT_MANAGER' && (
             <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
                <form onSubmit={handleActionSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1"><label className="text-[10px] font-black tracking-widest text-slate-400 uppercase font-mono">Username</label><input required type="text" value={userForm.username} onChange={e => setUserForm({...userForm, username: e.target.value.trim().toLowerCase()})} className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#1db87a]" /></div>
                    <div className="space-y-1"><label className="text-[10px] font-black tracking-widest text-slate-400 uppercase font-mono">Email</label><input required type="email" value={userForm.email} onChange={e => setUserForm({...userForm, email: e.target.value.trim()})} className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#1db87a]" /></div>
                    <div className="space-y-1"><label className="text-[10px] font-black tracking-widest text-slate-400 uppercase font-mono">Password</label><input required type="password" value={userForm.password} onChange={e => setUserForm({...userForm, password: e.target.value})} className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#1db87a] font-mono" /></div>
                    <div className="space-y-1"><label className="text-[10px] font-black tracking-widest text-slate-400 uppercase font-mono">Role</label>
                      <select value={userForm.role} onChange={e => setUserForm({...userForm, role: e.target.value})} className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#1db87a] bg-white">
                        <option value="ADMIN">ADMIN</option><option value="IT_EXECUTIVE">IT_EXECUTIVE</option><option value="IT_MANAGER">IT_MANAGER</option>
                      </select>
                    </div>
                  </div>
                  <div className="pt-4 flex justify-end"><SubmitButton isSubmitting={isSubmitting} /></div>
                </form>
             </div>
          )}

        </div>
      </section>
    </main>
  );
}

function SubmitButton({ isSubmitting }) {
  return (
    <button type="submit" disabled={isSubmitting} className="bg-[#0a1628] text-white text-xs font-mono font-bold uppercase tracking-widest px-8 py-4 rounded-xl hover:bg-[#1db87a] hover:text-[#0a1628] transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50">
      {isSubmitting ? 'Executing...' : 'Commit Payload'} <Send className="w-3.5 h-3.5" />
    </button>
  );
}