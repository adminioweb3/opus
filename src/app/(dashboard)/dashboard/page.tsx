"use client"

import { useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, ArrowDownRight, Target, TrendingUp, Eye, MessageSquare, Quote, BarChart3, Download } from "lucide-react"
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, PieChart, Pie, Cell, BarChart, Bar } from "recharts"
import { CURRENT_SCORES, getDashboardTimeSeries, getPlatformBreakdown, TOP_CITED_PAGES, RECENT_ACTIVITY, SHARE_OF_VOICE_DATA } from "@/lib/mock-data/dashboard"
import { useUIStore } from "@/lib/stores/ui-store"
import { useAuthStore } from "@/lib/stores/auth-store"
import { useJourneyStore } from "@/lib/stores/journey-store"
import { formatNumber, formatDate } from "@/lib/utils"

const DATE_RANGES = [
  { label: "7D", value: "7d" as const },
  { label: "30D", value: "30d" as const },
  { label: "90D", value: "90d" as const },
  { label: "1Y", value: "1y" as const },
]

export default function DashboardOverviewPage() {
  const { activeDateRange, setDateRange } = useUIStore()
  const { user } = useAuthStore()
  const timeSeries = useMemo(() => getDashboardTimeSeries(activeDateRange), [activeDateRange])
  const platformBreakdown = useMemo(() => getPlatformBreakdown(), [])
  const { businessName, websiteUrl, industry, rankingGoal, tasks } = useJourneyStore()
  
  const completedTasks = tasks.filter(t => t.status === "completed").length
  const totalTasks = tasks.length
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  const kpis = [
    { title: "AI Visibility Score", value: CURRENT_SCORES.visibilityScore, suffix: "/100", change: CURRENT_SCORES.visibilityChange, icon: Eye, color: "text-primary" },
    { title: "Brand Health Score", value: CURRENT_SCORES.brandScore, suffix: "/100", change: CURRENT_SCORES.brandChange, icon: Target, color: "text-emerald-500" },
    { title: "Citation Score", value: CURRENT_SCORES.citationScore, suffix: "/100", change: CURRENT_SCORES.citationChange, icon: Quote, color: "text-blue-500" },
    { title: "Share of Voice", value: CURRENT_SCORES.shareOfVoice, suffix: "%", change: CURRENT_SCORES.sovChange, icon: BarChart3, color: "text-violet-500" },
    { title: "Total AI Mentions", value: CURRENT_SCORES.aiReach, suffix: "", change: CURRENT_SCORES.reachChange, icon: MessageSquare, color: "text-amber-500" },
    { title: "Sentiment Score", value: CURRENT_SCORES.sentimentScore, suffix: "/100", change: CURRENT_SCORES.sentimentChange, icon: TrendingUp, color: "text-emerald-500" },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Welcome back, {user?.name?.split(" ")[0] || "User"}</h2>
          <p className="text-muted-foreground mt-1">
            {businessName ? (
              <span className="flex items-center gap-2">
                <span className="font-medium">{businessName}</span>
                {websiteUrl && <span className="text-xs px-2 py-0.5 rounded-full bg-muted">{websiteUrl}</span>}
                {industry && <span className="text-xs px-2 py-0.5 rounded-full bg-muted">{industry}</span>}
              </span>
            ) : "Here's your AI visibility performance overview."}
          </p>
          {rankingGoal && (
            <div className="mt-3 text-sm bg-primary/10 text-primary border border-primary/20 px-3 py-1.5 rounded-lg inline-flex items-center">
              <Target className="w-4 h-4 mr-2" /> Goal: {rankingGoal}
            </div>
          )}
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
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {kpis.map((kpi) => (
          <Card key={kpi.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium text-muted-foreground">{kpi.title}</CardTitle>
              <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {typeof kpi.value === "number" && kpi.value > 1000 ? formatNumber(kpi.value) : kpi.value}{kpi.suffix}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className={`font-medium inline-flex items-center ${kpi.change >= 0 ? "text-emerald-500" : "text-red-500"}`}>
                  {kpi.change >= 0 ? "+" : ""}{kpi.change}%
                  {kpi.change >= 0 ? <ArrowUpRight className="w-3 h-3 ml-0.5" /> : <ArrowDownRight className="w-3 h-3 ml-0.5" />}
                </span>{" "}
                vs last period
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 lg:grid-cols-7">
        {/* Visibility Trend */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Visibility Score Trend</CardTitle>
            <CardDescription>Your aggregate brand visibility score over time.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={timeSeries.visibility}>
                  <defs>
                    <linearGradient id="colorVis" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" stroke="#888" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => { const d = new Date(v); return `${d.getMonth()+1}/${d.getDate()}` }} />
                  <YAxis stroke="#888" fontSize={11} tickLine={false} axisLine={false} domain={[0, 100]} />
                  <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid var(--color-border)", fontSize: 12 }} labelFormatter={(v) => formatDate(v)} />
                  <Area type="monotone" dataKey="value" stroke="var(--color-primary)" strokeWidth={2} fillOpacity={1} fill="url(#colorVis)" name="Visibility" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Share of Voice */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Share of Voice</CardTitle>
            <CardDescription>Your brand&apos;s presence vs competitors across AI platforms.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-48 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={SHARE_OF_VOICE_DATA} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                    {SHARE_OF_VOICE_DATA.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid var(--color-border)", fontSize: 12 }} formatter={(v: string | number | readonly (string | number)[] | undefined) => `${v}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-2">
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

      {/* Platform Performance + Activity */}
      <div className="grid gap-4 lg:grid-cols-7">
        {/* Platform Performance */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Platform Performance</CardTitle>
            <CardDescription>Visibility score breakdown by AI platform.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={platformBreakdown} layout="vertical" margin={{ left: 20 }}>
                  <XAxis type="number" domain={[0, 100]} stroke="#888" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis type="category" dataKey="name" stroke="#888" fontSize={12} tickLine={false} axisLine={false} width={80} />
                  <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid var(--color-border)", fontSize: 12 }} />
                  <Bar dataKey="visibility" radius={[0, 4, 4, 0]} name="Visibility">
                    {platformBreakdown.map((entry) => (
                      <Cell key={entry.id} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Activity Feed */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest AI visibility events and alerts.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-64 overflow-y-auto">
              {RECENT_ACTIVITY.map(item => (
                <div key={item.id} className="flex gap-3 items-start">
                  <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${
                    item.sentiment === "positive" ? "bg-emerald-500" : item.sentiment === "negative" ? "bg-red-500" : "bg-amber-500"
                  }`} />
                  <div className="min-w-0">
                    <p className="text-sm text-foreground leading-relaxed">{item.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {item.platform.charAt(0).toUpperCase() + item.platform.slice(1)} · {formatDate(item.time, "relative")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Optimization Progress</CardTitle>
                <CardDescription>Track your AI SEO task completion.</CardDescription>
              </div>
              <span className="text-2xl font-bold text-primary">{completionPercentage}%</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-3 w-full bg-muted rounded-full overflow-hidden mb-6">
              <div 
                className="h-full bg-primary rounded-full transition-all duration-1000" 
                style={{ width: `${completionPercentage}%` }} 
              />
            </div>
            <div className="space-y-4">
              {tasks.slice(0, 4).map(task => (
                <div key={task.id} className="flex justify-between items-center text-sm border-b pb-2 last:border-0">
                  <span className="font-medium truncate pr-4">{task.title}</span>
                  <span className={`px-2 py-1 rounded-full text-xs shrink-0 ${
                    task.status === "completed" ? "bg-emerald-100 text-emerald-700" :
                    task.status === "in_progress" ? "bg-amber-100 text-amber-700" :
                    "bg-muted text-muted-foreground"
                  }`}>
                    {task.status.replace("_", " ")}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Cited Pages */}
        <Card>
          <CardHeader>
            <CardTitle>Top Cited Pages</CardTitle>
            <CardDescription>Your URLs most frequently referenced by AI models.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {TOP_CITED_PAGES.map((item, i) => (
                <div key={item.url} className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary shrink-0">
                      {i + 1}
                    </div>
                    <span className="text-sm font-medium truncate">{item.url}</span>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <span className={`text-xs font-medium inline-flex items-center ${item.change >= 0 ? "text-emerald-500" : "text-red-500"}`}>
                      {item.change >= 0 ? "+" : ""}{item.change}%
                      {item.change >= 0 ? <ArrowUpRight className="w-3 h-3 ml-0.5" /> : <ArrowDownRight className="w-3 h-3 ml-0.5" />}
                    </span>
                    <span className="text-sm font-bold text-muted-foreground w-16 text-right">{formatNumber(item.citations)}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
