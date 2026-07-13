"use client"

import { motion } from "framer-motion"
import {
  Lock,
  KeyRound,
  Layers,
  Users,
  Server,
  Database,
  ShieldCheck,
  GitBranch,
  ScanSearch,
  RotateCcw,
  ClipboardList,
  Filter,
  AlertTriangle,
  FileCheck2,
  Scale,
  Clock,
  Building2,
  Mail,
  type LucideIcon,
} from "lucide-react"
import { PageHero } from "@/components/features/public/PageHero"
import { CtaBand } from "@/components/features/public/CtaBand"
import { SectionLabel } from "@/components/features/landing/primitives/SectionLabel"
import { RevealText } from "@/components/features/landing/primitives/RevealText"

/* ------------------------------------------------------------------ */
/* Fixed content data                                                  */
/* ------------------------------------------------------------------ */

const PILLARS: {
  icon: LucideIcon
  title: string
  desc: string
}[] = [
  {
    icon: Lock,
    title: "Encryption",
    desc: "All traffic between your browser and Citationly runs over TLS 1.2 or higher. Data at rest — your account, your scans, your reports — is encrypted with AES-256.",
  },
  {
    icon: KeyRound,
    title: "Authentication",
    desc: "Sign-in is handled by Google-backed identity through Firebase Authentication. Every API request carries a token, and every token is verified on the server before any data moves.",
  },
  {
    icon: Layers,
    title: "Tenant isolation",
    desc: "Every scan, score, report, and knowledge base entry is scoped to your organization at the data layer. One tenant’s records are never queryable from another’s session.",
  },
  {
    icon: Users,
    title: "Least-privilege access",
    desc: "Team members get role-based permissions — viewer, editor, admin — so people only see and change what their role in your organization requires.",
  },
]

const INFRA_STEPS: {
  icon: LucideIcon
  title: string
  desc: string
}[] = [
  {
    icon: Server,
    title: "Managed cloud hosting",
    desc: "Application servers run on managed cloud infrastructure with encrypted disks, network-level isolation, and provider-managed patching.",
  },
  {
    icon: Database,
    title: "PostgreSQL, encrypted at rest",
    desc: "Your organization’s data lives in PostgreSQL with encrypted storage volumes and automated, encrypted backups.",
  },
  {
    icon: ScanSearch,
    title: "Isolated background workers",
    desc: "Visibility Radar scans and deep Opportunity Finder crawls run on separate worker processes, sandboxed away from the web application tier.",
  },
  {
    icon: ShieldCheck,
    title: "Your data is not training data",
    desc: "AI model calls are used only to generate your analyses — citations, scores, and content drafts. Your private data is never used to train third-party AI models.",
  },
]

const PRACTICES: {
  icon: LucideIcon
  title: string
  desc: string
}[] = [
  {
    icon: GitBranch,
    title: "Code review on every change",
    desc: "Every change to the platform is reviewed by a second engineer before it ships to production.",
  },
  {
    icon: ScanSearch,
    title: "Dependency scanning",
    desc: "Automated scanning flags known vulnerabilities in third-party libraries so patches ship before they’re exploited.",
  },
  {
    icon: RotateCcw,
    title: "Backups and recovery",
    desc: "Encrypted, automated backups run on a regular schedule with tested recovery procedures behind them.",
  },
  {
    icon: ClipboardList,
    title: "Audit logging",
    desc: "Authentication events and sensitive account actions are logged, giving us — and, on request, you — a record to investigate.",
  },
  {
    icon: Filter,
    title: "Data minimization",
    desc: "We collect what the product needs to generate your visibility scores and nothing beyond it.",
  },
  {
    icon: AlertTriangle,
    title: "Incident response",
    desc: "A documented process for triaging, containing, and disclosing security incidents to affected customers without delay.",
  },
]

