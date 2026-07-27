"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  AlertTriangle,
  ArrowRight,
  Briefcase,
  Building2,
  Check,
  Compass,
  EyeOff,
  HeartPulse,
  Landmark,
  Megaphone,
  Quote,
  Search,
  ShieldOff,
  ShoppingBag,
  Wand2,
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

const STAGES: { title: string; desc: string }[] = [
  {
    title: "Discovery",
    desc: "Engines draw on two supplies of information: knowledge absorbed during model training, and content retrieved live from the web at question time. Perplexity and Copilot lean heavily on live retrieval, while others blend both. Content must be accessible and parseable to enter either supply.",
  },
  {
    title: "Evaluation",
    desc: "When composing an answer, the engine weighs candidate sources for relevance to the exact question, clarity of the information, apparent authority on the topic, and consistency with what other sources say. Content that answers the question directly and unambiguously is easier for a model to trust and reuse.",
  },
  {
    title: "Synthesis",
    desc: "The engine writes a single response, merging what its selected sources say. Brands get mentioned when sources associate them clearly with the topic. Citations get attached when a specific source contributed identifiably to the answer.",
  },
  {
    title: "Recommendation",
    desc: "For commercial questions, engines go further and name options: tools to consider, providers to compare. These selections reflect the accumulated association between a brand and a problem across everything the engine has seen.",
  },
]

interface ProblemCard {
  icon: LucideIcon
  title: string
  desc: React.ReactNode
}

const PROBLEMS: ProblemCard[] = [
  {
    icon: EyeOff,
    title: "Invisibility they cannot see",
    desc: "Absence from AI answers produces no error message. Pipeline softens, and the cause stays hidden because nothing measures the channel.",
  },
  {
    icon: Quote,
    title: "Citations going elsewhere",
    desc: "Engines answer category questions using third-party aggregators, outdated reviews, or competitor content, because nothing better structured exists to cite.",
  },
  {
    icon: AlertTriangle,
    title: "A story told wrong",
    desc: (
      <>
        Without strong owned sources, engines assemble your{" "}
        <Link
          href="/features/brand-monitoring"
          className="text-indigo-600 hover:text-indigo-700 underline underline-offset-2 transition-colors"
        >
          brand description
        </Link>{" "}
        from whatever exists, and inaccuracies in pricing, features, or positioning circulate unchallenged.
      </>
    ),
  },
  {
    icon: ShieldOff,
    title: "Authority that does not transfer",
    desc: "Domain metrics and backlink profiles built for ranking algorithms do not automatically translate into the topical clarity engines reward.",
  },
  {
    icon: Compass,
    title: "Effort without feedback",
    desc: "Teams that do begin optimizing often work blind, publishing GEO-informed content with no measurement to confirm whether citations actually followed.",
  },
]

interface Benefit {
  title: string
  desc: React.ReactNode
}

const BENEFITS: Benefit[] = [
  {
    title: "Presence where decisions form",
    desc: "Your brand appears in the answers buyers now treat as shortlists.",
  },
  {
    title: "Citations that compound",
    desc: "Earned references make future references more likely, building an advantage that accumulates rather than resets.",
  },
  {
    title: "Accurate representation",
    desc: (
      <>
        Strong owned sources give engines correct material to draw from, reducing{" "}
        <Link
          href="/features/brand-monitoring"
          className="text-indigo-600 hover:text-indigo-700 underline underline-offset-2 transition-colors"
        >
          misinformation
        </Link>{" "}
        at its origin.
      </>
    ),
  },
  {
    title: "Traffic quality over quantity",
    desc: "Visitors arriving from cited answers come pre-qualified by the context the answer provided.",
  },
  {
    title: "Authority that machines recognize",
    desc: "Consistent topical association makes your brand the default entity engines connect to your problem space.",
  },
  {
    title: "Early position in a young channel",
    desc: "Baselines and citation ground established now are cheaper than they will ever be again.",
  },
  {
    title: "Insulation from click decline",
    desc: "As answers absorb clicks, presence inside the answer replaces traffic you would otherwise lose entirely.",
  },
]

interface Practice {
  title: string
  desc: React.ReactNode
}

