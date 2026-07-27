"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  AlertTriangle,
  ArrowRight,
  Award,
  BarChart3,
  Bell,
  Building2,
  Database,
  FileText,
  Gauge,
  Globe,
  LayoutDashboard,
  Layers,
  ListChecks,
  MessageSquareText,
  Network,
  PieChart,
  Radar,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
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
    icon: Gauge,
    title: "Unified Visibility Score",
    desc: "A single composite score reflecting how present your brand is across all monitored AI engines. It gives leadership one trackable number for AI search performance, ending the reporting ambiguity that stalls investment decisions.",
  },
  {
    icon: BarChart3,
    title: "Per-Engine Breakdown",
    desc: "Individual visibility views for each AI engine, since a brand strong on ChatGPT can be invisible on Perplexity. It directs optimization effort to the engines where your buyers are and your presence is weakest.",
  },
  {
    icon: TrendingUp,
    title: "Trend Tracking",
    desc: "Visibility movement over days, weeks, and quarters, annotated against your content and campaign activity. It connects the work your team ships to the results engines show, making improvement attributable.",
  },
  {
    icon: Layers,
    title: "Topic-Level Visibility",
    desc: "Visibility measured per topic and question cluster, not just at brand level. It reveals exactly which conversations you are absent from, so content planning targets real gaps.",
  },
  {
    icon: PieChart,
    title: "Share of Voice Snapshot",
    desc: (
      <>
        Your visibility placed side by side with named competitors, summarized from the full{" "}
        <Link href="/features/share-of-voice" className={LINK_LIGHT}>
          Share of Voice
        </Link>{" "}
        module. Frames every number competitively, because visibility only matters relative to who buyers see
        instead of you.
      </>
    ),
  },
  {
    icon: MessageSquareText,
    title: "Sentiment and Context Signals",
    desc: "Indicators showing whether AI engines mention your brand positively, neutrally, or with inaccuracies flagged for review. It separates good visibility from harmful visibility, so teams fix representation problems, not just presence problems.",
  },
  {
    icon: Bell,
    title: "Custom Views and Alerts",
    desc: "Saved dashboard views per team, plus alerts when visibility shifts beyond thresholds you set. The right people see the right slice of data without analyst time spent building reports manually.",
  },
]

const HOW_IT_WORKS: { icon: LucideIcon; title: string; desc: React.ReactNode }[] = [
  {
    icon: Target,
    title: "Define your brand space",
    desc: "Add your brand, competitors, and the topics that matter to your market.",
  },
  {
    icon: Radar,
    title: "Engines get queried continuously",
    desc: "Citationly runs your market's real questions through all six engines on an ongoing schedule.",
  },
  {
    icon: Database,
    title: "Answers become structured data",
    desc: "Every mention, citation, and context signal is extracted and scored using consistent AI search analytics methodology.",
  },
  {
    icon: LayoutDashboard,
    title: "The dashboard assembles the picture",
    desc: "Scores, trends, and competitive comparisons update as new data arrives.",
  },
  {
    icon: ListChecks,
    title: "Your team acts on what it sees",
    desc: (
      <>
        Gaps and drops route into{" "}
        <Link href="/generative-engine-optimization" className={LINK_DARK}>
          optimization recommendations
        </Link>
        , and the dashboard then measures whether the fixes worked.
      </>
    ),
  },
]

const BENEFITS: { icon: LucideIcon; title: React.ReactNode; desc: React.ReactNode }[] = [
  {
    icon: Zap,
    title: "Decisions get faster",
    desc: "Budget, content, and channel debates resolve against shared numbers instead of competing impressions.",
  },
  {
    icon: Award,
    title: "Authority compounds",
    desc: "Teams that measure early build visibility leads that late movers must overcome question by question.",
  },
  {
    icon: AlertTriangle,
    title: "Risk surfaces early",
    desc: "A visibility drop on the dashboard is a warning weeks before it becomes a pipeline conversation.",
  },
  {
    icon: FileText,
    title: "Reporting becomes credible",
    desc: (
      <>
        AI search enters your marketing{" "}
        <Link href="/features/reports" className={LINK_LIGHT}>
          reports
        </Link>{" "}
        with the same rigor as paid and organic, which is what earns it sustained budget.
      </>
    ),
  },
  {
    icon: Sparkles,
    title: "Your organization becomes AI ready",
    desc: "The dashboard builds the habit of managing AI channels deliberately, a capability that grows more valuable every quarter.",
  },
]

