"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, CartesianGrid, LineChart, Line, Legend } from "recharts"
import { mockPromptIntelligence } from "@/lib/mock-data/geo-aeo"
import { motion } from "framer-motion"
import { TrendingUp, Crosshair, BarChart2, Activity } from "lucide-react"

export default function PromptIntelligencePage() {
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
        <h2 className="text-3xl font-bold tracking-tight">Prompt Intelligence</h2>
        <p className="text-muted-foreground mt-1">
          Analyze user intents and discover high-value prompt opportunities.
        </p>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <motion.div variants={item}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Prompt Volume</CardTitle>
              <BarChart2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockPromptIntelligence.overview.volume}</div>
              <p className="text-xs text-emerald-500 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                {mockPromptIntelligence.overview.volumeChange} from last month
              </p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={item}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Prompt Growth</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockPromptIntelligence.overview.growth}</div>
              <p className="text-xs text-emerald-500 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                Accelerating trend
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Opportunity Score</CardTitle>
              <Crosshair className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockPromptIntelligence.overview.opportunityScore}/100</div>
              <p className="text-xs text-muted-foreground mt-1">
                Based on gap analysis
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Competition Score</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockPromptIntelligence.overview.competitionScore}/100</div>
              <p className="text-xs text-muted-foreground mt-1">
                Moderate difficulty
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid gap-4 lg:grid-cols-2">
        <motion.div variants={item}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Prompt Clusters</CardTitle>
              <CardDescription>Topic clusters mapped by search volume and competition.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis type="number" dataKey="x" name="Competition" stroke="#888" fontSize={12} />
                    <YAxis type="number" dataKey="y" name="Volume" stroke="#888" fontSize={12} />
                    <ZAxis type="number" dataKey="z" range={[100, 1000]} name="Opportunity" />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ borderRadius: 8, border: "1px solid var(--color-border)" }} />
                    <Scatter name="Clusters" data={mockPromptIntelligence.clusters}>
                      {mockPromptIntelligence.clusters.map((entry, index) => (
                        <circle key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Scatter>
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Emerging Trends</CardTitle>
              <CardDescription>Fastest growing prompt categories this week.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockPromptIntelligence.emergingTrends} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                    <XAxis dataKey="date" stroke="#888" fontSize={12} />
                    <YAxis stroke="#888" fontSize={12} />
                    <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid var(--color-border)" }} />
                    <Legend />
                    <Line type="monotone" dataKey="AI Workflow" stroke="var(--color-primary)" strokeWidth={3} dot={false} />
                    <Line type="monotone" dataKey="Agentic AI" stroke="var(--color-emerald-500)" strokeWidth={3} dot={false} />
                    <Line type="monotone" dataKey="Copilot" stroke="var(--color-purple-500)" strokeWidth={3} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}
