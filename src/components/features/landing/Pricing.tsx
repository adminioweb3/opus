"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { useRouter } from "next/navigation"
import { SectionLabel } from "./primitives/SectionLabel"
import { MagneticButton } from "./primitives/MagneticButton"

const PLANS = [
  {
    name: "Starter",
    price: 99,
    description: "For founders getting their first read on AI visibility.",
    features: ["1 tracked website", "3 AI platforms", "Weekly scans", "Basic visibility score"],
    highlighted: false,
  },
  {
    name: "Professional",
    price: 299,
    description: "For marketing and SEO teams scaling AI presence.",
    features: ["Track up to 5 websites", "All 9 AI platforms", "Daily monitoring", "5 tracked competitors", "AI fix recommendations", "Email alerts"],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: 999,
    description: "For global brands running visibility at scale.",
    features: ["Unlimited websites", "Real-time monitoring", "Unlimited competitors", "Executive reporting", "API access", "Dedicated support"],
    highlighted: false,
  },
]

function RoiCalculator() {
  const [visitors, setVisitors] = useState(50000)
  const estimatedLift = Math.round(visitors * 0.032)
  const estimatedValue = Math.round(estimatedLift * 4.2)

  return (
    <div className="rounded-3xl landing-glass-dark p-8 max-w-2xl mx-auto mt-20">
      <h3 className="text-lg font-semibold text-white mb-1">Estimate your upside</h3>
      <p className="text-[13px] text-white/50 mb-6">A directional estimate based on typical AI-citation-to-traffic conversion after 90 days.</p>
      <label className="text-[12px] font-medium text-white/60 uppercase tracking-wider mb-2 block">
        Monthly website visitors: <span className="text-white">{visitors.toLocaleString()}</span>
      </label>
      <input
        type="range"
        min={1000}
        max={500000}
        step={1000}
        value={visitors}
        onChange={(e) => setVisitors(Number(e.target.value))}
        className="w-full accent-indigo-400 mb-8"
      />
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-xl bg-white/5 border border-white/10 p-5">
          <div className="text-[11px] uppercase tracking-wider text-white/40 mb-1.5">Est. new AI-sourced visits / mo</div>
          <div className="text-2xl font-semibold text-white">+{estimatedLift.toLocaleString()}</div>
        </div>
        <div className="rounded-xl bg-white/5 border border-white/10 p-5">
          <div className="text-[11px] uppercase tracking-wider text-white/40 mb-1.5">Est. added monthly value</div>
          <div className="text-2xl font-semibold text-emerald-400">${estimatedValue.toLocaleString()}</div>
        </div>
      </div>
    </div>
  )
}

export function Pricing() {
  const router = useRouter()
  return (
    <section className="landing-root relative py-32 border-t border-white/5">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-16">
          <div className="flex justify-center">
            <SectionLabel>Pricing</SectionLabel>
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-4">
            Simple pricing. <span className="landing-text-gradient-brand">Serious upside.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative rounded-3xl p-8 flex flex-col ${
                plan.highlighted ? "bg-white text-[#050508] shadow-[0_30px_80px_-20px_rgba(91,91,255,0.4)]" : "landing-glass-dark text-white"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-indigo-500 to-violet-500 text-white px-4 py-1 rounded-full text-xs font-semibold shadow-lg">
                  Most popular
                </div>
              )}
              <h3 className="text-lg font-semibold mb-1">{plan.name}</h3>
              <p className={`text-[13px] mb-6 ${plan.highlighted ? "text-black/50" : "text-white/50"}`}>{plan.description}</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-semibold">${plan.price}</span>
                <span className={`text-sm ${plan.highlighted ? "text-black/40" : "text-white/40"}`}>/month</span>
              </div>
              <div className="flex flex-col gap-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <div key={f} className="flex items-center gap-2.5 text-[13.5px]">
                    <Check className={`w-4 h-4 shrink-0 ${plan.highlighted ? "text-indigo-600" : "text-indigo-400"}`} />
                    <span className={plan.highlighted ? "text-black/70" : "text-white/70"}>{f}</span>
                  </div>
                ))}
              </div>
              <MagneticButton
                onClick={() => router.push("/register")}
                className={`w-full h-11 rounded-full font-medium text-sm transition-colors ${
                  plan.highlighted ? "bg-[#050508] text-white hover:bg-[#050508]/90" : "bg-white/10 text-white hover:bg-white/15"
                }`}
              >
                Get started
              </MagneticButton>
            </motion.div>
          ))}
        </div>

        <RoiCalculator />
      </div>
    </section>
  )
}
