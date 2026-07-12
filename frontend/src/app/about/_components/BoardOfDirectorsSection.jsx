"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ArrowUpRight, X,Briefcase, Award
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
    shortDesc: "48+ years leading engineering, EPC and industrial project execution.",
    experience: "48+ Years",
    bio: [
  "Virendra D. Sanghavi brings over 48 years of distinguished experience in the design, engineering, construction, and operation of complex process plants across India and international markets. Throughout his career, he has held leadership roles with renowned organizations including Merck Sharp & Dohme India Ltd., Lubrizol India Ltd., Aker Solutions (formerly Davy Powergas), and Bhansali Engineering Polymers Ltd., contributing to the successful delivery of technically demanding industrial projects.",

  "Beyond industry, Mr. Sanghavi has actively contributed to engineering education as a Visiting Lecturer at the Institute of Chemical Technology (formerly UDCT), Mumbai, where he taught Piping Engineering. He also served as the Past President and continues as a member of the Board of Governors of the UDCT Alumni Association.",

  "His contributions have been recognized through prestigious honors, including the NOCIL Award for Excellence in Consultancy Services, the Star SME Award (2010), and the CFBP Jamnalal Bajaj Award for Fair Business Practices (2014), presented by the Late Dr. A.P.J. Abdul Kalam."
],
    image: imgVirendra
  },
  {
    id: "jaydev-sanghavi",
    name: "Jaydev V. Sanghavi",
    role: "Executive Director",
    shortDesc: "Driving strategic growth, operational excellence and international expansion.",
    experience: "34+ Years",
    bio: [
      "Jaydev V. Sanghavi has been associated with Aarvi Encon since 1992 and currently serves as the Executive Director, playing a pivotal role in the company's strategic growth and operational excellence. With over 34 years of experience across business operations, finance and corporate management, he has been instrumental in strengthening Aarvi's position within the engineering and industrial services sector.",

  "Throughout his career, Jaydev has successfully developed strategic partnerships, expanded business relationships and led the execution of several large and complex projects across multiple industries. His leadership has been central to Aarvi's sustained growth, organizational transformation and international expansion.",

  "Today, he oversees key business initiatives that support the company's long-term vision while driving operational efficiency and customer value. Under his leadership, Aarvi has established a strong international presence with operations across India, Qatar, UAE and Saudi Arabia, enabling the organization to support clients across diverse global markets."
],
    image: imgJaydev
  },
  {
    id: "r-manoj",
    name: "R. Manoj",
    role: "Senior Vice President",
    shortDesc: "Leading business development across engineering and EPC markets.",
    experience: "24+ Years",
    bio: [
       "R. Manoj has been associated with Aarvi Encon since 2004 and currently serves as the Senior Vice President. With over 24 years of experience across Engineering, Oil & Gas and EPC industries, he has played a significant role in expanding the company's business footprint across domestic and international markets.",

  "He has successfully led strategic business development initiatives, established long-term client partnerships and contributed to the execution of several major engineering and industrial projects. His commercial leadership has supported sustained business growth while delivering revenues exceeding INR 1,700 million.",

  "Manoj also leads Aarvi's international business operations, overseeing regional activities across the UAE, Oman, Qatar, Saudi Arabia, Indonesia and Malaysia. His strong understanding of client requirements, market dynamics and project execution continues to strengthen Aarvi's global presence and long-term business relationships."

    ],
    image: imgManoj
  },
  {
    id: "sreenivasu-motupalli",
    name: "M. Sreenivasu",
    role: "Vice President - Engineering",
    shortDesc: "Leading multidisciplinary engineering for complex EPC projects.",
    experience: "45+ Years",
    bio: [
      "M. Sreenivasu serves as the Vice President – Engineering and brings over 45 years of multidisciplinary engineering experience in delivering Pre-FEED, FEED and Detailed Engineering for complex EPC projects. Throughout his career, he has successfully led engineering organizations, multidisciplinary project teams and PMC engineering services across large industrial developments.",

  "His expertise spans Engineering Management, Project Engineering, Plant & Piping Engineering, EPC contractor review, digital engineering systems and corporate engineering governance. He has also led the implementation and management of advanced engineering platforms, including SmartPlant and AVEVA solutions.",

  "Sreenivasu has extensive project experience across Offshore Oil & Gas, LNG, Refineries, Petrochemicals, Chemical Plants, LPG Facilities, Power Generation and Pharmaceutical Industries, supporting both greenfield and brownfield developments. His technical leadership and practical project experience continue to strengthen Aarvi's engineering capabilities and commitment to delivering technically robust, execution-focused solutions."
    ],
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
                  <div className="py-6 border-y border-slate-100">
                   
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0">
                        <Briefcase className="w-4 h-4 text-[#1db87a]" />
                      </div>
                      <div>
                        <span className="text-[9px] font-bold text-slate-400 uppercase font-mono block">Industry Expertise</span>
                        <span className="text-xs font-bold text-[#0a1628] leading-tight">{selectedLeader.experience}</span>
                      </div>
                    </div>
                  </div>

                  {/* Biography Paragraphs */}
                  <div className="space-y-4 pt-2">
                    <h4 className="text-xs font-black uppercase tracking-widest text-[#0a1628] flex items-center gap-2">
                      <Award className="w-4 h-4 text-[#1db87a]" /> Leadership Profile
                    </h4>
                    <div className="space-y-4 text-slate-500 text-sm leading-relaxed font-medium">
                      {selectedLeader.bio.map((paragraph, idx) => (
                        <p key={idx} className="text-[17px] leading-8 text-slate-600 text-justify">{paragraph}</p>
                      ))}
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