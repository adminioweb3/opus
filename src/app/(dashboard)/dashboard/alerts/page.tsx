"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { MOCK_ALERT_RULES, MOCK_NOTIFICATIONS, type AlertRule, type AlertNotification } from "@/lib/mock-data/alerts"
import { useNotificationStore } from "@/lib/stores/notification-store"
import { usePermission } from "@/components/auth/PermissionGate"
import { formatDate } from "@/lib/utils"
import { Bell, Plus, Trash2, Settings, AlertTriangle, Info, AlertCircle, Check } from "lucide-react"

const severityStyles = {
  info: "bg-blue-100 text-blue-700 border-blue-200",
  warning: "bg-amber-100 text-amber-700 border-amber-200",
  critical: "bg-red-100 text-red-700 border-red-200",
}

const severityIcons = { info: Info, warning: AlertTriangle, critical: AlertCircle }

export default function AlertsPage() {
  const [rules, setRules] = useState<AlertRule[]>(MOCK_ALERT_RULES)
  const { notifications, markAsRead, markAllAsRead } = useNotificationStore()
  const canCreate = usePermission("alerts.create")
  const canDelete = usePermission("alerts.delete")
  const [showAddRule, setShowAddRule] = useState(false)
  const [newRuleName, setNewRuleName] = useState("")

  const toggleRule = (id: string) => {
    setRules(rules.map(r => r.id === id ? { ...r, enabled: !r.enabled } : r))
  }

  const deleteRule = (id: string) => {
    setRules(rules.filter(r => r.id !== id))
  }

  const addRule = () => {
    if (!newRuleName.trim()) return
    const newRule: AlertRule = {
      id: `ar_${Date.now()}`,
      name: newRuleName,
      type: "brand_mention",
      enabled: true,
      threshold: null,
      channels: ["in_app"],
      createdAt: new Date().toISOString(),
      description: "Custom alert rule",
    }
    setRules([...rules, newRule])
    setNewRuleName("")
    setShowAddRule(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Alert Center</h2>
          <p className="text-muted-foreground">Manage alert rules and view notifications.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={markAllAsRead}>
            <Check className="w-4 h-4 mr-2" /> Mark All Read
          </Button>
          {canCreate && (
            <Button onClick={() => setShowAddRule(true)}>
              <Plus className="w-4 h-4 mr-2" /> Create Alert
            </Button>
          )}
        </div>
      </div>

      <Tabs defaultValue="notifications">
        <TabsList>
          <TabsTrigger value="notifications">
            Notifications
            {notifications.filter(n => !n.read).length > 0 && (
              <Badge variant="destructive" className="ml-2 text-[10px] px-1.5 py-0">{notifications.filter(n => !n.read).length}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="rules">Alert Rules</TabsTrigger>
        </TabsList>

        <TabsContent value="notifications" className="space-y-3 mt-4">
          {notifications.length === 0 ? (
            <div className="text-center py-16">
              <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">All caught up!</h3>
              <p className="text-muted-foreground">No notifications to show.</p>
            </div>
          ) : (
            notifications.map(notification => {
              const SeverityIcon = severityIcons[notification.severity]
              return (
                <Card
                  key={notification.id}
                  className={`cursor-pointer transition-colors ${!notification.read ? "border-l-4 border-l-primary bg-primary/2" : ""}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <div className={`p-2 rounded-lg shrink-0 ${severityStyles[notification.severity]}`}>
                        <SeverityIcon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">{notification.title}</span>
                          {!notification.read && <div className="w-2 h-2 rounded-full bg-primary shrink-0" />}
                        </div>
                        <p className="text-sm text-muted-foreground">{notification.message}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className="text-xs capitalize">{notification.platform}</Badge>
                          <span className="text-xs text-muted-foreground">{formatDate(notification.createdAt, "relative")}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })
          )}
        </TabsContent>

        <TabsContent value="rules" className="space-y-4 mt-4">
          {showAddRule && (
            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-3">
                  <Input placeholder="Alert rule name..." value={newRuleName} onChange={e => setNewRuleName(e.target.value)} onKeyDown={e => e.key === "Enter" && addRule()} className="flex-1" />
                  <Button onClick={addRule}>Create</Button>
                  <Button variant="outline" onClick={() => setShowAddRule(false)}>Cancel</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {rules.map(rule => (
            <Card key={rule.id}>
              <CardContent className="p-5">
                <div className="w-8 h-8 rounded-full bg-primary/2 flex items-center justify-center shrink-0">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-medium">{rule.name}</span>
                      <Badge variant="outline" className="text-xs capitalize">{rule.type.replace("_", " ")}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{rule.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      {rule.channels.map(ch => (
                        <Badge key={ch} variant="secondary" className="text-xs capitalize">{ch.replace("_", " ")}</Badge>
                      ))}
                      {rule.threshold && <span className="text-xs text-muted-foreground">Threshold: {rule.threshold}%</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <Switch checked={rule.enabled} onCheckedChange={() => toggleRule(rule.id)} />
                    {canDelete && (
                      <Button variant="ghost" size="sm" onClick={() => deleteRule(rule.id)}>
                        <Trash2 className="w-4 h-4 text-muted-foreground" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
