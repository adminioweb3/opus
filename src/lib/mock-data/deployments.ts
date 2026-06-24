export const mockDeploymentsData = {
  websites: [
    { url: "acmecorp.com", type: "Next.js", health: 92, visibility: 85, lastSync: "10m ago", status: "Connected" },
    { url: "blog.acmecorp.com", type: "WordPress", health: 88, visibility: 72, lastSync: "1h ago", status: "Connected" },
    { url: "shop.acmecorp.com", type: "Shopify", health: 95, visibility: 89, lastSync: "5m ago", status: "Connected" },
    { url: "help.acmecorp.com", type: "Webflow", health: 78, visibility: 45, lastSync: "2d ago", status: "Sync Error" }
  ],
  integrations: {
    cms: [
      { name: "WordPress", status: "Connected", icon: "WP" },
      { name: "Shopify", status: "Connected", icon: "SH" },
      { name: "Webflow", status: "Error", icon: "WF" },
      { name: "Ghost", status: "Not Connected", icon: "GH" },
      { name: "HubSpot", status: "Not Connected", icon: "HS" }
    ],
    headless: [
      { name: "Contentful", status: "Not Connected", icon: "CT" },
      { name: "Strapi", status: "Not Connected", icon: "ST" },
      { name: "Sanity", status: "Not Connected", icon: "SA" }
    ],
    dev: [
      { name: "GitHub", status: "Connected", icon: "GH" },
      { name: "GitLab", status: "Not Connected", icon: "GL" },
      { name: "Vercel", status: "Connected", icon: "VC" }
    ]
  },
  contentInventory: [
    { url: "/pricing", type: "Page", status: "Optimized", visibility: 92, citation: 85, lastUpdated: "Oct 12" },
    { url: "/blog/what-is-ai", type: "Blog", status: "Needs Review", visibility: 45, citation: 12, lastUpdated: "Jan 04" },
    { url: "/enterprise", type: "Landing Page", status: "Generating", visibility: 60, citation: 40, lastUpdated: "Oct 20" },
    { url: "/competitor-vs-us", type: "Comparison Page", status: "Optimized", visibility: 88, citation: 70, lastUpdated: "Nov 01" }
  ],
  deployments: {
    queue: [
      { id: "DEP-104", type: "New FAQ Page", target: "/faq/ai-features", status: "Review", date: "Today" },
      { id: "DEP-105", type: "Schema Update", target: "/pricing", status: "Scheduled", date: "Tomorrow" }
    ],
    history: [
      { id: "DEP-103", type: "Blog Update", target: "/blog/trends", status: "Deployed", date: "Oct 24" },
      { id: "DEP-102", type: "Metadata Update", target: "/", status: "Deployed", date: "Oct 22" },
      { id: "DEP-101", type: "Landing Page Creation", target: "/features", status: "Failed", date: "Oct 20" }
    ]
  },
  contentDiff: {
    targetUrl: "/pricing",
    before: {
      title: "Pricing Plans",
      content: "We offer simple pricing for everyone. Contact us for enterprise.",
      schema: { "@type": "Product", "name": "ACME Software" }
    },
    after: {
      title: "ACME AI Pricing | Enterprise Visibility Platform",
      content: "Unlock AI visibility with ACME. Discover our specialized plans for startups and Fortune 500 enterprises. Compare features below.",
      schema: { "@type": "Product", "name": "ACME Software", "category": "Enterprise AI", "offers": { "price": "Custom" } }
    }
  },
  repositories: [
    { name: "acme-corp/marketing-site", framework: "Next.js", branch: "main", status: "Synced", prs: 2 },
    { name: "acme-corp/docs", framework: "Nuxt", branch: "master", status: "Synced", prs: 0 }
  ],
  pullRequests: [
    { title: "feat: update FAQ schema for AEO", branch: "citationly/update-faq", status: "Review Required", commits: 3, lines: "+45 -12" },
    { title: "fix: missing metadata on pricing", branch: "citationly/fix-meta", status: "Ready to Merge", commits: 1, lines: "+8 -0" }
  ],
  cmsPublishing: {
    queue: [
      { title: "What is AI Visibility?", type: "Blog", cms: "WordPress", status: "Draft Generated" },
      { title: "Holiday Sale", type: "Landing Page", cms: "Shopify", status: "Pending Review" }
    ],
    published: [
      { title: "Top 10 Trends", type: "Blog", cms: "WordPress", date: "Oct 15" }
    ]
  },
  scanner: {
    results: [
      { issue: "Missing FAQ Schema", url: "/pricing", severity: "High", type: "AEO", impact: "High visibility drop on Perplexity" },
      { issue: "Slow LCP", url: "/", severity: "Medium", type: "SEO", impact: "Google rank penalty" },
      { issue: "Negative sentiment in summary", url: "TechCrunch Article", severity: "Critical", type: "GEO", impact: "Brand trust erosion" }
    ]
  },
  automations: [
    { trigger: "Visibility Drop > 5%", condition: "If URL is /pricing", action: "Generate Content Gap Analysis", status: "Active" },
    { trigger: "Citation Loss Detected", condition: "If Domain Authority > 50", action: "Create Outreach Draft", status: "Active" },
    { trigger: "Competitor Published Post", condition: "If Category matches Core", action: "Generate Comparison Page", status: "Paused" }
  ],
  deploymentAgents: [
    { name: "SEO Agent", task: "Updating Metadata", target: "acmecorp.com", progress: 85, status: "Deploying" },
    { name: "GEO Agent", task: "Generating Content Gap", target: "blog.acmecorp.com", progress: 40, status: "Analyzing" },
    { name: "Publishing Agent", task: "Pushing PR to GitHub", target: "marketing-site", progress: 100, status: "Waiting for Approval" }
  ]
};
