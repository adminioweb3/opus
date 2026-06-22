"use client"

import { useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, ArrowDownRight, Target, TrendingUp, Eye, ShieldAlert, Zap, Globe, Search, Download } from "lucide-react"
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, PieChart, Pie, Cell, BarChart, Bar } from "recharts"
import { mockExecutiveScores, mockCitationsData, mockPlatformComparison } from "@/lib/mock-data/intelligence"
import { SHARE_OF_VOICE_DATA } from "@/lib/mock-data/dashboard"
import { useUIStore } from "@/lib/stores/ui-store"
import { useAuthStore } from "@/lib/stores/auth-store"
import { formatNumber, formatDate } from "@/lib/utils"
import { motion } from "framer-motion"

const DATE_RANGES = [
  { label: "7D", value: "7d" as const },
  { label: "30D", value: "30d" as const },
  { label: "90D", value: "90d" as const },
  { label: "1Y", value: "1y" as const },
]

export default function DashboardOverviewPage() {
  const { activeDateRange, setDateRange } = useUIStore()
  const { user } = useAuthStore()

  const kpis = [
    { title: "AI Visibility Score", value: mockExecutiveScores.visibilityScore, change: mockExecutiveScores.visibilityChange, icon: Eye, color: "text-primary" },
    { title: "Citation Score", value: mockExecutiveScores.citationScore, change: mockExecutiveScores.citationChange, icon: Target, color: "text-emerald-500" },
    { title: "Sentiment Score", value: mockExecutiveScores.sentimentScore, change: mockExecutiveScores.sentimentChange, icon: TrendingUp, color: "text-blue-500" },
    { title: "Competitor Score", value: mockExecutiveScores.competitorScore, change: mockExecutiveScores.competitorChange, icon: Zap, color: "text-violet-500" },
    { title: "Hallucination Risk", value: mockExecutiveScores.hallucinationRisk, change: mockExecutiveScores.hallucinationRiskChange, icon: ShieldAlert, color: "text-amber-500" },
    { title: "SEO Health", value: mockExecutiveScores.seoHealth, change: mockExecutiveScores.seoHealthChange, icon: Globe, color: "text-emerald-500" },
    { title: "AEO Readiness", value: mockExecutiveScores.aeoReadiness, change: mockExecutiveScores.aeoReadinessChange, icon: Search, color: "text-indigo-500" },
    { title: "GEO Readiness", value: mockExecutiveScores.geoReadiness, change: mockExecutiveScores.geoReadinessChange, icon: Target, color: "text-pink-500" },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Executive GEO Dashboard</h2>
          <p className="text-muted-foreground mt-1">
            Real-time insights into your Generative Engine Optimization performance.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-muted rounded-lg p-1">
            {DATE_RANGES.map(range => (
              <button
                key={range.value}
                onClick={() => setDateRange(range.value)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  activeDateRange === range.value ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" /> Export
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <motion.div variants={container} initial="hidden" animate="show" className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <motion.div key={kpi.title} variants={item}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground">{kpi.title}</CardTitle>
                <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {kpi.value}/100
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className={`font-medium inline-flex items-center ${
                    kpi.title === "Hallucination Risk" 
                      ? (kpi.change <= 0 ? "text-emerald-500" : "text-red-500") 
                      : (kpi.change >= 0 ? "text-emerald-500" : "text-red-500")
                  }`}>
                    {kpi.change >= 0 ? "+" : ""}{kpi.change}%
                    {kpi.title === "Hallucination Risk" 
                      ? (kpi.change <= 0 ? <ArrowDownRight className="w-3 h-3 ml-0.5" /> : <ArrowUpRight className="w-3 h-3 ml-0.5" />)
                      : (kpi.change >= 0 ? <ArrowUpRight className="w-3 h-3 ml-0.5" /> : <ArrowDownRight className="w-3 h-3 ml-0.5" />)
                    }
                  </span>{" "}
                  vs last period
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid gap-4 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>AI Visibility Trend</CardTitle>
            <CardDescription>Aggregate visibility score over the selected timeframe.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockCitationsData.trend}>
                  <defs>
                    <linearGradient id="colorVis" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" stroke="#888" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => { const d = new Date(v); return `${d.getMonth()+1}/${d.getDate()}` }} />
                  <YAxis stroke="#888" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid var(--color-border)", fontSize: 12 }} labelFormatter={(v) => formatDate(v)} />
                  <Area type="monotone" dataKey="citations" stroke="var(--color-primary)" strokeWidth={2} fillOpacity={1} fill="url(#colorVis)" name="Visibility" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Share of Voice</CardTitle>
            <CardDescription>Brand visibility compared to top competitors.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-52 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={SHARE_OF_VOICE_DATA} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={2} dataKey="value">
                    {SHARE_OF_VOICE_DATA.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid var(--color-border)", fontSize: 12 }} formatter={(v: any) => `${v}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-4">
              {SHARE_OF_VOICE_DATA.map(item => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-muted-foreground">{item.name}</span>
                  </div>
                  <span className="font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
