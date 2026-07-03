// ─── NOTE FOR NEXT.JS 13+ APP ROUTER ──────────────────────────────────────────
// "use client" pages can't export `metadata`. Put this in a sibling
// page.server.js / layout.js / metadata.js file:
//
// export const metadata = {
//   title: "Process & Safety Engineering | Aarvi Engineering Services",
//   description: "Expert FEED studies, HAZOP facilitation, SIL assessments, QRA, and
//     process safety management. Serving oil & gas, refineries, and petrochemical sectors.",
//   keywords: ["process engineering","safety engineering","HAZOP","SIL","QRA","FEED","PSM"],
//   openGraph: { title: "Process & Safety Engineering", type: "website" }
// };
// ──────────────────────────────────────────────────────────────────────────────

"use client";
import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import {
  Activity, Database, FileText, Settings, ShieldAlert, Cpu,
  Target, ClipboardCheck, ArrowUpRight, ShieldCheck,
  Users, Clock, BadgeCheck, Briefcase
} from "lucide-react";

// ─── ASSET IMPORTS (Commented out to prevent Next.js compilation errors until files exist) ───

// Capabilities Wireframes (800x1000)
import pe101Img from '../../../assets/PE-101.png';
import pe102Img from '../../../assets/PE-102.png';
import pe103Img from '../../../assets/PE-103.png';
import pe104Img from '../../../assets/PE-104.png';
import pe105Img from '../../../assets/PE-105.png';
import pe106Img from '../../../assets/PE-106.png';
import pe107Img from '../../../assets/PE-107.png';
import pe108Img from '../../../assets/PE-108.png';

/*
// Software Logos (Transparent PNGs)
import aspenHysysLogo from '../../../assets/aspen-hysys-logo.png';
import aspenPlusLogo  from '../../../assets/aspen-plus-logo.png';
import pipeNetLogo    from '../../../assets/pipenet-logo.png';
import flareSimLogo   from '../../../assets/flaresim-logo.png';
import phastLogo      from '../../../assets/phast-logo.webp';
import safetiLogo     from '../../../assets/safeti-logo.webp';
import phaProLogo     from '../../../assets/pha-pro-logo.png';
import exSilentiaLogo from '../../../assets/exsilentia-logo.png';
import detect3dLogo   from '../../../assets/detect3d-logo.png';
import volgaLogo      from '../../../assets/volga-logo.png';
import sppidLogo      from '../../../assets/sppid-logo.png';
import avevaPidLogo   from '../../../assets/avevapid-logo.webp';

*/

