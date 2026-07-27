"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { ArrowRight, CheckCircle2, Clock, Mail, Send, type LucideIcon } from "lucide-react"
import { PageHero } from "@/components/features/public/PageHero"
import { CtaBand } from "@/components/features/public/CtaBand"
import { SectionLabel } from "@/components/features/landing/primitives/SectionLabel"
import { RevealText } from "@/components/features/landing/primitives/RevealText"
import { MagneticButton } from "@/components/features/landing/primitives/MagneticButton"

/* ------------------------------------------------------------------ */
/* Shared inline link styles                                          */
/* ------------------------------------------------------------------ */

const LINK_LIGHT = "text-indigo-600 hover:text-indigo-700 underline underline-offset-2"

/* ------------------------------------------------------------------ */
/* Fixed content data                                                  */
/* ------------------------------------------------------------------ */

const TOPICS = ["Sales", "Support", "Partnerships", "Press"] as const
type Topic = (typeof TOPICS)[number]

interface ContactFormData {
  name: string
  email: string
  company: string
  topic: Topic
  message: string
}

type FormErrors = Partial<Record<keyof ContactFormData, string>>

const RESPONSE_TIMES: {
  icon: LucideIcon
  title: string
  time: string
  desc?: string
}[] = [
  {
    icon: Clock,
    title: "Sales inquiries",
    time: "Within 1 business day",
  },
  {
    icon: Clock,
    title: "Support requests",
    time: "Within 1 business day",
    desc: "Prioritized by plan tier, with Enterprise response commitments defined in your agreement.",
  },
  {
    icon: Clock,
    title: "Partnership inquiries",
    time: "Within 3 business days",
  },
  {
    icon: Clock,
    title: "Everything else",
    time: "Within 3 business days",
  },
]

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(data: ContactFormData): FormErrors {
  const errors: FormErrors = {}
  if (!data.name.trim()) errors.name = "Enter your name."
  if (!data.email.trim()) errors.email = "Enter your work email."
  else if (!EMAIL_RE.test(data.email.trim())) errors.email = "Enter a valid email address."
  if (!data.company.trim()) errors.company = "Enter your company name."
  if (!data.message.trim()) errors.message = "Tell us a little about what you need."
  else if (data.message.trim().length < 10) errors.message = "A few more details would help, at least 10 characters."
  return errors
}

/* ------------------------------------------------------------------ */
/* Contact form                                                       */
/* ------------------------------------------------------------------ */