const COMPLIANCE: {
  icon: LucideIcon
  title: string
  desc: string
}[] = [
  {
    icon: FileCheck2,
    title: "SOC 2-aligned controls",
    desc: "Our internal controls are aligned to SOC 2 Trust Services Criteria. A formal third-party audit is in progress — we’ll publish the report the moment it’s issued, and we won’t claim certification before then.",
  },
  {
    icon: Scale,
    title: "GDPR-aligned data rights",
    desc: "We honor GDPR-aligned rights for every customer, regardless of region: request an export of your data, or request deletion, and we’ll act on it.",
  },
  {
    icon: Clock,
    title: "Data retention",
    desc: "Active account data is retained for as long as your subscription is active. On account closure, data is deleted from production systems within 30 days, and from backups on their normal expiry cycle.",
  },
  {
    icon: Building2,
    title: "Subprocessors",
    desc: "We use a small set of subprocessors to run the service: our managed cloud hosting provider for infrastructure, and OpenAI for generating your analyses. No subprocessor receives more data than its function requires.",
  },
]

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export function Content() {
  return (
    <div className="bg-background">
      <PageHero
        eyebrow="Security"
        title="Your data, protected by default."
        gradientWords={["protected"]}
        description="Citationly reads your brand's public footprint and the AI answers about it — never anything you haven't shared with us. Here is exactly how we encrypt it, isolate it, and limit who can touch it."
      />

      {/* ---------------------------------------------------------- */}
      {/* Section 1 — Four pillars                                     */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-14">
            <div className="flex justify-center">
              <SectionLabel dark={false}>The fundamentals</SectionLabel>
            </div>
            <RevealText
              as="h2"
              text="Four controls that hold no matter what."
              gradientWords={["hold"]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-4"
            />
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground max-w-xl mx-auto"
            >
              These aren&apos;t aspirations for a future release. They&apos;re how the platform is built
              today.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PILLARS.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.1 + i * 0.1 }}
                className="rounded-2xl bg-white border border-black/5 shadow-[0_1px_3px_rgba(15,15,35,0.05)] p-7"
              >
                <div className="w-11 h-11 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center mb-5">
                  <pillar.icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{pillar.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 2 — Infrastructure                                   */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24 bg-indigo-50/40 border-y border-black/5">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            <div>
              <SectionLabel dark={false}>Infrastructure</SectionLabel>
              <RevealText
                as="h2"
                text="Built on infrastructure that isolates by design."
                gradientWords={["isolates"]}
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
                  Citationly runs on managed cloud hosting rather than hand-rolled servers, so the
                  underlying network, patching, and physical security are handled by infrastructure
                  built for exactly this. Your organization&apos;s data lives in PostgreSQL with
                  encrypted storage — the same database, the same encryption, whether you&apos;re on
                  Starter or Enterprise.
                </p>
                <p>
                  The scans that power Visibility Radar and the deep crawls behind Opportunity Finder run
                  on background workers that are isolated from the web application tier, so a heavy scan
                  never competes with — or has direct access to — the systems serving your dashboard.
                </p>
                <p>
                  When Citationly calls an AI model to generate a citation analysis, a visibility score,
                  or a content draft, that call exists to produce your result. Your private data is never
                  used to train a third-party AI model.
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="rounded-2xl bg-white border border-black/5 shadow-[0_1px_3px_rgba(15,15,35,0.05)] p-6 md:p-7"
            >
              <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-muted-foreground/70 mb-5 px-1">
                Request path
              </div>
              <div className="space-y-0">
                {INFRA_STEPS.map((step, i) => (
                  <div key={step.title} className="relative pl-11 pb-7 last:pb-0">
                    {i < INFRA_STEPS.length - 1 && (
                      <span className="absolute left-4.5 top-9 bottom-0 w-px bg-linear-to-b from-indigo-200 to-black/5" />
                    )}
                    <span className="absolute left-0 top-0 w-9 h-9 rounded-lg bg-indigo-500/10 text-indigo-600 flex items-center justify-center">
                      <step.icon className="w-4 h-4" />
                    </span>
                    <h4 className="font-semibold text-foreground text-[15px] mb-1">{step.title}</h4>
                    <p className="text-[13px] text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 3 — Practices (dark accent)                          */}
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
                  <SectionLabel>Day-to-day practices</SectionLabel>
                </div>
                <RevealText
                  as="h2"
                  text="Security is a routine, not a launch event."
                  className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-white"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
                {PRACTICES.map((practice, i) => (
                  <motion.div
                    key={practice.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: 0.08 + i * 0.08 }}
                    className="flex gap-4"
                  >
                    <div className="shrink-0 w-11 h-11 rounded-xl bg-indigo-500/15 border border-white/10 text-indigo-300 flex items-center justify-center">
                      <practice.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-[15px] mb-1.5">{practice.title}</h3>
                      <p className="text-white/55 text-sm leading-relaxed">{practice.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 4 — Compliance & data rights                         */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-14">
            <div className="flex justify-center">
              <SectionLabel dark={false}>Compliance & data rights</SectionLabel>
            </div>
            <RevealText
              as="h2"
              text="Where we stand, stated plainly."
              gradientWords={["plainly"]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-4"
            />
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground max-w-xl mx-auto"
            >
              No inflated badges. Here is exactly where our compliance posture is today, and what
              you&apos;re entitled to ask of us.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {COMPLIANCE.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.1 + i * 0.1 }}
                className="rounded-2xl bg-white border border-black/5 shadow-[0_1px_3px_rgba(15,15,35,0.05)] p-7"
              >
                <div className="w-11 h-11 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center mb-5">
                  <item.icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 5 — Responsible disclosure                           */}
      {/* ---------------------------------------------------------- */}
      <section className="pt-4 pb-20 md:pb-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-[2rem] border border-indigo-100 bg-indigo-50/50 px-8 py-14 md:px-16"
          >
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(50% 70% at 50% -10%, rgba(91,91,255,0.10), transparent), radial-gradient(35% 50% at 90% 100%, rgba(168,85,247,0.07), transparent)",
              }}
            />
            <div className="relative flex flex-col md:flex-row items-center gap-10 md:gap-14">
              <div className="shrink-0 w-16 h-16 rounded-2xl bg-white border border-black/5 shadow-[0_1px_3px_rgba(15,15,35,0.05)] flex items-center justify-center text-indigo-600">
                <Mail className="w-7 h-7" />
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-semibold tracking-[-0.02em] text-foreground mb-3">
                  Found a vulnerability? Tell us first.
                </h3>
                <p className="text-muted-foreground max-w-2xl mb-4 leading-relaxed">
                  Email{" "}
                  <a href="mailto:security@citationly.io" className="text-indigo-600 font-medium underline underline-offset-2">
                    security@citationly.io
                  </a>{" "}
                  with what you found and how to reproduce it. Researchers who report in good faith and
                  give us a fair chance to fix an issue before disclosing it publicly won&apos;t face
                  legal action from us for that research.
                </p>
                <p className="text-sm text-muted-foreground/80 max-w-2xl">
                  We aim to acknowledge every report within 2 business days and work toward coordinated
                  disclosure within 90 days of confirmation.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <CtaBand
        title="Questions about how we handle your data?"
        description="Our team can walk your security or procurement group through the details directly."
        secondaryLabel="Ask a security question"
        secondaryHref="/contact"
      />
    </div>
  )
}
