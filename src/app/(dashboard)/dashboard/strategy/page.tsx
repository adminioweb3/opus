"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { mockOsData } from "@/lib/mock-data/os"
import { motion } from "framer-motion"
import { CheckCircle2, Map, Sparkles } from "lucide-react"

export default function StrategyPage() {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">AI Strategy Generator</h2>
        <p className="text-muted-foreground mt-1">
          Auto-generate 30/60/90 day execution roadmaps based on your competitive gaps.
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Left Col: Configurator */}
        <motion.div variants={item} className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Generation Config</CardTitle>
              <CardDescription>Configure parameters for the AI.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Industry Focus</label>
                <select className="w-full h-10 px-3 rounded-md border bg-background text-sm">
                  <option>B2B SaaS</option>
                  <option>Ecommerce</option>
                  <option>Healthcare</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Primary Goal</label>
                <select className="w-full h-10 px-3 rounded-md border bg-background text-sm">
                  <option>Maximize Perplexity Mentions</option>
                  <option>Reclaim Lost Citations</option>
                  <option>Outrank Competitor A</option>
                </select>
              </div>
              <button className="w-full inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-4 mt-4">
                <Sparkles className="w-4 h-4" /> Regenerate Strategy
              </button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Right Col: Output */}
        <motion.div variants={container} initial="hidden" animate="show" className="lg:col-span-3 space-y-6">
          <div className="flex items-center gap-2 font-bold text-lg border-b pb-2">
            <Map className="w-5 h-5 text-primary" /> Active Roadmap
          </div>
          
          <div className="grid gap-4 md:grid-cols-3">
            {mockOsData.strategy.plan.map((phase, i) => (
              <motion.div key={i} variants={item}>
                <Card className="h-full border-primary/20 relative overflow-hidden group hover:border-primary/50 transition-colors">
                  <div className="absolute top-0 left-0 w-full h-1 bg-primary/20 group-hover:bg-primary transition-colors" />
                  <CardHeader>
                    <CardTitle className="text-xl">{phase.day}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {phase.tasks.map((task, j) => (
                        <li key={j} className="flex gap-2 text-sm items-start">
                          <CheckCircle2 className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5 group-hover:text-primary transition-colors" />
                          <span className="text-muted-foreground group-hover:text-foreground transition-colors">{task}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
