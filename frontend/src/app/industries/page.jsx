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
  Droplet, Wind, Flame, Layers, Zap, Sun, Factory, Boxes,
  ArrowRight, ChevronRight, ArrowUpRight
} from "lucide-react";

// ─── IMAGE / VIDEO ASSET PLACEHOLDERS ─────────────────────────────────────────
import heroBg        from '../../assets/industries-hero-bg.png';         // wide industrial banner, 
import oilGasImg     from '../../assets/industry-oil-gas.png';           // 600x400
import lngImg        from '../../assets/industry-lng.png';               // 600x400
import refiningImg   from '../../assets/industry-refining.png';          // 600x400
import chemicalsImg  from '../../assets/industry-chemicals.png';         // 600x400
import powerImg      from '../../assets/industry-power.png';             // 600x400
import renewableImg  from '../../assets/industry-renewable.png';         // 600x400
import processImg    from '../../assets/industry-chemicals.png';         // 600x400 (reusing or placeholder)
import infraImg      from '../../assets/industry-infrastructure.png';    // 600x400

// ─── INDUSTRY DATA ────────────────────────────────────────────────────────────
const INDUSTRIES = [
  {
    id: "oil-and-gas",
    title: "Oil & Gas – Offshore & Onshore Facilities",
    icon: Droplet,
    excerpt: "Supporting upstream, midstream and downstream facilities across offshore platforms, pipelines, terminals and onshore processing plants.",
    image: oilGasImg
  },
  {
    id: "lng-gas-processing",
    title: "LNG & Gas Processing",
    icon: Wind,
    excerpt: "Delivering LNG terminals, cryogenic systems, gas processing plants and regasification facilities with proven technical capability.",
    image: lngImg
  },
  {
    id: "refining-petrochemicals",
    title: "Refining & Petrochemicals",
    icon: Flame,
    excerpt: "Optimizing refinery and petrochemical assets through safe, reliable and performance-driven engineering.",
    image: refiningImg
  },
  {
    id: "chemicals-fertilizers",
    title: "Chemicals & Fertilizers",
    icon: Layers,
    excerpt: "Serving chemical processing and fertilizer plants with practical design solutions for complex process facilities.",
    image: chemicalsImg
  },
  {
    id: "power-generation-utilities",
    title: "Power Generation & Utilities",
    icon: Zap,
    excerpt: "Enhancing power generation, utility systems and water infrastructure for reliable industrial operations.",
    image: powerImg
  },
  {
    id: "renewable-energy",
    title: "Renewable Energy",
    icon: Sun,
    excerpt: "Advancing the energy transition across biogas, solar, wind, ethanol and green hydrogen developments.",
    image: renewableImg
  },
  {
    id: "process-industries",
    title: "Process Industries",
    icon: Boxes,
    excerpt: "Supporting cement, sugar, pulp & paper, food processing and other continuous process manufacturing facilities.",
    image: processImg
  },
  {
    id: "industrial-infrastructure",
    title: "Industrial Infrastructure",
    icon: Factory,
    excerpt: "Strengthening industrial assets through utilities, warehouses, logistics terminals and supporting infrastructure.",
    image: infraImg
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
              Industry Expertise
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-[3.4rem] font-extrabold text-aarvi-navy tracking-tight leading-[1.05] mb-6">
              Engineering for the World&apos;s Critical Industries
            </h1>

            <p className="text-text-body text-sm md:text-base leading-relaxed max-w-xl mb-8">
              Every industry has its own operating environment, regulations and technical complexities. That&apos;s why we don&apos;t believe in one-size-fits-all engineering. Our multidisciplinary teams combine industry knowledge with engineering expertise to deliver practical solutions tailored to the unique demands of each sector we serve.
            </p>

            {/* Quick stat strip */}
            <div className="flex flex-wrap gap-4 pt-6 border-t border-slate-200">
              {[
                "Greenfield",
                "Brownfield",
                "Offshore",
                "Onshore",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 text-sm font-semibold text-aarvi-navy"
                >
                  <span className="text-aarvi-green text-lg">✓</span>
                  {item}
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
              <Image
                src={heroBg}
                alt="Aarvi Engineering — multi-discipline industrial projects"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 480px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-aarvi-navy/70 via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* INDUSTRIES GRID                                                       */}
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

                {/* Card media / image placeholder */}
                <div className="relative w-full aspect-video bg-aarvi-bg overflow-hidden">
                  <Image
                    src={industry.image}
                    alt={industry.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-aarvi-navy/5 to-aarvi-green/5">
                    <Icon className="w-9 h-9 text-aarvi-navy/15" strokeWidth={1.2} />
                  </div>
                </div>

                {/* Card body */}
                <div className="p-7 lg:p-8 flex flex-col flex-1 relative z-10 bg-white">
                  
                  {/* Icon block */}
                  <div className="w-12 h-12 bg-aarvi-navy/5 border border-aarvi-navy/10 text-aarvi-navy rounded-xl flex items-center justify-center mb-6 group-hover:bg-aarvi-navy group-hover:text-aarvi-green group-hover:border-aarvi-navy group-hover:-translate-y-1 transition-all duration-300 shadow-sm">
                    <Icon className="w-5 h-5" strokeWidth={1.5} />
                  </div>

                  {/* Title */}
                  <h2
                    className="text-[18px] lg:text-[20px] font-extrabold text-aarvi-navy tracking-tight leading-snug mb-3 group-hover:text-aarvi-green transition-colors duration-300"
                    itemProp="name"
                  >
                    {industry.title}
                  </h2>
                  
                  {/* Excerpt */}
                  <p className="text-slate-500 text-[13.5px] leading-relaxed mb-4 grow" itemProp="description">
                    {industry.excerpt}
                  </p>
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
      {/* BOTTOM CONVERSION PANEL                                               */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative bg-aarvi-navy py-20 lg:py-28 text-white overflow-hidden">
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