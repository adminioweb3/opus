"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { mockDeploymentsData } from "@/lib/mock-data/deployments"
import { motion } from "framer-motion"
import { ArrowRight, Check, X } from "lucide-react"

export default function ContentReviewPage() {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  const diff = mockDeploymentsData.contentDiff

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 border-b pb-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Content Review</h2>
          <p className="text-muted-foreground mt-1">
            Review AI-generated changes before committing to deployment.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-muted px-3 py-1 rounded font-mono text-sm border">
            {diff.targetUrl}
          </div>
          <button className="h-9 px-4 rounded bg-destructive text-destructive-foreground hover:bg-destructive/90 font-medium text-sm flex items-center gap-2 transition-colors">
            <X className="w-4 h-4" /> Reject
          </button>
          <button className="h-9 px-4 rounded bg-primary text-primary-foreground hover:bg-primary/90 font-medium text-sm flex items-center gap-2 transition-colors">
            <Check className="w-4 h-4" /> Approve
          </button>
        </div>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid lg:grid-cols-2 gap-6">
        
        {/* Before */}
        <motion.div variants={item} className="space-y-4">
          <div className="flex items-center gap-2 font-bold text-destructive">
            <X className="w-5 h-5" /> Current Production
          </div>
          <Card className="border-destructive/20 bg-destructive/5">
            <CardHeader className="border-b border-destructive/10 pb-4">
              <CardTitle className="text-lg font-mono text-destructive line-through opacity-70">
                {diff.before.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-2">
                <h4 className="text-sm font-bold uppercase text-muted-foreground tracking-wider">Content Body</h4>
                <p className="font-mono text-sm leading-relaxed text-destructive line-through opacity-70">
                  {diff.before.content}
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-bold uppercase text-muted-foreground tracking-wider">JSON-LD Schema</h4>
                <pre className="p-4 rounded-md bg-background border font-mono text-xs text-destructive line-through opacity-70 overflow-x-auto">
                  {JSON.stringify(diff.before.schema, null, 2)}
                </pre>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* After */}
        <motion.div variants={item} className="space-y-4">
          <div className="flex items-center gap-2 font-bold text-emerald-500">
            <Check className="w-5 h-5" /> Proposed Changes
          </div>
          <Card className="border-emerald-500/20 bg-emerald-500/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider rounded-bl-lg">
              Optimized for AEO
            </div>
            <CardHeader className="border-b border-emerald-500/10 pb-4">
              <CardTitle className="text-lg font-mono text-emerald-600 dark:text-emerald-400">
                {diff.after.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-2">
                <h4 className="text-sm font-bold uppercase text-muted-foreground tracking-wider">Content Body</h4>
                <p className="font-mono text-sm leading-relaxed text-emerald-700 dark:text-emerald-300">
                  {diff.after.content}
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-bold uppercase text-muted-foreground tracking-wider">JSON-LD Schema</h4>
                <pre className="p-4 rounded-md bg-background border font-mono text-xs text-emerald-700 dark:text-emerald-300 overflow-x-auto">
                  {JSON.stringify(diff.after.schema, null, 2)}
                </pre>
              </div>
            </CardContent>
          </Card>
        </motion.div>

      </motion.div>
    </div>
  )
}
