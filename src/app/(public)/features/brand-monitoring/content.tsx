"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  AlertTriangle,
  ArrowRight,
  Bell,
  ClipboardCheck,
  Eye,
  Gauge,
  Globe,
  Handshake,
  Link2,
  Scale,
  Search,
  ShieldCheck,
  Target,
  TrendingUp,
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
    icon: Eye,
    title: "Continuous Mention Capture",
    desc: "Every brand, product, and executive mention across six engines, recorded with full answer context. Nothing engines say about you goes unobserved, closing the blind spot traditional monitoring leaves open.",
  },
  {
    icon: AlertTriangle,
    title: "Accuracy Flagging",
    desc: "Detection of answers that misstate your pricing, features, availability, or positioning against your verified brand facts. Misinformation gets caught in days, not discovered months later through a confused sales call.",
  },
  {
    icon: Gauge,
    title: "Sentiment and Framing Analysis",
    desc: "Classification of how each mention frames your brand: recommended, neutral, cautionary, or negative. Distinguishes healthy visibility from harmful visibility, so effort goes where the risk is.",
  },
  {
    icon: Search,
    title: "Source Tracing",
    desc: (
      <>
        Identification of the likely source content behind inaccurate or negative answers, connected to{" "}
        <Link href="/features/citation-tracking" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors">
          citation data
        </Link>
        . Correction happens at the root, because fixing the source fixes the thousands of answers built on it.
      </>
    ),
  },
  {
    icon: Users,
    title: "Product and Executive Coverage",
    desc: "Monitoring extends beyond the company name to product lines, brand variants, and named leadership. Protects the full brand surface, since buyers ask engines about products and people, not just companies.",
  },
  {
    icon: Bell,
    title: "Alerting and Escalation",
    desc: "Configurable alerts when new inaccuracies appear, sentiment shifts, or mention volume spikes unusually. Brand and communications teams respond on their timeline, not after the damage has circulated.",
  },
]

const HOW_IT_WORKS: { step: string; title: string; desc: string }[] = [
  {
    step: "01",
    title: "Your brand facts get established",
    desc: "Products, pricing, positioning, and key details are recorded as the verified reference.",
  },
  {
    step: "02",
    title: "Engines are questioned continuously",
    desc: "Citationly asks the brand questions buyers actually ask across the AI providers configured for the workspace.",
  },
  {
    step: "03",
    title: "Every mention is analyzed",
    desc: "Answers are checked against your verified facts and classified for accuracy and framing.",
  },
  {
    step: "04",
    title: "Problems surface with evidence",
    desc: "Flagged mentions arrive with answer text, engine, and likely source, ready for action.",
  },
  {
    step: "05",
    title: "Corrections get verified",
    desc: "After your team updates the source content, subsequent scans confirm whether engine answers actually changed.",
  },
]

const BUSINESS_BENEFITS: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: ShieldCheck,
    title: "Reputation risk shrinks",
    desc: "AI reputation management becomes proactive. Problems are found by your dashboard, not your prospects.",
  },
  {
    icon: Handshake,
    title: "Sales conversations improve",
    desc: "Teams enter deals knowing what engines told the buyer first, ready to reinforce or correct it.",
  },
  {
    icon: Target,
    title: "Positioning gets sharper",
    desc: "The gap between how you describe yourself and how engines describe you becomes visible and closable.",
  },
  {
    icon: Scale,
    title: "Legal and compliance exposure drops",
    desc: "In regulated industries, documented monitoring of machine-generated claims is fast becoming an expectation.",
  },
  {
    icon: TrendingUp,
    title: "Trust in the channel grows",
    desc: "Once leadership sees AI answers being managed like any other brand surface, investment follows naturally.",
  },
]

