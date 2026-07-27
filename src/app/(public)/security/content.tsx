"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  KeyRound,
  Server,
  Eye,
  ArrowRight,
  Mail,
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

const PRINCIPLES: {
  icon: LucideIcon
  title: string
  desc: string
}[] = [
  {
    icon: KeyRound,
    title: "Least access, always.",
    desc: "Employees and systems get the minimum access required to do their job, granted deliberately rather than by default, and nothing more.",
  },
  {
    icon: Server,
    title: "Boring, proven choices.",
    desc: "We build on established, widely used infrastructure and well-understood security patterns rather than novel, unproven approaches.",
  },
  {
    icon: Eye,
    title: "Honesty over theater.",
    desc: "This page claims only what is true. Where a control is planned rather than implemented, we say which.",
  },
]

interface DocSection {
  id: string
  title: string
  body: React.ReactNode
}

const DOC_SECTIONS: DocSection[] = [
  {
    id: "infrastructure",
    title: "Where and how the platform runs",
    body: (
      <>
        <p>
          Citationly runs on established cloud infrastructure with data centers that maintain
          industry-standard physical and environmental controls. Production systems are isolated
          from development and testing environments. The platform is architected for tenant
          isolation: each customer&apos;s monitoring data, competitive sets, and reports are
          logically separated.
        </p>
        <p>
          Application servers run on managed cloud hosting, and your organization&apos;s data lives
          in PostgreSQL on encrypted storage volumes, backed by automated, encrypted backups. The
          background workers that run scans and analysis operate separately from the web
          application tier, so heavy analysis work never has direct access to the systems serving
          your dashboard.
        </p>
      </>
    ),
  },
  {
    id: "encryption",
    title: "How data is protected in transit and at rest",
    body: (
      <p>
        All data moving between your browser and the platform is encrypted in transit using TLS
        1.2 or higher. Data stored within the platform is encrypted at rest using AES-256.
        Encryption keys are managed through the infrastructure provider&apos;s key management
        service, not handled manually by application code.
      </p>
    ),
  },
  {
    id: "authentication",
    title: "How access to your account is verified",
    body: (
      <p>
        Citationly accounts are protected by standard credential security, including enforced
        password requirements, and sign-in can also be handled through Google-backed identity via
        Firebase Authentication. Multi-factor authentication is available and recommended for all
        accounts. For <Link href="/pricing" className="text-indigo-600 font-medium hover:underline">Enterprise</Link> customers,
        single sign-on through your existing identity provider allows your organization&apos;s own
        authentication policies to govern access.
      </p>
    ),
  },
  {
    id: "access-control",
    title: "Who can see what, inside your organization and ours",
    body: (
      <p>
        Within your workspace, role-based access control lets administrators define what each
        team member can view and change. Within Citationly, employee access to customer data is
        restricted to roles that require it, granted on a least-privilege basis, and logged.
      </p>
    ),
  },
  {
    id: "ai-approach",
    title: "How we approach AI in the platform",
    body: (
      <p>
        Citationly&apos;s business is observing AI systems, and we apply the same scrutiny to our
        own use of them. Your data is not training material. Analytical AI is bounded, operating
        on collected answer data under our methodology. Engine querying is honest: the platform
        queries public AI engines the way a user would.
      </p>
    ),
  },
  {
    id: "retention",
    title: "Retention, deletion, and your control over data",
    body: (
      <p>
        Customer data belongs to the customer. Monitoring history is retained for the life of the
        account because historical baselines are central to the service&apos;s value, but account
        closure triggers deletion of customer data from production systems within 30 days, with
        backups clearing on their normal expiry cycle afterward. For details on what personal
        information we collect, see the{" "}
        <Link href="/privacy" className="text-indigo-600 font-medium hover:underline">
          Privacy Policy
        </Link>
        .
      </p>
    ),
  },
  {
    id: "attestations",
    title: "Where we stand on formal attestations",
    body: (
      <p>
        Our internal security controls are aligned to the SOC 2 Trust Services Criteria. A formal
        third-party audit is in progress. We will publish the report as soon as it is issued, and
        we do not claim certification before then. Security documentation, including questionnaire
        responses for procurement processes, is available to evaluating enterprises on request
        through the security contact below.
      </p>
    ),
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
        eyebrow="Security"
        title="Security, explained plainly."
        gradientWords={["plainly"]}
        description="This page describes how Citationly protects customer data: the architecture, the controls, and the practices. It is written for the security teams and procurement reviewers who will read it closely, so it favors facts over reassurance."
      >
        <MagneticButton
          onClick={() => router.push("/contact")}
          className="group h-12 px-7 rounded-full font-medium text-[15px] text-white bg-linear-to-r from-indigo-600 via-indigo-500 to-violet-500 shadow-[0_10px_30px_-8px_rgba(91,91,255,0.5)] hover:shadow-[0_14px_40px_-8px_rgba(91,91,255,0.65)] transition-shadow inline-flex items-center gap-2"
        >
          Contact Security Team
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
      {/* Section 1: How we think about security                      */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-14">
            <div className="flex justify-center">
              <SectionLabel dark={false}>Our approach</SectionLabel>
            </div>
            <RevealText
              as="h2"
              text="How we think about security"
              gradientWords={["security"]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-6"
            />
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            >
              Citationly&apos;s{" "}
              <Link href="/features/brand-monitoring" className="text-indigo-600 font-medium hover:underline">
                AI brand monitoring
              </Link>{" "}
              holds data that customers consider competitively sensitive: how AI engines describe
              their brands, where their visibility is weak, and what their optimization plans
              target. That data may not be regulated the way health records are, but a competitor
              gaining access to it would be a genuine business harm.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {PRINCIPLES.map((principle, i) => (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.1 + i * 0.1 }}
                className="rounded-2xl bg-white border border-black/5 shadow-[0_1px_3px_rgba(15,15,35,0.05)] p-7"
              >
                <div className="w-11 h-11 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center mb-5">
                  <principle.icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{principle.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{principle.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Sections 2 through 8: the document body                     */}
      {/* ---------------------------------------------------------- */}
      <section className="pb-20 md:pb-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="max-w-3xl mx-auto">
            {DOC_SECTIONS.map((section, i) => (
              <motion.div
                key={section.id}
                id={section.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.5, delay: i === 0 ? 0 : 0.05 }}
                className="scroll-mt-32 pb-10 mb-10 border-b border-black/5 last:border-b-0 last:pb-0 last:mb-0"
              >
                <h2 className="text-xl md:text-2xl font-semibold tracking-[-0.01em] text-foreground mb-4">
                  {section.title}
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed text-[15px] md:text-base">
                  {section.body}
                </div>
              </motion.div>
            ))}

            {/* ------------------------------------------------ */}
            {/* Closing: Ask us the hard questions                 */}
            {/* ------------------------------------------------ */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="relative overflow-hidden rounded-[2rem] border border-indigo-100 bg-indigo-50/50 px-8 py-12 md:px-12"
            >
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(50% 70% at 50% -10%, rgba(91,91,255,0.10), transparent), radial-gradient(35% 50% at 90% 100%, rgba(168,85,247,0.07), transparent)",
                }}
              />
              <div className="relative flex flex-col md:flex-row items-start gap-8">
                <div className="shrink-0 w-14 h-14 rounded-2xl bg-white border border-black/5 shadow-[0_1px_3px_rgba(15,15,35,0.05)] flex items-center justify-center text-indigo-600">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold tracking-[-0.02em] text-foreground mb-3">
                    Ask us the hard questions
                  </h3>
                  <p className="text-muted-foreground max-w-2xl leading-relaxed">
                    Security reviews are welcome here. Send your questionnaire, request our
                    documentation, or put your security team in a room with ours, at{" "}
                    <a
                      href="mailto:security@citationly.io"
                      className="text-indigo-600 font-medium underline underline-offset-2"
                    >
                      security@citationly.io
                    </a>
                    .
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Ready to put us to the test?"
        description="Our security team can walk your procurement or InfoSec group through any part of this document."
        primaryLabel="Contact Security Team"
        primaryHref="/contact"
        secondaryLabel="Book a Demo"
        secondaryHref="/contact"
      />
    </div>
  )
}
