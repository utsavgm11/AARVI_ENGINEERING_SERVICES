"use client";
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu, X, ArrowUpRight, LayoutDashboard } from 'lucide-react';

// ─── AUTHENTICATION & MODAL IMPORTS ──────────────────────────────────────────
import { useAuth } from '@/context/AuthContext';
import LoginModal from './LoginModal';

import logoImg from '../assets/aarvi-header-logo.png';

// ─── NAV DATA ────────────────────────────────────────────────────────────────

const ABOUT_LINKS = [
  { label: "Vision & Mission", href: "/about#vision-mission" },
  { label: "Management Team",  href: "/about#management-team" },
];

export const SERVICE_LINKS = [
  { 
    label: "Process & Safety Engineering", 
    href: "/services/process-safety-engineering", 
    code: "PE-101" 
  },
  { 
    label: "Plant Layout & Piping Engineering", 
    href: "/services/plant-layout-piping", 
    code: "PP-102" 
  },
  { 
    label: "Mechanical Engineering", 
    href: "/services/mechanical-engineering", 
    code: "ME-103" 
  },
  { 
    label: "Civil & Structural Engineering", 
    href: "/services/civil-structural", 
    code: "CS-104" 
  },
  { 
    label: "Electrical Engineering", 
    href: "/services/electrical-engineering", 
    code: "EL-105" 
  },
  { 
    label: "Instrumentation & Control Engineering", 
    href: "/services/instrumentation-control", 
    code: "IC-106" 
  },
  { 
    label: "Engineering Simulations", 
    href: "/services/engineering-simulations", 
    code: "FE-107" 
  },
  { 
    label: "Digital Engineering & 3D Modelling", 
    href: "/services/digital-engineering-3d", 
    code: "DE-108" 
  },
  { 
    label: "Project Engineering & PMC Support", 
    href: "/services/project-engineering-pmc", 
    code: "PM-109" 
  },
  { 
    label: "As-Built & Asset Documentation", 
    href: "/services/as-built-documentation", 
    code: "AB-110" 
  },
  { 
    label: "Engineering Data & Digitalization", 
    href: "/services/engineering-data-digitalization", 
    code: "ED-111" 
  },
  { 
    label: "Construction, Commissioning & Asset Support.", 
    href: "/services/construction-commissioning-support", 
    code: "CC-112" 
  }
];

const NAV_LINKS = [
  { label: "Home",       href: "/" },
  { label: "Projects",   href: "/projects" },
  { label: "Clients",    href: "/clients" },
  { label: "Blog",       href: "/blogs" },
  { label: "Contact",    href: "/contact" },
];

// ─── STATIC LIGHT THEME TOKENS ───────────────────────────────────────────────

function getTokens() {
  return {
    shell:       'bg-white/95 border-slate-200 shadow-sm',
    link:        'text-aarvi-navy',
    linkHov:     'hover:text-aarvi-green',
    linkAct:     'text-aarvi-green',
    accent:      '#00875A',
    panel:       'bg-white/95 border-slate-200 shadow-[0_24px_60px_rgba(0,0,0,0.10)]',
    dlinkText:   'text-slate-600',
    dlinkHov:    'group-hover:text-aarvi-green',
    dlinkBg:     'hover:bg-slate-50',
    cta:         'bg-aarvi-navy text-white hover:bg-transparent hover:text-aarvi-navy border-aarvi-navy cursor-pointer',
    mobile:      'bg-white/95 border-slate-200',
    mobileDiv:   'border-slate-100',
    mobileLink:  'text-aarvi-navy hover:text-aarvi-green',
    mobileSub:   'text-slate-500 hover:text-aarvi-green',
    mobileSubBg: 'bg-slate-50',
  };
}

// ─── DESKTOP DROPDOWN ────────────────────────────────────────────────────────

