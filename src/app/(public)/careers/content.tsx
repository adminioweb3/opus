"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Check, MessageCircle, Scale, Target, Zap, type LucideIcon } from "lucide-react"
import { PageHero } from "@/components/features/public/PageHero"
import { CtaBand } from "@/components/features/public/CtaBand"
import { SectionLabel } from "@/components/features/landing/primitives/SectionLabel"
import { RevealText } from "@/components/features/landing/primitives/RevealText"

/* ---------------------------------- data --------------------------------- */

const VALUES: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Scale,
    title: "Evidence wins arguments",
    body: "Decisions run on observed data, tested hypotheses, and honest readings of results.",
  },
  {
    icon: Target,
    title: "Ownership over assignment",
    body: "We hire people we trust with problems, not tasks.",
  },
  {
    icon: Zap,
    title: "Speed with craft",
    body: "AI search changes monthly, so we ship fast, but fast never means careless.",
  },
  {
    icon: MessageCircle,
    title: "Direct and kind",
    body: "Feedback here is specific, prompt, and delivered with respect.",
  },
]

const OFFER_ITEMS: string[] = [
  "Competitive salary with meaningful equity.",
  "Flexible and remote-friendly working.",
  "Health coverage for you and your family.",
  "A learning and development budget you are expected to actually use.",
  "Modern equipment and the tools you need.",
  "Generous paid leave, and a culture where taking it is normal.",
]

const PROCESS_STEPS: { step: string; title: string }[] = [
  { step: "01", title: "Application review" },
  { step: "02", title: "Conversation" },
  { step: "03", title: "Working session" },
  { step: "04", title: "Team conversations" },
  { step: "05", title: "Decision" },
]

const FIT_ITEMS: string[] = [
  "Ambiguity energizes you more than it worries you.",
  "You would rather define a metric than inherit one.",
  "You care about the customer's outcome, not just your component of it.",
  "You communicate directly and receive directness well.",
  "The idea of AI search and innovation genuinely interests you.",
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
  dark = false,
  children,
}: {
  eyebrow: string
  title: string
  gradientWords?: string[]
  dark?: boolean
  children?: React.ReactNode
}) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-14">
      <div className="flex justify-center">
        <SectionLabel dark={dark}>{eyebrow}</SectionLabel>
      </div>
      <RevealText
        as="h2"
        text={title}
        gradientWords={gradientWords}
        className={`text-3xl md:text-4xl font-semibold tracking-[-0.02em] mb-4 ${
          dark ? "text-white" : "text-foreground"
        }`}
      />
      {children && (
        <motion.p {...fadeUp(0.25)} className={`leading-relaxed ${dark ? "text-white/55" : "text-muted-foreground"}`}>
          {children}
        </motion.p>
      )}
    </div>
  )
}

function CheckList({ items, columns = 1 }: { items: string[]; columns?: 1 | 2 }) {
  return (
    <div
      className={`max-w-3xl mx-auto rounded-2xl bg-white border border-black/5 shadow-[0_1px_3px_rgba(15,15,35,0.05)] p-8 md:p-10 grid grid-cols-1 ${
        columns === 2 ? "sm:grid-cols-2" : ""
      } gap-x-10 gap-y-5`}
    >
      {items.map((item, i) => (
        <motion.div key={item} {...fadeUp(i * 0.06)} className="flex items-start gap-3">
          <Check className="w-4 h-4 shrink-0 text-indigo-600 mt-1" />
          <span className="text-[15px] text-foreground/80 leading-relaxed">{item}</span>
        </motion.div>
      ))}
    </div>
  )
}

/* --------------------------------- page ---------------------------------- */

