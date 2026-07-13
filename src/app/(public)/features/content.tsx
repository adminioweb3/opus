"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Bell,
  Check,
  FileText,
  Gauge,
  Globe,
  LineChart,
  ListChecks,
  MessageSquareText,
  PieChart,
  Quote,
  Radar,
  Sparkles,
  Swords,
  TrendingUp,
  Wand2,
  type LucideIcon,
} from "lucide-react"
import { PageHero } from "@/components/features/public/PageHero"
import { CtaBand } from "@/components/features/public/CtaBand"
import { SectionLabel } from "@/components/features/landing/primitives/SectionLabel"
import { RevealText } from "@/components/features/landing/primitives/RevealText"
import { AnimatedCounter } from "@/components/features/landing/primitives/AnimatedCounter"
import { MagneticButton } from "@/components/features/landing/primitives/MagneticButton"

/* ------------------------------------------------------------------ */
/* Shared motion presets                                               */
/* ------------------------------------------------------------------ */

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const fadeUp = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10%" },
} as const

/* ------------------------------------------------------------------ */
/* Stat band                                                           */
/* ------------------------------------------------------------------ */

const STATS = [
  { value: 6, suffix: "+", label: "AI platforms monitored, from ChatGPT to Grok" },
  { value: 7, suffix: "-day", label: "scan cadence — every platform, every week" },
  { value: 9, suffix: "", label: "intelligence modules in one platform" },
  { value: 1, suffix: "-click", label: "executive reports your leadership can read" },
]

function StatBand() {
  return (
    <section className="pb-20 md:pb-24">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.7, ease: EASE }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 rounded-[1.5rem] border border-black/5 bg-white shadow-[0_20px_60px_-30px_rgba(15,15,40,0.15)] px-6 py-10 md:px-10"
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`text-center px-4 ${i > 0 ? "lg:border-l lg:border-black/5" : ""} ${i % 2 === 1 ? "border-l border-black/5 lg:border-l" : ""}`}
            >
              <div className="text-4xl md:text-[2.75rem] font-semibold tracking-[-0.02em] text-foreground mb-2">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-[13px] leading-snug text-muted-foreground max-w-47.5 mx-auto">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Pillar mock: MEASURE — score gauge + platform bars                  */
/* ------------------------------------------------------------------ */

const PLATFORM_SCORES = [
  { name: "ChatGPT", score: 84, dot: "#10a37f" },
  { name: "Gemini", score: 71, dot: "#4285f4" },
  { name: "Perplexity", score: 68, dot: "#20b8cd" },
  { name: "Claude", score: 62, dot: "#d97757" },
  { name: "Copilot", score: 54, dot: "#0078d4" },
  { name: "Grok", score: 47, dot: "#18181b" },
]

const GAUGE_CIRCUMFERENCE = 326.7 // 2 * PI * r(52)

