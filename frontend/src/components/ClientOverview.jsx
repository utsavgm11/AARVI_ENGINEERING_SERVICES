"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Target, ShieldCheck, Briefcase } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// ─── CORRECTED RELATIVE DIRECTORY CLIMB PATHS ────────────────────────────────
import logoMcdermott from '../assets/mcdermott.png';
import logoWood from '../assets/wood.png';
import logoFluor from '../assets/fluor.png';
import logoSaipem from '../assets/saipem.png';
import logoPetrofac from '../assets/petrofac.png';
import logoTechnip from '../assets/technip.jpeg';
import logoWorley from '../assets/worley.jpeg';
import logoKentz from '../assets/kentz.png';
import logoKbr from '../assets/kbr.png';
import logoAmns from '../assets/amns.png';
import logoSlb from '../assets/slb.png';
import logoWhessoe from '../assets/whessoe.png';
import logoTecnimont from '../assets/tecnimont.png';
import logoTasnee from '../assets/tasnee.png';
import logoLt from '../assets/lt.png';
import logoTuah from '../assets/tuah.png';
import logoJacobs from '../assets/jacobs.png';
import logoSpic from '../assets/spic.png';
import logoJindal from '../assets/jindal.png';
import logoHpcl from '../assets/hpcl.png';
import logoBpcl from '../assets/bpcl.png';
import logoSbm from '../assets/sbmoffshor.png';
import logoShell from '../assets/shell.png';
import logoCairn from '../assets/cairn.png';
import logoIocl from '../assets/iocl.png';
import logoEil from '../assets/eil.jpg';
import logoReliance from '../assets/reliance.png';
import logoMrpl from '../assets/mrpl.png';
import logoGnfc from '../assets/gnfc.png';
import logoCpcl from '../assets/cpcl.png';
import logoToyo from '../assets/toyo.png';
import logoTata from '../assets/tata.png';