function ServiceDropdown({ t, onClose }) {
  return (
    <div className={`absolute top-full left-0 w-full border-b backdrop-blur-2xl ${t.panel}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8 grid grid-cols-12 gap-8">
        <div className="col-span-3 flex flex-col gap-4 pr-6" style={{ borderRight: `1px solid ${t.accent}18` }}>
          <p className="font-mono text-[9px] tracking-[0.25em] uppercase" style={{ color: t.accent }}>
            Core Capabilities
          </p>
          <h3 className="font-sans font-black uppercase tracking-tight leading-tight text-xl text-aarvi-navy">
            Engineering<br />Services
          </h3>
          <p className="font-mono text-[11px] leading-relaxed text-aarvi-navy/60">
            12 disciplines. FEED to handover. Oil & Gas, Power, EPC & Infrastructure.
          </p>
        </div>

        <div className="col-span-9 grid grid-cols-3 gap-px" style={{ border: `1px solid ${t.accent}10` }}>
          {SERVICE_LINKS.map((s) => (
            <Link
              key={s.code}
              href={s.href}
              onClick={onClose}
              className={`group flex flex-col gap-1 px-3.5 py-3 transition-colors duration-200 ${t.dlinkBg}`}
              style={{ borderBottom: `1px solid ${t.accent}08` }}
            >
              <span className="font-mono text-[8px] tracking-[0.2em]" style={{ color: t.accent, opacity: 0.6 }}>
                {s.code}
              </span>
              <span className={`font-sans font-bold text-[11px] leading-snug tracking-wide transition-colors ${t.dlinkText} ${t.dlinkHov}`}>
                {s.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function AboutDropdown({ t, onClose }) {
  return (
    <div className={`absolute top-full left-0 w-full border-b backdrop-blur-2xl ${t.panel}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8 grid grid-cols-12 gap-8">
        <div className="col-span-3 flex flex-col gap-4 pr-6" style={{ borderRight: `1px solid ${t.accent}18` }}>
          <p className="font-mono text-[9px] tracking-[0.25em] uppercase" style={{ color: t.accent }}>
            Aarvi Encon
          </p>
          <h3 className="font-sans font-black uppercase tracking-tight leading-tight text-xl text-aarvi-navy">
            Corporate<br />Governance
          </h3>
          <p className="font-mono text-[11px] leading-relaxed text-aarvi-navy/60">
            39+ years of engineering excellence. Trusted by global EPC contractors since 1987.
          </p>
        </div>

        <div className="col-span-9 grid grid-cols-2 gap-1">
          {ABOUT_LINKS.map((a) => (
            <Link
              key={a.href}
              href={a.href}
              onClick={onClose}
              className={`group flex items-start gap-2 px-3.5 py-3 rounded-sm transition-colors duration-150 ${t.dlinkBg}`}
            >
              <span className="mt-0.5 text-[8px]" style={{ color: t.accent, opacity: 0.5 }}>┼</span>
              <span className={`font-sans font-bold text-[11px] leading-snug transition-colors ${t.dlinkText} ${t.dlinkHov}`}>
                {a.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── MAIN NAVBAR ─────────────────────────────────────────────────────────────

export default function Navbar() {
  const pathname = usePathname() || '/'; 
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  
  // Auth & Modal States
  const { token } = useAuth();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  
  // Smart Scroll States
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const hideTimer = useRef(null);
  const t = getTokens(); 

  // Handle Smart Scroll Visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 50) {
        setIsVisible(true);
      } 
      else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
        setMobileOpen(false); 
        setActiveMenu(null);  
      } 
      else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMobileOpen(false); };
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const openMenu = (name) => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    setActiveMenu(name);
  };
  const scheduleClose = () => {
    hideTimer.current = setTimeout(() => setActiveMenu(null), 180);
  };
  const cancelClose = () => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
  };
  const closeMenu = () => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    setActiveMenu(null);
  };

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full backdrop-blur-xl transition-transform duration-300 ease-in-out ${t.shell} ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
        onMouseLeave={scheduleClose}
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between gap-6 lg:gap-8">
          
          <Link
            href="/"
            aria-label="Aarvi Encon — Home"
            className="shrink-0 select-none transition-opacity hover:opacity-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aarvi-green rounded-sm"
            onClick={closeMenu}
          >
            <Image
              src={logoImg}
              alt="Aarvi Encon"
              width={136}
              height={44}
              className="w-auto h-8 object-contain"
              priority
            />
          </Link>

          {/* ── Desktop nav ── */}
          <nav className="hidden lg:flex items-center h-full flex-1 justify-center" aria-label="Main navigation">
            <NavLink href="/" t={t} onClick={closeMenu} isActive={pathname === '/'}>Home</NavLink>

            <DropdownTrigger
              label="About"
              isMenuOpen={activeMenu === 'about'}
              isActivePage={pathname.startsWith('/about')}
              t={t}
              onEnter={() => openMenu('about')}
              onLeave={scheduleClose}
              onClick={closeMenu}
            />

            <NavLink href="/industries" t={t} onClick={closeMenu} isActive={pathname.startsWith('/industries')}>
              Industries
            </NavLink>

            <DropdownTrigger
              label="Services"
              isMenuOpen={activeMenu === 'services'}
              isActivePage={pathname.startsWith('/services')}
              t={t}
              onEnter={() => openMenu('services')}
              onLeave={scheduleClose}
              onClick={closeMenu}
            />

            {NAV_LINKS.slice(1).map((l) => (
              <NavLink key={l.href} href={l.href} t={t} onClick={closeMenu} isActive={pathname.startsWith(l.href)}>
                {l.label}
              </NavLink>
            ))}
          </nav>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-3 shrink-0">
            
            {/* DYNAMIC DESKTOP CTA */}
            {token ? (
              <Link
                href="/admin/dashboard"
                onClick={closeMenu}
                className={`hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-[11px] font-mono font-black tracking-wider uppercase rounded-none border transition-all duration-200 ${t.cta}`}
              >
                Console <LayoutDashboard className="w-3.5 h-3.5" strokeWidth={2.5} />
              </Link>
            ) : (
              <button
                onClick={() => setIsLoginOpen(true)}
                className={`hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-[11px] font-mono font-black tracking-wider uppercase rounded-none border transition-all duration-200 ${t.cta}`}
              >
                Portal Login <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2.5} />
              </button>
            )}

            <button
              onClick={() => setMobileOpen((o) => !o)}
              className={`lg:hidden p-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aarvi-green rounded-sm ${t.link}`}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <X className="w-5 h-5" />
                  </motion.span>
                ) : (
                  <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <Menu className="w-5 h-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* ── Desktop dropdowns ── */}
        <div onMouseEnter={cancelClose} onMouseLeave={scheduleClose}>
          <AnimatePresence>
            {activeMenu === 'services' && (
              <motion.div
                key="services-dd"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="hidden lg:block"
              >
                <ServiceDropdown t={t} onClose={closeMenu} />
              </motion.div>
            )}
            {activeMenu === 'about' && (
              <motion.div
                key="about-dd"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="hidden lg:block"
              >
                <AboutDropdown t={t} onClose={closeMenu} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Mobile menu ── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className={`lg:hidden overflow-hidden border-t backdrop-blur-2xl ${t.mobile}`}
            >
              <nav className="flex flex-col px-5 pt-4 pb-6 gap-0" aria-label="Mobile navigation">
                <MobileSimpleLink href="/" t={t} onClose={() => setMobileOpen(false)} isActive={pathname === '/'}>Home</MobileSimpleLink>

                <MobileAccordion label="About Us" t={t} isActivePage={pathname.startsWith('/about')}>
                  {ABOUT_LINKS.map((a) => (
                    <Link
                      key={a.href}
                      href={a.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-2 px-4 py-2.5 text-[12px] font-mono transition-colors ${
                        pathname === a.href ? t.linkAct : t.mobileSub
                      }`}
                    >
                      <span style={{ opacity: 0.4 }}>┼</span>
                      {a.label}
                    </Link>
                  ))}
                </MobileAccordion>

                <MobileSimpleLink href="/industries" t={t} onClose={() => setMobileOpen(false)} isActive={pathname.startsWith('/industries')}>
                  Industries
                </MobileSimpleLink>

                <MobileAccordion label="Services" t={t} isActivePage={pathname.startsWith('/services')}>
                  {SERVICE_LINKS.map((s) => (
                    <Link
                      key={s.code}
                      href={s.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-start gap-3 px-4 py-2.5 text-[12px] transition-colors ${
                        pathname === s.href ? t.linkAct : t.mobileSub
                      }`}
                    >
                      <span className="font-mono text-[9px] mt-0.5 shrink-0" style={{ color: t.accent, opacity: 0.5 }}>
                        {s.code}
                      </span>
                      <span className="font-sans font-semibold leading-snug">{s.label}</span>
                    </Link>
                  ))}
                </MobileAccordion>

                {NAV_LINKS.slice(1).map((l) => (
                  <MobileSimpleLink key={l.href} href={l.href} t={t} onClose={() => setMobileOpen(false)} isActive={pathname.startsWith(l.href)}>
                    {l.label}
                  </MobileSimpleLink>
                ))}

                {/* DYNAMIC MOBILE CTA */}
                {token ? (
                  <Link
                    href="/admin/dashboard"
                    onClick={() => setMobileOpen(false)}
                    className={`mt-5 w-full flex items-center justify-center gap-1.5 py-3 text-[11px] font-mono font-black tracking-wider uppercase border transition-all duration-200 ${t.cta}`}
                  >
                    Console <LayoutDashboard className="w-3.5 h-3.5" strokeWidth={2.5} />
                  </Link>
                ) : (
                  <button
                    onClick={() => { setMobileOpen(false); setIsLoginOpen(true); }}
                    className={`mt-5 w-full flex items-center justify-center gap-1.5 py-3 text-[11px] font-mono font-black tracking-wider uppercase border transition-all duration-200 ${t.cta}`}
                  >
                    Portal Login <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2.5} />
                  </button>
                )}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      
      {/* ── MOUNT LOGIN MODAL ── */}
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />

      {/* ── INVISIBLE SPACER BLOCK ── */}
      <div className="h-16 w-full bg-white shrink-0" aria-hidden="true" />
    </>
  );
}

