"use client";
import React, { useEffect } from 'react';

// ─── IMPORT ALL YOUR MODULAR SECTIONS ───
import HeroSection from './_components/HeroSection';
import VisionMissionSection from './_components/VisionMissionSection';
//import CoreValuesSection from './_components/CoreValuesSection';
//import CertificationsSection from './_components/CertificationsSection';
import BoardOfDirectorsSection from './_components/BoardOfDirectorsSection';
//import ConversionFooter from './_components/ConversionFooter';

export default function ConsolidatedAboutPage() {
  
  // ─── SMART SCROLL LISTENER ───
  // This listens for clicks from the Navbar (e.g., /about#management-team) 
  // and smoothly glides the user to that specific section.
  useEffect(() => {
    const handleHashScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        const targetedElement = document.querySelector(hash);
        if (targetedElement) {
          // Offsets the scroll by 80px so the sticky navbar doesn't hide the section title
          const elementPosition = targetedElement.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: elementPosition - 80, 
            behavior: "smooth"
          });
        }
      }
    };

    // Run on initial load and whenever the URL hash changes
    setTimeout(handleHashScroll, 100);
    window.addEventListener("hashchange", handleHashScroll);
    return () => window.removeEventListener("hashchange", handleHashScroll);
  }, []);

  return (
    <main className="w-full min-h-screen bg-white">
      {/* ─── RENDER SECTIONS IN ORDER ─── */}
      <HeroSection />
      <VisionMissionSection />
      {/* <CoreValuesSection /> */}
      {/* <CertificationsSection /> */}
      <BoardOfDirectorsSection />
      {/* <ConversionFooter /> */}
    </main>
  );
}