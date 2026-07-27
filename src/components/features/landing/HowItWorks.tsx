"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Target, Bot, Gauge, Lightbulb, TrendingUp } from "lucide-react"
import { SectionLabel } from "./primitives/SectionLabel"

const STEPS = [
  { icon: Target, title: "Define your brand space", desc: "Add your brand, your competitors, and the topics that matter to your market. Setup takes minutes." },
  { icon: Bot, title: "Citationly scans the engines", desc: "The platform runs your market's real questions through ChatGPT, Gemini, Claude, Perplexity, Copilot, and Grok, continuously." },
  { icon: Gauge, title: "Your baseline appears", desc: "Visibility scores, citation counts, Share of Voice, and competitor benchmarks populate your dashboards." },
  { icon: Lightbulb, title: "Recommendations arrive", desc: "The platform converts findings into a prioritized optimization plan for your content and SEO teams." },
  { icon: TrendingUp, title: "Improvement gets measured", desc: "Every content change is tracked against engine responses, so lift is visible, attributable, and reportable." },
]

export function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              end: "bottom 60%",
              scrub: 0.6,
            },
          }
        )
      }
      stepRefs.current.forEach((el) => {
        if (!el) return
        gsap.fromTo(
          el,
          { opacity: 0, x: -24 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 80%" },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="how-it-works" ref={sectionRef} className="relative py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-20">
          <div className="flex justify-center">
            <SectionLabel dark={false}>How it works</SectionLabel>
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
            From setup to first insight <span className="text-primary">in one session.</span>
          </h2>
        </div>

        <div className="relative pl-14">
          <div className="absolute left-5 top-2 bottom-2 w-px bg-border" />
          <div ref={lineRef} className="absolute left-5 top-2 bottom-2 w-px bg-gradient-to-b from-primary to-violet-500 origin-top" />

          <div className="space-y-16">
            {STEPS.map((step, i) => (
              <div
                key={step.title}
                ref={(el) => { stepRefs.current[i] = el }}
                className="relative"
              >
                <div className="absolute -left-14 top-0 w-11 h-11 rounded-full bg-background border-2 border-primary/30 flex items-center justify-center shadow-sm">
                  <step.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                  Step {i + 1}
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed max-w-lg">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
