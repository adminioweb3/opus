"use client"

import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { toast } from "@/lib/toast"
import { Activity, CreditCard, Download, RefreshCw, Receipt } from "lucide-react"
import { useOrganizationStore } from "@/lib/stores/organizationStore"
import { SectionHead, StatusPill, EmptyState } from "./shared"
import {
  getSubscription,
  getBillingUsage,
  getInvoices,
  getPaymentMethods,
  createSubscriptionSession,
  cancelSubscription,
  extractBillingErrorMessage,
  type BillingUsageResponse,
  type GetSubscriptionResponse,
  type InvoiceRecord,
  type PaymentMethodRecord,
} from "@/lib/api/billingApi"

const PLANS = [
  { key: "Starter", name: "Starter", priceLabel: "$99/month", selfServe: true, feat: ["1 website", "Weekly scans", "OpenRouter and Exa usage controls"] },
  { key: "Pro", name: "Professional", priceLabel: "$299/month", selfServe: true, feat: ["Up to 5 websites", "Weekly full scans", "OpenRouter and Exa usage controls"] },
  { key: "Enterprise", name: "Enterprise", priceLabel: "$999/month", selfServe: false, feat: ["Contract-defined website allowance", "Daily change detection", "Dedicated support"] },
]

function formatCents(cents: number, currency: string): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: currency.toUpperCase() || "USD" }).format(cents / 100)
}

