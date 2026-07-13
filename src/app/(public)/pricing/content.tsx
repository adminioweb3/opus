"use client"

import React, { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  Check,
  Minus,
  ChevronDown,
  ShieldCheck,
  CreditCard,
  RefreshCcw,
  Sparkles,
  ArrowRight,
} from "lucide-react"
import { PageHero } from "@/components/features/public/PageHero"
import { CtaBand } from "@/components/features/public/CtaBand"
import { SectionLabel } from "@/components/features/landing/primitives/SectionLabel"
import { RevealText } from "@/components/features/landing/primitives/RevealText"
import { AnimatedCounter } from "@/components/features/landing/primitives/AnimatedCounter"

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

interface Tier {
  name: string
  monthly: number
  annualMonthly: number
  annualTotal: string
  description: string
  features: string[]
  featureIntro?: string
  ctaLabel: string
  ctaHref: string
  highlighted: boolean
}

const TIERS: Tier[] = [
  {
    name: "Starter",
    monthly: 99,
    annualMonthly: 82,
    annualTotal: "$990",
    description: "For founders getting their first read on AI visibility.",
    features: ["1 tracked website", "3 AI platforms", "Weekly scans", "Basic visibility score"],
    ctaLabel: "Start free trial",
    ctaHref: "/register",
    highlighted: false,
  },
  {
    name: "Professional",
    monthly: 299,
    annualMonthly: 249,
    annualTotal: "$2,990",
    description: "For marketing and SEO teams scaling AI presence.",
    featureIntro: "Everything in Starter, plus",
    features: [
      "Track up to 5 websites",
      "All 9 AI platforms",
      "Daily monitoring",
      "5 tracked competitors",
      "AI fix recommendations",
      "Email alerts",
    ],
    ctaLabel: "Start free trial",
    ctaHref: "/register",
    highlighted: true,
  },
  {
    name: "Enterprise",
    monthly: 999,
    annualMonthly: 832,
    annualTotal: "$9,990",
    description: "For global brands running visibility at scale.",
    featureIntro: "Everything in Professional, plus",
    features: [
      "Unlimited websites",
      "Real-time monitoring",
      "Unlimited competitors",
      "Executive reporting",
      "API access",
      "Dedicated support",
    ],
    ctaLabel: "Talk to sales",
    ctaHref: "/contact",
    highlighted: false,
  },
]

type Cell = boolean | string

interface CompareRow {
  label: string
  starter: Cell
  professional: Cell
  enterprise: Cell
}

interface CompareGroup {
  group: string
  rows: CompareRow[]
}

const COMPARISON: CompareGroup[] = [
  {
    group: "Monitoring",
    rows: [
      { label: "Tracked websites", starter: "1", professional: "Up to 5", enterprise: "Unlimited" },
      { label: "AI platforms monitored", starter: "3 platforms", professional: "All 9 platforms", enterprise: "All 9 platforms" },
      { label: "Visibility Radar scan frequency", starter: "Weekly", professional: "Daily", enterprise: "Real-time" },
      { label: "Brand Pulse monitoring & accuracy flags", starter: false, professional: true, enterprise: true },
      { label: "Email alerts", starter: false, professional: true, enterprise: true },
    ],
  },
  {
    group: "Intelligence",
    rows: [
      { label: "AI Visibility Score", starter: "Basic score", professional: "Platform breakdown", enterprise: "Platform breakdown" },
      { label: "Citation Intelligence (sources cited instead of you)", starter: false, professional: true, enterprise: true },
      { label: "Competitor Watch — share of voice", starter: false, professional: "5 competitors", enterprise: "Unlimited" },
      { label: "Opportunity Finder deep scans", starter: false, professional: "10 / month", enterprise: "Unlimited" },
      { label: "Answer Simulator", starter: false, professional: true, enterprise: true },
    ],
  },
  {
    group: "Optimization",
    rows: [
      { label: "GEO Optimizer & Page Auditor", starter: false, professional: true, enterprise: true },
      { label: "AI fix recommendations", starter: false, professional: true, enterprise: true },
      { label: "Content Generator & Optimizer", starter: false, professional: true, enterprise: true },
      { label: "Publishing Center", starter: false, professional: true, enterprise: true },
      { label: "Knowledge Vault knowledge bases", starter: "1", professional: "5", enterprise: "Unlimited" },
    ],
  },
  {
    group: "Reporting",
    rows: [
      { label: "Command Center dashboard", starter: true, professional: true, enterprise: true },
      { label: "Executive report exports", starter: false, professional: "Monthly", enterprise: "Unlimited" },
      { label: "Scheduled report delivery", starter: false, professional: true, enterprise: true },
      { label: "API access", starter: false, professional: false, enterprise: true },
      { label: "Integrations", starter: false, professional: "Core", enterprise: "All + custom" },
    ],
  },
  {
    group: "Support",
    rows: [
      { label: "Team seats", starter: "2", professional: "10", enterprise: "Unlimited" },
      { label: "Roles & permissions", starter: false, professional: true, enterprise: true },
      { label: "Support", starter: "Email", professional: "Priority email + chat", enterprise: "Dedicated success manager" },
      { label: "Onboarding", starter: "Self-serve", professional: "Guided", enterprise: "White-glove" },
      { label: "Uptime SLA", starter: false, professional: false, enterprise: "99.9%" },
    ],
  },
]

