"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import {
  ArrowRight,
  Check,
  Compass,
  Layers,
  ListTree,
  Microscope,
  PieChart,
  Scale,
  ShieldCheck,
  Swords,
  TrendingUp,
  Workflow,
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
  desc: ReactNode
}

const CAPABILITIES: Capability[] = [
  {
    icon: PieChart,
    title: "Category Share Calculation",
    desc: "Your percentage of brand mentions across all tracked answers in your category, updated continuously. Gives leadership the single comparable number that turns AI search into a managed, budgeted channel.",
  },
  {
    icon: Swords,
    title: "Competitor Share Breakdown",
    desc: "The same calculation for every named competitor, shown side by side with yours. Position becomes relative and honest; a rising share means little if a rival is rising faster.",
  },
  {
    icon: Layers,
    title: "Per-Engine Share Views",
    desc: "Share of Voice split by engine, revealing where your position is strong and where it collapses. Optimization effort targets the engines where share is weakest and buyer usage is highest.",
  },
  {
    icon: ListTree,
    title: "Topic-Level Share",
    desc: "Share measured within individual topic and question clusters rather than only at category level. Shows which conversations you own and which you have ceded, at the granularity content planning needs.",
  },
  {
    icon: TrendingUp,
    title: "Share Trend History",
    desc: "Share movement over weeks and quarters, annotated with your content activity and detected competitor moves. Quarterly reporting shows trajectory and cause, not just a snapshot.",
  },
  {
    icon: Compass,
    title: "Unclaimed Share Detection",
    desc: (
      <>
        The portion of category answers mentioning no tracked brand strongly, connected to{" "}
        <Link
          href="/features/brand-monitoring"
          className="text-indigo-300 hover:text-indigo-200 underline underline-offset-2 decoration-indigo-400/40"
        >
          brand monitoring data
        </Link>
        . Reveals the cheapest share to win: conversations where no one has established presence yet.
      </>
    ),
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
    title: "Your category gets defined.",
    desc: "Brand, competitors, and the topic clusters that constitute your market are set.",
  },
  {
    step: "Step 2",
    title: "Answers accumulate continuously.",
    desc: (
      <>
        Every scan across six engines records all brand mentions using consistent{" "}
        <Link
          href="/features/ai-search-analytics"
          className="text-indigo-600 hover:text-indigo-700 underline underline-offset-2 decoration-indigo-300/60"
        >
          AI search analytics methodology
        </Link>
        .
      </>
    ),
  },
  {
    step: "Step 3",
    title: "Shares are computed.",
    desc: "Mentions aggregate into category, engine, and topic-level percentages for every tracked brand.",
  },
  {
    step: "Step 4",
    title: "Movement gets explained.",
    desc: "Share shifts link to the underlying questions and answers that caused them.",
  },
  {
    step: "Step 5",
    title: "The number enters your reporting.",
    desc: (
      <>
        <Link
          href="/features/reports"
          className="text-indigo-600 hover:text-indigo-700 underline underline-offset-2 decoration-indigo-300/60"
        >
          Reporting and exports
        </Link>{" "}
        carry Share of Voice into dashboards, ready for the meetings where budgets are decided.
      </>
    ),
  },
]

interface Benefit {
  title: string
  desc: string
}

const BENEFITS: Benefit[] = [
  {
    title: "AI search earns a budget line",
    desc: "Channels with a trusted headline metric get sustained investment; channels without one get pilots.",
  },
  {
    title: "Goals become settable",
    desc: "“Grow share from 14 to 20 percent in two quarters” is a target a team can own and a leader can fund.",
  },
  {
    title: "Competitive drift gets caught",
    desc: "A slow share decline is invisible in raw counts and unmissable in a percentage.",
  },
  {
    title: "Cross-team alignment improves",
    desc: "Content, SEO, and brand teams pulling on one shared number coordinate naturally.",
  },
  {
    title: "Board conversations get easier",
    desc: "Share of Voice needs no explanation in a boardroom; it is a language executives already speak.",
  },
]

