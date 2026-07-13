"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Eye, Quote, Swords, Wand2, ShieldCheck, LucideIcon } from "lucide-react"
import { SectionLabel } from "./primitives/SectionLabel"

interface Category {
  key: string
  icon: LucideIcon
  title: string
  desc: string
  features: string[]
  metric: { label: string; value: string }
}

const CATEGORIES: Category[] = [
  {
    key: "visibility",
    icon: Eye,
    title: "Visibility & Monitoring",
    desc: "Track exactly how often, and how favorably, AI engines surface your brand — across every prompt that matters to your business.",
    features: ["AI Visibility Score", "Brand Monitoring", "Prompt Monitoring", "Share of Voice"],
    metric: { label: "Prompts tracked per org", value: "300+" },
  },
  {
    key: "citations",
    icon: Quote,
    title: "Citations & Content",
    desc: "See which sources AI models actually cite, then close the exact content gaps keeping you out of the answer.",
    features: ["AI Citation Tracking", "Content Recommendations", "SERP Intelligence"],
    metric: { label: "Avg. new citations / mo", value: "+38%" },
  },
  {
    key: "optimization",
    icon: Wand2,
    title: "GEO, AEO & SEO",
    desc: "One unified optimization score spanning classic SEO, answer-engine readiness, and generative-engine optimization.",
    features: ["GEO Score", "AEO Readiness", "Technical SEO Health"],
    metric: { label: "Faster to first citation", value: "3.2x" },
  },
  {
    key: "competitive",
    icon: Swords,
    title: "Competitive Intelligence",
    desc: "Real-time rank tracking against every competitor already winning the AI answers you should own.",
    features: ["Competitor Intelligence", "Threat Detection", "Rank Benchmarking"],
    metric: { label: "Competitors tracked", value: "Unlimited" },
  },
  {
    key: "enterprise",
    icon: ShieldCheck,
    title: "Enterprise Ready",
    desc: "Executive-ready reporting, SOC 2-aligned security, and an API built for teams that need to plug visibility data into everything else.",
    features: ["Executive Reports", "Enterprise Security", "REST API", "Integrations"],
    metric: { label: "Uptime SLA", value: "99.9%" },
  },
]

export function FeatureShowcase() {
  const [active, setActive] = useState(0)
  const current = CATEGORIES[active]

  return (
    <section className="relative py-32 bg-background">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <div className="flex justify-center">
            <SectionLabel dark={false}>Everything, in one platform</SectionLabel>
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
            Built for how AI actually <span className="text-primary">recommends brands.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-8">
          <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {CATEGORIES.map((cat, i) => (
              <button
                key={cat.key}
                onClick={() => setActive(i)}
                className={`flex items-center gap-3.5 text-left px-5 py-4 rounded-2xl transition-all shrink-0 lg:shrink w-64 lg:w-auto ${
                  active === i
                    ? "bg-primary/8 border border-primary/25 shadow-sm"
                    : "border border-transparent hover:bg-muted/60"
                }`}
              >
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${active === i ? "bg-primary text-white" : "bg-muted text-muted-foreground"}`}>
                  <cat.icon className="w-4.5 h-4.5" />
                </div>
                <span className={`text-sm font-semibold ${active === i ? "text-foreground" : "text-muted-foreground"}`}>{cat.title}</span>
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

                <div className="flex flex-wrap gap-2 mb-10">
                  {current.features.map((f) => (
                    <span key={f} className="px-3.5 py-1.5 rounded-full bg-muted text-[13px] font-medium text-foreground/80 border border-border/70">
                      {f}
                    </span>
                  ))}
                </div>

                <div className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-primary/5 border border-primary/15">
                  <span className="text-2xl font-semibold text-primary">{current.metric.value}</span>
                  <span className="text-[13px] text-muted-foreground">{current.metric.label}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
