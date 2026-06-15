"use client"

import { MOCK_TIMELINE_GROWTH } from "@/lib/mock-data/journey"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts"
import { TrendingUp, Award, Zap } from "lucide-react"

export default function TimelinePage() {
  const currentVisibility = MOCK_TIMELINE_GROWTH[MOCK_TIMELINE_GROWTH.length - 1].visibility
  const startVisibility = MOCK_TIMELINE_GROWTH[0].visibility
  const growth = currentVisibility - startVisibility

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">AI Ranking Journey</h2>
        <p className="text-muted-foreground">Track your brand&apos;s growth in AI models over time.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card className="bg-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-2 bg-white/20 rounded-lg"><TrendingUp className="w-6 h-6" /></div>
              <h3 className="font-medium text-blue-100">Visibility Growth</h3>
            </div>
            <p className="text-4xl font-bold">+{growth} pts</p>
            <p className="text-sm text-blue-200 mt-2">Over the last 6 months</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-2 bg-emerald-100 rounded-lg"><Zap className="w-6 h-6 text-emerald-600" /></div>
              <h3 className="font-medium text-muted-foreground">Current Score</h3>
            </div>
            <p className="text-4xl font-bold text-emerald-600">{currentVisibility}</p>
            <p className="text-sm text-muted-foreground mt-2">Top 5% in your industry</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-2 bg-amber-100 rounded-lg"><Award className="w-6 h-6 text-amber-600" /></div>
              <h3 className="font-medium text-muted-foreground">AI Mentions</h3>
            </div>
            <p className="text-4xl font-bold">1,250</p>
            <p className="text-sm text-muted-foreground mt-2">Total confirmed citations</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>6-Month Visibility Trajectory</CardTitle>
          <CardDescription>Continuous compounding growth from optimization tasks.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-96 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_TIMELINE_GROWTH} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorVis" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--border))", backgroundColor: "hsl(var(--background))" }}
                  itemStyle={{ color: "hsl(var(--foreground))" }}
                />
                <Area type="monotone" dataKey="visibility" stroke="#2563EB" strokeWidth={3} fillOpacity={1} fill="url(#colorVis)" name="Visibility Score" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
