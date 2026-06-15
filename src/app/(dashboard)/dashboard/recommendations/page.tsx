"use client"

import { useState } from "react"
import { useJourneyStore } from "@/lib/stores/journey-store"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle2, Clock, PlayCircle, Archive, AlertCircle, FileText, ShieldCheck, Quote, Wrench } from "lucide-react"

const typeIcons = {
  content: FileText,
  technical: Wrench,
  authority: ShieldCheck,
  citation: Quote,
}

const typeColors = {
  content: "bg-blue-100 text-blue-700 border-blue-200",
  technical: "bg-violet-100 text-violet-700 border-violet-200",
  authority: "bg-amber-100 text-amber-700 border-amber-200",
  citation: "bg-emerald-100 text-emerald-700 border-emerald-200",
}

export default function RecommendationsPage() {
  const { tasks, updateTaskStatus } = useJourneyStore()
  const [filter, setFilter] = useState("all")

  const filteredTasks = filter === "all" ? tasks : tasks.filter(t => t.status === filter)
  
  const pendingCount = tasks.filter(t => t.status === "pending").length
  const inProgressCount = tasks.filter(t => t.status === "in_progress").length
  const completedCount = tasks.filter(t => t.status === "completed").length
  const totalImpact = tasks.filter(t => t.status === "completed").reduce((sum, t) => sum + t.impact, 0)
  
  const completionPercentage = Math.round((completedCount / tasks.length) * 100) || 0

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">AI Recommendations & Tasks</h2>
          <p className="text-muted-foreground">Manage and track optimization tasks to improve your AI visibility.</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={filter} onValueChange={(val) => setFilter(val || "all")}>
            <SelectTrigger className="w-45">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tasks</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">Export Report</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg"><Clock className="w-5 h-5 text-primary" /></div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Tasks</p>
                <p className="text-2xl font-bold">{pendingCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-amber-500/10 rounded-lg"><PlayCircle className="w-5 h-5 text-amber-500" /></div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold">{inProgressCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-500/10 rounded-lg"><CheckCircle2 className="w-5 h-5 text-emerald-500" /></div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">{completedCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 rounded-lg"><AlertCircle className="w-5 h-5 text-blue-500" /></div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Impact Realized</p>
                <p className="text-2xl font-bold">+{totalImpact}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Optimization Progress</CardTitle>
              <CardDescription>{completionPercentage}% of recommended optimizations completed.</CardDescription>
            </div>
            <span className="text-2xl font-bold text-primary">{completionPercentage}%</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-1000" 
              style={{ width: `${completionPercentage}%` }} 
            />
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12 border rounded-lg bg-muted/20">
            <CheckCircle2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium">All caught up</h3>
            <p className="text-muted-foreground">No tasks match your filter.</p>
          </div>
        ) : (
          filteredTasks.map(task => {
            const Icon = typeIcons[task.type]
            return (
              <Card key={task.id} className={`transition-all ${task.status === 'completed' ? 'opacity-60 bg-muted/30' : 'hover:shadow-md'}`}>
                <CardContent className="p-6 flex flex-col md:flex-row gap-6">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className={`capitalize ${typeColors[task.type]}`}>
                        <Icon className="w-3 h-3 mr-1" /> {task.type}
                      </Badge>
                      {task.priority === "high" && <Badge variant="destructive" className="text-[10px] px-1.5 py-0">High Priority</Badge>}
                    </div>
                    <h3 className="text-lg font-bold">{task.title}</h3>
                    <p className="text-muted-foreground text-sm">{task.description}</p>
                    <div className="flex gap-4 mt-4 pt-2 text-sm font-medium">
                      <span className="text-emerald-600">Impact Score: {task.impact}/100</span>
                      <span className="text-muted-foreground capitalize">Effort: {task.effort}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-row md:flex-col justify-end gap-2 shrink-0 md:min-w-35">
                    {task.status !== "pending" && (
                      <Button variant="outline" className="w-full justify-start" onClick={() => updateTaskStatus(task.id, "pending")}>
                        <Clock className="w-4 h-4 mr-2" /> Mark Pending
                      </Button>
                    )}
                    {task.status !== "in_progress" && task.status !== "completed" && (
                      <Button variant="outline" className="w-full justify-start" onClick={() => updateTaskStatus(task.id, "in_progress")}>
                        <PlayCircle className="w-4 h-4 mr-2" /> Start Task
                      </Button>
                    )}
                    {task.status !== "completed" && (
                      <Button className="w-full justify-start bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => updateTaskStatus(task.id, "completed")}>
                        <CheckCircle2 className="w-4 h-4 mr-2" /> Complete
                      </Button>
                    )}
                    {task.status === "completed" && (
                      <Button variant="ghost" className="w-full justify-start" onClick={() => updateTaskStatus(task.id, "archived")}>
                        <Archive className="w-4 h-4 mr-2" /> Archive
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>
    </div>
  )
}
