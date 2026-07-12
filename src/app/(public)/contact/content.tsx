"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import {
  Rocket,
  LifeBuoy,
  ShieldCheck,
  Send,
  CheckCircle2,
  ChevronDown,
  Clock,
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

const CONTACT_CARDS: {
  icon: LucideIcon
  title: string
  desc: string
  email: string
  cta: { label: string; href: string }
  note?: string
}[] = [
  {
    icon: Rocket,
    title: "Sales",
    desc: "See Visibility Radar, Citation Intelligence, and the GEO Optimizer on your own domain. We'll size a plan to your brand's footprint across ChatGPT, Gemini, Claude, Perplexity, Copilot, and Grok.",
    email: "sales@citationly.io",
    cta: { label: "Start free trial", href: "/register" },
  },
  {
    icon: LifeBuoy,
    title: "Support",
    desc: "Already a customer? Questions about scans, integrations, or your account go straight to the team that builds the product.",
    email: "support@citationly.io",
    cta: { label: "Email support", href: "mailto:support@citationly.io" },
    note: "We reply within one business day.",
  },
  {
    icon: ShieldCheck,
    title: "Security disclosures",
    desc: "Found a vulnerability or need documentation for a security review? Reach our security team directly, or see our practices in detail.",
    email: "security@citationly.io",
    cta: { label: "View security practices", href: "/security" },
  },
]

const FAQS: { q: string; a: string }[] = [
  {
    q: "What's the difference between a demo and the free trial?",
    a: "A demo is a guided walkthrough with our team on your own domain and your actual AI visibility data — useful if you want questions answered live before committing. The free trial gives you full product access to explore on your own, no call required. Most teams do one or the other, not both.",
  },
  {
    q: "What exactly do I get with the 7-day free trial?",
    a: "Full access to Citationly for 7 days — Visibility Radar, Citation Intelligence, Competitor Watch, GEO Optimizer, and the rest of the platform, on every plan from Starter to Enterprise. No credit card is required to start.",
  },
  {
    q: "What do you need from me to get started?",
    a: "Just your domain. Point Citationly at your website and we run the first scans across ChatGPT, Gemini, Claude, Perplexity, Copilot, and Grok automatically — there's no crawler to install and no tracking snippet to add before you see results.",
  },
  {
    q: "Do you support agencies managing multiple brands?",
    a: "Yes. Agencies and multi-brand teams run separate visibility programs side by side under one account, with workspace-level roles and reporting per client. Talk to sales about volume pricing across a portfolio of domains.",
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
  else if (data.message.trim().length < 10) errors.message = "A few more details would help — at least 10 characters."
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
                Your email client should have opened — or write to{" "}
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
/* FAQ accordion                                                       */
/* ------------------------------------------------------------------ */

function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="max-w-2xl mx-auto divide-y divide-black/5 rounded-2xl bg-white border border-black/5 shadow-[0_1px_3px_rgba(15,15,35,0.05)]">
      {FAQS.map((item, i) => {
        const isOpen = open === i
        return (
          <div key={item.q}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
              aria-expanded={isOpen}
            >
              <span className="font-medium text-foreground text-[15px]">{item.q}</span>
              <ChevronDown
                className={`w-4.5 h-4.5 shrink-0 text-muted-foreground transition-transform duration-300 ${
                  isOpen ? "rotate-180 text-indigo-500" : ""
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
                  <p className="px-6 pb-5 text-muted-foreground text-[15px] leading-relaxed">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
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
        eyebrow="Contact"
        title="Talk to our team."
        gradientWords={["team"]}
        description="Sales, support, or partnerships — tell us what you need and we'll route it to the right person. Or skip the form and start your free 7-day trial right now."
      />

      {/* ---------------------------------------------------------- */}
      {/* Section 1 — Form + contact cards                             */}
      {/* ---------------------------------------------------------- */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 lg:gap-10 items-start">
            <ContactForm />

            <div className="flex flex-col gap-5">
              {CONTACT_CARDS.map((card, i) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: 0.1 + i * 0.1 }}
                  className="rounded-2xl bg-white border border-black/5 shadow-[0_1px_3px_rgba(15,15,35,0.05)] p-6"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="shrink-0 w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/15 text-indigo-600 flex items-center justify-center">
                      <card.icon className="w-4.5 h-4.5" />
                    </div>
                    <h3 className="font-semibold text-foreground">{card.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{card.desc}</p>

                  <div className="flex items-center gap-2 text-sm text-indigo-600 font-medium mb-4">
                    <Mail className="w-3.5 h-3.5" />
                    <a href={`mailto:${card.email}`} className="hover:underline underline-offset-2">
                      {card.email}
                    </a>
                  </div>

                  {card.note && (
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4">
                      <Clock className="w-3.5 h-3.5" />
                      {card.note}
                    </div>
                  )}

                  <Link
                    href={card.cta.href}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-indigo-600 transition-colors"
                  >
                    {card.cta.label}
                    <span aria-hidden>&rarr;</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 2 — FAQ                                              */}
      {/* ---------------------------------------------------------- */}
      <section className="py-16 md:py-20 bg-indigo-50/40 border-y border-black/5">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-12">
            <div className="flex justify-center">
              <SectionLabel dark={false}>Common questions</SectionLabel>
            </div>
            <RevealText
              as="h2"
              text="Before you write to us."
              gradientWords={["us"]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground"
            />
          </div>

          <FaqAccordion />
        </div>
      </section>

      <CtaBand
        title="Prefer to just try it?"
        description="Start your free 7-day trial on any plan. No credit card required."
        secondaryLabel="See pricing"
        secondaryHref="/pricing"
      />
    </div>
  )
}
