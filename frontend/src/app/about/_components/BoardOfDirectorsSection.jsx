"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ArrowUpRight, X, Globe, Mail, GraduationCap, 
  Briefcase, CheckCircle2, Award
} from 'lucide-react';

// ─── IMPORT HOOK FOR LOCAL IMAGE ASSETS ─────────────────────────────────────
// Place your portrait files inside src/assets/ with these exact downcase names:
import imgVirendra from '../../../assets/virendra.png';
import imgJaydev from '../../../assets/jaydev.png';
import imgManoj from '../../../assets/manoj.png';
import imgSreenivasu from '../../../assets/sreenivasu.png';

const LEADERSHIP_ROSTER = [
  {
    id: "virendra-sanghavi",
    name: "Virendra D. Sanghavi",
    role: "Managing Director",
    shortDesc: "Visionary leader with over 48 years of excellence in process plant design and engineering.",
    background: "Chemical Engineering Graduate from UDCT",
    experience: "48+ Years of Industry Excellence",
    bio: [
      "Virendra D. Sanghavi brings over 48 years of deep operational experience in the design, development, construction, and operation of process plants in India and abroad.",
      "He maintains an exceptional track record in the industry, having worked with high-tier Engineering, Lubricant, Petrochemical, and Pharmaceutical companies, including Merck Sharp & Dohme India Ltd., Lubrizol India Ltd., Aker Solution (Erstwhile Davy Power Gas), and Bhansali Engineering Polymers Ltd.",
      "Mr. Sanghavi has also held key positions of responsibility as a visiting lecturer at the Institute of Chemical Technology, Matunga, teaching piping engineering to third-year students. He is the Past President and sits on the Board of Governors of the UDCT Alumni Association.",
      "He is the recipient of numerous awards for his pioneering engineering consultancy work, including the NOCIL Award for Excellence in Consultancy Services, the Star SME Award (2010), and the CFBP 'Jamnalal Bajaj Award' for 'Fair Business Practices' (2014) presented by the Late Dr. APJ Abdul Kalam."
    ],
    accreditedLogo: "UDCT / ICT Alumnus",
    image: imgVirendra
  },
  {
    id: "jaydev-sanghavi",
    name: "Jaydev V. Sanghavi",
    role: "Executive Director",
    shortDesc: "Strategic commander driving international expansion and complex project delivery.",
    background: "Chemical Engineering Graduate from Mumbai University",
    experience: "34+ Years of Operational Command",
    bio: [
      "Jaydev V. Sanghavi joined Aarvi Encon Ltd. in 1992 and currently serves as the Executive Director.",
      "With over 34 years of comprehensive experience spanning operations and finance, Jaydev has played a crucial role in developing strategic business tie-ups and successfully delivering several large-scale, complex projects.",
      "Under his leadership, Aarvi Encon has become the largest Technical Staffing company in India, establishing international offices at major locations including India, Qatar, UAE, and Saudi Arabia."
    ],
    accreditedLogo: "Mumbai University",
    image: imgJaydev
  },
  {
    id: "r-manoj",
    name: "R. Manoj",
    role: "Senior Vice President",
    shortDesc: "Global operations head driving revenue and strategic international tie-ups.",
    background: "Graduate from Andhra University",
    experience: "24+ Years of Technical Management",
    bio: [
      "R. Manoj joined Aarvi Encon Ltd. in 2004 and currently serves as the Senior Vice President.",
      "With over 24 years of extensive experience in Engineering, Oil & Gas, and EPC industries, he has been instrumental in driving business growth across both Indian and international markets.",
      "He has managed operations generating revenues exceeding INR 1,700 million and played a key role in developing strategic business tie-ups.",
      "He leads Aarvi Encon's international business operations, managing regional offices across the UAE, Oman, Qatar, Saudi Arabia, Indonesia, and Malaysia."
    ],
    accreditedLogo: "Andhra University",
    image: imgManoj
  },
  {
    id: "sreenivasu-motupalli",
    name: "Sreenivasu Motupalli",
    role: "Vice President - Engineering",
    shortDesc: "Engineering veteran overseeing EPC execution and corporate systems management.",
    background: "Mechanical Engineering Graduate from NIT, Rourkela",
    experience: "45+ Years of Vast & Versatile EPC Experience",
    bio: [
      "M Sreenivasu currently serves as the Vice President-Engineering at Aarvi Encon. He brings over 45 years of versatile experience through diverse fields in execution of Pre-FEED, FEED, and Detailed Engineering in an EPC environment.",
      "His core responsibilities span multi-discipline Engineering Management, PMC Engineering Management, and scrutinizing EPC Contractor's execution models.",
      "He further handles HOD functions for Plant & Piping Design, Corporate Systems Management (including Smart Plant Suite and AVEVA platforms), and serves as the Ethics & Compliance Representative."
    ],
    accreditedLogo: "NIT Rourkela",
    image: imgSreenivasu
  }
];

