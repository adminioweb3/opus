"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from "recharts"
import { mockRevenue } from "@/lib/mock-data/revenue"
import { motion } from "framer-motion"
import { DollarSign, Users, LineChart, Target, Building2 } from "lucide-react"

export default function RevenueAttributionPage() {
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
        <h2 className="text-3xl font-bold tracking-tight">Revenue Attribution</h2>
        <p className="text-muted-foreground mt-1">
          Track the exact monetary value of your AI search visibility.
        </p>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <motion.div variants={item}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Influenced Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{mockRevenue.overview.influencedRevenue}</div>
              <p className="text-xs text-muted-foreground mt-1">Closed-won deals this quarter</p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={item}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pipeline Value</CardTitle>
              <LineChart className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockRevenue.overview.pipelineValue}</div>
              <p className="text-xs text-muted-foreground mt-1">Active opportunities</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Influenced Leads</CardTitle>
              <Users className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockRevenue.overview.influencedLeads}</div>
              <p className="text-xs text-muted-foreground mt-1">Net new contacts</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rev. Per Citation</CardTitle>
              <Target className="h-4 w-4 text-indigo-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockRevenue.overview.revenuePerCitation}</div>
              <p className="text-xs text-muted-foreground mt-1">Average value per AI citation</p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid gap-4 lg:grid-cols-2">
        <motion.div variants={item}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>AI-to-Revenue Funnel</CardTitle>
              <CardDescription>Volume at each stage from an AI mention to a closed deal.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-100 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockRevenue.funnel} layout="vertical" margin={{ top: 20, right: 30, left: 40, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--color-border)" />
                    <XAxis type="number" stroke="#888" fontSize={12} />
                    <YAxis dataKey="stage" type="category" stroke="#888" fontSize={12} width={100} />
                    <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: 8, border: "1px solid var(--color-border)" }} />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]} maxBarSize={50}>
                      {mockRevenue.funnel.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Recent AI-Sourced Opportunities</CardTitle>
              <CardDescription>Live pipeline generated specifically from AI search platforms.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockRevenue.recentOpportunities.map((opp, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-muted-foreground" />
                        {opp.company}
                      </TableCell>
                      <TableCell className="text-muted-foreground">{opp.source}</TableCell>
                      <TableCell className="text-right font-semibold">{opp.amount}</TableCell>
                      <TableCell className="text-right">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          opp.status === 'Closed Won' ? 'bg-emerald-500/10 text-emerald-500' :
                          opp.status === 'Negotiation' ? 'bg-amber-500/10 text-amber-500' :
                          'bg-primary/10 text-primary'
                        }`}>
                          {opp.status}
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
