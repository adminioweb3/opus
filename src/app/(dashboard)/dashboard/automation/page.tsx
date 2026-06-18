"use client"

import { Card, CardContent } from "@/components/ui/card"
import { mockDeploymentsData } from "@/lib/mock-data/deployments"
import { motion } from "framer-motion"
import { ArrowRight, Play, Plus, Zap } from "lucide-react"

export default function AutomationPage() {
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
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Automation Rules</h2>
          <p className="text-muted-foreground mt-1">
            Build Zapier-style if/then workflows to automate fixes when visibility drops.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 justify-center rounded-md bg-primary text-primary-foreground h-9 px-4 text-sm font-bold shadow hover:bg-primary/90 transition-colors">
          <Plus className="w-4 h-4" /> Create Rule
        </button>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="space-y-4">
        {mockDeploymentsData.automations.map((auto, i) => (
          <motion.div key={i} variants={item}>
            <Card className={`border-l-4 ${auto.status === 'Active' ? 'border-l-emerald-500' : 'border-l-muted'} hover:shadow-md transition-shadow`}>
              <CardContent className="p-4 sm:p-6 flex flex-col lg:flex-row lg:items-center gap-6">
                
                {/* Trigger */}
                <div className="flex-1 space-y-1">
                  <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-1">
                    <Zap className="w-3 h-3 text-amber-500" /> Trigger
                  </div>
                  <div className="font-mono text-sm bg-muted p-3 rounded-md border">
                    {auto.trigger}
                  </div>
                </div>

                <ArrowRight className="w-5 h-5 text-muted-foreground hidden lg:block" />

                {/* Condition */}
                <div className="flex-1 space-y-1">
                  <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-1">
                    Condition
                  </div>
                  <div className="font-mono text-sm bg-muted p-3 rounded-md border text-primary">
                    {auto.condition}
                  </div>
                </div>

                <ArrowRight className="w-5 h-5 text-muted-foreground hidden lg:block" />

                {/* Action */}
                <div className="flex-1 space-y-1">
                  <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-1">
                    <Play className="w-3 h-3 text-emerald-500" /> Action
                  </div>
                  <div className="font-mono text-sm bg-primary/10 text-primary font-bold p-3 rounded-md border border-primary/20">
                    {auto.action}
                  </div>
                </div>

                {/* Status Toggle */}
                <div className="flex items-center gap-3 lg:pl-6 lg:border-l">
                  <div className={`w-12 h-6 rounded-full flex items-center p-1 cursor-pointer transition-colors ${
                    auto.status === 'Active' ? 'bg-emerald-500' : 'bg-muted'
                  }`}>
                    <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${
                      auto.status === 'Active' ? 'translate-x-6' : 'translate-x-0'
                    }`} />
                  </div>
                  <span className="text-sm font-bold w-12">{auto.status}</span>
                </div>

              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
