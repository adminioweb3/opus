"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowRight,
  Bell,
  BookOpen,
  CheckCircle2,
  Compass,
  Database,
  Eye,
  FileText,
  Fingerprint,
  Gauge,
  Quote,
  Radar,
  RefreshCw,
  Send,
  Sparkles,
  Swords,
  Target,
  TrendingUp,
  Wallet,
  Wand2,
  type LucideIcon,
} from "lucide-react"
import { PageHero } from "@/components/features/public/PageHero"
import { CtaBand } from "@/components/features/public/CtaBand"
import { SectionLabel } from "@/components/features/landing/primitives/SectionLabel"
import { RevealText } from "@/components/features/landing/primitives/RevealText"
import { MagneticButton } from "@/components/features/landing/primitives/MagneticButton"

/* ------------------------------------------------------------------ */
/* Shared inline link styles                                          */
/* ------------------------------------------------------------------ */

const LINK_LIGHT = "text-indigo-600 hover:text-indigo-700 underline underline-offset-2"
const LINK_DARK = "text-indigo-300 hover:text-indigo-200 underline underline-offset-2"

/* ------------------------------------------------------------------ */
/* Fixed content data                                                  */
/* ------------------------------------------------------------------ */

const CAPABILITIES: { icon: LucideIcon; title: string; desc: React.ReactNode }[] = [
  {
    icon: Quote,
    title: "Complete Citation Ledger",
    desc: "Every citation recorded across configured providers, with URL, provider, triggering question, and timestamp. It establishes the factual record of which content earns AI trust, ending debates built on anecdotes.",
  },
  {
    icon: FileText,
    title: "Page-Level Citation Profiles",
    desc: "A citation history for each of your pages, showing which engines cite it, for which questions, and how often. It identifies your proven citation earners so their structure and depth can be replicated deliberately.",
  },
  {
    icon: Swords,
    title: "Competitor Citation Visibility",
    desc: (
      <>
        The same citation ledger built for competitor domains in your category, feeding straight into{" "}
        <Link href="/features/competitor-intelligence" className={LINK_LIGHT}>
          competitor intelligence
        </Link>
        . It shows exactly which competitor content wins the references you are losing, turning their success into
        your blueprint.
      </>
    ),
  },
  {
    icon: Target,
    title: "Citation Gap Detection",
    desc: "Questions and topics where engines cite weak sources or few sources at all. It surfaces the lowest-resistance opportunities, where well-structured new content can win citations quickly.",
  },
  {
    icon: Fingerprint,
    title: "Source Pattern Analysis",
    desc: "Citation intelligence showing what cited pages share: structure, depth, freshness, and entity clarity. It converts observation into an editorial playbook your team applies to every new piece.",
  },
  {
    icon: Bell,
    title: "Citation Trend Alerts",
    desc: "Notifications when your citations rise, fall, or a competitor takes a reference you previously held. Losses get investigated in days instead of discovered in quarterly reviews.",
  },
]

const HOW_IT_WORKS: { icon: LucideIcon; title: string; desc: React.ReactNode }[] = [
  {
    icon: Compass,
    title: "Your category gets mapped",
    desc: "Citationly identifies the questions buyers ask across your topics and competitor set.",
  },
  {
    icon: Radar,
    title: "Engines are queried continuously",
    desc: "Configured AI providers answer those questions on an ongoing schedule.",
  },
  {
    icon: Database,
    title: "Citations are extracted and structured",
    desc: (
      <>
        Every reference is parsed into the ledger using consistent{" "}
        <Link href="/features/ai-search-analytics" className={LINK_DARK}>
          AI search analytics
        </Link>{" "}
        methodology, deduplicated and attributed.
      </>
    ),
  },
  {
    icon: Sparkles,
    title: "Patterns surface automatically",
    desc: "Gaps, trends, and competitor movements are flagged without analyst effort.",
  },
  {
    icon: Send,
    title: "Recommendations reach your team",
    desc: "Findings convert into specific content actions, and future scans measure whether each action earned the citations it targeted.",
  },
]

