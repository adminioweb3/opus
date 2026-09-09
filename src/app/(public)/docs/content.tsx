"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  AlertTriangle,
  ArrowRight,
  ChevronDown,
  FileCode,
  FileText,
  LayoutDashboard,
  Settings,
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

interface Step {
  title: string
  desc: string
}

const STEPS: Step[] = [
  {
    title: "Create your workspace",
    desc: "Sign up and create a workspace for your brand. This is where every scan, report, and setting lives, and where teammates get invited later.",
  },
  {
    title: "Add competitors",
    desc: "Add the competitors you want tracked alongside your own brand, so every report shows your position relative to the market from day one.",
  },
  {
    title: "Define your questions",
    desc: "Build or import the set of real buyer questions the platform will monitor. These are the exact questions that get run against each AI engine.",
  },
  {
    title: "Run your first scan",
    desc: "Trigger your first scan and watch the platform query the AI providers configured for your workspace, then return the mentions and citations it finds.",
  },
]

interface ConfigCard {
  title: string
  desc: string
}

const CONFIG_CARDS: ConfigCard[] = [
  {
    title: "What configuration controls",
    desc: "Configuration controls what the platform monitors and how it reports: the engines you monitor, the frequency of scans, the competitor set, and the question library.",
  },
  {
    title: "Team configuration",
    desc: "For teams, configuration also covers user roles and access, so the right people see the right workspaces and settings.",
  },
]

interface FeatureBlock {
  icon: LucideIcon
  title: string
  desc: React.ReactNode
}

const FEATURE_BLOCKS: FeatureBlock[] = [
  {
    icon: LayoutDashboard,
    title: "Dashboard",
    desc: (
      <>
        Your standing view of AI visibility, summarizing mentions, citations, and Share of Voice.{" "}
        <Link
          href="/features/ai-visibility-dashboard"
          className="font-medium text-indigo-600 hover:text-indigo-700 underline underline-offset-2 transition-colors"
        >
          Explore the Dashboard
        </Link>
        .
      </>
    ),
  },
  {
    icon: FileText,
    title: "Reports",
    desc: (
      <>
        Turns platform data into shareable output. Covers report types, scheduling, and exports.{" "}
        <Link
          href="/features/reports"
          className="font-medium text-indigo-600 hover:text-indigo-700 underline underline-offset-2 transition-colors"
        >
          Explore Reports
        </Link>
        .
      </>
    ),
  },
  {
    icon: Settings,
    title: "Settings",
    desc: "Account, workspace, and access configuration in one place.",
  },
]

interface TroubleRow {
  symptom: string
  cause: string
}

const TROUBLESHOOTING: TroubleRow[] = [
  {
    symptom: "A scan returns no mentions",
    cause: "The question set usually needs broadening. Add more of the specific phrasings buyers actually use.",
  },
  {
    symptom: "Share of Voice looks wrong",
    cause: "The competitor list is usually incomplete. Add the competitors missing from the comparison.",
  },
  {
    symptom: "A report shows an unexpected metric",
    cause: "The calculation reference explains it. Check the metric definition before assuming an error.",
  },
]

interface FaqItem {
  q: string
  a: React.ReactNode
}

const FAQS: FaqItem[] = [
  {
    q: "Where should a new user start?",
    a: "Start with Getting started with the platform above: create a workspace, add competitors, define your questions, and run your first scan. That sequence gives you a working baseline in minutes.",
  },
  {
    q: "Which engines does the platform monitor?",
    a: "Citationly monitors the AI providers configured for your workspace and labels provider coverage honestly. Unconfigured engines are not simulated or shown as if they were measured.",
  },
  {
    q: "Can I export data from reports?",
    a: "Yes. Reports support scheduling and export, so you can share a snapshot of your AI visibility with stakeholders who do not need direct access to the workspace.",
  },
  {
    q: "How do I control who can change settings?",
    a: "Configuration includes user roles and access, so administrators can decide who can change scan settings, competitor lists, and billing, while other teammates get read-only or reporting access.",
  },
  {
    q: "What does the documentation assume I already know?",
    a: (
      <>
        Nothing about AI search optimization specifically. It assumes only that you can operate a typical web
        application. If you want the underlying concepts explained from first principles, the{" "}
        <Link
          href="/academy"
          className="font-medium text-indigo-600 hover:text-indigo-700 underline underline-offset-2 transition-colors"
        >
          AI Search Academy
        </Link>{" "}
        covers those separately.
      </>
    ),
  },
  {
    q: "Where do I go if something is not covered here?",
    a: "Contact support directly, and the team will help with the specific issue and, where useful, add the answer back into this documentation.",
  },
]

