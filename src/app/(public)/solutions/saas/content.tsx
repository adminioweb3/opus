"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowRight,
  Eye,
  FileWarning,
  Layers,
  Target,
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

const CHALLENGES: {
  icon: LucideIcon
  title: string
  desc: string
}[] = [
  {
    icon: Eye,
    title: "Category questions have invisible winners",
    desc: "Your category's “best tool” and “alternatives to” questions get answered thousands of times daily, and you have no idea how often you are in the answer.",
  },
  {
    icon: FileWarning,
    title: "Comparison answers may be deciding against you",
    desc: "Engines compare you to rivals using whatever they ingested, including outdated pricing pages, old feature sets, and a competitor's own comparison content.",
  },
  {
    icon: Layers,
    title: "Review-site dependence has quietly deepened",
    desc: "Engines lean heavily on aggregators and review platforms for SaaS answers, and where those sources are thin or stale about your product, the answers inherit the weakness.",
  },
  {
    icon: Target,
    title: "Launches do not register",
    desc: "You ship a major feature, and engines keep describing last year's product, because nothing you published was structured for them to pick up.",
  },
]

const BENEFITS: {
  challenge: string
  solution: string
  outcome: string
}[] = [
  {
    challenge: "Invisible category answers.",
    solution: "Continuous monitoring of the queries that build shortlists.",
    outcome: "A metric growth teams can own, target, and move.",
  },
  {
    challenge: "Engines framing you from stale sources.",
    solution: "Per-rival comparison monitoring with source tracing.",
    outcome: "Positioning work aimed at the exact claims costing you evaluations.",
  },
  {
    challenge: "Guessing where to invest between owned content and review platforms.",
    solution: "Citation analysis showing which sources drive your category's answers.",
    outcome: "Effort placed where engines actually look.",
  },
  {
    challenge: "Shipped features engines never mention.",
    solution: "Monitoring product descriptions after each release.",
    outcome: "Launch checklists that include the AI answer surface, verified.",
  },
  {
    challenge: "Unmeasurable category creation.",
    solution: "Tracking whether engines adopt your framing and terminology.",
    outcome: "Early evidence for the board that the category bet is or is not taking hold.",
  },
  {
    challenge: "CAC pressure beside an unmeasured surface.",
    solution: "Shortlist and citation metrics assigned to a growth owner.",
    outcome: "A high-intent acquisition surface worked as deliberately as paid.",
  },
]

