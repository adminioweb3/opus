"use client"

import { Card, CardContent } from "@/components/ui/card"
import { mockDeploymentsData } from "@/lib/mock-data/deployments"
import { motion } from "framer-motion"
import { CheckCircle2, Send, Wand2 } from "lucide-react"

export default function CMSPublishingPage() {
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
        <h2 className="text-3xl font-bold tracking-tight">CMS Publishing</h2>
        <p className="text-muted-foreground mt-1">
          Review generated drafts and publish them directly to your connected CMS platforms.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        
        {/* Queue */}
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-4">
          <div className="flex items-center gap-2 font-bold text-lg border-b pb-2">
            <Wand2 className="w-5 h-5 text-primary animate-pulse" /> Content Queue
          </div>
          {mockDeploymentsData.cmsPublishing.queue.map((content, i) => (
            <motion.div key={i} variants={item}>
              <Card className="hover:border-primary/50 transition-colors">
                <CardContent className="p-4 flex flex-col sm:flex-row gap-4 justify-between sm:items-center">
                  <div className="space-y-1">
                    <h4 className="font-bold">{content.title}</h4>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="bg-muted px-2 py-0.5 rounded font-medium text-foreground">{content.cms}</span>
                      <span>•</span>
                      <span>{content.type}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs px-2 py-1 rounded font-bold uppercase tracking-wider ${
                      content.status === 'Pending Review' ? 'bg-amber-500/10 text-amber-500' : 'bg-primary/10 text-primary'
                    }`}>
                      {content.status}
                    </span>
                    <button className="h-8 px-3 rounded-md bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition-colors flex items-center gap-1">
                      <Send className="w-3 h-3" /> Publish
                    </button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Published */}
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-4">
          <div className="flex items-center gap-2 font-bold text-lg border-b pb-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" /> Successfully Published
          </div>
          {mockDeploymentsData.cmsPublishing.published.map((content, i) => (
            <motion.div key={i} variants={item}>
              <Card className="opacity-70 hover:opacity-100 transition-opacity">
                <CardContent className="p-4 flex flex-col sm:flex-row gap-4 justify-between sm:items-center">
                  <div className="space-y-1">
                    <h4 className="font-bold text-muted-foreground line-through">{content.title}</h4>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="bg-muted px-2 py-0.5 rounded font-medium">{content.cms}</span>
                    </div>
                  </div>
                  <div className="text-xs font-bold text-emerald-500 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Published {content.date}
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
