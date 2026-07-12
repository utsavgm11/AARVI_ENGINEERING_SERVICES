"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Eye, Target } from 'lucide-react';

// ─── IMPORT LOCAL ASSETS ────────────────────────────────────────────────────
// Ensure these files are placed exactly in your src/assets/ folder
import imgPlant from '../../../assets/about-plant.png';
import imgVision from '../../../assets/about-vision.png';
import imgMission from '../../../assets/about-mission.png';

export default function VisionMissionSection() {
  return (
    <section id="vision-mission" className="w-full py-16 lg:py-24 bg-white relative overflow-hidden scroll-mt-20">
      
      {/* ─── SEO METADATA ─── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "mainEntity": {
            "@type": "Organization",
            "name": "Aarvi Encon",
            "vision": "Be a global company providing excellent sustainable innovative solutions admired by all stakeholders.",
            "mission": "To serve our Customer with specialized expertise while maintaining the highest ethics and standards."
          }
        })}}
      />

      {/* Subtle dot pattern background matching the wireframe */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[20px_20px] opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-stretch">
          
         {/* ─── LEFT SIDE: TYPOGRAPHY ─── */}
          <div className="lg:col-span-6 relative h-full flex flex-col justify-center mb-4 lg:mb-0 lg:min-h-125">
            
            {/* Typography positioned at the top */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="space-y-5 lg:space-y-6 relative z-10"
            >
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#008A5E] uppercase"
              >
                Our Purpose
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-5xl lg:text-[54px] font-black text-[#0A1628] tracking-tight leading-[1.1] lg:leading-[1.08]"
              >
                Engineering Relationships.<br />
                Built to Last.
              </motion.h2>
              <motion.div 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="w-16 h-1.5 bg-[#008A5E] rounded-full my-5 lg:my-6 origin-left" 
              />
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-[15px] lg:text-base text-slate-600 leading-relaxed lg:leading-8 max-w-lg"
              >
                Great engineering creates great assets. Great partnerships create lasting
                success. We believe both are essential to every project we undertake.
              </motion.p>
            </motion.div>
          </div>

          {/* ─── RIGHT SIDE: TALL CARDS ─── */}
          {/* Added lg:pb-12 to prevent the translated second card from clipping on desktop */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:pl-8 lg:pb-12">
            
            {/* VISION CARD */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative bg-linear-to-b from-white to-slate-50/80 rounded-4xl h-100 sm:h-112.5 lg:h-125 overflow-hidden shadow-[0_20px_40px_rgb(0,0,0,0.06)] border border-slate-100 flex flex-col group hover:-translate-y-2 transition-transform duration-500"
            >
              <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#008A5E] mb-5 lg:mb-6 relative z-10 group-hover:scale-110 group-hover:bg-[#008A5E] group-hover:text-white transition-all duration-500">
                <Eye className="w-5 h-5 lg:w-6 lg:h-6" strokeWidth={2.5} />
              </div>
              <h3 className="text-2xl lg:text-3xl font-black text-[#0A1628] mb-3 lg:mb-4 relative z-10">Our Vision</h3>
              <p className="text-[13px] lg:text-sm font-semibold text-slate-600 leading-relaxed relative z-10">
                To become the preferred engineering partner for organizations shaping the
                future of energy, process industries and industrial infrastructure.
              </p>
              
              {/* about-vision.png rendering */}
              <div className="absolute bottom-0 left-0 w-full h-[55%] z-0">
                {/* Soft gradient fade over the image top */}
                <div className="absolute inset-0 bg-linear-to-t from-transparent to-white/90 z-10" />
                <Image 
                  src={imgVision} 
                  alt="Aarvi Strategic Vision Graphic" 
                  fill 
                  className="object-contain object-bottom opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
              </div>
            </motion.div>

            {/* MISSION CARD */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="relative bg-linear-to-b from-white to-slate-50/80 rounded-4xl p-8 h-100 sm:h-112.5 lg:h-125 overflow-hidden shadow-[0_20px_40px_rgb(0,0,0,0.06)] border border-slate-100 flex flex-col group lg:translate-y-12 hover:-translate-y-2 transition-transform duration-500"
            >
              <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#008A5E] mb-5 lg:mb-6 relative z-10 group-hover:scale-110 group-hover:bg-[#008A5E] group-hover:text-white transition-all duration-500">
                <Target className="w-5 h-5 lg:w-6 lg:h-6" strokeWidth={2.5} />
              </div>
              <h3 className="text-2xl lg:text-3xl font-black text-[#0A1628] mb-3 lg:mb-4 relative z-10">Our Promise</h3>
              <p className="text-[13px] lg:text-sm font-semibold text-slate-600 leading-relaxed relative z-10">
                To deliver every project with integrity, technical excellence and
                unwavering commitment to our clients' success.
              </p>
              
              {/* about-mission.png rendering */}
              <div className="absolute bottom-0 left-0 w-full h-[55%] z-0">
                {/* Soft gradient fade over the image top */}
                <div className="absolute inset-0 bg-linear-to-t from-transparent to-white/90 z-10" />
                <Image 
                  src={imgMission} 
                  alt="Aarvi Operational Mission Graphic" 
                  fill 
                  className="object-contain object-bottom opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}