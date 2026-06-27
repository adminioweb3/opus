"use client"

import { Card, CardContent } from "@/components/ui/card"
import { mockOsData } from "@/lib/mock-data/os"
import { motion } from "framer-motion"
import { Activity, BellRing, DollarSign, Globe, ShieldAlert, Rocket, Target, ArrowRight } from "lucide-react"
import Link from "next/link"
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Area, AreaChart } from "recharts"

export default function WarRoomPage() {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const item = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1 }
  }

  return (
    <div className="space-y-4 max-w-7xl mx-auto pb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Executive war room</h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            Real-time command center for AI visibility operations
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-900 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live global data
        </div>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        
        {/* Top 4 Clickable KPI Cards */}
        <motion.div variants={item}>
          <Link href="/dashboard/geo" className="block h-full transition-transform hover:-translate-y-1 hover:shadow-lg">
            <Card className="bg-[#1a202c] text-white h-full border-none shadow-sm overflow-hidden relative">
              <div className="absolute top-0 right-0 p-3 opacity-10">
                <Globe className="w-16 h-16" />
              </div>
              <CardContent className="p-4 flex flex-col h-full justify-between">
                <span className="text-[11px] font-semibold opacity-70 uppercase tracking-wider">Visibility Health</span>
                <div className="mt-2 flex flex-col">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl font-bold">{mockOsData.warRoom.visibilityHealth}</span>
                    <span className="text-xs text-emerald-400 font-medium flex items-center">
                      <svg className="w-2.5 h-2.5 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                      +4
                    </span>
                  </div>
                  <span className="text-[10px] opacity-70 mt-0.5">out of 100 · vs last month</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        </motion.div>

        <motion.div variants={item}>
          <Link href="/dashboard/geo" className="block h-full transition-transform hover:-translate-y-1 hover:shadow-sm">
            <Card className="bg-[#16a34a] text-white h-full border-none shadow-sm overflow-hidden relative">
              <div className="absolute top-0 right-0 p-3 opacity-10">
                <DollarSign className="w-16 h-16" />
              </div>
              <CardContent className="p-4 flex flex-col h-full justify-between">
                <span className="text-[11px] font-semibold opacity-90 uppercase tracking-wider">Revenue Impact</span>
                <div className="mt-2 flex flex-col">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl font-bold">{mockOsData.warRoom.revenueImpact}</span>
                  </div>
                  <span className="text-[10px] opacity-90 mt-0.5">attributed to AI visibility</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        </motion.div>

        <motion.div variants={item}>
          <Link href="/dashboard/geo" className="block h-full transition-transform hover:-translate-y-1 hover:shadow-sm">
            <Card className="h-full border shadow-sm relative overflow-hidden bg-white dark:bg-card">
              <div className="absolute bottom-0 right-0 p-2 opacity-[0.03] dark:opacity-10">
                <Activity className="w-20 h-20" />
              </div>
              <CardContent className="p-4 flex flex-col h-full justify-between">
                <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Citation Health</span>
                <div className="mt-2 flex flex-col">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl font-bold text-slate-900 dark:text-white">{mockOsData.warRoom.citationHealth}%</span>
                    <span className="text-xs text-emerald-500 font-medium flex items-center">
                      <svg className="w-2.5 h-2.5 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                      +1
                    </span>
                  </div>
                  <span className="text-[10px] text-muted-foreground mt-0.5">sources citing your brand</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        </motion.div>

        <motion.div variants={item}>
          <Link href="/dashboard/geo" className="block h-full transition-transform hover:-translate-y-1 hover:shadow-sm">
            <Card className="h-full border shadow-sm relative overflow-hidden bg-white dark:bg-card">
              <div className="absolute bottom-0 right-0 p-2 opacity-[0.03] dark:opacity-10">
                <ShieldAlert className="w-20 h-20" />
              </div>
              <CardContent className="p-4 flex flex-col h-full justify-between">
                <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Competitor Risk</span>
                <div className="mt-2 flex flex-col">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-bold text-[#d97706] dark:text-amber-500">{mockOsData.warRoom.competitorRisk}</span>
                  </div>
                  <span className="text-[10px] text-muted-foreground mt-0.5">2 threats this week</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      </motion.div>

      {/* Charts & Coverage Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* Trend Line Chart */}
        <Card className="lg:col-span-2 shadow-sm border bg-white dark:bg-card overflow-hidden flex flex-col">
          <div className="p-4 border-b flex justify-between items-center bg-muted/10">
            <h3 className="font-semibold text-base">Visibility trend</h3>
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Last 30 days</span>
          </div>
          <div className="h-[220px] w-full pt-3 pr-3 flex-grow">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockOsData.warRoom.visibilityTrend} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted-foreground))" opacity={0.15} />
                <XAxis dataKey="date" hide />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: 'hsl(var(--muted-foreground))'}} domain={['dataMin - 5', 'dataMax + 5']} width={40} />
                <Tooltip 
                  contentStyle={{ borderRadius: '6px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', padding: '6px 10px' }}
                  labelStyle={{ fontWeight: 'bold', color: 'hsl(var(--foreground))', fontSize: '12px' }}
                  itemStyle={{ fontSize: '12px', color: 'hsl(var(--primary))' }}
                />
                <Area type="monotone" dataKey="score" stroke="hsl(var(--primary))" strokeWidth={2.5} fillOpacity={1} fill="url(#colorScore)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* AI Visibility Coverage */}
        <Card className="shadow-sm border bg-white dark:bg-card flex flex-col">
          <div className="p-4 pb-2 border-b bg-muted/10">
            <h3 className="font-semibold text-base">AI Visibility Coverage</h3>
          </div>
          <CardContent className="p-4 pt-3 flex-grow flex flex-col justify-between">
            <div className="grid grid-cols-2 gap-2 mb-3">
              {mockOsData.warRoom.aiCoverage.map((model, i) => (
                <div key={i} className="border rounded-lg p-3 flex flex-col justify-between bg-muted/10">
                  <span className="font-semibold text-xs">{model.platform}</span>
                  <div className="mt-1.5">
                    <span className="text-2xl font-black">{model.score}%</span>
                    <p className="text-[9px] text-muted-foreground mt-0.5">{model.citations} Citations</p>
                    <p className={`text-[9px] font-semibold mt-0.5 ${model.color}`}>{model.change}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-[10px] text-muted-foreground bg-muted/30 p-2.5 rounded border leading-relaxed">
              <span className="font-semibold text-foreground">Leader:</span> ChatGPT <span className="mx-1 opacity-50">|</span> 
              <span className="font-semibold text-foreground">Improved:</span> Claude <span className="mx-1 opacity-50">|</span> 
              <span className="font-semibold text-foreground">Needs Attention:</span> Perplexity
            </div>
          </CardContent>
        </Card>

      </div>

      {/* Alerts & Recommendations Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        
        {/* Executive Alerts */}
        <Card className="shadow-sm border bg-white dark:bg-card">
          <div className="p-4 border-b flex justify-between items-center bg-muted/10">
            <div className="flex items-center gap-1.5">
              <BellRing className="w-4 h-4 text-destructive" />
              <h3 className="font-semibold text-base">Executive alerts</h3>
            </div>
            <span className="text-[10px] font-semibold bg-destructive/10 text-destructive px-2 py-0.5 rounded-full">2 new</span>
          </div>
          <CardContent className="p-4 space-y-3">
            {mockOsData.warRoom.recentAlerts.map((alert, i) => (
              <div key={i} className={`relative pl-3 py-0.5 border-l-[3px] ${alert.isCritical ? 'border-destructive' : 'border-emerald-500'}`}>
                <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">{alert.message}</p>
                
                {alert.pipelineImpact && (
                  <p className="text-[11px] text-destructive mt-0.5 font-medium">{alert.pipelineImpact}</p>
                )}
                
                {alert.source && (
                  <p className="text-[10px] text-emerald-600 dark:text-emerald-500 mt-0.5">{alert.source} · {alert.time}</p>
                )}

                <div className="mt-2">
                  {alert.isCritical ? (
                    <button className="bg-[#f97316] text-white text-[10px] font-bold px-3 py-1 rounded hover:bg-[#ea580c] transition-colors">
                      Fix now
                    </button>
                  ) : (
                    <button className="bg-transparent border border-muted-foreground/30 text-slate-700 dark:text-slate-300 text-[10px] font-bold px-3 py-1 rounded hover:bg-muted transition-colors">
                      View source
                    </button>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recommended Actions */}
        <Card className="shadow-sm border bg-white dark:bg-card">
          <div className="p-4 border-b flex items-center gap-1.5 bg-muted/10">
            <Rocket className="w-4 h-4 text-amber-600" />
            <h3 className="font-semibold text-base">Recommended actions</h3>
          </div>
          <CardContent className="p-0">
            <div className="divide-y divide-border/50">
              {mockOsData.warRoom.recommendedActions.map((action, i) => (
                <div key={i} className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors group cursor-pointer">
                  <div className="flex items-center gap-3">
                    {action.status === 'high' && <Target className="w-4 h-4 text-slate-400" />}
                    {action.status === 'medium' && <span className="font-bold text-slate-400 text-xs">99</span>}
                    {action.status === 'neutral' && <Rocket className="w-4 h-4 text-slate-400" />}
                    <span className="text-xs font-medium text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors">{action.action}</span>
                  </div>
                  <span className={`text-xs font-bold ${action.status === 'neutral' ? 'text-slate-400 font-medium' : 'text-emerald-600 dark:text-emerald-500'}`}>
                    {action.impact}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}

