"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
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
  Map,
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
    title: "Pipeline Engineering",
    desc: "Pipeline routing, hydraulic analysis, stress flexibility, and material integrity.",
    icon: Map, // Make sure to import 'Map' from lucide-react
    href: "/services/pipeline-engineering",
    img: img3, 
  },
  {
    title: "Mechanical Engineering",
    desc: "Static and rotating equipment sizing, vendor reviews, and pressure vessel support.",
    icon: Hammer,
    href: "/services/mechanical-engineering",
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
    title: "As-Built & Asset Documentation",
    desc: "Database reconciliation and asset info validation handover packages.",
    icon: FileCheck,
    href: "/services/as-built-documentation",
    img: img12,
  },
  {
    title: "Digitalization",
    desc: "Engineering 2D/3D data migration, legacy digitization, and data integration.",
    icon: Database,
    href: "/services/digitalization",
    img: img9,
  },
  {
    title: "Project Delivery & Execution Support",
    desc: "Procurement engineering, design coordination, and pre-commissioning support.",
    icon: Briefcase,
    href: "/services/project-delivery-execution-support",
    img: img11,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };


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
            

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-aarvi-navy tracking-tight leading-none mb-6">
              Multi-Discipline <br className="hidden md:block" />
              <span className="relative inline-block mt-2">
                Engineering 
                <span className="absolute bottom-1 left-0 w-full h-2 bg-aarvi-green/20 rounded-sm" />
              </span>
            </h1>
          </div>

          <div className="lg:col-span-5 pb-2">
            <p className="text-text-body text-sm md:text-base leading-relaxed border-l-2 border-aarvi-green/30 pl-5">
              Delivering Concept, Pre-FEED, FEED, Detailed Engineering, Construction Support,
Commissioning and As-Built Services across the complete EPC project lifecycle for Energy,
Process and Industrial Infrastructure projects.
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
  );
}