// src/app/page.js
import Hero from "@/components/Hero";
import InteractiveStory from "@/components/InteractiveStory";
import WhyAarvi from "@/components/WhyAarvi";
import ServicesMatrix from "@/components/ServicesMatrix"; // <-- IMPORT MATRIX
import ClientOverview from "@/components/ClientOverview";

export default function Home() {
  return (
    <main className="w-full relative bg-aarvi-bg">
      <Hero />
      <InteractiveStory />
      <WhyAarvi />
      <ServicesMatrix /> {/* <-- RENDER MATRIX HERE */}
      <ClientOverview />
    </main>
  );
}