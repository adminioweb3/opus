"use client"

import { 
  BarChart3, 
  Settings, 
  LayoutDashboard,
  BrainCircuit,
  Search,
  MessageSquare,
  Users,
  PieChart,
  FileText,
  Target,
  Lightbulb,
  Wand2,
  TrendingUp,
  Sparkles,
  Bot,
  Zap,
  FileEdit,
  DollarSign,
  Send,
  ShoppingCart,
  ShieldCheck,
  Ghost,
  Terminal,
  Library,
  Briefcase,
  BarChart2,
  Rocket,
  Globe,
  Map,
  HeartHandshake,
  Store,
  Plug,
  Key,
  CreditCard,
  Lock,
  Activity,
  Bell,
  GitBranch
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

const osItems = [
  { title: "Executive War Room", url: "/dashboard/war-room", icon: Globe, permission: "dashboard.view" },
  { title: "AI Copilot", url: "/dashboard/copilot", icon: MessageSquare, permission: "dashboard.view" },
  { title: "AI Agents", url: "/dashboard/agents", icon: Bot, permission: "dashboard.view" },
  { title: "Workspace", url: "/dashboard/workspace", icon: LayoutDashboard, permission: "dashboard.view" },
  { title: "Campaign Builder", url: "/dashboard/campaigns", icon: Rocket, permission: "dashboard.view" },
  { title: "AI Strategy", url: "/dashboard/strategy", icon: Map, permission: "dashboard.view" },
  { title: "Customer Success", url: "/dashboard/customer-success", icon: HeartHandshake, permission: "dashboard.view" },
  { title: "Marketplace", url: "/dashboard/marketplace", icon: Store, permission: "dashboard.view" },
]

const deploymentItems = [
  { title: "Website Manager", url: "/dashboard/websites", icon: Globe, permission: "dashboard.view" },
  { title: "Integrations", url: "/dashboard/integrations", icon: Plug, permission: "dashboard.view" },
  { title: "Content Inventory", url: "/dashboard/content-inventory", icon: FileText, permission: "dashboard.view" },
  { title: "Deployment Center", url: "/dashboard/deployments", icon: Send, permission: "dashboard.view" },
  { title: "Content Review", url: "/dashboard/content-review", icon: FileEdit, permission: "dashboard.view" },
  { title: "Repositories", url: "/dashboard/repositories", icon: GitBranch, permission: "dashboard.view" },
  { title: "CMS Publishing", url: "/dashboard/cms-publishing", icon: Zap, permission: "dashboard.view" },
  { title: "Website Scanner", url: "/dashboard/scanner", icon: Search, permission: "dashboard.view" },
  { title: "Automation", url: "/dashboard/automation", icon: Zap, permission: "dashboard.view" },
  { title: "Deployment Agents", url: "/dashboard/deployment-agents", icon: Bot, permission: "dashboard.view" },
]

const coreItems = [
  { title: "Overview", url: "/dashboard/overview", icon: BarChart3, permission: "dashboard.view" },
  { title: "Visibility", url: "/dashboard/visibility", icon: Activity, permission: "dashboard.view" },
  { title: "Citations", url: "/dashboard/citations", icon: FileText, permission: "dashboard.view" },
  { title: "Mentions", url: "/dashboard/mentions", icon: Bell, permission: "dashboard.view" },
  { title: "Platforms", url: "/dashboard/platforms", icon: PieChart, permission: "dashboard.view" },
  { title: "Competitors", url: "/dashboard/competitors", icon: Target, permission: "competitors.view" },
]

const geoAeoItems = [
  { title: "Prompt Intel", url: "/dashboard/prompt-intelligence", icon: MessageSquare, permission: "dashboard.view" },
  { title: "Opportunities", url: "/dashboard/opportunities", icon: Target, permission: "dashboard.view" },
  { title: "Bot Analytics", url: "/dashboard/bot-analytics", icon: Bot, permission: "dashboard.view" },
  { title: "Search Journey", url: "/dashboard/search-journey", icon: Search, permission: "dashboard.view" },
  { title: "Regional Intel", url: "/dashboard/regional-intelligence", icon: Globe, permission: "dashboard.view" },
]

const actionLayerItems = [
  { title: "Action Center", url: "/dashboard/actions", icon: Zap, permission: "dashboard.view" },
  { title: "Recommendations", url: "/dashboard/recommendations", icon: Lightbulb, permission: "dashboard.view" },
  { title: "Content Center", url: "/dashboard/content-center", icon: FileEdit, permission: "dashboard.view" },
]

const revenueItems = [
  { title: "Revenue Attrib", url: "/dashboard/revenue", icon: DollarSign, permission: "dashboard.view" },
  { title: "Publishing Hub", url: "/dashboard/publishing", icon: Send, permission: "dashboard.view" },
  { title: "Real Time Alerts", url: "/dashboard/alerts", icon: Bell, permission: "alerts.view" },
]

const moatItems = [
  { title: "Shopping Visibility", url: "/dashboard/shopping-visibility", icon: ShoppingCart, permission: "dashboard.view" },
  { title: "Voice Drift", url: "/dashboard/voice-drift", icon: Activity, permission: "dashboard.view" },
  { title: "Source Authority", url: "/dashboard/source-authority", icon: ShieldCheck, permission: "dashboard.view" },
  { title: "Shadow Mode", url: "/dashboard/shadow-mode", icon: Ghost, permission: "dashboard.view" },
  { title: "Answer Simulator", url: "/dashboard/answer-simulator", icon: Terminal, permission: "dashboard.view" },
]

const enterpriseItems = [
  { title: "Research Hub", url: "/dashboard/research", icon: Library, permission: "dashboard.view" },
  { title: "Case Studies", url: "/dashboard/case-studies", icon: Briefcase, permission: "dashboard.view" },
  { title: "Benchmarks", url: "/dashboard/benchmarks", icon: BarChart2, permission: "dashboard.view" },
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
]

const optimizationItems = [
  { title: "AEO Optimizer", url: "/dashboard/optimizer", icon: Wand2, permission: "dashboard.view" },
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
    if (url === "/dashboard/overview") return pathname === "/dashboard" || pathname === "/dashboard/overview"
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
          <SidebarGroupLabel>OPUS Operating System</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filterByPermission(osItems).map((item) => (
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
          <SidebarGroupLabel>Deployment Engine</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filterByPermission(deploymentItems).map((item) => (
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
          <SidebarGroupLabel>GEO + AEO Intelligence</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filterByPermission(geoAeoItems).map((item) => (
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
          <SidebarGroupLabel>AI Action Layer</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filterByPermission(actionLayerItems).map((item) => (
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
          <SidebarGroupLabel>Revenue & Publishing</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filterByPermission(revenueItems).map((item) => (
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
          <SidebarGroupLabel>OPUS Moat Features</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filterByPermission(moatItems).map((item) => (
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
          <SidebarGroupLabel>Enterprise Resources</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filterByPermission(enterpriseItems).map((item) => (
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
