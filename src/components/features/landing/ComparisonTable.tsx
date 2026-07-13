"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, X, Minus } from "lucide-react"
import { SectionLabel } from "./primitives/SectionLabel"

type Cell = "yes" | "no" | "partial"

const COMPETITORS = ["Traditional SEO tools", "Profound", "Generic analytics"] as const

const ROWS: { label: string; citationly: Cell; competitors: Record<(typeof COMPETITORS)[number], Cell> }[] = [
  { label: "Tracks ChatGPT, Gemini, Claude & Perplexity", citationly: "yes", competitors: { "Traditional SEO tools": "no", Profound: "yes", "Generic analytics": "no" } },
  { label: "Real citation-source discovery", citationly: "yes", competitors: { "Traditional SEO tools": "no", Profound: "partial", "Generic analytics": "no" } },
  { label: "GEO + AEO + SEO in one score", citationly: "yes", competitors: { "Traditional SEO tools": "partial", Profound: "no", "Generic analytics": "no" } },
  { label: "Weekly automated competitor scans", citationly: "yes", competitors: { "Traditional SEO tools": "no", Profound: "partial", "Generic analytics": "no" } },
  { label: "AI-generated fix recommendations", citationly: "yes", competitors: { "Traditional SEO tools": "partial", Profound: "no", "Generic analytics": "no" } },
  { label: "Executive-ready reporting", citationly: "yes", competitors: { "Traditional SEO tools": "yes", Profound: "partial", "Generic analytics": "yes" } },
]

function CellIcon({ value }: { value: Cell }) {
  if (value === "yes") return <Check className="w-4.5 h-4.5 text-emerald-400" />
  if (value === "no") return <X className="w-4.5 h-4.5 text-white/25" />
  return <Minus className="w-4.5 h-4.5 text-amber-400/70" />
}

export function ComparisonSection() {
  const [competitor, setCompetitor] = useState<(typeof COMPETITORS)[number]>("Traditional SEO tools")

  return (
    <section className="landing-root relative py-32 border-t border-white/5">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-12">
          <div className="flex justify-center">
            <SectionLabel>How we compare</SectionLabel>
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-4">
            Citationly vs. <span className="landing-text-gradient-brand">everything else.</span>
          </h2>
        </div>

        <div className="flex justify-center gap-2 mb-8">
          {COMPETITORS.map((c) => (
            <button
              key={c}
              onClick={() => setCompetitor(c)}
              className={`px-4 py-2 rounded-full text-[13px] font-medium transition-colors ${
                competitor === c ? "bg-white text-[#050508]" : "landing-glass-dark text-white/60 hover:text-white/90"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="landing-glass-dark rounded-3xl overflow-hidden">
          <div className="grid grid-cols-[1fr_100px_100px] items-center px-6 py-4 border-b border-white/10 text-[12px] font-semibold uppercase tracking-wider text-white/40">
            <span>Capability</span>
            <span className="text-center text-indigo-300">Citationly</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={competitor}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center truncate"
              >
                {competitor}
              </motion.span>
            </AnimatePresence>
          </div>
          {ROWS.map((row, i) => (
            <motion.div
              key={row.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`grid grid-cols-[1fr_100px_100px] items-center px-6 py-4 ${i !== ROWS.length - 1 ? "border-b border-white/5" : ""}`}
            >
              <span className="text-[14px] text-white/75">{row.label}</span>
              <span className="flex justify-center"><CellIcon value={row.citationly} /></span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={competitor}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-center"
                >
                  <CellIcon value={row.competitors[competitor]} />
                </motion.span>
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
