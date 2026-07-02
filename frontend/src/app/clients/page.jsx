"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShieldCheck } from 'lucide-react';


// ─── CORRECTED RELATIVE DIRECTORY CLIMB PATHS ────────────────────────────────
import logoMcdermott from '../../assets/mcdermott.png';
import logoWood from '../../assets/wood.png';
import logoFluor from '../../assets/fluor.png';
import logoSaipem from '../../assets/saipem.png';
import logoPetrofac from '../../assets/petrofac.png';
import logoTechnip from '../../assets/technip.jpeg';
import logoWorley from '../../assets/worley.jpeg';
import logoKentz from '../../assets/kentz.png';
import logoKbr from '../../assets/kbr.png';
import logoAmns from '../../assets/amns.png';
import logoSlb from '../../assets/slb.png';
import logoWhessoe from '../../assets/whessoe.png';
import logoTecnimont from '../../assets/tecnimont.png';
import logoTasnee from '../../assets/tasnee.png';
import logoLt from '../../assets/lt.png';
import logoTuah from '../../assets/tuah.png';
import logoJacobs from '../../assets/jacobs.png';
import logoSpic from '../../assets/spic.png';
import logoJindal from '../../assets/jindal.png';
import logoHpcl from '../../assets/hpcl.png';
import logoBpcl from '../../assets/bpcl.png';
import logoSbm from '../../assets/sbmoffshor.png';
import logoShell from '../../assets/shell.png';
import logoCairn from '../../assets/cairn.png';
import logoIocl from '../../assets/iocl.png';
import logoEil from '../../assets/eil.jpg';
import logoReliance from '../../assets/reliance.png';
import logoMrpl from '../../assets/mrpl.png';
import logoGnfc from '../../assets/gnfc.png';
import logoCpcl from '../../assets/cpcl.png';
import logoToyo from '../../assets/toyo.png';
import logoTata from '../../assets/tata.png';



// ─── DATA CONFIGURATIONS ─────────────────────────────────────────────────────

const STATS = [
  { value: 120, suffix: '+', label: 'Global Clients' },
  { value: 850, suffix: '+', label: 'Projects Delivered' },
  { value: 37,  suffix: '',  label: 'Years of Engineering' },
  { value: 18,  suffix: '+', label: 'Countries Served' },
];

const FILTERS = [
  { key: 'all',     label: 'All Clients' },
  { key: 'oil-gas', label: 'Oil & Gas' },
  { key: 'epc',      label: 'EPC Contractors' },
  { key: 'power',   label: 'Power & Energy' },
  { key: 'infra',   label: 'Infrastructure' },
];

const CLIENTS = [
  { name: "McDermott", sector: "epc", region: "International", logo: logoMcdermott },
  { name: "Wood", sector: "epc", region: "International", logo: logoWood },
  { name: "Fluor", sector: "epc", region: "International", logo: logoFluor },
  { name: "Saipem", sector: "epc", region: "International", logo: logoSaipem },
  { name: "Petrofac", sector: "epc", region: "International", logo: logoPetrofac },
  { name: "Technip Energies", sector: "epc", region: "International", logo: logoTechnip },
  { name: "Worley", sector: "epc", region: "International", logo: logoWorley },
  { name: "Kentz", sector: "epc", region: "International", logo: logoKentz },
  { name: "KBR", sector: "epc", region: "International", logo: logoKbr },
  { name: "AM/NS India", sector: "infra", region: "India", logo: logoAmns },
  { name: "SLB", sector: "oil-gas", region: "International", logo: logoSlb },
  { name: "Whessoe", sector: "epc", region: "International", logo: logoWhessoe },
  { name: "Tecnimont", sector: "epc", region: "International", logo: logoTecnimont },
  { name: "Tasnee", sector: "oil-gas", region: "International", logo: logoTasnee },
  { name: "L&T Engineering", sector: "infra", region: "India", logo: logoLt },
  { name: "Tuah Engineering", sector: "epc", region: "International", logo: logoTuah },
  { name: "Jacobs", sector: "epc", region: "International", logo: logoJacobs },
  { name: "SPIC India", sector: "infra", region: "India", logo: logoSpic },
  { name: "Jindal Steel & Power", sector: "infra", region: "India", logo: logoJindal },
  { name: "HPCL", sector: "oil-gas", region: "India", logo: logoHpcl },
  { name: "BPCL", sector: "oil-gas", region: "India", logo: logoBpcl },
  { name: "SBM Offshore", sector: "epc", region: "International", logo: logoSbm },
  { name: "Shell", sector: "oil-gas", region: "International", logo: logoShell },
  { name: "Cairn Oil & Gas", sector: "oil-gas", region: "India", logo: logoCairn },
  { name: "IndianOil", sector: "oil-gas", region: "India", logo: logoIocl },
  { name: "Engineers India Limited", sector: "epc", region: "India", logo: logoEil },
  { name: "Reliance Industries", sector: "oil-gas", region: "India", logo: logoReliance },
  { name: "ONGC MRPL", sector: "oil-gas", region: "India", logo: logoMrpl },
  { name: "GNFC", sector: "oil-gas", region: "India", logo: logoGnfc },
  { name: "CPCL", sector: "oil-gas", region: "India", logo: logoCpcl },
  { name: "Toyo Engineering", sector: "epc", region: "International", logo: logoToyo },
  { name: "Tata Projects", sector: "infra", region: "India", logo: logoTata }
];

