"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { mockOpportunities } from "@/lib/mock-data/geo-aeo"
import { motion } from "framer-motion"
import { Zap, Target, Search, HelpCircle, FileWarning } from "lucide-react"

export default function OpportunitiesPage() {
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
        <h2 className="text-3xl font-bold tracking-tight">Opportunity Center</h2>
        <p className="text-muted-foreground mt-1">
          Actionable recommendations to improve your AI visibility and share of voice.
        </p>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid gap-4 lg:grid-cols-2">
        {/* Quick Wins */}
        <motion.div variants={item}>
          <Card className="h-full border-emerald-500/20 bg-emerald-500/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-emerald-500" />
                Quick Wins
              </CardTitle>
              <CardDescription>Low effort, high probability of success.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockOpportunities.quickWins.map((win) => (
                  <div key={win.id} className="flex items-center justify-between p-3 bg-background rounded-lg border border-border">
                    <div className="flex flex-col">
                      <span className="font-medium text-sm">{win.title}</span>
                      <span className="text-xs text-muted-foreground">Status: {win.status}</span>
                    </div>
                    <span className="text-xs font-semibold px-2 py-1 bg-emerald-500/10 text-emerald-500 rounded-full">
                      {win.effort} Effort
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* High Impact */}
        <motion.div variants={item}>
          <Card className="h-full border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                High Impact Opportunities
              </CardTitle>
              <CardDescription>Strategic bets for long-term visibility.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockOpportunities.highImpact.map((opp) => (
                  <div key={opp.id} className="flex items-center justify-between p-3 bg-background rounded-lg border border-border">
                    <div className="flex flex-col">
                      <span className="font-medium text-sm">{opp.title}</span>
                      <span className="text-xs text-muted-foreground">Status: {opp.status}</span>
                    </div>
                    <span className="text-xs font-semibold px-2 py-1 bg-primary/10 text-primary rounded-full">
                      {opp.impact} Impact
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid gap-4 lg:grid-cols-3">
        {/* Content Gaps */}
        <motion.div variants={item}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Search className="h-4 w-4" /> Content Gaps
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0 pb-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="pl-6">Topic</TableHead>
                    <TableHead className="text-right pr-6">Volume</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockOpportunities.contentGaps.map((gap, i) => (
                    <TableRow key={i}>
                      <TableCell className="pl-6 font-medium">{gap.topic}</TableCell>
                      <TableCell className="text-right pr-6">{gap.searches}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>

        {/* Missing FAQs */}
        <motion.div variants={item}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <HelpCircle className="h-4 w-4" /> Missing FAQs
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0 pb-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="pl-6">Question</TableHead>
                    <TableHead className="text-right pr-6">Rel.</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockOpportunities.missingFaqs.map((faq, i) => (
                    <TableRow key={i}>
                      <TableCell className="pl-6 font-medium max-w-37.5 truncate" title={faq.question}>{faq.question}</TableCell>
                      <TableCell className="text-right pr-6">{faq.relevance}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>

        {/* Missing Citations */}
        <motion.div variants={item}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <FileWarning className="h-4 w-4" /> Missing Citations
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0 pb-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="pl-6">Keyword</TableHead>
                    <TableHead className="text-right pr-6">Engine</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockOpportunities.missingCitations.map((cit, i) => (
                    <TableRow key={i}>
                      <TableCell className="pl-6 font-medium max-w-37.5 truncate" title={cit.keyword}>{cit.keyword}</TableCell>
                      <TableCell className="text-right pr-6 text-muted-foreground">{cit.engine}</TableCell>
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
