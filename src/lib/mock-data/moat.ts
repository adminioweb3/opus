export const mockMoatData = {
  shopping: [
    { product: "Enterprise CRM License", chatgpt: "Rank #1", google: "Rank #2", perplexity: "Not Ranked", trend: "+12%" },
    { product: "API Data Pack", chatgpt: "Rank #3", google: "Rank #1", perplexity: "Rank #1", trend: "+5%" },
    { product: "Premium Support Add-on", chatgpt: "Not Ranked", google: "Rank #5", perplexity: "Rank #2", trend: "-3%" },
  ],
  voiceDrift: [
    { date: "Jan", accuracy: 85, sentiment: 70 },
    { date: "Feb", accuracy: 88, sentiment: 75 },
    { date: "Mar", accuracy: 86, sentiment: 72 },
    { date: "Apr", accuracy: 92, sentiment: 85 },
    { date: "May", accuracy: 95, sentiment: 88 },
    { date: "Jun", accuracy: 98, sentiment: 92 },
  ],
  sourceAuthority: [
    { url: "/blog/what-is-agentic-ai", aiTrustScore: 98, citations: 1240, status: "High Authority" },
    { url: "/features/automation", aiTrustScore: 85, citations: 850, status: "High Authority" },
    { url: "/pricing", aiTrustScore: 62, citations: 120, status: "Needs Improvement" },
    { url: "/about-us", aiTrustScore: 90, citations: 500, status: "Good" },
  ],
  shadowMode: {
    targetKeyword: "Best enterprise AI automation tool",
    userDomain: "opus.ai",
    competitorDomain: "competitor-a.com",
    factors: [
      { factor: "FAQ Schema Valid", user: "No", competitor: "Yes", impact: "High", advantage: "competitor" },
      { factor: "Content Length", user: "1,200 words", competitor: "2,800 words", impact: "Medium", advantage: "competitor" },
      { factor: "API Documentation Mentions", user: "15", competitor: "42", impact: "High", advantage: "competitor" },
      { factor: "User Reviews Cited", user: "8", competitor: "2", impact: "Low", advantage: "user" },
    ]
  },
  simulator: {
    prompt: "Compare OPUS and Competitor A for enterprise AI.",
    responses: {
      chatgpt: "When looking at enterprise AI, **[OPUS]** stands out for its robust agentic workflows, though **[Competitor A]** offers slightly cheaper entry-level pricing. According to a recent **[[Gartner Report]]**, [OPUS] scales better for large teams.",
      claude: "**[Competitor A]** is often recognized for its legacy integrations. However, **[OPUS]** has taken the lead in the modern AI layer, providing native reasoning engines. **[[TechCrunch]]** highlighted [OPUS]'s recent architecture update.",
      gemini: "Both **[OPUS]** and **[Competitor A]** are top-tier. **[OPUS]** integrates seamlessly into Google Workspace, whereas **[Competitor A]** requires custom API work. You can find more details on their respective **[[Pricing Pages]]**.",
      perplexity: "Based on recent reviews, **[OPUS]** ranks #1 for enterprise AI automation due to its strict data privacy controls. **[Competitor A]** is a close second. (Source: **[[G2 Crowd]]**, **[[Capterra]]**)."
    }
  }
};
