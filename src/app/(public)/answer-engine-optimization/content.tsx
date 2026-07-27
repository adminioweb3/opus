"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  AlertTriangle,
  AlignLeft,
  ArrowRight,
  Book,
  Briefcase,
  Building2,
  Check,
  EyeOff,
  FileBadge,
  HeartPulse,
  Landmark,
  Lock,
  Megaphone,
  Search,
  ShoppingBag,
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
    title: "Retrieval",
    desc: "For a given question, the engine gathers candidate content, from live web retrieval, from indexed sources, or from training knowledge. Clean, crawlable, well-marked-up pages enter this candidate pool more reliably.",
  },
  {
    title: "Passage selection",
    desc: "The engine does not read pages the way people do. It hunts for the specific passage that resolves the question: a definition, a direct explanation, a set of steps, a comparison. Self-contained passages that make sense out of context are the ones that survive selection.",
  },
  {
    title: "Answer assembly",
    desc: "Selected passages are synthesized into a response. Content that is factual, unambiguous, and internally consistent transfers into the answer with minimal distortion. Vague or hedged writing gets dropped or, worse, paraphrased into something you did not say.",
  },
  {
    title: "Attribution",
    desc: "Engines that cite attach the source to the contribution. Attribution follows extraction: you get cited for the passage that was used, which is why owning the clearest version of an answer is the mechanism behind earning the citation for it.",
  },
]

interface ComparisonRow {
  dimension: string
  aeo: string
  geo: string
}

const COMPARISON_ROWS: ComparisonRow[] = [
  {
    dimension: "Works at the level of",
    aeo: "Individual passages, pages, and structure",
    geo: "Overall brand presence across answers",
  },
  {
    dimension: "Core question",
    aeo: "Can engines extract and quote this content?",
    geo: "Do engines mention and cite this brand?",
  },
  {
    dimension: "Primary output",
    aeo: "Quotable definitions, direct answers, clean structure",
    geo: "Citations, mentions, Share of Voice",
  },
  {
    dimension: "Typical owner",
    aeo: "Content and editorial teams",
    geo: "SEO and brand strategy teams",
  },
  {
    dimension: "Measured by",
    aeo: "Extraction and citation of specific pages",
    geo: "Brand-level visibility and share metrics",
  },
]

interface ProblemCard {
  icon: LucideIcon
  title: string
  desc: React.ReactNode
}

const PROBLEMS: ProblemCard[] = [
  {
    icon: Lock,
    title: "Good expertise, unquotable form",
    desc: "Organizations with genuine authority publish it in dense prose, gated PDFs, or hedge-heavy paragraphs that engines cannot lift, so shallower but cleaner sources get quoted instead.",
  },
  {
    icon: AlignLeft,
    title: "Answers that exist but never lead",
    desc: "Pages bury the direct answer under context, background, and preamble. Passage selection rarely digs, it takes the source that answers first.",
  },
  {
    icon: Book,
    title: "Definitions owned by others",
    desc: "Every category has core terms. If your pages never define them plainly, engines learn the definitions, and the associated authority, from whoever did.",
  },
  {
    icon: AlertTriangle,
    title: "Inconsistency across pages",
    desc: "When different pages state facts differently, engines either drop the claim or pick a version at random. Internal contradiction reads as unreliability to a synthesizing model.",
  },
  {
    icon: EyeOff,
    title: "Invisible results",
    desc: "Without measurement, teams cannot tell which content gets extracted and cited, so structural improvements never get validated.",
  },
]

interface Benefit {
  title: string
  desc: React.ReactNode
}

const BENEFITS: Benefit[] = [
  {
    title: "Extraction instead of absence",
    desc: "Your pages become the ones engines pull passages from, not the ones they pass over on the way to a cleaner source.",
  },
  {
    title: "Attribution that builds brand",
    desc: "Each citation carries your name into the answer, compounding recognition with every response engines assemble.",
  },
  {
    title: "Accuracy by design",
    desc: "When your content is the clearest source available, engines quote your facts instead of paraphrasing or borrowing someone else's.",
  },
  {
    title: "Definition ownership",
    desc: "Owning the plain-language definition of a core term makes your brand the reference point engines return to for it.",
  },
  {
    title: "Content ROI recovered",
    desc: "Existing pages start earning extraction and citation instead of sitting unread beneath a wall of preamble.",
  },
  {
    title: "Voice and assistant readiness",
    desc: "Content structured to be quotable also answers cleanly when read aloud by voice assistants and spoken interfaces.",
  },
  {
    title: "Durable advantage",
    desc: "Early citation history keeps compounding, since engines favor sources that have already proven reliable to quote.",
  },
]

