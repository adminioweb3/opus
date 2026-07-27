"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowRight,
  EyeOff,
  HelpCircle,
  Megaphone,
  Rocket,
  Shuffle,
  Swords,
  Wallet,
  type LucideIcon,
} from "lucide-react"
import { PageHero } from "@/components/features/public/PageHero"
import { CtaBand } from "@/components/features/public/CtaBand"
import { SectionLabel } from "@/components/features/landing/primitives/SectionLabel"
import { RevealText } from "@/components/features/landing/primitives/RevealText"
import { MagneticButton } from "@/components/features/landing/primitives/MagneticButton"

/* ------------------------------------------------------------------ */
/* Shared motion presets                                              */
/* ------------------------------------------------------------------ */

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

/* ------------------------------------------------------------------ */
/* Fixed content data                                                  */
/* ------------------------------------------------------------------ */

const CHALLENGES: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: Rocket,
    title: "Campaigns launch into unknown territory",
    desc: "A campaign builds demand around a theme, buyers take that theme to an AI engine, and nobody knows whether the answer reinforces the campaign or hands the interest to a competitor.",
  },
  {
    icon: Shuffle,
    title: "The brand story mutates in transit",
    desc: "Positioning crafted carefully in-house gets reassembled by engines from old pages, third-party reviews, and competitor comparisons.",
  },
  {
    icon: HelpCircle,
    title: "Leadership asks questions nobody can answer",
    desc: "\"How are we doing in AI search\" has become a standing executive question, and answering with anecdotes erodes credibility.",
  },
  {
    icon: Wallet,
    title: "Budget defense lacks a number",
    desc: "Without a trend line, AI search work competes for budget against channels with mature reporting, and loses by default.",
  },
  {
    icon: EyeOff,
    title: "Content investment flies blind",
    desc: "Teams produce content that should build brand authority, with no feedback on whether engines actually cite it.",
  },
  {
    icon: Swords,
    title: "Competitors' gains are invisible",
    desc: "A rival can quietly become the default recommendation, and the first sign you see is a shift in pipeline you cannot explain.",
  },
]

interface Benefit {
  title: string
  challenge: string
  solution: string
  outcome: string
}

const BENEFITS: Benefit[] = [
  {
    title: "A brand narrative you can audit",
    challenge: "Not knowing what engines say about your brand.",
    solution: "Continuous mention analysis across six engines.",
    outcome: "A brand story corrected in days instead of discovered in deals.",
  },
  {
    title: "Campaign themes that survive the question",
    challenge: "Campaigns leaking interest to AI answers.",
    solution: "Checking theme-level visibility before and during launch.",
    outcome: "Campaigns reinforced rather than undermined by the channel.",
  },
  {
    title: "An executive-ready metric",
    challenge: "Leadership questions without answers.",
    solution: "Share of Voice with trend and competitive context.",
    outcome: "A standing slide that takes five minutes to produce.",
  },
  {
    title: "Content with a feedback loop",
    challenge: "Content visibility going unmeasured.",
    solution: "Citation tracking per page and topic.",
    outcome: "A content budget steered by what engines demonstrably reward.",
  },
  {
    title: "Competitive awareness on your timeline",
    challenge: "Silent rival gains.",
    solution: "Movement alerts on tracked competitors.",
    outcome: "Counters planned in weeks, not post-mortems written in quarters.",
  },
  {
    title: "Credit for the wins",
    challenge: "Unattributable improvement.",
    solution: "Baselines and annotated trend history.",
    outcome: "A team that can prove what its work earned.",
  },
]

