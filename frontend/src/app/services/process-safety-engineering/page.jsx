"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Activity, Database, FileText, Settings, ShieldAlert, Cpu, 
  Target, ClipboardCheck, ArrowRight, Factory, ArrowUpRight, ShieldCheck
} from 'lucide-react';

import wireframeImg from '../../../assets/refinery-wireframe.png';

// ─────────────────────────────────────────────────────────────────────────────
// EXACT CLIENT DATA PAYLOAD
// ─────────────────────────────────────────────────────────────────────────────

const CAPABILITIES = [
  {
    num: "01",
    icon: Activity,
    title: "Process Design & Simulation",
    desc: "Rigorous steady-state and dynamic thermodynamic multi-phase processing models."
  },
  {
    num: "02",
    icon: Database,
    title: "Heat & Material Balance",
    desc: "Comprehensive stream property data generation across operational envelopes."
  },
  {
    num: "03",
    icon: FileText,
    title: "PFD, P&ID & Datasheets",
    desc: "Intelligent drafting and configuration mapping for equipment and instrumentation."
  },
  {
    num: "04",
    icon: Settings,
    title: "Utility & Hydraulic Studies",
    desc: "Network analysis mapping line friction heads, pump NPSH, and full sizing matrices."
  },
  {
    num: "05",
    icon: ShieldAlert,
    title: "Process Hazard Analysis",
    desc: "Expertly facilitated HAZID & HAZOP screening sessions for high-consequence failure modes."
  },
  {
    num: "06",
    icon: Cpu,
    title: "SIL & Functional Safety",
    desc: "Assessment and layer of protection analysis to calibrate automated safety instrument functions."
  },
  {
    num: "07",
    icon: Target,
    title: "Risk & Consequence Analysis",
    desc: "Quantitative mapping of gas cloud bounds, thermal radiation flares, and overpressure."
  },
  {
    num: "08",
    icon: ClipboardCheck,
    title: "Process Safety Management",
    desc: "Pre-commissioning safety audits, mechanical completion, and operational readiness."
  }
];

