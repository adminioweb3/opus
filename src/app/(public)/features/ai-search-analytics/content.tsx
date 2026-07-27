"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import {
  ArrowRight,
  Check,
  ClipboardCheck,
  GitCompare,
  History,
  Layers,
  LayoutGrid,
  LineChart,
  Plug,
  Quote,
  ShieldCheck,
  SlidersHorizontal,
  type LucideIcon,
} from "lucide-react"
import { PageHero } from "@/components/features/public/PageHero"
import { CtaBand } from "@/components/features/public/CtaBand"
import { SectionLabel } from "@/components/features/landing/primitives/SectionLabel"
import { RevealText } from "@/components/features/landing/primitives/RevealText"

/* ------------------------------------------------------------------ */
/* Fixed content data                                                  */
/* ------------------------------------------------------------------ */

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

interface Capability {
  icon: LucideIcon
  title: string
  desc: string
}

const CAPABILITIES: Capability[] = [
  {
    icon: LayoutGrid,
    title: "Structured Answer Extraction",
    desc: "Every collected answer parsed into mentions, citations, sentiment, and topic entities under one methodology. Free-form engine output becomes analyzable data, the prerequisite for every other measurement.",
  },
  {
    icon: GitCompare,
    title: "Cross-Engine Normalization",
    desc: "Engine-specific answer formats reconciled into comparable metrics, despite each engine citing and phrasing differently. Cross-engine comparisons become legitimate, so resource decisions between engines rest on real equivalence.",
  },
  {
    icon: SlidersHorizontal,
    title: "Segmentation and Filtering",
    desc: "Analytics sliced by engine, topic, question type, competitor, time period, and geography where applicable. Teams answer their own specific questions instead of waiting on analyst requests for every cut.",
  },
  {
    icon: LineChart,
    title: "Trend and Anomaly Detection",
    desc: "Automated identification of meaningful shifts in mentions, citations, or sentiment against historical baselines. Signal separates from noise, so attention goes to changes that matter rather than daily fluctuation.",
  },
  {
    icon: Quote,
    title: "Citation Intelligence Integration",
    desc: "Citation-level data joined with mention analytics, connecting presence in answers to the sources driving it. Analytics explains cause, not just outcome, which is what turns measurement into strategy.",
  },
  {
    icon: History,
    title: "Historical Depth",
    desc: "The full answer dataset retained over time, so any metric can be recomputed or audited retrospectively. New questions get answered from existing history, and reported numbers can always be verified.",
  },
]

interface Step {
  step: string
  title: string
  desc: ReactNode
}

const HOW_IT_WORKS: Step[] = [
  {
    step: "Step 1",
    title: "Answers are collected at scale.",
    desc: "Continuous scans across six engines gather responses to your category's question set.",
  },
  {
    step: "Step 2",
    title: "Extraction runs on every answer.",
    desc: "Mentions, citations, sentiment, and topics are identified under one consistent standard.",
  },
  {
    step: "Step 3",
    title: "Data is normalized and joined.",
    desc: (
      <>
        Engine differences are reconciled, and answer data links to citation and{" "}
        <Link
          href="/features/competitor-intelligence"
          className="text-indigo-600 hover:text-indigo-700 underline underline-offset-2 decoration-indigo-300/60"
        >
          competitor records
        </Link>
        .
      </>
    ),
  },
  {
    step: "Step 4",
    title: "Metrics compute automatically.",
    desc: (
      <>
        <Link
          href="/features/ai-visibility-dashboard"
          className="text-indigo-600 hover:text-indigo-700 underline underline-offset-2 decoration-indigo-300/60"
        >
          AI visibility scores
        </Link>
        , shares, and trends derive from the governed dataset, not manual tallies.
      </>
    ),
  },
  {
    step: "Step 5",
    title: "Teams explore and export.",
    desc: (
      <>
        <Link
          href="/features/reports"
          className="text-indigo-600 hover:text-indigo-700 underline underline-offset-2 decoration-indigo-300/60"
        >
          Exports and reporting
        </Link>{" "}
        carry segmented views and scheduled queries wherever decisions happen.
      </>
    ),
  },
]

interface Benefit {
  title: ReactNode
  desc: string
}

const BENEFITS: Benefit[] = [
  {
    title: (
      <>
        <Link
          href="/generative-engine-optimization"
          className="text-indigo-600 hover:text-indigo-700 underline underline-offset-2 decoration-indigo-300/60"
        >
          AI search optimization
        </Link>{" "}
        becomes empirical
      </>
    ),
    desc: "Hypotheses about what earns presence get tested against measured outcomes, ending best-practice guesswork.",
  },
  {
    title: "Numbers reconcile",
    desc: "One data layer means the figure in the board deck matches the figure in the analyst's export, every time.",
  },
  {
    title: "Analysis compounds",
    desc: "A retained historical dataset means each quarter's questions get answered faster than the last.",
  },
  {
    title: "Skepticism gets answered",
    desc: "When methodology is consistent and auditable, the hardest stakeholders become the metric's defenders.",
  },
  {
    title: "The channel matures",
    desc: "Instrumentation is what turned web and paid into managed disciplines; it does the same for AI search.",
  },
]

