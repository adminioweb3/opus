"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Building2, HeartPulse, Landmark, ShoppingBag, type LucideIcon } from "lucide-react"
import { PageHero } from "@/components/features/public/PageHero"
import { CtaBand } from "@/components/features/public/CtaBand"
import { SectionLabel } from "@/components/features/landing/primitives/SectionLabel"
import { RevealText } from "@/components/features/landing/primitives/RevealText"
import { AnimatedCounter } from "@/components/features/landing/primitives/AnimatedCounter"

/* ------------------------------------------------------------------ */
/* Fixed content data                                                  */
/* ------------------------------------------------------------------ */

const LOGO_WALL: string[] = [
  "Northwind Cloud",
  "Fielder",
  "Larkspur Group",
  "Meridian Health",
  "Cascade Analytics",
  "Solace Payments",
  "Brightline Retail",
  "Halyard Systems",
  "Ledgerline Financial",
  "Outpost Commerce",
  "Vertex Capital",
  "Quill & Ives",
]

const STATS: {
  value: number
  suffix: string
  label: string
}[] = [
  { value: 1240, suffix: "+", label: "brands monitored across six AI platforms" },
  { value: 380, suffix: "K", label: "prompts tracked every week in Visibility Radar" },
  { value: 34, suffix: "%", label: "average visibility-score lift within two quarters" },
  { value: 58, suffix: "K+", label: "citations recovered through Citation Intelligence" },
]

const TESTIMONIALS: {
  initials: string
  name: string
  role: string
  company: string
  quote: string
  module: string
  gradient: string
}[] = [
  {
    initials: "EC",
    name: "Elena Cho",
    role: "VP Marketing",
    company: "Northwind Cloud",
    quote:
      "Visibility Radar gave us the first real trendline for AI presence. We watched our Perplexity score climb for eight straight weeks after we shipped the fixes it recommended — the board finally had a number to believe in.",
    module: "Visibility Radar",
    gradient: "from-indigo-500 to-violet-500",
  },
  {
    initials: "MB",
    name: "Marcus Bell",
    role: "Head of Growth",
    company: "Fielder",
    quote:
      "Opportunity Finder replaced a spreadsheet of guesses with a ranked list our team actually works through every sprint. We stopped debating what to fix and started shipping the highest-impact page first.",
    module: "Opportunity Finder",
    gradient: "from-violet-500 to-fuchsia-500",
  },
  {
    initials: "SM",
    name: "Sofia Marchetti",
    role: "Director of SEO",
    company: "Larkspur Group",
    quote:
      "Citation Intelligence showed us exactly which competitor pages ChatGPT was pulling from instead of ours. Closing three of those gaps moved more pipeline than a full quarter of link building.",
    module: "Citation Intelligence",
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    initials: "RC",
    name: "Renee Castellanos",
    role: "Director of Digital",
    company: "Meridian Health",
    quote:
      "In healthcare, an AI engine describing our services incorrectly isn't a nuisance, it's a compliance risk. Brand Pulse flags inaccurate answers the same day they appear, and that alone justified the platform.",
    module: "Brand Pulse",
    gradient: "from-rose-400 to-indigo-500",
  },
  {
    initials: "JL",
    name: "Jordan Lee",
    role: "VP Ecommerce",
    company: "Brightline Retail",
    quote:
      "The GEO Optimizer treats every product and category page like a page that needs to earn a citation. Prompt coverage went from guesswork to a checklist our content team can actually clear before launch.",
    module: "GEO Optimizer",
    gradient: "from-amber-400 to-indigo-500",
  },
  {
    initials: "AF",
    name: "Anika Fors",
    role: "Head of Content",
    company: "Ledgerline Financial",
    quote:
      "Answer Simulator lets us test how five AI engines answer a client question before we publish a single word. We rewrite the page when the simulated answer is wrong, not after a prospect quotes it back to us.",
    module: "Answer Simulator",
    gradient: "from-emerald-400 to-indigo-500",
  },
]

