"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowRight,
  DollarSign,
  EyeOff,
  Gauge,
  ShieldCheck,
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

const CHALLENGES: {
  icon: LucideIcon
  title: string
  desc: string
}[] = [
  {
    icon: DollarSign,
    title: "Accuracy under scrutiny",
    desc: "Engines may describe products, rates, terms, or eligibility incorrectly, and in a regulated industry those inaccuracies carry more risk than in most. Financial brand monitoring across engines is hard to sustain manually.",
  },
  {
    icon: Users,
    title: "Crowded comparisons",
    desc: "Comparison sites, review aggregators, and large national brands often dominate the citations for evaluation questions, leaving other institutions underrepresented.",
  },
  {
    icon: EyeOff,
    title: "Competitive blind spots",
    desc: "Without competitor intelligence, teams cannot see which rivals engines favor for the questions that decide shortlists.",
  },
  {
    icon: Gauge,
    title: "No defensible baseline",
    desc: "Leadership in finance expects defensible numbers. Without measurement, teams cannot prove how their financial authority in AI answers is changing.",
  },
]

const BENEFITS: string[] = [
  "Reduce risk by catching inaccurate product or rate descriptions early.",
  "Build financial authority by earning citations for the evaluation questions that shape shortlists.",
  "Gain competitor intelligence that shows exactly where rivals lead.",
  "Report progress to leadership with defensible metrics rather than impressions.",
]

const WORKFLOW: {
  title: string
  desc: string
}[] = [
  {
    title: "Map the questions",
    desc: "Identify the comparison and evaluation questions prospects ask AI engines about your category.",
  },
  {
    title: "Establish the baseline",
    desc: "Scan how engines describe your institution and competitors today.",
  },
  {
    title: "Flag accuracy issues",
    desc: "Review brand monitoring alerts and prioritize corrections with regulatory or reputational weight.",
  },
  {
    title: "Read the competition",
    desc: "Use competitor intelligence to find where rivals win the citations that shape shortlists.",
  },
  {
    title: "Track and report",
    desc: "Measure changes in accuracy, citations, and Share of Voice over time for leadership.",
  },
]

