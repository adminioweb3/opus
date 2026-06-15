export type AlertType = "brand_mention" | "negative_sentiment" | "competitor_mention" | "visibility_drop" | "citation_spike"

export interface AlertRule {
  id: string
  name: string
  type: AlertType
  enabled: boolean
  threshold: number | null
  channels: ("email" | "slack" | "in_app")[]
  createdAt: string
  description: string
}

export interface AlertNotification {
  id: string
  ruleId: string
  type: AlertType
  title: string
  message: string
  platform: "chatgpt" | "gemini" | "claude" | "perplexity" | "grok" | "system"
  severity: "info" | "warning" | "critical"
  read: boolean
  createdAt: string
  actionUrl: string | null
}

export const MOCK_ALERT_RULES: AlertRule[] = [
  { id: "ar_001", name: "Brand Mention Alert", type: "brand_mention", enabled: true, threshold: null, channels: ["email", "slack", "in_app"], createdAt: "2024-06-01T10:00:00Z", description: "Notify when Acme Corp is mentioned in any AI response" },
  { id: "ar_002", name: "Negative Sentiment Watch", type: "negative_sentiment", enabled: true, threshold: 30, channels: ["email", "in_app"], createdAt: "2024-06-15T14:00:00Z", description: "Alert when sentiment score drops below 30%" },
  { id: "ar_003", name: "Competitor Activity", type: "competitor_mention", enabled: true, threshold: null, channels: ["slack", "in_app"], createdAt: "2024-07-01T09:00:00Z", description: "Track when competitors are mentioned more frequently" },
  { id: "ar_004", name: "Visibility Drop Guard", type: "visibility_drop", enabled: true, threshold: 5, channels: ["email", "slack", "in_app"], createdAt: "2024-07-10T11:00:00Z", description: "Alert when visibility score drops more than 5% in 24 hours" },
  { id: "ar_005", name: "Citation Spike Detector", type: "citation_spike", enabled: false, threshold: 50, channels: ["in_app"], createdAt: "2024-08-01T16:00:00Z", description: "Notify when citation count increases by 50% or more" },
  { id: "ar_006", name: "Hallucination Alert", type: "negative_sentiment", enabled: true, threshold: 20, channels: ["email", "slack", "in_app"], createdAt: "2024-08-20T10:00:00Z", description: "Detect and alert on AI hallucinations about your brand" },
]

export const MOCK_NOTIFICATIONS: AlertNotification[] = [
  { id: "not_01", ruleId: "ar_001", type: "brand_mention", title: "New Brand Mention on ChatGPT", message: "Acme Corp was positively mentioned in a product comparison query about AI visibility tools.", platform: "chatgpt", severity: "info", read: false, createdAt: new Date(Date.now() - 120000).toISOString(), actionUrl: "/dashboard/brand" },
  { id: "not_02", ruleId: "ar_004", type: "visibility_drop", title: "Visibility Score Alert", message: "Your visibility score on Grok dropped by 6.2% in the last 24 hours. This may be due to a platform algorithm update.", platform: "grok", severity: "warning", read: false, createdAt: new Date(Date.now() - 300000).toISOString(), actionUrl: "/dashboard/monitoring" },
  { id: "not_03", ruleId: "ar_003", type: "competitor_mention", title: "Competitor Gaining Traction", message: "Profound AI has been mentioned 23% more frequently on Gemini this week compared to last week.", platform: "gemini", severity: "warning", read: false, createdAt: new Date(Date.now() - 900000).toISOString(), actionUrl: "/dashboard/competitors" },
  { id: "not_04", ruleId: "ar_001", type: "brand_mention", title: "Brand Recommended on Perplexity", message: "OPUS was listed as the #1 recommendation for 'best AI visibility tools' on Perplexity.", platform: "perplexity", severity: "info", read: true, createdAt: new Date(Date.now() - 1800000).toISOString(), actionUrl: "/dashboard/monitoring" },
  { id: "not_05", ruleId: "ar_006", type: "negative_sentiment", title: "Hallucination Detected", message: "Claude incorrectly stated that Acme Corp was founded in 2019 and originally focused on social media analytics.", platform: "claude", severity: "critical", read: false, createdAt: new Date(Date.now() - 3600000).toISOString(), actionUrl: "/dashboard/brand" },
  { id: "not_06", ruleId: "ar_005", type: "citation_spike", title: "Citation Spike on ChatGPT", message: "Your /blog/what-is-ai-search page received 340% more citations on ChatGPT in the last 6 hours.", platform: "chatgpt", severity: "info", read: true, createdAt: new Date(Date.now() - 5400000).toISOString(), actionUrl: "/dashboard/analytics" },
  { id: "not_07", ruleId: "ar_002", type: "negative_sentiment", title: "Negative Sentiment Spike", message: "2 responses on Grok expressed concerns about OPUS pricing for small businesses.", platform: "grok", severity: "warning", read: true, createdAt: new Date(Date.now() - 7200000).toISOString(), actionUrl: "/dashboard/brand" },
  { id: "not_08", ruleId: "ar_001", type: "brand_mention", title: "New Brand Mention on Gemini", message: "Acme Corp was mentioned as a MarTech leader in an industry overview query.", platform: "gemini", severity: "info", read: true, createdAt: new Date(Date.now() - 10800000).toISOString(), actionUrl: "/dashboard/brand" },
]
