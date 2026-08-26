"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { BriefcaseBusiness, Copy, ExternalLink, RefreshCw, Share2, Sparkles, Users } from "lucide-react"
import { toast } from "@/lib/toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { SectionLoader } from "@/components/ui/loader"
import {
  addAgencyClient,
  createReportShareLink,
  getAgencyOverview,
  saveAgency,
  saveWhiteLabel,
  type AgencyOverview,
  type ReportShareLink,
} from "@/lib/api/agencyApi"
import { EmptyState, SectionHead, StatusPill } from "./shared"

export default function AgencySection() {
  const [overview, setOverview] = useState<AgencyOverview | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [agencyName, setAgencyName] = useState("")
  const [clientOrgId, setClientOrgId] = useState("")
  const [clientName, setClientName] = useState("")
  const [brandName, setBrandName] = useState("")
  const [logoUrl, setLogoUrl] = useState("")
  const [primaryColor, setPrimaryColor] = useState("#4F46E5")
  const [shareOrgId, setShareOrgId] = useState("")
  const [latestLink, setLatestLink] = useState<ReportShareLink | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const data = await getAgencyOverview()
      setOverview(data)
      setAgencyName(data.agency?.name ?? "")
      setBrandName(data.whiteLabel?.brandName ?? data.agency?.name ?? "")
      setLogoUrl(data.whiteLabel?.logoUrl ?? "")
      setPrimaryColor(data.whiteLabel?.primaryColor ?? "#4F46E5")
    } catch (err) {
      console.error(err)
      toast.error("Unable to load agency settings")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    queueMicrotask(() => {
      void load()
    })
  }, [load])

  const clientOptions = useMemo(() => overview?.clients ?? [], [overview])

  const handleSaveAgency = async () => {
    if (!agencyName.trim()) {
      toast.error("Agency name is required")
      return
    }

    setSaving(true)
    try {
      await saveAgency(agencyName.trim())
      toast.success("Agency workspace saved")
      await load()
    } catch (err) {
      console.error(err)
      toast.error("Failed to save agency workspace")
    } finally {
      setSaving(false)
    }
  }

  const handleAddClient = async () => {
    if (!clientOrgId.trim()) {
      toast.error("Client organization id is required")
      return
    }

    setSaving(true)
    try {
      await addAgencyClient({
        clientOrganizationId: clientOrgId.trim(),
        clientName: clientName.trim(),
        role: "Manager",
      })
      setClientOrgId("")
      setClientName("")
      toast.success("Client workspace connected")
      await load()
    } catch (err) {
      console.error(err)
      toast.error("Failed to connect client")
    } finally {
      setSaving(false)
    }
  }

  const handleSaveWhiteLabel = async () => {
    setSaving(true)
    try {
      await saveWhiteLabel({
        brandName: brandName.trim(),
        logoUrl: logoUrl.trim(),
        primaryColor: primaryColor.trim() || "#4F46E5",
      })
      toast.success("White-label branding saved")
      await load()
    } catch (err) {
      console.error(err)
      toast.error("Failed to save white-label branding")
    } finally {
      setSaving(false)
    }
  }

  const handleCreateLink = async () => {
    setSaving(true)
    try {
      const link = await createReportShareLink({
        organizationId: shareOrgId || undefined,
        reportType: "Executive",
        expiresInDays: 30,
      })
      setLatestLink(link)
      toast.success("Share link created")
    } catch (err) {
      console.error(err)
      toast.error("Failed to create share link")
    } finally {
      setSaving(false)
    }
  }

  const copy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value)
      toast.success("Copied")
    } catch {
      toast.error("Could not copy")
    }
  }

  if (loading) {
    return <SectionLoader label="Loading agency settings..." />
  }

  return (
    <div className="space-y-5">
      <Card>
        <CardContent className="pt-6 space-y-4">
          <SectionHead
            title="Agency workspace"
            sub="Create a parent agency layer for client workspaces and branded reports."
            action={<StatusPill kind={overview?.configured ? "ok" : "warn"} text={overview?.configured ? "Configured" : "Setup needed"} />}
          />
          <div className="grid gap-3 md:grid-cols-[1fr_auto]">
            <Input placeholder="Agency name" value={agencyName} onChange={(e) => setAgencyName(e.target.value)} />
            <Button onClick={handleSaveAgency} disabled={saving}>
              {saving ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <BriefcaseBusiness className="mr-2 h-4 w-4" />}
              Save agency
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6 space-y-4">
          <SectionHead
            title="Client workspaces"
            sub="Add client organization IDs that this agency is allowed to manage and report on."
            action={<StatusPill kind="info" text={`${clientOptions.length} clients`} />}
          />
          <div className="grid gap-3 md:grid-cols-[1fr_1fr_auto]">
            <Input placeholder="Client organization UUID" value={clientOrgId} onChange={(e) => setClientOrgId(e.target.value)} />
            <Input placeholder="Client display name" value={clientName} onChange={(e) => setClientName(e.target.value)} />
            <Button onClick={handleAddClient} disabled={saving || !overview?.configured}>
              <Users className="mr-2 h-4 w-4" /> Add client
            </Button>
          </div>
          <div className="space-y-3">
            {clientOptions.length === 0 ? (
              <EmptyState icon={Users} message="No client workspaces connected yet." />
            ) : (
              clientOptions.map((client) => (
                <div key={client.id} className="rounded-xl border border-border/60 p-4">
                  <p className="font-semibold text-sm">{client.clientName || "Unnamed client"}</p>
                  <p className="mt-1 font-mono text-xs text-muted-foreground">{client.clientOrganizationId}</p>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6 space-y-4">
          <SectionHead title="White-label reports" sub="Brand shared executive reports before sending them to clients." action={<Sparkles className="h-4 w-4 text-primary" />} />
          <div className="grid gap-3 md:grid-cols-3">
            <Input placeholder="Brand name" value={brandName} onChange={(e) => setBrandName(e.target.value)} />
            <Input placeholder="Logo URL" value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} />
            <Input placeholder="#4F46E5" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} />
          </div>
          <Button onClick={handleSaveWhiteLabel} disabled={saving || !overview?.configured}>Save branding</Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6 space-y-4">
          <SectionHead title="Share report" sub="Generate a 30-day token-scoped report link for your agency org or a connected client." action={<Share2 className="h-4 w-4 text-primary" />} />
          <select
            value={shareOrgId}
            onChange={(e) => setShareOrgId(e.target.value)}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="">Agency organization</option>
            {clientOptions.map((client) => (
              <option key={client.id} value={client.clientOrganizationId}>
                {client.clientName || client.clientOrganizationId}
              </option>
            ))}
          </select>
          <Button onClick={handleCreateLink} disabled={saving || !overview?.configured}>
            <Share2 className="mr-2 h-4 w-4" /> Create share link
          </Button>
          {latestLink && (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
              <p className="text-sm font-semibold text-emerald-900">Report link ready</p>
              <p className="mt-1 break-all font-mono text-xs text-emerald-800">{latestLink.shareUrl}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button size="sm" variant="outline" onClick={() => copy(latestLink.shareUrl)}>
                  <Copy className="mr-2 h-4 w-4" /> Copy
                </Button>
                <Button size="sm" variant="outline" onClick={() => window.open(latestLink.shareUrl, "_blank")}>
                  <ExternalLink className="mr-2 h-4 w-4" /> Open
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
