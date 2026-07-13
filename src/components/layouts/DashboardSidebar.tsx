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
  Command,
  Eye,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/lib/stores/auth-store";
import { useOrganizationStore } from "@/lib/stores/organization-store";
import { useOrganizationStore as useRealOrganizationStore } from "@/lib/stores/organizationStore";
import { syncUserToBackend } from "@/lib/api/authApi";
import { hasPermission, type UserRole } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Logo } from "@/components/ui/logo";

const menuCategories = [
  {
    title: "Command center",
    icon: Command,
    url: "/dashboard/overview",
    permission: "dashboard.view",
    tag: "HQ",
  },
  {
    title: "Citationly Assistant",
    icon: Sparkles,
    url: "/dashboard/assistant",
    permission: "dashboard.view",
    tag: "NEW",
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
        title: "Page auditor",
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
        title: "Brand intelligence",
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
    title: "Opportunity Finder",
    icon: Target,
    url: "/dashboard/opportunity-finder",
    permission: "dashboard.view",
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
    title: "Citationly agents",
    icon: Bot,
    url: "/dashboard/agents",
    permission: "dashboard.view",
    tag: "8",
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
        title: "Knowledge vault",
        url: "/dashboard/knowledge-vault",
        permission: "dashboard.view",
      },
    ],
  },
  {
    title: "Settings",
    icon: Settings,
    items: [
      {
        title: "Organization",
        url: "/dashboard/settings?tab=organization",
        permission: "settings.view",
      },
      {
        title: "Team Management",
        url: "/dashboard/team",
        permission: "team.view",
      },
      {
        title: "Websites",
        url: "/dashboard/settings?tab=websites",
        permission: "settings.view",
      },
      {
        title: "Integrations",
        url: "/dashboard/integrations",
        permission: "integrations.view",
      },
      {
        title: "Billing",
        url: "/dashboard/settings?tab=billing",
        permission: "settings.view",
      },
      {
        title: "API Keys",
        url: "/dashboard/settings?tab=api-keys",
        permission: "apikeys.view",
      },
      {
        title: "Security",
        url: "/dashboard/settings?tab=security",
        permission: "settings.view",
      },
    ],
  },
];

type MenuItem = {
  title: string;
  url: string;
  icon?: React.ElementType<{ className?: string }>;
  permission?: string;
};

type MenuCategory = {
  title: string;
  icon: React.ElementType<{ className?: string }>;
  url?: string;
  permission?: string;
  items?: MenuItem[];
  tag?: string;
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
            className="hover:bg-muted/50 w-full"
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <category.icon className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium">{category.title}</span>
              </div>
              {category.tag && (
                <Badge variant="secondary" className="px-1.5 py-0 h-5 text-[10px] font-bold text-indigo-600 bg-indigo-50 border-indigo-100 uppercase tracking-wider">
                  {category.tag}
                </Badge>
              )}
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      );
    }
  
    return (
      <SidebarMenuItem>
        <SidebarMenuButton
          onClick={() => setIsOpen(!isOpen)}
          isActive={hasActive}
          className="justify-between hover:bg-muted/50 w-full"
        >
          <div className="flex items-center gap-2">
            <category.icon className="w-4 h-4 text-muted-foreground" />
            <span className="font-medium">{category.title}</span>
          </div>
          <div className="flex items-center gap-2">
            {category.tag && (
              <Badge variant="secondary" className="px-1.5 py-0 h-5 text-[10px] font-bold text-indigo-600 bg-indigo-50 border-indigo-100 uppercase tracking-wider">
                {category.tag}
              </Badge>
            )}
            <ChevronRight
              className={cn(
                "w-4 h-4 text-muted-foreground transition-transform duration-200",
                isOpen && "rotate-90",
              )}
            />
          </div>
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
  const { planType, trialEndsAt, isTrialExpired } = useRealOrganizationStore();
  const role = ((user as { role?: string })?.role as UserRole) ?? "viewer";

  const planLabel = (() => {
    if (planType !== "Trial") return `${plan} plan`;
    if (isTrialExpired) return "Trial expired";
    if (!trialEndsAt) return "Trial";
    const daysLeft = Math.max(0, Math.ceil((new Date(trialEndsAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24)));
    return `Trial · ${daysLeft} day${daysLeft === 1 ? "" : "s"} left`;
  })();

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
          if (res.organizationId) {
            useRealOrganizationStore.getState().setSyncResult(res);
          }
        })
        .catch((err) => console.error("Sync failed", err));
    }
  }, [token, updateOrg]);

  return (
    <Sidebar>
      <SidebarHeader className="border-b px-6 py-4">
        <Link href="/dashboard" className="flex flex-col items-start gap-1">
          <Logo className="overflow-hidden" imgClassName="h-10 w-auto -ml-1" />
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium pl-1">
            {planLabel}
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
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full focus:outline-none">
            <div className="flex items-center gap-3 w-full p-2 rounded-md hover:bg-slate-100 transition-colors">
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
              <div className="flex flex-col min-w-0 text-left">
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
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuItem render={<Link href="/dashboard/settings?tab=profile" />} className="cursor-pointer w-full"><User className="mr-2 h-4 w-4" /> Profile</DropdownMenuItem>
            <DropdownMenuItem render={<Link href="/dashboard/settings?tab=security" />} className="cursor-pointer w-full"><Lock className="mr-2 h-4 w-4" /> Security</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Organization</DropdownMenuLabel>
            <DropdownMenuItem render={<Link href="/dashboard/settings?tab=organization" />} className="cursor-pointer w-full"><Settings className="mr-2 h-4 w-4" /> General</DropdownMenuItem>
            <DropdownMenuItem render={<Link href="/dashboard/team" />} className="cursor-pointer w-full"><Users className="mr-2 h-4 w-4" /> Team Management</DropdownMenuItem>
            <DropdownMenuItem render={<Link href="/dashboard/settings?tab=websites" />} className="cursor-pointer w-full"><Globe className="mr-2 h-4 w-4" /> Websites</DropdownMenuItem>
            <DropdownMenuItem render={<Link href="/dashboard/integrations" />} className="cursor-pointer w-full"><Plug className="mr-2 h-4 w-4" /> Integrations</DropdownMenuItem>
            <DropdownMenuItem render={<Link href="/dashboard/settings?tab=api-keys" />} className="cursor-pointer w-full"><Key className="mr-2 h-4 w-4" /> API Keys</DropdownMenuItem>
            <DropdownMenuItem render={<Link href="/dashboard/settings?tab=billing" />} className="cursor-pointer w-full"><CreditCard className="mr-2 h-4 w-4" /> Billing</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600 cursor-pointer">
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
