// ─── NOTE FOR NEXT.JS 13+ APP ROUTER ──────────────────────────────────────────
// "use client" pages can't export `metadata`. Put this in a sibling
// page.server.js / layout.js / metadata.js file:
//
// export const metadata = {
//   title: "Project Engineering & PMC Support | Aarvi Engineering Services",
//   description: "Expert Project Management Consultancy (PMC), interface management, and procurement engineering support using Primavera P6 and SmartPlant Foundation.",
//   keywords: ["project engineering","PMC support","engineering management","interface management","Primavera P6","procurement engineering","vendor coordination"],
//   openGraph: { title: "Project Engineering & PMC Support", type: "website" }
// };
// ──────────────────────────────────────────────────────────────────────────────

"use client";
import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import {
  Briefcase, CalendarClock, GitMerge, FileCheck, CheckSquare, Search,
  UsersRound, HardHat, TrendingUp, BarChart4, ArrowUpRight, ShieldCheck,
  Users, Clock, BadgeCheck
} from "lucide-react";

// ─── ASSET IMPORTS ───────────────────────────────────────────────────────────

// Use a single, unified image for all capabilities as requested
// Uncomment the line below when your image is in the assets folder
// import sharedCapabilityImg from '../../../assets/capabilities-shared.png';

// Fallback to prevent Next.js from crashing while the import is commented out
const sharedCapabilityImg = null;

