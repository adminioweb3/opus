"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { PageHero } from "@/components/features/public/PageHero"
import { CtaBand } from "@/components/features/public/CtaBand"
import { SectionLabel } from "@/components/features/landing/primitives/SectionLabel"
import { RevealText } from "@/components/features/landing/primitives/RevealText"
import { AnimatedCounter } from "@/components/features/landing/primitives/AnimatedCounter"
import { caseStudies } from "./studies"

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

// Splits a fixed literal like "+38 pts" or "97%" into the pieces AnimatedCounter
// needs (prefix, numeric value, suffix). Pure string parsing — no runtime data.
function parseMetric(raw: string): { prefix: string; value: number; suffix: string; decimals: number } {
  const match = raw.match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/)
  if (!match) return { prefix: "", value: 0, suffix: raw, decimals: 0 }
  const [, prefix, numStr, suffix] = match
  return {
    prefix,
    value: Number(numStr),
    suffix,
    decimals: numStr.includes(".") ? 1 : 0,
  }
}

const AGGREGATE_STATS: { value: number; suffix: string; label: string }[] = [
  {
    value: 4,
    suffix: "",
    label: "industries running the same AI visibility workflow — B2B SaaS, growth-stage SaaS, agency, and healthcare.",
  },
  {
    value: 30,
    suffix: "+ pts",
    label: "typical visibility-score gain teams see within two quarters of consistent scanning and fixes.",
  },
  {
    value: 350,
    suffix: "+",
    label: "citation gaps identified and closed across the four programs featured on this page.",
  },
  {
    value: 6,
    suffix: "",
    label: "AI platforms scanned every week, for every account: ChatGPT, Gemini, Claude, Perplexity, Copilot, Grok.",
  },
]

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export function Content() {
  return (
    <div className="bg-background">
      <PageHero
        eyebrow="Customer stories"
        title="Real teams winning AI search."
        gradientWords={["AI"]}
        description="Four teams, four industries, one shared problem: nobody could see how AI platforms talked about their brand. Here's what changed once they could."
      />

      {/* ---------------------------------------------------------- */}
      {/* Section 1 — Case study cards                                 */}
      {/* ---------------------------------------------------------- */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {caseStudies.map((study, i) => {
              const metric = parseMetric(study.headlineMetric.value)
              return (
                <motion.div
                  key={study.slug}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-8%" }}
                  transition={{ duration: 0.6, delay: 0.08 * i, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={`/case-studies/${study.slug}`}
                    className="group flex flex-col h-full rounded-[1.5rem] bg-white border border-black/5 shadow-[0_1px_3px_rgba(15,15,35,0.05)] p-8 hover:shadow-[0_20px_50px_-16px_rgba(91,91,255,0.22)] hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <span
                          className={`w-12 h-12 rounded-xl bg-linear-to-br ${study.gradient} flex items-center justify-center text-white font-semibold shadow-[0_4px_14px_rgba(91,91,255,0.25)]`}
                        >
                          {study.logoInitials}
                        </span>
                        <div>
                          <h3 className="font-semibold text-foreground text-lg leading-tight">{study.company}</h3>
                          <span className="text-[13px] text-muted-foreground">{study.industry}</span>
                        </div>
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-muted-foreground/40 group-hover:text-indigo-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                    </div>

                    <div className="mb-6 pb-6 border-b border-black/5">
                      <AnimatedCounter
                        value={metric.value}
                        prefix={metric.prefix}
                        suffix={metric.suffix}
                        decimals={metric.decimals}
                        className="text-4xl font-semibold tracking-[-0.02em] text-indigo-600"
                      />
                      <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed max-w-xs">
                        {study.headlineMetric.label}
                      </p>
                    </div>

                    <p className="text-[15px] text-foreground/75 leading-relaxed mb-6 flex-1">{study.excerpt}</p>

                    <div className="flex items-center justify-between text-[13px]">
                      <span className="font-medium text-foreground/70">
                        {study.persona.name ? `${study.persona.name}, ` : ""}
                        {study.persona.role}
                      </span>
                      <span className="font-medium text-indigo-600 group-hover:text-indigo-700 transition-colors inline-flex items-center gap-1">
                        Read the story
                      </span>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 2 — Aggregate stat band                              */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24 bg-indigo-50/40 border-y border-black/5">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-14">
            <div className="flex justify-center">
              <SectionLabel dark={false}>Across every account</SectionLabel>
            </div>
            <RevealText
              as="h2"
              text="The pattern repeats across industries."
              gradientWords={["repeats"]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-4"
            />
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-muted-foreground max-w-xl mx-auto"
            >
              Different products, different buyers, different compliance requirements — the same measure,
              fix, re-measure loop moves the score every time.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {AGGREGATE_STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.1 + i * 0.1 }}
                className="rounded-2xl bg-white border border-black/5 shadow-[0_1px_3px_rgba(15,15,35,0.05)] p-6"
              >
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  className="text-3xl font-semibold tracking-[-0.02em] text-indigo-600"
                />
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Your team's story could be next."
        description="Start your free 7-day AI visibility analysis. No credit card required."
      />
    </div>
  )
}
