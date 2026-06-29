"use client";
import React, { useState ,useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Head from 'next/head';
import { 
  Activity, Database, FileText, Settings, ShieldAlert, Cpu, 
  Target, ClipboardCheck, ArrowUpRight, ShieldCheck
} from 'lucide-react';


// ─── CAPABILITIES DATA ───────────────────────────────────────────────────────
const CAPABILITIES = [
  {
    num: "01",
    code: "PE-101",
    icon: Activity,
    title: "Process Design & Simulation",
    shortDesc: "Rigorous steady-state and dynamic thermodynamic multi-phase processing models.",
    fullDesc: "We deliver comprehensive process simulation using industry-leading software, generating accurate design basis and operational envelopes for maximum throughput and efficiency optimization.",
    deliverables: [
      "Process Simulation Models",
      "Thermodynamic Flow Reviews",
      "Optimization Case Studies",
      "Design Basis Documents"
    ],
    keyOutcomes: [
      "Accurate design basis",
      "Reduced energy losses",
      "Maximum throughput",
      "Validated feasibility"
    ],
    applications: [
      "Refineries",
      "Petrochemical Plants",
      "Gas Processing",
      "LNG / Cryogenic Plants"
    ]
  },
  {
    num: "02",
    code: "PE-102",
    icon: Database,
    title: "Heat & Material Balance",
    shortDesc: "Comprehensive stream property data generation across operational envelopes.",
    fullDesc: "Complete mass and energy balance calculations with stream-by-stream property data, covering steady-state operations and dynamic scenarios across full operating ranges.",
    deliverables: [
      "Balance Calculations",
      "Stream Property Data",
      "Energy Analysis Reports",
      "Operational Envelope Maps"
    ],
    keyOutcomes: [
      "Accurate property data",
      "Energy optimization",
      "Operating range clarity",
      "Design verification"
    ],
    applications: [
      "Refineries",
      "Petrochemical Plants",
      "Power Generation",
      "Process Plants"
    ]
  },
  {
    num: "03",
    code: "PE-103",
    icon: FileText,
    title: "PFD, P&ID & Datasheets",
    shortDesc: "Intelligent drafting and configuration mapping for equipment and instrumentation.",
    fullDesc: "Expert engineering drawing development including Process Flow Diagrams, Piping & Instrumentation Diagrams, and comprehensive equipment datasheets with full technical specifications.",
    deliverables: [
      "PFD Development",
      "P&ID Configuration",
      "Equipment Datasheets",
      "Instrument Specifications"
    ],
    keyOutcomes: [
      "Complete documentation",
      "Design clarity",
      "Buildable designs",
      "Vendor compatibility"
    ],
    applications: [
      "Refineries",
      "Petrochemical Plants",
      "Gas Processing",
      "Industrial Plants"
    ]
  },
  {
    num: "04",
    code: "PE-104",
    icon: Settings,
    title: "Utility & Hydraulic Studies",
    shortDesc: "Network analysis mapping line friction heads, pump NPSH, and full sizing matrices.",
    fullDesc: "Complete utility system analysis including pressure drop calculations, pump sizing, NPSH evaluation, and comprehensive hydraulic network modeling for steam, water, and gas systems.",
    deliverables: [
      "Network Analysis Models",
      "Pressure Drop Calculations",
      "Pump Sizing & Selection",
      "NPSH Availability Studies"
    ],
    keyOutcomes: [
      "Optimized system design",
      "Reliable operations",
      "Cost-effective utilities",
      "Full system coverage"
    ],
    applications: [
      "Utility Systems",
      "Steam Networks",
      "Water Treatment",
      "Compressed Gas"
    ]
  },
  {
    num: "05",
    code: "PE-105",
    icon: ShieldAlert,
    title: "Process Hazard Analysis",
    shortDesc: "Expertly facilitated HAZID & HAZOP screening sessions for high-consequence failure modes.",
    fullDesc: "Comprehensive hazard identification and analysis using HAZID and HAZOP methodologies to identify and evaluate process risks, consequences, and safeguards with expert facilitation.",
    deliverables: [
      "HAZID Study Reports",
      "HAZOP Session Records",
      "Risk Register Development",
      "Safeguard Recommendations"
    ],
    keyOutcomes: [
      "Risk identification complete",
      "Safeguards specified",
      "Regulatory compliance",
      "Safety culture improvement"
    ],
    applications: [
      "Oil & Gas",
      "Petrochemicals",
      "Refineries",
      "Chemical Plants"
    ]
  },
  {
    num: "06",
    code: "PE-106",
    icon: Cpu,
    title: "SIL & Functional Safety",
    shortDesc: "Assessment and layer of protection analysis to calibrate automated safety instrument functions.",
    fullDesc: "Rigorous Safety Integrity Level determination and Functional Safety assessments including LOPA analysis, SIS design verification, and proof test strategies aligned with IEC 61508/61511 standards.",
    deliverables: [
      "SIL Assessment Reports",
      "LOPA Studies",
      "SIS Design Verification",
      "Proof Test Procedures"
    ],
    keyOutcomes: [
      "SIL targets defined",
      "IEC compliance achieved",
      "Instrument selection validated",
      "Proof test schedules set"
    ],
    applications: [
      "Safety Instrumented Systems",
      "Automation Systems",
      "Risk Management",
      "Regulatory Compliance"
    ]
  },
  {
    num: "07",
    code: "PE-107",
    icon: Target,
    title: "Risk & Consequence Analysis",
    shortDesc: "Quantitative mapping of gas cloud bounds, thermal radiation flares, and overpressure.",
    fullDesc: "Advanced consequence modeling including dispersion analysis, thermal radiation mapping, and overpressure calculations to quantify risk and support emergency planning and site layout.",
    deliverables: [
      "Dispersion Modeling",
      "Thermal Radiation Maps",
      "Overpressure Analysis",
      "Risk Contour Maps"
    ],
    keyOutcomes: [
      "Risk quantified",
      "Emergency plans validated",
      "Site layout optimized",
      "Insurance data supplied"
    ],
    applications: [
      "Risk Assessment",
      "Site Layout",
      "Emergency Planning",
      "Insurance Requirements"
    ]
  },
  {
    num: "08",
    code: "PE-108",
    icon: ClipboardCheck,
    title: "Process Safety Management",
    shortDesc: "Pre-commissioning safety audits, mechanical completion, and operational readiness.",
    fullDesc: "Comprehensive PSM program development including pre-commissioning safety verification, mechanical completion audits, and commissioning readiness assessments ensuring safe startup.",
    deliverables: [
      "PSM Program Design",
      "Safety Audits",
      "Commissioning Checklists",
      "Operational Procedures"
    ],
    keyOutcomes: [
      "Safe startup",
      "Zero incidents",
      "Regulatory approval",
      "Operator confidence"
    ],
    applications: [
      "Project Startups",
      "Plant Modifications",
      "Regulatory Compliance",
      "Operational Handover"
    ]
  }
];

const SOFTWARE_TOOLS = [
  { name: "Aspen HYSYS", category: "Thermodynamics" },
  { name: "Aspen Plus", category: "Simulation" },
  { name: "PipeNet", category: "Hydraulics" },
  { name: "FlareSIM", category: "Flaring" },
  { name: "PHAST", category: "Consequence" },
  { name: "SAFETI", category: "Risk" },
  { name: "PHA-Pro", category: "HAZOP" },
  { name: "exSILentia", category: "SIL" },
  { name: "Detect3D", category: "Gas Detection" }
];

const INDUSTRIES = [
  { icon: "🛢️", name: "Oil & Gas", code: "OIL_GAS" },
  { icon: "🏭", name: "Refineries", code: "REFINERY" },
  { icon: "⚗️", name: "Petrochemicals", code: "PETROCHEM" },
  { icon: "⚡", name: "Power Generation", code: "POWER" },
  { icon: "❄️", name: "LNG & Gas Processing", code: "LNG" },
  { icon: "🏗️", name: "Infrastructure", code: "INFRA" }
];

// ─── ANIMATION VARIANTS ─────────────────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 60, damping: 15 } }
};

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────
export default function ProcessSafetyEngineeringPage() {
  const [expandedCapability, setExpandedCapability] = useState(0);
  const detailsSectionRef = useRef(null);
  const active = CAPABILITIES[expandedCapability];

  const handleViewDetails = () => {
  console.log("Clicked View Details");

  const section = document.getElementById("service-details");

  if (!section) {
    console.log("Section not found");
    return;
  }

  console.log(section);

  window.scrollTo({
    top: section.offsetTop - 100,
    behavior: "smooth",
  });
};

  return (
    <>
      <Head>
        <title>Process & Safety Engineering | Industrial Engineering Services</title>
        <meta name="description" content="Expert process design, safety engineering, and HAZOP analysis. FEED studies, thermodynamic modeling, SIL assessments, and process safety management solutions." />
        <meta name="keywords" content="process engineering, safety engineering, HAZOP, SIL assessment, process design, thermodynamic modeling" />
        <meta property="og:title" content="Process & Safety Engineering Services" />
        <meta property="og:description" content="Comprehensive process and safety engineering solutions for industrial facilities." />
        <meta property="og:type" content="website" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              "name": "Process & Safety Engineering",
              "description": "Industrial process design, safety analysis, and engineering services",
              "serviceType": "Engineering Consulting",
              "areaServed": "Global",
              "hasOfferingDetails": {
                "@type": "OfferingDetails",
                "priceCurrency": "USD"
              }
            })
          }}
        />
      </Head>

      <main className="w-full bg-[#050505] min-h-screen text-white font-sans selection:bg-white selection:text-[#050505]">
        
        {/* ────────────────────────────────────────────────────────────────────── */}
        {/* HERO SECTION */}
        {/* ────────────────────────────────────────────────────────────────────── */}
        <section className="relative w-full min-h-screen flex items-center overflow-hidden bg-[#0a1628]">
          
          {/* Background video/image with overlay */}
          <div className="absolute inset-0 w-full h-full">
            <video 
              autoPlay 
              muted 
              loop 
              playsInline 
              className="absolute inset-0 w-full h-full object-cover opacity-30"
            >
              <source src="/process-hero.mp4" type="video/mp4" />
            </video>
            
            

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-linear-to-r from-[#0a1628] via-[#0a1628]/80 to-[#0a1628]/40" />
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-32 w-full">
            <div className="max-w-5xl">
              
              {/* Left: Text Content */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#1db87a]/30 bg-[#1db87a]/10 mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1db87a] animate-pulse" />
                  <span className="text-[10px] font-mono font-bold text-[#1db87a] tracking-widest uppercase">
                    Core Capability
                  </span>
                </div>

                <h1 className="text-5xl lg:text-7xl font-black text-white uppercase tracking-tight leading-[1.05] mb-4">
                  Process & Safety <br className="hidden sm:block" />
                  Engineering
                </h1>

                <div className="w-12 h-1.5 bg-[#1db87a] rounded-full mb-6" />

                <div className="flex flex-wrap gap-2 mb-8">
                  {["FEED", "HAZOP", "SIL", "QRA", "PSM"].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-mono font-bold text-[#1db87a] border border-[#1db87a]/30 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="text-lg text-white/70 leading-relaxed mb-8 max-w-lg">
                  End-to-end process and safety engineering solutions that ensure operational integrity, regulatory compliance, and sustainable performance across the asset lifecycle.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-6 mb-8 pb-8 border-b border-white/10">
                  <div>
                    <div className="text-3xl lg:text-4xl font-black text-[#1db87a]">32+</div>
                    <div className="text-xs text-white/50 font-mono uppercase tracking-widest mt-1">EPC Partners</div>
                  </div>
                  <div>
                    <div className="text-3xl lg:text-4xl font-black text-[#1db87a]">39+</div>
                    <div className="text-xs text-white/50 font-mono uppercase tracking-widest mt-1">Years Experience</div>
                  </div>
                  <div>
                    <div className="text-3xl lg:text-4xl font-black text-[#1db87a]">100%</div>
                    <div className="text-xs text-white/50 font-mono uppercase tracking-widest mt-1">Audit Ready</div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/contact"
                    className="px-6 py-3 bg-[#1db87a] text-[#050505] font-black text-sm uppercase tracking-widest rounded-lg hover:bg-[#1db87a]/90 transition-all duration-300 flex items-center gap-2 group"
                  >
                    Get Started <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </Link>
                 
                </div>
              </motion.div>
              
            </div>
          </div>
        </section>

        {/* ────────────────────────────────────────────────────────────────────── */}
        {/* CAPABILITIES OVERVIEW - GRID */}
        {/* ────────────────────────────────────────────────────────────────────── */}
        <section className="relative py-24 lg:py-32 bg-[#050505] border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="text-[10px] font-mono text-[#1db87a] tracking-widest uppercase">Our Core Capabilities</span>
              <h2 className="text-4xl lg:text-5xl font-black text-white uppercase tracking-tight mt-2 mb-4">
                Integrated Process & Safety Expertise
              </h2>
              <div className="w-12 h-1 bg-[#1db87a] mx-auto rounded-full" />
            </motion.div>

            {/* Capability cards grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {CAPABILITIES.map((cap, idx) => {
                const Icon = cap.icon;
                const isActive = idx === expandedCapability;
                
                return (
                  <motion.div
                    key={cap.code}
                    variants={itemVariants}
                    onClick={() => setExpandedCapability(idx)}
                    className={`relative p-6 rounded-2xl border transition-all duration-300 text-left group overflow-hidden ${
                      isActive
                        ? 'bg-[#1db87a]/15 border-[#1db87a]/60 shadow-lg shadow-[#1db87a]/10'
                        : 'bg-[#0F0F0F] border-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-white/5'
                    }`}
                  >
                    {/* Background gradient on hover */}
                    <div
                      className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 ${
                        isActive ? 'opacity-10' : ''
                      }`}
                      style={{
                        background: 'linear-gradient(135deg, #1db87a 0%, transparent 100%)'
                      }}
                    />

                    <div className="relative z-10 flex items-start justify-between mb-4">
                      <div className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? 'bg-[#1db87a] border-[#1db87a] text-[#050505]'
                          : 'bg-white/5 border-white/10 text-white/40 group-hover:text-white/60'
                      }`}>
                        <Icon className="w-5 h-5" strokeWidth={1.5} />
                      </div>
                      <span className={`font-mono text-xs font-black tracking-widest transition-colors ${
                        isActive ? 'text-[#1db87a]' : 'text-white/30 group-hover:text-white/40'
                      }`}>
                        {cap.num}
                      </span>
                    </div>

                    <h3 className={`text-sm lg:text-base font-black uppercase leading-tight tracking-tight transition-colors ${
                      isActive ? 'text-white' : 'text-white/80 group-hover:text-white'
                    }`}>
                      {cap.title}
                    </h3>

                    <p className={`text-xs mt-3 leading-relaxed transition-colors ${
                      isActive ? 'text-white/70' : 'text-white/40'
                    }`}>
                      {cap.shortDesc}
                    </p>

                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-4 pt-4 border-t border-white/10"
                      >
                       <motion.button
  type="button"
  onClick={(e) => {
    e.preventDefault();
    e.stopPropagation();
    handleViewDetails();
  }}
  whileHover={{ x: 6 }}
  whileTap={{ scale: 0.97 }}
  className="group inline-flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-[0.18em] text-[#1db87a] cursor-pointer"
>
  <span>View Details</span>

  <motion.span
    className="inline-block"
    animate={{ x: 0 }}
    whileHover={{ x: 5 }}
    transition={{ duration: 0.2 }}
  >
    →
  </motion.span>
</motion.button>
        </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* ────────────────────────────────────────────────────────────────────── */}
        {/* EXPANDED CAPABILITY SECTION */}
        {/* ────────────────────────────────────────────────────────────────────── */}
        <section 
         id="service-details"
        ref={detailsSectionRef}
        className="relative py-20 lg:py-32 bg-[#0a1628] border-b border-white/5 scroll-mt-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <motion.div
              key={expandedCapability}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start"
            >
              
              {/* Left: Sidebar Navigation */}
              <div className="lg:col-span-1">
                <div className="sticky top-8 space-y-2">
                  <h3 className="text-xs font-mono text-white/40 uppercase tracking-widest mb-4">Explore Service</h3>
                  <div className="space-y-1 max-h-125 overflow-y-auto pr-2">
                    {CAPABILITIES.map((cap, idx) => (
                      <button
                        key={cap.code}
                        onClick={() =>  {
        setExpandedCapability(idx);

        window.scrollTo({
            top:
                detailsSectionRef.current.getBoundingClientRect().top +
                window.scrollY -
                90,
            behavior: "smooth",
        });
    }}
                        className={`w-full text-left px-4 py-3 rounded-lg text-sm font-bold uppercase tracking-tight transition-all duration-200 flex items-center gap-3 ${
                          idx === expandedCapability
                            ? 'bg-[#1db87a]/20 border border-[#1db87a] text-white'
                            : 'hover:bg-white/5 text-white/50 hover:text-white/80 border border-transparent'
                        }`}
                      >
                        <span className="font-mono text-xs">{cap.num}</span>
                        <span className="flex-1 truncate">{cap.title}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Capability Details */}
              <div className="lg:col-span-2 space-y-8">
                
                {/* Header */}
                <div>
                  <div className="inline-block px-3 py-1 bg-[#1db87a]/15 border border-[#1db87a] rounded-full mb-4">
                    <span className="text-[10px] font-mono text-[#1db87a] font-bold tracking-widest uppercase">
                      {active.code}
                    </span>
                  </div>
                  <h2 className="text-4xl font-black text-white uppercase tracking-tight mb-4">
                    {active.title}
                  </h2>
                  <p className="text-white/60 text-lg leading-relaxed">
                    {active.fullDesc}
                  </p>
                </div>

                {/* Three columns grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* Deliverables */}
                  <div>
                    <h3 className="text-xs font-mono text-[#1db87a] uppercase tracking-widest mb-4">Deliverables</h3>
                    <ul className="space-y-2">
                      {active.deliverables.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                          <span className="text-[#1db87a] font-bold mt-0.5">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Key Outcomes */}
                  <div>
                    <h3 className="text-xs font-mono text-[#1db87a] uppercase tracking-widest mb-4">Key Outcomes</h3>
                    <ul className="space-y-2">
                      {active.keyOutcomes.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                          <span className="text-[#1db87a] font-bold mt-0.5">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Typical Applications */}
                  <div>
                    <h3 className="text-xs font-mono text-[#1db87a] uppercase tracking-widest mb-4">Applications</h3>
                    <ul className="space-y-2">
                      {active.applications.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                          <span className="text-[#1db87a] font-bold mt-0.5">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* CTA */}
                <div className="pt-6 border-t border-white/10">
                  <Link
                    href={`/contact?service=${active.code}`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#1db87a] text-[#050505] font-black text-sm uppercase tracking-widest rounded-lg hover:bg-[#1db87a]/90 transition-all group"
                  >
                    Discuss {active.code} <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ────────────────────────────────────────────────────────────────────── */}
        {/* SOFTWARE ECOSYSTEM */}
        {/* ────────────────────────────────────────────────────────────────────── */}
        <section className="relative py-24 lg:py-32 bg-[#050505] border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <ShieldCheck className="w-10 h-10 text-[#1db87a] mx-auto mb-4" strokeWidth={1.5} />
              <h2 className="text-4xl lg:text-5xl font-black text-white uppercase tracking-tight mb-4">
                Advanced Tools. Proven Results.
              </h2>
              <p className="text-white/50 text-lg max-w-2xl mx-auto">
                We leverage the world's most advanced thermodynamic and risk calculation environments to ensure absolute mathematical precision.
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="flex flex-wrap justify-center gap-3"
            >
              {SOFTWARE_TOOLS.map((tool, i) => (
                <motion.div
                  key={tool.name}
                  variants={itemVariants}
                  className="px-5 py-3 bg-[#0F0F0F] border border-white/10 rounded-xl hover:border-[#1db87a]/50 hover:bg-white/5 transition-all duration-300 group cursor-default"
                >
                  <div className="font-mono text-xs font-black text-white uppercase tracking-widest group-hover:text-[#1db87a] transition-colors">
                    {tool.name}
                  </div>
                  <div className="text-[9px] text-white/30 mt-1">{tool.category}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ────────────────────────────────────────────────────────────────────── */}
        {/* INDUSTRIES WE SERVE */}
        {/* ────────────────────────────────────────────────────────────────────── */}
        <section className="relative py-24 lg:py-32 bg-[#0a1628] border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="text-[10px] font-mono text-[#1db87a] tracking-widest uppercase">Industry Focus</span>
              <h2 className="text-4xl lg:text-5xl font-black text-white uppercase tracking-tight mt-2">
                Engineering Solutions for Critical Industries
              </h2>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
            >
              {INDUSTRIES.map((industry) => (
                <motion.div
                  key={industry.code}
                  variants={itemVariants}
                  className="p-6 rounded-2xl bg-[#0F0F0F] border border-white/10 hover:border-[#1db87a]/50 hover:bg-white/5 transition-all duration-300 flex flex-col items-center text-center group cursor-default"
                >
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{industry.icon}</div>
                  <h3 className="font-bold text-sm text-white group-hover:text-[#1db87a] transition-colors">
                    {industry.name}
                  </h3>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ────────────────────────────────────────────────────────────────────── */}
        {/* CTA BANNER */}
        {/* ────────────────────────────────────────────────────────────────────── */}
        <section className="relative py-20 lg:py-28 bg-linear-to-r from-[#0a1628] via-[#0a1628] to-[#0a1628]/80 border-b border-white/5">
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: 'linear-gradient(45deg, #1db87a 0%, transparent 50%)',
          }} />

          <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col md:flex-row items-center justify-between gap-8"
            >
              
              <div>
                <span className="text-[10px] font-mono text-[#1db87a] uppercase tracking-widest mb-3 block">
                  Next Steps
                </span>
                <h2 className="text-4xl lg:text-5xl font-black text-white uppercase tracking-tight mb-3">
                  Need Process & Safety Engineering Expertise?
                </h2>
                <p className="text-white/60 text-lg max-w-lg">
                  Connect with our technical authorities to discuss your specific process design and safety compliance requirements.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 shrink-0">
                <Link
                  href="/contact?service=process-safety"
                  className="px-8 py-4 bg-[#1db87a] text-[#050505] font-black text-sm uppercase tracking-widest rounded-lg hover:bg-[#1db87a]/90 transition-all flex items-center gap-2 group whitespace-nowrap"
                >
                  Talk to Experts <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Link>
                <Link
                  href="/downloads/process-capabilities.pdf"
                  className="px-8 py-4 border border-white/20 text-white font-black text-sm uppercase tracking-widest rounded-lg hover:border-white/40 hover:bg-white/5 transition-all"
                >
                  Download Capabilities
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

      </main>
    </>
  );
}