const PRACTICES: Practice[] = [
  {
    title: "Answer real questions directly",
    desc: "Lead sections with the answer, then elaborate. Engines extract from content that resolves the question quickly.",
  },
  {
    title: "Structure for machine reading",
    desc: "Use clear headings, short paragraphs, defined terms, and a logical hierarchy. If a model cannot cleanly extract your point, it cites someone whose point it can.",
  },
  {
    title: "Be entity-explicit",
    desc: "Name your brand, products, and their relationships plainly. Engines associate entities, and ambiguity breaks the association.",
  },
  {
    title: "Build topical depth, not scattered coverage",
    desc: "Engines favor sources with demonstrated authority across a topic cluster. Depth on your core themes beats breadth across everything.",
  },
  {
    title: "Keep critical facts current",
    desc: "Pricing, features, and availability pages deserve maintenance discipline, since stale facts become stale answers.",
  },
  {
    title: "Study what gets cited",
    desc: (
      <>
        The observable patterns in cited content are the best curriculum available.{" "}
        <Link
          href="/features/citation-tracking"
          className="text-indigo-600 hover:text-indigo-700 underline underline-offset-2 transition-colors"
        >
          Citation tracking
        </Link>{" "}
        turns those patterns into an editorial playbook.
      </>
    ),
  },
  {
    title: "Measure before and after everything",
    desc: "Every GEO initiative should have a baseline and a follow-up scan. Without both, results are opinions.",
  },
]

interface TeamApplication {
  icon: LucideIcon
  team: string
  desc: string
}

