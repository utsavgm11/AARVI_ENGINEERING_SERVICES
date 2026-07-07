"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Handshake, Settings, Factory, FileText, Globe } from 'lucide-react';

const coreValues = [
  {
    title: "Engineering Beyond Project Completion",
    desc: [
      "From concept studies and FEED through detailed engineering, construction support, commissioning and asset documentation, Aarvi supports the complete project lifecycle.",
      "We help clients transition projects into safe, reliable and high-performing operating facilities."
    ],
    icon: <FileText className="w-5 h-5" />,
    id: "01"
  },
  {
    title: "Integrated Multi-Discipline Delivery",
    desc: [
      "Process, Safety, Mechanical, Piping, Civil, Electrical and Instrumentation engineering are delivered through a single coordinated execution framework.",
      "Integrated multi-discipline teams improve design quality, reduce engineering interfaces, enhance constructability and minimize execution risks."
    ],
    icon: <Settings className="w-5 h-5" />,
    id: "02"
  },
  {
    title: "Project Versatility",
    desc: [
      "Proven execution across onshore plants, offshore facilities and complex brownfield modifications.",
      "Experienced in retrofit projects, shutdowns, tie-ins and operating-facility constraints."
    ],
    icon: <Factory className="w-5 h-5" />,
    id: "03"
  },
  {
    title: "Standards-Driven Engineering",
    desc: [
      "Engineering aligned with API, ASME, ISO, IEC, DNV, ABS and client-specific standards.",
      "Consistent compliance, documentation control and audit-ready deliverables across project phases."
    ],
    icon: <Globe className="w-5 h-5" />,
    id: "04"
  },
  {
    title: "Proven Industry Relationships",
    desc: [
      "Long-standing partnerships with EPC contractors, owner operators, PSUs and industrial organizations.",
      "Built through reliable execution, technical accountability and repeat project engagement."
    ],
    icon: <Handshake className="w-5 h-5" />,
    id: "05"
  }
];

export default function WhyAarvi() {
  const sectionRef = useRef(null);

  // Scroll Progress capture
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["top 85%", "top 30%"]
  });

  const bgColor = useTransform(scrollYProgress, [0, 1], ["#04050A", "#F8FAFC"]);
  const headingColor = useTransform(scrollYProgress, [0, 1], ["#FFFFFF", "#1E2A4A"]);

  const gridVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 60, damping: 15 } 
    }
  };

  return (
    <motion.section 
      ref={sectionRef}
      style={{ backgroundColor: bgColor }}
      className="relative w-full py-16 lg:py-24 px-4 lg:px-8 overflow-hidden z-20"
      aria-labelledby="why-aarvi-title"
    >
      {/* ─── CLEAN ISO-DOT MATRIX BACKGROUND LAYER ─── */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 opacity-100 select-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(148, 163, 184, 0.25) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Block */}
        <header className="mb-10 lg:mb-14 text-center max-w-3xl mx-auto">
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            className="font-mono text-[10px] lg:text-[11px] font-black text-aarvi-green tracking-[0.2em] uppercase bg-aarvi-green/10 px-4 py-2 rounded-full mb-3 inline-block shadow-sm"
          >
            ┼ The Aarvi Advantage
          </motion.span>
          <motion.h2 
            id="why-aarvi-title"
            style={{ color: headingColor }}
            className="text-3xl md:text-4xl lg:text-5xl font-sans font-black tracking-tight uppercase leading-[1.1]"
          >
            Why Aarvi
          </motion.h2>
        </header>

        {/* First Row: 3 Cards */}
        <motion.div 
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
          role="list"
        >
          {coreValues.slice(0, 3).map((item, idx) => (
            <motion.article 
              key={idx}
              variants={itemVariants}
              role="listitem"
              className="relative bg-white rounded-[20px] p-6 lg:p-8 flex flex-col border border-slate-200/70 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group overflow-hidden"
            >
              <div className="relative z-10 flex flex-col h-full">
                
                {/* Icon & Title Group */}
                <div className="mb-4 pb-4 border-b border-slate-100 flex flex-col items-start">
                  <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-[10px] flex items-center justify-center shadow-sm mb-4 group-hover:bg-aarvi-green transition-all duration-300">
                    <div className="text-aarvi-green group-hover:text-white transition-colors duration-300">
                      {item.icon}
                    </div>
                  </div>
                  <h3 className="text-lg md:text-xl font-black text-aarvi-navy uppercase tracking-tight leading-snug group-hover:text-aarvi-green transition-colors duration-300">
                    {item.title}
                  </h3>
                </div>

                {/* Paragraph Content */}
                <div className="grow space-y-3 mt-1">
                  {item.desc.map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-slate-500 font-medium text-[14px] leading-[1.6]"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Bottom Decorative Hover Bar */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-aarvi-green group-hover:w-full transition-all duration-500 ease-out" />
            </motion.article>
          ))}
        </motion.div>

        {/* Second Row: 2 Centered Cards */}
        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-5 lg:mt-6 flex flex-wrap justify-center gap-5 lg:gap-6"
        >
          {coreValues.slice(3).map((item, idx) => (
            <motion.article 
              key={idx}
              variants={itemVariants}
              role="listitem"
              className="relative w-full md:w-[calc(50%-10px)] lg:w-[calc(33.333%-16px)] bg-white rounded-[20px] p-6 lg:p-8 flex flex-col border border-slate-200/70 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group overflow-hidden"
            >
              <div className="relative z-10 flex flex-col h-full">
                
                {/* Icon & Title Group */}
                <div className="mb-4 pb-4 border-b border-slate-100 flex flex-col items-start">
                  <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-[10px] flex items-center justify-center shadow-sm mb-4 group-hover:bg-aarvi-green transition-all duration-300">
                    <div className="text-aarvi-green group-hover:text-white transition-colors duration-300">
                      {item.icon}
                    </div>
                  </div>
                  <h3 className="text-lg md:text-xl font-black text-aarvi-navy uppercase tracking-tight leading-snug group-hover:text-aarvi-green transition-colors duration-300">
                    {item.title}
                  </h3>
                </div>

                {/* Paragraph Content */}
                <div className="grow space-y-3 mt-1">
                  {item.desc.map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-slate-500 font-medium text-[14px] leading-[1.6]"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Bottom Decorative Hover Bar */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-aarvi-green group-hover:w-full transition-all duration-500 ease-out" />
            </motion.article>
          ))}
        </motion.div>

      </div>
    </motion.section>
  );
}