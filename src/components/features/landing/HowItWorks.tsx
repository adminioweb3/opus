"use client"

import { motion } from "framer-motion"
import { Search, BrainCircuit, LineChart } from "lucide-react"
import { DataFlowBg } from "@/components/illustrations/BackgroundAssets"

const steps = [
  {
    icon: Search,
    title: "1. Monitor AI Citations",
    description: "Our engine continually queries leading LLMs to identify exactly when and how your brand is cited in AI responses."
  },
  {
    icon: BrainCircuit,
    title: "2. Analyze Sentiment & Context",
    description: "We use advanced NLP to determine if the AI's sentiment towards your brand is positive, negative, or hallucinated."
  },
  {
    icon: LineChart,
    title: "3. Optimize Share of Voice",
    description: "Actionable GEO (Generative Engine Optimization) insights help you adjust content to maximize AI recommendation frequency."
  }
]

export function HowItWorks() {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="absolute inset-0 text-accent opacity-20 pointer-events-none">
        <DataFlowBg />
      </div>
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-medium mb-4 tracking-tight">How Generative Engine Optimization Works</h2>
          <p className="text-muted-foreground text-base max-w-2xl mx-auto">
            Traditional SEO is evolving. Secure your brand&apos;s future by controlling how Artificial Intelligence perceives and recommends you.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector */}
          <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-px bg-border/50 -z-10" />
          
          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="relative z-10 flex flex-col items-center text-center"
            >
              <div className="w-24 h-24 rounded-full bg-background border border-border shadow-sm flex items-center justify-center mb-6">
                <step.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-3">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
