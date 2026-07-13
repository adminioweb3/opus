"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Armchair,
  Clock,
  Compass,
  FlaskConical,
  Globe,
  GraduationCap,
  Hammer,
  HeartPulse,
  Laptop,
  MapPin,
  MessagesSquare,
  PieChart,
  Plane,
  Rocket,
  Target,
  Users,
  type LucideIcon,
} from "lucide-react"
import { PageHero } from "@/components/features/public/PageHero"
import { CtaBand } from "@/components/features/public/CtaBand"
import { SectionLabel } from "@/components/features/landing/primitives/SectionLabel"
import { RevealText } from "@/components/features/landing/primitives/RevealText"
import { AnimatedCounter } from "@/components/features/landing/primitives/AnimatedCounter"

/* ---------------------------------- data --------------------------------- */

const WHY_CARDS: { icon: LucideIcon; title: string; body: React.ReactNode }[] = [
  {
    icon: Compass,
    title: "A category-defining problem",
    body: (
      <>
        Generative engines now answer buyer questions directly. Brands can measure their Google
        rankings to the decimal — and have no idea what ChatGPT, Gemini, Claude, Perplexity,
        Copilot, or Grok say about them. We are building the instrument panel for that blind spot.
      </>
    ),
  },
  {
    icon: Rocket,
    title: "Real product, shipped weekly",
    body: (
      <>
        Fourteen live modules — from Visibility Radar and Citation Intelligence to Answer Simulator
        and Publishing Center — used by paying customers every day. Code you write this week is in
        production the next.{" "}
        <Link
          href="/changelog"
          className="inline-flex items-center gap-1 text-indigo-600 font-medium hover:text-indigo-700 transition-colors"
        >
          See what we shipped
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </>
    ),
  },
  {
    icon: Users,
    title: "A small, senior team",
    body: (
      <>
        No layers, no handoffs, no ticket factories. Everyone owns a full surface of the product,
        talks to customers directly, and works alongside the founders. Your judgment is the
        process.
      </>
    ),
  },
]

const WHY_STATS: { value: number; suffix: string; label: string }[] = [
  { value: 6, suffix: "", label: "AI platforms monitored" },
  { value: 14, suffix: "", label: "live product modules" },
  { value: 6, suffix: "", label: "open roles right now" },
  { value: 100, suffix: "%", label: "remote-first team" },
]

const VALUES: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Hammer,
    title: "Ship real things",
    body: "Demos over decks, production over prototypes. The unit of progress here is something a customer can use — everything else is overhead.",
  },
  {
    icon: FlaskConical,
    title: "Evidence over opinion",
    body: "We run the discipline we sell. Decisions are argued with scan data, citation counts, and customer recordings — not seniority or volume.",
  },
  {
    icon: Target,
    title: "Own the outcome",
    body: "You own problems, not tickets. If the metric does not move, the work is not done — and you have the autonomy to change the plan.",
  },
  {
    icon: MessagesSquare,
    title: "Kind and direct",
    body: "Feedback arrives early, plainly, and usually in writing. We are hard on the work and easy on the person — in that order.",
  },
]

const BENEFITS: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Globe,
    title: "Remote-first",
    body: "Work from anywhere with 4+ hours of EU/US overlap. Async by default.",
  },
  {
    icon: PieChart,
    title: "Meaningful equity",
    body: "Every full-time role carries real ownership in the company you are building.",
  },
  {
    icon: Armchair,
    title: "Home-office budget",
    body: "$1,500 to build a workspace you actually want to sit in.",
  },
  {
    icon: GraduationCap,
    title: "Learning budget",
    body: "$1,000 a year for books, courses, and conferences — no approval theater.",
  },
  {
    icon: HeartPulse,
    title: "Private healthcare",
    body: "Comprehensive private cover from day one, wherever you are based.",
  },
  {
    icon: Clock,
    title: "Flexible hours",
    body: "Own your calendar. We measure output, not presence.",
  },
  {
    icon: Plane,
    title: "Annual offsite",
    body: "One week a year, the whole company in one place to plan — and unwind.",
  },
  {
    icon: Laptop,
    title: "Latest hardware",
    body: "Top-spec laptop and peripherals of your choice, refreshed on schedule.",
  },
]

