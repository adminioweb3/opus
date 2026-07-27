"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import {
  ArrowRight,
  Bell,
  Building2,
  Check,
  Clock,
  FileText,
  HelpCircle,
  Radar,
  Scale,
  Swords,
  Target,
  TrendingDown,
  type LucideIcon,
} from "lucide-react"
import { PageHero } from "@/components/features/public/PageHero"
import { CtaBand } from "@/components/features/public/CtaBand"
import { SectionLabel } from "@/components/features/landing/primitives/SectionLabel"
import { RevealText } from "@/components/features/landing/primitives/RevealText"

/* ------------------------------------------------------------------ */
/* Shared motion presets                                               */
/* ------------------------------------------------------------------ */

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

/* ------------------------------------------------------------------ */
/* Fixed content data                                                  */
/* ------------------------------------------------------------------ */

const CHALLENGES: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: HelpCircle,
    title: "The client question has no billable answer",
    desc: "When a client asks what AI engines say about them, an honest “we don’t have visibility into that” weakens the relationship, and manual spot-checking is unbillable time producing anecdotes.",
  },
  {
    icon: Scale,
    title: "Per-client tooling kills the margin",
    desc: "Buying and managing separate monitoring for each account turns a promising service into an administrative loss.",
  },
  {
    icon: TrendingDown,
    title: "Retainer value is getting harder to demonstrate",
    desc: "As organic clicks concentrate and AI answers absorb queries, the traditional reporting that justified retainers shows softening numbers the agency did not cause and cannot contextualize.",
  },
  {
    icon: Target,
    title: "Pitches need an edge that survives procurement",
    desc: "New business decks full of familiar SEO promises blur together. Prospects respond to evidence about their own blind spots, and that requires data the prospect has never seen.",
  },
  {
    icon: Building2,
    title: "Methodology has to be defensible across accounts",
    desc: "Serving many clients means results will be compared. Improvised, inconsistent measurement eventually gets exposed in exactly the meeting where it hurts most.",
  },
  {
    icon: Clock,
    title: "Reporting hours eat the service",
    desc: "A monitoring offering that requires analysts to hand-build each client’s monthly deck loses its profitability to its own deliverable.",
  },
]

const HELPS: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: Building2,
    title: "A workspace for every client",
    desc: "Brand, competitive set, topics, and history stay cleanly separated for each account, all managed from one place.",
  },
  {
    icon: Radar,
    title: "Continuous multi-client monitoring",
    desc: "Monitoring runs across six engines for every client simultaneously, so the marginal cost of adding an account is configuration, not infrastructure.",
  },
  {
    icon: Swords,
    title: "Competitor analysis clients can see",
    desc: "AI competitor analysis shows each client which rivals win which questions, and why, turning QBRs from reporting meetings into strategy meetings.",
  },
  {
    icon: Bell,
    title: "Correction work you get credit for",
    desc: "Brand monitoring flags the answers that misrepresent each client, with sources attached, creating correction work the agency executes.",
  },
  {
    icon: FileText,
    title: "White-label reporting, and a pitch tool",
    desc: "White-label reporting assembles each client’s monthly results automatically, under your brand, at portfolio scale. The free analysis doubles as a pitch instrument for new business.",
  },
]

interface Benefit {
  title: string
  challenge: string
  solution: string
  outcome: string
}

const BENEFITS: Benefit[] = [
  {
    title: "A service clients request by name",
    challenge: "Demand without a deliverable.",
    solution: "Packaged monitoring, intelligence, and optimization services on one platform.",
    outcome: "A new retainer line with organic internal demand.",
  },
  {
    title: "Portfolio economics that work",
    challenge: "Per-client tool sprawl.",
    solution: "Workspace-based multi-client operation under one account.",
    outcome: "A service whose margin improves with every client added.",
  },
  {
    title: "QBRs with a new headline",
    challenge: "Softening traditional metrics.",
    solution: "Share of Voice and competitive movement as the fresh story.",
    outcome: "Retainer conversations about opportunity instead of decline.",
  },
  {
    title: "Pitches armed with the prospect’s own data",
    challenge: "Undifferentiated new business decks.",
    solution: "Walking in with the prospect’s citation gaps and competitor exposure.",
    outcome: "First meetings that start from evidence no rival pitch has.",
  },
  {
    title: "One methodology, every account",
    challenge: "Inconsistent measurement across clients.",
    solution: "A single documented methodology applied portfolio-wide.",
    outcome: "Agency reporting that survives comparison and scrutiny.",
  },
  {
    title: "Deliverables that assemble themselves",
    challenge: "Reporting hours consuming the margin.",
    solution: "Scheduled white-label client reporting.",
    outcome: "Analyst time spent on interpretation and strategy, the parts clients actually pay for.",
  },
]

