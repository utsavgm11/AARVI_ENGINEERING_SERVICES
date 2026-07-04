// ─── NOTE FOR NEXT.JS 13+ APP ROUTER ──────────────────────────────────────────
// "use client" pages can't export `metadata`. Put this in a sibling
// page.server.js / layout.js / metadata.js file:
//
// export const metadata = {
//   title: "Electrical Engineering | Aarvi Engineering Services",
//   description: "Expert electrical engineering for power systems, substation design, ETAP studies, and hazardous area compliance.",
//   keywords: ["electrical engineering","power system design","load flow studies","short circuit studies","ETAP","substation engineering","SmartPlant Electrical"],
//   openGraph: { title: "Electrical Engineering", type: "website" }
// };
// ──────────────────────────────────────────────────────────────────────────────

"use client";
import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import {
  Zap, Activity, AlertTriangle, GitMerge, CloudLightning, Factory,
  FileText, ShieldAlert, ArrowUpRight, ShieldCheck,
  Users, Clock, BadgeCheck, Briefcase
} from "lucide-react";

// ─── ASSET IMPORTS ───────────────────────────────────────────────────────────

// Use a single, unified image for all capabilities as requested
// Uncomment the line below when your image is in the assets folder
import sharedCapabilityImg from '../../../assets/ee.png';