const FAQS: { q: string; a: string }[] = [
  {
    q: "What is financial AI visibility?",
    a: "Financial AI visibility is how accurately and how often AI engines mention and describe a financial institution when prospects ask comparison or evaluation questions. It covers both presence in answers and the accuracy of product and rate descriptions.",
  },
  {
    q: "Why is accuracy especially important in finance?",
    a: "Because product, rate, and eligibility details carry regulatory and reputational weight. An inaccurate description in an AI answer can create risk beyond a simple lost opportunity, which makes monitoring across engines valuable.",
  },
  {
    q: "Can Citationly track our competitors?",
    a: "Yes. Competitor intelligence shows which rival institutions engines favor for the questions that shape shortlists, and Share of Voice quantifies your standing against a named competitor set.",
  },
  {
    q: "Does Citationly work for banks, insurers, and FinTech?",
    a: "Yes. The platform suits any financial brand that prospects research and compare in AI answers, including banks, insurance companies, and FinTech providers.",
  },
  {
    q: "How is this different from traditional financial SEO?",
    a: "Traditional SEO targets rankings on results pages. Financial AI visibility targets how engines describe and cite your institution inside AI-generated answers, measured through mentions, accuracy, and citations rather than positions.",
  },
  {
    q: "How do we get started?",
    a: "Run a free analysis to see how AI engines describe your institution and competitors today, then prioritize accuracy fixes and competitive gaps. A demo can walk your team through a finance-specific setup.",
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
        eyebrow="Finance"
        title="Financial AI visibility: control how AI engines represent your institution"
        gradientWords={["institution"]}
        description="Prospects now ask AI engines to compare banks, explain insurance options, and evaluate FinTech products. Citationly shows how those engines describe your institution and your competitors, and helps you strengthen your position."
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
          <ShieldCheck className="w-4 h-4 text-indigo-500/70 shrink-0" />
          Built for regulated industries where accuracy and credibility are not optional.
        </motion.p>
      </div>

      {/* ---------------------------------------------------------- */}
      {/* Section 1 — Industry overview                                */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="max-w-3xl">
            <SectionLabel dark={false}>Industry Overview</SectionLabel>
            <RevealText
              as="h2"
              text="AI search shapes financial decisions early"
              gradientWords={["early"]}
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
                Financial choices are high-consideration decisions, and the research now starts inside AI
                engines. A prospect comparing accounts, evaluating an insurer, or researching a FinTech product
                often asks an assistant a full question and reads a synthesized answer before ever reaching a
                provider&apos;s site. That answer names specific institutions and cites specific sources,
                shaping the shortlist before any direct contact.
              </p>
              <p>
                Finance AI search combines two pressures. Accuracy matters because financial descriptions
                carry regulatory and reputational weight, and competition matters because prospects are
                actively comparing named institutions. Enterprise AI search intelligence gives financial
                brands visibility into both at once.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 2 — Challenges (card grid)                           */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24 bg-indigo-50/40 border-y border-black/5">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-14">
            <div className="flex justify-center">
              <SectionLabel dark={false}>Challenges</SectionLabel>
            </div>
            <RevealText
              as="h2"
              text="Where financial AI answers go wrong"
              gradientWords={["wrong"]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-4"
            />
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-muted-foreground max-w-xl mx-auto"
            >
              The same four problems come up again and again for banks, insurers, and FinTech teams.
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
      {/* Section 3 — How Citationly helps                              */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="max-w-3xl">
            <SectionLabel dark={false}>How Citationly Helps</SectionLabel>
            <RevealText
              as="h2"
              text="How Citationly supports financial institutions"
              gradientWords={["institutions"]}
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
                Citationly gives financial teams a measured view of how AI engines describe their institution
                and how they stack up against competitors. The platform runs the comparison and evaluation
                questions prospects actually ask through the major engines, records how each institution is
                represented, and flags inaccuracies for review.
              </p>
              <p>
                Because the data is comparative from the start, teams see not only their own presence but who
                wins the citations they are missing. That competitive clarity is what turns a visibility report
                into a strategy. Where an engine describes a product incorrectly, the issue surfaces as an
                alert; where a competitor dominates a high-intent question, the gap becomes a clear target.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 4 — Industry benefits (bulleted)                     */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24 bg-indigo-50/40 border-y border-black/5">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-16 items-start">
            <div>
              <SectionLabel dark={false}>Industry Benefits</SectionLabel>
              <RevealText
                as="h2"
                text="What financial teams gain"
                gradientWords={["gain"]}
                className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-4"
              />
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-muted-foreground leading-relaxed"
              >
                A measurement-first approach to financial AI visibility delivers several benefits.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.55, delay: 0.15 }}
              className="rounded-2xl bg-white border border-black/5 shadow-[0_1px_3px_rgba(15,15,35,0.05)] p-7"
            >
              <ul className="space-y-4">
                {BENEFITS.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-indigo-500/10 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    </span>
                    <span className="text-[15px] text-foreground/80 leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 5 — Relevant platform capabilities                   */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="max-w-3xl">
            <SectionLabel dark={false}>Platform Capabilities</SectionLabel>
            <RevealText
              as="h2"
              text="Platform capabilities built for finance"
              gradientWords={["finance"]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-6"
            />
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-muted-foreground leading-relaxed text-[15px] md:text-base"
            >
              The features most relevant to finance:{" "}
              <Link
                href="/features/brand-monitoring"
                className="text-indigo-600 hover:text-indigo-700 underline underline-offset-2"
              >
                Brand Monitoring
              </Link>{" "}
              tracks how engines describe your products, terms, and institution, flagging inaccuracies for
              review.{" "}
              <Link
                href="/features/competitor-intelligence"
                className="text-indigo-600 hover:text-indigo-700 underline underline-offset-2"
              >
                Competitor Intelligence
              </Link>{" "}
              shows which rival institutions engines favor for comparison and evaluation questions, and why.{" "}
              <Link
                href="/features/citation-tracking"
                className="text-indigo-600 hover:text-indigo-700 underline underline-offset-2"
              >
                AI Citation Tracking
              </Link>{" "}
              reveals which sources engines cite in your category, exposing where your content should win
              references. The{" "}
              <Link
                href="/features/ai-visibility-dashboard"
                className="text-indigo-600 hover:text-indigo-700 underline underline-offset-2"
              >
                visibility dashboard
              </Link>{" "}
              ties these together across products and markets.{" "}
              <Link
                href="/features/share-of-voice"
                className="text-indigo-600 hover:text-indigo-700 underline underline-offset-2"
              >
                Share of Voice
              </Link>{" "}
              is available where competitive benchmarking is a priority.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 6 — Typical workflow                                 */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24 bg-indigo-50/40 border-y border-black/5">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-14">
            <div className="flex justify-center">
              <SectionLabel dark={false}>Typical Workflow</SectionLabel>
            </div>
            <RevealText
              as="h2"
              text="A typical financial AI visibility workflow"
              gradientWords={["workflow"]}
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
      {/* Section 7 — Business outcomes                                */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="max-w-3xl">
            <SectionLabel dark={false}>Business Outcomes</SectionLabel>
            <RevealText
              as="h2"
              text="The business outcomes that follow"
              gradientWords={["outcomes"]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-6"
            />
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-muted-foreground leading-relaxed text-[15px] md:text-base"
            >
              Financial institutions that measure and improve their financial AI visibility tend to see
              product and rate descriptions become more accurate, owned content earn a larger share of
              citations for evaluation questions, and marketing gain a clear, defensible view of competitive
              standing in the channel where comparisons increasingly happen. The overall effect is stronger
              financial authority where prospects now form their shortlists.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 8 — FAQ                                              */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24 border-t border-black/5">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-16">
            <div>
              <SectionLabel dark={false}>Finance FAQ</SectionLabel>
              <RevealText
                as="h2"
                text="Questions, answered."
                gradientWords={["answered"]}
                className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-4"
              />
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-muted-foreground max-w-md"
              >
                What marketing, risk, and compliance teams usually ask before starting.
              </motion.p>
            </div>

            <div className="flex flex-col gap-8">
              {FAQS.map((item, i) => (
                <motion.div
                  key={item.q}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                >
                  <h3 className="font-semibold text-foreground mb-2">{item.q}</h3>
                  <p className="text-[15px] text-muted-foreground leading-relaxed">{item.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="See your standing in AI answers"
        description="Run a free analysis and see how AI engines describe your institution, where competitors lead, and where your financial authority can grow."
        primaryLabel="Start Free Analysis"
      />

      <div className="pb-20 md:pb-24 -mt-8 text-center">
        <Link
          href="/contact"
          className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
        >
          Talk to an Expert
        </Link>
        <p className="mt-4 text-[13px] text-muted-foreground">
          Explore other industries:{" "}
          <Link href="/solutions/healthcare" className="text-indigo-600 hover:text-indigo-700 underline underline-offset-2">
            Healthcare
          </Link>{" "}
          &middot;{" "}
          <Link href="/solutions/retail" className="text-indigo-600 hover:text-indigo-700 underline underline-offset-2">
            Retail
          </Link>
        </p>
      </div>
    </div>
  )
}
