"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { mockDeploymentsData } from "@/lib/mock-data/deployments"
import { motion } from "framer-motion"
import { CheckCircle2, Circle, Plug } from "lucide-react"

export default function IntegrationsPage() {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  const renderGrid = (integrations: typeof mockDeploymentsData.integrations.cms) => (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {integrations.map((int, i) => (
        <Card key={i} className="hover:border-primary/50 transition-colors group">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-xl group-hover:scale-110 transition-transform">
                {int.icon}
              </div>
              <span className={`text-xs px-2 py-1 rounded font-bold uppercase tracking-wider flex items-center gap-1 ${
                int.status === 'Connected' ? 'bg-emerald-500/10 text-emerald-500' :
                int.status === 'Error' ? 'bg-destructive/10 text-destructive' : 'bg-muted text-muted-foreground'
              }`}>
                {int.status === 'Connected' ? <CheckCircle2 className="w-3 h-3" /> : <Circle className="w-3 h-3" />}
                {int.status}
              </span>
            </div>
            <h3 className="font-bold text-lg mb-4">{int.name}</h3>
            {int.status === 'Not Connected' ? (
              <button className="w-full h-10 rounded-md bg-muted text-foreground font-medium text-sm hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center gap-2">
                <Plug className="w-4 h-4" /> Connect
              </button>
            ) : (
              <button className="w-full h-10 rounded-md border text-foreground font-medium text-sm hover:bg-muted transition-colors">
                Configure
              </button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Integration Marketplace</h2>
        <p className="text-muted-foreground mt-1">
          Connect your CMS, Headless Architecture, and Developer Platforms.
        </p>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="space-y-12">
        <motion.div variants={item} className="space-y-4">
          <div className="flex items-center gap-2 border-b pb-2">
            <h3 className="text-xl font-semibold">Content Management Systems</h3>
          </div>
          {renderGrid(mockDeploymentsData.integrations.cms)}
        </motion.div>

        <motion.div variants={item} className="space-y-4">
          <div className="flex items-center gap-2 border-b pb-2">
            <h3 className="text-xl font-semibold">Headless Architecture</h3>
          </div>
          {renderGrid(mockDeploymentsData.integrations.headless)}
        </motion.div>

        <motion.div variants={item} className="space-y-4">
          <div className="flex items-center gap-2 border-b pb-2">
            <h3 className="text-xl font-semibold">Developer Platforms</h3>
          </div>
          {renderGrid(mockDeploymentsData.integrations.dev)}
        </motion.div>
      </motion.div>
    </div>
  )
}