const WHY_CITATIONLY: { icon: LucideIcon; title: string; desc: React.ReactNode }[] = [
  {
    icon: Globe,
    title: "Breadth without dilution",
    desc: "Six engines monitored with equal depth. Many tools cover one or two engines well and the rest superficially, which produces a distorted picture of AI visibility.",
  },
  {
    icon: ShieldCheck,
    title: "Methodology you can defend",
    desc: "Every score traces to observable answers. When a CFO asks where the number comes from, your team has a real answer.",
  },
  {
    icon: Network,
    title: "Built as a platform, not a widget",
    desc: (
      <>
        The dashboard connects directly to{" "}
        <Link href="/features/citation-tracking" className={LINK_LIGHT}>
          citation tracking
        </Link>
        ,{" "}
        <Link href="/features/competitor-intelligence" className={LINK_LIGHT}>
          competitor intelligence
        </Link>
        , and reporting, so insight flows into action inside one AI visibility platform.
      </>
    ),
  },
  {
    icon: Building2,
    title: "Designed for enterprise reporting",
    desc: "Exports, shared views, and role-based access were built in from the start, not added later.",
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
        eyebrow="AI Visibility Dashboard"
        title="Every AI engine's view of your brand, on one screen"
        gradientWords={["screen"]}
        description="The Citationly dashboard turns scattered AI answers into a single measure of AI visibility: where you appear, how often, in what context, and whether it is improving."
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
              text="You cannot manage a channel you cannot see"
              gradientWords={["see"]}
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
              Ask your team a simple question: how visible is our brand in AI search this month compared to last?
              For most enterprises, no one can answer. The data exists, scattered across millions of AI-generated
              answers, but nothing collects it, structures it, or puts it in front of the people who need it.
            </p>
            <p>
              Traditional SEO dashboards do not help. They report rankings, impressions, and clicks, all metrics
              from a world where users see a results page and choose a link. In AI search, users receive one
              synthesized answer. Your brand is either in it or it is not, and no rank tracker will ever tell you
              which.
            </p>
            <p>
              Meanwhile, the stakes rise every quarter. Buyers increasingly treat AI answers as shortlists. If your
              visibility inside those answers is falling, the first symptom you notice will be pipeline, and by
              then the problem is months old. The teams that manage AI search well all start the same way: they
              make it visible.
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
              <SectionLabel dark={false}>The platform</SectionLabel>
            </div>
            <RevealText
              as="h2"
              text="One dashboard that makes AI visibility a managed metric"
              gradientWords={["managed"]}
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
              The AI Visibility Dashboard is the command center of the Citationly platform. It aggregates every
              brand mention, citation, and answer observation collected across ChatGPT, Gemini, Claude, Perplexity,
              Copilot, and Grok, and presents them as clear scores, trends, and comparisons.
            </p>
            <p>
              The purpose is simple: turn AI visibility from an anecdote into a number. A number can be baselined,
              targeted, reported to a board, and tied to the work your team does. An anecdote can only be worried
              about.
            </p>
            <p>
              For enterprises, this changes the conversation. Instead of &ldquo;we think we are underrepresented in
              AI answers,&rdquo; your team says &ldquo;our visibility score is up eleven points this quarter, driven
              by citation gains on Perplexity and Gemini, and here is the content that did it.&rdquo; That is what
              AI visibility software should make possible.
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
              text="What the dashboard gives you"
              gradientWords={["dashboard"]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-4"
            />
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground max-w-xl mx-auto"
            >
              Seven views into the same underlying data, each built for a different question your team needs
              answered.
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
                  text="From setup to a living visibility picture"
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
              text="What changes when visibility becomes a metric"
              gradientWords={["metric"]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-4 max-w-2xl mx-auto"
            />
          </div>

          <div className="max-w-2xl mx-auto space-y-6">
            {BENEFITS.map((benefit, i) => (
              <motion.div
                key={typeof benefit.title === "string" ? benefit.title : i}
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
              text="Why teams choose this dashboard"
              gradientWords={["choose"]}
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
        title="See your visibility score today"
        description="Run a free analysis and the dashboard populates with your brand's current position across six AI engines, benchmarked against competitors."
      />
    </div>
  )
}