function MeasureMock() {
  return (
    <div className="relative rounded-[1.5rem] border border-black/5 bg-white shadow-[0_30px_80px_-30px_rgba(15,15,40,0.18)] p-6 md:p-8 overflow-hidden">
      <div className="pointer-events-none absolute -top-20 -right-20 w-56 h-56 rounded-full bg-indigo-500/8 blur-3xl" />

      {/* Card header */}
      <div className="relative flex items-center justify-between mb-7">
        <div className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-600 flex items-center justify-center">
            <Radar className="w-4 h-4" />
          </span>
          <span className="text-sm font-semibold text-foreground">Visibility Radar</span>
        </div>
        <span className="text-[11px] font-medium text-muted-foreground bg-black/3 border border-black/5 rounded-full px-2.5 py-1">
          Weekly scan · Mon 06:00
        </span>
      </div>

      <div className="relative grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-8 items-center">
        {/* Score gauge */}
        <div className="flex flex-col items-center gap-3 justify-self-center">
          <div className="relative w-36 h-36">
            <svg viewBox="0 0 120 120" className="w-full h-full">
              <defs>
                <linearGradient id="features-gauge-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#5b5bff" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
              <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(91,91,255,0.10)" strokeWidth="9" />
              <motion.circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="url(#features-gauge-gradient)"
                strokeWidth="9"
                strokeLinecap="round"
                strokeDasharray={GAUGE_CIRCUMFERENCE}
                initial={{ strokeDashoffset: GAUGE_CIRCUMFERENCE }}
                whileInView={{ strokeDashoffset: GAUGE_CIRCUMFERENCE * (1 - 0.72) }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1.5, ease: EASE }}
                transform="rotate(-90 60 60)"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-semibold tracking-[-0.02em] text-foreground">
                <AnimatedCounter value={72} />
              </span>
              <span className="text-[10px] font-semibold tracking-[0.12em] uppercase text-muted-foreground mt-0.5">
                Visibility
              </span>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-500/10 rounded-full px-2.5 py-1">
            <TrendingUp className="w-3 h-3" />
            +6 pts vs last week
          </span>
        </div>

        {/* Platform bars */}
        <div className="space-y-3.5 min-w-0">
          {PLATFORM_SCORES.map((p, i) => (
            <div key={p.name} className="flex items-center gap-3">
              <span className="flex items-center gap-2 w-24 shrink-0">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: p.dot }} />
                <span className="text-xs font-medium text-foreground/80">{p.name}</span>
              </span>
              <div className="flex-1 h-1.5 rounded-full bg-black/5 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${p.score}%` }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 1.1, delay: 0.15 + i * 0.08, ease: EASE }}
                  className="h-full rounded-full bg-linear-to-r from-indigo-500 to-violet-500"
                />
              </div>
              <span className="w-7 text-right text-xs font-semibold tabular-nums text-foreground">{p.score}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Pillar mock: MONITOR — alert feed + citation sources                */
/* ------------------------------------------------------------------ */

const ALERTS = [
  {
    icon: AlertTriangle,
    tone: "text-amber-600 bg-amber-500/10",
    badge: "Accuracy flag",
    text: "Gemini is citing 2023 pricing for your Starter plan",
    time: "2h ago",
  },
  {
    icon: Sparkles,
    tone: "text-emerald-600 bg-emerald-500/10",
    badge: "New citation",
    text: "Perplexity now cites /guides/ai-visibility for buyer prompts",
    time: "1d ago",
  },
  {
    icon: TrendingUp,
    tone: "text-indigo-600 bg-indigo-500/10",
    badge: "Competitor Watch",
    text: "A competitor gained 4 answers for “best GEO platform”",
    time: "2d ago",
  },
]

const CITED_SOURCES = [
  { domain: "g2.com", count: 31, you: false },
  { domain: "reddit.com", count: 24, you: false },
  { domain: "wikipedia.org", count: 19, you: false },
  { domain: "northwindcloud.com", count: 11, you: true },
]

function MonitorMock() {
  const maxCount = 31
  return (
    <div className="relative rounded-[1.5rem] border border-black/5 bg-white shadow-[0_30px_80px_-30px_rgba(15,15,40,0.18)] p-6 md:p-8 overflow-hidden">
      <div className="pointer-events-none absolute -bottom-20 -left-20 w-56 h-56 rounded-full bg-violet-500/8 blur-3xl" />

      {/* Brand Pulse alerts */}
      <div className="relative flex items-center gap-2.5 mb-5">
        <span className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-600 flex items-center justify-center">
          <Bell className="w-4 h-4" />
        </span>
        <span className="text-sm font-semibold text-foreground">Brand Pulse — live alerts</span>
      </div>

      <div className="relative space-y-2.5 mb-8">
        {ALERTS.map((alert, i) => (
          <motion.div
            key={alert.text}
            initial={{ opacity: 0, x: -14 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.55, delay: 0.1 + i * 0.12, ease: EASE }}
            className="flex items-start gap-3 rounded-xl border border-black/5 bg-white px-4 py-3"
          >
            <span className={`mt-0.5 w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${alert.tone}`}>
              <alert.icon className="w-3.5 h-3.5" />
            </span>
            <div className="min-w-0">
              <p className="text-[13px] leading-snug text-foreground/90">{alert.text}</p>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-[10px] font-semibold tracking-wide uppercase text-muted-foreground bg-black/4 rounded-full px-2 py-0.5">
                  {alert.badge}
                </span>
                <span className="text-[11px] text-muted-foreground">{alert.time}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Citation Intelligence */}
      <div className="relative flex items-center gap-2.5 mb-4">
        <span className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-600 flex items-center justify-center">
          <Quote className="w-4 h-4" />
        </span>
        <span className="text-sm font-semibold text-foreground">Citation Intelligence — most-cited sources</span>
      </div>

      <div className="relative space-y-3">
        {CITED_SOURCES.map((source, i) => (
          <div key={source.domain} className="flex items-center gap-3">
            <span
              className={`w-38 shrink-0 truncate text-xs font-medium ${source.you ? "text-indigo-600" : "text-foreground/80"}`}
            >
              {source.domain}
              {source.you && (
                <span className="ml-1.5 text-[9px] font-semibold uppercase tracking-wide bg-indigo-500/10 text-indigo-600 rounded-full px-1.5 py-0.5">
                  You
                </span>
              )}
            </span>
            <div className="flex-1 h-1.5 rounded-full bg-black/5 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${(source.count / maxCount) * 100}%` }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1, delay: 0.2 + i * 0.08, ease: EASE }}
                className={`h-full rounded-full ${source.you ? "bg-linear-to-r from-indigo-500 to-violet-500" : "bg-black/20"}`}
              />
            </div>
            <span className="w-6 text-right text-xs font-semibold tabular-nums text-foreground">{source.count}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Pillar mock: OPTIMIZE — prioritized fix checklist                   */
/* ------------------------------------------------------------------ */

const FIXES = [
  { text: "Add FAQ schema to /pricing for buyer prompts", impact: "High", done: true },
  { text: "Publish comparison page vs. your top-cited alternative", impact: "High", done: false },
  { text: "Close citation gap on the “AI visibility platforms” prompt set", impact: "Medium", done: false },
  { text: "Refresh /blog/geo-guide — stale stats flagged by Brand Pulse", impact: "Medium", done: true },
]

function OptimizeMock() {
  return (
    <div className="relative rounded-[1.5rem] border border-black/5 bg-white shadow-[0_30px_80px_-30px_rgba(15,15,40,0.18)] p-6 md:p-8 overflow-hidden">
      <div className="pointer-events-none absolute -top-20 -left-20 w-56 h-56 rounded-full bg-indigo-500/8 blur-3xl" />

      <div className="relative flex items-center justify-between mb-6">
        <div className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-600 flex items-center justify-center">
            <ListChecks className="w-4 h-4" />
          </span>
          <span className="text-sm font-semibold text-foreground">Opportunity Finder — this week&apos;s queue</span>
        </div>
      </div>

      <div className="relative space-y-2.5">
        {FIXES.map((fix, i) => (
          <motion.div
            key={fix.text}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.1, ease: EASE }}
            className="flex items-center gap-3.5 rounded-xl border border-black/5 bg-white px-4 py-3.5"
          >
            <span
              className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 ${
                fix.done ? "bg-indigo-500 text-white" : "border-[1.5px] border-black/15"
              }`}
            >
              {fix.done && <Check className="w-3 h-3" strokeWidth={3} />}
            </span>
            <p className={`flex-1 text-[13px] leading-snug ${fix.done ? "text-muted-foreground line-through decoration-black/20" : "text-foreground/90"}`}>
              {fix.text}
            </p>
            <span
              className={`shrink-0 text-[10px] font-semibold uppercase tracking-wide rounded-full px-2 py-1 ${
                fix.impact === "High" ? "bg-indigo-500/10 text-indigo-600" : "bg-amber-500/10 text-amber-600"
              }`}
            >
              {fix.impact}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="relative mt-6 flex items-center justify-between rounded-xl bg-indigo-50/70 border border-indigo-500/10 px-4 py-3.5">
        <span className="text-xs font-medium text-foreground/70">GEO Optimizer score, projected after fixes</span>
        <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
          64
          <ArrowRight className="w-3.5 h-3.5 text-indigo-500" />
          <span className="text-indigo-600">81</span>
        </span>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Pillar rows                                                         */
/* ------------------------------------------------------------------ */

interface PillarFeature {
  icon: LucideIcon
  name: string
  desc: string
}

interface Pillar {
  kicker: string
  title: string
  gradientWords: string[]
  body: string
  features: PillarFeature[]
  mock: React.ReactNode
}

const PILLARS: Pillar[] = [
  {
    kicker: "01 · Measure",
    title: "A single score for how AI sees you",
    gradientWords: ["AI"],
    body: "Visibility Radar scans ChatGPT, Gemini, Claude, Perplexity, Copilot, and Grok every week, then the Command Center distills the results into one visibility score — with a platform-by-platform breakdown you can defend in any meeting.",
    features: [
      {
        icon: Gauge,
        name: "AI Visibility Dashboard",
        desc: "Every platform's score in one Command Center view, refreshed with each weekly scan.",
      },
      {
        icon: PieChart,
        name: "Share of Voice",
        desc: "Your slice of AI answers versus named competitors, measured per platform.",
      },
      {
        icon: LineChart,
        name: "AI Search Analytics",
        desc: "Trends across prompts, platforms, and weeks — not one-off snapshots.",
      },
    ],
    mock: <MeasureMock />,
  },
  {
    kicker: "02 · Monitor",
    title: "Catch every mention, citation, and slip",
    gradientWords: ["citation"],
    body: "Brand Pulse watches what AI platforms actually say about you and flags inaccuracies the moment a scan finds them. Citation Intelligence shows which sources engines cite instead of you, and Competitor Watch tracks who is gaining ground.",
    features: [
      {
        icon: Bell,
        name: "Brand Monitoring",
        desc: "Accuracy flags and alerts when AI answers get your pricing, product, or positioning wrong.",
      },
      {
        icon: Quote,
        name: "AI Citation Tracking",
        desc: "The exact sources AI engines cite for your category — and where you are missing.",
      },
      {
        icon: Swords,
        name: "Competitor Intelligence",
        desc: "Share-of-voice movement against real competitors, with the answers they are winning.",
      },
    ],
    mock: <MonitorMock />,
  },
  {
    kicker: "03 · Optimize",
    title: "Turn gaps into ranked, page-level fixes",
    gradientWords: ["ranked"],
    body: "Opportunity Finder prioritizes what to fix first. GEO Optimizer and the Page Auditor translate every citation gap into concrete page-level changes, the Answer Simulator previews the result, and one-click Reports prove the impact to leadership.",
    features: [
      {
        icon: Wand2,
        name: "GEO Optimization",
        desc: "Page Auditor pinpoints the generative-engine fixes that make AI cite you.",
      },
      {
        icon: MessageSquareText,
        name: "AEO Optimization",
        desc: "Answer Simulator shows how engines answer buyer questions — before and after your fixes.",
      },
      {
        icon: FileText,
        name: "Reports",
        desc: "Executive-ready exports that tie every fix to visibility gained, in one click.",
      },
    ],
    mock: <OptimizeMock />,
  },
]

function PillarRow({ pillar, flip }: { pillar: Pillar; flip: boolean }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
      {/* Text side */}
      <motion.div
        {...fadeUp}
        transition={{ duration: 0.7, ease: EASE }}
        className={flip ? "lg:order-2" : ""}
      >
        <span className="inline-block text-xs font-semibold tracking-[0.18em] uppercase text-indigo-600 mb-4">
          {pillar.kicker}
        </span>
        <RevealText
          as="h3"
          text={pillar.title}
          gradientWords={pillar.gradientWords}
          className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] leading-[1.12] text-foreground mb-5"
        />
        <p className="text-muted-foreground leading-relaxed text-[15px] mb-8 max-w-lg">{pillar.body}</p>

        <div className="space-y-5">
          {pillar.features.map((feature, i) => (
            <motion.div
              key={feature.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.55, delay: 0.15 + i * 0.1, ease: EASE }}
              className="flex items-start gap-4"
            >
              <span className="mt-0.5 w-9 h-9 rounded-lg bg-indigo-500/10 text-indigo-600 flex items-center justify-center shrink-0">
                <feature.icon className="w-4 h-4" />
              </span>
              <p className="text-sm leading-relaxed">
                <span className="font-semibold text-foreground">{feature.name}.</span>{" "}
                <span className="text-muted-foreground">{feature.desc}</span>
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Mock side */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
        className={flip ? "lg:order-1" : ""}
      >
        {pillar.mock}
      </motion.div>
    </div>
  )
}

function PillarsSection() {
  return (
    <section className="py-20 md:py-24">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="flex justify-center">
            <SectionLabel dark={false}>The platform</SectionLabel>
          </div>
          <RevealText
            as="h2"
            text="Measure. Monitor. Optimize."
            gradientWords={["Optimize"]}
            className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-4"
          />
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
            className="text-muted-foreground leading-relaxed"
          >
            Three pillars, one workflow. Citationly gives you a defensible read on where you stand, watches every AI
            answer that mentions you, and turns what it finds into fixes your team can ship this week.
          </motion.p>
        </div>

        <div className="space-y-24 md:space-y-32">
          {PILLARS.map((pillar, i) => (
            <PillarRow key={pillar.kicker} pillar={pillar} flip={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Capability grid                                                     */
/* ------------------------------------------------------------------ */

const CAPABILITIES: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: Gauge,
    title: "AI Visibility Dashboard",
    desc: "One executive view of how every AI platform sees your brand, refreshed with each weekly scan.",
  },
  {
    icon: Quote,
    title: "AI Citation Tracking",
    desc: "Citation Intelligence reveals the sources engines cite for your category — and where you are absent.",
  },
  {
    icon: Bell,
    title: "Brand Monitoring",
    desc: "Brand Pulse flags inaccurate or outdated claims about your brand the moment they appear in AI answers.",
  },
  {
    icon: PieChart,
    title: "Share of Voice",
    desc: "Your share of AI answers versus competitors, broken down by platform and prompt set.",
  },
  {
    icon: LineChart,
    title: "AI Search Analytics",
    desc: "Week-over-week trends in visibility, prompt coverage, and sentiment across all six engines.",
  },
  {
    icon: Swords,
    title: "Competitor Intelligence",
    desc: "Competitor Watch tracks who is winning the answers you should own — with real share-of-voice data.",
  },
  {
    icon: Wand2,
    title: "GEO Optimization",
    desc: "GEO Optimizer and Page Auditor turn citation gaps into concrete, page-level generative-engine fixes.",
  },
  {
    icon: MessageSquareText,
    title: "AEO Optimization",
    desc: "Answer Simulator previews how AI engines answer buyer questions, so you optimize before you publish.",
  },
  {
    icon: FileText,
    title: "Reports",
    desc: "Executive-ready exports that connect fixes shipped to visibility gained — generated in one click.",
  },
]

function CapabilityGrid() {
  return (
    <section className="py-20 md:py-24 bg-indigo-50/40 border-y border-black/5">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="flex justify-center">
            <SectionLabel dark={false}>Capabilities</SectionLabel>
          </div>
          <RevealText
            as="h2"
            text="Nine capabilities. One source of truth."
            gradientWords={["truth"]}
            className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-4"
          />
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
            className="text-muted-foreground leading-relaxed"
          >
            Everything in the Platform menu, built on the same weekly scan data — so your dashboard, your alerts, and
            your fix queue never disagree.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CAPABILITIES.map((cap, i) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.55, delay: (i % 3) * 0.08 + Math.floor(i / 3) * 0.05, ease: EASE }}
              className="group rounded-2xl border border-black/5 bg-white p-6 shadow-[0_10px_30px_-16px_rgba(15,15,40,0.10)] hover:shadow-[0_20px_50px_-20px_rgba(91,91,255,0.25)] hover:border-indigo-500/20 transition-all"
            >
              <span className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center mb-4 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                <cap.icon className="w-4.5 h-4.5" />
              </span>
              <h3 className="text-[15px] font-semibold text-foreground mb-1.5">{cap.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{cap.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
          className="text-center text-sm text-muted-foreground mt-12"
        >
          Wondering how these map to your team?{" "}
          <Link href="/solutions" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors">
            Explore solutions by role
            <ArrowRight className="inline w-3.5 h-3.5 ml-1 -mt-0.5" />
          </Link>
        </motion.p>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Workflow strip                                                      */
/* ------------------------------------------------------------------ */

const WORKFLOW_STEPS: { icon: LucideIcon; step: string; title: string; desc: string }[] = [
  {
    icon: Globe,
    step: "01",
    title: "Connect your site",
    desc: "Knowledge Vault crawls your pages and builds the knowledge base every scan runs against.",
  },
  {
    icon: Radar,
    step: "02",
    title: "Weekly scans",
    desc: "Visibility Radar checks six AI platforms on a fixed weekly cadence and scores each one.",
  },
  {
    icon: ListChecks,
    step: "03",
    title: "Prioritized fixes",
    desc: "Opportunity Finder ranks what to fix; GEO Optimizer tells you exactly how, page by page.",
  },
  {
    icon: BarChart3,
    step: "04",
    title: "Prove impact",
    desc: "The Command Center and one-click Reports show leadership the visibility you gained.",
  },
]

function WorkflowStrip() {
  return (
    <section className="pt-20 md:pt-24 pb-4">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex justify-center">
            <SectionLabel dark={false}>Workflow</SectionLabel>
          </div>
          <RevealText
            as="h2"
            text="How it fits your workflow"
            gradientWords={["workflow"]}
            className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-4"
          />
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
            className="text-muted-foreground leading-relaxed"
          >
            From first crawl to board slide in four steps — no new rituals, no manual prompt-checking spreadsheets.
          </motion.p>
        </div>

        <div className="relative">
          {/* Connector line behind the icons (desktop only) */}
          <div className="hidden lg:block absolute top-7 left-[12%] right-[12%] border-t border-dashed border-black/10" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6">
            {WORKFLOW_STEPS.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.55, delay: i * 0.12, ease: EASE }}
                className="relative text-center px-2"
              >
                <div className="relative z-10 w-14 h-14 mx-auto rounded-2xl bg-white border border-indigo-500/20 shadow-[0_10px_30px_-12px_rgba(91,91,255,0.35)] text-indigo-600 flex items-center justify-center mb-5">
                  <step.icon className="w-5.5 h-5.5" />
                </div>
                <span className="block text-[11px] font-semibold tracking-[0.18em] uppercase text-indigo-600 mb-2">
                  Step {step.step}
                </span>
                <h3 className="text-base font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-62.5 mx-auto">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.p
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
          className="text-center text-sm text-muted-foreground mt-14"
        >
          See how teams like Northwind Cloud and Fielder run this loop in{" "}
          <Link href="/case-studies" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors">
            our case studies
            <ArrowRight className="inline w-3.5 h-3.5 ml-1 -mt-0.5" />
          </Link>
        </motion.p>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export function Content() {
  const router = useRouter()

  return (
    <main className="bg-background">
      <PageHero
        eyebrow="Platform"
        title="Every signal of your AI visibility. One platform."
        gradientWords={["AI"]}
        description="Citationly measures, monitors, and improves how ChatGPT, Gemini, Claude, Perplexity, Copilot, and Grok discover, understand, recommend, and cite your brand — from one command center."
        wide
      >
        <MagneticButton
          onClick={() => router.push("/register")}
          className="group h-12 px-7 rounded-full font-medium text-[15px] text-white bg-linear-to-r from-indigo-600 via-indigo-500 to-violet-500 shadow-[0_10px_30px_-8px_rgba(91,91,255,0.5)] hover:shadow-[0_14px_40px_-8px_rgba(91,91,255,0.65)] transition-shadow inline-flex items-center gap-2"
        >
          Start Free Analysis
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </MagneticButton>
        <Link
          href="/pricing"
          className="h-12 px-7 rounded-full font-medium text-[15px] text-foreground border border-black/10 bg-white/70 hover:bg-black/5 transition-colors inline-flex items-center gap-2"
        >
          View pricing
        </Link>
      </PageHero>

      <StatBand />
      <PillarsSection />
      <CapabilityGrid />
      <WorkflowStrip />
      <CtaBand />
    </main>
  )
}