const REGION_COLORS = {
  International: 'bg-[#dcfce7] text-[#15803d]',
  India:         'bg-[#dbeafe] text-[#1e40af]',
};

// ─── HOOKS ──────────────────────────────────────────────────────────────────

function useCountUp(target, started, duration = 1600) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let frame = 0;
    const totalFrames = Math.round(duration / 16);
    const step = target / totalFrames;
    const timer = setInterval(() => {
      frame++;
      setCount(Math.min(Math.round(step * frame), target));
      if (frame >= totalFrames) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [started, target, duration]);
  return count;
}

// ─── SUB COMPONENTS ─────────────────────────────────────────────────────────

function StatCard({ value, suffix, label, started, index }) {
  const count = useCountUp(value, started, 1400 + index * 100);
  return (
    <div className="bg-white px-5 py-7 text-center">
      <div className="text-4xl font-extrabold text-aarvi-navy tracking-tight leading-none mb-1.5">
        {count}<span className="text-aarvi-green">{suffix}</span>
      </div>
      <div className="text-[10.5px] font-semibold tracking-widest uppercase text-slate-400">
        {label}
      </div>
    </div>
  );
}

function ClientCard({ client, index, visible }) {
  return (
    <div
      className={`bg-white hover:bg-slate-50 border border-slate-100 transition-all duration-500 p-6 flex flex-col items-center justify-center h-36 gap-3 group relative ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{ transitionDelay: visible ? `${index * 35}ms` : '0ms' }}
    >
      {/* Region badge */}
      

      {/* Corporate Logo Box (Grayscale flips to native color layout seamlessly on hover) */}
      <div className="relative w-full h-12 transition-all duration-300 grayscale opacity-35 group-hover:grayscale-0 group-hover:opacity-100 mix-blend-multiply">
        <Image
          src={client.logo}
          alt={`${client.name} Logo`}
          fill
          sizes="180px"
          className="object-contain"
          priority={index < 8}
        />
      </div>

      
    </div>
  );
}

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function ClientsPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [statsStarted, setStatsStarted] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(false);
  const statsRef = useRef(null);
  const gridRef = useRef(null);

  const filtered = CLIENTS.filter(
    c => activeFilter === 'all' || c.sector === activeFilter
  );

  // Intersection observer for stats counter
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsStarted(true); },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Intersection observer for card grid
  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setCardsVisible(true); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  function handleFilter(key) {
    setCardsVisible(false);
    setActiveFilter(key);
    setTimeout(() => setCardsVisible(true), 80);
  }

  return (
    <main className="min-h-screen bg-[#FAFAFA] overflow-hidden select-none">

      {/* ── HIGH-CONTRAST CINEMATIC HERO WITH VIDEO ENVIRONMENT BACKGROUND ── */}
      <section className="relative h-[65vh] min-h-120 w-full bg-[#060A17] flex items-center justify-center px-6 lg:px-10 text-center overflow-hidden">
        
        {/* Dynamic Video Streaming Layer */}
        <video
          autoPlay
          muted
          loop
          playsInline
          src="/chemical_factory.mp4" 
          className="absolute inset-0 w-full h-full object-cover z-0 grayscale contrast-115 opacity-20 scale-102 pointer-events-none"
        />

        {/* Industrial Shadow Overlays for Crisp White Typography Contrast */}
        <div className="absolute inset-0 bg-[#060A17]/40 z-10 mix-blend-multiply" />
        <div className="absolute inset-0 bg-linear-to-t from-[#FAFAFA] via-[#060A17]/50 to-transparent z-10" />

        <div className="relative z-20 max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2.5">
            <span className="w-5 h-[1.5px] bg-aarvi-green" />
            <span className="text-[10px] font-mono font-black tracking-[0.25em] uppercase text-aarvi-green">
              Strategic Alliances Portfolio
            </span>
            <span className="w-5 h-[1.5px] bg-aarvi-green" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-sans font-black text-white leading-[1.05] tracking-tight uppercase max-w-3xl mx-auto drop-shadow-md">
            Engineering the world's <br />
            <span className="text-aarvi-green">most critical assets</span>
          </h1>
          
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto font-medium drop-shadow-sm">
            From offshore platforms in the North Sea to downstream refinery expansions across South Asia — global industry leaders trust Aarvi's multi-discipline technical execution.
          </p>
        </div>
      </section>

      {/* ── STATS COUNTER DISPLAY OVERLAP ── */}
      <section ref={statsRef} className="max-w-5xl mx-auto px-6 lg:px-10 -mt-12 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-slate-200 border border-slate-200 rounded-2xl overflow-hidden shadow-xl shadow-slate-200/50">
          {STATS.map((s, i) => (
            <StatCard key={s.label} {...s} started={statsStarted} index={i} />
          ))}
        </div>
      </section>

      {/* ── MAIN LOGO WORKSPACE GRID ── */}
      <section className="max-w-5xl mx-auto px-6 lg:px-10 py-20 relative z-20">

        {/* Dynamic Client Category Filters */}
        <div className="flex gap-1.5 flex-wrap justify-center mb-12 bg-white border border-slate-200/80 p-2 rounded-xl w-max mx-auto shadow-xs">
          {FILTERS.map(f => (
            <button
              key={f.key}
              onClick={() => handleFilter(f.key)}
              className={`px-4 py-2 rounded-lg text-[11px] font-mono font-bold tracking-wider uppercase transition-all duration-150 cursor-pointer ${
                activeFilter === f.key
                  ? 'bg-aarvi-navy text-white shadow-xs'
                  : 'bg-transparent text-slate-500 hover:text-aarvi-navy hover:bg-slate-50'
              }`}
            >
              ┼ {f.label}
            </button>
          ))}
        </div>

        {/* Matrix Grid Box */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px bg-slate-200/60 border border-slate-200 rounded-2xl overflow-hidden shadow-xs"
        >
          {filtered.map((client, i) => (
            <ClientCard
              key={client.name}
              client={client}
              index={i}
              visible={cardsVisible}
            />
          ))}
        </div>

        {/* Quality Validation Subbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between mt-12 gap-4 border-t border-slate-200/80 pt-6">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-aarvi-green" />
            <span className="text-[11px] font-mono font-bold uppercase tracking-wide text-slate-400">
              ISO 9001:2015 Technical Compliance certified quality validation
            </span>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 bg-aarvi-navy text-white text-xs font-mono font-black uppercase tracking-wider px-5 py-3 rounded-lg hover:bg-aarvi-green transition-colors duration-200 shadow-xs cursor-pointer"
          >
            View All Projects <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.5} />
          </Link>
        </div>
      </section>

      {/* ── CORE CAPABILITIES SUMMARY PANELS ── */}
      <section className="border-t border-slate-200/60 bg-white px-6 lg:px-10 py-16 relative z-20">
        <div className="max-w-5xl mx-auto text-center">
          <p className="font-mono text-[9px] font-black tracking-[0.25em] uppercase text-slate-400 mb-10">
            ┼ Sector Footprint Matrix
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: '⛽', label: 'Oil & Gas', desc: 'Upstream exploration, midstream infrastructure, and downstream refining configurations.' },
              { icon: '🏗️', label: 'EPC Projects', desc: 'Full-lifecycle technical delivery coordination supporting global Tier-1 contractors.' },
              { icon: '⚡', label: 'Power & Energy', desc: 'Thermal plant layouts, complex hydroelectric networks, and renewable integrations.' },
              { icon: '📐', label: 'Infrastructure', desc: 'Cross-country industrial pipeline engineering and heavy metallurgy facility designs.' },
            ].map(s => (
              <div key={s.label} className="bg-slate-50/50 border border-slate-200/70 rounded-xl p-5 text-left flex flex-col justify-between h-40 hover:bg-white hover:shadow-lg transition-all duration-300 group">
                <div className="text-xl">{s.icon}</div>
                <div className="space-y-1">
                  <p className="text-[12.5px] font-sans font-black text-aarvi-navy uppercase tracking-tight group-hover:text-aarvi-green transition-colors">{s.label}</p>
                  <p className="text-[11px] text-slate-400 leading-snug font-medium line-clamp-2">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}