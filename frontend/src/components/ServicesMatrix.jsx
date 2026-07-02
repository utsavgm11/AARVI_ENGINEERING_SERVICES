"use client";
import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowUpRight, Activity, Layers, Disc, Hammer, Compass,
  Zap, Sliders, Cpu, Briefcase, FileCheck, Box, Database
} from 'lucide-react';

// ─── LOCAL ASSETS ───────────────────────────────────────────────────────────
import img1  from '../assets/service-1.png';
import img2  from '../assets/service-2.png';
import img3  from '../assets/service-3.png';
import img4  from '../assets/service-4.png';
import img5  from '../assets/service-5.png';
import img6  from '../assets/service-6.png';
import img7  from '../assets/service-7.png';
import img8  from '../assets/service-8.png';
import img9  from '../assets/service-9.png';
import img10 from '../assets/service-10.png';
import img11 from '../assets/service-11.png';
import img12 from '../assets/service-12.png';

// ─── THEME TOKENS (Upgraded to Hero Palette) ────────────────────────────────
const CYAN       = '#00E8B8';        // brighter, modern premium cyan
const CYAN_DIM   = 'rgba(0,232,184,0.55)';
const CYAN_GLOW  = 'rgba(0,232,184,0.04)'; // Subtle row glow
const CYAN_BORDER= 'rgba(0,232,184,0.18)'; // Softened borders (40% reduction)

// ─── SERVICE DATA ────────────────────────────────────────────────────────────
const SERVICES = [
  { title: "Process & Safety Engineering", code: "PE-101", desc: "FEED studies, process simulation, PFD/P&ID development, and SIL assessments.", icon: Activity, href: "/services/process-safety-engineering", img: img1 },
  { title: "Plant Layout & Piping Engineering", code: "PP-102", desc: "3D routing, clash resolution, and isometric extraction.", icon: Layers, href: "/services/plant-layout-piping", img: img2 },
  { title: "Mechanical Engineering", code: "ME-103", desc: "Static/rotating equipment sizing, vendor reviews, and pressure vessel support.", icon: Hammer, href: "/services/mechanical-equipment", img: img4 },
  { title: "Civil & Structural Engineering", code: "CS-104", desc: "Site development, structural steel racks, and blast-resistant design.", icon: Compass, href: "/services/civil-structural", img: img5 },
  { title: "Electrical Engineering", code: "EL-105", desc: "Power system design, short circuit studies, and substation compliance.", icon: Zap, href: "/services/electrical-engineering", img: img7 },
  { title: "Instrumentation & Control Engineering", code: "IC-106", desc: "Datasheet development, cause & effect matrices, and SIS support.", icon: Sliders, href: "/services/instrumentation-control", img: img8 },
  { title: "Engineering Simulations", code: "FE-107", desc: "Advanced computational fluid dynamics (CFD) and structural behaviour checks.", icon: Cpu, href: "/services/engineering-simulations", img: img10 },
  { title: "Digital Engineering & 3D Modelling", code: "DE-108", desc: "Integrated intelligent 3D plant coordination models and database upgrades.", icon: Box, href: "/services/digital-engineering-3d", img: img9 },
  { title: "Project Engineering & PMC Support", code: "PM-109", desc: "Project management, scheduling, and multi-discipline interface coordination.", icon: Briefcase, href: "/services/project-engineering-pmc", img: img11 },
  { title: "As-Built & Asset Documentation", code: "AB-110", desc: "Database reconciliation and asset info validation handover packages.", icon: FileCheck, href: "/services/as-built-documentation", img: img12 },
  { title: "Engineering Data & Digitalization", code: "ED-111", desc: "Legacy drawing digitization and digital twin data preparation workflows.", icon: Database, href: "/services/engineering-data-digitalization", img: img6 },
  { title: "Construction, Commissioning & Asset Support.", code: "CC-112", desc: "Mechanical completion reviews, pre-commissioning, and startup support.", icon: Disc, href: "/services/construction-commissioning-support", img: img3 },
];

const COL_A = SERVICES.slice(0, 6);
const COL_B = SERVICES.slice(6, 12);

