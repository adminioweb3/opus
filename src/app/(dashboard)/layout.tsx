"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/layouts/DashboardSidebar";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { CommandPalette } from "@/components/features/CommandPalette";
import { useAuthStore } from "@/lib/stores/auth-store";
import { useOrganizationStore } from "@/lib/stores/organization-store";
import { useNotificationStore } from "@/lib/stores/notification-store";
import { useUIStore } from "@/lib/stores/ui-store";
import {
  Bell,
  Search,
  LogOut,
  Settings,
  User,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

function DashboardHeader() {
  const { user, logout } = useAuthStore();
  const { orgName } = useOrganizationStore();
  const { unreadCount } = useNotificationStore();
  const { setCommandPaletteOpen } = useUIStore();
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const userName = user
    ? "name" in user
      ? user.name
      : user.displayName
    : "Guest";
  const userAvatar = user
    ? "avatar" in user
      ? user.avatar
      : user.photoURL
    : "?";

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target as Node)
      ) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-16 border-b flex items-center px-4 shrink-0 bg-card gap-4">
      <SidebarTrigger />

      {/* Search Bar */}
      <button
        onClick={() => setCommandPaletteOpen(true)}
        className="hidden md:flex items-center gap-2 h-9 px-4 rounded-lg border border-border bg-muted/50 text-sm text-muted-foreground hover:bg-muted transition-colors flex-1 max-w-md"
      >
        <Search className="w-4 h-4" />
        <span>Search prompts, reports, competitors...</span>
        <kbd className="ml-auto text-xs bg-background px-1.5 py-0.5 rounded border border-border font-mono">
          âŒ˜K
        </kbd>
      </button>

      <div className="flex-1" />

      {/* Notification Bell */}
      <Link
        href="/dashboard/alerts"
        className="relative p-2 rounded-lg hover:bg-muted transition-colors"
      >
        <Bell className="w-5 h-5 text-muted-foreground" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </Link>

      {/* Profile Dropdown */}
      <div ref={profileRef} className="relative">
        <button
          onClick={() => setProfileOpen(!profileOpen)}
          className="flex items-center gap-3 p-1.5 rounded-lg hover:bg-muted transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary overflow-hidden shrink-0">
            {userAvatar && userAvatar.startsWith("http") ? (
              <img
                src={userAvatar}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            ) : userAvatar ? (
              userAvatar.charAt(0).toUpperCase()
            ) : (
              "?"
            )}
          </div>
          <div className="hidden md:block text-left">
            <div className="text-sm font-medium leading-tight truncate max-w-30">
              {userName}
            </div>
            <div className="text-xs text-muted-foreground capitalize truncate max-w-30">
              {orgName}
            </div>
          </div>
          <ChevronDown className="w-4 h-4 text-muted-foreground hidden md:block" />
        </button>

        {profileOpen && (
          <div className="absolute right-0 top-full mt-2 w-56 bg-card border border-border rounded-xl shadow-lg py-2 z-50">
            <div className="px-4 py-3 border-b border-border flex flex-col gap-2">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-6 h-6 rounded bg-white flex items-center justify-center font-bold text-primary text-xs uppercase shadow-sm border border-border">
                  {useOrganizationStore.getState().orgDomain ? (
                    <img 
                      src={`https://www.google.com/s2/favicons?domain=${useOrganizationStore.getState().orgDomain}&sz=128`} 
                      alt="Logo"
                      className="w-full h-full object-contain p-0.5"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                        (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                  ) : null}
                  <span className={`${useOrganizationStore.getState().orgDomain ? 'hidden' : ''}`}>
                    {orgName ? orgName.charAt(0) : "O"}
                  </span>
                </div>
                <div
                  className="text-sm font-semibold truncate"
                  title={orgName || "CITATIONLY"}
                >
                  {orgName || "CITATIONLY"}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium">{userName}</div>
                <div className="text-xs text-muted-foreground truncate">
                  {user?.email}
                </div>
              </div>
            </div>
            <Link
              href="/dashboard/settings"
              className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-muted transition-colors"
              onClick={() => setProfileOpen(false)}
            >
              <User className="w-4 h-4 text-muted-foreground" />
              Profile
            </Link>
            <Link
              href="/dashboard/settings"
              className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-muted transition-colors"
              onClick={() => setProfileOpen(false)}
            >
              <Settings className="w-4 h-4 text-muted-foreground" />
              Settings
            </Link>
            <div className="border-t border-border mt-1 pt-1">
              <button
                onClick={() => {
                  logout();
                  setProfileOpen(false);
                }}
                className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-muted transition-colors w-full text-left text-destructive"
              >
                <LogOut className="w-4 h-4" />
                Sign out
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <SidebarProvider>
        <DashboardSidebar />
        <div className="flex-1 flex flex-col h-screen overflow-hidden bg-background">
          <DashboardHeader />
          <main className="flex-1 overflow-y-auto p-5">{children}</main>
        </div>
      </SidebarProvider>
      <CommandPalette />
    </AuthGuard>
  );
}
