"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { mockMoatData } from "@/lib/mock-data/moat"
import { motion } from "framer-motion"
import { Ghost, X, Check, ArrowRight } from "lucide-react"

export default function ShadowModePage() {
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
        <h2 className="text-3xl font-bold tracking-tight">Competitor Shadow Mode</h2>
        <p className="text-muted-foreground mt-1">
          Deep-dive technical analysis revealing exactly why competitors outrank you.
        </p>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid gap-4">
        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Ghost className="w-5 h-5 text-primary" />
                    Head-to-Head Analysis
                  </CardTitle>
                  <CardDescription>
                    Target Keyword: <span className="font-semibold text-foreground">&quot;{mockMoatData.shadowMode.targetKeyword}&quot;</span>
                  </CardDescription>
                </div>
                <div className="flex items-center gap-3 text-sm font-medium">
                  <span className="px-3 py-1 rounded-md bg-muted text-muted-foreground">{mockMoatData.shadowMode.userDomain}</span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  <span className="px-3 py-1 rounded-md bg-primary/10 text-primary">{mockMoatData.shadowMode.competitorDomain}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ranking Factor</TableHead>
                    <TableHead>Your Domain</TableHead>
                    <TableHead>Competitor Domain</TableHead>
                    <TableHead>Impact</TableHead>
                    <TableHead className="text-right">Advantage</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockMoatData.shadowMode.factors.map((factor, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{factor.factor}</TableCell>
                      <TableCell className={factor.user === "No" ? "text-destructive" : ""}>{factor.user}</TableCell>
                      <TableCell className={factor.competitor === "Yes" ? "text-emerald-500 font-medium" : ""}>{factor.competitor}</TableCell>
                      <TableCell>
                        <span className={`text-[10px] uppercase font-bold tracking-wider ${
                          factor.impact === 'High' ? 'text-destructive' :
                          factor.impact === 'Medium' ? 'text-amber-500' : 'text-muted-foreground'
                        }`}>
                          {factor.impact}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        {factor.advantage === 'competitor' ? (
                          <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded bg-destructive/10 text-destructive font-semibold">
                            <X className="w-3 h-3" /> Competitor Wins
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded bg-emerald-500/10 text-emerald-500 font-semibold">
                            <Check className="w-3 h-3" /> You Win
                          </span>
                        )}
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
