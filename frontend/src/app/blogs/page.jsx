"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Clock, ArrowRight, AlertCircle } from 'lucide-react';

export default function BlogFeedPortal() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  useEffect(() => {
    async function fetchPublications() {
      try {
        const res = await fetch(`${API_BASE}/api/blogs`);
        if (!res.ok) throw new Error('Database pipeline stream rejection.');
        const data = await res.json();
        setBlogs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPublications();
  }, [API_BASE]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center space-y-4">
        <div className="w-8 h-8 border-2 border-[#1a1a1a] border-t-[#52b7a3] rounded-full animate-spin" />
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Loading Publications...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
        <AlertCircle className="w-12 h-12 text-rose-500 mb-4" />
        <h3 className="text-lg font-bold text-[#1a1a1a] mb-1">Network Connection Interrupted</h3>
        <p className="text-sm text-slate-500 max-w-sm mb-4">The system failed to reach the live FastAPI server. Ensure uvicorn is running live on port 8000.</p>
      </div>
    );
  }

  // Slice the data to perfectly match the layout in the image
  const featuredPost = blogs[0];
  const sidePosts = blogs.slice(1, 4); // The 3 stacked posts on the right
  const gridPosts = blogs.slice(4); // The remaining posts for the bottom grid

  return (
    <div className="bg-[#fafafa] min-h-screen pt-24 pb-32">
      <div className="max-w-300 mx-auto px-6 lg:px-8">
        
        {/* ─── TOP HEADER ─── */}
        <header className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-6">
            Our Insightful <span className="relative inline-block">
              Blog
              <span className="absolute left-0 -bottom-1 w-full h-0.75 bg-[#52b7a3]"></span>
            </span>
          </h1>
          <p className="text-slate-500 text-sm leading-relaxed">
            Stay updated with the latest in multi-discipline engineering, architectural innovations, and technical whitepapers delivered by our global specialists.
          </p>
        </header>

        {blogs.length === 0 ? (
          <div className="border border-slate-200 bg-white rounded-xl p-12 text-center text-slate-400 font-medium text-sm shadow-sm">
            No articles published yet. Log into the admin portal to push your first entry.
          </div>
        ) : (
          <>
            {/* ─── HERO SPLIT SECTION ─── */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-24">
              
              {/* Left Side: Massive Featured Card */}
             {featuredPost && (
                <Link href={`/blogs/${featuredPost.slug}`} className="lg:col-span-7 group block relative rounded-2xl overflow-hidden aspect-4/3 lg:aspect-auto min-h-100 shadow-sm">
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors z-10" />
                  {/* Subtle bottom gradient for text readability */}
                  <div className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-[#1a1a1a]/90 to-transparent z-10" />
                  
                  <img 
                    src={featuredPost.cover_img ? `${API_BASE}${featuredPost.cover_img}` : 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=1200'} 
                    alt={featuredPost.title}
                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  <div className="absolute bottom-0 left-0 p-8 z-20 w-full">
                    <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-3 group-hover:text-[#52b7a3] transition-colors">
                      {featuredPost.title}
                    </h2>
                    <div className="flex items-center gap-2 text-white/80 text-xs font-medium mb-3">
                      <Clock className="w-3.5 h-3.5" />
                      {new Date(featuredPost.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </div>
                    <p className="text-white/70 text-sm line-clamp-2 pr-4">
                      {featuredPost.excerpt}
                    </p>
                  </div>
                </Link>
              )}

              {/* Right Side: Stack of 3 Smaller Cards */}
              <div className="lg:col-span-5 flex flex-col justify-between gap-6">
                {sidePosts.map((post, index) => (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    key={post.id}
                  >
                    <Link href={`/blogs/${post.slug}`} className="group flex items-center gap-6 bg-white rounded-2xl p-4 shadow-sm border border-slate-100 hover:shadow-md transition-all h-32.5">
                      <div className="w-1/3 h-full rounded-lg overflow-hidden shrink-0">
                        <img 
                          src={post.cover_img ? `${API_BASE}${post.cover_img}` : 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800'} 
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="w-2/3 flex flex-col justify-center">
                        <h3 className="text-[#1a1a1a] font-bold text-sm md:text-base leading-tight mb-2 line-clamp-2 group-hover:text-[#52b7a3] transition-colors">
                          {post.title}
                        </h3>
                        <div className="flex items-center gap-2 text-slate-400 text-xs font-medium mb-3">
                          <Clock className="w-3 h-3" />
                          {new Date(post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </div>
                        <span className="text-[#1a1a1a] text-xs font-bold flex items-center gap-1 group-hover:text-[#52b7a3] transition-colors">
                          Read More <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* ─── GRID TITLE SECTION ─── */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4 border-b border-slate-200 pb-6">
              <h2 className="text-3xl font-bold text-[#1a1a1a]">
                Explore Our Latest <span className="relative inline-block">
                  Articles
                  <span className="absolute left-0 -bottom-1 w-full h-0.75 bg-[#52b7a3]"></span>
                </span>
              </h2>
              <p className="text-slate-500 text-sm max-w-md md:text-right">
                Dive deeper into specialized insights, from artificial intelligence integration to sustainable architectural showcases.
              </p>
            </div>

            {/* ─── 3-COLUMN GRID ─── */}
            {gridPosts.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                {gridPosts.map((post, index) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    key={post.id}
                  >
                    <Link href={`/blogs/${post.slug}`} className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-lg transition-all flex flex-col h-full">
                      <div className="w-full aspect-4/3 overflow-hidden">
                        <img 
                          src={post.cover_img ? `${API_BASE}${post.cover_img}` : 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800'} 
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-6 flex flex-col grow">
                        <h3 className="text-[#1a1a1a] font-bold text-lg leading-tight mb-3 line-clamp-2 group-hover:text-[#52b7a3] transition-colors">
                          {post.title}
                        </h3>
                        <div className="flex items-center gap-2 text-slate-400 text-xs font-medium mb-4 grow">
                          <Clock className="w-3.5 h-3.5" />
                          {new Date(post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </div>
                        <span className="text-[#1a1a1a] text-sm font-bold flex items-center gap-1 group-hover:text-[#52b7a3] transition-colors mt-auto">
                          Read More <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}

            {/* ─── BUTTON BLOCK ─── */}
            {gridPosts.length > 0 && (
              <div className="flex justify-center mt-12">
                <button className="bg-[#1a1a1a] hover:bg-[#333333] text-white text-sm font-semibold py-3 px-8 rounded-lg transition-colors shadow-md">
                  View all articles
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}