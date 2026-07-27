"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowRight,
  Brain,
  ChevronDown,
  Fingerprint,
  GraduationCap,
  Network,
  PenLine,
  Tag,
  TrendingUp,
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

interface Concept {
  icon: LucideIcon
  title: string
  desc: React.ReactNode
}

const CONCEPTS: Concept[] = [
  {
    icon: Wand2,
    title: "Generative Engine Optimization (GEO)",
    desc: (
      <>
        The practice of earning mentions and citations inside answers produced by generative AI engines. It is the
        discipline concerned with being selected as a source.{" "}
        <Link
          href="/generative-engine-optimization"
          className="font-medium text-indigo-600 hover:text-indigo-700 underline underline-offset-2 transition-colors"
        >
          Read the full guide
        </Link>
        .
      </>
    ),
  },
  {
    icon: Tag,
    title: "Answer Engine Optimization (AEO)",
    desc: (
      <>
        The practice of structuring content so answer engines can extract, quote, and reference it directly.{" "}
        <Link
          href="/answer-engine-optimization"
          className="font-medium text-indigo-600 hover:text-indigo-700 underline underline-offset-2 transition-colors"
        >
          Read the full guide
        </Link>
        .
      </>
    ),
  },
  {
    icon: Fingerprint,
    title: "Entity SEO",
    desc: "Making the people, products, organizations, and concepts in your content clearly identifiable and consistently described, so engines can resolve who and what you are talking about.",
  },
  {
    icon: Brain,
    title: "Semantic SEO",
    desc: "Focuses on meaning and relationships between topics rather than exact keyword matches, helping engines understand context instead of just matching words.",
  },
  {
    icon: Network,
    title: "Knowledge Graph",
    desc: "A structured map of entities and the relationships between them, which engines use to understand how a brand relates to its category and competitors.",
  },
]

interface Step {
  title: string
  desc: React.ReactNode
}

const STEPS: Step[] = [
  {
    title: "Map the questions",
    desc: "Identify the real questions buyers ask when researching your category, not the keywords you would type into a search bar. These questions become the backbone of everything that follows.",
  },
  {
    title: "Audit current presence",
    desc: "Check how AI engines answer those questions today: which brands they mention, which sources they cite, and where your brand is missing entirely.",
  },
  {
    title: "Structure the content",
    desc: "Apply Answer Engine Optimization methods so each piece answers its question directly, in language an engine can extract and quote cleanly.",
  },
  {
    title: "Strengthen the entities",
    desc: "Apply Entity SEO and Semantic SEO so your brand, products, and concepts are described consistently and connected clearly to your category.",
  },
  {
    title: "Measure the change",
    desc: (
      <>
        Track citations, mentions, and{" "}
        <Link
          href="/features/share-of-voice"
          className="text-indigo-600 hover:text-indigo-700 underline underline-offset-2 transition-colors"
        >
          Share of Voice
        </Link>{" "}
        over time to confirm whether the work actually moved the numbers, then repeat the cycle on the next set of
        questions.
      </>
    ),
  },
]

const PRACTICES: string[] = [
  "Answer the question in the first sentence.",
  "Define terms explicitly.",
  "Keep entities consistent across your site.",
  "Cover topics thoroughly rather than thinly.",
  "Measure continuously, because AI search optimization without feedback is guesswork.",
]

interface WorkedExample {
  icon: LucideIcon
  title: string
  desc: string
}

const EXAMPLES: WorkedExample[] = [
  {
    icon: PenLine,
    title: "Before and after",
    desc: "A weak product description rewritten into one an engine can quote cleanly.",
  },
  {
    icon: Fingerprint,
    title: "Disambiguation",
    desc: "A brand mention made unambiguous.",
  },
  {
    icon: TrendingUp,
    title: "Trend to action",
    desc: "A citation trend read and acted on.",
  },
]

interface FaqItem {
  q: string
  a: React.ReactNode
}

const FAQS: FaqItem[] = [
  {
    q: "Is the AI Search Academy free?",
    a: "Yes. The entire curriculum, from fundamentals through advanced GEO and AEO, is free to work through. The platform itself has a separate free trial for when you are ready to apply what you learn to your own brand.",
  },
  {
    q: "Do I need an SEO background?",
    a: "No. The Academy starts with how AI engines work and builds up from there, so it works for marketers, founders, and content teams with no prior SEO or technical background. Existing SEO experience helps you move faster through the middle lessons, but it is not required.",
  },
  {
    q: "What is the difference between GEO and AEO?",
    a: "Generative Engine Optimization works at the brand level: earning mentions and citations across AI-generated answers. Answer Engine Optimization works at the content level: structuring individual pages so engines can extract and quote them. Most programs need both, and the Academy teaches them in that order.",
  },
  {
    q: "How is AI search optimization different from AI SEO?",
    a: "They describe the same territory. AI SEO, AI search optimization, LLM SEO, and GEO all refer to adapting search practice for a world where AI engines generate the answer instead of a ranked list of links. The Academy uses AI search optimization as the umbrella term, with GEO and AEO as its two core disciplines.",
  },
  {
    q: "How long does the curriculum take?",
    a: "Most learners work through the core concepts and step-by-step guides in a few focused hours. Applying the methods to a real brand (mapping questions, auditing presence, restructuring content) takes longer and continues indefinitely, since measurement is an ongoing practice rather than a one-time project.",
  },
  {
    q: "Will the curriculum stay current?",
    a: "Yes. AI engines change how they select and cite sources regularly, and the curriculum is maintained by the team running the underlying platform, so lessons get updated as observed engine behavior shifts rather than staying fixed to how things worked at launch.",
  },
]

