"use client"

import { useCallback, useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/lib/toast"
import { Copy, KeyRound, Monitor, RefreshCw, ShieldCheck, ShieldPlus, Smartphone } from "lucide-react"
import { useAuthStore } from "@/lib/stores/auth-store"
import { SectionHead, StatusPill } from "./shared"
import {
  getAuditLogs,
  getDeletionPreview,
  getDeletionRequests,
  getRetentionPolicy,
  getSsoOverview,
  rotateScimToken,
  saveRetentionPolicy,
  saveSsoConnection,
  type AuditLog,
  type DataDeletionRequest,
  type DeletionPreview,
  type RetentionPolicy,
  type SsoOverview,
} from "@/lib/api/enterpriseApi"

const MOCK_DEVICES = [
  { id: "d1", name: "This device", os: "Current session", loc: "—", current: true },
]

export default function SecuritySection() {
  const { user } = useAuthStore()
  const [mfaEnabled, setMfaEnabled] = useState(false)
  const [sso, setSso] = useState<SsoOverview | null>(null)
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([])
  const [retention, setRetention] = useState<RetentionPolicy | null>(null)
  const [deletionPreview, setDeletionPreview] = useState<DeletionPreview | null>(null)
  const [deletionRequests, setDeletionRequests] = useState<DataDeletionRequest[]>([])
  const [ssoDomain, setSsoDomain] = useState("")
  const [metadataUrl, setMetadataUrl] = useState("")
  const [entityId, setEntityId] = useState("")
  const [ssoEnabled, setSsoEnabled] = useState(false)
  const [newScimToken, setNewScimToken] = useState<string | null>(null)
  const [rawEvidenceDays, setRawEvidenceDays] = useState("")
  const [auditLogDays, setAuditLogDays] = useState("365")
  const [snapshotDays, setSnapshotDays] = useState("1095")
  const [loadingEnterprise, setLoadingEnterprise] = useState(true)
  const [savingEnterprise, setSavingEnterprise] = useState(false)
  const notImplemented = () => toast.info("Coming soon")

  const loadEnterprise = useCallback(async () => {
    setLoadingEnterprise(true)
    try {
      const [ssoData, logs, retentionPolicy, preview, deletionReqs] = await Promise.all([
        getSsoOverview(),
        getAuditLogs(25),
        getRetentionPolicy(),
        getDeletionPreview(),
        getDeletionRequests(),
      ])
      setSso(ssoData)
      setAuditLogs(logs)
      setRetention(retentionPolicy)
      setDeletionPreview(preview)
      setDeletionRequests(deletionReqs)
      setSsoDomain(ssoData.connection?.domain ?? "")
      setMetadataUrl(ssoData.connection?.metadataUrl ?? "")
      setEntityId(ssoData.connection?.entityId ?? "")
      setSsoEnabled(ssoData.connection?.isEnabled ?? false)
      setRawEvidenceDays(retentionPolicy.rawPromptEvidenceDays?.toString() ?? "")
      setAuditLogDays(retentionPolicy.auditLogDays.toString())
      setSnapshotDays(retentionPolicy.snapshotDays.toString())
    } catch (err) {
      console.error(err)
      toast.error("Unable to load enterprise security settings")
    } finally {
      setLoadingEnterprise(false)
    }
  }, [])

  useEffect(() => {
    loadEnterprise()
  }, [loadEnterprise])

  const saveSso = async () => {
    setSavingEnterprise(true)
    try {
      await saveSsoConnection({
        provider: "OIDC",
        domain: ssoDomain.trim(),
        metadataUrl: metadataUrl.trim(),
        entityId: entityId.trim(),
        isEnabled: ssoEnabled,
      })
      toast.success("SSO settings saved")
      await loadEnterprise()
    } catch (err) {
      console.error(err)
      toast.error("Failed to save SSO settings")
    } finally {
      setSavingEnterprise(false)
    }
  }

  const createScimToken = async () => {
    setSavingEnterprise(true)
    try {
      const result = await rotateScimToken()
      setNewScimToken(result.token)
      toast.success(result.message)
      await loadEnterprise()
    } catch (err) {
      console.error(err)
      toast.error("Configure SSO before generating a SCIM token")
    } finally {
      setSavingEnterprise(false)
    }
  }

  const saveRetention = async () => {
    setSavingEnterprise(true)
    try {
      await saveRetentionPolicy({
        rawPromptEvidenceDays: rawEvidenceDays.trim() ? Number(rawEvidenceDays) : null,
        auditLogDays: Number(auditLogDays) || 365,
        snapshotDays: Number(snapshotDays) || 1095,
      })
      toast.success("Retention policy saved")
      await loadEnterprise()
    } catch (err) {
      console.error(err)
      toast.error("Failed to save retention policy")
    } finally {
      setSavingEnterprise(false)
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

  return (
    <div className="space-y-5">
      <Card>
        <CardContent className="pt-6">
          <SectionHead title="Password" />
          <div className="grid gap-4 max-w-md">
            <div><Label>Current password</Label><Input className="mt-1.5" type="password" /></div>
            <div><Label>New password</Label><Input className="mt-1.5" type="password" /></div>
            <div><Label>Confirm new password</Label><Input className="mt-1.5" type="password" /></div>
            <Button className="w-fit" onClick={notImplemented}>Update password</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <SectionHead title="Two-factor authentication" sub="Add an extra layer of security to your account." />
          <div className="flex items-center justify-between p-3 rounded-lg border border-border/60">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <ShieldCheck className="w-4.5 h-4.5" />
              </div>
              <div>
                <div className="text-sm font-medium">Authenticator app (TOTP)</div>
                <div className="text-xs text-muted-foreground">{user?.email}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <StatusPill kind={mfaEnabled ? "ok" : "neutral"} text={mfaEnabled ? "Enabled" : "Disabled"} />
              <Switch checked={mfaEnabled} onCheckedChange={(v) => { setMfaEnabled(v); notImplemented() }} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <SectionHead
            title="Enterprise SSO"
            sub="OIDC/SAML metadata control plane for enterprise tenants. Firebase self-serve auth remains enabled."
            action={<StatusPill kind={sso?.connection?.isEnabled ? "ok" : "neutral"} text={sso?.connection?.isEnabled ? "Enabled" : "Not enabled"} />}
          />
          <div className="space-y-3">
            <div className="grid gap-3 md:grid-cols-3">
              <div>
                <Label>Domain</Label>
                <Input className="mt-1.5" placeholder="company.com" value={ssoDomain} onChange={(e) => setSsoDomain(e.target.value)} />
              </div>
              <div>
                <Label>Metadata URL</Label>
                <Input className="mt-1.5" placeholder="https://idp.example.com/.well-known/openid-configuration" value={metadataUrl} onChange={(e) => setMetadataUrl(e.target.value)} />
              </div>
              <div>
                <Label>Entity / client ID</Label>
                <Input className="mt-1.5" placeholder="citationly-enterprise" value={entityId} onChange={(e) => setEntityId(e.target.value)} />
              </div>
            </div>
            <div className="rounded-lg border border-border/60 p-3 text-xs text-muted-foreground">
              <div>ACS / callback URL: <span className="font-mono">{sso?.assertionConsumerServiceUrl || "Loading..."}</span></div>
              <div className="mt-1">SCIM base URL: <span className="font-mono">{sso?.scimBaseUrl || "Loading..."}</span></div>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border/60 p-3">
              <span className="text-sm">Enable enterprise SSO routing</span>
              <Switch checked={ssoEnabled} onCheckedChange={setSsoEnabled} />
            </div>
            <Button onClick={saveSso} disabled={savingEnterprise || loadingEnterprise}>
              {savingEnterprise ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <ShieldPlus className="mr-2 h-4 w-4" />}
              Save SSO
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <SectionHead
            title="SCIM provisioning"
            sub="Generate an org-scoped bearer token for enterprise user provisioning."
            action={<StatusPill kind={sso?.connection?.hasScimToken ? "ok" : "neutral"} text={sso?.connection?.hasScimToken ? "Token active" : "No token"} />}
          />
          <Button onClick={createScimToken} disabled={savingEnterprise || !sso?.configured}>
            <KeyRound className="mr-2 h-4 w-4" /> Rotate SCIM token
          </Button>
          {newScimToken && (
            <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
              <p className="text-sm font-semibold text-emerald-900">New SCIM token</p>
              <p className="mt-1 break-all font-mono text-xs text-emerald-800">{newScimToken}</p>
              <Button className="mt-3" size="sm" variant="outline" onClick={() => copy(newScimToken)}>
                <Copy className="mr-2 h-4 w-4" /> Copy token
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <SectionHead title="Audit logs" sub="Sensitive admin, security, billing, SCIM, API-key, and report actions." />
          <div className="space-y-2">
            {auditLogs.length === 0 ? (
              <p className="rounded-lg border border-border/60 p-3 text-sm text-muted-foreground">
                {loadingEnterprise ? "Loading audit logs..." : "No audit events recorded yet."}
              </p>
            ) : (
              auditLogs.map((log) => (
                <div key={log.id} className="rounded-lg border border-border/60 p-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="text-sm font-medium">{log.action}</div>
                    <StatusPill kind={log.outcome === "Success" ? "ok" : "warn"} text={log.outcome} />
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {log.category} · {log.actorEmail || log.actorType} · {new Date(log.createdAt).toLocaleString()}
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <SectionHead
            title="Data retention"
            sub="Enterprise retention controls for raw evidence, audit history, and derived snapshots."
            action={<StatusPill kind="info" text={retention ? "Policy loaded" : "Default"} />}
          />
          <div className="grid gap-3 md:grid-cols-3">
            <div>
              <Label>Raw prompt evidence days</Label>
              <Input className="mt-1.5" placeholder="Blank = indefinite" value={rawEvidenceDays} onChange={(e) => setRawEvidenceDays(e.target.value)} />
            </div>
            <div>
              <Label>Audit log days</Label>
              <Input className="mt-1.5" value={auditLogDays} onChange={(e) => setAuditLogDays(e.target.value)} />
            </div>
            <div>
              <Label>Snapshot days</Label>
              <Input className="mt-1.5" value={snapshotDays} onChange={(e) => setSnapshotDays(e.target.value)} />
            </div>
          </div>
          <Button className="mt-3" onClick={saveRetention} disabled={savingEnterprise || loadingEnterprise}>
            Save retention policy
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <SectionHead
            title="Deletion readiness"
            sub="Preview-only organization deletion impact and pending deletion requests."
            action={<StatusPill kind="warn" text="No instant delete" />}
          />
          <div className="rounded-lg border border-border/60 p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Rows affected by full organization deletion</span>
              <span className="text-sm font-bold">{deletionPreview?.totalRows ?? 0}</span>
            </div>
            <div className="mt-3 grid gap-2 md:grid-cols-2">
              {Object.entries(deletionPreview?.tableCounts ?? {})
                .filter(([, count]) => count > 0)
                .slice(0, 10)
                .map(([table, count]) => (
                  <div key={table} className="flex justify-between rounded bg-muted/50 px-2 py-1 text-xs">
                    <span>{table}</span>
                    <span className="font-semibold">{count}</span>
                  </div>
                ))}
            </div>
          </div>
          <div className="mt-3 space-y-2">
            {deletionRequests.length === 0 ? (
              <p className="text-xs text-muted-foreground">No pending deletion requests.</p>
            ) : (
              deletionRequests.map((request) => (
                <div key={request.id} className="rounded-lg border border-border/60 p-3 text-xs">
                  <div className="flex justify-between gap-3">
                    <span className="font-medium">{request.status}</span>
                    <span>{new Date(request.scheduledFor).toLocaleString()}</span>
                  </div>
                  {request.reason && <p className="mt-1 text-muted-foreground">{request.reason}</p>}
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <SectionHead title="Active sessions" sub="Devices currently signed in to your account." />
          <div className="space-y-2">
            {MOCK_DEVICES.map((d) => (
              <div key={d.id} className="flex items-center justify-between p-3 rounded-lg border border-border/60">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
                    {d.name.toLowerCase().includes("phone") ? <Smartphone className="w-4 h-4" /> : <Monitor className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{d.name}</div>
                    <div className="text-xs text-muted-foreground">{d.os}</div>
                  </div>
                </div>
                {d.current ? <StatusPill kind="ok" text="Current session" /> : <Button size="sm" variant="ghost" onClick={notImplemented}>Revoke</Button>}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
