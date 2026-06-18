"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { mockPublishing } from "@/lib/mock-data/revenue"
import { motion } from "framer-motion"
import { CheckCircle2, Globe, Send, RefreshCw, LayoutTemplate, Plus, Box, ShoppingBag } from "lucide-react"

export default function PublishingHubPage() {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  const getPlatformIcon = (iconName: string) => {
    switch (iconName) {
      case "wordpress": return <LayoutTemplate className="w-5 h-5" />
      case "hubspot": return <Globe className="w-5 h-5" />
      case "webflow": return <Box className="w-5 h-5" />
      case "ghost": return <Send className="w-5 h-5" />
      case "shopify": return <ShoppingBag className="w-5 h-5" />
      default: return <Globe className="w-5 h-5" />
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Publishing Hub</h2>
        <p className="text-muted-foreground mt-1">
          Automate fixes directly to your CMS and track asset workflows.
        </p>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {mockPublishing.integrations.map((integration, index) => (
          <motion.div variants={item} key={index}>
            <Card className={integration.status === "Connected" ? "border-primary/50 bg-primary/5" : "border-border"}>
              <CardContent className="pt-6 flex flex-col items-center text-center space-y-3">
                <div className={`p-3 rounded-full ${integration.status === "Connected" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                  {getPlatformIcon(integration.icon)}
                </div>
                <div>
                  <h3 className="font-semibold">{integration.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{integration.syncStatus}</p>
                </div>
                <button className={`w-full py-1.5 rounded-md text-xs font-semibold transition-colors ${
                  integration.status === "Connected" 
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20" 
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                }`}>
                  {integration.status}
                </button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid gap-4">
        <motion.div variants={item}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Asset Workflow</CardTitle>
                <CardDescription>Track generated content from Draft to Publish.</CardDescription>
              </div>
              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-9 px-4 py-2 gap-2">
                <RefreshCw className="w-4 h-4" /> Sync All
              </button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Asset ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Target CMS</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Last Edited</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockPublishing.workflows.map((workflow, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-mono text-xs text-muted-foreground">{workflow.id}</TableCell>
                      <TableCell className="font-medium">{workflow.title}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {getPlatformIcon(workflow.target.toLowerCase())}
                          <span className="text-sm">{workflow.target}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1">
                            <div className={`w-2 h-2 rounded-full ${['Draft', 'Review', 'Approve', 'Publish'].includes(workflow.status) ? 'bg-primary' : 'bg-muted'}`} />
                            <div className={`w-2 h-2 rounded-full ${['Review', 'Approve', 'Publish'].includes(workflow.status) ? 'bg-primary' : 'bg-muted'}`} />
                            <div className={`w-2 h-2 rounded-full ${['Approve', 'Publish'].includes(workflow.status) ? 'bg-primary' : 'bg-muted'}`} />
                            <div className={`w-2 h-2 rounded-full ${['Publish'].includes(workflow.status) ? 'bg-emerald-500' : 'bg-muted'}`} />
                          </div>
                          <span className="text-xs font-semibold">{workflow.status}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground">{workflow.lastEdited}</TableCell>
                      <TableCell className="text-right">
                        {workflow.status === "Publish" ? (
                          <span className="inline-flex items-center gap-1 text-emerald-500 font-medium text-sm">
                            <CheckCircle2 className="w-4 h-4" /> Published
                          </span>
                        ) : (
                          <span className="text-primary cursor-pointer hover:underline font-medium text-sm">Advance</span>
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
