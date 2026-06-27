export const mockOsData = {
  copilot: {
    suggestedPrompts: [
      "Why did visibility drop?",
      "Why is competitor ranking higher?",
      "What content should I create?",
      "Which citations did I lose?",
      "Which opportunities should I prioritize?"
    ],
    history: [
      { role: "user", text: "Why did visibility drop?" },
      { role: "assistant", text: "I've analyzed your recent rankings. Your visibility dropped by 12% primarily because **[Competitor A]** published a comprehensive new guide that captured the primary snippet in Perplexity. Also, you lost 3 critical citations from TechCrunch and G2." },
    ]
  },
  agents: [
    { name: "GEO Agent", status: "Active", tasks: 4, impact: "+12% Vis", lastActive: "2m ago" },
    { name: "SEO Agent", status: "Idle", tasks: 0, impact: "+5% Rank", lastActive: "1h ago" },
    { name: "AEO Agent", status: "Analyzing", tasks: 12, impact: "TBD", lastActive: "Just now" },
    { name: "Citation Agent", status: "Active", tasks: 2, impact: "+8 Links", lastActive: "15m ago" },
    { name: "Competitor Agent", status: "Active", tasks: 1, impact: "Defensive", lastActive: "5m ago" },
    { name: "Brand Agent", status: "Idle", tasks: 0, impact: "Neutral", lastActive: "3h ago" },
    { name: "Content Agent", status: "Generating", tasks: 3, impact: "+4 Pages", lastActive: "1m ago" },
  ],
  workspace: {
    activeCampaigns: [
      { title: "Q4 GEO Defense", progress: 75, due: "Oct 30" },
      { title: "Product Launch SEO", progress: 40, due: "Nov 15" }
    ],
    aiTasks: [
      { task: "Generate FAQ Schema", agent: "Content Agent", status: "Done" },
      { task: "Analyze Competitor Gap", agent: "Competitor Agent", status: "In Progress" },
      { task: "Find Lost Citations", agent: "Citation Agent", status: "Pending" }
    ],
    teamTasks: [
      { task: "Review Generated Blog", assignee: "Sarah", status: "Review" },
      { task: "Approve Schema", assignee: "John", status: "Pending" }
    ]
  },
  campaigns: {
    templates: [
      "GEO Campaign", "SEO Campaign", "AEO Campaign", "Product Launch Campaign", "Competitor Defense Campaign"
    ],
    active: {
      title: "Q4 GEO Defense",
      score: 85,
      impactForecast: "+25% Brand Visibility",
      timeline: [
        { phase: "Audit", status: "Complete" },
        { phase: "Content Gap Analysis", status: "Complete" },
        { phase: "Schema Deployment", status: "In Progress" },
        { phase: "Measurement", status: "Pending" }
      ]
    }
  },
  warRoom: {
    visibilityHealth: 88,
    revenueImpact: "$2.4M",
    citationHealth: 92,
    competitorRisk: "Medium",
    brandSentiment: 95,
    opportunityScore: 78,
    recentAlerts: [
      { type: "Drop", message: "Lost primary Perplexity snippet to Competitor A", pipelineImpact: "-$40k pipeline at risk", isCritical: true },
      { type: "Gain", message: "New mention mapped to $15k pipeline", source: "ChatGPT", time: "2h ago", isCritical: false }
    ],
    visibilityTrend: Array.from({ length: 30 }, (_, i) => ({
      date: `Day ${i + 1}`,
      score: Math.round(75 + Math.sin(i * 0.5) * 5 + (i * 0.5))
    })),
    aiCoverage: [
      { platform: "ChatGPT", score: 91, citations: 142, change: "+4%", color: "text-emerald-600" },
      { platform: "Claude", score: 87, citations: 127, change: "+3%", color: "text-emerald-600" },
      { platform: "Gemini", score: 74, citations: 88, change: "+1%", color: "text-emerald-600" },
      { platform: "Perplexity", score: 68, citations: 56, change: "Needs Attention", color: "text-destructive" }
    ],
    recommendedActions: [
      { action: "Close 3 GEO gaps on sourcing queries", impact: "+$80k", status: "high" },
      { action: "Boost Gemini citation rate", impact: "+6%", status: "medium" },
      { action: "Publish 5 ready FAQ pages", impact: "Ready", status: "neutral" }
    ]
  },
  strategy: {
    plan: [
      { day: "30 Day", tasks: ["Deploy FAQ Schema", "Reclaim 5 lost citations", "Optimize Top 10 Pages for AEO"] },
      { day: "60 Day", tasks: ["Launch 3 New Topic Clusters", "Initiate Competitor Defense Campaign", "Integrate Shopify with CITATIONLY Hub"] },
      { day: "90 Day", tasks: ["Achieve 90% AI Visibility Score", "Generate $500k in AI-Attributed Revenue", "Fully Automate Content Pipeline"] }
    ]
  },
  customerSuccess: {
    scores: {
      productAdoption: 72,
      geoMaturity: 65,
      seoMaturity: 90,
      aeoMaturity: 45
    },
    checklist: [
      { task: "Connect Analytics", done: true },
      { task: "Configure Competitors", done: true },
      { task: "Deploy First Agent", done: false },
      { task: "Launch Campaign", done: false }
    ]
  },
  marketplace: [
    { title: "SaaS Visibility Pack", category: "B2B", rating: 4.9, installs: "2.1k" },
    { title: "Ecommerce Visibility Pack", category: "Retail", rating: 4.8, installs: "5.4k" },
    { title: "Local SEO Pack", category: "Local", rating: 4.7, installs: "1.2k" },
    { title: "Healthcare GEO Pack", category: "Medical", rating: 4.9, installs: "850" },
    { title: "B2B GEO Pack", category: "B2B", rating: 4.6, installs: "3.3k" }
  ]
};
