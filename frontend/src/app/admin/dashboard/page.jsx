"use client";
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { 
  LayoutDashboard, FolderKanban, FileText, Users, LogOut, 
  Send, Plus, Trash2, CheckCircle2, AlertCircle, ShieldAlert,
  Activity, ArrowLeft, UploadCloud, Edit3, Inbox, Film
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
  const [inquiriesList, setInquiriesList] = useState([]); 
  const [usersList, setUsersList] = useState([]);         

  // Form States (UPDATED WITH ENTERPRISE SCHEMA DEFAULTS)
  const [projectForm, setProjectForm] = useState({ 
    title: '', 
    slug: '',
    client_name: '',
    is_confidential: false,
    anonymous_client_label: '',
    industry: 'Oil & Gas', 
    location: '', 
    project_status: 'Completed', 
    cover_image: '', 
    short_description: '',
    full_overview: '',
    engineering_scope: [],
    technologies_used: [],
    key_results: []
  });
  
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
        else setActiveTab('projects'); 
      }, 0);
    }
  }, [token, loading, userRole, activeTab, router]);

  // ─── FETCH DATA FOR GRIDS ───
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

  // ─── MEDIA UPLOAD HANDLER (FIXED FOR cover_image) ───
  const handleFileUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    const fetchToken = token?.access_token || token;

    try {
      setStatus({ type: 'success', text: 'Uploading media to server...' });
      const res = await fetch(`${API_BASE}/api/upload`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${fetchToken}` },
        body: formData
      });
      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      
      // FIXED: Updates cover_image instead of old image_url
      if (type === 'project') setProjectForm(prev => ({ ...prev, cover_image: data.url }));
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
    if (activeTab === 'projects') { 
      setProjectForm({ 
        title: '', 
        slug: '',
        client_name: '',
        is_confidential: false,
        anonymous_client_label: '',
        industry: 'Oil & Gas', 
        location: '', 
        project_status: 'Completed', 
        cover_image: '', 
        short_description: '',
        full_overview: '',
        engineering_scope: [],
        technologies_used: [],
        key_results: []
      }); 
    }
    if (activeTab === 'blogs') { setBlogForm({ title: '', slug: '', excerpt: '', content: '', cover_img: '' }); }
    if (activeTab === 'users') { setUserForm({ username: '', email: '', password: '', role: 'ADMIN' }); }
    setViewMode('editor');
  };

  const handleEditItem = (type, item) => {
    setEditingId(item.id);
    if (type === 'project') setProjectForm(item);
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

  // ─── SUBMISSION HANDLER (FIXED SANITIZATION & PAYLOAD) ───
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
    
    // FIXED: Clean and sanitize project payload to guarantee valid schema types
    if (activeTab === 'projects') {
      bodyPayload = {
        title: projectForm.title || '',
        slug: projectForm.slug || projectForm.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') || '',
        client_name: projectForm.client_name || null,
        is_confidential: Boolean(projectForm.is_confidential),
        anonymous_client_label: projectForm.anonymous_client_label || null,
        industry: projectForm.industry || 'Oil & Gas',
        location: projectForm.location || null,
        country: projectForm.country || null,
        completion_year: projectForm.completion_year || null,
        project_status: projectForm.project_status || 'Completed',
        cover_image: projectForm.cover_image || '/placeholder.jpg',
        gallery_images: projectForm.gallery_images || [],
        video_url: projectForm.video_url || null,
        short_description: projectForm.short_description || '',
        full_overview: projectForm.full_overview || '',
        engineering_scope: (projectForm.engineering_scope || []).filter(i => i && i.trim() !== ''),
        services_delivered: (projectForm.services_delivered || []).filter(i => i && i.trim() !== ''),
        technologies_used: (projectForm.technologies_used || []).filter(i => i && i.trim() !== ''),
        key_results: (projectForm.key_results || []).filter(i => i && i.trim() !== ''),
        duration_months: projectForm.duration_months || null,
        start_date: projectForm.start_date || null,
        end_date: projectForm.end_date || null,
        engineering_hours: projectForm.engineering_hours || null,
        plant_capacity: projectForm.plant_capacity || null,
        project_budget: projectForm.project_budget || null,
        challenges: projectForm.challenges || null,
        solutions: projectForm.solutions || null,
        statistics: projectForm.statistics || [],
        meta_title: projectForm.meta_title || null,
        meta_description: projectForm.meta_description || null,
        og_image: projectForm.og_image || null
      };
    }
    
    if (activeTab === 'blogs') bodyPayload = blogForm;
    if (activeTab === 'users') {
      bodyPayload = { ...userForm };
      if (editingId && !bodyPayload.password) delete bodyPayload.password;
    }

    try {
      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: method,
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${fetchToken}` 
        },
        body: JSON.stringify(bodyPayload)
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail?.[0]?.msg || errorData.detail || 'Validation or Authorization Failed.');
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

  // ─── SIDEBAR BUILDER ───
  const SIDEBAR_NAV = [];
  
  if (userRole === 'IT_MANAGER' || userRole === 'IT_EXECUTIVE') {
    SIDEBAR_NAV.push({ id: 'overview', label: 'System Overview', icon: LayoutDashboard });
  }
  
  SIDEBAR_NAV.push(
    { id: 'projects', label: 'Manage Projects', icon: FolderKanban },
    { id: 'blogs', label: 'Manage Publications', icon: FileText },
    { id: 'inquiries', label: 'Contact Inquiries', icon: Inbox }
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

          {/* ─── 4. CONTACT INQUIRIES TAB ─── */}
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
                          <div className="text-[10px] font-mono text-[#1db87a] uppercase font-bold tracking-wider mb-1">{proj.industry || proj.category}</div>
                          <div className="text-sm font-black text-[#0a1628]">{proj.title}</div>
                        </div>
                        <button onClick={() => handleEditItem('project', proj)} className="text-slate-400 hover:text-[#0a1628] cursor-pointer">
                          <Edit3 className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              ) : (
                <form onSubmit={handleActionSubmit} className="space-y-8 animate-in fade-in">
                  
                  {/* SECTION 1: CORE DETAILS */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-slate-100">
                    <div className="md:col-span-2 space-y-1">
                      <label className="text-[10px] font-black tracking-widest text-slate-400 uppercase font-mono">Project Title</label>
                      <input required type="text" value={projectForm.title || ''} 
                        onChange={e => {
                          const val = e.target.value;
                          setProjectForm({
                            ...projectForm, 
                            title: val, 
                            slug: val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
                          });
                        }} 
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:border-[#1db87a] outline-none" 
                      />
                    </div>
                    
                    <div className="space-y-1">
                      <label className="text-[10px] font-black tracking-widest text-slate-400 uppercase font-mono">URL Slug (Auto)</label>
                      <input required type="text" value={projectForm.slug || ''} readOnly className="w-full px-4 py-3 border border-slate-200 bg-slate-50 rounded-xl text-sm font-mono text-slate-500 outline-none" />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-black tracking-widest text-slate-400 uppercase font-mono">Industry</label>
                      <select value={projectForm.industry || 'Oil & Gas'} onChange={e => setProjectForm({...projectForm, industry: e.target.value})} className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm bg-white font-bold text-slate-700 outline-none focus:border-[#1db87a]">
                        <option value="Oil & Gas">Oil & Gas</option>
                        <option value="Chemical">Chemical / Petrochemical</option>
                        <option value="Power">Power & Energy</option>
                        <option value="Infrastructure">Industrial Infrastructure</option>
                        <option value="Water">Water & Utilities</option>
                      </select>
                    </div>
                  </div>

                  {/* SECTION 2: NDA & CLIENT CONFIDENTIALITY */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                    <div className="md:col-span-2 flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                      <div>
                        <label className="text-xs font-black tracking-widest text-[#0a1628] uppercase">NDA / Confidential Client</label>
                        <p className="text-[10px] text-slate-500 mt-1">Enable to hide exact client name from public view.</p>
                      </div>
                      <input 
                        type="checkbox" 
                        checked={projectForm.is_confidential || false} 
                        onChange={e => setProjectForm({...projectForm, is_confidential: e.target.checked})} 
                        className="w-5 h-5 accent-[#1db87a] cursor-pointer"
                      />
                    </div>

                    {projectForm.is_confidential ? (
                      <div className="md:col-span-2 space-y-1">
                        <label className="text-[10px] font-black tracking-widest text-[#1db87a] uppercase font-mono">Anonymous Label (Displayed Publicly)</label>
                        <input type="text" placeholder="e.g. Fortune 500 Energy Major" value={projectForm.anonymous_client_label || ''} onChange={e => setProjectForm({...projectForm, anonymous_client_label: e.target.value})} className="w-full px-4 py-3 border border-emerald-200 bg-emerald-50/30 rounded-xl text-sm focus:border-[#1db87a] outline-none" />
                      </div>
                    ) : (
                      <div className="md:col-span-2 space-y-1">
                        <label className="text-[10px] font-black tracking-widest text-slate-400 uppercase font-mono">Client Name (Public)</label>
                        <input type="text" placeholder="e.g. Reliance Industries" value={projectForm.client_name || ''} onChange={e => setProjectForm({...projectForm, client_name: e.target.value})} className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:border-[#1db87a] outline-none" />
                      </div>
                    )}

                    <div className="space-y-1">
                      <label className="text-[10px] font-black tracking-widest text-slate-400 uppercase font-mono">Status</label>
                      <select value={projectForm.project_status || 'Completed'} onChange={e => setProjectForm({...projectForm, project_status: e.target.value})} className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm outline-none">
                        <option value="Completed">Completed</option>
                        <option value="Ongoing">Ongoing</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black tracking-widest text-slate-400 uppercase font-mono">Location</label>
                      <input type="text" placeholder="City or Region" value={projectForm.location || ''} onChange={e => setProjectForm({...projectForm, location: e.target.value})} className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:border-[#1db87a] outline-none" />
                    </div>
                  </div>

                 {/* SECTION 3: MEDIA */}
<div className="space-y-1 pb-6 border-b border-slate-100">
  <label className="text-[10px] font-black tracking-widest text-slate-400 uppercase font-mono">Cover Media</label>
  
  {projectForm.cover_image ? (
    <div className="relative w-full h-56 sm:h-64 rounded-xl overflow-hidden border-2 border-slate-200 group bg-slate-900">
      {/* Image Preview */}
      <Image 
        src={projectForm.cover_image.startsWith('http') ? projectForm.cover_image : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}${projectForm.cover_image}`} 
        alt="Project Cover Preview" 
        fill
        unoptimized
        className="object-cover transition-opacity duration-300 group-hover:opacity-75"
      />
      
      {/* Hover Actions: Change or Delete */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
        <div className="relative">
          <input type="file" accept="image/*,video/*" onChange={(e) => handleFileUpload(e, 'project')} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20" />
          <button type="button" className="px-4 py-2 bg-white text-slate-900 rounded-lg text-xs font-bold shadow-lg transition-transform hover:scale-105">
            Change Media
          </button>
        </div>
        <button 
          type="button" 
          onClick={() => setProjectForm({...projectForm, cover_image: ''})} 
          className="p-2.5 bg-rose-600 text-white rounded-lg shadow-lg transition-transform hover:scale-105"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  ) : (
    <div className="w-full h-36 border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center bg-slate-50 relative overflow-hidden group hover:border-[#1db87a] transition-colors">
      <input type="file" accept="image/*,video/*" onChange={(e) => handleFileUpload(e, 'project')} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
      <div className="w-10 h-10 rounded-full bg-emerald-50 text-[#1db87a] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
        <UploadCloud className="w-5 h-5" />
      </div>
      <div className="text-xs font-bold text-slate-600">Click or drag file to upload server media</div>
    </div>
  )}
</div>
                  {/* SECTION 4: TEXT OVERVIEW */}
                  <div className="grid grid-cols-1 gap-6 pb-6 border-b border-slate-100">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black tracking-widest text-slate-400 uppercase font-mono">Short Description (Cards)</label>
                      <textarea required rows={2} value={projectForm.short_description || ''} onChange={e => setProjectForm({...projectForm, short_description: e.target.value})} className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:border-[#1db87a] outline-none" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black tracking-widest text-slate-400 uppercase font-mono">Full Case Study Narrative</label>
                      <textarea required rows={5} value={projectForm.full_overview || ''} onChange={e => setProjectForm({...projectForm, full_overview: e.target.value})} className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:border-[#1db87a] outline-none" />
                    </div>
                  </div>

                  {/* SECTION 5: REPEATABLE ARRAYS */}
                  <div className="grid grid-cols-1 gap-6">
                    
                    {/* Scope */}
                    <div className="space-y-3 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-[10px] font-black tracking-widest text-slate-500 uppercase font-mono">Engineering Scope</label>
                        <button type="button" onClick={() => setProjectForm({...projectForm, engineering_scope: [...(projectForm.engineering_scope || []), '']})} className="text-[10px] font-mono font-black text-[#1db87a] flex items-center gap-1"><Plus className="w-3 h-3" /> Add Scope</button>
                      </div>
                      {(projectForm.engineering_scope || []).map((scope, idx) => (
                        <div key={idx} className="flex gap-2">
                          <input required type="text" placeholder="e.g. Process Design" value={scope} onChange={e => { let c = [...projectForm.engineering_scope]; c[idx] = e.target.value; setProjectForm({...projectForm, engineering_scope: c}); }} className="flex-1 px-4 py-2 border border-slate-200 rounded-xl text-xs outline-none focus:border-[#1db87a]" />
                          <button type="button" onClick={() => setProjectForm({...projectForm, engineering_scope: projectForm.engineering_scope.filter((_, i) => i !== idx)})} className="text-slate-400 hover:text-rose-500"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      ))}
                    </div>

                    {/* Tech */}
                    <div className="space-y-3 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-[10px] font-black tracking-widest text-slate-500 uppercase font-mono">Technologies Used</label>
                        <button type="button" onClick={() => setProjectForm({...projectForm, technologies_used: [...(projectForm.technologies_used || []), '']})} className="text-[10px] font-mono font-black text-[#1db87a] flex items-center gap-1"><Plus className="w-3 h-3" /> Add Tech</button>
                      </div>
                      {(projectForm.technologies_used || []).map((tech, idx) => (
                        <div key={idx} className="flex gap-2">
                          <input required type="text" placeholder="e.g. AVEVA E3D" value={tech} onChange={e => { let c = [...projectForm.technologies_used]; c[idx] = e.target.value; setProjectForm({...projectForm, technologies_used: c}); }} className="flex-1 px-4 py-2 border border-slate-200 rounded-xl text-xs outline-none focus:border-[#1db87a]" />
                          <button type="button" onClick={() => setProjectForm({...projectForm, technologies_used: projectForm.technologies_used.filter((_, i) => i !== idx)})} className="text-slate-400 hover:text-rose-500"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      ))}
                    </div>

                    {/* Key Results */}
                    <div className="space-y-3 bg-emerald-50/50 p-6 rounded-2xl border border-emerald-100">
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-[10px] font-black tracking-widest text-emerald-700 uppercase font-mono">Key Results & Impacts</label>
                        <button type="button" onClick={() => setProjectForm({...projectForm, key_results: [...(projectForm.key_results || []), '']})} className="text-[10px] font-mono font-black text-[#1db87a] flex items-center gap-1"><Plus className="w-3 h-3" /> Add Result</button>
                      </div>
                      {(projectForm.key_results || []).map((res, idx) => (
                        <div key={idx} className="flex gap-2">
                          <input required type="text" placeholder="e.g. Zero Safety Incidents" value={res} onChange={e => { let c = [...projectForm.key_results]; c[idx] = e.target.value; setProjectForm({...projectForm, key_results: c}); }} className="flex-1 px-4 py-2 border border-emerald-200 rounded-xl text-xs outline-none focus:border-[#1db87a]" />
                          <button type="button" onClick={() => setProjectForm({...projectForm, key_results: projectForm.key_results.filter((_, i) => i !== idx)})} className="text-slate-400 hover:text-rose-500"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      ))}
                    </div>

                  </div>
                  
                  {/* SUBMIT BUTTON */}
                  <div className="pt-8 flex justify-end">
                    <SubmitButton isSubmitting={isSubmitting} editingId={editingId} />
                  </div>
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
                    
                    <div className="space-y-1">
                      <label className="text-[10px] font-black tracking-widest text-slate-400 uppercase font-mono">Header</label>
                      <input required type="text" value={blogForm.title || ''} onChange={e => setBlogForm({...blogForm, title: e.target.value})} className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#1db87a]" />
                    </div>
                    
                    <div className="space-y-1">
                      <label className="text-[10px] font-black tracking-widest text-slate-400 uppercase font-mono">Slug</label>
                      <input required type="text" value={blogForm.slug || ''} onChange={e => setBlogForm({...blogForm, slug: e.target.value.toLowerCase().replace(/ /g, '-')})} className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#1db87a]" />
                    </div>
                    
                    <div className="md:col-span-2 space-y-1">
                      <label className="text-[10px] font-black tracking-widest text-slate-400 uppercase font-mono">Cover Image</label>
                      
                      {blogForm.cover_img ? (
                        <div className="relative w-full h-56 sm:h-64 rounded-xl overflow-hidden border-2 border-slate-200 group bg-slate-900">
                          <Image 
                            src={blogForm.cover_img.startsWith('http') ? blogForm.cover_img : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}${blogForm.cover_img}`} 
                            alt="Cover Preview" 
                            fill
                            unoptimized
                            className="object-cover transition-opacity duration-300 group-hover:opacity-75"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                            <div className="relative">
                              <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'blog')} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20" />
                              <button type="button" className="px-4 py-2 bg-white text-slate-900 rounded-lg text-xs font-bold shadow-lg transition-transform hover:scale-105">
                                Change Image
                              </button>
                            </div>
                            <button 
                              type="button" 
                              onClick={() => setBlogForm({...blogForm, cover_img: null})} 
                              className="p-2.5 bg-rose-600 text-white rounded-lg shadow-lg transition-transform hover:scale-105"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="w-full h-36 border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center bg-slate-50 relative overflow-hidden group hover:border-[#1db87a] transition-colors">
                          <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'blog')} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                          <div className="w-10 h-10 rounded-full bg-emerald-50 text-[#1db87a] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                            <UploadCloud className="w-5 h-5" />
                          </div>
                          <div className="text-xs font-bold text-slate-600">Click or drag file to upload</div>
                        </div>
                      )}
                    </div>

                    <div className="md:col-span-2 space-y-1">
                      <label className="text-[10px] font-black tracking-widest text-slate-400 uppercase font-mono">Excerpt</label>
                      <input required type="text" value={blogForm.excerpt || ''} onChange={e => setBlogForm({...blogForm, excerpt: e.target.value})} className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#1db87a]" />
                    </div>
                    
                    <div className="md:col-span-2 space-y-1">
                      <label className="text-[10px] font-black tracking-widest text-slate-400 uppercase font-mono">HTML Body</label>
                      <textarea required rows={10} value={blogForm.content || ''} onChange={e => setBlogForm({...blogForm, content: e.target.value})} className="w-full px-4 py-3 border border-slate-200 rounded-xl text-xs font-mono outline-none focus:border-[#1db87a]" />
                    </div>

                    <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-100">
                      <div className="space-y-1">
                        <label className="text-[10px] font-black tracking-widest text-slate-400 uppercase font-mono">Category</label>
                        <input type="text" placeholder="e.g. Engineering" value={blogForm.category || ''} onChange={e => setBlogForm({...blogForm, category: e.target.value})} className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#1db87a]" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black tracking-widest text-slate-400 uppercase font-mono">Author</label>
                        <input type="text" placeholder="e.g. Aarvi Specialist" value={blogForm.author || ''} onChange={e => setBlogForm({...blogForm, author: e.target.value})} className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#1db87a]" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black tracking-widest text-slate-400 uppercase font-mono">Read Time</label>
                        <input type="text" placeholder="e.g. 5 min read" value={blogForm.read_time || ''} onChange={e => setBlogForm({...blogForm, read_time: e.target.value})} className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#1db87a]" />
                      </div>
                    </div>

                    <div className="md:col-span-2 space-y-1 pt-4 border-t border-slate-100">
                      <label className="text-[10px] font-black tracking-widest text-slate-400 uppercase font-mono flex items-center gap-1.5">
                        <Film className="w-3.5 h-3.5" /> Embedded Video URL (Optional)
                      </label>
                      <input type="url" placeholder="Paste YouTube, Vimeo, or uploaded MP4 URL here..." value={blogForm.video_url || ''} onChange={e => setBlogForm({...blogForm, video_url: e.target.value})} className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#1db87a]" />
                    </div>

                  </div>
                  <div className="pt-4 flex justify-end">
                    <SubmitButton isSubmitting={isSubmitting} editingId={editingId} />
                  </div>
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