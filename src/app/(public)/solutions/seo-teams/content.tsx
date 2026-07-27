"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  AlertTriangle,
  ArrowRight,
  EyeOff,
  Gauge,
  Layers,
  Search,
  TrendingDown,
  Wrench,
  type LucideIcon,
} from "lucide-react"
import { PageHero } from "@/components/features/public/PageHero"
import { CtaBand } from "@/components/features/public/CtaBand"
import { SectionLabel } from "@/components/features/landing/primitives/SectionLabel"
import { RevealText } from "@/components/features/landing/primitives/RevealText"
import { MagneticButton } from "@/components/features/landing/primitives/MagneticButton"

/* ------------------------------------------------------------------ */
/* Shared motion presets                                              */
/* ------------------------------------------------------------------ */

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

/* ------------------------------------------------------------------ */
/* Fixed content data                                                  */
/* ------------------------------------------------------------------ */

const CHALLENGES: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: TrendingDown,
    title: "Rank tracking measures a shrinking surface",
    desc: "The reporting stack is built around positions and clicks, while a growing share of queries resolve inside answers those tools cannot observe.",
  },
  {
    icon: AlertTriangle,
    title: "Optimization guidance is unverifiable folklore",
    desc: "GEO advice circulates faster than evidence; without observed citation data, your team cannot tell tested practice from confident guessing.",
  },
  {
    icon: EyeOff,
    title: "Question demand is invisible to keyword tools",
    desc: "Buyers phrase full questions to assistants, and keyword volume data neither captures those phrasings nor reveals which ones your content fails to answer.",
  },
  {
    icon: Gauge,
    title: "Zero-click loss has no counterweight metric",
    desc: "You can document the traffic AI answers absorb, but without citation measurement you cannot show what presence is earning back.",
  },
  {
    icon: Layers,
    title: "Six engines behave six ways",
    desc: "Each engine cites and formats differently and changes without notice.",
  },
  {
    icon: Wrench,
    title: "Technical work lacks an AI-side signal",
    desc: "Schema, entity cleanup, and structural improvements ship without any feedback on whether extraction and citation actually improved.",
  },
]

interface Benefit {
  title: string
  challenge: string
  solution: string
  outcome: string
}

const BENEFITS: Benefit[] = [
  {
    title: "A scoreboard for the new surface",
    challenge: "Unmeasurable answer presence.",
    solution: "Continuous citation and visibility tracking.",
    outcome: "AI search reported with the same rigor as rankings.",
  },
  {
    title: "Briefs built from citation gaps",
    challenge: "Guessing what to write.",
    solution: "Gap detection showing weakly-answered questions.",
    outcome: "A content roadmap targeting the lowest-resistance wins first.",
  },
  {
    title: "Tested practices, retired myths",
    challenge: "Unverifiable GEO folklore.",
    solution: "Measuring your own changes against citation outcomes.",
    outcome: "A playbook proven on your site.",
  },
  {
    title: "Question research beside keyword research",
    challenge: "Invisible question demand.",
    solution: "Observed buyer phrasings mapped to your coverage.",
    outcome: "Briefs that target rankings and extraction together.",
  },
  {
    title: "Validation for technical work",
    challenge: "Structured data and entity SEO shipping without feedback.",
    solution: "Citation movement tracked after implementation.",
    outcome: "Technical roadmaps defensible with results.",
  },
  {
    title: "Engine-level diagnosis",
    challenge: "Six engines behaving differently.",
    solution: "Per-engine citation and visibility breakdowns.",
    outcome: "Effort aimed at the engines where your buyers are and your presence lags.",
  },
]

