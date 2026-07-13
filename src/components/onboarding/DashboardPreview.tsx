"use client"

import { motion } from "framer-motion"
import { TrendingUp, Quote } from "lucide-react"
import { getPlatformLogoUrl } from "@/lib/logoUtils"

const PLATFORMS = ["ChatGPT", "Claude", "Gemini", "Google AI Overview"]

const COMPETITOR_BARS = [
  { name: "You", value: 82, highlight: true },
  { name: "Competitor A", value: 61, highlight: false },
  { name: "Competitor B", value: 47, highlight: false },
]

const TREND_POINTS = "M0,34 L0,26 Q20,16 40,20 T80,10 T140,4 L140,40 L0,40 Z"
const TREND_LINE = "M0,34 L0,26 Q20,16 40,20 T80,10 T140,4"

// Right-side "live product" preview shown next to the Step 1 URL input — real AI-platform
// logos (resolved via the same favicon technique used elsewhere in the app), an animated
// score gauge, a mini trend chart, and a competitor comparison, so the panel reads as an
// actual dashboard rather than decorative illustration. Kept deliberately compact (a
// preview, not a full dashboard) so it doesn't dominate the page.
export function DashboardPreview() {
  return (
    <div className="relative w-full max-w-[19rem] mx-auto">
      <div className="absolute -inset-6 bg-gradient-to-br from-[#5B5CEB]/20 via-[#7C3AED]/10 to-transparent blur-2xl rounded-[2.5rem]" />

      <motion.div
        initial={{ opacity: 0, y: 24, rotate: -1 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-[1.25rem] bg-white shadow-[0_24px_60px_-16px_rgba(30,27,75,0.22)] ring-1 ring-black/[0.04] p-3.5"
      >
        <div className="flex items-center justify-between mb-3.5">
          <div>
            <div className="text-[9.5px] font-semibold text-muted-foreground uppercase tracking-wider">AI Visibility</div>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-xl font-bold tracking-tight text-foreground">82</span>
              <span className="text-[11px] font-medium text-[#22C55E] flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" /> +14
              </span>
            </div>
          </div>
          <svg viewBox="0 0 48 48" className="w-11 h-11 -rotate-90">
            <circle cx="24" cy="24" r="20" fill="none" stroke="#F1F1FB" strokeWidth="5" />
            <motion.circle
              cx="24"
              cy="24"
              r="20"
              fill="none"
              stroke="#5B5CEB"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 20}
              initial={{ strokeDashoffset: 2 * Math.PI * 20 }}
              animate={{ strokeDashoffset: 2 * Math.PI * 20 * (1 - 0.82) }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            />
          </svg>
        </div>

        {/* Platform logo row */}
        <div className="flex items-center gap-1.5 mb-3.5">
          {PLATFORMS.map((p, i) => {
            const logo = getPlatformLogoUrl(p, 64)
            return (
              <motion.div
                key={p}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.08, type: "spring", stiffness: 300, damping: 16 }}
                className="w-6 h-6 rounded-lg bg-[#F8FAFC] ring-1 ring-black/[0.05] flex items-center justify-center overflow-hidden shrink-0"
                title={p}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {logo && <img src={logo} alt={p} className="w-3.5 h-3.5 object-contain" />}
              </motion.div>
            )
          })}
          <span className="text-[9.5px] text-muted-foreground ml-0.5 truncate">monitored live</span>
        </div>

        {/* Mini trend chart */}
        <div className="rounded-lg bg-[#F8FAFC] p-2.5 mb-2.5">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10.5px] font-semibold text-foreground/80">Visibility trend</span>
            <span className="text-[9.5px] text-muted-foreground">30d</span>
          </div>
          <svg viewBox="0 0 140 40" className="w-full h-10" preserveAspectRatio="none">
            <defs>
              <linearGradient id="ob-trend-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#5B5CEB" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#5B5CEB" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={TREND_POINTS} fill="url(#ob-trend-grad)" />
            <motion.path
              d={TREND_LINE}
              fill="none"
              stroke="#5B5CEB"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
            />
          </svg>
        </div>

        {/* Competitor bars */}
        <div className="rounded-lg bg-[#F8FAFC] p-2.5 mb-2.5">
          <span className="text-[10.5px] font-semibold text-foreground/80 block mb-2">Share of voice</span>
          <div className="space-y-1.5">
            {COMPETITOR_BARS.map((c, i) => (
              <div key={c.name} className="flex items-center gap-2">
                <span className={`text-[9.5px] w-14 shrink-0 truncate ${c.highlight ? "font-semibold text-foreground" : "text-muted-foreground"}`}>
                  {c.name}
                </span>
                <div className="flex-1 h-1 rounded-full bg-black/[0.05] overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${c.value}%` }}
                    transition={{ duration: 0.9, delay: 0.4 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className={`h-full rounded-full ${c.highlight ? "bg-gradient-to-r from-[#5B5CEB] to-[#7C3AED]" : "bg-black/15"}`}
                  />
                </div>
                <span className="text-[9.5px] text-muted-foreground w-5 text-right">{c.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Citation callout */}
        <div className="rounded-lg bg-gradient-to-br from-[#5B5CEB]/8 to-[#7C3AED]/8 p-2.5 flex items-start gap-2">
          <Quote className="w-3 h-3 text-[#5B5CEB] shrink-0 mt-0.5" />
          <p className="text-[9.5px] leading-relaxed text-foreground/70">
            &ldquo;Cited as a top source&rdquo; in <span className="font-semibold text-foreground">ChatGPT</span>, 2 days ago
          </p>
        </div>
      </motion.div>

      {/* Floating SEO score chip — inset less aggressively so it stays within the panel's padding */}
      <motion.div
        initial={{ opacity: 0, x: 14, y: -8 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute -right-3 -top-3 rounded-xl bg-white shadow-[0_14px_34px_-10px_rgba(30,27,75,0.28)] ring-1 ring-black/[0.05] px-3 py-2 hidden sm:block"
      >
        <div className="text-[8.5px] font-semibold text-muted-foreground uppercase tracking-wider">SEO Score</div>
        <div className="text-sm font-bold text-foreground mt-0.5">94<span className="text-[10px] text-muted-foreground font-medium">/100</span></div>
      </motion.div>
    </div>
  )
}