export function Content() {
  return (
    <>
      <PageHero
        eyebrow="Careers at Citationly"
        title="Help build the category everyone will measure by"
        gradientWords={["category"]}
        description="AI search is rewriting how the world finds products, answers, and brands. We are building the software that makes that world measurable, and we are hiring people who want their work to define a discipline."
      >
        <a
          href="#open-roles"
          className="group h-12 px-7 rounded-full font-medium text-[15px] bg-foreground text-background inline-flex items-center gap-2 shadow-sm hover:shadow-md transition-shadow"
        >
          View Open Positions
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </a>
        <Link
          href="/about"
          className="h-12 px-7 rounded-full font-medium text-[15px] text-foreground border border-black/10 bg-white hover:bg-black/3 transition-colors inline-flex items-center gap-2"
        >
          Apply Now
        </Link>
      </PageHero>

      {/* ------------------- A rare moment to join something early ------------------ */}
      <section className="py-20 md:py-24 bg-background">
        <div className="container mx-auto px-6 max-w-4xl">
          <SectionHeading
            eyebrow="Why now"
            title="A rare moment to join something early"
            gradientWords={["early"]}
          />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-5 text-muted-foreground leading-relaxed text-[15px] md:text-base max-w-3xl mx-auto"
          >
            <p>
              Most careers in software mean improving an established category. Citationly offers
              something less common: the chance to help define one. Enterprise AI visibility software
              barely existed two years ago.
            </p>
            <p>
              Today, CMOs at serious companies are asking how their brand appears in AI answers, and
              the methodology for answering them is being written right now, partly by us. Working
              here means your decisions compound.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --------------------------- How we work (dark) --------------------------- */}
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
              <SectionHeading eyebrow="Culture" title="How we work" dark />

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

      {/* ------------------------------ How you grow ------------------------------ */}
      <section className="py-20 md:py-24 bg-background">
        <div className="container mx-auto px-6 max-w-4xl">
          <SectionHeading eyebrow="Growth" title="How you grow here" gradientWords={["grow"]} />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-5 text-muted-foreground leading-relaxed text-[15px] md:text-base max-w-3xl mx-auto"
          >
            <p>
              Early-stage category work is the fastest professional development available. Everyone
              gets exposure to real customer conversations. Scope grows with demonstrated ability
              rather than tenure.
            </p>
            <p>
              The expertise you develop here, in{" "}
              <Link
                href="/generative-engine-optimization"
                className="text-indigo-600 hover:text-indigo-700 font-medium underline underline-offset-2 transition-colors"
              >
                Generative Engine Optimization
              </Link>
              , answer engines, and AI search measurement, is expertise almost nobody else in the
              market has yet.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ------------------------------ What we offer ------------------------------ */}
      <section className="py-20 md:py-24 bg-indigo-50/40 border-y border-black/5">
        <div className="container mx-auto px-6 max-w-4xl">
          <SectionHeading eyebrow="Benefits" title="What we offer" gradientWords={["offer"]} />
          <CheckList items={OFFER_ITEMS} columns={2} />
        </div>
      </section>

      {/* ------------------------------ How we hire ------------------------------- */}
      <section id="open-roles" className="scroll-mt-28 py-20 md:py-24 bg-background">
        <div className="container mx-auto px-6 max-w-6xl">
          <SectionHeading eyebrow="Hiring process" title="How we hire" gradientWords={["hire"]} />

          <div className="relative">
            {/* Connector line behind the steps (desktop only) */}
            <div className="hidden lg:block absolute top-5 left-[10%] right-[10%] h-px bg-linear-to-r from-indigo-500/10 via-indigo-500/30 to-indigo-500/10" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4">
              {PROCESS_STEPS.map((step, i) => (
                <motion.div key={step.step} {...fadeUp(i * 0.09)} className="relative text-center lg:px-2">
                  <div className="relative inline-flex items-center justify-center w-10 h-10 rounded-full bg-white border border-indigo-500/25 text-indigo-600 text-[13px] font-semibold mb-4 shadow-sm">
                    {step.step}
                  </div>
                  <h3 className="text-[15px] font-semibold text-foreground">{step.title}</h3>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.p {...fadeUp(0.3)} className="text-center text-[13px] text-muted-foreground mt-12">
            We hire for trajectory and judgment over pedigree.
          </motion.p>
        </div>
      </section>

      {/* --------------------- You will do well at Citationly if -------------------- */}
      <section className="py-20 md:py-24 bg-background">
        <div className="container mx-auto px-6 max-w-4xl">
          <SectionHeading
            eyebrow="Fit"
            title="You will do well at Citationly if"
            gradientWords={["well"]}
          />
          <CheckList items={FIT_ITEMS} columns={1} />
        </div>
      </section>

      {/* ------------------------------ Closing card -------------------------------- */}
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
                Come define this with us
              </h3>
              <p className="text-muted-foreground max-w-lg mx-auto">
                The companies measuring AI visibility in five years will use metrics being invented
                today. Be one of the people inventing them.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ------------------------------ CTA ------------------------------- */}
      <CtaBand
        primaryLabel="View Open Positions"
        primaryHref="#open-roles"
        secondaryLabel="Apply Now"
        secondaryHref="/about"
      />
    </>
  )
}
