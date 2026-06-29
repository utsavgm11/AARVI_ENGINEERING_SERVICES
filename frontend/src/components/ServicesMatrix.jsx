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

// ─── THEME TOKENS ────────────────────────────────────────────────────────────
const CYAN       = '#00D4B8';        // primary accent
const CYAN_DIM   = 'rgba(0,212,184,0.55)';
const CYAN_GLOW  = 'rgba(0,212,184,0.12)';
const CYAN_BORDER= 'rgba(0,212,184,0.3)';

// ─── SERVICE DATA ────────────────────────────────────────────────────────────
const SERVICES = [
  { title: "Process & Safety Engineering",  code: "PE-101", desc: "FEED studies, process simulation, PFD/P&ID development, and SIL assessments.",                        icon: Activity,  href: "/services/process-safety-engineering",      img: img1  },
  { title: "Plant Layout & Piping",          code: "PP-102", desc: "3D routing, clash resolution, and isometric extraction.",                                               icon: Layers,    href: "/services/plant-layout-piping",              img: img2  },
  { title: "Mechanical Engineering",         code: "ME-103", desc: "Static/rotating equipment sizing, vendor reviews, and pressure vessel support.",                       icon: Hammer,    href: "/services/mechanical-equipment",             img: img4  },
  { title: "Civil & Structural",             code: "CS-104", desc: "Site development, structural steel racks, and blast-resistant design.",                                icon: Compass,   href: "/services/civil-structural",                 img: img5  },
  { title: "Electrical Engineering",         code: "EL-105", desc: "Power system design, short circuit studies, and substation compliance.",                               icon: Zap,       href: "/services/electrical-engineering",           img: img7  },
  { title: "Instrumentation & Control",      code: "IC-106", desc: "Datasheet development, cause & effect matrices, and SIS support.",                                    icon: Sliders,   href: "/services/instrumentation-control",          img: img8  },
  { title: "Engineering Simulations",        code: "FE-107", desc: "Advanced computational fluid dynamics (CFD) and structural behaviour checks.",                        icon: Cpu,       href: "/services/engineering-simulations",          img: img10 },
  { title: "Digital Engineering & 3D",       code: "DE-108", desc: "Integrated intelligent 3D plant coordination models and database upgrades.",                          icon: Box,       href: "/services/digital-engineering-3d",           img: img9  },
  { title: "Project Engineering & PMC",      code: "PM-109", desc: "Project management, scheduling, and multi-discipline interface coordination.",                        icon: Briefcase, href: "/services/project-engineering-pmc",          img: img11 },
  { title: "As-Built Documentation",         code: "AB-110", desc: "Database reconciliation and asset info validation handover packages.",                                icon: FileCheck, href: "/services/as-built-documentation",           img: img12 },
  { title: "Engineering Data",               code: "ED-111", desc: "Legacy drawing digitization and digital twin data preparation workflows.",                            icon: Database,  href: "/services/engineering-data-digitalization",  img: img6  },
  { title: "Construction & Commissioning",   code: "CC-112", desc: "Mechanical completion reviews, pre-commissioning, and startup support.",                              icon: Disc,      href: "/services/construction-commissioning-support",img: img3  },
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
    >
      <Link
        href={svc.href}
        aria-label={svc.title}
        className="flex items-center gap-3 py-3.5 border-b w-full outline-none focus-visible:ring-1"
        style={{
          borderBottomColor: isActive ? CYAN_BORDER : 'rgba(255,255,255,0.08)',
          transition: 'border-color 0.22s',
          focusVisibleRingColor: CYAN,
        }}
      >
        {/* Catalog number */}
        <span
          className="text-[9px] font-mono w-5 shrink-0 transition-colors duration-200"
          style={{ color: isActive ? CYAN : 'rgba(255,255,255,0.28)' }}
        >
          {String(globalIdx + 1).padStart(2, '0')}
        </span>

        {/* Icon box */}
        <div
          className="w-7 h-7 rounded-md flex items-center justify-center shrink-0 border transition-all duration-300"
          style={{
            background:  isActive ? CYAN_GLOW  : 'rgba(255,255,255,0.04)',
            borderColor: isActive ? CYAN_BORDER : 'rgba(255,255,255,0.1)',
            color:       isActive ? CYAN        : 'rgba(255,255,255,0.4)',
          }}
        >
          <Icon className="w-3.5 h-3.5" strokeWidth={1.5} />
        </div>

        {/* Title */}
        <span
          className="flex-1 text-[12.5px] font-bold uppercase tracking-wide transition-colors duration-200 leading-tight"
          style={{ color: isActive ? '#ffffff' : 'rgba(255,255,255,0.62)' }}
        >
          {svc.title}
        </span>

        {/* Service code */}
        <span
          className="font-mono text-[8px] tracking-[0.15em] uppercase shrink-0 transition-colors duration-200 hidden xl:block"
          style={{ color: isActive ? CYAN_DIM : 'rgba(255,255,255,0.18)' }}
        >
          {svc.code}
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
      className="relative w-full bg-[#07080A] py-20 lg:py-24 overflow-hidden selection:bg-cyan-400 selection:text-black"
      aria-label="Engineering Services"
    >

      {/* ── Blueprint grid — cyan tinted ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,212,184,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,212,184,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Subtle radial glow top-left */}
      <div
        aria-hidden="true"
        className="absolute -top-32 -left-32 w-125 h-125 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0,212,184,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">

        {/* ── HEADER ─────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex items-end justify-between mb-10 lg:mb-12"
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              {/* Cyan pulse dot — matches hero style */}
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: CYAN }} />
              <span
                className="text-[10px] font-mono tracking-[0.25em] uppercase"
                style={{ color: CYAN_DIM }}
              >
                Core Capabilities
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-black text-white uppercase tracking-tight leading-[1.05]">
              Engineering
              <span className="ml-3" style={{ color: 'rgba(255,255,255,0.25)' }}>Services</span>
            </h2>
          </div>

          <div className="hidden sm:flex flex-col items-end gap-0.5">
            <span className="text-5xl lg:text-6xl font-mono font-black leading-none" style={{ color: 'rgba(0,212,184,0.1)' }}>
              12
            </span>
            <span className="text-[9px] font-mono tracking-widest uppercase" style={{ color: 'rgba(0,212,184,0.35)' }}>
              Disciplines
            </span>
          </div>
        </motion.div>

        {/* ── MAIN LAYOUT ─────────────────────────────────────────────────── */}
        <div className="flex items-start gap-6 xl:gap-8">

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
                <div
                  className="rounded-2xl overflow-hidden"
                  style={{
                    background: '#0E1013',
                    border: `1px solid ${CYAN_BORDER}`,
                    boxShadow: `0 0 32px rgba(0,212,184,0.07)`,
                  }}
                >
                  {/* Service image */}
                  <div className="relative w-full" style={{ aspectRatio: '3 / 2' }}>
                    <Image
                      src={active.img}
                      alt={active.title}
                      fill
                      sizes="320px"
                      className="object-cover"
                      style={{
                        opacity: 0.8,
                        filter: 'grayscale(30%) hue-rotate(140deg) saturate(0.6)',
                      }}
                    />
                    {/* Gradient fade to card bg */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background: 'linear-gradient(to top, #0E1013 0%, rgba(14,16,19,0.15) 55%, transparent 100%)',
                      }}
                    />
                    {/* Code badge */}
                    <div
                      className="absolute top-3 left-3 rounded px-2 py-0.5 backdrop-blur-sm"
                      style={{
                        background: 'rgba(0,212,184,0.12)',
                        border: `1px solid ${CYAN_BORDER}`,
                      }}
                    >
                      <span className="font-mono text-[9px] tracking-[0.2em] uppercase" style={{ color: CYAN }}>
                        {active.code}
                      </span>
                    </div>
                  </div>

                  {/* Service info */}
                  <div className="px-5 pt-4 pb-5">
                    <h3 className="text-[14px] font-black text-white uppercase tracking-tight leading-snug">
                      {active.title}
                    </h3>
                    <p className="text-[12px] leading-relaxed mt-2" style={{ color: 'rgba(255,255,255,0.58)' }}>
                      {active.desc}
                    </p>
                    <Link
                      href={active.href}
                      className="inline-flex items-center gap-1.5 text-[10px] font-mono mt-4 pb-px transition-colors duration-200 group"
                      style={{ color: CYAN_DIM, borderBottom: `1px solid ${CYAN_BORDER}` }}
                      onMouseEnter={e => e.currentTarget.style.color = CYAN}
                      onMouseLeave={e => e.currentTarget.style.color = CYAN_DIM}
                    >
                      Explore <ArrowUpRight className="w-2.5 h-2.5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Progress indicator */}
            <div className="flex items-center justify-between mt-3 px-1">
              <span className="font-mono text-[9px]" style={{ color: 'rgba(0,212,184,0.4)' }}>
                {String(activeIdx + 1).padStart(2, '0')}&nbsp;/&nbsp;12
              </span>
              <div className="flex items-center gap-0.5">
                {SERVICES.map((_, i) => (
                  <div
                    key={i}
                    className="h-px transition-all duration-300"
                    style={{
                      width:      i === activeIdx ? '16px' : '5px',
                      background: i === activeIdx ? CYAN : 'rgba(255,255,255,0.18)',
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.aside>

          {/* ─ Column A: 01–06 ─ */}
          <div className="flex-1 min-w-0">
            <div className="h-px w-full" style={{ background: `linear-gradient(to right, ${CYAN_BORDER}, transparent)` }} />
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

          {/* Divider */}
          <div
            aria-hidden="true"
            className="hidden lg:block w-px self-stretch"
            style={{
              background: `linear-gradient(to bottom, transparent, ${CYAN_BORDER} 20%, ${CYAN_BORDER} 80%, transparent)`,
            }}
          />

          {/* ─ Column B: 07–12 ─ */}
          <div className="flex-1 min-w-0">
            <div className="h-px w-full" style={{ background: `linear-gradient(to right, ${CYAN_BORDER}, transparent)` }} />
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
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-10 pt-8"
          style={{ borderTop: `1px solid rgba(0,212,184,0.12)` }}
        >
          <p className="text-[11px] font-mono tracking-wide" style={{ color: 'rgba(255,255,255,0.35)' }}>
            Full-lifecycle engineering · All project phases
          </p>

          <Link
            href="/services"
            className="group inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest transition-all duration-300"
            style={{
              border: `1px solid ${CYAN_BORDER}`,
              color: CYAN_DIM,
              background: 'transparent',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = CYAN_GLOW;
              e.currentTarget.style.color = CYAN;
              e.currentTarget.style.borderColor = CYAN;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = CYAN_DIM;
              e.currentTarget.style.borderColor = CYAN_BORDER;
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