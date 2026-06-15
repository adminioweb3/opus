"use client"

import { Button } from "@/components/ui/button"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Bot, Search, BrainCircuit, Globe, Zap, Code2 } from "lucide-react"
import { useRef } from "react"
import { useRouter } from "next/navigation"

export function Hero() {
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  // Parallax effects
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section ref={containerRef} className="relative pt-32 pb-32 overflow-hidden bg-background">
      {/* Advanced Background System */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.2]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-250 h-125 radial-glow opacity-50" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-primary/5 via-background to-background" />
      
      <div className="container relative z-10 mx-auto px-6 max-w-7xl">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium mb-8 border border-border shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            Introducing Generative Engine Optimization (GEO)
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-[4rem] font-semibold tracking-tight leading-[1.05] mb-6 text-primary-text"
          >
            Dominate your <span className="text-accent">AI Visibility Tracking</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-secondary-text font-normal leading-relaxed mb-10 max-w-2xl mx-auto"
          >
            The enterprise standard for AI Search Optimization and ChatGPT SEO. Monitor your Share of Voice, track AI citations, and optimize your brand&apos;s presence across major LLMs.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button onClick={() => router.push('/onboarding')} size="lg" className="h-12 px-8 font-medium text-base bg-accent hover:bg-accent/90 text-white shadow-lg shadow-accent/20 transition-all hover:scale-[1.02]">
              Start Free Trial <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button onClick={() => router.push('/onboarding')} size="lg" variant="outline" className="h-12 px-8 font-medium text-base bg-white shadow-sm hover:bg-slate-50 transition-all">
              Book a Demo
            </Button>
          </motion.div>

          {/* AI Engine Trust Bar */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-16 pt-8 border-t border-border/50"
          >
            <p className="text-xs font-semibold text-secondary-text mb-6 uppercase tracking-widest">Monitoring global visibility across leading AI models</p>
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 opacity-60 mix-blend-multiply dark:mix-blend-normal grayscale hover:grayscale-0 transition-all duration-500">
              <div className="flex items-center gap-2"><Bot className="w-5 h-5 text-[#10A37F]" /><span className="font-medium text-sm text-primary-text">ChatGPT</span></div>
              <div className="flex items-center gap-2"><Globe className="w-5 h-5 text-[#4285F4]" /><span className="font-medium text-sm text-primary-text">Gemini</span></div>
              <div className="flex items-center gap-2"><BrainCircuit className="w-5 h-5 text-[#D97757]" /><span className="font-medium text-sm text-primary-text">Claude</span></div>
              <div className="flex items-center gap-2"><Search className="w-5 h-5 text-[#22B8CD]" /><span className="font-medium text-sm text-primary-text">Perplexity</span></div>
              <div className="flex items-center gap-2"><Zap className="w-5 h-5 text-black" /><span className="font-medium text-sm text-primary-text">Grok</span></div>
              <div className="flex items-center gap-2"><Code2 className="w-5 h-5 text-[#00A4EF]" /><span className="font-medium text-sm text-primary-text">Copilot</span></div>
            </div>
          </motion.div>
        </div>

        {/* Parallax Dashboard Preview */}
        <motion.div
          style={{ y, opacity }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-24 mx-auto max-w-6xl relative"
        >
          {/* Subtle glow behind the dashboard */}
          <div className="absolute -inset-4 bg-accent/10 blur-3xl rounded-full opacity-50" />
          
          <div className="rounded-2xl border border-border bg-white/50 p-2 shadow-2xl backdrop-blur-xl ring-1 ring-black/5 relative">
            <div className="rounded-xl overflow-hidden border border-border/50 bg-white aspect-video relative flex flex-col shadow-inner">
               
               {/* Dashboard Header Mockup */}
               <div className="h-14 border-b border-border/50 bg-slate-50/50 flex items-center px-6 gap-4 backdrop-blur-sm">
                 <div className="flex gap-2">
                   <div className="w-3 h-3 rounded-full bg-red-400" />
                   <div className="w-3 h-3 rounded-full bg-yellow-400" />
                   <div className="w-3 h-3 rounded-full bg-green-400" />
                 </div>
                 <div className="h-6 w-64 bg-white rounded-md border border-border shadow-sm ml-4 flex items-center px-2">
                   <Search className="w-3 h-3 text-secondary-text" />
                 </div>
               </div>

               {/* Dashboard Body Mockup */}
               <div className="flex-1 p-8 grid grid-cols-3 gap-6 bg-slate-50/30">
                 <div className="col-span-2 space-y-6">
                   <div className="flex gap-4">
                     <div className="h-24 flex-1 bg-white rounded-xl border border-border shadow-sm p-4 flex flex-col justify-between">
                       <div className="h-2 w-20 bg-slate-200 rounded" />
                       <div className="h-8 w-32 bg-slate-100 rounded" />
                     </div>
                     <div className="h-24 flex-1 bg-white rounded-xl border border-border shadow-sm p-4 flex flex-col justify-between">
                       <div className="h-2 w-20 bg-slate-200 rounded" />
                       <div className="h-8 w-32 bg-slate-100 rounded" />
                     </div>
                     <div className="h-24 flex-1 bg-accent/5 rounded-xl border border-accent/20 shadow-sm p-4 flex flex-col justify-between">
                       <div className="h-2 w-20 bg-accent/40 rounded" />
                       <div className="h-8 w-32 bg-accent/20 rounded" />
                     </div>
                   </div>
                   <div className="flex-1 min-h-75 bg-white rounded-xl border border-border shadow-sm p-6 relative overflow-hidden">
                      <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-linear-to-t from-accent/10 to-transparent" />
                      <svg className="absolute bottom-0 left-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                        <path d="M0,100 L0,60 Q25,30 50,50 T100,20 L100,100 Z" fill="rgba(0, 0, 104, 0.05)" />
                        <path d="M0,100 L0,60 Q25,30 50,50 T100,20" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent" />
                      </svg>
                   </div>
                 </div>
                 <div className="space-y-6">
                   <div className="h-64 bg-white rounded-xl border border-border shadow-sm p-6 flex flex-col gap-4">
                     <div className="h-3 w-1/2 bg-slate-200 rounded mb-2" />
                     {[1,2,3,4].map(i => (
                       <div key={i} className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-slate-100" />
                         <div className="flex-1 h-2 bg-slate-100 rounded" />
                       </div>
                     ))}
                   </div>
                   <div className="flex-1 bg-white rounded-xl border border-border shadow-sm p-6 flex items-center justify-center relative overflow-hidden">
                     <div className="w-32 h-32 rounded-full border-12 border-slate-100 relative">
                       <div className="absolute -inset-3 rounded-full border-12 border-accent" style={{ clipPath: 'polygon(50% 50%, 100% 0, 100% 100%, 0 100%, 0 50%)' }} />
                     </div>
                   </div>
                 </div>
               </div>

            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