interface WhyItem {
  icon: LucideIcon
  title: string
  desc: string
}

const WHY_US: WhyItem[] = [
  {
    icon: ShieldCheck,
    title: "A number built on evidence",
    desc: "Every share point decomposes into real questions, engines, and answers, so the metric survives scrutiny from analysts and CFOs alike.",
  },
  {
    icon: Scale,
    title: "Consistent methodology across engines",
    desc: "Six engines, one measurement standard, which is what makes cross-engine comparison legitimate rather than misleading.",
  },
  {
    icon: Microscope,
    title: "Granularity when you need it",
    desc: "Category share for the board, topic share for the content team, engine share for the SEO team, all from one data foundation.",
  },
  {
    icon: Workflow,
    title: "Connected to cause and response",
    desc: "Share sits inside the platform that also explains movements and plans the counter, not in an isolated reporting tool.",
  },
]

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export function Content() {
  return (
    <div className="bg-background">
      <PageHero
        eyebrow="Share of Voice"
        title="One number that tells you if you are winning AI search"
        gradientWords={["winning"]}
        description="Share of Voice measures the percentage of AI answers in your category that mention your brand. Citationly calculates it per engine, per topic, and against every competitor you name."
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
              text="Executives ask one question. Most teams cannot answer it."
              gradientWords={["question"]}
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
              Every marketing leader eventually faces the same question from a board or CEO: how are we
              doing in AI search? Not a dashboard of raw mentions, not anecdotes about ChatGPT, but a
              single honest measure of position and trend.
            </p>
            <p>
              Raw counts cannot answer it. Knowing your brand appeared in two hundred answers last month
              means nothing without knowing how many answers there were and who filled the rest.{" "}
              <Link
                href="/features/ai-visibility-dashboard"
                className="text-indigo-600 hover:text-indigo-700 underline underline-offset-2 decoration-indigo-300/60"
              >
                AI visibility
              </Link>{" "}
              only becomes meaningful when it is expressed as a share: your portion of the conversation,
              against the whole of it.
            </p>
            <p>
              Marketing has solved this problem before. Share of Voice made advertising presence comparable
              decades ago, and it made social presence comparable after that. AI search needs the same
              normalizing metric, and until a team has it, every executive conversation about AI answers
              runs on impressions and hunches. Budget follows measurable channels. Unmeasured ones stay
              experiments forever.
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
              text="Share of Voice built for the answer layer"
              gradientWords={["answer"]}
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
                In AI search, Share of Voice is the percentage of relevant AI-generated answers that
                mention a brand, measured against the total set of answers in its category and compared
                with competitors.
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
                Citationly computes this continuously. Every scan across the six engines records which
                brands each answer mentioned. Aggregated over your category&apos;s question set, this
                produces your share, each competitor&apos;s share, and the unclaimed remainder, updated as
                engines change.
              </p>
              <p>
                The metric is deliberately simple on the surface and rigorous underneath. Because it is
                built on the same answer data that powers the platform&apos;s{" "}
                <Link
                  href="/features/competitor-intelligence"
                  className="text-indigo-600 hover:text-indigo-700 underline underline-offset-2 decoration-indigo-300/60"
                >
                  competitor intelligence
                </Link>
                , every share point traces back to specific questions, engines, and answers. When
                leadership asks why the number moved, your team can open the exact conversations behind
                the shift.
              </p>
              <p>
                That combination, a headline number executives trust with drill-down evidence analysts can
                defend, is what makes Share of Voice the reporting backbone of an AI search program.
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
                  text="Six ways to see your share."
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
              text="From category definition to boardroom number."
              gradientWords={["boardroom"]}
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
              text="What a trusted share number changes."
              gradientWords={["trusted"]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BENEFITS.map((benefit, i) => (
              <motion.div
                key={benefit.title}
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
              text="A share number that survives scrutiny."
              gradientWords={["scrutiny"]}
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
        title="Get your share number today"
        description="Run a free analysis and see your current Share of Voice against the competitors you name, per engine and per topic."
      />
    </div>
  )
}
