"use client";

import { useState, useEffect } from "react";
import {
  BarChart3,
  Settings,
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
  Rocket,
  Globe,
  Plug,
  Key,
  CreditCard,
  Lock,
  Activity,
  Bell,
  GitBranch,
  ChevronRight,
  Folder,
  Eye,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/lib/stores/auth-store";
import { useOrganizationStore } from "@/lib/stores/organization-store";
import { syncUserToBackend } from "@/lib/api/authApi";
import { hasPermission, type UserRole } from "@/lib/utils";
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
import { Logo } from "@/components/ui/logo";

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
    title: "Visibility intelligence",
    icon: Eye,
    items: [
      {
        title: "Visibility radar",
        url: "/dashboard/visibility-radar",
        permission: "dashboard.view",
      },
      {
        title: "Citation intelligence",
        url: "/dashboard/citation-intelligence",
        permission: "dashboard.view",
      },
      {
        title: "Brand pulse",
        url: "/dashboard/brand-pulse",
        permission: "dashboard.view",
      },
      {
        title: "Competitor watch",
        url: "/dashboard/competitor-watch",
        permission: "dashboard.view",
      },
    ],
  },
  {
    title: "Content studio",
    icon: FileEdit,
    items: [
      {
        title: "Content generator",
        url: "/dashboard/content-generator",
        permission: "dashboard.view",
      },
      {
        title: "Content optimizer",
        url: "/dashboard/content-optimizer",
        permission: "dashboard.view",
      },
      {
        title: "Publishing center",
        url: "/dashboard/publishing-center",
        permission: "dashboard.view",
      },
    ],
  },
  {
    title: "Opportunity engine",
    icon: Target,
    items: [
      {
        title: "Opportunity finder",
        url: "/dashboard/opportunity-finder",
        permission: "dashboard.view",
      },
    ],
  },
  {
    title: "GEO engine",
    icon: Globe,
    items: [
      {
        title: "GEO dashboard",
        url: "/dashboard/geo-dashboard",
        permission: "dashboard.view",
      },
      {
        title: "GEO optimizer",
        url: "/dashboard/geo-optimizer",
        permission: "dashboard.view",
      },
      {
        title: "Answer simulator",
        url: "/dashboard/answer-simulator",
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

type MenuItem = {
  title: string;
  url: string;
  icon?: React.ElementType;
  permission?: string;
};

type MenuCategory = {
  title: string;
  icon: React.ElementType;
  url?: string;
  permission?: string;
  items?: MenuItem[];
};

function CollapsibleMenu({
  category,
  pathname,
  role,
}: {
  category: MenuCategory;
  pathname: string;
  role: UserRole;
}) {
  // Filter items by permission
  const visibleItems = category.items
    ? category.items.filter(
        (item: MenuItem) => !item.permission || hasPermission(role, item.permission),
      )
    : [];

  const hasActive = category.url
    ? pathname.startsWith(category.url)
    : visibleItems.some((item: MenuItem) => {
        if (item.url === "/dashboard/overview")
          return (
            pathname === "/dashboard" || pathname === "/dashboard/overview"
          );
        return pathname.startsWith(item.url);
      });

  const [isOpen, setIsOpen] = useState(hasActive);

  useEffect(() => {
    if (hasActive) {
      setIsOpen(true);
    }
  }, [hasActive]);

  // Check permission for direct link
  if (
    category.url &&
    category.permission &&
    !hasPermission(role, category.permission)
  ) {
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
                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground border border-transparent",
                  )}
                >
                  {item.icon ? (
                    <item.icon className="w-3.5 h-3.5" />
                  ) : (
                    <div
                      className={cn(
                        "w-1.5 h-1.5 rounded-full mr-0.5 shrink-0 transition-colors",
                        isActive ? "bg-primary" : "bg-muted-foreground/60",
                      )}
                    />
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
  const { user, token } = useAuthStore();
  const { orgName, plan, updateOrg } = useOrganizationStore();
  const role = ((user as { role?: string })?.role as UserRole) ?? "viewer";

  useEffect(() => {
    if (token) {
      syncUserToBackend()
        .then((res) => {
          if (res.organizationName || res.websiteDomain) {
            updateOrg({
              orgName: res.organizationName || "Company",
              orgDomain: res.websiteDomain || "company.com",
            });
          }
          // Also update the other store if it exists
          import("@/lib/stores/organizationStore")
            .then(({ useOrganizationStore: camelStore }) => {
              if (res.organizationId) {
                camelStore.getState().setOrganizationId(res.organizationId);
              }
            })
            .catch(() => {});
        })
        .catch((err) => console.error("Sync failed", err));
    }
  }, [token, updateOrg]);

  return (
    <Sidebar>
      <SidebarHeader className="border-b px-6 py-4">
        <Link href="/dashboard" className="flex flex-col items-start gap-1">
          <Logo className="overflow-hidden mix-blend-multiply" iconClassName="h-10 w-auto object-contain -ml-1" />
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium pl-1">
            {plan} plan
          </span>
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
            {(() => {
              const avatar = user
                ? "avatar" in user
                  ? user.avatar
                  : user.photoURL
                : null;
              return (
                <>
                  {avatar && avatar.startsWith("http") ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={avatar}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : avatar ? (
                    avatar.charAt(0).toUpperCase()
                  ) : (
                    "?"
                  )}
                </>
              );
            })()}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-medium truncate">
              {user
                ? "name" in user
                  ? user.name
                  : user.displayName || user.email
                : "Guest"}
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
