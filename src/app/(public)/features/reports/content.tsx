"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Archive,
  ArrowRight,
  BookOpen,
  Briefcase,
  CalendarClock,
  CheckCircle2,
  Clock,
  Database,
  FileText,
  Layers,
  SlidersHorizontal,
  Share2,
  Swords,
  Users,
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
    icon: FileText,
    title: "Executive Summaries",
    desc: (
      <>
        Auto-generated period summaries covering{" "}
        <Link href="/features/ai-visibility-dashboard" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors">
          visibility position
        </Link>
        , Share of Voice movement, and notable competitive shifts, written for readers who will not open a
        dashboard. Leadership stays informed at the cost of zero analyst hours per cycle.
      </>
    ),
  },
  {
    icon: CalendarClock,
    title: "Scheduled Report Delivery",
    desc: "Weekly, monthly, or quarterly reports delivered automatically to defined recipients in their preferred format. Reporting cadence survives busy weeks, keeping the channel visible in every cycle that budgets are discussed.",
  },
  {
    icon: Swords,
    title: "Competitive Position Reports",
    desc: (
      <>
        Dedicated{" "}
        <Link href="/features/competitor-intelligence" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors">
          competitor intelligence reporting
        </Link>
        : head-to-head movement, wins and losses, and notable rival activity for the period. Competitive
        awareness reaches decision makers on schedule instead of surfacing only when something breaks.
      </>
    ),
  },
  {
    icon: Briefcase,
    title: "Client-Ready Reporting",
    desc: "White-label report formats agencies deliver under their own brand, per client, from one account. Retainer reporting that once consumed billable hours becomes an automated deliverable clients rate highly.",
  },
  {
    icon: SlidersHorizontal,
    title: "Custom Report Builder",
    desc: "Configurable reports assembled from any metric, segment, or comparison in the platform. Every stakeholder, from the CMO to the content lead, gets a report shaped to their actual decisions.",
  },
  {
    icon: Share2,
    title: "Exports and Integrations",
    desc: "Structured exports and connections that carry data into BI tools, spreadsheets, and existing reporting environments. AI search metrics take their place beside web and pipeline data in the reports your company already runs on.",
  },
]

const HOW_IT_WORKS: { step: string; title: string; desc: string }[] = [
  {
    step: "01",
    title: "Reports are configured once",
    desc: "Audiences, metrics, cadence, and format are defined per report.",
  },
  {
    step: "02",
    title: "Data flows from the analytics layer",
    desc: "Every figure derives from the same governed dataset the dashboards use.",
  },
  {
    step: "03",
    title: "Generation runs on schedule",
    desc: "Summaries and detailed reports assemble themselves at the cadence you set.",
  },
  {
    step: "04",
    title: "Delivery happens automatically",
    desc: "Recipients get their version by email or shared workspace, on time, every cycle.",
  },
  {
    step: "05",
    title: "Drill-down stays available",
    desc: "Every reported number links back to the underlying data for anyone who wants the detail.",
  },
]

const BUSINESS_BENEFITS: { icon: LucideIcon; title: React.ReactNode; desc: string }[] = [
  {
    icon: Clock,
    title: "Analyst time returns to analysis",
    desc: "Hours spent assembling decks go back into interpreting results and planning responses.",
  },
  {
    icon: Layers,
    title: "The channel stays on the agenda",
    desc: "Reliable cadence keeps AI visibility in front of leadership every cycle, which is how experimental channels become funded ones.",
  },
  {
    icon: CheckCircle2,
    title: "Numbers stop drifting",
    desc: "One data source behind every format ends the reconciliation problems that erode trust in a metric.",
  },
  {
    icon: Users,
    title: (
      <>
        <Link href="/solutions/agencies" className="hover:text-indigo-600 transition-colors underline decoration-black/15 underline-offset-4">
          Agencies
        </Link>{" "}
        scale reporting with clients, not headcount
      </>
    ),
    desc: "Ten clients or fifty, the reporting workload stays flat.",
  },
  {
    icon: Archive,
    title: "Institutional memory builds",
    desc: "Archived report history, including brand monitoring findings and their resolutions, becomes the documented record of the program.",
  },
]

