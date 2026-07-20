"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useUIStore } from "@/lib/stores/ui-store"
import { useOrganizationStore } from "@/lib/stores/organizationStore"
import { getTopCompetitors, type CompetitorResult } from "@/lib/api/dashboardApi"
import { getTeamMembers, type TeamMember } from "@/lib/api/teamApi"
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command"
import { Activity, Target, BarChart3, FileText, Users, Settings, Plug, LayoutDashboard, Swords, Bot, Sparkles, Compass, PenSquare } from "lucide-react"

export function CommandPalette() {
  const { commandPaletteOpen, setCommandPaletteOpen } = useUIStore()
  const organizationId = useOrganizationStore((s) => s.organizationId)
  const router = useRouter()

  const [competitors, setCompetitors] = useState<CompetitorResult[]>([])
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])

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

  // Fetch real org data lazily on first open rather than on every mount of the dashboard shell.
  useEffect(() => {
    if (!commandPaletteOpen || !organizationId) return

    getTopCompetitors(organizationId)
      .then(setCompetitors)
      .catch(() => setCompetitors([]))

    getTeamMembers()
      .then(setTeamMembers)
      .catch(() => setTeamMembers([]))
  }, [commandPaletteOpen, organizationId])

  const navigate = (path: string) => {
    router.push(path)
    setCommandPaletteOpen(false)
  }

  return (
    <CommandDialog open={commandPaletteOpen} onOpenChange={setCommandPaletteOpen}>
      <CommandInput placeholder="Search pages, competitors, team members..." />
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

        {competitors.length > 0 && (
          <>
            <CommandSeparator />
            <CommandGroup heading="Competitors">
              {competitors.map(c => (
                <CommandItem key={c.id} onSelect={() => navigate("/dashboard/competitor-watch")}>
                  <Target className="w-4 h-4 mr-2 text-muted-foreground" />
                  {c.name}{c.websiteUrl ? ` — ${c.websiteUrl}` : ""}
                </CommandItem>
              ))}
            </CommandGroup>
          </>
        )}

        {teamMembers.length > 0 && (
          <>
            <CommandSeparator />
            <CommandGroup heading="Team Members">
              {teamMembers.map(u => (
                <CommandItem key={u.id} onSelect={() => navigate("/dashboard/settings?tab=team")}>
                  <Users className="w-4 h-4 mr-2 text-muted-foreground" />
                  {u.displayName || u.email} — {u.role}
                </CommandItem>
              ))}
            </CommandGroup>
          </>
        )}
      </CommandList>
    </CommandDialog>
  )
}
