"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts"
import { mockRegionalIntelligence } from "@/lib/mock-data/geo-aeo"
import { motion } from "framer-motion"
import { Globe, MapPin, ArrowUpRight, ArrowDownRight, Trophy } from "lucide-react"

export default function RegionalIntelligencePage() {
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
        <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Globe className="h-8 w-8 text-primary" />
          Regional Intelligence
        </h2>
        <p className="text-muted-foreground mt-1">
          Global visibility and brand sentiment breakdowns across major geographies.
        </p>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {mockRegionalIntelligence.visibility.map((region, i) => (
          <motion.div variants={item} key={i}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{region.region}</CardTitle>
                <MapPin className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{region.score} <span className="text-sm font-normal text-muted-foreground">/100</span></div>
                <p className="text-xs mt-1 flex items-center">
                  <span className={`inline-flex items-center ${region.change.startsWith('+') ? 'text-emerald-500' : 'text-red-500'}`}>
                    {region.change.startsWith('+') ? <ArrowUpRight className="h-3 w-3 mr-0.5" /> : <ArrowDownRight className="h-3 w-3 mr-0.5" />}
                    {region.change}
                  </span>
                  <span className="text-muted-foreground ml-1">vs last month</span>
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid gap-4 lg:grid-cols-7">
        <motion.div variants={item} className="lg:col-span-4">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Regional Sentiment Analysis</CardTitle>
              <CardDescription>How users in different geographies perceive your brand in AI responses.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockRegionalIntelligence.sentiment} layout="vertical" margin={{ top: 20, right: 30, left: 40, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--color-border)" />
                    <XAxis type="number" stroke="#888" fontSize={12} />
                    <YAxis dataKey="region" type="category" stroke="#888" fontSize={12} width={80} />
                    <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid var(--color-border)" }} />
                    <Legend />
                    <Bar dataKey="Positive" stackId="a" fill="var(--color-emerald-500)" />
                    <Bar dataKey="Neutral" stackId="a" fill="var(--color-slate-300)" />
                    <Bar dataKey="Negative" stackId="a" fill="var(--color-red-500)" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item} className="lg:col-span-3">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Keyword Rankings by Region</CardTitle>
              <CardDescription>Your position for core topics across global engines.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Keyword</TableHead>
                      <TableHead className="text-center">US</TableHead>
                      <TableHead className="text-center">EU</TableHead>
                      <TableHead className="text-center">IN</TableHead>
                      <TableHead className="text-center">ME</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockRegionalIntelligence.rankings.map((rank, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium whitespace-nowrap">{rank.keyword}</TableCell>
                        <TableCell className="text-center font-bold">
                          {rank.US === 1 ? <Trophy className="w-4 h-4 text-amber-500 mx-auto" /> : rank.US}
                        </TableCell>
                        <TableCell className="text-center font-bold">
                          {rank.Europe === 1 ? <Trophy className="w-4 h-4 text-amber-500 mx-auto" /> : rank.Europe}
                        </TableCell>
                        <TableCell className="text-center font-bold">
                          {rank.India === 1 ? <Trophy className="w-4 h-4 text-amber-500 mx-auto" /> : rank.India}
                        </TableCell>
                        <TableCell className="text-center font-bold">
                          {rank.MiddleEast === 1 ? <Trophy className="w-4 h-4 text-amber-500 mx-auto" /> : rank.MiddleEast}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}
