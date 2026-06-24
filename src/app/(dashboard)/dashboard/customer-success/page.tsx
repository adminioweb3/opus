"use client"

import { Card, CardContent } from "@/components/ui/card"
import { mockOsData } from "@/lib/mock-data/os"
import { motion } from "framer-motion"
import { CheckCircle2, HeartHandshake, Circle } from "lucide-react"

export default function CustomerSuccessPage() {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-500 bg-emerald-500/10 border-emerald-500/20"
    if (score >= 60) return "text-primary bg-primary/10 border-primary/20"
    return "text-amber-500 bg-amber-500/10 border-amber-500/20"
  }

  const scores = [
    { label: "Product Adoption", score: mockOsData.customerSuccess.scores.productAdoption },
    { label: "GEO Maturity", score: mockOsData.customerSuccess.scores.geoMaturity },
    { label: "SEO Maturity", score: mockOsData.customerSuccess.scores.seoMaturity },
    { label: "AEO Maturity", score: mockOsData.customerSuccess.scores.aeoMaturity }
  ]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Customer Success</h2>
        <p className="text-muted-foreground mt-1">
          Track your CITATIONLY maturity and onboarding progress.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Left Col: Maturity Scores */}
        <motion.div variants={container} initial="hidden" animate="show" className="lg:col-span-2 grid gap-4 grid-cols-2">
          <div className="col-span-2 flex items-center gap-2 font-bold text-lg border-b pb-2">
            <HeartHandshake className="w-5 h-5 text-primary" /> Maturity Scores
          </div>
          
          {scores.map((s, i) => (
            <motion.div key={i} variants={item}>
              <Card className="h-full">
                <CardContent className="p-6 flex flex-col items-center justify-center text-center gap-2">
                  <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{s.label}</span>
                  <div className={`mt-2 w-24 h-24 rounded-full border-4 flex items-center justify-center text-3xl font-bold ${getScoreColor(s.score)}`}>
                    {s.score}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Right Col: Onboarding */}
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-4">
          <div className="flex items-center gap-2 font-bold text-lg border-b pb-2">
            Onboarding Checklist
          </div>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {mockOsData.customerSuccess.checklist.map((task, i) => (
                  <motion.div key={i} variants={item} className="flex items-center gap-3">
                    {task.done ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    ) : (
                      <Circle className="w-5 h-5 text-muted-foreground shrink-0" />
                    )}
                    <span className={`text-sm font-medium ${task.done ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                      {task.task}
                    </span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
