"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts"
import { mockMentionsData } from "@/lib/mock-data/intelligence"
import { formatNumber } from "@/lib/utils"
import { motion } from "framer-motion"

export default function MentionsMonitoringPage() {
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
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Mention Monitoring</h2>
        <p className="text-muted-foreground mt-1">
          Track brand mentions and sentiment across leading AI platforms.
        </p>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockMentionsData.platforms.map((platform) => (
          <motion.div key={platform.name} variants={item}>
            <Card>
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-base font-semibold">{platform.name}</CardTitle>
                <div className={`w-2 h-2 rounded-full ${
                  platform.sentiment === 'positive' ? 'bg-emerald-500' :
                  platform.sentiment === 'negative' ? 'bg-red-500' : 'bg-blue-500'
                }`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{formatNumber(platform.mentions)}</div>
                <p className="text-xs text-muted-foreground mt-1 capitalize flex items-center gap-1">
                  Sentiment: <span className={platform.color}>{platform.sentiment}</span>
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <Card>
        <CardHeader>
          <CardTitle>Mentions Over Time</CardTitle>
          <CardDescription>Daily mention volume across all tracked AI engines.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-96 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockMentionsData.timeline} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorChat" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPerp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                <XAxis dataKey="date" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid var(--color-border)", fontSize: 12 }} />
                <Legend />
                <Area type="monotone" dataKey="ChatGPT" stackId="1" stroke="#10b981" fill="url(#colorChat)" />
                <Area type="monotone" dataKey="Perplexity" stackId="1" stroke="#0ea5e9" fill="url(#colorPerp)" />
                <Area type="monotone" dataKey="Claude" stackId="1" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
                <Area type="monotone" dataKey="Gemini" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                <Area type="monotone" dataKey="Copilot" stackId="1" stroke="#6366f1" fill="#6366f1" fillOpacity={0.3} />
                <Area type="monotone" dataKey="Grok" stackId="1" stroke="#f43f5e" fill="#f43f5e" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