function ContactForm() {
  const [data, setData] = useState<ContactFormData>({
    name: "",
    email: "",
    company: "",
    topic: "Sales",
    message: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)

  const setField = <K extends keyof ContactFormData>(field: K, value: ContactFormData[K]) => {
    setData((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev))
    if (submitted) setSubmitted(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const nextErrors = validate(data)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    const subject = `[Citationly] ${data.topic} inquiry from ${data.name}`
    const body = [
      `Name: ${data.name}`,
      `Company: ${data.company}`,
      `Email: ${data.email}`,
      `Topic: ${data.topic}`,
      "",
      data.message,
    ].join("\n")

    const mailto = `mailto:hello@citationly.io?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.location.href = mailto
    setSubmitted(true)
  }

  const inputClass = (hasError?: string) =>
    `w-full rounded-xl border bg-white px-4 py-3 text-[15px] text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 ${
      hasError ? "border-red-300" : "border-black/10"
    }`

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="rounded-2xl bg-white border border-black/5 shadow-[0_1px_3px_rgba(15,15,35,0.05)] p-7 md:p-9"
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="contact-name" className="block text-sm font-medium text-foreground mb-1.5">
              Name
            </label>
            <input
              id="contact-name"
              type="text"
              value={data.name}
              onChange={(e) => setField("name", e.target.value)}
              placeholder="Jordan Lee"
              className={inputClass(errors.name)}
            />
            {errors.name && <p className="mt-1.5 text-xs text-red-600">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="contact-email" className="block text-sm font-medium text-foreground mb-1.5">
              Work email
            </label>
            <input
              id="contact-email"
              type="email"
              value={data.email}
              onChange={(e) => setField("email", e.target.value)}
              placeholder="jordan@company.com"
              className={inputClass(errors.email)}
            />
            {errors.email && <p className="mt-1.5 text-xs text-red-600">{errors.email}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="contact-company" className="block text-sm font-medium text-foreground mb-1.5">
              Company
            </label>
            <input
              id="contact-company"
              type="text"
              value={data.company}
              onChange={(e) => setField("company", e.target.value)}
              placeholder="Acme Inc."
              className={inputClass(errors.company)}
            />
            {errors.company && <p className="mt-1.5 text-xs text-red-600">{errors.company}</p>}
          </div>

          <div>
            <label htmlFor="contact-topic" className="block text-sm font-medium text-foreground mb-1.5">
              Topic
            </label>
            <select
              id="contact-topic"
              value={data.topic}
              onChange={(e) => setField("topic", e.target.value as Topic)}
              className={inputClass()}
            >
              {TOPICS.map((topic) => (
                <option key={topic} value={topic}>
                  {topic}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="contact-message" className="block text-sm font-medium text-foreground mb-1.5">
            Message
          </label>
          <textarea
            id="contact-message"
            rows={5}
            value={data.message}
            onChange={(e) => setField("message", e.target.value)}
            placeholder="Tell us about your brand and what you're trying to solve."
            className={`${inputClass(errors.message)} resize-none`}
          />
          {errors.message && <p className="mt-1.5 text-xs text-red-600">{errors.message}</p>}
        </div>

        <MagneticButton className="group w-full sm:w-auto h-12 px-7 rounded-full font-medium text-[15px] bg-[#050508] text-white hover:bg-[#1a1a24] transition-colors inline-flex items-center justify-center gap-2">
          Send message
          <Send className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </MagneticButton>

        <AnimatePresence>
          {submitted && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-start gap-2.5 rounded-xl bg-indigo-50/60 border border-indigo-100 px-4 py-3 text-sm text-indigo-700"
            >
              <CheckCircle2 className="w-4.5 h-4.5 shrink-0 mt-0.5" />
              <p>
                Your email client should have opened, or write to{" "}
                <a href="mailto:hello@citationly.io" className="font-medium underline underline-offset-2">
                  hello@citationly.io
                </a>{" "}
                directly.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export function Content() {
  return (
    <div className="bg-background">
      <PageHero
        eyebrow="Contact"
        title="Talk to a person who knows the platform."
        gradientWords={["platform"]}
        description="Whether you are evaluating plans, need help with your account, or want to explore a partnership, your message goes to the team that can actually answer it. No ticket black holes."
      >
        <a
          href="#contact-form"
          className="group h-12 px-7 rounded-full font-medium text-[15px] bg-foreground text-background inline-flex items-center gap-2 shadow-sm hover:shadow-md transition-shadow"
        >
          Book a Demo
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </a>
        <a
          href="mailto:hello@citationly.io"
          className="h-12 px-7 rounded-full font-medium text-[15px] text-foreground border border-black/10 bg-white hover:bg-black/3 transition-colors inline-flex items-center gap-2"
        >
          <Mail className="w-4 h-4" />
          Email Us
        </a>
      </PageHero>

      {/* ---------------------------------------------------------- */}
      {/* Section 1 — Whatever the question, ask it early              */}
      {/* ---------------------------------------------------------- */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <div className="flex justify-center">
            <SectionLabel dark={false}>Start here</SectionLabel>
          </div>
          <RevealText
            as="h2"
            text="Whatever the question, ask it early."
            gradientWords={["early"]}
            className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-6"
          />
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-muted-foreground leading-relaxed text-[15px] md:text-base"
          >
            AI search measurement is a young discipline, and most conversations we have start well before
            a purchase decision. Prospective customers ask us how measurement works, what an AI visibility
            platform can and cannot see, and how to build the internal case for the channel. We answer
            those questions gladly, whether or not a deal follows, because informed buyers make better
            long-term customers. Existing customers reach us about their accounts, their data, and their
            programs. Partners reach us about integrations and agency relationships. Every route below
            goes to people, not queues.
          </motion.p>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 2 — Sales + contact form                             */}
      {/* ---------------------------------------------------------- */}
      <section id="contact-form" className="py-16 md:py-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-10 lg:gap-14 items-start">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <SectionLabel dark={false}>Sales</SectionLabel>
              <RevealText
                as="h2"
                text="Evaluating Citationly for your team?"
                gradientWords={["team"]}
                className="text-2xl md:text-3xl font-semibold tracking-[-0.02em] text-foreground mb-5"
              />
              <p className="text-muted-foreground leading-relaxed text-[15px] mb-4">
                Sales conversations at Citationly are diagnostic before they are commercial. We start with
                your situation: which engines matter to your buyers, what your competitive set looks like,
                and what your leadership needs to see. Then we show you the platform against your own
                brand&apos;s data rather than a canned demo. Good reasons to talk to sales include comparing{" "}
                <Link href="/pricing" className={LINK_LIGHT}>
                  plans
                </Link>{" "}
                for your team size, scoping an Enterprise agreement, discussing{" "}
                <Link href="/features/brand-monitoring" className={LINK_LIGHT}>
                  brand monitoring
                </Link>{" "}
                for a regulated business, or planning{" "}
                <Link href="/features/competitor-intelligence" className={LINK_LIGHT}>
                  competitor intelligence
                </Link>{" "}
                across a client portfolio.
              </p>
              <p className="text-muted-foreground leading-relaxed text-[15px]">
                Reach sales directly at{" "}
                <a href="mailto:sales@citationly.io" className={LINK_LIGHT}>
                  sales@citationly.io
                </a>
                , or use the form to book a demo.
              </p>
            </motion.div>

            <ContactForm />
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 3 — Support                                          */}
      {/* ---------------------------------------------------------- */}
      <section className="py-16 md:py-20 bg-indigo-50/40 border-y border-black/5">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <div className="flex justify-center">
            <SectionLabel dark={false}>Support</SectionLabel>
          </div>
          <RevealText
            as="h2"
            text="Already a customer and need help?"
            gradientWords={["help"]}
            className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-6"
          />
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-muted-foreground leading-relaxed text-[15px] md:text-base mb-4"
          >
            Support handles account questions, data questions, and anything that is not behaving as
            expected. Include your workspace name and, where relevant, the report or view you are asking
            about, and resolution gets faster. For self-serve answers, the{" "}
            <Link href="/help" className={LINK_LIGHT}>
              Help Center
            </Link>{" "}
            covers setup, monitoring configuration, and reporting, and the{" "}
            <Link href="/docs" className={LINK_LIGHT}>
              documentation
            </Link>{" "}
            covers platform mechanics in depth.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground leading-relaxed text-[15px] md:text-base"
          >
            Reach support directly at{" "}
            <a href="mailto:support@citationly.io" className={LINK_LIGHT}>
              support@citationly.io
            </a>
            . We reply within one business day.
          </motion.p>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 4 — Partnerships                                     */}
      {/* ---------------------------------------------------------- */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <div className="flex justify-center">
            <SectionLabel dark={false}>Partnerships</SectionLabel>
          </div>
          <RevealText
            as="h2"
            text="Want to build with us?"
            gradientWords={["us"]}
            className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-6"
          />
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-muted-foreground leading-relaxed text-[15px] md:text-base mb-4"
          >
            We work with agencies delivering{" "}
            <Link href="/generative-engine-optimization" className={LINK_LIGHT}>
              AI search optimization services
            </Link>{" "}
            to clients, technology partners connecting Citationly data into adjacent tools, and consultants
            building measurement practices. If your work touches AI visibility,{" "}
            <Link href="/features/brand-monitoring" className={LINK_LIGHT}>
              brand monitoring
            </Link>
            , or{" "}
            <Link href="/features/competitor-intelligence" className={LINK_LIGHT}>
              competitive intelligence
            </Link>
            , there is probably a conversation worth having.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground leading-relaxed text-[15px] md:text-base"
          >
            Select Partnerships in the form above, or write to{" "}
            <a href="mailto:hello@citationly.io" className={LINK_LIGHT}>
              hello@citationly.io
            </a>
            , and we will route it to the right person.
          </motion.p>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 5 — When you will hear back                          */}
      {/* ---------------------------------------------------------- */}
      <section className="py-16 md:py-20 bg-indigo-50/40 border-y border-black/5">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-12">
            <div className="flex justify-center">
              <SectionLabel dark={false}>Response times</SectionLabel>
            </div>
            <RevealText
              as="h2"
              text="When you will hear back."
              gradientWords={["back"]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {RESPONSE_TIMES.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.1 + i * 0.1 }}
                className="rounded-2xl bg-white border border-black/5 shadow-[0_1px_3px_rgba(15,15,35,0.05)] p-6"
              >
                <div className="shrink-0 w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/15 text-indigo-600 flex items-center justify-center mb-4">
                  <item.icon className="w-4.5 h-4.5" />
                </div>
                <h3 className="font-semibold text-foreground mb-1.5">{item.title}</h3>
                <div className="text-indigo-600 font-medium text-[15px] mb-2">{item.time}</div>
                {item.desc && <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>}
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center text-muted-foreground max-w-xl mx-auto"
          >
            If a question needs research on our side, you will hear that too, with an honest timeline
            rather than silence.
          </motion.p>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Closing teaser                                               */}
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
                The fastest route is a conversation.
              </h3>
              <p className="text-muted-foreground max-w-lg mx-auto mb-8">
                If you are evaluating the platform, skip the email round-trip: book a demo and bring your
                questions. Thirty minutes against your own brand&apos;s data answers more than a week of
                correspondence.
              </p>
              <a
                href="#contact-form"
                className="group inline-flex items-center gap-2 h-12 px-7 rounded-full font-medium text-[15px] bg-[#050508] text-white hover:bg-[#1a1a24] transition-colors"
              >
                Book a Demo
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <CtaBand primaryLabel="Book a Demo" primaryHref="#contact-form" secondaryLabel="Start Free Analysis" secondaryHref="/register" />
    </div>
  )
}