// ─── SERVICE ROW ─────────────────────────────────────────────────────────────
function ServiceRow({ svc, idx, globalIdx, isActive, isInView, onHover }) {
  const Icon = svc.icon;
  return (
    <motion.div
      initial={{ opacity: 0, x: -14 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: 0.08 + idx * 0.04, duration: 0.32 }}
      onMouseEnter={onHover}
      className="group relative"
    >
      {/* Background Hover Glow Block */}
      <div 
        className="absolute inset-0 -mx-4 rounded-xl transition-all duration-300 pointer-events-none"
        style={{
          background: isActive ? CYAN_GLOW : 'transparent',
          boxShadow: isActive ? '0 0 25px rgba(0,232,184,0.08)' : 'none',
        }}
      />
      
      <Link
        href={svc.href}
        aria-label={svc.title}
        className="relative flex items-center gap-4 py-4 border-b w-full outline-none focus-visible:ring-1 z-10" // Increased py-4 for breathing room
        style={{
          borderBottomColor: isActive ? CYAN_BORDER : 'rgba(255,255,255,0.04)', // Reduced default border opacity
          transition: 'border-color 0.22s',
          focusVisibleRingColor: CYAN,
        }}
      >
        {/* Icon box */}
        <div
          className="w-7 h-7 rounded-md flex items-center justify-center shrink-0 border transition-all duration-300"
          style={{
            background:  isActive ? CYAN_GLOW  : 'rgba(255,255,255,0.02)',
            borderColor: isActive ? CYAN_BORDER : 'rgba(255,255,255,0.05)',
            color:       isActive ? CYAN        : 'rgba(255,255,255,0.4)',
          }}
        >
          <Icon className="w-3.5 h-3.5" strokeWidth={1.5} />
        </div>

        {/* Title (Increased text size to 15px and opacity to 0.78 for better typography) */}
        <span
          className="flex-1 text-[15px] font-bold uppercase tracking-wide transition-colors duration-200 leading-tight"
          style={{ color: isActive ? '#ffffff' : 'rgba(255,255,255,0.78)' }}
        >
          {svc.title}
        </span>

        {/* Arrow */}
        <ArrowUpRight
          className="w-3.5 h-3.5 shrink-0 transition-all duration-300"
          style={{
            color:     isActive ? CYAN : 'rgba(255,255,255,0.15)',
            transform: isActive ? 'translate(0,-2px)' : 'translate(0,0)',
          }}
        />
      </Link>
    </motion.div>
  );
}

