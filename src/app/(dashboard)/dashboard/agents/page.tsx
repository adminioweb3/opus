"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { mockOsData } from "@/lib/mock-data/os"
import { motion } from "framer-motion"
import { Bot, Zap, PlayCircle, Clock } from "lucide-react"

export default function AgentsPage() {
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
        <h2 className="text-3xl font-bold tracking-tight">AI Agents System</h2>
        <p className="text-muted-foreground mt-1">
          Your autonomous fleet. Manage agents deployed to monitor and fix visibility gaps.
        </p>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {mockOsData.agents.map((agent, i) => (
          <motion.div key={i} variants={item}>
            <Card className={`h-full flex flex-col relative overflow-hidden transition-all hover:shadow-md ${agent.status === 'Active' || agent.status === 'Generating' || agent.status === 'Analyzing' ? 'border-primary/50 bg-primary/5' : ''}`}>
              {agent.status !== 'Idle' && (
                <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-primary to-indigo-500 animate-pulse" />
              )}
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 rounded-lg bg-background border flex items-center justify-center shadow-sm">
                    <Bot className={`w-5 h-5 ${agent.status === 'Idle' ? 'text-muted-foreground' : 'text-primary'}`} />
                  </div>
                  <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded tracking-wider ${
                    agent.status === 'Idle' ? 'bg-muted text-muted-foreground' : 
                    agent.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' :
                    'bg-primary/10 text-primary animate-pulse'
                  }`}>
                    {agent.status}
                  </span>
                </div>
                <CardTitle className="mt-4 text-lg">{agent.name}</CardTitle>
              </CardHeader>
              <CardContent className="mt-auto space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex flex-col">
                    <span className="text-muted-foreground text-xs">Assigned Tasks</span>
                    <span className="font-semibold">{agent.tasks}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-muted-foreground text-xs">Est. Impact</span>
                    <span className="font-semibold text-emerald-500">{agent.impact}</span>
                  </div>
                </div>
                
                <div className="pt-4 border-t flex justify-between items-center text-xs text-muted-foreground font-medium">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {agent.lastActive}</span>
                  {agent.status === 'Idle' ? (
                    <button className="flex items-center gap-1 text-primary hover:underline">
                      <PlayCircle className="w-3 h-3" /> Deploy
                    </button>
                  ) : (
                    <span className="flex items-center gap-1 text-primary">
                      <Zap className="w-3 h-3" /> Working
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