const WORKFLOW: { title: string; desc: string }[] = [
  {
    title: "Audit",
    desc: "First scans establish citation and visibility baselines across your topic map, per engine.",
  },
  {
    title: "Prioritize",
    desc: "Citation gaps and competitor-held questions are ranked by commercial value and difficulty.",
  },
  {
    title: "Implement",
    desc: "Briefs carry extraction targets alongside ranking targets.",
  },
  {
    title: "Measure",
    desc: "Subsequent scans show citation and visibility movement per change.",
  },
  {
    title: "Systematize",
    desc: "Proven patterns become internal standards.",
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
        eyebrow="Solutions for SEO Teams"
        title="Your skills transfer. Your metrics do not."
        gradientWords={["metrics"]}
        description="Everything that made you good at SEO (understanding intent, building authority, structuring content) matters more than ever in AI search. What is missing is the scoreboard. Citationly gives SEO teams the citation and visibility data that rank trackers cannot see."
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
      {/* Section 1: Industry overview                                */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8 mb-10 max-w-4xl">
            <div className="shrink-0 w-14 h-14 rounded-2xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center">
              <Search className="w-6 h-6" />
            </div>
            <div>
              <SectionLabel dark={false}>Industry Overview</SectionLabel>
              <RevealText
                as="h2"
                text="The discipline is expanding, and SEO teams are best placed to own it"
                gradientWords={["expanding"]}
                className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] leading-[1.15] text-foreground"
              />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-5 text-muted-foreground leading-relaxed text-[15px] md:text-base max-w-3xl"
          >
            <p>
              Every few years the ground under SEO shifts, and the practitioners who investigate early end up
              owning the new territory. AI search is the current shift. What is already clear is that ranking
              signals and answer-selection signals overlap without matching.
            </p>
            <p>
              Engines choose sources for extraction and citation using criteria that reward directness, structural
              clarity, entity precision, and topical depth in ways position tracking never measured. A site can
              dominate page one and barely exist inside answers built from the same index.
            </p>
            <p>
              For SEO teams this is genuinely good news wrapped in a measurement problem. The required skills
              (semantic SEO, structured data, information architecture, content strategy) are the skills you
              already have. AI search optimization is not a new profession; it is your profession pointed at a
              new scoreboard.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 2: Business challenges                             */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24 bg-indigo-50/40 border-y border-black/5">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-14">
            <div className="flex justify-center">
              <SectionLabel dark={false}>Business Challenges</SectionLabel>
            </div>
            <RevealText
              as="h2"
              text="Where the old scoreboard stops counting"
              gradientWords={["counting"]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-4"
            />
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            >
              The same six problems show up once a team looks past the rank tracker.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CHALLENGES.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.55, delay: (i % 3) * 0.08 + Math.floor(i / 3) * 0.05, ease: EASE }}
                className="rounded-2xl bg-white border border-black/5 shadow-[0_1px_3px_rgba(15,15,35,0.05)] p-7"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 border border-indigo-100">
                  <item.icon className="w-[18px] h-[18px]" />
                </div>
                <h3 className="text-base font-semibold text-foreground tracking-[-0.01em] mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 3: How Citationly helps                             */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="max-w-3xl">
            <SectionLabel dark={false}>How Citationly Helps</SectionLabel>
            <RevealText
              as="h2"
              text="Observed engine behavior, not folklore"
              gradientWords={["folklore"]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-6"
            />
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="space-y-5 text-muted-foreground leading-relaxed text-[15px] md:text-base"
            >
              <p>
                Citationly gives SEO teams what the discipline has always run on: data instead of opinion. The
                platform continuously queries six engines with your market&apos;s real questions and structures
                every answer into AI search analytics: which pages earned citations, for which questions, on which
                engines, described in what context.
              </p>
              <p>
                Question research replaces keyword guesswork with the phrasings buyers actually use. Citation gap
                detection shows where engines currently answer from weak sources, which is where new content wins
                fastest.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 4: Key benefits                                     */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24 bg-indigo-50/40 border-y border-black/5">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-14">
            <div className="flex justify-center">
              <SectionLabel dark={false}>Key Benefits</SectionLabel>
            </div>
            <RevealText
              as="h2"
              text="What changes once behavior is observed"
              gradientWords={["observed"]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-4"
            />
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            >
              Each challenge above maps to a concrete shift once citation data exists.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BENEFITS.map((benefit, i) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.55, delay: (i % 3) * 0.08 + Math.floor(i / 3) * 0.05, ease: EASE }}
                className="rounded-2xl bg-white border border-black/5 shadow-[0_1px_3px_rgba(15,15,35,0.05)] p-6"
              >
                <h3 className="font-semibold text-foreground mb-4 leading-snug">{benefit.title}</h3>
                <div className="space-y-3">
                  <div>
                    <span className="block text-[10px] font-semibold tracking-[0.14em] uppercase text-amber-600/80 mb-1">
                      Challenge
                    </span>
                    <p className="text-[13.5px] text-muted-foreground leading-relaxed">{benefit.challenge}</p>
                  </div>
                  <div>
                    <span className="block text-[10px] font-semibold tracking-[0.14em] uppercase text-indigo-600/80 mb-1">
                      Solution
                    </span>
                    <p className="text-[13.5px] text-muted-foreground leading-relaxed">{benefit.solution}</p>
                  </div>
                  <div>
                    <span className="block text-[10px] font-semibold tracking-[0.14em] uppercase text-emerald-600/80 mb-1">
                      Outcome
                    </span>
                    <p className="text-[13.5px] text-muted-foreground leading-relaxed">{benefit.outcome}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 5: Relevant platform capabilities                   */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="max-w-3xl">
            <SectionLabel dark={false}>Platform Capabilities</SectionLabel>
            <RevealText
              as="h2"
              text="Built for the way SEO teams work"
              gradientWords={["work"]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-6"
            />
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-muted-foreground leading-relaxed text-[15px] md:text-base"
            >
              The features most relevant to SEO teams:{" "}
              <Link
                href="/features/citation-tracking"
                className="text-indigo-600 hover:text-indigo-700 underline underline-offset-2"
              >
                AI Citation Tracking
              </Link>{" "}
              as the daily working view: what earned references, what lost them, and why.{" "}
              <Link
                href="/features/ai-search-analytics"
                className="text-indigo-600 hover:text-indigo-700 underline underline-offset-2"
              >
                AI Search Analytics
              </Link>{" "}
              for segmentation by engine, topic, and question type. Optimization Recommendations for prioritized{" "}
              <Link
                href="/generative-engine-optimization"
                className="text-indigo-600 hover:text-indigo-700 underline underline-offset-2"
              >
                GEO
              </Link>{" "}
              and{" "}
              <Link
                href="/answer-engine-optimization"
                className="text-indigo-600 hover:text-indigo-700 underline underline-offset-2"
              >
                AEO
              </Link>{" "}
              actions. The{" "}
              <Link
                href="/features/ai-visibility-dashboard"
                className="text-indigo-600 hover:text-indigo-700 underline underline-offset-2"
              >
                AI Visibility Dashboard
              </Link>{" "}
              gives the roll-up view when reporting upward.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 6: Typical workflow                                 */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24 bg-indigo-50/40 border-y border-black/5">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-14">
            <div className="flex justify-center">
              <SectionLabel dark={false}>Typical Workflow</SectionLabel>
            </div>
            <RevealText
              as="h2"
              text="A workflow built on evidence, not folklore"
              gradientWords={["folklore"]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-4"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {WORKFLOW.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.55, delay: 0.08 + i * 0.1 }}
                className="rounded-2xl bg-white border border-black/5 shadow-[0_1px_3px_rgba(15,15,35,0.05)] p-6"
              >
                <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-600 flex items-center justify-center text-sm font-semibold mb-4">
                  {i + 1}
                </div>
                <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-[13.5px] text-muted-foreground leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 7: Business outcomes                                */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="max-w-3xl">
            <SectionLabel dark={false}>Business Outcomes</SectionLabel>
            <RevealText
              as="h2"
              text="What a measured backlog produces"
              gradientWords={["produces"]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-6"
            />
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-muted-foreground leading-relaxed text-[15px] md:text-base"
            >
              The backlog stops being speculative: every item traces to an observed gap or a measured competitor
              position. Content and technical work carry verifiable AI-side results. The team develops a tested,
              site-specific understanding of what actually earns citations in its category.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 8: Why Citationly (dark accent section)             */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
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

            <div className="relative text-center">
              <div className="flex justify-center">
                <SectionLabel>Why Citationly</SectionLabel>
              </div>
              <RevealText
                as="h2"
                text="Show me the data behind it"
                gradientWords={["data"]}
                className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-white mb-6"
              />
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="max-w-2xl mx-auto space-y-4 text-white/55 leading-relaxed"
              >
                <p>
                  SEO professionals evaluate tools the way they evaluate advice: show me the data behind it.
                  Citationly is built for that scrutiny.
                </p>
                <p>
                  Every metric decomposes to real answers from real engines, and methodology is documented rather
                  than mystified. The platform complements your rank tracking and crawling stack rather than
                  replacing it.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <CtaBand
        title="See what the engines are actually doing in your category"
        description="Run a free analysis and get your first citation baseline: what you earn today, what competitors take, and which gaps are open."
        primaryLabel="Start Free Analysis"
      />

      <div className="pb-20 md:pb-24 -mt-8 text-center">
        <Link
          href="/contact"
          className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
        >
          Talk to an Expert
        </Link>
      </div>
    </div>
  )
}
