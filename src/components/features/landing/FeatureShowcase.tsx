"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Eye, Quote, Swords, Wand2, PieChart, Search as SearchIcon, ArrowRight, LucideIcon } from "lucide-react"
import { SectionLabel } from "./primitives/SectionLabel"

interface Feature {
  key: string
  icon: LucideIcon
  title: string
  desc: string
  href: string
}

const FEATURES: Feature[] = [
  {
    key: "citation-tracking",
    icon: Quote,
    title: "AI Citation Tracking",
    desc: "Citationly records every citation AI engines attach to answers in your category. You see which of your pages earn references, which engines trust them, and how citation frequency moves week over week.",
    href: "/features/citation-tracking",
  },
  {
    key: "brand-monitoring",
    icon: Eye,
    title: "Brand Monitoring",
    desc: "The platform continuously checks how engines describe your company, products, and pricing. When an answer gets your positioning wrong, you find out from a dashboard alert instead of a confused prospect on a sales call.",
    href: "/features/brand-monitoring",
  },
  {
    key: "competitor-intelligence",
    icon: Swords,
    title: "Competitor Intelligence",
    desc: "Track competitor visibility across every monitored engine. See which questions they win, which sources power their citations, and where their presence is growing or fading.",
    href: "/features/competitor-intelligence",
  },
  {
    key: "share-of-voice",
    icon: PieChart,
    title: "Share of Voice Analytics",
    desc: "Measures the percentage of relevant AI answers that mention your brand versus competitors, calculated per engine, per topic, and per time period.",
    href: "/features/share-of-voice",
  },
  {
    key: "optimization",
    icon: Wand2,
    title: "Optimization Recommendations",
    desc: "Data becomes a to-do list. Citationly generates prioritized recommendations covering which questions to answer, which pages to restructure, and which citation gaps to close first.",
    href: "/generative-engine-optimization",
  },
  {
    key: "prompt-research",
    icon: SearchIcon,
    title: "Question and Prompt Research",
    desc: "Discover the real questions buyers ask AI engines about your category, mapped against your current coverage.",
    href: "/features/ai-search-analytics",
  },
]

export function FeatureShowcase() {
  const [active, setActive] = useState(0)
  const current = FEATURES[active]

  return (
    <section className="relative py-32 bg-background">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <div className="flex justify-center">
            <SectionLabel dark={false}>Core features</SectionLabel>
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
            The capabilities behind <span className="text-primary">the platform.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-8">
          <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {FEATURES.map((feature, i) => (
              <button
                key={feature.key}
                onClick={() => setActive(i)}
                className={`flex items-center gap-3.5 text-left px-5 py-4 rounded-2xl transition-all shrink-0 lg:shrink w-64 lg:w-auto ${
                  active === i
                    ? "bg-primary/8 border border-primary/25 shadow-sm"
                    : "border border-transparent hover:bg-muted/60"
                }`}
              >
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${active === i ? "bg-primary text-white" : "bg-muted text-muted-foreground"}`}>
                  <feature.icon className="w-4.5 h-4.5" />
                </div>
                <span className={`text-sm font-semibold ${active === i ? "text-foreground" : "text-muted-foreground"}`}>{feature.title}</span>
              </button>
            ))}
          </div>

          <div className="relative rounded-3xl border border-border bg-card p-10 min-h-100 overflow-hidden">
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
            <AnimatePresence mode="wait">
              <motion.div
                key={current.key}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
                className="relative"
              >
                <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center mb-6">
                  <current.icon className="w-6 h-6" />
                </div>
                <h3 className="text-3xl font-semibold text-foreground mb-4">{current.title}</h3>
                <p className="text-muted-foreground leading-relaxed max-w-xl mb-8 text-[15px]">{current.desc}</p>

                <Link
                  href={current.href}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
                >
                  Learn more
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
