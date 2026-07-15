"use client"

import { useEffect, useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { useUIStore } from "@/lib/stores/ui-store"
import { MOCK_PROMPTS } from "@/lib/mock-data/prompts"
import { MOCK_COMPETITORS } from "@/lib/mock-data/competitors"
import { MOCK_USERS } from "@/lib/mock-data/users"
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command"
import { Search, Activity, Target, BarChart3, FileText, Bell, Users, Settings, Plug, LayoutDashboard, Swords, Bot, Sparkles, Compass, PenSquare } from "lucide-react"

export function CommandPalette() {
  const { commandPaletteOpen, setCommandPaletteOpen } = useUIStore()
  const router = useRouter()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setCommandPaletteOpen(!commandPaletteOpen)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [commandPaletteOpen, setCommandPaletteOpen])

  const navigate = (path: string) => {
    router.push(path)
    setCommandPaletteOpen(false)
  }

  return (
    <CommandDialog open={commandPaletteOpen} onOpenChange={setCommandPaletteOpen}>
      <CommandInput placeholder="Search pages, prompts, competitors, team members..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Navigation">
          <CommandItem onSelect={() => navigate("/dashboard/overview")}><LayoutDashboard className="w-4 h-4 mr-2" /> Command Center</CommandItem>
          <CommandItem onSelect={() => navigate("/dashboard/war-room")}><Activity className="w-4 h-4 mr-2" /> Executive War Room</CommandItem>
          <CommandItem onSelect={() => navigate("/dashboard/assistant")}><Bot className="w-4 h-4 mr-2" /> Citationly Assistant</CommandItem>
          <CommandItem onSelect={() => navigate("/dashboard/geo-dashboard")}><Sparkles className="w-4 h-4 mr-2" /> GEO Dashboard</CommandItem>
          <CommandItem onSelect={() => navigate("/dashboard/geo-optimizer")}><Compass className="w-4 h-4 mr-2" /> Page Auditor</CommandItem>
          <CommandItem onSelect={() => navigate("/dashboard/visibility-radar")}><BarChart3 className="w-4 h-4 mr-2" /> Visibility Radar</CommandItem>
          <CommandItem onSelect={() => navigate("/dashboard/brand-pulse")}><FileText className="w-4 h-4 mr-2" /> Brand Intelligence</CommandItem>
          <CommandItem onSelect={() => navigate("/dashboard/competitor-watch")}><Swords className="w-4 h-4 mr-2" /> Competitor Watch</CommandItem>
          <CommandItem onSelect={() => navigate("/dashboard/opportunity-finder")}><Target className="w-4 h-4 mr-2" /> Opportunity Finder</CommandItem>
          <CommandItem onSelect={() => navigate("/dashboard/content-generator")}><PenSquare className="w-4 h-4 mr-2" /> Content Studio</CommandItem>
          <CommandItem onSelect={() => navigate("/dashboard/integrations")}><Plug className="w-4 h-4 mr-2" /> Integrations</CommandItem>
          <CommandItem onSelect={() => navigate("/dashboard/settings")}><Settings className="w-4 h-4 mr-2" /> Settings</CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Monitored Prompts">
          {MOCK_PROMPTS.slice(0, 5).map(p => (
            <CommandItem key={p.id} onSelect={() => navigate("/dashboard/monitoring")}>
              <Search className="w-4 h-4 mr-2 text-muted-foreground" />
              <span className="truncate">{p.prompt}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Competitors">
          {MOCK_COMPETITORS.map(c => (
            <CommandItem key={c.id} onSelect={() => navigate("/dashboard/competitor-watch")}>
              <Target className="w-4 h-4 mr-2 text-muted-foreground" />
              {c.name} — {c.domain}
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Team Members">
          {MOCK_USERS.map(u => (
            <CommandItem key={u.id} onSelect={() => navigate("/dashboard/team")}>
              <Users className="w-4 h-4 mr-2 text-muted-foreground" />
              {u.name} — {u.role}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
