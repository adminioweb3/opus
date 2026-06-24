export interface Integration {
  id: string
  name: string
  description: string
  icon: string
  category: "communication" | "crm" | "analytics" | "automation" | "productivity"
  status: "connected" | "disconnected" | "error"
  connectedAt: string | null
  configurable: boolean
  popular: boolean
}

export const MOCK_INTEGRATIONS: Integration[] = [
  {
    id: "int_slack",
    name: "Slack",
    description: "Send AI visibility alerts and reports to your Slack channels in real-time.",
    icon: "slack",
    category: "communication",
    status: "connected",
    connectedAt: "2024-06-15T10:00:00Z",
    configurable: true,
    popular: true,
  },
  {
    id: "int_notion",
    name: "Notion",
    description: "Sync your AI visibility reports and competitor analyses to Notion databases.",
    icon: "notion",
    category: "productivity",
    status: "disconnected",
    connectedAt: null,
    configurable: true,
    popular: true,
  },
  {
    id: "int_hubspot",
    name: "HubSpot",
    description: "Enrich your CRM contacts with AI visibility data and brand health scores.",
    icon: "hubspot",
    category: "crm",
    status: "connected",
    connectedAt: "2024-07-20T14:00:00Z",
    configurable: true,
    popular: true,
  },
  {
    id: "int_salesforce",
    name: "Salesforce",
    description: "Push AI visibility intelligence into Salesforce for sales enablement.",
    icon: "salesforce",
    category: "crm",
    status: "disconnected",
    connectedAt: null,
    configurable: true,
    popular: true,
  },
  {
    id: "int_zapier",
    name: "Zapier",
    description: "Connect CITATIONLY to 5,000+ apps with automated workflows and triggers.",
    icon: "zapier",
    category: "automation",
    status: "disconnected",
    connectedAt: null,
    configurable: false,
    popular: true,
  },
  {
    id: "int_ga",
    name: "Google Analytics",
    description: "Correlate AI visibility changes with website traffic and conversion data.",
    icon: "ga",
    category: "analytics",
    status: "connected",
    connectedAt: "2024-05-10T09:00:00Z",
    configurable: true,
    popular: true,
  },
  {
    id: "int_gsc",
    name: "Google Search Console",
    description: "Compare traditional search performance against AI search visibility metrics.",
    icon: "gsc",
    category: "analytics",
    status: "disconnected",
    connectedAt: null,
    configurable: true,
    popular: false,
  },
]
