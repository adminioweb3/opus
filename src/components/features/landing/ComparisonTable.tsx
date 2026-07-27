"use client"

import { motion } from "framer-motion"
import { Radar, Brain, Users, ShieldCheck, LucideIcon } from "lucide-react"
import { SectionLabel } from "./primitives/SectionLabel"

interface Differentiator {
  icon: LucideIcon
  title: string
  desc: string
}

const DIFFERENTIATORS: Differentiator[] = [
  {
    icon: Radar,
    title: "Coverage that matches how buyers behave",
    desc: "Six major AI engines in one platform. Your market does not use a single assistant, so single-engine measurement gives you a distorted picture.",
  },
  {
    icon: Brain,
    title: "Intelligence, not just counting",
    desc: "Citationly connects mentions to citations, citations to sources, and sources to recommended actions.",
  },
  {
    icon: Users,
    title: "Built for cross-functional teams",
    desc: "Shared dashboards, role-based access, and exportable reports keep SEO, content, brand, and leadership working from the same numbers.",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise-grade foundations",
    desc: "Granular permissions, audit-ready reporting, and a roadmap shaped directly by enterprise customer needs.",
  },
]

export function ComparisonSection() {
  return (
    <section className="landing-root relative py-32 border-t border-white/5">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-14">
          <div className="flex justify-center">
            <SectionLabel>Why Citationly</SectionLabel>
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-4">
            Why enterprises <span className="landing-text-gradient-brand">choose Citationly.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {DIFFERENTIATORS.map((d, i) => (
            <motion.div
              key={d.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="landing-glass-dark rounded-2xl p-7 flex flex-col gap-4"
            >
              <div className="w-11 h-11 rounded-xl bg-indigo-500/15 flex items-center justify-center">
                <d.icon className="w-5 h-5 text-indigo-300" />
              </div>
              <h3 className="text-lg font-semibold text-white">{d.title}</h3>
              <p className="text-[14px] text-white/55 leading-relaxed">{d.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
