"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { mockDeploymentsData } from "@/lib/mock-data/deployments"
import { motion } from "framer-motion"
import { CheckCircle2, Globe, Plus, RefreshCw, XCircle } from "lucide-react"

export default function WebsitesPage() {
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
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Website Manager</h2>
          <p className="text-muted-foreground mt-1">
            Centrally manage all domains and CMS connected to OPUS.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">
          <Plus className="w-4 h-4" /> Connect Website
        </button>
      </div>

      <motion.div variants={container} initial="hidden" animate="show">
        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle>Connected Domains</CardTitle>
              <CardDescription>Domains currently actively syncing with the OPUS Deployment Engine.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Domain</TableHead>
                    <TableHead>CMS / Framework</TableHead>
                    <TableHead>Health</TableHead>
                    <TableHead>Visibility</TableHead>
                    <TableHead>Last Sync</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockDeploymentsData.websites.map((site, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium flex items-center gap-2">
                        <Globe className="w-4 h-4 text-muted-foreground" />
                        {site.url}
                      </TableCell>
                      <TableCell>
                        <span className="text-xs px-2 py-1 rounded-full bg-muted font-medium">
                          {site.type}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 rounded-full bg-muted overflow-hidden">
                            <div className="h-full bg-emerald-500" style={{ width: `${site.health}%` }} />
                          </div>
                          <span className="text-xs font-bold">{site.health}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 rounded-full bg-muted overflow-hidden">
                            <div className="h-full bg-primary" style={{ width: `${site.visibility}%` }} />
                          </div>
                          <span className="text-xs font-bold">{site.visibility}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm flex items-center gap-1">
                        <RefreshCw className="w-3 h-3" /> {site.lastSync}
                      </TableCell>
                      <TableCell className="text-right">
                        <span className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full font-bold uppercase tracking-wider ${
                          site.status === 'Connected' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-destructive/10 text-destructive'
                        }`}>
                          {site.status === 'Connected' ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                          {site.status}
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
