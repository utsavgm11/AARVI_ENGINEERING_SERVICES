// ─── NOTE FOR NEXT.JS 13+ APP ROUTER ──────────────────────────────────────────
// "use client" pages can't export `metadata`. Put this in a sibling
// page.server.js / layout.js / metadata.js file:
//
// export const metadata = {
//   title: "Civil & Structural Engineering | Aarvi Engineering Services",
//   description: "Expert civil and structural engineering for offshore structures, pipe racks, equipment foundations, and blast-resistant facilities.",
//   keywords: ["civil engineering","structural engineering","STAAD.Pro","SACS","Tekla","pipe rack design","offshore structures"],
//   openGraph: { title: "Civil & Structural Engineering", type: "website" }
// };
// ──────────────────────────────────────────────────────────────────────────────

"use client";
import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import {
  MapPin, Anchor, AlignJustify, Building2, Activity,
  ArrowUpToLine, Wind, Layers, ShieldAlert, Edit3, ArrowUpRight, ShieldCheck,
  Users, Clock, BadgeCheck, Briefcase
} from "lucide-react";

// ─── ASSET IMPORTS (Commented out to prevent Next.js compilation errors until files exist) ───

/*
// Capabilities Wireframes (800x1000)
import cs101Img from '../../../assets/CS-101.png';
import cs102Img from '../../../assets/CS-102.png';
import cs103Img from '../../../assets/CS-103.png';
import cs104Img from '../../../assets/CS-104.png';
import cs105Img from '../../../assets/CS-105.png';
import cs106Img from '../../../assets/CS-106.png';
import cs107Img from '../../../assets/CS-107.png';
import cs108Img from '../../../assets/CS-108.png';
import cs109Img from '../../../assets/CS-109.png';
import cs110Img from '../../../assets/CS-110.png';

// Software Logos (Transparent PNGs)
import staadLogo  from '../../../assets/staad-logo.png';
import sacsLogo   from '../../../assets/sacs-logo.png';
import teklaLogo  from '../../../assets/tekla-logo.png';
import autoCadLogo from '../../../assets/autocad-logo.png';
*/

// Use null as fallbacks while images are commented out to prevent crashing
const cs101Img = null;
const cs102Img = null;
const cs103Img = null;
const cs104Img = null;
const cs105Img = null;
const cs106Img = null;
const cs107Img = null;
const cs108Img = null;
const cs109Img = null;
const cs110Img = null;

