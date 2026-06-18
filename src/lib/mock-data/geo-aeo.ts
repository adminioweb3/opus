export const mockPromptIntelligence = {
  overview: {
    volume: "1.2M",
    volumeChange: "+15%",
    growth: "+24%",
    opportunityScore: 84,
    competitionScore: 62,
  },
  clusters: [
    { name: "Pricing Queries", x: 100, y: 200, z: 400, color: "var(--color-primary)" },
    { name: "Feature Comparisons", x: 120, y: 100, z: 260, color: "var(--color-emerald-500)" },
    { name: "Integration How-to", x: 170, y: 300, z: 400, color: "var(--color-amber-500)" },
    { name: "Alternative To", x: 140, y: 250, z: 280, color: "var(--color-purple-500)" },
    { name: "Troubleshooting", x: 150, y: 400, z: 500, color: "var(--color-red-500)" },
    { name: "Best Practices", x: 110, y: 280, z: 200, color: "var(--color-blue-500)" },
  ],
  emergingTrends: [
    { date: "Mon", "AI Workflow": 40, "Agentic AI": 24, "Copilot": 24 },
    { date: "Tue", "AI Workflow": 30, "Agentic AI": 13, "Copilot": 22 },
    { date: "Wed", "AI Workflow": 20, "Agentic AI": 58, "Copilot": 22 },
    { date: "Thu", "AI Workflow": 27, "Agentic AI": 39, "Copilot": 20 },
    { date: "Fri", "AI Workflow": 18, "Agentic AI": 48, "Copilot": 21 },
    { date: "Sat", "AI Workflow": 23, "Agentic AI": 38, "Copilot": 25 },
    { date: "Sun", "AI Workflow": 34, "Agentic AI": 43, "Copilot": 21 },
  ]
};

export const mockOpportunities = {
  quickWins: [
    { id: 1, title: "Add FAQ for 'Enterprise Security'", impact: "High", effort: "Low", status: "Open" },
    { id: 2, title: "Optimize 'Pricing' page for GPT-4", impact: "High", effort: "Medium", status: "Open" },
    { id: 3, title: "Update stale citations on 'Features'", impact: "Medium", effort: "Low", status: "In Progress" },
  ],
  highImpact: [
    { id: 4, title: "Publish 'Agentic AI' Comparison Guide", impact: "Very High", effort: "High", status: "Open" },
    { id: 5, title: "Restructure Technical Documentation", impact: "High", effort: "High", status: "Planning" },
  ],
  contentGaps: [
    { topic: "API Rate Limits", searches: 12400, coverage: "12%" },
    { topic: "SSO Integration Steps", searches: 8900, coverage: "5%" },
    { topic: "Data Export Formats", searches: 6200, coverage: "25%" },
  ],
  missingFaqs: [
    { question: "How does the AI handle PII?", volume: 4500, relevance: 95 },
    { question: "Can I self-host the agent?", volume: 3200, relevance: 88 },
  ],
  missingCitations: [
    { keyword: "Best AI CRM 2026", engine: "Perplexity", competitor: "Comp A", mentions: 120 },
    { keyword: "Copilot vs Opus", engine: "ChatGPT", competitor: "Comp B", mentions: 85 },
  ]
};

export const mockBotAnalytics = {
  overview: [
    { name: "GPTBot", crawls: "14,200", health: "98%", trend: "+5%" },
    { name: "ClaudeBot", crawls: "9,800", health: "100%", trend: "+12%" },
    { name: "GeminiBot", crawls: "11,500", health: "94%", trend: "-2%" },
    { name: "PerplexityBot", crawls: "24,000", health: "99%", trend: "+25%" },
  ],
  crawlTimeline: [
    { date: "10-01", GPTBot: 4000, ClaudeBot: 2400, GeminiBot: 2400, PerplexityBot: 3000 },
    { date: "10-02", GPTBot: 3000, ClaudeBot: 1398, GeminiBot: 2210, PerplexityBot: 4000 },
    { date: "10-03", GPTBot: 2000, ClaudeBot: 9800, GeminiBot: 2290, PerplexityBot: 4500 },
    { date: "10-04", GPTBot: 2780, ClaudeBot: 3908, GeminiBot: 2000, PerplexityBot: 4800 },
    { date: "10-05", GPTBot: 1890, ClaudeBot: 4800, GeminiBot: 2181, PerplexityBot: 5000 },
    { date: "10-06", GPTBot: 2390, ClaudeBot: 3800, GeminiBot: 2500, PerplexityBot: 5500 },
    { date: "10-07", GPTBot: 3490, ClaudeBot: 4300, GeminiBot: 2100, PerplexityBot: 6000 },
  ],
  topPages: [
    { path: "/features/ai-agents", crawls: 1240, lastCrawled: "2 mins ago" },
    { path: "/pricing", crawls: 980, lastCrawled: "15 mins ago" },
    { path: "/docs/api/authentication", crawls: 850, lastCrawled: "1 hour ago" },
    { path: "/blog/future-of-work", crawls: 720, lastCrawled: "3 hours ago" },
  ]
};

export const mockSearchJourney = {
  funnel: [
    { stage: "Prompt", value: 100000, fill: "var(--color-slate-200)" },
    { stage: "AI Answer", value: 85000, fill: "var(--color-blue-400)" },
    { stage: "Citation", value: 45000, fill: "var(--color-indigo-500)" },
    { stage: "Click", value: 12000, fill: "var(--color-purple-500)" },
    { stage: "Conversion", value: 2400, fill: "var(--color-emerald-500)" },
  ],
  dropoffAnalysis: [
    { stage: "Prompt to Answer", dropoff: "15%", reason: "Irrelevant intent" },
    { stage: "Answer to Citation", dropoff: "47%", reason: "Competitor cited instead" },
    { stage: "Citation to Click", dropoff: "73%", reason: "Answer was sufficient (Zero-click)" },
    { stage: "Click to Conversion", dropoff: "80%", reason: "Pricing mismatch / Bounce" },
  ]
};

export const mockRegionalIntelligence = {
  visibility: [
    { region: "US", score: 88, change: "+5" },
    { region: "Europe", score: 76, change: "+2" },
    { region: "India", score: 92, change: "+12" },
    { region: "Middle East", score: 64, change: "-3" },
  ],
  rankings: [
    { keyword: "AI Platform", US: 1, Europe: 3, India: 1, MiddleEast: 5 },
    { keyword: "Enterprise Copilot", US: 2, Europe: 2, India: 4, MiddleEast: 8 },
    { keyword: "Agentic Workflows", US: 1, Europe: 1, India: 2, MiddleEast: 3 },
  ],
  sentiment: [
    { region: "US", Positive: 75, Neutral: 15, Negative: 10 },
    { region: "Europe", Positive: 60, Neutral: 30, Negative: 10 },
    { region: "India", Positive: 85, Neutral: 10, Negative: 5 },
    { region: "Middle East", Positive: 55, Neutral: 25, Negative: 20 },
  ]
};
