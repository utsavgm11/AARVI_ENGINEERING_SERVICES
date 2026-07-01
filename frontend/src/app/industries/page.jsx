// ─── NOTE FOR NEXT.JS 13+ APP ROUTER ──────────────────────────────────────────
// Export metadata from a sibling server file (page.server.js, or layout.js
// if this stays a client component at app/industries/page.jsx, move this
// block to app/industries/metadata.js or a parent server layout):
//
// export const metadata = {
//   title: "Industries We Serve | Aarvi Engineering Services",
//   description: "Multi-discipline engineering solutions for Oil & Gas, LNG, Refining,
//     Petrochemicals, Power Generation, Renewable Energy, and Industrial Infrastructure.",
//   keywords: ["oil and gas engineering","LNG terminal design","refinery engineering",
//     "petrochemical plant design","power generation engineering","renewable energy EPC"],
//   openGraph: {
//     title: "Industries We Serve | Aarvi Engineering Services",
//     description: "Engineering excellence across global industrial sectors.",
//     type: "website"
//   }
// };
// ──────────────────────────────────────────────────────────────────────────────

"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Droplet, Wind, Flame, Layers, Zap, Sun, Factory,
  ArrowRight, ChevronRight, ArrowUpRight
} from "lucide-react";

// ─── IMAGE / VIDEO ASSET PLACEHOLDERS ─────────────────────────────────────────
// Drop your files in /assets and uncomment the imports + <Image>/<video> tags
// marked below with "ADD IMAGE HERE" / "ADD VIDEO HERE".
//
 import heroBg            from '../../assets/industries-hero-bg.png';        // wide industrial banner, 
 import oilGasImg         from '../../assets/industry-oil-gas.png';          // 600x400
 import lngImg            from '../../assets/industry-lng.png';              // 600x400
 import refiningImg       from '../../assets/industry-refining.png';         // 600x400
 import chemicalsImg      from '../../assets/industry-chemicals.png';        // 600x400
 import powerImg          from '../../assets/industry-power.png';            // 600x400
 import renewableImg      from '../../assets/industry-renewable.png';        // 600x400
 import infraImg          from '../../assets/industry-infrastructure.png';   // 600x400

// ─── INDUSTRY DATA ────────────────────────────────────────────────────────────
const INDUSTRIES = [
  {
    id: "oil-and-gas",
    num: "01",
    title: "Oil & Gas — Offshore & Onshore Facilities",
    icon: Droplet,
    excerpt: "Comprehensive upstream and downstream engineering frameworks for harsh marine and land configurations.",
    keywords: ["Offshore Engineering", "Onshore Pipeline Systems", "Asset Integrity Management"],
    metric: "150+ Facilities Engineered",
    image: oilGasImg
  },
  {
    id: "lng-gas-processing",
    num: "02",
    title: "LNG & Gas Processing",
    icon: Wind,
    excerpt: "Cryogenic infrastructure design, liquefaction plants, and strategic regasification terminal architectures.",
    keywords: ["Cryogenic Engineering", "Liquefaction Terminal", "Gas Monetization"],
    metric: "High-Efficiency Terminals",
    image:  lngImg
  },
  {
    id: "refining-petrochemicals",
    num: "03",
    title: "Refining & Petrochemicals",
    icon: Flame,
    excerpt: "Process system optimization, distillation units, and full-spectrum petrochemical plant integrations.",
    keywords: ["Refinery Optimization", "Petrochemical Synthesis", "Process Safety Compliance"],
    metric: "Global Compliance Scale",
    image:  refiningImg
  },
  {
    id: "chemicals-fertilizers",
    num: "04",
    title: "Chemicals & Fertilizers",
    icon: Layers,
    excerpt: "Advanced technical design for multi-product chemical synthesis lines and heavy fertilizer plants.",
    keywords: ["Ammonia Production Plants", "Industrial Synthesis Infrastructure", "Agrochemical Systems"],
    metric: "Zero-Incident Design Profile",
    image:  chemicalsImg
  },
  {
    id: "power-generation-utilities",
    num: "05",
    title: "Power Generation & Utilities",
    icon: Zap,
    excerpt: "Thermal power architectures, complex water treatment setups, and comprehensive industrial utilities distribution grid design.",
    keywords: ["Thermal Power Systems", "Co-generation Loops", "Industrial Water Utility"],
    metric: "Grid Scale Architectures",
    image:  powerImg
  },
  {
    id: "renewable-energy",
    num: "06",
    title: "Renewable Energy",
    icon: Sun,
    excerpt: "Forward-thinking clean energy engineering, covering utility-scale solar arrays and hybrid grid configurations.",
    keywords: ["Decarbonization Strategy", "Solar Array Substation", "Green Hydrogen Engineering"],
    metric: "100% Sustainable Frameworks",
    image:  renewableImg
  },
  {
    id: "industrial-infrastructure",
    num: "07",
    title: "Industrial Infrastructure",
    icon: Factory,
    excerpt: "Heavy civil, precise structural wireframing, and mechanical system layout design for advanced corporate production zones.",
    keywords: ["Structural Wireframing", "Heavy Civil Foundations", "Mechanical Layout Optimization"],
    metric: "Precision Structural Design",
    image:  infraImg
  }
];