// ─── CAPABILITIES DATA ───────────────────────────────────────────────────────
const CAPABILITIES = [
  {
    num: "01", code: "CS-101", icon: MapPin,
    image: cs101Img,
    title: "Site Development Engineering",
    shortDesc: "Comprehensive topographical planning, grading, and drainage infrastructure.",
    fullDesc: "Complete site preparation engineering including topographical modeling, earthwork volume optimization, rough and fine grading plans, and complex surface/subsurface drainage network design to ensure flood-free facility operations.",
    deliverables: ["Grading & Paving Plans", "Drainage Network Layouts", "Earthwork Volume Calculations", "Roadway & Access Design"],
    keyOutcomes: ["Flood prevention", "Optimized earthworks", "Safe site access", "Environmental compliance"],
    applications: ["Greenfield Facilities", "Plant Expansions", "Tank Farms", "Industrial Parks"]
  },
  {
    num: "02", code: "CS-102", icon: Anchor,
    image: cs102Img,
    title: "Offshore Structural Design",
    shortDesc: "Robust design of offshore platforms, jackets, and topside modules.",
    fullDesc: "Specialized engineering for harsh marine environments. We design offshore fixed platforms, jackets, and topside modules utilizing SACS software, ensuring structural integrity against extreme wave, wind, and operational fatigue loading.",
    deliverables: ["Jacket Design", "Topside Structural Layouts", "Fatigue Analysis Reports", "Boat Landing & Helideck Design"],
    keyOutcomes: ["Wave & current resilience", "API RP 2A compliance", "Optimized steel weight", "Safe marine operations"],
    applications: ["Fixed Offshore Platforms", "FPSO Modules", "Offshore Wind Foundations", "Wellhead Platforms"]
  },
  {
    num: "03", code: "CS-103", icon: AlignJustify,
    image: cs103Img,
    title: "Pipe Rack Design",
    shortDesc: "Structural frameworks engineered to support complex, multi-level piping corridors.",
    fullDesc: "Design of robust steel and concrete pipe racks capable of handling massive dead loads, thermal friction forces from piping expansion, and complex dynamic loading. We ensure optimal spatial planning for piping, cable trays, and future expansions.",
    deliverables: ["Pipe Rack 3D Models", "Structural Framing Plans", "Foundation Load Data", "Steel Connection Details"],
    keyOutcomes: ["Thermal load resistance", "Spatial optimization", "Efficient steel usage", "Future-proof capacity"],
    applications: ["Refinery Pipe Alleys", "Chemical Plants", "LNG Terminals", "Utility Corridors"]
  },
  {
    num: "04", code: "CS-104", icon: Building2,
    image: cs104Img,
    title: "Design of Super Structures",
    shortDesc: "Architectural and structural engineering for heavy industrial buildings.",
    fullDesc: "Comprehensive design of massive industrial superstructures, including compressor shelters, turbine halls, and heavy manufacturing sheds. We integrate large EOT crane loads, mezzanine floors, and complex HVAC ducting support systems.",
    deliverables: ["Superstructure 3D Models", "Steel Erection Drawings", "Crane Girder Design", "Architectural Layouts"],
    keyOutcomes: ["High load capacity", "Vibration control", "Code compliance", "Safe operational envelopes"],
    applications: ["Compressor Houses", "Turbine Halls", "Warehouse Facilities", "Substation Buildings"]
  },
  {
    num: "05", code: "CS-105", icon: Activity,
    image: cs105Img,
    title: "Structural Analysis",
    shortDesc: "Advanced finite element modeling to verify load-bearing integrity.",
    fullDesc: "Rigorous global structural analysis using STAAD.Pro to evaluate complex steel and concrete frameworks under dead, live, thermal, and dynamic operational loads, ensuring total compliance with AISC, ACI, and Eurocodes.",
    deliverables: ["Global Analysis Reports", "Member Sizing Calculations", "Deflection Checks", "Connection Design Reports"],
    keyOutcomes: ["Structural safety verification", "Optimized steel tonnage", "Code compliance", "Deflection control"],
    applications: ["All Industrial Structures", "Platform Modules", "Silo Supports", "Complex Frameworks"]
  },
  {
    num: "06", code: "CS-106", icon: ArrowUpToLine,
    image: cs106Img,
    title: "Lifting & Transportation Analysis",
    shortDesc: "Dynamic load simulations for the safe maneuvering of heavy modules.",
    fullDesc: "Critical engineering simulations for the fabrication, lifting, load-out, and sea-fastening of heavy pre-assembled modules (PAMs). We design lifting trunnions, spreader bars, and grillage to prevent structural yielding during transit.",
    deliverables: ["Lifting Analysis Reports", "Center of Gravity (CoG) Reports", "Sea-fastening Design", "Trunnion & Padeye Design"],
    keyOutcomes: ["Zero-incident lifts", "Safe marine transit", "Structural preservation", "Contractor alignment"],
    applications: ["Pre-Assembled Modules (PAM)", "Offshore Topsides", "Heavy Pressure Vessels", "Skid Packages"]
  },
  {
    num: "07", code: "CS-107", icon: Wind,
    image: cs107Img,
    title: "Seismic & Wind Assessment",
    shortDesc: "Evaluating structural resilience against extreme environmental forces.",
    fullDesc: "Advanced dynamic analysis to simulate the impact of high-velocity winds, hurricanes, and severe seismic events on tall columns, towers, and building structures, applying ASCE 7, UBC, and local seismic codes.",
    deliverables: ["Seismic Response Spectra", "Wind Load Analysis", "Base Shear Calculations", "Dynamic Amplification Reports"],
    keyOutcomes: ["Disaster resilience", "Code-mandated safety", "Foundation protection", "Vibration dampening"],
    applications: ["Tall Distillation Columns", "Flare Stacks", "Coastal Facilities", "Earthquake Zones"]
  },
  {
    num: "08", code: "CS-108", icon: Layers,
    image: cs108Img,
    title: "Equipment Foundation Design",
    shortDesc: "Deep and shallow foundation engineering for heavy, vibrating machinery.",
    fullDesc: "Geotechnical interpretation and structural design of isolated footings, mat foundations, and deep piles. We specialize in dynamic block foundations for rotating equipment (compressors/turbines) to strictly limit soil resonance and vibration amplitudes.",
    deliverables: ["Foundation Layout Drawings", "Rebar Detailing (BBS)", "Dynamic Vibration Analysis", "Pile Cap Design"],
    keyOutcomes: ["Zero soil settlement", "Vibration isolation", "Machine alignment preservation", "Structural longevity"],
    applications: ["Compressor Foundations", "Storage Tank Ring Walls", "Pump Bases", "Reactor Footings"]
  },
  {
    num: "09", code: "CS-109", icon: ShieldAlert,
    image: cs109Img,
    title: "Blast Resistant Structures",
    shortDesc: "Engineering heavily reinforced facilities to withstand explosive overpressures.",
    fullDesc: "Specialized design of Blast Resistant Modules (BRMs) and control rooms located within hazardous facility zones. We engineer high-mass concrete and steel systems to absorb and deflect vapor cloud explosion (VCE) blast waves per ASCE specifications.",
    deliverables: ["Blast Load Calculations", "Dynamic Response Analysis", "Reinforcement Detailing", "Blast Door/Window Specs"],
    keyOutcomes: ["Personnel protection", "Asset survivability", "ASCE compliance", "Facility resilience"],
    applications: ["Plant Control Rooms", "Substations in Haz-Zones", "Operator Shelters", "Ammunition Depots"]
  },
  {
    num: "10", code: "CS-110", icon: Edit3,
    image: cs110Img,
    title: "Structural Modification Studies",
    shortDesc: "Brownfield analysis for retrofitting and upgrading existing frameworks.",
    fullDesc: "Comprehensive adequacy checks of aging industrial structures. We conduct 3D laser scan integration, assess current load capacities, and design steel reinforcement retrofits to safely support new piping routes or heavier modern equipment.",
    deliverables: ["Structural Adequacy Reports", "Retrofit Design Drawings", "Demolition Sequencing", "Strengthening Details"],
    keyOutcomes: ["Safe brownfield expansion", "Cost-effective retrofits", "Extended asset life", "Minimized downtime"],
    applications: ["Plant Revamps", "Capacity Upgrades", "Corrosion Repairs", "Equipment Replacement"]
  }
];

