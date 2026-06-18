import { generateTimeSeriesData, randomBetween } from "@/lib/utils"

// --- Platform-specific visibility data ---
export const AI_PLATFORMS = [
  { id: "chatgpt", name: "ChatGPT", color: "#10A37F", icon: "openai" },
  { id: "gemini", name: "Gemini", color: "#4285F4", icon: "google" },
  { id: "claude", name: "Claude", color: "#D97757", icon: "anthropic" },
  { id: "perplexity", name: "Perplexity", color: "#22B8CD", icon: "perplexity" },
  { id: "grok", name: "Grok", color: "#000000", icon: "x" },
] as const

export type PlatformId = typeof AI_PLATFORMS[number]["id"]

// --- KPI Scores ---
export function getCurrentScores(period: "7d" | "30d" | "90d" | "1y" = "30d") {
  const mult = period === "7d" ? 1 : period === "30d" ? 1.5 : period === "90d" ? 2.5 : 4
  return {
    visibilityScore: (84.2 + (Math.random() * 5 - 2)).toFixed(1),
    visibilityChange: (4.8 * mult + (Math.random() * 2 - 1)).toFixed(1),
    brandScore: Math.round(87 + (Math.random() * 4 - 2)),
    brandChange: (2.1 * mult + (Math.random() * 2 - 1)).toFixed(1),
    citationScore: (72.5 + (Math.random() * 5 - 2)).toFixed(1),
    citationChange: (8.3 * mult + (Math.random() * 2 - 1)).toFixed(1),
    shareOfVoice: (38.4 + (Math.random() * 5 - 2)).toFixed(1),
    sovChange: (3.2 * mult + (Math.random() * 2 - 1)).toFixed(1),
    aiReach: Math.round(12405 * mult * (1 + Math.random() * 0.2)),
    reachChange: (14.5 * mult + (Math.random() * 2 - 1)).toFixed(1),
    sentimentScore: (91.3 + (Math.random() * 2 - 1)).toFixed(1),
    sentimentChange: (1.7 * mult + (Math.random() * 2 - 1)).toFixed(1),
  }
}

// --- Time Series Data ---
export function getDashboardTimeSeries(period: "7d" | "30d" | "90d" | "1y" = "30d") {
  const days = period === "7d" ? 7 : period === "30d" ? 30 : period === "90d" ? 90 : 365
  return {
    visibility: generateTimeSeriesData(days, 72, 5, 0.8),
    mentions: generateTimeSeriesData(days, 300, 80, 0.6),
    citations: generateTimeSeriesData(days, 150, 40, 0.7),
    sentiment: generateTimeSeriesData(days, 85, 4, 0.3),
  }
}

// --- Platform Breakdown ---
export function getPlatformBreakdown(period: "7d" | "30d" | "90d" | "1y" = "30d") {
  return AI_PLATFORMS.map(p => ({
    ...p,
    visibility: randomBetween(50, 95),
    mentions: randomBetween(800, 4200),
    citations: randomBetween(200, 1800),
    sentiment: randomBetween(75, 98),
    trend: (Math.random() * 10 - 2).toFixed(1),
  }))
}

// --- Top Cited Pages ---
export const TOP_CITED_PAGES = [
  { url: "/blog/what-is-ai-search-optimization", citations: 2847, change: 12.3 },
  { url: "/features/ai-visibility-monitoring", citations: 1932, change: 8.7 },
  { url: "/docs/api-reference", citations: 1456, change: -2.1 },
  { url: "/case-studies/enterprise-seo-with-ai", citations: 1204, change: 15.6 },
  { url: "/about", citations: 893, change: 4.2 },
  { url: "/blog/chatgpt-seo-complete-guide", citations: 764, change: 22.1 },
  { url: "/pricing", citations: 521, change: -1.3 },
  { url: "/blog/geo-vs-seo-differences", citations: 489, change: 31.5 },
]

// --- Recent Activity Feed ---
export const RECENT_ACTIVITY = [
  { id: "act_1", type: "mention" as const, platform: "chatgpt", message: "Your brand was positively mentioned in a product comparison query", time: new Date(Date.now() - 120000).toISOString(), sentiment: "positive" as const },
  { id: "act_2", type: "citation" as const, platform: "gemini", message: "New citation detected for /blog/what-is-ai-search", time: new Date(Date.now() - 300000).toISOString(), sentiment: "neutral" as const },
  { id: "act_3", type: "alert" as const, platform: "claude", message: "Visibility score increased by 3.2% on Claude in the last 24h", time: new Date(Date.now() - 600000).toISOString(), sentiment: "positive" as const },
  { id: "act_4", type: "mention" as const, platform: "perplexity", message: "Brand recommended as #1 solution in 'best AI visibility tools' query", time: new Date(Date.now() - 1800000).toISOString(), sentiment: "positive" as const },
  { id: "act_5", type: "alert" as const, platform: "grok", message: "Competitor 'Profound' gained 2.1% share of voice on Grok", time: new Date(Date.now() - 3600000).toISOString(), sentiment: "negative" as const },
  { id: "act_6", type: "citation" as const, platform: "chatgpt", message: "3 new backlinks detected from AI-generated content", time: new Date(Date.now() - 7200000).toISOString(), sentiment: "positive" as const },
  { id: "act_7", type: "mention" as const, platform: "gemini", message: "Brand context analyzed: 92% accuracy in Gemini responses", time: new Date(Date.now() - 10800000).toISOString(), sentiment: "positive" as const },
  { id: "act_8", type: "alert" as const, platform: "claude", message: "Hallucination detected: Claude incorrectly attributed a feature to your brand", time: new Date(Date.now() - 14400000).toISOString(), sentiment: "negative" as const },
]

// --- Share of Voice Data ---
export const SHARE_OF_VOICE_DATA = [
  { name: "Acme Corp", value: 38.4, color: "#2563EB" },
  { name: "Profound", value: 22.1, color: "#94A3B8" },
  { name: "BrightEdge", value: 15.7, color: "#64748B" },
  { name: "Semrush", value: 12.3, color: "#CBD5E1" },
  { name: "Others", value: 11.5, color: "#E2E8F0" },
]
