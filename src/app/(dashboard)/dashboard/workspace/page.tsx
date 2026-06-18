"use client"

import { Card, CardContent } from "@/components/ui/card"
import { mockOsData } from "@/lib/mock-data/os"
import { motion } from "framer-motion"
import { GripVertical, Rocket, Bot, Users } from "lucide-react"

export default function WorkspacePage() {
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
        <h2 className="text-3xl font-bold tracking-tight">AI Workspace</h2>
        <p className="text-muted-foreground mt-1">
          Your command center for executing visibility operations.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Column 1: Active Campaigns */}
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-4">
          <div className="flex items-center gap-2 font-bold text-foreground/80 mb-4 pb-2 border-b">
            <Rocket className="w-5 h-5 text-primary" /> Active Campaigns
          </div>
          {mockOsData.workspace.activeCampaigns.map((camp, i) => (
            <motion.div key={i} variants={item}>
              <Card className="hover:border-primary/50 transition-colors cursor-grab active:cursor-grabbing">
                <CardContent className="p-4 flex gap-3">
                  <GripVertical className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5 opacity-50" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm mb-2">{camp.title}</h4>
                    <div className="w-full bg-muted rounded-full h-1.5 mb-2">
                      <div className="bg-primary h-1.5 rounded-full" style={{ width: `${camp.progress}%` }} />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground font-medium">
                      <span>{camp.progress}%</span>
                      <span>Due {camp.due}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Column 2: AI Tasks */}
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-4">
          <div className="flex items-center gap-2 font-bold text-foreground/80 mb-4 pb-2 border-b">
            <Bot className="w-5 h-5 text-indigo-500" /> AI Tasks
          </div>
          {mockOsData.workspace.aiTasks.map((task, i) => (
            <motion.div key={i} variants={item}>
              <Card className="hover:border-primary/50 transition-colors cursor-grab active:cursor-grabbing">
                <CardContent className="p-4 flex gap-3">
                  <GripVertical className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5 opacity-50" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm mb-2">{task.task}</h4>
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-medium text-indigo-500 bg-indigo-500/10 px-2 py-0.5 rounded">{task.agent}</span>
                      <span className="text-muted-foreground">{task.status}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Column 3: Team Tasks */}
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-4">
          <div className="flex items-center gap-2 font-bold text-foreground/80 mb-4 pb-2 border-b">
            <Users className="w-5 h-5 text-emerald-500" /> Team Tasks
          </div>
          {mockOsData.workspace.teamTasks.map((task, i) => (
            <motion.div key={i} variants={item}>
              <Card className="hover:border-primary/50 transition-colors cursor-grab active:cursor-grabbing">
                <CardContent className="p-4 flex gap-3">
                  <GripVertical className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5 opacity-50" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm mb-2">{task.task}</h4>
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-medium text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">@{task.assignee}</span>
                      <span className="text-muted-foreground">{task.status}</span>
                    </div>
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
