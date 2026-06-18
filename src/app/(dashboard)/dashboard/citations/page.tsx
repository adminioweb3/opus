"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell } from "recharts"
import { mockCitationsData } from "@/lib/mock-data/intelligence"
import { ArrowUpRight, ArrowDownRight, ExternalLink } from "lucide-react"
import { formatNumber } from "@/lib/utils"
import { motion } from "framer-motion"

export default function CitationsExplorerPage() {
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
        <h2 className="text-3xl font-bold tracking-tight">Citation Explorer</h2>
        <p className="text-muted-foreground mt-1">
          Deep dive into where and how AI models are citing your content.
        </p>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid gap-4 lg:grid-cols-2">
        {/* Citation Sources */}
        <motion.div variants={item}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Citation Sources</CardTitle>
              <CardDescription>Breakdown of content types being cited.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={mockCitationsData.sources} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={2} dataKey="value">
                      {mockCitationsData.sources.map((entry) => (
                        <Cell key={entry.name} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid var(--color-border)" }} formatter={(v: number | string | readonly (string | number)[] | undefined) => `${v}%`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 mt-4 grid grid-cols-2 gap-x-4">
                {mockCitationsData.sources.map(dataItem => (
                  <div key={dataItem.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: dataItem.color }} />
                      <span className="text-muted-foreground truncate">{dataItem.name}</span>
                    </div>
                    <span className="font-medium">{dataItem.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Gain/Loss */}
        <motion.div variants={item}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Citation Gain/Loss</CardTitle>
              <CardDescription>Recent changes in citation frequency by source.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockCitationsData.gainLoss} layout="vertical" margin={{ left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--color-border)" />
                    <XAxis type="number" stroke="#888" fontSize={12} />
                    <YAxis dataKey="source" type="category" stroke="#888" fontSize={12} width={90} />
                    <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid var(--color-border)" }} />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                      {mockCitationsData.gainLoss.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.type === 'gain' ? 'var(--color-emerald-500)' : 'var(--color-red-500)'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        {/* Citation Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Citation Trend</CardTitle>
            <CardDescription>Daily citation count over the selected period.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockCitationsData.trend}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                  <XAxis dataKey="date" stroke="#888" fontSize={11} tickFormatter={(v) => { const d = new Date(v); return `${d.getMonth()+1}/${d.getDate()}` }} />
                  <YAxis stroke="#888" fontSize={11} />
                  <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid var(--color-border)", fontSize: 12 }} />
                  <Line type="monotone" dataKey="citations" stroke="var(--color-primary)" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        {/* Most Referenced Pages */}
        <Card>
          <CardHeader>
            <CardTitle>Most Referenced Pages</CardTitle>
            <CardDescription>URLs with the highest citation authority.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>URL Path</TableHead>
                  <TableHead className="text-right">Total Citations</TableHead>
                  <TableHead className="text-right">30D Change</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockCitationsData.topPages.map((page, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {page.url}
                        <ExternalLink className="w-3 h-3 text-muted-foreground cursor-pointer hover:text-primary" />
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-bold">{formatNumber(page.citations)}</TableCell>
                    <TableCell className="text-right">
                      <span className={`inline-flex items-center justify-end ${page.change >= 0 ? "text-emerald-500" : "text-red-500"}`}>
                        {page.change >= 0 ? "+" : ""}{page.change}%
                        {page.change >= 0 ? <ArrowUpRight className="w-3 h-3 ml-0.5" /> : <ArrowDownRight className="w-3 h-3 ml-0.5" />}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
