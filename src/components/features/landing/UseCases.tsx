"use client"

import { motion } from "framer-motion"
import { SectionLabel } from "./primitives/SectionLabel"
import { LANDING_PHOTOS } from "@/lib/landing-images"

const USE_CASES = [
  { label: "Marketing teams", desc: "Prove AI-sourced pipeline and defend budget with real visibility data.", img: LANDING_PHOTOS.teamCollab() },
  { label: "SEO teams", desc: "Extend your existing SEO stack into GEO and AEO without starting over.", img: LANDING_PHOTOS.workspaceDesk() },
  { label: "Agencies", desc: "White-labelled visibility reporting across every client, in one view.", img: LANDING_PHOTOS.teamMeeting() },
  { label: "Startups", desc: "Get discovered by AI search before you can afford a paid growth team.", img: LANDING_PHOTOS.startupOffice() },
  { label: "Enterprises", desc: "Executive-ready reporting and SOC 2-aligned security at scale.", img: LANDING_PHOTOS.boardroom() },
  { label: "Founders", desc: "Know exactly what ChatGPT says about your company before a customer asks.", img: LANDING_PHOTOS.executiveMeeting() },
  { label: "Publishers", desc: "Track which of your articles AI engines actually cite as sources.", img: LANDING_PHOTOS.darkAnalyticsRoom() },
  { label: "SaaS & retail", desc: "Benchmark share of voice against direct competitors, automatically.", img: LANDING_PHOTOS.teamAtMonitor() },
]

export function UseCases() {
  return (
    <section className="relative py-32 bg-background">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <div className="flex justify-center">
            <SectionLabel dark={false}>Who it&apos;s for</SectionLabel>
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
            Built for every team that owns <span className="text-primary">brand visibility.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
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
                <p className="text-white/70 text-[13px] leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-h-0 group-hover:max-h-20 overflow-hidden">
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
