"use client"

import { motion } from "framer-motion"
import { SectionLabel } from "./primitives/SectionLabel"
import { getPlatformLogoUrl } from "@/lib/logoUtils"

const PLATFORMS = [
  "ChatGPT", "Google AI Overview", "Gemini", "Claude", "Perplexity",
  "Microsoft Copilot", "Meta AI", "Grok", "DeepSeek",
]

function PlatformTile({ name, index }: { name: string; index: number }) {
  const logo = getPlatformLogoUrl(name)
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      whileHover={{ y: -8, rotateX: 6, rotateY: -6 }}
      style={{ transformStyle: "preserve-3d", perspective: 800 }}
      className="group relative landing-glass-dark rounded-2xl p-6 flex flex-col items-center gap-4 cursor-default"
    >
      <div className="absolute inset-0 rounded-2xl bg-indigo-500/0 group-hover:bg-indigo-500/10 blur-xl transition-colors duration-500" />
      <div className="relative w-14 h-14 rounded-xl bg-white flex items-center justify-center shadow-lg">
        {logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={logo} alt={name} className="w-8 h-8 object-contain" />
        ) : (
          <span className="text-lg font-bold text-slate-700">{name.charAt(0)}</span>
        )}
      </div>
      <span className="relative text-sm font-medium text-white/70 text-center">{name}</span>
    </motion.div>
  )
}

export function PlatformWall() {
  return (
    <section className="landing-root relative py-32 border-t border-white/5 overflow-hidden">
      <div className="landing-aurora opacity-40" />
      <div className="container relative z-10 mx-auto px-6 max-w-5xl">
        <div className="text-center mb-16">
          <div className="flex justify-center">
            <SectionLabel>Full coverage</SectionLabel>
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-4">
            Every AI platform. <span className="landing-text-gradient-brand">One dashboard.</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            While competitors track one or two engines, Citationly watches all nine — including the ones your
            customers are switching to next.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {PLATFORMS.map((p, i) => (
            <PlatformTile key={p} name={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
