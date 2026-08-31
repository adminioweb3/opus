"use client"

import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { toast } from "@/lib/toast"
import { CreditCard, Download, RefreshCw, Receipt } from "lucide-react"
import { useOrganizationStore } from "@/lib/stores/organizationStore"
import { SectionHead, StatusPill, EmptyState } from "./shared"
import {
  getSubscription,
  getInvoices,
  getPaymentMethods,
  createSubscriptionSession,
  cancelSubscription,
  extractBillingErrorMessage,
  type GetSubscriptionResponse,
  type InvoiceRecord,
  type PaymentMethodRecord,
} from "@/lib/api/billingApi"

const PLANS = [
  { key: "Pro", name: "Pro", priceLabel: "Configured in Cashfree", selfServe: true, feat: ["Higher AI usage limits", "Daily recurring scans", "API access"] },
  { key: "Enterprise", name: "Enterprise", priceLabel: "Contact sales", selfServe: false, feat: ["Highest AI usage limits", "Regional & persona breakdowns", "Dedicated support"] },
]

function formatCents(cents: number, currency: string): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: currency.toUpperCase() || "USD" }).format(cents / 100)
}

export default function BillingSection() {
  const router = useRouter()
  const { planType, trialEndsAt, isTrialExpired } = useOrganizationStore()
  const [subscription, setSubscription] = useState<GetSubscriptionResponse | null>(null)
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
          Billing isn't connected yet - plan changes are unavailable until Cashfree is configured
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