// ─── CAPABILITIES DATA ───────────────────────────────────────────────────────
const CAPABILITIES = [
  {
    num: "01", code: "EE-101", icon: Zap,
    image: sharedCapabilityImg,
    title: "Power System Design",
    shortDesc: "End-to-end electrical distribution networks from high voltage to low voltage systems.",
    fullDesc: "Comprehensive design of robust electrical distribution architectures. We develop single line diagrams (SLDs), configure High Voltage (HV), Medium Voltage (MV), and Low Voltage (LV) networks, and design emergency backup systems ensuring uninterrupted facility power.",
    deliverables: ["Single Line Diagrams (SLD)", "Overall Power Architectures", "Emergency Power/UPS Sizing", "Load Schedules"],
    keyOutcomes: ["Reliable power distribution", "System redundancy", "Optimized capital cost", "Code compliance"],
    applications: ["Industrial Plants", "Refineries", "Commercial Complexes", "Offshore Platforms"]
  },
  {
    num: "02", code: "EE-102", icon: Activity,
    image: sharedCapabilityImg,
    title: "Load Flow Studies",
    shortDesc: "Steady-state power flow analysis to verify system capacity and voltage drop.",
    fullDesc: "Rigorous load flow and voltage drop analysis utilizing ETAP. We simulate steady-state conditions to determine real and reactive power flow, verify equipment continuous ratings, and ensure voltage profiles remain strictly within operational limits.",
    deliverables: ["Load Flow Analysis Reports", "Voltage Drop Calculations", "Power Factor Correction", "Transformer Sizing Validations"],
    keyOutcomes: ["Prevented voltage sags", "Optimized equipment sizing", "Reduced power losses", "Grid code compliance"],
    applications: ["Plant Expansions", "Heavy Motor Starting", "Utility Tie-ins", "Microgrids"]
  },
  {
    num: "03", code: "EE-103", icon: AlertTriangle,
    image: sharedCapabilityImg,
    title: "Short Circuit Studies",
    shortDesc: "Fault current calculations and protective relay coordination.",
    fullDesc: "Advanced fault analysis to calculate maximum available short-circuit currents. We determine precise breaker interruption ratings and develop comprehensive protective relay coordination studies to isolate electrical faults instantly and safely.",
    deliverables: ["Short Circuit Reports", "Relay Coordination Studies", "Arc Flash Hazard Analysis", "TCC (Time-Current Curves)"],
    keyOutcomes: ["Personnel safety", "Equipment damage prevention", "Minimized outage zones", "NFPA 70E compliance"],
    applications: ["Switchgear Sizing", "Arc Flash Mitigation", "Relay Setting Plans", "Industrial Substations"]
  },
  {
    num: "04", code: "EE-104", icon: GitMerge,
    image: sharedCapabilityImg,
    title: "Cable Sizing & Routing",
    shortDesc: "Precise cable selection and intelligent 3D routing for optimal power delivery.",
    fullDesc: "Detailed engineering of power, control, and instrumentation cabling. We perform rigorous sizing calculations factoring in voltage drop, short-circuit withstand, and thermal derating, coupled with intelligent 3D cable tray routing to avoid field clashes.",
    deliverables: ["Cable Sizing Calculations", "Cable Tray 3D Routing", "Cable Schedules", "Interconnection Diagrams"],
    keyOutcomes: ["Thermal failure prevention", "Optimized copper/aluminum usage", "Clash-free installation", "EMI/RFI mitigation"],
    applications: ["Main Cable Trenches", "Overhead Piperacks", "Underground Duct Banks", "Equipment Tie-ins"]
  },
  {
    num: "05", code: "EE-105", icon: CloudLightning,
    image: sharedCapabilityImg,
    title: "Earthing & Lightning Protection",
    shortDesc: "Grounding grid design and direct-strike shielding for maximum facility safety.",
    fullDesc: "Comprehensive design of plant grounding (earthing) systems and lightning protection networks in accordance with IEEE 80 and IEC 62305. We calculate step and touch potentials to ensure absolute safety for personnel and sensitive electronics.",
    deliverables: ["Earthing Grid Layouts", "Step & Touch Potential Reports", "Lightning Protection Layouts", "Grounding Details"],
    keyOutcomes: ["Personnel electrocution prevention", "Equipment shielding", "Static discharge control", "IEEE/IEC compliance"],
    applications: ["Tank Farms", "Tall Distillation Columns", "Substations", "Data/Control Centers"]
  },
  {
    num: "06", code: "EE-106", icon: Factory,
    image: sharedCapabilityImg,
    title: "Substation Engineering",
    shortDesc: "Complete layout and engineering of indoor GIS and outdoor AIS substations.",
    fullDesc: "End-to-end engineering for high-voltage substations. We develop optimized spatial layouts, equipment clearances, trench layouts, and structural interfaces for both Air Insulated Substations (AIS) and compact Gas Insulated Substations (GIS).",
    deliverables: ["Substation Equipment Layouts", "Sectional Elevations", "Trench & Duct Layouts", "Clearance/Safety Diagrams"],
    keyOutcomes: ["Safe operational clearances", "Future expansion capacity", "Optimized footprint", "Utility standard alignment"],
    applications: ["Utility Receiving Stations", "Plant Main Substations", "GIS Buildings", "Renewable Grid Tie-ins"]
  },
  {
    num: "07", code: "EE-107", icon: FileText,
    image: sharedCapabilityImg,
    title: "Electrical Equipment Specifications",
    shortDesc: "Detailed technical datasheets and vendor evaluations for critical power assets.",
    fullDesc: "Drafting of rigorous technical specifications for major electrical equipment including transformers, switchgears, Motor Control Centers (MCCs), and UPS systems. We manage the procurement cycle via Technical Bid Evaluations (TBE) and vendor document reviews.",
    deliverables: ["Equipment Datasheets", "Technical Specifications", "Technical Bid Evaluations (TBE)", "Vendor Document Review (VDR)"],
    keyOutcomes: ["Vendor alignment", "Exact project fit", "Budget accuracy", "Quality assurance"],
    applications: ["Transformers", "HV/MV/LV Switchgears", "VFDs & Soft Starters", "Battery & UPS Systems"]
  },
  {
    num: "08", code: "EE-108", icon: ShieldAlert,
    image: sharedCapabilityImg,
    title: "Hazardous Area Compliance",
    shortDesc: "Area classification and intrinsically safe design for volatile environments.",
    fullDesc: "Evaluation and mapping of explosive vapor/dust environments per ATEX, NEC, and IEC standards. We generate precise hazardous area classification schedules and specify appropriately rated explosion-proof or intrinsically safe electrical equipment.",
    deliverables: ["Hazardous Area Layouts", "Classification Schedules", "Ex-Equipment Specifications", "Intrinsically Safe Loop Checks"],
    keyOutcomes: ["Explosion prevention", "Regulatory certification", "Optimized equipment costs", "Absolute safety"],
    applications: ["Oil & Gas Production", "Chemical Batch Plants", "Fuel Terminals", "Battery Rooms"]
  }
];

