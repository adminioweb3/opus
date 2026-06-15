"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MOCK_PROMPTS, type MonitoredPrompt, type PromptResponse } from "@/lib/mock-data/prompts"
import { usePermission } from "@/components/auth/PermissionGate"
import { Plus, Search, Filter, Play, Pause, Trash2, Eye, ChevronDown, ChevronUp, ExternalLink } from "lucide-react"
import { formatDate } from "@/lib/utils"

const platformColors: Record<string, string> = {
  chatgpt: "bg-[#10A37F]/10 text-[#10A37F]",
  gemini: "bg-[#4285F4]/10 text-[#4285F4]",
  claude: "bg-[#D97757]/10 text-[#D97757]",
  perplexity: "bg-[#22B8CD]/10 text-[#22B8CD]",
  grok: "bg-neutral-100 text-neutral-800",
}

const sentimentColors = {
  positive: "bg-emerald-100 text-emerald-700",
  neutral: "bg-amber-100 text-amber-700",
  negative: "bg-red-100 text-red-700",
}

export default function MonitoringPage() {
  const [prompts, setPrompts] = useState<MonitoredPrompt[]>(MOCK_PROMPTS)
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedPrompt, setExpandedPrompt] = useState<string | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [newPrompt, setNewPrompt] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "paused" | "archived">("all")
  const canCreate = usePermission("monitoring.create")
  const canDelete = usePermission("monitoring.delete")

  const filtered = prompts.filter(p => {
    if (filterStatus !== "all" && p.status !== filterStatus) return false
    if (searchQuery && !p.prompt.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const handleAddPrompt = () => {
    if (!newPrompt.trim()) return
    const mockPrompt: MonitoredPrompt = {
      id: `prm_${Date.now()}`,
      prompt: newPrompt,
      category: "Custom",
      status: "active",
      createdAt: new Date().toISOString(),
      lastChecked: new Date().toISOString(),
      frequency: "daily",
      responses: [
        { platform: "chatgpt", response: "Generating response...", brandMentioned: false, sentiment: "neutral", citationUrls: [], visibilityScore: 0, confidenceScore: 0, checkedAt: new Date().toISOString(), position: null },
        { platform: "gemini", response: "Generating response...", brandMentioned: false, sentiment: "neutral", citationUrls: [], visibilityScore: 0, confidenceScore: 0, checkedAt: new Date().toISOString(), position: null },
        { platform: "claude", response: "Generating response...", brandMentioned: false, sentiment: "neutral", citationUrls: [], visibilityScore: 0, confidenceScore: 0, checkedAt: new Date().toISOString(), position: null },
        { platform: "perplexity", response: "Generating response...", brandMentioned: false, sentiment: "neutral", citationUrls: [], visibilityScore: 0, confidenceScore: 0, checkedAt: new Date().toISOString(), position: null },
        { platform: "grok", response: "Generating response...", brandMentioned: false, sentiment: "neutral", citationUrls: [], visibilityScore: 0, confidenceScore: 0, checkedAt: new Date().toISOString(), position: null },
      ],
    }
    setPrompts([mockPrompt, ...prompts])
    setNewPrompt("")
    setShowAddModal(false)
  }

  const toggleStatus = (id: string) => {
    setPrompts(prompts.map(p => p.id === id ? { ...p, status: p.status === "active" ? "paused" : "active" } : p))
  }

  const deletePrompt = (id: string) => {
    setPrompts(prompts.filter(p => p.id !== id))
  }

  const avgScore = (responses: PromptResponse[]) => {
    const scores = responses.filter(r => r.visibilityScore > 0)
    if (scores.length === 0) return 0
    return Math.round(scores.reduce((a, b) => a + b.visibilityScore, 0) / scores.length)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">AI Monitoring</h2>
          <p className="text-muted-foreground">Track how AI platforms respond to key prompts about your brand.</p>
        </div>
        {canCreate && (
          <Button onClick={() => setShowAddModal(true)}>
            <Plus className="w-4 h-4 mr-2" /> Add Prompt
          </Button>
        )}
      </div>

      {/* Add Prompt Modal */}
      {showAddModal && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-3">
              <Input placeholder="Enter a prompt to monitor, e.g. 'What are the best AI visibility tools?'" value={newPrompt} onChange={e => setNewPrompt(e.target.value)} onKeyDown={e => e.key === "Enter" && handleAddPrompt()} className="flex-1" />
              <Button onClick={handleAddPrompt}>Monitor</Button>
              <Button variant="outline" onClick={() => setShowAddModal(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search prompts..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-9" />
        </div>
        <div className="flex items-center bg-muted rounded-lg p-1">
          {(["all", "active", "paused", "archived"] as const).map(s => (
            <button key={s} onClick={() => setFilterStatus(s)} className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors capitalize ${filterStatus === s ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Prompts List */}
      <div className="space-y-4">
        {filtered.map(prompt => (
          <Card key={prompt.id} className="overflow-hidden">
            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge variant={prompt.status === "active" ? "default" : "secondary"} className="text-xs capitalize">{prompt.status}</Badge>
                    <Badge variant="outline" className="text-xs">{prompt.category}</Badge>
                    <span className="text-xs text-muted-foreground">Checked {formatDate(prompt.lastChecked, "relative")}</span>
                  </div>
                  <p className="font-medium text-foreground">{prompt.prompt}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <div className="text-right mr-4">
                    <div className="text-2xl font-bold">{avgScore(prompt.responses)}</div>
                    <div className="text-xs text-muted-foreground">Avg Score</div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => toggleStatus(prompt.id)}>
                    {prompt.status === "active" ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                  {canDelete && (
                    <Button variant="ghost" size="sm" onClick={() => deletePrompt(prompt.id)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" onClick={() => setExpandedPrompt(expandedPrompt === prompt.id ? null : prompt.id)}>
                    {expandedPrompt === prompt.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              {/* Platform summary pills */}
              <div className="flex flex-wrap gap-2 mt-4">
                {prompt.responses.map(r => (
                  <div key={r.platform} className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium ${platformColors[r.platform]}`}>
                    <span className="capitalize">{r.platform}</span>
                    <span className="font-bold">{r.visibilityScore}</span>
                    {r.brandMentioned && <Eye className="w-3 h-3" />}
                  </div>
                ))}
              </div>
            </div>

            {/* Expanded Responses */}
            {expandedPrompt === prompt.id && (
              <div className="border-t">
                {prompt.responses.map(r => (
                  <div key={r.platform} className="p-6 border-b last:border-b-0 bg-muted/20">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Badge className={`${platformColors[r.platform]} border-0 capitalize`}>{r.platform}</Badge>
                        <Badge className={`${sentimentColors[r.sentiment]} border-0 capitalize text-xs`}>{r.sentiment}</Badge>
                        {r.brandMentioned && <Badge variant="outline" className="text-xs">Brand Mentioned</Badge>}
                        {r.position && <Badge variant="outline" className="text-xs">Position #{r.position}</Badge>}
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-muted-foreground">Visibility: <span className="font-bold text-foreground">{r.visibilityScore}</span></span>
                        <span className="text-muted-foreground">Confidence: <span className="font-bold text-foreground">{r.confidenceScore}%</span></span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{r.response}</p>
                    {r.citationUrls.length > 0 && (
                      <div className="mt-3 flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">Citations:</span>
                        {r.citationUrls.map(url => (
                          <span key={url} className="inline-flex items-center gap-1 text-xs text-primary font-medium">
                            {url} <ExternalLink className="w-3 h-3" />
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No prompts found</h3>
          <p className="text-muted-foreground mb-6">Try adjusting your search or filters.</p>
          {canCreate && <Button onClick={() => setShowAddModal(true)}><Plus className="w-4 h-4 mr-2" /> Add Your First Prompt</Button>}
        </div>
      )}
    </div>
  )
}