const WORKFLOW: { title: string; desc: string }[] = [
  {
    title: "Week One: Baseline",
    desc: "Brand, competitors, and campaign themes are configured; first scans establish where you stand.",
  },
  {
    title: "Ongoing: Monitor",
    desc: "Mention accuracy, sentiment, and Share of Voice update continuously.",
  },
  {
    title: "Monthly: Direct",
    desc: "Topic-level visibility and competitor movement inform the next month's content and campaign emphasis.",
  },
  {
    title: "Per Campaign: Verify",
    desc: "Theme visibility is checked before launch and tracked through flight.",
  },
  {
    title: "Quarterly: Report",
    desc: "The scheduled executive summary carries the trend, the competitive position, and the wins into the business review.",
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
        eyebrow="Solutions for Marketing Teams"
        title="Your brand story now has a co-author. Manage it."
        gradientWords={["co-author"]}
        description="AI engines retell your positioning to thousands of buyers a day, in their own words, from whatever sources they found. Citationly gives marketing teams the AI visibility data to see that retelling, correct it, and win more of it."
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
      {/* Section 1: Industry overview                                */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8 mb-10 max-w-4xl">
            <div className="shrink-0 w-14 h-14 rounded-2xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center">
              <Megaphone className="w-6 h-6" />
            </div>
            <div>
              <SectionLabel dark={false}>Industry Overview</SectionLabel>
              <RevealText
                as="h2"
                text="Marketing's newest channel arrived without a dashboard"
                gradientWords={["dashboard"]}
                className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] leading-[1.15] text-foreground"
              />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-5 text-muted-foreground leading-relaxed text-[15px] md:text-base max-w-3xl"
          >
            <p>
              Marketing teams have absorbed new channels before, and the playbook is familiar: understand the
              behavior, build the measurement, earn the budget, run the program. AI search is the current test of
              that playbook, and it is a demanding one, because the channel shapes buyers while producing no
              impressions, no referrer data, and no native analytics.
            </p>
            <p>
              The behavior shift is well underway. Buyers ask assistants to explain categories, compare options,
              and recommend vendors, and they treat the answers as informed advice. Traditional SEO still matters,
              but it measures a results page that a growing share of research never touches. A brand can rank well
              and still be absent from the synthesized answers where shortlists actually form, which is why AI
              visibility has become a marketing metric in its own right rather than an SEO curiosity.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 2: Business challenges                             */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24 bg-indigo-50/40 border-y border-black/5">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-14">
            <div className="flex justify-center">
              <SectionLabel dark={false}>Business Challenges</SectionLabel>
            </div>
            <RevealText
              as="h2"
              text="Where AI search outruns the marketing playbook"
              gradientWords={["playbook"]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-4"
            />
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            >
              The same six problems show up once a brand takes AI search seriously.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CHALLENGES.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.55, delay: (i % 3) * 0.08 + Math.floor(i / 3) * 0.05, ease: EASE }}
                className="rounded-2xl bg-white border border-black/5 shadow-[0_1px_3px_rgba(15,15,35,0.05)] p-7"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 border border-indigo-100">
                  <item.icon className="w-[18px] h-[18px]" />
                </div>
                <h3 className="text-base font-semibold text-foreground tracking-[-0.01em] mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 3: How Citationly helps                             */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="max-w-3xl">
            <SectionLabel dark={false}>How Citationly Helps</SectionLabel>
            <RevealText
              as="h2"
              text="Instrumentation first, then management"
              gradientWords={["management"]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-6"
            />
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="space-y-5 text-muted-foreground leading-relaxed text-[15px] md:text-base"
            >
              <p>
                Citationly gives marketing teams the same foundation every managed channel rests on: measurement,
                diagnosis, and reporting, connected in one workflow. Monitoring runs continuously across six
                engines, converting AI answers into brand mentions, citations, sentiment, and Share of Voice.
              </p>
              <p>
                Brand monitoring flags where engines describe your products or pricing incorrectly, with the
                likely source attached so corrections land at the root. Competitor tracking shows which rivals
                hold which conversations. And because everything flows into scheduled reporting, the Monday
                meeting gets a channel update instead of a shrug.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 4: Key benefits                                     */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24 bg-indigo-50/40 border-y border-black/5">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-14">
            <div className="flex justify-center">
              <SectionLabel dark={false}>Key Benefits</SectionLabel>
            </div>
            <RevealText
              as="h2"
              text="What changes once the channel is measured"
              gradientWords={["measured"]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-4"
            />
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            >
              Each challenge above maps to a concrete shift once the platform is running.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BENEFITS.map((benefit, i) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.55, delay: (i % 3) * 0.08 + Math.floor(i / 3) * 0.05, ease: EASE }}
                className="rounded-2xl bg-white border border-black/5 shadow-[0_1px_3px_rgba(15,15,35,0.05)] p-6"
              >
                <h3 className="font-semibold text-foreground mb-4 leading-snug">{benefit.title}</h3>
                <div className="space-y-3">
                  <div>
                    <span className="block text-[10px] font-semibold tracking-[0.14em] uppercase text-amber-600/80 mb-1">
                      Challenge
                    </span>
                    <p className="text-[13.5px] text-muted-foreground leading-relaxed">{benefit.challenge}</p>
                  </div>
                  <div>
                    <span className="block text-[10px] font-semibold tracking-[0.14em] uppercase text-indigo-600/80 mb-1">
                      Solution
                    </span>
                    <p className="text-[13.5px] text-muted-foreground leading-relaxed">{benefit.solution}</p>
                  </div>
                  <div>
                    <span className="block text-[10px] font-semibold tracking-[0.14em] uppercase text-emerald-600/80 mb-1">
                      Outcome
                    </span>
                    <p className="text-[13.5px] text-muted-foreground leading-relaxed">{benefit.outcome}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 5: Relevant platform capabilities                   */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="max-w-3xl">
            <SectionLabel dark={false}>Platform Capabilities</SectionLabel>
            <RevealText
              as="h2"
              text="Built for marketing's reporting rhythm"
              gradientWords={["rhythm"]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-6"
            />
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-muted-foreground leading-relaxed text-[15px] md:text-base"
            >
              The features most relevant to marketing teams:{" "}
              <Link
                href="/features/ai-visibility-dashboard"
                className="text-indigo-600 hover:text-indigo-700 underline underline-offset-2"
              >
                AI Visibility Dashboard
              </Link>{" "}
              for the headline score and trend leadership sees.{" "}
              <Link
                href="/features/brand-monitoring"
                className="text-indigo-600 hover:text-indigo-700 underline underline-offset-2"
              >
                Brand Monitoring
              </Link>{" "}
              for mention accuracy, sentiment, and source tracing.{" "}
              <Link
                href="/features/share-of-voice"
                className="text-indigo-600 hover:text-indigo-700 underline underline-offset-2"
              >
                Share of Voice
              </Link>{" "}
              for the competitive percentage that anchors reporting.{" "}
              <Link
                href="/features/competitor-intelligence"
                className="text-indigo-600 hover:text-indigo-700 underline underline-offset-2"
              >
                Competitor Intelligence
              </Link>{" "}
              for movement alerts and positioning comparison.{" "}
              <Link
                href="/features/reports"
                className="text-indigo-600 hover:text-indigo-700 underline underline-offset-2"
              >
                Reports
              </Link>{" "}
              for scheduled executive summaries that assemble themselves.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 6: Typical workflow                                 */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24 bg-indigo-50/40 border-y border-black/5">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-14">
            <div className="flex justify-center">
              <SectionLabel dark={false}>Typical Workflow</SectionLabel>
            </div>
            <RevealText
              as="h2"
              text="A workflow that runs on marketing's calendar"
              gradientWords={["calendar"]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-4"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {WORKFLOW.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.55, delay: 0.08 + i * 0.1 }}
                className="rounded-2xl bg-white border border-black/5 shadow-[0_1px_3px_rgba(15,15,35,0.05)] p-6"
              >
                <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-600 flex items-center justify-center text-sm font-semibold mb-4">
                  {i + 1}
                </div>
                <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-[13.5px] text-muted-foreground leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 7: Business outcomes                                */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="max-w-3xl">
            <SectionLabel dark={false}>Business Outcomes</SectionLabel>
            <RevealText
              as="h2"
              text="What changes after a few quarters"
              gradientWords={["quarters"]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-6"
            />
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-muted-foreground leading-relaxed text-[15px] md:text-base"
            >
              Teams that run this workflow report a consistent pattern: AI visibility moves from anxiety to agenda
              item. The brand&apos;s machine-told story gets audited and corrected. Share of Voice enters standard
              reporting beside organic and paid metrics. Content decisions gain an evidence layer they never had.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 8: Why Citationly (dark accent section)             */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, ease: EASE }}
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

            <div className="relative text-center">
              <div className="flex justify-center">
                <SectionLabel>Why Citationly</SectionLabel>
              </div>
              <RevealText
                as="h2"
                text="Depth for analysts, clarity for the room"
                gradientWords={["room"]}
                className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-white mb-6"
              />
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="max-w-2xl mx-auto space-y-4 text-white/55 leading-relaxed"
              >
                <p>
                  Marketing teams need two things from this category that rarely come together: depth that
                  satisfies their analysts and clarity that survives an executive meeting. Citationly was built
                  for both audiences on one dataset.
                </p>
                <p>
                  The platform respects how marketing teams actually work: alerts instead of daily dashboard
                  vigils, reports that assemble themselves, and recommendations concrete enough to hand to a
                  content calendar.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <CtaBand
        title="Find out what AI engines are telling your market"
        description="Run a free analysis and see your brand's AI visibility, Share of Voice, and any answers that need correcting, before the next leadership meeting asks."
        primaryLabel="Start Free Analysis"
      />

      <div className="pb-20 md:pb-24 -mt-8 text-center">
        <Link
          href="/contact"
          className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
        >
          Talk to an Expert
        </Link>
      </div>
    </div>
  )
}
