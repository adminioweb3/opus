"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { mockAlerts } from "@/lib/mock-data/revenue"
import { motion } from "framer-motion"
import { Bell, MessageSquare, Mail, Phone, Hash, AlertCircle, EyeOff, Target, Bot, Zap } from "lucide-react"

export default function RealTimeAlertsPage() {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case "Slack": return <Hash className="w-4 h-4 text-purple-500" />
      case "Teams": return <MessageSquare className="w-4 h-4 text-blue-500" />
      case "WhatsApp": return <Phone className="w-4 h-4 text-emerald-500" />
      case "Email": return <Mail className="w-4 h-4 text-amber-500" />
      default: return <Bell className="w-4 h-4" />
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Hallucination": return <Bot className="w-5 h-5 text-destructive" />
      case "Citation Lost": return <Target className="w-5 h-5 text-red-500" />
      case "Visibility Drop": return <EyeOff className="w-5 h-5 text-orange-500" />
      case "Competitor Overtook": return <AlertCircle className="w-5 h-5 text-amber-500" />
      case "New Opportunity": return <Zap className="w-5 h-5 text-emerald-500" />
      default: return <Bell className="w-5 h-5" />
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Real Time Alerts</h2>
        <p className="text-muted-foreground mt-1">
          Configure how and where your team gets notified about AI search events.
        </p>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid gap-6 lg:grid-cols-3">
        
        {/* Left Column: Configuration */}
        <motion.div variants={item} className="lg:col-span-1 space-y-4">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Routing Configuration</CardTitle>
              <CardDescription>Toggle alert channels for specific events.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {mockAlerts.config.map((conf, index) => (
                <div key={index} className="space-y-3 pb-4 border-b last:border-0 last:pb-0">
                  <div className="font-semibold text-sm flex items-center gap-2">
                    {getTypeIcon(conf.type)}
                    {conf.type}
                  </div>
                  <div className="grid grid-cols-2 gap-4 pl-7">
                    {["Slack", "Teams", "WhatsApp", "Email"].map(channel => (
                      <div key={channel} className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          {getChannelIcon(channel)}
                          <span className="text-xs text-muted-foreground">{channel}</span>
                        </div>
                        <Switch checked={conf.channels.includes(channel)} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Right Column: Live Feed */}
        <motion.div variants={item} className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Live Alert Feed</CardTitle>
              <CardDescription>Recent notifications successfully delivered to your team.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAlerts.feed.map((feedItem) => (
                  <div key={feedItem.id} className={`p-4 rounded-lg border flex gap-4 items-start ${
                    feedItem.priority === 'Critical' ? 'bg-destructive/5 border-destructive/20' :
                    feedItem.priority === 'High' ? 'bg-orange-500/5 border-orange-500/20' :
                    'bg-muted/30 border-border'
                  }`}>
                    <div className="mt-0.5">
                      {getTypeIcon(feedItem.type)}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm">{feedItem.type}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-background border shadow-sm flex items-center gap-1">
                            {getChannelIcon(feedItem.channel)}
                            Sent to {feedItem.channel}
                          </span>
                          <span className="text-[10px] text-muted-foreground">{feedItem.time}</span>
                        </div>
                      </div>
                      <p className="text-sm text-foreground/80">{feedItem.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

      </motion.div>
    </div>
  )
}