const SOFTWARE_TOOLS = [
  { name: "ETAP", category: "Power System Analysis" },
  { name: "SmartPlant Electrical", category: "Electrical Design" },
  { name: "AutoCAD", category: "Drafting & 2D Layouts" }
];

const FEATURED_PROJECT = null; 

// ─── ANIMATION VARIANTS ───────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };

// ─── COMPONENT ────────────────────────────────────────────────────────────────
export default function ElectricalEngineeringPage() {
  const [activeCap, setActiveCap] = useState(0);
  const [isMarqueeHovered, setIsMarqueeHovered] = useState(false);
  const [isMarqueeClicked, setIsMarqueeClicked] = useState(false);
  const detailsRef = useRef(null);
  
  const active = CAPABILITIES[activeCap];

  const carouselRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Mouse Drag Handlers for Desktop
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    setIsMarqueeHovered(false); // Resume auto-scroll when mouse leaves
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // 1.5 is the scroll speed multiplier
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleSelectCapability = (idx) => {
    setActiveCap(idx);
    setIsMarqueeClicked(true); // Permanently pauses the marquee so user can read below

    if (detailsRef.current) {
      window.scrollTo({
        top: detailsRef.current.getBoundingClientRect().top + window.scrollY - 96,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <Head>
        <title>Electrical Engineering | Aarvi Engineering Services</title>
        <meta
          name="description"
          content="Expert electrical engineering for power systems, substation design, ETAP studies, and hazardous area compliance."
        />
        <meta name="keywords" content="electrical engineering, power system design, ETAP, short circuit analysis, load flow, substations" />
        <meta property="og:title" content="Electrical Engineering | Aarvi Engineering Services" />
        <meta property="og:description" content="End-to-end electrical design and power analysis solutions across the asset lifecycle." />
        <meta property="og:type" content="website" />
      </Head>

      <main className="w-full bg-aarvi-bg min-h-screen text-aarvi-navy font-sans selection:bg-aarvi-green/20 selection:text-aarvi-navy">

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* 1 · HERO — video bg + left text, exactly per reference layout      */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        <section className="relative w-full min-h-[78vh] flex items-center overflow-hidden bg-aarvi-navy">
          <div className="absolute inset-0 w-full h-full">
            {/* ─── ADD BG VIDEO HERE (Uncomment and replace src when ready) ─── */}
            { <video
              autoPlay muted loop playsInline
              className="absolute inset-0 w-full h-full object-cover"
              aria-hidden="true"
            >
              <source src="/electrical-hero.mp4" type="video/mp4" />
            </video>
            }
            <div className="absolute inset-0 bg-linear-to-r from-aarvi-navy via-aarvi-navy/85 to-aarvi-navy/30" />
            <div className="absolute inset-0 bg-aarvi-navy/20" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-10 lg:py-14 w-full">
            <motion.div
              initial="hidden"
              animate="show"
              variants={stagger}
              className="max-w-2xl"
            >
              <motion.div variants={fadeUp} className="flex items-center gap-2 mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-aarvi-green animate-pulse" />
                <span className="text-[11px] font-mono font-bold text-aarvi-green tracking-[0.25em] uppercase">
                  Power & Distribution
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight leading-[1.05] mb-5"
              >
                Electrical<br />Engineering
              </motion.h1>

              <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-bold text-white/60 mb-6">
                {["Power Systems", "ETAP Studies", "Substations", "Cable Routing", "Hazardous Areas"].map((t, i) => (
                  <React.Fragment key={t}>
                    <span>{t}</span>
                    {i < 4 && <span className="text-white/25">•</span>}
                  </React.Fragment>
                ))}
              </motion.div>

              <motion.p variants={fadeUp} className="text-base lg:text-lg text-white/70 leading-relaxed max-w-lg mb-9">
                Delivering robust, safe, and efficient electrical power distribution systems, from high-voltage substation design to complex load flow and short circuit analysis.
              </motion.p>

              <motion.div variants={fadeUp} className="grid grid-cols-3 gap-6 mb-9 pb-9 border-b border-white/15 max-w-lg">
                {[
                  { icon: Users, value: "32+", label: "Global EPC Partners" },
                  { icon: Clock, value: "39+", label: "Years of Excellence" },
                  { icon: BadgeCheck, value: "100%", label: "Code Compliant" }
                ].map(({ icon: Icon, value, label }) => (
                  <div key={label}>
                    <div className="flex items-center gap-1.5 mb-1">
                      <Icon className="w-4 h-4 text-aarvi-green" strokeWidth={1.5} />
                      <span className="text-2xl lg:text-3xl font-black text-white leading-none">{value}</span>
                    </div>
                    <span className="text-[10px] text-white/50 font-mono uppercase tracking-widest">{label}</span>
                  </div>
                ))}
              </motion.div>

            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* 2 · CORE CAPABILITIES — Infinite Horizontal Marquee                */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        <section className="bg-white py-10 lg:py-14 border-b border-slate-200 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <motion.div 
              initial="hidden" 
              whileInView="show" 
              viewport={{ once: true, margin: "-80px" }} 
              variants={stagger} 
              className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10"
            >
              <div>
                <motion.h2 
                  variants={fadeUp} 
                  className="text-3xl md:text-4xl font-black text-aarvi-navy uppercase tracking-tight"
                >
                  Integrated Electrical Expertise
                </motion.h2>
              </div>
            </motion.div>
          </div>

          {/* Interactive Scrolling Track */}
          <div 
            ref={carouselRef}
            className={`w-full flex overflow-x-auto pb-6 select-none scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${
              isDragging ? "cursor-grabbing" : "cursor-grab"
            }`}
            onMouseEnter={() => setIsMarqueeHovered(true)}
            onMouseLeave={handleMouseLeave}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchStart={() => setIsMarqueeHovered(true)} 
            onTouchEnd={() => setIsMarqueeHovered(false)}
          >
            <div 
              className={`flex gap-4 px-4 whitespace-nowrap will-change-transform animate-marquee ${
                isMarqueeHovered || isMarqueeClicked || isDragging ? '[animation-play-state:paused]' : ''
              }`}
            >
              {[...CAPABILITIES, ...CAPABILITIES].map((cap, idx) => {
                const originalIndex = idx % CAPABILITIES.length;
                const isActive = originalIndex === activeCap;
                const Icon = cap.icon;
                
                return (
                  <motion.button 
                    key={`${cap.code}-${idx}`} 
                    initial={{ opacity: 0, y: 16 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    viewport={{ once: true, margin: "-60px" }} 
                    transition={{ delay: originalIndex * 0.05, duration: 0.4 }} 
                    onClick={() => handleSelectCapability(originalIndex)} 
                    className={`group relative shrink-0 w-70 sm:w-[320px] p-5 rounded-2xl border-2 text-left transition-all duration-300 pointer-events-auto ${
                      isActive 
                        ? "bg-white border-aarvi-green shadow-lg shadow-aarvi-green/10 -translate-y-1" 
                        : "bg-white border-slate-200 hover:border-aarvi-green/50 hover:shadow-md hover:-translate-y-1"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-all duration-300 ${
                        isActive 
                          ? "bg-aarvi-green border-aarvi-green text-white" 
                          : "bg-aarvi-bg border-slate-200 text-slate-400 group-hover:text-aarvi-green group-hover:border-aarvi-green/40"
                      }`}
                      >
                        <Icon className="w-4.5 h-4.5" strokeWidth={1.5} />
                      </div>
                    </div>

                    <h3 className="text-sm font-black text-aarvi-navy uppercase leading-tight tracking-tight mb-2 min-h-[2.2em] whitespace-normal">
                      {cap.title}
                    </h3>
                    
                    <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2 whitespace-normal">
                      {cap.shortDesc}
                    </p>

                    {isActive && (
                      <div className="mt-3 pt-3 border-t border-aarvi-green/15 flex items-center gap-1">
                        <span className="text-[9px] font-mono font-black text-aarvi-green uppercase tracking-widest">
                          Selected
                        </span>
                      </div>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* 3 · CAPABILITY DETAIL — 70% content / 30% wireframe, equal height */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        <section ref={detailsRef} id="service-details" className="bg-aarvi-bg py-10 lg:py-14 border-b border-slate-200 scroll-mt-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCap}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col lg:flex-row"
              >
                {/* ─ 70%: Capability content ─ */}
                <div className="w-full lg:w-[70%] p-8 lg:p-12">
                  <div className="flex items-start gap-4 mb-7">
                    <div>
                      <h2 className="text-2xl lg:text-3xl font-black text-aarvi-navy uppercase tracking-tight leading-tight">
                        {active.title}
                      </h2>
                    </div>
                  </div>

                  <p className="text-text-body leading-relaxed mb-9 text-[15px] max-w-2xl">
                    {active.fullDesc}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                      <p className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-widest mb-3">
                        Deliverables
                      </p>
                      <ul className="space-y-2.5">
                        {active.deliverables.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sm text-text-body">
                            <span className="text-aarvi-green font-bold mt-0.5 shrink-0">✓</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-widest mb-3">
                        Key Outcomes
                      </p>
                      <ul className="space-y-2.5">
                        {active.keyOutcomes.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sm text-text-body">
                            <span className="text-aarvi-green font-bold mt-0.5 shrink-0">✓</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-widest mb-3">
                        Typical Applications
                      </p>
                      <ul className="space-y-2.5">
                        {active.applications.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sm text-text-body">
                            <span className="text-slate-300 font-bold mt-0.5 shrink-0">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* ─ 30%: Wireframe visual panel ─ */}
                <div className="w-full lg:w-[30%] relative min-h-75 lg:min-h-0 bg-linear-to-br from-aarvi-navy to-[#16213d] border-t lg:border-t-0 lg:border-l border-slate-200">
                  
                  {/* ─── ADD IMAGE HERE (Uncomment when images are imported) ─── */}
                  
                  {active.image && (
                    <Image 
                      src={active.image} 
                      alt={`${active.title} — technical schematic`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 30vw"
                      className="object-cover opacity-90 z-10 mix-blend-screen"
                    />
                  )}
                  

                  <div
                    className="absolute inset-0 opacity-[0.08]"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
                      backgroundSize: "32px 32px"
                    }}
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* 4 · SOFTWARE ECOSYSTEM                                             */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        <section className="bg-white py-10 lg:py-14 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
              className="text-center mb-12"
            >
              <motion.div variants={fadeUp} className="flex items-center justify-center gap-2 mb-3">
                <ShieldCheck className="w-5 h-5 text-aarvi-green" strokeWidth={1.5} />
                <span className="text-[10px] font-mono font-black text-aarvi-green tracking-[0.3em] uppercase">
                  Software Ecosystem
                </span>
              </motion.div>
              <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-black text-aarvi-navy uppercase tracking-tight mb-3">
                Advanced Tools. Proven Results.
              </motion.h2>
              <motion.p variants={fadeUp} className="text-text-body text-sm font-medium max-w-xl mx-auto">
                We leverage the world&apos;s most advanced electrical analysis and modeling
                environments to ensure absolute safety, load-balancing, and precision.
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
              className="flex flex-wrap justify-center gap-4"
            >
              {SOFTWARE_TOOLS.map((tool) => (
                <motion.div
                  key={tool.name}
                  variants={fadeUp}
                  className="p-5 w-48 rounded-xl border border-slate-200 bg-aarvi-bg hover:border-aarvi-green/40 hover:bg-white hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center text-center cursor-default min-h-24"
                >
                  <div className="font-mono text-xs font-black text-aarvi-navy uppercase tracking-widest leading-tight mb-1.5">
                    {tool.name}
                  </div>
                  <div className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{tool.category}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* 6 · FEATURED PROJECT — wired for DB later                        */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        <section className="bg-white py-10 lg:py-14 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-[10px] font-mono font-black text-aarvi-green tracking-[0.3em] uppercase block mb-8"
            >
              Featured Case Study
            </motion.span>

            {FEATURED_PROJECT ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
              >
                <div className="lg:col-span-5 relative rounded-2xl overflow-hidden min-h-75 bg-linear-to-br from-aarvi-navy to-[#16213d]" />

                <div className="lg:col-span-7 flex flex-col justify-center">
                  <h3 className="text-2xl font-black text-aarvi-navy uppercase tracking-tight mb-4">
                    {FEATURED_PROJECT.title}
                  </h3>
                  <p className="text-text-body text-sm leading-relaxed mb-6">{FEATURED_PROJECT.scope}</p>
                  <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 text-aarvi-navy font-black text-xs uppercase tracking-widest hover:text-aarvi-green transition-colors w-fit"
                  >
                    View Case Study <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-2xl border-2 border-dashed border-slate-200 bg-aarvi-bg p-12 lg:p-16 flex flex-col items-center text-center"
              >
                <div className="w-14 h-14 rounded-xl bg-white border border-slate-200 flex items-center justify-center mb-5">
                  <Briefcase className="w-6 h-6 text-slate-300" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-black text-aarvi-navy uppercase tracking-tight mb-2">
                  Project Case Studies Coming Soon
                </h3>
                <p className="text-text-body text-sm max-w-md mb-6">
                  This section will automatically pull a relevant featured project for
                  Electrical Engineering from the projects database once connected.
                </p>
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 px-5 py-2.5 border border-slate-200 text-aarvi-navy font-black text-xs uppercase tracking-widest rounded-lg hover:border-aarvi-green hover:text-aarvi-green transition-colors"
                >
                  Browse All Projects <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </motion.div>
            )}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* 7 · CTA BANNER                                                     */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        <section className="relative bg-aarvi-navy py-10 lg:py-14 overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.05]"
            style={{
              backgroundImage: "radial-gradient(circle, #00875A 1px, transparent 1px)",
              backgroundSize: "32px 32px"
            }}
          />
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={stagger}
              className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10"
            >
              <div className="max-w-lg">
                <motion.span variants={fadeUp} className="text-aarvi-green text-[11px] font-bold uppercase tracking-[0.25em] mb-4 block">
                  ┼ Let&apos;s Power the Facility
                </motion.span>
                <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight leading-tight mb-4">
                  Need Electrical Engineering Expertise?
                </motion.h2>
                <motion.p variants={fadeUp} className="text-white/60 text-sm leading-relaxed">
                  Our experts are ready to design and analyze your next critical power distribution network.
                </motion.p>
              </div>

              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 shrink-0">
                <Link
                  href="/contact?service=electrical-engineering"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-aarvi-green text-white font-black text-sm uppercase tracking-widest rounded-lg hover:bg-[#00744d] shadow-[0_8px_20px_rgba(0,135,90,0.3)] hover:shadow-[0_12px_28px_rgba(0,135,90,0.4)] transition-all group"
                >
                  Talk to Our Experts
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

      </main>
    </>
  );
}