const FAQS = [
  {
    q: "How does the 7-day free trial work?",
    a: "Every plan starts with a real 7-day free trial — no credit card required. During the trial you get full Professional-tier access: all 9 AI platforms, daily Visibility Radar scans, Citation Intelligence, Competitor Watch, and the GEO Optimizer. When the trial ends, you pick the plan that fits and continue where you left off — your scan history, scores, and reports are all preserved. If you decide not to continue, nothing is charged and your account simply pauses.",
  },
  {
    q: "Can I switch plans later?",
    a: "Yes, anytime. Upgrades take effect immediately and we prorate the difference, so you only ever pay for what you use. Downgrades apply at the start of your next billing cycle. Your historical data — visibility scores, citation records, competitor benchmarks — carries across plans in both directions.",
  },
  {
    q: "How does annual billing work?",
    a: "Annual plans are billed once per year at the equivalent of 10 monthly payments — roughly two months free. You can move from monthly to annual at any point from your billing settings, and the switch is prorated against your current period. Annual invoices fit standard procurement flows, and Enterprise customers can pay by invoice.",
  },
  {
    q: "We're an agency managing multiple client sites. Which plan fits?",
    a: "Professional covers up to 5 tracked websites, which fits most in-house teams and boutique agencies. Agencies managing more clients should look at Enterprise: unlimited websites, unlimited competitors in Competitor Watch, per-client executive reports, and team roles so each strategist only sees their own accounts. Talk to sales for agency-specific terms and volume pricing.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. Cancel self-serve from your billing settings — no email chain, no retention call. You keep full access through the end of your paid period, and you can export your reports and data before the account closes. If you come back later, your workspace history is restored.",
  },
  {
    q: "What payment methods do you accept?",
    a: "All major credit and debit cards — Visa, Mastercard, and American Express — processed securely through Stripe. Enterprise plans can also pay by ACH, wire transfer, or invoice with net-30 terms. Prices are in USD; applicable taxes are calculated at checkout based on your billing address.",
  },
]

/* ------------------------------------------------------------------ */
/* Pieces                                                              */
/* ------------------------------------------------------------------ */

