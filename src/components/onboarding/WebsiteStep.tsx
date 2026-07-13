"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Globe, ArrowRight, Sparkles, CheckCircle2, AlertCircle } from "lucide-react"
import { AnimatedLoader } from "./AnimatedLoader"

const FEATURE_CHIPS = ["AI Visibility", "Citation Analysis", "Competitor Scan", "GEO Score", "Technical SEO", "Brand Mentions"]

export const SCRAPE_STAGES = [
  "Connecting...",
  "Reading website...",
  "Checking robots.txt...",
  "Finding sitemap...",
  "Scanning pages...",
  "Checking AI visibility...",
  "Analyzing competitors...",
  "Building report...",
]

function normalizeUrlInput(raw: string): string {
  return raw
    .trim()
    .replace(/^https?:\/\//i, "")
    .replace(/^www\./i, "")
    .replace(/\/+$/, "")
}

function isLikelyDomain(value: string): boolean {
  return /^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+(\/.*)?$/i.test(value)
}

interface WebsiteStepProps {
  value: string
  onChange: (value: string) => void
  onContinue: () => void
  isScraping: boolean
  /** 0-100, drives which stage in SCRAPE_STAGES reads as "current". */
  scrapeProgress: number
}

// Step 1: hero + URL capture. Value is always stored/emitted protocol-stripped
// (e.g. "acme.com") — https:// and www. are silently normalized away on type/paste.
export function WebsiteStep({ value, onChange, onContinue, isScraping, scrapeProgress }: WebsiteStepProps) {
  const [touched, setTouched] = useState(false)
  const valid = value.length > 0 && isLikelyDomain(value)
  const showError = touched && value.length > 0 && !valid

  const stageIndex = Math.min(
    SCRAPE_STAGES.length - 1,
    Math.floor((scrapeProgress / 100) * SCRAPE_STAGES.length)
  )

  if (isScraping) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#5B5CEB] to-[#7C3AED] mb-6 shadow-[0_12px_30px_-8px_rgba(91,92,235,0.5)]">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-semibold tracking-[-0.02em] text-foreground mb-2">
          Scanning {value || "your website"}...
        </h2>
        <p className="text-[14.5px] text-muted-foreground mb-9">
          This usually takes under a minute. Feel free to keep this tab open.
        </p>
        <AnimatedLoader stages={SCRAPE_STAGES} currentIndex={stageIndex} />
      </motion.div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#5B5CEB]/8 text-[#5B5CEB] text-[11px] font-semibold mb-5">
        <Sparkles className="w-3 h-3" />
        AI Visibility Workspace
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold tracking-[-0.03em] text-foreground leading-[1.15] mb-2.5">
        Build Your AI Visibility Workspace
      </h1>
      <p className="text-[14px] text-muted-foreground leading-relaxed mb-7 max-w-md">
        Analyze your website across Google, ChatGPT, Claude, Gemini, and Perplexity in under 2 minutes.
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          setTouched(true)
          if (valid) onContinue()
        }}
      >
        <label htmlFor="website-url" className="sr-only">Website URL</label>
        <div
          className={`relative flex items-center gap-2.5 rounded-xl border-2 bg-white pl-3.5 pr-2 h-13 transition-colors duration-200 ${
            showError
              ? "border-red-300 focus-within:border-red-400"
              : valid
                ? "border-[#22C55E]/50 focus-within:border-[#22C55E]"
                : "border-black/10 focus-within:border-[#5B5CEB]"
          }`}
        >
          <Globe className={`w-4.5 h-4.5 shrink-0 ${valid ? "text-[#22C55E]" : "text-muted-foreground"}`} />
          <span className="text-[14px] text-muted-foreground shrink-0 select-none hidden sm:inline">https://</span>
          <input
            id="website-url"
            type="text"
            inputMode="url"
            autoComplete="url"
            placeholder="yourdomain.com"
            aria-invalid={showError}
            aria-describedby={showError ? "website-url-error" : undefined}
            value={value}
            onChange={(e) => onChange(normalizeUrlInput(e.target.value))}
            onPaste={(e) => {
              const pasted = e.clipboardData.getData("text")
              if (pasted) {
                e.preventDefault()
                onChange(normalizeUrlInput(pasted))
              }
            }}
            onBlur={() => setTouched(true)}
            className="flex-1 min-w-0 h-full bg-transparent text-[14.5px] font-medium text-foreground placeholder:text-muted-foreground/50 outline-none"
          />
          {valid && <CheckCircle2 className="w-4.5 h-4.5 text-[#22C55E] shrink-0" />}
          <button
            type="submit"
            disabled={!valid}
            aria-label="Continue"
            className="hidden sm:inline-flex h-9.5 px-4 shrink-0 rounded-lg bg-gradient-to-r from-[#5B5CEB] to-[#7C3AED] text-white text-[13px] font-semibold items-center gap-1.5 shadow-[0_8px_20px_-6px_rgba(91,92,235,0.5)] transition-all hover:shadow-[0_10px_26px_-4px_rgba(91,92,235,0.6)] disabled:opacity-30 disabled:shadow-none disabled:cursor-not-allowed"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Continue
          </button>
        </div>

        <AnimatePresence>
          {showError && (
            <motion.p
              id="website-url-error"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-center gap-1.5 text-[13px] text-red-500 mt-2.5"
            >
              <AlertCircle className="w-3.5 h-3.5" /> Enter a valid domain, like acme.com
            </motion.p>
          )}
        </AnimatePresence>

        <div className="flex flex-wrap gap-2 mt-6">
          {FEATURE_CHIPS.map((chip, i) => (
            <motion.span
              key={chip}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.05, duration: 0.4 }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white ring-1 ring-black/[0.06] text-[12.5px] font-medium text-foreground/75"
            >
              <CheckCircle2 className="w-3 h-3 text-[#22C55E]" />
              {chip}
            </motion.span>
          ))}
        </div>

        <button
          type="submit"
          disabled={!valid}
          className="sm:hidden w-full mt-7 h-13 rounded-2xl bg-gradient-to-r from-[#5B5CEB] to-[#7C3AED] text-white font-semibold text-[15px] flex items-center justify-center gap-2 shadow-[0_10px_30px_-8px_rgba(91,92,235,0.5)] disabled:opacity-30 disabled:shadow-none"
        >
          <Sparkles className="w-4 h-4" />
          Continue
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>
    </motion.div>
  )
}
