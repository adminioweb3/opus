"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { mockMoatData } from "@/lib/mock-data/moat"
import { motion } from "framer-motion"
import { ShieldCheck, Link2, AlertTriangle, ShieldAlert } from "lucide-react"

export default function SourceAuthorityPage() {
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
        <h2 className="text-3xl font-bold tracking-tight">Source Authority Score</h2>
        <p className="text-muted-foreground mt-1">
          Analyze per-URL trust signals governing AI visibility.
        </p>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid gap-4">
        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle>URL Trust Matrix</CardTitle>
              <CardDescription>How major AI models rank the credibility of your domain&apos;s pages.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Target URL</TableHead>
                    <TableHead className="text-right">AI Trust Score</TableHead>
                    <TableHead className="text-right">Citation Frequency</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockMoatData.sourceAuthority.map((row, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-mono text-sm flex items-center gap-2">
                        <Link2 className="w-4 h-4 text-muted-foreground" />
                        {row.url}
                      </TableCell>
                      <TableCell className="text-right">
                        <span className={`font-bold ${row.aiTrustScore >= 90 ? 'text-emerald-500' : row.aiTrustScore >= 70 ? 'text-primary' : 'text-amber-500'}`}>
                          {row.aiTrustScore}/100
                        </span>
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {row.citations.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <span className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full font-medium ${
                          row.status === 'High Authority' ? 'bg-emerald-500/10 text-emerald-500' :
                          row.status === 'Needs Improvement' ? 'bg-amber-500/10 text-amber-500' :
                          'bg-primary/10 text-primary'
                        }`}>
                          {row.status === 'High Authority' && <ShieldCheck className="w-3 h-3" />}
                          {row.status === 'Needs Improvement' && <AlertTriangle className="w-3 h-3" />}
                          {row.status === 'Good' && <ShieldAlert className="w-3 h-3" />}
                          {row.status}
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
