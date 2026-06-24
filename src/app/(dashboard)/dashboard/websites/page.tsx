"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"
import { CheckCircle2, Globe, Plus, RefreshCw, XCircle, Loader2 } from "lucide-react"
import { fetchWebsites, connectWebsite, Website } from "@/lib/api/websitesApi"

export default function WebsitesPage() {
  const [websites, setWebsites] = useState<Website[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newDomain, setNewDomain] = useState("")
  const [newPlatform, setNewPlatform] = useState("")
  const [connecting, setConnecting] = useState(false)

  const loadWebsites = async () => {
    try {
      const data = await fetchWebsites()
      setWebsites(data)
    } catch (error) {
      console.error("Failed to fetch websites", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadWebsites()
  }, [])

  const handleConnect = async () => {
    if (!newDomain) return
    setConnecting(true)
    try {
      await connectWebsite(newDomain, newPlatform || "Custom")
      await loadWebsites()
      setIsDialogOpen(false)
      setNewDomain("")
      setNewPlatform("")
    } catch (error) {
      console.error("Failed to connect website", error)
    } finally {
      setConnecting(false)
    }
  }

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
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger render={<Button className="inline-flex items-center gap-2 justify-center" />}>
              <Plus className="w-4 h-4" /> Connect Website
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Connect New Website</DialogTitle>
              <DialogDescription>
                Add a new domain to start syncing with OPUS.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="domain">Domain URL</Label>
                <Input
                  id="domain"
                  placeholder="https://example.com"
                  value={newDomain}
                  onChange={(e) => setNewDomain(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="platform">CMS / Platform</Label>
                <Input
                  id="platform"
                  placeholder="e.g. WordPress, Webflow, Custom"
                  value={newPlatform}
                  onChange={(e) => setNewPlatform(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleConnect} disabled={connecting || !newDomain}>
                {connecting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                Connect
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <motion.div variants={container} initial="hidden" animate="show">
        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle>Connected Domains</CardTitle>
              <CardDescription>Domains currently actively syncing with the OPUS Deployment Engine.</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
                </div>
              ) : websites.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No websites connected yet. Click "Connect Website" to add one.
                </div>
              ) : (
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
                    {websites.map((site) => (
                      <TableRow key={site.id}>
                        <TableCell className="font-medium flex items-center gap-2">
                          <Globe className="w-4 h-4 text-muted-foreground" />
                          {site.domainUrl}
                        </TableCell>
                        <TableCell>
                          <span className="text-xs px-2 py-1 rounded-full bg-muted font-medium">
                            {site.platformName}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-2 rounded-full bg-muted overflow-hidden">
                              <div className="h-full bg-emerald-500" style={{ width: `${site.healthScore}%` }} />
                            </div>
                            <span className="text-xs font-bold">{site.healthScore}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-2 rounded-full bg-muted overflow-hidden">
                              <div className="h-full bg-primary" style={{ width: `${site.visibilityScore}%` }} />
                            </div>
                            <span className="text-xs font-bold">{site.visibilityScore}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm flex items-center gap-1">
                          <RefreshCw className="w-3 h-3" /> 
                          {site.lastSyncAt ? new Date(site.lastSyncAt).toLocaleDateString() : 'Never'}
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
              )}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}
