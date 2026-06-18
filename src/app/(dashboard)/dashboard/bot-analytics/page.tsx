"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts"
import { mockBotAnalytics } from "@/lib/mock-data/geo-aeo"
import { motion } from "framer-motion"
import { Bot, ShieldCheck, Clock } from "lucide-react"

export default function BotAnalyticsPage() {
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
        <h2 className="text-3xl font-bold tracking-tight">AI Bot Analytics</h2>
        <p className="text-muted-foreground mt-1">
          Monitor search crawler and AI agent activity on your domains.
        </p>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {mockBotAnalytics.overview.map((bot, i) => (
          <motion.div variants={item} key={i}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{bot.name}</CardTitle>
                <Bot className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{bot.crawls}</div>
                <div className="flex items-center justify-between mt-1">
                  <p className={`text-xs ${bot.trend.startsWith('+') ? 'text-emerald-500' : 'text-red-500'}`}>
                    {bot.trend}
                  </p>
                  <p className="text-xs text-muted-foreground flex items-center">
                    <ShieldCheck className="h-3 w-3 mr-1 text-emerald-500" />
                    {bot.health} Health
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid gap-4 lg:grid-cols-7">
        <motion.div variants={item} className="lg:col-span-4">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Crawl Timeline</CardTitle>
              <CardDescription>Frequency of requests from AI bots over time.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockBotAnalytics.crawlTimeline} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                    <XAxis dataKey="date" stroke="#888" fontSize={12} />
                    <YAxis stroke="#888" fontSize={12} />
                    <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid var(--color-border)" }} />
                    <Legend />
                    <Line type="monotone" dataKey="GPTBot" stroke="var(--color-emerald-500)" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="ClaudeBot" stroke="var(--color-amber-500)" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="GeminiBot" stroke="var(--color-blue-500)" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="PerplexityBot" stroke="var(--color-purple-500)" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item} className="lg:col-span-3">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Top Pages Crawled</CardTitle>
              <CardDescription>Most frequently accessed paths by AI agents.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>URL Path</TableHead>
                    <TableHead className="text-right">Total Crawls</TableHead>
                    <TableHead className="text-right">Last Crawl</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockBotAnalytics.topPages.map((page, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium max-w-37.5 truncate" title={page.path}>
                        {page.path}
                      </TableCell>
                      <TableCell className="text-right font-bold">{page.crawls}</TableCell>
                      <TableCell className="text-right text-muted-foreground text-xs">
                        <span className="flex items-center justify-end gap-1">
                          <Clock className="w-3 h-3" />
                          {page.lastCrawled}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}