const SOFTWARE_ECOSYSTEM = [
  "Aspen HYSYS", "Aspen Plus", "PipeNet", "FlareSIM", 
  "PHAST", "SAFETI", "PHA-Pro", "exSILentia", "Detect3D"
];

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATION VARIANTS
// ─────────────────────────────────────────────────────────────────────────────

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const cardReveal = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 15 } }
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default function ProcessSafetyEngineeringPage() {
  return (
    <main className="w-full bg-[#FAFAFA] min-h-screen text-slate-800 font-sans selection:bg-[#1db87a] selection:text-white">
      
      {/* ─── 1. HERO SECTION ─── */}
      <section className="relative w-full min-h-[70vh] flex flex-col lg:flex-row bg-white overflow-hidden border-b border-slate-200">
        {/* Left Content */}
        <div className="w-full lg:w-[50%] flex flex-col justify-center px-6 lg:px-16 xl:px-24 py-20 relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-6"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#1db87a]/20 bg-[#1db87a]/5 text-[#1db87a] font-black text-[10px] tracking-[0.25em] uppercase font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1db87a] animate-pulse" />
              Core Capability
            </span>
            <h1 className="text-4xl lg:text-6xl font-black text-[#0a1628] leading-[1.05] tracking-tight uppercase">
              Process & Safety <br />Engineering
            </h1>
            <div className="w-16 h-1.5 bg-[#1db87a] rounded-full my-6" />
            <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-lg font-medium">
              We deliver rigorous thermodynamic modeling, hydraulic flow networks, and quantified risk assessments to ensure your industrial assets operate at maximum efficiency with zero-compromise safety protocols.
            </p>
          </motion.div>
        </div>

        {/* Right Video / Graphic Container */}
        <div className="w-full lg:w-[50%] relative min-h-100 lg:min-h-full">
          <div 
            className="absolute inset-0 w-full h-full overflow-hidden lg:rounded-tl-[100px]"
            style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 100%, 0% 100%)' }}
          >
            {/* Background Video */}
            <video 
              autoPlay muted loop playsInline 
              src="/process-hero.mp4"
              className="absolute inset-0 w-full h-full object-cover scale-105"
            />
            {/* Navy Overlay Blend */}
            <div className="absolute inset-0 bg-[#0a1628]/60 mix-blend-multiply" />
            
            {/* Wireframe Overlay for technical aesthetic */}
            <Image 
              src={wireframeImg} 
              alt="Engineering Wireframe" 
              fill
              className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay"
            />
          </div>
        </div>
      </section>

      {/* ─── 2. SCOPE OF SERVICES GRID ─── */}
      <section className="relative max-w-7xl mx-auto px-6 lg:px-10 py-24 z-10">
        
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-[#0a1628] uppercase tracking-tight mb-4">
            Execution Scope
          </h2>
          <p className="text-sm font-semibold text-slate-500">
            From initial thermodynamic modeling to final operational handover, our process matrix covers the complete asset lifecycle.
          </p>
        </div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {CAPABILITIES.map((cap) => {
            const Icon = cap.icon;
            return (
              <motion.div
                variants={cardReveal}
                key={cap.num}
                className="bg-white border border-slate-200 rounded-3xl p-8 hover:border-[#1db87a]/50 hover:shadow-[0_20px_40px_rgba(29,184,122,0.08)] hover:-translate-y-1.5 transition-all duration-300 group flex flex-col h-full"
              >
                <div className="flex items-start justify-between mb-8">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-[#1db87a] group-hover:text-white group-hover:border-[#1db87a] transition-colors duration-300">
                    <Icon className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <span className="font-mono text-[10px] font-black tracking-widest text-slate-300 group-hover:text-[#1db87a] transition-colors">
                    {cap.num}
                  </span>
                </div>
                
                <h3 className="text-lg font-black text-[#0a1628] leading-tight mb-3">
                  {cap.title}
                </h3>
                
                <p className="text-xs text-slate-500 font-medium leading-relaxed mt-auto">
                  {cap.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* ─── 3. SOFTWARE & TECH STACK ─── */}
      <section className="bg-[#0a1628] py-24 relative overflow-hidden">
        {/* Subtle grid background for the dark section */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
            backgroundSize: '32px 32px'
          }}
        />

        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          <div className="w-full lg:w-1/3 text-center lg:text-left">
            <ShieldCheck className="w-10 h-10 text-[#1db87a] mx-auto lg:mx-0 mb-6" strokeWidth={1.5} />
            <h2 className="text-3xl font-black text-white uppercase tracking-tight mb-4">
              Powered by Industry-Leading Tools
            </h2>
            <p className="text-sm font-medium text-slate-400 leading-relaxed">
              We leverage the world's most advanced thermodynamic and risk calculation environments to ensure absolute mathematical precision.
            </p>
          </div>

          <div className="w-full lg:w-2/3">
            <div className="flex flex-wrap justify-center lg:justify-start gap-3">
              {SOFTWARE_ECOSYSTEM.map((sw, index) => (
                <motion.div 
                  key={sw}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="px-6 py-3.5 bg-white/5 border border-white/10 hover:border-[#1db87a]/50 hover:bg-white/10 rounded-xl transition-all duration-300 backdrop-blur-sm cursor-default"
                >
                  <span className="font-mono text-[11px] font-black text-white uppercase tracking-widest">
                    {sw}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
          
        </div>
      </section>

      {/* ─── 4. CLOSING CTA BANNER ─── */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-24 flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="space-y-3 text-center md:text-left">
            <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#1db87a]">
              ┼ LET'S ENGINEER SAFETY TOGETHER
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-[#0a1628] tracking-tight uppercase">
              Need Engineering Expertise?
            </h2>
            <p className="text-slate-500 text-sm font-medium max-w-md">
              Connect with our technical authorities to discuss your specific process design and safety compliance requirements.
            </p>
          </div>

          <div className="shrink-0">
            <Link 
              href="/contact" 
              className="bg-[#1db87a] text-white text-[11px] font-black uppercase tracking-widest px-8 py-4 rounded-lg shadow-[0_10px_20px_rgba(29,184,122,0.2)] hover:shadow-[0_15px_30px_rgba(29,184,122,0.3)] hover:-translate-y-1 transition-all duration-300 flex items-center gap-3"
            >
              Consult an Expert <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />
            </Link>
          </div>

        </div>
      </section>

    </main>
  );
}