export default function BillingSection() {
  const router = useRouter()
  const { planType, trialEndsAt, isTrialExpired } = useOrganizationStore()
  const [subscription, setSubscription] = useState<GetSubscriptionResponse | null>(null)
  const [usage, setUsage] = useState<BillingUsageResponse | null>(null)
  const [invoices, setInvoices] = useState<InvoiceRecord[]>([])
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethodRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [pendingPlanKey, setPendingPlanKey] = useState<string | null>(null)
  const [isCancelling, setIsCancelling] = useState(false)
  const [selectedPlanKey, setSelectedPlanKey] = useState<string | null>(null)
  const [customerName, setCustomerName] = useState("")
  const [customerEmail, setCustomerEmail] = useState("")
  const [customerPhone, setCustomerPhone] = useState("")

  const load = useCallback(async () => {
    try {
      const [subResult, usageResult, invoiceResult, methodResult] = await Promise.all([
        getSubscription(),
        getBillingUsage(),
        getInvoices(),
        getPaymentMethods(),
      ])
      setSubscription(subResult)
      setUsage(usageResult)
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
    // The state updates happen only after the billing requests settle.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load()
  }, [load])

  const activePlanKey = subscription?.subscription?.planKey ?? planType ?? "Trial"
  const billingConfigured = subscription?.billingConfigured ?? false

  const handleStartAuthorization = async () => {
    if (!selectedPlanKey || !customerName.trim() || !customerEmail.trim() || !customerPhone.trim()) {
      toast.error("Enter your billing contact details to continue")
      return
    }
    const planKey = selectedPlanKey
    setPendingPlanKey(planKey)
    try {
      const session = await createSubscriptionSession(planKey, customerName, customerEmail, customerPhone)
      const cashfree = await getCashfree(session.environment)
      await cashfree.subscriptionsCheckout({ subsSessionId: session.sessionId, redirectTarget: "_self" })
      setSelectedPlanKey(null)
    } catch (err) {
      console.error(err)
      toast.error(extractBillingErrorMessage(err, "Failed to start Cashfree authorization"))
    } finally {
      setPendingPlanKey(null)
    }
  }

  const handleCancelSubscription = async () => {
    if (!window.confirm("Cancel this Cashfree subscription? Your paid access will end when Cashfree confirms the cancellation.")) return
    setIsCancelling(true)
    try {
      await cancelSubscription()
      await load()
      toast.success("Subscription cancelled")
    } catch (err) {
      console.error(err)
      toast.error(extractBillingErrorMessage(err, "Failed to cancel subscription"))
    } finally {
      setIsCancelling(false)
    }
  }

  return (
    <div className="space-y-5">
      {!billingConfigured && !isLoading && (
        <div className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-700">
          Billing isn&apos;t connected yet - plan changes are unavailable until Cashfree is configured
        </div>
      )}

      <Card>
        <CardContent className="pt-6">
          <SectionHead
            title="Current plan"
            action={subscription?.subscription?.cashfreeSubscriptionId && subscription.subscription.status.toLowerCase() === "active" ? (
              <Button size="sm" variant="outline" disabled={isCancelling} onClick={handleCancelSubscription}>
                {isCancelling ? "Cancelling..." : "Cancel subscription"}
              </Button>
            ) : undefined}
          />
          <div className="flex items-center justify-between p-4 rounded-lg border border-border/60 bg-muted/20">
            <div>
              <div className="text-lg font-bold">{activePlanKey} Plan</div>
              <div className="text-sm text-muted-foreground mt-1">
                {subscription?.subscription
                  ? `Status: ${subscription.subscription.status}${subscription.subscription.currentPeriodEnd ? ` - renews ${new Date(subscription.subscription.currentPeriodEnd).toLocaleDateString()}` : ""}`
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

      <Dialog open={selectedPlanKey !== null} onOpenChange={(open) => !open && setSelectedPlanKey(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Authorize {selectedPlanKey} plan</DialogTitle>
            <DialogDescription>Cashfree uses these details to create your recurring-payment mandate.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <Input aria-label="Billing name" autoComplete="name" placeholder="Billing name" value={customerName} onChange={(event) => setCustomerName(event.target.value)} />
            <Input aria-label="Billing email" autoComplete="email" type="email" placeholder="Billing email" value={customerEmail} onChange={(event) => setCustomerEmail(event.target.value)} />
            <Input aria-label="Mobile number" autoComplete="tel" inputMode="tel" placeholder="Indian mobile number" value={customerPhone} onChange={(event) => setCustomerPhone(event.target.value)} />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedPlanKey(null)}>Cancel</Button>
            <Button onClick={handleStartAuthorization} disabled={pendingPlanKey !== null}>
              {pendingPlanKey ? "Starting..." : "Continue to Cashfree"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Card>
        <CardContent className="pt-6">
          <SectionHead title="Plans" sub="Compare and upgrade." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {PLANS.map((p) => (
              <div key={p.key} className={`p-4 rounded-lg border ${p.key.toLowerCase() === activePlanKey.toLowerCase() ? "border-primary bg-primary/5" : "border-border/60"}`}>
                <div className="font-semibold mb-1">{p.name}</div>
                <div className="text-base font-semibold mb-3 text-muted-foreground">{p.priceLabel}</div>
                <ul className="space-y-1.5 mb-4">
                  {p.feat.map((f) => (
                    <li key={f} className="text-xs text-muted-foreground">- {f}</li>
                  ))}
                </ul>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full"
                  disabled={pendingPlanKey === p.key || p.key.toLowerCase() === activePlanKey.toLowerCase()}
                  onClick={() => p.selfServe ? setSelectedPlanKey(p.key) : router.push("/contact")}
                >
                  {pendingPlanKey === p.key ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 mr-1.5 animate-spin" /> Starting checkout
                    </>
                  ) : p.key.toLowerCase() === activePlanKey.toLowerCase() ? (
                    "Current plan"
                  ) : p.selfServe ? (
                    "Authorize with Cashfree"
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
            title="Usage and limits"
            sub={usage ? `Current UTC period: ${new Date(usage.periodStart).toLocaleDateString()} - ${new Date(usage.periodEnd).toLocaleDateString()}` : "Current plan usage from server-side counters."}
          />
          {isLoading ? (
            <EmptyState icon={Activity} message="Loading usage..." />
          ) : !usage ? (
            <EmptyState icon={Activity} message="Usage data is unavailable right now." />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <UsageMetricCard label={usage.aiCalls.label} value={usage.aiCalls.currentUsage} limit={usage.aiCalls.limit} unit={usage.aiCalls.unit} />
              <UsageMetricCard label={usage.publicApiCalls.label} value={usage.publicApiCalls.currentUsage} limit={usage.publicApiCalls.limit} unit={usage.publicApiCalls.unit} />
              <UsageMetricCard
                label={usage.estimatedAiSpend.label}
                value={usage.estimatedAiSpend.currentUsage / 1_000_000}
                limit={usage.estimatedAiSpend.limit === null ? null : usage.estimatedAiSpend.limit / 1_000_000}
                unit="USD today"
                currency
              />
              <UsageMetricCard
                label={usage.openRouterSpend.label}
                value={usage.openRouterSpend.currentUsage / 1_000_000}
                limit={usage.openRouterSpend.limit === null ? null : usage.openRouterSpend.limit / 1_000_000}
                unit="USD this month"
                currency
              />
              <UsageMetricCard
                label={usage.exaSpend.label}
                value={usage.exaSpend.currentUsage / 1_000_000}
                limit={usage.exaSpend.limit === null ? null : usage.exaSpend.limit / 1_000_000}
                unit="USD this month"
                currency
              />
              <div className="p-4 rounded-lg border border-border/60 bg-muted/20">
                <div className="text-xs uppercase tracking-wide text-muted-foreground">Scan cadence</div>
                <div className="mt-1 text-lg font-semibold">
                  {usage.recurringScanIntervalDays === null ? "Custom" : `Every ${usage.recurringScanIntervalDays} day${usage.recurringScanIntervalDays === 1 ? "" : "s"}`}
                </div>
                <p className="mt-1 text-xs text-muted-foreground">Configured by your active plan entitlement.</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <SectionHead title="Cashfree mandate" />
          {isLoading ? (
            <EmptyState icon={CreditCard} message="Loading Cashfree mandate..." />
          ) : paymentMethods.length === 0 ? (
            <EmptyState icon={CreditCard} message="Mandate details are managed securely by Cashfree." />
          ) : (
            <div className="space-y-2">
              {paymentMethods.map((pm) => (
                <div key={pm.id} className="flex items-center gap-3 p-3 rounded-lg border border-border/60">
                  <div className="w-10 h-6 bg-slate-200 rounded flex items-center justify-center text-[10px] font-bold text-slate-500 uppercase">
                    {pm.brand ?? "Card"}
                  </div>
                  <div className="flex-1 text-sm text-muted-foreground">
                    **** {pm.last4 ?? "----"}
                    {pm.expMonth && pm.expYear ? ` - Expires ${pm.expMonth}/${pm.expYear}` : ""}
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
            <EmptyState icon={Receipt} message="Loading invoices..." />
          ) : invoices.length === 0 ? (
            <EmptyState icon={Receipt} message="No Cashfree invoice records yet." />
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

function UsageMetricCard({
  label,
  value,
  limit,
  unit,
  currency = false,
}: {
  label: string
  value: number
  limit: number | null
  unit: string
  currency?: boolean
}) {
  const pct = limit && limit > 0 ? Math.min(100, Math.round((value / limit) * 100)) : null
  const formattedValue = currency ? `$${value.toFixed(4)}` : value.toLocaleString()
  const formattedLimit = limit === null ? "Unlimited" : currency ? `$${limit.toFixed(4)}` : limit.toLocaleString()

  return (
    <div className="p-4 rounded-lg border border-border/60 bg-muted/20">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
          <div className="mt-1 text-lg font-semibold">{formattedValue}</div>
        </div>
        <StatusPill kind={limit === null || (pct !== null && pct < 80) ? "ok" : pct !== null && pct < 100 ? "warn" : "bad"} text={formattedLimit} />
      </div>
      {pct !== null && (
        <div className="mt-3 h-2 rounded-full bg-muted overflow-hidden">
          <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
        </div>
      )}
      <p className="mt-2 text-xs text-muted-foreground">{unit}</p>
    </div>
  )
}

type CashfreeCheckout = {
  subscriptionsCheckout: (options: { subsSessionId: string; redirectTarget: "_self" | "_blank" }) => Promise<unknown>
}

async function getCashfree(environment: "sandbox" | "production"): Promise<CashfreeCheckout> {
  type CashfreeFactory = (options: { mode: "sandbox" | "production" }) => CashfreeCheckout
  const currentWindow = window as Window & { Cashfree?: CashfreeFactory }
  if (currentWindow.Cashfree) return currentWindow.Cashfree({ mode: environment })

  await new Promise<void>((resolve, reject) => {
    const script = document.createElement("script")
    script.src = "https://sdk.cashfree.com/js/v3/cashfree.js"
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error("Unable to load Cashfree checkout"))
    document.head.appendChild(script)
  })
  const loadedCashfree = currentWindow.Cashfree as CashfreeFactory | undefined
  if (!loadedCashfree) throw new Error("Cashfree checkout is unavailable")
  return loadedCashfree({ mode: environment })
}
