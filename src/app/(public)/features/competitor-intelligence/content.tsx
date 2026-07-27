"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Activity,
  ArrowRight,
  BarChart3,
  Compass,
  Eye,
  FileSearch,
  Gauge,
  Handshake,
  Layers,
  ListChecks,
  ShieldCheck,
  Swords,
  Target,
  Users,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react"
import { PageHero } from "@/components/features/public/PageHero"
import { CtaBand } from "@/components/features/public/CtaBand"
import { SectionLabel } from "@/components/features/landing/primitives/SectionLabel"
import { RevealText } from "@/components/features/landing/primitives/RevealText"
import { MagneticButton } from "@/components/features/landing/primitives/MagneticButton"

/* ------------------------------------------------------------------ */
/* Fixed content data                                                  */
/* ------------------------------------------------------------------ */

const CAPABILITIES: { icon: LucideIcon; title: string; desc: React.ReactNode }[] = [
  {
    icon: Swords,
    title: "Head-to-Head Visibility Comparison",
    desc: (
      <>
        Your{" "}
        <Link href="/features/ai-visibility-dashboard" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors">
          visibility
        </Link>{" "}
        placed directly against each named competitor, per engine, per topic, over time. Competitive position
        stops being a feeling and becomes a tracked score leadership can act on.
      </>
    ),
  },
  {
    icon: ListChecks,
    title: "Question-Level Win/Loss Mapping",
    desc: "For every tracked question, a record of which brands the engines named and which they left out. Shows the exact conversations where buyers hear competitors instead of you, prioritized by commercial relevance.",
  },
  {
    icon: FileSearch,
    title: "Competitor Citation Analysis",
    desc: (
      <>
        The specific pages earning rivals their{" "}
        <Link href="/features/citation-tracking" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors">
          citations
        </Link>
        , with the structural patterns those pages share. Converts a competitor&apos;s success into a
        reproducible blueprint rather than an unexplained lead.
      </>
    ),
  },
  {
    icon: Users,
    title: "Positioning Comparison",
    desc: "How engines describe each competitor: the strengths, use cases, and audiences engines associate with them versus you. Reveals whether your intended differentiation survives translation into AI answers.",
  },
  {
    icon: Activity,
    title: "Movement Detection",
    desc: "Alerts when a competitor's visibility, citations, or described positioning shifts meaningfully. Rival gains get a response measured in weeks, before compounding turns a move into a moat.",
  },
  {
    icon: Compass,
    title: "White Space Identification",
    desc: "Questions and topics where no competitor holds strong visibility or citations. Directs investment toward uncontested ground, where the cost of winning is lowest.",
  },
]

const HOW_IT_WORKS: { step: string; title: string; desc: React.ReactNode }[] = [
  {
    step: "01",
    title: "Your competitive set gets defined",
    desc: "Direct rivals, emerging threats, and category adjacents are added for tracking.",
  },
  {
    step: "02",
    title: "Competitor monitoring runs alongside brand monitoring",
    desc: "Every scan records all tracked brands' appearances, not just yours.",
  },
  {
    step: "03",
    title: "The scoreboard assembles",
    desc: "Win/loss maps, visibility comparisons, and citation analyses update continuously.",
  },
  {
    step: "04",
    title: "Movements get flagged",
    desc: "Meaningful competitor gains and losses surface with the likely cause attached.",
  },
  {
    step: "05",
    title: "Intelligence becomes response",
    desc: (
      <>
        Findings route into content briefs and{" "}
        <Link href="/generative-engine-optimization" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors">
          optimization plans
        </Link>
        , and future scans measure whether your counter worked.
      </>
    ),
  },
]

const BUSINESS_BENEFITS: { icon: LucideIcon; title: string; desc: React.ReactNode }[] = [
  {
    icon: ShieldCheck,
    title: "Strategy grounds in evidence",
    desc: "Competitive responses target observed positions, not assumptions.",
  },
  {
    icon: Target,
    title: "Content investment sharpens",
    desc: "Budgets flow toward questions with the highest gap between commercial value and competitor strength.",
  },
  {
    icon: Handshake,
    title: "Sales teams get armed",
    desc: "Knowing how engines compare you to each rival lets teams preempt the framing buyers arrive with.",
  },
  {
    icon: Zap,
    title: "Early moves get rewarded",
    desc: "In a zero-sum answer layer, seeing competitor gains first is the difference between countering and chasing.",
  },
  {
    icon: BarChart3,
    title: "Leadership sees the market clearly",
    desc: (
      <>
        <Link href="/features/share-of-voice" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors">
          Share of Voice
        </Link>{" "}
        and win/loss data give executives a competitive picture no analyst deck could previously provide.
      </>
    ),
  },
]

