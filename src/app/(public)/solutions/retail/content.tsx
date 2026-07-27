"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowRight,
  Gauge,
  ShieldCheck,
  ShoppingBag,
  TriangleAlert,
  Users,
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
    icon: ShoppingBag,
    title: "Missing from recommendations",
    desc: "When an engine suggests products for a need, brands that are not clearly associated with that need simply do not appear, and there is no ranking page to fall back to.",
  },
  {
    icon: TriangleAlert,
    title: "Product descriptions gone wrong",
    desc: "Engines may describe features, availability, or pricing incorrectly, and retail brand monitoring across many products and engines is hard to do manually.",
  },
  {
    icon: Users,
    title: "Competitor-led categories",
    desc: "Competitors and marketplaces often win the recommendations for high-intent shopping questions.",
  },
  {
    icon: Gauge,
    title: "No visibility into product-level presence",
    desc: "Teams cannot easily see which products appear in which answers, across which engines, without a way to measure it.",
  },
]

const BENEFITS: string[] = [
  "Improve product visibility by seeing exactly where products are missing from recommendations.",
  "Protect the brand by catching inaccurate product descriptions early.",
  "Win more customer discovery by contesting the questions competitors currently own.",
]

const WORKFLOW: {
  title: string
  desc: string
}[] = [
  {
    title: "Map the questions",
    desc: "Identify the shopping, recommendation, and comparison questions customers ask AI engines about your category.",
  },
  {
    title: "Establish the baseline",
    desc: "Scan which brands and products AI engines currently recommend for those questions.",
  },
  {
    title: "Find the gaps",
    desc: "See where your products are missing from recommendations and where descriptions are wrong.",
  },
  {
    title: "Contest the categories",
    desc: "Use competitor intelligence to target the high-intent questions rivals currently own.",
  },
  {
    title: "Track and report",
    desc: "Measure product visibility and recommendation share over time.",
  },
]

