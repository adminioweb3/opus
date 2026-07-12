"use client"

import { motion } from "framer-motion"
import { SectionLabel } from "@/components/features/landing/primitives/SectionLabel"
import { RevealText } from "@/components/features/landing/primitives/RevealText"

interface PageHeroProps {
  eyebrow: string
  title: string
  /** Words in `title` to render with the brand gradient (punctuation-insensitive match). */
  gradientWords?: string[]
  description?: string
  /** CTA buttons or anything else rendered below the description. */
  children?: React.ReactNode
  /** Wider measure for long titles. */
  wide?: boolean
}

// Standard opening section for every (public) marketing page. Light background on purpose:
// the floating Navbar renders dark-text-on-transparent at the top of these pages, so the
// page top must stay light for it to read.
export function PageHero({ eyebrow, title, gradientWords = [], description, children, wide = false }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden pt-40 pb-16 md:pb-20">
      {/* Soft brand glow + grid, quiet enough to keep the top light */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 45% at 50% -5%, rgba(91,91,255,0.10), transparent), radial-gradient(ellipse 40% 30% at 85% 0%, rgba(168,85,247,0.06), transparent)",
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-105 bg-grid-pattern opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent)]" />

      <div className={`container relative mx-auto px-6 ${wide ? "max-w-5xl" : "max-w-4xl"} text-center`}>
        <div className="flex justify-center">
          <SectionLabel dark={false}>{eyebrow}</SectionLabel>
        </div>

        <RevealText
          as="h1"
          text={title}
          gradientWords={gradientWords}
          className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] leading-[1.06] mb-6 text-foreground"
        />

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto"
          >
            {description}
          </motion.p>
        )}

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  )
}
