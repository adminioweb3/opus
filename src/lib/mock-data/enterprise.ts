export const mockEnterpriseData = {
  team: {
    tasks: [
      { id: "TSK-01", title: "Update Pricing Page Schema", assignee: "Sarah Connor", status: "In Progress", priority: "High" },
      { id: "TSK-02", title: "Review Q3 Competitor Keywords", assignee: "John Smith", status: "Pending", priority: "Medium" },
      { id: "TSK-03", title: "Implement FAQ Fixes for Shopify", assignee: "Alice Chen", status: "Completed", priority: "High" },
    ],
    activityFeed: [
      { id: 1, user: "Alice Chen", action: "completed task", target: "Implement FAQ Fixes for Shopify", time: "2 hours ago" },
      { id: 2, user: "Sarah Connor", action: "commented on", target: "Update Pricing Page Schema", time: "4 hours ago", comment: "I've drafted the JSON-LD, just need review." },
      { id: 3, user: "John Smith", action: "assigned task to", target: "Sarah Connor", time: "1 day ago" },
    ]
  },
  reports: [
    { title: "Weekly GEO Performance", type: "GEO Report", date: "Oct 24, 2026", status: "Generated", format: "PDF" },
    { title: "Monthly Visibility Summary", type: "Visibility Report", date: "Oct 01, 2026", status: "Generated", format: "PDF" },
    { title: "Q3 Competitor Landscape", type: "Competitor Report", date: "Sep 30, 2026", status: "Generated", format: "PPTX" },
    { title: "Weekly AEO Opportunities", type: "AEO Report", date: "Generating...", status: "In Progress", format: "CSV" },
  ],
  research: [
    { title: "State of Agentic AI Search 2026", category: "Industry Report", reads: 1240, readTime: "12 min" },
    { title: "Generative Engine Optimization Best Practices", category: "GEO Report", reads: 890, readTime: "8 min" },
    { title: "Answer Engine Ranking Factors", category: "AEO Report", reads: 2100, readTime: "15 min" },
    { title: "The Shift from Traditional SEO", category: "SEO Report", reads: 650, readTime: "5 min" },
  ],
  caseStudies: [
    { company: "Acme Corp", industry: "SaaS", result: "+145% AI Visibility", summary: "How Acme Corp dominated Perplexity and ChatGPT using OPUS Agentic Action Layer." },
    { company: "Globex Retail", industry: "E-Commerce", result: "3.2x Revenue from AI", summary: "Globex optimized their Shopify catalog for Google AI Overviews, resulting in massive ROI." },
    { company: "Initech", industry: "Finance", result: "Zero Hallucinations", summary: "Initech utilized OPUS Voice Drift and Alerting to maintain 100% compliance in AI responses." },
  ],
  benchmarks: {
    userMetrics: {
      aiVisibilityScore: 82,
      citationRate: 45,
      responseAccuracy: 94,
    },
    industryAverages: {
      aiVisibilityScore: 65,
      citationRate: 22,
      responseAccuracy: 78,
    }
  }
};
