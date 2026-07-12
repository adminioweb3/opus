"use client"

import { useRef } from "react"
import dynamic from "next/dynamic"
import { motion, useInView } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { RevealText } from "./primitives/RevealText"
import { MagneticButton } from "./primitives/MagneticButton"

const WireframeGlobe = dynamic(() => import("./three/WireframeGlobe").then((m) => m.WireframeGlobe), { ssr: false })

export function FinalCta() {
  const router = useRouter()
  const sectionRef = useRef<HTMLElement>(null)
  // This section sits at the very bottom of a long page — without gating, its Three.js scene
  // would render at full cost from the moment the page loads, long before it's ever visible.
  const inView = useInView(sectionRef, { margin: "300px 0px 300px 0px" })

  return (
    <section ref={sectionRef} className="landing-root relative py-40 overflow-hidden border-t border-white/5">
      <div className="landing-mesh absolute inset-0" />
      <div className="landing-noise" />
      <WireframeGlobe frameloop={inView ? "always" : "never"} />
      {/* Smooth handoff into the (light-themed, shared-across-pages) Footer that follows
          immediately after — without this the near-black section cuts hard into white. */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-background z-[1] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-6 max-w-3xl text-center">
        <RevealText
          as="h2"
          text="Ready to Own AI Search?"
          gradientWords={["AI", "Search?"]}
          className="text-5xl md:text-6xl font-semibold tracking-[-0.03em] leading-[1.05] mb-6 text-white"
        />
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-white/55 mb-10 max-w-lg mx-auto"
        >
          Start your free 7-day analysis. See exactly how ChatGPT, Gemini, and Claude talk about your brand today.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <MagneticButton
            onClick={() => router.push("/register")}
            className="group h-14 px-9 rounded-full font-medium text-base bg-white text-[#050508] shadow-[0_0_50px_rgba(255,255,255,0.2)] hover:shadow-[0_0_70px_rgba(255,255,255,0.3)] transition-shadow inline-flex items-center gap-2"
          >
            Start Free AI Analysis
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  )
}
