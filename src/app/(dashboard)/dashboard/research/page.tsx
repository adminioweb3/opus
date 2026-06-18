"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { mockEnterpriseData } from "@/lib/mock-data/enterprise"
import { motion } from "framer-motion"
import { BookOpen, ExternalLink, Library } from "lucide-react"

export default function ResearchPage() {
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
        <h2 className="text-3xl font-bold tracking-tight">Research Hub</h2>
        <p className="text-muted-foreground mt-1">
          Deep-dive industry reports, GEO metrics, and SEO transition guides.
        </p>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid gap-4">
        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Library className="w-5 h-5 text-primary" />
                <CardTitle>Enterprise Library</CardTitle>
              </div>
              <CardDescription>Curated literature on Agentic Search and AEO.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Read Time</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockEnterpriseData.research.map((doc, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-muted-foreground" />
                        {doc.title}
                      </TableCell>
                      <TableCell>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          doc.category.includes('GEO') ? 'bg-emerald-500/10 text-emerald-500' :
                          doc.category.includes('AEO') ? 'bg-primary/10 text-primary' :
                          'bg-muted text-muted-foreground'
                        }`}>
                          {doc.category}
                        </span>
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground font-medium">
                        {doc.readTime}
                      </TableCell>
                      <TableCell className="text-right">
                        <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:text-primary h-8 px-3 gap-2">
                          Read <ExternalLink className="w-3 h-3" />
                        </button>
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
