"use client"

import { Card, CardContent } from "@/components/ui/card"
import { mockDeploymentsData } from "@/lib/mock-data/deployments"
import { motion } from "framer-motion"
import { AlertTriangle, PlayCircle, Search, ShieldAlert } from "lucide-react"

export default function ScannerPage() {
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
          <h2 className="text-3xl font-bold tracking-tight">Website Scanner Center</h2>
          <p className="text-muted-foreground mt-1">
            Deep scan URLs for SEO, AEO, and GEO vulnerabilities.
          </p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="https://acmecorp.com" 
              className="h-9 w-64 pl-9 pr-4 rounded-md border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>
          <button className="inline-flex items-center gap-2 justify-center rounded-md bg-primary text-primary-foreground h-9 px-6 text-sm font-bold shadow hover:bg-primary/90 transition-colors">
            <PlayCircle className="w-4 h-4" /> Run Deep Scan
          </button>
        </div>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="space-y-4">
        <h3 className="text-xl font-bold flex items-center gap-2 border-b pb-2">
          <ShieldAlert className="w-5 h-5 text-destructive" /> Identified Issues
        </h3>
        
        <div className="grid gap-4">
          {mockDeploymentsData.scanner.results.map((res, i) => (
            <motion.div key={i} variants={item}>
              <Card className="hover:border-primary/50 transition-colors">
                <CardContent className="p-4 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded font-bold uppercase tracking-wider ${
                        res.severity === 'Critical' ? 'bg-destructive/10 text-destructive' :
                        res.severity === 'High' ? 'bg-orange-500/10 text-orange-500' :
                        'bg-amber-500/10 text-amber-500'
                      }`}>
                        {res.severity}
                      </span>
                      <span className="text-xs font-mono bg-muted px-2 py-1 rounded text-muted-foreground">
                        {res.url}
                      </span>
                    </div>
                    <h4 className="text-lg font-bold">{res.issue}</h4>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <AlertTriangle className="w-4 h-4" /> {res.impact}
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:items-end gap-2">
                    <span className="font-mono text-xs font-bold text-muted-foreground bg-muted px-2 py-1 rounded uppercase tracking-widest">
                      {res.type} Issue
                    </span>
                    <button className="mt-2 h-9 px-4 rounded-md bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground font-bold text-sm transition-colors w-full md:w-auto">
                      Auto-Generate Fix
                    </button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
