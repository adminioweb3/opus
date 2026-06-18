"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { mockEnterpriseData } from "@/lib/mock-data/enterprise"
import { motion } from "framer-motion"
import { Download, FileText, Loader2, Sparkles } from "lucide-react"

export default function ReportsPage() {
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
        <h2 className="text-3xl font-bold tracking-tight">Executive Reports</h2>
        <p className="text-muted-foreground mt-1">
          Generate and download board-ready AI visibility reports.
        </p>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid gap-4">
        
        <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {["Weekly GEO Summary", "Monthly Visibility", "Competitor Landscape", "AEO Opportunities"].map((title, i) => (
            <Card key={i} className="hover:border-primary/50 transition-colors cursor-pointer group">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Sparkles className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">AI Generated Template</p>
                  </div>
                  <button className="w-full inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 mt-2">
                    Generate
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle>Generated Reports Archive</CardTitle>
              <CardDescription>Previously requested executive exports.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Date Requested</TableHead>
                    <TableHead>Format</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockEnterpriseData.reports.map((report, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium flex items-center gap-2">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        {report.title}
                      </TableCell>
                      <TableCell>
                        <span className="text-xs px-2 py-1 rounded-full bg-muted font-medium">
                          {report.type}
                        </span>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{report.date}</TableCell>
                      <TableCell>
                        <span className="font-mono text-xs font-bold text-muted-foreground">.{report.format}</span>
                      </TableCell>
                      <TableCell className="text-right">
                        {report.status === "Generated" ? (
                          <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:text-primary h-8 w-8">
                            <Download className="w-4 h-4" />
                          </button>
                        ) : (
                          <span className="inline-flex items-center gap-2 text-sm text-primary font-medium pr-2">
                            <Loader2 className="w-4 h-4 animate-spin" /> Generating
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
