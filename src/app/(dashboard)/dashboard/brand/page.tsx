"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MOCK_BRAND_MENTIONS, BRAND_HEALTH, type BrandMention } from "@/lib/mock-data/brand"
import { formatDate } from "@/lib/utils"
import { Search, Filter, ArrowUpRight, ArrowDownRight, TrendingUp, AlertTriangle, ThumbsUp, ThumbsDown, Minus } from "lucide-react"
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Bar, BarChart, Cell } from "recharts"

const platformColors: Record<string, string> = {
  chatgpt: "bg-[#10A37F]/10 text-[#10A37F]",
  gemini: "bg-[#4285F4]/10 text-[#4285F4]",
  claude: "bg-[#D97757]/10 text-[#D97757]",
  perplexity: "bg-[#22B8CD]/10 text-[#22B8CD]",
  grok: "bg-neutral-100 text-neutral-800",
}

const sentimentIcons = { positive: ThumbsUp, neutral: Minus, negative: ThumbsDown }
const sentimentColors = { positive: "text-emerald-500", neutral: "text-amber-500", negative: "text-red-500" }

export default function BrandPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [platformFilter, setPlatformFilter] = useState<string>("all")
  const [sentimentFilter, setSentimentFilter] = useState<string>("all")
  const [currentPage, setCurrentPage] = useState(1)
  const perPage = 8

  const filtered = MOCK_BRAND_MENTIONS.filter(m => {
    if (platformFilter !== "all" && m.platform !== platformFilter) return false
    if (sentimentFilter !== "all" && m.sentiment !== sentimentFilter) return false
    if (searchQuery && !m.query.toLowerCase().includes(searchQuery.toLowerCase()) && !m.excerpt.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage)
  const totalPages = Math.ceil(filtered.length / perPage)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Brand Intelligence</h2>
        <p className="text-muted-foreground">Monitor how AI platforms perceive and represent your brand.</p>
      </div>

      <Tabs defaultValue="mentions">
        <TabsList>
          <TabsTrigger value="mentions">Brand Mentions</TabsTrigger>
          <TabsTrigger value="health">Brand Health</TabsTrigger>
        </TabsList>

        {/* Mentions Tab */}
        <TabsContent value="mentions" className="space-y-4 mt-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search mentions..." value={searchQuery} onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1) }} className="pl-9" />
            </div>
            <select value={platformFilter} onChange={e => { setPlatformFilter(e.target.value); setCurrentPage(1) }} className="h-10 rounded-md border border-input bg-background px-3 text-sm">
              <option value="all">All Platforms</option>
              <option value="chatgpt">ChatGPT</option>
              <option value="gemini">Gemini</option>
              <option value="claude">Claude</option>
              <option value="perplexity">Perplexity</option>
              <option value="grok">Grok</option>
            </select>
            <select value={sentimentFilter} onChange={e => { setSentimentFilter(e.target.value); setCurrentPage(1) }} className="h-10 rounded-md border border-input bg-background px-3 text-sm">
              <option value="all">All Sentiment</option>
              <option value="positive">Positive</option>
              <option value="neutral">Neutral</option>
              <option value="negative">Negative</option>
            </select>
          </div>

          <div className="space-y-3">
            {paginated.map(mention => {
              const SentimentIcon = sentimentIcons[mention.sentiment]
              return (
                <Card key={mention.id}>
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={`${platformColors[mention.platform]} border-0 capitalize text-xs`}>{mention.platform}</Badge>
                          <Badge variant="outline" className="text-xs capitalize">{mention.category}</Badge>
                          <span className="text-xs text-muted-foreground">{formatDate(mention.date, "relative")}</span>
                        </div>
                        <p className="text-sm font-medium text-foreground mb-1">&quot;{mention.query}&quot;</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">{mention.excerpt}</p>
                        {mention.citationUrl && (
                          <p className="text-xs text-primary mt-2 font-medium">{mention.citationUrl}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-4 shrink-0">
                        <SentimentIcon className={`w-5 h-5 ${sentimentColors[mention.sentiment]}`} />
                        <div className="text-right">
                          <div className="text-xl font-bold">{mention.score}</div>
                          <div className="text-xs text-muted-foreground">Score</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center gap-2">
              <Button variant="outline" size="sm" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Previous</Button>
              <span className="flex items-center text-sm text-muted-foreground px-4">Page {currentPage} of {totalPages}</span>
              <Button variant="outline" size="sm" disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next</Button>
            </div>
          )}
        </TabsContent>

        {/* Health Tab */}
        <TabsContent value="health" className="space-y-6 mt-4">
          {/* KPI Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-xs text-muted-foreground mb-1">Overall Health</div>
                <div className="text-3xl font-bold">{BRAND_HEALTH.overallScore}/100</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-xs text-muted-foreground mb-1">Recommendation Rate</div>
                <div className="text-3xl font-bold">{BRAND_HEALTH.recommendationRate}%</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-xs text-muted-foreground mb-1">Positive Sentiment</div>
                <div className="text-3xl font-bold text-emerald-500">{BRAND_HEALTH.sentimentBreakdown.positive}%</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                  <AlertTriangle className="w-3 h-3 text-amber-500" /> Hallucinations
                </div>
                <div className="text-3xl font-bold text-amber-500">{BRAND_HEALTH.hallucinations}</div>
              </CardContent>
            </Card>
          </div>

          {/* Mention Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Mention Trend</CardTitle>
              <CardDescription>Weekly brand mentions across all AI platforms.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={BRAND_HEALTH.mentionTrend}>
                    <defs>
                      <linearGradient id="mentionGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="week" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid var(--color-border)", fontSize: 12 }} />
                    <Area type="monotone" dataKey="mentions" stroke="var(--color-primary)" strokeWidth={2} fill="url(#mentionGrad)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Sentiment Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Sentiment Trend</CardTitle>
              <CardDescription>Weekly sentiment breakdown of AI brand mentions.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={BRAND_HEALTH.sentimentTrend}>
                    <XAxis dataKey="week" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid var(--color-border)", fontSize: 12 }} />
                    <Bar dataKey="positive" stackId="a" fill="#10B981" radius={[0, 0, 0, 0]} name="Positive" />
                    <Bar dataKey="neutral" stackId="a" fill="#F59E0B" name="Neutral" />
                    <Bar dataKey="negative" stackId="a" fill="#EF4444" radius={[4, 4, 0, 0]} name="Negative" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
