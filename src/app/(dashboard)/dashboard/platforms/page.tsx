"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { mockPlatformComparison } from "@/lib/mock-data/intelligence"
import { motion } from "framer-motion"

export default function PlatformComparisonPage() {
  const colors = ["#10b981", "#3b82f6", "#8b5cf6"] // Let's use 3 colors for A, B, C which represent top platforms
  
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.2 } }
  }

  const item = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Platform Comparison</h2>
        <p className="text-muted-foreground mt-1">
          Detailed performance breakdown across leading generative engines.
        </p>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid gap-4 lg:grid-cols-2">
        <motion.div variants={item} className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Multivariate Capability Analysis</CardTitle>
              <CardDescription>Compare key performance indicators across ChatGPT (A), Gemini (B), and Claude (C).</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-125 w-full flex items-center justify-center bg-muted/20 rounded-xl p-4">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="75%" data={mockPlatformComparison.radarData}>
                    <PolarGrid stroke="var(--color-border)" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: "#888", fontSize: 13 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "#888", fontSize: 11 }} />
                    <Radar name="ChatGPT" dataKey="A" stroke={colors[0]} fill={colors[0]} fillOpacity={0.4} />
                    <Radar name="Gemini" dataKey="B" stroke={colors[1]} fill={colors[1]} fillOpacity={0.4} />
                    <Radar name="Claude" dataKey="C" stroke={colors[2]} fill={colors[2]} fillOpacity={0.4} />
                    <Legend wrapperStyle={{ paddingTop: "20px" }} />
                    <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid var(--color-border)", backgroundColor: "var(--color-background)" }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}
