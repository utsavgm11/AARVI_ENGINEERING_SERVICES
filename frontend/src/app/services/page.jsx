"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Activity,
  Layers,
  Hammer,
  Compass,
  Zap,
  Sliders,
  Cpu,
  Briefcase,
  FileCheck,
  Box,
  Database,
  Disc,
  ChevronRight,
} from "lucide-react";

// ─── LOCAL ASSETS ───
import img1 from "../../assets/service-1.png";
import img2 from "../../assets/service-2.png";
import img3 from "../../assets/service-3.png";
import img4 from "../../assets/service-4.png";
import img5 from "../../assets/service-5.png";
import img6 from "../../assets/service-6.png";
import img7 from "../../assets/service-7.png";
import img8 from "../../assets/service-8.png";
import img9 from "../../assets/service-9.png";
import img10 from "../../assets/service-10.png";
import img11 from "../../assets/service-11.png";
import img12 from "../../assets/service-12.png";

const ALL_SERVICES = [
  {
    title: "Process & Safety Engineering",
    desc: "FEED studies, process simulation, PFD/P&ID development, and SIL assessments.",
    icon: Activity,
    href: "/services/process-safety-engineering",
    img: img1,
  },
  {
    title: "Plant Layout & Piping Engineering",
    desc: "3D routing, clash resolution, and isometric extraction.",
    icon: Layers,
    href: "/services/plant-layout-piping",
    img: img2,
  },
  {
    title: "Mechanical Engineering",
    desc: "Static and rotating equipment sizing, vendor reviews, and pressure vessel support.",
    icon: Hammer,
    href: "/services/mechanical-equipment",
    img: img4,
  },
  {
    title: "Civil & Structural Engineering",
    desc: "Site development, structural steel racks, and blast-resistant design.",
    icon: Compass,
    href: "/services/civil-structural",
    img: img5,
  },
  {
    title: "Electrical Engineering",
    desc: "Power system design, short circuit studies, and substation compliance.",
    icon: Zap,
    href: "/services/electrical-engineering",
    img: img7,
  },
  {
    title: "Instrumentation & Control Engineering",
    desc: "Datasheet development, cause and effect matrices, and SIS support.",
    icon: Sliders,
    href: "/services/instrumentation-control",
    img: img8,
  },
  {
    title: "Engineering Simulations",
    desc: "Advanced computational fluid dynamics and structural behaviour checks.",
    icon: Cpu,
    href: "/services/engineering-simulations",
    img: img10,
  },
  {
    title: "Digital Engineering & 3D Modelling",
    desc: "Integrated intelligent 3D plant coordination models and database upgrades.",
    icon: Box,
    href: "/services/digital-engineering-3d",
    img: img9,
  },
  {
    title: "Project Engineering & PMC Support",
    desc: "Project management, scheduling, and multi-discipline interface coordination.",
    icon: Briefcase,
    href: "/services/project-engineering-pmc",
    img: img11,
  },
  {
    title: "As-Built & Asset Documentation",
    desc: "Database reconciliation and asset info validation handover packages.",
    icon: FileCheck,
    href: "/services/as-built-documentation",
    img: img12,
  },
  {
    title: "Engineering Data & Digitalization",
    desc: "Legacy drawing digitization and digital twin data preparation workflows.",
    icon: Database,
    href: "/services/engineering-data-digitalization",
    img: img6,
  },
  {
    title: "Construction, Commissioning & Asset Support",
    desc: "Mechanical completion reviews, pre-commissioning, and startup support.",
    icon: Disc,
    href: "/services/construction-commissioning-support",
    img: img3,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

export default function ServicesDirectoryPage() {
  return (
    <main className="bg-aarvi-bg min-h-screen text-aarvi-navy selection:bg-aarvi-green/30 selection:text-aarvi-navy relative overflow-hidden">
      <div className="fixed inset-0 tech-grid opacity-50 pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-28">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-8"
        >
          <Link href="/" className="hover:text-aarvi-green transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-aarvi-navy">Core Capabilities</span>
        </nav>
      </div>

      <section className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pb-16 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-0.5 bg-aarvi-green block" />
              <span className="text-aarvi-green font-bold text-xs uppercase tracking-widest">
                Our Capabilities
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-aarvi-navy tracking-tight leading-none mb-6">
              Multi-Discipline <br className="hidden md:block" />
              <span className="relative inline-block mt-2">
                Engineering Services
                <span className="absolute bottom-1 left-0 w-full h-2 bg-aarvi-green/20 rounded-sm" />
              </span>
            </h1>
          </div>

          <div className="lg:col-span-5 pb-2">
            <p className="text-text-body text-sm md:text-base leading-relaxed border-l-2 border-aarvi-green/30 pl-5">
              From initial FEED studies to final commissioning, Aarvi Encon delivers
              full-lifecycle engineering solutions. We integrate advanced digital
              tools with decades of multi-sector technical expertise.
            </p>
          </div>
        </div>
      </section>

      <section className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pb-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {ALL_SERVICES.map((svc) => {
            const Icon = svc.icon;

            return (
              <motion.article
                key={svc.title}
                variants={itemVariants}
                className="group relative bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-aarvi-green/40 transition-all duration-300 overflow-hidden flex flex-col h-full"
              >
                <Link
                  href={svc.href}
                  className="relative w-full aspect-video overflow-hidden block"
                >
                  <Image
                    src={svc.img}
                    alt={svc.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority={false}
                  />
                  <div className="absolute inset-0 bg-aarvi-navy/10 group-hover:bg-aarvi-navy/0 transition-colors duration-500" />
                </Link>

                <div className="p-6 lg:p-7 flex flex-col grow">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-aarvi-bg text-aarvi-green flex items-center justify-center shrink-0 border border-slate-100 group-hover:bg-aarvi-green group-hover:text-white transition-colors duration-300">
                      <Icon className="w-4 h-4" strokeWidth={2} />
                    </div>

                    <Link href={svc.href} className="outline-none">
                      <h2 className="text-[17px] font-extrabold text-aarvi-navy leading-snug group-hover:text-aarvi-green transition-colors duration-300 pt-1">
                        {svc.title}
                      </h2>
                    </Link>
                  </div>

                  <p className="text-[13.5px] text-text-body leading-relaxed mb-6 grow">
                    {svc.desc}
                  </p>

                  <div className="mt-auto pt-5 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      href={svc.href}
                      className="text-[11px] font-bold uppercase tracking-widest text-aarvi-navy group-hover:text-aarvi-green transition-colors flex items-center gap-2"
                    >
                      Explore Service
                    </Link>

                    <Link
                      href={svc.href}
                      className="w-8 h-8 rounded-full bg-aarvi-bg flex items-center justify-center group-hover:bg-aarvi-green transition-colors"
                      aria-label={`Explore ${svc.title}`}
                    >
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors group-hover:-rotate-45" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </section>

      <section className="relative z-10 border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 flex flex-col lg:flex-row items-center justify-between gap-10">
          <div>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-aarvi-navy mb-3">
              Need a specialized engineering team?
            </h2>
            <p className="text-text-body text-sm max-w-xl">
              We deploy multidisciplinary task forces tailored to complex industrial
              environments. Contact our business development team for a consultation.
            </p>
          </div>

          <Link
            href="/contact"
            className="shrink-0 bg-aarvi-green hover:bg-[#00704A] text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-aarvi-green/20 transition-all hover:-translate-y-1"
          >
            Request a Consultation
          </Link>
        </div>
      </section>
    </main>
  );
}