/* ------------------------------------------------------------------ */
/* Pieces                                                              */
/* ------------------------------------------------------------------ */

function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="flex flex-col gap-3">
      {FAQS.map((item, i) => {
        const isOpen = open === i
        return (
          <motion.div
            key={item.q}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.05 }}
            className={`rounded-2xl border bg-white transition-colors ${
              isOpen ? "border-indigo-500/25 shadow-[0_12px_40px_-24px_rgba(91,91,255,0.4)]" : "border-black/5"
            }`}
          >
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className="text-[15px] font-medium text-foreground">{item.q}</span>
              <ChevronDown
                className={`h-4.5 w-4.5 shrink-0 text-muted-foreground transition-transform duration-300 ${
                  isOpen ? "rotate-180 text-indigo-600" : ""
                }`}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-5 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )
      })}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export function Content() {
  const router = useRouter()

  return (
    <div className="bg-background">
      <PageHero
        eyebrow="Academy"
        title="AI Search Academy: learn AI search optimization from the ground up"
        gradientWords={["Academy", "optimization"]}
        description="A structured, free curriculum that teaches how AI engines choose and cite sources, and how to make your content one of them. Start with the fundamentals and progress to advanced Generative and Answer Engine Optimization."
        wide
      >
        <a
          href="#core-concepts"
          className="group h-12 px-7 rounded-full font-medium text-[15px] text-white bg-linear-to-r from-indigo-600 via-indigo-500 to-violet-500 shadow-[0_10px_30px_-8px_rgba(91,91,255,0.5)] hover:shadow-[0_14px_40px_-8px_rgba(91,91,255,0.65)] transition-shadow inline-flex items-center gap-2"
        >
          Start Learning
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </a>
        <MagneticButton
          onClick={() => router.push("/register")}
          className="h-12 px-7 rounded-full font-medium text-[15px] text-foreground border border-black/10 bg-white/70 hover:bg-black/5 transition-colors inline-flex items-center"
        >
          Start Free Analysis
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
          Curriculum maintained by the team behind an AI Search Intelligence Platform monitoring six major engines.
        </motion.p>
      </div>

      {/* ---------------------------------------------------------- */}
      {/* Section 1: Learning overview                                */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <SectionLabel dark={false}>Overview</SectionLabel>
          <RevealText
            as="h2"
            text="What you will learn"
            className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-7"
          />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-xl border border-indigo-200 bg-indigo-50/40 p-6"
          >
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-600 flex items-center justify-center shrink-0">
                <GraduationCap className="w-3.5 h-3.5" />
              </span>
              <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-indigo-600">
                Curriculum
              </span>
            </div>
            <p className="text-foreground text-[15px] md:text-base leading-relaxed">
              AI search optimization is the practice of improving how a brand appears in answers generated by AI
              engines. The Academy teaches it as a discipline with its own concepts, methods, and vocabulary. The
              curriculum moves in a deliberate order: it begins with how AI engines work, covers the core concepts
              GEO and AEO depend on, works through step-by-step methods, and closes with best practices drawn from
              observed engine behavior.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 2: Core concepts                                    */}
      {/* ---------------------------------------------------------- */}
      <section id="core-concepts" className="scroll-mt-32 py-20 md:py-24 bg-indigo-50/40 border-y border-black/5">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-14">
            <div className="flex justify-center">
              <SectionLabel dark={false}>Fundamentals</SectionLabel>
            </div>
            <RevealText
              as="h2"
              text="The concepts everything else builds on"
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-4"
            />
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
            >
              Five terms, understood clearly, make every later lesson easier to follow.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CONCEPTS.map((concept, i) => (
              <motion.div
                key={concept.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.55, delay: (i % 3) * 0.08 + Math.floor(i / 3) * 0.05 }}
                className="rounded-2xl border border-black/5 bg-white p-6 shadow-[0_1px_3px_rgba(15,15,35,0.05)]"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center shrink-0">
                    <concept.icon className="w-4.5 h-4.5" />
                  </span>
                  <h3 className="text-[15px] font-semibold text-foreground">{concept.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{concept.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 3: Step-by-step guides (timeline)                   */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <div className="flex justify-center">
              <SectionLabel dark={false}>The playbook</SectionLabel>
            </div>
            <RevealText
              as="h2"
              text="How to apply what you learn"
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-4"
            />
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-muted-foreground max-w-xl mx-auto"
            >
              Five steps carry the concepts above into a working program for a real brand.
            </motion.p>
          </div>

          <div className="max-w-2xl mx-auto">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.55, delay: 0.05 + i * 0.08 }}
                className="relative pl-16 pb-12 last:pb-0"
              >
                {i < STEPS.length - 1 && (
                  <span className="absolute left-4.5 top-10 bottom-0 w-px bg-linear-to-b from-indigo-200 to-black/5" />
                )}
                <span className="absolute left-0 top-0 w-9 h-9 rounded-full bg-white border border-indigo-200 shadow-[0_1px_3px_rgba(91,91,255,0.15)] flex items-center justify-center text-sm font-semibold text-indigo-600">
                  {i + 1}
                </span>

                <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-indigo-600 mb-1.5">
                  Step {i + 1}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-[15px] leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 4: Best practices                                   */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24 bg-indigo-50/40 border-y border-black/5">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-12">
            <div className="flex justify-center">
              <SectionLabel dark={false}>What holds up</SectionLabel>
            </div>
            <RevealText
              as="h2"
              text="Practices that hold up across engines"
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground"
            />
          </div>

          <ul className="space-y-4">
            {PRACTICES.map((practice, i) => (
              <motion.li
                key={practice}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.5, delay: 0.05 + i * 0.06 }}
                className="flex items-start gap-3.5 rounded-xl border border-black/5 bg-white p-5 shadow-[0_1px_3px_rgba(15,15,35,0.05)]"
              >
                <span className="w-6 h-6 rounded-full bg-indigo-500/10 flex items-center justify-center shrink-0 mt-0.5 text-[12px] font-semibold text-indigo-600">
                  {i + 1}
                </span>
                <p className="text-[15px] text-foreground leading-relaxed">{practice}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 5: Practical examples                               */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-14">
            <div className="flex justify-center">
              <SectionLabel dark={false}>Worked examples</SectionLabel>
            </div>
            <RevealText
              as="h2"
              text="Learning through worked examples"
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-4"
            />
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
            >
              Every core lesson includes a practical example so the method is concrete, not theoretical.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {EXAMPLES.map((example, i) => (
              <motion.div
                key={example.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className="rounded-2xl bg-white border border-black/5 shadow-[0_1px_3px_rgba(15,15,35,0.05)] p-7"
              >
                <span className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center shrink-0 mb-4">
                  <example.icon className="w-4.5 h-4.5" />
                </span>
                <h3 className="font-semibold text-foreground mb-2">{example.title}</h3>
                <p className="text-muted-foreground text-[15px] leading-relaxed">{example.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 6: Learning resources (dark)                        */}
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
                  <SectionLabel>Keep learning</SectionLabel>
                </div>
                <RevealText
                  as="h2"
                  text="Where to go deeper"
                  className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-white"
                />
              </div>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="text-white/55 leading-relaxed text-[15px] md:text-base"
              >
                The Academy connects to the rest of Citationly&apos;s material: the pillar guides on{" "}
                <Link
                  href="/generative-engine-optimization"
                  className="text-indigo-300 hover:text-indigo-200 underline underline-offset-2 transition-colors"
                >
                  Generative Engine Optimization
                </Link>{" "}
                and{" "}
                <Link
                  href="/answer-engine-optimization"
                  className="text-indigo-300 hover:text-indigo-200 underline underline-offset-2 transition-colors"
                >
                  Answer Engine Optimization
                </Link>
                , the{" "}
                <Link
                  href="/blog"
                  className="text-indigo-300 hover:text-indigo-200 underline underline-offset-2 transition-colors"
                >
                  blog
                </Link>{" "}
                for newer tactics, and the{" "}
                <Link
                  href="/docs"
                  className="text-indigo-300 hover:text-indigo-200 underline underline-offset-2 transition-colors"
                >
                  documentation
                </Link>{" "}
                for running the measurement steps inside the platform.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 7: FAQ                                              */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24 border-t border-black/5">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
            <div>
              <SectionLabel dark={false}>FAQ</SectionLabel>
              <RevealText
                as="h2"
                text="Questions, answered."
                gradientWords={["answered"]}
                className="mb-4 text-3xl font-semibold tracking-[-0.02em] text-foreground md:text-4xl"
              />
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-6 max-w-md text-muted-foreground"
              >
                Everything learners usually ask before starting the curriculum. If yours is not here, reach out
                directly.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-700"
                >
                  Talk to our team
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </motion.div>
            </div>

            <FaqAccordion />
          </div>
        </div>
      </section>

      <CtaBand
        title="Learn the discipline, then measure your progress"
        description="The fastest way to learn AI search optimization is to apply it to your own brand and watch the numbers move."
        primaryLabel="Start Free Analysis"
      />

      <div className="pb-20 md:pb-24 -mt-14 text-center">
        <Link
          href="/contact"
          className="group inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
        >
          Book a Demo
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  )
}
