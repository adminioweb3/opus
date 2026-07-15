"use client"

import { useCallback, useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { getIntegrations, upsertIntegration, Integration } from "@/lib/api/integrationsApi"
import { getDomainLogoUrl } from "@/lib/logoUtils"
import { LogoAvatar } from "@/components/ui/logo-avatar"
import { SectionHead, StatusPill } from "./shared"

// Catalog is a design/UX surface — real connections go through the generic API-key-based
// /Integrations endpoint already used by WordPress. OAuth-based providers here have no backend
// flow yet, so "Connect" is a clear "coming soon" rather than a fake success.
interface CatalogEntry {
  platformName: string
  category: string
  domain: string
  authType: "apikey" | "oauth"
}

const CATALOG: CatalogEntry[] = [
  { platformName: "WordPress", category: "CMS", domain: "wordpress.org", authType: "apikey" },
  { platformName: "Shopify", category: "CMS", domain: "shopify.com", authType: "oauth" },
  { platformName: "Webflow", category: "CMS", domain: "webflow.com", authType: "oauth" },
  { platformName: "Google Search Console", category: "Search & Analytics", domain: "google.com", authType: "oauth" },
  { platformName: "Google Analytics", category: "Search & Analytics", domain: "google.com", authType: "oauth" },
  { platformName: "Bing Webmaster", category: "Search & Analytics", domain: "bing.com", authType: "apikey" },
  { platformName: "Semrush", category: "SEO Tools", domain: "semrush.com", authType: "apikey" },
  { platformName: "Ahrefs", category: "SEO Tools", domain: "ahrefs.com", authType: "apikey" },
  { platformName: "HubSpot", category: "CRM", domain: "hubspot.com", authType: "oauth" },
  { platformName: "Salesforce", category: "CRM", domain: "salesforce.com", authType: "oauth" },
  { platformName: "Slack", category: "Productivity", domain: "slack.com", authType: "oauth" },
  { platformName: "Zapier", category: "Productivity", domain: "zapier.com", authType: "apikey" },
  { platformName: "Cloudflare", category: "Infra & Dev", domain: "cloudflare.com", authType: "apikey" },
  { platformName: "GitHub", category: "Infra & Dev", domain: "github.com", authType: "oauth" },
]

const CATEGORIES = ["All", ...Array.from(new Set(CATALOG.map((c) => c.category)))]

export default function IntegrationsSection() {
  const [connected, setConnected] = useState<Integration[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState("All")
  const [connectingPlatform, setConnectingPlatform] = useState<string | null>(null)
  const [apiUrl, setApiUrl] = useState("")
  const [apiKey, setApiKey] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  const load = useCallback(async () => {
    setIsLoading(true)
    try {
      const data = await getIntegrations()
      setConnected(data)
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const isConnected = (platformName: string) => connected.some((c) => c.platformName === platformName)

  const handleConnect = async (entry: CatalogEntry) => {
    if (entry.authType === "oauth") {
      toast.info(`${entry.platformName} OAuth connection coming soon`)
      return
    }
    setConnectingPlatform(entry.platformName)
    setApiUrl("")
    setApiKey("")
  }

  const submitConnect = async () => {
    if (!connectingPlatform || !apiKey.trim()) {
      toast.error("API key is required")
      return
    }
    setIsSaving(true)
    try {
      await upsertIntegration({ platformName: connectingPlatform, apiUrl: apiUrl.trim(), apiKey: apiKey.trim() })
      toast.success(`${connectingPlatform} connected`)
      setConnectingPlatform(null)
      load()
    } catch (err) {
      console.error(err)
      toast.error("Failed to connect — check the API key and try again")
    } finally {
      setIsSaving(false)
    }
  }

  const filtered = activeCategory === "All" ? CATALOG : CATALOG.filter((c) => c.category === activeCategory)

  return (
    <div className="space-y-5">
      <Card>
        <CardContent className="pt-6">
          <SectionHead title="Integrations" sub="Connect analytics, CRM, CMS, infra and AI providers." />

          <div className="flex gap-2 overflow-x-auto pb-1 mb-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                  activeCategory === cat ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/70"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {connectingPlatform && (
            <div className="mb-4 p-4 rounded-lg border border-primary/30 bg-primary/5 space-y-3">
              <div className="text-sm font-semibold">Connect {connectingPlatform}</div>
              <Input placeholder="API URL (optional)" value={apiUrl} onChange={(e) => setApiUrl(e.target.value)} />
              <Input placeholder="API key" type="password" value={apiKey} onChange={(e) => setApiKey(e.target.value)} />
              <div className="flex gap-2">
                <Button size="sm" onClick={submitConnect} disabled={isSaving}>{isSaving ? "Connecting…" : "Connect"}</Button>
                <Button size="sm" variant="outline" onClick={() => setConnectingPlatform(null)}>Cancel</Button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filtered.map((entry) => {
              const connectedNow = isConnected(entry.platformName)
              return (
                <div key={entry.platformName} className="p-4 rounded-lg border border-border/60 flex items-center gap-3">
                  <LogoAvatar
                    logoUrl={getDomainLogoUrl(entry.domain)}
                    fallbackInitial={entry.platformName.charAt(0)}
                    fallbackColor="#6366F1"
                    className="rounded-lg"
                    size={36}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{entry.platformName}</div>
                    <div className="mt-1">
                      {connectedNow ? <StatusPill kind="ok" text="Connected" /> : <StatusPill kind="neutral" text="Not connected" />}
                    </div>
                  </div>
                  {!connectedNow && (
                    <Button size="sm" variant="outline" onClick={() => handleConnect(entry)} disabled={isLoading}>
                      Connect
                    </Button>
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
