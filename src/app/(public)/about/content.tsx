"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Layers,
  RefreshCcw,
  Ruler,
  Users,
  type LucideIcon,
} from "lucide-react";
import { PageHero } from "@/components/features/public/PageHero";
import { CtaBand } from "@/components/features/public/CtaBand";
import { SectionLabel } from "@/components/features/landing/primitives/SectionLabel";
import { RevealText } from "@/components/features/landing/primitives/RevealText";

/* ------------------------------------------------------------------ */
/* Shared inline link styles                                          */
/* ------------------------------------------------------------------ */

const LINK_LIGHT =
  "text-indigo-600 hover:text-indigo-700 font-medium underline underline-offset-2 transition-colors";
const LINK_DARK =
  "text-indigo-300 hover:text-indigo-200 underline underline-offset-2 transition-colors";

/* ------------------------------------------------------------------ */
/* Fixed content data                                                  */
/* ------------------------------------------------------------------ */

const PRINCIPLES: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: Ruler,
    title: "Measurement before opinion",
    desc: "The AI search space is full of confident claims and thin evidence. Every recommendation Citationly makes traces back to observed engine behavior, and when the data is uncertain we say so.",
  },
  {
    icon: Users,
    title: "Customers define the roadmap",
    desc: "Our feature priorities come from the teams using the platform daily.",
  },
  {
    icon: Layers,
    title: "Clarity over complexity",
    desc: "If a metric cannot be explained to a CMO in one sentence, it is not finished.",
  },
  {
    icon: RefreshCcw,
    title: "Honest about a moving target",
    desc: "We offer continuous measurement, fast adaptation, and transparency about what changed and why.",
  },
];

