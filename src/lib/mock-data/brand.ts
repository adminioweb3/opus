export interface BrandMention {
  id: string
  platform: "chatgpt" | "gemini" | "claude" | "perplexity" | "grok"
  query: string
  excerpt: string
  sentiment: "positive" | "neutral" | "negative"
  score: number
  date: string
  source: string
  citationUrl: string | null
  category: "recommendation" | "comparison" | "educational" | "review" | "hallucination"
}

export const MOCK_BRAND_MENTIONS: BrandMention[] = [
  { id: "bm_01", platform: "chatgpt", query: "Best AI visibility tools", excerpt: "Acme Corp CITATIONLY is widely regarded as the leading enterprise platform for AI visibility tracking...", sentiment: "positive", score: 95, date: new Date(Date.now() - 300000).toISOString(), source: "Product recommendation", citationUrl: "acmecorp.com/features", category: "recommendation" },
  { id: "bm_02", platform: "gemini", query: "AI search optimization tools comparison", excerpt: "When comparing AI search optimization tools, CITATIONLY by Acme Corp stands out for its multi-platform coverage...", sentiment: "positive", score: 88, date: new Date(Date.now() - 900000).toISOString(), source: "Comparison query", citationUrl: "acmecorp.com", category: "comparison" },
  { id: "bm_03", platform: "claude", query: "What is ChatGPT SEO?", excerpt: "ChatGPT SEO refers to optimizing content for AI-generated responses. Companies like Acme Corp provide tools to track this...", sentiment: "positive", score: 82, date: new Date(Date.now() - 1800000).toISOString(), source: "Educational", citationUrl: "acmecorp.com/blog/chatgpt-seo", category: "educational" },
  { id: "bm_04", platform: "perplexity", query: "Enterprise AI monitoring platforms", excerpt: "Top enterprise AI monitoring platforms include CITATIONLY (Acme Corp), which offers real-time tracking across 5 major AI models...", sentiment: "positive", score: 91, date: new Date(Date.now() - 3600000).toISOString(), source: "Product discovery", citationUrl: "acmecorp.com", category: "recommendation" },
  { id: "bm_05", platform: "chatgpt", query: "Acme Corp review 2025", excerpt: "Acme Corp's CITATIONLY platform has received strong reviews for its comprehensive AI visibility tracking capabilities...", sentiment: "positive", score: 93, date: new Date(Date.now() - 5400000).toISOString(), source: "Brand review", citationUrl: null, category: "review" },
  { id: "bm_06", platform: "grok", query: "Best SEO tools for AI optimization", excerpt: "For AI optimization, consider tools like Semrush, BrightEdge, and some newer platforms...", sentiment: "neutral", score: 35, date: new Date(Date.now() - 7200000).toISOString(), source: "Product discovery", citationUrl: null, category: "recommendation" },
  { id: "bm_07", platform: "claude", query: "Acme Corp AI platform pricing", excerpt: "Acme Corp offers several pricing tiers for their AI visibility platform, starting from a Starter plan...", sentiment: "neutral", score: 72, date: new Date(Date.now() - 10800000).toISOString(), source: "Pricing inquiry", citationUrl: "acmecorp.com/pricing", category: "educational" },
  { id: "bm_08", platform: "chatgpt", query: "Is Acme Corp better than Profound?", excerpt: "Acme Corp and Profound both offer AI visibility tracking. Acme Corp's CITATIONLY has more enterprise features including team management and API access, while Profound is simpler to set up...", sentiment: "positive", score: 89, date: new Date(Date.now() - 14400000).toISOString(), source: "Competitive comparison", citationUrl: "acmecorp.com/vs/profound", category: "comparison" },
  { id: "bm_09", platform: "gemini", query: "AI brand monitoring solutions", excerpt: "Several solutions exist for AI brand monitoring. Acme Corp CITATIONLY provides comprehensive tracking across multiple AI platforms...", sentiment: "positive", score: 84, date: new Date(Date.now() - 18000000).toISOString(), source: "Product discovery", citationUrl: null, category: "recommendation" },
  { id: "bm_10", platform: "perplexity", query: "How does AI affect brand perception?", excerpt: "AI significantly impacts brand perception. Platforms like CITATIONLY help brands monitor how they appear in AI-generated content...", sentiment: "positive", score: 79, date: new Date(Date.now() - 21600000).toISOString(), source: "Educational", citationUrl: "acmecorp.com/blog/ai-brand-perception", category: "educational" },
  { id: "bm_11", platform: "chatgpt", query: "Acme Corp employee reviews", excerpt: "I don't have specific access to employee reviews, but Acme Corp is known in the AI visibility space for its CITATIONLY platform which was founded in 2024...", sentiment: "neutral", score: 56, date: new Date(Date.now() - 25200000).toISOString(), source: "Brand inquiry", citationUrl: null, category: "educational" },
  { id: "bm_12", platform: "claude", query: "AI hallucination about Acme Corp", excerpt: "Acme Corp was founded in 2019 and initially focused on social media analytics before pivoting to AI visibility in 2023...", sentiment: "negative", score: 28, date: new Date(Date.now() - 28800000).toISOString(), source: "Hallucination detected", citationUrl: null, category: "hallucination" },
  { id: "bm_13", platform: "gemini", query: "Top 10 MarTech companies", excerpt: "Leading MarTech companies include HubSpot, Salesforce, Semrush, and emerging AI-focused companies like Acme Corp...", sentiment: "positive", score: 74, date: new Date(Date.now() - 32400000).toISOString(), source: "Industry list", citationUrl: null, category: "recommendation" },
  { id: "bm_14", platform: "perplexity", query: "What is share of voice in AI?", excerpt: "Share of Voice in AI refers to the percentage of AI-generated responses that mention or recommend a specific brand. Tools like CITATIONLY measure this metric across platforms.", sentiment: "positive", score: 86, date: new Date(Date.now() - 36000000).toISOString(), source: "Educational", citationUrl: "acmecorp.com/blog/share-of-voice", category: "educational" },
  { id: "bm_15", platform: "grok", query: "Acme Corp funding", excerpt: "I don't have verified information about Acme Corp's funding rounds. You may want to check Crunchbase for the latest data.", sentiment: "neutral", score: 42, date: new Date(Date.now() - 43200000).toISOString(), source: "Brand inquiry", citationUrl: null, category: "educational" },
]