const ALL_32_CLIENTS = [
  { id: "mcdermott", name: "McDermott", tier: "Tier-1 Global EPC", sector: "Offshore & Marine", project: "FPSO Topside Engineering", marker: "MCD_ENG", logo: logoMcdermott },
  { id: "wood", name: "Wood", tier: "Global Energy Services", sector: "Downstream Refining", project: "FEED Optimization Cycles", marker: "WD_CON", logo: logoWood },
  { id: "fluor", name: "Fluor", tier: "Fortune 500 EPC", sector: "Petrochemical Infrastructure", project: "Detailed Piping Configurations", marker: "FLR_ENG", logo: logoFluor },
  { id: "saipem", name: "Saipem", tier: "Global Infrastructure", sector: "Subsea & Pipeline", project: "Stress Flexibility Analysis", marker: "SPM_SUB", logo: logoSaipem },
  { id: "petrofac", name: "Petrofac", tier: "International EPC", sector: "Onshore Processing", project: "Utility Routing Optimization", marker: "PFC_ONSH", logo: logoPetrofac },
  { id: "technip", name: "Technip Energies", tier: "Energy Transition Leader", sector: "LNG & Gas Processing", project: "Process Simulation Packages", marker: "TEN_GAS", logo: logoTechnip },
  { id: "worley", name: "Worley", tier: "Global Engineering Alpha", sector: "Chemical & Resources", project: "Multi-Discipline Plant Design", marker: "WOR_MJD", logo: logoWorley },
  { id: "kentz", name: "Kentz", tier: "Specialist Constructor", sector: "Procurement & Construction", project: "Electrical System Layouts", marker: "KNZ_EPC", logo: logoKentz },
  
  { id: "kbr", name: "KBR", tier: "Defense & Tech EPC", sector: "Ammonia & Specialized Chem", project: "Static Equipment Validation", marker: "KBR_TECH", logo: logoKbr },
  { id: "amns", name: "AM/NS India", tier: "Steel Megamax Giant", sector: "Heavy Metallurgical", project: "Structural Steel Drafting", marker: "AMNS_IND", logo: logoAmns },
  { id: "slb", name: "SLB", tier: "Subsurface Technology Alpha", sector: "Digital Oilfield Systems", project: "Intelligent Completion Logic", marker: "SLB_RESR", logo: logoSlb },
  { id: "whessoe", name: "Whessoe", tier: "Cryogenic Tank Expert", sector: "LNG Storage Terminals", project: "Thermal Expansion Calculations", marker: "WHS_CRYO", logo: logoWhessoe },
  { id: "tecnimont", name: "Tecnimont", tier: "Industrial Plant EPC", sector: "Polymer & Fertilizer Blocks", project: "MFA Piping Stress Modeling", marker: "TCM_PLAST", logo: logoTecnimont },
  { id: "tasnee", name: "Tasnee", tier: "Petrochemical Producer", sector: "Chemical Manufacturing", project: "HSE Process Safety Isolation", marker: "TSN_CHEM", logo: logoTasnee },
  { id: "lt", name: "L&T Engineering", tier: "National Infrastructure Giant", sector: "Heavy Engineering", project: "High-Load Foundation Civil Design", marker: "LT_HEAVY", logo: logoLt },
  { id: "tuah", name: "Tuah Engineering", tier: "Regional Engineering Agency", sector: "Asset Maintenance", project: "As-Built Field Verification", marker: "TUH_ASIA", logo: logoTuah },

  { id: "jacobs", name: "Jacobs", tier: "Global Technical Consultancy", sector: "Advanced Facilities", project: "Water Cycle Lifecycle Design", marker: "JCB_CONS", logo: logoJacobs },
  { id: "spic", name: "SPIC India", tier: "Agricultural Agro-Chem", sector: "Fertilizer Infrastructure", project: "Instrumentation Control Loops", marker: "SPC_AGRO", logo: logoSpic },
  { id: "jindal", name: "Jindal Steel & Power", tier: "Metallurgical Infrastructure", sector: "Power Generation Assets", project: "Civil Foundation Layouts", marker: "JSP_STEEL", logo: logoJindal },
  { id: "hpcl", name: "HPCL", tier: "National Hydrocarbon PSU", sector: "Refinery Expansion Layouts", project: "Piping Utility Optimization", marker: "HP_REFIN", logo: logoHpcl },
  { id: "bpcl", name: "BPCL", tier: "Downstream Energy PSU", sector: "Product Supply Infrastructure", project: "Hazardous Area Classification", marker: "BP_MUM", logo: logoBpcl },
  { id: "sbmoffshore", name: "SBM Offshore", tier: "FPSO Lease Supermajor", sector: "Floating Marine Assets", project: "Topside Module Integration", marker: "SBM_FPSO", logo: logoSbm },
  { id: "shell", name: "Shell", tier: "Supermajor Operator", sector: "Upstream Exploration", project: "Process Safety & HAZOP Audits", marker: "SHL_OPER", logo: logoShell },
  { id: "cairn", name: "Cairn Oil & Gas", tier: "Private Upstream Producer", sector: "Onshore Hydrocarbon Blocks", project: "Produced Water Treatment FEED", marker: "CRN_IND", logo: logoCairn },

  { id: "iocl", name: "IndianOil", tier: "Energy Sovereign Megamax", sector: "Crude Pipeline Frameworks", project: "Surge Analysis Simulations", marker: "IOC_CORP", logo: logoIocl },
  { id: "eil", name: "Engineers India Limited", tier: "State Technical Consult", sector: "Public Asset Engineering", project: "Cross-Country Pipeline Layout", marker: "EIL_DEL", logo: logoEil },
  { id: "reliance", name: "Reliance Industries", tier: "Conglomerate Megamax", sector: "Hydrocarbon Refining", project: "As-Built Laser Scan Conversions", marker: "RIL_JAM", logo: logoReliance },
  { id: "mrpl", name: "ONGC MRPL", tier: "Refined Product Core", sector: "Coastal Downstream Assets", project: "Heat Exchanger Thermal Check", marker: "MRP_MNG", logo: logoMrpl },
  { id: "gnfc", name: "GNFC", tier: "Chemical State Enterprise", sector: "Industrial Fertilizers", project: "DCS Logic Configuration", marker: "GNF_GUJ", logo: logoGnfc },
  { id: "cpcl", name: "CPCL", tier: "Southern Petroleum Core", sector: "Refining & Lubricants", project: "Tank Farm Interconnections", marker: "CPC_CHN", logo: logoCpcl },
  { id: "toyo", name: "Toyo Engineering", tier: "Global EPC System House", sector: "Petrochemical Complexes", project: "3D Plant Design Overhaul", marker: "TOY_JPN", logo: logoToyo },
  { id: "tata", name: "Tata Projects", tier: "Industrial Execution Alpha", sector: "Power & Infrastructure", project: "PMC Framework Support", marker: "TATA_PRJ", logo: logoTata }
];