const BENEFITS: { icon: LucideIcon; title: React.ReactNode; desc: React.ReactNode }[] = [
  {
    icon: RefreshCw,
    title: "Content strategy gets a feedback loop",
    desc: "Publishing stops being a bet and becomes an experiment with measurable results per page.",
  },
  {
    icon: TrendingUp,
    title: "Authority becomes buildable",
    desc: "Citations compound: engines that cite you once show a measurable tendency to return, so early tracking means early compounding.",
  },
  {
    icon: Wallet,
    title: "Budget defense gets easier",
    desc: "Showing leadership which content earned machine citations is a stronger renewal argument than traffic alone.",
  },
  {
    icon: Eye,
    title: "Competitive position becomes visible",
    desc: (
      <>
        Paired with{" "}
        <Link href="/features/share-of-voice" className={LINK_LIGHT}>
          Share of Voice
        </Link>
        , you know precisely where rivals hold citation ground and where they are exposed.
      </>
    ),
  },
  {
    icon: Gauge,
    title: (
      <>
        <Link href="/features/ai-visibility-dashboard" className={`font-semibold ${LINK_LIGHT}`}>
          AI visibility
        </Link>{" "}
        improves at the root
      </>
    ),
    desc: "Citations drive presence in answers, so citation gains flow directly into overall AI search performance.",
  },
]

