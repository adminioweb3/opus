"use client"

import { useCallback, useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"
import { Globe, Plus, ChevronDown, ChevronRight } from "lucide-react"
import { fetchWebsites, connectWebsite, Website } from "@/lib/api/websitesApi"
import { getDomainLogoUrl } from "@/lib/logoUtils"
import { LogoAvatar } from "@/components/ui/logo-avatar"
import { SectionHead, StatusPill, EmptyState } from "./shared"

const AI_CRAWLERS = ["GPTBot", "ClaudeBot", "Google-Extended", "PerplexityBot"]

export default function WebsitesSection() {
  const [sites, setSites] = useState<Website[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [newDomain, setNewDomain] = useState("")
  const [isAdding, setIsAdding] = useState(false)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  // AI-crawl allow/deny and robots.txt aren't backend-tracked per site yet — local UI state
  // until that's wired up, consistent with the rest of this section using real site data.
  const [crawlPrefs, setCrawlPrefs] = useState<Record<string, Record<string, boolean>>>({})

  const load = useCallback(async () => {
    setIsLoading(true)
    try {
      const data = await fetchWebsites()
      setSites(data)
    } catch (err) {
      console.error(err)
      toast.error("Failed to load websites")
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const handleAdd = async () => {
    if (!newDomain.trim()) return
    setIsAdding(true)
    try {
      const site = await connectWebsite(newDomain.trim(), "Custom")
      setSites((prev) => [site, ...prev])
      setNewDomain("")
      toast.success(`Connected ${site.domainUrl}`)
    } catch (err) {
      console.error(err)
      toast.error("Failed to connect website")
    } finally {
      setIsAdding(false)
    }
  }

  const toggleCrawler = (siteId: string, crawler: string) => {
    setCrawlPrefs((prev) => ({
      ...prev,
      [siteId]: { ...prev[siteId], [crawler]: !(prev[siteId]?.[crawler] ?? true) },
    }))
  }

  return (
    <div className="space-y-5">
      <Card>
        <CardContent className="pt-6">
          <SectionHead title="Connected websites" sub="Sites Citationly is currently tracking." />
          <div className="flex gap-2 mb-4">
            <Input
              placeholder="Add a domain (e.g. blog.example.com)"
              value={newDomain}
              onChange={(e) => setNewDomain(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
              className="flex-1"
            />
            <Button onClick={handleAdd} disabled={isAdding || !newDomain.trim()}>
              <Plus className="w-4 h-4 mr-1.5" /> {isAdding ? "Adding…" : "Add domain"}
            </Button>
          </div>

          {isLoading ? (
            <div className="py-8 text-center text-sm text-muted-foreground">Loading…</div>
          ) : sites.length === 0 ? (
            <EmptyState icon={Globe} message="No websites connected yet." />
          ) : (
            <div className="space-y-2">
              {sites.map((site) => {
                const isOpen = expandedId === site.id
                const prefs = crawlPrefs[site.id] ?? {}
                return (
                  <div key={site.id} className="rounded-lg border border-border/60 overflow-hidden">
                    <button
                      onClick={() => setExpandedId(isOpen ? null : site.id)}
                      className="w-full flex items-center justify-between p-3 hover:bg-muted/50 transition-colors text-left"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <LogoAvatar
                          logoUrl={getDomainLogoUrl(site.domainUrl)}
                          fallbackInitial={site.domainUrl.charAt(0).toUpperCase()}
                          fallbackColor="#6366F1"
                          className="rounded-lg"
                          size={32}
                        />
                        <div className="min-w-0">
                          <div className="text-sm font-medium truncate">{site.domainUrl}</div>
                          <div className="text-xs text-muted-foreground">
                            {site.lastSyncAt ? `Last synced ${new Date(site.lastSyncAt).toLocaleDateString()}` : "Never synced"}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <div className="text-right hidden sm:block">
                          <div className="text-xs text-muted-foreground">Health</div>
                          <div className="text-sm font-semibold">{site.healthScore}/100</div>
                        </div>
                        <StatusPill kind={site.status === "Connected" ? "ok" : "warn"} text={site.status} />
                        {isOpen ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
                      </div>
                    </button>

                    {isOpen && (
                      <div className="p-4 border-t border-border/60 bg-muted/20 space-y-4">
                        <div>
                          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">AI crawl preferences</div>
                          <div className="grid grid-cols-2 gap-2">
                            {AI_CRAWLERS.map((crawler) => (
                              <div key={crawler} className="flex items-center justify-between p-2 rounded-md bg-background border border-border/60">
                                <span className="text-sm">{crawler}</span>
                                <Switch checked={prefs[crawler] ?? true} onCheckedChange={() => toggleCrawler(site.id, crawler)} />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