const WHY_CITATIONLY: { icon: LucideIcon; title: string; desc: React.ReactNode }[] = [
  {
    icon: Eye,
    title: "Answer-level depth",
    desc: "Many tools count mentions. Citationly reads them, checks them against your verified facts, and explains what is wrong and where it came from.",
  },
  {
    icon: Link2,
    title: "Connected to the fix",
    desc: (
      <>
        Monitoring links directly to{" "}
        <Link
          href="/features/citation-tracking"
          className="font-medium text-indigo-300 hover:text-indigo-200 underline underline-offset-4 decoration-indigo-300/40 transition-colors"
        >
          citation tracking
        </Link>{" "}
        and{" "}
        <Link
          href="/generative-engine-optimization"
          className="font-medium text-indigo-300 hover:text-indigo-200 underline underline-offset-4 decoration-indigo-300/40 transition-colors"
        >
          optimization workflows
        </Link>
        , so a flagged problem becomes an assigned correction, not a screenshot in a slide deck.
      </>
    ),
  },
  {
    icon: Globe,
    title: "Full engine coverage",
    desc: "Six engines monitored with one methodology.",
  },
  {
    icon: ClipboardCheck,
    title: "Built for accountability",
    desc: "Mention history, flags, and resolution status are recorded, giving brand teams the audit trail enterprise governance expects.",
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
        eyebrow="Brand Monitoring"
        title="AI engines describe your brand every day. Hear what they say."
        gradientWords={["say"]}
        description="Citationly monitors how ChatGPT, Gemini, Claude, Perplexity, Copilot, and Grok describe your company, products, and pricing, then flags every inaccuracy before it reaches another buyer."
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
              text="Your brand story is being retold without you in the room"
              gradientWords={["room"]}
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
              Every time someone asks an AI engine about your company, the engine composes a description of
              what you do, what you cost, how you compare, and whether you can be trusted. That description
              draws from whatever sources the engine found, weighted however its model decided. Sometimes it
              is accurate. Sometimes it is outdated pricing, a discontinued product, a competitor&apos;s claim
              repeated as fact, or a misreading of your positioning.
            </p>
            <p>
              Traditional brand monitoring watches news, social media, and review sites, but none of it sees
              inside AI answers, which is where a growing share of first impressions now forms. A prospect
              who receives a wrong answer about your product does not email you to check. They simply move
              on, and you never learn the conversation happened.
            </p>
            <p>
              For enterprises, the exposure scales with volume. One flawed source can shape thousands of
              answers a day, quietly, across every engine that ingested it. The longer misinformation
              circulates undetected, the more deeply it settles into the answers buyers receive.
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
                text="AI brand monitoring that catches problems at answer level"
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
                  Citationly continuously asks the questions buyers ask about your brand, across all six
                  engines, and analyzes every answer that comes back. Each mention is recorded with its
                  context: how the engine described you, what claims it made, what sources it leaned on, and
                  whether the description matches reality.
                </p>
                <p>
                  When something is wrong, you know quickly. Incorrect pricing, misattributed features,
                  outdated leadership details, or a stale{" "}
                  <Link
                    href="/features/competitor-intelligence"
                    className="font-medium text-indigo-300 hover:text-indigo-200 underline underline-offset-4 decoration-indigo-300/40 transition-colors"
                  >
                    competitor comparison
                  </Link>{" "}
                  all surface as flagged mentions, with the answer text and likely source attached. Your team
                  sees not just that an engine is wrong, but why, which is what makes correction possible.
                </p>
                <p>
                  The value compounds beyond defense. Monitoring reveals how engines position you when they
                  get it right: which strengths they emphasize, which use cases they associate with you, and
                  how your described identity compares to the one your marketing intends. That gap between
                  intended and machine-perceived positioning feeds directly into your broader{" "}
                  <Link
                    href="/features/ai-visibility-dashboard"
                    className="font-medium text-indigo-300 hover:text-indigo-200 underline underline-offset-4 decoration-indigo-300/40 transition-colors"
                  >
                    AI visibility
                  </Link>{" "}
                  picture, and it is strategy-grade insight most brands have never seen.
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
              text="Six ways Citationly watches over your brand."
              gradientWords={["brand"]}
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
              text="From verified facts to corrected answers."
              gradientWords={["answers"]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-4"
            />
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-muted-foreground max-w-xl mx-auto"
            >
              Five steps, from establishing a baseline to verifying a correction actually worked.
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
              text="What changes when brand monitoring goes proactive."
              gradientWords={["proactive"]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-4"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BUSINESS_BENEFITS.map((benefit, i) => (
              <motion.div
                key={benefit.title}
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
                  text="Brand monitoring built for the answer, not just the mention."
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
        title="Find out what AI engines are telling your buyers"
        description="Run a free analysis and see how six AI engines currently describe your brand, with any inaccuracies flagged from the first scan."
      />
    </div>
  )
}
