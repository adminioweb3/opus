"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { CreditCard, Download } from "lucide-react"
import { useOrganizationStore } from "@/lib/stores/organizationStore"
import { SectionHead, StatusPill } from "./shared"

const PLANS = [
  { name: "Starter", price: 99, feat: ["3 websites", "5 seats", "Daily crawls", "Email support"] },
  { name: "Business", price: 499, feat: ["25 websites", "20 seats", "Hourly crawls", "Priority support", "API access"] },
  { name: "Enterprise", price: null, feat: ["Unlimited websites", "Unlimited seats", "Real-time crawls", "SSO + SAML", "Dedicated CSM"] },
]

const INVOICES = [
  { id: "INV-2026-003", date: "May 2026", amount: "—", status: "Paid" },
  { id: "INV-2026-002", date: "Apr 2026", amount: "—", status: "Paid" },
  { id: "INV-2026-001", date: "Mar 2026", amount: "—", status: "Paid" },
]

export default function BillingSection() {
  const { planType, trialEndsAt, isTrialExpired } = useOrganizationStore()
  const notImplemented = () => toast.info("Billing management is coming soon")

  return (
    <div className="space-y-5">
      <Card>
        <CardContent className="pt-6">
          <SectionHead title="Current plan" />
          <div className="flex items-center justify-between p-4 rounded-lg border border-border/60 bg-muted/20">
            <div>
              <div className="text-lg font-bold">{planType || "Trial"} Plan</div>
              <div className="text-sm text-muted-foreground mt-1">
                {trialEndsAt
                  ? isTrialExpired
                    ? "Trial expired"
                    : `Trial ends ${new Date(trialEndsAt).toLocaleDateString()}`
                  : "Active subscription"}
              </div>
            </div>
            <StatusPill kind={isTrialExpired ? "bad" : "ok"} text={isTrialExpired ? "Expired" : "Active"} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <SectionHead title="Plans" sub="Compare and upgrade." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {PLANS.map((p) => (
              <div key={p.name} className={`p-4 rounded-lg border ${p.name.toLowerCase() === (planType || "").toLowerCase() ? "border-primary bg-primary/5" : "border-border/60"}`}>
                <div className="font-semibold mb-1">{p.name}</div>
                <div className="text-2xl font-bold mb-3">{p.price ? `$${p.price}` : "Custom"}{p.price && <span className="text-sm font-normal text-muted-foreground">/mo</span>}</div>
                <ul className="space-y-1.5 mb-4">
                  {p.feat.map((f) => (
                    <li key={f} className="text-xs text-muted-foreground">• {f}</li>
                  ))}
                </ul>
                <Button size="sm" variant="outline" className="w-full" onClick={notImplemented}>
                  {p.price ? "Switch plan" : "Contact sales"}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <SectionHead
            title="Payment method"
            action={<Button size="sm" variant="outline" onClick={notImplemented}><CreditCard className="w-3.5 h-3.5 mr-1.5" /> Update</Button>}
          />
          <div className="flex items-center gap-3 p-3 rounded-lg border border-border/60">
            <div className="w-10 h-6 bg-slate-200 rounded flex items-center justify-center text-[10px] font-bold text-slate-500">CARD</div>
            <div className="flex-1 text-sm text-muted-foreground">No payment method on file</div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <SectionHead title="Invoices" />
          <div className="space-y-2">
            {INVOICES.map((inv) => (
              <div key={inv.id} className="flex items-center justify-between p-2.5 rounded-lg border border-border/60 text-sm">
                <div>
                  <div className="font-medium">{inv.id}</div>
                  <div className="text-xs text-muted-foreground">{inv.date}</div>
                </div>
                <div className="flex items-center gap-3">
                  <StatusPill kind="ok" text={inv.status} />
                  <Button size="sm" variant="ghost" onClick={notImplemented}><Download className="w-4 h-4" /></Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