// ─── ANIMATION VARIANTS ───────────────────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } }
};

// ─── COMPONENT ────────────────────────────────────────────────────────────────
export default function IndustriesPage() {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <main
      className="bg-aarvi-bg min-h-screen text-aarvi-navy selection:bg-aarvi-green/20 selection:text-aarvi-navy"
      itemScope
      itemType="https://schema.org/CollectionPage"
    >
      <meta itemProp="name" content="Industries We Serve | Aarvi Engineering Services" />

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* BREADCRUMBS                                                           */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-8 lg:pt-10">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            <li>
              <Link href="/" className="hover:text-aarvi-green transition-colors">Home</Link>
            </li>
            <li aria-hidden="true"><ChevronRight className="w-3 h-3" /></li>
            <li className="text-aarvi-navy" aria-current="page">Industries We Serve</li>
          </ol>
        </nav>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* HERO SECTION                                                          */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-10 pb-16 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">

          {/* Left: Heading & copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="lg:col-span-7"
          >
            <span className="inline-flex items-center gap-2 text-aarvi-green font-bold text-[11px] uppercase tracking-[0.2em] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-aarvi-green animate-pulse" />
              Aarvi Corporate Verticals
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-[3.4rem] font-extrabold text-aarvi-navy tracking-tight leading-[1.05] mb-6">
              Engineering Excellence Across{" "}
              <span className="relative inline-block">
                Global Industries
                <span className="absolute bottom-1.5 left-0 w-full h-2 bg-aarvi-green/25 rounded-sm -z-10" />
              </span>
            </h1>

            <p className="text-text-body text-sm md:text-base leading-relaxed max-w-xl mb-8">
              Aarvi Engineering Services delivers multi-discipline operational design
              blueprinting tailored specifically to high-compliance sectors. We align
              deep multi-physics safety knowledge with highly responsive digital
              wireframing across seven core industrial verticals.
            </p>

            {/* Quick stat strip */}
            <div className="flex flex-wrap gap-x-8 gap-y-4 pt-6 border-t border-slate-200">
              {[
                { value: "7", label: "Industry Verticals" },
                { value: "32+", label: "Global EPC Partners" },
                { value: "39+", label: "Years of Excellence" }
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-extrabold text-aarvi-green leading-none">{stat.value}</div>
                  <div className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider mt-1.5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Hero image/banner placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.15, ease: "easeOut" }}
            className="lg:col-span-5"
          >
            <div className="relative w-full aspect-4/3 rounded-3xl overflow-hidden border border-slate-200 bg-linear-to-br from-aarvi-navy to-[#16213d]">
              {
                <Image
                  src={heroBg}
                  alt="Aarvi Engineering — multi-discipline industrial projects"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 480px"
                  className="object-cover"
                />
              }
              <div
                className="absolute inset-0 opacity-[0.07]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
                  backgroundSize: "36px 36px"
                }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-white/40">
                <Factory className="w-10 h-10" strokeWidth={1} />
                
              </div>
              <div className="absolute inset-0 bg-linear-to-t from-aarvi-navy/70 via-transparent to-transparent" />

              {/* Floating badge */}
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-white/70 uppercase tracking-widest">
                  Multi-Discipline EPC
                </span>
                <span className="w-2 h-2 rounded-full bg-aarvi-green animate-pulse" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* INDUSTRIES GRID                                                      */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-20 lg:pb-28">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7"
        >
          {INDUSTRIES.map((industry) => {
            const Icon = industry.icon;
            const isHovered = hoveredId === industry.id;

            return (
              <motion.article
                key={industry.id}
                variants={itemVariants}
                onMouseEnter={() => setHoveredId(industry.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group relative bg-white rounded-2xl border border-slate-200/70 shadow-[0_1px_2px_rgba(15,23,42,0.04)] hover:shadow-[0_20px_40px_rgba(30,42,74,0.08)] hover:border-aarvi-green/40 hover:-translate-y-1.5 transition-all duration-300 flex flex-col overflow-hidden"
                itemScope
                itemType="https://schema.org/Service"
              >
                <meta itemProp="name" content={industry.title} />
                <meta itemProp="description" content={industry.excerpt} />

                {/* ─── Card media / image placeholder ─── */}
                <div className="relative w-full aspect-video bg-aarvi-bg overflow-hidden">
                  {
                    

                    <Image
                      src={industry.image}
                      alt={industry.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  }
                  <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-aarvi-navy/5 to-aarvi-green/5">
                    <Icon className="w-9 h-9 text-aarvi-navy/15" strokeWidth={1.2} />
                  </div>
                  <div className="absolute top-3 left-3 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-md border border-slate-100">
                    <span className="font-mono text-[9px] font-bold text-slate-400 tracking-widest">
                      {industry.num}
                    </span>
                  </div>
                  
                </div>

                {/* ─── Card body ─── */}
                <div className="p-7 lg:p-8 flex flex-col flex-1">
                  {/* Icon block */}
                  <div className="w-12 h-12 bg-aarvi-navy text-aarvi-green rounded-xl flex items-center justify-center mb-5 group-hover:bg-aarvi-green group-hover:text-white transition-colors duration-300 shadow-md shadow-aarvi-navy/10">
                    <Icon className="w-5 h-5" strokeWidth={1.5} />
                  </div>

                  {/* Title & excerpt */}
                  <h2
                    className="text-lg lg:text-xl font-bold text-aarvi-navy tracking-tight leading-snug mb-3 group-hover:text-aarvi-green transition-colors duration-300"
                    itemProp="name"
                  >
                    {industry.title}
                  </h2>
                  <p className="text-text-body text-sm leading-relaxed mb-6" itemProp="description">
                    {industry.excerpt}
                  </p>

                  {/* SEO keyword tags */}
                  <div className="flex flex-wrap gap-2 mb-7">
                    {industry.keywords.map((kw) => (
                      <span
                        key={kw}
                        className="bg-aarvi-bg text-slate-400 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md border border-slate-100"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="border-t border-slate-100 pt-4 flex items-center justify-between mt-auto">
                    <span className="text-[11px] font-bold tracking-wider uppercase text-slate-400">
                      {industry.metric}
                    </span>
                    <Link
                      href={`/services?sector=${industry.id}`}
                      aria-label={`View capabilities for ${industry.title}`}
                      className="text-aarvi-navy group-hover:text-aarvi-green font-bold text-xs flex items-center gap-1 transition-all duration-300"
                    >
                      View Capabilities
                      <ArrowRight className={`w-3.5 h-3.5 transition-transform duration-300 ${isHovered ? "translate-x-1.5" : ""}`} />
                    </Link>
                  </div>
                </div>

                {/* Decorative corner flare */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-aarvi-green/5 rounded-bl-full translate-x-4 -translate-y-4 group-hover:scale-150 group-hover:bg-aarvi-green/10 transition-transform duration-500 pointer-events-none" />
              </motion.article>
            );
          })}

          {/* ─── "All Industries" closing tile ─── */}
          <motion.div
            variants={itemVariants}
            className="relative bg-aarvi-navy rounded-2xl border border-aarvi-navy flex flex-col justify-center items-start p-8 lg:p-9 overflow-hidden group hover:bg-[#16213d] transition-colors duration-300"
          >
            <div
              className="absolute inset-0 opacity-[0.06] pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
                backgroundSize: "28px 28px"
              }}
            />
            <span className="text-aarvi-green text-[11px] font-bold uppercase tracking-widest mb-4 relative z-10">
              Don&apos;t See Your Sector? 
            </span>
            <h3 className="text-xl font-extrabold text-white leading-snug mb-4 relative z-10">
              We Engineer Beyond the Standard Verticals
            </h3>
            <p className="text-white/60 text-sm leading-relaxed mb-7 relative z-10">
              Our multi-discipline teams adapt to specialized and emerging industrial sectors on a project basis.
            </p>
            <Link
              href="/contact"
              className="relative z-10 inline-flex items-center gap-2 text-white font-bold text-sm uppercase tracking-widest group-hover:text-aarvi-green transition-colors"
            >
              Talk to an Engineer
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* BOTTOM CONVERSION PANEL                                              */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative bg-aarvi-navy py-20 lg:py-28 text-white overflow-hidden">
        {/*
          ─── ADD VIDEO HERE (optional) ───
          For a richer closing CTA, you could swap this section's solid
          background for a looping muted background video of plant operations:

          <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-20">
            <source src="/industries-cta-bg.mp4" type="video/mp4" />
          </video>
        */}
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, #00875A 1px, transparent 1px)",
            backgroundSize: "32px 32px"
          }}
        />

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          > 
            <span className="text-aarvi-green text-[11px] font-bold uppercase tracking-[0.2em] mb-4 block">
                Let&apos;s Build Something Resilient
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight">
              Need Custom Technical Support Specifications?
            </h2>
            <p className="text-white/70 max-w-xl mx-auto text-sm leading-relaxed mb-9">
              Our multi-discipline engineering staff maps out secure system layouts built
              for long-term operations. Let us prepare your enterprise compliance package.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto bg-aarvi-green hover:bg-[#00744d] text-white font-bold px-8 py-3.5 rounded-xl transition-all shadow-[0_8px_20px_rgba(0,135,90,0.3)] hover:shadow-[0_12px_28px_rgba(0,135,90,0.4)] text-sm tracking-wide inline-flex items-center justify-center gap-2 group"
              >
                Consult an Engineer
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
              <Link
                href="/projects"
                className="w-full sm:w-auto bg-transparent border border-white/20 hover:border-white/40 hover:bg-white/5 text-white font-bold px-8 py-3.5 rounded-xl transition-all text-sm tracking-wide"
              >
                Examine Our Projects Log
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}