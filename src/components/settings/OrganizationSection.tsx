"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"
import { Pencil, Plus, Trash2, Image as ImageIcon, Info, Folder } from "lucide-react"
import { useOrganizationStore } from "@/lib/stores/organizationStore"
import { SettingsRow, SectionHead, StatusPill } from "./shared"

interface Workspace {
  id: string
  name: string
  members: number
  domain: string
}

const MOCK_WORKSPACES: Workspace[] = [
  { id: "w1", name: "Main workspace", members: 1, domain: "" },
]

const NOTIF_EVENTS = ["Citation gained", "Citation lost", "Competitor mention", "Weekly digest", "Agent completed", "Billing alerts"]
const NOTIF_CHANNELS: Array<{ key: "email" | "inapp" | "slack"; label: string }> = [
  { key: "email", label: "Email" },
  { key: "inapp", label: "In-app" },
  { key: "slack", label: "Slack" },
]

export default function OrganizationSection() {
  const { organizationName, websiteDomain, planType } = useOrganizationStore()

  // Real fields (from backend sync) vs. richer profile fields with no backend support yet —
  // kept as local state per the agreed "design now, wire backend per-section later" scope.
  const [industry, setIndustry] = useState("")
  const [size, setSize] = useState("")
  const [description, setDescription] = useState("")

  const [regNumber, setRegNumber] = useState("")
  const [taxId, setTaxId] = useState("")
  const [addr, setAddr] = useState("")
  const [contactName, setContactName] = useState("")
  const [contactEmail, setContactEmail] = useState("")

  const [tz, setTz] = useState("UTC")
  const [lang, setLang] = useState("English (US)")
  const [dateFmt, setDateFmt] = useState("MMM D, YYYY")
  const [currency, setCurrency] = useState("USD ($)")

  const [aiModel, setAiModel] = useState("GPT-4.1")
  const [aiFallback, setAiFallback] = useState("Claude Sonnet")

  const [notifMatrix, setNotifMatrix] = useState<Record<string, Record<string, boolean>>>(() =>
    Object.fromEntries(NOTIF_EVENTS.map((e) => [e, { email: true, inapp: true, slack: false }]))
  )

  const notImplemented = () => toast.info("This will save once organization settings are wired up on the backend")

  return (
    <div className="space-y-5">
      {/* Company profile — real fields where available */}
      <Card>
        <CardContent className="pt-6">
          <SectionHead
            title="Company profile"
            action={<Button size="sm" variant="outline" onClick={notImplemented}><Pencil className="w-3.5 h-3.5 mr-1.5" /> Edit</Button>}
          />
          <SettingsRow label="Organization name" value={organizationName || "—"} />
          <SettingsRow label="Primary domain" value={websiteDomain || "—"} />
          <SettingsRow label="Plan" value={<StatusPill kind="info" text={planType || "Trial"} />} />
          <SettingsRow label="Industry" value={industry || undefined} onClick={notImplemented} />
          <SettingsRow label="Company size" value={size ? `${size} employees` : undefined} onClick={notImplemented} />
          <SettingsRow label="Description" value={description || undefined} onClick={notImplemented} />
        </CardContent>
      </Card>

      {/* Brand identity */}
      <Card>
        <CardContent className="pt-6">
          <SectionHead title="Brand identity & assets" action={<Button size="sm" variant="outline" onClick={notImplemented}><Pencil className="w-3.5 h-3.5 mr-1.5" /> Edit</Button>} />
          <div className="grid grid-cols-3 gap-3">
            {["Logo (light)", "Logo (dark)", "Favicon"].map((label) => (
              <button
                key={label}
                onClick={notImplemented}
                className="aspect-square rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center gap-1.5 text-muted-foreground hover:border-primary/40 hover:text-primary transition-colors"
              >
                <ImageIcon className="w-5 h-5" />
                <span className="text-xs font-medium">{label}</span>
              </button>
            ))}
          </div>
          <div className="flex items-start gap-2 mt-4 text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg">
            <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
            Stored for exports & reports — does not override the app theme.
          </div>
        </CardContent>
      </Card>

      {/* Business information */}
      <Card>
        <CardContent className="pt-6">
          <SectionHead title="Business information" action={<Button size="sm" variant="outline" onClick={notImplemented}><Pencil className="w-3.5 h-3.5 mr-1.5" /> Edit</Button>} />
          <SettingsRow label="Registration number" value={regNumber || undefined} onClick={notImplemented} />
          <SettingsRow label="Tax ID / VAT" value={taxId || undefined} onClick={notImplemented} />
          <SettingsRow label="Billing address" value={addr || undefined} onClick={notImplemented} />
          <SettingsRow label="Primary contact" value={contactName ? `${contactName} · ${contactEmail}` : undefined} onClick={notImplemented} />
        </CardContent>
      </Card>

      {/* Preferences */}
      <Card>
        <CardContent className="pt-6">
          <SectionHead title="Organization preferences" action={<Button size="sm" variant="outline" onClick={notImplemented}><Pencil className="w-3.5 h-3.5 mr-1.5" /> Edit</Button>} />
          <SettingsRow label="Time zone" value={tz} onClick={notImplemented} />
          <SettingsRow label="Language" value={lang} onClick={notImplemented} />
          <SettingsRow label="Date format" value={dateFmt} onClick={notImplemented} />
          <SettingsRow label="Currency" value={currency} onClick={notImplemented} />
        </CardContent>
      </Card>

      {/* AI preferences */}
      <Card>
        <CardContent className="pt-6">
          <SectionHead title="AI preferences" action={<Button size="sm" variant="outline" onClick={notImplemented}><Pencil className="w-3.5 h-3.5 mr-1.5" /> Edit</Button>} />
          <SettingsRow label="Default model" value={<span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-xs font-semibold">{aiModel}</span>} onClick={notImplemented} />
          <SettingsRow label="Fallback model" value={<span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-xs font-semibold">{aiFallback}</span>} onClick={notImplemented} />
        </CardContent>
      </Card>

      {/* Workspaces */}
      <Card>
        <CardContent className="pt-6">
          <SectionHead
            title="Business units / workspaces"
            action={<Button size="sm" onClick={notImplemented}><Plus className="w-3.5 h-3.5 mr-1.5" /> New workspace</Button>}
          />
          <div className="space-y-2">
            {MOCK_WORKSPACES.map((w) => (
              <div key={w.id} className="flex items-center justify-between p-3 rounded-lg border border-border/60">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    <Folder className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">{w.name}</div>
                    <div className="text-xs text-muted-foreground">{w.members} member{w.members === 1 ? "" : "s"}{w.domain ? ` · ${w.domain}` : ""}</div>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={notImplemented}><Pencil className="w-4 h-4" /></Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Notification matrix */}
      <Card>
        <CardContent className="pt-6">
          <SectionHead title="Notification defaults" sub="Org-wide channel × event matrix" />
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-muted-foreground">
                  <th className="font-medium pb-2"></th>
                  {NOTIF_CHANNELS.map((c) => (
                    <th key={c.key} className="font-medium pb-2 text-center px-3">{c.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {NOTIF_EVENTS.map((ev) => (
                  <tr key={ev} className="border-t border-border/60">
                    <td className="py-2.5 pr-4 font-medium">{ev}</td>
                    {NOTIF_CHANNELS.map((c) => (
                      <td key={c.key} className="text-center px-3">
                        <Switch
                          checked={notifMatrix[ev]?.[c.key] ?? false}
                          onCheckedChange={(checked) =>
                            setNotifMatrix((prev) => ({ ...prev, [ev]: { ...prev[ev], [c.key]: checked } }))
                          }
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
