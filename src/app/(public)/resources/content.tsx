"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  FileCode2,
  Globe,
  KeyRound,
  LayoutDashboard,
  LineChart,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react"
import { PageHero } from "@/components/features/public/PageHero"
import { CtaBand } from "@/components/features/public/CtaBand"
import { SectionLabel } from "@/components/features/landing/primitives/SectionLabel"
import { RevealText } from "@/components/features/landing/primitives/RevealText"

/* ------------------------------------------------------------------ */
/* Fixed content data                                                  */
/* ------------------------------------------------------------------ */

const QUICK_NAV: { label: string; href: string }[] = [
  { label: "Academy", href: "#academy" },
  { label: "Documentation", href: "#docs" },
  { label: "API", href: "#api" },
  { label: "Integrations", href: "#integrations" },
  { label: "Help Center", href: "#help" },
]

type Level = "Beginner" | "Intermediate" | "Advanced"

const LEVEL_STYLES: Record<Level, string> = {
  Beginner: "bg-emerald-500/10 text-emerald-600 border-emerald-500/15",
  Intermediate: "bg-amber-500/10 text-amber-600 border-amber-500/15",
  Advanced: "bg-rose-500/10 text-rose-600 border-rose-500/15",
}

const GUIDES: {
  icon: LucideIcon
  level: Level
  readTime: string
  title: string
  summary: string
}[] = [
  {
    icon: Sparkles,
    level: "Beginner",
    readTime: "7 min read",
    title: "GEO fundamentals: what generative engine optimization actually means",
    summary:
      "The difference between ranking and being cited, and why classic SEO signals only get you partway into an AI answer.",
  },
  {
    icon: FileCode2,
    level: "Intermediate",
    readTime: "11 min read",
    title: "The AEO structuring checklist",
    summary:
      "A page-by-page framework for structuring content so answer engines can parse, quote, and attribute it correctly.",
  },
  {
    icon: ScanSearch,
    level: "Advanced",
    readTime: "13 min read",
    title: "How AI engines actually choose citations",
    summary:
      "What we've observed across thousands of scans about the source qualities ChatGPT, Perplexity, and Gemini favor.",
  },
  {
    icon: LineChart,
    level: "Intermediate",
    readTime: "9 min read",
    title: "Measuring AI share of voice",
    summary:
      "How to define a competitive set, read a Competitor Watch report, and track share of voice as a trend, not a snapshot.",
  },
  {
    icon: ShieldCheck,
    level: "Intermediate",
    readTime: "6 min read",
    title: "Fixing brand inaccuracies in AI answers",
    summary:
      "A step-by-step playbook for the moment Brand Pulse flags a wrong price, a dead feature, or a misattributed claim.",
  },
  {
    icon: LayoutDashboard,
    level: "Advanced",
    readTime: "10 min read",
    title: "Reporting AI visibility to executives",
    summary:
      "How to turn Command Center data into a board-ready narrative that ties AI visibility to pipeline, not just scores.",
  },
]

const QUICKSTARTS: {
  icon: LucideIcon
  title: string
  steps: string[]
}[] = [
  {
    icon: Globe,
    title: "Connect your website",
    steps: ["Add your domain", "Verify ownership", "Knowledge Vault starts crawling"],
  },
  {
    icon: ScanSearch,
    title: "Understanding your first scan",
    steps: ["Visibility Radar runs across 6 engines", "Results land within 48 hours", "Review platform-by-platform detail"],
  },
  {
    icon: LineChart,
    title: "Reading your visibility scores",
    steps: ["Open Command Center", "Compare score components", "Track the weekly trendline"],
  },
  {
    icon: Users,
    title: "Team roles and permissions",
    steps: ["Invite teammates", "Assign a role", "Scope access by workspace"],
  },
]

const INTEGRATIONS: {
  initials: string
  name: string
  desc: string
  status: "Available" | "Coming soon"
  gradient: string
}[] = [
  {
    initials: "SL",
    name: "Slack",
    desc: "Brand Pulse alerts and weekly Visibility Radar digests, posted straight to a channel.",
    status: "Available",
    gradient: "from-indigo-500 to-violet-500",
  },
  {
    initials: "WP",
    name: "WordPress",
    desc: "Push GEO Optimizer fixes and Content Generator drafts directly to your site.",
    status: "Available",
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    initials: "HS",
    name: "HubSpot",
    desc: "Sync visibility scores and opportunities into the CRM records your GTM team already lives in.",
    status: "Coming soon",
    gradient: "from-orange-500 to-rose-500",
  },
  {
    initials: "GA",
    name: "Google Analytics",
    desc: "Correlate AI-referred traffic with on-site conversion, alongside your organic channels.",
    status: "Coming soon",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    initials: "ZP",
    name: "Zapier",
    desc: "Trigger workflows off new citations, score drops, or Opportunity Finder findings.",
    status: "Coming soon",
    gradient: "from-fuchsia-500 to-purple-500",
  },
  {
    initials: "NT",
    name: "Notion",
    desc: "Send Reports and Content Generator briefs into the docs your team already edits in.",
    status: "Coming soon",
    gradient: "from-slate-500 to-slate-700",
  },
]

