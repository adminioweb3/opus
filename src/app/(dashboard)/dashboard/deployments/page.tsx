"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { mockDeploymentsData } from "@/lib/mock-data/deployments"
import { motion } from "framer-motion"
import { CheckCircle2, Clock, PlayCircle, Send, XCircle } from "lucide-react"

export default function DeploymentsPage() {
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
        <h2 className="text-3xl font-bold tracking-tight">Deployment Center</h2>
        <p className="text-muted-foreground mt-1">
          Monitor and manage code and content changes pushed to connected platforms.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left Col: Active Queue */}
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-4">
          <div className="flex items-center gap-2 font-bold text-lg border-b pb-2">
            <Clock className="w-5 h-5 text-amber-500" /> Pending Queue
          </div>
          {mockDeploymentsData.deployments.queue.map((dep, i) => (
            <motion.div key={i} variants={item}>
              <Card className="hover:border-primary/50 transition-colors">
                <CardContent className="p-4 flex flex-col sm:flex-row gap-4 justify-between sm:items-center">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-muted-foreground">{dep.id}</span>
                      <span className="text-sm font-bold">{dep.type}</span>
                    </div>
                    <p className="text-sm text-muted-foreground font-mono bg-muted inline-block px-2 py-0.5 rounded">
                      {dep.target}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`text-xs px-2 py-1 rounded font-bold uppercase tracking-wider ${
                      dep.status === 'Review' ? 'bg-amber-500/10 text-amber-500' : 'bg-primary/10 text-primary'
                    }`}>
                      {dep.status}
                    </span>
                    <button className="h-8 w-8 rounded-md bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                      <PlayCircle className="w-4 h-4" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Right Col: Deployment History */}
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-4">
          <div className="flex items-center gap-2 font-bold text-lg border-b pb-2">
            <Send className="w-5 h-5 text-emerald-500" /> Deployment History
          </div>
          {mockDeploymentsData.deployments.history.map((dep, i) => (
            <motion.div key={i} variants={item}>
              <Card className="opacity-80 hover:opacity-100 transition-opacity">
                <CardContent className="p-4 flex flex-col sm:flex-row gap-4 justify-between sm:items-center">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-muted-foreground">{dep.id}</span>
                      <span className="text-sm font-bold">{dep.type}</span>
                    </div>
                    <p className="text-sm text-muted-foreground font-mono bg-muted inline-block px-2 py-0.5 rounded">
                      {dep.target}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className={`flex items-center gap-1 text-xs font-bold uppercase tracking-wider ${
                      dep.status === 'Deployed' ? 'text-emerald-500' : 'text-destructive'
                    }`}>
                      {dep.status === 'Deployed' ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                      {dep.status}
                    </span>
                    <span className="text-xs text-muted-foreground">{dep.date}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
