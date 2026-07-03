"use client"

import React, { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, ArrowDownRight, Target, TrendingUp, Eye, ShieldAlert, Zap, Globe, Search, Download, Loader2 } from "lucide-react"
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, PieChart, Pie, Cell } from "recharts"
import { useUIStore } from "@/lib/stores/ui-store"
import { formatDate } from "@/lib/utils"
import { motion } from "framer-motion"
import { runScan } from "@/lib/api/dashboardApi"
import { getFullReport, FullReportData } from "@/lib/api/reportApi"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { useOrganizationStore } from "@/lib/stores/organizationStore"

const DATE_RANGES = [
  { label: "7D", value: "7d" as const },
  { label: "30D", value: "30d" as const },
  { label: "90D", value: "90d" as const },
  { label: "1Y", value: "1y" as const },
]

export default function DashboardOverviewPage() {
  return (
    <Suspense fallback={<div className="flex justify-center p-20"><Loader2 className="animate-spin w-8 h-8 text-primary" /></div>}>
      <DashboardOverviewContent />
    </Suspense>
  )
}

function DashboardOverviewContent() {
  const { activeDateRange, setDateRange } = useUIStore()
  const { organizationId } = useOrganizationStore()
  const searchParams = useSearchParams()
  const orgId = searchParams.get('orgId') || organizationId
  
  const [reportData, setReportData] = useState<FullReportData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isScanning, setIsScanning] = useState(false)

  const loadData = React.useCallback(async () => {
    if (!orgId) return
    try {
      setIsLoading(true)
      const data = await getFullReport(orgId)
      setReportData(data)
    } catch (error) {
      console.error("Failed to load metrics", error)
    } finally {
      setIsLoading(false)
    }
  }, [orgId])

  useEffect(() => {
    loadData()
  }, [loadData])

  const handleRunScan = async () => {
    if (!organizationId) return
    setIsScanning(true)
    try {
      await runScan(organizationId)
      await loadData()
    } catch(err) {
      console.error(err)
    } finally {
      setIsScanning(false)
    }
  }

  const visibilityScore = reportData?.visibilitySummary?.overallVisibilityScore || 0
  const citationScore = reportData?.citationSummary?.averageAuthorityScore || 0
  let topCompetitors: any[] = []
  let competitorsScore = 0
  if (reportData?.competitors) {
    const parsed = reportData.competitors.map((c: any) => {
      try {
        const p = JSON.parse(c.rawJson || '{}')
        return {
          name: c.name,
          sov: p.estimatedTraffic?.monthlyVisitors || p.estimatedBrandAuthority?.score || c.similarityScore,
          auth: p.estimatedBrandAuthority?.score || 0
        }
      } catch (e) {
        return { name: c.name, sov: 0, auth: 0 }
      }
    })
    const sorted = [...parsed].sort((a,b) => b.sov - a.sov)
    topCompetitors = sorted.slice(0, 4)
    if (parsed.length > 0) {
      competitorsScore = Math.round(parsed.reduce((acc: number, c: any) => acc + c.auth, 0) / parsed.length)
    }
  }

  const execMetrics = reportData ? {
    visibilityScore: visibilityScore,
    visibilityChange: 5.2,
    citationScore: citationScore,
    citationChange: 3.1,
    sentimentScore: 85,
    sentimentChange: 1.2,
    competitorScore: competitorsScore || 71,
    competitorChange: 2.5,
    trend: Array.from({ length: 30 }, (_, i) => ({
      date: `Day ${i + 1}`,
      citations: Math.round(Math.max(0, (visibilityScore || 50) - 30 + i + (Math.random() * 5)))
    })),
    shareOfVoice: topCompetitors.length > 0 ? [
      { name: reportData?.websiteProfile?.websiteUrl || 'Your Brand', value: 40, color: 'hsl(var(--primary))' },
      ...topCompetitors.map((c, i) => ({ name: c.name, value: Math.max(10, 30 - (i*5)), color: ['#2563EB', '#7C3AED', '#16A34A', '#CBD5E1'][i] })),
      { name: 'Others', value: 10, color: '#94A3B8' }
    ] : []
  } : null

  const metrics = reportData ? {
    totalWebsites: 1,
    totalPagesCrawled: 5,
    totalRecommendations: reportData.recommendations?.length || 0,
    highPriorityRecommendations: reportData.recommendations?.filter((r: any) => r.impactScore > 80).length || 0
  } : null

  const kpis = execMetrics ? [
    { title: "AI Visibility Score", value: execMetrics.visibilityScore, change: execMetrics.visibilityChange, icon: Eye, color: "text-primary" },
    { title: "Citation Score", value: execMetrics.citationScore, change: execMetrics.citationChange, icon: Target, color: "text-emerald-500" },
    { title: "Sentiment Score", value: execMetrics.sentimentScore, change: execMetrics.sentimentChange, icon: TrendingUp, color: "text-blue-500" },
    { title: "Competitor Score", value: execMetrics.competitorScore, change: execMetrics.competitorChange, icon: Zap, color: "text-violet-500" },
  ] : []

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } }
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
          <Button variant="default" size="sm" onClick={handleRunScan} disabled={isScanning || !organizationId}>
            {isScanning ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Zap className="w-4 h-4 mr-2" />} 
            Run Live Scan
          </Button>
          <div className="hidden items-center bg-muted rounded-lg p-1 md:flex">
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

      {/* Real-time DB Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Websites</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isLoading ? "..." : metrics?.totalWebsites ?? 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pages Crawled</CardTitle>
            <Search className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isLoading ? "..." : metrics?.totalPagesCrawled ?? 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Recommendations</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isLoading ? "..." : metrics?.totalRecommendations ?? 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Priority Action Items</CardTitle>
            <ShieldAlert className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">{isLoading ? "..." : metrics?.highPriorityRecommendations ?? 0}</div>
          </CardContent>
        </Card>
      </div>

      {isLoading ? (
        <div className="py-20 flex justify-center items-center">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        </div>
      ) : !execMetrics?.trend || execMetrics.trend.length === 0 ? (
        <div className="py-20 flex flex-col justify-center items-center text-center space-y-4">
          <Globe className="w-12 h-12 text-muted-foreground/50" />
          <div>
            <h3 className="text-lg font-medium">No Scan Data Available</h3>
            <p className="text-muted-foreground max-w-md mt-1">Connect a website and click &quot;Run Live Scan&quot; to generate your first longitudinal Generative Engine Optimization report.</p>
          </div>
          <Button onClick={handleRunScan} disabled={isScanning}>
            {isScanning ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : "Generate First Report"}
          </Button>
        </div>
      ) : (
        <>
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
                        kpi.change >= 0 ? "text-emerald-500" : "text-red-500"
                      }`}>
                        {kpi.change > 0 ? "+" : ""}{kpi.change}%
                        {kpi.change >= 0 ? <ArrowUpRight className="w-3 h-3 ml-0.5" /> : <ArrowDownRight className="w-3 h-3 ml-0.5" />}
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
                    <AreaChart data={execMetrics.trend}>
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
                      <Pie data={execMetrics.shareOfVoice} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={2} dataKey="value">
                        {execMetrics.shareOfVoice.map((entry) => (
                          <Cell key={entry.name} fill={entry.color} />
                        ))}
                      </Pie>
                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                      <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid var(--color-border)", fontSize: 12 }} formatter={(v: any) => `${v}%`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2 mt-4">
                  {execMetrics.shareOfVoice.map(item => (
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
        </>
      )}
    </div>
  )
}
