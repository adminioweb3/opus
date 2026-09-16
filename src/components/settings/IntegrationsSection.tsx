"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { AxiosError } from "axios"
import { Check, Loader2, Plug, RefreshCw, Trash2, X } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/lib/toast"
import {
  disconnectIntegration,
  getIntegrations,
  testIntegration,
  upsertIntegration,
  type Integration,
} from "@/lib/api/integrationsApi"
import { getDomainLogoUrl } from "@/lib/logoUtils"
import { LogoAvatar } from "@/components/ui/logo-avatar"
import { SectionHead, StatusPill } from "./shared"

interface CatalogEntry {
  platformName: string
  category: string
  domain: string
  availability: "live" | "planned"
}

const CATALOG: CatalogEntry[] = [
  { platformName: "WordPress", category: "CMS", domain: "wordpress.org", availability: "live" },
  { platformName: "Shopify", category: "CMS", domain: "shopify.com", availability: "planned" },
  { platformName: "Webflow", category: "CMS", domain: "webflow.com", availability: "planned" },
  { platformName: "Google Search Console", category: "Analytics", domain: "google.com", availability: "planned" },
  { platformName: "Google Analytics", category: "Analytics", domain: "google.com", availability: "planned" },
  { platformName: "Bing Webmaster", category: "Analytics", domain: "bing.com", availability: "planned" },
  { platformName: "Semrush", category: "SEO", domain: "semrush.com", availability: "planned" },
  { platformName: "Ahrefs", category: "SEO", domain: "ahrefs.com", availability: "planned" },
  { platformName: "HubSpot", category: "CRM", domain: "hubspot.com", availability: "planned" },
  { platformName: "Slack", category: "Workflow", domain: "slack.com", availability: "planned" },
  { platformName: "GitHub", category: "Developer", domain: "github.com", availability: "planned" },
]

const CATEGORIES = ["All", ...Array.from(new Set(CATALOG.map((entry) => entry.category)))]

function errorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    const message = (error.response?.data as { message?: string } | undefined)?.message
    if (message) return message
  }
  return "The connection could not be completed."
}

function formatVerifiedAt(value: string | null): string {
  if (!value) return "Not verified"
  return `Verified ${new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" }).format(new Date(value))}`
}

