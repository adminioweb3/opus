"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ChevronDown,
  Clock,
  DollarSign,
  LineChart,
  Megaphone,
  MessageSquare,
  Puzzle,
  Search,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react"
import { PageHero } from "@/components/features/public/PageHero"
import { CtaBand } from "@/components/features/public/CtaBand"
import { SectionLabel } from "@/components/features/landing/primitives/SectionLabel"
import { RevealText } from "@/components/features/landing/primitives/RevealText"

/* ------------------------------------------------------------------ */
/* Fixed content data                                                  */
/* ------------------------------------------------------------------ */

const PLATFORMS: { icon: LucideIcon; name: string; desc: string }[] = [
  {
    icon: BarChart3,
    name: "Google Analytics",
    desc: "Planned: bring AI visibility context alongside traffic and conversion data.",
  },
  {
    icon: Search,
    name: "Google Search Console",
    desc: "Planned: pair AI search presence with traditional search performance.",
  },
  {
    icon: MessageSquare,
    name: "Slack",
    desc: "Planned: send alerts and summaries to the right channel after alert delivery is production-verified.",
  },
  {
    icon: Zap,
    name: "Zapier",
    desc: "Planned: connect Citationly events to no-code automation workflows.",
  },
  {
    icon: Users,
    name: "CRM",
    desc: "Planned: route AI visibility signals into revenue workflows once CRM integrations are available.",
  },
]

const BENEFITS: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: Zap,
    title: "Less friction",
    desc: "Insight arrives where the team already works instead of waiting to be checked.",
  },
  {
    icon: Clock,
    title: "Faster response",
    desc: "Alerts shorten the time between a change happening and someone acting on it.",
  },
  {
    icon: DollarSign,
    title: "Connected to outcomes",
    desc: "AI visibility sits alongside pipeline and revenue data, not off to the side.",
  },
]

const SETUP_STEPS: { step: string; title: string; desc: string }[] = [
  { step: "01", title: "Choose the integration", desc: "Pick an available integration or join the waitlist for a planned one." },
  { step: "02", title: "Authorize or configure", desc: "For live integrations, provide credentials or authorize the connected service." },
  { step: "03", title: "Test the connection", desc: "Confirm the integration can create the expected draft, export, alert, or report artifact." },
  { step: "04", title: "Review before shipping", desc: "Keep publishing and automation review-first unless your team explicitly approves a live policy." },
]

interface UseCase {
  icon: LucideIcon
  role: string
  desc: React.ReactNode
}

const USE_CASES: UseCase[] = [
  {
    icon: Megaphone,
    role: "Marketing team",
    desc: (
      <>
        A marketing team prepares weekly{" "}
        <Link
          href="/features/share-of-voice"
          className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
        >
          Share of Voice
        </Link>{" "}
        summaries for Slack once notification delivery is enabled for their workspace.
      </>
    ),
  },
  {
    icon: LineChart,
    role: "SEO team",
    desc: "An SEO team exports Citationly evidence while Search Console integration remains on the roadmap.",
  },
  {
    icon: DollarSign,
    role: "Revenue team",
    desc: "A revenue team uses Citationly reports today and can add CRM sync after that integration is released.",
  },
]

const BEST_PRACTICES: string[] = [
  "Start with the one integration that removes the most friction.",
  "Route alerts to a specific owner or channel.",
  "Pair Citationly with at least one analytics tool early.",
]