const WHY_CITATIONLY: { icon: LucideIcon; title: string; desc: React.ReactNode }[] = [
  {
    icon: BookOpen,
    title: "Citations in context, not in isolation",
    desc: "Every citation links to the question, answer, and engine that produced it, because a raw count without context cannot guide strategy.",
  },
  {
    icon: Swords,
    title: "Competitor coverage as standard",
    desc: "Your ledger includes rival domains from day one, since citation share is inherently comparative.",
  },
  {
    icon: Wand2,
    title: "Connected to action",
    desc: (
      <>
        Citation findings flow into the platform&apos;s{" "}
        <Link href="/generative-engine-optimization" className={LINK_LIGHT}>
          optimization recommendations
        </Link>{" "}
        and AI search optimization workflows, not into a spreadsheet that goes stale.
      </>
    ),
  },
  {
    icon: CheckCircle2,
    title: "Consistent methodology across engines",
    desc: "Six engines, one extraction standard, so numbers are comparable rather than six incompatible datasets.",
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
        eyebrow="AI Citation Tracking"
        title="Citations are how AI engines vote. Count yours."
        gradientWords={["vote"]}
        description="When an AI engine cites a source, it names the content it trusts. Citationly records every citation in your category, showing which of your pages earn trust, which competitors win instead, and where your next gains are."
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
      {/* Section 1 - The challenge                                    */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-12">
            <div className="flex justify-center">
              <SectionLabel dark={false}>The problem</SectionLabel>
            </div>
            <RevealText
              as="h2"
              text="The most important signal in AI search is one nobody collects"
              gradientWords={["collects"]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-4 max-w-3xl mx-auto"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-5 text-muted-foreground leading-relaxed text-[15px] md:text-base max-w-3xl mx-auto"
          >
            <p>
              Every day, AI engines answer questions in your category and attach citations to those answers. Each
              citation is a decision: out of everything published on the topic, the engine selected specific
              sources to reference. Those selections determine which brands buyers see, click, and trust.
            </p>
            <p>
              For content and SEO teams, this creates an uncomfortable situation. You may be publishing
              consistently, ranking respectably, and still earning almost no citations, because engines select
              sources using different signals than search rankings reward. Backlink profiles and domain metrics do
              not map cleanly onto citation behavior.
            </p>
            <p>
              Without citation data, teams keep optimizing for the old scoreboard while the new one goes unwatched.
              The cost compounds quietly. Every quarter without citation measurement is a quarter of content
              investment made blind, while competitors who earn citations become the default sources engines return
              to again and again.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 2 - The solution                                     */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24 bg-indigo-50/40 border-y border-black/5">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-12">
            <div className="flex justify-center">
              <SectionLabel dark={false}>Citation intelligence</SectionLabel>
            </div>
            <RevealText
              as="h2"
              text="AI citation tracking that turns references into strategy"
              gradientWords={["strategy"]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-4 max-w-2xl mx-auto"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-5 text-muted-foreground leading-relaxed text-[15px] md:text-base max-w-3xl mx-auto"
          >
            <p>
              Citationly monitors AI answers across your category continuously and records every citation they
              contain: the cited URL, the citing engine, the question that triggered it, and the answer context
              around it. Over time, this builds a complete citation ledger for your market.
            </p>
            <p>
              This is the foundation of citation intelligence: moving beyond counting references to understanding
              them. Which of your pages do engines trust, and on which topics? Which competitor pages get selected
              when yours do not, and what do those pages have in common? Which questions produce answers with no
              strong citations at all, leaving an open opportunity?
            </p>
            <p>
              The business value is direct. Content budgets are large and contested. Citation data tells you which
              investments earned machine trust and which did not, replacing publication volume with earned
              authority as the measure of content success.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 3 - Key capabilities                                 */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-14">
            <div className="flex justify-center">
              <SectionLabel dark={false}>Capabilities</SectionLabel>
            </div>
            <RevealText
              as="h2"
              text="What the citation ledger gives you"
              gradientWords={["ledger"]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-4"
            />
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground max-w-xl mx-auto"
            >
              Six views into the same reference data, each built for a different question your team needs answered.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CAPABILITIES.map((cap, i) => (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.55, delay: 0.08 + (i % 3) * 0.08 }}
                className="rounded-2xl bg-white border border-black/5 shadow-[0_1px_3px_rgba(15,15,35,0.05)] p-7"
              >
                <div className="w-11 h-11 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center mb-5">
                  <cap.icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{cap.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{cap.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 4 - How it works (dark accent card)                  */}
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
                  <SectionLabel>How it works</SectionLabel>
                </div>
                <RevealText
                  as="h2"
                  text="From first scan to a living citation ledger"
                  className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-white"
                />
              </div>

              <div className="max-w-2xl mx-auto">
                {HOW_IT_WORKS.map((step, i) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-8%" }}
                    transition={{ duration: 0.55, delay: 0.05 + i * 0.08 }}
                    className="relative pl-14 pb-10 last:pb-0"
                  >
                    {i < HOW_IT_WORKS.length - 1 && (
                      <span className="absolute left-4.5 top-9 bottom-0 w-px bg-white/10" />
                    )}
                    <span className="absolute left-0 top-0 w-9 h-9 rounded-lg bg-indigo-500/15 border border-white/10 text-indigo-300 flex items-center justify-center">
                      <step.icon className="w-4 h-4" />
                    </span>
                    <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-indigo-300 mb-1.5">
                      Step {i + 1}
                    </div>
                    <h3 className="text-white font-semibold text-lg mb-1.5">{step.title}</h3>
                    <p className="text-white/55 text-[15px] leading-relaxed">{step.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 5 - Business benefits                                */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-14">
            <div className="flex justify-center">
              <SectionLabel dark={false}>Business impact</SectionLabel>
            </div>
            <RevealText
              as="h2"
              text="What changes when citations become measurable"
              gradientWords={["measurable"]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-4 max-w-2xl mx-auto"
            />
          </div>

          <div className="max-w-2xl mx-auto space-y-6">
            {BENEFITS.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.08 + i * 0.08 }}
                className="flex gap-4"
              >
                <div className="shrink-0 w-9 h-9 rounded-lg bg-indigo-500/10 text-indigo-600 flex items-center justify-center">
                  <benefit.icon className="w-4 h-4" />
                </div>
                <p className="text-[15px] leading-relaxed">
                  <span className="font-semibold text-foreground">{benefit.title}.</span>{" "}
                  <span className="text-muted-foreground">{benefit.desc}</span>
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 6 - Why Citationly                                   */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24 bg-indigo-50/40 border-y border-black/5">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-14">
            <div className="flex justify-center">
              <SectionLabel dark={false}>Why Citationly</SectionLabel>
            </div>
            <RevealText
              as="h2"
              text="Why teams trust this citation ledger"
              gradientWords={["trust"]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-4"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {WHY_CITATIONLY.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.1 + i * 0.1 }}
                className="rounded-2xl bg-white border border-black/5 shadow-[0_1px_3px_rgba(15,15,35,0.05)] p-7"
              >
                <div className="w-11 h-11 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center mb-5">
                  <item.icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Find out who AI engines cite in your category"
        description="Run a free analysis and see your current citations, the competitor pages winning references you are missing, and the open gaps no one has claimed yet."
      />
    </div>
  )
}