const WORKFLOW: {
  title: string
  desc: string
}[] = [
  {
    title: "Map the category",
    desc: "Product, competitors, and the evaluation questions that matter are configured; first scans establish shortlist baseline.",
  },
  {
    title: "Diagnose the sources",
    desc: "Citation analysis shows what drives your category's answers: owned pages, review platforms, or third-party content.",
  },
  {
    title: "Work the surface",
    desc: "AI search optimization effort goes where the diagnosis points: comparison pages, review-platform depth, structured product content.",
  },
  {
    title: "Verify every launch",
    desc: "Post-release scans confirm engines picked up the new capability and description.",
  },
  {
    title: "Report the trend",
    desc: "Shortlist presence and Share of Voice join the growth dashboard beside pipeline and CAC metrics.",
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
        eyebrow="Solutions for SaaS Companies"
        title="The shortlist is being written without you in the room"
        gradientWords={["shortlist"]}
        description="“Best tool for X” questions now go to AI engines first, and the answers name three or four products, not ten blue links. Citationly shows SaaS teams whether their product makes those answers, who takes the slots when it does not, and how to change that."
        wide
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
      {/* Section 1 - Industry overview                                */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="max-w-3xl">
            <SectionLabel dark={false}>Industry Overview</SectionLabel>
            <RevealText
              as="h2"
              text="SaaS buying moved to the question layer"
              gradientWords={["question"]}
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
                No industry feels the AI search shift faster than SaaS, because no buying process was
                already so research-driven. Evaluations that used to start with a search, a review site,
                and a comparison spreadsheet now start with a conversation: what are the best options for
                this problem, compare these two, what do teams like ours use. The engine answers with a
                synthesized shortlist, and products absent from it lose deals they never knew existed.
              </p>
              <p>
                This concentrates product discoverability into a brutally small surface. A results page
                had room for the category leader, the challengers, and the long tail. A generated answer
                names a handful of products and moves on. The mechanics behind those selections, which
                sources engines cite, how they describe each product, which use cases they associate with
                which names, are exactly what traditional funnel analytics cannot see, and for products
                acquired through inbound and product-led motions, that blind spot sits at the top of the
                entire customer acquisition model.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 2 - Challenges (card grid)                           */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24 bg-indigo-50/40 border-y border-black/5">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-14">
            <div className="flex justify-center">
              <SectionLabel dark={false}>Challenges</SectionLabel>
            </div>
            <RevealText
              as="h2"
              text="The problems SaaS teams bring to us"
              gradientWords={["us"]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-4"
            />
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-muted-foreground max-w-xl mx-auto"
            >
              An AI visibility platform exists to remove the blind spot: measure the shortlists, understand
              the selections, and give growth teams a way to work the surface deliberately.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CHALLENGES.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.55, delay: 0.1 + i * 0.1 }}
                className="rounded-2xl bg-white border border-black/5 shadow-[0_1px_3px_rgba(15,15,35,0.05)] p-7"
              >
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center shrink-0">
                    <c.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-foreground text-lg">{c.title}</h3>
                </div>
                <p className="text-[15px] text-muted-foreground leading-relaxed">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 3 - How Citationly helps                             */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="max-w-3xl">
            <SectionLabel dark={false}>How Citationly Helps</SectionLabel>
            <RevealText
              as="h2"
              text="Measure the shortlist, then work it"
              gradientWords={["shortlist"]}
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
                Citationly monitors the questions that drive SaaS evaluations, category queries, comparison
                queries, alternative-seeking queries, across six engines continuously, and turns the answers
                into structured data: when your product appears, how it is described, which sources earned
                the mention, and who occupies the slots you miss.
              </p>
              <p>
                From there the growth motion is concrete. Citation data shows whether mentions trace to your
                own content, review platforms, or third-party posts, telling you which source investments
                actually move answers in your category. Comparison monitoring reveals how engines frame you
                against each rival, so positioning work targets the specific claims engines repeat. Accuracy
                flags catch stale product descriptions after launches, with the source attached, so the fix
                is a task rather than a mystery.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 4 - Key benefits (challenge/solution/outcome)        */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24 bg-indigo-50/40 border-y border-black/5">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-14">
            <div className="flex justify-center">
              <SectionLabel dark={false}>Key Benefits</SectionLabel>
            </div>
            <RevealText
              as="h2"
              text="What SaaS teams gain"
              gradientWords={["gain"]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {BENEFITS.map((b, i) => (
              <motion.div
                key={b.challenge}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.55, delay: 0.06 + i * 0.08 }}
                className="rounded-2xl bg-white border border-black/5 shadow-[0_1px_3px_rgba(15,15,35,0.05)] p-6"
              >
                <div className="text-[11px] font-semibold tracking-[0.1em] uppercase text-muted-foreground/70 mb-1">Challenge</div>
                <p className="text-sm text-foreground/80 mb-3">{b.challenge}</p>
                <div className="text-[11px] font-semibold tracking-[0.1em] uppercase text-indigo-600/80 mb-1">Solution</div>
                <p className="text-sm text-foreground/80 mb-3">{b.solution}</p>
                <div className="text-[11px] font-semibold tracking-[0.1em] uppercase text-muted-foreground/70 mb-1">Outcome</div>
                <p className="text-sm text-foreground/80">{b.outcome}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 5 - Relevant platform capabilities                   */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="max-w-3xl">
            <SectionLabel dark={false}>Platform Capabilities</SectionLabel>
            <RevealText
              as="h2"
              text="The parts of the platform SaaS teams live in"
              gradientWords={["live"]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-6"
            />
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-muted-foreground leading-relaxed text-[15px] md:text-base"
            >
              <Link href="/features/citation-tracking" className="text-indigo-600 hover:text-indigo-700 underline underline-offset-2">
                AI Citation Tracking
              </Link>{" "}
              for the source-level view of what drives category answers.{" "}
              <Link href="/features/ai-visibility-dashboard" className="text-indigo-600 hover:text-indigo-700 underline underline-offset-2">
                AI Visibility Dashboard
              </Link>{" "}
              for shortlist presence and trend.{" "}
              <Link href="/features/competitor-intelligence" className="text-indigo-600 hover:text-indigo-700 underline underline-offset-2">
                Competitor Intelligence
              </Link>{" "}
              for comparison framing and rival movement.{" "}
              <Link href="/features/brand-monitoring" className="text-indigo-600 hover:text-indigo-700 underline underline-offset-2">
                Brand Monitoring
              </Link>{" "}
              for stale or inaccurate product descriptions. Question Research for the evaluation queries your
              category actually generates.{" "}
              <Link href="/features/share-of-voice" className="text-indigo-600 hover:text-indigo-700 underline underline-offset-2">
                Share of Voice
              </Link>{" "}
              for the category-level number leadership tracks.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 6 - Typical workflow                                 */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24 bg-indigo-50/40 border-y border-black/5">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-14">
            <div className="flex justify-center">
              <SectionLabel dark={false}>Typical Workflow</SectionLabel>
            </div>
            <RevealText
              as="h2"
              text="How a SaaS team runs Citationly"
              gradientWords={["Citationly"]}
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
      {/* Section 7 - Business outcomes                                */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="max-w-3xl">
            <SectionLabel dark={false}>Business Outcomes</SectionLabel>
            <RevealText
              as="h2"
              text="What changes in a quarter or two"
              gradientWords={["quarter"]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-6"
            />
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-muted-foreground leading-relaxed text-[15px] md:text-base"
            >
              Shortlist presence stops being a rumor and becomes a growth metric with an owner. Positioning
              debates get settled by what engines actually say rather than internal opinion. Launch processes
              gain a verification step that catches stale descriptions before prospects do. Customer
              acquisition planning gains its first real view of the surface where evaluations now begin. And
              in categories still forming, the team gets the earliest available external signal on whether
              its framing is winning.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 8 - Why Citationly                                   */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24 bg-[#050508] relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(45% 55% at 15% 10%, rgba(91,91,255,0.18), transparent 70%), radial-gradient(40% 50% at 90% 20%, rgba(168,85,247,0.12), transparent 70%)",
          }}
        />
        <div className="landing-noise" />
        <div className="container relative mx-auto px-6 max-w-4xl">
          <div className="text-center mb-10">
            <div className="flex justify-center">
              <SectionLabel>Why Citationly</SectionLabel>
            </div>
            <RevealText
              as="h2"
              text="Why SaaS teams choose Citationly"
              gradientWords={["Citationly"]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-white"
            />
          </div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-white/60 leading-relaxed text-[15px] md:text-base text-center max-w-2xl mx-auto"
          >
            SaaS teams are the hardest audience for an AI visibility platform to serve, because they are
            measurement-native: they will decompose your metrics, question your methodology, and integrate
            your data into their own stack within the first week. Citationly is built for exactly that
            customer. Every number traces to real answers, exports meet your BI where it lives, and the
            platform&apos;s own team ships against the same shortlist dynamics you do, in a category we are
            helping define. That last part matters more than it sounds: we use this platform on ourselves,
            in a competitive AI-native category, which keeps the roadmap honest about what growth teams
            actually need.
          </motion.p>
        </div>
      </section>

      <CtaBand
        title="Find out if you make the shortlist"
        description="Run a free analysis on your category's evaluation questions and see when your product appears, how engines describe it, and who holds the slots you are missing."
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
