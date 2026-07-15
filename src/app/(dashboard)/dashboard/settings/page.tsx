"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { SettingsRail, SETTINGS_SECTIONS } from "@/components/settings/SettingsRail"
import OrganizationSection from "@/components/settings/OrganizationSection"
import TeamSection from "@/components/settings/TeamSection"
import WebsitesSection from "@/components/settings/WebsitesSection"
import IntegrationsSection from "@/components/settings/IntegrationsSection"
import BillingSection from "@/components/settings/BillingSection"
import ApiKeysSection from "@/components/settings/ApiKeysSection"
import SecuritySection from "@/components/settings/SecuritySection"
import { ChevronRight, Settings as SettingsIcon } from "lucide-react"

const SECTION_COMPONENTS: Record<string, React.ComponentType> = {
  org: OrganizationSection,
  team: TeamSection,
  sites: WebsitesSection,
  integrations: IntegrationsSection,
  billing: BillingSection,
  apikeys: ApiKeysSection,
  security: SecuritySection,
}

export default function SettingsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const tabParam = searchParams.get("tab")
  const active = SECTION_COMPONENTS[tabParam || ""] ? tabParam! : "org"

  const handleSelect = (id: string) => {
    router.push(`/dashboard/settings?tab=${id}`)
  }

  const currentSection = SETTINGS_SECTIONS.find((s) => s.id === active) ?? SETTINGS_SECTIONS[0]
  const ActiveComponent = SECTION_COMPONENTS[active]

  return (
    <div className="p-6 md:p-8 max-w-350 mx-auto">
      <div className="mb-6">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
          <SettingsIcon className="w-3.5 h-3.5" /> Settings <ChevronRight className="w-3 h-3" /> <span className="font-medium text-foreground">{currentSection.label}</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">{currentSection.label}</h1>
        <p className="text-muted-foreground mt-1">{currentSection.desc}</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <SettingsRail active={active} onSelect={handleSelect} />
        <div className="flex-1 min-w-0">
          <ActiveComponent />
        </div>
      </div>
    </div>
  )
}
