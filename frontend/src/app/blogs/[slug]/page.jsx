"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion, useScroll, useSpring } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, Clock, Link2, Loader2,
  Home, ChevronRight, ThumbsUp, ThumbsDown, Download, Phone
} from 'lucide-react';

// ─── CYAN TOKENS (matches site theme) ────────────────────────────────────────
const C = {
  cyan:       '#00D4B8',
  cyanDim:    'rgba(0,212,184,0.55)',
  cyanGlow:   'rgba(0,212,184,0.12)',
  cyanBorder: 'rgba(0,212,184,0.3)',
  dark:       '#07080A',
  darkCard:   '#0E1013',
};

// ─── LINKEDIN SHARE ───────────────────────────────────────────────────────────
function shareOnLinkedIn() {
  if (typeof window === 'undefined') return;
  const url = encodeURIComponent(window.location.href);
  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank', 'noopener,noreferrer,width=600,height=600');
}

function copyLink() {
  if (typeof window === 'undefined') return;
  navigator.clipboard.writeText(window.location.href).then(() => {
    // brief visual feedback handled in component state
  });
}

// ─── LOADING SCREEN ───────────────────────────────────────────────────────────
function LoadingScreen() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center gap-4"
      style={{ background: C.dark }}
    >
      <Loader2 className="w-8 h-8 animate-spin" style={{ color: C.cyan }} />
      <span className="text-xs font-mono tracking-widest uppercase" style={{ color: C.cyanDim }}>
        Loading Article...
      </span>
    </div>
  );
}

// ─── NOT FOUND SCREEN ─────────────────────────────────────────────────────────
function NotFoundScreen() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6 text-center gap-6"
      style={{ background: C.dark }}
    >
      <h3 className="text-2xl font-bold text-white">Article Not Found</h3>
      <p className="text-sm max-w-md" style={{ color: 'rgba(255,255,255,0.5)' }}>
        We couldn't locate this article. It may have been moved or removed.
      </p>
      <Link
        href="/blogs"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-black transition-opacity hover:opacity-80"
        style={{ background: C.cyan }}
      >
        <ArrowLeft className="w-4 h-4" /> Back to Insights
      </Link>
    </div>
  );
}

