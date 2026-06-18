"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { mockDeploymentsData } from "@/lib/mock-data/deployments"
import { motion } from "framer-motion"
import { Activity, Bot, Globe, Target } from "lucide-react"

export default function DeploymentAgentsPage() {
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
        <h2 className="text-3xl font-bold tracking-tight">AI Deployment Agents</h2>
        <p className="text-muted-foreground mt-1">
          Monitor autonomous agents actively pushing updates to your websites and repos.
        </p>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid lg:grid-cols-3 gap-6">
        {mockDeploymentsData.deploymentAgents.map((agent, i) => (
          <motion.div key={i} variants={item}>
            <Card className="h-full flex flex-col relative overflow-hidden transition-all hover:shadow-md border-primary/50 bg-primary/5">
              <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-primary to-emerald-500 animate-pulse" />
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      <Bot className="w-5 h-5" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{agent.name}</CardTitle>
                      <p className="text-xs mt-1 uppercase tracking-wider font-bold text-primary">
                        {agent.status}
                      </p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 flex-1">
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-1"><Activity className="w-4 h-4" /> Current Task</span>
                  </div>
                  <p className="font-medium text-sm border bg-background p-2 rounded">
                    {agent.task}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-1"><Target className="w-4 h-4" /> Target System</span>
                  </div>
                  <p className="font-mono text-xs bg-muted p-2 rounded flex items-center gap-2">
                    <Globe className="w-3 h-3 text-muted-foreground" />
                    {agent.target}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-medium mb-1">
                    <span>Task Progress</span>
                    <span>{agent.progress}%</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all duration-1000 ease-in-out" 
                      style={{ width: `${agent.progress}%` }}
                    />
                  </div>
                </div>

              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
