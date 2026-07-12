"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import {
  AlertTriangle,
  ArrowRight,
  Briefcase,
  Building2,
  Check,
  HeartPulse,
  Landmark,
  LucideIcon,
  Megaphone,
  Quote,
  Rocket,
  Search,
  ShieldCheck,
  ShoppingBag,
} from "lucide-react"
import { PageHero } from "@/components/features/public/PageHero"
import { CtaBand } from "@/components/features/public/CtaBand"
import { SectionLabel } from "@/components/features/landing/primitives/SectionLabel"
import { RevealText } from "@/components/features/landing/primitives/RevealText"
import { AnimatedCounter } from "@/components/features/landing/primitives/AnimatedCounter"
import { TESTIMONIAL_PORTRAITS } from "@/lib/landing-images"

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

interface TeamCard {
  icon: LucideIcon
  team: string
  problem: string
  outcomes: string[]
  metric: { value: number; prefix?: string; suffix?: string; decimals?: number; label: string }
}

const TEAMS: TeamCard[] = [
  {
    icon: Megaphone,
    team: "Marketing Teams",
    problem:
      "Buyers now ask ChatGPT before they ever reach your site — and that influence is invisible in your attribution stack. When budget review comes, the channel you can't measure is the channel that gets cut.",
    outcomes: [
      "Put a number on AI visibility with weekly Visibility Radar scans and one Command Center score",
      "Defend budget with executive-ready Reports built on trend lines, not anecdotes",
      "Catch stale pricing and wrong positioning early with Brand Pulse accuracy flags",
    ],
    metric: { value: 6, label: "AI platforms scanned every week" },
  },
  {
    icon: Search,
    team: "SEO Teams",
    problem:
      "Rankings still matter, but they no longer describe the whole journey. Answer engines synthesize, cite, and recommend — and none of that shows up in a rank tracker.",
    outcomes: [
      "Extend your stack into GEO and AEO with platform-by-platform Visibility Radar scores",
      "See exactly which sources AI engines cite instead of you with Citation Intelligence",
      "Ship page-level fixes from GEO Optimizer audits — structure, prompt coverage, citation gaps",
    ],
    metric: { value: 3.2, suffix: "x", decimals: 1, label: "Faster to first citation" },
  },
  {
    icon: Briefcase,
    team: "Agencies",
    problem:
      "Every client is asking how ChatGPT talks about them, and “we're not sure” is not a billable answer. You need a defensible methodology you can run across an entire portfolio.",
    outcomes: [
      "Run every client from one workspace with team roles and per-client views",
      "Deliver white-label executive exports from Reports without rebuilding decks each month",
      "Turn Opportunity Finder deep scans into the prioritized roadmap clients renew for",
    ],
    metric: { value: 12, suffix: " hrs", label: "Saved on client reporting per week" },
  },
  {
    icon: Rocket,
    team: "SaaS Companies",
    problem:
      "In your category, the shortlist is written by an AI. If Perplexity recommends a competitor for the exact prompt your buyer types, you lose the deal before your first touchpoint.",
    outcomes: [
      "Benchmark share of voice against direct competitors with Competitor Watch",
      "Simulate the questions your buyers actually ask with Answer Simulator",
      "Close the gaps with prioritized fixes from GEO Optimizer and Content Generator",
    ],
    metric: { value: 38, prefix: "+", suffix: "%", label: "Avg. citation growth in 90 days" },
  },
]

interface IndustryCard {
  icon: LucideIcon
  industry: string
  desc: string
  bullets: string[]
}

