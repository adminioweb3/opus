"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts"
import { mockMoatData } from "@/lib/mock-data/moat"
import { motion } from "framer-motion"
import { Activity, Zap } from "lucide-react"

export default function VoiceDriftPage() {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Brand Voice Drift</h2>
        <p className="text-muted-foreground mt-1">
          Monitor how AI perception and sentiment of your brand changes over time.
        </p>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid gap-4 lg:grid-cols-3">
        <motion.div variants={item} className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Perception Timeline</CardTitle>
              <CardDescription>Accuracy vs Sentiment over the last 6 months.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96 w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={mockMoatData.voiceDrift} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorAccuracy" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorSentiment" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-emerald-500)" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="var(--color-emerald-500)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                    <XAxis dataKey="date" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} domain={[50, 100]} />
                    <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid var(--color-border)" }} />
                    <Area type="monotone" dataKey="accuracy" stroke="var(--color-primary)" fillOpacity={1} fill="url(#colorAccuracy)" strokeWidth={2} name="Information Accuracy" />
                    <Area type="monotone" dataKey="sentiment" stroke="var(--color-emerald-500)" fillOpacity={1} fill="url(#colorSentiment)" strokeWidth={2} name="Brand Sentiment" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item} className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Current Accuracy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-primary flex items-center gap-2">
                98% <Activity className="w-5 h-5 text-primary" />
              </div>
              <p className="text-sm text-emerald-500 mt-2 font-medium">+3% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Current Sentiment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-emerald-500 flex items-center gap-2">
                92% <Zap className="w-5 h-5 text-emerald-500" />
              </div>
              <p className="text-sm text-emerald-500 mt-2 font-medium">+4% from last month</p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}
