"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { mockOsData } from "@/lib/mock-data/os"
import { motion } from "framer-motion"
import { Rocket, Target, CheckCircle2, Circle, TrendingUp, Plus } from "lucide-react"

export default function CampaignsPage() {
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
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Campaign Builder</h2>
          <p className="text-muted-foreground mt-1">
            Design and orchestrate multi-agent visibility campaigns.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">
          <Plus className="w-4 h-4" /> New Campaign
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column: Active Campaign Deep Dive */}
        <motion.div variants={container} initial="hidden" animate="show" className="lg:col-span-2 space-y-6">
          <motion.div variants={item}>
            <Card className="border-primary/20 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                <Rocket className="w-32 h-32" />
              </div>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  {mockOsData.campaigns.active.title} <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary font-bold uppercase tracking-wider ml-2">Active</span>
                </CardTitle>
                <CardDescription>Currently executing across 4 AI agents.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="p-4 rounded-xl bg-muted/50 border flex flex-col gap-1">
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Campaign Score</span>
                    <span className="text-3xl font-bold text-foreground">{mockOsData.campaigns.active.score}/100</span>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex flex-col gap-1">
                    <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Impact Forecast</span>
                    <span className="text-3xl font-bold text-emerald-600 flex items-center gap-2">
                      <TrendingUp className="w-6 h-6" /> {mockOsData.campaigns.active.impactForecast}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Execution Timeline</h4>
                  {mockOsData.campaigns.active.timeline.map((phase, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-8 flex justify-center relative">
                        {i !== mockOsData.campaigns.active.timeline.length - 1 && (
                          <div className="absolute top-6 -bottom-4 w-0.5 bg-border" />
                        )}
                        {phase.status === 'Complete' ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 z-10 bg-card rounded-full" />
                        ) : phase.status === 'In Progress' ? (
                          <div className="w-5 h-5 rounded-full border-2 border-primary z-10 bg-card flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                          </div>
                        ) : (
                          <Circle className="w-5 h-5 text-muted-foreground z-10 bg-card rounded-full" />
                        )}
                      </div>
                      <div className="flex-1 py-2">
                        <p className={`text-sm font-medium ${phase.status === 'Complete' ? 'text-foreground' : phase.status === 'In Progress' ? 'text-primary font-bold' : 'text-muted-foreground'}`}>
                          {phase.phase}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Right Column: Templates */}
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-4">
          <h3 className="font-bold tracking-tight mb-4">Campaign Templates</h3>
          {mockOsData.campaigns.templates.map((template, i) => (
            <motion.div key={i} variants={item}>
              <Card className="hover:border-primary/50 transition-colors cursor-pointer group">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-muted flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                      <Target className="w-4 h-4" />
                    </div>
                    <span className="font-medium text-sm">{template}</span>
                  </div>
                  <Plus className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
