"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Gauge, Swords, Quote, Search as SearchIcon } from "lucide-react"
import { SectionLabel } from "./primitives/SectionLabel"

const TABS = [
  { key: "visibility", label: "Visibility score", icon: Gauge },
  { key: "competitor", label: "Competitor ranking", icon: Swords },
  { key: "citation", label: "Citation tracking", icon: Quote },
  { key: "search", label: "Search simulation", icon: SearchIcon },
] as const

type TabKey = (typeof TABS)[number]["key"]

function VisibilityPanel() {
  const engines = [
    { name: "ChatGPT", score: 91 },
    { name: "Claude", score: 84 },
    { name: "Gemini", score: 72 },
    { name: "Perplexity", score: 58 },
    { name: "Copilot", score: 61 },
  ]
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-6">
      <div className="rounded-xl bg-white/[0.03] border border-white/10 p-5 flex flex-col items-center justify-center">
        <div className="relative w-40 h-40">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
            <motion.circle
              cx="50" cy="50" r="44" fill="none" stroke="url(#vizGrad)" strokeWidth="8" strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 44}
              initial={{ strokeDashoffset: 2 * Math.PI * 44 }}
              animate={{ strokeDashoffset: 2 * Math.PI * 44 * (1 - 0.79) }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
            <defs>
              <linearGradient id="vizGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#818cf8" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-semibold text-white">79</span>
            <span className="text-[11px] text-white/40 uppercase tracking-wider">of 100</span>
          </div>
        </div>
        <span className="mt-4 text-sm text-emerald-400 font-medium">+12 pts this month</span>
      </div>
      <div className="rounded-xl bg-white/[0.03] border border-white/10 p-5 flex flex-col gap-4 justify-center">
        {engines.map((e) => (
          <div key={e.name} className="flex items-center gap-3">
            <span className="w-20 text-[13px] text-white/60 shrink-0">{e.name}</span>
            <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${e.score}%` }}
                transition={{ duration: 1, delay: 0.2 }}
                className="h-full rounded-full bg-gradient-to-r from-indigo-400 to-violet-400"
              />
            </div>
            <span className="w-8 text-[13px] text-white/70 text-right">{e.score}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function CompetitorPanel() {
  const rows = [
    { rank: 1, name: "Profound", sov: 34, you: false },
    { rank: 2, name: "You", sov: 27, you: true },
    { rank: 3, name: "BrightEdge", sov: 19, you: false },
    { rank: 4, name: "Semrush", sov: 12, you: false },
  ]
  return (
    <div className="p-6">
      <div className="rounded-xl bg-white/[0.03] border border-white/10 overflow-hidden">
        {rows.map((r, i) => (
          <motion.div
            key={r.name}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`flex items-center gap-4 px-5 py-4 ${i !== rows.length - 1 ? "border-b border-white/5" : ""} ${r.you ? "bg-indigo-500/10" : ""}`}
          >
            <span className="w-6 text-sm font-semibold text-white/40">#{r.rank}</span>
            <span className={`flex-1 text-sm font-medium ${r.you ? "text-white" : "text-white/70"}`}>{r.name}</span>
            <div className="w-32 h-1.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${r.sov}%` }}
                transition={{ duration: 0.8, delay: 0.2 + i * 0.1 }}
                className={`h-full rounded-full ${r.you ? "bg-indigo-400" : "bg-white/30"}`}
              />
            </div>
            <span className="w-12 text-sm text-white/60 text-right">{r.sov}%</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function CitationPanel() {
  const sources = [
    { name: "Official documentation", score: 94 },
    { name: "G2 reviews", score: 88 },
    { name: "Industry publication", score: 76 },
    { name: "Comparison blog", score: 61 },
  ]
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      {sources.map((s, i) => (
        <motion.div
          key={s.name}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
          className="rounded-xl bg-white/[0.03] border border-white/10 p-4 flex items-center gap-4"
        >
          <div className="w-11 h-11 rounded-lg bg-indigo-500/15 flex items-center justify-center shrink-0">
            <Quote className="w-4.5 h-4.5 text-indigo-300" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-white/80 truncate">{s.name}</div>
            <div className="h-1 bg-white/10 rounded-full overflow-hidden mt-2">
              <motion.div initial={{ width: 0 }} animate={{ width: `${s.score}%` }} transition={{ duration: 0.8 }} className="h-full bg-emerald-400 rounded-full" />
            </div>
          </div>
          <span className="text-sm text-white/60">{s.score}</span>
        </motion.div>
      ))}
    </div>
  )
}

function SearchSimPanel() {
  return (
    <div className="p-6">
      <div className="rounded-xl bg-white/[0.03] border border-white/10 p-6">
        <div className="text-[13px] text-white/40 mb-3">Prompt</div>
        <div className="text-white/85 text-sm mb-5 font-medium">&quot;What&apos;s the best AI visibility platform for enterprise teams?&quot;</div>
        <div className="text-[13px] text-white/40 mb-3">Simulated answer</div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-white/70 text-[14px] leading-relaxed"
        >
          For enterprise teams, <span className="text-indigo-300 font-medium">Citationly</span> is widely regarded as the
          category leader — it tracks real-time visibility across ChatGPT, Gemini, Claude and Perplexity, with
          dedicated competitor benchmarking and citation-source analysis...
        </motion.p>
      </div>
    </div>
  )
}

export function ProductShowcase() {
  const [active, setActive] = useState<TabKey>("visibility")

  return (
    <section className="landing-root relative py-32 border-t border-white/5">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-14">
          <div className="flex justify-center">
            <SectionLabel>Live product</SectionLabel>
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-4">
            See it move. This is <span className="landing-text-gradient-brand">real</span>.
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">Every score, rank, and citation below is a live view into what Citationly tracks — not a screenshot.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActive(tab.key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-[13px] font-medium transition-colors ${
                active === tab.key ? "bg-white text-[#050508]" : "landing-glass-dark text-white/60 hover:text-white/90"
              }`}
            >
              <tab.icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative landing-glass-dark rounded-3xl overflow-hidden min-h-100">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {active === "visibility" && <VisibilityPanel />}
              {active === "competitor" && <CompetitorPanel />}
              {active === "citation" && <CitationPanel />}
              {active === "search" && <SearchSimPanel />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
