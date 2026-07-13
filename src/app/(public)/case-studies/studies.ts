// Case study data source for /case-studies and /case-studies/[slug].
// All figures are fixed literals — plausible visibility-intelligence metrics only
// (share of voice, citation counts, visibility-score gains, hours saved). No invented revenue.

export interface CaseStudyMetric {
  value: string
  label: string
}

export interface CaseStudyStep {
  title: string
  module: string
  desc: string
}

export interface CaseStudy {
  slug: string
  company: string
  industry: string
  logoInitials: string
  gradient: string
  persona: {
    name?: string
    role: string
  }
  headlineMetric: CaseStudyMetric
  secondaryMetrics: [CaseStudyMetric, CaseStudyMetric, CaseStudyMetric]
  excerpt: string
  challenge: [string, string]
  approach: [CaseStudyStep, CaseStudyStep, CaseStudyStep]
  results: [string, string]
  pullQuote: {
    quote: string
    name: string
    role: string
    company: string
  }
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "northwind-cloud",
    company: "Northwind Cloud",
    industry: "B2B SaaS",
    logoInitials: "NC",
    gradient: "from-indigo-500 to-violet-500",
    persona: { name: "Elena Marsh", role: "VP Marketing" },
    headlineMetric: { value: "+38 pts", label: "visibility score gain across ChatGPT and Perplexity in 5 months" },
    secondaryMetrics: [
      { value: "212", label: "citation gaps closed" },
      { value: "3.4x", label: "share of voice vs. #1 competitor" },
      { value: "61 hrs", label: "saved per month on manual prompt checks" },
    ],
    excerpt:
      "Northwind Cloud went from invisible in AI comparison answers to the most-cited vendor in its category, using Visibility Radar and the GEO Optimizer to close 212 citation gaps in five months.",
    challenge: [
      "Northwind Cloud's growth team could see organic search holding steady while inbound demo requests quietly declined. The reason surfaced almost by accident: a sales rep noticed ChatGPT recommending two smaller competitors by name when a prospect asked for \"the best cloud data platform for mid-market teams,\" and Northwind wasn't mentioned at all. Nobody on the team had a way to check how often that was happening, on which platforms, or why.",
      "Elena Marsh, VP Marketing, ran a manual audit — dozens of hand-typed prompts across ChatGPT and Perplexity, screenshotted and pasted into a shared doc. It confirmed the fear: Northwind appeared in barely a quarter of the buyer questions it should have owned, and when it did appear, the citations backing the answer pointed to a five-year-old integration-partner blog post, not to Northwind's own docs. There was no owner, no scoring, and no repeatable process to fix it.",
    ],
    approach: [
      {
        title: "Establish the baseline",
        module: "Visibility Radar",
        desc: "Weekly scans across ChatGPT, Perplexity, Gemini, and Copilot against a 140-prompt panel covering category questions, comparisons, and buyer objections gave Northwind its first real visibility score per platform, with a confidence band instead of a screenshot.",
      },
      {
        title: "Find out who was winning instead",
        module: "Citation Intelligence & Competitor Watch",
        desc: "Citation Intelligence traced every AI answer back to its source and showed that two competitors' comparison pages were being cited in 70% of \"best for mid-market\" prompts. Competitor Watch quantified the gap as a share-of-voice score the exec team could track monthly.",
      },
      {
        title: "Ship the fixes, then re-scan",
        module: "GEO Optimizer & Content Generator",
        desc: "The Page Auditor flagged missing structured comparisons and thin prompt coverage on Northwind's own product pages. The Content Generator drafted citation-worthy comparison and use-case pages, which Publishing Center shipped and Knowledge Vault re-indexed for the next scan cycle.",
      },
    ],
    results: [
      "Within five months, Northwind's blended visibility score rose 38 points, driven almost entirely by ChatGPT and Perplexity, the two platforms where its buyers research most. The 212 closed citation gaps corresponded directly to pages the Content Generator produced and the GEO Optimizer verified as prompt-covered.",
      "Share of voice against its top competitor moved from roughly 1-to-3 to 3.4-to-1 in Northwind's favor on tracked comparison prompts. Elena now opens her monthly marketing review with the Command Center's visibility trendline instead of a screenshot folder, and the manual audit process that used to consume roughly 15 hours a week has been replaced by 61 hours a month of team time redirected to content strategy.",
    ],
    pullQuote: {
      quote:
        "We went from finding out we were missing from an AI answer by accident, to knowing exactly which page will fix it before we publish. That's the difference between hoping and operating.",
      name: "Elena Marsh",
      role: "VP Marketing",
      company: "Northwind Cloud",
    },
  },
  {
    slug: "fielder",
    company: "Fielder",
    industry: "Growth-stage SaaS",
    logoInitials: "FD",
    gradient: "from-violet-500 to-fuchsia-500",
    persona: { name: "Jonah Okonkwo", role: "Head of Growth" },
    headlineMetric: { value: "+52%", label: "increase in tracked-prompt appearances across all platforms" },
    secondaryMetrics: [
      { value: "6", label: "AI platforms actively monitored" },
      { value: "89", label: "opportunities actioned via Opportunity Finder" },
      { value: "4.1x", label: "faster time from gap found to page shipped" },
    ],
    excerpt:
      "Fielder's lean growth team used Opportunity Finder and the Answer Simulator to prioritize a backlog of 89 fixes and lift prompt appearances 52% without adding headcount.",
    challenge: [
      "Fielder was scaling fast but its growth team was three people, and AI visibility had become one more channel with no clear owner and no time to hand-audit. Jonah Okonkwo, Head of Growth, could see from support tickets that prospects were arriving with wrong assumptions about pricing and features — assumptions that traced back to how AI assistants were describing the product, not to anything on Fielder's own site.",
      "The team's early attempts to fix this were reactive and expensive: someone would spot a bad AI answer, guess at a content fix, publish it, and hope. There was no way to know which of dozens of possible gaps mattered most, and with a three-person team, guessing wrong cost a week they didn't have.",
    ],
    approach: [
      {
        title: "Rank the backlog instead of guessing",
        module: "Opportunity Finder",
        desc: "A deep scan surfaced every visibility gap — missing prompt coverage, weak citations, competitor-owned comparisons — and ranked them by projected score impact, letting a three-person team work the top ten instead of an undifferentiated list of 200.",
      },
      {
        title: "Test the fix before shipping it",
        module: "Answer Simulator",
        desc: "Before writing a single page, the team ran candidate positioning and FAQ copy through the Answer Simulator to see how ChatGPT and Gemini would answer real buyer questions using it — catching two fixes that would have made the mismatch worse.",
      },
      {
        title: "Watch brand accuracy in real time",
        module: "Brand Pulse",
        desc: "Brand Pulse alerts now flag any new AI answer that misstates pricing, packaging, or feature availability within 24 hours, so the team fixes drift before it reaches a prospect instead of learning about it from a confused support ticket.",
      },
    ],
    results: [
      "Fielder actioned 89 prioritized opportunities over two quarters, and tracked-prompt appearances across ChatGPT, Gemini, Claude, and Copilot rose 52% without adding a single headcount to the growth team. The Answer Simulator step alone prevented two planned content changes that would have reinforced the exact mismatch the team was trying to fix.",
      "Average time from \"gap identified\" to \"fix shipped and re-verified\" dropped 4.1x, largely because Opportunity Finder eliminated the discovery and prioritization work that used to eat most of a sprint. Brand Pulse now catches pricing and feature inaccuracies in AI answers before support tickets do.",
    ],
    pullQuote: {
      quote:
        "We don't have a team big enough to fight every fire. Opportunity Finder tells us which ten things actually move the score, and the Answer Simulator means we stop shipping fixes that sound right and test wrong.",
      name: "Jonah Okonkwo",
      role: "Head of Growth",
      company: "Fielder",
    },
  },
  {
    slug: "larkspur-group",
    company: "Larkspur Group",
    industry: "Marketing agency",
    logoInitials: "LG",
    gradient: "from-blue-500 to-indigo-500",
    persona: { name: "Priya Chandrasekaran", role: "Director of SEO" },
    headlineMetric: { value: "14", label: "client accounts run on one shared AI visibility workflow" },
    secondaryMetrics: [
      { value: "9.2", label: "avg. visibility score improvement per client, first quarter" },
      { value: "3 hrs", label: "to produce a board-ready client report, down from 2 days" },
      { value: "100%", label: "of clients now have a standing GEO scorecard" },
    ],
    excerpt:
      "Larkspur Group turned AI visibility from a one-off audit product into a recurring service across 14 client accounts, using Reports and Team & roles to run it at agency scale.",
    challenge: [
      "Larkspur Group's SEO team had been fielding the same client question for over a year: \"why does our competitor show up when I ask ChatGPT, and we don't?\" Priya Chandrasekaran, Director of SEO, would answer it the only way she could — a one-time manual audit, billed as a project, delivered as a slide deck that was stale within a month. Clients loved the insight and hated that it wasn't a living number.",
      "Turning that into a recurring service meant solving an agency-specific problem: running consistent measurement across 14 client accounts with different competitors, different prompt sets, and different stakeholders who each needed their own report — without 14x-ing the analyst hours a one-off audit already required.",
    ],
    approach: [
      {
        title: "Stand up one workspace per client",
        module: "Team & roles",
        desc: "Each client account got its own workspace with scoped access: client stakeholders see their scorecard and reports, Larkspur analysts see the full Command Center and Competitor Watch data across every account they manage.",
      },
      {
        title: "Run the same scan discipline everywhere",
        module: "Visibility Radar & Competitor Watch",
        desc: "A standard weekly scan cadence and a shared prompt-panel template meant every account produced comparable visibility scores and share-of-voice data from week one, instead of each analyst building bespoke tracking from scratch.",
      },
      {
        title: "Replace the slide deck with a live export",
        module: "Reports",
        desc: "Board-ready Reports pull directly from each account's live scan data — visibility trend, top citation gaps, competitor movement — so a client update that used to take two days of deck-building now takes three hours of review.",
      },
    ],
    results: [
      "Larkspur now runs AI visibility as a standing retainer line across all 14 client accounts, not a one-time audit. Clients averaged a 9.2-point visibility score improvement in their first quarter on the platform, with the fastest movers concentrated among clients who also adopted the GEO Optimizer's page-level fixes.",
      "Producing a client-ready report dropped from roughly two days of analyst time to about three hours, because Reports assembles directly from live scan data instead of a manually rebuilt deck. Every one of Larkspur's 14 accounts now carries a standing GEO scorecard the client can check between meetings — no report request needed.",
    ],
    pullQuote: {
      quote:
        "Clients used to ask for an audit once a year. Now they open their own scorecard between our calls. That single shift turned a project into a retainer.",
      name: "Priya Chandrasekaran",
      role: "Director of SEO",
      company: "Larkspur Group",
    },
  },
  {
    slug: "meridian-health",
    company: "Meridian Health",
    industry: "Healthcare",
    logoInitials: "MH",
    gradient: "from-emerald-500 to-teal-500",
    persona: { name: "Grace Whitfield", role: "Director of Digital" },
    headlineMetric: { value: "97%", label: "of AI-cited health claims verified as accurate, up from an unmeasured baseline" },
    secondaryMetrics: [
      { value: "31", label: "inaccurate AI answers flagged and corrected" },
      { value: "+24 pts", label: "visibility score gain on Perplexity and Copilot" },
      { value: "18", label: "compliance-reviewed pages shipped via Publishing Center" },
    ],
    excerpt:
      "Meridian Health used Brand Pulse and Knowledge Vault to catch AI answers misstating clinical information about its services, turning an unmeasured compliance risk into a monitored, correctable one.",
    challenge: [
      "For a healthcare provider, an AI assistant getting a fact wrong isn't a brand annoyance, it's a compliance and patient-trust risk. Grace Whitfield, Director of Digital at Meridian Health, had no visibility into what ChatGPT, Perplexity, or Copilot were telling patients who asked about Meridian's services, insurance coverage, or care protocols — and no way to know when an answer was simply outdated or actively wrong.",
      "The stakes made a wait-and-see approach unacceptable, but Meridian's legal and compliance team also couldn't approve content changes on a hunch. Grace needed evidence: which specific AI answers were inaccurate, what they should say instead, and an audit trail showing the fix was reviewed before it shipped.",
    ],
    approach: [
      {
        title: "Monitor for accuracy, not just presence",
        module: "Brand Pulse",
        desc: "Brand Pulse was configured around accuracy flags rather than visibility alone — surfacing any AI answer describing Meridian's services, coverage, or protocols in terms that conflicted with Meridian's published, compliance-approved source material.",
      },
      {
        title: "Give the engines a single source of truth",
        module: "Knowledge Vault",
        desc: "Knowledge Vault crawled and structured Meridian's approved clinical and service pages into a clean knowledge base, closing the gap between what compliance had approved and what was actually easy for an AI engine to find and cite.",
      },
      {
        title: "Route every fix through review before it ships",
        module: "Publishing Center",
        desc: "Corrected pages moved through Publishing Center with a compliance sign-off step built into the workflow, so every one of the 18 shipped pages had a documented review trail before it went live and was re-crawled.",
      },
    ],
    results: [
      "Brand Pulse surfaced and helped correct 31 AI answers that had been misstating clinical or coverage information, several of which predated Meridian's visibility program entirely and had been circulating unchecked. Verified-accurate citations of Meridian in tracked health-related prompts rose to 97%.",
      "Visibility on Perplexity and Copilot, the two platforms Meridian's patients used most for care-related questions, gained 24 points as Knowledge Vault gave engines a clearer, more citable source than the scattered PDFs and legacy pages they'd been pulling from. All 18 corrected pages carry a compliance review trail through Publishing Center, giving Grace's team the audit history their legal partners required.",
    ],
    pullQuote: {
      quote:
        "This isn't about ranking higher. It's about a patient asking an AI assistant a question about their care and getting an answer that's actually true. Brand Pulse is the first tool that let us prove that, not just hope for it.",
      name: "Grace Whitfield",
      role: "Director of Digital",
      company: "Meridian Health",
    },
  },
]

export function getStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((s) => s.slug === slug)
}

export function getOtherStudies(slug: string): CaseStudy[] {
  return caseStudies.filter((s) => s.slug !== slug)
}
