"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Award, Briefcase, Users, Globe } from 'lucide-react';

export default function HeroSection() {
  // Smooth scroll handler
  const scrollToNextSection = () => {
    window.scrollBy({ 
      top: window.innerHeight, 
      behavior: 'smooth' 
    });
  };

  // Animation variants for smooth staggered loading
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const stats = [
  {
    value: "150+",
    label: "Skilled Professionals",
    icon: Users,
  },
  {
    value: "Global",
    label: "Project Experience",
    icon: Globe,
  },
  {
    value: "Multi-Discipline",
    label: "Engineering Expertise",
    icon: Briefcase,
  },
];

  return (
    // The outer section provides the white space (padding) around the video card
    <section className="w-full bg-white px-4 sm:px-6 lg:px-8 py-6">
      
      {/* The Video Container - mimicking the rounded card look */}
      <div className="relative w-full h-screen min-h-225 rounded-4xl overflow-hidden shadow-2xl flex items-center">
        
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          src="/about_hero.mp4" 
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        
        {/* Gradients for Premium Text Readability (Darker on the left) */}
        <div className="absolute inset-0 bg-[#0B1221]/40 z-10 mix-blend-multiply" />
        <div className="absolute inset-0 bg-linear-to-r from-[#0B1221]/90 via-[#0B1221]/60 to-transparent z-10" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-[#0B1221]/90 to-transparent z-10" />

        {/* Content Overlay */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="relative z-20 flex flex-col items-start justify-start pt-24 pb-14 text-left px-10 md:px-20 lg:px-28 w-full h-full max-w-7xl mx-auto"
        >
          <div className="max-w-3xl">
            <motion.p variants={itemVariants} className="font-mono text-xs sm:text-sm font-bold tracking-[0.25em] text-[#008A5E] uppercase mb-4 sm:mb-6">
              ABOUT US
            </motion.p>
            
            <motion.h1
  variants={itemVariants}
  className="text-5xl sm:text-7xl lg:text-[74px] font-black text-white leading-[1.02] tracking-tight mb-3"
>
  ENGINEERING <br className="hidden sm:block" />
  THAT <span className="text-[#008A5E]">GETS BUILT.</span>
</motion.h1>

<motion.h2
  variants={itemVariants}
  className="text-xl md:text-2xl font-semibold text-white mb-4"
>
  Beyond design. Into performance.
</motion.h2>
            
            <motion.div
  variants={itemVariants}
  className="max-w-3xl text-sm lg:text-base text-slate-300 leading-7 space-y-4 mb-10"
>
  <p>
    Industrial assets are built once, yet must perform safely, efficiently and
    reliably for decades. That is why engineering cannot stop at design — it
    must extend into construction, enable operations and create lasting asset
    value.
  </p>

  <p>
    Aarvi Engineering partners with owners, operators, EPC contractors and PMC
    organizations to deliver integrated, multidisciplinary engineering
    solutions across the complete asset lifecycle.
  </p>

  <p>
    By combining technical expertise, digital engineering and hands-on project
    experience, we help clients reduce project risk, improve execution
    certainty, and build assets engineered not just to be built — but to
    perform.
  </p>
</motion.div>
          </div>

          {/* Glassmorphism Stat Cards Row */}
          <motion.div variants={itemVariants} className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-5xl">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="flex flex-col justify-between p-5 md:p-6 bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.1)] transition-colors duration-300 group"
              >
                <stat.icon className="w-6 h-6 text-[#008A5E] mb-4 group-hover:scale-110 transition-transform duration-300" strokeWidth={2} />
                <div>
                  <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-1">{stat.value}</h3>
                  <p className="text-sm font-medium text-slate-300">{stat.label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Fully Functional Scroll Indicators matching the image */}
        <button
  onClick={scrollToNextSection}
  className="absolute bottom-8 right-8 md:right-12 lg:right-16 z-30 flex items-center gap-3 text-white/80 hover:text-white transition-all duration-300 cursor-pointer group focus:outline-none"
  aria-label="Scroll down to next section"
>
  <span className="hidden sm:block font-mono text-xs uppercase tracking-[0.25em] font-semibold">
    Scroll to explore
  </span>

  <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center group-hover:border-white group-hover:bg-white/10 transition-all duration-300">
    <ArrowDown className="w-4 h-4 animate-bounce" />
  </div>
</button>

      </div>
    </section>
  );
}