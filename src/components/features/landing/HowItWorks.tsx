"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Globe, Bot, Gauge, Swords, Lightbulb, Radar } from "lucide-react"
import { SectionLabel } from "./primitives/SectionLabel"

const STEPS = [
  { icon: Globe, title: "Website analysis", desc: "We crawl your site and extract the entities, claims, and structured data AI models actually read." },
  { icon: Bot, title: "AI crawling", desc: "Real prompts are run against every major AI platform to see exactly how they describe your brand today." },
  { icon: Gauge, title: "Visibility score", desc: "Every mention, citation, and omission rolls up into one real, trackable visibility score." },
  { icon: Swords, title: "Competitor comparison", desc: "See exactly who's winning the answers you should be winning, and by how much." },
  { icon: Lightbulb, title: "Recommendations", desc: "Get concrete, prioritized fixes — not generic SEO advice — ranked by real impact and effort." },
  { icon: Radar, title: "Daily monitoring", desc: "Every platform, every week, automatically — so you find out about a drop before your CEO does." },
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
            From invisible to unavoidable, <span className="text-primary">in six steps.</span>
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