interface Role {
  title: string
  blurb: string
}

const DEPARTMENTS: { name: string; badgeClass: string; roles: Role[] }[] = [
  {
    name: "Engineering",
    badgeClass: "bg-indigo-500/10 text-indigo-600 border-indigo-500/20",
    roles: [
      {
        title: "Senior Full-Stack Engineer (TypeScript / .NET)",
        blurb:
          "Own features end to end across our Next.js frontend and .NET services — from Visibility Radar scans to the Reports pipeline. You will ship to production in your first week.",
      },
      {
        title: "AI/ML Engineer",
        blurb:
          "Design the evaluation and prompt-coverage systems behind Answer Simulator and Citation Intelligence. Deep familiarity with LLM behavior across ChatGPT, Gemini, Claude, and Perplexity required.",
      },
      {
        title: "Platform Engineer",
        blurb:
          "Scale the crawling, scanning, and scheduling infrastructure behind Knowledge Vault and our weekly platform scans. Queues, Kubernetes, and observability are your home turf.",
      },
    ],
  },
  {
    name: "Product",
    badgeClass: "bg-purple-500/10 text-purple-600 border-purple-500/20",
    roles: [
      {
        title: "Senior Product Designer",
        blurb:
          "Shape how marketing leaders read AI visibility data, from Command Center to Competitor Watch. You will design systems rather than screens, and test with real customers weekly.",
      },
    ],
  },
  {
    name: "Go-to-market",
    badgeClass: "bg-sky-500/10 text-sky-600 border-sky-500/20",
    roles: [
      {
        title: "Founding Account Executive",
        blurb:
          "Run the full sales cycle for a category buyers are actively trying to understand. You will work directly with the founders and write the playbook from first call to close.",
      },
      {
        title: "Content Lead — AI Search",
        blurb:
          "Own the voice of the AI visibility category: research, benchmarks, and playbooks strong enough that AI engines end up citing them. Proof that we practice what we sell.",
      },
    ],
  },
]

const PROCESS_STEPS: { step: string; days: string; title: string; body: string }[] = [
  {
    step: "01",
    days: "Day 1–2",
    title: "Intro call",
    body: "30 minutes with the hiring manager on mutual fit and what you want next.",
  },
  {
    step: "02",
    days: "Day 3–5",
    title: "Deep-dive",
    body: "60–90 minutes on your craft, with the people you would actually work with.",
  },
  {
    step: "03",
    days: "Day 6–9",
    title: "Practical exercise",
    body: "A paid, scoped exercise close to the real job. Capped at four hours.",
  },
  {
    step: "04",
    days: "Day 10–12",
    title: "Team fit",
    body: "Meet the founders and future teammates. You are interviewing us too.",
  },
  {
    step: "05",
    days: "Day 14",
    title: "Offer",
    body: "A clear written offer with salary and equity. Decide on your own time.",
  },
]

/* -------------------------------- helpers -------------------------------- */

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-8%" as const },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const },
})

function SectionHeading({
  eyebrow,
  title,
  gradientWords,
  children,
}: {
  eyebrow: string
  title: string
  gradientWords?: string[]
  children?: React.ReactNode
}) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-14">
      <div className="flex justify-center">
        <SectionLabel dark={false}>{eyebrow}</SectionLabel>
      </div>
      <RevealText
        as="h2"
        text={title}
        gradientWords={gradientWords}
        className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-4"
      />
      {children && (
        <motion.p {...fadeUp(0.25)} className="text-muted-foreground leading-relaxed">
          {children}
        </motion.p>
      )}
    </div>
  )
}

/* --------------------------------- page ---------------------------------- */