const WHY_CITATIONLY: { icon: LucideIcon; title: string; desc: React.ReactNode }[] = [
  {
    icon: Layers,
    title: "Depth equal to self-monitoring",
    desc: (
      <>
        Competitors are tracked with the same methodology as your own{" "}
        <Link
          href="/features/brand-monitoring"
          className="font-medium text-indigo-300 hover:text-indigo-200 underline underline-offset-4 decoration-indigo-300/40 transition-colors"
        >
          brand monitoring
        </Link>
        .
      </>
    ),
  },
  {
    icon: Eye,
    title: "Explanation, not just observation",
    desc: "Every competitor gain links to the citations and content behind it.",
  },
  {
    icon: Workflow,
    title: "Integrated response path",
    desc: "Intelligence flows into the same platform that plans and measures your optimization work.",
  },
  {
    icon: Gauge,
    title: "Honest signal quality",
    desc: "Movement alerts fire on meaningful shifts, not noise.",
  },
]

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export function Content() {
  const router = useRouter()

  return (
    <div className="bg-background">
      <PageHero
        eyebrow="Competitor Intelligence"
        title="Every AI answer picks winners. Know when it is not you."
        gradientWords={["you"]}
        description="Citationly tracks your competitors across six AI engines, showing which questions they win, which sources earn them citations, and exactly where their visibility is vulnerable."
      >
        <MagneticButton
          onClick={() => router.push("/register")}
          className="group h-12 px-7 rounded-full font-medium text-[15px] text-white bg-linear-to-r from-indigo-600 via-indigo-500 to-violet-500 shadow-[0_10px_30px_-8px_rgba(91,91,255,0.5)] hover:shadow-[0_14px_40px_-8px_rgba(91,91,255,0.65)] transition-shadow inline-flex items-center gap-2"
        >
          Start Free Analysis
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </MagneticButton>
        <Link
          href="/contact"
          className="h-12 px-7 rounded-full font-medium text-[15px] text-foreground border border-black/10 bg-white/70 hover:bg-black/5 transition-colors inline-flex items-center gap-2"
        >
          Book a Demo
        </Link>
      </PageHero>

      {/* ---------------------------------------------------------- */}
      {/* Section 1 — The challenge                                    */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="flex justify-center">
              <SectionLabel dark={false}>The problem</SectionLabel>
            </div>
            <RevealText
              as="h2"
              text="Your competitors' AI strategy is invisible until it costs you"
              gradientWords={["you"]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-4"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-5 text-muted-foreground leading-relaxed text-[15px] md:text-base max-w-2xl mx-auto"
          >
            <p>
              When a buyer asks an AI engine to recommend vendors in your category, the answer names a
              handful of brands. Every name on that list took a place that could have been yours. Some
              competitors are there by accident. Increasingly, some are there by design, having quietly
              started optimizing for AI answers while the rest of the market watches rankings.
            </p>
            <p>
              Traditional competitive intelligence tools cannot detect this. You can see a rival&apos;s ad
              spend estimates, their backlink growth, their content cadence, but you cannot see that they now
              appear in four out of five comparison answers on Perplexity, or that their documentation became
              Gemini&apos;s default citation for your category&apos;s hardest questions. By the time their AI
              presence shows up in your win rates, they have months of compounding advantage.
            </p>
            <p>
              The uncomfortable truth about AI search is that it is zero sum in a way rankings never were. An
              answer mentions three brands, not ten blue links. Someone&apos;s gain is someone&apos;s absence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 2 — The solution (dark accent card)                  */}
      {/* ---------------------------------------------------------- */}
      <section className="py-4 md:py-6">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
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

            <div className="relative max-w-3xl mx-auto text-center">
              <div className="flex justify-center">
                <SectionLabel>The fix</SectionLabel>
              </div>
              <RevealText
                as="h2"
                text="Competitor intelligence built for the AI answer layer"
                className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-white mb-8"
              />

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-5 text-left text-white/55 leading-relaxed text-[15px] md:text-base"
              >
                <p>
                  Citationly monitors your named competitors with the same depth it monitors your own brand,
                  useful for in-house marketing teams and{" "}
                  <Link
                    href="/solutions/agencies"
                    className="font-medium text-indigo-300 hover:text-indigo-200 underline underline-offset-4 decoration-indigo-300/40 transition-colors"
                  >
                    agencies
                  </Link>{" "}
                  benchmarking clients against their category alike. Every question scanned across the six
                  engines records not just whether you appeared, but who appeared instead, how they were
                  described, and which of their pages earned the citation.
                </p>
                <p>
                  This produces AI competitor analysis that answers the questions competitive teams actually
                  ask. Which rivals dominate which topics? Is their position built on strong owned content or
                  on third-party coverage that could be displaced? Where are they gaining, and did the gain
                  follow something they published? Which questions does nobody own yet?
                </p>
                <p>
                  The strategic value is timing. AI competitor tracking reveals rival moves while they are
                  still recent enough to counter. A competitor winning citations on a topic this month is a
                  content brief for your team this quarter, not a mystery in next year&apos;s win-loss
                  analysis.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 3 — Key capabilities                                 */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24 bg-indigo-50/40 border-y border-black/5">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="flex justify-center">
              <SectionLabel dark={false}>Key capabilities</SectionLabel>
            </div>
            <RevealText
              as="h2"
              text="Six ways to see what your competitors are doing."
              gradientWords={["doing"]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-4"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CAPABILITIES.map((cap, i) => (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.55, delay: (i % 3) * 0.08 + Math.floor(i / 3) * 0.05 }}
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
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 4 — How it works (timeline)                          */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <div className="flex justify-center">
              <SectionLabel dark={false}>How it works</SectionLabel>
            </div>
            <RevealText
              as="h2"
              text="From tracked rivals to a working scoreboard."
              gradientWords={["scoreboard"]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-4"
            />
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-muted-foreground max-w-xl mx-auto"
            >
              Five steps, from defining the competitive set to measuring whether your response worked.
            </motion.p>
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
                {/* connector line */}
                {i < HOW_IT_WORKS.length - 1 && (
                  <span className="absolute left-2.75 top-8 bottom-0 w-px bg-linear-to-b from-indigo-200 to-black/5" />
                )}
                {/* node */}
                <span className="absolute left-0 top-1 w-5.75 h-5.75 rounded-full bg-white border border-indigo-200 shadow-[0_1px_3px_rgba(91,91,255,0.15)] flex items-center justify-center">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      i === HOW_IT_WORKS.length - 1 ? "bg-indigo-500 animate-pulse" : "bg-indigo-400"
                    }`}
                  />
                </span>

                <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-indigo-600 mb-1.5">
                  Step {item.step}
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
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="flex justify-center">
              <SectionLabel dark={false}>Business benefits</SectionLabel>
            </div>
            <RevealText
              as="h2"
              text="What changes when the market stops being a guess."
              gradientWords={["guess"]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-4"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BUSINESS_BENEFITS.map((benefit, i) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.55, delay: (i % 3) * 0.08 + Math.floor(i / 3) * 0.05 }}
                className="rounded-2xl bg-white border border-black/5 shadow-[0_1px_3px_rgba(15,15,35,0.05)] p-6"
              >
                <span className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center mb-4">
                  <benefit.icon className="w-4.5 h-4.5" />
                </span>
                <h3 className="text-[15px] font-semibold text-foreground mb-1.5">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 6 — Why Citationly (dark accent card)                */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
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
                  <SectionLabel>Why Citationly</SectionLabel>
                </div>
                <RevealText
                  as="h2"
                  text="Competitor intelligence with the same rigor as self-monitoring."
                  className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-white"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
                {WHY_CITATIONLY.map((value, i) => (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: 0.1 + i * 0.1 }}
                    className="flex gap-5"
                  >
                    <div className="shrink-0 w-11 h-11 rounded-xl bg-indigo-500/15 border border-white/10 text-indigo-300 flex items-center justify-center">
                      <value.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg mb-2">{value.title}</h3>
                      <p className="text-white/55 text-[15px] leading-relaxed">{value.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <CtaBand
        title="See the scoreboard your competitors hope you never check"
        description="Run a free analysis and get your first head-to-head comparison: which questions you win, which rivals take the rest, and where the open ground is."
      />
    </div>
  )
}
