"use client";
import React from 'react';
import { ArrowDown } from 'lucide-react';

export default function Hero() {
  // Smooth scroll handler
  const scrollToNextSection = () => {
    window.scrollBy({ 
      top: window.innerHeight, // Scrolls exactly one screen down
      behavior: 'smooth' 
    });
  };

  return (
    // The outer section provides the white space (padding) around the video card
    <section className="w-full bg-white px-4 sm:px-6 lg:px-8 py-6">
      
      {/* The Video Container - mimicking the Scale.com rounded card look */}
      <div className="relative w-full h-[85vh] min-h-150 rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center">
        
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          src="/hero-factory.mp4" 
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        
        {/* Dual-Layer Dark Overlay for Premium Text Readability */}
        <div className="absolute inset-0 bg-aarvi-navy/40 z-10 mix-blend-multiply" />
        <div className="absolute inset-0 bg-linear-to-t from-aarvi-navy/80 via-transparent to-transparent z-10" />

        {/* Content Overlay */}
        <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 w-full">
          
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-sans font-black text-white tracking-tight leading-[1.1] max-w-5xl">
            ENGINEERING THAT <br className="hidden sm:block" />
            <span className="text-[#008A5E]">GETS BUILT.</span>
          </h1>
          
          <p className="mt-6 text-sm sm:text-lg text-slate-200 max-w-2xl font-medium leading-relaxed drop-shadow-md">
            Industrial assets are built once but operated for decades. Aarvi delivers integrated engineering solutions that reduce project risk and ensure long-term operational success.
          </p>
          
        </div>

        {/* Fully Functional Scroll Indicator */}
        <button 
          onClick={scrollToNextSection}
          className="absolute bottom-8 right-8 z-20 flex items-center gap-3 text-white/80 font-mono text-xs hover:text-white transition-colors cursor-pointer group focus:outline-none"
          aria-label="Scroll down to next section"
        >
          <span className="hidden sm:block">Scroll to explore</span>
          <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center group-hover:border-white/80 transition-colors">
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </div>
        </button>

      </div>
    </section>
  );
}