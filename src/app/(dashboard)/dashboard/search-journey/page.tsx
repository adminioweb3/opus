"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from "recharts"
import { mockSearchJourney } from "@/lib/mock-data/geo-aeo"
import { motion } from "framer-motion"
import { ArrowRight, FilterX } from "lucide-react"

export default function SearchJourneyPage() {
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
        <h2 className="text-3xl font-bold tracking-tight">Search Journey Analytics</h2>
        <p className="text-muted-foreground mt-1">
          Track end-to-end user conversion from initial AI prompt to final website action.
        </p>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid gap-4 lg:grid-cols-2">
        <motion.div variants={item}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Conversion Funnel</CardTitle>
              <CardDescription>Volume of users at each stage of the AI search journey.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-100 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockSearchJourney.funnel} layout="vertical" margin={{ top: 20, right: 30, left: 40, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--color-border)" />
                    <XAxis type="number" stroke="#888" fontSize={12} />
                    <YAxis dataKey="stage" type="category" stroke="#888" fontSize={12} width={80} />
                    <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: 8, border: "1px solid var(--color-border)" }} />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]} maxBarSize={50}>
                      {mockSearchJourney.funnel.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item} className="flex flex-col gap-4">
          <Card className="flex-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FilterX className="h-5 w-5 text-destructive" />
                Drop-off Analysis
              </CardTitle>
              <CardDescription>Identify where users are abandoning the journey.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Stage Transition</TableHead>
                    <TableHead className="text-right">Drop-off Rate</TableHead>
                    <TableHead>Primary Reason</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockSearchJourney.dropoffAnalysis.map((drop, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium flex items-center gap-2 whitespace-nowrap">
                        {drop.stage.split(' to ')[0]}
                        <ArrowRight className="h-3 w-3 text-muted-foreground" />
                        {drop.stage.split(' to ')[1]}
                      </TableCell>
                      <TableCell className="text-right text-destructive font-semibold">
                        {drop.dropoff}
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {drop.reason}
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
