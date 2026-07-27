"use client"

import { motion } from "framer-motion"
import { Eye, Swords, Search, Wand2, LucideIcon } from "lucide-react"
import { SectionLabel } from "./primitives/SectionLabel"

interface Layer {
  icon: LucideIcon
  title: string
  desc: string
}

const LAYERS: Layer[] = [
  { icon: Eye, title: "Monitor", desc: "Continuous tracking of brand mentions, citations, and answer sentiment across six major AI engines." },
  { icon: Swords, title: "Benchmark", desc: "Share of Voice measurement against named competitors, per engine, per topic, over time." },
  { icon: Search, title: "Diagnose", desc: "Source-level analysis showing why engines cite what they cite, and where inaccurate answers originate." },
  { icon: Wand2, title: "Act", desc: "Prioritized GEO and AEO recommendations that content and SEO teams can execute the same week." },
]

function LayerTile({ layer, index }: { layer: Layer; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
      whileHover={{ y: -8, rotateX: 6, rotateY: -6 }}
      style={{ transformStyle: "preserve-3d", perspective: 800 }}
      className="group relative landing-glass-dark rounded-2xl p-7 flex flex-col items-start gap-4 cursor-default text-left"
    >
      <div className="absolute inset-0 rounded-2xl bg-indigo-500/0 group-hover:bg-indigo-500/10 blur-xl transition-colors duration-500" />
      <div className="relative w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-lg">
        <layer.icon className="w-5.5 h-5.5 text-indigo-600" />
      </div>
      <span className="relative text-lg font-semibold text-white">{layer.title}</span>
      <p className="relative text-[14px] text-white/55 leading-relaxed">{layer.desc}</p>
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
            <SectionLabel>Platform overview</SectionLabel>
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-4">
            One AI visibility platform, <span className="landing-text-gradient-brand">four connected layers.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {LAYERS.map((layer, i) => (
            <LayerTile key={layer.title} layer={layer} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
