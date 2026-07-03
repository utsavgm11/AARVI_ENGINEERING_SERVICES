// ─── NOTE FOR NEXT.JS 13+ APP ROUTER ──────────────────────────────────────────
// "use client" pages can't export `metadata`. Put this in a sibling
// page.server.js / layout.js / metadata.js file:
//
// export const metadata = {
//   title: "Plant Layout & Piping Engineering | Aarvi Engineering Services",
//   description: "Expert 3D modeling, clash detection, stress analysis, and piping material engineering for complex industrial facilities.",
//   keywords: ["piping engineering","plant layout","3D modeling","stress analysis","Caesar II","SP3D","E3D"],
//   openGraph: { title: "Plant Layout & Piping Engineering", type: "website" }
// };
// ──────────────────────────────────────────────────────────────────────────────

"use client";
import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import {
  Map, BoxSelect, View, AlertOctagon, Waypoints, Magnet,
  ScrollText, Factory, ArrowUpRight, ShieldCheck,
  Users, Clock, BadgeCheck, Briefcase
} from "lucide-react";

// ─── ASSET IMPORTS (Commented out to prevent Next.js compilation errors until files exist) ───

/*
// Capabilities Wireframes (800x1000)
import pp101Img from '../../../assets/PP-101.png';
import pp102Img from '../../../assets/PP-102.png';
import pp103Img from '../../../assets/PP-103.png';
import pp104Img from '../../../assets/PP-104.png';
import pp105Img from '../../../assets/PP-105.png';
import pp106Img from '../../../assets/PP-106.png';
import pp107Img from '../../../assets/PP-107.png';
import pp108Img from '../../../assets/PP-108.png';
import pp109Img from '../../../assets/PP-109.png';

// Software Logos (Transparent PNGs)
import e3dLogo      from '../../../assets/e3d-logo.png';
import sp3dLogo     from '../../../assets/sp3d-logo.png';
import autoCadLogo  from '../../../assets/autocad-logo.png';
import plant3dLogo  from '../../../assets/plant3d-logo.png';
import navisworksLogo from '../../../assets/navisworks-logo.png';
import caesarLogo   from '../../../assets/caesar-logo.png';
import autoPipeLogo from '../../../assets/autopipe-logo.png';
*/

// Use null as fallbacks while images are commented out to prevent crashing
const pp101Img = null;
const pp102Img = null;
const pp103Img = null;
const pp104Img = null;
const pp105Img = null;
const pp106Img = null;
const pp107Img = null;
const pp108Img = null;
const pp109Img = null;

