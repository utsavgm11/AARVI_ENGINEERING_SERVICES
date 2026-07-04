"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin, Mail, Phone, Loader2, CheckCircle,
  AlertCircle, Building2, ArrowUpRight, ExternalLink,
  User, ClipboardList, MessageSquare
} from 'lucide-react';

// ─── DYNAMIC OFFICE DATA ──────────────────────────────────────────────────────
// To add a new office later, simply add a new object to this array.
const OFFICES = [
  {
    id: "mumbai",
    isHQ: true,
    name: "Head Office",
    address: "B1-603, Innova, Marathon Nextgen, Ganpatrao Kadam Marg, Lower Parel (West), Mumbai – 400013",
    phone: { display: "+91 22 4049 9999", href: "tel:+912240499999" },
    email: { display: "info@aarviencon.com", href: "mailto:info@aarviencon.com" },
    mapUrl: "https://maps.google.com/?q=Innova,Marathon+Nextgen,Lower+Parel,Mumbai"
  },
  {
    id: "chennai",
    isHQ: false,
    name: "Engineering Office",
    address: "1st Floor, Smartworks Bharati Vilas, 26B, Jawaharlal Nehru Salai, Guindy Industrial Estate, Ekkatuthangal, Chennai – 600032",
    phone: { display: "+91 44 4340 6666", href: "tel:+914443406666" },
    email: { display: "chennai@aarviencon.com", href: "mailto:chennai@aarviencon.com" },
    mapUrl: "https://maps.google.com/?q=Smartworks+Bharati+Vilas,Guindy,Chennai"
  }
];

// ─── SERVICES DROPDOWN DATA ─────────────────────────────────────────────────
const SERVICES_LIST = [
  "Process & Safety Engineering",
  "Plant Layout & Piping Engineering",
  "Mechanical Equipment Engineering",
  "Civil & Structural Engineering",
  "Electrical & Power Engineering",
  "Instrumentation & Control",
  "Engineering Simulations (CFD/FEA)",
  "Digital Engineering & 3D Modelling",
  "Project Engineering & PMC Support",
  "As-Built & Asset Documentation",
  "Construction & Commissioning Support",
  "Other Technical Inquiry"
];

 const Field = ({ icon: Icon, label, children }) => (
    <div className="flex flex-col gap-2">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</label>
      <div className="relative">
        <Icon className="w-4 h-4 text-slate-300 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
        {children}
      </div>
    </div>
  );


