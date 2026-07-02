"use client";
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import LoginModal from './LoginModal';
import { ArrowUpRight, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, Mail, Phone, Building, Globe, MapPin, ExternalLink } from 'lucide-react';

import logoImg from '../assets/aarvi-header-logo.png';

const FOOTER_DIRECTORY = [
  { label: "Home",     href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Clients",  href: "/clients" },
  { label: "Blog",     href: "/blogs" },
  { label: "Careers",  href: "/careers" },
  { label: "Contact",  href: "/contact" },
];

const FOOTER_SERVICES = [
  { label: "Process Engineering",     href: "/services/process-engineering" },
  { label: "Piping & Plant Design",   href: "/services/piping-plant-design" },
  { label: "Pipe Stress Analysis",    href: "/services/pipe-stress-analysis" },
  { label: "Mechanical Equipment",    href: "/services/mechanical-engineering" },
  { label: "Civil & Structural",      href: "/services/civil-structural-engineering" },
  { label: "Offshore Topside",        href: "/services/offshore-structural-engineering" },
  { label: "Electrical Systems",      href: "/services/electrical-engineering" },
  { label: "Instrumentation & Control", href: "/services/instrumentation-engineering" },
];

const OFFICES = {
  chennai: {
    name: "Engineering HQ",
    address: "1st Floor, Smartworks Bharati Vilas, 26B, Jawaharlal Nehru Salai, Guindy Industrial Estate, Ekkatuthangal, Chennai – 600032",
    phone: { display: "+91 44 4340 6666", href: "tel:+914443406666" },
    email: { display: "chennai@aarviencon.com", href: "mailto:chennai@aarviencon.com" },
    // Live embedded coordinate link for Chennai
    map: "https://maps.google.com/maps?q=Smartworks%20Bharati%20Vilas,%20Guindy,%20Chennai&t=&z=15&ie=UTF8&iwloc=&output=embed",
    link: "https://maps.google.com/?q=Smartworks+Bharati+Vilas,+Guindy,+Chennai"
  },
  mumbai: {
    name: "Head Office",
    address: "B1-603, Innova, Marathon Nextgen, Ganpatrao Kadam Marg, Lower Parel (West), Mumbai – 400013",
    phone: { display: "+91 22 4049 9999", href: "tel:+912240499999" },
    email: { display: "info@aarviencon.com", href: "mailto:info@aarviencon.com" },
    // Live embedded coordinate link for Mumbai
    map: "https://maps.google.com/maps?q=Aarvi%20Encon%20Limited,%20Marathon%20Innova,%20Lower%20Parel,%20Mumbai&t=&z=15&ie=UTF8&iwloc=&output=embed",
    link: "https://maps.google.com/?q=Aarvi+Encon+Limited,+Marathon+Nextgen,+Mumbai"
  },
};

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [activeOffice, setActiveOffice] = useState('chennai');
  const office = OFFICES[activeOffice];
  const { token } = useAuth();
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <footer className="w-full bg-[#060B19] border-t border-white/10 pt-16 pb-0 px-6 lg:px-10 text-slate-400 relative overflow-hidden select-none">
      
      {/* Subtle Background Tech Mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] bg-size-[16px_16px] pointer-events-none" />

      {/* ── HIGH-END 12-COLUMN STRUCTURAL GRID ── */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10 relative z-10">

        {/* COL 1 — Brand Profile (Spans 3 Columns) */}
        <div className="lg:col-span-3 flex flex-col gap-5">
          <Link href="/" className="inline-block w-fit transition-opacity hover:opacity-80">
            {/* CSS Filter magically inverts your dark logo into pure white */}
            <Image
              src={logoImg}
              alt="Aarvi Engineering"
              width={130}
              height={40}
              className="h-9 w-auto object-contain"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          </Link>

          <p className="text-slate-400 text-[11.5px] font-medium leading-[1.8] max-w-xs">
            Providing comprehensive multi-discipline design engineering and technical staffing solutions for global EPC, Oil & Gas, and Power infrastructure since 1987.
          </p>

          <div className="flex items-center gap-2 pt-1 bg-white/5 border border-white/10 p-2.5 rounded-lg w-fit shadow-xs">
            <ShieldCheck className="w-4 h-4 text-aarvi-green shrink-0" />
            <span className="text-[10px] font-bold tracking-widest text-white uppercase">
              ISO 9001:2015 Framework
            </span>
          </div>

          {token ? (
  <Link
    href="/admin/dashboard"
    className="inline-flex items-center gap-2 mt-4 px-4 py-2.5 rounded-lg border border-aarvi-green/30 bg-aarvi-green/5 text-[10px] font-bold uppercase tracking-[0.18em] text-aarvi-green hover:bg-aarvi-green hover:text-black transition-all duration-300"
  >
    Console
    <LayoutDashboard className="w-3.5 h-3.5" />
  </Link>
) : (
  <button
    onClick={() => setIsLoginOpen(true)}
    className="inline-flex items-center gap-2 mt-4 px-4 py-2.5 rounded-lg border border-aarvi-green/30 bg-aarvi-green/5 text-[10px] font-bold uppercase tracking-[0.18em] text-aarvi-green hover:bg-aarvi-green hover:text-black transition-all duration-300 cursor-pointer"
  >
    Portal Login
    <ArrowUpRight className="w-3.5 h-3.5" />
  </button>
)}
        </div>

        {/* COL 2 — Navigation Directory (Spans 2 Columns) */}
        <div className="lg:col-span-2">
          <p className="text-[10px] font-black tracking-widest text-aarvi-green uppercase mb-5">
            Directory
          </p>
          <ul className="flex flex-col gap-3">
            {FOOTER_DIRECTORY.map((d) => (
              <li key={d.href}>
                <Link
                  href={d.href}
                  className="text-[11.5px] font-semibold text-slate-400 hover:text-white transition-all duration-150 inline-block hover:translate-x-0.5"
                >
                  {d.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* COL 3 — Opened Services Registry (Spans 4 Columns) */}
        <div className="lg:col-span-4">
          <p className="text-[10px] font-black tracking-widest text-aarvi-green uppercase mb-5">
            Technical Capabilities
          </p>
          {/* Fully open 2-column grid instead of a dropdown */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
            {FOOTER_SERVICES.map((s) => (
              <li key={s.href} className="flex items-center gap-2 group">
                <span className="w-1 h-1 rounded-full bg-white/20 group-hover:bg-aarvi-green transition-colors shrink-0" />
                <Link
                  href={s.href}
                  className="text-[11px] font-semibold text-slate-400 hover:text-white transition-all duration-150 block truncate"
                >
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* COL 4 — Tactical Office Radar & Interactive Map (Spans 3 Columns) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-black tracking-widest text-aarvi-green uppercase">
              Locations
            </p>
            
          </div>

          {/* Node Controller Widget */}
          <div className="grid grid-cols-2 gap-1 bg-white/5 border border-white/10 rounded-lg p-1">
            {['chennai', 'mumbai'].map((city) => (
              <button
                key={city}
                onClick={() => setActiveOffice(city)}
                className={`py-2 rounded-md text-[9px] font-black tracking-wider uppercase transition-all duration-200 ${
                  activeOffice === city
                    ? 'bg-white/10 text-white shadow-xs border border-white/5'
                    : 'text-slate-500 hover:text-white/80'
                }`}
              >
                {city}
              </button>
            ))}
          </div>

          {/* Contact Details */}
          <div className="space-y-2 pt-1 pb-1">
            <div className="text-white font-sans font-bold text-[11px] uppercase tracking-wide flex items-center gap-1.5">
              {activeOffice === 'chennai' ? (
                <Building className="w-3.5 h-3.5 text-aarvi-green" />
              ) : (
                <Globe className="w-3.5 h-3.5 text-aarvi-green" />
              )}
              {office.name}
            </div>
            <p className="text-slate-400 text-[10px] leading-[1.6]">
              {office.address}
            </p>
            <div className="flex flex-col gap-1 pt-1.5 text-[10.5px] font-mono border-t border-white/10">
              <a href={office.phone.href} className="text-slate-400 hover:text-aarvi-green transition-colors duration-150 pt-1 flex items-center gap-1.5">
                <Phone className="w-3 h-3 text-white/40" /> {office.phone.display}
              </a>
              <a href={office.email.href} className="text-slate-400 hover:text-aarvi-green transition-colors duration-150 flex items-center gap-1.5 truncate">
                <Mail className="w-3 h-3 text-white/40" /> {office.email.display}
              </a>
            </div>
          </div>
            
          {/* ── EMBEDDED INTERACTIVE MAP (Now larger for Zoom Controls) ── */}
          <div className="w-full h-40 border border-white/10 rounded-xl overflow-hidden relative group/map bg-slate-900 shadow-md">
            <iframe 
              src={office.map} 
              className="w-full h-full border-0 opacity-70 group-hover/map:opacity-100 transition-all duration-300"
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title={`Interactive Map - ${office.name}`}
            />
            {/* Minimal HUD overlay on map (fades out on hover so it doesn't block interactions) */}
            <div className="absolute top-2 right-2 font-mono text-[7px] font-bold tracking-widest text-white uppercase flex items-center gap-1 bg-[#060B19]/90 px-1.5 py-0.5 rounded border border-white/10 shadow-xs pointer-events-none group-hover/map:opacity-0 transition-opacity">
              <MapPin className="w-2.5 h-2.5 text-aarvi-green" />
              INTERACTIVE_RADAR
            </div>
          </div>

        </div>

      </div>

      {/* ── ULTRAMINIMAL BOTTOM COPYRIGHT ── */}
      <div className="max-w-7xl mx-auto py-5 flex items-center justify-center font-mono text-[9px] font-black text-slate-500 tracking-[0.2em] relative z-10">
        © {currentYear} AARVI ENCON LIMITED. ALL RIGHTS RESERVED.
      </div>

    <LoginModal
    isOpen={isLoginOpen}
    onClose={() => setIsLoginOpen(false)}
/>
    </footer>
  );
}