// ─── SHARE RAIL (left sticky) ─────────────────────────────────────────────────
function ShareRail() {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    copyLink();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex flex-col items-center gap-3 sticky top-28">
      <span className="text-[10px] font-mono tracking-widest uppercase text-slate-400 mb-1">Share</span>

      {/* LinkedIn */}
      <button
        onClick={shareOnLinkedIn}
        aria-label="Share on LinkedIn"
        className="group w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-200"
        style={{ borderColor: 'rgba(0,212,184,0.2)', background: 'transparent' }}
        onMouseEnter={e => {
          e.currentTarget.style.background = C.cyanGlow;
          e.currentTarget.style.borderColor = C.cyanBorder;
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'transparent';
          e.currentTarget.style.borderColor = 'rgba(0,212,184,0.2)';
        }}
      >
        <svg className="w-4 h-4 fill-current" style={{ color: C.cyanDim }} viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      </button>

      {/* Copy link */}
      <button
        onClick={handleCopy}
        aria-label="Copy link"
        className="w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-200 relative"
        style={{ borderColor: 'rgba(0,212,184,0.2)', background: 'transparent' }}
        onMouseEnter={e => {
          e.currentTarget.style.background = C.cyanGlow;
          e.currentTarget.style.borderColor = C.cyanBorder;
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'transparent';
          e.currentTarget.style.borderColor = 'rgba(0,212,184,0.2)';
        }}
      >
        <Link2 className="w-4 h-4" style={{ color: copied ? C.cyan : C.cyanDim }} />
        {copied && (
          <span className="absolute left-11 top-1/2 -translate-y-1/2 text-[10px] font-mono whitespace-nowrap px-2 py-1 rounded" style={{ background: C.darkCard, color: C.cyan, border: `1px solid ${C.cyanBorder}` }}>
            Copied!
          </span>
        )}
      </button>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function BlogDetail() {
  const { slug } = useParams();
  const [blog, setBlog]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState(null); // 'helpful' | 'not'
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  // Scroll progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`${API_BASE}/api/blogs`);
        if (res.ok) {
          const list = await res.json();
          const found = list.find(b => b.slug === slug);
          if (found) setBlog(found);
          // grab 2 others for prev/next
          const others = list.filter(b => b.slug !== slug);
          setRelatedBlogs(others.slice(0, 2));
        }
      } catch (err) {
        console.error('Blog fetch error:', err);
      } finally {
        setLoading(false);
      }
    }
    if (slug) fetchData();
  }, [slug, API_BASE]);

  if (loading) return <LoadingScreen />;
  if (!blog)   return <NotFoundScreen />;

  const coverImg  = blog.cover_img ? `${API_BASE}${blog.cover_img}` : null;
  const videoUrl  = blog.video_url || null; // only shown if present
  const readTime  = blog.read_time || '4 min read';
  const publishDate = blog.created_at
    ? new Date(blog.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : '';
  const authorInitial = blog.author ? blog.author.charAt(0).toUpperCase() : 'A';

  return (
    <>
      {/* ── SEO meta via next/head pattern (inline for app-router compatibility) ── */}
      <title>{blog.title} | Aarvi Engineering Services</title>

      <article className="min-h-screen" style={{ background: '#ffffff' }}>

        {/* ── READING PROGRESS BAR ── */}
        <motion.div
          className="fixed top-0 left-0 right-0 z-50 origin-[0%]"
          style={{ scaleX, height: '3px', background: C.cyan }}
        />

        {/* ════════════════════════════════════════════════════════════════
            HERO HEADER — dark bg, image right, content left
        ════════════════════════════════════════════════════════════════ */}
        <header
          className="relative overflow-hidden"
          style={{ background: C.dark, minHeight: '340px' }}
        >
          {/* Blueprint grid */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0,212,184,0.04) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,212,184,0.04) 1px, transparent 1px)
              `,
              backgroundSize: '48px 48px',
            }}
          />

          {/* Cover image — right half, fades into dark on left */}
          {coverImg && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute right-0 top-0 bottom-0 w-full lg:w-3/5">
                <img
                  src={coverImg}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                  style={{ opacity: 0.55 }}
                />
                {/* Gradient fade left */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(to right, #07080A 0%, #07080A 20%, rgba(7,8,10,0.6) 55%, transparent 100%)',
                  }}
                />
                {/* Gradient fade bottom */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(to top, #07080A 0%, transparent 40%)',
                  }}
                />
              </div>
            </div>
          )}

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-8 pb-12">

            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 mb-8">
              <Link href="/" className="text-white/40 hover:text-white/70 transition-colors">
                <Home className="w-3.5 h-3.5" />
              </Link>
              <ChevronRight className="w-3 h-3 text-white/25" />
              <Link href="/blogs" className="text-[11px] font-mono text-white/40 hover:text-white/70 transition-colors uppercase tracking-wider">
                Insights
              </Link>
              <ChevronRight className="w-3 h-3 text-white/25" />
              <span className="text-[11px] font-mono text-white/60 uppercase tracking-wider truncate max-w-50">
                {blog.title}
              </span>
            </nav>

            {/* Content — max half width so image shows on right */}
            <div className="max-w-xl lg:max-w-2xl">

              {/* Category pill */}
              {blog.category && (
                <div
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest mb-5"
                  style={{ background: C.cyanGlow, border: `1px solid ${C.cyanBorder}`, color: C.cyan }}
                >
                  <span className="w-1 h-1 rounded-full" style={{ background: C.cyan }} />
                  {blog.category}
                </div>
              )}

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-black text-white uppercase tracking-tight leading-[1.1] mb-4">
                {blog.title}
              </h1>

              {/* Excerpt / summary */}
              {blog.excerpt && (
                <p className="text-[15px] leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  {blog.excerpt}
                </p>
              )}

              {/* Author + meta row */}
              <div className="flex items-center gap-3 pt-4" style={{ borderTop: `1px solid rgba(255,255,255,0.08)` }}>
                {/* Avatar */}
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                  style={{ background: C.cyanGlow, border: `1px solid ${C.cyanBorder}`, color: C.cyan }}
                >
                  {authorInitial}
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-white">{blog.author || 'Aarvi Engineering Specialist'}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[11px]" style={{ color: 'rgba(255,255,255,0.4)' }}>{publishDate}</span>
                    {publishDate && <span className="text-white/20">·</span>}
                    <span className="flex items-center gap-1 text-[11px]" style={{ color: 'rgba(255,255,255,0.4)' }}>
                      <Clock className="w-3 h-3" /> {readTime}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* ════════════════════════════════════════════════════════════════
            BODY — white background, 3-col layout
        ════════════════════════════════════════════════════════════════ */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
          <div className="flex gap-8 lg:gap-12 xl:gap-16">

            {/* ── FAR LEFT: Share rail (desktop only) ── */}
            <div className="hidden lg:block w-10 shrink-0 pt-1">
              <ShareRail />
            </div>

            {/* ── CENTRE: Main article content ── */}
            <main className="flex-1 min-w-0">

              {/* Video embed — shown only if blog.video_url exists */}
              {videoUrl && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mb-10 rounded-2xl overflow-hidden shadow-lg"
                  style={{ background: '#0E1013', border: `1px solid ${C.cyanBorder}` }}
                >
                  <div className="relative" style={{ paddingBottom: '56.25%' }}>
                    {/* Support YouTube, Vimeo, or direct mp4 */}
                    {videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be') ? (
                      <iframe
                        src={videoUrl.replace('watch?v=', 'embed/').replace('youtu.be/', 'www.youtube.com/embed/')}
                        title={blog.title}
                        className="absolute inset-0 w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        loading="lazy"
                      />
                    ) : videoUrl.includes('vimeo.com') ? (
                      <iframe
                        src={`https://player.vimeo.com/video/${videoUrl.split('/').pop()}`}
                        title={blog.title}
                        className="absolute inset-0 w-full h-full"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                        loading="lazy"
                      />
                    ) : (
                      <video
                        src={videoUrl}
                        controls
                        className="absolute inset-0 w-full h-full object-cover"
                        preload="metadata"
                      />
                    )}
                  </div>
                </motion.div>
              )}

              {/* ── Prose content ── */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="
                  prose prose-lg max-w-none

                  prose-p:text-slate-600 prose-p:leading-[1.8] prose-p:mb-6

                  prose-headings:font-black prose-headings:tracking-tight prose-headings:text-slate-900
                  prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
                  prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3

                  prose-ul:list-disc prose-ul:pl-6 prose-ul:my-5
                  prose-ol:list-decimal prose-ol:pl-6 prose-ol:my-5
                  prose-li:text-slate-600 prose-li:mb-1

                  prose-strong:text-slate-900 prose-strong:font-bold

                  prose-a:text-[#00D4B8] prose-a:no-underline hover:prose-a:underline

                  prose-img:rounded-2xl prose-img:w-full prose-img:my-8

                  prose-blockquote:not-italic prose-blockquote:border-l-4 prose-blockquote:pl-5 prose-blockquote:my-8 prose-blockquote:text-slate-700 prose-blockquote:text-lg
                "
                style={{
                  '--tw-prose-quote-borders': C.cyan,
                }}
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />

              {/* ── Was this helpful? ── */}
              <div
                className="mt-14 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                style={{ borderTop: '1px solid #e5e7eb' }}
              >
                <div>
                  <p className="text-sm font-semibold text-slate-900">Was this article helpful?</p>
                  <p className="text-xs text-slate-400 mt-0.5">Your feedback helps us create better content.</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setFeedback('helpful')}
                    className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200"
                    style={{
                      borderColor: feedback === 'helpful' ? C.cyan : '#e5e7eb',
                      background:  feedback === 'helpful' ? C.cyanGlow : 'transparent',
                      color:       feedback === 'helpful' ? C.cyan : '#64748b',
                    }}
                  >
                    <ThumbsUp className="w-4 h-4" /> Helpful
                  </button>
                  <button
                    onClick={() => setFeedback('not')}
                    className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200"
                    style={{
                      borderColor: feedback === 'not' ? '#ef4444' : '#e5e7eb',
                      background:  feedback === 'not' ? 'rgba(239,68,68,0.06)' : 'transparent',
                      color:       feedback === 'not' ? '#ef4444' : '#64748b',
                    }}
                  >
                    <ThumbsDown className="w-4 h-4" /> Not Helpful
                  </button>
                </div>
              </div>

              {/* ── Mobile share row ── */}
              <div className="flex lg:hidden items-center gap-3 mt-8 pt-6" style={{ borderTop: '1px solid #e5e7eb' }}>
                <span className="text-xs text-slate-400 font-mono uppercase tracking-wider mr-1">Share</span>
                <button
                  onClick={shareOnLinkedIn}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border transition-all"
                  style={{ borderColor: C.cyanBorder, color: C.cyan, background: C.cyanGlow }}
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </button>
                <button
                  onClick={copyLink}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border border-slate-200 text-slate-500 transition-all hover:border-slate-400"
                >
                  <Link2 className="w-3.5 h-3.5" /> Copy Link
                </button>
              </div>

              {/* ── Prev / Next navigation ── */}
              {relatedBlogs.length > 0 && (
                <div
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12 pt-10"
                  style={{ borderTop: '1px solid #e5e7eb' }}
                >
                  {relatedBlogs[0] && (
                    <Link
                      href={`/blogs/${relatedBlogs[0].slug}`}
                      className="group flex items-start gap-4 p-4 rounded-2xl border border-slate-100 hover:border-slate-300 transition-all duration-200"
                    >
                      {relatedBlogs[0].cover_img && (
                        <img
                          src={`${API_BASE}${relatedBlogs[0].cover_img}`}
                          alt={relatedBlogs[0].title}
                          className="w-16 h-14 object-cover rounded-xl shrink-0"
                        />
                      )}
                      <div>
                        <span className="flex items-center gap-1 text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                          <ArrowLeft className="w-3 h-3" /> Previous Article
                        </span>
                        <p className="text-sm font-semibold text-slate-900 group-hover:text-[#00D4B8] transition-colors leading-snug line-clamp-2">
                          {relatedBlogs[0].title}
                        </p>
                      </div>
                    </Link>
                  )}
                  {relatedBlogs[1] && (
                    <Link
                      href={`/blogs/${relatedBlogs[1].slug}`}
                      className="group flex items-start gap-4 p-4 rounded-2xl border border-slate-100 hover:border-slate-300 transition-all duration-200 sm:flex-row-reverse sm:text-right"
                    >
                      {relatedBlogs[1].cover_img && (
                        <img
                          src={`${API_BASE}${relatedBlogs[1].cover_img}`}
                          alt={relatedBlogs[1].title}
                          className="w-16 h-14 object-cover rounded-xl shrink-0"
                        />
                      )}
                      <div>
                        <span className="flex items-center justify-end gap-1 text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                          Next Article <ArrowRight className="w-3 h-3" />
                        </span>
                        <p className="text-sm font-semibold text-slate-900 group-hover:text-[#00D4B8] transition-colors leading-snug line-clamp-2">
                          {relatedBlogs[1].title}
                        </p>
                      </div>
                    </Link>
                  )}
                </div>
              )}
            </main>

            {/* ── RIGHT: Sticky sidebar ── */}
            <aside className="hidden lg:block w-64 xl:w-72 shrink-0">
              <div className="sticky top-24 flex flex-col gap-5">

                {/* Table of contents */}
                <div className="rounded-2xl border border-slate-200 p-5 bg-slate-50/60">
                  <p className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest mb-4">
                    On This Page
                  </p>
                  <TOCLinks content={blog.content} cyan={C.cyan} />
                </div>

                {/* Download whitepaper CTA */}
                {blog.whitepaper_url && (
                  <div
                    className="rounded-2xl p-5"
                    style={{ background: C.cyanGlow, border: `1px solid ${C.cyanBorder}` }}
                  >
                    <Download className="w-5 h-5 mb-3" style={{ color: C.cyan }} />
                    <p className="text-sm font-bold text-slate-900 mb-1">Engineering Whitepaper</p>
                    <p className="text-xs text-slate-500 mb-4">Download our detailed guide on this topic.</p>
                    <a
                      href={blog.whitepaper_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-bold text-black transition-opacity hover:opacity-80"
                      style={{ background: C.cyan }}
                    >
                      <Download className="w-4 h-4" /> Download PDF
                    </a>
                  </div>
                )}

                {/* Expert consultation CTA */}
                <div
                  className="rounded-2xl p-5"
                  style={{ background: C.dark, border: `1px solid rgba(255,255,255,0.08)` }}
                >
                  <p className="text-sm font-bold text-white mb-1">Need Expert Consultation?</p>
                  <p className="text-xs mb-4" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    Our engineering specialists can help you design safer, more resilient structures.
                  </p>
                  <Link
                    href="/contact"
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-bold border transition-all duration-200"
                    style={{ borderColor: C.cyanBorder, color: C.cyan, background: 'transparent' }}
                    onMouseEnter={e => e.currentTarget.style.background = C.cyanGlow}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <Phone className="w-4 h-4" /> Get in Touch
                  </Link>
                </div>

              </div>
            </aside>

          </div>
        </div>
      </article>
    </>
  );
}