const FAQS: { q: string; a: React.ReactNode }[] = [
  {
    q: "How do I get started with Citationly?",
    a: (
      <>
        Create an account, connect your website, and Knowledge Vault begins crawling immediately. Your
        first Visibility Radar scan across ChatGPT, Gemini, Claude, Perplexity, Copilot, and Grok
        completes within 48 hours — no setup beyond verifying your domain.
      </>
    ),
  },
  {
    q: "How often do visibility scans run?",
    a: (
      <>
        Visibility Radar scans run weekly by default on every plan, with each engine scanned
        independently so you can see platform-specific movement. Professional and Enterprise plans can
        trigger an on-demand deep scan from Opportunity Finder at any time.
      </>
    ),
  },
  {
    q: "How do I add competitors to track?",
    a: (
      <>
        Open Competitor Watch and add up to your plan&apos;s competitor limit by domain. We pull in real
        logos and start tracking share of voice against your set from the next scan cycle onward — no
        separate onboarding step required.
      </>
    ),
  },
  {
    q: "Does the trial require a credit card, and what happens after?",
    a: (
      <>
        Every plan — Starter, Professional, and Enterprise — starts with a real 7-day free trial and no
        credit card. At the end of the trial you choose a plan to continue; nothing is charged
        automatically and nothing is deleted while you decide.
      </>
    ),
  },
  {
    q: "How do I invite teammates and manage roles?",
    a: (
      <>
        From Team & roles, invite by email and assign a role that scopes what they can see and edit —
        from read-only reporting access to full workspace administration. Seats and role limits vary by
        plan.
      </>
    ),
  },
  {
    q: "How do I request deletion of my data?",
    a: (
      <>
        You can request full account and data deletion at any time. See our{" "}
        <Link href="/privacy" className="text-indigo-600 font-medium hover:underline">
          privacy policy
        </Link>{" "}
        for exactly what is deleted, what is retained for legal purposes, and how long the process
        takes.
      </>
    ),
  },
]

