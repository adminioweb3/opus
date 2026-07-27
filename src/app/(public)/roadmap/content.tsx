"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowRight, Map } from "lucide-react"
import { PageHero } from "@/components/features/public/PageHero"
import { CtaBand } from "@/components/features/public/CtaBand"
import { SectionLabel } from "@/components/features/landing/primitives/SectionLabel"
import { RevealText } from "@/components/features/landing/primitives/RevealText"
import { MagneticButton } from "@/components/features/landing/primitives/MagneticButton"

/* ------------------------------------------------------------------ */
/* Fixed content data                                                  */
/* ------------------------------------------------------------------ */

interface VisionMovement {
  title: string
  desc: string
}

const VISION_MOVEMENTS: VisionMovement[] = [
  {
    title: "Broader observation",
    desc: "An AI search platform is only as useful as its coverage of where buyers actually ask questions, so coverage follows real usage.",
  },
  {
    title: "From explanation to anticipation",
    desc: "Today the platform explains what engines say and why. The direction of travel is helping teams anticipate how changes will land before the investment is made.",
  },
  {
    title: "Closer to the work",
    desc: "Measurement creates value when it reaches the people doing content, SEO, and reporting work, inside the tools where that work already happens.",
  },
]

interface RoadmapItem {
  title: string
  desc: string
}

interface RoadmapColumn {
  label: string
  header: string
  accent: string
  items: RoadmapItem[]
}