// ─── SMALL REUSABLE ATOMS ────────────────────────────────────────────────────

function NavLink({ href, children, t, onClick, isActive }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`relative px-2.5 py-1.5 font-mono text-[13px] font-black tracking-wider uppercase transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-aarvi-green rounded-sm ${
        isActive ? t.linkAct : `${t.link} ${t.linkHov}`
      }`}
    >
      {children}
      {isActive && (
        <span className="absolute bottom-0 left-2.5 right-2.5 h-0.5 bg-aarvi-green rounded-t-sm" />
      )}
    </Link>
  );
}

function DropdownTrigger({ label, isMenuOpen, isActivePage, t, onEnter, onLeave, onClick }) {
  const active = isMenuOpen || isActivePage;
  
  // Map label to its base landing page route
  const targetHref = label.toLowerCase() === 'about' ? '/about' : `/${label.toLowerCase()}`;

  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="relative flex items-center h-full"
    >
      <Link
        href={targetHref}
        onClick={onClick}
        className={`relative flex items-center gap-1 px-2.5 py-1.5 font-mono text-[13px] font-black tracking-wider uppercase transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-aarvi-green rounded-sm ${
          active ? t.linkAct : `${t.link} ${t.linkHov}`
        }`}
        aria-haspopup="true"
        aria-expanded={isMenuOpen}
      >
        {label}
        <ChevronDown
          className="w-3 h-3 transition-transform duration-200"
          style={{ transform: isMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)', opacity: 0.5 }}
        />
        {isActivePage && (
          <span className="absolute bottom-0 left-2.5 right-2.5 h-0.5 bg-aarvi-green rounded-t-sm" />
        )}
      </Link>
    </div>
  );
}

function MobileSimpleLink({ href, children, t, onClose, isActive }) {
  return (
    <Link
      href={href}
      onClick={onClose}
      className={`py-3.5 font-mono text-[12px] font-black tracking-[0.15em] uppercase transition-colors border-b ${t.mobileDiv} ${
        isActive ? t.linkAct : t.mobileLink
      }`}
    >
      {children}
    </Link>
  );
}

function MobileAccordion({ label, children, t, isActivePage }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border-b ${t.mobileDiv}`}>
      <button
        onClick={() => setOpen((o) => !o)}
        className={`w-full flex items-center justify-between py-3.5 font-mono text-[11px] font-black tracking-[0.18em] uppercase transition-colors ${
          isActivePage ? t.linkAct : t.mobileLink
        }`}
      >
        {label}
        <ChevronDown
          className="w-4 h-4 transition-transform duration-200"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', opacity: 0.5 }}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className={`mx-0 mb-3 rounded-sm ${t.mobileSubBg}`}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}