// ─── CAPABILITIES DATA ───────────────────────────────────────────────────────
const CAPABILITIES = [
  {
    num: "01", code: "PE-101", icon: Activity,
    image: pe101Img,
    title: "Process Design ",
    shortDesc: "Rigorous steady-state and dynamic thermodynamic multi-phase processing models.",
    fullDesc: "Rigorous steady-state and dynamic thermodynamic multi-phase processing model builds ensuring maximum baseline plant throughput optimization.",
    deliverables: ["Process Simulation Models", "Thermodynamic Flow Reviews", "Optimization Case Studies", "Design Basis Documents"],
    keyOutcomes: ["Accurate design basis", "Reduced energy losses", "Maximum throughput", "Validated feasibility"],
    applications: ["Refineries", "Petrochemical Plants", "Gas Processing", "LNG / Cryogenic Plants"]
  },
  {
    num: "02", code: "PE-102", icon: Database,
    image: pe102Img,
    title: "Heat & Material Balance Development",
    shortDesc: "Comprehensive stream property data generation across operational envelopes.",
    fullDesc: "Complete mass and energy balance calculations with stream-by-stream property data, covering steady-state operations and dynamic scenarios across full operating ranges.",
    deliverables: ["Balance Calculations", "Stream Property Data", "Energy Analysis Reports", "Operational Envelope Maps"],
    keyOutcomes: ["Accurate property data", "Energy optimization", "Operating range clarity", "Design verification"],
    applications: ["Refineries", "Petrochemical Plants", "Power Generation", "Process Plants"]
  },
  {
    num: "03", code: "PE-103", icon: FileText,
    image: pe103Img,
    title: "PFD, P&ID & Process Datasheets",
    shortDesc: "Intelligent drafting and configuration mapping for equipment and instrumentation.",
    fullDesc: "Expert engineering drawing development including Process Flow Diagrams, Piping & Instrumentation Diagrams, and comprehensive equipment datasheets with full technical specifications.",
    deliverables: ["PFD Development", "P&ID Configuration", "Equipment Datasheets", "Instrument Specifications"],
    keyOutcomes: ["Complete documentation", "Design clarity", "Buildable designs", "Vendor compatibility"],
    applications: ["Refineries", "Petrochemical Plants", "Gas Processing", "Industrial Plants"]
  },
  {
    num: "04", code: "PE-104", icon: Settings,
    image: pe104Img,
    title: "Utility & Hydraulic System Studies",
    shortDesc: "Network analysis mapping line friction heads, pump NPSH, and full sizing matrices.",
    fullDesc: "Complete utility system analysis including pressure drop calculations, pump sizing, NPSH evaluation, and comprehensive hydraulic network modeling for steam, water, and gas systems.",
    deliverables: ["Network Analysis Models", "Pressure Drop Calculations", "Pump Sizing & Selection", "NPSH Availability Studies"],
    keyOutcomes: ["Optimized system design", "Reliable operations", "Cost-effective utilities", "Full system coverage"],
    applications: ["Utility Systems", "Steam Networks", "Water Treatment", "Compressed Gas"]
  },
  {
    num: "05", code: "PE-105", icon: ShieldAlert,
    image: pe105Img,
    title: "Process Hazard Analysis (HAZID & HAZOP) ",
    shortDesc: "Expertly facilitated HAZID & HAZOP screening sessions for high-consequence failure modes.",
    fullDesc: "Comprehensive hazard identification and analysis using HAZID and HAZOP methodologies to identify and evaluate process risks, consequences, and safeguards with expert facilitation.",
    deliverables: ["HAZID Study Reports", "HAZOP Session Records", "Risk Register Development", "Safeguard Recommendations"],
    keyOutcomes: ["Risk identification complete", "Safeguards specified", "Regulatory compliance", "Safety culture improvement"],
    applications: ["Oil & Gas", "Petrochemicals", "Refineries", "Chemical Plants"]
  },
  {
    num: "06", code: "PE-106", icon: Cpu,
    image: pe106Img,
    title: "SIL Assessment & Functional Safety ",
    shortDesc: "Assessment and layer of protection analysis to calibrate automated safety instrument functions.",
    fullDesc: "Rigorous Safety Integrity Level determination and Functional Safety assessments including LOPA analysis, SIS design verification, and proof test strategies aligned with IEC 61508/61511 standards.",
    deliverables: ["SIL Assessment Reports", "LOPA Studies", "SIS Design Verification", "Proof Test Procedures"],
    keyOutcomes: ["SIL targets defined", "IEC compliance achieved", "Instrument selection validated", "Proof test schedules set"],
    applications: ["Safety Instrumented Systems", "Automation Systems", "Risk Management", "Regulatory Compliance"]
  },
  {
    num: "07", code: "PE-107", icon: Target,
    image: pe107Img,
    title: "Quantitative Risk & Consequence Analysis ",
    shortDesc: "Quantitative mapping of gas cloud bounds, thermal radiation flares, and overpressure.",
    fullDesc: "Advanced consequence modeling including dispersion analysis, thermal radiation mapping, and overpressure calculations to quantify risk and support emergency planning and site layout.",
    deliverables: ["Dispersion Modeling", "Thermal Radiation Maps", "Overpressure Analysis", "Risk Contour Maps"],
    keyOutcomes: ["Risk quantified", "Emergency plans validated", "Site layout optimized", "Insurance data supplied"],
    applications: ["Risk Assessment", "Site Layout", "Emergency Planning", "Insurance Requirements"]
  },
  {
    num: "08", code: "PE-108", icon: ClipboardCheck,
    image: pe108Img,
    title: "Process Safety Management & Operational Readiness ",
    shortDesc: "Pre-commissioning safety audits, mechanical completion, and operational readiness.",
    fullDesc: "Comprehensive PSM program development including pre-commissioning safety verification, mechanical completion audits, and commissioning readiness assessments ensuring safe startup.",
    deliverables: ["PSM Program Design", "Safety Audits", "Commissioning Checklists", "Operational Procedures"],
    keyOutcomes: ["Safe startup", "Zero incidents", "Regulatory approval", "Operator confidence"],
    applications: ["Project Startups", "Plant Modifications", "Regulatory Compliance", "Operational Handover"]
  }
];