const ROADMAP_COLUMNS: RoadmapColumn[] = [
  {
    label: "Now",
    header: "In active development",
    accent: "bg-indigo-500",
    items: [
      {
        title: "Deeper per-engine analytics",
        desc: "Expanding the AI visibility platform's engine-level views, so differences in how each engine cites and describes brands are easier to diagnose and act on.",
      },
      {
        title: "Reporting refinements",
        desc: "Extending scheduled reporting formats based on how customers actually distribute results internally, with emphasis on executive summary quality.",
      },
      {
        title: "Monitoring resilience",
        desc: "Ongoing adaptation to changes in how engines format answers and expose sources, protecting data continuity as the engines themselves evolve.",
      },
    ],
  },
  {
    label: "Next",
    header: "Planned",
    accent: "bg-blue-400",
    items: [
      {
        title: "Expanded question research",
        desc: "Planned improvements to how the platform discovers and clusters the questions buyers ask, tightening the link between question demand and content planning.",
      },
      {
        title: "Workflow integrations",
        desc: "Planned connections that deliver recommendations and alerts into the collaboration and project tools content teams already use.",
      },
      {
        title: "Additional engine coverage",
        desc: "New assistants are evaluated continuously, and coverage expands when an engine demonstrates meaningful usage in buying research.",
      },
    ],
  },
  {
    label: "Later",
    header: "Exploring",
    accent: "bg-black/25",
    items: [
      {
        title: "Predictive visibility modeling",
        desc: "Exploring whether observed citation patterns can estimate how planned content changes are likely to affect visibility before publication.",
      },
      {
        title: "Deeper accuracy tooling",
        desc: "Researching richer workflows for detecting, prioritizing, and verifying the correction of inaccurate AI answers at scale.",
      },
      {
        title: "Category benchmarking",
        desc: "Considering anonymized, aggregate benchmarks that let a brand understand its AI search maturity relative to its industry, designed with strict attention to customer data boundaries.",
      },
    ],
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
        eyebrow="Roadmap"
        title="Where the platform is headed"
        gradientWords={["headed"]}
        description="This page shows what we are building now, what is planned next, and what we are exploring further out. We publish direction rather than dates, because honest planning in a fast-moving field means committing to priorities, not fictions."
      >
        <MagneticButton
          onClick={() => router.push("/contact")}
          className="group h-12 px-7 rounded-full font-medium text-[15px] text-white bg-linear-to-r from-indigo-600 via-indigo-500 to-violet-500 shadow-[0_10px_30px_-8px_rgba(91,91,255,0.5)] hover:shadow-[0_14px_40px_-8px_rgba(91,91,255,0.65)] transition-shadow inline-flex items-center gap-2"
        >
          Request a Feature
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </MagneticButton>
        <Link
          href="/changelog"
          className="h-12 px-7 rounded-full font-medium text-[15px] text-foreground border border-black/10 bg-white/70 hover:bg-black/5 transition-colors inline-flex items-center gap-2"
        >
          View Changelog
        </Link>
      </PageHero>

      {/* ---------------------------------------------------------- */}
      {/* Trust line                                                   */}
      {/* ---------------------------------------------------------- */}
      <div className="container mx-auto px-6 max-w-4xl pb-16 md:pb-20 -mt-4">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center justify-center gap-2 text-center text-sm text-muted-foreground"
        >
          <Map className="w-4 h-4 text-indigo-500/70 shrink-0" />
          Direction, not deadlines, reviewed and republished as priorities shift.
        </motion.p>
      </div>

      {/* ---------------------------------------------------------- */}
      {/* Section 1 - The destination behind the roadmap              */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="max-w-3xl">
            <SectionLabel dark={false}>Our Vision</SectionLabel>
            <RevealText
              as="h2"
              text="The destination behind the roadmap"
              gradientWords={["roadmap"]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-6"
            />
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-muted-foreground leading-relaxed text-[15px] md:text-base"
            >
              Our long-term aim is unchanged from the day the company started: make AI search as measurable,
              manageable, and accountable as every other marketing channel. Every roadmap item below serves
              one of three movements toward that aim.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {VISION_MOVEMENTS.map((m, i) => (
              <motion.div
                key={m.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.55, delay: 0.1 + i * 0.1 }}
                className="rounded-2xl bg-white border border-black/5 shadow-[0_1px_3px_rgba(15,15,35,0.05)] p-7"
              >
                <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-600 flex items-center justify-center text-sm font-semibold mb-4">
                  {i + 1}
                </div>
                <h3 className="font-semibold text-foreground text-lg mb-2">{m.title}</h3>
                <p className="text-[15px] text-muted-foreground leading-relaxed">{m.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 2 - Now / Next / Later kanban                        */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24 bg-indigo-50/40 border-y border-black/5">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-14">
            <div className="flex justify-center">
              <SectionLabel dark={false}>The Roadmap</SectionLabel>
            </div>
            <RevealText
              as="h2"
              text="What's active, planned, and explored"
              gradientWords={["explored"]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-4"
            />
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-muted-foreground max-w-xl mx-auto"
            >
              Three columns, three levels of confidence: work underway now, work planned next, and directions
              we are still exploring.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ROADMAP_COLUMNS.map((col, ci) => (
              <div key={col.label}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: ci * 0.05 }}
                  className="flex items-center gap-2.5 mb-5"
                >
                  <span className={`w-2 h-2 rounded-full shrink-0 ${col.accent}`} />
                  <h2 className="text-[11px] font-semibold tracking-[0.14em] uppercase text-muted-foreground/70">
                    {col.header}
                  </h2>
                </motion.div>

                <div className="space-y-5">
                  {col.items.map((item, i) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-8%" }}
                      transition={{ duration: 0.55, delay: 0.1 + ci * 0.1 + i * 0.08 }}
                      className="rounded-2xl bg-white border border-black/5 shadow-[0_1px_3px_rgba(15,15,35,0.05)] p-6"
                    >
                      <h3 className="font-semibold text-foreground text-[15px] mb-1.5">{item.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 3 - How customers shape this page                    */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="max-w-3xl">
            <SectionLabel dark={false}>Customer Feedback</SectionLabel>
            <RevealText
              as="h2"
              text="How customers shape this page"
              gradientWords={["page"]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-6"
            />
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-muted-foreground leading-relaxed text-[15px] md:text-base"
            >
              Roadmap priorities are set from three inputs, weighted in this order: what customers request and
              why, what changes in engine behavior require, and where AI search innovation is heading as a
              discipline. Feature requests are reviewed by the product team, and requests that represent a
              pattern across customers move up in priority. When something you requested ships, it appears in
              the{" "}
              <Link
                href="/changelog"
                className="text-indigo-600 hover:text-indigo-700 underline underline-offset-2"
              >
                changelog
              </Link>
              , and if you asked for it directly, you will hear about it from us before you read it there.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 4 - A note on how we commit                          */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24 bg-indigo-50/40 border-y border-black/5">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="max-w-3xl">
            <SectionLabel dark={false}>How We Commit</SectionLabel>
            <RevealText
              as="h2"
              text="A note on how we commit"
              gradientWords={["commit"]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-6"
            />
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-muted-foreground leading-relaxed text-[15px] md:text-base"
            >
              Platform development in a field this young requires holding two things at once: a stable
              long-term direction and flexibility about the route. We commit firmly to the vision above and to
              the Now column, we plan Next with confidence, and we describe Later honestly as exploration.
              When priorities shift because the engines shift, this page changes and says so.
            </motion.p>
          </div>
        </div>
      </section>

      <CtaBand
        title="Tell us what would make the platform better for you"
        description="The strongest signal in our prioritization is a customer explaining a real problem. If something on this page matters to your team, or something missing from it should, we want to hear it."
        primaryLabel="Request a Feature"
        primaryHref="/contact"
        secondaryLabel="Book a Demo"
        secondaryHref="/contact"
      />
    </div>
  )
}
