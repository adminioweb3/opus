"use client"

import { motion } from "framer-motion"

export function AiEcosystemIllustration() {
  return (
    <div className="relative w-full aspect-square md:aspect-video bg-slate-50/50 rounded-2xl border border-border/50 overflow-hidden flex items-center justify-center p-8">
      {/* Background Subtle Mesh */}
      <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hex-mesh" width="24" height="24" patternUnits="userSpaceOnUse" patternTransform="scale(1.5)">
            <path d="M12 0 L24 6 L24 18 L12 24 L0 18 L0 6 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hex-mesh)" className="text-accent" />
      </svg>

      {/* Connection Lines (Animated) */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {/* CITATIONLY is at center (50%, 50%) */}
        {/* ChatGPT (20%, 20%) */}
        <motion.path d="M 20% 20% Q 35% 20% 50% 50%" fill="none" stroke="currentColor" strokeWidth="2" className="text-border" />
        <motion.path d="M 20% 20% Q 35% 20% 50% 50%" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5 5" className="text-accent" 
          initial={{ strokeDashoffset: 100 }} animate={{ strokeDashoffset: 0 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} />
        
        {/* Gemini (80%, 20%) */}
        <motion.path d="M 80% 20% Q 65% 20% 50% 50%" fill="none" stroke="currentColor" strokeWidth="2" className="text-border" />
        <motion.path d="M 80% 20% Q 65% 20% 50% 50%" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5 5" className="text-accent"
          initial={{ strokeDashoffset: 100 }} animate={{ strokeDashoffset: 0 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} />
        
        {/* Claude (15%, 80%) */}
        <motion.path d="M 15% 80% Q 30% 80% 50% 50%" fill="none" stroke="currentColor" strokeWidth="2" className="text-border" />
        <motion.path d="M 15% 80% Q 30% 80% 50% 50%" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5 5" className="text-accent"
          initial={{ strokeDashoffset: 100 }} animate={{ strokeDashoffset: 0 }} transition={{ duration: 5, repeat: Infinity, ease: "linear" }} />
        
        {/* Perplexity (85%, 80%) */}
        <motion.path d="M 85% 80% Q 70% 80% 50% 50%" fill="none" stroke="currentColor" strokeWidth="2" className="text-border" />
        <motion.path d="M 85% 80% Q 70% 80% 50% 50%" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5 5" className="text-accent"
          initial={{ strokeDashoffset: 100 }} animate={{ strokeDashoffset: 0 }} transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }} />
          
        {/* Grok (50%, 15%) */}
        <motion.path d="M 50% 15% L 50% 50%" fill="none" stroke="currentColor" strokeWidth="2" className="text-border" />
        <motion.path d="M 50% 15% L 50% 50%" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5 5" className="text-accent"
          initial={{ strokeDashoffset: 100 }} animate={{ strokeDashoffset: 0 }} transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }} />
      </svg>

      {/* Nodes */}
      {/* Central CITATIONLY Node */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="w-32 h-32 bg-white rounded-2xl border-2 border-accent shadow-card flex items-center justify-center relative">
          <div className="absolute -inset-4 bg-accent/20 rounded-3xl blur-xl animate-pulse" />
          <span className="text-2xl font-bold tracking-tight text-primary-text relative z-10">CITATIONLY</span>
        </div>
      </div>

      {/* Outer Nodes */}
      <div className="absolute top-[15%] left-[15%] -translate-x-1/2 -translate-y-1/2">
        <div className="w-16 h-16 bg-white rounded-xl border border-border shadow-sm flex flex-col items-center justify-center gap-1">
          <div className="w-4 h-4 rounded-full bg-[#10A37F]" />
          <span className="text-[10px] font-medium text-secondary-text">ChatGPT</span>
        </div>
      </div>

      <div className="absolute top-[15%] left-[85%] -translate-x-1/2 -translate-y-1/2">
        <div className="w-16 h-16 bg-white rounded-xl border border-border shadow-sm flex flex-col items-center justify-center gap-1">
          <div className="w-4 h-4 rounded-full bg-[#4285F4]" />
          <span className="text-[10px] font-medium text-secondary-text">Gemini</span>
        </div>
      </div>

      <div className="absolute top-[85%] left-[15%] -translate-x-1/2 -translate-y-1/2">
        <div className="w-16 h-16 bg-white rounded-xl border border-border shadow-sm flex flex-col items-center justify-center gap-1">
          <div className="w-4 h-4 rounded-full bg-[#D97757]" />
          <span className="text-[10px] font-medium text-secondary-text">Claude</span>
        </div>
      </div>

      <div className="absolute top-[85%] left-[85%] -translate-x-1/2 -translate-y-1/2">
        <div className="w-16 h-16 bg-white rounded-xl border border-border shadow-sm flex flex-col items-center justify-center gap-1">
          <div className="w-4 h-4 rounded-full bg-[#22B8CD]" />
          <span className="text-[10px] font-medium text-secondary-text">Perplexity</span>
        </div>
      </div>

      <div className="absolute top-[10%] left-[50%] -translate-x-1/2 -translate-y-1/2">
        <div className="w-16 h-16 bg-white rounded-xl border border-border shadow-sm flex flex-col items-center justify-center gap-1">
          <div className="w-4 h-4 rounded-full bg-black" />
          <span className="text-[10px] font-medium text-secondary-text">Grok</span>
        </div>
      </div>
      
    </div>
  )
}
