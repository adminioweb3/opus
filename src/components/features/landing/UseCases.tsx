"use client"

import { motion } from "framer-motion"
import { SectionLabel } from "./primitives/SectionLabel"
import { LANDING_PHOTOS } from "@/lib/landing-images"

const USE_CASES = [
  { label: "A measurable discipline instead of guesswork", desc: "AI search performance becomes a tracked metric with a baseline, a trend line, and a target.", img: LANDING_PHOTOS.teamAtMonitor() },
  { label: "Early protection for your brand", desc: "Inaccurate AI answers get flagged and corrected at the source before they influence buying committees at scale.", img: LANDING_PHOTOS.darkAnalyticsRoom() },
  { label: "Defensible budget decisions", desc: "When you can show which content earns citations, content investment stands up to CFO scrutiny.", img: LANDING_PHOTOS.executiveMeeting() },
  { label: "A head start most competitors do not have", desc: "The majority of enterprises have not begun measuring AI visibility.", img: LANDING_PHOTOS.startupOffice() },
  { label: "Reporting executives actually read", desc: "Share of Voice, competitive position, and trend direction translate directly into board-level language.", img: LANDING_PHOTOS.boardroom() },
]

export function UseCases() {
  return (
    <section className="relative py-32 bg-background">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <div className="flex justify-center">
            <SectionLabel dark={false}>Benefits</SectionLabel>
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
            What your <span className="text-primary">team gains.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {USE_CASES.map((uc, i) => (
            <motion.div
              key={uc.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
              whileHover={{ y: -6 }}
              className="group relative rounded-2xl overflow-hidden aspect-[4/5]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={uc.img} alt={uc.label} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/0" />
              <div className="relative h-full flex flex-col justify-end p-5">
                <h3 className="text-white font-semibold text-lg mb-1.5">{uc.label}</h3>
                <p className="text-white/70 text-[13px] leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-h-0 group-hover:max-h-28 overflow-hidden">
                  {uc.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
