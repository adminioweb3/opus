"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { mockEnterpriseData } from "@/lib/mock-data/enterprise"
import { motion } from "framer-motion"

export default function BenchmarksTab() {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  // Transform data for Recharts
  const chartData = [
    {
      name: "AI Visibility Score",
      "Your Metric": mockEnterpriseData.benchmarks.userMetrics.aiVisibilityScore,
      "Industry Avg": mockEnterpriseData.benchmarks.industryAverages.aiVisibilityScore,
    },
    {
      name: "Citation Rate",
      "Your Metric": mockEnterpriseData.benchmarks.userMetrics.citationRate,
      "Industry Avg": mockEnterpriseData.benchmarks.industryAverages.citationRate,
    },
    {
      name: "Response Accuracy",
      "Your Metric": mockEnterpriseData.benchmarks.userMetrics.responseAccuracy,
      "Industry Avg": mockEnterpriseData.benchmarks.industryAverages.responseAccuracy,
    }
  ]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Benchmark Center</h2>
        <p className="text-muted-foreground mt-1">
          Compare your brand&apos;s AI search performance against aggregated industry averages.
        </p>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid gap-4">
        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle>Industry Comparison</CardTitle>
              <CardDescription>Your domain vs. the SaaS industry standard.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96 w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                    <XAxis dataKey="name" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip cursor={{ fill: 'var(--color-muted)' }} contentStyle={{ borderRadius: 8, border: "1px solid var(--color-border)" }} />
                    <Legend iconType="circle" wrapperStyle={{ paddingTop: 20 }} />
                    <Bar dataKey="Your Metric" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Industry Avg" fill="var(--color-muted-foreground)" opacity={0.3} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}