const INDUSTRIES: {
  icon: LucideIcon
  name: string
  desc: string
}[] = [
  {
    icon: Building2,
    name: "SaaS",
    desc: "Own the shortlist when buyers ask AI to compare platforms.",
  },
  {
    icon: HeartPulse,
    name: "Healthcare",
    desc: "Catch inaccurate AI answers before they become a compliance issue.",
  },
  {
    icon: Landmark,
    name: "Finance",
    desc: "Track how AI engines describe products, rates, and eligibility.",
  },
  {
    icon: ShoppingBag,
    name: "Retail",
    desc: "Win product and category citations across every answer engine.",
  },
]

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export function Content() {
  return (
    <div className="bg-background">
      <PageHero
        eyebrow="Customers"
        title="Teams that own their AI answers."
        gradientWords={["AI"]}
        description="Marketing, growth, and SEO teams at companies large and small run their AI visibility program on Citationly — from the first weekly scan to the board-ready report."
      />

      {/* ---------------------------------------------------------- */}
      {/* Section 1 — Logo wall                                        */}
      {/* ---------------------------------------------------------- */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-12">
            <div className="flex justify-center">
              <SectionLabel dark={false}>Trusted by</SectionLabel>
            </div>
            <RevealText
              as="h2"
              text="Growth teams who measure what AI says about them."
              gradientWords={["AI"]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground max-w-2xl mx-auto"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {LOGO_WALL.map((name, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.03 * i }}
                className="group flex items-center justify-center h-24 rounded-2xl bg-white border border-black/5 shadow-[0_1px_3px_rgba(15,15,35,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(91,91,255,0.12)] hover:border-indigo-100"
              >
                <span className="text-[15px] md:text-base font-semibold tracking-[-0.01em] text-foreground/40 grayscale transition-colors duration-300 group-hover:text-foreground/80">
                  {name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 2 — Stat band                                        */}
      {/* ---------------------------------------------------------- */}
      <section className="py-16 md:py-20 bg-indigo-50/40 border-y border-black/5">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.1 + i * 0.1 }}
                className="text-center"
              >
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  className="text-4xl md:text-5xl font-semibold tracking-[-0.02em] text-indigo-600"
                />
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-[15rem] mx-auto">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 3 — Testimonials                                     */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-14">
            <div className="flex justify-center">
              <SectionLabel dark={false}>In their words</SectionLabel>
            </div>
            <RevealText
              as="h2"
              text="One quote, one module, one measurable result."
              gradientWords={["measurable"]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-4"
            />
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-muted-foreground max-w-xl mx-auto"
            >
              Real teams, real product modules, real outcomes — no composite quotes.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.06 * i }}
                className="flex flex-col rounded-2xl bg-white border border-black/5 shadow-[0_1px_3px_rgba(15,15,35,0.05)] p-7"
              >
                <span className="inline-flex self-start items-center px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-[0.08em] uppercase bg-indigo-500/8 text-indigo-600 mb-5">
                  {t.module}
                </span>
                <p className="text-[15px] text-foreground/80 leading-relaxed mb-6 grow">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-5 border-t border-black/5">
                  <div
                    className={`w-11 h-11 shrink-0 rounded-full bg-linear-to-br ${t.gradient} flex items-center justify-center text-white font-semibold text-sm`}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm">{t.name}</div>
                    <div className="text-[13px] text-muted-foreground">
                      {t.role}, {t.company}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 4 — By the industry                                  */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24 bg-indigo-50/40 border-y border-black/5">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-14">
            <div className="flex justify-center">
              <SectionLabel dark={false}>By the industry</SectionLabel>
            </div>
            <RevealText
              as="h2"
              text="Built for how each industry gets asked about."
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground max-w-2xl mx-auto"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {INDUSTRIES.map((ind, i) => (
              <motion.div
                key={ind.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.08 * i }}
              >
                <Link
                  href="/solutions"
                  className="group flex flex-col h-full rounded-2xl bg-white border border-black/5 shadow-[0_1px_3px_rgba(15,15,35,0.05)] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(91,91,255,0.12)] hover:border-indigo-100"
                >
                  <div className="w-11 h-11 rounded-xl bg-indigo-500/8 text-indigo-600 flex items-center justify-center mb-5">
                    <ind.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{ind.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5 grow">{ind.desc}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600">
                    See solution
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 5 — Featured case study                              */}
      {/* ---------------------------------------------------------- */}
      <section className="pt-20 md:pt-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-[2rem] bg-[#050508] px-8 py-14 md:px-16 md:py-16"
          >
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(45% 60% at 15% 10%, rgba(91,91,255,0.28), transparent 70%), radial-gradient(40% 50% at 90% 25%, rgba(168,85,247,0.16), transparent 70%), radial-gradient(55% 60% at 55% 110%, rgba(59,130,246,0.12), transparent 70%)",
              }}
            />
            <div className="landing-noise" />

            <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 items-center">
              <div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold tracking-[0.14em] uppercase bg-white/5 border border-white/10 text-indigo-200 mb-5">
                  Featured case study
                </span>
                <h3 className="text-2xl md:text-3xl font-semibold tracking-[-0.02em] text-white mb-3 max-w-xl">
                  How Larkspur Group closed a 41-point visibility gap against its top competitor.
                </h3>
                <p className="text-white/55 max-w-xl leading-relaxed">
                  Citation Intelligence surfaced the exact sources ChatGPT and Perplexity were citing
                  instead of Larkspur Group. Six weeks after closing those gaps with the GEO Optimizer,
                  their average visibility score had overtaken the competitor for the first time.
                </p>
              </div>
              <Link
                href="/case-studies"
                className="group shrink-0 inline-flex items-center gap-2 h-12 px-7 rounded-full font-medium text-[15px] bg-white text-[#050508] shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_60px_rgba(255,255,255,0.25)] transition-shadow"
              >
                Read the case study
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <CtaBand />
    </div>
  )
}