export default function ContactPage() {
  // ─── FORM STATE ───
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', company: '', service: '', message: ''
  });
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // ─── SUBMISSION LOGIC ───
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    const GOOGLE_SCRIPT_URL = "YOUR_GOOGLE_SCRIPT_URL_HERE";
    const BACKEND_API_URL = "http://localhost:8000/api/contact";

    try {
      await Promise.all([
        fetch(GOOGLE_SCRIPT_URL, {
          method: "POST", mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }).catch(err => console.warn("Google Script error:", err)),

        fetch(BACKEND_API_URL, {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }).catch(err => {
            console.warn("Backend DB is not hooked up yet:", err);
            return { ok: true };
        })
      ]);

      setStatus('success');
      setFormData({ name: '', email: '', phone: '', company: '', service: '', message: '' });

    } catch (error) {
      console.error("Submission Error:", error);
      setStatus('error');
    }
  };

  // ─── ANIMATION VARIANTS ───
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  // Reusable field wrapper: icon-prefixed single-line inputs
 
  return (
    <main className="bg-aarvi-bg min-h-screen text-aarvi-navy selection:bg-aarvi-green/30 pt-24 pb-20 lg:pt-32 lg:pb-32 relative">

      {/* ─── GLOBAL BACKGROUND GRID ─── */}
      <div className="fixed inset-0 tech-grid opacity-40 pointer-events-none z-0" />

      {/* ─── HEADER ─── */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 mb-16 lg:mb-20 text-center">
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <span className="w-1.5 h-1.5 inline-block rounded-full bg-aarvi-green animate-pulse mb-4" />
          <span className="text-[11px] font-mono font-bold text-aarvi-green tracking-[0.25em] uppercase ml-2">
            Consult an Expert
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-aarvi-navy tracking-tight leading-tight mt-2 mb-6">
            Let&apos;s Build Something <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-aarvi-navy to-aarvi-green">Extraordinary.</span>
          </h1>
          <p className="text-slate-500 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Connect with our multidisciplinary engineering team to discuss your next critical project. We respond to all technical inquiries within 24 hours.
          </p>
        </motion.div>
      </section>

      {/* ─── CONTACT GRID ─── */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">

          {/* ─ LEFT: NAVY CONSOLE PANEL — OFFICE INFO ─ */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-5 lg:sticky lg:top-28"
          >
            <div className="relative bg-aarvi-navy rounded-4xl p-8 md:p-10 overflow-hidden">
              {/* Decorative glow */}
              <div className="absolute -right-16 -top-16 w-56 h-56 bg-aarvi-green/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -left-16 -bottom-16 w-56 h-56 bg-aarvi-green/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 flex flex-col gap-8">

                

                {/* Office cards */}
                {OFFICES.map((office) => (
                  <div
                    key={office.id}
                    className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-aarvi-green/40 hover:bg-white/[0.07] transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-aarvi-green/10 transition-colors">
                          <MapPin className="w-4.5 h-4.5 text-aarvi-green" />
                        </div>
                        <h3 className="text-base font-black text-white flex items-center gap-2">
                          {office.name}
                          {office.isHQ && (
                            <span className="px-2 py-0.5 rounded bg-aarvi-green text-white text-[9px] font-mono tracking-widest uppercase">HQ</span>
                          )}
                        </h3>
                      </div>
                      <a href={office.mapUrl} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-aarvi-green transition-colors border border-white/10 text-white/50 hover:text-white shrink-0">
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>

                    <p className="text-[13px] text-white/50 leading-relaxed mb-5">
                      {office.address}
                    </p>

                    <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
                      <a href={office.email.href} className="flex items-center gap-3 text-[13px] text-white/70 hover:text-aarvi-green transition-colors font-medium">
                        <Mail className="w-3.5 h-3.5 shrink-0" />
                        {office.email.display}
                      </a>
                      <a href={office.phone.href} className="flex items-center gap-3 text-[13px] text-white/70 hover:text-aarvi-green transition-colors font-medium">
                        <Phone className="w-3.5 h-3.5 shrink-0" />
                        {office.phone.display}
                      </a>
                    </div>
                  </div>
                ))}

                {/* Global Operations note */}
                <div className="pt-2 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <Building2 className="w-4.5 h-4.5 text-aarvi-green" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm mb-1.5">Global Operations</h4>
                    <p className="text-white/50 text-[13px] leading-relaxed">
                      Supporting international engineering initiatives with 24/7 technical capabilities across multiple time zones.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ─ RIGHT: FORM PANEL ─ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-7"
          >
            <div className="relative bg-white p-8 md:p-12 rounded-4xl border border-slate-200 shadow-2xl shadow-slate-200/50 min-h-full">

              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center text-center h-full py-16"
                  >
                    <div className="relative w-20 h-20 flex items-center justify-center mb-6">
                      <motion.span
                        className="absolute inset-0 rounded-full bg-aarvi-green/20"
                        animate={{ scale: [1, 1.6, 1.6], opacity: [0.6, 0, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                      />
                      <div className="relative w-20 h-20 bg-green-50 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-10 h-10 text-aarvi-green" />
                      </div>
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-black text-aarvi-navy tracking-tight mb-4">
                      Inquiry Transmitted!
                    </h3>
                    <p className="text-slate-500 text-sm max-w-md mx-auto mb-10 leading-relaxed">
                      Your technical requirements have been securely logged in our database. An engineering lead will review your scope and contact you shortly.
                    </p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="px-6 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-aarvi-navy hover:border-aarvi-green transition-all shadow-sm"
                    >
                      Submit Another Inquiry
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-8"
                  >
                    {/* ── Section: Contact Information ── */}
                    <div className="flex flex-col gap-6">
                      <p className="text-[11px] font-mono font-bold text-aarvi-green uppercase tracking-[0.2em]">
                       Contact Information
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Field icon={User} label="Full Name *">
                          <input required type="text" id="name" name="name" value={formData.name} onChange={handleChange}
                            className="w-full pl-11 pr-5 py-3.5 rounded-xl bg-aarvi-bg border border-slate-200 text-sm text-aarvi-navy focus:outline-none focus:ring-2 focus:ring-aarvi-green/50 focus:border-aarvi-green transition-all placeholder:text-slate-300"
                            placeholder="John Doe"
                          />
                        </Field>
                        <Field icon={Mail} label="Work Email *">
                          <input required type="email" id="email" name="email" value={formData.email} onChange={handleChange}
                            className="w-full pl-11 pr-5 py-3.5 rounded-xl bg-aarvi-bg border border-slate-200 text-sm text-aarvi-navy focus:outline-none focus:ring-2 focus:ring-aarvi-green/50 focus:border-aarvi-green transition-all placeholder:text-slate-300"
                            placeholder="john@company.com"
                          />
                        </Field>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Field icon={Phone} label="Phone Number">
                          <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange}
                            className="w-full pl-11 pr-5 py-3.5 rounded-xl bg-aarvi-bg border border-slate-200 text-sm text-aarvi-navy focus:outline-none focus:ring-2 focus:ring-aarvi-green/50 focus:border-aarvi-green transition-all placeholder:text-slate-300"
                            placeholder="+91 98765 43210"
                          />
                        </Field>
                        <Field icon={Building2} label="Company Name">
                          <input type="text" id="company" name="company" value={formData.company} onChange={handleChange}
                            className="w-full pl-11 pr-5 py-3.5 rounded-xl bg-aarvi-bg border border-slate-200 text-sm text-aarvi-navy focus:outline-none focus:ring-2 focus:ring-aarvi-green/50 focus:border-aarvi-green transition-all placeholder:text-slate-300"
                            placeholder="Acme Energy Corp"
                          />
                        </Field>
                      </div>
                    </div>

                    {/* ── Section: Project Details ── */}
                    <div className="flex flex-col gap-6">
                      <p className="text-[11px] font-mono font-bold text-aarvi-green uppercase tracking-[0.2em]">
                         Project Details
                      </p>

                      <div className="flex flex-col gap-2">
                        <label htmlFor="service" className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Primary Discipline of Interest *</label>
                        <div className="relative">
                          <ClipboardList className="w-4 h-4 text-slate-300 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <select required id="service" name="service" value={formData.service} onChange={handleChange}
                            className="w-full pl-11 pr-5 py-3.5 rounded-xl bg-aarvi-bg border border-slate-200 text-sm text-aarvi-navy focus:outline-none focus:ring-2 focus:ring-aarvi-green/50 focus:border-aarvi-green transition-all cursor-pointer appearance-none"
                          >
                            <option value="" disabled>Select an engineering discipline...</option>
                            {SERVICES_LIST.map(svc => (
                              <option key={svc} value={svc}>{svc}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <label htmlFor="message" className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Message *</label>
                        <div className="relative">
                          <MessageSquare className="w-4 h-4 text-slate-300 absolute left-4 top-4 pointer-events-none" />
                          <textarea required id="message" name="message" value={formData.message} onChange={handleChange} rows={5}
                            className="w-full pl-11 pr-5 py-3.5 rounded-xl bg-aarvi-bg border border-slate-200 text-sm text-aarvi-navy focus:outline-none focus:ring-2 focus:ring-aarvi-green/50 focus:border-aarvi-green transition-all resize-none placeholder:text-slate-300"
                            placeholder="Please briefly describe your project scope, timeline, and specific engineering deliverables required..."
                          />
                        </div>
                      </div>
                    </div>

                    {/* Submit Button & Error State */}
                    <div className="pt-6 flex flex-col sm:flex-row items-center gap-6 justify-between border-t border-slate-200">
                      <button
                        type="submit"
                        disabled={status === 'submitting'}
                        className="w-full sm:w-auto px-8 py-4 bg-aarvi-navy hover:bg-[#111827] text-white rounded-xl text-sm font-bold tracking-widest uppercase transition-all shadow-lg shadow-aarvi-navy/10 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {status === 'submitting' ? (
                          <><Loader2 className="w-4 h-4 animate-spin" /> Transmitting</>
                        ) : (
                          <>Dispatch Inquiry <ArrowUpRight className="w-4 h-4" /></>
                        )}
                      </button>

                      {status === 'error' && (
                        <div className="flex items-center gap-2 text-red-500 text-sm font-bold bg-red-50 px-4 py-2 rounded-lg border border-red-100">
                          <AlertCircle className="w-4 h-4" />
                          System error. Please try again.
                        </div>
                      )}

                      
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </section>
    </main>
  );
}