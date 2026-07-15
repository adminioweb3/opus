"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { Key, Plus, Copy, Eye, EyeOff, Trash2 } from "lucide-react"
import { SectionHead, StatusPill, EmptyState } from "./shared"

interface ApiKey {
  id: string
  name: string
  key: string
  env: "Production" | "Staging"
  createdAt: string
  lastUsed: string | null
  status: "active" | "revoked"
}

function generateKey() {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789"
  return "citationly_live_sk_" + Array.from({ length: 32 }, () => chars[Math.floor(Math.random() * chars.length)]).join("")
}

const maskKey = (key: string) => key.slice(0, 20) + "•".repeat(20) + key.slice(-4)

export default function ApiKeysSection() {
  const [keys, setKeys] = useState<ApiKey[]>([])
  const [newKeyName, setNewKeyName] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [visible, setVisible] = useState<Set<string>>(new Set())

  const createKey = () => {
    if (!newKeyName.trim()) return
    const key: ApiKey = {
      id: `key_${Date.now()}`,
      name: newKeyName.trim(),
      key: generateKey(),
      env: "Production",
      createdAt: new Date().toISOString(),
      lastUsed: null,
      status: "active",
    }
    setKeys((prev) => [key, ...prev])
    setVisible((prev) => new Set(prev).add(key.id))
    setNewKeyName("")
    setShowForm(false)
    toast.info("This key isn't backed by real API authentication yet — persistence is coming soon")
  }

  const toggleVisible = (id: string) => {
    setVisible((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const copyKey = (key: string) => {
    navigator.clipboard.writeText(key)
    toast.success("Copied to clipboard")
  }

  const revokeKey = (id: string) => {
    setKeys((prev) => prev.map((k) => (k.id === id ? { ...k, status: "revoked" } : k)))
  }

  return (
    <div className="space-y-5">
      <Card>
        <CardContent className="pt-6">
          <SectionHead
            title="API keys"
            sub="Programmatic access to your organization's data."
            action={<Button size="sm" onClick={() => setShowForm(true)}><Plus className="w-3.5 h-3.5 mr-1.5" /> Create key</Button>}
          />

          {showForm && (
            <div className="mb-4 p-4 rounded-lg border border-primary/30 bg-primary/5 flex gap-2">
              <Input
                placeholder="Key name (e.g. Production)"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && createKey()}
                className="flex-1"
              />
              <Button size="sm" onClick={createKey}>Create</Button>
              <Button size="sm" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
            </div>
          )}

          {keys.length === 0 ? (
            <EmptyState icon={Key} message="No API keys yet." />
          ) : (
            <div className="space-y-2">
              {keys.map((k) => (
                <div key={k.id} className={`p-4 rounded-lg border border-border/60 ${k.status === "revoked" ? "opacity-60" : ""}`}>
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium">{k.name}</span>
                        <StatusPill kind={k.status === "active" ? "ok" : "neutral"} text={k.status} />
                        <span className="text-xs text-muted-foreground">{k.env}</span>
                      </div>
                      <code className="text-xs text-muted-foreground font-mono block truncate">
                        {visible.has(k.id) ? k.key : maskKey(k.key)}
                      </code>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <Button variant="ghost" size="sm" onClick={() => toggleVisible(k.id)}>
                        {visible.has(k.id) ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => copyKey(k.key)}><Copy className="w-4 h-4" /></Button>
                      {k.status === "active" && (
                        <Button variant="ghost" size="sm" onClick={() => revokeKey(k.id)}><Trash2 className="w-4 h-4 text-muted-foreground" /></Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
