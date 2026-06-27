"use client";

import { useState, useEffect } from "react";
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
  GitBranch,
  ChevronRight,
  Folder,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/lib/stores/auth-store";
import { useOrganizationStore } from "@/lib/stores/organization-store";
import { hasPermission } from "@/lib/utils";
import { cn } from "@/lib/utils";

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
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarFooter,
} from "@/components/ui/sidebar";

const menuCategories = [
  {
    title: "AI Assistant",
    icon: Sparkles,
    url: "/dashboard/assistant",
    permission: "dashboard.view",
  },
  {
    title: "Executive War Room",
    icon: Globe,
    url: "/dashboard/war-room",
    permission: "dashboard.view",
  },
  {
    title: "Workspaces",
    icon: Folder,
    items: [
      {
        title: "Projects",
        url: "/dashboard/projects",
        permission: "dashboard.view",
      },
      {
        title: "Agents",
        url: "/dashboard/agents",
        permission: "dashboard.view",
      },
      {
        title: "Knowledge vault",
        url: "/dashboard/knowledge-vault",
        permission: "dashboard.view",
      },
    ],
  },
  {
    title: "Operating System",
    icon: LayoutDashboard,
    items: [
      {
        title: "AI Copilot",
        url: "/dashboard/copilot",
        icon: MessageSquare,
        permission: "dashboard.view",
      },
      {
        title: "AI Agents",
        url: "/dashboard/agents",
        icon: Bot,
        permission: "dashboard.view",
      },
      {
        title: "Workspace",
        url: "/dashboard/workspace",
        icon: LayoutDashboard,
        permission: "dashboard.view",
      },
      {
        title: "Campaign Builder",
        url: "/dashboard/campaigns",
        icon: Rocket,
        permission: "dashboard.view",
      },
      {
        title: "AI Strategy",
        url: "/dashboard/strategy",
        icon: Map,
        permission: "dashboard.view",
      },
      {
        title: "Customer Success",
        url: "/dashboard/customer-success",
        icon: HeartHandshake,
        permission: "dashboard.view",
      },
      {
        title: "Marketplace",
        url: "/dashboard/marketplace",
        icon: Store,
        permission: "dashboard.view",
      },
    ],
  },
  {
    title: "Core Intelligence",
    icon: BarChart3,
    items: [
      {
        title: "Overview",
        url: "/dashboard/overview",
        icon: BarChart3,
        permission: "dashboard.view",
      },
      {
        title: "Visibility",
        url: "/dashboard/visibility",
        icon: Activity,
        permission: "dashboard.view",
      },
      {
        title: "Citations",
        url: "/dashboard/citations",
        icon: FileText,
        permission: "dashboard.view",
      },
      {
        title: "Mentions",
        url: "/dashboard/mentions",
        icon: Bell,
        permission: "dashboard.view",
      },
      {
        title: "Platforms",
        url: "/dashboard/platforms",
        icon: PieChart,
        permission: "dashboard.view",
      },
      {
        title: "Competitors",
        url: "/dashboard/competitors",
        icon: Target,
        permission: "competitors.view",
      },
      {
        title: "Analytics",
        url: "/dashboard/analytics",
        icon: PieChart,
        permission: "dashboard.view",
      },
      {
        title: "Reports",
        url: "/dashboard/reports",
        icon: FileText,
        permission: "reports.view",
      },
    ],
  },
  {
    title: "GEO & Search Intel",
    icon: Globe,
    items: [
      {
        title: "Prompt Intel",
        url: "/dashboard/prompt-intelligence",
        icon: MessageSquare,
        permission: "dashboard.view",
      },
      {
        title: "Opportunities",
        url: "/dashboard/opportunities",
        icon: Target,
        permission: "dashboard.view",
      },
      {
        title: "Bot Analytics",
        url: "/dashboard/bot-analytics",
        icon: Bot,
        permission: "dashboard.view",
      },
      {
        title: "Search Journey",
        url: "/dashboard/search-journey",
        icon: Search,
        permission: "dashboard.view",
      },
      {
        title: "Regional Intel",
        url: "/dashboard/regional-intelligence",
        icon: Globe,
        permission: "dashboard.view",
      },
    ],
  },
  {
    title: "Content & Action",
    icon: FileEdit,
    items: [
      {
        title: "Action Center",
        url: "/dashboard/actions",
        icon: Zap,
        permission: "dashboard.view",
      },
      {
        title: "Recommendations",
        url: "/dashboard/recommendations",
        icon: Lightbulb,
        permission: "dashboard.view",
      },
      {
        title: "Content Center",
        url: "/dashboard/content-center",
        icon: FileEdit,
        permission: "dashboard.view",
      },
      {
        title: "Content Inventory",
        url: "/dashboard/content-inventory",
        icon: FileText,
        permission: "dashboard.view",
      },
      {
        title: "Content Review",
        url: "/dashboard/content-review",
        icon: FileEdit,
        permission: "dashboard.view",
      },
      {
        title: "CMS Publishing",
        url: "/dashboard/cms-publishing",
        icon: Zap,
        permission: "dashboard.view",
      },
      {
        title: "Publishing Hub",
        url: "/dashboard/publishing",
        icon: Send,
        permission: "dashboard.view",
      },
      {
        title: "Content Opps",
        url: "/dashboard/content",
        icon: FileText,
        permission: "dashboard.view",
      },
    ],
  },
  {
    title: "Deployment & Tech",
    icon: Rocket,
    items: [
      {
        title: "Website Manager",
        url: "/dashboard/websites",
        icon: Globe,
        permission: "dashboard.view",
      },
      {
        title: "Deployment Center",
        url: "/dashboard/deployments",
        icon: Send,
        permission: "dashboard.view",
      },
      {
        title: "Repositories",
        url: "/dashboard/repositories",
        icon: GitBranch,
        permission: "dashboard.view",
      },
      {
        title: "Website Scanner",
        url: "/dashboard/scanner",
        icon: Search,
        permission: "dashboard.view",
      },
      {
        title: "Website Scraper",
        url: "/dashboard/scraper",
        icon: Globe,
        permission: "dashboard.view",
      },
      {
        title: "Automation",
        url: "/dashboard/automation",
        icon: Zap,
        permission: "dashboard.view",
      },
      {
        title: "Deployment Agents",
        url: "/dashboard/deployment-agents",
        icon: Bot,
        permission: "dashboard.view",
      },
      {
        title: "Revenue Attrib",
        url: "/dashboard/revenue",
        icon: DollarSign,
        permission: "dashboard.view",
      },
      {
        title: "Real Time Alerts",
        url: "/dashboard/alerts",
        icon: Bell,
        permission: "alerts.view",
      },
    ],
  },
  {
    title: "Optimization",
    icon: Wand2,
    items: [
      {
        title: "AEO Optimizer",
        url: "/dashboard/optimizer",
        icon: Wand2,
        permission: "dashboard.view",
      },
      {
        title: "Tasks & Recs",
        url: "/dashboard/recommendations",
        icon: Lightbulb,
        permission: "dashboard.view",
      },
      {
        title: "AI Simulator",
        url: "/dashboard/simulator",
        icon: Bot,
        permission: "dashboard.view",
      },
      {
        title: "Gap Analysis",
        url: "/dashboard/gaps",
        icon: Target,
        permission: "dashboard.view",
      },
      {
        title: "Prompt Strategy",
        url: "/dashboard/prompts",
        icon: Sparkles,
        permission: "dashboard.view",
      },
      {
        title: "Ranking Timeline",
        url: "/dashboard/timeline",
        icon: TrendingUp,
        permission: "dashboard.view",
      },
    ],
  },
  {
    title: "Advanced Moat",
    icon: ShieldCheck,
    items: [
      {
        title: "Shopping Visibility",
        url: "/dashboard/shopping-visibility",
        icon: ShoppingCart,
        permission: "dashboard.view",
      },
      {
        title: "Voice Drift",
        url: "/dashboard/voice-drift",
        icon: Activity,
        permission: "dashboard.view",
      },
      {
        title: "Source Authority",
        url: "/dashboard/source-authority",
        icon: ShieldCheck,
        permission: "dashboard.view",
      },
      {
        title: "Shadow Mode",
        url: "/dashboard/shadow-mode",
        icon: Ghost,
        permission: "dashboard.view",
      },
      {
        title: "Answer Simulator",
        url: "/dashboard/answer-simulator",
        icon: Terminal,
        permission: "dashboard.view",
      },
    ],
  },
  {
    title: "AI Models & Enterprise",
    icon: BrainCircuit,
    items: [
      {
        title: "AI Performance Hub",
        url: "/dashboard/ai-hub",
        icon: BrainCircuit,
        permission: "dashboard.view",
      },
    ],
  },
  {
    title: "Organization",
    icon: Settings,
    items: [
      {
        title: "Team",
        url: "/dashboard/team",
        icon: Users,
        permission: "team.view",
      },
      {
        title: "Integrations",
        url: "/dashboard/integrations",
        icon: Plug,
        permission: "integrations.view",
      },
      {
        title: "API Keys",
        url: "/dashboard/settings/api-keys",
        icon: Key,
        permission: "apikeys.view",
      },
      {
        title: "Billing",
        url: "/dashboard/billing",
        icon: CreditCard,
        permission: "billing.view",
      },
      {
        title: "Settings",
        url: "/dashboard/settings",
        icon: Settings,
        permission: "settings.view",
      },
      {
        title: "Admin Panel",
        url: "/admin",
        icon: Lock,
        permission: "admin.view",
      },
    ],
  },
];