// ─── CAPABILITIES DATA ───────────────────────────────────────────────────────
const CAPABILITIES = [
  {
    num: "01", code: "PP-101", icon: Map,
    image: pp101Img,
    title: "Plot Plan Development",
    shortDesc: "Strategic master facility layouts prioritizing safety, accessibility, and constructability.",
    fullDesc: "Strategic development of overall plant layout configurations. We optimize spatial distribution of process units, utility blocks, and piperacks to ensure maximum operational safety, logical process flow, and adherence to strict regulatory separation distances.",
    deliverables: ["Overall Plot Plans", "Unit Plot Plans", "Hazard Distancing Studies", "Access & Egress Layouts"],
    keyOutcomes: ["Optimized footprint", "Regulatory compliance", "Safe operability", "Clear construction zones"],
    applications: ["Greenfield Facilities", "Plant Expansions", "Refineries", "Storage Terminals"]
  },
  {
    num: "02", code: "PP-102", icon: BoxSelect,
    image: pp102Img,
    title: "Equipment Layout Engineering",
    shortDesc: "Detailed spatial orientation of static and rotary equipment within process limits.",
    fullDesc: "Meticulous positioning of heavy static, rotary, and packaged equipment. Our layouts prioritize operational ergonomics, maintenance crane access, safe drop zones, and optimal nozzle orientations to minimize complex piping runs.",
    deliverables: ["Equipment Layout Drawings", "Maintenance Drop Zone Studies", "Nozzle Orientation Checks", "Elevation Sections"],
    keyOutcomes: ["Maintenance accessibility", "Optimized pipe routing", "Reduced footprint", "Crane access clearance"],
    applications: ["Process Modules", "Compressor Shelters", "Pump Houses", "Reactor Structures"]
  },
  {
    num: "03", code: "PP-103", icon: View,
    image: pp103Img,
    title: "3D Modeling",
    shortDesc: "Intelligent, clash-free, data-centric digital twin construction of entire facilities.",
    fullDesc: "Development of comprehensive, multi-discipline 3D models using industry-leading software (E3D/SP3D). We build intelligent digital twins that integrate piping, civil, structural, and E&I components for perfect visualization and spatial coordination.",
    deliverables: ["Intelligent 3D Models", "Model Review Sessions (30/60/90%)", "Walkthrough Animations", "Database Exports"],
    keyOutcomes: ["Visual design clarity", "Zero-clash construction", "Accurate MTOs", "Seamless discipline integration"],
    applications: ["All Industrial Sectors", "Brownfield Upgrades", "Skid Modules", "Complex Process Plants"]
  },
  {
    num: "04", code: "PP-104", icon: AlertOctagon,
    image: pp104Img,
    title: "Clash Detection & Resolution",
    shortDesc: "Automated interference checking across all engineering disciplines prior to fabrication.",
    fullDesc: "Rigorous hard and soft clash analysis utilizing Navisworks. We systematically detect and resolve interferences between piping, structural steel, cable trays, and equipment maintenance envelopes to eliminate costly on-site rework.",
    deliverables: ["Clash Detection Reports", "Interference Resolution Logs", "Soft Clash (Maintenance) Audits", "Navisworks NWD Files"],
    keyOutcomes: ["Zero field re-work", "Guaranteed constructability", "Schedule protection", "Cost savings"],
    applications: ["Multi-discipline Projects", "Congested Brownfields", "Skid Packaging", "Dense Piperacks"]
  },
  {
    num: "05", code: "PP-105", icon: Waypoints,
    image: pp105Img,
    title: "Piping GADs (General Arrangement)",
    shortDesc: "Detailed orthographic piping extraction for construction sequence planning.",
    fullDesc: "Extraction and detailing of comprehensive General Arrangement Drawings (GADs) from the 3D model. These precise orthographic plans provide constructors with the exact routing, elevations, and dimensional data required for field installation.",
    deliverables: ["Piping Plan Drawings", "Elevation Sections", "Tie-in Location Plans", "Underground Piping Layouts"],
    keyOutcomes: ["Clear installation guides", "Precise field tie-ins", "Accurate dimensioning", "Seamless construction"],
    applications: ["Field Installation", "Fabrication Yards", "Underground Networks", "Complex Intersections"]
  },
  {
    num: "06", code: "PP-106", icon: Magnet,
    image: pp106Img,
    title: "Pipe Support Engineering",
    shortDesc: "Standard and special support design to restrain dynamic and thermal loads.",
    fullDesc: "Comprehensive design and detailing of primary and secondary pipe supports. We engineer robust restraints, guides, anchors, and spring hangers tailored to absorb thermal expansion, sustain weight, and mitigate dynamic vibrational loads.",
    deliverables: ["Support Location Plans", "Standard Support Details", "Special Support Structural Drawings", "Spring Hanger Datasheets"],
    keyOutcomes: ["System integrity", "Vibration mitigation", "Thermal load management", "Code compliance"],
    applications: ["High-Temp Lines", "Vibrating Equipment Lines", "Heavy Wall Piping", "FRP/GRP Systems"]
  },
  {
    num: "07", code: "PP-107", icon: ScrollText,
    image: pp107Img,
    title: "Isometric & Spool Generation",
    shortDesc: "Automated extraction of fabrication-ready piping isometrics and BOMs.",
    fullDesc: "Automated extraction of highly detailed piping isometrics directly from the intelligent 3D model. Each drawing includes precise cut lengths, weld mapping, and a comprehensive Bill of Materials (BOM) for shop fabrication.",
    deliverables: ["Fabrication Isometrics", "Erection Isometrics", "Spool Drawings", "Accurate Bill of Materials (BOM)"],
    keyOutcomes: ["Shop-ready drawings", "Accurate procurement", "Traceable weld tracking", "Minimized field welding"],
    applications: ["Shop Fabrication", "Field Assembly", "Material Procurement", "Weld Mapping"]
  },
  {
    num: "08", code: "PP-108", icon: Factory,
    image: pp108Img,
    title: "Material Engineering (RFQs, TQs, VDR)",
    shortDesc: "Comprehensive material procurement support, vendor review, and specification drafting.",
    fullDesc: "End-to-end piping material engineering including the generation of Piping Material Specifications (PMS), Requisitions for Quotation (RFQs), Technical Query (TQ) resolution, and rigorous Vendor Document Review (VDR) to ensure metallurgical integrity.",
    deliverables: ["Piping Material Specs (PMS)", "Valve & Specialty Datasheets", "Technical Bid Evaluations (TBE)", "Vendor Document Reviews (VDR)"],
    keyOutcomes: ["Optimal material selection", "Code compliance (ASME/API)", "Procurement accuracy", "Quality assurance"],
    applications: ["Corrosive Environments", "Cryogenic Service", "High-Pressure Systems", "Specialty Valves"]
  },
  {
    num: "09", code: "PP-109", icon: ShieldCheck,
    image: pp109Img,
    title: "Pipe Stress Analysis",
    shortDesc: "Finite element analysis of piping systems under thermal, seismic, and dynamic loads.",
    fullDesc: "Advanced stress analysis using CAESAR II / AutoPipe to simulate complex piping behavior under thermal cycling, pressure, seismic events, and wind loads. We ensure all nozzle loads and stress margins remain strictly within ASME B31.3/B31.1 limits.",
    deliverables: ["Stress Analysis Reports", "Equipment Nozzle Load Checks", "Spring Support Sizing", "Dynamic/Surge Analysis"],
    keyOutcomes: ["Code compliance guaranteed", "Equipment nozzle protection", "Fatigue failure prevention", "Safe system flexibility"],
    applications: ["Compressor Piping", "High-Temperature Lines", "PSV Flare Headers", "Long-Span Piperacks"]
  }
];

