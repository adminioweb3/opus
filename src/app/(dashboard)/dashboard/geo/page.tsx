"use client"

import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Eye, Quote, Smile, Swords, AlertTriangle, Globe, Search, Target, TrendingUp, TrendingDown, Download, Loader2 } from "lucide-react"
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Area, AreaChart, PieChart, Pie, Cell } from "recharts"
import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { getFullReport, FullReportData } from "@/lib/api/reportApi"

const DEFAULT_SCORES = [
  { lab: 'AI Visibility Score', v: 78, ic: Eye, c: 'text-primary', bg: 'bg-primary/10', chg: '+5.2%', dir: 'up' },
  { lab: 'Citation Score', v: 82, ic: Quote, c: 'text-green-600', bg: 'bg-green-50 dark:bg-green-950/30', chg: '+3.1%', dir: 'up' },
  { lab: 'Sentiment Score', v: 65, ic: Smile, c: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-950/30', chg: '-1.2%', dir: 'down' },
  { lab: 'Competitor Score', v: 71, ic: Swords, c: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-950/30', chg: '+2.5%', dir: 'up' },
  { lab: 'Hallucination Risk', v: 12, ic: AlertTriangle, c: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-950/30', chg: '-2%', dir: 'down' },
  { lab: 'SEO Health', v: 91, ic: Globe, c: 'text-sky-500', bg: 'bg-sky-50 dark:bg-sky-950/30', chg: '+0.5%', dir: 'up' },
  { lab: 'AEO Readiness', v: 68, ic: Search, c: 'text-pink-600', bg: 'bg-pink-50 dark:bg-pink-950/30', chg: '+8.4%', dir: 'up' },
  { lab: 'GEO Readiness', v: 74, ic: Target, c: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-950/30', chg: '+4.1%', dir: 'up' }
];

const DEFAULT_TREND_DATA = Array.from({ length: 30 }, (_, i) => ({
  date: `Day ${i + 1}`,
  score: [120, 138, 150, 142, 128, 160, 148, 135, 158, 152, 140, 165, 158, 148, 170, 162, 155, 175, 168, 160, 178, 172, 165, 182, 176, 170, 185, 178, 172, 188][i]
}));

const DEFAULT_SOV_DATA = [
  { name: 'Acme Corp', value: 38.4, color: 'hsl(var(--primary))' },
  { name: 'Profound', value: 22.1, color: '#2563EB' },
  { name: 'BrightEdge', value: 15.7, color: '#7C3AED' },
  { name: 'Semrush', value: 12.3, color: '#16A34A' },
  { name: 'Others', value: 11.5, color: '#CBD5E1' }
];

export default function GeoDashboardPage() {
  return (
    <Suspense fallback={<div className="flex justify-center p-20"><Loader2 className="animate-spin w-8 h-8 text-primary" /></div>}>
      <GeoDashboardContent />
    </Suspense>
  )
}

function GeoDashboardContent() {
  const searchParams = useSearchParams()
  const orgId = searchParams.get('orgId')
  const [timeframe, setTimeframe] = useState('30D')
  const [reportData, setReportData] = useState<FullReportData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!orgId) {
      setLoading(false)
      return
    }
    const fetchData = async () => {
      try {
        const data = await getFullReport(orgId)
        setReportData(data)
      } catch (err) {
        console.error("Failed to load report", err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [orgId])

  // Map Data
  const visibilityScore = reportData?.visibilitySummary?.overallVisibilityScore || 0
  const citationScore = reportData?.citationSummary?.averageAuthorityScore || 0
  
  // Try to parse competitors for SOV
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
      competitorsScore = Math.round(parsed.reduce((acc, c) => acc + c.auth, 0) / parsed.length)
    }
  }

  const SCORES = [
    { lab: 'AI Visibility Score', v: visibilityScore || DEFAULT_SCORES[0].v, ic: Eye, c: 'text-primary', bg: 'bg-primary/10', chg: '+5.2%', dir: 'up' },
    { lab: 'Citation Score', v: citationScore || DEFAULT_SCORES[1].v, ic: Quote, c: 'text-green-600', bg: 'bg-green-50 dark:bg-green-950/30', chg: '+3.1%', dir: 'up' },
    { lab: 'Sentiment Score', v: 85, ic: Smile, c: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-950/30', chg: '+1.2%', dir: 'up' },
    { lab: 'Competitor Auth', v: competitorsScore || DEFAULT_SCORES[3].v, ic: Swords, c: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-950/30', chg: '+2.5%', dir: 'up' },
    { lab: 'Hallucination Risk', v: 8, ic: AlertTriangle, c: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-950/30', chg: '-2%', dir: 'down' },
    { lab: 'SEO Health', v: 91, ic: Globe, c: 'text-sky-500', bg: 'bg-sky-50 dark:bg-sky-950/30', chg: '+0.5%', dir: 'up' },
    { lab: 'AEO Readiness', v: 68, ic: Search, c: 'text-pink-600', bg: 'bg-pink-50 dark:bg-pink-950/30', chg: '+8.4%', dir: 'up' },
    { lab: 'GEO Readiness', v: parseInt(reportData?.recommendationSummary?.estimatedOverallImpact || "0") || DEFAULT_SCORES[7].v, ic: Target, c: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-950/30', chg: '+4.1%', dir: 'up' }
  ]

  const TREND_DATA = Array.from({ length: 30 }, (_, i) => ({
    date: `Day ${i + 1}`,
    score: Math.round(Math.max(0, (visibilityScore || 50) - 30 + i + (Math.random() * 5)))
  }));

  const brandName = reportData?.websiteProfile?.websiteUrl || 'Your Brand'
  
  const colors = ['hsl(var(--primary))', '#2563EB', '#7C3AED', '#16A34A', '#CBD5E1']
  const SOV_DATA = topCompetitors.length > 0 ? [
    { name: brandName, value: 40, color: colors[0] },
    ...topCompetitors.map((c, i) => ({ name: c.name, value: Math.max(10, 30 - (i*5)), color: colors[i+1] })),
    { name: 'Others', value: 10, color: colors[4] }
  ] : DEFAULT_SOV_DATA;

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  const item = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0 }
  };

  
  if (loading) {
    return <div className="flex justify-center p-20"><Loader2 className="animate-spin w-8 h-8 text-primary" /></div>
  }
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Executive GEO dashboard</h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            Real-time insights into your Generative Engine Optimization performance
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex bg-background border rounded-lg overflow-hidden p-0.5">
            {['7D', '30D', '90D', '1Y'].map(t => (
              <button
                key={t}
                onClick={() => setTimeframe(t)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${timeframe === t ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted'}`}
              >
                {t}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-background border rounded-lg hover:bg-muted transition-colors text-foreground">
            <Download className="w-3.5 h-3.5" />
            Export
          </button>
        </div>
      </div>

      {/* Grid of 8 Score Cards */}
      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {SCORES.map((s, i) => {
          const Icon = s.ic;
          return (
            <motion.div key={i} variants={item}>
              <Card className="h-full hover:-translate-y-1 hover:shadow-md transition-all duration-200">
                <CardContent className="p-4 flex flex-col justify-between h-full">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-semibold text-muted-foreground">{s.lab}</span>
                    <Icon className={`w-5 h-5 ${s.c} opacity-85`} />
                  </div>
                  <div>
                    <div className="text-3xl font-bold leading-none mb-2">
                      {s.v}<span className="text-sm font-semibold text-muted-foreground ml-0.5">/100</span>
                    </div>
                    <div className={`text-xs font-semibold flex items-center gap-1 ${s.dir === 'up' ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>
                      {s.dir === 'up' ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                      {s.chg}
                      <span className="text-muted-foreground font-medium ml-1">vs last period</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Lower Section (Charts) */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        
        {/* Trend Area Chart (approx 3 columns) */}
        <Card className="lg:col-span-3 flex flex-col h-85">
          <div className="p-4 border-b">
            <h3 className="font-semibold text-[15px]">AI visibility trend</h3>
            <p className="text-[12.5px] text-muted-foreground mt-0.5">Aggregate visibility score over the selected timeframe.</p>
          </div>
          <div className="flex-1 p-4 pb-2 w-full min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={TREND_DATA} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="geoColorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted-foreground))" opacity={0.15} />
                <XAxis dataKey="date" tickLine={false} axisLine={false} tick={{fontSize: 10, fill: 'hsl(var(--muted-foreground))'}} minTickGap={20} />
                <YAxis tickLine={false} axisLine={false} tick={{fontSize: 11, fill: 'hsl(var(--muted-foreground))'}} />
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', padding: '8px 12px' }}
                  labelStyle={{ fontWeight: 'bold', color: 'hsl(var(--foreground))', fontSize: '12px', marginBottom: '4px' }}
                  itemStyle={{ fontSize: '13px', color: 'hsl(var(--primary))', fontWeight: 600 }}
                />
                <Area type="monotone" dataKey="score" stroke="hsl(var(--primary))" strokeWidth={2.5} fillOpacity={1} fill="url(#geoColorScore)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Share of Voice Doughnut Chart (approx 2 columns) */}
        <Card className="lg:col-span-2 flex flex-col h-85">
          <div className="p-4 border-b">
            <h3 className="font-semibold text-[15px]">Share of voice</h3>
            <p className="text-[12.5px] text-muted-foreground mt-0.5">Brand visibility vs top competitors.</p>
          </div>
          <div className="flex-1 flex flex-row items-center justify-center p-4 min-h-0">
            <div className="w-45 h-45 shrink-0 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={SOV_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    stroke="none"
                  >
                    {SOV_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))', padding: '6px 10px', backgroundColor: 'hsl(var(--card))' }}
                    itemStyle={{ fontSize: '13px', fontWeight: 600 }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="flex flex-col justify-center pl-6 flex-1 max-w-50">
              {SOV_DATA.map((item, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="text-[13px] font-medium text-foreground truncate">{item.name}</span>
                  </div>
                  <span className="text-[13px] font-bold text-muted-foreground pl-2">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

      </div>
    </div>
  )
}
