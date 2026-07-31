"use client";
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ArrowLeft, MapPin, Calendar, Building2, Factory, 
  Layers, Cpu, CheckCircle2, ChevronRight, HardHat, 
  ShieldCheck, Clock, Briefcase, BarChart3, AlertTriangle, Lightbulb
} from 'lucide-react';

export default function SingleProjectPage() {
  const params = useParams();
  const slug = params?.slug;

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!slug) return;

    const fetchProject = async () => {
      try {
        const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
        const res = await fetch(`${API_BASE}/api/projects/${slug}`);
        if (!res.ok) throw new Error('Project not found');
        const data = await res.json();
        setProject(data);
      } catch (err) {
        console.error("Error fetching project details:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [slug]);

  // Image URL Helper
  const getImageUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}${url}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center pt-24">
        <div className="w-12 h-12 border-4 border-slate-200 border-t-[#1db87a] rounded-full animate-spin"></div>
        <span className="mt-4 text-sm font-bold text-slate-500 uppercase tracking-widest animate-pulse">Loading Case Study...</span>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center pt-24">
        <HardHat className="w-16 h-16 text-slate-300 mb-4" />
        <h1 className="text-2xl font-black text-[#0a1628] uppercase mb-2">Project Not Found</h1>
        <p className="text-slate-500 mb-6">The case study you are looking for does not exist or has been moved.</p>
        <Link href="/projects" className="px-6 py-3 bg-[#1db87a] text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-[#159a5d] transition-colors">
          Return to Portfolio
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pt-24 pb-20 font-sans">
      
      {/* ─── BREADCRUMBS & HEADER ─── */}
      <section className="max-w-7xl mx-auto px-6 w-full pt-8 pb-6">
        <Link href="/projects" className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest hover:text-[#1db87a] transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Projects
        </Link>
        
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="bg-[#0a1628] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg">
            {project.industry}
          </span>
          <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg border ${
            project.project_status.toLowerCase() === 'completed' 
              ? 'border-emerald-200 text-emerald-700 bg-emerald-50' 
              : 'border-blue-200 text-blue-700 bg-blue-50'
          }`}>
            Status: {project.project_status}
          </span>
        </div>

        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0a1628] leading-[1.1] tracking-tight mb-6 max-w-4xl"
        >
          {project.title}
        </motion.h1>

        <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
          {project.short_description}
        </p>
      </section>

      {/* ─── HERO IMAGE ─── */}
      <section className="max-w-7xl mx-auto px-6 w-full mb-16">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative w-full h-100 md:h-125 rounded-3xl overflow-hidden shadow-xl"
        >
          <Image 
            src={getImageUrl(project.cover_image)}
            alt={project.title}
            fill
            unoptimized
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#0a1628]/80 via-transparent to-transparent" />
        </motion.div>
      </section>

      {/* ─── MAIN CONTENT GRID ─── */}
      <section className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* LEFT COLUMN: Narrative */}
        <div className="lg:col-span-8 space-y-12">
          
          {/* Overview */}
          <div>
            <h2 className="text-2xl font-black text-[#0a1628] mb-6 flex items-center gap-3">
              <Building2 className="w-6 h-6 text-[#1db87a]" /> Project Overview
            </h2>
            <div className="text-slate-600 leading-relaxed whitespace-pre-wrap">
              {project.full_overview}
            </div>
          </div>

          {/* Challenges & Solutions (Only if they exist) */}
          {(project.challenges || project.solutions) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.challenges && (
                <div className="bg-orange-50/50 border border-orange-100 rounded-2xl p-6">
                  <h3 className="text-sm font-black text-orange-800 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" /> Challenges
                  </h3>
                  <p className="text-sm text-slate-700 leading-relaxed">{project.challenges}</p>
                </div>
              )}
              
              {project.solutions && (
                <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-6">
                  <h3 className="text-sm font-black text-emerald-800 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4" /> Solutions
                  </h3>
                  <p className="text-sm text-slate-700 leading-relaxed">{project.solutions}</p>
                </div>
              )}
            </div>
          )}

          {/* Key Results / Impact */}
          {project.key_results?.length > 0 && (
            <div>
              <h2 className="text-2xl font-black text-[#0a1628] mb-6 flex items-center gap-3">
                <BarChart3 className="w-6 h-6 text-[#1db87a]" /> Key Impact & Results
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.key_results.map((result, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                    <CheckCircle2 className="w-5 h-5 text-[#1db87a] shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-slate-700">{result}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* RIGHT COLUMN: Metadata Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Quick Facts Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-xs font-black text-[#0a1628] uppercase tracking-widest mb-6 border-b border-slate-100 pb-4">
              Project Facts
            </h3>
            
            <ul className="space-y-5">
              {/* NDA Logic Applied to Client Name */}
              <li className="flex gap-4">
                <Briefcase className="w-5 h-5 text-slate-400 shrink-0" />
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Client</div>
                  {project.is_confidential ? (
                    <div className="text-sm font-medium text-slate-600 italic">
                      {project.anonymous_client_label || "Confidential Client (NDA)"}
                    </div>
                  ) : (
                    <div className="text-sm font-bold text-[#0a1628]">{project.client_name || "Enterprise Client"}</div>
                  )}
                </div>
              </li>

              <li className="flex gap-4">
                <MapPin className="w-5 h-5 text-slate-400 shrink-0" />
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Location</div>
                  <div className="text-sm font-medium text-slate-700">
                    {project.location ? `${project.location}${project.country ? `, ${project.country}` : ''}` : project.country || 'Global'}
                  </div>
                </div>
              </li>

              {project.completion_year && (
                <li className="flex gap-4">
                  <Calendar className="w-5 h-5 text-slate-400 shrink-0" />
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Completion Year</div>
                    <div className="text-sm font-medium text-slate-700">{project.completion_year}</div>
                  </div>
                </li>
              )}

              {project.duration_months && (
                <li className="flex gap-4">
                  <Clock className="w-5 h-5 text-slate-400 shrink-0" />
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Duration</div>
                    <div className="text-sm font-medium text-slate-700">{project.duration_months}</div>
                  </div>
                </li>
              )}
            </ul>
          </div>

          {/* Engineering Scope Tags */}
          {project.engineering_scope?.length > 0 && (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <h3 className="text-xs font-black text-[#0a1628] uppercase tracking-widest mb-4 flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#1db87a]" /> Scope of Work
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.engineering_scope.map((scope, idx) => (
                  <span key={idx} className="bg-white border border-slate-200 text-slate-600 text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg shadow-sm">
                    {scope}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Technologies Used Tags */}
          {project.technologies_used?.length > 0 && (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <h3 className="text-xs font-black text-[#0a1628] uppercase tracking-widest mb-4 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#1db87a]" /> Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies_used.map((tech, idx) => (
                  <span key={idx} className="bg-[#0a1628] text-emerald-400 text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg shadow-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>

      {/* ─── CTA FOOTER ─── */}
      <section className="max-w-5xl mx-auto px-6 w-full mt-24 text-center">
        <div className="bg-[#0a1628] rounded-3xl p-12 relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(29,184,122,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(29,184,122,0.1)_1px,transparent_1px)] bg-size-[32px_32px] opacity-20 pointer-events-none" />
          <div className="relative z-10">
            <h2 className="text-3xl font-black text-white tracking-tight mb-4">Ready to execute a similar project?</h2>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto">
              Partner with Aarvi Engineering for precision, safety, and scalability. Let our experts review your requirements.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-[#1db87a] text-white text-sm font-bold uppercase tracking-widest rounded-xl hover:bg-[#159a5d] transition-all hover:scale-105 shadow-xl shadow-emerald-900/20">
              Discuss Your Project <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}