"use client"

import { useJourneyStore } from "@/lib/stores/journey-store"
import { MOCK_GAP_ANALYSIS } from "@/lib/mock-data/journey"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, ArrowRight, Target } from "lucide-react"

export default function GapsPage() {
  const { businessName, competitors } = useJourneyStore()
  
  const topCompetitor = competitors[0] || "Competitor"

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Competitor Gap Analysis</h2>
          <p className="text-muted-foreground">Identify where you are losing share of voice to your competitors.</p>
        </div>
        <Button variant="outline">Download CSV</Button>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card className="md:col-span-1 bg-muted/50">
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">Comparing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">You</div>
              <span className="font-medium text-lg">{businessName || "Your Company"}</span>
            </div>
            <div className="flex justify-center text-muted-foreground">
              vs
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold">C1</div>
              <span className="font-medium text-lg">{topCompetitor}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Top Priority Gaps</CardTitle>
            <CardDescription>Topics where your competitor dominates AI responses.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {MOCK_GAP_ANALYSIS.map((gap, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-bold flex items-center gap-2">
                    {gap.priority === "high" && <AlertTriangle className="w-4 h-4 text-red-500" />}
                    {gap.topic}
                  </span>
                  <Badge variant={gap.gap < -20 ? "destructive" : "secondary"}>Gap: {Math.abs(gap.gap)} pts</Badge>
                </div>
                <div className="h-4 w-full flex rounded-full overflow-hidden bg-muted relative">
                  {/* Competitor Bar */}
                  <div className="absolute top-0 bottom-0 left-0 bg-red-500/20" style={{ width: `${gap.competitorScore}%` }} />
                  {/* User Bar */}
                  <div className="absolute top-0 bottom-0 left-0 bg-blue-600" style={{ width: `${gap.userScore}%` }} />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>You: {gap.userScore}</span>
                  <span>Competitor: {gap.competitorScore}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Actionable Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {MOCK_GAP_ANALYSIS.filter(g => g.gap < -20).map((gap, i) => (
              <div key={i} className="p-4 border rounded-xl flex gap-4 items-start">
                <div className="p-2 bg-blue-100 rounded-lg shrink-0">
                  <Target className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-sm mb-1">Target: {gap.topic}</h4>
                  <p className="text-sm text-muted-foreground mb-3">Your competitor mentions this 3x more often in their API docs.</p>
                  <Button size="sm" variant="outline" className="w-full">Create Task <ArrowRight className="w-4 h-4 ml-2" /></Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
