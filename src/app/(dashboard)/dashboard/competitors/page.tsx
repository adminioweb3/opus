"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts"
import { mockCompetitorsData } from "@/lib/mock-data/intelligence"
import { ArrowUpRight, ArrowDownRight, Trophy, Target } from "lucide-react"
import { EmptyState } from "@/components/ui/empty-state"
import { motion } from "framer-motion"

export default function CompetitorsPage() {
  const hasCompetitors = mockCompetitorsData.shareOfVoice.length > 0;

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
        <h2 className="text-3xl font-bold tracking-tight">Competitor Monitoring</h2>
        <p className="text-muted-foreground mt-1">
          Detailed comparison of your performance against key competitors.
        </p>
      </div>

      {!hasCompetitors ? (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
          <EmptyState 
            icon={<Target className="w-8 h-8" />}
            title="No Competitors Tracked"
            description="Start monitoring your competitors to see how your AI visibility and share of voice stack up against them."
            actionLabel="Add Competitor"
            onAction={() => console.log("Add competitor clicked")}
          />
        </motion.div>
      ) : (
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
          <div className="grid gap-4 lg:grid-cols-2">
            <motion.div variants={item}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Share of Voice</CardTitle>
                  <CardDescription>Overall AI visibility market share.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={mockCompetitorsData.shareOfVoice} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={2} dataKey="value">
                          {mockCompetitorsData.shareOfVoice.map((entry) => (
                            <Cell key={entry.name} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid var(--color-border)" }} formatter={(v: any) => `${v}%`} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-2 mt-4 grid grid-cols-2 gap-x-4">
                    {mockCompetitorsData.shareOfVoice.map(dataItem => (
                      <div key={dataItem.name} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: dataItem.color }} />
                          <span className="text-muted-foreground truncate">{dataItem.name}</span>
                        </div>
                        <span className="font-medium">{dataItem.value}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Citation Share by Source Type</CardTitle>
                  <CardDescription>How you stack up in specific content categories.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={mockCompetitorsData.citationShare} layout="vertical" margin={{ left: 40 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--color-border)" />
                        <XAxis type="number" stroke="#888" fontSize={12} />
                        <YAxis dataKey="name" type="category" stroke="#888" fontSize={12} width={100} />
                        <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid var(--color-border)" }} />
                        <Legend />
                        <Bar dataKey="OPUS" stackId="a" fill="var(--color-primary)" />
                        <Bar dataKey="Comp A" stackId="a" fill="var(--color-slate-400)" />
                        <Bar dataKey="Comp B" stackId="a" fill="var(--color-slate-600)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="grid gap-4 lg:grid-cols-7">
            <motion.div variants={item} className="lg:col-span-4">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Sentiment Comparison</CardTitle>
                  <CardDescription>Breakdown of mention sentiment across competitors.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={mockCompetitorsData.sentimentComparison}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                        <XAxis dataKey="name" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid var(--color-border)" }} />
                        <Legend />
                        <Bar dataKey="positive" name="Positive" stackId="a" fill="var(--color-emerald-500)" radius={[0, 0, 4, 4]} />
                        <Bar dataKey="neutral" name="Neutral" stackId="a" fill="var(--color-slate-300)" />
                        <Bar dataKey="negative" name="Negative" stackId="a" fill="var(--color-red-500)" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item} className="lg:col-span-3">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Visibility Ranking</CardTitle>
                  <CardDescription>Current market leaderboards.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12 text-center">Rank</TableHead>
                        <TableHead>Competitor</TableHead>
                        <TableHead className="text-right">Score</TableHead>
                        <TableHead className="text-right w-20">Trend</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockCompetitorsData.ranking.map((row) => (
                        <TableRow key={row.name} className={row.name === "OPUS" ? "bg-primary/5 font-medium" : ""}>
                          <TableCell className="text-center">
                            {row.rank === 1 ? <Trophy className="w-4 h-4 text-amber-500 mx-auto" /> : row.rank}
                          </TableCell>
                          <TableCell>{row.name}</TableCell>
                          <TableCell className="text-right">{row.score}</TableCell>
                          <TableCell className="text-right">
                            <span className={`inline-flex items-center justify-end ${row.change >= 0 ? "text-emerald-500" : "text-red-500"}`}>
                              {row.change >= 0 ? "+" : ""}{row.change}
                              {row.change >= 0 ? <ArrowUpRight className="w-3 h-3 ml-0.5" /> : <ArrowDownRight className="w-3 h-3 ml-0.5" />}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