// ─── TOC LINKS — parses h2/h3 from HTML content ──────────────────────────────
function TOCLinks({ content, cyan }) {
  const [activeId, setActiveId] = useState(null);

  // Extract headings from HTML string
  const headings = React.useMemo(() => {
    if (!content || typeof document === 'undefined') return [];
    const div = document.createElement('div');
    div.innerHTML = content;
    const tags = div.querySelectorAll('h2, h3');
    return Array.from(tags).map(el => ({
      id:    el.id || el.textContent.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      text:  el.textContent,
      level: el.tagName,
    }));
  }, [content]);

  useEffect(() => {
    if (!headings.length) return;
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-20% 0% -70% 0%' }
    );
    headings.forEach(h => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headings]);

  if (!headings.length) {
    // Fallback static links if no headings parsed
    return (
      <nav className="space-y-2">
        <a href="#" className="block text-sm font-medium" style={{ color: cyan }}>Introduction</a>
      </nav>
    );
  }

  return (
    <nav className="space-y-2">
      {headings.map(h => (
        <a
          key={h.id}
          href={`#${h.id}`}
          className="block text-xs leading-snug transition-colors duration-150"
          style={{
            color:       activeId === h.id ? cyan : '#64748b',
            fontWeight:  activeId === h.id ? '600' : '400',
            paddingLeft: h.level === 'H3' ? '12px' : '0',
          }}
          onClick={e => {
            e.preventDefault();
            document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          {activeId === h.id && (
            <span className="inline-block w-1.5 h-1.5 rounded-full mr-1.5 mb-0.5" style={{ background: cyan }} />
          )}
          {h.text}
        </a>
      ))}
    </nav>
  );
}