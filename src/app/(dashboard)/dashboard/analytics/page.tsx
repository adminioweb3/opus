"use client"

import { useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getDashboardTimeSeries } from "@/lib/mock-data/dashboard"
import { useUIStore } from "@/lib/stores/ui-store"
import { formatNumber } from "@/lib/utils"
import { Download } from "lucide-react"
import { ResponsiveContainer, Tooltip, XAxis, YAxis, Bar, BarChart, Line, LineChart, CartesianGrid } from "recharts"

const DATE_RANGES = [
  { label: "7D", value: "7d" as const },
  { label: "30D", value: "30d" as const },
  { label: "90D", value: "90d" as const },
  { label: "1Y", value: "1y" as const },
]

export default function AnalyticsPage() {
  const { activeDateRange, setDateRange } = useUIStore()
  const timeSeries = useMemo(() => getDashboardTimeSeries(activeDateRange), [activeDateRange])

  // Mock funnel data
  const funnelData = [
    { stage: "Impressions", value: 48200, color: "var(--color-primary)" },
    { stage: "Mentions", value: 12450, color: "#3B82F6" },
    { stage: "Positive", value: 8900, color: "#10B981" },
    { stage: "Citations", value: 4200, color: "#8B5CF6" },
    { stage: "Clicks", value: 1850, color: "#F59E0B" },
  ]

  // Mock geo data
  const geoData = [
    { region: "North America", visibility: 87, mentions: 4200, percentage: 42 },
    { region: "Europe", visibility: 74, mentions: 2800, percentage: 28 },
    { region: "Asia Pacific", visibility: 68, mentions: 1900, percentage: 19 },
    { region: "Latin America", visibility: 52, mentions: 700, percentage: 7 },
    { region: "Middle East & Africa", visibility: 41, mentions: 400, percentage: 4 },
  ]

  // Mock channel data
  const channelData = [
    { channel: "Direct Query", value: 4500, color: "#2563EB" },
    { channel: "Follow-up", value: 3200, color: "#3B82F6" },
    { channel: "Comparison", value: 2800, color: "#60A5FA" },
    { channel: "Recommendation", value: 1900, color: "#93C5FD" },
    { channel: "Research", value: 1050, color: "#BFDBFE" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
          <p className="text-muted-foreground">Deep-dive into your AI visibility performance metrics.</p>
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
          <Button variant="outline" size="sm"><Download className="w-4 h-4 mr-2" /> Export</Button>
        </div>
      </div>

      {/* Multi-metric Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Trends</CardTitle>
          <CardDescription>Visibility, sentiment, and citation scores over time.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timeSeries.visibility}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="date" stroke="#888" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => { const d = new Date(v); return `${d.getMonth()+1}/${d.getDate()}` }} />
                <YAxis stroke="#888" fontSize={11} tickLine={false} axisLine={false} domain={[0, 100]} />
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid var(--color-border)", fontSize: 12 }} />
                <Line data={timeSeries.visibility} type="monotone" dataKey="value" stroke="var(--color-primary)" strokeWidth={2} dot={false} name="Visibility" />
                <Line data={timeSeries.sentiment} type="monotone" dataKey="value" stroke="#10B981" strokeWidth={2} dot={false} name="Sentiment" />
                <Line data={timeSeries.citations} type="monotone" dataKey="value" stroke="#8B5CF6" strokeWidth={2} dot={false} name="Citations" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2 text-sm"><div className="w-3 h-0.5 bg-primary rounded" />Visibility</div>
            <div className="flex items-center gap-2 text-sm"><div className="w-3 h-0.5 bg-emerald-500 rounded" />Sentiment</div>
            <div className="flex items-center gap-2 text-sm"><div className="w-3 h-0.5 bg-violet-500 rounded" />Citations</div>
          </div>
        </CardContent>
      </Card>

      {/* Funnel + Channels */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Visibility Funnel</CardTitle>
            <CardDescription>From AI impressions to website clicks.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {funnelData.map((stage) => (
                <div key={stage.stage}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">{stage.stage}</span>
                    <span className="text-sm text-muted-foreground">{formatNumber(stage.value)}</span>
                  </div>
                  <div className="h-8 bg-muted rounded-lg overflow-hidden">
                    <div
                      className="h-full rounded-lg transition-all duration-500 flex items-center justify-end pr-3"
                      style={{
                        width: `${(stage.value / funnelData[0].value) * 100}%`,
                        backgroundColor: stage.color,
                      }}
                    >
                      <span className="text-xs font-bold text-white">{Math.round((stage.value / funnelData[0].value) * 100)}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Query Channels</CardTitle>
            <CardDescription>How users find your brand in AI platforms.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={channelData} layout="vertical" margin={{ left: 20 }}>
                  <XAxis type="number" stroke="#888" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis type="category" dataKey="channel" stroke="#888" fontSize={11} tickLine={false} axisLine={false} width={120} />
                  <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid var(--color-border)", fontSize: 12 }} />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]} name="Mentions" fill="var(--color-primary)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Geographic Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Geographic Distribution</CardTitle>
          <CardDescription>Visibility and mention breakdown by region.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 text-xs font-medium text-muted-foreground">Region</th>
                  <th className="text-left p-3 text-xs font-medium text-muted-foreground">Visibility</th>
                  <th className="text-left p-3 text-xs font-medium text-muted-foreground">Mentions</th>
                  <th className="text-left p-3 text-xs font-medium text-muted-foreground">Share</th>
                  <th className="text-left p-3 text-xs font-medium text-muted-foreground">Distribution</th>
                </tr>
              </thead>
              <tbody>
                {geoData.map(g => (
                  <tr key={g.region} className="border-b last:border-0">
                    <td className="p-3 font-medium text-sm">{g.region}</td>
                    <td className="p-3">
                      <span className={`text-sm font-bold ${g.visibility >= 70 ? "text-emerald-500" : g.visibility >= 50 ? "text-amber-500" : "text-red-500"}`}>
                        {g.visibility}
                      </span>
                    </td>
                    <td className="p-3 text-sm">{formatNumber(g.mentions)}</td>
                    <td className="p-3 text-sm">{g.percentage}%</td>
                    <td className="p-3">
                      <div className="h-2 w-full max-w-32 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${g.percentage}%` }} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
