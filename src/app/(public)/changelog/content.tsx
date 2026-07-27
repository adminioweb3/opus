"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Map } from "lucide-react"
import { PageHero } from "@/components/features/public/PageHero"
import { CtaBand } from "@/components/features/public/CtaBand"
import { SectionLabel } from "@/components/features/landing/primitives/SectionLabel"
import { RevealText } from "@/components/features/landing/primitives/RevealText"

/* ------------------------------------------------------------------ */
/* Fixed content data                                                  */
/* ------------------------------------------------------------------ */

type Tag = "New" | "Improved" | "Fixed"

const TAG_STYLES: Record<Tag, string> = {
  New: "bg-indigo-500/10 text-indigo-600 border-indigo-500/20",
  Improved: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  Fixed: "bg-amber-500/10 text-amber-700 border-amber-500/20",
}

interface ReleaseEntry {
  date: string
  tag: Tag
  title: string
  desc: string
}

interface MonthGroup {
  month: string
  entries: ReleaseEntry[]
}

const RELEASES: MonthGroup[] = [
  {
    month: "July 2026",
    entries: [
      {
        date: "Jul 8",
        tag: "New",
        title: "Real competitor & AI-platform logos",
        desc: "Competitor Watch and Visibility Radar now render actual brand and platform logos in place of text labels, so share-of-voice comparisons and platform breakdowns are scannable at a glance.",
      },
      {
        date: "Jul 3",
        tag: "Improved",
        title: "One-click competitor rescan",
        desc: "Added an on-demand rescan button to every Competitor Watch profile, so you can refresh a rival's share-of-voice data immediately instead of waiting for the weekly cycle to catch up.",
      },
    ],
  },
  {
    month: "June 2026",
    entries: [
      {
        date: "Jun 24",
        tag: "New",
        title: "GEO Optimizer: citation gap analysis",
        desc: "Page Auditor now pairs itemized prompt coverage with a citation gap analysis for every page, showing exactly which buyer questions a page answers, and which ones a competitor is being cited for instead.",
      },
      {
        date: "Jun 17",
        tag: "Improved",
        title: "Command Center gets AI-generated insights",
        desc: "The executive overview now aggregates KPIs across every module and surfaces a short AI-written summary of the week's biggest movers, so there's no more piecing it together from five separate tabs.",
      },
      {
        date: "Jun 10",
        tag: "Fixed",
        title: "Onboarding flow no longer stalls on team invites",
        desc: "Resolved an issue where new workspaces could get stuck mid-setup when teammates were invited before the first Knowledge Vault crawl finished.",
      },
      {
        date: "Jun 3",
        tag: "New",
        title: "Opportunity Finder deep scans",
        desc: "Deep scans give Opportunity Finder a full pass over your site and citation landscape for higher-confidence, prioritized opportunities. Each domain can run one deep scan per 7-day cooldown window.",
      },
    ],
  },
  {
    month: "May 2026",
    entries: [
      {
        date: "May 27",
        tag: "New",
        title: "Brand Pulse accuracy flags and alerts",
        desc: "Brand Pulse now flags when an AI answer misdescribes your product, pricing, or positioning, and sends an alert the moment it's detected instead of surfacing it in next week's report.",
      },
      {
        date: "May 20",
        tag: "Improved",
        title: "Visibility Radar adds 7 / 30 / 90-day ranges",
        desc: "Weekly platform-by-platform visibility scans can now be viewed across 7-, 30-, or 90-day windows, making it easier to separate short-term noise from a real trend.",
      },
      {
        date: "May 13",
        tag: "New",
        title: "Citation Intelligence source tracking",
        desc: "See exactly which sources ChatGPT, Gemini, Claude, Perplexity, Copilot, and Grok cite instead of you for a given topic, and how often each one shows up across your priority prompts.",
      },
      {
        date: "May 6",
        tag: "Improved",
        title: "Full landing page and navigation redesign",
        desc: "Rebuilt the marketing site and top-level navigation from the ground up for clarity and speed, with a lighter footprint and a consistent structure across every public page.",
      },
      {
        date: "May 1",
        tag: "New",
        title: "7-day free trial on every plan",
        desc: "Every Citationly plan (Starter, Professional, and Enterprise) now starts with a full 7-day free trial. No credit card required to begin.",
      },
    ],
  },
]

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export function Content() {
  return (
    <div className="bg-background">
      <PageHero
        eyebrow="Changelog"
        title="Every improvement, in the open."
        gradientWords={["open."]}
        description="What we've shipped, and what we're building next: a running record of how Citationly's AI visibility platform gets sharper every week."
      />

      {/* ---------------------------------------------------------- */}
      {/* Section 1 - Recent releases                                  */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-16">
            <div className="flex justify-center">
              <SectionLabel dark={false}>Recent releases</SectionLabel>
            </div>
            <RevealText
              as="h2"
              text="Shipped, not promised."
              gradientWords={["Shipped,"]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-4"
            />
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-muted-foreground max-w-xl mx-auto"
            >
              Every entry below is a real release, in the order it went out to production.
            </motion.p>
          </div>

          <div className="space-y-14">
            {RELEASES.map((group, gi) => (
              <div key={group.month}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: gi * 0.05 }}
                  className="text-[11px] font-semibold tracking-[0.14em] uppercase text-muted-foreground/70 mb-6 pl-12"
                >
                  {group.month}
                </motion.div>

                <div>
                  {group.entries.map((entry, i) => (
                    <motion.div
                      key={entry.title}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-8%" }}
                      transition={{ duration: 0.5, delay: 0.05 + i * 0.08 }}
                      className="relative pl-12 pb-10 last:pb-0"
                    >
                      {/* connector line */}
                      {(i < group.entries.length - 1 || gi < RELEASES.length - 1) && (
                        <span className="absolute left-2.75 top-7 bottom-0 w-px bg-linear-to-b from-indigo-200 to-black/5" />
                      )}
                      {/* node */}
                      <span className="absolute left-0 top-0.5 w-5.75 h-5.75 rounded-full bg-white border border-indigo-200 shadow-[0_1px_3px_rgba(91,91,255,0.15)] flex items-center justify-center">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            gi === 0 && i === 0 ? "bg-indigo-500 animate-pulse" : "bg-indigo-400"
                          }`}
                        />
                      </span>

                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <span className="text-[13px] font-semibold text-muted-foreground/80">{entry.date}</span>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${TAG_STYLES[entry.tag]}`}
                        >
                          {entry.tag}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-1.5">{entry.title}</h3>
                      <p className="text-muted-foreground text-[15px] leading-relaxed">{entry.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 2 - Roadmap callout                                  */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24 bg-indigo-50/40 border-y border-black/5">
        <div className="container mx-auto px-6 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="rounded-2xl bg-white border border-black/5 shadow-[0_1px_3px_rgba(15,15,35,0.05)] p-10 md:p-12 text-center"
          >
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center mx-auto mb-5">
              <Map className="w-5 h-5" />
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-[-0.02em] text-foreground mb-3">
              Want to see what&apos;s next?
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto mb-7">
              Explore our public roadmap to see what we&apos;re building now, what&apos;s planned, and what
              we&apos;re exploring.
            </p>
            <Link
              href="/roadmap"
              className="group h-12 px-7 rounded-full font-medium text-[15px] text-white bg-linear-to-r from-indigo-600 via-indigo-500 to-violet-500 shadow-[0_10px_30px_-8px_rgba(91,91,255,0.5)] hover:shadow-[0_14px_40px_-8px_rgba(91,91,255,0.65)] transition-shadow inline-flex items-center gap-2"
            >
              View the Roadmap
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>

      <CtaBand
        title="Have a feature you need to see?"
        description="Tell us what would move the needle for your team: roadmap priorities come straight from conversations like this."
        secondaryLabel="Request a feature"
        secondaryHref="/contact"
      />
    </div>
  )
}
