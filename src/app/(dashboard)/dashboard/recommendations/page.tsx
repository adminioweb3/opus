"use client"

import { Card } from "@/components/ui/card"
import { mockRecommendations } from "@/lib/mock-data/actions"
import { motion } from "framer-motion"
import { AlertTriangle, Search, Wand2, TrendingUp, ArrowRight } from "lucide-react"

export default function RecommendationsPage() {
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
        <h2 className="text-3xl font-bold tracking-tight">Recommendation Engine</h2>
        <p className="text-muted-foreground mt-1">
          Root cause analysis mapped to precise, actionable solutions.
        </p>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid gap-6">
        {mockRecommendations.map((rec) => (
          <motion.div variants={item} key={rec.id}>
            <Card className="overflow-hidden border-muted-foreground/20">
              <div className="grid md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-border">
                
                {/* 1. Issue */}
                <div className="p-6 bg-destructive/5 relative group">
                  <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[10px] font-mono text-muted-foreground bg-background px-2 py-1 rounded">{rec.id}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                    <h3 className="font-semibold text-sm">Issue Detected</h3>
                  </div>
                  <p className="text-sm font-medium leading-relaxed">{rec.issue}</p>
                </div>

                {/* 2. Root Cause */}
                <div className="p-6 bg-muted/30">
                  <div className="flex items-center gap-2 mb-3">
                    <Search className="h-5 w-5 text-amber-500" />
                    <h3 className="font-semibold text-sm">Root Cause Analysis</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{rec.rootCause}</p>
                </div>

                {/* 3. Suggested Fix */}
                <div className="p-6 bg-primary/5">
                  <div className="flex items-center gap-2 mb-3">
                    <Wand2 className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-sm">Suggested AI Fix</h3>
                  </div>
                  <p className="text-sm font-medium leading-relaxed">{rec.suggestedFix}</p>
                </div>

                {/* 4. Expected Gain */}
                <div className="p-6 bg-emerald-500/5 relative">
                  <div className="hidden md:flex absolute top-1/2 -left-3 -translate-y-1/2 w-6 h-6 rounded-full bg-background border border-border items-center justify-center z-10">
                    <ArrowRight className="w-3 h-3 text-muted-foreground" />
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="h-5 w-5 text-emerald-500" />
                    <h3 className="font-semibold text-sm">Expected Gain</h3>
                  </div>
                  <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 leading-relaxed">{rec.expectedGain}</p>
                </div>

              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