// ─── CAPABILITIES DATA ───────────────────────────────────────────────────────
const CAPABILITIES = [
  {
    num: "01", code: "PM-101", icon: Briefcase,
    image: sharedCapabilityImg,
    title: "Engineering Management Services",
    shortDesc: "Complete multidisciplinary oversight ensuring technical integrity and schedule adherence.",
    fullDesc: "Acting as the central technical authority, we manage multi-discipline engineering teams throughout the EPC lifecycle. We ensure strict adherence to project specifications, international codes, budget constraints, and delivery milestones, acting as a seamless extension of the client's core team.",
    deliverables: ["Project Execution Plans (PEP)", "Engineering Execution Strategies", "Design Basis Memorandums", "Milestone Delivery Reports"],
    keyOutcomes: ["Technical integrity", "Budget adherence", "Cross-discipline alignment", "Risk mitigation"],
    applications: ["Mega EPC Projects", "Owner's Engineer Roles", "Brownfield Expansions", " FEED to EPC Transitions"]
  },
  {
    num: "02", code: "PM-102", icon: CalendarClock,
    image: sharedCapabilityImg,
    title: "Project Planning & Coordination",
    shortDesc: "Strategic scheduling and resource leveling to guarantee flawless project execution.",
    fullDesc: "Utilizing advanced tools like Primavera P6 and MS Project, we develop baseline schedules, establish WBS (Work Breakdown Structures), and coordinate resource allocation. We continuously forecast critical path impacts to prevent schedule slippage.",
    deliverables: ["Baseline Schedules (L1-L4)", "S-Curves & Histograms", "Critical Path Analysis", "Recovery Schedules"],
    keyOutcomes: ["On-time delivery", "Optimized resource loading", "Early bottleneck detection", "Schedule preservation"],
    applications: ["EPC Scheduling", "Turnaround Planning", "Shutdown Management", "Resource Leveling"]
  },
  {
    num: "03", code: "PM-103", icon: GitMerge,
    image: sharedCapabilityImg,
    title: "Interface Management",
    shortDesc: "Resolving complex boundary limits between distinct project contractors and packages.",
    fullDesc: "Systematic identification, logging, and resolution of physical and functional interfaces between different EPC contractors, licensors, and package vendors. We ensure seamless battery limit tie-ins for piping, power, control, and structural systems.",
    deliverables: ["Interface Registers", "Battery Limit Tie-in Schedules", "Interface Resolution Reports", "Design Coordination Memos"],
    keyOutcomes: ["Zero battery limit clashes", "Streamlined contractor communication", "Eliminated scope gaps", "Smooth integration"],
    applications: ["Multi-Contractor Projects", "Licensor Package Integration", "Offshore/Onshore Tie-ins", "Utility Connections"]
  },
  {
    num: "04", code: "PM-104", icon: FileCheck,
    image: sharedCapabilityImg,
    title: "Procurement Engineering Support",
    shortDesc: "Bridging the gap between engineering specifications and supply chain execution.",
    fullDesc: "We translate complex engineering designs into exact procurement requirements. We generate Material Requisitions (MRs), define strict inspection testing plans (ITPs), and resolve technical queries (TQs) from global suppliers.",
    deliverables: ["Material Requisitions (MR)", "Inspection & Test Plans (ITP)", "Technical Query (TQ) Resolution", "Vendor Data Requirement Lists (VDRL)"],
    keyOutcomes: ["Accurate material sourcing", "Code compliant fabrication", "Supply chain acceleration", "Quality assurance"],
    applications: ["Long Lead Items (LLI)", "Bulk Material Sourcing", "Package Procurement", "Specialty Equipment"]
  },
  {
    num: "05", code: "PM-105", icon: CheckSquare,
    image: sharedCapabilityImg,
    title: "Technical & Commercial Bid Evaluation",
    shortDesc: "Rigorous assessment of supplier bids to ensure technical parity and commercial viability.",
    fullDesc: "Conducting highly detailed Technical Bid Evaluations (TBE) and supporting Commercial Bid Evaluations (CBE). We normalize vendor proposals, identify technical deviations, and ensure clients procure the most reliable equipment at the optimal price point.",
    deliverables: ["Technical Bid Evaluations (TBE)", "Deviation/Exception Matrices", "Vendor Clarification Logs", "Final Award Recommendations"],
    keyOutcomes: ["Apples-to-apples vendor comparison", "Eliminated technical risks", "Budget optimization", "Fair procurement"],
    applications: ["Rotating Equipment", "Static Vessels", "Electrical Switchgears", "Automation Systems"]
  },
  {
    num: "06", code: "PM-106", icon: Search,
    image: sharedCapabilityImg,
    title: "Vendor Drawing Reviews",
    shortDesc: "Exhaustive scrutiny of supplier documentation to guarantee fabrication accuracy.",
    fullDesc: "Systematic review and approval of vendor documentation (VDR) against project specifications. We scrutinize general arrangements, datasheets, performance curves, and electrical schematics to authorize 'Approved for Construction' (AFC) status.",
    deliverables: ["Vendor Document Review (VDR) Logs", "Marked-up Vendor Drawings", "Approval Code Tracking", "Final Certified Document Dossiers"],
    keyOutcomes: ["Fabrication accuracy", "Clash prevention", "OEM compliance", "Seamless field assembly"],
    applications: ["Skid Packages", "Compressor Trains", "Heat Exchangers", "Control Panels"]
  },
  {
    num: "07", code: "PM-107", icon: UsersRound,
    image: sharedCapabilityImg,
    title: "Vendor Coordination",
    shortDesc: "Proactive communication bridging client expectations and vendor manufacturing.",
    fullDesc: "Acting as the primary technical liaison between the client and global original equipment manufacturers (OEMs). We host Kick-Off Meetings (KOM), pre-inspection meetings, and expedite critical vendor data to keep the engineering schedule on track.",
    deliverables: ["KOM Minutes of Meeting", "Expediting Reports", "Technical Action Item Logs", "Vendor Progress Dashboards"],
    keyOutcomes: ["Accelerated vendor data", "Aligned manufacturing expectations", "Reduced manufacturing delays", "Clear communication channels"],
    applications: ["Global Supply Chains", "Complex OEM Packages", "Critical Path Equipment", "Custom Fabrication"]
  },
  {
    num: "08", code: "PM-108", icon: HardHat,
    image: sharedCapabilityImg,
    title: "Construction Engineering Support",
    shortDesc: "Field-level technical guidance to resolve site queries and ensure design intent.",
    fullDesc: "Providing direct technical support to construction teams. We address Field Change Requests (FCRs), resolve Site Technical Queries (STQs), and provide on-the-spot engineering modifications to overcome unforeseen constructability challenges.",
    deliverables: ["Site Technical Query (STQ) Resolutions", "Field Change Requests (FCR)", "As-Built Drawing Markups", "Constructability Review Reports"],
    keyOutcomes: ["Uninterrupted construction", "Safe field modifications", "Preserved design integrity", "Rapid problem solving"],
    applications: ["Site Erection", "Brownfield Tie-ins", "Commissioning Prep", "Fabrication Yards"]
  },
  {
    num: "09", code: "PM-109", icon: TrendingUp,
    image: sharedCapabilityImg,
    title: "Project Controls Integration",
    shortDesc: "Establishing cost, schedule, and change management frameworks.",
    fullDesc: "Implementing rigorous project control mechanisms. We track earned value (EVM), monitor budget burn rates, and strictly manage the Management of Change (MoC) process to prevent scope creep and financial overruns.",
    deliverables: ["Earned Value Management (EVM) Reports", "Cost Variance Dashboards", "Change Order Registers", "Risk Mitigation Logs"],
    keyOutcomes: ["Financial predictability", "Scope creep prevention", "Transparent reporting", "Data-driven decisions"],
    applications: ["Lump Sum Turnkey (LSTK)", "Reimbursable Contracts", "Mega-Projects", "Portfolio Management"]
  },
  {
    num: "10", code: "PM-110", icon: BarChart4,
    image: sharedCapabilityImg,
    title: "Engineering Progress Monitoring",
    shortDesc: "Real-time tracking of engineering deliverables using intelligent dashboards.",
    fullDesc: "Deploying data-centric tracking systems like SmartPlant Foundation to monitor the real-time status of thousands of engineering deliverables. We provide clients with live dashboards detailing Planned vs. Actual progress across all disciplines.",
    deliverables: ["Weekly/Monthly Progress Reports", "Document Control Registers (MDR)", "Live Status Dashboards", "KPI Tracking Metrics"],
    keyOutcomes: ["Absolute transparency", "Early warning systems", "KPI accountability", "Synchronized team output"],
    applications: ["Detail Engineering Phases", "Document Control Management", "Client Reporting", "Audit Preparation"]
  }
];

