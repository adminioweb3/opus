"use client"

import { motion } from "framer-motion"
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
        desc: "Added an on-demand rescan button to every Competitor Watch profile — refresh a rival's share-of-voice data immediately instead of waiting for the weekly cycle to catch up.",
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
        desc: "Page Auditor now pairs itemized prompt coverage with a citation gap analysis for every page — showing exactly which buyer questions a page answers, and which ones a competitor is being cited for instead.",
      },
      {
        date: "Jun 17",
        tag: "Improved",
        title: "Command Center gets AI-generated insights",
        desc: "The executive overview now aggregates KPIs across every module and surfaces a short AI-written summary of the week's biggest movers — no more piecing it together from five separate tabs.",
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
        desc: "See exactly which sources ChatGPT, Gemini, Claude, Perplexity, Copilot, and Grok cite instead of you for a given topic — and how often each one shows up across your priority prompts.",
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
        desc: "Every Citationly plan — Starter, Professional, and Enterprise — now starts with a full 7-day free trial. No credit card required to begin.",
      },
    ],
  },
]

type RoadmapStatus = "In progress" | "Planned" | "Exploring"

interface RoadmapItem {
  title: string
  desc: string
  status: RoadmapStatus
}

interface RoadmapColumn {
  label: string
  items: RoadmapItem[]
}

const STATUS_DOT: Record<RoadmapStatus, string> = {
  "In progress": "bg-indigo-500",
  Planned: "bg-blue-400",
  Exploring: "bg-black/25",
}

const ROADMAP: RoadmapColumn[] = [
  {
    label: "Now",
    items: [
      {
        title: "Weekly digest email",
        desc: "An automatic weekly recap of visibility score changes, new citation gaps, and Brand Pulse alerts, delivered to your inbox.",
        status: "In progress",
      },
      {
        title: "Deeper Perplexity coverage",
        desc: "Expanding scan frequency and prompt breadth on Perplexity to match the depth already shipped for ChatGPT and Gemini.",
        status: "In progress",
      },
      {
        title: "Enterprise SSO",
        desc: "SAML-based single sign-on for Enterprise workspaces, ahead of broader identity provider support.",
        status: "In progress",
      },
    ],
  },
  {
    label: "Next",
    items: [
      {
        title: "Public API access",
        desc: "Read access to visibility scores, citations, and opportunities so teams can pull Citationly data into their own dashboards.",
        status: "Planned",
      },
      {
        title: "Slack alerts",
        desc: "Route Brand Pulse alerts and weekly Visibility Radar summaries straight into a Slack channel.",
        status: "Planned",
      },
      {
        title: "White-label reports",
        desc: "Agencies and consultants will be able to export Reports under their own branding for client delivery.",
        status: "Planned",
      },
      {
        title: "Custom scan scheduling",
        desc: "Choose scan cadence per module instead of a single fixed weekly cycle.",
        status: "Exploring",
      },
    ],
  },
  {
    label: "Later",
    items: [
      {
        title: "Multi-language monitoring",
        desc: "Track visibility and citations for brands operating in non-English markets and prompts.",
        status: "Exploring",
      },
      {
        title: "Custom AI model coverage",
        desc: "Let teams point Visibility Radar at additional or internal AI models beyond the six platforms tracked today.",
        status: "Exploring",
      },
      {
        title: "Predictive visibility scoring",
        desc: "Early research into forecasting how a content change is likely to move your visibility score before you publish it.",
        status: "Exploring",
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
        eyebrow="Changelog & Roadmap"
        title="Every improvement, in the open."
        gradientWords={["open."]}
        description="What we've shipped, and what we're building next — a running record of how Citationly's AI visibility platform gets sharper every week."
      />

      {/* ---------------------------------------------------------- */}
      {/* Section 1 — Recent releases                                  */}
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
      {/* Section 2 — Roadmap                                          */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24 bg-indigo-50/40 border-y border-black/5">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <div className="flex justify-center">
              <SectionLabel dark={false}>Roadmap</SectionLabel>
            </div>
            <RevealText
              as="h2"
              text="What's coming, told straight."
              gradientWords={["straight."]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-4"
            />
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-muted-foreground max-w-xl mx-auto"
            >
              No fixed dates on unshipped work — just an honest read on what's active, what's queued, and
              what's still an open question.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ROADMAP.map((col, ci) => (
              <motion.div
                key={col.label}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.1 + ci * 0.1 }}
                className="rounded-2xl bg-white border border-black/5 shadow-[0_1px_3px_rgba(15,15,35,0.05)] p-7"
              >
                <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-indigo-600 mb-6">
                  {col.label}
                </div>
                <div className="space-y-6">
                  {col.items.map((item) => (
                    <div key={item.title}>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${STATUS_DOT[item.status]}`} />
                        <span className="text-[11px] font-medium text-muted-foreground/70">{item.status}</span>
                      </div>
                      <h3 className="font-semibold text-foreground text-[15px] mb-1">{item.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Have a feature you need to see?"
        description="Tell us what would move the needle for your team — roadmap priorities come straight from conversations like this."
        secondaryLabel="Request a feature"
        secondaryHref="/contact"
      />
    </div>
  )
}