/* ------------------------------------------------------------------ */
/* Pieces                                                              */
/* ------------------------------------------------------------------ */

function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="flex flex-col gap-3">
      {FAQS.map((item, i) => {
        const isOpen = open === i
        return (
          <motion.div
            key={item.q}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.05 }}
            className={`rounded-2xl border bg-white transition-colors ${
              isOpen ? "border-indigo-500/25 shadow-[0_12px_40px_-24px_rgba(91,91,255,0.4)]" : "border-black/5"
            }`}
          >
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className="text-[15px] font-medium text-foreground">{item.q}</span>
              <ChevronDown
                className={`h-4.5 w-4.5 shrink-0 text-muted-foreground transition-transform duration-300 ${
                  isOpen ? "rotate-180 text-indigo-600" : ""
                }`}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-5 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )
      })}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export function Content() {
  const router = useRouter()

  return (
    <div className="bg-background">
      <PageHero
        eyebrow="Documentation"
        title="Citationly documentation: set up and operate the platform"
        gradientWords={["documentation", "platform"]}
        description="This AI search platform documentation covers everything from your first login to advanced configuration. Whether you are running your first scan or administering a large workspace, start here."
        wide
      >
        <a
          href="#getting-started"
          className="group h-12 px-7 rounded-full font-medium text-[15px] text-white bg-linear-to-r from-indigo-600 via-indigo-500 to-violet-500 shadow-[0_10px_30px_-8px_rgba(91,91,255,0.5)] hover:shadow-[0_14px_40px_-8px_rgba(91,91,255,0.65)] transition-shadow inline-flex items-center gap-2"
        >
          Get Started
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </a>
        <MagneticButton
          onClick={() => router.push("/contact")}
          className="h-12 px-7 rounded-full font-medium text-[15px] text-foreground border border-black/10 bg-white/70 hover:bg-black/5 transition-colors inline-flex items-center"
        >
          Contact Support
        </MagneticButton>
      </PageHero>

      {/* ---------------------------------------------------------- */}
      {/* Section 1: Overview                                         */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <SectionLabel dark={false}>Overview</SectionLabel>
          <RevealText
            as="h2"
            text="What this documentation covers"
            className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-7"
          />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-xl border border-indigo-200 bg-indigo-50/40 p-6"
          >
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-600 flex items-center justify-center shrink-0">
                <FileCode className="w-3.5 h-3.5" />
              </span>
              <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-indigo-600">
                Platform
              </span>
            </div>
            <p className="text-foreground text-[15px] md:text-base leading-relaxed">
              Citationly is an AI Search Intelligence Platform that measures how AI engines mention, cite, and
              describe your brand, then helps you improve that presence. This documentation is the operating guide
              for the platform, written for both new users getting their first scan running and administrators who
              need reference material.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 2: Getting started (timeline)                       */}
      {/* ---------------------------------------------------------- */}
      <section
        id="getting-started"
        className="scroll-mt-32 py-20 md:py-24 bg-indigo-50/40 border-y border-black/5"
      >
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <div className="flex justify-center">
              <SectionLabel dark={false}>Getting started</SectionLabel>
            </div>
            <RevealText
              as="h2"
              text="Getting started with the platform"
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-4"
            />
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-muted-foreground max-w-xl mx-auto"
            >
              Four steps take a new workspace from empty to a working baseline.
            </motion.p>
          </div>

          <div className="max-w-2xl mx-auto">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.55, delay: 0.05 + i * 0.08 }}
                className="relative pl-16 pb-12 last:pb-0"
              >
                {i < STEPS.length - 1 && (
                  <span className="absolute left-4.5 top-10 bottom-0 w-px bg-linear-to-b from-indigo-200 to-black/5" />
                )}
                <span className="absolute left-0 top-0 w-9 h-9 rounded-full bg-white border border-indigo-200 shadow-[0_1px_3px_rgba(91,91,255,0.15)] flex items-center justify-center text-sm font-semibold text-indigo-600">
                  {i + 1}
                </span>

                <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-indigo-600 mb-1.5">
                  Step {i + 1}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-[15px] leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto mt-2 rounded-xl border-l-4 border-indigo-500 bg-white pl-5 pr-6 py-4"
          >
            <p className="text-foreground text-[15px] leading-relaxed">
              <span className="font-semibold">Expected outcome.</span> Within minutes you have a baseline view of
              your AI visibility that every later report measures against.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 3: Configuration                                    */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-14">
            <div className="flex justify-center">
              <SectionLabel dark={false}>Configuration</SectionLabel>
            </div>
            <RevealText
              as="h2"
              text="Configuring your workspace"
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-4"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CONFIG_CARDS.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className="rounded-2xl bg-white border border-black/5 shadow-[0_1px_3px_rgba(15,15,35,0.05)] p-7"
              >
                <h3 className="font-semibold text-foreground mb-2.5">{card.title}</h3>
                <p className="text-muted-foreground text-[15px] leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 4: Core areas of the platform                       */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24 bg-indigo-50/40 border-y border-black/5">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-14">
            <div className="flex justify-center">
              <SectionLabel dark={false}>The platform</SectionLabel>
            </div>
            <RevealText
              as="h2"
              text="Core areas of the platform"
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-4"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {FEATURE_BLOCKS.map((block, i) => (
              <motion.div
                key={block.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className="rounded-2xl border border-black/5 bg-white p-7 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100">
                    <block.icon className="w-4.5 h-4.5" />
                  </div>
                  <h3 className="text-base font-semibold text-foreground tracking-[-0.01em]">{block.title}</h3>
                </div>
                <p className="text-[14.5px] text-muted-foreground leading-relaxed">{block.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 5: Troubleshooting                                  */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-14">
            <div className="flex justify-center">
              <SectionLabel dark={false}>Troubleshooting</SectionLabel>
            </div>
            <RevealText
              as="h2"
              text="Troubleshooting common issues"
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground"
            />
          </div>

          <div className="space-y-4">
            {TROUBLESHOOTING.map((row, i) => (
              <motion.div
                key={row.symptom}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.5, delay: 0.05 + i * 0.06 }}
                className="flex gap-4 rounded-xl border border-black/5 bg-white p-5 shadow-[0_1px_3px_rgba(15,15,35,0.05)]"
              >
                <span className="w-9 h-9 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="text-[15px] font-semibold text-foreground mb-1">{row.symptom}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{row.cause}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 6: FAQ                                              */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24 bg-indigo-50/40 border-y border-black/5">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
            <div>
              <SectionLabel dark={false}>FAQ</SectionLabel>
              <RevealText
                as="h2"
                text="Questions, answered."
                gradientWords={["answered"]}
                className="mb-4 text-3xl font-semibold tracking-[-0.02em] text-foreground md:text-4xl"
              />
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-6 max-w-md text-muted-foreground"
              >
                Everything teams usually ask while setting up the platform. If yours is not here, contact support
                directly.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-700"
                >
                  Talk to our team
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </motion.div>
            </div>

            <FaqAccordion />
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 7: Developer notes (dark)                           */}
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

            <div className="relative max-w-3xl mx-auto">
              <div className="text-center mb-10">
                <div className="flex justify-center">
                  <SectionLabel>For developers</SectionLabel>
                </div>
                <RevealText
                  as="h2"
                  text="Notes for developers and technical users"
                  className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-white"
                />
              </div>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="text-white/55 leading-relaxed text-[15px] md:text-base"
              >
                Teams that want to work with Citationly data programmatically should read the{" "}
                <Link
                  href="/api"
                  className="text-indigo-300 hover:text-indigo-200 underline underline-offset-2 transition-colors"
                >
                  API documentation
                </Link>
                . The{" "}
                <Link
                  href="/integrations"
                  className="text-indigo-300 hover:text-indigo-200 underline underline-offset-2 transition-colors"
                >
                  Integrations documentation
                </Link>{" "}
                separates available integrations from planned no-code connections such as Google Analytics,
                Search Console, Slack, and Zapier.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </section>

      <CtaBand
        title="Ready to run your first scan?"
        description="The documentation is most useful with the platform open beside it."
        primaryLabel="Get Started"
        primaryHref="/register"
      />

      <div className="pb-20 md:pb-24 -mt-14 text-center">
        <Link
          href="/contact"
          className="group inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
        >
          Contact Support
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  )
}
