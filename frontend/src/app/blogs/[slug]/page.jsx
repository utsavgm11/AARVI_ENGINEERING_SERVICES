"use client";
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Calendar, User, ArrowLeft, ShieldAlert, Clock, BookOpen } from 'lucide-react';

export default function PremiumEditorialPortal() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  // Scroll Tracking for the Top Progress Indicator Line
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    async function fetchArticleDetails() {
      try {
        const res = await fetch(`${API_BASE}/api/blogs`);
        if (res.ok) {
          const list = await res.json();
          const targetNode = list.find(b => b.slug === slug);
          if (targetNode) setBlog(targetNode);
        }
      } catch (err) {
        console.error("Dynamic pipeline breakdown:", err);
      } finally {
        setLoading(false);
      }
    }
    if (slug) fetchArticleDetails();
  }, [slug, API_BASE]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center space-y-4">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-6 h-6 border-2 border-[#0a1628] border-t-[#1db87a] rounded-full"
        />
        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">Formatting Typography...</span>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
        <ShieldAlert className="w-10 h-10 text-rose-500 mb-4" />
        <h3 className="text-base font-black text-[#0a1628] uppercase tracking-wider mb-2">Document Unresolved</h3>
        <p className="text-xs text-slate-400 font-medium max-w-xs mb-6">The technical file path requested cannot be verified in the server index system.</p>
        <Link href="/blogs" className="text-xs font-mono font-bold text-white bg-[#0a1628] hover:bg-[#1db87a] hover:text-[#0a1628] transition-all px-6 py-3 rounded-xl uppercase tracking-widest">
          Return to Hub
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen relative selection:bg-[#1db87a]/30 selection:text-[#0a1628]">
      
      {/* ─── FLOATING READING PROGRESS LINE ─── */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-0.75 bg-[#1db87a] z-50 origin-[0%]"
        style={{ scaleX }}
      />

      <div className="max-w-3xl mx-auto px-6 pt-24 pb-32 relative">
        
        {/* ─── SMOOTH BREADCRUMB BACKTRACK ─── */}
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <Link href="/blogs" className="inline-flex items-center gap-2 text-xs font-mono font-bold text-slate-400 hover:text-[#0a1628] tracking-wider transition-colors group">
            <ArrowLeft className="w-3.5 h-3.5 text-[#1db87a] group-hover:-translate-x-0.5 transition-transform" /> Back to Articles
          </Link>
        </motion.div>

        {/* ─── EDITORIAL HEADER BLOCK ─── */}
        <header className="space-y-6 mb-10">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex items-center gap-2 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest"
          >
            <span className="text-[#1db87a]">Insights</span>
            <span>/</span>
            <span>{new Date(blog.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl md:text-4xl lg:text-[42px] font-black text-[#0a1628] tracking-tight leading-[1.1] font-sans"
          >
            {blog.title}
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex items-center gap-4 text-xs text-slate-400 font-medium pt-4 border-t border-slate-100"
          >
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 text-[#0a1628] font-bold text-[10px] uppercase">
                {blog.author.charAt(0)}
              </div>
              <span className="font-semibold text-slate-700">{blog.author}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-slate-400" /> 4 min read</div>
          </motion.div>
        </header>

        {/* ─── CINEMATIC IMAGE BLOCK ─── */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="w-full aspect-video bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden mb-12 shadow-sm"
        >
          <img 
            src={blog.cover_img ? `${API_BASE}${blog.cover_img}` : 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=1200'} 
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* ─── ULTRA-CLEAN PREMIUM READING VIEW ENGINE ─── */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="
            prose prose-slate max-w-none
            
            /* Text Formatting Elements */
            prose-p:text-slate-700 prose-p:text-[16px] prose-p:leading-[1.75] prose-p:font-normal prose-p:mb-6 prose-p:tracking-normal
            
            /* Add Drop-Cap logic to the first paragraph automatically */
            prose-p:first-of-type:first-letter:text-5xl 
            prose-p:first-of-type:first-letter:font-black 
            prose-p:first-of-type:first-letter:text-[#0a1628] 
            prose-p:first-of-type:first-letter:float-left 
            prose-p:first-of-type:first-letter:mr-3 
            prose-p:first-of-type:first-letter:leading-[0.85] 
            prose-p:first-of-type:first-letter:mt-1

            /* Headings Structure Alignment */
            prose-headings:text-[#0a1628] prose-headings:font-black prose-headings:tracking-tight
            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:border-l-4 prose-h2:border-[#1db87a] prose-h2:pl-4
            prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3
            
            /* Lists Aesthetics */
            prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-2 prose-ul:my-6
            prose-li:text-slate-600 prose-li:text-[15px] prose-li:leading-relaxed
            
            /* Dynamic Typography Code/Quote Accents */
            prose-blockquote:border-l-4 prose-blockquote:border-slate-300 prose-blockquote:italic prose-blockquote:text-slate-500 prose-blockquote:pl-6 prose-blockquote:my-8
            prose-code:text-[13px] prose-code:bg-slate-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-[#0a1628] prose-code:font-mono
          "
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* ─── SIGNATURE END FOOTER ELEMENT ─── */}
        <footer className="mt-16 pt-8 border-t border-slate-100 flex flex-col items-center space-y-4">
          <BookOpen className="w-5 h-5 text-slate-300" />
          <div className="text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase">End of Publication</div>
        </footer>

      </div>
    </div>
  );
}