// ─── COMPONENT ───────────────────────────────────────────────────────────────
export default function ServicesMatrix() {
  const ref      = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [activeIdx, setActiveIdx] = useState(0);
  const active = SERVICES[activeIdx];

  return (
    <section
      ref={ref}
      // Added scanline animation class from your global CSS
      className="relative w-full bg-[#04050A] py-24 lg:py-28 overflow-hidden selection:bg-[#00E8B8] selection:text-black"
      aria-label="Engineering Services"
    >
      {/* ── BACKGROUND: Ambient Animations & Scanlines (Grid Removed) ── */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        
        {/* Soft Scanline Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_50%)] bg-size-[100%_4px] opacity-70" />
        
        {/* Animated Top Left Glow */}
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -left-40 w-150 h-150 rounded-full opacity-60"
          style={{ background: 'radial-gradient(circle, rgba(0,232,184,0.08) 0%, transparent 65%)' }}
        />
        
        {/* Animated Center Glow */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 rounded-full opacity-40"
          style={{ background: 'radial-gradient(circle, rgba(0,232,184,0.05) 0%, transparent 60%)' }}
        />
        
        {/* Animated Bottom Right Glow */}
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-40 -right-40 w-150 h-150 rounded-full opacity-60"
          style={{ background: 'radial-gradient(circle, rgba(0,232,184,0.08) 0%, transparent 65%)' }}
        />

      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">

        {/* ── HEADER ─────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex items-end justify-between mb-12 lg:mb-16" // Increased bottom margin
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              {/* Cyan pulse dot */}
              <div className="w-1.5 h-1.5 rounded-full animate-pulse shadow-[0_0_8px_#00E8B8]" style={{ background: CYAN }} />
              <span
                className="text-[10px] font-mono tracking-[0.25em] uppercase"
                style={{ color: CYAN }}
              >
                Core Capabilities
              </span>
            </div>
            {/* Unified White Color for Both Words */}
            <h2 className="text-3xl md:text-4xl lg:text-[3rem] font-black text-white uppercase tracking-tight leading-[1.05]">
              Engineering
              <span className="ml-3 text-white">Services</span>
            </h2>
          </div>
        </motion.div>

        {/* ── MAIN LAYOUT ─────────────────────────────────────────────────── */}
        <div className="flex items-start gap-8 xl:gap-12"> {/* Increased gap for breathing room */}

          {/* ─ Left: Live Preview Panel ─ */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            aria-live="polite"
            aria-atomic="true"
            className="hidden lg:block w-72 xl:w-80 shrink-0 sticky top-24 self-start"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, y: 7 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -7 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
              >
                {/* UPGRADED CARD UI: Glass linear gradient, depth shadow */}
                <div
                  className="rounded-2xl overflow-hidden backdrop-blur-sm"
                  style={{
                    background: 'linear-gradient(180deg, rgba(15,20,28,.95), rgba(9,11,18,.95))',
                    border: `1px solid rgba(0,232,184,0.15)`,
                    boxShadow: `0 20px 40px -10px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)`,
                  }}
                >
                  {/* Service image (Sharper Treatment) */}
                  <div className="relative w-full" style={{ aspectRatio: '3 / 2' }}>
                    <Image
                      src={active.img}
                      alt={active.title}
                      fill
                      sizes="320px"
                      className="object-cover transition-all duration-500"
                      style={{
                        opacity: 0.9,
                        // Sharper, higher contrast, better saturation
                        filter: 'brightness(0.95) contrast(1.08) saturate(0.85)',
                      }}
                    />
                    {/* Gradient fade to card bg */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background: 'linear-gradient(to top, rgba(9,11,18,1) 0%, rgba(9,11,18,0.2) 60%, transparent 100%)',
                      }}
                    />
                  </div>

                  {/* Service info */}
                  <div className="px-6 pt-3 pb-6 relative z-10">
                    <h3 className="text-[15px] font-black text-white uppercase tracking-tight leading-snug">
                      {active.title}
                    </h3>
                    <p className="text-[12px] leading-relaxed mt-2" style={{ color: 'rgba(255,255,255,0.65)' }}>
                      {active.desc}
                    </p>
                    <Link
                      href={active.href}
                      className="inline-flex items-center gap-1.5 text-[10.5px] font-mono mt-5 pb-px transition-colors duration-200 group"
                      style={{ color: CYAN_DIM, borderBottom: `1px solid ${CYAN_BORDER}` }}
                      onMouseEnter={e => e.currentTarget.style.color = CYAN}
                      onMouseLeave={e => e.currentTarget.style.color = CYAN_DIM}
                    >
                      Explore Details <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.aside>

          {/* ─ Column A: 01–06 ─ */}
          <div className="flex-1 min-w-0">
            <div className="h-px w-full" style={{ background: `linear-gradient(to right, rgba(255,255,255,0.08), transparent)` }} />
            {COL_A.map((svc, idx) => (
              <ServiceRow
                key={svc.code}
                svc={svc}
                idx={idx}
                globalIdx={idx}
                isActive={activeIdx === idx}
                isInView={isInView}
                onHover={() => setActiveIdx(idx)}
              />
            ))}
          </div>

          {/* Divider (Reduced opacity) */}
          <div
            aria-hidden="true"
            className="hidden lg:block w-px self-stretch"
            style={{
              background: `linear-gradient(to bottom, transparent, rgba(255,255,255,0.05) 20%, rgba(255,255,255,0.05) 80%, transparent)`,
            }}
          />

          {/* ─ Column B: 07–12 ─ */}
          <div className="flex-1 min-w-0">
            <div className="h-px w-full" style={{ background: `linear-gradient(to right, rgba(255,255,255,0.08), transparent)` }} />
            {COL_B.map((svc, idx) => (
              <ServiceRow
                key={svc.code}
                svc={svc}
                idx={idx}
                globalIdx={idx + 6}
                isActive={activeIdx === idx + 6}
                isInView={isInView}
                onHover={() => setActiveIdx(idx + 6)}
              />
            ))}
          </div>

        </div>

        {/* ── BOTTOM CTA ─────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.85, duration: 0.4 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-12 pt-8" // Increased mt-12
          style={{ borderTop: `1px solid rgba(255,255,255,0.05)` }}
        >
          <p className="text-[11px] font-mono tracking-wide" style={{ color: 'rgba(255,255,255,0.45)' }}>
            Full-lifecycle engineering · All project phases
          </p>

          <Link
            href="/services"
            className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-[10.5px] font-mono font-bold uppercase tracking-widest transition-all duration-300"
            style={{
              border: `1px solid ${CYAN_BORDER}`,
              color: CYAN_DIM,
              background: 'rgba(0,0,0,0.2)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = CYAN_GLOW;
              e.currentTarget.style.color = CYAN;
              e.currentTarget.style.borderColor = CYAN;
              e.currentTarget.style.boxShadow = '0 0 20px rgba(0,232,184,0.1)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(0,0,0,0.2)';
              e.currentTarget.style.color = CYAN_DIM;
              e.currentTarget.style.borderColor = CYAN_BORDER;
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            View All Services
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}