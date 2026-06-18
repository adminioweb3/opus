"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts"
import { mockIndustryBenchmarks } from "@/lib/mock-data/intelligence"
import { motion } from "framer-motion"

export default function VisibilityBenchmarksPage() {
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
        <h2 className="text-3xl font-bold tracking-tight">Industry Benchmarks</h2>
        <p className="text-muted-foreground mt-1">
          Compare your GEO performance against industry averages and top performers.
        </p>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid gap-4 md:grid-cols-3">
        <motion.div variants={item}>
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Your Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{mockIndustryBenchmarks.summary.userScore}</div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={item}>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Industry Average</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-muted-foreground">{mockIndustryBenchmarks.summary.industryAverage}</div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={item}>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Best Performer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-emerald-500">{mockIndustryBenchmarks.summary.bestPerformer}</div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Gap Analysis (Bar)</CardTitle>
            <CardDescription>Direct comparison across key GEO metrics.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockIndustryBenchmarks.gapAnalysis} layout="vertical" margin={{ left: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--color-border)" />
                  <XAxis type="number" domain={[0, 100]} stroke="#888" fontSize={12} />
                  <YAxis dataKey="metric" type="category" stroke="#888" fontSize={12} width={120} />
                  <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid var(--color-border)" }} />
                  <Legend />
                  <Bar dataKey="user" name="You" fill="var(--color-primary)" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="avg" name="Average" fill="var(--color-slate-400)" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="best" name="Best" fill="var(--color-emerald-500)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Gap Analysis (Radar)</CardTitle>
            <CardDescription>Multivariate comparison shape against competitors.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={mockIndustryBenchmarks.gapAnalysis}>
                  <PolarGrid stroke="var(--color-border)" />
                  <PolarAngleAxis dataKey="metric" tick={{ fill: "#888", fontSize: 11 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "#888", fontSize: 10 }} />
                  <Radar name="You" dataKey="user" stroke="var(--color-primary)" fill="var(--color-primary)" fillOpacity={0.5} />
                  <Radar name="Average" dataKey="avg" stroke="var(--color-slate-400)" fill="var(--color-slate-400)" fillOpacity={0.3} />
                  <Radar name="Best" dataKey="best" stroke="var(--color-emerald-500)" fill="var(--color-emerald-500)" fillOpacity={0.1} />
                  <Legend />
                  <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid var(--color-border)" }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