/* ------------------------------------------------------------------ */
/* Small building blocks                                              */
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
  return (
    <div className="bg-background">
      <PageHero
        eyebrow="Resources"
        title="Everything you need to win AI search."
        gradientWords={["AI"]}
        description="Guides, documentation, an API, integrations, and a help center — everything to run your AI visibility program, in one place."
      />

      {/* ---------------------------------------------------------- */}
      {/* Quick-nav pill row                                           */}
      {/* ---------------------------------------------------------- */}
      <section className="pb-16 md:pb-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            {QUICK_NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="inline-flex items-center h-10 px-5 rounded-full border border-black/10 bg-white text-[13px] font-medium text-foreground hover:border-indigo-500/30 hover:text-indigo-600 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* #academy — AI Search Academy                                 */}
      {/* ---------------------------------------------------------- */}
      <section id="academy" className="py-20 md:py-24 scroll-mt-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-14">
            <div className="flex justify-center">
              <SectionLabel dark={false}>AI Search Academy</SectionLabel>
            </div>
            <RevealText
              as="h2"
              text="Learn GEO and AEO from the ground up."
              gradientWords={["GEO", "AEO"]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-4"
            />
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground max-w-xl mx-auto"
            >
              Six practical guides, from first principles to executive reporting. New lessons ship on the
              blog every week.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {GUIDES.map((guide, i) => (
              <motion.div
                key={guide.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.06 * i }}
              >
                <Link
                  href="/blog"
                  className="group flex flex-col h-full rounded-2xl bg-white border border-black/5 shadow-[0_1px_3px_rgba(15,15,35,0.05)] p-6 hover:border-indigo-500/25 hover:shadow-[0_16px_40px_-24px_rgba(91,91,255,0.35)] transition-all"
                >
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-11 h-11 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center">
                      <guide.icon className="w-5 h-5" />
                    </div>
                    <span
                      className={`inline-flex items-center h-6 px-2.5 rounded-full text-[11px] font-semibold border ${LEVEL_STYLES[guide.level]}`}
                    >
                      {guide.level}
                    </span>
                  </div>
                  <h3 className="font-semibold text-foreground leading-snug mb-2 group-hover:text-indigo-600 transition-colors">
                    {guide.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">{guide.summary}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground/80 pt-4 border-t border-black/5">
                    <span>{guide.readTime}</span>
                    <span className="inline-flex items-center gap-1 text-indigo-600 font-medium">
                      Read guide
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* #docs — Documentation                                        */}
      {/* ---------------------------------------------------------- */}
      <section id="docs" className="py-20 md:py-24 bg-indigo-50/40 border-y border-black/5 scroll-mt-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-14">
            <div className="flex justify-center">
              <SectionLabel dark={false}>Documentation</SectionLabel>
            </div>
            <RevealText
              as="h2"
              text="Quick-start guides for every core workflow."
              gradientWords={["Quick-start"]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-4"
            />
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground max-w-xl mx-auto"
            >
              Step-by-step references for setup, scans, scoring, and team administration.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {QUICKSTARTS.map((doc, i) => (
              <motion.div
                key={doc.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.08 * i }}
                className="rounded-2xl bg-white border border-black/5 shadow-[0_1px_3px_rgba(15,15,35,0.05)] p-7"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-11 h-11 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center shrink-0">
                    <doc.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-foreground leading-snug">{doc.title}</h3>
                </div>
                <ol className="space-y-3">
                  {doc.steps.map((step, si) => (
                    <li key={step} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="shrink-0 w-6 h-6 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-[11px] font-semibold flex items-center justify-center">
                        {si + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* #api — API                                                   */}
      {/* ---------------------------------------------------------- */}
      <section id="api" className="py-20 md:py-24 scroll-mt-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-16 items-center">
            <div>
              <SectionLabel dark={false}>API</SectionLabel>
              <RevealText
                as="h2"
                text="Build custom visibility workflows on your own data."
                gradientWords={["visibility"]}
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
                  Every score in Citationly — visibility, citation share, brand accuracy — is available as
                  structured data. Pull scan results into your own dashboards, trigger workflows off a
                  score change, or feed Opportunity Finder findings straight into your task tracker.
                </p>
                <p>
                  The API mirrors the modules you already use: Visibility Radar scores, Citation
                  Intelligence sources, Brand Pulse alerts, and Competitor Watch share of voice, all
                  authenticated with a scoped API key from Team & roles.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-8 flex items-center gap-4 rounded-2xl border border-indigo-100 bg-indigo-50/50 px-6 py-5"
              >
                <div className="w-10 h-10 rounded-xl bg-white border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                  <KeyRound className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">
                    API access rolling out on Enterprise — join the waitlist
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="shrink-0 inline-flex items-center gap-1.5 h-9 px-4 rounded-full bg-[#050508] text-white text-[13px] font-medium hover:bg-[#1a1a24] transition-colors"
                >
                  Join waitlist
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="relative overflow-hidden rounded-2xl bg-[#050508] border border-white/10"
            >
              <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/10">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                <span className="ml-2 text-xs text-white/40 font-mono">visibility-score.sh</span>
              </div>
              <pre className="text-[12.5px] leading-relaxed p-6 overflow-x-auto font-mono">
                <code>
                  <span className="text-white/40"># Request</span>{"\n"}
                  <span className="text-emerald-400">GET</span>{" "}
                  <span className="text-sky-300">/v1/visibility-score?domain=northwindcloud.com</span>{"\n"}
                  <span className="text-white/40">Authorization: Bearer </span>
                  <span className="text-amber-300">ctly_live_••••••••••••</span>
                  {"\n\n"}
                  <span className="text-white/40"># Response 200</span>{"\n"}
                  <span className="text-white/80">{"{"}</span>{"\n"}
                  {"  "}
                  <span className="text-sky-300">&quot;domain&quot;</span>
                  <span className="text-white/60">: </span>
                  <span className="text-emerald-300">&quot;northwindcloud.com&quot;</span>
                  <span className="text-white/60">,</span>{"\n"}
                  {"  "}
                  <span className="text-sky-300">&quot;visibility_score&quot;</span>
                  <span className="text-white/60">: </span>
                  <span className="text-amber-300">74.2</span>
                  <span className="text-white/60">,</span>{"\n"}
                  {"  "}
                  <span className="text-sky-300">&quot;scanned_at&quot;</span>
                  <span className="text-white/60">: </span>
                  <span className="text-emerald-300">&quot;2026-07-06T09:00:00Z&quot;</span>
                  <span className="text-white/60">,</span>{"\n"}
                  {"  "}
                  <span className="text-sky-300">&quot;platforms&quot;</span>
                  <span className="text-white/60">: {"{"}</span>{"\n"}
                  {"    "}
                  <span className="text-sky-300">&quot;chatgpt&quot;</span>
                  <span className="text-white/60">: </span>
                  <span className="text-amber-300">81.0</span>
                  <span className="text-white/60">,</span>{"\n"}
                  {"    "}
                  <span className="text-sky-300">&quot;perplexity&quot;</span>
                  <span className="text-white/60">: </span>
                  <span className="text-amber-300">76.5</span>
                  <span className="text-white/60">,</span>{"\n"}
                  {"    "}
                  <span className="text-sky-300">&quot;gemini&quot;</span>
                  <span className="text-white/60">: </span>
                  <span className="text-amber-300">68.8</span>
                  <span className="text-white/60">,</span>{"\n"}
                  {"    "}
                  <span className="text-sky-300">&quot;claude&quot;</span>
                  <span className="text-white/60">: </span>
                  <span className="text-amber-300">71.3</span>{"\n"}
                  {"  "}
                  <span className="text-white/60">{"}"}</span>
                  <span className="text-white/60">,</span>{"\n"}
                  {"  "}
                  <span className="text-sky-300">&quot;citation_share&quot;</span>
                  <span className="text-white/60">: </span>
                  <span className="text-amber-300">0.31</span>
                  <span className="text-white/60">,</span>{"\n"}
                  {"  "}
                  <span className="text-sky-300">&quot;trend&quot;</span>
                  <span className="text-white/60">: </span>
                  <span className="text-emerald-300">&quot;up&quot;</span>{"\n"}
                  <span className="text-white/80">{"}"}</span>
                </code>
              </pre>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* #integrations — Integrations                                 */}
      {/* ---------------------------------------------------------- */}
      <section id="integrations" className="py-20 md:py-24 bg-indigo-50/40 border-y border-black/5 scroll-mt-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-14">
            <div className="flex justify-center">
              <SectionLabel dark={false}>Integrations</SectionLabel>
            </div>
            <RevealText
              as="h2"
              text="Bring AI visibility into tools your team already runs."
              gradientWords={["AI"]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-4"
            />
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground max-w-xl mx-auto"
            >
              Two integrations are live today; the rest are in active development.{" "}
              <Link href="/changelog" className="text-indigo-600 font-medium hover:underline">
                Follow the roadmap on our changelog
              </Link>
              .
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {INTEGRATIONS.map((tool, i) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.06 * i }}
                className="rounded-2xl bg-white border border-black/5 shadow-[0_1px_3px_rgba(15,15,35,0.05)] p-6"
              >
                <div className="flex items-start justify-between mb-5">
                  <div
                    className={`w-11 h-11 rounded-xl bg-linear-to-br ${tool.gradient} flex items-center justify-center text-white font-semibold text-sm shadow-[0_4px_14px_rgba(91,91,255,0.2)]`}
                  >
                    {tool.initials}
                  </div>
                  <span
                    className={`inline-flex items-center h-6 px-2.5 rounded-full text-[11px] font-semibold border ${
                      tool.status === "Available"
                        ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/15"
                        : "bg-black/[0.03] text-muted-foreground border-black/10"
                    }`}
                  >
                    {tool.status}
                  </span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">{tool.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{tool.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* #help — Help Center                                          */}
      {/* ---------------------------------------------------------- */}
      <section id="help" className="py-20 md:py-24 scroll-mt-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-14">
            <div className="flex justify-center">
              <SectionLabel dark={false}>Help Center</SectionLabel>
            </div>
            <RevealText
              as="h2"
              text="Answers to the questions we hear most."
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-4"
            />
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground max-w-xl mx-auto"
            >
              Can&apos;t find what you need?{" "}
              <Link href="/contact" className="text-indigo-600 font-medium hover:underline">
                Talk to our team
              </Link>
              .
            </motion.p>
          </div>

          <div className="max-w-3xl mx-auto">
            <FaqAccordion />
          </div>
        </div>
      </section>

      <CtaBand />
    </div>
  )
}
