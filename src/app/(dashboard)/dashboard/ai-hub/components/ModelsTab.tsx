"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getPlatformBreakdown } from "@/lib/mock-data/dashboard"
import { MOCK_PROMPTS } from "@/lib/mock-data/prompts"
import { Eye, ThumbsUp, ThumbsDown, Quote, BrainCircuit } from "lucide-react"
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const platformMeta: Record<string, { id: string; name: string; description: string; color: string; bgColor: string }> = {
  chatgpt: { id: "chatgpt", name: "ChatGPT", description: "OpenAI's flagship conversational AI", color: "#10A37F", bgColor: "bg-[#10A37F]/10" },
  gemini: { id: "gemini", name: "Gemini", description: "Google DeepMind's AI assistant", color: "#4285F4", bgColor: "bg-[#4285F4]/10" },
  claude: { id: "claude", name: "Claude", description: "Anthropic's AI assistant", color: "#D97757", bgColor: "bg-[#D97757]/10" },
  perplexity: { id: "perplexity", name: "Perplexity", description: "AI-powered search engine", color: "#22B8CD", bgColor: "bg-[#22B8CD]/10" },
}

export default function ModelsTab() {
  const [platform, setPlatform] = useState("chatgpt")
  const meta = platformMeta[platform] ?? platformMeta.chatgpt
  const platforms = useMemo(() => getPlatformBreakdown(), [])
  const currentPlatform = platforms.find(p => p.id === platform)

  // Get responses for this platform
  const platformResponses = MOCK_PROMPTS.flatMap(p =>
    p.responses.filter(r => r.platform === platform).map(r => ({ ...r, prompt: p.prompt, promptId: p.id }))
  )

  // Mock trend data
  const trendData = useMemo(() => Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 86400000).toISOString(),
    visibility: Math.round(50 + Math.random() * 30 + i * 0.3),
    mentions: Math.round(20 + Math.random() * 40 + i * 0.5),
  })), [platform])

  const stats = {
    visibility: currentPlatform?.visibility ?? 0,
    mentions: platformResponses.filter(r => r.brandMentioned).length,
    positive: platformResponses.filter(r => r.sentiment === "positive").length,
    negative: platformResponses.filter(r => r.sentiment === "negative").length,
    citations: platformResponses.reduce((a, r) => a + r.citationUrls.length, 0),
    avgConfidence: platformResponses.length > 0 ? Math.round(platformResponses.reduce((a, r) => a + r.confidenceScore, 0) / platformResponses.length) : 0,
  }

  return (
    <div className="space-y-6">
      {/* Model Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {Object.values(platformMeta).map(p => (
          <button
            key={p.id}
            onClick={() => setPlatform(p.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap border ${platform === p.id ? 'bg-primary text-primary-foreground border-primary shadow-md' : 'bg-background hover:bg-muted text-muted-foreground'}`}
          >
            {p.name}
          </button>
        ))}
      </div>

      <div className="flex items-start gap-4 pt-4">
        <div className={`w-14 h-14 rounded-2xl ${meta.bgColor} flex items-center justify-center`}>
          <BrainCircuit className="w-7 h-7" style={{ color: meta.color }} />
        </div>
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{meta.name}</h2>
          <p className="text-muted-foreground">{meta.description}</p>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card><CardContent className="pt-6"><div className="text-xs text-muted-foreground mb-1">Visibility</div><div className="text-2xl font-bold" style={{ color: meta.color }}>{stats.visibility}</div></CardContent></Card>
        <Card><CardContent className="pt-6"><div className="text-xs text-muted-foreground mb-1">Mentions</div><div className="text-2xl font-bold">{stats.mentions}</div></CardContent></Card>
        <Card><CardContent className="pt-6"><div className="text-xs text-muted-foreground mb-1 flex items-center gap-1"><ThumbsUp className="w-3 h-3 text-emerald-500" /> Positive</div><div className="text-2xl font-bold text-emerald-500">{stats.positive}</div></CardContent></Card>
        <Card><CardContent className="pt-6"><div className="text-xs text-muted-foreground mb-1 flex items-center gap-1"><ThumbsDown className="w-3 h-3 text-red-500" /> Negative</div><div className="text-2xl font-bold text-red-500">{stats.negative}</div></CardContent></Card>
        <Card><CardContent className="pt-6"><div className="text-xs text-muted-foreground mb-1">Citations</div><div className="text-2xl font-bold">{stats.citations}</div></CardContent></Card>
        <Card><CardContent className="pt-6"><div className="text-xs text-muted-foreground mb-1">Confidence</div><div className="text-2xl font-bold">{stats.avgConfidence}%</div></CardContent></Card>
      </div>

      {/* Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle>{meta.name} Visibility Trend</CardTitle>
          <CardDescription>Daily visibility score on this platform.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="modelGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={meta.color} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={meta.color} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" stroke="#888" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => { const d = new Date(v); return `${d.getMonth()+1}/${d.getDate()}` }} />
                <YAxis stroke="#888" fontSize={11} tickLine={false} axisLine={false} domain={[0, 100]} />
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid var(--color-border)", fontSize: 12 }} />
                <Area type="monotone" dataKey="visibility" stroke={meta.color} strokeWidth={2} fill="url(#modelGrad)" name="Visibility" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Recent Responses */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Responses</CardTitle>
          <CardDescription>Latest responses from {meta.name} for monitored prompts.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {platformResponses.slice(0, 8).map((r, i) => (
              <div key={i} className="p-4 rounded-xl bg-muted/30 border border-border">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">&quot;{r.prompt}&quot;</span>
                  <div className="flex items-center gap-2 shrink-0 ml-4">
                    <Badge variant="outline" className={`text-xs ${r.sentiment === "positive" ? "text-emerald-600" : r.sentiment === "negative" ? "text-red-600" : "text-amber-600"}`}>
                      {r.sentiment}
                    </Badge>
                    <span className="text-xs font-bold">{r.visibilityScore}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{r.response}</p>
                <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                  {r.brandMentioned && <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> Mentioned</span>}
                  {r.citationUrls.length > 0 && <span className="flex items-center gap-1"><Quote className="w-3 h-3" /> {r.citationUrls.length} citation(s)</span>}
                  {r.position && <span>Position #{r.position}</span>}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
