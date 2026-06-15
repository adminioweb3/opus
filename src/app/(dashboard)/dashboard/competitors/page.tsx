"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MOCK_COMPETITORS, type Competitor } from "@/lib/mock-data/competitors"
import { CURRENT_SCORES } from "@/lib/mock-data/dashboard"
import { usePermission } from "@/components/auth/PermissionGate"
import { Plus, Trash2, ArrowUpRight, ArrowDownRight, Trophy, Target, Eye, MessageSquare } from "lucide-react"
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts"

export default function CompetitorsPage() {
  const [competitors, setCompetitors] = useState<Competitor[]>(MOCK_COMPETITORS)
  const [showAdd, setShowAdd] = useState(false)
  const [newName, setNewName] = useState("")
  const [newDomain, setNewDomain] = useState("")
  const canCreate = usePermission("competitors.create")
  const canDelete = usePermission("competitors.delete")

  const handleAdd = () => {
    if (!newName.trim() || !newDomain.trim()) return
    const newComp: Competitor = {
      id: `comp_${Date.now()}`,
      name: newName,
      domain: newDomain,
      industry: "General",
      logo: newName.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2),
      visibilityScore: Math.round(Math.random() * 40 + 30),
      shareOfVoice: Math.round(Math.random() * 15 + 2),
      citationCount: Math.round(Math.random() * 5000 + 500),
      sentimentScore: Math.round(Math.random() * 20 + 65),
      trend: Math.round((Math.random() * 6 - 3) * 10) / 10,
      addedAt: new Date().toISOString(),
      platforms: { chatgpt: Math.round(Math.random() * 30 + 40), gemini: Math.round(Math.random() * 30 + 35), claude: Math.round(Math.random() * 30 + 30), perplexity: Math.round(Math.random() * 30 + 40), grok: Math.round(Math.random() * 30 + 25) },
    }
    setCompetitors([...competitors, newComp])
    setNewName("")
    setNewDomain("")
    setShowAdd(false)
  }

  // Build comparison chart data
  const comparisonData = [
    { name: "Your Brand", visibility: CURRENT_SCORES.visibilityScore, sov: CURRENT_SCORES.shareOfVoice, sentiment: CURRENT_SCORES.sentimentScore, fill: "var(--color-primary)" },
    ...competitors.slice(0, 6).map(c => ({
      name: c.name.length > 12 ? c.name.slice(0, 12) + "…" : c.name,
      visibility: c.visibilityScore,
      sov: c.shareOfVoice,
      sentiment: c.sentimentScore,
      fill: "#94A3B8",
    })),
  ]

  const radarData = [
    { metric: "Visibility", you: CURRENT_SCORES.visibilityScore, ...Object.fromEntries(competitors.slice(0, 3).map(c => [c.name, c.visibilityScore])) },
    { metric: "SoV", you: CURRENT_SCORES.shareOfVoice * 2.5, ...Object.fromEntries(competitors.slice(0, 3).map(c => [c.name, c.shareOfVoice * 2.5])) },
    { metric: "Sentiment", you: CURRENT_SCORES.sentimentScore, ...Object.fromEntries(competitors.slice(0, 3).map(c => [c.name, c.sentimentScore])) },
    { metric: "Citations", you: 85, ...Object.fromEntries(competitors.slice(0, 3).map(c => [c.name, Math.min(100, c.citationCount / 150)])) },
    { metric: "Reach", you: 78, ...Object.fromEntries(competitors.slice(0, 3).map(c => [c.name, Math.round(Math.random() * 30 + 40)])) },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Competitive Intelligence</h2>
          <p className="text-muted-foreground">Compare your AI visibility against competitors.</p>
        </div>
        {canCreate && (
          <Button onClick={() => setShowAdd(!showAdd)}>
            <Plus className="w-4 h-4 mr-2" /> Add Competitor
          </Button>
        )}
      </div>

      {showAdd && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-3">
              <Input placeholder="Company name" value={newName} onChange={e => setNewName(e.target.value)} />
              <Input placeholder="domain.com" value={newDomain} onChange={e => setNewDomain(e.target.value)} onKeyDown={e => e.key === "Enter" && handleAdd()} />
              <Button onClick={handleAdd}>Add</Button>
              <Button variant="outline" onClick={() => setShowAdd(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Visibility Comparison Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Visibility Score Comparison</CardTitle>
          <CardDescription>Your AI visibility score vs competitors across all platforms.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparisonData}>
                <XAxis dataKey="name" stroke="#888" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#888" fontSize={11} tickLine={false} axisLine={false} domain={[0, 100]} />
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid var(--color-border)", fontSize: 12 }} />
                <Bar dataKey="visibility" radius={[4, 4, 0, 0]} name="Visibility Score">
                  {comparisonData.map((entry, i) => (
                    <rect key={i} fill={i === 0 ? "var(--color-primary)" : "#94A3B8"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Competitor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {competitors.map(comp => (
          <Card key={comp.id}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-sm font-bold">
                    {comp.logo}
                  </div>
                  <div>
                    <div className="font-semibold">{comp.name}</div>
                    <div className="text-xs text-muted-foreground">{comp.domain}</div>
                  </div>
                </div>
                {canDelete && (
                  <Button variant="ghost" size="sm" onClick={() => setCompetitors(competitors.filter(c => c.id !== comp.id))}>
                    <Trash2 className="w-4 h-4 text-muted-foreground" />
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1"><Eye className="w-3 h-3" /> Visibility</div>
                  <div className="text-lg font-bold">{comp.visibilityScore}</div>
                </div>
                <div className="p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1"><Target className="w-3 h-3" /> Share of Voice</div>
                  <div className="text-lg font-bold">{comp.shareOfVoice}%</div>
                </div>
                <div className="p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1"><MessageSquare className="w-3 h-3" /> Citations</div>
                  <div className="text-lg font-bold">{(comp.citationCount / 1000).toFixed(1)}k</div>
                </div>
                <div className="p-3 rounded-lg bg-muted/50">
                  <div className="text-xs text-muted-foreground mb-1">Trend</div>
                  <div className={`text-lg font-bold inline-flex items-center ${comp.trend >= 0 ? "text-emerald-500" : "text-red-500"}`}>
                    {comp.trend >= 0 ? "+" : ""}{comp.trend}%
                    {comp.trend >= 0 ? <ArrowUpRight className="w-4 h-4 ml-1" /> : <ArrowDownRight className="w-4 h-4 ml-1" />}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
