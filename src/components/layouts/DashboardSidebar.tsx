"use client"

import { 
  BarChart3, 
  Settings, 
  Activity, 
  Target, 
  ShieldCheck, 
  BrainCircuit, 
  PieChart, 
  FileText, 
  Bell, 
  Users, 
  CreditCard, 
  Plug,
  Key,
  Lightbulb,
  Bot,
  Sparkles,
  TrendingUp,
  Lock
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuthStore } from "@/lib/stores/auth-store"
import { useOrganizationStore } from "@/lib/stores/organization-store"
import { hasPermission } from "@/lib/utils"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar"

const coreItems = [
  { title: "Overview", url: "/dashboard", icon: BarChart3, permission: "dashboard.view" },
  { title: "AI Monitoring", url: "/dashboard/monitoring", icon: Activity, permission: "monitoring.view" },
  { title: "Brand Intelligence", url: "/dashboard/brand", icon: ShieldCheck, permission: "brand.view" },
  { title: "Competitors", url: "/dashboard/competitors", icon: Target, permission: "competitors.view" },
]

const modelsItems = [
  { title: "ChatGPT", url: "/dashboard/models?platform=chatgpt", icon: BrainCircuit },
  { title: "Claude", url: "/dashboard/models?platform=claude", icon: BrainCircuit },
  { title: "Gemini", url: "/dashboard/models?platform=gemini", icon: BrainCircuit },
  { title: "Perplexity", url: "/dashboard/models?platform=perplexity", icon: BrainCircuit },
]

const analysisItems = [
  { title: "Analytics", url: "/dashboard/analytics", icon: PieChart, permission: "dashboard.view" },
  { title: "Reports", url: "/dashboard/reports", icon: FileText, permission: "reports.view" },
  { title: "Alerts", url: "/dashboard/alerts", icon: Bell, permission: "alerts.view" },
]

const optimizationItems = [
  { title: "Tasks & Recs", url: "/dashboard/recommendations", icon: Lightbulb, permission: "dashboard.view" },
  { title: "AI Simulator", url: "/dashboard/simulator", icon: Bot, permission: "dashboard.view" },
  { title: "Gap Analysis", url: "/dashboard/gaps", icon: Target, permission: "dashboard.view" },
  { title: "Content Opps", url: "/dashboard/content", icon: FileText, permission: "dashboard.view" },
  { title: "Prompt Strategy", url: "/dashboard/prompts", icon: Sparkles, permission: "dashboard.view" },
  { title: "Ranking Timeline", url: "/dashboard/timeline", icon: TrendingUp, permission: "dashboard.view" },
]

const settingsItems = [
  { title: "Team", url: "/dashboard/team", icon: Users, permission: "team.view" },
  { title: "Integrations", url: "/dashboard/integrations", icon: Plug, permission: "integrations.view" },
  { title: "API Keys", url: "/dashboard/settings/api-keys", icon: Key, permission: "apikeys.view" },
  { title: "Billing", url: "/dashboard/billing", icon: CreditCard, permission: "billing.view" },
  { title: "Settings", url: "/dashboard/settings", icon: Settings, permission: "settings.view" },
  { title: "Admin Panel", url: "/admin", icon: Lock, permission: "admin.view" },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const { user } = useAuthStore()
  const { orgName, plan } = useOrganizationStore()
  const role = user?.role ?? "viewer"

  const isActive = (url: string) => {
    if (url === "/dashboard") return pathname === "/dashboard"
    return pathname.startsWith(url)
  }

  const filterByPermission = (items: typeof settingsItems) =>
    items.filter(item => !item.permission || hasPermission(role, item.permission))

  return (
    <Sidebar>
      <SidebarHeader className="border-b px-6 py-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="font-bold text-primary-foreground text-xl leading-none">O</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg tracking-tight text-foreground leading-tight">OPUS</span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">{plan} plan</span>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Intelligence</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filterByPermission(coreItems).map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton render={<Link href={item.url} />} isActive={isActive(item.url)}>
                      <item.icon />
                      <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>AI Models</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {modelsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton render={<Link href={item.url} />} isActive={pathname.includes(item.url)}>
                      <item.icon />
                      <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Insights</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filterByPermission(analysisItems).map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton render={<Link href={item.url} />} isActive={isActive(item.url)}>
                      <item.icon />
                      <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Optimization</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filterByPermission(optimizationItems).map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton render={<Link href={item.url} />} isActive={isActive(item.url)}>
                      <item.icon />
                      <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Organization</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filterByPermission(settingsItems).map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton render={<Link href={item.url} />} isActive={isActive(item.url)}>
                      <item.icon />
                      <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-sm">
            {user?.avatar ?? "?"}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-medium truncate">{user?.name ?? "Guest"}</span>
            <span className="text-xs text-muted-foreground truncate">{orgName}</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
