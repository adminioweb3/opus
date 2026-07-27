"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import {
  ArrowDown,
  CircleCheckBig,
  CreditCard,
  FileText,
  LayoutDashboard,
  LifeBuoy,
  UserCog,
} from "lucide-react"
import { PageHero } from "@/components/features/public/PageHero"
import { CtaBand } from "@/components/features/public/CtaBand"
import { SectionLabel } from "@/components/features/landing/primitives/SectionLabel"
import { RevealText } from "@/components/features/landing/primitives/RevealText"

/* ------------------------------------------------------------------ */
/* Fixed content data                                                  */
/* ------------------------------------------------------------------ */

const GETTING_STARTED: {
  title: string
  desc: string
}[] = [
  {
    title: "Set up your workspace",
    desc: "Add your brand details and primary market to define what the platform monitors.",
  },
  {
    title: "Add competitors",
    desc: "List the brands you want to benchmark against for Share of Voice.",
  },
  {
    title: "Add your questions",
    desc: "Enter the questions your buyers ask AI engines, or accept the suggested set.",
  },
  {
    title: "Run your first scan",
    desc: "Generate your baseline of mentions, citations, and Share of Voice.",
  },
]

const FAQS: { q: string; a: string }[] = [
  {
    q: "Where do I start as a new user?",
    a: "Start with Getting Started above. Setting up your workspace, adding competitors, adding your questions, and running your first scan takes just a few minutes and gives you a working baseline right away.",
  },
  {
    q: "How do I add teammates to my account?",
    a: "Open Account Management and invite teammates by email, then assign each person a role that matches the access level they need.",
  },
  {
    q: "How do I read my dashboard?",
    a: "The Dashboard Guide walks through each panel: your visibility summary, mentions and citations, and Share of Voice, along with what a change since your last scan means.",
  },
  {
    q: "Can I schedule and export reports?",
    a: "Yes. Reports can be generated on demand, scheduled to run automatically, and exported whenever you need them, and each metric is explained in the calculation reference.",
  },
  {
    q: "Where do I manage billing and plans?",
    a: "Billing Support covers your current plan, invoices, and payment details, and shows you how to make plan changes as your needs evolve.",
  },
  {
    q: "What do I do if something is not working?",
    a: "Check Troubleshooting first. Common issues, like missing mentions or an unexpected Share of Voice, usually trace back to a narrow question set or an incomplete competitor list.",
  },
  {
    q: "Where do I go if something is not covered here?",
    a: "Reach out to our support team directly. Contact Support with your workspace details and the steps you have already taken, and we will help you from there.",
  },
]

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export function Content() {
  return (
    <div className="bg-background">
      <PageHero
        eyebrow="Help Center"
        title="Citationly Help Center"
        gradientWords={["Help"]}
        description="Everything you need to use the platform with confidence. Find setup guides, account help, dashboard and report walkthroughs, billing answers, and troubleshooting in one place."
      >
        <a
          href="#getting-started"
          className="group h-12 px-7 rounded-full font-medium text-[15px] text-white bg-linear-to-r from-indigo-600 via-indigo-500 to-violet-500 shadow-[0_10px_30px_-8px_rgba(91,91,255,0.5)] hover:shadow-[0_14px_40px_-8px_rgba(91,91,255,0.65)] transition-shadow inline-flex items-center gap-2"
        >
          Search Help Articles
          <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
        </a>
        <Link
          href="/contact"
          className="h-12 px-7 rounded-full font-medium text-[15px] text-foreground border border-black/10 bg-white/70 hover:bg-black/5 transition-colors inline-flex items-center gap-2"
        >
          Contact Support
        </Link>
      </PageHero>

      {/* ---------------------------------------------------------- */}
      {/* Section 1: Support overview                                */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="max-w-3xl">
            <SectionLabel dark={false}>Support Overview</SectionLabel>
            <RevealText
              as="h2"
              text="How to use the Help Center"
              gradientWords={["Center"]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-6"
            />
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-muted-foreground leading-relaxed text-[15px] md:text-base"
            >
              The Citationly Help Center is the knowledge base for customers using the platform. It is organized
              by task, so you can move straight to what you need: getting set up, managing your account,
              understanding your dashboard, working with reports, handling billing, or resolving an issue. For
              concepts behind the platform, such as how AI engines select sources, the Help Center points to the{" "}
              <Link
                href="/academy"
                className="text-indigo-600 hover:text-indigo-700 underline underline-offset-2"
              >
                AI Search Academy
              </Link>
              . For programmatic access, it points to the Citationly{" "}
              <Link
                href="/docs"
                className="text-indigo-600 hover:text-indigo-700 underline underline-offset-2"
              >
                documentation
              </Link>{" "}
              and{" "}
              <Link
                href="/api"
                className="text-indigo-600 hover:text-indigo-700 underline underline-offset-2"
              >
                API guides
              </Link>
              .
            </motion.p>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 2: Getting started                                */}
      {/* ---------------------------------------------------------- */}
      <section id="getting-started" className="py-20 md:py-24 bg-indigo-50/40 border-y border-black/5 scroll-mt-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-14">
            <div className="flex justify-center">
              <SectionLabel dark={false}>Getting Started</SectionLabel>
            </div>
            <RevealText
              as="h2"
              text="Getting started"
              gradientWords={["started"]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-4"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {GETTING_STARTED.map((step, i) => (
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

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center justify-center gap-2 text-center text-sm text-muted-foreground mt-10"
          >
            <CircleCheckBig className="w-4 h-4 text-indigo-500/70 shrink-0" />
            <span>
              <span className="font-medium text-foreground">Expected result:</span> A working workspace and a
              first set of results within minutes.
            </span>
          </motion.div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 3: Support topics                                 */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-14">
            <div className="flex justify-center">
              <SectionLabel dark={false}>Support Topics</SectionLabel>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="rounded-2xl bg-white border border-black/5 shadow-[0_1px_3px_rgba(15,15,35,0.05)] p-7"
            >
              <div className="flex items-center gap-3.5 mb-4">
                <div className="w-11 h-11 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center shrink-0">
                  <UserCog className="w-5 h-5" />
                </div>
                <h2 className="font-semibold text-foreground text-lg">Account Management</h2>
              </div>
              <p className="text-[15px] text-muted-foreground leading-relaxed">
                Update your profile and organization details, invite teammates, assign roles, and manage access
                levels, all from your account settings.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="rounded-2xl bg-white border border-black/5 shadow-[0_1px_3px_rgba(15,15,35,0.05)] p-7"
            >
              <div className="flex items-center gap-3.5 mb-4">
                <div className="w-11 h-11 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center shrink-0">
                  <LayoutDashboard className="w-5 h-5" />
                </div>
                <h2 className="font-semibold text-foreground text-lg">Dashboard Guide</h2>
              </div>
              <p className="text-[15px] text-muted-foreground leading-relaxed">
                Your dashboard brings together the visibility summary, mentions and citations, and{" "}
                <Link
                  href="/features/share-of-voice"
                  className="text-indigo-600 hover:text-indigo-700 underline underline-offset-2"
                >
                  Share of Voice
                </Link>{" "}
                in one view, and shows what a change since your last scan means.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.55, delay: 0.3 }}
              className="rounded-2xl bg-white border border-black/5 shadow-[0_1px_3px_rgba(15,15,35,0.05)] p-7"
            >
              <div className="flex items-center gap-3.5 mb-4">
                <div className="w-11 h-11 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <h2 className="font-semibold text-foreground text-lg">Reports</h2>
              </div>
              <p className="text-[15px] text-muted-foreground leading-relaxed">
                Generate, schedule, and export{" "}
                <Link
                  href="/features/reports"
                  className="text-indigo-600 hover:text-indigo-700 underline underline-offset-2"
                >
                  Reports
                </Link>{" "}
                whenever you need them, with a reference for how each metric behind them is calculated.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.55, delay: 0.4 }}
              className="rounded-2xl bg-white border border-black/5 shadow-[0_1px_3px_rgba(15,15,35,0.05)] p-7"
            >
              <div className="flex items-center gap-3.5 mb-4">
                <div className="w-11 h-11 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center shrink-0">
                  <CreditCard className="w-5 h-5" />
                </div>
                <h2 className="font-semibold text-foreground text-lg">Billing Support</h2>
              </div>
              <p className="text-[15px] text-muted-foreground leading-relaxed">
                View your current plan, invoices, and payment details, and see available{" "}
                <Link
                  href="/pricing"
                  className="text-indigo-600 hover:text-indigo-700 underline underline-offset-2"
                >
                  plans
                </Link>{" "}
                whenever it is time to make a change.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.55, delay: 0.5 }}
              className="rounded-2xl bg-white border border-black/5 shadow-[0_1px_3px_rgba(15,15,35,0.05)] p-7"
            >
              <div className="flex items-center gap-3.5 mb-4">
                <div className="w-11 h-11 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center shrink-0">
                  <LifeBuoy className="w-5 h-5" />
                </div>
                <h2 className="font-semibold text-foreground text-lg">Troubleshooting</h2>
              </div>
              <p className="text-[15px] text-muted-foreground leading-relaxed">
                Most issues follow a pattern. No mentions in a scan usually means the question set needs
                broadening, an unexpected Share of Voice usually means the competitor list is incomplete, and
                unexpected report metrics are explained by the calculation reference.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 4: FAQ                                             */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24 border-t border-black/5">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-16">
            <div>
              <SectionLabel dark={false}>Help Center FAQ</SectionLabel>
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
                What customers usually ask before reaching out to support.
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
        title="Still need help?"
        description="If an article does not resolve your question, our support team can help. Reach out with your workspace details and the steps you have taken, and we will get you back on track."
        primaryLabel="Contact Support"
        primaryHref="/contact"
        secondaryLabel="View Documentation"
        secondaryHref="/docs"
      />
    </div>
  )
}
