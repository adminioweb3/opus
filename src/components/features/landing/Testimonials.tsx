"use client"

import { Quote } from "lucide-react"

const testimonials = [
  {
    quote: "CITATIONLY fundamentally changed how we measure our digital presence. Traditional SEO is dead; AI visibility is all that matters now.",
    author: "Sarah Jenkins",
    role: "CMO, TechNova",
  },
  {
    quote: "We caught a hallucination in ChatGPT that was recommending a competitor's inferior product. CITATIONLY alerted us instantly so we could correct the narrative.",
    author: "Marcus Chen",
    role: "VP of Comms, FinServe",
  },
  {
    quote: "The Share of Voice dashboard gives our executive team a clear picture of our market dominance across all major LLMs. It's investor-grade analytics.",
    author: "Elena Rodriguez",
    role: "Director of Marketing, CloudScale",
  }
]

export function Testimonials() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">Loved by industry leaders</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, i) => (
            <div key={i} className="glass-card p-8 rounded-3xl relative">
              <Quote className="w-10 h-10 text-primary/20 absolute top-8 right-8" />
              <p className="text-lg leading-relaxed mb-8 relative z-10 text-foreground/90">
                "{item.quote}"
              </p>
              <div>
                <h4 className="font-bold text-foreground">{item.author}</h4>
                <p className="text-sm text-muted-foreground">{item.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