const WHY_CITATIONLY: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: Database,
    title: "One source of truth, every format",
    desc: "Dashboard, summary, and export always agree, because they are the same data rendered three ways.",
  },
  {
    icon: BookOpen,
    title: "Written for the reader, not the tool",
    desc: "Executive formats respect executive attention spans; analyst formats respect analyst depth. Few platforms manage both.",
  },
  {
    icon: Briefcase,
    title: "Agency economics built in",
    desc: "White-label multi-client reporting is a first-class capability, not a workaround.",
  },
  {
    icon: Layers,
    title: "Reporting that compounds",
    desc: "Archived history turns each cycle's report into part of a defensible long-term record of the program's value.",
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
        eyebrow="Reports"
        title="The last mile between good data and a decision."
        gradientWords={["decision"]}
        description="Citationly turns its AI search analytics into reports people actually read: executive summaries for leadership, detailed exports for analysts, and scheduled deliverables for clients."
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
              text="Insight that never reaches the meeting changes nothing."
              gradientWords={["meeting"]}
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
              Most measurement programs do not fail at data collection. They fail at the last mile. The
              analyst has the numbers, the dashboard has the charts, and yet the Monday leadership meeting
              still runs on a hastily assembled slide deck of screenshots, rebuilt by hand every reporting
              cycle.
            </p>
            <p>
              For AI search, the last mile is even harder. The channel is new, so every report also carries
              an education burden: executives need the metric explained before they can read the trend.
              Agencies feel it doubly, needing client-facing reporting that looks professional without
              consuming the retainer hours it is meant to justify.
            </p>
            <p>
              The hidden cost is credibility. When numbers are copied manually between tools and decks, they
              drift, and one caught inconsistency in a board meeting can undo a quarter of measurement work.
              A channel fighting for budget cannot afford reporting that undermines its own case.
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
                text="Reporting that comes from the data, not from screenshots."
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
                  Citationly reports are generated directly from the platform&apos;s{" "}
                  <Link
                    href="/features/ai-search-analytics"
                    className="font-medium text-indigo-300 hover:text-indigo-200 underline underline-offset-4 decoration-indigo-300/40 transition-colors"
                  >
                    AI search analytics layer
                  </Link>
                  . The{" "}
                  <Link
                    href="/features/share-of-voice"
                    className="font-medium text-indigo-300 hover:text-indigo-200 underline underline-offset-4 decoration-indigo-300/40 transition-colors"
                  >
                    Share of Voice
                  </Link>{" "}
                  figure in your executive summary is the same figure in the dashboard and the same figure
                  in the raw export, because all three are views of one governed dataset. Nothing is
                  retyped, so nothing drifts.
                </p>
                <p>
                  On top of that foundation, the reporting module handles the formats real organizations
                  need. Executive summaries compress a period&apos;s visibility, share, and competitive
                  movement into a page leadership reads in two minutes. Detailed reports give analysts the
                  segment-level depth behind every headline. Scheduled delivery puts the right version in
                  the right inbox without anyone assembling it. The result is that AI search reporting stops
                  being a recurring production task and becomes a byproduct of measurement that is already
                  running.
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
              text="Six ways your data becomes someone's report."
              gradientWords={["report"]}
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
              text="From configuration to a finished report."
              gradientWords={["report"]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-4"
            />
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-muted-foreground max-w-xl mx-auto"
            >
              Five steps, and only the first one takes any manual effort.
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
              text="What changes when reporting stops being a project."
              gradientWords={["project"]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-4"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BUSINESS_BENEFITS.map((benefit, i) => (
              <motion.div
                key={i}
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
                  text="Reporting built for the reader, not the platform."
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
        title="Make your next AI search report generate itself."
        description="Run a free analysis, and your first executive summary can be in front of leadership this week: your visibility, your Share of Voice, and where you stand against competitors, on one page."
      />
    </div>
  )
}
