"use client"

import { useCallback, useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "@/lib/toast"
import { CreditCard, Download, RefreshCw, Receipt } from "lucide-react"
import { useOrganizationStore } from "@/lib/stores/organizationStore"
import { SectionHead, StatusPill, EmptyState } from "./shared"
import {
  getSubscription,
  getInvoices,
  getPaymentMethods,
  createCheckoutSession,
  createPortalSession,
  extractBillingErrorMessage,
  type GetSubscriptionResponse,
  type InvoiceRecord,
  type PaymentMethodRecord,
} from "@/lib/api/billingApi"

const PLANS = [
  { key: "Pro", name: "Pro", price: 499, feat: ["Higher AI usage limits", "Daily recurring scans", "API access"] },
  { key: "Enterprise", name: "Enterprise", price: null, feat: ["Highest AI usage limits", "Regional & persona breakdowns", "Dedicated support"] },
]

function formatCents(cents: number, currency: string): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: currency.toUpperCase() || "USD" }).format(cents / 100)
}

export default function BillingSection() {
  const { planType, trialEndsAt, isTrialExpired } = useOrganizationStore()
  const [subscription, setSubscription] = useState<GetSubscriptionResponse | null>(null)
  const [invoices, setInvoices] = useState<InvoiceRecord[]>([])
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethodRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [pendingPlanKey, setPendingPlanKey] = useState<string | null>(null)
  const [isOpeningPortal, setIsOpeningPortal] = useState(false)

  const load = useCallback(async () => {
    setIsLoading(true)
    try {
      const [subResult, invoiceResult, methodResult] = await Promise.all([
        getSubscription(),
        getInvoices(),
        getPaymentMethods(),
      ])
      setSubscription(subResult)
      setInvoices(invoiceResult)
      setPaymentMethods(methodResult)
    } catch (err) {
      console.error(err)
      toast.error("Unable to load billing information")
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const activePlanKey = subscription?.subscription?.planKey ?? planType ?? "Trial"
  const billingConfigured = subscription?.billingConfigured ?? false

  const handleSwitchPlan = async (planKey: string) => {
    setPendingPlanKey(planKey)
    try {
      const { url } = await createCheckoutSession(planKey)
      window.location.href = url
    } catch (err) {
      console.error(err)
      toast.error(extractBillingErrorMessage(err, "Failed to start checkout"))
    } finally {
      setPendingPlanKey(null)
    }
  }

  const handleManageBilling = async () => {
    setIsOpeningPortal(true)
    try {
      const { url } = await createPortalSession()
      window.location.href = url
    } catch (err) {
      console.error(err)
      toast.error(extractBillingErrorMessage(err, "Failed to open the billing portal"))
    } finally {
      setIsOpeningPortal(false)
    }
  }

  return (
    <div className="space-y-5">
      {!billingConfigured && !isLoading && (
        <div className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-700">
          Billing isn't connected yet — plan changes and payment management aren't available until Stripe is configured
        </div>
      )}

      <Card>
        <CardContent className="pt-6">
          <SectionHead title="Current plan" />
          <div className="flex items-center justify-between p-4 rounded-lg border border-border/60 bg-muted/20">
            <div>
              <div className="text-lg font-bold">{activePlanKey} Plan</div>
              <div className="text-sm text-muted-foreground mt-1">
                {subscription?.subscription
                  ? `Status: ${subscription.subscription.status}${subscription.subscription.currentPeriodEnd ? ` · renews ${new Date(subscription.subscription.currentPeriodEnd).toLocaleDateString()}` : ""}`
                  : trialEndsAt
                    ? isTrialExpired
                      ? "Trial expired"
                      : `Trial ends ${new Date(trialEndsAt).toLocaleDateString()}`
                    : "No active subscription on file"}
              </div>
            </div>
            <StatusPill
              kind={subscription?.subscription?.status === "active" ? "ok" : isTrialExpired ? "bad" : "neutral"}
              text={subscription?.subscription?.status ?? (isTrialExpired ? "Expired" : "Trial")}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <SectionHead title="Plans" sub="Compare and upgrade." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {PLANS.map((p) => (
              <div key={p.key} className={`p-4 rounded-lg border ${p.key.toLowerCase() === activePlanKey.toLowerCase() ? "border-primary bg-primary/5" : "border-border/60"}`}>
                <div className="font-semibold mb-1">{p.name}</div>
                <div className="text-2xl font-bold mb-3">{p.price ? `$${p.price}` : "Custom"}{p.price && <span className="text-sm font-normal text-muted-foreground">/mo</span>}</div>
                <ul className="space-y-1.5 mb-4">
                  {p.feat.map((f) => (
                    <li key={f} className="text-xs text-muted-foreground">• {f}</li>
                  ))}
                </ul>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full"
                  disabled={pendingPlanKey === p.key || p.key.toLowerCase() === activePlanKey.toLowerCase()}
                  onClick={() => handleSwitchPlan(p.key)}
                >
                  {pendingPlanKey === p.key ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 mr-1.5 animate-spin" /> Starting checkout
                    </>
                  ) : p.key.toLowerCase() === activePlanKey.toLowerCase() ? (
                    "Current plan"
                  ) : p.price ? (
                    "Switch plan"
                  ) : (
                    "Contact sales"
                  )}
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
            action={
              <Button size="sm" variant="outline" onClick={handleManageBilling} disabled={isOpeningPortal}>
                <CreditCard className="w-3.5 h-3.5 mr-1.5" /> {isOpeningPortal ? "Opening…" : "Manage billing"}
              </Button>
            }
          />
          {isLoading ? (
            <EmptyState icon={CreditCard} message="Loading payment methods…" />
          ) : paymentMethods.length === 0 ? (
            <div className="flex items-center gap-3 p-3 rounded-lg border border-border/60">
              <div className="w-10 h-6 bg-slate-200 rounded flex items-center justify-center text-[10px] font-bold text-slate-500">CARD</div>
              <div className="flex-1 text-sm text-muted-foreground">No payment method on file</div>
            </div>
          ) : (
            <div className="space-y-2">
              {paymentMethods.map((pm) => (
                <div key={pm.id} className="flex items-center gap-3 p-3 rounded-lg border border-border/60">
                  <div className="w-10 h-6 bg-slate-200 rounded flex items-center justify-center text-[10px] font-bold text-slate-500 uppercase">
                    {pm.brand ?? "Card"}
                  </div>
                  <div className="flex-1 text-sm text-muted-foreground">
                    •••• {pm.last4 ?? "----"}
                    {pm.expMonth && pm.expYear ? ` · Expires ${pm.expMonth}/${pm.expYear}` : ""}
                  </div>
                  {pm.isDefault && <StatusPill kind="ok" text="Default" />}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <SectionHead title="Invoices" />
          {isLoading ? (
            <EmptyState icon={Receipt} message="Loading invoices…" />
          ) : invoices.length === 0 ? (
            <EmptyState icon={Receipt} message="No invoices yet." />
          ) : (
            <div className="space-y-2">
              {invoices.map((inv) => (
                <div key={inv.id} className="flex items-center justify-between p-2.5 rounded-lg border border-border/60 text-sm">
                  <div>
                    <div className="font-medium">{formatCents(inv.amountDueCents, inv.currency)}</div>
                    <div className="text-xs text-muted-foreground">
                      {inv.issuedAt ? new Date(inv.issuedAt).toLocaleDateString() : new Date(inv.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusPill kind={inv.status === "paid" ? "ok" : inv.status === "open" ? "warn" : "neutral"} text={inv.status} />
                    {inv.hostedInvoiceUrl && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => window.open(inv.hostedInvoiceUrl!, "_blank", "noopener,noreferrer")}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    )}
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
