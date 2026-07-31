"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { 
  FolderOpen, Factory, Zap, Building2, FlaskConical, Droplet, 
  MapPin, ArrowRight, BarChart3, Globe2, Users2, ShieldCheck, Construction, HardHat , ArrowUpRight
} from 'lucide-react';
import projectHeroImg from '@/assets/project hero.png'; 
// Note: replace '.png' with '.jpg' or '.webp' if that is your file's extension
import Link from "next/link";

// Pre-defined categories based on the UI design
const CATEGORIES = [
  { id: 'all', label: 'All Projects', icon: FolderOpen },
  { id: 'oil-gas', label: 'Oil & Gas', icon: Factory },
  { id: 'petrochemical', label: 'Petrochemical', icon: FlaskConical },
  { id: 'power', label: 'Power', icon: Zap },
  { id: 'infrastructure', label: 'Infrastructure', icon: Building2 },
  { id: 'chemical', label: 'Chemical', icon: FlaskConical },
  { id: 'water', label: 'Water', icon: Droplet },
];

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');

  // Fetch projects from the FastAPI backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
        const res = await fetch(`${API_BASE}/api/projects`);
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setProjects(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Filter logic (Updated to support new 'industry' schema)
  const filteredProjects = projects.filter(project => {
    if (activeCategory === 'all') return true;
    const categoryMatch = project.industry || project.category || '';
    return categoryMatch.toLowerCase().includes(activeCategory.replace('-', ' '));
  });

  // Helper to map category to an icon for the card badge
  const getCategoryIcon = (category) => {
    const catStr = category?.toLowerCase() || '';
    if (catStr.includes('power')) return <Zap className="w-5 h-5 text-[#1db87a]" />;
    if (catStr.includes('water')) return <Droplet className="w-5 h-5 text-[#1db87a]" />;
    if (catStr.includes('infra')) return <Building2 className="w-5 h-5 text-[#1db87a]" />;
    if (catStr.includes('chem')) return <FlaskConical className="w-5 h-5 text-[#1db87a]" />;
    return <Factory className="w-5 h-5 text-[#1db87a]" />; // Default
  };

  const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col pt-2  font-sans">
      
     {/* ─── HERO SECTION ─── */}
<section className="relative max-w-7xl mx-auto px-6 pt-6 pb-8 w-full overflow-hidden">
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
    
    {/* Left Column: Text (Takes 7 of 12 columns) */}
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="lg:col-span-7 max-w-2xl z-10"
    >
      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#1db87a]/20 text-[#1db87a] text-xs font-bold tracking-widest uppercase mb-5 shadow-sm">
        <FolderOpen className="w-4 h-4" /> OUR PROJECTS
      </div>
      
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0a1628] leading-[1.1] tracking-tight mb-4">
        Engineering Excellence<span className="text-[#1db87a]">.</span><br />
        Projects That Deliver Impact<span className="text-[#1db87a]">.</span>
      </h1>
      
      <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-lg">
        Discover how Aarvi delivers innovative, cost-effective and sustainable engineering solutions across industries and geographies.
      </p>
    </motion.div>

    {/* Right Column: Image (Takes 5 of 12 columns, scaled up & pulled left) */}
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      className="hidden lg:block lg:col-span-5 relative h-85 w-full -ml-8"
    >
      <Image 
        src={projectHeroImg} 
        alt="Engineering Blueprint"
        fill
        className="object-contain object-center mix-blend-multiply opacity-90 scale-110"
        priority
      />
    </motion.div>

  </div>