const TEAM_APPLICATIONS: TeamApplication[] = [
  {
    icon: Megaphone,
    team: "Marketing teams",
    desc: "Applies GEO to campaign planning, checking before launch whether engines associate the brand with the campaign's core theme, and building supporting content where the association is weak.",
  },
  {
    icon: Search,
    team: "SEO teams",
    desc: "Extends existing content briefs with citation requirements, so each piece targets rankings and references together rather than treating GEO as a separate workstream.",
  },
  {
    icon: Briefcase,
    team: "Agencies",
    desc: "Packages GEO audits as an entry service, using a prospect's citation gaps as the concrete, evidenced opening for a broader engagement.",
  },
  {
    icon: HeartPulse,
    team: "Healthcare organizations",
    desc: "Applies GEO to patient education content, working to make clinically reviewed material the source engines cite instead of unvetted health sites.",
  },
  {
    icon: Landmark,
    team: "Finance companies",
    desc: "Focuses GEO on explainer content for complex products, since engines answering “how does X work” questions cite the clearest authoritative explanation available.",
  },
  {
    icon: ShoppingBag,
    team: "Retail brands",
    desc: "Applies GEO to category expertise content, earning the citations behind “best type of product for need” answers that shape purchases before brand comparison begins.",
  },
  {
    icon: Building2,
    team: "Enterprises",
    desc: "Coordinates GEO across business units, ensuring engines describe the parent brand and its divisions consistently rather than assembling conflicting stories from fragmented content.",
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
        eyebrow="Guide"
        title="Generative Engine Optimization: earn your place in AI answers"
        gradientWords={["AI", "answers"]}
        description="AI engines now answer your buyers' questions directly, citing the sources they trust. Generative Engine Optimization is the discipline of becoming one of those sources. This guide explains how it works and how to start."
        wide
      >
        <MagneticButton
          onClick={() => router.push("/register")}
          className="group h-12 px-7 rounded-full font-medium text-[15px] text-white bg-linear-to-r from-indigo-600 via-indigo-500 to-violet-500 shadow-[0_10px_30px_-8px_rgba(91,91,255,0.5)] hover:shadow-[0_14px_40px_-8px_rgba(91,91,255,0.65)] transition-shadow inline-flex items-center gap-2"
        >
          Start Free Analysis
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </MagneticButton>
        <MagneticButton
          onClick={() => router.push("/contact")}
          className="h-12 px-7 rounded-full font-medium text-[15px] text-foreground border border-black/10 bg-white/70 hover:bg-black/5 transition-colors inline-flex items-center"
        >
          Book a Demo
        </MagneticButton>
      </PageHero>

      {/* Trust line */}
      <div className="pb-16 md:pb-20 -mt-4 text-center px-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-[13px] text-muted-foreground/70"
        >
          Written by the team behind an AI Search Intelligence Platform monitoring six major engines.
        </motion.p>
      </div>

      {/* ---------------------------------------------------------- */}
      {/* Section 1 — What is GEO?                                     */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <SectionLabel dark={false}>Definitions</SectionLabel>
          <RevealText
            as="h2"
            text="What is Generative Engine Optimization?"
            gradientWords={["Optimization"]}
            className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-7"
          />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-xl border border-indigo-200 bg-indigo-50/40 p-6 mb-8"
          >
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-600 flex items-center justify-center shrink-0">
                <Wand2 className="w-3.5 h-3.5" />
              </span>
              <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-indigo-600">
                Definition
              </span>
            </div>
            <p className="text-foreground text-[15px] md:text-base leading-relaxed">
              Generative Engine Optimization (GEO) is the practice of improving how a brand appears in answers
              produced by generative AI engines such as ChatGPT, Gemini, Claude, Perplexity, Microsoft Copilot, and
              Grok. It focuses on earning citations, mentions, and accurate representation inside AI-generated
              responses.
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
              In plain language: when someone asks an AI engine a question in your market, the engine composes an
              answer from sources it has learned from or retrieved. GEO is the work of making your content one of the
              sources it selects, your brand one of the names it mentions, and your positioning the version of your
              story it retells.
            </p>
            <p>
              You may also encounter the terms AI SEO and LLM SEO. They describe overlapping territory: adapting
              search practice to a world where Large Language Models produce the results. GEO is the most precise of
              these terms, because it names the actual target, the generative engine, rather than borrowing the
              vocabulary of the previous era.
            </p>
            <p>
              The critical difference from traditional SEO is the shape of success. Rankings offered ten positions on
              a page. A generated answer mentions perhaps two or three brands and cites a handful of sources. There
              is no page two. Presence is closer to binary, which makes the discipline of earning it more
              consequential.
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-7 text-sm text-muted-foreground"
          >
            Read the companion guide on{" "}
            <Link
              href="/answer-engine-optimization"
              className="font-medium text-indigo-600 hover:text-indigo-700 underline underline-offset-2 transition-colors"
            >
              Answer Engine Optimization
            </Link>
            .
          </motion.p>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 2 — Why now                                          */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24 bg-indigo-50/40 border-y border-black/5">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-14">
            <div className="flex justify-center">
              <SectionLabel dark={false}>Why now</SectionLabel>
            </div>
            <RevealText
              as="h2"
              text="Why does GEO matter now?"
              gradientWords={["now"]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-4"
            />
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
            >
              Buying research is migrating from results pages to conversations. Instead of typing keywords and
              scanning links, people ask an assistant a full question and receive a synthesized answer. The
              behavioral shift is structural: an answer that feels complete removes the reason to click anything at
              all.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="rounded-2xl bg-white border border-black/5 shadow-[0_1px_3px_rgba(15,15,35,0.05)] p-7"
            >
              <h3 className="font-semibold text-foreground mb-2.5">Where discovery moved</h3>
              <p className="text-muted-foreground text-[15px] leading-relaxed">
                For businesses, this changes where discovery happens. A brand can hold strong rankings and still be
                absent from the AI answers built on top of the same web, because engines select and weight sources
                differently than ranking algorithms do. Teams that assume their SEO position carries over are
                frequently surprised by what measurement reveals.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="rounded-2xl bg-white border border-black/5 shadow-[0_1px_3px_rgba(15,15,35,0.05)] p-7"
            >
              <h3 className="font-semibold text-foreground mb-2.5">Why timing matters</h3>
              <p className="text-muted-foreground text-[15px] leading-relaxed">
                The timing argument is equally practical. AI search optimization is young enough that most categories
                have no entrenched winner in the answer layer. Sources that earn citations early tend to keep earning
                them, since engines return to references that have already proven reliable. The cost of establishing
                presence is lowest right now, and it rises as more competitors take the discipline seriously.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 3 — How AI engines choose (timeline)                 */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <div className="flex justify-center">
              <SectionLabel dark={false}>How it works</SectionLabel>
            </div>
            <RevealText
              as="h2"
              text="How do AI engines choose what to say?"
              gradientWords={["say"]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-4"
            />
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-muted-foreground max-w-xl mx-auto"
            >
              Understanding GEO starts with understanding, at a working level, how generative engines produce
              answers.
            </motion.p>
          </div>

          <div className="max-w-2xl mx-auto">
            {STAGES.map((stage, i) => (
              <motion.div
                key={stage.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.55, delay: 0.05 + i * 0.08 }}
                className="relative pl-16 pb-12 last:pb-0"
              >
                {/* connector line */}
                {i < STAGES.length - 1 && (
                  <span className="absolute left-4.5 top-10 bottom-0 w-px bg-linear-to-b from-indigo-200 to-black/5" />
                )}
                {/* numbered node */}
                <span className="absolute left-0 top-0 w-9 h-9 rounded-full bg-white border border-indigo-200 shadow-[0_1px_3px_rgba(91,91,255,0.15)] flex items-center justify-center text-sm font-semibold text-indigo-600">
                  {i + 1}
                </span>

                <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-indigo-600 mb-1.5">
                  Stage {i + 1}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{stage.title}</h3>
                <p className="text-muted-foreground text-[15px] leading-relaxed">{stage.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto mt-2 rounded-xl border-l-4 border-indigo-500 bg-indigo-50/40 pl-5 pr-6 py-4"
          >
            <p className="text-foreground text-[15px] leading-relaxed">
              No step involves a ranked list. Every step involves selection, which is why GEO practice concentrates on
              being selectable: clear, authoritative, well-structured, and consistently associated with your topics.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 4 — What goes wrong without GEO                      */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24 bg-indigo-50/40 border-y border-black/5">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-14">
            <div className="flex justify-center">
              <SectionLabel dark={false}>The cost of waiting</SectionLabel>
            </div>
            <RevealText
              as="h2"
              text="What goes wrong without GEO?"
              gradientWords={["GEO"]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-4"
            />
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
            >
              Businesses that have not started GEO work tend to encounter the same problems, usually in this order.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROBLEMS.map((problem, i) => (
              <motion.div
                key={problem.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.55, delay: (i % 3) * 0.08 + Math.floor(i / 3) * 0.05 }}
                className="rounded-2xl border border-black/5 bg-white p-6 shadow-[0_1px_3px_rgba(15,15,35,0.05)]"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center shrink-0">
                    <problem.icon className="w-4.5 h-4.5" />
                  </span>
                  <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-muted-foreground/60">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="text-[15px] font-semibold text-foreground mb-2">{problem.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{problem.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 5 — How Citationly makes GEO measurable (dark)       */}
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

            <div className="relative max-w-3xl mx-auto">
              <div className="text-center mb-10">
                <div className="flex justify-center">
                  <SectionLabel>The platform</SectionLabel>
                </div>
                <RevealText
                  as="h2"
                  text="How Citationly.ai makes GEO measurable"
                  gradientWords={["measurable"]}
                  className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-white"
                />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="space-y-5 text-white/55 leading-relaxed text-[15px] md:text-base"
              >
                <p>
                  GEO without measurement is guesswork, and measurement is the part no team can build by hand. This
                  is the problem Citationly exists to solve. The platform continuously runs your market&apos;s real
                  questions through six major engines and converts the answers into structured{" "}
                  <Link
                    href="/features/ai-search-analytics"
                    className="text-indigo-300 hover:text-indigo-200 underline underline-offset-2 transition-colors"
                  >
                    AI search analytics
                  </Link>
                  .
                </p>
                <p>
                  From that foundation, the GEO workflow becomes concrete.{" "}
                  <Link
                    href="/features/citation-tracking"
                    className="text-indigo-300 hover:text-indigo-200 underline underline-offset-2 transition-colors"
                  >
                    AI citation tracking
                  </Link>{" "}
                  shows which of your pages engines already cite and which{" "}
                  <Link
                    href="/features/competitor-intelligence"
                    className="text-indigo-300 hover:text-indigo-200 underline underline-offset-2 transition-colors"
                  >
                    competitor sources
                  </Link>{" "}
                  win instead.{" "}
                  <Link
                    href="/features/ai-visibility-dashboard"
                    className="text-indigo-300 hover:text-indigo-200 underline underline-offset-2 transition-colors"
                  >
                    Visibility
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/features/share-of-voice"
                    className="text-indigo-300 hover:text-indigo-200 underline underline-offset-2 transition-colors"
                  >
                    Share of Voice
                  </Link>{" "}
                  metrics establish your baseline and trend.{" "}
                  <Link
                    href="/features/competitor-intelligence"
                    className="text-indigo-300 hover:text-indigo-200 underline underline-offset-2 transition-colors"
                  >
                    Gap detection
                  </Link>{" "}
                  surfaces the questions where no strong source exists yet, which are the fastest opportunities in
                  any category.
                </p>
                <p>
                  Then the loop closes. When your team publishes or restructures content, subsequent scans show
                  whether citations and mentions actually moved. Practices that work become visible and repeatable.
                  Practices that do not get retired early. That feedback loop is the difference between doing GEO and
                  hoping about it.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 6 — What effective GEO delivers                      */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-14">
            <div className="flex justify-center">
              <SectionLabel dark={false}>The payoff</SectionLabel>
            </div>
            <RevealText
              as="h2"
              text="What effective GEO delivers"
              gradientWords={["delivers"]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-4"
            />
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-7">
            {BENEFITS.map((benefit, i) => (
              <motion.li
                key={benefit.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.5, delay: (i % 2) * 0.08 + Math.floor(i / 2) * 0.05 }}
                className="flex items-start gap-3.5"
              >
                <span className="w-6 h-6 rounded-full bg-indigo-500/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-indigo-600" />
                </span>
                <p className="text-[15px] leading-relaxed">
                  <span className="font-semibold text-foreground">{benefit.title}.</span>{" "}
                  <span className="text-muted-foreground">{benefit.desc}</span>
                </p>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 7 — How to practice GEO well                         */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24 bg-indigo-50/40 border-y border-black/5">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-14">
            <div className="flex justify-center">
              <SectionLabel dark={false}>The playbook</SectionLabel>
            </div>
            <RevealText
              as="h2"
              text="How to practice GEO well"
              gradientWords={["well"]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-4"
            />
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground leading-relaxed"
            >
              Seven practices that separate teams engines cite from teams engines skip.
            </motion.p>
          </div>

          <div className="space-y-4">
            {PRACTICES.map((practice, i) => (
              <motion.div
                key={practice.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.5, delay: 0.05 + i * 0.06 }}
                className="flex gap-4 rounded-xl border border-black/5 bg-white p-5 shadow-[0_1px_3px_rgba(15,15,35,0.05)]"
              >
                <span className="w-9 h-9 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 font-semibold text-sm flex items-center justify-center shrink-0">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="text-[15px] font-semibold text-foreground mb-1">{practice.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{practice.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 8 — How different teams apply GEO                    */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-14">
            <div className="flex justify-center">
              <SectionLabel dark={false}>By team</SectionLabel>
            </div>
            <RevealText
              as="h2"
              text="How different teams apply GEO"
              gradientWords={["GEO"]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-4"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TEAM_APPLICATIONS.map((item, i) => (
              <motion.div
                key={item.team}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.55, delay: (i % 3) * 0.08 + Math.floor(i / 3) * 0.05 }}
                className="rounded-2xl border border-black/5 bg-white p-7 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100">
                    <item.icon className="w-4.5 h-4.5" />
                  </div>
                  <h3 className="text-base font-semibold text-foreground tracking-[-0.01em]">{item.team}</h3>
                </div>
                <p className="text-[14.5px] text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 9 — Why teams practice GEO with Citationly           */}
      {/* ---------------------------------------------------------- */}
      <section className="pt-20 md:pt-24 pb-4">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-10">
            <div className="flex justify-center">
              <SectionLabel dark={false}>Why Citationly</SectionLabel>
            </div>
            <RevealText
              as="h2"
              text="Why teams practice GEO with Citationly"
              gradientWords={["Citationly"]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-[2rem] border border-indigo-100 bg-indigo-50/50 px-8 py-12 md:px-14"
          >
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(50% 70% at 50% -10%, rgba(91,91,255,0.10), transparent), radial-gradient(35% 50% at 90% 100%, rgba(168,85,247,0.07), transparent)",
              }}
            />
            <div className="relative text-muted-foreground leading-relaxed text-[15px] md:text-base space-y-5">
              <p>
                GEO advice is abundant. Evidence is scarce. Citationly&apos;s position is that the discipline should
                run on observed engine behavior, not recycled guidelines, and the platform is built to supply that
                evidence: what six engines actually cite, how answers actually describe your brand, and whether your
                work actually moved the numbers.
              </p>
              <p>
                Because measurement, diagnosis, and recommendations live in one AI search platform, GEO becomes an
                operating rhythm rather than a quarterly audit. And because every metric traces to real answers, the
                program you build holds up when leadership asks hard questions about what the investment returned.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <CtaBand
        title="Start your GEO program with a baseline"
        description="Run a free analysis and see where your brand stands in AI answers today: your citations, your visibility, and the gaps competitors have not claimed."
        primaryLabel="Start Free Analysis"
        secondaryLabel="Book a Demo"
      />

      <div className="pb-20 md:pb-24 -mt-14 text-center">
        <Link
          href="/features"
          className="group inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
        >
          Explore the Platform
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  )
}
