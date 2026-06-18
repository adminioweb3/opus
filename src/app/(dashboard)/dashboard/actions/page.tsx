"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { mockActions } from "@/lib/mock-data/actions"
import { motion } from "framer-motion"
import { AlertCircle, Target, EyeOff, Bot, CheckCircle2, Clock } from "lucide-react"

export default function ActionCenterPage() {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "Visibility Drop": return <EyeOff className="h-5 w-5 text-amber-500" />
      case "Citation Loss": return <Target className="h-5 w-5 text-red-500" />
      case "Hallucination": return <Bot className="h-5 w-5 text-destructive" />
      case "Competitor Gain": return <AlertCircle className="h-5 w-5 text-orange-500" />
      default: return <AlertCircle className="h-5 w-5" />
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Action Center</h2>
        <p className="text-muted-foreground mt-1">
          Automated detection of critical visibility events and hallucinations.
        </p>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {mockActions.actionCards.map((action) => (
          <motion.div variants={item} key={action.id}>
            <Card className={`border-l-4 ${action.severity === 'Critical' ? 'border-l-destructive bg-destructive/5' : action.severity === 'High' ? 'border-l-orange-500' : 'border-l-amber-500'}`}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {getIcon(action.type)}
                    <span className="font-semibold text-sm">{action.type}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{action.detectedAt}</span>
                </div>
                <p className="mt-3 text-sm font-medium leading-snug">
                  {action.title}
                </p>
                <div className="mt-4 flex items-center justify-between text-xs">
                  <span className="px-2 py-1 bg-muted rounded-md font-medium">Impact: {action.impactScore}/100</span>
                  <span className="font-semibold text-primary cursor-pointer hover:underline">Take Action</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid gap-4 lg:grid-cols-3">
        <motion.div variants={item} className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Priority Queue</CardTitle>
              <CardDescription>AI-generated tasks sorted by projected impact.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Priority</TableHead>
                    <TableHead>Suggested Action</TableHead>
                    <TableHead>Engine</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockActions.priorityQueue.map((queueItem) => (
                    <TableRow key={queueItem.id}>
                      <TableCell>
                        <span className={`px-2 py-1 text-xs font-bold rounded-md ${queueItem.priority === 'P0' ? 'bg-destructive/10 text-destructive' : queueItem.priority === 'P1' ? 'bg-orange-500/10 text-orange-500' : 'bg-muted text-muted-foreground'}`}>
                          {queueItem.priority}
                        </span>
                      </TableCell>
                      <TableCell className="font-medium">{queueItem.action}</TableCell>
                      <TableCell className="text-muted-foreground">{queueItem.engine}</TableCell>
                      <TableCell className="text-right">
                        <span className={`text-xs ${queueItem.status === 'Pending Approval' ? 'text-amber-500' : 'text-emerald-500'}`}>
                          {queueItem.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>AI Workflow Timeline</CardTitle>
              <CardDescription>Real-time lifecycle of the top priority issue.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6 pl-2">
                {mockActions.workflowTimeline.map((step, index) => (
                  <div key={index} className="flex gap-4 relative">
                    {index !== mockActions.workflowTimeline.length - 1 && (
                      <div className="absolute left-2.75 top-6 -bottom-6 w-0.5 bg-border" />
                    )}
                    <div className="relative z-10 shrink-0">
                      {step.status === "completed" ? (
                        <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center animate-pulse">
                          <Clock className="w-4 h-4 text-primary-foreground" />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col pb-2">
                      <span className={`text-sm font-bold ${step.status === 'current' ? 'text-primary' : 'text-foreground'}`}>{step.stage}</span>
                      <span className="text-xs text-muted-foreground mt-0.5">{step.description}</span>
                      <span className="text-[10px] text-muted-foreground/70 mt-1">{step.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}