</section>
      {/* ─── PROJECTS GRID ─── */}
      <section className="max-w-7xl mx-auto px-6 w-full flex-1">
        {loading ? (
          <div className="w-full flex flex-col items-center justify-center py-20 space-y-4">
            <div className="w-12 h-12 border-4 border-slate-200 border-t-[#1db87a] rounded-full animate-spin"></div>
            <span className="text-sm font-bold text-slate-500 uppercase tracking-widest animate-pulse">Loading Projects...</span>
          </div>
        ) : projects.length === 0 ? (
          /* COMING SOON STATE (If Database is empty) */
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-3xl mx-auto bg-white border border-slate-200 rounded-3xl p-12 text-center shadow-sm relative overflow-hidden my-12"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-[#0a1628] via-[#1db87a] to-[#0a1628]" />
            <Construction className="w-20 h-20 text-slate-200 mx-auto mb-6" strokeWidth={1} />
            <h2 className="text-2xl font-black text-[#0a1628] uppercase tracking-tight mb-4">Projects Updating</h2>
            <p className="text-slate-500 text-base leading-relaxed max-w-xl mx-auto mb-8">
              We are currently migrating our extensive 39-year track record into this new digital platform. Projects will appear here shortly.
            </p>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 text-[#1db87a] mb-2">
              <HardHat className="w-8 h-8" />
            </div>
          </motion.div>
        ) : (
          /* POPULATED GRID */
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredProjects.map((project, index) => {
                // Support both new 'cover_image' and legacy 'image_url'
                const heroImage = project.cover_image || project.image_url;
                
                return (
                <motion.div 
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="group bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col overflow-hidden"
                >
                  {/* Image Container */}
                  <div className="relative w-full h-64 bg-slate-100 overflow-hidden">
                    {heroImage ? (
                      <Image 
                        src={heroImage.startsWith('http') ? heroImage : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}${heroImage}`}
                        alt={project.title}
                        fill
                        unoptimized
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-slate-200">
                        <Factory className="w-12 h-12 text-slate-400" />
                      </div>
                    )}
                    
                    {/* Floating Icon Badge Overlapping Image */}
                    <div className="absolute -bottom-6 left-6 w-12 h-12 bg-[#0a1628] rounded-full border-4 border-white flex items-center justify-center shadow-lg z-10">
                      {getCategoryIcon(project.industry || project.category)}
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="pt-10 pb-8 px-8 flex flex-col grow">
                    <h3 className="text-xl font-black text-[#0a1628] leading-snug mb-3">
                      {project.title}
                    </h3>
                    
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 mb-4">
                      <MapPin className="w-3.5 h-3.5" />
                      {project.location || 'Global Execution'}
                    </div>

                    <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 mb-6 grow">
                      {project.short_description || project.scope_of_work}
                    </p>

                    {/* Updated to link to the dynamic single project page */}
                    <Link 
                      href={`/projects/${project.slug || project.id}`}
                      className="flex items-center gap-2 text-xs font-bold text-[#1db87a] tracking-widest uppercase group-hover:text-[#148f5e] transition-colors mt-auto w-fit"
                    >
                      VIEW PROJECT <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </motion.div>
              )})}
            </AnimatePresence>
          </motion.div>
        )}
      </section>

      {/* ══════════════════════════════════════════════════════════════════ */}
        {/* 4 · CTA BANNER                                                     */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        <section className="relative bg-aarvi-navy py-16 lg:py-20 overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage: "radial-gradient(circle, #ffffff 1.5px, transparent 1.5px)",
              backgroundSize: "32px 32px"
            }}
          />
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={stagger}
              className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10 bg-white/5 backdrop-blur-sm border border-white/10 p-10 rounded-3xl"
            >
              <div className="max-w-xl">
               
                <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight leading-tight mb-4">
                  Let&#39;s Build Your Next Project Together
                </motion.h2>
                <motion.p variants={fadeUp} className="text-white/60 text-base leading-relaxed font-medium">
                  Whether you&#39;re developing a greenfield facility or upgrading an existing asset, we help transform concepts into safe, reliable and high-performing operating facilities.
                </motion.p>
              </div>
              <motion.div variants={fadeUp} className="shrink-0">
                <Link
                  href="/contact?service=process-safety"
                  className="inline-flex items-center justify-center gap-2 px-8 py-5 bg-aarvi-green text-white font-black text-sm uppercase tracking-widest rounded-full hover:bg-white hover:text-aarvi-navy shadow-[0_8px_20px_rgba(0,135,90,0.3)] hover:shadow-[0_12px_28px_rgba(0,135,90,0.4)] transition-all duration-300 group"
                >
                  Talk to Our Experts
                  <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

      

    </div>
  );
}