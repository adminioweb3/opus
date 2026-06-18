"use client"

import { Card, CardContent } from "@/components/ui/card"
import { mockOsData } from "@/lib/mock-data/os"
import { motion } from "framer-motion"
import { Activity, BellRing, DollarSign, Globe, Heart, ShieldAlert, Target } from "lucide-react"

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
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Executive War Room</h2>
          <p className="text-muted-foreground mt-1">
            Real-time global command center for AI visibility operations.
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted px-3 py-1.5 rounded-full border">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Live Global Data
        </div>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        
        <motion.div variants={item} className="col-span-2 md:col-span-1 lg:col-span-2">
          <Card className="bg-primary text-primary-foreground h-full border-none shadow-md overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Globe className="w-24 h-24" />
            </div>
            <CardContent className="p-6 flex flex-col h-full justify-between">
              <span className="text-sm font-medium opacity-80 uppercase tracking-wider">Visibility Health</span>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-5xl font-bold">{mockOsData.warRoom.visibilityHealth}</span>
                <span className="text-lg opacity-80">/100</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item} className="col-span-2 md:col-span-1 lg:col-span-2">
          <Card className="bg-emerald-600 text-white h-full border-none shadow-md overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <DollarSign className="w-24 h-24" />
            </div>
            <CardContent className="p-6 flex flex-col h-full justify-between">
              <span className="text-sm font-medium opacity-80 uppercase tracking-wider">Revenue Impact</span>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-5xl font-bold">{mockOsData.warRoom.revenueImpact}</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item} className="col-span-1">
          <Card className="h-full">
            <CardContent className="p-6 flex flex-col items-center justify-center text-center gap-2 h-full">
              <Activity className="w-6 h-6 text-primary" />
              <span className="text-2xl font-bold">{mockOsData.warRoom.citationHealth}%</span>
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Citation Health</span>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item} className="col-span-1">
          <Card className="h-full">
            <CardContent className="p-6 flex flex-col items-center justify-center text-center gap-2 h-full">
              <ShieldAlert className="w-6 h-6 text-amber-500" />
              <span className="text-xl font-bold text-amber-500">{mockOsData.warRoom.competitorRisk}</span>
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Competitor Risk</span>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item} className="col-span-1">
          <Card className="h-full">
            <CardContent className="p-6 flex flex-col items-center justify-center text-center gap-2 h-full">
              <Heart className="w-6 h-6 text-rose-500" />
              <span className="text-2xl font-bold">{mockOsData.warRoom.brandSentiment}%</span>
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Brand Sentiment</span>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item} className="col-span-1">
          <Card className="h-full">
            <CardContent className="p-6 flex flex-col items-center justify-center text-center gap-2 h-full">
              <Target className="w-6 h-6 text-indigo-500" />
              <span className="text-2xl font-bold">{mockOsData.warRoom.opportunityScore}%</span>
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Opp Score</span>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item} className="col-span-2 md:col-span-3 lg:col-span-4">
          <Card className="h-full border-destructive/20 bg-destructive/5">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <BellRing className="w-5 h-5 text-destructive" />
                <h3 className="font-semibold text-destructive">Executive Alerts</h3>
              </div>
              <div className="space-y-3">
                {mockOsData.warRoom.recentAlerts.map((alert, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-background border">
                    <span className="text-sm font-medium">{alert.message}</span>
                    <span className={`text-xs px-2 py-1 rounded font-bold uppercase tracking-wider ${
                      alert.type === 'Drop' ? 'bg-destructive/10 text-destructive' : 'bg-emerald-500/10 text-emerald-500'
                    }`}>
                      {alert.type}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

      </motion.div>
    </div>
  )
}
