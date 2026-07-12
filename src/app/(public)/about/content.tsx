"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Database, Quote, Ruler, Wrench, type LucideIcon } from "lucide-react"
import { PageHero } from "@/components/features/public/PageHero"
import { CtaBand } from "@/components/features/public/CtaBand"
import { SectionLabel } from "@/components/features/landing/primitives/SectionLabel"
import { RevealText } from "@/components/features/landing/primitives/RevealText"
import { AnimatedCounter } from "@/components/features/landing/primitives/AnimatedCounter"

/* ------------------------------------------------------------------ */
/* Fixed content data                                                  */
/* ------------------------------------------------------------------ */

const WHY_NOW_STATS: {
  value: number
  suffix: string
  label: string
}[] = [
  {
    value: 60,
    suffix: "%+",
    label: "of buying research now begins with a question to an AI assistant — not a query in a search box.",
  },
  {
    value: 2,
    suffix: "x",
    label: "growth in zero-click journeys as answer engines resolve questions on the spot, before a website is ever visited.",
  },
  {
    value: 9,
    suffix: " in 10",
    label: "brands still run no formal AI visibility program — no score, no monitoring, no owner.",
  },
]

const VALUES: {
  icon: LucideIcon
  title: string
  desc: string
}[] = [
  {
    icon: Ruler,
    title: "Measured over assumed",
    desc: "If it isn't observed in a real AI answer, it doesn't go in the product. Every score in Citationly traces back to actual scans across ChatGPT, Gemini, Claude, Perplexity, Copilot, and Grok — never to a guess about how models probably behave.",
  },
  {
    icon: Database,
    title: "Real data only",
    desc: "No vanity metrics, no synthetic “estimated reach.” Visibility Radar and Brand Pulse report what the engines actually said about you this week — including when the news is bad. Especially when the news is bad.",
  },
  {
    icon: Wrench,
    title: "Fixes, not dashboards",
    desc: "A chart that doesn't change your next action is decoration. Opportunity Finder ranks what to do first, and the GEO Optimizer attaches page-level fixes to every finding — so a scan always ends in a shipped improvement.",
  },
  {
    icon: Quote,
    title: "Earn the citation",
    desc: "There are no shortcuts into an AI answer, and we don't sell any. We help you become the source engines want to cite: clear, verifiable, well-structured content that deserves the reference it gets.",
  },
]

const TIMELINE: {
  date: string
  title: string
  desc: string
}[] = [
  {
    date: "Jan 2024",
    title: "Founded in the answer gap",
    desc: "Our founders watched an AI assistant confidently recommend three competitors for a query their company should have owned — and no tool on earth could explain why. Citationly started that week as a spreadsheet and a few hundred hand-run prompts.",
  },
  {
    date: "Jul 2024",
    title: "First visibility scans",
    desc: "Visibility Radar ships: weekly platform-by-platform scans with a visibility score for every engine. For the first time, teams could watch their AI presence trend the way they watch organic traffic.",
  },
  {
    date: "Dec 2024",
    title: "Citation Intelligence",
    desc: "We took on the harder question — not just whether you appear, but who gets cited instead of you. Citation Intelligence and Competitor Watch turned AI answers into a share-of-voice battleground you can actually see.",
  },
  {
    date: "Jun 2025",
    title: "The full GEO platform",
    desc: "Measurement alone doesn't move a score. GEO Optimizer, Answer Simulator, Content Generator, Publishing Center, and Knowledge Vault closed the loop from finding a gap to shipping the fix that closes it.",
  },
  {
    date: "Today",
    title: "Intelligence for the whole org",
    desc: "Command Center for executives, Brand Pulse alerts, Opportunity Finder deep scans, board-ready Reports, team roles, and an API. Growth teams at companies like Northwind Cloud, Fielder, and Larkspur Group now run their entire AI visibility program on Citationly.",
  },
]