interface Practice {
  title: string
  desc: React.ReactNode
}

const PRACTICES: Practice[] = [
  {
    title: "Lead with the answer",
    desc: "Put the direct answer in the first sentence of a section, then explain. Engines extract what resolves the question fastest.",
  },
  {
    title: "Write self-contained passages",
    desc: "Each paragraph should make sense without the paragraphs around it, since that is exactly how an engine lifts it.",
  },
  {
    title: "Define terms explicitly",
    desc: "State plain-language definitions for the core terms in your category instead of assuming readers already know them.",
  },
  {
    title: "Match question phrasing",
    desc: "Structure headings and answers around the actual questions buyers ask, not internal jargon or marketing language.",
  },
  {
    title: "Use structure that machines parse",
    desc: "Clear headings, short paragraphs, numbered steps, and defined terms make extraction reliable instead of accidental.",
  },
  {
    title: "Keep one version of every fact",
    desc: "State pricing, features, and claims identically across every page, since contradictions get dropped or guessed at.",
  },
  {
    title: "Add schema where it fits",
    desc: "Structured data such as FAQ and HowTo markup gives engines an explicit, machine-readable version of your answer.",
  },
  {
    title: "Validate with observation",
    desc: (
      <>
        Check which passages actually get extracted after publishing, then refine the ones that do not.{" "}
        <Link
          href="/features/citation-tracking"
          className="text-indigo-600 hover:text-indigo-700 underline underline-offset-2 transition-colors"
        >
          Citation intelligence
        </Link>{" "}
        turns that observation into a repeatable check.
      </>
    ),
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
    desc: "Applies AEO to campaign and product pages, restructuring key pages so the core value proposition reads as a direct, quotable answer rather than sitting buried in narrative copy.",
  },
  {
    icon: Search,
    team: "SEO teams",
    desc: "Extends content briefs with an extractability check, confirming each page states its main answer plainly enough for an engine to lift it before the piece ships.",
  },
  {
    icon: Briefcase,
    team: "Agencies",
    desc: "Packages AEO audits as a concrete diagnostic, showing prospects exactly which of their pages fail to produce a quotable answer, and why.",
  },
  {
    icon: HeartPulse,
    team: "Healthcare organizations",
    desc: "Applies AEO to patient-facing explainers, structuring clinically reviewed answers so engines quote vetted guidance instead of unverified forum content.",
  },
  {
    icon: Landmark,
    team: "Finance companies",
    desc: "Uses AEO to make regulatory and product explanations directly quotable, since engines answering compliance questions favor sources that state the answer plainly and precisely.",
  },
  {
    icon: ShoppingBag,
    team: "Retail brands",
    desc: "Applies AEO to product and buying-guide pages, making comparison facts and specifications quotable so engines cite them during pre-purchase research.",
  },
  {
    icon: Building2,
    team: "Enterprises",
    desc: "Coordinates AEO across business units so every division states shared facts, pricing tiers, product names, and definitions identically, preventing engines from citing conflicting internal sources.",
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
        title="Answer Engine Optimization: make your content quotable by machines"
        gradientWords={["quotable", "machines"]}
        description="Answer engines do not send visitors to read your pages. They extract, quote, and cite. Answer Engine Optimization is the discipline of structuring content so they extract it from you, correctly, with attribution."
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
      {/* Section 1 — What is AEO?                                     */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <SectionLabel dark={false}>Definitions</SectionLabel>
          <RevealText
            as="h2"
            text="What is Answer Engine Optimization?"
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
                <FileBadge className="w-3.5 h-3.5" />
              </span>
              <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-indigo-600">
                Definition
              </span>
            </div>
            <p className="text-foreground text-[15px] md:text-base leading-relaxed">
              Answer Engine Optimization (AEO) is the practice of structuring content so that answer engines,
              including AI assistants, chatbots, and answer-focused search features, can extract, quote, and cite it
              accurately when responding to user questions.
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
              The plain-language version: answer engines respond to questions with answers, not links. When a system
              like Perplexity, Copilot, or ChatGPT composes a response, it pulls specific passages, facts, and
              definitions from source content. AEO is the craft of writing and structuring your content so that your
              passages are the ones pulled, your definitions the ones repeated, and your brand the one attributed.
            </p>
            <p>
              AEO sits inside the broader family sometimes called LLM SEO: the adaptation of search practice to
              language-model-driven discovery. Where its sibling discipline{" "}
              <Link
                href="/generative-engine-optimization"
                className="font-medium text-indigo-600 hover:text-indigo-700 underline underline-offset-2 transition-colors"
              >
                GEO
              </Link>{" "}
              addresses overall brand presence across generative answers, AEO works at the level of the content
              itself, the sentence and section structure that determines whether a machine can lift your answer
              cleanly.
            </p>
            <p>
              A useful mental test: could an engine quote your page&apos;s answer to a specific question in two
              sentences without rewriting it? If yes, the content is AEO-ready. If the answer is buried, hedged, or
              scattered, the engine will quote someone else.
            </p>
          </motion.div>
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
              text="Why does AEO matter now?"
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
              The interface of search is becoming an answer box, and that concentrates the reward for being
              extractable.
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
              <h3 className="font-semibold text-foreground mb-2.5">Where the reward concentrates</h3>
              <p className="text-muted-foreground text-[15px] leading-relaxed">
                Assistants, voice interfaces, and AI-augmented search features all share one behavior: they respond
                with a synthesized answer and, at most, a small set of cited sources. The reader&apos;s attention
                never reaches a results page where position eight still gets discovered. In traditional search,
                adequate content could still rank and receive clicks. In answer-driven search, engines quote the
                single clearest source available per point, and adjacent content earns nothing. The gap between
                quotable and almost-quotable is the gap between presence and absence.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="rounded-2xl bg-white border border-black/5 shadow-[0_1px_3px_rgba(15,15,35,0.05)] p-7"
            >
              <h3 className="font-semibold text-foreground mb-2.5">Why timing compounds</h3>
              <p className="text-muted-foreground text-[15px] leading-relaxed">
                There is also a compounding effect that makes early AEO work within AI search optimization unusually
                durable. Content that answers cleanly gets cited, citation reinforces the source&apos;s authority
                signal, and reinforced authority makes the next citation more likely. Teams that structure content
                well now are training the engines on who to quote in their category.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 3 — How engines extract and cite (timeline)          */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <div className="flex justify-center">
              <SectionLabel dark={false}>How it works</SectionLabel>
            </div>
            <RevealText
              as="h2"
              text="How do answer engines extract and cite content?"
              gradientWords={["extract", "cite"]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-4"
            />
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-muted-foreground max-w-xl mx-auto"
            >
              Understanding AEO starts with understanding, at a working level, how answer engines turn source content
              into a response.
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
              The pattern across all four stages is the same: engines reward content that behaves like a good answer,
              not content that merely contains one.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 4 — AEO vs GEO (comparison table)                    */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24 bg-indigo-50/40 border-y border-black/5">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-12">
            <div className="flex justify-center">
              <SectionLabel dark={false}>AEO vs. GEO</SectionLabel>
            </div>
            <RevealText
              as="h2"
              text="How is AEO different from GEO?"
              gradientWords={["AEO", "GEO"]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-4"
            />
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
            >
              The two disciplines are complementary, and enterprise programs need both. The boundary is scope.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="overflow-x-auto rounded-xl border border-black/10 bg-white shadow-[0_1px_3px_rgba(15,15,35,0.05)]"
          >
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-indigo-50/70">
                  <th className="text-left font-semibold text-foreground px-5 py-3.5 border-b border-black/10">
                    Dimension
                  </th>
                  <th className="text-left font-semibold text-foreground px-5 py-3.5 border-b border-black/10">
                    Answer Engine Optimization
                  </th>
                  <th className="text-left font-semibold text-foreground px-5 py-3.5 border-b border-black/10">
                    Generative Engine Optimization
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, i) => (
                  <tr key={row.dimension} className={i % 2 === 1 ? "bg-black/[0.015]" : undefined}>
                    <td className="px-5 py-4 border-b border-black/5 font-medium text-foreground align-top">
                      {row.dimension}
                    </td>
                    <td className="px-5 py-4 border-b border-black/5 text-muted-foreground align-top">{row.aeo}</td>
                    <td className="px-5 py-4 border-b border-black/5 text-muted-foreground align-top">{row.geo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-7 text-sm text-muted-foreground max-w-2xl mx-auto text-center"
          >
            In practice, AEO is how individual pieces of content earn their place inside the brand-level outcomes GEO
            measures. Read the companion guide to{" "}
            <Link
              href="/generative-engine-optimization"
              className="font-medium text-indigo-600 hover:text-indigo-700 underline underline-offset-2 transition-colors"
            >
              Generative Engine Optimization
            </Link>{" "}
            for the brand-level view.
          </motion.p>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 5 — What goes wrong without AEO                      */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-14">
            <div className="flex justify-center">
              <SectionLabel dark={false}>The cost of waiting</SectionLabel>
            </div>
            <RevealText
              as="h2"
              text="What goes wrong without AEO?"
              gradientWords={["AEO"]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-4"
            />
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
            >
              Businesses that have not started AEO work tend to encounter the same problems, usually in this order.
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
      {/* Section 6 — How Citationly makes AEO measurable (dark)       */}
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
                  text="How Citationly.ai makes AEO measurable"
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
                  AEO is unusually testable: either engines quote your content or they do not. Citationly supplies
                  the test. The platform runs your market&apos;s questions through six engines continuously and
                  applies consistent{" "}
                  <Link
                    href="/features/ai-search-analytics"
                    className="text-indigo-300 hover:text-indigo-200 underline underline-offset-2 transition-colors"
                  >
                    AI search analytics
                  </Link>{" "}
                  to what comes back.
                </p>
                <p>
                  For AEO work specifically, this shows which questions your content currently answers in engine
                  responses, which pages earn extraction and attribution, and which questions get answered from
                  competitor or third-party passages instead.{" "}
                  <Link
                    href="/features/citation-tracking"
                    className="text-indigo-300 hover:text-indigo-200 underline underline-offset-2 transition-colors"
                  >
                    Citation intelligence
                  </Link>{" "}
                  goes a level deeper, revealing the structural patterns shared by content that wins references in
                  your category.
                </p>
                <p>
                  Question research completes the workflow. Instead of guessing which questions deserve direct
                  answers, teams see the actual phrasings buyers use, then structure content against real demand.
                  After publication, subsequent scans confirm whether the new structure earned the extraction it
                  targeted. Structure, publish, measure, refine: AEO becomes an iterating practice instead of a style
                  preference.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 7 — What effective AEO delivers                      */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-14">
            <div className="flex justify-center">
              <SectionLabel dark={false}>The payoff</SectionLabel>
            </div>
            <RevealText
              as="h2"
              text="What effective AEO delivers"
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
      {/* Section 8 — How to practice AEO well                         */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24 bg-indigo-50/40 border-y border-black/5">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-14">
            <div className="flex justify-center">
              <SectionLabel dark={false}>The playbook</SectionLabel>
            </div>
            <RevealText
              as="h2"
              text="How to practice AEO well"
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
              Eight practices that separate content engines quote from content engines skip.
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
      {/* Section 9 — How different teams apply AEO                    */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-14">
            <div className="flex justify-center">
              <SectionLabel dark={false}>By team</SectionLabel>
            </div>
            <RevealText
              as="h2"
              text="How different teams apply AEO"
              gradientWords={["AEO"]}
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
      {/* Section 10 — Why teams practice AEO with Citationly          */}
      {/* ---------------------------------------------------------- */}
      <section className="pt-20 md:pt-24 pb-4">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-10">
            <div className="flex justify-center">
              <SectionLabel dark={false}>Why Citationly</SectionLabel>
            </div>
            <RevealText
              as="h2"
              text="Why teams practice AEO with Citationly"
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
                Structure advice without measurement is just formatting preference. Citationly grounds AEO in
                evidence: which questions matter in your market, which passages engines actually extract, which
                structural patterns win citations in your category, and whether your restructuring work changed the
                outcome.
              </p>
              <p>
                Because AEO measurement shares one platform with brand-level visibility,{" "}
                <Link
                  href="/features/share-of-voice"
                  className="text-indigo-600 hover:text-indigo-700 underline underline-offset-2 transition-colors"
                >
                  Share of Voice
                </Link>
                , and{" "}
                <Link
                  href="/features/competitor-intelligence"
                  className="text-indigo-600 hover:text-indigo-700 underline underline-offset-2 transition-colors"
                >
                  competitive tracking
                </Link>
                , page-level wins roll up into the channel-level story leadership needs.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <CtaBand
        title="Find out what engines already quote, and what they should"
        description="Run a free analysis and see which questions in your category your content currently answers inside AI responses, and where engines quote someone else."
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
