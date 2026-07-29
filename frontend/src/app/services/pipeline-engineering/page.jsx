// ─── NOTE FOR NEXT.JS 13+ APP ROUTER ──────────────────────────────────────────
// "use client" pages can't export `metadata`. Put this in a sibling
// page.server.js / layout.js / metadata.js file:
//
// export const metadata = {
//   title: "Pipeline Engineering | Aarvi Engineering Services",
//   description: "Expert pipeline routing, hydraulic analysis, stress flexibility, and integrity support using CAESAR II, AutoCAD Plant 3D, and Civil 3D.",
//   keywords: ["pipeline engineering","pipeline routing","hydraulic analysis","surge flow","CAESAR II","AutoCAD Civil 3D","PipeNet","corrosion protection"],
//   openGraph: { title: "Pipeline Engineering", type: "website" }
// };
// ──────────────────────────────────────────────────────────────────────────────
"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { ArrowUpRight } from "lucide-react";

// ─── ASSET IMPORTS ───────────────────────────────────────────────────────────
// Replace with your actual pipeline image name if different
import pipelineImg from '../../../assets/pipe1.png';

// ─── DATA ────────────────────────────────────────────────────────────────────
const SERVICES_LIST = [
  "Pipeline Routing & Alignment Engineering",
  "Hydraulic & Surge Flow Analysis",
  "Pipeline Stress & Flexibility Analysis",
  "Wall Thickness & Material Selection",
  "Crossings, Tie-ins & Special Sections",
  "Pipeline Stations & Terminal Facilities",
  "Corrosion Protection & Integrity Support",
  "Construction Engineering & As-Built Documentation"
];

const SOFTWARE_TOOLS = [
  "CAESAR II",
  "AutoCAD Plant 3D",
  "AutoCAD Civil 3D",
  "PipeNet"
];

// ─── ANIMATION VARIANTS ───────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

// ─── COMPONENT ────────────────────────────────────────────────────────────────
export default function PipelineEngineeringPage() {
  return (
    <>
      <Head>
        <title>Pipeline Engineering | Aarvi Engineering Services</title>
        <meta
          name="description"
          content="Delivering robust pipeline routing, hydraulic flow analysis, and material integrity solutions."
        />
        <meta name="keywords" content="pipeline engineering, pipeline routing, hydraulic analysis, surge flow, CAESAR II, AutoCAD Civil 3D, PipeNet, corrosion protection" />
        <meta property="og:title" content="Pipeline Engineering | Aarvi Engineering Services" />
        <meta property="og:description" content="Delivering robust pipeline routing, hydraulic flow analysis, and material integrity solutions." />
        <meta property="og:type" content="website" />
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
              <source src="/pipeline.mp4" type="video/mp4" />
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
                  className="text-4xl md:text-5xl lg:text-7xl font-black text-white uppercase tracking-tight leading-[1.05] mb-6 "
                >
                  Pipeline<br />Engineering
                </motion.h1>
                
                <motion.p variants={fadeUp} className="text-base lg:text-xl text-white/80 leading-relaxed font-medium max-w-2xl">
                  Delivering robust pipeline routing, hydraulic flow analysis, and material integrity solutions for safe and efficient cross-country and intra-plant transport.
                </motion.p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* 2 · CORE COMPETENCIES CARD                                         */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        <section id="service-details" className="bg-aarvi-bg py-6 lg:py-8 scroll-mt-24">
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
                  <h2 className="text-3xl lg:text-4xl font-black text-aarvi-navy uppercase tracking-tight">
                    Core Competencies
                  </h2>
                </div>

                {/* List (CSS Columns for top-to-bottom vertical flow) */}
                <div className="columns-1 md:columns-2 gap-4 mb-12">
                  {SERVICES_LIST.map((item, index) => (
                    <div 
                      key={index} 
                      className="break-inside-avoid mb-4 flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-aarvi-green/40 hover:bg-white hover:shadow-md transition-all duration-300 group"
                    >
                      {/* Solid 8-Point Star Icon */}
                      <svg 
                        className="w-4 h-4 text-aarvi-green shrink-0 mt-1 transition-transform group-hover:scale-125 duration-300" 
                        viewBox="0 0 24 24" 
                        fill="currentColor"
                      >
                        <path d="M12 0L14 7L20.5 3.5L17 10L24 12L17 14L20.5 20.5L14 17L12 24L10 17L3.5 20.5L7 14L0 12L7 10L3.5 3.5L10 7L12 0Z" />
                      </svg>
                      <span className="text-sm font-bold text-aarvi-navy leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
                
              </div>

              {/* ─ Right: Image (Natural Colors) ─ */}
              <div className="w-full xl:w-[35%] relative min-h-87.5 xl:min-h-full bg-slate-100 overflow-hidden">
                <Image 
                  src={pipelineImg} 
                  alt="Pipeline Engineering Schematic"
                  fill
                  sizes="(max-width: 1280px) 100vw, 35vw"
                  className="object-cover"
                />
              </div>

            </motion.div>

          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* 3 · SOFTWARE ECOSYSTEM GRID                                        */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        <section className="bg-slate-50/60 py-6 lg:py-8 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            
            {/* Header: Large Bold Title */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
              className="text-center mb-12 lg:mb-16"
            >
              <motion.h2 
                variants={fadeUp} 
                className="text-3xl md:text-5xl font-black text-aarvi-navy uppercase tracking-tight"
              >
                Software Ecosystem
              </motion.h2>
            </motion.div>

            {/* Perfectly Centered Flex Wrap Container */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
              className="flex flex-wrap items-center justify-center gap-4 lg:gap-5 max-w-6xl mx-auto"
            >
              {SOFTWARE_TOOLS.map((tool) => {
                const name = typeof tool === "string" ? tool : tool.name;
                return (
                  <motion.div
                    key={name}
                    variants={fadeUp}
                    className="group relative w-48 sm:w-56 p-5 rounded-2xl bg-linear-to-br from-white via-white to-emerald-50/40 border border-slate-200/80 border-l-4 border-l-aarvi-green shadow-sm hover:shadow-xl hover:shadow-aarvi-green/10 hover:border-aarvi-green hover:-translate-y-1.5 transition-all duration-300 flex items-center justify-center text-center cursor-default min-h-23.75 overflow-hidden shrink-0"
                  >
                    {/* Ambient green glow backlight on hover */}
                    <div className="absolute -right-6 -bottom-6 w-16 h-16 bg-aarvi-green/15 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />

                    {/* Software Name preserving exact capitalization */}
                    <span className="font-mono text-xs sm:text-sm font-extrabold text-aarvi-navy tracking-wider leading-snug group-hover:text-aarvi-green transition-colors duration-300 relative z-10">
                      {name}
                    </span>
                  </motion.div>
                );
              })}
            </motion.div>

          </div>
        </section>
        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* 4 · CTA BANNER                                                     */}
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
                <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight leading-tight mb-4">
                  Let&#39;s Build Your Next Project Together
                </motion.h2>
                <motion.p variants={fadeUp} className="text-white/60 text-base leading-relaxed font-medium">
                  Whether you&#39;re developing a greenfield facility or upgrading an existing asset, we help transform concepts into safe, reliable and high-performing operating facilities.
                </motion.p>
              </div>
              <motion.div variants={fadeUp} className="shrink-0">
                <Link
                  href="/contact?service=pipeline-engineering"
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