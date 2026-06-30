
"use client"

import React, { useEffect, useState, Suspense } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Activity, BellRing, DollarSign, Globe, ShieldAlert, Rocket, Target, FileText, HelpCircle, Briefcase, ShoppingBag, CreditCard, ChevronDown, CheckCircle2, AlertTriangle, Info, Loader2 } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useOrganizationStore } from "@/lib/stores/organizationStore"
import { getFullReport, FullReportData } from "@/lib/api/reportApi"

export default function WarRoomPage() {
  return (
    <Suspense fallback={<div className="flex justify-center p-20"><Loader2 className="animate-spin w-8 h-8 text-primary" /></div>}>
      <WarRoomContent />
    </Suspense>
  )
}

function WarRoomContent() {
  const { organizationId } = useOrganizationStore()
  const searchParams = useSearchParams()
  const orgId = searchParams.get('orgId') || organizationId
  
  const [reportData, setReportData] = useState<FullReportData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

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

  if (isLoading || !reportData) {
    return <div className="flex justify-center p-20"><Loader2 className="animate-spin w-8 h-8 text-primary" /></div>
  }

  // --- Map Executive KPIs ---
  const visibilityScore = reportData.executiveSummary?.overallAIVisibilityScore || 0
  const citationHealth = reportData.executiveSummary?.overallSEOScore || 0
  
  // Extract domain name
  let domainName = "Citationly"
  try {
    if (reportData.websiteProfile?.websiteUrl) {
      domainName = new URL(reportData.websiteProfile.websiteUrl).hostname.replace('www.', '')
      domainName = domainName.charAt(0).toUpperCase() + domainName.slice(1)
    }
  } catch (e) {}

  // --- Competitors ---
  let topCompetitors = []
  if (reportData.competitors) {
    topCompetitors = reportData.competitors.slice(0, 3).map((c, i) => {
      let visibility = 50 - (i * 15) // Mocked fallback
      let share = 20 - (i * 5)
      try {
        const p = JSON.parse(c.rawJson || '{}')
        visibility = p.estimatedBrandAuthority?.score || visibility
      } catch (e) {}
      return { name: c.name, visibility, share }
    })
  }
  // Ensure we have at least 2 competitors for the table
  if (topCompetitors.length === 0) {
    topCompetitors.push({ name: "Competitor A", visibility: 74, share: 33 })
    topCompetitors.push({ name: "Competitor B", visibility: 52, share: 21 })
  }

  // --- Platforms ---
  const defaultPlatforms = [
    { platform: "ChatGPT", score: 91, citations: 142, change: "+4%", bg: "#10A37F" },
    { platform: "Claude", score: 88, citations: 119, change: "+2%", bg: "#D97757" },
    { platform: "Gemini", score: 76, citations: 94, change: "+1%", bg: "#4285F4" },
    { platform: "Perplexity", score: 58, citations: 61, change: "-3%", bg: "#20808D" },
    { platform: "Copilot", score: 61, citations: 52, change: "+5%", bg: "#0078D4" },
    { platform: "Grok", score: 34, citations: 18, change: "0%", bg: "var(--card)" },
    { platform: "DeepSeek", score: 29, citations: 11, change: "-2%", bg: "#4D6BFE" }
  ]

  let mappedPlatforms = defaultPlatforms
  if (reportData.platformVisibilities && reportData.platformVisibilities.length > 0) {
    mappedPlatforms = reportData.platformVisibilities.map((pv, i) => {
      const def = defaultPlatforms.find(d => d.platform.toLowerCase() === pv.platform.toLowerCase()) || defaultPlatforms[i % defaultPlatforms.length]
      return {
        platform: pv.platform,
        score: Math.round(pv.visibilityScore || 0),
        citations: Math.round((pv.promptCoverage || 0) * 100), // mock
        change: "0%",
        bg: def.bg
      }
    })
  }

  // Radar chart node calculations
  // Center is 210, 210. 
  // score 100 => r=40 (close to center)
  // score 0 => r=170 (far edge)
  const getRadarClass = (score: number) => {
    if (score >= 80) return "fill-emerald-500"
    if (score >= 65) return "fill-cyan-500"
    if (score >= 45) return "fill-amber-500"
    return "fill-destructive"
  }

  const radarNodes = mappedPlatforms.slice(0, 7).map((p, i, arr) => {
    const angle = (i * (360 / arr.length)) * (Math.PI / 180)
    const r = 170 - ((p.score / 100) * 115) // Adjust radius logic so high scores don't overlap the larger center
    const cx = 210 + Math.sin(angle) * r
    const cy = 210 - Math.cos(angle) * r
    
    return { ...p, cx, cy, fillClass: getRadarClass(p.score) }
  })

  // --- Executive Alerts / Recommendations ---
  let highRecs = []
  let mediumRecs = []
  if (reportData.recommendations && reportData.recommendations.length > 0) {
    const sorted = [...reportData.recommendations].sort((a,b) => b.priorityScore - a.priorityScore)
    highRecs = sorted.slice(0, 3)
    mediumRecs = sorted.slice(3, 7)
  }

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const item = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1 }
  }

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto pb-8">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Executive war room</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Real-time command center for AI visibility operations
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 px-3 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-900 font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Live monitoring
          </div>
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            UPDATED JUST NOW
          </div>
          <div className="text-sm font-semibold flex items-center gap-1 cursor-pointer hover:text-primary transition-colors">
            {domainName} <ChevronDown className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* SECTION 1: EXECUTIVE KPIS */}
      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div variants={item}>
          <Card className="hover:-translate-y-1 hover:shadow-lg transition-all duration-250 cursor-pointer overflow-hidden group border-border">
            <CardContent className="p-5 flex flex-col justify-between h-full relative">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                  <Globe className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-500 px-2.5 py-1 rounded-md">Excellent</span>
              </div>
              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Visibility health</p>
                <div className="flex items-baseline gap-2 mt-1.5">
                  <span className="text-3xl font-black">{visibilityScore.toFixed(1)}</span>
                </div>
                <p className="text-xs font-semibold text-emerald-500 mt-1 flex items-center gap-1">
                  ▲ 3.2 pts vs last week
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="hover:-translate-y-1 hover:shadow-lg transition-all duration-250 cursor-pointer overflow-hidden group border-border">
            <CardContent className="p-5 flex flex-col justify-between h-full relative">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
                  <DollarSign className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-500 px-2.5 py-1 rounded-md">Growing</span>
              </div>
              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Revenue impact</p>
                <div className="flex items-baseline gap-2 mt-1.5">
                  <span className="text-3xl font-black">$184K</span>
                </div>
                <p className="text-xs font-semibold text-emerald-500 mt-1 flex items-center gap-1">
                  ▲ 11% attributed to AI traffic
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="hover:-translate-y-1 hover:shadow-lg transition-all duration-250 cursor-pointer overflow-hidden group border-border">
            <CardContent className="p-5 flex flex-col justify-between h-full relative">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center">
                  <Activity className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-500 px-2.5 py-1 rounded-md">Stable</span>
              </div>
              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Citation health</p>
                <div className="flex items-baseline gap-2 mt-1.5">
                  <span className="text-3xl font-black">{citationHealth.toFixed(0)}</span>
                </div>
                <p className="text-xs font-semibold text-muted-foreground mt-1 flex items-center gap-1">
                  — 0.4% vs last week
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="hover:-translate-y-1 hover:shadow-lg transition-all duration-250 cursor-pointer overflow-hidden group border-border">
            <CardContent className="p-5 flex flex-col justify-between h-full relative">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-500 px-2.5 py-1 rounded-md">Watch</span>
              </div>
              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Competitor risk</p>
                <div className="flex items-baseline gap-2 mt-1.5">
                  <span className="text-3xl font-black">Medium</span>
                </div>
                <p className="text-xs font-semibold text-amber-500 mt-1 flex items-center gap-1">
                  ▲ {reportData.competitors?.length || 2} new threats
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6">
        {/* SECTION 2: BRAND VISIBILITY MAP (RADAR) */}
        <Card className="flex flex-col border-border shadow-sm overflow-hidden">
          <div className="p-5 pb-0 flex justify-between items-center">
            <h3 className="font-bold text-lg">Brand visibility map</h3>
            <span className="text-xs text-muted-foreground">{mappedPlatforms.length} platforms scanned</span>
          </div>
          <CardContent className="p-5 flex-grow flex items-center justify-center flex-col sm:flex-row gap-8">
            <div className="relative w-full max-w-[420px] aspect-square flex-shrink-0">
              <svg viewBox="0 0 420 420" className="w-full h-full drop-shadow-sm">
                <circle cx="210" cy="210" r="180" fill="none" className="stroke-border" strokeWidth="1"/>
                <circle cx="210" cy="210" r="135" fill="none" className="stroke-border" strokeWidth="1"/>
                <circle cx="210" cy="210" r="90" fill="none" className="stroke-border" strokeWidth="1"/>
                <circle cx="210" cy="210" r="45" fill="none" className="stroke-border" strokeWidth="1"/>
                
                {/* Sweep effect */}
                <g style={{ transformOrigin: '210px 210px' }} className="animate-[spin_8s_linear_infinite]">
                  <path d="M210,210 L210,30 A180,180 0 0,1 330,75 Z" fill="url(#sweepGrad)" opacity="0.3"/>
                </g>
                <defs>
                  <radialGradient id="sweepGrad">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.8"/>
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0"/>
                  </radialGradient>
                  <filter id="textBackground" x="-10%" y="-10%" width="120%" height="120%">
                    <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="hsl(var(--card))" floodOpacity="1"/>
                  </filter>
                </defs>
                
                {/* Center node */}
                <circle cx="210" cy="210" r="34" className="fill-card stroke-primary" strokeWidth="3"/>
                <text x="210" y="206" textAnchor="middle" className="fill-foreground font-bold text-[11px] uppercase tracking-wider">{domainName.toUpperCase()}</text>
                <text x="210" y="222" textAnchor="middle" className="fill-muted-foreground font-semibold text-[10px]">{visibilityScore.toFixed(1)}</text>

                {/* Dynamic Platform nodes */}
                {radarNodes.map((node, i) => (
                  <g key={i}>
                    <circle cx={node.cx} cy={node.cy} r={node.score > 70 ? 11 : node.score > 45 ? 9 : 7} className={node.fillClass}/>
                    <text x={node.cx} y={node.cy - 18} textAnchor="middle" className="fill-foreground font-bold text-xs" style={{ paintOrder: 'stroke', stroke: 'hsl(var(--card))', strokeWidth: '4px', strokeLinecap: 'round', strokeLinejoin: 'round' }}>{node.platform}</text>
                    <text x={node.cx} y={node.cy + 22} textAnchor="middle" className="fill-muted-foreground font-semibold text-[11px]" style={{ paintOrder: 'stroke', stroke: 'hsl(var(--card))', strokeWidth: '4px', strokeLinecap: 'round', strokeLinejoin: 'round' }}>{node.score}%</text>
                  </g>
                ))}
              </svg>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center gap-8"><div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div><span className="text-sm font-semibold">Strong (80%+)</span></div><span className="text-sm font-bold text-muted-foreground">{mappedPlatforms.filter(p => p.score >= 80).length} platforms</span></div>
              <div className="flex justify-between items-center gap-8"><div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-cyan-500"></div><span className="text-sm font-semibold">Solid (65–79%)</span></div><span className="text-sm font-bold text-muted-foreground">{mappedPlatforms.filter(p => p.score >= 65 && p.score < 80).length} platform</span></div>
              <div className="flex justify-between items-center gap-8"><div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div><span className="text-sm font-semibold">Developing (45–64%)</span></div><span className="text-sm font-bold text-muted-foreground">{mappedPlatforms.filter(p => p.score >= 45 && p.score < 65).length} platforms</span></div>
              <div className="flex justify-between items-center gap-8"><div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-destructive"></div><span className="text-sm font-semibold">Weak (under 45%)</span></div><span className="text-sm font-bold text-muted-foreground">{mappedPlatforms.filter(p => p.score < 45).length} platforms</span></div>
            </div>
          </CardContent>
        </Card>

        {/* SECTION 3: AI VISIBILITY COVERAGE */}
        <Card className="flex flex-col border-border shadow-sm">
          <div className="p-5 pb-0 flex justify-between items-center">
            <h3 className="font-bold text-lg">AI visibility coverage</h3>
            <span className="text-xs text-muted-foreground">last refreshed just now</span>
          </div>
          <CardContent className="p-5 pt-4">
            <div className="grid grid-cols-2 gap-3">
              {mappedPlatforms.slice(0, 4).map((p, i) => (
                <div key={i} className="border border-border rounded-xl p-3 flex flex-col gap-2 hover:-translate-y-0.5 hover:shadow-md transition-all cursor-default bg-card">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2"><div className="w-4 h-4 rounded" style={{ backgroundColor: p.bg }}></div><span className="font-bold text-sm">{p.platform}</span></div>
                  </div>
                  <div>
                    <div className="text-2xl font-black">{p.score}%</div>
                    <div className="text-xs text-muted-foreground">{p.citations} citations</div>
                    <div className={"text-xs font-bold mt-1 " + (p.change.includes('-') ? 'text-destructive' : 'text-emerald-500')}>{p.change}</div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-3 gap-2 mt-3">
              {mappedPlatforms.slice(4, 7).map((p, i) => (
                <div key={i} className="border border-border rounded-lg p-2 flex flex-col">
                  <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded" style={{ backgroundColor: p.bg }}></div><span className="font-bold text-[11px] truncate">{p.platform}</span></div>
                  <div className="flex justify-between items-end mt-1"><span className="text-base font-black">{p.score}%</span><span className={"text-[10px] font-bold " + (p.change.includes('-') ? 'text-destructive' : p.change === '0%' ? 'text-muted-foreground' : 'text-emerald-500')}>{p.change}</span></div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* SECTION 4: CITATION TIMELINE (Mocked for now as per plan) */}
        <Card className="border-border shadow-sm">
          <div className="p-5 pb-3">
            <h3 className="font-bold text-lg">Citation timeline</h3>
          </div>
          <CardContent className="p-5 pt-0">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <span className="text-xs font-bold text-muted-foreground w-10 shrink-0 mt-0.5">10:35</span>
                <div className="flex flex-col items-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#10A37F] z-10"></div>
                  <div className="w-px h-8 bg-border -mt-1"></div>
                </div>
                <div className="text-sm"><span className="font-bold">ChatGPT</span> cited FAQ — "AI visibility metrics"</div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-xs font-bold text-muted-foreground w-10 shrink-0 mt-0.5">09:52</span>
                <div className="flex flex-col items-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#4285F4] z-10"></div>
                  <div className="w-px h-8 bg-border -mt-1"></div>
                </div>
                <div className="text-sm"><span className="font-bold">Gemini</span> referenced pricing page</div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-xs font-bold text-muted-foreground w-10 shrink-0 mt-0.5">08:41</span>
                <div className="flex flex-col items-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#D97757] z-10"></div>
                  <div className="w-px h-8 bg-border -mt-1"></div>
                </div>
                <div className="text-sm"><span className="font-bold">Claude</span> cited case study — Enterprise rollout</div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-xs font-bold text-muted-foreground w-10 shrink-0 mt-0.5">07:15</span>
                <div className="flex flex-col items-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#10A37F] z-10"></div>
                  <div className="w-px h-8 bg-border -mt-1"></div>
                </div>
                <div className="text-sm"><span className="font-bold">ChatGPT</span> cited blog — visibility benchmarks</div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-xs font-bold text-muted-foreground w-10 shrink-0 mt-0.5">Yest.</span>
                <div className="flex flex-col items-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#20808D] z-10"></div>
                </div>
                <div className="text-sm"><span className="font-bold">Perplexity</span> cited blog post</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* SECTION 5: AGENT OPERATIONS (Mocked for now) */}
        <Card className="border-border shadow-sm">
          <div className="p-5 pb-3">
            <h3 className="font-bold text-lg">Agent operations</h3>
          </div>
          <CardContent className="p-5 pt-0">
            <div className="space-y-5 mt-2">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                </div>
                <div className="w-32 text-sm font-bold shrink-0">Content agent</div>
                <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[64%]"></div>
                </div>
                <div className="text-[10px] font-bold bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-full shrink-0">Running</div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="w-32 text-sm font-bold shrink-0">Citation agent</div>
                <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 w-full"></div>
                </div>
                <div className="text-[10px] font-bold bg-indigo-500/10 text-indigo-500 px-2 py-0.5 rounded-full shrink-0">Completed</div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-cyan-500/10 text-cyan-500 flex items-center justify-center shrink-0">
                  <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
                </div>
                <div className="w-32 text-sm font-bold shrink-0">Authority agent</div>
                <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-500 w-[41%]"></div>
                </div>
                <div className="text-[10px] font-bold bg-cyan-500/10 text-cyan-500 px-2 py-0.5 rounded-full shrink-0">Working</div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-muted text-muted-foreground flex items-center justify-center shrink-0">
                  <div className="w-2 h-2 rounded-full border border-muted-foreground"></div>
                </div>
                <div className="w-32 text-sm font-bold shrink-0">Technical agent</div>
                <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-muted-foreground w-0"></div>
                </div>
                <div className="text-[10px] font-bold bg-secondary text-muted-foreground px-2 py-0.5 rounded-full shrink-0">Idle</div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                </div>
                <div className="w-32 text-sm font-bold shrink-0">Revenue agent</div>
                <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[77%]"></div>
                </div>
                <div className="text-[10px] font-bold bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-full shrink-0">Running</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* SECTION 6: EXECUTIVE ALERTS */}
        <Card className="border-border shadow-sm flex flex-col">
          <div className="p-5 pb-3 flex justify-between items-center">
            <h3 className="font-bold text-lg">Executive alerts</h3>
            <span className="text-xs text-muted-foreground">{highRecs.length > 0 ? highRecs.length : 3} active</span>
          </div>
          <CardContent className="p-5 pt-0 flex flex-col gap-5 mt-2">
            
            {highRecs.length > 0 ? highRecs.map((rec, i) => (
              <div key={i} className="flex items-start gap-4 border-l-2 border-destructive pl-4 relative">
                <div className="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-card flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-destructive/10 text-destructive flex items-center justify-center"><AlertTriangle className="w-3 h-3" /></div>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-sm">{rec.title}</h4>
                  <p className="text-xs font-bold text-destructive mt-1">Est. impact: {rec.estimatedImpact}</p>
                  <p className="text-[11px] font-medium text-muted-foreground mt-1.5">{rec.description}</p>
                </div>
                <button className="text-[11px] font-bold border border-border rounded px-3 py-1.5 hover:bg-muted transition-colors shrink-0">Resolve</button>
              </div>
            )) : (
              <>
                <div className="flex items-start gap-4 border-l-2 border-destructive pl-4 relative">
                  <div className="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-card flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-destructive/10 text-destructive flex items-center justify-center"><AlertTriangle className="w-3 h-3" /></div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm">Perplexity snippet lost on pricing page</h4>
                    <p className="text-xs font-bold text-destructive mt-1">Est. impact: −$12K monthly attributed revenue</p>
                    <p className="text-[11px] font-medium text-muted-foreground mt-1.5">Suggested: republish pricing FAQ with updated structured data</p>
                  </div>
                  <button className="text-[11px] font-bold border border-border rounded px-3 py-1.5 hover:bg-muted transition-colors shrink-0">Resolve</button>
                </div>
                {/* Fallbacks... */}
              </>
            )}

          </CardContent>
        </Card>

        {/* SECTION 7: RECOMMENDED ACTIONS */}
        <Card className="border-border shadow-sm flex flex-col">
          <div className="p-5 pb-3 flex justify-between items-center">
            <h3 className="font-bold text-lg">Recommended actions</h3>
            <span className="text-xs text-muted-foreground">AI-generated</span>
          </div>
          <CardContent className="p-5 pt-0 grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
            
            {mediumRecs.length > 0 ? mediumRecs.map((rec, i) => (
              <div key={i} className="border border-border rounded-xl p-4 hover:border-amber-500/30 hover:shadow-sm transition-all bg-card">
                <span className="text-[10px] font-bold bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded-full">Medium</span>
                <h4 className="font-bold text-sm mt-3 mb-3 leading-snug">{rec.title}</h4>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground">Impact <b className="text-foreground ml-1">{rec.estimatedImpact}</b></span>
                </div>
                <button className="w-full mt-4 text-xs font-bold border border-border bg-card py-1.5 rounded-lg hover:bg-muted transition-colors">Start task</button>
              </div>
            )) : (
              <>
                <div className="border border-border rounded-xl p-4 hover:border-amber-500/30 hover:shadow-sm transition-all bg-card">
                  <span className="text-[10px] font-bold bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded-full">Medium</span>
                  <h4 className="font-bold text-sm mt-3 mb-3 leading-snug">Publish FAQ cluster for product pages</h4>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-muted-foreground">Impact <b className="text-foreground ml-1">+8%</b></span>
                    <span className="text-muted-foreground">Effort <b className="text-foreground ml-1">Low</b></span>
                  </div>
                  <button className="w-full mt-4 text-xs font-bold border border-border bg-card py-1.5 rounded-lg hover:bg-muted transition-colors">Start task</button>
                </div>
                {/* Fallbacks... */}
              </>
            )}

          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* SECTION 8: OPPORTUNITY PIPELINE */}
        <Card className="border-border shadow-sm">
          <div className="p-5 pb-3">
            <h3 className="font-bold text-lg">Opportunity pipeline</h3>
          </div>
          <CardContent className="p-5 pt-0">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <div className="flex flex-col items-center justify-center p-4 border border-border bg-card rounded-xl hover:-translate-y-1 hover:shadow-md transition-all cursor-default">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-2"><DollarSign className="w-4 h-4"/></div>
                <div className="font-black text-xl">$96K</div>
                <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mt-1">Revenue</div>
              </div>
              <div className="flex flex-col items-center justify-center p-4 border border-border bg-card rounded-xl hover:-translate-y-1 hover:shadow-md transition-all cursor-default">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-500 flex items-center justify-center mb-2"><Rocket className="w-4 h-4"/></div>
                <div className="font-black text-xl">+22K</div>
                <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mt-1">Traffic</div>
              </div>
              <div className="flex flex-col items-center justify-center p-4 border border-border bg-card rounded-xl hover:-translate-y-1 hover:shadow-md transition-all cursor-default">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-2"><FileText className="w-4 h-4"/></div>
                <div className="font-black text-xl">{reportData.prompts?.length || 38}</div>
                <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mt-1">Citation</div>
              </div>
              <div className="flex flex-col items-center justify-center p-4 border border-border bg-card rounded-xl hover:-translate-y-1 hover:shadow-md transition-all cursor-default">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center mb-2"><Target className="w-4 h-4"/></div>
                <div className="font-black text-xl">17</div>
                <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mt-1">Authority</div>
              </div>
              <div className="flex flex-col items-center justify-center p-4 border border-border bg-card rounded-xl hover:-translate-y-1 hover:shadow-md transition-all cursor-default">
                <div className="w-8 h-8 rounded-lg bg-destructive/10 text-destructive flex items-center justify-center mb-2"><Globe className="w-4 h-4"/></div>
                <div className="font-black text-xl">9</div>
                <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mt-1">AI coverage</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* SECTION 9: COMPETITOR SNAPSHOT */}
        <Card className="border-border shadow-sm flex flex-col">
          <div className="p-5 pb-3">
            <h3 className="font-bold text-lg">Competitor snapshot</h3>
          </div>
          <CardContent className="p-5 pt-0">
            <div className="w-full overflow-x-auto border border-border rounded-xl">
              <table className="w-full text-sm text-left">
                <thead className="text-[11px] text-muted-foreground bg-muted/40 uppercase tracking-wider border-b border-border">
                  <tr>
                    <th className="px-4 py-3 font-bold rounded-tl-xl">Brand</th>
                    <th className="px-4 py-3 font-bold">Visibility</th>
                    <th className="px-4 py-3 font-bold text-right">Mentions</th>
                    <th className="px-4 py-3 font-bold text-right">Share</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr className="hover:bg-muted/20 transition-colors bg-card">
                    <td className="px-4 py-3 font-bold flex items-center gap-2 whitespace-nowrap">
                      {domainName} <span className="bg-primary/10 text-primary text-[9px] px-1.5 py-0.5 rounded uppercase tracking-wider border border-primary/20">You</span>
                    </td>
                    <td className="px-4 py-3 min-w-[120px]">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                          <div className="bg-primary h-full" style={{ width: visibilityScore + "%" }}></div>
                        </div>
                        <span className="font-bold text-xs w-8">{visibilityScore.toFixed(0)}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right font-semibold">612</td>
                    <td className="px-4 py-3 text-right font-semibold">41%</td>
                  </tr>

                  {topCompetitors.map((comp, i) => (
                    <tr key={i} className="hover:bg-muted/20 transition-colors bg-card">
                      <td className="px-4 py-3 font-bold whitespace-nowrap text-muted-foreground">{comp.name}</td>
                      <td className="px-4 py-3 min-w-[120px]">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                            <div className="bg-muted-foreground h-full" style={{ width: comp.visibility + "%" }}></div>
                          </div>
                          <span className="font-bold text-xs text-muted-foreground w-8">{comp.visibility.toFixed(0)}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right font-semibold text-muted-foreground">{498 - (i * 100)}</td>
                      <td className="px-4 py-3 text-right font-semibold text-muted-foreground">{comp.share}%</td>
                    </tr>
                  ))}

                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* SECTION 10: KNOWLEDGE VAULT (Mocked) */}
      <Card className="border-border shadow-sm">
        <div className="p-5 pb-3">
          <h3 className="font-bold text-lg">Knowledge vault summary</h3>
        </div>
        <CardContent className="p-5 pt-0">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <div className="flex flex-col p-4 border border-border bg-card rounded-xl hover:bg-muted/30 transition-colors cursor-pointer group">
              <div className="text-3xl font-black group-hover:text-primary transition-colors">214</div>
              <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mt-1 flex items-center gap-1.5"><FileText className="w-3.5 h-3.5"/> Documents</div>
            </div>
            <div className="flex flex-col p-4 border border-border bg-card rounded-xl hover:bg-muted/30 transition-colors cursor-pointer group">
              <div className="text-3xl font-black group-hover:text-primary transition-colors">86</div>
              <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mt-1 flex items-center gap-1.5"><HelpCircle className="w-3.5 h-3.5"/> FAQs</div>
            </div>
            <div className="flex flex-col p-4 border border-border bg-card rounded-xl hover:bg-muted/30 transition-colors cursor-pointer group">
              <div className="text-3xl font-black group-hover:text-primary transition-colors">19</div>
              <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mt-1 flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5"/> Case studies</div>
            </div>
            <div className="flex flex-col p-4 border border-border bg-card rounded-xl hover:bg-muted/30 transition-colors cursor-pointer group">
              <div className="text-3xl font-black group-hover:text-primary transition-colors">42</div>
              <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mt-1 flex items-center gap-1.5"><ShoppingBag className="w-3.5 h-3.5"/> Products</div>
            </div>
            <div className="flex flex-col p-4 border border-border bg-card rounded-xl hover:bg-muted/30 transition-colors cursor-pointer group">
              <div className="text-3xl font-black group-hover:text-primary transition-colors">11</div>
              <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mt-1 flex items-center gap-1.5"><CreditCard className="w-3.5 h-3.5"/> Pricing</div>
            </div>
          </div>
        </CardContent>
      </Card>

    </div>
  )
}
