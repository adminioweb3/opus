"use client"

import { motion } from "framer-motion"
import { Quote } from "lucide-react"
import { SectionLabel } from "./primitives/SectionLabel"
import { TESTIMONIAL_PORTRAITS } from "@/lib/landing-images"

const TESTIMONIALS = [
  {
    quote: "Citationly fundamentally changed how we measure our digital presence. Traditional SEO reporting doesn't capture what actually matters anymore — AI visibility does.",
    author: "Sarah Jenkins",
    role: "VP Marketing, Northwind Cloud",
    avatar: TESTIMONIAL_PORTRAITS.p1,
    metric: { value: "+64%", label: "AI citation growth" },
  },
  {
    quote: "We found out ChatGPT was quoting an 18-month-old price from our site within a week of onboarding. That single fix alone paid for the platform.",
    author: "Marcus Webb",
    role: "Head of Growth, Fielder",
    avatar: TESTIMONIAL_PORTRAITS.p2,
    metric: { value: "$180K", label: "Pipeline protected" },
  },
  {
    quote: "The competitor scan replaced three separate tools we were stitching together manually every week. It's now just... automatic.",
    author: "Priya Nair",
    role: "Director of SEO, Larkspur Group",
    avatar: TESTIMONIAL_PORTRAITS.p3,
    metric: { value: "12 hrs/wk", label: "Saved on reporting" },
  },
]

export function Testimonials() {
  return (
    <section className="relative py-32 bg-background">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <div className="flex justify-center">
            <SectionLabel dark={false}>Customer stories</SectionLabel>
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
            Trusted by teams who <span className="text-primary">refuse to guess.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl border border-border bg-card p-7 flex flex-col"
            >
              <Quote className="w-7 h-7 text-primary/30 mb-4" />
              <p className="text-[15px] text-foreground/85 leading-relaxed mb-6 flex-1">&quot;{t.quote}&quot;</p>
              <div className="flex items-center gap-3 mb-5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={t.avatar} alt={t.author} className="w-11 h-11 rounded-full object-cover" />
                <div>
                  <div className="text-sm font-semibold text-foreground">{t.author}</div>
                  <div className="text-[12.5px] text-muted-foreground">{t.role}</div>
                </div>
              </div>
              <div className="flex items-baseline gap-2 pt-4 border-t border-border">
                <span className="text-xl font-semibold text-primary">{t.metric.value}</span>
                <span className="text-[12.5px] text-muted-foreground">{t.metric.label}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
