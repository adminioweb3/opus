"use client"

import { motion } from "framer-motion"
import { AnimatedCounter } from "./primitives/AnimatedCounter"
import { getPlatformLogoUrl } from "@/lib/logoUtils"

const STATS = [
  { value: 2400000, suffix: "+", label: "AI prompts analyzed" },
  { value: 18500, suffix: "+", label: "Visibility reports generated" },
  { value: 64, suffix: "", label: "Countries monitored" },
  { value: 9, suffix: "", label: "AI platforms tracked" },
]

const PLATFORMS = ["ChatGPT", "Gemini", "Claude", "Perplexity", "Microsoft Copilot", "Meta AI", "Grok", "DeepSeek"]

export function SocialProof() {
  return (
    <section className="landing-root relative py-24 border-t border-white/5">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-semibold landing-text-gradient tracking-tight mb-2">
                <AnimatedCounter value={s.value} suffix={s.suffix} />
              </div>
              <div className="text-sm text-white/40 font-medium">{s.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-[11px] font-semibold text-white/35 mb-8 uppercase tracking-[0.2em]">
            Real-time visibility across every AI engine that matters
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4">
            {PLATFORMS.map((p, i) => {
              const logo = getPlatformLogoUrl(p)
              return (
                <motion.div
                  key={p}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-full landing-glass-dark hover:bg-white/10 transition-colors"
                >
                  {logo && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={logo} alt={p} className="w-4 h-4 rounded-sm object-contain" />
                  )}
                  <span className="text-[13px] font-medium text-white/70">{p}</span>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
