"use client"

import { useRef, useState } from "react"
import dynamic from "next/dynamic"
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion"
import { ArrowRight, PlayCircle, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"
import { RevealText } from "./primitives/RevealText"
import { MagneticButton } from "./primitives/MagneticButton"
import { SectionLabel } from "./primitives/SectionLabel"

// The R3F canvas only mounts client-side, after hydration — keeps first paint fast and
// avoids SSR mismatch for a WebGL context.
const HeroScene = dynamic(() => import("./three/HeroScene").then((m) => m.HeroScene), { ssr: false })

const PLATFORMS = ["ChatGPT", "Gemini", "Claude", "Perplexity", "Copilot", "Grok"]

export function Hero() {
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)
  // The Three.js scene is expensive to keep rendering forever — only run its frame loop
  // while the hero is actually near the viewport (it's mounted unconditionally with the page,
  // so without this it'd keep animating at full cost even while scrolled deep into the footer).
  const heroInView = useInView(containerRef, { margin: "200px 0px 200px 0px" })

  // Mouse-driven 3D tilt on the dashboard card
  const [hovering, setHovering] = useState(false)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 150, damping: 20 })
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 20 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  return (
    <section ref={containerRef} className="landing-root relative overflow-hidden pt-40 pb-32 landing-mesh">
      <div className="landing-aurora" />
      <div className="landing-noise" />
      <div className="absolute inset-0 landing-grid opacity-60" />
      <HeroScene frameloop={heroInView ? "always" : "never"} />

      <div className="container relative z-10 mx-auto px-6 max-w-6xl">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center">
            <SectionLabel>Introducing Generative Engine Optimization</SectionLabel>
          </div>

          <RevealText
            as="h1"
            text="Dominate AI Search Before Your Competitors Do."
            gradientWords={["AI", "Search."]}
            className="text-5xl md:text-6xl lg:text-[5.25rem] font-semibold tracking-[-0.03em] leading-[1.03] mb-7 text-white"
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-lg md:text-xl text-white/60 font-normal leading-relaxed mb-11 max-w-2xl mx-auto"
          >
            Citationly measures, monitors, and improves how ChatGPT, Gemini, Claude, Perplexity,
            and every major AI platform discovers, understands, and cites your brand.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
          >
            <MagneticButton
              onClick={() => router.push("/register")}
              className="group h-13 px-8 rounded-full font-medium text-[15px] bg-white text-[#050508] shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_60px_rgba(255,255,255,0.25)] transition-shadow flex items-center gap-2"
            >
              Start Free AI Analysis
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </MagneticButton>
            <MagneticButton
              onClick={() => router.push("/register")}
              className="h-13 px-8 rounded-full font-medium text-[15px] landing-glass-dark text-white flex items-center gap-2 hover:bg-white/10 transition-colors"
            >
              <PlayCircle className="w-4 h-4" />
              Watch Demo
            </MagneticButton>
          </motion.div>
        </div>

        {/* Floating glass dashboard preview with cursor-driven 3D tilt */}
        <motion.div
          initial={{ opacity: 0, y: 60, rotateX: 10 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ perspective: 1600 }}
          className="relative mx-auto max-w-5xl"
        >
          <motion.div
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => {
              setHovering(false)
              mx.set(0)
              my.set(0)
            }}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative"
          >
            <div className="absolute -inset-8 bg-indigo-500/20 blur-[80px] rounded-[3rem]" />
            <div className="relative landing-glass-dark rounded-3xl p-2 shadow-[0_40px_120px_-20px_rgba(0,0,0,0.6)]">
              <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#0b0b14] aspect-video relative flex flex-col">
                <div className="h-12 border-b border-white/10 bg-white/[0.02] flex items-center px-5 gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
                  </div>
                  <div className="h-5 w-56 bg-white/5 rounded-md ml-3" />
                </div>

                <div className="flex-1 p-6 grid grid-cols-3 gap-5">
                  <div className="col-span-2 space-y-5">
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { label: "Visibility score", value: "87%", delta: "+5%" },
                        { label: "Citations tracked", value: "4.2k", delta: "+120" },
                        { label: "Share of voice", value: "34.2%", delta: "+2.1%" },
                      ].map((stat, i) => (
                        <div key={i} className="rounded-xl landing-glass-dark p-4">
                          <div className="text-[10px] font-semibold text-white/40 uppercase tracking-wider mb-2">{stat.label}</div>
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-xl font-semibold text-white">{stat.value}</span>
                            <span className="text-[11px] text-emerald-400 font-medium">{stat.delta}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="rounded-xl landing-glass-dark p-5 h-40 relative overflow-hidden">
                      <span className="text-[13px] font-semibold text-white/70">Visibility trend</span>
                      <svg className="absolute bottom-0 left-0 w-full h-28" preserveAspectRatio="none" viewBox="0 0 100 40">
                        <path d="M0,38 L0,26 Q25,10 50,18 T100,4 L100,40 Z" fill="url(#heroGrad)" />
                        <path d="M0,38 L0,26 Q25,10 50,18 T100,4" fill="none" stroke="#818cf8" strokeWidth="1.2" />
                        <defs>
                          <linearGradient id="heroGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.35" />
                            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                  </div>
                  <div className="rounded-xl landing-glass-dark p-5 flex flex-col gap-4">
                    <span className="text-[13px] font-semibold text-white/70">Engine dominance</span>
                    {[
                      { name: "ChatGPT", score: 92 },
                      { name: "Claude", score: 78 },
                      { name: "Gemini", score: 65 },
                      { name: "Perplexity", score: 45 },
                    ].map((e) => (
                      <div key={e.name} className="flex flex-col gap-1.5">
                        <div className="flex justify-between text-[11px] text-white/60 font-medium">
                          <span>{e.name}</span>
                          <span>{e.score}%</span>
                        </div>
                        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${e.score}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.3 }}
                            className="h-full rounded-full bg-gradient-to-r from-indigo-400 to-violet-400"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Platform trust bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20 text-center"
        >
          <p className="text-[11px] font-semibold text-white/35 mb-6 uppercase tracking-[0.2em] flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5" /> Monitoring visibility across every major AI platform
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-4 opacity-70">
            {PLATFORMS.map((p) => (
              <span key={p} className="text-sm font-medium text-white/50">{p}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
