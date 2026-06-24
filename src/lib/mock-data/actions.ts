export const mockActions = {
  actionCards: [
    { id: 1, type: "Visibility Drop", title: "Sharp decline in GPT-4 answers", severity: "High", impactScore: 92, detectedAt: "2 hours ago" },
    { id: 2, type: "Citation Loss", title: "Lost Perplexity citation to Competitor A", severity: "Medium", impactScore: 78, detectedAt: "5 hours ago" },
    { id: 3, type: "Hallucination", title: "Claude claiming discontinued feature is active", severity: "Critical", impactScore: 98, detectedAt: "10 mins ago" },
    { id: 4, type: "Competitor Gain", title: "Competitor B gaining in 'Enterprise Pricing'", severity: "Medium", impactScore: 65, detectedAt: "1 day ago" },
  ],
  priorityQueue: [
    { id: 101, action: "Update pricing schema to correct Hallucination", engine: "Claude", priority: "P0", status: "Pending Approval" },
    { id: 102, action: "Publish 'Vs Competitor A' comparison page", engine: "Perplexity", priority: "P1", status: "In Progress" },
    { id: 103, action: "Refresh technical API docs to regain citations", engine: "GPT-4", priority: "P1", status: "Pending Approval" },
    { id: 104, action: "Add FAQ for 'Discontinued Feature Alternatives'", engine: "Claude", priority: "P2", status: "Open" },
  ],
  workflowTimeline: [
    { stage: "Detection", description: "Anomaly detected in AI engine output", status: "completed", date: "Oct 12, 09:00 AM" },
    { stage: "Analysis", description: "Root cause identified via competitor delta", status: "completed", date: "Oct 12, 09:15 AM" },
    { stage: "Recommendation", description: "Generated optimal fix and content brief", status: "completed", date: "Oct 12, 09:30 AM" },
    { stage: "Approval", description: "Pending user review to deploy fix", status: "current", date: "Pending" },
  ]
};

export const mockRecommendations = [
  { 
    id: "REC-001",
    issue: "Claude hallucinates pricing model", 
    rootCause: "Outdated PDF in documentation portal", 
    suggestedFix: "Remove PDF and implement robust JSON-LD Pricing Schema", 
    expectedGain: "+15% Accuracy, +10% Click-through" 
  },
  { 
    id: "REC-002",
    issue: "Lost 'Best AI CRM' citation on Perplexity", 
    rootCause: "Competitor launched dedicated landing page", 
    suggestedFix: "Create dedicated 'Why CITATIONLY is the Best AI CRM' page", 
    expectedGain: "Regain #1 Citation Slot" 
  },
  { 
    id: "REC-003",
    issue: "Low visibility on 'Agentic Workflows' queries", 
    rootCause: "Lack of specific use-case examples in content", 
    suggestedFix: "Publish 3 new blog posts detailing specific workflows", 
    expectedGain: "+25% Visibility Score in GPT-4" 
  },
  { 
    id: "REC-004",
    issue: "Gemini prioritizing Competitor B for 'Security'", 
    rootCause: "Security page lacks recent compliance certifications", 
    suggestedFix: "Update Security page with SOC2 and ISO27001 badges explicitly in text", 
    expectedGain: "+40% Citation Probability" 
  }
];

export const mockContentCenter = {
  faqs: [
    { question: "How does CITATIONLY handle enterprise data privacy?", volume: "12.5k", difficulty: "Low", status: "Ready to Publish" },
    { question: "Can I migrate from Competitor A to CITATIONLY?", volume: "8.2k", difficulty: "Medium", status: "Draft Generated" },
    { question: "What are the API rate limits for CITATIONLY?", volume: "5.1k", difficulty: "Low", status: "Pending Review" }
  ],
  blogs: [
    { title: "The Future of Agentic AI in Enterprise CRM", keywords: ["Agentic AI", "Enterprise CRM", "Automation"], intent: "Educational", status: "Draft Generated" },
    { title: "Implementing Secure AI Workflows in Healthcare", keywords: ["AI Workflows", "Healthcare", "HIPAA"], intent: "Transactional", status: "Brief Ready" }
  ],
  comparisons: [
    { title: "CITATIONLY vs Competitor A: Comprehensive Guide", targetEngine: "Perplexity", priority: "High", status: "Reviewing Outline" },
    { title: "Why CITATIONLY is the Best Alternative to Legacy CRMs", targetEngine: "ChatGPT", priority: "Medium", status: "Drafting" }
  ],
  landingPages: [
    { url: "/solutions/healthcare-ai", focus: "Vertical Expansion", conversionEst: "4.5%", status: "Ready for Dev" },
    { url: "/features/agentic-automation", focus: "Feature Deep-dive", conversionEst: "6.2%", status: "Planning" }
  ],
  schema: [
    { type: "SoftwareApplication", targetUrl: "/", issue: "Missing aggregateRating", action: "Add Schema" },
    { type: "FAQPage", targetUrl: "/pricing", issue: "Malformed JSON-LD", action: "Fix Schema" },
    { type: "Article", targetUrl: "/blog/future-of-work", issue: "Missing author/datePublished", action: "Update Schema" }
  ]
};
