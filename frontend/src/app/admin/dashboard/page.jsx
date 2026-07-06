"use client";
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, FolderKanban, FileText, Users, LogOut, 
  Send, Plus, Trash2, CheckCircle2, AlertCircle, ShieldAlert,
  Activity, ArrowLeft, UploadCloud, Edit3, Inbox
} from 'lucide-react';

export default function AdminDashboardPortal() {
  const { token, userRole, logout, loading } = useAuth();
  const router = useRouter();
  
  // Dashboard Core States
  const [activeTab, setActiveTab] = useState(''); 
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'editor'
  const [status, setStatus] = useState({ type: '', text: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Data Fetching States
  const [projectsList, setProjectsList] = useState([]);
  const [blogsList, setBlogsList] = useState([]);
  const [inquiriesList, setInquiriesList] = useState([]); // Contact Forms
  const [usersList, setUsersList] = useState([]);         // System Users

  // Form States
  const [projectForm, setProjectForm] = useState({ title: '', category: 'process-safety', location: '', duration: '', scope_of_work: '', image_url: '' });
  const [impacts, setImpacts] = useState(['']);
  const [blogForm, setBlogForm] = useState({ title: '', slug: '', excerpt: '', content: '', cover_img: '' });
  const [userForm, setUserForm] = useState({ username: '', email: '', password: '', role: 'ADMIN' });

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  // ─── ROLE-BASED INITIALIZATION ───
  useEffect(() => {
    if (!loading && !token) {
      router.replace('/');
      return;
    }
    if (!loading && token && activeTab === '') {
      setTimeout(() => {
        if (userRole === 'IT_MANAGER' || userRole === 'IT_EXECUTIVE') setActiveTab('overview');
        else setActiveTab('projects'); // ADMIN default
      }, 0);
    }
  }, [token, loading, userRole, activeTab, router]);

  // ─── FETCH DATA FOR GRIDS (HARDENED) ───
  useEffect(() => {
    const fetchToken = token?.access_token || token;
    
    if (activeTab === 'projects' && viewMode === 'grid') {
      fetch(`${API_BASE}/api/projects`)
        .then(r => r.json())
        .then(data => setProjectsList(Array.isArray(data) ? data : []))
        .catch(err => { console.error(err); setProjectsList([]); });
    }
    if (activeTab === 'blogs' && viewMode === 'grid') {
      fetch(`${API_BASE}/api/blogs`)
        .then(r => r.json())
        .then(data => setBlogsList(Array.isArray(data) ? data : []))
        .catch(err => { console.error(err); setBlogsList([]); });
    }
    if (activeTab === 'inquiries' && viewMode === 'grid') {
      fetch(`${API_BASE}/api/contact`, {
        headers: { 'Authorization': `Bearer ${fetchToken}` }
      })
        .then(r => r.json())
        .then(data => setInquiriesList(Array.isArray(data) ? data : []))
        .catch(err => { console.error(err); setInquiriesList([]); });
    }
    if (activeTab === 'users' && viewMode === 'grid' && userRole === 'IT_MANAGER') {
      fetch(`${API_BASE}/api/admin/users`, {
        headers: { 'Authorization': `Bearer ${fetchToken}` }
      })
        .then(r => r.json())
        .then(data => setUsersList(Array.isArray(data) ? data : []))
        .catch(err => { console.error(err); setUsersList([]); });
    }
  }, [activeTab, viewMode, API_BASE, token, userRole]);

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
    const fetchToken = token?.access_token || token;

    try {
      setStatus({ type: 'success', text: 'Uploading media to local server...' });
      const res = await fetch(`${API_BASE}/api/upload`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${fetchToken}` },
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

  // ─── UI CONTROLLERS (ADD / EDIT) ───
  const handleAddNew = () => {
    setEditingId(null);
    if (activeTab === 'projects') { setProjectForm({ title: '', category: 'process-safety', location: '', duration: '', scope_of_work: '', image_url: '' }); setImpacts(['']); }
    if (activeTab === 'blogs') { setBlogForm({ title: '', slug: '', excerpt: '', content: '', cover_img: '' }); }
    if (activeTab === 'users') { setUserForm({ username: '', email: '', password: '', role: 'ADMIN' }); }
    setViewMode('editor');
  };

  const handleEditItem = (type, item) => {
    setEditingId(item.id);
    if (type === 'project') { setProjectForm(item); setImpacts(item.impacts || ['']); }
    if (type === 'blog') setBlogForm(item);
    if (type === 'user') setUserForm({ username: item.username, email: item.email, role: item.role, password: '' });
    setViewMode('editor');
  };

  // ─── DELETE USER HANDLER ───
  const handleDeleteUser = async (userId) => {
    if (!window.confirm("CRITICAL WARNING: Are you sure you want to permanently delete this user?")) return;
    
    setStatus({ type: '', text: '' });
    const fetchToken = token?.access_token || token;

    try {
      const res = await fetch(`${API_BASE}/api/admin/users/${userId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${fetchToken}` }
      });
      if (!res.ok) throw new Error('Failed to delete user.');

      setStatus({ type: 'success', text: 'User permanently removed from system.' });
      setUsersList(usersList.filter(u => u.id !== userId));
    } catch (err) {
      setStatus({ type: 'error', text: err.message });
    } finally {
      setTimeout(() => setStatus({ type: '', text: '' }), 5000);
    }
  };

  // ─── SUBMISSION HANDLER ───
  const handleActionSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', text: '' });
    
    let endpoint = '';
    const method = editingId ? 'PUT' : 'POST';
    const fetchToken = token?.access_token || token;
    
    if (activeTab === 'projects') endpoint = editingId ? `/api/projects/${editingId}` : '/api/projects';
    if (activeTab === 'blogs') endpoint = editingId ? `/api/blogs/${editingId}` : '/api/blogs';
    if (activeTab === 'users') endpoint = editingId ? `/api/admin/users/${editingId}` : '/api/admin/users';

    let bodyPayload = {};
    if (activeTab === 'projects') bodyPayload = { ...projectForm, impacts: impacts.filter(i => i.trim() !== '') };
    if (activeTab === 'blogs') bodyPayload = blogForm;
    if (activeTab === 'users') {
      bodyPayload = { ...userForm };
      if (editingId && !bodyPayload.password) delete bodyPayload.password;
    }

    try {
      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: method,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${fetchToken}` },
        body: JSON.stringify(bodyPayload)
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || 'Authorization or Payload Validation Failed.');
      }

      setStatus({ type: 'success', text: `Transaction committed successfully.` });
      setViewMode('grid');
    } catch (err) {
      setStatus({ type: 'error', text: err.message });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setStatus({ type: '', text: '' }), 5000);
    }
  };

  // ─── SIDEBAR BUILDER (STRICT RBAC) ───
  const SIDEBAR_NAV = [];
  
  // Requirement #1: Overview for IT_MANAGER and IT_EXECUTIVE
  if (userRole === 'IT_MANAGER' || userRole === 'IT_EXECUTIVE') {
    SIDEBAR_NAV.push({ id: 'overview', label: 'System Overview', icon: LayoutDashboard });
  }
  
  // Requirement #2, #3, #4: Everyone (including ADMIN) sees these
  SIDEBAR_NAV.push(
    { id: 'projects', label: 'Manage Projects', icon: FolderKanban },
    { id: 'blogs', label: 'Manage Publications', icon: FileText },
    { id: 'inquiries', label: 'Contact Inquiries', icon: Inbox }
  );
  
  // Requirement #5: Only IT_MANAGER sees Access Control
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
            {activeTab !== 'overview' && activeTab !== 'inquiries' && (
              viewMode === 'grid' ? (
                <button onClick={handleAddNew} className="bg-[#0a1628] text-white text-xs font-mono font-bold uppercase tracking-widest px-6 py-3 rounded-lg hover:bg-[#1db87a] transition-all flex items-center gap-2 cursor-pointer shadow-md">
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

          {/* ─── 1. OVERVIEW TAB ─── */}
          {activeTab === 'overview' && (
            <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
               <h3 className="text-lg font-black text-[#0a1628] mb-4">Analytics & System Health</h3>
               <p className="text-sm text-slate-600 mb-6">The Analytics UI embedded here will be active once Google Looker Studio or Google Analytics is linked.</p>
               <div className="w-full h-96 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center bg-slate-50">
                  <Activity className="w-10 h-10 text-slate-300 mb-4" />
                  <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Connect Data Source to Populate</span>
               </div>
            </div>
          )}

          {/* ─── 4. CONTACT INQUIRIES TAB (READ-ONLY FETCHED FROM DB) ─── */}
          {activeTab === 'inquiries' && (
            <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
              <div className="space-y-6">
                {!Array.isArray(inquiriesList) || inquiriesList.length === 0 ? (
                  <div className="text-sm text-slate-500 font-medium">No contact inquiries found in the database.</div>
                ) : (
                  inquiriesList.map(inq => (
                    <div key={inq.id} className="p-6 border border-slate-200 bg-slate-50 rounded-2xl hover:border-slate-300 transition-colors">
                      <div className="flex justify-between items-start mb-4 border-b border-slate-200 pb-4">
                        <div>
                          <div className="text-[10px] font-mono text-[#1db87a] uppercase font-black tracking-widest mb-1.5">{inq.service}</div>
                          <div className="text-lg font-black text-[#0a1628] leading-none mb-2">
                            {inq.name} <span className="text-sm font-medium text-slate-400">({inq.company || 'No Company Provided'})</span>
                          </div>
                          <div className="flex gap-4">
                            <a href={`mailto:${inq.email}`} className="text-xs font-mono font-bold text-blue-600 hover:text-blue-800 transition-colors">{inq.email}</a>
                            {inq.phone && <a href={`tel:${inq.phone}`} className="text-xs font-mono font-bold text-slate-500 hover:text-slate-800 transition-colors">{inq.phone}</a>}
                          </div>
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono tracking-widest bg-white px-3 py-1.5 rounded-lg border border-slate-200">
                          {new Date(inq.created_at).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="text-sm text-slate-600 bg-white p-5 rounded-xl border border-slate-100 whitespace-pre-wrap leading-relaxed shadow-xs">
                        {inq.message}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* ─── 2. PROJECTS TAB ─── */}
          {activeTab === 'projects' && (
            <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
              {viewMode === 'grid' ? (
                <div className="space-y-4">
                  {!Array.isArray(projectsList) || projectsList.length === 0 ? (
                    <div className="text-sm text-slate-500 font-medium">No projects in database. Click &quot;Add New Entry&quot; to begin.</div>
                  ) : (
                    projectsList.map(proj => (
                      <div key={proj.id} className="flex items-center justify-between p-4 border border-slate-100 bg-slate-50 rounded-xl hover:shadow-md transition-shadow">
                        <div>
                          <div className="text-[10px] font-mono text-[#1db87a] uppercase font-bold tracking-wider mb-1">{proj.category}</div>
                          <div className="text-sm font-black text-[#0a1628]">{proj.title}</div>
                        </div>
                        <button onClick={() => handleEditItem('project', proj)} className="text-slate-400 hover:text-[#0a1628] cursor-pointer"><Edit3 className="w-4 h-4" /></button>
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
                  <div className="pt-4 flex justify-end"><SubmitButton isSubmitting={isSubmitting} editingId={editingId} /></div>
                </form>
              )}
            </div>
          )}

          {/* ─── 3. PUBLICATIONS TAB ─── */}
          {activeTab === 'blogs' && (
            <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
              {viewMode === 'grid' ? (
                <div className="space-y-4">
                  {!Array.isArray(blogsList) || blogsList.length === 0 ? (
                    <div className="text-sm text-slate-500 font-medium">No publications found. Click &quot;Add New Entry&quot; to begin.</div>
                  ) : (
                    blogsList.map(blog => (
                      <div key={blog.id} className="flex items-center justify-between p-4 border border-slate-100 bg-slate-50 rounded-xl hover:shadow-md">
                        <div>
                          <div className="text-sm font-black text-[#0a1628]">{blog.title}</div>
                          <div className="text-[10px] font-mono text-slate-400">/{blog.slug}</div>
                        </div>
                        <button onClick={() => handleEditItem('blog', blog)} className="text-slate-400 hover:text-[#0a1628]"><Edit3 className="w-4 h-4" /></button>
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
                  <div className="pt-4 flex justify-end"><SubmitButton isSubmitting={isSubmitting} editingId={editingId} /></div>
                </form>
              )}
            </div>
          )}

          {/* ─── 5. USERS TAB ─── */}
          {activeTab === 'users' && userRole === 'IT_MANAGER' && (
             <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
                {viewMode === 'grid' ? (
                  <div className="space-y-4">
                    {!Array.isArray(usersList) || usersList.length === 0 ? (
                      <div className="text-sm text-slate-500 font-medium">No users found or server connection failed.</div>
                    ) : (
                      usersList.map(user => (
                        <div key={user.id} className="flex items-center justify-between p-4 border border-slate-100 bg-slate-50 rounded-xl hover:shadow-md transition-shadow">
                          <div>
                            <div className="text-[10px] font-mono text-[#1db87a] uppercase font-bold tracking-wider mb-1">{user.role}</div>
                            <div className="text-sm font-black text-[#0a1628]">{user.username}</div>
                            <div className="text-xs text-slate-500">{user.email}</div>
                          </div>
                          <div className="flex items-center gap-3">
                            <button onClick={() => handleEditItem('user', user)} className="text-slate-400 hover:text-[#0a1628] cursor-pointer transition-colors">
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleDeleteUser(user.id)} className="text-slate-400 hover:text-rose-500 cursor-pointer transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                ) : (
                  <form onSubmit={handleActionSubmit} className="space-y-6 animate-in fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <label className="text-[10px] font-black tracking-widest text-slate-400 uppercase font-mono">Username</label>
                        <input required type="text" disabled={!!editingId} value={userForm.username} onChange={e => setUserForm({...userForm, username: e.target.value.trim().toLowerCase()})} className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#1db87a] disabled:opacity-50 disabled:bg-slate-100" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black tracking-widest text-slate-400 uppercase font-mono">Email</label>
                        <input required type="email" value={userForm.email} onChange={e => setUserForm({...userForm, email: e.target.value.trim()})} className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#1db87a]" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black tracking-widest text-slate-400 uppercase font-mono">
                          {editingId ? "New Password (Leave blank to keep current)" : "Password"}
                        </label>
                        <input required={!editingId} type="password" value={userForm.password} onChange={e => setUserForm({...userForm, password: e.target.value})} className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#1db87a] font-mono placeholder:text-slate-300" placeholder={editingId ? "••••••••" : ""} />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black tracking-widest text-slate-400 uppercase font-mono">Role</label>
                        <select value={userForm.role} onChange={e => setUserForm({...userForm, role: e.target.value})} className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#1db87a] bg-white cursor-pointer">
                          <option value="ADMIN">ADMIN</option>
                          <option value="IT_EXECUTIVE">IT_EXECUTIVE</option>
                          <option value="IT_MANAGER">IT_MANAGER</option>
                        </select>
                      </div>
                    </div>
                    <div className="pt-4 flex justify-end"><SubmitButton isSubmitting={isSubmitting} editingId={editingId} /></div>
                  </form>
                )}
             </div>
          )}

        </div>
      </section>
    </main>
  );
}

function SubmitButton({ isSubmitting, editingId }) {
  return (
    <button type="submit" disabled={isSubmitting} className="bg-[#0a1628] text-white text-xs font-mono font-bold uppercase tracking-widest px-8 py-4 rounded-xl hover:bg-[#1db87a] hover:text-[#0a1628] transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50">
      {isSubmitting ? 'Executing...' : (editingId ? 'Update Record' : 'Commit Payload')} <Send className="w-3.5 h-3.5" />
    </button>
  );
}