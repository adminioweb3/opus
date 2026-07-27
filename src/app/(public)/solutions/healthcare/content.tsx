"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowRight,
  Award,
  Gauge,
  HeartPulse,
  MapPin,
  ShieldCheck,
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

const CHALLENGES: {
  icon: LucideIcon
  title: string
  desc: string
}[] = [
  {
    icon: HeartPulse,
    title: "Accuracy risk",
    desc: "An engine may describe services, locations, or capabilities your organization no longer offers, or never offered, and that description circulates unchallenged. Healthcare brand monitoring is difficult to do by hand across many engines and many questions.",
  },
  {
    icon: Award,
    title: "Authority competition",
    desc: "Large directories, aggregators, and national health sites often earn the citations for questions where a local or specialized provider is the better answer. Medical content visibility suffers when third parties dominate the sources engines trust.",
  },
  {
    icon: MapPin,
    title: "Fragmented presence",
    desc: "Multi-location systems and multi-specialty groups struggle to see how they appear across every service line and market at once.",
  },
  {
    icon: Gauge,
    title: "No baseline for improvement",
    desc: "Without measurement, teams cannot tell whether content investments improved how engines describe them, which makes the work hard to justify internally.",
  },
]

const BENEFITS: string[] = [
  "Protect your reputation by catching inaccurate descriptions early.",
  "Strengthen healthcare authority by earning citations for the questions where you are genuinely the best source.",
  "Gain a unified view across locations and service lines instead of checking engines manually.",
  "Demonstrate progress to leadership with a baseline and a trend, rather than anecdotes.",
]

const WORKFLOW: {
  title: string
  desc: string
}[] = [
  {
    title: "Map the questions",
    desc: "Identify what patients, caregivers, and referrers ask AI engines about your conditions, treatments, and locations.",
  },
  {
    title: "Establish the baseline",
    desc: "Run a scan to see how engines describe your organization today and which sources they cite.",
  },
  {
    title: "Flag inaccuracies",
    desc: "Review brand monitoring alerts and prioritize corrections where the stakes are highest.",
  },
  {
    title: "Close authority gaps",
    desc: "Strengthen owned content for the questions where third parties currently win citations.",
  },
  {
    title: "Track the trend",
    desc: "Measure accuracy and citation improvements over time and report them to leadership.",
  },
]