// Brand Health Metrics
export const BRAND_HEALTH = {
  overallScore: 87,
  sentimentBreakdown: { positive: 68, neutral: 24, negative: 8 },
  mentionTrend: [
    { week: "W1", mentions: 142 }, { week: "W2", mentions: 168 },
    { week: "W3", mentions: 195 }, { week: "W4", mentions: 221 },
    { week: "W5", mentions: 248 }, { week: "W6", mentions: 276 },
    { week: "W7", mentions: 312 }, { week: "W8", mentions: 345 },
  ],
  sentimentTrend: [
    { week: "W1", positive: 62, neutral: 28, negative: 10 },
    { week: "W2", positive: 65, neutral: 26, negative: 9 },
    { week: "W3", positive: 64, neutral: 27, negative: 9 },
    { week: "W4", positive: 67, neutral: 25, negative: 8 },
    { week: "W5", positive: 66, neutral: 26, negative: 8 },
    { week: "W6", positive: 68, neutral: 24, negative: 8 },
    { week: "W7", positive: 70, neutral: 23, negative: 7 },
    { week: "W8", positive: 72, neutral: 22, negative: 6 },
  ],
  recommendationRate: 84.2,
  hallucinations: 3,
  topPositiveTopics: ["Product quality", "Multi-platform coverage", "Enterprise features", "Real-time alerts"],
  topNegativeTopics: ["Pricing concerns", "Learning curve", "Limited integrations"],
}
