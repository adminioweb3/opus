"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MOCK_INTEGRATIONS, type Integration } from "@/lib/mock-data/integrations"
import { usePermission } from "@/components/auth/PermissionGate"
import { Plug, Check, X, AlertTriangle, ExternalLink } from "lucide-react"

const categoryLabels = {
  communication: "Communication",
  crm: "CRM",
  analytics: "Analytics",
  automation: "Automation",
  productivity: "Productivity",
}

const statusStyles = {
  connected: "bg-emerald-100 text-emerald-700",
  disconnected: "bg-neutral-100 text-neutral-700",
  error: "bg-red-100 text-red-700",
}

export default function IntegrationsPage() {
  const [integrations, setIntegrations] = useState<Integration[]>(MOCK_INTEGRATIONS)
  const [filterCategory, setFilterCategory] = useState<string>("all")
  const canManage = usePermission("integrations.manage")

  const toggleConnection = (id: string) => {
    setIntegrations(integrations.map(int =>
      int.id === id
        ? { ...int, status: int.status === "connected" ? "disconnected" : "connected", connectedAt: int.status === "disconnected" ? new Date().toISOString() : null }
        : int
    ))
  }

  const categories = ["all", ...new Set(integrations.map(i => i.category))]
  const filtered = filterCategory === "all" ? integrations : integrations.filter(i => i.category === filterCategory)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Integrations</h2>
        <p className="text-muted-foreground">Connect OPUS with your favorite tools and platforms.</p>
      </div>

      {/* Category Filter */}
      <div className="flex items-center gap-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
              filterCategory === cat ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            {cat === "all" ? "All" : categoryLabels[cat as keyof typeof categoryLabels] ?? cat}
          </button>
        ))}
      </div>

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(integration => (
          <Card key={integration.id} className="hover:border-primary/30 transition-colors">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                    <Plug className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="font-semibold">{integration.name}</div>
                    <Badge className={`${statusStyles[integration.status]} border-0 text-xs capitalize mt-1`}>
                      {integration.status === "connected" && <Check className="w-3 h-3 mr-1" />}
                      {integration.status === "error" && <AlertTriangle className="w-3 h-3 mr-1" />}
                      {integration.status}
                    </Badge>
                  </div>
                </div>
                {integration.popular && <Badge variant="outline" className="text-xs">Popular</Badge>}
              </div>

              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{integration.description}</p>

              <div className="flex items-center gap-2">
                {canManage ? (
                  <Button
                    variant={integration.status === "connected" ? "outline" : "default"}
                    size="sm"
                    className="flex-1"
                    onClick={() => toggleConnection(integration.id)}
                  >
                    {integration.status === "connected" ? (
                      <><X className="w-4 h-4 mr-2" /> Disconnect</>
                    ) : (
                      <><Plug className="w-4 h-4 mr-2" /> Connect</>
                    )}
                  </Button>
                ) : (
                  <Button variant="outline" size="sm" className="flex-1" disabled>
                    {integration.status === "connected" ? "Connected" : "Contact Admin"}
                  </Button>
                )}
                {integration.configurable && integration.status === "connected" && (
                  <Button variant="outline" size="sm">Configure</Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