const SOFTWARE_TOOLS = [
  { name: "E3D", category: "3D Modeling" /*, logo: e3dLogo */ },
  { name: "SP3D", category: "3D Modeling" /*, logo: sp3dLogo */ },
  { name: "AutoCAD", category: "Drafting" /*, logo: autoCadLogo */ },
  { name: "Plant3D", category: "3D Modeling" /*, logo: plant3dLogo */ },
  { name: "Navisworks", category: "Clash Detection" /*, logo: navisworksLogo */ },
  { name: "Caesar II", category: "Stress Analysis" /*, logo: caesarLogo */ },
  { name: "AutoPipe", category: "Stress Analysis" /*, logo: autoPipeLogo */ }
];

const FEATURED_PROJECT = null; 

// ─── ANIMATION VARIANTS ───────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };

// ─── COMPONENT ────────────────────────────────────────────────────────────────
export default function PlantLayoutPipingPage() {
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
        <title>Plant Layout & Piping Engineering | Aarvi Engineering Services</title>
        <meta
          name="description"
          content="Expert 3D modeling, clash detection, stress analysis, and piping material engineering for complex industrial facilities."
        />
        <meta name="keywords" content="piping engineering, plant layout, 3D modeling, stress analysis, Caesar II, SP3D, E3D" />
        <meta property="og:title" content="Plant Layout & Piping Engineering | Aarvi Engineering Services" />
        <meta property="og:description" content="End-to-end piping design and stress analysis solutions across the asset lifecycle." />
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
              <source src="/piping_system.mp4" type="video/mp4" />
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
                  Piping Engineering
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight leading-[1.05] mb-5"
              >
                Plant Layout &<br />Piping Engineering
              </motion.h1>

              <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-bold text-white/60 mb-6">
                {["3D Modeling", "Stress Analysis", "Isometric Prep", "Material Specs", "Clash Resolution"].map((t, i) => (
                  <React.Fragment key={t}>
                    <span>{t}</span>
                    {i < 4 && <span className="text-white/25">•</span>}
                  </React.Fragment>
                ))}
              </motion.div>

              <motion.p variants={fadeUp} className="text-base lg:text-lg text-white/70 leading-relaxed max-w-lg mb-9">
                Delivering highly accurate, clash-free intelligent 3D designs and rigorous stress analysis to ensure safe and efficient fluid transport across complex industrial facilities.
              </motion.p>

              <motion.div variants={fadeUp} className="grid grid-cols-3 gap-6 mb-9 pb-9 border-b border-white/15 max-w-lg">
                {[
                  { icon: Users, value: "32+", label: "Global EPC Partners" },
                  { icon: Clock, value: "39+", label: "Years of Excellence" },
                  { icon: BadgeCheck, value: "100%", label: "Clash-Free Design" }
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
                  Integrated Piping Expertise
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
                </div>

                {/* ─ 30%: Wireframe visual panel ─ */}
                <div className="w-full lg:w-[30%] relative min-h-75 lg:min-h-0 bg-linear-to-br from-aarvi-navy to-[#16213d] border-t lg:border-t-0 lg:border-l border-slate-200">
                  
                  {/* ─── ADD IMAGE HERE (Uncomment when images are imported) ─── */}
                  {/*
                  {active.image && (
                    <Image 
                      src={active.image} 
                      alt={`${active.title} — technical schematic`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 30vw"
                      className="object-cover opacity-90 z-10 mix-blend-screen"
                    />
                  )}
                  */}

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
                We leverage the world&apos;s most advanced 3D modeling and stress analysis
                environments to ensure absolute structural and spatial precision.
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
                  className="p-5 w-40 rounded-xl border border-slate-200 bg-aarvi-bg hover:border-aarvi-green/40 hover:bg-white hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center text-center cursor-default min-h-30"
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
                  Plant Layout & Piping Engineering from the projects database once connected.
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
                  ┼ Let&apos;s Engineer the Layout
                </motion.span>
                <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight leading-tight mb-4">
                  Need Plant Layout & Piping Expertise?
                </motion.h2>
                <motion.p variants={fadeUp} className="text-white/60 text-sm leading-relaxed">
                  Our experts are ready to route and stress-analyze your next critical facility.
                </motion.p>
              </div>

              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 shrink-0">
                <Link
                  href="/contact?service=piping-engineering"
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