const FAQS: { q: string; a: string }[] = [
  {
    q: "What is retail AI visibility?",
    a: "Retail AI visibility is how often and how accurately AI engines mention, recommend, and describe a brand's products when shoppers ask related questions. It covers both the presence of your products in answers and the accuracy of what is said about them.",
  },
  {
    q: "How do AI engines decide which products to recommend?",
    a: "Engines tend to recommend products they can clearly identify and associate with a specific need, from brands they have learned to trust. Products and brands that are not clearly associated with a need are simply left out of the answer.",
  },
  {
    q: "Can Citationly track product-level presence?",
    a: "Yes. The platform measures which products appear in which answers, across which engines, so teams can see product-level presence rather than a single brand-wide number.",
  },
  {
    q: "Does it work for both retail brands and e-commerce companies?",
    a: "Yes. Any brand that shoppers research and compare through AI engines benefits from measuring retail AI visibility, whether it sells through its own store, marketplaces, or retail partners.",
  },
  {
    q: "How is this different from traditional retail SEO?",
    a: "Traditional retail SEO targets rankings on a results page. Retail AI visibility targets whether and how accurately engines recommend your products inside AI-generated answers, measured through mentions, accuracy, and recommendation share rather than positions.",
  },
  {
    q: "How do we get started?",
    a: "Run a free analysis to see which of your products AI engines currently recommend, then prioritize the gaps. A demo can walk your team through a retail-specific setup.",
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
        eyebrow="Retail"
        title="Retail AI visibility: be the product AI engines recommend"
        gradientWords={["recommend"]}
        description="Shoppers now ask AI engines what to buy, which brand to trust, and how products compare. Citationly shows whether your brand and products appear in those answers and helps you improve retail AI visibility."
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
      {/* Trust line                                                  */}
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
          Built for consumer brands where product discovery and accuracy both matter.
        </motion.p>
      </div>

      {/* ---------------------------------------------------------- */}
      {/* Section 1: Industry overview                                */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="max-w-3xl">
            <SectionLabel dark={false}>Industry Overview</SectionLabel>
            <RevealText
              as="h2"
              text="AI search is a new shelf for products"
              gradientWords={["shelf"]}
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
                Product discovery is moving into conversation. Instead of browsing a results page, shoppers ask
                an AI engine for a recommendation, a comparison, or the best option for a specific need, and the
                answer names a short list of brands and products. That list is the new shelf, and only a few
                brands make it.
              </p>
              <p>
                Retail AI search rewards product visibility and brand authority together. An engine recommends
                products it can clearly identify and associate with a need, from brands it has learned to
                trust. For retail and e-commerce teams, the question is whether their products appear on that
                shelf, and if not, why a competitor&apos;s do.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 2: Challenges (card grid)                          */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24 bg-indigo-50/40 border-y border-black/5">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-14">
            <div className="flex justify-center">
              <SectionLabel dark={false}>Challenges</SectionLabel>
            </div>
            <RevealText
              as="h2"
              text="Where retail AI answers go wrong"
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
              The same four problems come up again and again for retail and e-commerce teams.
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
      {/* Section 3: How Citationly helps                            */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="max-w-3xl">
            <SectionLabel dark={false}>How Citationly Helps</SectionLabel>
            <RevealText
              as="h2"
              text="How Citationly supports retail brands"
              gradientWords={["brands"]}
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
                Citationly gives retail teams a clear view of whether their brand and products appear in AI
                recommendations and how they compare to competitors. The platform runs the shopping and
                comparison questions customers actually ask through the major engines, records which brands and
                products get named, and turns the results into AI search analytics teams can act on.
              </p>
              <p>
                Where products are missing from recommendations, the gap becomes visible. Where an engine
                describes a product incorrectly, the issue surfaces as an alert.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 4: Industry benefits (bulleted)                    */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24 bg-indigo-50/40 border-y border-black/5">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-16 items-start">
            <div>
              <SectionLabel dark={false}>Industry Benefits</SectionLabel>
              <RevealText
                as="h2"
                text="What retail teams gain"
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
                A measurement-first approach to retail AI visibility delivers several benefits.
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
      {/* Section 5: Relevant platform capabilities                  */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="max-w-3xl">
            <SectionLabel dark={false}>Platform Capabilities</SectionLabel>
            <RevealText
              as="h2"
              text="Platform capabilities built for retail"
              gradientWords={["retail"]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-6"
            />
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-muted-foreground leading-relaxed text-[15px] md:text-base"
            >
              The features most relevant to retail:{" "}
              <Link
                href="/features/ai-search-analytics"
                className="text-indigo-600 hover:text-indigo-700 underline underline-offset-2"
              >
                AI Search Analytics
              </Link>{" "}
              turns recommendation and comparison answers into structured data on where your brand and products
              appear.{" "}
              <Link
                href="/features/competitor-intelligence"
                className="text-indigo-600 hover:text-indigo-700 underline underline-offset-2"
              >
                Competitor Intelligence
              </Link>{" "}
              shows which competing brands and marketplaces engines recommend for high-intent shopping
              questions.{" "}
              <Link
                href="/features/brand-monitoring"
                className="text-indigo-600 hover:text-indigo-700 underline underline-offset-2"
              >
                Brand Monitoring
              </Link>{" "}
              flags inaccurate product, availability, or pricing descriptions across engines. The{" "}
              <Link
                href="/features/ai-visibility-dashboard"
                className="text-indigo-600 hover:text-indigo-700 underline underline-offset-2"
              >
                visibility dashboard
              </Link>{" "}
              ties presence together across products and categories, with{" "}
              <Link
                href="/features/share-of-voice"
                className="text-indigo-600 hover:text-indigo-700 underline underline-offset-2"
              >
                Share of Voice
              </Link>{" "}
              available for competitive benchmarking.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 6: Typical workflow                                */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24 bg-indigo-50/40 border-y border-black/5">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-14">
            <div className="flex justify-center">
              <SectionLabel dark={false}>Typical Workflow</SectionLabel>
            </div>
            <RevealText
              as="h2"
              text="A typical retail AI visibility workflow"
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
      {/* Section 7: Business outcomes                               */}
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
              Retail brands that measure and improve their retail AI visibility tend to see their products
              appear in more recommendation answers, product descriptions become more accurate, and their share
              of high-intent shopping questions grows against competitors.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 8: FAQ                                             */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24 border-t border-black/5">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-16">
            <div>
              <SectionLabel dark={false}>Retail FAQ</SectionLabel>
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
                What retail and e-commerce marketing teams usually ask before starting.
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
        title="See if AI engines recommend your products"
        description="Run a free analysis and find out whether your brand and products appear in AI recommendations, where descriptions are wrong, and which categories competitors currently own."
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
          <Link href="/solutions/healthcare" className="text-indigo-600 hover:text-indigo-700 underline underline-offset-2">
            Healthcare
          </Link>{" "}
          &middot;{" "}
          <Link href="/solutions/finance" className="text-indigo-600 hover:text-indigo-700 underline underline-offset-2">
            Finance
          </Link>
        </p>
      </div>
    </div>
  )
}
