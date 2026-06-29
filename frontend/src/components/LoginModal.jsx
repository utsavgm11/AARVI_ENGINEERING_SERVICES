"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { X, Lock, User, Send, AlertCircle, RefreshCw } from 'lucide-react';


export default function LoginModal({ isOpen, onClose }) {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const result = await login(username, password);
    
    if (result.success) {
      onClose(); // Close modal on successful handshake redirection
    } else {
      setError(result.error || "Authentication payload verification failure.");
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        
        {/* Backdrop Fade Blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#0a1628]/80 backdrop-blur-sm cursor-pointer"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: "spring", duration: 0.4 }}
          className="relative w-full max-w-md bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-2xl z-10 overflow-hidden"
        >
          {/* Close Trigger */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-[#0a1628] hover:bg-slate-50 rounded-full transition-all"
            aria-label="Close Portal Login"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Form Header */}
          <div className="space-y-1 mb-6 pr-6">
            <span className="text-[#1db87a] font-mono text-[9px] font-black tracking-widest uppercase block">
              SECURE SEC ACCESS HUB
            </span>
            <h2 className="text-2xl font-sans font-black text-[#0a1628] uppercase tracking-tight">
              Portal Login
            </h2>
            <p className="text-xs text-slate-400 font-medium leading-relaxed">
              Administrative credentials provisioned exclusively via corporate IT systems. Public creation disabled.
            </p>
          </div>

          {/* Inline Action Interceptor Alert */}
          {error && (
            <div className="mb-4 p-3.5 bg-rose-50 border border-rose-100 text-rose-800 rounded-xl flex items-start gap-2 text-xs font-semibold">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Login Form Payload */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Username Input */}
            <div className="space-y-1">
              <label className="text-[10px] font-black tracking-widest text-slate-400 uppercase font-mono block">
                User Email ID
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  required
                  type="text"
                  disabled={isSubmitting}
                  value={username}
                  onChange={(e) => setUsername(e.target.value.trim().toLowerCase())}
                  className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#1db87a] text-[#0a1628] bg-white transition-all font-semibold placeholder:text-slate-300 disabled:opacity-50"
                  placeholder="Enter your corporate email ID"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1">
              <label className="text-[10px] font-black tracking-widest text-slate-400 uppercase font-mono block">
                Account Signature Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  required
                  type="password"
                  disabled={isSubmitting}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#1db87a] text-[#0a1628] bg-white transition-all font-mono disabled:opacity-50"
                  placeholder="••••••••••••••"
                />
              </div>
            </div>

            {/* Submit Payload Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#0a1628] text-white text-xs font-mono font-bold uppercase tracking-widest py-4 rounded-xl hover:bg-[#1db87a] hover:text-[#0a1628] transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
              >
                {isSubmitting ? (
                  <>
                    Verifying Authentication <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  </>
                ) : (
                  <>
                    Authorize System Session <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </form>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}