function BillingToggle({ annual, onChange }: { annual: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative inline-flex items-center rounded-full border border-black/10 bg-white p-1 shadow-[0_4px_20px_-8px_rgba(5,5,8,0.15)]">
        {[
          { key: false, label: "Monthly" },
          { key: true, label: "Annual" },
        ].map((opt) => (
          <button
            key={opt.label}
            onClick={() => onChange(opt.key)}
            className={`relative px-5 py-2 rounded-full text-sm font-medium transition-colors ${
              annual === opt.key ? "text-white" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {annual === opt.key && (
              <motion.span
                layoutId="billing-pill"
                className="absolute inset-0 rounded-full bg-[#050508]"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <span className="relative">{opt.label}</span>
          </button>
        ))}
      </div>
      <span
        className={`text-[12px] font-semibold tracking-wide transition-colors ${
          annual ? "text-emerald-600" : "text-muted-foreground/60"
        }`}
      >
        Annual billing saves 2 months — the equivalent of 10 monthly payments
      </span>
    </div>
  )
}

function TierCard({ tier, annual, index }: { tier: Tier; annual: boolean; index: number }) {
  const inner = (
    <div
      className={`relative flex h-full flex-col rounded-[calc(1.6rem-1.5px)] bg-white p-8 ${
        tier.highlighted ? "" : "border border-black/5"
      }`}
    >
      <h3 className="text-lg font-semibold text-foreground mb-1">{tier.name}</h3>
      <p className="text-[13px] text-muted-foreground mb-6 min-h-10">{tier.description}</p>

      <div className="flex items-baseline gap-1.5">
        <span className="text-[2.75rem] leading-none font-semibold tracking-[-0.02em] text-foreground">
          <AnimatedCounter value={annual ? tier.annualMonthly : tier.monthly} prefix="$" duration={0.7} />
        </span>
        <span className="text-sm text-muted-foreground">/mo</span>
      </div>
      <p className="mt-2 mb-6 text-[12px] text-muted-foreground min-h-4">
        {annual ? `Billed ${tier.annualTotal}/year — 2 months free` : "Billed monthly"}
      </p>

      <div className="mb-6 inline-flex items-center gap-2 self-start rounded-full bg-indigo-500/5 border border-indigo-500/15 px-3 py-1.5">
        <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
        <span className="text-[12px] font-medium text-indigo-600">7-day free trial — no credit card</span>
      </div>

      <div className="flex flex-1 flex-col gap-3 mb-8">
        {tier.featureIntro && (
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/70">
            {tier.featureIntro}
          </span>
        )}
        {tier.features.map((f) => (
          <div key={f} className="flex items-center gap-2.5 text-[13.5px]">
            <Check className="w-4 h-4 shrink-0 text-indigo-600" />
            <span className="text-foreground/75">{f}</span>
          </div>
        ))}
      </div>

      <Link
        href={tier.ctaHref}
        className={`group inline-flex h-11 w-full items-center justify-center gap-2 rounded-full text-sm font-medium transition-all ${
          tier.highlighted
            ? "bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-[0_12px_30px_-10px_rgba(91,91,255,0.6)] hover:shadow-[0_16px_40px_-10px_rgba(91,91,255,0.75)]"
            : "border border-black/10 bg-white text-foreground hover:bg-black/[0.03]"
        }`}
      >
        {tier.ctaLabel}
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative h-full"
    >
      {tier.highlighted ? (
        <div className="relative h-full rounded-[1.6rem] bg-gradient-to-b from-indigo-500 via-violet-500 to-indigo-300 p-[1.5px] shadow-[0_30px_70px_-25px_rgba(91,91,255,0.45)]">
          <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-1 text-xs font-semibold text-white shadow-lg">
            Most popular
          </div>
          {inner}
        </div>
      ) : (
        <div className="h-full rounded-[1.6rem] shadow-[0_16px_50px_-30px_rgba(5,5,8,0.25)]">{inner}</div>
      )}
    </motion.div>
  )
}

function CellValue({ value, emphasized = false }: { value: Cell; emphasized?: boolean }) {
  if (value === true) {
    return <Check className={`mx-auto h-4 w-4 ${emphasized ? "text-indigo-600" : "text-indigo-500/80"}`} />
  }
  if (value === false) {
    return <Minus className="mx-auto h-4 w-4 text-black/15" />
  }
  return <span className={`text-[13px] font-medium ${emphasized ? "text-foreground" : "text-foreground/70"}`}>{value}</span>
}

function ComparisonTable() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-6%" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="overflow-x-auto rounded-[1.5rem] border border-black/5 bg-white shadow-[0_20px_60px_-40px_rgba(5,5,8,0.3)]"
    >
      <table className="w-full min-w-190 border-collapse text-left">
        <thead>
          <tr className="border-b border-black/5">
            <th className="w-[34%] px-6 py-5 text-[13px] font-semibold text-muted-foreground">Features</th>
            <th className="w-[22%] px-4 py-5 text-center">
              <span className="block text-sm font-semibold text-foreground">Starter</span>
              <span className="block text-[12px] font-normal text-muted-foreground">$99/mo</span>
            </th>
            <th className="w-[22%] bg-indigo-50/60 px-4 py-5 text-center">
              <span className="mb-1 inline-block rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                Most popular
              </span>
              <span className="block text-sm font-semibold text-foreground">Professional</span>
              <span className="block text-[12px] font-normal text-muted-foreground">$299/mo</span>
            </th>
            <th className="w-[22%] px-4 py-5 text-center">
              <span className="block text-sm font-semibold text-foreground">Enterprise</span>
              <span className="block text-[12px] font-normal text-muted-foreground">$999/mo</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {COMPARISON.map((group) => (
            <React.Fragment key={group.group}>
              <tr>
                <td colSpan={4} className="bg-black/[0.02] px-6 py-3">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    {group.group}
                  </span>
                </td>
              </tr>
              {group.rows.map((row) => (
                <tr key={row.label} className="border-t border-black/[0.04]">
                  <td className="px-6 py-3.5 text-[13.5px] text-foreground/80">{row.label}</td>
                  <td className="px-4 py-3.5 text-center">
                    <CellValue value={row.starter} />
                  </td>
                  <td className="bg-indigo-50/40 px-4 py-3.5 text-center">
                    <CellValue value={row.professional} emphasized />
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    <CellValue value={row.enterprise} />
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
        <tfoot>
          <tr className="border-t border-black/5">
            <td className="px-6 py-5" />
            <td className="px-4 py-5 text-center">
              <Link
                href="/register"
                className="inline-flex h-9 items-center justify-center rounded-full border border-black/10 bg-white px-4 text-[13px] font-medium text-foreground transition-colors hover:bg-black/[0.03]"
              >
                Start free trial
              </Link>
            </td>
            <td className="bg-indigo-50/40 px-4 py-5 text-center">
              <Link
                href="/register"
                className="inline-flex h-9 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-4 text-[13px] font-medium text-white shadow-[0_8px_24px_-8px_rgba(91,91,255,0.6)] transition-shadow hover:shadow-[0_10px_30px_-8px_rgba(91,91,255,0.8)]"
              >
                Start free trial
              </Link>
            </td>
            <td className="px-4 py-5 text-center">
              <Link
                href="/contact"
                className="inline-flex h-9 items-center justify-center rounded-full border border-black/10 bg-white px-4 text-[13px] font-medium text-foreground transition-colors hover:bg-black/[0.03]"
              >
                Talk to sales
              </Link>
            </td>
          </tr>
        </tfoot>
      </table>
    </motion.div>
  )
}

function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="flex flex-col gap-3">
      {FAQS.map((item, i) => {
        const isOpen = open === i
        return (
          <motion.div
            key={item.q}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.05 }}
            className={`rounded-2xl border bg-white transition-colors ${
              isOpen ? "border-indigo-500/25 shadow-[0_12px_40px_-24px_rgba(91,91,255,0.4)]" : "border-black/5"
            }`}
          >
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className="text-[15px] font-medium text-foreground">{item.q}</span>
              <ChevronDown
                className={`h-4.5 w-4.5 shrink-0 text-muted-foreground transition-transform duration-300 ${
                  isOpen ? "rotate-180 text-indigo-600" : ""
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
                  <p className="px-6 pb-5 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )
      })}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function Content() {
  const [annual, setAnnual] = useState(false)

  return (
    <main className="bg-background">
      <PageHero
        eyebrow="Pricing"
        title="Simple pricing that scales with your visibility."
        gradientWords={["visibility"]}
        description="Three plans, one platform. Every plan starts with a real 7-day free trial — full Professional features, no credit card required."
      />

      {/* Tier cards */}
      <section className="pb-20 md:pb-24">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="mb-12 flex justify-center">
            <BillingToggle annual={annual} onChange={setAnnual} />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:items-stretch">
            {TIERS.map((tier, i) => (
              <TierCard key={tier.name} tier={tier} annual={annual} index={i} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-12 flex flex-col items-center gap-5"
          >
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {[
                { icon: CreditCard, label: "No credit card to start" },
                { icon: RefreshCcw, label: "Cancel anytime" },
                { icon: ShieldCheck, label: "SOC 2-aligned security" },
              ].map(({ icon: Icon, label }) => (
                <span key={label} className="inline-flex items-center gap-2 text-[13px] text-muted-foreground">
                  <Icon className="h-4 w-4 text-indigo-500" />
                  {label}
                </span>
              ))}
            </div>
            <p className="text-[13px] text-muted-foreground/70">
              Trusted by growth teams at Northwind Cloud, Fielder, and Larkspur Group.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="py-20 md:py-24 border-t border-black/5">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="mb-14 text-center">
            <div className="flex justify-center">
              <SectionLabel dark={false}>Compare plans</SectionLabel>
            </div>
            <RevealText
              as="h2"
              text="Exactly what each plan unlocks."
              gradientWords={["unlocks"]}
              className="mb-4 text-3xl font-semibold tracking-[-0.02em] text-foreground md:text-4xl"
            />
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="mx-auto max-w-2xl text-muted-foreground"
            >
              Every trial runs on full Professional features, so you can evaluate the whole platform — from
              Visibility Radar to Citation Intelligence — before you pick a tier.
            </motion.p>
          </div>

          <ComparisonTable />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-24 border-t border-black/5">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
            <div>
              <SectionLabel dark={false}>Pricing FAQ</SectionLabel>
              <RevealText
                as="h2"
                text="Questions, answered."
                gradientWords={["answered"]}
                className="mb-4 text-3xl font-semibold tracking-[-0.02em] text-foreground md:text-4xl"
              />
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-6 max-w-md text-muted-foreground"
              >
                Everything teams usually ask before starting a trial. If yours is not here, we answer within one
                business day.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-700"
                >
                  Talk to our team
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </motion.div>
            </div>

            <FaqAccordion />
          </div>
        </div>
      </section>

      <CtaBand
        title="Start your 7-day free trial."
        description="Full Professional features for 7 days. No credit card, no sales call — just your brand's real AI visibility."
        primaryLabel="Start free trial"
      />
    </main>
  )
}