export function Content() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Help build the AI visibility category."
        gradientWords={["AI"]}
        description="Citationly is becoming the system of record for how AI platforms see brands. We are a small, senior team shipping real product every week — and we hire people who want their work in front of customers, not on a roadmap."
      >
        <a
          href="#open-roles"
          className="group h-12 px-7 rounded-full font-medium text-[15px] bg-foreground text-background inline-flex items-center gap-2 shadow-sm hover:shadow-md transition-shadow"
        >
          See open roles
          <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
        </a>
        <Link
          href="/about"
          className="h-12 px-7 rounded-full font-medium text-[15px] text-foreground border border-black/10 bg-white hover:bg-black/3 transition-colors inline-flex items-center gap-2"
        >
          Meet the team
        </Link>
      </PageHero>

      {/* ------------------------- Why Citationly ------------------------- */}
      <section className="py-20 md:py-24 bg-background">
        <div className="container mx-auto px-6 max-w-6xl">
          <SectionHeading
            eyebrow="Why Citationly"
            title="The best time to join a category is before it has a name."
            gradientWords={["category"]}
          >
            Search is being rebuilt around AI answers. Citationly measures how six AI platforms
            discover, understand, recommend, and cite brands — and we need more hands on the
            instruments.
          </SectionHeading>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {WHY_CARDS.map((card, i) => (
              <motion.div
                key={card.title}
                {...fadeUp(i * 0.08)}
                className="bg-white border border-black/5 rounded-[1.5rem] p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow"
              >
                <div className="w-11 h-11 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center mb-5">
                  <card.icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3 tracking-[-0.01em]">
                  {card.title}
                </h3>
                <p className="text-[15px] text-muted-foreground leading-relaxed">{card.body}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            {...fadeUp(0.2)}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-black/5 bg-black/5"
          >
            {WHY_STATS.map((stat) => (
              <div key={stat.label} className="bg-indigo-50/50 px-6 py-7 text-center">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  className="block text-3xl font-semibold text-indigo-600 tracking-[-0.02em] mb-1"
                />
                <span className="text-[13px] text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --------------------------- How we work -------------------------- */}
      <section className="py-6 md:py-10">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-[2rem] bg-[#050508] px-8 py-14 md:px-14 md:py-18"
          >
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(45% 55% at 15% 10%, rgba(91,91,255,0.28), transparent 70%), radial-gradient(35% 50% at 90% 20%, rgba(168,85,247,0.18), transparent 70%), radial-gradient(50% 60% at 50% 110%, rgba(59,130,246,0.14), transparent 70%)",
              }}
            />
            <div className="landing-noise" />

            <div className="relative">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <div className="flex justify-center">
                  <SectionLabel dark>How we work</SectionLabel>
                </div>
                <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-white mb-4">
                  Four principles, applied daily.
                </h2>
                <p className="text-white/55 leading-relaxed">
                  Not poster values. These are the tiebreakers we actually use when a decision is
                  close.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                {VALUES.map((value, i) => (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                    className="rounded-2xl border border-white/10 bg-white/4 p-7 hover:bg-white/[0.07] transition-colors"
                  >
                    <div className="flex items-center gap-3.5 mb-3.5">
                      <div className="w-9 h-9 rounded-lg bg-indigo-500/20 text-indigo-300 flex items-center justify-center shrink-0">
                        <value.icon className="w-4.5 h-4.5" />
                      </div>
                      <h3 className="text-base font-semibold text-white">{value.title}</h3>
                    </div>
                    <p className="text-[14.5px] text-white/55 leading-relaxed">{value.body}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---------------------------- Benefits ---------------------------- */}
      <section className="py-20 md:py-24 bg-background">
        <div className="container mx-auto px-6 max-w-6xl">
          <SectionHeading
            eyebrow="Benefits"
            title="Set up to do the best work of your career."
            gradientWords={["best"]}
          >
            The philosophy is simple: remove friction, share the upside, and trust adults to manage
            their own time.
          </SectionHeading>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {BENEFITS.map((benefit, i) => (
              <motion.div
                key={benefit.title}
                {...fadeUp((i % 4) * 0.06 + Math.floor(i / 4) * 0.1)}
                className="bg-white border border-black/5 rounded-2xl p-6 hover:border-indigo-500/20 hover:shadow-[0_8px_30px_rgba(0,0,0,0.05)] transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 text-indigo-600 flex items-center justify-center mb-4">
                  <benefit.icon className="w-4.5 h-4.5" />
                </div>
                <h3 className="text-[15px] font-semibold text-foreground mb-1.5">{benefit.title}</h3>
                <p className="text-[13.5px] text-muted-foreground leading-relaxed">{benefit.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------- Open roles --------------------------- */}
      <section id="open-roles" className="scroll-mt-28 py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <SectionHeading eyebrow="Open roles" title="Where we need help right now." gradientWords={["help"]}>
            Every role is remote with EU/US overlap, full-time, and comes with equity. If you are
            close but not an exact match, apply anyway — the description is a sketch, not a fence.
          </SectionHeading>

          <div className="space-y-12">
            {DEPARTMENTS.map((dept) => (
              <div key={dept.name}>
                <motion.div {...fadeUp()} className="flex items-center gap-3 mb-5">
                  <h3 className="text-sm font-semibold tracking-[0.08em] uppercase text-foreground/70">
                    {dept.name}
                  </h3>
                  <span className="text-[12px] font-medium text-muted-foreground bg-black/5 rounded-full px-2.5 py-0.5">
                    {dept.roles.length} {dept.roles.length === 1 ? "role" : "roles"}
                  </span>
                  <div className="flex-1 h-px bg-black/5" />
                </motion.div>

                <div className="space-y-4">
                  {dept.roles.map((role, i) => (
                    <motion.div
                      key={role.title}
                      {...fadeUp(i * 0.07)}
                      className="group bg-white border border-black/5 rounded-2xl p-6 md:p-7 hover:border-indigo-500/25 hover:shadow-[0_10px_36px_rgba(0,0,0,0.06)] transition-all"
                    >
                      <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-8">
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2.5 mb-2.5">
                            <h4 className="text-[17px] font-semibold text-foreground tracking-[-0.01em]">
                              {role.title}
                            </h4>
                            <span
                              className={`text-[11px] font-semibold tracking-[0.04em] uppercase border rounded-full px-2.5 py-0.5 ${dept.badgeClass}`}
                            >
                              {dept.name}
                            </span>
                          </div>
                          <p className="text-[14.5px] text-muted-foreground leading-relaxed mb-3.5 max-w-2xl">
                            {role.blurb}
                          </p>
                          <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[13px] text-muted-foreground">
                            <span className="inline-flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5 text-indigo-500" />
                              Remote (EU/US overlap)
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5 text-indigo-500" />
                              Full-time
                            </span>
                          </div>
                        </div>

                        <div className="shrink-0">
                          <a
                            href={`mailto:careers@citationly.io?subject=${encodeURIComponent(
                              `Application: ${role.title}`
                            )}`}
                            className="inline-flex items-center gap-1.5 h-10 px-5 rounded-full text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-500 transition-colors shadow-sm"
                          >
                            Apply
                            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------- Hiring process ------------------------- */}
      <section className="py-20 md:py-24 bg-background">
        <div className="container mx-auto px-6 max-w-6xl">
          <SectionHeading eyebrow="Hiring process" title="Two weeks from hello to offer." gradientWords={["Two", "weeks"]}>
            No ghosting, no gauntlets. You will always know where you stand and what happens next.
          </SectionHeading>

          <div className="relative">
            {/* Connector line behind the steps (desktop only) */}
            <div className="hidden lg:block absolute top-5 left-[10%] right-[10%] h-px bg-linear-to-r from-indigo-500/10 via-indigo-500/30 to-indigo-500/10" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4">
              {PROCESS_STEPS.map((step, i) => (
                <motion.div key={step.step} {...fadeUp(i * 0.09)} className="relative text-center lg:px-2">
                  <div className="relative inline-flex items-center justify-center w-10 h-10 rounded-full bg-white border border-indigo-500/25 text-indigo-600 text-[13px] font-semibold mb-4 shadow-sm">
                    {step.step}
                  </div>
                  <div className="text-[11px] font-semibold tracking-widest uppercase text-indigo-600 mb-1.5">
                    {step.days}
                  </div>
                  <h3 className="text-[15px] font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-[13px] text-muted-foreground leading-relaxed">{step.body}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.p {...fadeUp(0.3)} className="text-center text-[13px] text-muted-foreground mt-12">
            Practical exercises are always paid, always scoped, and never speculative work we could
            ship.
          </motion.p>
        </div>
      </section>

      {/* ------------------------------ CTA ------------------------------- */}
      <CtaBand
        title="Do not see your role?"
        description="Exceptional people rarely fit a job description exactly. Tell us what you would own at Citationly and why now — we read and answer every note."
        primaryLabel="Email us"
        primaryHref="/contact"
        secondaryLabel="Learn about us"
        secondaryHref="/about"
      />
    </>
  )
}