const FAQS: { q: string; a: string }[] = [
  {
    q: "What is healthcare AI visibility?",
    a: "Healthcare AI visibility is how accurately and how often AI engines mention and describe a healthcare organization when patients, caregivers, or referrers ask related questions. It covers both the presence of your organization in answers and the accuracy of what is said.",
  },
  {
    q: "Why does healthcare brand monitoring in AI answers matter?",
    a: "Because inaccurate descriptions of services, locations, or capabilities can erode patient trust and are difficult to catch manually. Monitoring across engines lets teams find and prioritize corrections before they affect patients.",
  },
  {
    q: "Does Citationly provide medical advice or clinical content?",
    a: "No. Citationly measures how AI engines describe your organization and helps you improve that presence. It does not generate clinical or medical advice content.",
  },
  {
    q: "Can multi-location health systems use Citationly?",
    a: "Yes. The visibility dashboard is designed to show presence across locations, service lines, and markets in one view, which suits multi-location systems and multi-specialty groups.",
  },
  {
    q: "How is this different from traditional healthcare SEO?",
    a: "Traditional healthcare SEO targets rankings on search results pages. Healthcare AI visibility targets how engines describe and cite your organization inside AI-generated answers, which requires measuring mentions and accuracy rather than positions.",
  },
  {
    q: "How do we get started?",
    a: "Run a free analysis to see how AI engines currently describe your organization, then use the results to prioritize accuracy fixes and authority gaps. A demo can walk your team through a healthcare-specific setup.",
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
        eyebrow="Healthcare"
        title="Healthcare AI visibility: make sure AI answers about your organization are accurate"
        gradientWords={["accurate"]}
        description="Patients, caregivers, and referrers now ask AI engines about conditions, treatments, and providers. Citationly shows how those engines describe your healthcare organization and helps you improve the accuracy and authority of what they say."
        wide
      >
        <MagneticButton
          onClick={() => router.push("/register")}
          className="group h-12 px-7 rounded-full font-medium text-[15px] text-white bg-linear-to-r from-indigo-600 via-indigo-500 to-violet-500 shadow-[0_10px_30px_-8px_rgba(91,91,255,0.5)] hover:shadow-[0_14px_40px_-8px_rgba(91,91,255,0.65)] transition-shadow inline-flex items-center gap-2"
        >
          Start Free Analysis
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
      {/* Trust line                                                   */}
      {/* ---------------------------------------------------------- */}
      <div className="container mx-auto px-6 max-w-4xl pb-16 md:pb-20 -mt-4">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center justify-center gap-2 text-center text-sm text-muted-foreground"
        >
          <ShieldCheck className="w-4 h-4 text-indigo-500/70 shrink-0" />
          Built for regulated industries where accuracy and credibility are not optional.
        </motion.p>
      </div>

      {/* ---------------------------------------------------------- */}
      {/* Section 1 — Industry overview                                */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="max-w-3xl">
            <SectionLabel dark={false}>Industry Overview</SectionLabel>
            <RevealText
              as="h2"
              text="AI search is now part of the patient journey"
              gradientWords={["journey"]}
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
                Healthcare decisions begin with questions, and a growing share of those questions go to AI
                engines first. Someone researching a symptom, comparing treatment options, or choosing where
                to seek care increasingly asks ChatGPT, Gemini, or Perplexity before visiting any website. The
                answer they receive shapes their impression of your organization before they reach your front
                door.
              </p>
              <p>
                Healthcare AI search raises the stakes on accuracy in a way few other industries face. When an
                engine describes a service line, a location, or a clinical capability incorrectly, the
                consequence is not only a lost opportunity but a potential erosion of trust in an area where
                trust is the foundation of the relationship. Healthcare organizations need to know what these
                engines say and have a way to improve it.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 2 — Challenges (card grid)                           */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24 bg-indigo-50/40 border-y border-black/5">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-14">
            <div className="flex justify-center">
              <SectionLabel dark={false}>Challenges</SectionLabel>
            </div>
            <RevealText
              as="h2"
              text="Where healthcare AI answers go wrong"
              gradientWords={["wrong"]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-4"
            />
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-muted-foreground max-w-xl mx-auto"
            >
              The same four problems come up again and again for hospitals, clinics, and multi-specialty
              groups.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CHALLENGES.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.55, delay: 0.1 + i * 0.1 }}
                className="rounded-2xl bg-white border border-black/5 shadow-[0_1px_3px_rgba(15,15,35,0.05)] p-7"
              >
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center shrink-0">
                    <c.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-foreground text-lg">{c.title}</h3>
                </div>
                <p className="text-[15px] text-muted-foreground leading-relaxed">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 3 — How Citationly helps                              */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="max-w-3xl">
            <SectionLabel dark={false}>How Citationly Helps</SectionLabel>
            <RevealText
              as="h2"
              text="How Citationly supports healthcare organizations"
              gradientWords={["organizations"]}
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
                Citationly gives healthcare teams a clear view of how AI engines represent their organization
                and a structured way to improve it. The platform continuously runs the questions patients and
                referrers actually ask through the major engines, records how your organization is described,
                and flags where those descriptions are inaccurate or absent.
              </p>
              <p>
                From that foundation, teams can prioritize. Where an engine describes a service incorrectly,
                the issue surfaces as an alert rather than as a complaint from a confused patient. Where a
                third-party source wins a citation your own content should earn, the gap becomes visible and
                actionable. The emphasis throughout is on accuracy and authority, the two things that matter
                most when the subject is health.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 4 — Industry benefits (bulleted)                     */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24 bg-indigo-50/40 border-y border-black/5">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-16 items-start">
            <div>
              <SectionLabel dark={false}>Industry Benefits</SectionLabel>
              <RevealText
                as="h2"
                text="What healthcare teams gain"
                gradientWords={["gain"]}
                className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-4"
              />
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-muted-foreground leading-relaxed"
              >
                Working with a measurement-first approach to healthcare AI visibility produces several
                practical benefits.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.55, delay: 0.15 }}
              className="rounded-2xl bg-white border border-black/5 shadow-[0_1px_3px_rgba(15,15,35,0.05)] p-7"
            >
              <ul className="space-y-4">
                {BENEFITS.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-indigo-500/10 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    </span>
                    <span className="text-[15px] text-foreground/80 leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 5 — Relevant platform capabilities                   */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="max-w-3xl">
            <SectionLabel dark={false}>Platform Capabilities</SectionLabel>
            <RevealText
              as="h2"
              text="Platform capabilities built for healthcare"
              gradientWords={["healthcare"]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-6"
            />
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-muted-foreground leading-relaxed text-[15px] md:text-base"
            >
              Not every platform feature is central to healthcare. The ones that are:{" "}
              <Link
                href="/features/brand-monitoring"
                className="text-indigo-600 hover:text-indigo-700 underline underline-offset-2"
              >
                Brand Monitoring
              </Link>{" "}
              watches how engines describe your organization, services, and locations, and flags inaccuracies
              for review.{" "}
              <Link
                href="/features/citation-tracking"
                className="text-indigo-600 hover:text-indigo-700 underline underline-offset-2"
              >
                AI Citation Tracking
              </Link>{" "}
              shows which sources engines cite for your category&apos;s questions, revealing where your content
              should be winning references it currently is not.{" "}
              <Link
                href="/features/ai-visibility-dashboard"
                className="text-indigo-600 hover:text-indigo-700 underline underline-offset-2"
              >
                AI Visibility Dashboard
              </Link>{" "}
              gives a single view of presence across engines, service lines, and markets, which matters for
              multi-location systems. Competitor and Share of Voice views are available, but the healthcare
              emphasis is accuracy and authority first.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 6 — Typical workflow                                 */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24 bg-indigo-50/40 border-y border-black/5">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-14">
            <div className="flex justify-center">
              <SectionLabel dark={false}>Typical Workflow</SectionLabel>
            </div>
            <RevealText
              as="h2"
              text="A typical healthcare AI visibility workflow"
              gradientWords={["workflow"]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-4"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {WORKFLOW.map((step, i) => (
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
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 7 — Business outcomes                                */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="max-w-3xl">
            <SectionLabel dark={false}>Business Outcomes</SectionLabel>
            <RevealText
              as="h2"
              text="The business outcomes that follow"
              gradientWords={["outcomes"]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-6"
            />
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-muted-foreground leading-relaxed text-[15px] md:text-base"
            >
              Healthcare organizations that measure and improve their healthcare AI visibility tend to see the
              same qualitative gains: descriptions in AI answers become more accurate and current, owned
              content earns a larger share of the citations for high-intent questions, and marketing teams can
              finally connect their content work to how the organization appears at the start of the patient
              journey. The result is greater healthcare authority in the channel where more of that journey now
              begins.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 8 — FAQ                                              */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24 border-t border-black/5">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-16">
            <div>
              <SectionLabel dark={false}>Healthcare FAQ</SectionLabel>
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
                What healthcare marketing and clinical operations teams usually ask before starting.
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
        title="See how AI engines describe your organization"
        description="Run a free analysis and get a clear picture of how AI engines currently talk about your healthcare organization, where those descriptions are inaccurate, and where your authority can grow."
        primaryLabel="Start Free Analysis"
      />

      <div className="pb-20 md:pb-24 -mt-8 text-center">
        <Link
          href="/contact"
          className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
        >
          Talk to an Expert
        </Link>
        <p className="mt-4 text-[13px] text-muted-foreground">
          Explore other industries:{" "}
          <Link href="/solutions/finance" className="text-indigo-600 hover:text-indigo-700 underline underline-offset-2">
            Finance
          </Link>{" "}
          &middot;{" "}
          <Link href="/solutions/retail" className="text-indigo-600 hover:text-indigo-700 underline underline-offset-2">
            Retail
          </Link>
        </p>
      </div>
    </div>
  )
}