interface WhyItem {
  icon: LucideIcon
  title: string
  desc: string
}

const WHY_US: WhyItem[] = [
  {
    icon: ClipboardCheck,
    title: "Methodology before dashboards",
    desc: "Many tools show charts; the question is what is underneath them. Citationly documents its extraction and normalization standards so your team can defend every number.",
  },
  {
    icon: Layers,
    title: "One layer, every module",
    desc: "Because the whole AI search platform runs on this foundation, insight in one module never contradicts another.",
  },
  {
    icon: Plug,
    title: "Built for your stack, not against it",
    desc: "Exports and integrations assume you have existing BI infrastructure and meet it where it is.",
  },
  {
    icon: ShieldCheck,
    title: "Depth that survives audits",
    desc: "Retained answer history and recomputable metrics satisfy the governance standards enterprises actually apply.",
  },
]

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export function Content() {
  return (
    <div className="bg-background">
      <PageHero
        eyebrow="AI Search Analytics"
        title="AI answers are unstructured noise. We make them data."
        gradientWords={["data"]}
        description="Citationly converts millions of AI engine responses into structured analytics: mentions, citations, sentiment, topics, and trends your team can segment, query, and build decisions on."
      >
        <Link
          href="/register"
          className="group h-12 px-7 rounded-full font-medium text-[15px] bg-foreground text-background inline-flex items-center gap-2 shadow-sm hover:shadow-md transition-shadow"
        >
          Start Free Analysis
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
        <Link
          href="/contact"
          className="h-12 px-7 rounded-full font-medium text-[15px] text-foreground border border-black/10 bg-white hover:bg-black/3 transition-colors inline-flex items-center gap-2"
        >
          Book a Demo
        </Link>
      </PageHero>

      {/* ---------------------------------------------------------- */}
      {/* Section 1 — The challenge                                    */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="max-w-2xl mx-auto text-center mb-10">
            <div className="flex justify-center">
              <SectionLabel dark={false}>The problem</SectionLabel>
            </div>
            <RevealText
              as="h2"
              text="A channel without analytics is a channel run on faith"
              gradientWords={["faith"]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="max-w-3xl mx-auto space-y-5 text-muted-foreground leading-relaxed text-[15px] md:text-base"
          >
            <p>
              Enterprise marketing runs on data infrastructure. Web has its analytics platforms, paid has
              its attribution stack, email has its engagement metrics. Then AI search arrived, and the
              infrastructure did not.
            </p>
            <p>
              The raw material is uniquely difficult. AI answers are free-form text, different on every
              engine, changing between identical queries, with no export, no API into what engines told
              your buyers, and no logs you can request. Teams attempting manual measurement discover the
              problem quickly: pasting prompts into six engines and screenshotting results does not scale
              past a demo, and it produces numbers no two analysts calculate the same way.
            </p>
            <p>
              The consequence is that AI SEO work proceeds without instrumentation. Content gets optimized
              on general best practices, results get judged on anecdotes, and nobody can say with
              confidence what worked. No other channel in the marketing stack would be allowed to operate
              this way.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 2 — The solution                                     */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="max-w-2xl mx-auto text-center mb-10">
            <div className="flex justify-center">
              <SectionLabel dark={false}>The solution</SectionLabel>
            </div>
            <RevealText
              as="h2"
              text="The analytics foundation under everything"
              gradientWords={["foundation"]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground"
            />
          </div>

          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="rounded-xl border border-indigo-200 bg-indigo-50/40 p-6 mb-8"
            >
              <span className="block text-[11px] font-semibold tracking-[0.14em] uppercase text-indigo-600 mb-2">
                Definition
              </span>
              <p className="text-lg md:text-xl text-foreground leading-relaxed font-medium">
                AI search analytics is the structured measurement of AI engine answers: extracting brand
                mentions, citations, sentiment, and topical context from generated responses and
                organizing them into consistent, queryable metrics over time.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-5 text-muted-foreground leading-relaxed text-[15px] md:text-base"
            >
              <p>
                This is the layer Citationly is built on. Every answer collected across the six engines
                passes through one extraction methodology that identifies the brands mentioned, the
                sources cited, the framing used, and the topic addressed. The output is a governed
                dataset, the same answer measured the same way regardless of engine, date, or analyst.
              </p>
              <p>
                Everything else in the platform stands on this foundation. Visibility scores,{" "}
                <Link
                  href="/features/share-of-voice"
                  className="text-indigo-600 hover:text-indigo-700 underline underline-offset-2 decoration-indigo-300/60"
                >
                  Share of Voice
                </Link>
                ,{" "}
                <Link
                  href="/features/citation-tracking"
                  className="text-indigo-600 hover:text-indigo-700 underline underline-offset-2 decoration-indigo-300/60"
                >
                  citation intelligence
                </Link>
                , competitor comparisons, and brand accuracy flags are all views into the same analytics
                layer, which is why numbers agree with each other across the platform instead of
                contradicting between modules.
              </p>
              <p>
                For enterprise teams, this consistency is the point. Analytics you cannot reconcile is
                analytics leadership eventually stops trusting.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 3 — Key capabilities (dark accent card)               */}
      {/* ---------------------------------------------------------- */}
      <section className="py-4 md:py-6">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="relative overflow-hidden rounded-[2rem] bg-[#050508] px-8 py-16 md:px-14 md:py-20"
          >
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(45% 55% at 15% 10%, rgba(91,91,255,0.22), transparent 70%), radial-gradient(40% 50% at 90% 20%, rgba(168,85,247,0.14), transparent 70%), radial-gradient(55% 60% at 50% 110%, rgba(59,130,246,0.10), transparent 70%)",
              }}
            />
            <div className="landing-noise" />

            <div className="relative">
              <div className="text-center mb-14">
                <div className="flex justify-center">
                  <SectionLabel>Key capabilities</SectionLabel>
                </div>
                <RevealText
                  as="h2"
                  text="Six ways raw answers become data."
                  className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-white"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
                {CAPABILITIES.map((cap, i) => (
                  <motion.div
                    key={cap.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: 0.1 + i * 0.08 }}
                    className="flex gap-5"
                  >
                    <div className="shrink-0 w-11 h-11 rounded-xl bg-indigo-500/15 border border-white/10 text-indigo-300 flex items-center justify-center">
                      <cap.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg mb-2">{cap.title}</h3>
                      <p className="text-white/55 text-[15px] leading-relaxed">{cap.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 4 — How it works                                     */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <div className="flex justify-center">
              <SectionLabel dark={false}>How it works</SectionLabel>
            </div>
            <RevealText
              as="h2"
              text="From raw answers to governed metrics."
              gradientWords={["governed"]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground"
            />
          </div>

          <div className="max-w-2xl mx-auto">
            {HOW_IT_WORKS.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.55, delay: 0.05 + i * 0.08 }}
                className="relative pl-12 pb-12 last:pb-0"
              >
                {i < HOW_IT_WORKS.length - 1 && (
                  <span className="absolute left-2.75 top-8 bottom-0 w-px bg-linear-to-b from-indigo-200 to-black/5" />
                )}
                <span className="absolute left-0 top-1 w-5.75 h-5.75 rounded-full bg-white border border-indigo-200 shadow-[0_1px_3px_rgba(91,91,255,0.15)] flex items-center justify-center">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      i === HOW_IT_WORKS.length - 1 ? "bg-indigo-500 animate-pulse" : "bg-indigo-400"
                    }`}
                  />
                </span>

                <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-indigo-600 mb-1.5">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-[15px] leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 5 — Business benefits                                */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24 bg-indigo-50/40 border-y border-black/5">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-14">
            <div className="flex justify-center">
              <SectionLabel dark={false}>Business benefits</SectionLabel>
            </div>
            <RevealText
              as="h2"
              text="What a governed dataset changes."
              gradientWords={["governed"]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BENEFITS.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.55, delay: (i % 3) * 0.08 + Math.floor(i / 3) * 0.05 }}
                className="rounded-2xl bg-white border border-black/5 shadow-[0_1px_3px_rgba(15,15,35,0.05)] p-6"
              >
                <div className="w-9 h-9 rounded-lg bg-indigo-500/10 text-indigo-600 flex items-center justify-center mb-4">
                  <Check className="w-4 h-4" />
                </div>
                <h3 className="font-semibold text-foreground mb-1.5">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 6 — Why Citationly                                   */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <div className="flex justify-center">
              <SectionLabel dark={false}>Why Citationly</SectionLabel>
            </div>
            <RevealText
              as="h2"
              text="Analytics that survive an audit."
              gradientWords={["audit"]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground"
            />
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            {WHY_US.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.1 + i * 0.1 }}
                className="flex gap-5"
              >
                <div className="shrink-0 w-11 h-11 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center">
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-foreground font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-[15px] leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Put real instrumentation under your AI search program"
        description="Run a free analysis and see your category's answer data structured, segmented, and measurable from the first scan."
      />
    </div>
  )
}