const TEAM: {
  initials: string
  name: string
  role: string
  bio: string
  gradient: string
}[] = [
  {
    initials: "ML",
    name: "Maya Lindqvist",
    role: "Co-founder & CEO",
    bio: "Former SaaS marketing VP who got tired of reporting rankings while her buyers were quietly asking chatbots instead.",
    gradient: "from-indigo-500 to-violet-500",
  },
  {
    initials: "DO",
    name: "Daniel Okafor",
    role: "Co-founder & CTO",
    bio: "Spent a decade building large-scale search and crawling infrastructure — now points it at answer engines.",
    gradient: "from-violet-500 to-fuchsia-500",
  },
  {
    initials: "PR",
    name: "Priya Raghavan",
    role: "VP Product",
    bio: "Turns millions of raw model responses into scores a CMO can defend in a board meeting without a footnote.",
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    initials: "TH",
    name: "Tomás Herrera",
    role: "Head of AI Research",
    bio: "Studies how generative engines choose their citations — and how brands legitimately earn a place in them.",
    gradient: "from-purple-500 to-indigo-500",
  },
]

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export function Content() {
  return (
    <div className="bg-background">
      <PageHero
        eyebrow="About Citationly"
        title="Making AI visibility measurable."
        gradientWords={["measurable"]}
        description="Citationly is the AI visibility intelligence platform. We measure how ChatGPT, Gemini, Claude, Perplexity, Copilot, and Grok discover, understand, recommend, and cite your brand — then help you change the answer."
      />

      {/* ---------------------------------------------------------- */}
      {/* Section 1 — Why now                                          */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-14 lg:gap-20 items-start">
            <div>
              <SectionLabel dark={false}>Why now</SectionLabel>
              <RevealText
                as="h2"
                text="The buyer journey moved. Measurement didn't."
                gradientWords={["moved"]}
                className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-6"
              />
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="space-y-5 text-muted-foreground leading-relaxed text-[15px] md:text-base max-w-xl"
              >
                <p>
                  For twenty years, being found meant ranking on a results page. Then buyers stopped
                  browsing results and started asking questions. They ask ChatGPT which vendors belong on
                  the shortlist, ask Perplexity to compare platforms, ask Copilot inside the tools they
                  already work in — and they act on the answer, often without ever opening a search
                  engine.
                </p>
                <p>
                  The problem: almost nobody can see those answers. Brands are being recommended,
                  misdescribed, or silently omitted across six AI platforms, and the teams responsible
                  have no score, no trendline, and no playbook. We started Citationly to close that gap —
                  to make AI visibility as measurable as organic traffic, and, more importantly, fixable.
                </p>
              </motion.div>
            </div>

            <div className="flex flex-col gap-4">
              {WHY_NOW_STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: 0.1 + i * 0.12 }}
                  className="rounded-2xl bg-white border border-black/5 shadow-[0_1px_3px_rgba(15,15,35,0.05)] p-6"
                >
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    className="text-3xl font-semibold tracking-[-0.02em] text-indigo-600"
                  />
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{stat.label}</p>
                </motion.div>
              ))}
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-xs text-muted-foreground/70 leading-relaxed px-1"
              >
                Directional industry trends — the point is the slope, not the decimal. Every number
                inside Citationly, by contrast, is measured from real AI answers.
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 2 — What we believe (dark accent card)               */}
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

            <div className="relative">
              <div className="text-center mb-14">
                <div className="flex justify-center">
                  <SectionLabel>What we believe</SectionLabel>
                </div>
                <RevealText
                  as="h2"
                  text="Four principles we won't trade."
                  className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-white"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
                {VALUES.map((value, i) => (
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

      {/* ---------------------------------------------------------- */}
      {/* Section 3 — The story so far (timeline)                      */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <div className="flex justify-center">
              <SectionLabel dark={false}>The story so far</SectionLabel>
            </div>
            <RevealText
              as="h2"
              text="From hand-run prompts to a full GEO platform."
              gradientWords={["platform"]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-4"
            />
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-muted-foreground max-w-xl mx-auto"
            >
              Every module in the product exists because a customer hit a wall we couldn&apos;t ignore.
            </motion.p>
          </div>

          <div className="max-w-2xl mx-auto">
            {TIMELINE.map((item, i) => (
              <motion.div
                key={item.date}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.55, delay: 0.05 + i * 0.08 }}
                className="relative pl-12 pb-12 last:pb-0"
              >
                {/* connector line */}
                {i < TIMELINE.length - 1 && (
                  <span className="absolute left-2.75 top-8 bottom-0 w-px bg-linear-to-b from-indigo-200 to-black/5" />
                )}
                {/* node */}
                <span className="absolute left-0 top-1 w-5.75 h-5.75 rounded-full bg-white border border-indigo-200 shadow-[0_1px_3px_rgba(91,91,255,0.15)] flex items-center justify-center">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      i === TIMELINE.length - 1 ? "bg-indigo-500 animate-pulse" : "bg-indigo-400"
                    }`}
                  />
                </span>

                <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-indigo-600 mb-1.5">
                  {item.date}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-[15px] leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 4 — The team                                         */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24 bg-indigo-50/40 border-y border-black/5">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-14">
            <div className="flex justify-center">
              <SectionLabel dark={false}>The team</SectionLabel>
            </div>
            <RevealText
              as="h2"
              text="The people making AI answers accountable."
              gradientWords={["accountable"]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-4"
            />
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-muted-foreground max-w-xl mx-auto"
            >
              A small, senior team from search infrastructure, growth marketing, and machine-learning
              research — people who have lived both sides of the visibility problem.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TEAM.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.1 + i * 0.1 }}
                className="rounded-2xl bg-white border border-black/5 shadow-[0_1px_3px_rgba(15,15,35,0.05)] p-7 text-center"
              >
                <div
                  className={`w-16 h-16 mx-auto mb-5 rounded-full bg-linear-to-br ${member.gradient} flex items-center justify-center text-white font-semibold text-lg shadow-[0_4px_14px_rgba(91,91,255,0.25)]`}
                >
                  {member.initials}
                </div>
                <h3 className="font-semibold text-foreground">{member.name}</h3>
                <div className="text-[13px] font-medium text-indigo-600 mt-0.5 mb-3">{member.role}</div>
                <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 5 — Careers teaser                                   */}
      {/* ---------------------------------------------------------- */}
      <section className="pt-20 md:pt-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-[2rem] border border-indigo-100 bg-indigo-50/50 px-8 py-14 md:px-16 text-center"
          >
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(50% 70% at 50% -10%, rgba(91,91,255,0.10), transparent), radial-gradient(35% 50% at 90% 100%, rgba(168,85,247,0.07), transparent)",
              }}
            />
            <div className="relative">
              <h3 className="text-2xl md:text-3xl font-semibold tracking-[-0.02em] text-foreground mb-3">
                Help make AI answers accountable.
              </h3>
              <p className="text-muted-foreground max-w-lg mx-auto mb-8">
                We&apos;re hiring across engineering, AI research, and go-to-market. If you want your
                work to shape how an entire industry measures itself, we should talk.
              </p>
              <Link
                href="/careers"
                className="group inline-flex items-center gap-2 h-12 px-7 rounded-full font-medium text-[15px] bg-[#050508] text-white hover:bg-[#1a1a24] transition-colors"
              >
                See open roles
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <CtaBand />
    </div>
  )
}