export default function IntegrationsSection() {
  const [connected, setConnected] = useState<Integration[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState("All")
  const [connecting, setConnecting] = useState(false)
  const [siteUrl, setSiteUrl] = useState("")
  const [username, setUsername] = useState("")
  const [applicationPassword, setApplicationPassword] = useState("")
  const [pendingAction, setPendingAction] = useState<string | null>(null)

  const load = useCallback(async () => {
    setIsLoading(true)
    try {
      setConnected(await getIntegrations())
    } catch (error) {
      console.error(error)
      toast.error("Could not load integrations")
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    // The state update occurs after the integrations request resolves.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load()
  }, [load])

  const filtered = useMemo(
    () => activeCategory === "All" ? CATALOG : CATALOG.filter((entry) => entry.category === activeCategory),
    [activeCategory],
  )

  const submitWordPress = async () => {
    if (!siteUrl.trim() || !username.trim() || !applicationPassword.trim()) {
      toast.error("Site URL, username, and application password are required")
      return
    }
    setPendingAction("connect")
    try {
      await upsertIntegration({
        platformName: "WordPress",
        apiUrl: siteUrl.trim(),
        apiKey: `${username.trim()}:${applicationPassword.trim()}`,
      })
      setConnecting(false)
      setSiteUrl("")
      setUsername("")
      setApplicationPassword("")
      await load()
      toast.success("WordPress connected and verified")
    } catch (error) {
      console.error(error)
      toast.error(errorMessage(error))
    } finally {
      setPendingAction(null)
    }
  }

  const runTest = async (integration: Integration) => {
    setPendingAction(`test:${integration.id}`)
    try {
      const result = await testIntegration(integration.id)
      await load()
      if (result.connected) toast.success(result.message)
      else toast.error(result.message)
    } catch (error) {
      console.error(error)
      toast.error(errorMessage(error))
    } finally {
      setPendingAction(null)
    }
  }

  const disconnect = async (integration: Integration) => {
    if (!window.confirm(`Disconnect ${integration.platformName}?`)) return
    setPendingAction(`delete:${integration.id}`)
    try {
      await disconnectIntegration(integration.id)
      setConnected((current) => current.filter((item) => item.id !== integration.id))
      toast.success(`${integration.platformName} disconnected`)
    } catch (error) {
      console.error(error)
      toast.error(errorMessage(error))
    } finally {
      setPendingAction(null)
    }
  }

  return (
    <div className="space-y-5">
      <Card>
        <CardContent className="pt-6">
          <SectionHead title="Connected services" sub="Active connections for publishing and data access." />
          {isLoading ? (
            <div className="flex h-24 items-center justify-center"><Loader2 className="size-5 animate-spin text-muted-foreground" /></div>
          ) : connected.length === 0 ? (
            <div className="flex h-24 items-center justify-center gap-2 text-sm text-muted-foreground"><Plug className="size-4" /> No services connected</div>
          ) : (
            <div className="divide-y divide-border">
              {connected.map((integration) => (
                <div key={integration.id} className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center">
                  <LogoAvatar logoUrl={getDomainLogoUrl("wordpress.org")} fallbackInitial="W" fallbackColor="#21759B" className="rounded-lg" size={40} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold">{integration.platformName}</span>
                      <StatusPill kind={integration.status === "Connected" ? "ok" : "bad"} text={integration.status} />
                    </div>
                    <p className="mt-1 truncate text-xs text-muted-foreground">{integration.apiUrl} · {integration.credentialHint}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{integration.lastError || formatVerifiedAt(integration.lastVerifiedAt)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" onClick={() => void runTest(integration)} disabled={pendingAction !== null}>
                      {pendingAction === `test:${integration.id}` ? <Loader2 className="size-4 animate-spin" /> : <RefreshCw className="size-4" />} Test
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => void disconnect(integration)} disabled={pendingAction !== null} title="Disconnect">
                      {pendingAction === `delete:${integration.id}` ? <Loader2 className="size-4 animate-spin" /> : <Trash2 className="size-4" />}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <SectionHead title="Integration catalog" sub="Connect services supported by your Citationly workspace." />

          <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
            {CATEGORIES.map((category) => (
              <button key={category} onClick={() => setActiveCategory(category)} className={`whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${activeCategory === category ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/70"}`}>
                {category}
              </button>
            ))}
          </div>

          {connecting && (
            <div className="mb-5 border-y border-border bg-muted/30 px-1 py-4">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-semibold"><LogoAvatar logoUrl={getDomainLogoUrl("wordpress.org")} fallbackInitial="W" fallbackColor="#21759B" className="rounded-lg" size={28} /> Connect WordPress</div>
                <button onClick={() => setConnecting(false)} title="Close" className="flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted"><X className="size-4" /></button>
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                <label className="space-y-1.5 text-xs font-medium">WordPress site URL<Input type="url" autoComplete="url" placeholder="https://example.com" value={siteUrl} onChange={(event) => setSiteUrl(event.target.value)} /></label>
                <label className="space-y-1.5 text-xs font-medium">Username<Input autoComplete="username" value={username} onChange={(event) => setUsername(event.target.value)} /></label>
                <label className="space-y-1.5 text-xs font-medium">Application password<Input type="password" autoComplete="new-password" value={applicationPassword} onChange={(event) => setApplicationPassword(event.target.value)} /></label>
              </div>
              <div className="mt-3 flex justify-end gap-2">
                <Button size="sm" variant="outline" onClick={() => setConnecting(false)}>Cancel</Button>
                <Button size="sm" onClick={() => void submitWordPress()} disabled={pendingAction !== null}>
                  {pendingAction === "connect" ? <Loader2 className="size-4 animate-spin" /> : <Check className="size-4" />} Connect and verify
                </Button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((entry) => {
              const integration = connected.find((item) => item.platformName === entry.platformName)
              return (
                <div key={entry.platformName} className="flex min-h-18 items-center gap-3 rounded-md border border-border/70 p-3">
                  <LogoAvatar logoUrl={getDomainLogoUrl(entry.domain)} fallbackInitial={entry.platformName.charAt(0)} fallbackColor="#6366F1" className="rounded-lg" size={36} />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium">{entry.platformName}</div>
                    <div className="mt-1"><StatusPill kind={integration ? "ok" : "neutral"} text={integration ? "Connected" : entry.availability === "live" ? "Available" : "Planned"} /></div>
                  </div>
                  {entry.availability === "live" && !integration && (
                    <Button size="sm" variant="outline" onClick={() => setConnecting(true)}>Connect</Button>
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