export default function BoardOfDirectorsSection() {
  const [selectedLeader, setSelectedLeader] = useState(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedLeader) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [selectedLeader]);

  return (
    // Added id="management-team" to ensure Navbar scrolling targets this section
    <section id="management-team" className="relative w-full bg-[#FAFAFA] font-sans selection:bg-[#1db87a] selection:text-white scroll-mt-16">
      
      {/* ─── SEO METADATA ─── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LeadershipGroup",
          "name": "Aarvi Board of Directors",
          "parentOrganization": {
            "@type": "Organization",
            "name": "Aarvi Encon Limited",
            "url": "https://www.aarviencon.com"
          },
          "member": LEADERSHIP_ROSTER.map(l => ({
            "@type": "OrganizationRole",
            "member": {
              "@type": "Person",
              "name": l.name,
              "jobTitle": l.role
            },
            "roleName": l.role
          }))
        })}}
      />

      {/* ─── TWO-TONE BACKGROUND ─── */}
      <div className="absolute inset-0 z-0 flex flex-col pointer-events-none">
        <div className="flex-1 bg-[#FAFAFA]"></div>
        <div className="h-[45%] bg-[#0a1628]"></div>
      </div>

      {/* ─── CONTENT WRAPPER ─── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 py-24">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-[#1db87a] font-mono font-bold text-[10px] tracking-[0.25em] uppercase">
            Corporate Governance
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-[#0a1628] tracking-tight">
            Team Behind Aarvi's<br />Innovators and Experts
          </h2>
          <p className="text-slate-500 text-sm md:text-base font-medium leading-relaxed max-w-xl mx-auto">
            Meet the dedicated professionals driving our global success and delivering exceptional engineering solutions across the asset lifecycle.
          </p>
        </div>

        {/* ─── GLASSMORPHISM CARD GRID ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {LEADERSHIP_ROSTER.map((leader) => (
            <motion.div
              layoutId={`card-container-${leader.id}`}
              key={leader.id}
              onClick={() => setSelectedLeader(leader)}
              className="relative h-100 w-full rounded-4xl overflow-hidden cursor-pointer group shadow-xl shadow-[#0a1628]/10"
            >
              {/* Leader Image */}
              <motion.div layoutId={`card-image-${leader.id}`} className="absolute inset-0 bg-[#0a1628]">
                {leader.image ? (
                  <Image 
                    src={leader.image} 
                    alt={leader.name} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-105" 
                    placeholder="blur" 
                  />
                ) : (
                  <div className="w-full h-full bg-slate-200" />
                )}
                {/* Gradient overlay to ensure text readability */}
                <div className="absolute inset-0 bg-linear-to-t from-[#0a1628] via-[#0a1628]/30 to-transparent opacity-90" />
              </motion.div>

              {/* Glassmorphism Bottom Panel */}
              <motion.div 
                layoutId={`card-content-${leader.id}`}
                className="absolute bottom-4 left-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 text-white transform transition-transform duration-300 group-hover:-translate-y-1"
              >
               

                <h3 className="text-lg font-black tracking-tight">{leader.name}</h3>
                <p className="text-[#1db87a] text-[10px] font-bold mb-2 font-mono uppercase tracking-wider">{leader.role}</p>
                <p className="text-slate-300 text-[11px] leading-relaxed line-clamp-2 font-medium pr-2">
                  {leader.shortDesc}
                </p>

                
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Action Button */}
        <div className="flex justify-center mt-16">
          <Link href="/contact" className="bg-[#1db87a] text-[#0a1628] text-xs font-black uppercase tracking-widest px-8 py-4 rounded-full hover:bg-white hover:text-[#0a1628] transition-colors duration-300 shadow-lg shadow-[#1db87a]/20 flex items-center gap-2">
            Contact Us <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* ─── EXPANDED MODAL VIEW (SPLIT SCREEN) ─── */}
      <AnimatePresence>
        {selectedLeader && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6 py-6 md:py-12">
            
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLeader(null)}
              className="absolute inset-0 bg-[#0a1628]/80 backdrop-blur-sm cursor-pointer"
            />

            {/* Expanded Card */}
            <motion.div
              layoutId={`card-container-${selectedLeader.id}`}
              className="relative w-full max-w-5xl bg-white rounded-4xl overflow-hidden shadow-2xl flex flex-col md:flex-row z-10 cursor-default"
              style={{ maxHeight: '90vh' }}
              onClick={(e) => e.stopPropagation()} // Prevent clicks inside from closing
            >
              
              {/* Close Button */}
              <button 
                onClick={() => setSelectedLeader(null)}
                className="absolute top-4 right-4 z-50 w-10 h-10 bg-white/80 backdrop-blur border border-slate-200 rounded-full flex items-center justify-center text-slate-500 hover:bg-[#0a1628] hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Left Side: Image */}
              <motion.div layoutId={`card-image-${selectedLeader.id}`} className="w-full md:w-[45%] h-64 md:h-auto relative shrink-0 bg-[#0a1628]">
                {selectedLeader.image ? (
                  <Image 
                    src={selectedLeader.image} 
                    alt={selectedLeader.name} 
                    fill 
                    className="object-cover" 
                    priority
                  />
                ) : (
                  <div className="w-full h-full bg-slate-200" />
                )}
                {/* Gradient fade to white for seamless desktop transition */}
                <div className="hidden md:block absolute inset-y-0 right-0 w-24 bg-linear-to-l from-white to-transparent" />
              </motion.div>

              {/* Right Side: Detailed Biography (Scrollable) */}
              <motion.div 
                layoutId={`card-content-${selectedLeader.id}`}
                className="w-full md:w-[55%] p-8 md:p-12 overflow-y-auto bg-white"
              >
                <div className="space-y-6">
                  {/* Header */}
                  <div>
                    <span className="text-[#1db87a] font-mono font-bold text-[10px] tracking-widest uppercase block mb-1">
                      {selectedLeader.role}
                    </span>
                    <h3 className="text-3xl md:text-4xl font-black text-[#0a1628] tracking-tight">
                      {selectedLeader.name}
                    </h3>
                  </div>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-6 border-y border-slate-100">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0">
                        <GraduationCap className="w-4 h-4 text-[#1db87a]" />
                      </div>
                      <div>
                        <span className="text-[9px] font-bold text-slate-400 uppercase font-mono block">Education</span>
                        <span className="text-xs font-bold text-[#0a1628] leading-tight">{selectedLeader.background}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0">
                        <Briefcase className="w-4 h-4 text-[#1db87a]" />
                      </div>
                      <div>
                        <span className="text-[9px] font-bold text-slate-400 uppercase font-mono block">Tenure</span>
                        <span className="text-xs font-bold text-[#0a1628] leading-tight">{selectedLeader.experience}</span>
                      </div>
                    </div>
                  </div>

                  {/* Biography Paragraphs */}
                  <div className="space-y-4 pt-2">
                    <h4 className="text-xs font-black uppercase tracking-widest text-[#0a1628] flex items-center gap-2">
                      <Award className="w-4 h-4 text-[#1db87a]" /> Executive Biography
                    </h4>
                    <div className="space-y-4 text-slate-500 text-sm leading-relaxed font-medium">
                      {selectedLeader.bio.map((paragraph, idx) => (
                        <p key={idx} className="text-[17px] leading-8 text-slate-600 text-justify">{paragraph}</p>
                      ))}
                    </div>
                  </div>

                  {/* Footer Credentials */}
                  <div className="pt-8 flex items-center gap-3">
                    <div className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#1db87a]" /> {selectedLeader.accreditedLogo}
                    </div>
                  </div>
                  
                </div>
              </motion.div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}