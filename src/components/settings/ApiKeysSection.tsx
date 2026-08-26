"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SectionLoader } from "@/components/ui/loader"
import { Key, Copy, RefreshCw, Trash2 } from "lucide-react"
import { toast } from "@/lib/toast"
import { SectionHead, EmptyState, StatusPill } from "./shared"
import { generateApiKey, getApiKeys, revokeApiKey, type ApiKeyRecord } from "@/lib/api/apiKeysApi"

export default function ApiKeysSection() {
  const [keys, setKeys] = useState<ApiKeyRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [name, setName] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedKey, setGeneratedKey] = useState<string | null>(null)
  const [generatedLabel, setGeneratedLabel] = useState<string | null>(null)
  const [revokingId, setRevokingId] = useState<string | null>(null)

  const load = useCallback(async () => {
    setIsLoading(true)
    try {
      const data = await getApiKeys()
      setKeys(data)
    } catch (err) {
      console.error(err)
      toast.error("Unable to load API keys")
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    queueMicrotask(() => {
      void load()
    })
  }, [load])

  const activeKeys = useMemo(() => keys.filter((key) => key.isActive), [keys])
  const revokedKeys = useMemo(() => keys.filter((key) => !key.isActive), [keys])

  const handleGenerate = async () => {
    const trimmedName = name.trim()
    if (!trimmedName) {
      toast.error("Give the API key a name first")
      return
    }

    setIsGenerating(true)
    try {
      const result = await generateApiKey({ name: trimmedName })
      setGeneratedKey(result.apiKey.key)
      setGeneratedLabel(result.apiKey.name)
      setName("")
      await load()
      toast.success(result.message)
    } catch (err) {
      console.error(err)
      toast.error("Failed to generate API key")
    } finally {
      setIsGenerating(false)
    }
  }

  const handleCopy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value)
      toast.success("API key copied to clipboard")
    } catch {
      toast.error("Could not copy the key")
    }
  }

  const handleRevoke = async (id: string) => {
    setRevokingId(id)
    try {
      await revokeApiKey(id)
      toast.success("API key revoked")
      await load()
    } catch (err) {
      console.error(err)
      toast.error("Failed to revoke API key")
    } finally {
      setRevokingId(null)
    }
  }

  return (
    <div className="space-y-5">
      <Card>
        <CardContent className="pt-6 space-y-5">
          <SectionHead
            title="API keys"
            sub="Server-generated workspace keys are created here and shown only once at creation time."
            action={<StatusPill kind="ok" text="Live" />}
          />

          <div className="grid gap-3 md:grid-cols-[1fr_auto]">
            <Input
              placeholder="Key name, e.g. Production dashboard"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Button onClick={handleGenerate} disabled={isGenerating}>
              {isGenerating ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> Generating
                </>
              ) : (
                <>
                  <Key className="mr-2 h-4 w-4" /> Generate key
                </>
              )}
            </Button>
          </div>

          {generatedKey && (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 space-y-3">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-emerald-900">New API key created</p>
                  <p className="text-xs text-emerald-700">Copy it now — the full value is only shown once.</p>
                </div>
                <StatusPill kind="ok" text="Copy now" />
              </div>
              <div className="flex flex-col gap-3 rounded-lg bg-white px-3 py-2 border border-emerald-100 md:flex-row md:items-center md:justify-between">
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-wide text-slate-500">{generatedLabel}</p>
                  <p className="font-mono text-sm break-all text-slate-900">{generatedKey}</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => handleCopy(generatedKey)}>
                  <Copy className="mr-2 h-4 w-4" /> Copy
                </Button>
              </div>
            </div>
          )}

          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-500">Active keys</p>
              <p className="text-2xl font-bold text-slate-900">{activeKeys.length}</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-500">Revoked keys</p>
              <p className="text-2xl font-bold text-slate-900">{revokedKeys.length}</p>
            </div>
          </div>

          <div>
            {isLoading ? (
              <SectionLoader className="min-h-32" label="Loading API keys..." />
            ) : keys.length === 0 ? (
              <EmptyState icon={Key} message="No API keys have been generated yet." />
            ) : (
              <div className="space-y-3">
                {keys.map((key) => (
                  <div key={key.id} className="rounded-xl border border-border/60 p-4 flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-semibold text-sm text-slate-900">{key.name}</p>
                        {key.isActive ? <StatusPill kind="ok" text="Active" /> : <StatusPill kind="neutral" text="Revoked" />}
                      </div>
                      <p className="mt-1 text-xs text-slate-500 font-mono">
                        {key.keyPrefix}…{key.last4}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        Created {new Date(key.createdAt).toLocaleDateString()}
                        {key.revokedAt ? ` • Revoked ${new Date(key.revokedAt).toLocaleDateString()}` : ""}
                      </p>
                    </div>
                    {key.isActive && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRevoke(key.id)}
                        disabled={revokingId === key.id}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        {revokingId === key.id ? "Revoking" : "Revoke"}
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