const INDUSTRIES: IndustryCard[] = [
  {
    icon: Building2,
    industry: "Enterprise",
    desc: "AI visibility becomes another line in the reporting stack your executives already trust — with the access controls and audit posture procurement expects before anything gets rolled out.",
    bullets: [
      "Executive-ready Reports for board decks and QBRs",
      "Team roles and permissions that scope who sees what",
      "API keys and integrations that hold up in security review",
    ],
  },
  {
    icon: HeartPulse,
    industry: "Healthcare",
    desc: "When AI answers patient-facing questions about your services, accuracy is a duty of care, not a marketing metric. Brand Pulse flags answers that misstate what you offer so your team can correct the source.",
    bullets: [
      "Accuracy flags on patient-facing answers",
      "Alerts the moment a monitored answer changes",
      "Citation tracing back to the source being quoted",
    ],
  },
  {
    icon: Landmark,
    industry: "Finance",
    desc: "Rates, fees, and eligibility rules change faster than model training data. Monitor the regulated, high-trust topics where a single stale AI answer erodes years of credibility.",
    bullets: [
      "Continuous monitoring on regulated, high-trust topics",
      "Outdated-rate and stale-terms detection",
      "Weekly scan history your team can review internally",
    ],
  },
  {
    icon: ShoppingBag,
    industry: "Retail",
    desc: "“Best X under $Y” is a prompt now, not a search. Track the product-recommendation answers that decide carts, and see which brands AI engines suggest instead of yours.",
    bullets: [
      "Product-recommendation prompt tracking",
      "Share of voice against the brands AI recommends",
      "Prompt coverage for seasonal buying questions",
    ],
  },
]

interface WeekEntry {
  day: string
  time: string
  module: string
  title: string
  body: string
  mock?: "radar" | "pulse" | "fixes" | "report"
}

const WEEK: WeekEntry[] = [
  {
    day: "MON",
    time: "9:04 AM",
    module: "Visibility Radar",
    title: "The weekly scan lands",
    body: "Visibility Radar finishes its pass across ChatGPT, Gemini, Claude, Perplexity, Copilot, and Grok. Command Center shows the composite score slipped from 61 to 58 — Perplexity dropped nine points while every other platform held or gained.",
    mock: "radar",
  },
  {
    day: "MON",
    time: "9:30 AM",
    module: "Brand Pulse",
    title: "Triage what changed",
    body: "Two alerts are waiting. Gemini is citing a pricing tier retired last quarter, and a Copilot answer credits a competitor's feature to your product. Each alert includes the exact answer text and the sources the engine cited.",
    mock: "pulse",
  },
  {
    day: "TUE",
    time: "11:15 AM",
    module: "GEO Optimizer",
    title: "Assign the fixes",
    body: "The Page Auditor traces the stale price to a comparison table AI engines still cite. That fix — plus two prompt-coverage gaps on the pricing page — goes to the content team as three scoped tasks.",
    mock: "fixes",
  },
  {
    day: "THU",
    time: "2:40 PM",
    module: "Answer Simulator",
    title: "Ship and verify",
    body: "Content publishes the corrected page through Publishing Center. Answer Simulator re-runs the affected buyer questions to confirm the engines now pull the updated source instead of the old table.",
  },
  {
    day: "FRI",
    time: "4:00 PM",
    module: "Reports",
    title: "The report writes itself",
    body: "One export covers the week: score trend, share of voice against three competitors from Competitor Watch, two alerts resolved, three fixes shipped. It reaches the VP's inbox before the weekend — and Monday's scan will confirm the recovery.",
    mock: "report",
  },
]

const RADAR_ROWS = [
  { name: "ChatGPT", score: 72, delta: "+2", down: false },
  { name: "Gemini", score: 64, delta: "+1", down: false },
  { name: "Claude", score: 61, delta: "0", down: false },
  { name: "Perplexity", score: 44, delta: "-9", down: true },
  { name: "Copilot", score: 58, delta: "+3", down: false },
  { name: "Grok", score: 39, delta: "+1", down: false },
]

/* ------------------------------------------------------------------ */
/* Timeline mock cards (dark-themed, pure JSX)                         */
/* ------------------------------------------------------------------ */

