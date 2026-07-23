import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from '@/context/AuthContext';

export const metadata = {
  title: "Aarvi Engineering Services & Consultants | Multi-Discipline Engineering Consultancy",
  description: "Over 39 years of corporate industry excellence delivering core process engineering, high-fidelity 3D piping layouts, offshore topsides engineering, plant safety consulting, and asset documentation globally.",
  keywords: ["Aarvi Engineering", "Process Engineering Consultants", "Piping Engineering Design", "Offshore Topside Engineering", "As-Built Documentation"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <body className="antialiased bg-white text-slate-800 min-h-screen flex flex-col overflow-x-hidden relative">
        
        {/* Wrap the entire component tree cleanly inside the AuthProvider */}
        <AuthProvider>
          
          {/* Isolated Header */}
          <div className="relative z-50">
            <Navbar />
          </div>
          
          {/* Isolated Main Content */}
          <main className="grow w-full relative z-10 bg-white">
            {children}
          </main>
          
          {/* Isolated & Protected Footer */}
          <div className="w-full relative z-40 bg-white">
            <Footer />
          </div>

        </AuthProvider>

      </body>
    </html>
  );
}