"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuthStore } from "@/lib/stores/auth-store"
import { useOrganizationStore } from "@/lib/stores/organization-store"
import { usePermission } from "@/components/auth/PermissionGate"
import { Key, Copy, Plus, Trash2, RefreshCw, Eye, EyeOff, Shield, Bell, User, Building2 } from "lucide-react"

interface APIKey {
  id: string
  name: string
  key: string
  createdAt: string
  lastUsed: string | null
  status: "active" | "revoked"
}

const MOCK_API_KEYS: APIKey[] = [
  { id: "key_001", name: "Production API Key", key: "citationly_live_sk_a3f8b2c1d4e5f6g7h8i9j0k1l2m3n4o5", createdAt: "2024-06-15T10:00:00Z", lastUsed: new Date(Date.now() - 3600000).toISOString(), status: "active" },
  { id: "key_002", name: "Development Key", key: "citationly_test_sk_z9y8x7w6v5u4t3s2r1q0p9o8n7m6l5k4", createdAt: "2024-08-01T14:00:00Z", lastUsed: new Date(Date.now() - 86400000).toISOString(), status: "active" },
  { id: "key_003", name: "CI/CD Pipeline", key: "citationly_live_sk_j2k3l4m5n6o7p8q9r0s1t2u3v4w5x6y7", createdAt: "2024-09-10T09:00:00Z", lastUsed: null, status: "revoked" },
]