const SOFTWARE_TOOLS = [
  { name: "Primavera P6", category: "Project Scheduling" },
  { name: "MS Project", category: "Project Planning" },
  { name: "SmartPlant Foundation", category: "Data & Progress Mgt." }
];

const FEATURED_PROJECT = null; 

// ─── ANIMATION VARIANTS ───────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };

// ─── COMPONENT ────────────────────────────────────────────────────────────────
export default function ProjectEngineeringPMCPage() {
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
        <title>Project Engineering & PMC Support | Aarvi Engineering Services</title>
        <meta
          name="description"
          content="Expert Project Management Consultancy (PMC), interface management, and procurement engineering support using Primavera P6 and SmartPlant Foundation."
        />
        <meta name="keywords" content="project engineering, PMC support, engineering management, interface management, Primavera P6, procurement engineering, vendor coordination" />
        <meta property="og:title" content="Project Engineering & PMC Support | Aarvi Engineering Services" />
        <meta property="og:description" content="Strategic engineering management and project control solutions." />
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
              <source src="/pmc-hero.mp4" type="video/mp4" />
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
                  Project Controls & Oversight
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight leading-[1.05] mb-5"
              >
                Project Engineering &<br />PMC Support
              </motion.h1>

              <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-bold text-white/60 mb-6">
                {["Engineering Management", "Primavera P6", "Interface Mgt.", "Procurement Support", "Vendor Reviews"].map((t, i) => (
                  <React.Fragment key={t}>
                    <span>{t}</span>
                    {i < 4 && <span className="text-white/25">•</span>}
                  </React.Fragment>
                ))}
              </motion.div>

              <motion.p variants={fadeUp} className="text-base lg:text-lg text-white/70 leading-relaxed max-w-lg mb-9">
                Acting as the central technical authority to manage multi-discipline engineering teams, optimize procurement, and guarantee strict schedule adherence across complex EPC lifecycles.
              </motion.p>

              <motion.div variants={fadeUp} className="grid grid-cols-3 gap-6 mb-9 pb-9 border-b border-white/15 max-w-lg">
                {[
                  { icon: Briefcase, value: "100%", label: "PMC Oversight" },
                  { icon: ShieldCheck, value: "Sync", label: "Discipline Alignment" },
                  { icon: BadgeCheck, value: "Zero", label: "Schedule Slippage" }
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
                  Integrated Management Expertise
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
                  
                  {/* ─── ADD IMAGE HERE (Uncomment when image is imported) ─── */}
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
                We leverage the world&apos;s most advanced planning and project management
                environments to ensure absolute schedule and data control.
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
                  Project Engineering & PMC Support from the projects database once connected.
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
                  ┼ Let&apos;s Manage the Complexity
                </motion.span>
                <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight leading-tight mb-4">
                  Need PMC Oversight Expertise?
                </motion.h2>
                <motion.p variants={fadeUp} className="text-white/60 text-sm leading-relaxed">
                  Our experts are ready to provide robust engineering management and project controls for your next critical facility.
                </motion.p>
              </div>

              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 shrink-0">
                <Link
                  href="/contact?service=project-engineering-pmc"
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