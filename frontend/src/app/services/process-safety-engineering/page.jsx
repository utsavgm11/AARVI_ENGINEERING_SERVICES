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
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import {
  ArrowUpRight, ShieldCheck, Briefcase, CheckCircle2, ChevronRight
} from "lucide-react";

// ─── ASSET IMPORTS ───────────────────────────────────────────────────────────
import pe101Img from '../../../assets/PE-101.png';

// ─── DATA ────────────────────────────────────────────────────────────────────
const SERVICES_LIST = [
  "Process Design",
  "Process Simulation and Hydraulic Calculations",
  "Heat & Material Balance Development",
  "PFD, P&ID & Process Datasheets",
  "Utility & Hydraulic System Studies",
  "Process Hazard Analysis (HAZID & HAZOP)",
  "SIL Assessment & Functional Safety",
  "Quantitative Risk & Consequence Analysis",
  "Process Safety Management & Operational Readiness"
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
  { name: "Detect3D", category: "Gas Detection" },
  { name: "OLGA", category: "Emissions" },
  { name: "SPPID", category: "P&ID" },
  { name: "AVEVAPID", category: "P&ID" }
];

const FEATURED_PROJECT = null;

// ─── ANIMATION VARIANTS ───────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

// ─── COMPONENT ────────────────────────────────────────────────────────────────
export default function ProcessSafetyEngineeringPage() {
  return (
    <>
      <Head>
        <title>Process & Safety Engineering | Aarvi Engineering Services</title>
        <meta
          name="description"
          content="End-to-end process and safety engineering solutions ensuring operational integrity and regulatory compliance."
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
        {/* 1 · PREMIUM HERO                                                   */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        <section className="relative w-full min-h-[65vh] flex items-center overflow-hidden bg-aarvi-navy">
          <div className="absolute inset-0 w-full h-full">
            <video
              autoPlay muted loop playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-80"
              aria-hidden="true"
            >
              <source src="/process-hero.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-linear-to-r from-aarvi-navy via-aarvi-navy/90 to-aarvi-navy/40" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-aarvi-green/10 via-transparent to-transparent" />
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-10 lg:py-14 w-full">
            <motion.div
              initial="hidden"
              animate="show"
              variants={stagger}
              className="max-w-3xl"
            >
              <div className="border-l-4 border-aarvi-green pl-6 py-2 mb-8">
                <motion.h1
                  variants={fadeUp}
                  className="text-4xl md:text-5xl lg:text-7xl font-black text-white uppercase tracking-tight leading-[1.05] mb-6 shadow-sm"
                >
                  Process & Safety<br />Engineering
                </motion.h1>
                
                <motion.p variants={fadeUp} className="text-base lg:text-xl text-white/80 leading-relaxed font-medium max-w-2xl">
                  End-to-end process and safety engineering solutions that ensure
                  operational integrity, regulatory compliance, and sustainable
                  performance across the asset lifecycle.
                </motion.p>
              </div>

              <motion.div variants={fadeUp} className="mt-8">
                <Link
                  href="#service-details"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-aarvi-green text-white font-black text-sm uppercase tracking-widest rounded-full hover:bg-white hover:text-aarvi-navy shadow-lg transition-all duration-300"
                >
                  Explore Capabilities <ChevronRight className="w-4 h-4" />
                </Link>
              </motion.div>
              
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* 2 · CORE COMPETENCIES CARD                                         */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        <section id="service-details" className="bg-aarvi-bg py-16 lg:py-24 scroll-mt-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl border border-slate-200 shadow-2xl shadow-aarvi-navy/5 overflow-hidden flex flex-col xl:flex-row"
            >
              {/* ─ Left: Premium Content Grid ─ */}
              <div className="w-full xl:w-[65%] p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                
                <div className="mb-10">
                  <span className="text-[10px] font-mono font-black text-aarvi-green uppercase tracking-[0.3em] block mb-3">
                    Core Competencies
                  </span>
                  <h2 className="text-3xl lg:text-4xl font-black text-aarvi-navy uppercase tracking-tight">
                    Integrated Process & Safety Expertise
                  </h2>
                </div>

                {/* 9-Point Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                  {SERVICES_LIST.map((item, index) => (
                    <div 
                      key={index} 
                      className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-aarvi-green/40 hover:bg-white hover:shadow-md transition-all duration-300 group"
                    >
                      <CheckCircle2 className="w-5 h-5 text-aarvi-green shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-bold text-aarvi-navy leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
                
                
              </div>

              {/* ─ Right: Image ─ */}
              <div className="w-full xl:w-[35%] relative min-h-100 xl:min-h-full bg-aarvi-navy">
                <Image 
                  src={pe101Img} 
                  alt="Process and Safety Engineering Schematic"
                  fill
                  sizes="(max-width: 1280px) 100vw, 35vw"
                  className="object-cover opacity-80 mix-blend-screen"
                />
                {/* Gradient overlay to blend image nicely into the edge */}
                <div className="absolute inset-0 bg-linear-to-t xl:bg-linear-to-l from-aarvi-navy/80 to-transparent" />
              </div>

            </motion.div>

          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* 3 · SOFTWARE ECOSYSTEM GRID                                      */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        <section className="bg-white py-16 lg:py-24 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
              className="text-center mb-16"
            >
              <motion.div variants={fadeUp} className="flex items-center justify-center gap-2 mb-4">
                <ShieldCheck className="w-5 h-5 text-aarvi-green" strokeWidth={1.5} />
                <span className="text-[11px] font-mono font-black text-aarvi-green tracking-[0.3em] uppercase">
                  Software Ecosystem
                </span>
              </motion.div>
              <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-black text-aarvi-navy uppercase tracking-tight mb-4">
                Advanced Tools. Proven Results.
              </motion.h2>
              <motion.p variants={fadeUp} className="text-slate-500 text-base font-medium max-w-2xl mx-auto">
                We leverage the world&apos;s most advanced thermodynamic and risk calculation
                environments to ensure absolute mathematical precision in every project.
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 lg:gap-6"
            >
              {SOFTWARE_TOOLS.map((tool) => (
                <motion.div
                  key={tool.name}
                  variants={fadeUp}
                  className="group relative p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-aarvi-green/50 hover:bg-white hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center justify-center text-center cursor-default min-h-35 overflow-hidden"
                >
                  {/* Subtle top accent line on hover */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-aarvi-green transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  
                  <div className="font-mono text-sm font-black text-aarvi-navy uppercase tracking-widest leading-tight mb-2 relative z-10">
                    {tool.name}
                  </div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest relative z-10">
                    {tool.category}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
        
        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* 4 · FEATURED PROJECT — wired for DB later                        */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        <section className="bg-aarvi-bg py-16 lg:py-24 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-[10px] font-mono font-black text-aarvi-green tracking-[0.3em] uppercase block mb-10 text-center lg:text-left"
            >
              Featured Case Study
            </motion.span>
            
            {FEATURED_PROJECT ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-white rounded-3xl p-6 shadow-sm border border-slate-200"
              >
                <div className="lg:col-span-5 relative rounded-2xl overflow-hidden min-h-75 bg-linear-to-br from-aarvi-navy to-[#16213d]" />
                <div className="lg:col-span-7 flex flex-col justify-center p-4 lg:p-8">
                  <h3 className="text-3xl font-black text-aarvi-navy uppercase tracking-tight mb-4">
                    {FEATURED_PROJECT.title}
                  </h3>
                  <p className="text-slate-500 text-base leading-relaxed mb-8">{FEATURED_PROJECT.scope}</p>
                  <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 bg-aarvi-navy text-white px-6 py-3 rounded-full font-black text-xs uppercase tracking-widest hover:bg-aarvi-green transition-colors w-fit shadow-md"
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
                className="rounded-3xl border-2 border-dashed border-slate-200 bg-white p-12 lg:p-20 flex flex-col items-center text-center shadow-sm"
              >
                <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-6 shadow-inner">
                  <Briefcase className="w-7 h-7 text-slate-400" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl md:text-2xl font-black text-aarvi-navy uppercase tracking-tight mb-3">
                  Project Case Studies Coming Soon
                </h3>
                <p className="text-slate-500 text-base max-w-lg mb-8">
                  This section will automatically pull a relevant featured project for
                  Process & Safety Engineering from the active projects database.
                </p>
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 px-8 py-4 border border-slate-200 text-aarvi-navy font-black text-xs uppercase tracking-widest rounded-full hover:border-aarvi-green hover:text-aarvi-green hover:shadow-md transition-all duration-300 bg-slate-50"
                >
                  Browse All Projects <ArrowUpRight className="w-4 h-4" />
                </Link>
              </motion.div>
            )}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* 5 · CTA BANNER                                                     */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        <section className="relative bg-aarvi-navy py-16 lg:py-20 overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage: "radial-gradient(circle, #ffffff 1.5px, transparent 1.5px)",
              backgroundSize: "32px 32px"
            }}
          />
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={stagger}
              className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10 bg-white/5 backdrop-blur-sm border border-white/10 p-10 rounded-3xl"
            >
              <div className="max-w-xl">
                <motion.span variants={fadeUp} className="text-aarvi-green text-[11px] font-bold uppercase tracking-[0.25em] mb-4 block">
                  Let&apos;s Engineer Safety Together
                </motion.span>
                <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight leading-tight mb-4">
                  Need Process & Safety Engineering Expertise?
                </motion.h2>
                <motion.p variants={fadeUp} className="text-white/60 text-base leading-relaxed font-medium">
                  Our experts are ready to support your next critical project with precision and compliance.
                </motion.p>
              </div>
              <motion.div variants={fadeUp} className="shrink-0">
                <Link
                  href="/contact?service=process-safety"
                  className="inline-flex items-center justify-center gap-2 px-8 py-5 bg-aarvi-green text-white font-black text-sm uppercase tracking-widest rounded-full hover:bg-white hover:text-aarvi-navy shadow-[0_8px_20px_rgba(0,135,90,0.3)] hover:shadow-[0_12px_28px_rgba(0,135,90,0.4)] transition-all duration-300 group"
                >
                  Talk to Our Experts
                  <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

      </main>
    </>
  );
}