function CollapsibleMenu({
  category,
  pathname,
  role,
}: {
  category: any;
  pathname: string;
  role: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  // Filter items by permission
  const visibleItems = category.items ? category.items.filter(
    (item: any) => !item.permission || hasPermission(role, item.permission),
  ) : [];

  const hasActive = category.url
    ? pathname.startsWith(category.url)
    : visibleItems.some((item: any) => {
        if (item.url === "/dashboard/overview")
          return pathname === "/dashboard" || pathname === "/dashboard/overview";
        return pathname.startsWith(item.url);
      });

  useEffect(() => {
    if (hasActive) setIsOpen(true);
  }, [hasActive]);

  // Check permission for direct link
  if (category.url && category.permission && !hasPermission(role, category.permission)) {
    return null;
  }

  if (!category.url && visibleItems.length === 0) return null;

  if (category.url) {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton
          render={<Link href={category.url} />}
          isActive={hasActive}
          className="hover:bg-muted/50"
        >
          <category.icon className="w-4 h-4 text-muted-foreground" />
          <span className="font-medium">{category.title}</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        onClick={() => setIsOpen(!isOpen)}
        isActive={hasActive}
        className="justify-between hover:bg-muted/50"
      >
        <div className="flex items-center gap-2">
          <category.icon className="w-4 h-4 text-muted-foreground" />
          <span className="font-medium">{category.title}</span>
        </div>
        <ChevronRight
          className={cn(
            "w-4 h-4 text-muted-foreground transition-transform duration-200",
            isOpen && "rotate-90",
          )}
        />
      </SidebarMenuButton>

      {isOpen && (
        <SidebarMenuSub>
          {visibleItems.map((item: any) => {
            const isActive =
              item.url === "/dashboard/overview"
                ? pathname === "/dashboard" ||
                  pathname === "/dashboard/overview"
                : pathname.startsWith(item.url);

            return (
              <SidebarMenuSubItem key={item.title}>
                <SidebarMenuSubButton
                  render={<Link href={item.url} />}
                  isActive={isActive}
                  className={cn(
                    "transition-all py-2",
                    isActive 
                      ? "bg-primary/10 border border-primary/20 text-primary font-medium shadow-sm" 
                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground border border-transparent"
                  )}
                >
                  {item.icon ? (
                    <item.icon className="w-3.5 h-3.5" />
                  ) : (
                    <div className={cn(
                      "w-1.5 h-1.5 rounded-full mr-0.5 shrink-0 transition-colors",
                      isActive ? "bg-primary" : "bg-muted-foreground/60"
                    )} />
                  )}
                  <span>{item.title}</span>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            );
          })}
        </SidebarMenuSub>
      )}
    </SidebarMenuItem>
  );
}

export function DashboardSidebar() {
  const pathname = usePathname();
  const { user } = useAuthStore();
  const { orgName, orgDomain, plan } = useOrganizationStore();
  const role = user?.role ?? "viewer";

  return (
    <Sidebar>
      <SidebarHeader className="border-b px-6 py-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm overflow-hidden border border-border">
            {orgDomain ? (
              <img 
                src={`https://www.google.com/s2/favicons?domain=${orgDomain}&sz=128`} 
                alt={`${orgName || "Company"} logo`}
                className="w-full h-full object-contain p-1"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                }}
              />
            ) : null}
            <span className={`font-bold text-primary text-xl leading-none uppercase ${orgDomain ? 'hidden' : ''}`}>
              {orgName ? orgName.charAt(0) : "O"}
            </span>
          </div>
          <div className="flex flex-col overflow-hidden">
            <span
              className="font-bold text-lg tracking-tight text-foreground leading-tight truncate"
              title={orgName || "CITATIONLY"}
            >
              {orgName || "CITATIONLY"}
            </span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
              {plan} plan
            </span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuCategories.map((category) => (
                <CollapsibleMenu
                  key={category.title}
                  category={category}
                  pathname={pathname}
                  role={role}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-sm overflow-hidden shrink-0">
            {user?.avatar && user.avatar.startsWith("http") ? (
              <img
                src={user.avatar}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            ) : user?.avatar ? (
              user.avatar.charAt(0).toUpperCase()
            ) : (
              "?"
            )}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-medium truncate">
              {user?.name ?? "Guest"}
            </span>
            <span className="text-xs text-muted-foreground truncate">
              {orgName}
            </span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