const FAQS: { q: string; a: React.ReactNode }[] = [
  {
    q: "Which tools does Citationly integrate with?",
    a: (
      <>
        Citationly currently supports customer-facing integration paths for WordPress publishing,
        public API/API-key access, MCP access, and developer handoff export. Google Analytics, Google
        Search Console, Slack, Zapier, and CRM integrations are planned roadmap items and should not
        be treated as live until they appear in your workspace settings.
      </>
    ),
  },
  {
    q: "Do integrations require code?",
    a: (
      <>
        CMS publishing and API workflows require the configuration shown in your workspace settings.
        Code-based websites can use developer handoff export today while GitHub PR automation is built.
      </>
    ),
  },
  {
    q: "How do real-time alerts work?",
    a: (
      <>
        Citationly records alert events and delivery status. Email delivery depends on configured SMTP,
        and Slack delivery is a planned integration rather than a live promise.
      </>
    ),
  },
  {
    q: "Can I connect Citationly to a tool that is not listed?",
    a: (
      <>
        If the tool is not one of the available integrations, use the{" "}
        <Link href="/api" className="text-indigo-600 font-medium hover:underline">
          API
        </Link>{" "}
        or developer handoff export today. Zapier is planned for no-code automation later.
      </>
    ),
  },
  {
    q: "Why connect to Google Search Console?",
    a: (
      <>
        Search Console shows how your brand performs in traditional search. It is on the roadmap so teams
        can compare AI visibility with organic search performance in one place once the integration ships.
      </>
    ),
  },
  {
    q: "Will integrations expose my data to other tools?",
    a: (
      <>
        Only the data you authorize for a specific integration is shared, and only with that destination.
        Connecting one integration does not authorize another service. You can review or revoke available
        connections from your integration settings.
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
        eyebrow="Integrations"
        title="Citationly integrations: available now and coming next"
        gradientWords={["works"]}
        wide
        description="Use the integrations available in your workspace today, and see what is planned next for analytics, alerts, automation, CRM, and developer workflows."
      >
        <a
          href="#supported-platforms"
          className="group h-12 px-7 rounded-full font-medium text-[15px] text-white bg-linear-to-r from-indigo-600 via-indigo-500 to-violet-500 shadow-[0_10px_30px_-8px_rgba(91,91,255,0.5)] hover:shadow-[0_14px_40px_-8px_rgba(91,91,255,0.65)] transition-shadow inline-flex items-center gap-2"
        >
          Explore Integrations
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </a>
        <Link
          href="/register"
          className="h-12 px-7 rounded-full font-medium text-[15px] text-foreground border border-black/10 bg-white/70 hover:bg-black/5 transition-colors inline-flex items-center gap-2"
        >
          Start Free Analysis
        </Link>
      </PageHero>

      {/* ---------------------------------------------------------- */}
      {/* Section 1 - Why integrations matter                          */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-4">
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="flex justify-center mb-6"
            >
              <span className="w-14 h-14 rounded-2xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center">
                <Puzzle className="w-6 h-6" />
              </span>
            </motion.div>
            <div className="flex justify-center">
              <SectionLabel dark={false}>Overview</SectionLabel>
            </div>
            <RevealText
              as="h2"
              text="Why integrations matter"
              gradientWords={["matter"]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-4"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-5 text-muted-foreground leading-relaxed text-[15px] md:text-base max-w-2xl mx-auto text-center"
          >
            <p>
              Insight that lives in one more dashboard is easy to ignore. Citationly is building integrations
              carefully: available workflows should work end to end, and planned workflows stay clearly labeled
              until they are production-ready.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 2 - Supported platforms                              */}
      {/* ---------------------------------------------------------- */}
      <section id="supported-platforms" className="py-20 md:py-24 bg-indigo-50/40 border-y border-black/5 scroll-mt-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="flex justify-center">
              <SectionLabel dark={false}>Platforms</SectionLabel>
            </div>
            <RevealText
              as="h2"
              text="Supported platforms"
              gradientWords={["platforms"]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-4"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PLATFORMS.slice(0, 3).map((platform, i) => (
              <motion.div
                key={platform.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
                className="group rounded-2xl border border-black/5 bg-white p-6 shadow-[0_10px_30px_-16px_rgba(15,15,40,0.10)] hover:shadow-[0_20px_50px_-20px_rgba(91,91,255,0.25)] hover:border-indigo-500/20 transition-all"
              >
                <span className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center mb-4 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                  <platform.icon className="w-4.5 h-4.5" />
                </span>
                <h3 className="text-[15px] font-semibold text-foreground mb-1.5">{platform.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{platform.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 lg:max-w-[calc(66.666%+1.25rem)] lg:mx-auto">
            {PLATFORMS.slice(3, 5).map((platform, i) => (
              <motion.div
                key={platform.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.55, delay: 0.24 + i * 0.08 }}
                className="group rounded-2xl border border-black/5 bg-white p-6 shadow-[0_10px_30px_-16px_rgba(15,15,40,0.10)] hover:shadow-[0_20px_50px_-20px_rgba(91,91,255,0.25)] hover:border-indigo-500/20 transition-all"
              >
                <span className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center mb-4 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                  <platform.icon className="w-4.5 h-4.5" />
                </span>
                <h3 className="text-[15px] font-semibold text-foreground mb-1.5">{platform.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{platform.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 3 - Integration benefits (dark accent card)          */}
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

            <div className="relative max-w-3xl mx-auto text-center">
              <div className="flex justify-center">
                <SectionLabel>Benefits</SectionLabel>
              </div>
              <RevealText
                as="h2"
                text="What integrations give your team"
                className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-white mb-8"
              />

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="text-white/55 leading-relaxed text-[15px] md:text-base mb-12"
              >
              Integrations reduce friction only when they are dependable. Citationly separates available
              workflows from planned ones so teams know exactly what can be used today.
              </motion.p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-10 text-left">
                {BENEFITS.map((benefit, i) => (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: 0.1 + i * 0.1 }}
                  >
                    <div className="shrink-0 w-11 h-11 rounded-xl bg-indigo-500/15 border border-white/10 text-indigo-300 flex items-center justify-center mb-4">
                      <benefit.icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-white font-semibold text-[15px] mb-1.5">{benefit.title}</h3>
                    <p className="text-white/55 text-sm leading-relaxed">{benefit.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 4 - How setup works (timeline)                       */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <div className="flex justify-center">
              <SectionLabel dark={false}>Setup</SectionLabel>
            </div>
            <RevealText
              as="h2"
              text="How setup works"
              gradientWords={["works"]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-4"
            />
          </div>

          <div className="max-w-2xl mx-auto">
            {SETUP_STEPS.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.55, delay: 0.05 + i * 0.08 }}
                className="relative pl-12 pb-12 last:pb-0"
              >
                {i < SETUP_STEPS.length - 1 && (
                  <span className="absolute left-2.75 top-8 bottom-0 w-px bg-linear-to-b from-indigo-200 to-black/5" />
                )}
                <span className="absolute left-0 top-1 w-5.75 h-5.75 rounded-full bg-white border border-indigo-200 shadow-[0_1px_3px_rgba(91,91,255,0.15)] flex items-center justify-center">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      i === SETUP_STEPS.length - 1 ? "bg-indigo-500 animate-pulse" : "bg-indigo-400"
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

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center text-muted-foreground max-w-xl mx-auto mt-4"
          >
            Available connections expose their setup requirements in workspace settings. Teams building custom
            workflows can go further with the{" "}
            <Link href="/api" className="text-indigo-600 font-medium hover:underline">
              API
            </Link>
            .
          </motion.p>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 5 - Use cases                                        */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24 bg-indigo-50/40 border-y border-black/5">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="flex justify-center">
              <SectionLabel dark={false}>In practice</SectionLabel>
            </div>
            <RevealText
              as="h2"
              text="How teams use integrations"
              gradientWords={["integrations"]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-4"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {USE_CASES.map((item, i) => (
              <motion.div
                key={item.role}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className="rounded-2xl bg-white border border-black/5 shadow-[0_1px_3px_rgba(15,15,35,0.05)] p-6"
              >
                <span className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center mb-4">
                  <item.icon className="w-4.5 h-4.5" />
                </span>
                <h3 className="text-[15px] font-semibold text-foreground mb-1.5">{item.role}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 6 - Best practices                                   */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="flex justify-center">
              <SectionLabel dark={false}>Best practices</SectionLabel>
            </div>
            <RevealText
              as="h2"
              text="Getting the most from integrations"
              gradientWords={["integrations"]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-4"
            />
          </div>

          <div className="max-w-2xl mx-auto space-y-4">
            {BEST_PRACTICES.map((text, i) => (
              <motion.div
                key={text}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex items-start gap-3 rounded-2xl bg-white border border-black/5 shadow-[0_1px_3px_rgba(15,15,35,0.05)] p-5"
              >
                <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                <p className="text-foreground/80 text-[15px] leading-relaxed">{text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 7 - FAQ                                              */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24 bg-indigo-50/40 border-y border-black/5">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="flex justify-center">
              <SectionLabel dark={false}>FAQ</SectionLabel>
            </div>
            <RevealText
              as="h2"
              text="Questions about connecting your stack."
              gradientWords={["stack"]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-4"
            />
          </div>

          <div className="max-w-3xl mx-auto">
            <FaqAccordion />
          </div>
        </div>
      </section>

      <CtaBand
        title="Connect Citationly to your stack"
        description="Bring AI search intelligence into the tools your team already uses."
        primaryLabel="Explore Integrations"
        primaryHref="/register"
      />

      <div className="pb-20 md:pb-24 -mt-8">
        <div className="container mx-auto px-6 max-w-6xl flex items-center justify-center text-sm">
          <Link href="/contact" className="text-muted-foreground hover:text-indigo-600 transition-colors">
            Book a Demo
          </Link>
        </div>
      </div>
    </div>
  )
}
