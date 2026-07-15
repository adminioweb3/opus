"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"
import { Monitor, Smartphone, ShieldCheck } from "lucide-react"
import { useAuthStore } from "@/lib/stores/auth-store"
import { SectionHead, StatusPill } from "./shared"

const MOCK_DEVICES = [
  { id: "d1", name: "This device", os: "Current session", loc: "—", current: true },
]

export default function SecuritySection() {
  const { user } = useAuthStore()
  const [mfaEnabled, setMfaEnabled] = useState(false)
  const notImplemented = () => toast.info("Coming soon")

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
          <SectionHead title="Password policy" sub="Applies to all members of this organization." />
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Minimum length</span>
              <span className="text-sm font-medium">8 characters</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Require mixed case & numbers</span>
              <Switch checked={false} onCheckedChange={notImplemented} />
            </div>
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