const SOFTWARE_TOOLS = [
  { name: "Aspen HYSYS", category: "Thermodynamics" /*, logo: aspenHysysLogo */ },
  { name: "Aspen Plus", category: "Simulation" /*, logo: aspenPlusLogo */ },
  { name: "PipeNet", category: "Hydraulics" /*, logo: pipeNetLogo */ },
  { name: "FlareSIM", category: "Flaring" /*, logo: flareSimLogo */ },
  { name: "PHAST", category: "Consequence" /*, logo: phastLogo */ },
  { name: "SAFETI", category: "Risk" /*, logo: safetiLogo */ },
  { name: "PHA-Pro", category: "HAZOP" /*, logo: phaProLogo */ },
  { name: "exSILentia", category: "SIL" /*, logo: exSilentiaLogo */ },
  { name: "Detect3D", category: "Gas Detection" /*, logo: detect3dLogo */ },
  { name: "VOLGA", category: "Emissions" /*, logo: volgaLogo */ },
  { name: "SPPID", category: "P&ID" /*, logo: sppidLogo */ },
  { name: "AVEVAPID", category: "P&ID" /*, logo: avevaPidLogo */ }
];

const INDUSTRIES = [
  { icon: "⛽", name: "Oil & Gas" },
  { icon: "🏭", name: "Refineries" },
  { icon: "⚗️", name: "Petrochemicals" },
  { icon: "⚡", name: "Power Generation" },
  { icon: "❄️", name: "LNG & Gas Processing" },
  { icon: "🏗️", name: "Infrastructure" }
];

const FEATURED_PROJECT = null; 

// ─── ANIMATION VARIANTS ───────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };

// ─── COMPONENT ────────────────────────────────────────────────────────────────
export default function ProcessSafetyEngineeringPage() {
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
        <title>Process & Safety Engineering | Aarvi Engineering Services</title>
        <meta
          name="description"
          content="Expert process design, HAZOP facilitation, SIL assessments, QRA, and process safety management for oil & gas, refining, and petrochemical facilities."
        />
        <meta name="keywords" content="process engineering, safety engineering, HAZOP, SIL assessment, QRA, FEED, PSM, process design" />
        <meta property="og:title" content="Process & Safety Engineering | Aarvi Engineering Services" />
        <meta property="og:description" content="End-to-end process and safety engineering solutions across the asset lifecycle." />
        <meta property="og:type" content="website" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              name: "Process & Safety Engineering",
              description: "Industrial process design, hazard analysis, and process safety management services.",
              serviceType: "Engineering Consulting",
              areaServed: "Global",
              provider: { "@type": "Organization", name: "Aarvi Engineering Services" }
            })
          }}
        />
      </Head>

      <main className="w-full bg-aarvi-bg min-h-screen text-aarvi-navy font-sans selection:bg-aarvi-green/20 selection:text-aarvi-navy">

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* 1 · HERO — video bg + left text, exactly per reference layout      */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        <section className="relative w-full min-h-[78vh] flex items-center overflow-hidden bg-aarvi-navy">
          <div className="absolute inset-0 w-full h-full">
            <video
              autoPlay muted loop playsInline
              className="absolute inset-0 w-full h-full object-cover"
              aria-hidden="true"
            >
              <source src="/process-hero.mp4" type="video/mp4" />
            </video>
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
                  Process Engineering
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight leading-[1.05] mb-5"
              >
                Process & Safety<br />Engineering
              </motion.h1>

              <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-bold text-white/60 mb-6">
                {["FEED", "HAZOP", "SIL", "QRA", "PSM"].map((t, i) => (
                  <React.Fragment key={t}>
                    <span>{t}</span>
                    {i < 4 && <span className="text-white/25">•</span>}
                  </React.Fragment>
                ))}
              </motion.div>

              <motion.p variants={fadeUp} className="text-base lg:text-lg text-white/70 leading-relaxed max-w-lg mb-9">
                End-to-end process and safety engineering solutions that ensure
                operational integrity, regulatory compliance, and sustainable
                performance across the asset lifecycle.
              </motion.p>

              <motion.div variants={fadeUp} className="grid grid-cols-3 gap-6 mb-9 pb-9 border-b border-white/15 max-w-lg">
                {[
                  { icon: Users, value: "32+", label: "Global EPC Partners" },
                  { icon: Clock, value: "39+", label: "Years of Excellence" },
                  { icon: BadgeCheck, value: "100%", label: "Audit-Ready" }
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
          Integrated Process & Safety Expertise
        </motion.h2>
      </div>
    </motion.div>
  </div>

  {/* Interactive Scrolling Track */}
  <div 
    ref={carouselRef}
    // Added native scroll support, hidden scrollbars, and grab cursors
    className={`w-full flex overflow-x-auto pb-6 select-none scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${
      isDragging ? "cursor-grabbing" : "cursor-grab"
    }`}
    onMouseEnter={() => setIsMarqueeHovered(true)}
    onMouseLeave={handleMouseLeave}
    onMouseDown={handleMouseDown}
    onMouseUp={handleMouseUp}
    onMouseMove={handleMouseMove}
    // Pause animation instantly when a mobile user touches it
    onTouchStart={() => setIsMarqueeHovered(true)} 
    onTouchEnd={() => setIsMarqueeHovered(false)}
  >
    <div 
      // Pauses the CSS marquee when hovered, clicked, OR manually dragged
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
              }`}>
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

                  <div className="mt-9 pt-7 border-t border-slate-100">
                    
                  </div>
                </div>

                {/* ─ 30%: Wireframe visual panel ─ */}
                <div className="w-full lg:w-[30%] relative min-h-75 lg:min-h-0 bg-linear-to-br from-aarvi-navy to-[#16213d] border-t lg:border-t-0 lg:border-l border-slate-200">
                  
                  {/* ─── ADD IMAGE HERE (Uncomment when images are imported) ─── */}
                  {
                  <Image 
                    src={active.image} 
                    alt={`${active.title} — technical schematic`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 30vw"
                    className="object-cover opacity-90 z-10 mix-blend-screen"
                  />
                  }

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
                We leverage the world&apos;s most advanced thermodynamic and risk calculation
                environments to ensure absolute mathematical precision.
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4"
            >
              {SOFTWARE_TOOLS.map((tool) => (
                <motion.div
                  key={tool.name}
                  variants={fadeUp}
                  className="p-5 rounded-xl border border-slate-200 bg-aarvi-bg hover:border-aarvi-green/40 hover:bg-white hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center text-center cursor-default min-h-30"
                >
                  {/* ─── ADD SOFTWARE LOGO HERE (Uncomment when logos are imported) ─── */}
                  {/*
                  <div className="relative w-12 h-12 mb-3">
                    <Image 
                      src={tool.logo} 
                      alt={`${tool.name} logo`}
                      fill
                      className="object-contain"
                    />
                  </div> 
                  */}
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
                  Process & Safety Engineering from the projects database once connected.
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
                  ┼ Let&apos;s Engineer Safety Together
                </motion.span>
                <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight leading-tight mb-4">
                  Need Process & Safety Engineering Expertise?
                </motion.h2>
                <motion.p variants={fadeUp} className="text-white/60 text-sm leading-relaxed">
                  Our experts are ready to support your next critical project.
                </motion.p>
              </div>

              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 shrink-0">
                <Link
                  href="/contact?service=process-safety"
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