"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { mockEnterpriseData } from "@/lib/mock-data/enterprise"
import { motion } from "framer-motion"
import { Briefcase, TrendingUp } from "lucide-react"

export default function CaseStudiesPage() {
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
        <h2 className="text-3xl font-bold tracking-tight">Case Studies</h2>
        <p className="text-muted-foreground mt-1">
          Real-world enterprise success stories utilizing the OPUS platform.
        </p>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockEnterpriseData.caseStudies.map((study, i) => (
          <motion.div key={i} variants={item}>
            <Card className="h-full flex flex-col hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center text-primary font-bold">
                    {study.company.charAt(0)}
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground font-medium">
                    {study.industry}
                  </span>
                </div>
                <CardTitle className="mt-4">{study.company}</CardTitle>
                <CardDescription className="line-clamp-3">
                  {study.summary}
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-auto">
                <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex flex-col gap-1">
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> Core Result
                  </span>
                  <span className="text-lg font-bold text-emerald-700 dark:text-emerald-500">
                    {study.result}
                  </span>
                </div>
                <button className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:text-primary mt-6 gap-2 border h-9">
                  <Briefcase className="w-4 h-4" /> Read Full Study
                </button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
