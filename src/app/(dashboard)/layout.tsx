"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/layouts/DashboardSidebar";
import { Logo } from "@/components/ui/logo";
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
  Check,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";

function timeAgo(iso: string) {
  const seconds = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

function DashboardHeader() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const { orgName } = useOrganizationStore();
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotificationStore();
  const { setCommandPaletteOpen } = useUIStore();
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  const userName = user
    ? ("name" in user ? user.name : user.displayName || user.email) || "Guest"
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
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(e.target as Node)
      ) {
        setNotificationsOpen(false);
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
        <span>Search pages, competitors, team...</span>
        <kbd className="ml-auto text-xs bg-background px-1.5 py-0.5 rounded border border-border font-mono">
          &#8984;K
        </kbd>
      </button>

      <div className="flex-1" />

      {/* Notification Bell */}
      <div ref={notificationsRef} className="relative">
        <button
          onClick={() => setNotificationsOpen((o) => !o)}
          className="relative p-2 rounded-lg hover:bg-muted transition-colors"
        >
          <Bell className="w-5 h-5 text-muted-foreground" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>

        {notificationsOpen && (
          <div className="absolute right-0 top-full mt-2 w-96 max-w-[calc(100vw-2rem)] bg-card border border-border rounded-xl shadow-lg py-2 z-50">
            <div className="px-4 py-2.5 border-b border-border flex items-center justify-between">
              <span className="text-sm font-semibold">Notifications</span>
              {unreadCount > 0 && (
                <button
                  onClick={() => markAllAsRead()}
                  className="text-xs font-medium text-primary hover:underline flex items-center gap-1"
                >
                  <Check className="w-3 h-3" /> Mark all read
                </button>
              )}
            </div>
            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">You're all caught up.</p>
              ) : (
                notifications.slice(0, 20).map((n) => (
                  <button
                    key={n.id}
                    onClick={() => {
                      markAsRead(n.id);
                      setNotificationsOpen(false);
                      if (n.actionUrl) router.push(n.actionUrl);
                    }}
                    className={`w-full text-left px-4 py-3 hover:bg-muted transition-colors border-b border-border/50 last:border-0 ${!n.read ? "bg-primary/5" : ""}`}
                  >
                    <div className="flex items-start gap-2">
                      {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />}
                      <div className={`flex-1 min-w-0 ${n.read ? "ml-3.5" : ""}`}>
                        <div className="text-sm font-medium truncate">{n.title}</div>
                        <div className="text-xs text-muted-foreground line-clamp-2 mt-0.5">{n.message}</div>
                        <div className="text-[11px] text-muted-foreground/70 mt-1">{timeAgo(n.createdAt)}</div>
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        )}
      </div>

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
                {(!orgName || orgName === "CITATIONLY") &&
                !useOrganizationStore.getState().orgDomain ? (
                  <Logo className="flex-1 overflow-hidden" imgClassName="h-6 w-auto" />
                ) : (
                  <>
                    <div className="w-6 h-6 rounded bg-white flex items-center justify-center font-bold text-primary text-xs uppercase shadow-sm border border-border shrink-0">
                      {useOrganizationStore.getState().orgDomain ? (
                        <img
                          src={`https://www.google.com/s2/favicons?domain=${useOrganizationStore.getState().orgDomain}&sz=128`}
                          alt="Logo"
                          className="w-full h-full object-contain p-0.5"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display =
                              "none";
                            (
                              e.target as HTMLImageElement
                            ).nextElementSibling?.classList.remove("hidden");
                          }}
                        />
                      ) : null}
                      <span
                        className={`${useOrganizationStore.getState().orgDomain ? "hidden" : ""}`}
                      >
                        {orgName ? orgName.charAt(0) : "C"}
                      </span>
                    </div>
                    <div
                      className="text-sm font-semibold truncate"
                      title={orgName || "CITATIONLY"}
                    >
                      {orgName || "CITATIONLY"}
                    </div>
                  </>
                )}
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
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </SidebarProvider>
      <CommandPalette />
    </AuthGuard>
  );
}
