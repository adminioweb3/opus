"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { MagneticButton } from "@/components/features/landing/primitives/MagneticButton"

interface CtaBandProps {
  title?: string
  description?: string
  primaryLabel?: string
  primaryHref?: string
  secondaryLabel?: string
  secondaryHref?: string
}

// Shared closing CTA for (public) pages — a contained dark card (not full-bleed), so the
// light page background stays visible around it and hands off cleanly into the light Footer.
export function CtaBand({
  title = "See how AI talks about your brand.",
  description = "Start your free 7-day analysis. No credit card required.",
  primaryLabel = "Start Free AI Analysis",
  primaryHref = "/register",
  secondaryLabel = "Talk to sales",
  secondaryHref = "/contact",
}: CtaBandProps) {
  const router = useRouter()

  return (
    <section className="py-24">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-[2rem] bg-[#050508] px-8 py-16 md:px-16 md:py-20 text-center"
        >
          {/* CSS-only aurora accents — no 3D cost on content pages */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(40% 55% at 20% 15%, rgba(91,91,255,0.35), transparent 70%), radial-gradient(35% 50% at 85% 25%, rgba(168,85,247,0.25), transparent 70%), radial-gradient(50% 60% at 55% 100%, rgba(59,130,246,0.18), transparent 70%)",
            }}
          />
          <div className="landing-noise" />

          <div className="relative">
            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-semibold tracking-[-0.02em] leading-[1.1] text-white mb-4">
              {title}
            </h2>
            <p className="text-base md:text-lg text-white/55 max-w-xl mx-auto mb-9">{description}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <MagneticButton
                onClick={() => router.push(primaryHref)}
                className="group h-12 px-7 rounded-full font-medium text-[15px] bg-white text-[#050508] shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_60px_rgba(255,255,255,0.25)] transition-shadow inline-flex items-center gap-2"
              >
                {primaryLabel}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </MagneticButton>
              <MagneticButton
                onClick={() => router.push(secondaryHref)}
                className="h-12 px-7 rounded-full font-medium text-[15px] text-white border border-white/15 bg-white/5 hover:bg-white/10 transition-colors inline-flex items-center"
              >
                {secondaryLabel}
              </MagneticButton>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