export default function SettingsPage() {
  const { user } = useAuthStore()
  const { orgName, orgDomain, updateOrg } = useOrganizationStore()
  const canManageSettings = usePermission("settings.manage")
  const canManageKeys = usePermission("apikeys.manage")

  // Profile state
  const [profileName, setProfileName] = useState(user?.name ?? "")
  const [profileTitle, setProfileTitle] = useState(user?.title ?? "")

  // Org state
  const [editOrgName, setEditOrgName] = useState(orgName)
  const [editOrgDomain, setEditOrgDomain] = useState(orgDomain)

  // API Keys state
  const [apiKeys, setApiKeys] = useState<APIKey[]>(MOCK_API_KEYS)
  const [showNewKeyForm, setShowNewKeyForm] = useState(false)
  const [newKeyName, setNewKeyName] = useState("")
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set())
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  // Notification prefs
  const [emailAlerts, setEmailAlerts] = useState(true)
  const [slackAlerts, setSlackAlerts] = useState(true)
  const [weeklyDigest, setWeeklyDigest] = useState(true)
  const [mentionAlerts, setMentionAlerts] = useState(true)

  const createApiKey = () => {
    if (!newKeyName.trim()) return
    const newKey: APIKey = {
      id: `key_${Date.now()}`,
      name: newKeyName,
      key: `citationly_live_sk_${Array.from({ length: 32 }, () => "abcdefghijklmnopqrstuvwxyz0123456789"[Math.floor(Math.random() * 36)]).join("")}`,
      createdAt: new Date().toISOString(),
      lastUsed: null,
      status: "active",
    }
    setApiKeys([newKey, ...apiKeys])
    setNewKeyName("")
    setShowNewKeyForm(false)
    setVisibleKeys(new Set([...visibleKeys, newKey.id]))
  }

  const revokeKey = (id: string) => {
    setApiKeys(apiKeys.map(k => k.id === id ? { ...k, status: "revoked" } : k))
  }

  const deleteKey = (id: string) => {
    setApiKeys(apiKeys.filter(k => k.id !== id))
  }

  const copyKey = (key: string, id: string) => {
    navigator.clipboard.writeText(key)
    setCopiedKey(id)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const toggleKeyVisibility = (id: string) => {
    const next = new Set(visibleKeys)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setVisibleKeys(next)
  }

  const maskKey = (key: string) => key.slice(0, 12) + "â€¢".repeat(24) + key.slice(-4)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">Manage your account, organization, and API access.</p>
      </div>

      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile"><User className="w-4 h-4 mr-2" /> Profile</TabsTrigger>
          <TabsTrigger value="organization"><Building2 className="w-4 h-4 mr-2" /> Organization</TabsTrigger>
          <TabsTrigger value="notifications"><Bell className="w-4 h-4 mr-2" /> Notifications</TabsTrigger>
          <TabsTrigger value="security"><Shield className="w-4 h-4 mr-2" /> Security</TabsTrigger>
          <TabsTrigger value="api-keys"><Key className="w-4 h-4 mr-2" /> API Keys</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-4 mt-4">
          <Card>
            <CardHeader><CardTitle>Profile Information</CardTitle><CardDescription>Update your personal details.</CardDescription></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Full Name</Label><Input className="mt-2" value={profileName} onChange={e => setProfileName(e.target.value)} /></div>
                <div><Label>Job Title</Label><Input className="mt-2" value={profileTitle} onChange={e => setProfileTitle(e.target.value)} /></div>
              </div>
              <div><Label>Email</Label><Input className="mt-2" value={user?.email ?? ""} disabled /></div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Organization Tab */}
        <TabsContent value="organization" className="space-y-4 mt-4">
          <Card>
            <CardHeader><CardTitle>Organization Settings</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div><Label>Company Name</Label><Input className="mt-2" value={editOrgName} onChange={e => setEditOrgName(e.target.value)} disabled={!canManageSettings} /></div>
              <div><Label>Domain</Label><Input className="mt-2" value={editOrgDomain} onChange={e => setEditOrgDomain(e.target.value)} disabled={!canManageSettings} /></div>
              {canManageSettings && <Button onClick={() => updateOrg({ orgName: editOrgName, orgDomain: editOrgDomain })}>Save</Button>}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-4 mt-4">
          <Card>
            <CardHeader><CardTitle>Notification Preferences</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              {[
                { label: "Email Alerts", desc: "Receive alerts via email", value: emailAlerts, setter: setEmailAlerts },
                { label: "Slack Notifications", desc: "Push alerts to Slack channels", value: slackAlerts, setter: setSlackAlerts },
                { label: "Weekly Digest", desc: "Receive a weekly summary report", value: weeklyDigest, setter: setWeeklyDigest },
                { label: "Mention Alerts", desc: "Alert when brand is mentioned in AI responses", value: mentionAlerts, setter: setMentionAlerts },
              ].map(pref => (
                <div key={pref.label} className="flex items-center justify-between">
                  <div><div className="font-medium text-sm">{pref.label}</div><div className="text-xs text-muted-foreground">{pref.desc}</div></div>
                  <Switch checked={pref.value} onCheckedChange={pref.setter} />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-4 mt-4">
          <Card>
            <CardHeader><CardTitle>Password</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div><Label>Current Password</Label><Input className="mt-2" type="password" /></div>
              <div><Label>New Password</Label><Input className="mt-2" type="password" /></div>
              <div><Label>Confirm New Password</Label><Input className="mt-2" type="password" /></div>
              <Button>Update Password</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Two-Factor Authentication</CardTitle><CardDescription>Add an extra layer of security to your account.</CardDescription></CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div><Badge variant={user?.twoFactorEnabled ? "default" : "secondary"}>{user?.twoFactorEnabled ? "Enabled" : "Disabled"}</Badge></div>
                <Button variant="outline">{user?.twoFactorEnabled ? "Disable 2FA" : "Enable 2FA"}</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* API Keys Tab */}
        <TabsContent value="api-keys" className="space-y-4 mt-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold">API Keys</h3>
              <p className="text-sm text-muted-foreground">Manage your API keys for programmatic access.</p>
            </div>
            {canManageKeys && (
              <Button onClick={() => setShowNewKeyForm(true)}>
                <Plus className="w-4 h-4 mr-2" /> Create Key
              </Button>
            )}
          </div>

          {showNewKeyForm && (
            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-3">
                  <Input placeholder="Key name (e.g. Production)" value={newKeyName} onChange={e => setNewKeyName(e.target.value)} onKeyDown={e => e.key === "Enter" && createApiKey()} className="flex-1" />
                  <Button onClick={createApiKey}>Create</Button>
                  <Button variant="outline" onClick={() => setShowNewKeyForm(false)}>Cancel</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {apiKeys.map(key => (
            <Card key={key.id} className={key.status === "revoked" ? "opacity-60" : ""}>
              <CardContent className="p-5">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">{key.name}</span>
                      <Badge variant={key.status === "active" ? "default" : "secondary"} className="text-xs capitalize">{key.status}</Badge>
                    </div>
                    <code className="text-xs text-muted-foreground font-mono block truncate">
                      {visibleKeys.has(key.id) ? key.key : maskKey(key.key)}
                    </code>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Button variant="ghost" size="sm" onClick={() => toggleKeyVisibility(key.id)}>
                      {visibleKeys.has(key.id) ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => copyKey(key.key, key.id)}>
                      {copiedKey === key.id ? <span className="text-xs text-emerald-500">Copied!</span> : <Copy className="w-4 h-4" />}
                    </Button>
                    {canManageKeys && key.status === "active" && (
                      <Button variant="ghost" size="sm" onClick={() => revokeKey(key.id)}>
                        <Trash2 className="w-4 h-4 text-muted-foreground" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
