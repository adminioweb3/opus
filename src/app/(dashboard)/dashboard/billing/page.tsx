"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PRICING_PLANS, MOCK_INVOICES, MOCK_PAYMENT_METHODS, BILLING_USAGE } from "@/lib/mock-data/billing"
import { useOrganizationStore } from "@/lib/stores/organization-store"
import { usePermission } from "@/components/auth/PermissionGate"
import { formatDate, formatCurrency } from "@/lib/utils"
import { Check, CreditCard, Download, ArrowRight, Zap, Plus } from "lucide-react"

export default function BillingPage() {
  const { plan, upgradePlan } = useOrganizationStore()
  const canManage = usePermission("billing.manage")
  const [showUpgrade, setShowUpgrade] = useState(false)

  const currentPlan = PRICING_PLANS.find(p => p.id === `plan_${plan}`)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Billing & Subscription</h2>
        <p className="text-muted-foreground">Manage your plan, payment methods, and invoices.</p>
      </div>

      <Tabs defaultValue="plan">
        <TabsList>
          <TabsTrigger value="plan">Current Plan</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="payment">Payment Methods</TabsTrigger>
          <TabsTrigger value="usage">Usage</TabsTrigger>
        </TabsList>

        {/* Plan Tab */}
        <TabsContent value="plan" className="space-y-6 mt-4">
          <Card className="border-primary/20 bg-primary/2">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <Badge className="mb-2 capitalize">{plan} Plan</Badge>
                  <h3 className="text-2xl font-bold">{currentPlan ? formatCurrency(currentPlan.price) : "$0"}/month</h3>
                  <p className="text-sm text-muted-foreground mt-1">{currentPlan?.description}</p>
                </div>
                {canManage && (
                  <Button onClick={() => setShowUpgrade(!showUpgrade)}>
                    <Zap className="w-4 h-4 mr-2" /> Change Plan
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {showUpgrade && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {PRICING_PLANS.map(p => (
                <Card key={p.id} className={`relative ${p.popular ? "border-primary ring-1 ring-primary" : ""} ${p.id === `plan_${plan}` ? "opacity-60" : ""}`}>
                  {p.popular && <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Most Popular</Badge>}
                  <CardContent className="pt-8">
                    <h4 className="font-bold text-lg">{p.name}</h4>
                    <div className="mt-2 mb-4">
                      {p.price > 0 ? (
                        <span className="text-3xl font-bold">{formatCurrency(p.price)}<span className="text-sm font-normal text-muted-foreground">/mo</span></span>
                      ) : (
                        <span className="text-3xl font-bold">Custom</span>
                      )}
                    </div>
                    <ul className="space-y-2 mb-6">
                      {p.features.slice(0, 6).map(f => (
                        <li key={f} className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{f}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="w-full"
                      variant={p.id === `plan_${plan}` ? "outline" : p.popular ? "default" : "outline"}
                      disabled={p.id === `plan_${plan}`}
                      onClick={() => { upgradePlan(p.name.toLowerCase() as typeof plan); setShowUpgrade(false) }}
                    >
                      {p.id === `plan_${plan}` ? "Current Plan" : p.cta}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Invoices Tab */}
        <TabsContent value="invoices" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 text-xs font-medium text-muted-foreground">Date</th>
                    <th className="text-left p-4 text-xs font-medium text-muted-foreground">Plan</th>
                    <th className="text-left p-4 text-xs font-medium text-muted-foreground">Amount</th>
                    <th className="text-left p-4 text-xs font-medium text-muted-foreground">Status</th>
                    <th className="text-right p-4 text-xs font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_INVOICES.map(inv => (
                    <tr key={inv.id} className="border-b last:border-0 hover:bg-muted/50">
                      <td className="p-4 text-sm">{formatDate(inv.date)}</td>
                      <td className="p-4 text-sm">{inv.plan}</td>
                      <td className="p-4 text-sm font-medium">{formatCurrency(inv.amount)}</td>
                      <td className="p-4"><Badge variant="outline" className="text-xs capitalize text-emerald-600">{inv.status}</Badge></td>
                      <td className="p-4 text-right"><Button variant="ghost" size="sm"><Download className="w-4 h-4" /></Button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment Methods Tab */}
        <TabsContent value="payment" className="space-y-4 mt-4">
          {MOCK_PAYMENT_METHODS.map(pm => (
            <Card key={pm.id}>
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/2 flex items-center justify-center mb-4 text-primary">
                      <CreditCard className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="font-medium text-sm capitalize">{pm.type} •••• {pm.last4}</div>
                      <div className="text-xs text-muted-foreground">Expires {pm.expiry}</div>
                    </div>
                    {pm.isDefault && <Badge variant="outline" className="text-xs">Default</Badge>}
                  </div>
                  <Button variant="ghost" size="sm" className="text-xs">Edit</Button>
                </div>
              </CardContent>
            </Card>
          ))}
          {canManage && (
            <Button variant="outline" className="w-full"><Plus className="w-4 h-4 mr-2" /> Add Payment Method</Button>
          )}
        </TabsContent>

        {/* Usage Tab */}
        <TabsContent value="usage" className="space-y-4 mt-4">
          {Object.entries(BILLING_USAGE).map(([key, usage]) => (
            <Card key={key}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-medium capitalize text-sm">{key.replace(/([A-Z])/g, " $1")}</span>
                  <span className="text-sm text-muted-foreground">
                    {key === "apiCalls" ? `${(usage.used / 1000).toFixed(1)}k` : usage.used} / {usage.limit === -1 ? "∞" : key === "apiCalls" ? `${(usage.limit / 1000).toFixed(0)}k` : usage.limit}
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${usage.percentage > 80 ? "bg-amber-500" : usage.percentage > 95 ? "bg-red-500" : "bg-primary"}`}
                    style={{ width: `${Math.min(usage.percentage, 100)}%` }}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
