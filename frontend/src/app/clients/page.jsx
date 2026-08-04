"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShieldCheck } from 'lucide-react';

// ─── LOGO IMPORTS ────────────────────────────────────────────────────────────
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
const CLIENTS = [
  { name: "McDermott", logo: logoMcdermott },
  { name: "Wood", logo: logoWood },
  { name: "Fluor", logo: logoFluor },
  { name: "Saipem", logo: logoSaipem },
  { name: "Petrofac", logo: logoPetrofac },
  { name: "Technip Energies", logo: logoTechnip },
  { name: "Worley", logo: logoWorley },
  { name: "Kentz", logo: logoKentz },
  { name: "KBR", logo: logoKbr },
  { name: "AM/NS India", logo: logoAmns },
  { name: "SLB", logo: logoSlb },
  { name: "Whessoe", logo: logoWhessoe },
  { name: "Tecnimont", logo: logoTecnimont },
  { name: "Tasnee", logo: logoTasnee },
  { name: "L&T Engineering", logo: logoLt },
  { name: "Tuah Engineering", logo: logoTuah },
  { name: "Jacobs", logo: logoJacobs },
  { name: "SPIC India", logo: logoSpic },
  { name: "Jindal Steel & Power", logo: logoJindal },
  { name: "HPCL", logo: logoHpcl },
  { name: "BPCL", logo: logoBpcl },
  { name: "SBM Offshore", logo: logoSbm },
  { name: "Shell", logo: logoShell },
  { name: "Cairn Oil & Gas", logo: logoCairn },
  { name: "IndianOil", logo: logoIocl },
  { name: "Engineers India Limited", logo: logoEil },
  { name: "Reliance Industries", logo: logoReliance },
  { name: "ONGC MRPL", logo: logoMrpl },
  { name: "GNFC", logo: logoGnfc },
  { name: "CPCL", logo: logoCpcl },
  { name: "Toyo Engineering", logo: logoToyo },
  { name: "Tata Projects", logo: logoTata }
];

const STATIC_CATEGORIES = [
  "Owner Operators",
  "EPC Contractors",
  "PMC Consultants",
  "Licensors",
  "OEMs"
];

