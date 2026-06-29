"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Droplet, 
  Wind, 
  Flame, 
  Layers, 
  Zap, 
  Sun, 
  Factory, 
  ArrowRight, 
  ChevronRight 
} from 'lucide-react';

// Industry Data with tailored SEO metadata references, metrics, and icons
const industriesList = [
  {
    id: "oil-and-gas",
    title: "Oil & Gas - Offshore & Onshore Facilities",
    icon: Droplet,
    excerpt: "Comprehensive upstream and downstream engineering frameworks for harsh marine and land configurations.",
    keywords: ["Offshore engineering", "Onshore pipeline systems", "Asset integrity management"],
    metric: "0+ Facilities Engineered"
  },
  {
    id: "lng-gas-processing",
    title: "LNG & Gas Processing",
    icon: Wind,
    excerpt: "Cryogenic infrastructure design, liquefaction plants, and strategic regasification terminal architectures.",
    keywords: ["Cryogenic engineering", "Liquefaction terminal", "Gas monetization"],
    metric: "High-Efficiency Terminals"
  },
  {
    id: "refining-petrochemicals",
    title: "Refining & Petrochemicals",
    icon: Flame,
    excerpt: "Process system optimization, distillation units, and full-spectrum petrochemical plant integrations.",
    keywords: ["Refinery optimization", "Petrochemical synthesis", "Process safety compliance"],
    metric: "Global Compliance Scale"
  },
  {
    id: "chemicals-fertilizers",
    title: "Chemicals & Fertilizers",
    icon: Layers,
    excerpt: "Advanced technical design for multi-product chemical synthesis lines and heavy fertilizer plants.",
    keywords: ["Ammonia production plants", "Industrial synthesis infrastructure", "Agrochemical systems"],
    metric: "Zero-Incident Design Profile"
  },
  {
    id: "power-generation-utilities",
    title: "Power Generation & Utilities",
    icon: Zap,
    excerpt: "Thermal power architectures, complex water treatment setups, and comprehensive industrial utilities distribution grid design.",
    keywords: ["Thermal power systems", "Co-generation loops", "Industrial water utility"],
    metric: "Grid Scale Architectures"
  },
  {
    id: "renewable-energy",
    title: "Renewable Energy",
    icon: Sun,
    excerpt: "Forward-thinking clean energy engineering, covering utility-scale solar arrays and hybrid grid configurations.",
    keywords: ["Decarbonization strategy", "Solar array substation", "Green hydrogen engineering"],
    metric: "100% Sustainable Frameworks"
  },
  {
    id: "industrial-infrastructure",
    title: "Industrial Infrastructure",
    icon: Factory,
    excerpt: "Heavy civil, precise structural wireframing, and mechanical system layout design for advanced corporate production zones.",
    keywords: ["Structural wireframing", "Heavy civil foundations", "Mechanical layout optimization"],
    metric: "Precision Structural Design"
  }
];

// Animation presets for flawless staggering visual loops
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export default function IndustriesPage() {
  return (
    <main className="bg-aarvi-bg min-h-screen text-aarvi-navy selection:bg-aarvi-green/30">
      
      {/* ─── SEO RICH BREADCRUMBS ─── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-28">
        <nav className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-6">
          <Link href="/" className="hover:text-aarvi-green transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-aarvi-navy">Industries We Serve</span>
        </nav>
      </div>

      {/* ─── HERO HEADER SECTION ─── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-16 border-b border-slate-200">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7">
            <span className="text-aarvi-green font-bold text-xs uppercase tracking-widest block mb-3">
              Aarvi Corporate Verticals
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-aarvi-navy tracking-tight leading-none mb-6">
              Engineering Excellence Across <span className="relative inline-block text-aarvi-navy">
                Global Industries
                <span className="absolute bottom-1 left-0 w-full h-1.5 bg-aarvi-green/40 rounded-sm"></span>
              </span>
            </h1>
          </div>
          <div className="lg:col-span-5">
            <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-1">
              Aarvi Engineering Services delivers multi-discipline operational design blueprinting tailored specifically to high-compliance sectors. We align deep multi-physics safety knowledge with highly responsive digital wireframing.
            </p>
          </div>
        </div>
      </section>

      {/* ─── DYNAMIC Grid STAGGERED GRID SECTIONS ─── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {industriesList.map((industry) => {
            const IconComponent = industry.icon;
            return (
              <motion.div
                key={industry.id}
                variants={itemVariants}
                className="group bg-white rounded-2xl p-8 border border-slate-200/60 shadow-xs hover:shadow-xl hover:border-aarvi-green/40 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
              >
                {/* Visual Top Decorative Corner Flare */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-aarvi-green/5 rounded-bl-full translate-x-4 -translate-y-4 group-hover:scale-150 group-hover:bg-aarvi-green/10 transition-transform duration-500" />
                
                <div>
                  {/* Icon Block Container */}
                  <div className="w-12 h-12 bg-aarvi-navy text-aarvi-green rounded-xl flex items-center justify-center mb-6 group-hover:bg-aarvi-green group-hover:text-white transition-colors duration-300 shadow-md shadow-aarvi-navy/10">
                    <IconComponent className="w-5 h-5" />
                  </div>

                  {/* Title & Description Block */}
                  <h3 className="text-xl font-bold text-aarvi-navy tracking-tight leading-snug mb-3 group-hover:text-aarvi-green transition-colors duration-300">
                    {industry.title}
                  </h3>
                  <p className="text-slate-500 text-xs md:text-sm leading-relaxed mb-6">
                    {industry.excerpt}
                  </p>

                  {/* Hidden Tags for SEO Crawlers & Visual Semantics */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {industry.keywords.map((kw, i) => (
                      <span key={i} className="bg-aarvi-bg text-slate-400 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md border border-slate-100">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Component inside the Card wrapper */}
                <div className="border-t border-slate-100 pt-4 flex items-center justify-between mt-auto">
                  <span className="text-[11px] font-bold tracking-wider uppercase text-slate-400">
                    {industry.metric}
                  </span>
                  <Link 
                    href={`/services?sector=${industry.id}`}
                    className="text-aarvi-navy group-hover:text-aarvi-green font-bold text-xs flex items-center gap-1 transition-all duration-300"
                  >
                    View Capabilities 
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* ─── BOTTOM CONVERSION PANEL (SEO OPTIMIZED CATCH ALL) ─── */}
      <section className="bg-aarvi-navy py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-aarvi-green/5 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight">
            Need Custom Technical Support Specifications?
          </h2>
          <p className="text-white/70 max-w-xl mx-auto text-xs md:text-sm leading-relaxed mb-8">
            Our multi-discipline engineering staff maps out secure system layouts built for long-term operations. Let us prepare your enterprise compliance package.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/contact" 
              className="w-full sm:w-auto bg-aarvi-green hover:bg-[#439c8a] text-aarvi-navy font-bold px-8 py-3.5 rounded-xl transition-all shadow-lg text-sm tracking-wide"
            >
              Consult an Engineer
            </Link>
            <Link 
              href="/projects" 
              className="w-full sm:w-auto bg-transparent border border-white/20 hover:border-white/40 hover:bg-white/5 text-white font-bold px-8 py-3.5 rounded-xl transition-all text-sm tracking-wide"
            >
              Examine Our Projects Log
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}