const WORKFLOW: { step: string; title: string; desc: string }[] = [
  {
    step: "01",
    title: "Pitch",
    desc: "A free analysis of the prospect’s brand becomes the new business meeting’s centerpiece: their position, their gaps, their competitors’ wins.",
  },
  {
    step: "02",
    title: "Onboard",
    desc: "Won accounts get a workspace: brand facts, competitive set, and topic map configured in a repeatable intake.",
  },
  {
    step: "03",
    title: "Operate",
    desc: "Monitoring runs across the roster. Alerts route issues and competitor moves to the right account team.",
  },
  {
    step: "04",
    title: "Execute",
    desc: "Citation gaps and accuracy flags become the month’s content and correction work per client.",
  },
  {
    step: "05",
    title: "Report",
    desc: "White-label monthlies generate on schedule, and analysts add interpretation, not assembly.",
  },
  {
    step: "06",
    title: "Renew",
    desc: "Share trend, competitive movement, and documented corrections make the renewal case in the client’s own numbers.",
  },
]

const WHY_BULLETS: string[] = [
  "Workspace separation, portfolio views, and white-label output built in as structure, not workarounds.",
  "Per-client methodology consistency, so results hold up under comparison across the whole roster.",
  "Agency success built into the business model, since your service directly grows the platform’s footprint.",
  "A roadmap shaped by agency customers, because it reflects the operational needs agencies actually have.",
]

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export function Content() {
  return (
    <div className="bg-background">
      <PageHero
        eyebrow="Solutions for Digital Agencies"
        title="Your clients are already asking. Answer with a service."
        gradientWords={["service"]}
        description="“What is AI saying about us?” has entered every client QBR. Citationly gives agencies the multi-client monitoring, competitor intelligence, and white-label reporting to turn that question into a retained, profitable service line."
      >
        <Link
          href="/contact"
          className="group h-12 px-7 rounded-full font-medium text-[15px] bg-[#050508] text-white hover:bg-[#1a1a24] transition-colors inline-flex items-center gap-2"
        >
          Book a Demo
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
        <Link
          href="/register"
          className="h-12 px-7 rounded-full font-medium text-[15px] text-foreground border border-black/10 bg-white hover:bg-black/5 transition-colors inline-flex items-center gap-2"
        >
          Start Free Analysis
        </Link>
      </PageHero>

      {/* ---------------------------------------------------------- */}
      {/* Section 1 — Industry overview                                */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8 mb-10 max-w-4xl">
            <div className="shrink-0 w-14 h-14 rounded-2xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <SectionLabel dark={false}>Industry Overview</SectionLabel>
              <RevealText
                as="h2"
                text="The rare moment when demand arrives before the service exists"
                gradientWords={["service"]}
                className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] leading-[1.15] text-foreground"
              />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-5 text-muted-foreground leading-relaxed text-[15px] md:text-base max-w-3xl"
          >
            <p>
              Agencies usually have to create demand for new services. AI search is the opposite case: clients are
              raising it unprompted, because their executives are using assistants daily and wondering aloud what
              those assistants say about the company. The question is walking into your QBRs whether or not you
              have an answer prepared.
            </p>
            <p>
              This is the kind of window that defined early SEO and early paid social agencies. The discipline is
              young, the tooling was until recently impractical, and most agencies are still answering the client
              question with opinions rather than data. The agencies moving first are packaging measurement-backed AI
              search services while &ldquo;we monitor how AI engines represent your brand against competitors&rdquo;
              still differentiates a pitch.
            </p>
            <p>
              Traditional SEO retainers do not cover this ground. Rank reports say nothing about whether ChatGPT
              recommends the client, misdescribes their pricing, or cites their competitor&rsquo;s comparison page.
              An AI visibility platform built for multi-client operation is what turns the capability gap into a
              deliverable, and the economics only work if one platform serves the whole roster.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 2 — Business challenges                             */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24 bg-indigo-50/40 border-y border-black/5">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-14">
            <div className="flex justify-center">
              <SectionLabel dark={false}>Business Challenges</SectionLabel>
            </div>
            <RevealText
              as="h2"
              text="The gap between the question and the retainer"
              gradientWords={["retainer"]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-4"
            />
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            >
              Six problems that show up the moment a client asks what AI engines are saying about them.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CHALLENGES.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.55, delay: (i % 3) * 0.08 + Math.floor(i / 3) * 0.05, ease: EASE }}
                className="rounded-2xl bg-white border border-black/5 shadow-[0_1px_3px_rgba(15,15,35,0.05)] p-7"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 border border-indigo-100">
                  <item.icon className="w-[18px] h-[18px]" />
                </div>
                <h3 className="text-base font-semibold text-foreground tracking-[-0.01em] mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 3 — How Citationly helps (dark accent card)          */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, ease: EASE }}
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
              <div className="text-center mb-12">
                <div className="flex justify-center">
                  <SectionLabel>How Citationly Helps</SectionLabel>
                </div>
                <RevealText
                  as="h2"
                  text="One platform, the whole roster"
                  gradientWords={["roster"]}
                  className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-white mb-4"
                />
                <motion.p
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-white/55 max-w-2xl mx-auto leading-relaxed"
                >
                  Citationly is structured for agency operation from the account level down, so every deliverable
                  comes from the same foundation instead of a separate tool.
                </motion.p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                {HELPS.map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: 0.1 + i * 0.1 }}
                    className="flex gap-5"
                  >
                    <div className="shrink-0 w-11 h-11 rounded-xl bg-indigo-500/15 border border-white/10 text-indigo-300 flex items-center justify-center">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-[15px] mb-1.5">{item.title}</h3>
                      <p className="text-white/55 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 4 — Key benefits                                     */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-14">
            <div className="flex justify-center">
              <SectionLabel dark={false}>Key Benefits</SectionLabel>
            </div>
            <RevealText
              as="h2"
              text="Six shifts once the platform is running"
              gradientWords={["shifts"]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-4"
            />
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            >
              Each challenge above maps to a specific change in how the service is delivered, and what it produces.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BENEFITS.map((benefit, i) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.55, delay: (i % 3) * 0.08 + Math.floor(i / 3) * 0.05, ease: EASE }}
                className="rounded-2xl bg-white border border-black/5 shadow-[0_1px_3px_rgba(15,15,35,0.05)] p-6"
              >
                <h3 className="font-semibold text-foreground mb-4 leading-snug">{benefit.title}</h3>
                <div className="space-y-3">
                  <div>
                    <span className="block text-[10px] font-semibold tracking-[0.14em] uppercase text-amber-600/80 mb-1">
                      Challenge
                    </span>
                    <p className="text-[13.5px] text-muted-foreground leading-relaxed">{benefit.challenge}</p>
                  </div>
                  <div>
                    <span className="block text-[10px] font-semibold tracking-[0.14em] uppercase text-indigo-600/80 mb-1">
                      Solution
                    </span>
                    <p className="text-[13.5px] text-muted-foreground leading-relaxed">{benefit.solution}</p>
                  </div>
                  <div>
                    <span className="block text-[10px] font-semibold tracking-[0.14em] uppercase text-emerald-600/80 mb-1">
                      Outcome
                    </span>
                    <p className="text-[13.5px] text-muted-foreground leading-relaxed">{benefit.outcome}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 5 — Relevant platform capabilities                   */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24 bg-indigo-50/40 border-y border-black/5">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-12">
            <div className="flex justify-center">
              <SectionLabel dark={false}>Platform Capabilities</SectionLabel>
            </div>
            <RevealText
              as="h2"
              text="The modules built for agency operation"
              gradientWords={["agency"]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-4"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-4 text-[15px] text-muted-foreground leading-relaxed"
          >
            <p>
              <Link
                href="/features/competitor-intelligence"
                className="text-indigo-600 font-medium hover:underline underline-offset-2"
              >
                Competitor Intelligence
              </Link>{" "}
              is the core deliverable: win/loss maps and movement alerts per client.
            </p>
            <p>Multi-brand workspaces keep roster-scale operation running with clean separation between accounts.</p>
            <p>
              <Link href="/features/reports" className="text-indigo-600 font-medium hover:underline underline-offset-2">
                Reports
              </Link>{" "}
              handle white-label, scheduled client reporting.
            </p>
            <p>
              <Link
                href="/features/share-of-voice"
                className="text-indigo-600 font-medium hover:underline underline-offset-2"
              >
                Share of Voice
              </Link>{" "}
              is the headline metric every QBR opens with.
            </p>
            <p>
              <Link
                href="/features/brand-monitoring"
                className="text-indigo-600 font-medium hover:underline underline-offset-2"
              >
                Brand Monitoring
              </Link>{" "}
              generates the accuracy flags that turn into correction work.
            </p>
            <p>
              <Link
                href="/features/citation-tracking"
                className="text-indigo-600 font-medium hover:underline underline-offset-2"
              >
                AI Citation Tracking
              </Link>{" "}
              is what the content teams executing on each account use day to day.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 6 — Typical workflow                                 */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <div className="flex justify-center">
              <SectionLabel dark={false}>Typical Workflow</SectionLabel>
            </div>
            <RevealText
              as="h2"
              text="From pitch to renewal, in six steps"
              gradientWords={["renewal"]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-4"
            />
          </div>

          <div className="max-w-2xl mx-auto">
            {WORKFLOW.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.55, delay: 0.05 + i * 0.08 }}
                className="relative pl-12 pb-12 last:pb-0"
              >
                {i < WORKFLOW.length - 1 && (
                  <span className="absolute left-2.75 top-8 bottom-0 w-px bg-linear-to-b from-indigo-200 to-black/5" />
                )}
                <span className="absolute left-0 top-1 w-5.75 h-5.75 rounded-full bg-white border border-indigo-200 shadow-[0_1px_3px_rgba(91,91,255,0.15)] flex items-center justify-center">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      i === WORKFLOW.length - 1 ? "bg-indigo-500 animate-pulse" : "bg-indigo-400"
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
      {/* Section 7 — Business outcomes                                */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24 bg-indigo-50/40 border-y border-black/5">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <div className="flex justify-center">
            <SectionLabel dark={false}>Business Outcomes</SectionLabel>
          </div>
          <RevealText
            as="h2"
            text="What agencies see after a few quarters"
            gradientWords={["quarters"]}
            className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-6"
          />
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-5 text-muted-foreground leading-relaxed text-[15px] md:text-base max-w-2xl mx-auto text-left"
          >
            <p>
              Agencies running this model report the same arc: the AI search line starts as an add-on for two or
              three curious clients, becomes a standard component of new proposals, and within a few quarters is
              cited by clients as a reason they stay.
            </p>
            <p>
              Client reporting gains a section clients actually read first. Pitch win rates benefit from evidence
              rivals cannot produce. And the agency builds category expertise, which categories reward citations,
              how corrections propagate, that compounds into a genuine practice rather than a reseller arrangement.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 8 — Why Citationly                                   */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.65, ease: EASE }}
            className="relative overflow-hidden rounded-[2rem] border border-indigo-100 bg-indigo-50/50 px-8 py-14 md:px-16"
          >
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(50% 70% at 50% -10%, rgba(91,91,255,0.10), transparent), radial-gradient(35% 50% at 90% 100%, rgba(168,85,247,0.07), transparent)",
              }}
            />
            <div className="relative text-center">
              <div className="flex justify-center">
                <SectionLabel dark={false}>Why Citationly</SectionLabel>
              </div>
              <RevealText
                as="h2"
                text="Built around the agency model, not bolted onto it"
                gradientWords={["agency"]}
                className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-4"
              />
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-9"
              >
                Most platforms treat agencies as an afterthought pricing tier. Citationly treats the agency model as
                an operating requirement.
              </motion.p>

              <ul className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto text-left">
                {WHY_BULLETS.map((b, i) => (
                  <motion.li
                    key={b}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                    className="flex items-start gap-3"
                  >
                    <span className="w-5 h-5 rounded-full bg-indigo-500/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-indigo-600" />
                    </span>
                    <span className="text-sm text-foreground/80 leading-relaxed">{b}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      <CtaBand
        title="Bring your next pitch evidence no one else has"
        description="Run a free analysis on a client or prospect and see what six AI engines say about them, and which competitors are winning their category's answers."
        primaryLabel="Book a Demo"
        primaryHref="/contact"
        secondaryLabel="Start Free Analysis"
        secondaryHref="/register"
      />

      <div className="pb-20 md:pb-24 -mt-12 text-center">
        <Link
          href="/contact"
          className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors underline underline-offset-2"
        >
          Talk to an Expert
        </Link>
      </div>
    </div>
  )
}