function RadarMock() {
  return (
    <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.04] p-4 md:p-5 max-w-xl">
      <div className="text-[10px] font-semibold tracking-[0.14em] uppercase text-white/40 mb-3.5">
        Weekly platform scores
      </div>
      <div className="space-y-2.5">
        {RADAR_ROWS.map((row) => (
          <div key={row.name} className="flex items-center gap-3">
            <span className="w-20 shrink-0 text-[11.5px] text-white/60">{row.name}</span>
            <div className="flex-1 h-1.5 rounded-full bg-white/8 overflow-hidden">
              <div
                className={`h-full rounded-full ${row.down ? "bg-amber-400" : "bg-indigo-400"}`}
                style={{ width: `${row.score}%` }}
              />
            </div>
            <span className="w-6 text-right text-[11.5px] font-medium text-white/80 tabular-nums">{row.score}</span>
            <span
              className={`w-7 text-right text-[11px] font-medium tabular-nums ${
                row.down ? "text-amber-400" : row.delta === "0" ? "text-white/35" : "text-emerald-400"
              }`}
            >
              {row.delta}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function PulseMock() {
  const alerts = [
    {
      label: "Gemini · Pricing accuracy",
      detail: "Cites a tier retired last quarter",
      severity: "High",
      severityClass: "bg-red-400/10 text-red-300 border-red-400/20",
    },
    {
      label: "Copilot · Misattribution",
      detail: "Credits a competitor feature to your product",
      severity: "Medium",
      severityClass: "bg-amber-400/10 text-amber-300 border-amber-400/20",
    },
  ]
  return (
    <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.04] p-4 md:p-5 max-w-xl space-y-2.5">
      {alerts.map((a) => (
        <div key={a.label} className="flex items-start gap-3 rounded-lg border border-white/8 bg-white/[0.03] px-3.5 py-3">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
          <div className="min-w-0 flex-1">
            <div className="text-[12.5px] font-medium text-white/85 truncate">{a.label}</div>
            <div className="text-[11.5px] text-white/45">{a.detail}</div>
          </div>
          <span className={`shrink-0 px-2 py-0.5 rounded-full border text-[10px] font-semibold ${a.severityClass}`}>
            {a.severity}
          </span>
        </div>
      ))}
    </div>
  )
}

function FixesMock() {
  const tasks = [
    { task: "Update pricing comparison table", status: "Done", statusClass: "text-emerald-400" },
    { task: "Add FAQ block for pricing-tier prompts", status: "In progress", statusClass: "text-indigo-300" },
    { task: "Fix product schema on /pricing", status: "Queued", statusClass: "text-white/40" },
  ]
  return (
    <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.04] p-4 md:p-5 max-w-xl space-y-2">
      {tasks.map((t) => (
        <div key={t.task} className="flex items-center gap-3 rounded-lg border border-white/8 bg-white/[0.03] px-3.5 py-2.5">
          <span
            className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
              t.status === "Done" ? "border-emerald-400/40 bg-emerald-400/10" : "border-white/15"
            }`}
          >
            {t.status === "Done" && <Check className="w-2.5 h-2.5 text-emerald-400" />}
          </span>
          <span className="flex-1 text-[12.5px] text-white/80">{t.task}</span>
          <span className={`text-[11px] font-medium ${t.statusClass}`}>{t.status}</span>
        </div>
      ))}
    </div>
  )
}

function ReportMock() {
  const stats = [
    { label: "Visibility score", value: "58" },
    { label: "Alerts resolved", value: "2 / 2" },
    { label: "Fixes shipped", value: "3" },
    { label: "Share of voice", value: "24%" },
  ]
  return (
    <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.04] p-4 md:p-5 max-w-xl">
      <div className="flex items-center justify-between mb-3.5">
        <span className="text-[10px] font-semibold tracking-[0.14em] uppercase text-white/40">
          Weekly executive summary
        </span>
        <span className="px-2 py-0.5 rounded-full border border-indigo-400/25 bg-indigo-500/15 text-[10px] font-semibold text-indigo-300">
          PDF export
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {stats.map((s) => (
          <div key={s.label} className="rounded-lg border border-white/8 bg-white/[0.03] px-3 py-2.5">
            <div className="text-base font-semibold text-white tabular-nums">{s.value}</div>
            <div className="text-[10.5px] text-white/45 leading-tight">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

const MOCKS = { radar: RadarMock, pulse: PulseMock, fixes: FixesMock, report: ReportMock } as const

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export function Content() {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title="Built for every team that owns brand visibility."
        gradientWords={["visibility"]}
        description="Marketing, SEO, agencies, SaaS — Citationly turns how ChatGPT, Gemini, Claude, Perplexity, Copilot, and Grok describe your brand into a number your team can move."
      />

      {/* ---------------- Section 1 · By team ---------------- */}
      <section className="py-20 md:py-24 bg-background">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-14">
            <div className="flex justify-center">
              <SectionLabel dark={false}>By team</SectionLabel>
            </div>
            <RevealText
              as="h2"
              text="Same platform, four different wins."
              gradientWords={["wins"]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-4"
            />
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
            >
              Citationly meets each team where its questions start — pipeline, rankings, client retainers, or category
              share of voice.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {TEAMS.map((card, i) => (
              <motion.div
                key={card.team}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.55, delay: (i % 2) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col rounded-[1.5rem] border border-black/5 bg-white p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_32px_-20px_rgba(91,91,255,0.18)]"
              >
                <div className="flex items-center gap-3.5 mb-5">
                  <div className="w-11 h-11 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center shrink-0">
                    <card.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground tracking-[-0.01em]">{card.team}</h3>
                </div>

                <p className="text-[15px] text-muted-foreground leading-relaxed mb-6">{card.problem}</p>

                <ul className="space-y-3 mb-7">
                  {card.outcomes.map((outcome) => (
                    <li key={outcome} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-indigo-500/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-indigo-600" />
                      </span>
                      <span className="text-sm text-foreground/80 leading-relaxed">{outcome}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex items-center justify-between gap-4 pt-5 border-t border-black/5">
                  <div className="flex items-baseline gap-2 min-w-0">
                    <AnimatedCounter
                      value={card.metric.value}
                      prefix={card.metric.prefix}
                      suffix={card.metric.suffix}
                      decimals={card.metric.decimals}
                      className="text-xl font-semibold text-indigo-600 tabular-nums"
                    />
                    <span className="text-[12.5px] text-muted-foreground leading-tight">{card.metric.label}</span>
                  </div>
                  <Link
                    href="/features"
                    className="group inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 shrink-0 hover:text-indigo-700 transition-colors"
                  >
                    Explore the platform
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Section 2 · By industry ---------------- */}
      <section className="py-20 md:py-24 bg-gradient-to-b from-background via-indigo-50/40 to-background">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-14">
            <div className="flex justify-center">
              <SectionLabel dark={false}>By industry</SectionLabel>
            </div>
            <RevealText
              as="h2"
              text="Credible in the industries where answers carry weight."
              gradientWords={["weight"]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-4"
            />
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
            >
              In regulated and high-trust categories, a wrong AI answer costs more than a lost click. Citationly is
              built to find those answers first.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {INDUSTRIES.map((card, i) => (
              <motion.div
                key={card.industry}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.55, delay: (i % 2) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-2xl border border-black/5 bg-white p-7 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100">
                    <card.icon className="w-[18px] h-[18px]" />
                  </div>
                  <h3 className="text-base font-semibold text-foreground tracking-[-0.01em]">{card.industry}</h3>
                </div>
                <p className="text-[14.5px] text-muted-foreground leading-relaxed mb-5">{card.desc}</p>
                <ul className="space-y-2.5">
                  {card.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2.5 text-[13.5px] text-foreground/75">
                      <span className="w-1 h-1 rounded-full bg-indigo-400 shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-9 flex items-start justify-center gap-2.5 text-[13px] text-muted-foreground max-w-2xl mx-auto text-left"
          >
            <ShieldCheck className="w-4 h-4 text-indigo-500/70 shrink-0 mt-0.5" />
            <span>
              Citationly monitors public AI answers and flags inaccuracies for your team to review. It complements your
              compliance and legal workflows — it does not replace them. See our{" "}
              <Link href="/security" className="text-indigo-600 hover:text-indigo-700 underline underline-offset-2">
                security overview
              </Link>{" "}
              for how we handle your data.
            </span>
          </motion.p>
        </div>
      </section>

      {/* ---------------- Section 3 · A week in the life ---------------- */}
      <section className="py-20 md:py-24 bg-background">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-[2rem] bg-[#050508] px-6 py-14 md:px-14 md:py-20"
          >
            {/* Quiet aurora accents, consistent with CtaBand */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(45% 50% at 15% 0%, rgba(91,91,255,0.22), transparent 70%), radial-gradient(40% 45% at 90% 10%, rgba(168,85,247,0.14), transparent 70%)",
              }}
            />

            <div className="relative">
              <div className="text-center mb-14">
                <div className="flex justify-center">
                  <SectionLabel dark>A week in the life</SectionLabel>
                </div>
                <RevealText
                  as="h2"
                  text="From Monday's scan to Friday's report."
                  gradientWords={["report"]}
                  className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-white mb-4"
                />
                <motion.p
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.25 }}
                  className="text-white/55 text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
                >
                  How a marketing lead actually runs Citationly — one alert, one fix, one verified answer at a time.
                </motion.p>
              </div>

              <div className="max-w-3xl mx-auto">
                {WEEK.map((entry, i) => {
                  const Mock = entry.mock ? MOCKS[entry.mock] : null
                  const isLast = i === WEEK.length - 1
                  return (
                    <motion.div
                      key={`${entry.day}-${entry.time}`}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-6%" }}
                      transition={{ duration: 0.55, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                      className="flex gap-4 md:gap-7"
                    >
                      {/* Day + time */}
                      <div className="w-14 md:w-16 shrink-0 pt-1 text-right">
                        <div className="text-[11px] font-semibold tracking-[0.14em] text-white/70">{entry.day}</div>
                        <div className="text-[10.5px] text-white/35 mt-0.5 tabular-nums">{entry.time}</div>
                      </div>

                      {/* Rail */}
                      <div className="flex flex-col items-center shrink-0">
                        <div className="w-2.5 h-2.5 rounded-full bg-indigo-400 ring-4 ring-indigo-400/15 mt-[7px]" />
                        {!isLast && <div className="w-px flex-1 bg-white/10 mt-2" />}
                      </div>

                      {/* Content */}
                      <div className={`min-w-0 flex-1 ${isLast ? "pb-0" : "pb-12"}`}>
                        <div className="flex flex-wrap items-center gap-2.5 mb-2">
                          <h3 className="text-lg md:text-xl font-semibold text-white tracking-[-0.01em]">
                            {entry.title}
                          </h3>
                          <span className="px-2.5 py-1 rounded-full border border-indigo-400/20 bg-indigo-500/15 text-[11px] font-medium text-indigo-300">
                            {entry.module}
                          </span>
                        </div>
                        <p className="text-[15px] text-white/55 leading-relaxed max-w-xl">{entry.body}</p>
                        {Mock && <Mock />}
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---------------- Section 4 · Customer story ---------------- */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="flex justify-center">
            <SectionLabel dark={false}>Customer story</SectionLabel>
          </div>
          <motion.figure
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-[2rem] border border-black/5 bg-white p-8 md:p-12 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_24px_60px_-32px_rgba(91,91,255,0.28)]"
          >
            <div className="pointer-events-none absolute -top-20 -right-20 w-64 h-64 bg-indigo-500/8 rounded-full blur-3xl" />
            <Quote className="w-10 h-10 text-indigo-500/25 mb-6" />
            <blockquote className="text-xl md:text-2xl font-medium tracking-[-0.01em] leading-relaxed text-foreground/90 mb-8">
              &ldquo;The Monday scan is the first thing our growth standup looks at now. In week one it caught ChatGPT
              quoting an 18-month-old price — we fixed the source page, verified the corrected answer in the simulator,
              and watched it hold in the next scan. That single catch protected real pipeline.&rdquo;
            </blockquote>
            <figcaption className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-4 sm:justify-between">
              <div className="flex items-center gap-3.5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={TESTIMONIAL_PORTRAITS.p2}
                  alt="Marcus Webb"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="text-sm font-semibold text-foreground">Marcus Webb</div>
                  <div className="text-[12.5px] text-muted-foreground">Head of Growth, Fielder</div>
                </div>
              </div>
              <div className="flex items-baseline gap-2 sm:pl-6 sm:border-l sm:border-black/5">
                <span className="text-2xl font-semibold text-indigo-600">1 week</span>
                <span className="text-[12.5px] text-muted-foreground">From flagged to verified fix</span>
              </div>
            </figcaption>
          </motion.figure>
        </div>
      </section>

      <CtaBand
        title="Put your team on the Monday scan."
        description="Every plan starts with a real 7-day free trial. No credit card required."
      />
    </>
  )
}