const ROADMAP_ITEMS: { label: string; title: string; desc: React.ReactNode }[] =
  [
    {
      label: "01",
      title: "Deeper engine coverage",
      desc: "As new assistants earn real usage in buying research, they join the platform.",
    },
    {
      label: "02",
      title: "From measurement to prediction",
      desc: "The roadmap extends toward anticipating how content changes will affect citations before teams invest.",
    },
    {
      label: "03",
      title: "Tighter workflow integration",
      desc: (
        <>
          We are expanding{" "}
          <Link href="/integrations" className={LINK_LIGHT}>
            integrations
          </Link>{" "}
          so recommendations land directly in the content, SEO, and reporting
          workflows enterprises already run.
        </>
      ),
    },
  ];

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function SectionHeading({
  eyebrow,
  title,
  gradientWords,
  dark = false,
  children,
}: {
  eyebrow: string;
  title: string;
  gradientWords?: string[];
  dark?: boolean;
  children?: React.ReactNode;
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
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className={`leading-relaxed max-w-xl mx-auto ${dark ? "text-white/55" : "text-muted-foreground"}`}
        >
          {children}
        </motion.p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export function Content() {
  return (
    <div className="bg-background">
      <PageHero
        eyebrow="About Citationly"
        title="We built the measurement layer AI search was missing"
        gradientWords={["measurement"]}
        description="Citationly exists for one reason: buying decisions moved into AI answers, and enterprises had no way to see what those answers said. We made that visible, measurable, and improvable."
      >
        <Link
          href="/contact"
          className="group h-12 px-7 rounded-full font-medium text-[15px] bg-foreground text-background inline-flex items-center gap-2 shadow-sm hover:shadow-md transition-shadow"
        >
          Book a Demo
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
        <Link
          href="/contact"
          className="h-12 px-7 rounded-full font-medium text-[15px] text-foreground border border-black/10 bg-white hover:bg-black/3 transition-colors inline-flex items-center gap-2"
        >
          Contact Us
        </Link>
      </PageHero>

      {/* ---------------------------------------------------------- */}
      {/* Section 1, Why Citationly exists (light)                     */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <SectionHeading
            eyebrow="Origin"
            title="Why Citationly exists"
            gradientWords={["exists"]}
          />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-5 text-muted-foreground leading-relaxed text-[15px] md:text-base max-w-3xl mx-auto"
          >
            <p>
              Every major shift in how people find information has produced a
              measurement industry alongside it. Search engines created SEO
              platforms. Social networks created social analytics. Then AI
              assistants changed discovery again, and this time the measurement
              layer did not appear.
            </p>
            <p>
              We watched enterprise teams face the same uncomfortable moment. A
              prospect would mention that ChatGPT recommended a competitor, or
              that Perplexity described their product incorrectly, and nobody in
              the room could answer the obvious follow-up questions. How often
              does that happen? Which engines? Which questions? Compared to
              whom? Is it getting better or worse?
            </p>
            <p>
              Serious marketing organizations do not accept unmeasurable
              channels. Yet AI search, the channel increasingly shaping
              shortlists and purchase decisions, was exactly that. Citationly
              was built to close that gap: an AI search platform that treats AI
              answers as data, so enterprises can manage AI visibility with the
              same rigor they apply to every other channel.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 2, What we are here to do (dark accent card)         */}
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
              <SectionHeading
                eyebrow="Mission and vision"
                title="What we are here to do"
                dark
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: 0.1 }}
                >
                  <h3 className="text-white font-semibold text-lg mb-3">
                    Our mission
                  </h3>
                  <p className="text-white/55 text-[15px] leading-relaxed">
                    Our mission is to make AI search measurable for every
                    enterprise. We believe no brand should learn about its AI
                    presence from a lost deal. Our AI visibility platform gives
                    teams the facts: how engines mention them, cite them,
                    describe them, and compare them to competitors.
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: 0.2 }}
                >
                  <h3 className="text-white font-semibold text-lg mb-3">
                    Our vision
                  </h3>
                  <p className="text-white/55 text-[15px] leading-relaxed">
                    Our vision is a discipline, not just a dashboard. We believe
                    AI search intelligence will become a standard function
                    inside enterprise marketing, the way SEO did before it.
                    Citationly aims to define the methodology, the metrics, and
                    the tooling that discipline runs on, with{" "}
                    <Link href="/features/share-of-voice" className={LINK_DARK}>
                      Share of Voice
                    </Link>
                    ,{" "}
                    <Link
                      href="/features/citation-tracking"
                      className={LINK_DARK}
                    >
                      citation tracking
                    </Link>
                    , and answer accuracy as its core measures.
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 3, The principles behind the platform (light)        */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <SectionHeading
            eyebrow="Principles"
            title="The principles behind the platform"
            gradientWords={["principles"]}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                <h3 className="text-foreground font-semibold text-lg mb-2">
                  {principle.title}
                </h3>
                <p className="text-muted-foreground text-[15px] leading-relaxed">
                  {principle.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 4, Where the platform is going (light, timeline)     */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <SectionHeading
            eyebrow="Roadmap"
            title="Where the platform is going"
            gradientWords={["going"]}
          >
            AI search is early, and building for it means building for change.
            Our engineering effort concentrates on three fronts.
          </SectionHeading>

          <div className="max-w-2xl mx-auto">
            {ROADMAP_ITEMS.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.55, delay: 0.05 + i * 0.08 }}
                className="relative pl-12 pb-12 last:pb-0"
              >
                {/* connector line */}
                {i < ROADMAP_ITEMS.length - 1 && (
                  <span className="absolute left-2.75 top-8 bottom-0 w-px bg-linear-to-b from-indigo-200 to-black/5" />
                )}
                {/* node */}
                <span className="absolute left-0 top-1 w-5.75 h-5.75 rounded-full bg-white border border-indigo-200 shadow-[0_1px_3px_rgba(91,91,255,0.15)] flex items-center justify-center">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      i === ROADMAP_ITEMS.length - 1
                        ? "bg-indigo-500 animate-pulse"
                        : "bg-indigo-400"
                    }`}
                  />
                </span>

                <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-indigo-600 mb-1.5">
                  {item.label}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-[15px] leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center text-muted-foreground text-[15px] leading-relaxed max-w-2xl mx-auto"
          >
            We publish roadmap direction rather than dates, because honest
            planning in a fast-moving field means committing to priorities, not
            fictions.{" "}
            <Link href="/roadmap" className={LINK_LIGHT}>
              See our full public roadmap
            </Link>
          </motion.p>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 5, How we work with customers (tinted)               */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24 bg-indigo-50/40 border-y border-black/5">
        <div className="container mx-auto px-6 max-w-4xl">
          <SectionHeading
            eyebrow="Partnership"
            title="How we work with customers"
            gradientWords={["customers"]}
          />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-5 text-muted-foreground leading-relaxed text-[15px] md:text-base max-w-3xl mx-auto text-center"
          >
            <p>
              Enterprise software succeeds on partnership, not licenses. Every
              Citationly customer gets structured onboarding, a clear
              methodology for their first ninety days of measurement, and direct
              access to people who understand both the platform and the
              discipline of AI SEO and{" "}
              <Link
                href="/generative-engine-optimization"
                className={LINK_LIGHT}
              >
                Generative Engine Optimization
              </Link>
              .
            </p>
            <p>
              We measure ourselves the way we ask customers to measure their AI
              presence: on outcomes, tracked over time, against a baseline.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 6, Closing card                                      */}
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
                Talk to the team
              </h3>
              <p className="text-muted-foreground max-w-lg mx-auto mb-8">
                Whether you are evaluating an AI visibility platform, exploring
                a partnership, or want to understand the space before your
                leadership asks about it, we are glad to talk.
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
  );
}
