"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { mockDeploymentsData } from "@/lib/mock-data/deployments"
import { motion } from "framer-motion"
import { Filter, Search, Edit3 } from "lucide-react"

export default function ContentInventoryPage() {
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
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Content Inventory</h2>
          <p className="text-muted-foreground mt-1">
            Master index of all discovered pages across connected domains.
          </p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search URLs..." 
              className="h-9 w-64 pl-9 pr-4 rounded-md border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>
          <button className="inline-flex items-center gap-2 justify-center rounded-md border bg-background h-9 px-4 text-sm font-medium hover:bg-muted transition-colors">
            <Filter className="w-4 h-4" /> Filters
          </button>
        </div>
      </div>

      <motion.div variants={container} initial="hidden" animate="show">
        <motion.div variants={item}>
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="pl-6">URL Path</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Optimization Status</TableHead>
                    <TableHead>Visibility</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead className="text-right pr-6">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockDeploymentsData.contentInventory.map((content, i) => (
                    <TableRow key={i}>
                      <TableCell className="pl-6 font-medium text-primary">
                        {content.url}
                      </TableCell>
                      <TableCell>
                        <span className="text-xs px-2 py-1 rounded-full bg-muted font-medium">
                          {content.type}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={`text-xs px-2 py-1 rounded font-bold uppercase tracking-wider ${
                          content.status === 'Optimized' ? 'bg-emerald-500/10 text-emerald-500' :
                          content.status === 'Needs Review' ? 'bg-amber-500/10 text-amber-500' :
                          'bg-primary/10 text-primary animate-pulse'
                        }`}>
                          {content.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold">{content.visibility}</span>
                          <div className="w-12 h-1.5 rounded-full bg-muted overflow-hidden">
                            <div className="h-full bg-primary" style={{ width: `${content.visibility}%` }} />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {content.lastUpdated}
                      </TableCell>
                      <TableCell className="text-right pr-6">
                        <button className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                          <Edit3 className="w-4 h-4" />
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