const SOFTWARE_TOOLS = [
  { name: "STAAD.Pro", category: "Structural Analysis" /*, logo: staadLogo */ },
  { name: "SACS", category: "Offshore Analysis" /*, logo: sacsLogo */ },
  { name: "Tekla", category: "Steel Detailing" /*, logo: teklaLogo */ },
  { name: "AutoCAD", category: "Drafting" /*, logo: autoCadLogo */ }
];

const FEATURED_PROJECT = null; 

// ─── ANIMATION VARIANTS ───────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };

// ─── COMPONENT ────────────────────────────────────────────────────────────────
export default function CivilStructuralEngineeringPage() {
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
        <title>Civil & Structural Engineering | Aarvi Engineering Services</title>
        <meta
          name="description"
          content="Expert civil and structural engineering for offshore structures, pipe racks, equipment foundations, and blast-resistant facilities."
        />
        <meta name="keywords" content="civil engineering, structural engineering, STAAD.Pro, SACS, Tekla, pipe rack design, offshore structures" />
        <meta property="og:title" content="Civil & Structural Engineering | Aarvi Engineering Services" />
        <meta property="og:description" content="End-to-end civil and structural design solutions across the asset lifecycle." />
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
              <source src="/civil-structural-hero.mp4" type="video/mp4" />
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
                  Civil & Structural
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight leading-[1.05] mb-5"
              >
                Civil & Structural<br />Engineering
              </motion.h1>

              <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-bold text-white/60 mb-6">
                {["Offshore Structures", "Pipe Racks", "Heavy Foundations", "Blast Resistant Design", "Seismic Analysis"].map((t, i) => (
                  <React.Fragment key={t}>
                    <span>{t}</span>
                    {i < 4 && <span className="text-white/25">•</span>}
                  </React.Fragment>
                ))}
              </motion.div>

              <motion.p variants={fadeUp} className="text-base lg:text-lg text-white/70 leading-relaxed max-w-lg mb-9">
                Delivering robust, highly optimized civil and structural frameworks engineered to withstand extreme environmental forces, dynamic machinery vibrations, and massive industrial payloads.
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
                  Integrated Structural Expertise
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
                We leverage the world&apos;s most advanced structural analysis and modeling
                environments to ensure absolute safety and load-bearing precision.
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
                  Civil & Structural Engineering from the projects database once connected.
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
                  ┼ Let&apos;s Build the Foundation
                </motion.span>
                <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight leading-tight mb-4">
                  Need Structural Engineering Expertise?
                </motion.h2>
                <motion.p variants={fadeUp} className="text-white/60 text-sm leading-relaxed">
                  Our experts are ready to design and analyze your next critical structural framework.
                </motion.p>
              </div>

              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 shrink-0">
                <Link
                  href="/contact?service=civil-structural"
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