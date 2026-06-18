export const mockRevenue = {
  overview: {
    influencedRevenue: "$2.4M",
    influencedLeads: "1,240",
    pipelineValue: "$8.5M",
    revenuePerCitation: "$1,850",
  },
  funnel: [
    { stage: "AI Mention", value: 120000, fill: "var(--color-slate-200)" },
    { stage: "Citation", value: 45000, fill: "var(--color-blue-400)" },
    { stage: "Visit", value: 12500, fill: "var(--color-indigo-500)" },
    { stage: "Lead", value: 1240, fill: "var(--color-purple-500)" },
    { stage: "Opportunity", value: 310, fill: "var(--color-amber-500)" },
    { stage: "Revenue (Closed)", value: 85, fill: "var(--color-emerald-500)" },
  ],
  recentOpportunities: [
    { id: "OPP-101", company: "Acme Corp", amount: "$120,000", source: "GPT-4 Citation", status: "Closed Won" },
    { id: "OPP-102", company: "GlobalTech", amount: "$85,000", source: "Perplexity Mention", status: "Negotiation" },
    { id: "OPP-103", company: "DataFlow", amount: "$45,000", source: "Claude Answer", status: "Proposal" },
  ]
};

export const mockPublishing = {
  integrations: [
    { name: "WordPress", icon: "wordpress", status: "Connected", syncStatus: "Synced 2 mins ago" },
    { name: "HubSpot", icon: "hubspot", status: "Connected", syncStatus: "Synced 1 hr ago" },
    { name: "Webflow", icon: "webflow", status: "Connected", syncStatus: "Synced 5 hrs ago" },
    { name: "Ghost", icon: "ghost", status: "Connect", syncStatus: "Not configured" },
    { name: "Shopify", icon: "shopify", status: "Connect", syncStatus: "Not configured" },
  ],
  workflows: [
    { id: "PUB-001", title: "Enterprise Pricing FAQ Fix", target: "WordPress", status: "Draft", lastEdited: "10 mins ago" },
    { id: "PUB-002", title: "Competitor Comparison Post", target: "Webflow", status: "Review", lastEdited: "2 hours ago" },
    { id: "PUB-003", title: "Security Compliance Overview", target: "HubSpot", status: "Approve", lastEdited: "5 hours ago" },
    { id: "PUB-004", title: "API Rate Limit Technical Guide", target: "WordPress", status: "Publish", lastEdited: "1 day ago" },
  ]
};

export const mockAlerts = {
  config: [
    { type: "Citation Lost", channels: ["Slack", "Email"] },
    { type: "Visibility Drop", channels: ["Slack", "Teams"] },
    { type: "Hallucination", channels: ["Slack", "WhatsApp", "Email"] },
    { type: "Competitor Overtook", channels: ["Teams", "Email"] },
    { type: "New Opportunity", channels: ["Slack"] },
  ],
  feed: [
    { id: 1, type: "Hallucination", message: "Claude claimed product lacks SSO integration.", channel: "WhatsApp", time: "2 mins ago", priority: "Critical" },
    { id: 2, type: "Citation Lost", message: "Lost primary Perplexity citation for 'Best AI CRM'.", channel: "Slack", time: "15 mins ago", priority: "High" },
    { id: 3, type: "New Opportunity", message: "Acme Corp generated as Lead from GPT-4.", channel: "Slack", time: "1 hour ago", priority: "Medium" },
    { id: 4, type: "Visibility Drop", message: "12% drop in EU regional visibility.", channel: "Teams", time: "3 hours ago", priority: "High" },
    { id: 5, type: "Competitor Overtook", message: "Competitor A overtook #1 spot in Gemini.", channel: "Email", time: "5 hours ago", priority: "High" },
  ]
};
