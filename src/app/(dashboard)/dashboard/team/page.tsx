"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { mockEnterpriseData } from "@/lib/mock-data/enterprise"
import { motion } from "framer-motion"
import { CheckCircle2, Clock, MessageSquare, Plus, UserPlus } from "lucide-react"

export default function TeamPage() {
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
          <h2 className="text-3xl font-bold tracking-tight">Team Collaboration</h2>
          <p className="text-muted-foreground mt-1">
            Manage assignments, tasks, and recent activity across your enterprise.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center gap-2 justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 h-9 px-4 py-2">
            <UserPlus className="w-4 h-4" /> Invite Member
          </button>
          <button className="inline-flex items-center gap-2 justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">
            <Plus className="w-4 h-4" /> New Task
          </button>
        </div>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid gap-4 lg:grid-cols-3">
        <motion.div variants={item} className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Active Tasks</CardTitle>
              <CardDescription>Current assignments mapped to team members.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Task</TableHead>
                    <TableHead>Assignee</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockEnterpriseData.team.tasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell className="font-medium">{task.title}</TableCell>
                      <TableCell>{task.assignee}</TableCell>
                      <TableCell>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          task.priority === 'High' ? 'bg-destructive/10 text-destructive' : 'bg-amber-500/10 text-amber-500'
                        }`}>
                          {task.priority}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full font-medium ${
                          task.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-500' :
                          task.status === 'In Progress' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                        }`}>
                          {task.status === 'Completed' && <CheckCircle2 className="w-3 h-3" />}
                          {task.status === 'In Progress' && <Clock className="w-3 h-3" />}
                          {task.status}
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
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Live feed of team actions.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {mockEnterpriseData.team.activityFeed.map((activity) => (
                  <div key={activity.id} className="flex gap-3">
                    <div className="shrink-0 mt-1">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                        {activity.user.charAt(0)}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-sm">
                        <span className="font-semibold text-foreground">{activity.user}</span>{' '}
                        <span className="text-muted-foreground">{activity.action}</span>{' '}
                        <span className="font-medium text-foreground">{activity.target}</span>
                      </p>
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                      {activity.comment && (
                        <div className="mt-1 p-3 rounded-md bg-muted text-sm text-muted-foreground flex gap-2">
                          <MessageSquare className="w-4 h-4 shrink-0 mt-0.5" />
                          <p>{activity.comment}</p>
                        </div>
                      )}
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
