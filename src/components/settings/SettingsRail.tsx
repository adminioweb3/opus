"use client"

import { Building2, Users, Globe, Plug, CreditCard, Key, ShieldAlert } from "lucide-react"

export interface SettingsSection {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  desc: string
}

export const SETTINGS_SECTIONS: SettingsSection[] = [
  { id: "org", label: "Organization", icon: Building2, desc: "Company profile, brand, locale, AI defaults and audit." },
  { id: "team", label: "Team Management", icon: Users, desc: "Members, roles, departments, invites and sessions." },
  { id: "sites", label: "Websites", icon: Globe, desc: "Connected sites, crawl preferences and verification." },
  { id: "integrations", label: "Integrations", icon: Plug, desc: "Connect analytics, CRM, CMS, infra and AI providers." },
  { id: "billing", label: "Billing", icon: CreditCard, desc: "Plan, seats, payment methods, invoices and usage." },
  { id: "apikeys", label: "API Keys", icon: Key, desc: "Keys, webhooks, environment variables and logs." },
  { id: "security", label: "Security", icon: ShieldAlert, desc: "MFA, SSO, password policy, devices and compliance." },
]

export function SettingsRail({ active, onSelect }: { active: string; onSelect: (id: string) => void }) {
  return (
    <nav className="flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-visible shrink-0 lg:w-56">
      {SETTINGS_SECTIONS.map((s) => {
        const Icon = s.icon
        const isActive = s.id === active
        return (
          <button
            key={s.id}
            onClick={() => onSelect(s.id)}
            aria-current={isActive ? "page" : undefined}
            className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors text-left ${
              isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <Icon className="w-4 h-4 shrink-0" />
            {s.label}
          </button>
        )
      })}
    </nav>
  )
}