const TRACK_1_SET = ALL_32_CLIENTS.slice(0, 16);
const TRACK_2_SET = ALL_32_CLIENTS.slice(16, 32);

// ─── MOTION SCROLL ORCHESTRATION VARIANTS ────────────────────────────────────
const hudContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

const hudItemVariants = {
  hidden: { opacity: 0, y: 25 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 70, damping: 16 } }
};

const trackEntranceVariants = {
  hidden: { opacity: 0, x: 60 },
  show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 45, damping: 18, delay: 0.4 } }
};

export default function ClientOverview() {
  const [activeClient, setActiveClient] = useState(ALL_32_CLIENTS[0]);
  const [isSlowed, setIsSlowed] = useState(false);

  return (
    <section 
      data-nav-theme="light" 
      className="w-full bg-[#FAFAFA] py-24 px-6 lg:px-8 border-t border-slate-200/60 overflow-hidden relative select-none"
      aria-labelledby="client-title"
    >
      {/* ─── CLEAN ISO-DOT MATRIX BACKGROUND LAYER ─── */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 opacity-100 select-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(148, 163, 184, 0.25) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Main Structural Wrapper Hooked into viewport visibility */}
      <motion.div 
        variants={hudContainerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-120px" }}
        className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10"
      >
        
        {/* LEFT COLUMN: Section Copy & Futuristic Context HUD (5 Columns) */}
        <div className="lg:col-span-5 space-y-8">
          <motion.div variants={hudItemVariants}>
            <span className="font-mono text-[10px] font-black text-aarvi-green tracking-[0.25em] uppercase block mb-3">
              ┼ STRATEGIC ALLIANCES
            </span>
            <h2 id="client-title" className="text-3xl md:text-4xl font-sans font-black text-aarvi-navy tracking-tight uppercase leading-none">
              Validated by Industry Authorities
            </h2>
            <p className="text-slate-500 text-xs font-semibold leading-relaxed mt-4 max-w-sm">
              From supermajor operators to global EPC contractors—our data deliverables populate the core models of the world&apos;s most complex assets.
            </p>
          </motion.div>

          {/* DYNAMIC SCREEN HUD */}
          <motion.div 
            variants={hudItemVariants}
            className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs relative overflow-hidden h-60 flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 p-4 font-mono text-[8px] font-bold text-slate-300">
                {/* DYNAMIC SCREEN HUD */}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeClient.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="space-y-4 flex-1 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-aarvi-green animate-pulse" />
                    <span className="font-mono text-[9px] font-black tracking-wider text-slate-400 uppercase">
                      {activeClient.marker} {/* HUD Data Grid */}
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-aarvi-navy uppercase tracking-tight line-clamp-1">
                    {activeClient.name}
                  </h3>
                </div>

                {/* HUD Data Grid */}
                <div className="grid grid-cols-2 gap-y-3 gap-x-4 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <Target className="w-3.5 h-3.5 text-aarvi-green shrink-0" />
                    <div className="font-mono text-[10px]">
                      <span className="text-slate-400 block uppercase font-bold text-[8px]">Scale Classification</span>
                      <span className="text-slate-700 font-black uppercase tracking-tight line-clamp-1">{activeClient.tier}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-aarvi-green shrink-0" />
                    <div className="font-mono text-[10px]">
                      <span className="text-slate-400 block uppercase font-bold text-[8px]">Operational Field</span>
                      <span className="text-slate-700 font-black uppercase tracking-tight line-clamp-1">{activeClient.sector}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex items-center gap-2.5">
                  <Briefcase className="w-3.5 h-3.5 text-aarvi-navy shrink-0" />
                  <div className="font-mono text-[10px] leading-tight">
                    <span className="text-slate-400 block uppercase font-bold text-[7px] mb-0.5">Primary Capability Engaged</span>
                    <span className="text-aarvi-navy font-bold uppercase line-clamp-1">{activeClient.project}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <motion.div variants={hudItemVariants}>
            <Link 
              href="/clients" 
              className="inline-flex items-center gap-2 font-mono text-[10px] font-black tracking-wider text-aarvi-navy hover:text-aarvi-green transition-colors uppercase group"
            >
              Explore Full Client Directory <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: Asymmetric Ticker Tracks (7 Columns) */}
        <motion.div 
          variants={trackEntranceVariants}
          className="lg:col-span-7 flex flex-col gap-4 relative justify-center"
        >
          {/* Subtle overlay shading edge vignette fade */}
          <div className="absolute -left-1 inset-y-0 w-24 bg-linear-to-r from-[#FAFAFA] to-transparent z-30 pointer-events-none" />
          <div className="absolute -right-1 inset-y-0 w-24 bg-linear-to-l from-[#FAFAFA] to-transparent z-30 pointer-events-none" />

          {/* TRACK 01: Moving Left infinitely (First 16 Clients) */}
          <div 
            className="w-full flex overflow-hidden group/track"
            onMouseEnter={() => setIsSlowed(true)}
            onMouseLeave={() => setIsSlowed(false)}
          >
            <div 
              className={`flex gap-4 whitespace-nowrap will-change-transform animate-marquee-left ${
                isSlowed ? '[animation-play-state:paused]' : ''
              }`}
            >
              {[...TRACK_1_SET, ...TRACK_1_SET].map((client, idx) => {
                const isActive = activeClient.id === client.id;
                return (
                  <div
                    key={`${client.id}-t1-${idx}`}
                    onMouseEnter={() => setActiveClient(client)}
                    className={`w-44 h-24 bg-white border rounded-2xl flex flex-col items-center justify-center p-4 cursor-pointer transition-all duration-300 ${
                      isActive 
                        ? "border-aarvi-green shadow-md bg-slate-50 scale-102" 
                        : "border-slate-200/80 hover:border-slate-400"
                    }`}
                  >
                    <div 
                      className="relative w-full h-10 transition-all duration-300"
                      style={{ filter: isActive ? 'none' : 'grayscale(100%) opacity(0.35)' }}
                    >
                      <Image 
                        src={client.logo}
                        alt={`${client.name} Logo`}
                        fill
                        sizes="180px"
                        className="object-contain"
                        priority
                      />
                    </div>
                    
                  </div>
                );
              })}
            </div>
          </div>

          {/* TRACK 02: Moving Right infinitely (Remaining 16 Clients) */}
          <div 
            className="w-full flex overflow-hidden group/track"
            onMouseEnter={() => setIsSlowed(true)}
            onMouseLeave={() => setIsSlowed(false)}
          >
            <div 
              className={`flex gap-4 whitespace-nowrap will-change-transform animate-marquee-right ${
                isSlowed ? '[animation-play-state:paused]' : ''
              }`}
            >
              {[...TRACK_2_SET, ...TRACK_2_SET].map((client, idx) => {
                const isActive = activeClient.id === client.id;
                return (
                  <div
                    key={`${client.id}-t2-${idx}`}
                    onMouseEnter={() => setActiveClient(client)}
                    className={`w-44 h-24 bg-white border rounded-2xl flex flex-col items-center justify-center p-4 cursor-pointer transition-all duration-300 ${
                      isActive 
                        ? "border-aarvi-green shadow-md bg-slate-50 scale-102" 
                        : "border-slate-200/80 hover:border-slate-400"
                    }`}
                  >
                    <div 
                      className="relative w-full h-10 transition-all duration-300"
                      style={{ filter: isActive ? 'none' : 'grayscale(100%) opacity(0.35)' }}
                    >
                      <Image 
                        src={client.logo}
                        alt={`${client.name} Logo`}
                        fill
                        sizes="180px"
                        className="object-contain"
                        priority
                      />
                    </div>
                    
                  </div>
                );
              })}
            </div>
          </div>

        </motion.div>
      </motion.div>
    </section>
  );
}