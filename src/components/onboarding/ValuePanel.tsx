"use client"

import { motion } from "framer-motion"
import { Check, Clock, Gauge, Quote, Wand2, Swords, FileBadge, Sparkles, Eye } from "lucide-react"

const INCLUDES = [
  { icon: Gauge, label: "AI Visibility Score" },
  { icon: Quote, label: "Citation Analysis" },
  { icon: Wand2, label: "GEO Optimization" },
  { icon: Swords, label: "Competitor Analysis" },
  { icon: FileBadge, label: "Technical SEO" },
  { icon: Sparkles, label: "AI Search Readiness" },
  { icon: Eye, label: "Brand Mentions" },
]

// Right-side rail shown alongside Step 2's form — sets expectations for what the generated
// report contains, so the form doesn't feel like a cost with no visible payoff.
export function ValuePanel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-[19rem] mx-auto rounded-2xl bg-white shadow-[0_24px_60px_-16px_rgba(30,27,75,0.2)] ring-1 ring-black/[0.04] p-5"
    >
      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#5B5CEB] to-[#7C3AED] flex items-center justify-center mb-4">
        <Sparkles className="w-4 h-4 text-white" />
      </div>

      <h3 className="text-[15px] font-semibold tracking-[-0.01em] text-foreground mb-1">What your report includes</h3>
      <p className="text-[11.5px] text-muted-foreground mb-5">
        Generated the moment you finish this step — no extra setup.
      </p>

      <ul className="space-y-2.5 mb-5">
        {INCLUDES.map((item, i) => (
          <motion.li
            key={item.label}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}
            className="flex items-center gap-2.5"
          >
            <span className="flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded-full bg-[#22C55E]/10">
              <Check className="w-3 h-3 text-[#22C55E]" strokeWidth={3} />
            </span>
            <item.icon className="w-3.5 h-3.5 text-[#5B5CEB]/70 shrink-0" />
            <span className="text-[12px] font-medium text-foreground/85">{item.label}</span>
          </motion.li>
        ))}
      </ul>

      <div className="flex items-center gap-2 rounded-lg bg-[#F8FAFC] px-3 py-2.5">
        <Clock className="w-3.5 h-3.5 text-muted-foreground" />
        <div>
          <div className="text-[9.5px] text-muted-foreground leading-none mb-1">Estimated time</div>
          <div className="text-[12px] font-semibold text-foreground leading-none">~2 minutes</div>
        </div>
      </div>
    </motion.div>
  )
}