// ─── SUB COMPONENTS ─────────────────────────────────────────────────────────
// Cards are styled like entries on a technical drawing register: a mono
// index tag, corner registration marks, and a desaturate → full-color
// reveal on hover (a "verified" stamp echoing the ISO badge below).
function ClientCard({ client, index, visible }) {
  

  return (
    <div
      className={`group relative flex h-32 w-full flex-col items-center justify-center bg-white p-4 transition-all duration-500 ease-out hover:z-10 hover:bg-slate-50 hover:shadow-[0_8px_24px_-8px_rgba(15,23,42,0.12)] sm:h-36 sm:p-6 lg:h-40 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      } motion-reduce:transition-none`}
      style={{ transitionDelay: visible ? `${Math.min(index * 20, 400)}ms` : '0ms' }}
    >
      

      {/* Corner registration marks */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-2.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:inset-3"
      >
        <span className="absolute right-0 top-0 h-2 w-2 border-r border-t border-aarvi-green" />
        <span className="absolute bottom-0 left-0 h-2 w-2 border-b border-l border-aarvi-green" />
      </span>

      {/* Logo */}
      <div className="relative h-full w-full transition-transform duration-500 ease-out motion-reduce:transform-none group-hover:scale-[1.06]">
        <Image
          src={client.logo}
          alt={`${client.name} Logo`}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
          className="object-contain  transition-all duration-500 ease-out  "
          priority={index < 8}
        />
      </div>

      
    </div>
  );
}

// ─── PAGE ────────────────────────────────────────────────────────────────────
export default function ClientsPage() {
  const [cardsVisible, setCardsVisible] = useState(false);
  const gridRef = useRef(null);

  // Intersection observer for card grid fade-in animation
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

  return (
    <main className="min-h-screen select-none overflow-hidden bg-[#FAFAFA]">

      {/* ── HIGH-CONTRAST CINEMATIC HERO ── */}
      <section className="relative flex h-[55vh] min-h-112.5 w-full items-center justify-center overflow-hidden bg-[#060A17] px-6 text-center lg:px-10">

        {/* Dynamic Video Streaming Layer */}
        <video
          autoPlay
          muted
          loop
          playsInline
          src="/chemical_factory.mp4"
          className="pointer-events-none absolute inset-0 z-0 h-full w-full scale-105 object-cover opacity-20 grayscale contrast-125"
        />

        {/* Faint drafting-grid texture */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
            backgroundSize: '44px 44px',
          }}
        />

        {/* Industrial Shadow Overlays for Crisp White Typography Contrast */}
        <div className="absolute inset-0 z-10 bg-[#060A17]/50 mix-blend-multiply" />

        {/* Smoother, simpler gradient since the categories are moved down */}
        <div className="absolute inset-0 z-10 bg-linear-to-t from-[#FAFAFA] via-[#060A17]/40 to-transparent" />

        <div className="relative z-20 mx-auto mt-10 max-w-5xl space-y-8 px-4 py-4">

          {/* Corner registration marks */}
          <span aria-hidden="true" className="pointer-events-none absolute -left-1 -top-1 hidden h-5 w-5 border-l border-t border-aarvi-green/50 sm:block" />
          <span aria-hidden="true" className="pointer-events-none absolute -right-1 -top-1 hidden h-5 w-5 border-r border-t border-aarvi-green/50 sm:block" />
          <span aria-hidden="true" className="pointer-events-none absolute -bottom-1 -left-1 hidden h-5 w-5 border-b border-l border-aarvi-green/50 sm:block" />
          <span aria-hidden="true" className="pointer-events-none absolute -bottom-1 -right-1 hidden h-5 w-5 border-b border-r border-aarvi-green/50 sm:block" />

          <div className="inline-flex items-center gap-3">
            <span className="h-[1.5px] w-6 bg-aarvi-green" />
            <span className="font-mono text-[10px] font-black uppercase tracking-[0.25em] text-aarvi-green drop-shadow-md shadow-black/50 sm:text-xs">
              Strategic Alliances Portfolio
            </span>
            <span className="h-[1.5px] w-6 bg-aarvi-green" />
          </div>

          <h1 className="mx-auto max-w-4xl font-sans text-4xl font-black uppercase leading-[1.05] tracking-tight text-white drop-shadow-xl md:text-5xl lg:text-7xl">
            Engineering the world&apos;s <br />
            <span className="text-aarvi-green">most critical assets</span>
          </h1>
        </div>
      </section>

      {/* ── MAIN LOGO WORKSPACE GRID ── */}
      <section className="relative z-20 mx-auto max-w-6xl px-6 pb-24 pt-12 lg:px-10">

        {/* ── CATEGORIES (Moved from Hero to here for perfect readability) ── */}
        <div className="mx-auto mb-10 flex max-w-4xl flex-wrap items-center justify-center gap-3 sm:gap-4 lg:gap-6">
          {STATIC_CATEGORIES.map((category, idx, arr) => (
            <React.Fragment key={category}>
              <span className="font-sans text-xs font-bold uppercase tracking-widest text-slate-600 sm:text-sm">
                {category}
              </span>
              {idx < arr.length - 1 && (
                <span className="select-none text-lg text-aarvi-green opacity-60">|</span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Matrix Grid Box */}
        <div
          ref={gridRef}
          className="flex flex-wrap justify-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-200/60 shadow-xl shadow-slate-200/50"
        >
          {CLIENTS.map((client, i) => (
            <div
              key={client.name}
              className="flex w-1/2 justify-center border-b border-r border-slate-200 sm:w-1/3 md:w-1/4 lg:w-1/5"
            >
              <ClientCard
                client={client}
                index={i}
                visible={cardsVisible}
              />
            </div>
          ))}
        </div>

        {/* Quality Validation Subbar */}
        
      </section>

    </main>
  );
}