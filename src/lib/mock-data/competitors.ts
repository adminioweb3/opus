import { randomBetween } from "@/lib/utils"

export interface Competitor {
  id: string
  name: string
  domain: string
  industry: string
  logo: string
  visibilityScore: number
  shareOfVoice: number
  citationCount: number
  sentimentScore: number
  trend: number
  addedAt: string
  platforms: {
    chatgpt: number
    gemini: number
    claude: number
    perplexity: number
    grok: number
  }
}

export const MOCK_COMPETITORS: Competitor[] = [
  {
    id: "comp_001",
    name: "Profound AI",
    domain: "tryprofound.com",
    industry: "AI Visibility",
    logo: "PA",
    visibilityScore: 76.3,
    shareOfVoice: 22.1,
    citationCount: 8420,
    sentimentScore: 88.2,
    trend: 3.4,
    addedAt: "2024-04-01T10:00:00Z",
    platforms: { chatgpt: 82, gemini: 71, claude: 68, perplexity: 79, grok: 62 },
  },
  {
    id: "comp_002",
    name: "BrightEdge",
    domain: "brightedge.com",
    industry: "Enterprise SEO",
    logo: "BE",
    visibilityScore: 68.9,
    shareOfVoice: 15.7,
    citationCount: 6210,
    sentimentScore: 82.5,
    trend: -1.2,
    addedAt: "2024-04-15T14:00:00Z",
    platforms: { chatgpt: 72, gemini: 65, claude: 58, perplexity: 71, grok: 55 },
  },
  {
    id: "comp_003",
    name: "Semrush",
    domain: "semrush.com",
    industry: "Digital Marketing",
    logo: "SR",
    visibilityScore: 71.4,
    shareOfVoice: 12.3,
    citationCount: 14500,
    sentimentScore: 85.1,
    trend: 0.8,
    addedAt: "2024-05-01T09:00:00Z",
    platforms: { chatgpt: 78, gemini: 69, claude: 64, perplexity: 73, grok: 60 },
  },
  {
    id: "comp_004",
    name: "Ahrefs",
    domain: "ahrefs.com",
    industry: "SEO Tools",
    logo: "AH",
    visibilityScore: 65.2,
    shareOfVoice: 9.8,
    citationCount: 12800,
    sentimentScore: 89.3,
    trend: 2.1,
    addedAt: "2024-05-20T11:00:00Z",
    platforms: { chatgpt: 70, gemini: 62, claude: 59, perplexity: 67, grok: 54 },
  },
  {
    id: "comp_005",
    name: "Surfer SEO",
    domain: "surferseo.com",
    industry: "Content Optimization",
    logo: "SS",
    visibilityScore: 52.8,
    shareOfVoice: 6.4,
    citationCount: 3200,
    sentimentScore: 79.6,
    trend: -0.5,
    addedAt: "2024-06-10T16:00:00Z",
    platforms: { chatgpt: 58, gemini: 49, claude: 44, perplexity: 55, grok: 40 },
  },
  {
    id: "comp_006",
    name: "Clearscope",
    domain: "clearscope.io",
    industry: "Content Intelligence",
    logo: "CS",
    visibilityScore: 48.1,
    shareOfVoice: 4.2,
    citationCount: 1890,
    sentimentScore: 83.7,
    trend: 1.3,
    addedAt: "2024-07-05T08:00:00Z",
    platforms: { chatgpt: 52, gemini: 45, claude: 41, perplexity: 50, grok: 38 },
  },
]

export function generateCompetitorTimeSeries(competitorId: string) {
  const comp = MOCK_COMPETITORS.find(c => c.id === competitorId)
  const base = comp?.visibilityScore ?? 50
  return {
    visibility: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (29 - i) * 86400000).toISOString().split("T")[0],
      value: Math.round((base + (Math.random() - 0.5) * 8) * 10) / 10,
    })),
    shareOfVoice: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (29 - i) * 86400000).toISOString().split("T")[0],
      value: Math.round(((comp?.shareOfVoice ?? 10) + (Math.random() - 0.5) * 4) * 10) / 10,
    })),
  }
}
