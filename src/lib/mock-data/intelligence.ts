export const mockExecutiveScores = {
  visibilityScore: 78,
  visibilityChange: 5.2,
  citationScore: 82,
  citationChange: 3.1,
  sentimentScore: 65,
  sentimentChange: -1.2,
  competitorScore: 71,
  competitorChange: 2.5,
  hallucinationRisk: 12, // Lower is better
  hallucinationRiskChange: -2.0,
  seoHealth: 91,
  seoHealthChange: 0.5,
  aeoReadiness: 68,
  aeoReadinessChange: 8.4,
  geoReadiness: 74,
  geoReadinessChange: 4.1,
};

export const mockCitationsData = {
  sources: [
    { name: "Documentation", value: 45, color: "var(--color-primary)" },
    { name: "Blog Posts", value: 25, color: "var(--color-emerald-500)" },
    { name: "News Articles", value: 15, color: "var(--color-blue-500)" },
    { name: "Social Media", value: 10, color: "var(--color-amber-500)" },
    { name: "Forums", value: 5, color: "var(--color-rose-500)" },
  ],
  trend: Array.from({ length: 30 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (29 - i));
    return {
      date: d.toISOString(),
      citations: Math.floor(100 + Math.random() * 50 + (i * 2)),
    };
  }),
  gainLoss: [
    { source: "TechCrunch", value: 12, type: "gain" },
    { source: "Reddit", value: 8, type: "gain" },
    { source: "StackOverflow", value: 5, type: "gain" },
    { source: "HackerNews", value: -3, type: "loss" },
    { source: "Medium", value: -7, type: "loss" },
  ],
  topPages: [
    { url: "/docs/api-reference", citations: 1245, change: 12.5 },
    { url: "/pricing", citations: 850, change: 5.2 },
    { url: "/features/ai-engine", citations: 620, change: 25.4 },
    { url: "/blog/what-is-geo", citations: 430, change: -2.1 },
    { url: "/about", citations: 210, change: 0.5 },
  ]
};

export const mockMentionsData = {
  platforms: [
    { name: "ChatGPT", mentions: 1250, sentiment: "positive", color: "text-emerald-500" },
    { name: "Gemini", mentions: 980, sentiment: "neutral", color: "text-blue-500" },
    { name: "Claude", mentions: 850, sentiment: "positive", color: "text-purple-500" },
    { name: "Perplexity", mentions: 1100, sentiment: "positive", color: "text-sky-500" },
    { name: "Copilot", mentions: 720, sentiment: "neutral", color: "text-indigo-500" },
    { name: "Grok", mentions: 340, sentiment: "negative", color: "text-rose-500" },
  ],
  timeline: Array.from({ length: 14 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (13 - i));
    return {
      date: d.toISOString().split("T")[0],
      ChatGPT: Math.floor(50 + Math.random() * 40),
      Gemini: Math.floor(40 + Math.random() * 30),
      Claude: Math.floor(30 + Math.random() * 20),
      Perplexity: Math.floor(60 + Math.random() * 30),
      Copilot: Math.floor(20 + Math.random() * 20),
      Grok: Math.floor(5 + Math.random() * 10),
    };
  }),
};

export const mockPlatformComparison = {
  radarData: [
    { subject: 'Accuracy', A: 90, B: 75, C: 85, fullMark: 100 },
    { subject: 'Sentiment', A: 85, B: 60, C: 90, fullMark: 100 },
    { subject: 'Visibility', A: 95, B: 80, C: 70, fullMark: 100 },
    { subject: 'Recommendation', A: 88, B: 65, C: 82, fullMark: 100 },
    { subject: 'Detail', A: 75, B: 85, C: 92, fullMark: 100 },
  ],
  platforms: ["ChatGPT", "Gemini", "Claude", "Perplexity", "Copilot"]
};

export const mockCompetitorsData = {
  shareOfVoice: [
    { name: "OPUS (You)", value: 35, color: "var(--color-primary)" },
    { name: "Competitor A", value: 25, color: "var(--color-slate-400)" },
    { name: "Competitor B", value: 20, color: "var(--color-slate-500)" },
    { name: "Competitor C", value: 15, color: "var(--color-slate-600)" },
    { name: "Others", value: 5, color: "var(--color-slate-300)" },
  ],
  citationShare: [
    { name: "Documentation", "OPUS": 45, "Comp A": 30, "Comp B": 15 },
    { name: "Blogs", "OPUS": 25, "Comp A": 40, "Comp B": 20 },
    { name: "News", "OPUS": 30, "Comp A": 20, "Comp B": 35 },
  ],
  sentimentComparison: [
    { name: "OPUS", positive: 65, neutral: 25, negative: 10 },
    { name: "Competitor A", positive: 45, neutral: 40, negative: 15 },
    { name: "Competitor B", positive: 30, neutral: 50, negative: 20 },
    { name: "Competitor C", positive: 55, neutral: 30, negative: 15 },
  ],
  ranking: [
    { rank: 1, name: "OPUS", score: 85, change: 2 },
    { rank: 2, name: "Competitor A", score: 78, change: -1 },
    { rank: 3, name: "Competitor C", score: 72, change: 3 },
    { rank: 4, name: "Competitor B", score: 65, change: -1 },
  ]
};

export const mockIndustryBenchmarks = {
  summary: {
    userScore: 78,
    industryAverage: 62,
    bestPerformer: 92,
  },
  gapAnalysis: [
    { metric: "AI Visibility", user: 78, avg: 62, best: 92 },
    { metric: "Citation Authority", user: 82, avg: 58, best: 89 },
    { metric: "Brand Sentiment", user: 65, avg: 70, best: 95 },
    { metric: "Information Accuracy", user: 90, avg: 75, best: 96 },
    { metric: "Entity Recognition", user: 72, avg: 65, best: 88 },
  ]
};
