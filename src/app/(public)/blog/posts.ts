// Blog data source for /blog and /blog/[slug].
// All dates are fixed literals — never derived from Date at render time.

export type BlogCategory = "GEO Strategy" | "AI Search" | "Product" | "Research"

export interface BlogSection {
  heading: string
  paragraphs: string[]
}

export interface BlogAuthor {
  name: string
  role: string
}

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  category: BlogCategory
  /** ISO date literal, e.g. "2026-06-18" */
  date: string
  readTime: string
  author: BlogAuthor
  body: BlogSection[]
}

export const blogCategories: BlogCategory[] = ["GEO Strategy", "AI Search", "Product", "Research"]

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
]

/** Deterministic date formatting — pure string math, no Date object, no locale drift. */
export function formatPostDate(iso: string): string {
  const [y, m, d] = iso.split("-")
  return `${MONTHS[Number(m) - 1]} ${Number(d)}, ${y}`
}

export function authorInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
}

export const posts: BlogPost[] = [
  {
    slug: "announcing-weekly-visibility-scans",
    title: "Announcing weekly visibility scans across all six major AI platforms",
    excerpt:
      "Visibility Radar now runs a full platform-by-platform scan of your brand every week — ChatGPT, Gemini, Claude, Perplexity, Copilot, and Grok — and turns the results into one score you can put in front of your executive team.",
    category: "Product",
    date: "2026-07-02",
    readTime: "5 min read",
    author: { name: "Daniel Okafor", role: "Product Lead" },
    body: [
      {
        heading: "Visibility is now a weekly number",
        paragraphs: [
          "Until now, most teams measured their AI visibility the way people measure the weather by looking out the window: someone on the marketing team asked ChatGPT a question, screenshotted the answer, and dropped it in Slack. It was anecdotal, unrepeatable, and impossible to trend. Starting today, Visibility Radar runs a structured scan of every tracked prompt across ChatGPT, Gemini, Claude, Perplexity, Copilot, and Grok — automatically, every week, for every workspace.",
          "Each scan produces a platform-by-platform visibility score, a blended overall score, and a week-over-week delta. The result is the first thing you see in the Command Center on Monday morning: not a feeling about how AI talks about your brand, but a number — and a direction.",
        ],
      },
      {
        heading: "What's in a scan",
        paragraphs: [
          "A weekly scan replays your entire tracked prompt set — the buyer questions, comparison queries, and category prompts you monitor — against all six platforms under consistent conditions. For every response we record whether your brand appeared, how it was framed, where it ranked among recommendations, and which sources the engine cited to support the answer.",
          "Those raw observations roll up into three layers. The platform score tells you how visible you are on, say, Perplexity specifically. The prompt-level detail tells you which questions you are winning and which you are absent from. And the citation log feeds Citation Intelligence, so you can see whether the sources behind each answer are yours, a competitor's, or a third party you have never heard of.",
        ],
      },
      {
        heading: "How scoring works",
        paragraphs: [
          "Visibility scores range from 0 to 100 and weight three things: presence (did you appear at all), prominence (were you the first recommendation or a footnote), and sentiment-adjusted framing (were you described accurately and favorably). A brand that appears in 60% of tracked prompts as the lead recommendation will outscore one that appears in 80% of prompts as an afterthought.",
          "Because generative engines are probabilistic, single answers are noisy. Weekly scans smooth that noise: each score is computed across the full prompt panel, and the trend line matters more than any individual week. We surface a confidence band alongside each score so you know when a movement is real and when it is within normal model variance.",
        ],
      },
      {
        heading: "What early customers are seeing",
        paragraphs: [
          "Teams in the early-access program have been running weekly scans since April. The pattern we heard repeatedly: the first scan is uncomfortable, and the fourth one is addictive. One VP of Marketing told us the scan replaced a quarterly agency report that cost more than their entire Citationly subscription — and updated fifty-two times more often.",
          "The most common workflow so far pairs the weekly scan with Opportunity Finder: the scan identifies where visibility dropped or never existed, and Opportunity Finder ranks which gaps are worth closing first based on prompt volume and competitive difficulty. From there, GEO Optimizer turns each gap into a concrete page-level fix.",
        ],
      },
      {
        heading: "Rolling out to every plan",
        paragraphs: [
          "Weekly visibility scans are live today for all plans — Starter, Professional, and Enterprise — at no additional cost. Starter workspaces scan their core prompt set weekly; Professional and Enterprise add deeper prompt panels, more competitor slots in Competitor Watch, and scan history exports through Reports.",
          "If you are not yet tracking your AI visibility, every plan starts with a real 7-day free trial, no credit card required. Your first scan runs within minutes of connecting your domain, and your first weekly delta arrives seven days later. That second data point is where the story starts.",
        ],
      },
    ],
  },
  {
    slug: "closing-competitor-citation-gaps",
    title: "Competitor citation gaps: finding the sources AI trusts instead of you",
    excerpt:
      "When an AI engine recommends your competitor, it is usually leaning on a handful of specific sources. Here is how to identify them, understand why they win, and systematically take that ground back.",
    category: "GEO Strategy",
    date: "2026-06-18",
    readTime: "7 min read",
    author: { name: "James Whitfield", role: "Founding Engineer" },
    body: [
      {
        heading: "The sources beating you aren't who you think",
        paragraphs: [
          "Ask a marketing team why ChatGPT recommends their competitor and most will guess it is the competitor's website. Look at the actual citation data and a different picture emerges: in the scans we run, roughly two thirds of the citations behind competitive recommendations point to third-party sources — review aggregators, comparison articles, industry publications, community threads — not to the competitor's own domain.",
          "That distinction changes the entire playbook. You are not losing to a rival homepage. You are losing to a G2 category page that lists them first, a three-year-old comparison post that never mentions you, and a Reddit thread where their users showed up and yours did not. Each of those is a citation gap, and each one is addressable.",
        ],
      },
      {
        heading: "What a citation gap is",
        paragraphs: [
          "A citation gap is a specific source that AI engines repeatedly cite when answering a prompt you care about — where that source either omits your brand or represents it poorly. It is the generative-engine equivalent of a keyword gap, but it is more concentrated: for many commercial prompts, three to five sources account for the majority of citations across platforms.",
          "Concentration is good news. Closing a keyword gap means outranking a page; closing a citation gap often means getting accurately included in a source that already wins. Getting listed in one heavily-cited comparison article can move your visibility on a prompt more than months of publishing new content on your own domain.",
        ],
      },
      {
        heading: "Anatomy of a gap analysis",
        paragraphs: [
          "In Citationly, the analysis runs across two modules. Citation Intelligence logs every source cited in every scanned answer and aggregates them by prompt, platform, and domain. Competitor Watch overlays share of voice, so you can filter to the prompts where a specific competitor outperforms you and see exactly which citations carried their recommendation.",
          "The output is a ranked list of gap sources, each scored by citation frequency, prompt commercial value, and your current status on that source: absent, present-but-buried, or misrepresented. That last category matters — being described inaccurately in a heavily-cited source is often worse than being absent, because the engine repeats the error with confidence.",
        ],
      },
      {
        heading: "Three patterns that account for most gaps",
        paragraphs: [
          "First, review and comparison aggregators. Engines love them because they are structured, comparative, and regularly updated. If your category page on the major aggregators is thin, unclaimed, or has stale review velocity, you will bleed citations to competitors with maintained profiles.",
          "Second, third-party comparison content — the '<Competitor> vs alternatives' articles. If the only detailed comparisons in your category were written by competitors or their affiliates, engines synthesize from a hostile corpus. Third, community discussion: Reddit, Stack Overflow, and niche forums are cited far more than most teams expect, especially by Perplexity and Grok. Absence there reads to an engine as absence from the conversation.",
        ],
      },
      {
        heading: "Closing the gap",
        paragraphs: [
          "Work the list in order of leverage. For aggregators: claim, complete, and maintain your profiles, and build a durable review pipeline. For comparison content: publish honest, genuinely useful comparisons on your own domain — engines do cite vendor comparisons when they are substantive — and pursue inclusion in the independent ones that already win citations. For community gaps: participate credibly where your buyers already ask questions, and make sure your documentation answers the questions those threads raise.",
          "Then verify. Re-run the affected prompts through the Answer Simulator after each intervention and watch the citation mix in your weekly scans. Gap closure shows up in the data within weeks: the source appears in your citation column, your share of voice on the prompt ticks up, and the recommendation language starts to include you. That feedback loop — gap, intervention, measured result — is what turns citation analysis from a report into a system.",
        ],
      },
    ],
  },
  {
    slug: "prompt-coverage-analysis-guide",
    title: "Prompt coverage analysis: mapping the buyer questions you're absent from",
    excerpt:
      "Your buyers ask AI engines hundreds of distinct questions on the way to a shortlist. Prompt coverage analysis tells you what fraction of those questions your brand actually shows up in — and where to aim next.",
    category: "Research",
    date: "2026-06-11",
    readTime: "8 min read",
    author: { name: "Sofia Reyes", role: "Content Strategy Lead" },
    body: [
      {
        heading: "You can't optimize prompts you've never seen",
        paragraphs: [
          "Keyword research gave marketing a shared map for twenty years: a finite list of queries with volumes attached. Generative engines dissolved that map. Buyers now ask long, conversational, compound questions — 'what should a 40-person B2B SaaS company use to monitor brand mentions in AI answers, and what does it cost?' — and no keyword tool will ever show you that string.",
          "But the underlying intents are not infinite. Across a category, buyer prompts cluster into a few hundred recurring shapes. Prompt coverage analysis is the discipline of enumerating those shapes, testing them against real engines, and measuring what percentage your brand appears in. The metric that falls out — prompt coverage — is the generative-era successor to 'ranking keywords.'",
        ],
      },
      {
        heading: "What prompt coverage actually measures",
        paragraphs: [
          "Coverage is the share of a defined prompt universe where your brand appears in the answer, weighted by how it appears. We score each prompt-platform pair on a simple ladder: absent, mentioned, recommended, recommended-first. A brand can have high mention coverage and terrible recommendation coverage — engines know you exist but never suggest you — and those are very different problems with very different fixes.",
          "Coverage is also platform-specific. It is common to see a brand cover 70% of prompts on Perplexity, which retrieves live sources, while covering 30% on Gemini, which leans harder on structured entity data. A single blended number hides that; a coverage matrix — prompts down the side, platforms across the top — exposes it immediately.",
        ],
      },
      {
        heading: "Building the prompt universe",
        paragraphs: [
          "Structure the universe around the buyer journey, not around your product's vocabulary. We use five stages. Category prompts ('best AI visibility platforms'). Problem prompts ('how do I find out what ChatGPT says about my company'). Comparison prompts ('Citationly vs doing this manually'). Alternative prompts ('alternatives to <incumbent>'). And validation prompts — pricing, security, integration questions asked just before purchase.",
          "Seed each stage from real inputs: sales call transcripts, support tickets, community threads, and the People-Also-Ask fossil record. Then expand with phrasing variants, because engines are sensitive to wording in ways rankings never were. In Citationly, the GEO Optimizer's prompt coverage module handles the expansion and dedupes intents automatically; done by hand, a rigorous universe for one product line is typically 150 to 400 prompts.",
        ],
      },
      {
        heading: "Reading a coverage map",
        paragraphs: [
          "The first read is almost always the same: strong coverage on branded and comparison prompts, a cliff on problem and category prompts. That cliff is the expensive part — problem-stage prompts are where buyers who have never heard of you get their shortlist formed. If you are absent there, you are not losing deals; you are never entering them.",
          "Look next at within-stage variance. If you cover 'best GEO tools' but not 'best AI visibility platforms for enterprise,' the gap is usually a missing page, a missing proof point, or a citation gap on a source the engine trusts for the enterprise angle. Each empty cell in the matrix is a hypothesis about missing evidence, and the citation log for that cell tells you which evidence the engine used instead.",
        ],
      },
      {
        heading: "Acting on gaps, in order",
        paragraphs: [
          "Rank gaps by commercial weight, not alphabetically. A covered prompt that drives shortlists is worth defending; an uncovered prompt with real buying intent is worth a campaign; an uncovered prompt nobody commercially relevant asks is worth ignoring. Opportunity Finder does this triage by combining coverage data with prompt intent and competitive density, but the principle holds with a spreadsheet.",
          "Then treat every intervention as an experiment. Ship the page, fix the aggregator profile, or restructure the answer — and re-test the exact prompt cell you targeted the following week. Coverage moves slower than rankings did, but it moves visibly, and a coverage matrix that fills in month over month is the clearest picture of GEO progress a team can put in front of leadership.",
        ],
      },
    ],
  },
  {
    slug: "brand-accuracy-in-ai-answers",
    title: "Your brand is being paraphrased: why accuracy in AI answers matters more than mentions",
    excerpt:
      "AI engines don't quote your positioning — they reconstruct it from whatever they retrieved. When the reconstruction is wrong about pricing, features, or who you serve, every mention works against you.",
    category: "AI Search",
    date: "2026-06-03",
    readTime: "6 min read",
    author: { name: "Daniel Okafor", role: "Product Lead" },
    body: [
      {
        heading: "The paraphrase problem",
        paragraphs: [
          "Classic search sent buyers to your website, where you controlled every word. Generative engines answer on your behalf. They compress your product into two sentences, state your pricing from memory, and summarize your ideal customer — all without you in the room. Most of the time the paraphrase is broadly right. When it is wrong, it is wrong at the exact moment a buyer is forming a shortlist.",
          "In the brand scans we run, inaccuracies are not rare edge cases. We routinely flag answers that quote pricing from two plans ago, describe features that were deprecated, attach brands to categories they exited, or confidently state a compliance posture the company never claimed. Each of those errors is delivered in the engine's authoritative voice, which makes it more persuasive than any competitor's ad could ever be.",
        ],
      },
      {
        heading: "Where inaccuracies come from",
        paragraphs: [
          "Three sources dominate. First, stale corpus: model training data lags reality, so anything that changed recently — pricing, packaging, product names — is at risk of being answered from an old snapshot. Second, third-party drift: engines lean on aggregators and articles, and if those describe you incorrectly, the engine inherits the error with none of the original's caveats.",
          "Third, plausible interpolation. When retrieval comes back thin, models fill gaps with what is statistically likely for a company shaped like yours. That is how a mid-market platform gets described with an enterprise price tag, or a security tool gets credited with certifications its competitors hold. Nothing 'lied' — the model just completed a pattern, and the pattern was not you.",
        ],
      },
      {
        heading: "The cost of a wrong answer",
        paragraphs: [
          "Wrong pricing suppresses demand invisibly: a buyer told you cost $999 a month when your Starter plan is $99 simply never clicks through, and no analytics event records why. Wrong capability claims do the opposite damage — they create demos that open with a feature you do not have. And wrong audience framing ('built for enterprises') filters out exactly the buyers you built the product for.",
          "The compounding effect is the dangerous part. Engines corroborate against prior answers and against content that quoted prior answers. An error that stands uncorrected gets restated, scraped, and re-cited until it hardens into consensus. Accuracy problems age like debt, which is why detection speed matters more than most teams assume.",
        ],
      },
      {
        heading: "Monitoring for accuracy, not just presence",
        paragraphs: [
          "Most AI-visibility measurement stops at 'were we mentioned.' Accuracy monitoring asks the second question: 'was what they said true?' In Citationly, Brand Pulse compares every scanned answer against your canonical brand facts — pricing, plans, features, integrations, positioning — and raises an accuracy flag when an answer contradicts them, with the offending platform, prompt, and cited sources attached.",
          "The flags are triaged by severity. A wrong founding year is cosmetic; wrong pricing on a high-intent comparison prompt is a revenue incident. Alert routing reflects that: cosmetic drift lands in a weekly digest, while material misstatements on commercial prompts notify the team immediately.",
        ],
      },
      {
        heading: "Correcting the record",
        paragraphs: [
          "Corrections work through sources, because engines believe sources. Fix the canonical facts on your own domain first — a clearly structured, dated pricing page is the single highest-leverage accuracy asset you can ship. Then chase the cited third parties: the citation log tells you exactly which stale article or unclaimed profile the engine leaned on, which turns 'fix the internet' into a short, ordered task list.",
          "Then verify on a cadence. Re-run the affected prompts, watch the flag clear platform by platform, and keep the fact base in Knowledge Vault current so the next product change propagates before the engines notice on their own. Presence gets you into the answer; accuracy decides whether the answer sells for you or against you.",
        ],
      },
    ],
  },
  {
    slug: "aeo-content-structuring-checklist",
    title: "The AEO structuring checklist: 12 fixes that make your pages quotable",
    excerpt:
      "Answer engines extract, compress, and cite. Pages structured for extraction win citations; pages structured for scrolling get skipped. Twelve concrete fixes, ordered by effort-to-impact.",
    category: "GEO Strategy",
    date: "2026-05-21",
    readTime: "10 min read",
    author: { name: "Sofia Reyes", role: "Content Strategy Lead" },
    body: [
      {
        heading: "Answer engines reward structure, not length",
        paragraphs: [
          "When a generative engine builds an answer, it does not read your page the way a person does. It retrieves candidate passages, scores them for relevance and self-sufficiency, and synthesizes from the winners. A 3,000-word page with no extractable passages loses to a 900-word page with six of them. Answer Engine Optimization, at the page level, is mostly the craft of making passages that survive extraction.",
          "The checklist below is the one our Page Auditor encodes. Every item is mechanical — no 'write great content' platitudes — and each one maps to a measurable behavior we see in citation data across ChatGPT, Gemini, Claude, Perplexity, Copilot, and Grok.",
        ],
      },
      {
        heading: "Fixes 1–6: passage architecture",
        paragraphs: [
          "One: phrase key headings as the questions buyers actually ask, in natural language, and answer them immediately below. Two: lead every section with the answer — a direct, standalone two-to-three sentence response — then elaborate. Engines quote openings far more than conclusions. Three: make each passage self-contained. A paragraph that begins 'It also does this' is unquotable because 'it' has no referent outside your page; name the subject.",
          "Four: state facts with numbers and dates. 'Starts at $99/month, updated June 2026' outperforms 'affordable and flexible' in every extraction scenario we test. Five: use genuine lists and tables for anything comparative or procedural — engines lift structured elements nearly verbatim. Six: keep one idea per paragraph, with paragraphs under roughly 80 words. Extraction happens at passage granularity, and bloated paragraphs bury the quotable sentence.",
        ],
      },
      {
        heading: "Fixes 7–12: evidence and machine context",
        paragraphs: [
          "Seven: add visible dateline and update stamps. Freshness signals influence retrieval, and engines increasingly say so in their citations. Eight: implement structured data honestly — Organization, Product, FAQPage, and Article schema give engines a machine-readable skeleton to corroborate the prose against. Nine: define your entities. Name your company, product, and category in full at least once in plain text; pronouns and internal shorthand break entity linking.",
          "Ten: attribute claims. 'Based on 4,000 weekly scans' is citable; unsourced superlatives are noise engines learn to skip. Eleven: answer the adjacent questions — pricing pages that also answer 'is there a free trial' and 'can I cancel' capture compound prompts that pure pricing tables miss. Twelve: kill contradiction debt. If your homepage says one price and a forgotten landing page says another, engines resolve the conflict unpredictably, and sometimes against you.",
        ],
      },
      {
        heading: "Prioritizing across a real site",
        paragraphs: [
          "Do not restructure the whole site alphabetically. Start with the pages behind your highest-value prompt gaps: comparison pages, pricing, the top three problem-stage articles. These carry disproportionate citation weight because they match commercial prompts directly. A week of focused work there typically moves visibility more than a quarter of diffuse edits.",
          "This is the triage the GEO Optimizer automates — it cross-references your prompt coverage gaps with page-level audit scores and outputs a ranked fix list — but the logic is reproducible by hand: highest prompt value, weakest passage structure, first.",
        ],
      },
      {
        heading: "Verifying that it worked",
        paragraphs: [
          "Structure changes are testable within days. Run the target prompts through the Answer Simulator before you ship, ship the fixes, then re-run after recrawl and compare: does the engine now quote your rewritten passage, cite the page, move you up the recommendation order? Your weekly Visibility Radar scan then confirms the change holds across the full platform panel rather than in a single lucky sample.",
          "Treat the checklist as a loop, not a project. Every new page ships against it, every pricing or packaging change triggers a re-audit of affected pages, and the citation data tells you which fixes are paying. Structure is the rare GEO lever that is entirely under your control — which is exactly why it is the first one to pull.",
        ],
      },
    ],
  },
  {
    slug: "measuring-ai-share-of-voice",
    title: "Measuring AI share of voice: a framework that survives model updates",
    excerpt:
      "Share of voice in AI answers is measurable, comparable, and trendable — if you define it carefully. A framework for building a metric your executive team can rely on quarter after quarter.",
    category: "Research",
    date: "2026-05-12",
    readTime: "7 min read",
    author: { name: "Maya Lindqvist", role: "Head of Research" },
    body: [
      {
        heading: "Why the old dashboards can't see this",
        paragraphs: [
          "Every established marketing metric assumes a observable surface: rankings you can crawl, impressions a platform reports, mentions a listener can index. Generative answers have none of that. There is no ranking to crawl — answers are composed per conversation. There is no impression report — the platforms do not tell you when your brand appeared. The surface is only observable by asking, systematically and repeatedly.",
          "That is why AI share of voice has to be built as a sampled metric, the way pollsters build approval ratings. You define a population of prompts, sample answers across platforms on a fixed cadence, and compute your share of the recommendations that come back. Done casually, this produces noise. Done with discipline, it produces a metric stable enough to trend, target, and tie to pipeline.",
        ],
      },
      {
        heading: "A working definition",
        paragraphs: [
          "We define AI share of voice as: of all brand recommendations returned across a fixed prompt panel and platform set in a period, the percentage that are yours. Weighted variants adjust for position — a first recommendation counts more than a fifth — and for prompt value, so a high-intent comparison prompt influences the score more than a broad category question.",
          "The definition's power is in what it excludes. It does not count raw mentions, because 'unlike <your brand>, X is affordable' is a mention working against you. It counts recommendations — moments where an engine put you on a buyer's shortlist. In Competitor Watch, that is the number sitting next to each competitor's logo, and it is the one that behaves most like market share.",
        ],
      },
      {
        heading: "The three design choices that make it durable",
        paragraphs: [
          "First, fix the prompt panel. Share of voice is only comparable over time if the denominator holds still. Version your panel like code: additions and removals happen deliberately, with a change log, never silently. Second, fix the platform set and weight it honestly — if your buyers live in ChatGPT and Perplexity, a Grok-driven bump should not mask a ChatGPT decline. Blended scores need visible per-platform breakdowns.",
          "Third, fix the cadence and sample repeatedly. Generative answers vary run to run; single samples are anecdotes. Weekly panels with multiple samples per prompt-platform pair — the way Visibility Radar runs its scans — smooth run-level variance into a trendable line, with a confidence band that tells you when a movement exceeds normal noise.",
        ],
      },
      {
        heading: "Surviving model updates",
        paragraphs: [
          "The hardest measurement problem in this space is that the instrument keeps changing. Platforms ship new model versions, retrieval changes, answer formats shift — and share-of-voice lines jump for reasons that have nothing to do with your marketing. The framework has to expect this rather than be embarrassed by it.",
          "Two practices help. Annotate the timeline: when a platform ships a known model update, mark it on the chart, and evaluate your trend within regimes rather than across them. And watch relative position, not just absolute score: if a model update drops everyone's citation rate but your share of the remaining recommendations holds, your competitive position is intact even though the raw line dipped. Share of voice is robust to instrument change precisely because it is a ratio; absolute visibility scores are not.",
        ],
      },
      {
        heading: "From measurement to movement",
        paragraphs: [
          "A durable metric earns a seat in the executive dashboard, and that is where this one belongs — next to pipeline and brand search volume, reported from the Command Center with the same cadence and confidence as any revenue metric. The teams doing this well set quarterly share-of-voice targets per platform, the way they once set ranking targets.",
          "The metric also earns its keep diagnostically. When share of voice moves, the underlying scan data says why: which prompts flipped, which citations changed, which competitor gained. That drill-down path — from the number your CMO watches to the specific source an engine started citing last Tuesday — is what separates a measurement program from a vanity chart.",
        ],
      },
    ],
  },
  {
    slug: "how-ai-engines-choose-citations",
    title: "How AI engines decide which sources to cite — and why it isn't your rankings",
    excerpt:
      "Citations are the currency of generative search, but the selection logic is nothing like the ranking algorithms SEO grew up on. What we've learned from analyzing citation behavior across six platforms.",
    category: "AI Search",
    date: "2026-04-28",
    readTime: "9 min read",
    author: { name: "James Whitfield", role: "Founding Engineer" },
    body: [
      {
        heading: "Rankings are not citations",
        paragraphs: [
          "The most common assumption we hear from new customers is that AI citations are downstream of Google rankings — win the SERP, win the citation. The data does not support it. In our cross-platform citation logs, pages ranking outside the top ten for a query are cited constantly, and top-three pages are skipped just as often. Correlation exists, because both systems respond to authority and relevance, but the selection mechanics are different enough that optimizing for one does not reliably move the other.",
          "The difference starts with what is being selected. A ranking algorithm orders whole pages for a whole query. A generative engine retrieves passages, evaluates whether each passage can support a specific claim it wants to make, and cites the sources whose passages it actually used. Citation is claim-level, not page-level — and that changes everything about what wins.",
        ],
      },
      {
        heading: "What retrieval actually looks like",
        paragraphs: [
          "When an engine with live retrieval — Perplexity, Copilot, ChatGPT with browsing, Gemini — handles a commercial prompt, it typically issues several internal searches, pulls a few dozen candidate documents, and chunks them into passages. Those passages are scored for semantic relevance to the sub-questions the engine has decomposed the prompt into: what is this product, what does it cost, who is it for, how does it compare.",
          "Synthesis then works from the highest-scoring passages, and citations attach to the passages that survived into the final answer. This is why a page can rank first and go uncited: if its content is diffuse — the answer spread across paragraphs, wrapped in narrative, dependent on context — no single passage scores well enough to be used, and the engine builds its answer from a humbler page that states things plainly.",
        ],
      },
      {
        heading: "The five traits of consistently cited sources",
        paragraphs: [
          "Across platforms, the sources that win citations share recognizable traits. Extractability: answers stated directly in self-contained passages. Specificity: numbers, dates, named entities — models preferentially cite sources that let them make precise claims. Freshness: visible update signals, disproportionately rewarded on volatile topics like pricing. Corroboration: claims consistent with the rest of the retrieved corpus — outlier claims get flagged or dropped, not cited. And format fit: lists and tables for comparative prompts, prose for conceptual ones.",
          "Notice what is missing from that list: domain authority as a monolith. Authority still gates retrieval — obscure domains get pulled less often — but among retrieved candidates, passage quality beats brand weight. This is the structural reason small, well-structured documentation sites outcite Fortune 500 marketing pages in category after category.",
        ],
      },
      {
        heading: "Platform differences that matter",
        paragraphs: [
          "The engines are not interchangeable. Perplexity cites aggressively and diversely — eight or more sources per answer is normal — which gives smaller sources a real path in. Copilot leans on Bing's index and rewards traditional web authority more than the others. Gemini draws noticeably on structured data and entity graphs, so schema quality moves it more. ChatGPT blends parametric memory with browsing, which means stale training-data 'knowledge' can override your fresh page unless the retrieval signal is strong. Claude and Grok have their own retrieval habits, with Grok weighting live social discussion unusually heavily.",
          "Practically, this means citation strategy is a portfolio. A structured-data investment pays most on Gemini; community presence pays most on Grok and Perplexity; freshness discipline defends you on ChatGPT. In Citation Intelligence we break citation share out per platform for exactly this reason — the blended number hides where the leverage is.",
        ],
      },
      {
        heading: "What to do with this",
        paragraphs: [
          "Treat every important claim about your product as something an engine needs to be able to lift cleanly: stated once, stated plainly, dated, corroborated across your site and the third-party sources engines already trust. Then measure at the claim level — which prompts cite you, which cite someone else, and what passage won.",
          "That last question is the most instructive one in this discipline. Pull the citations behind an answer you lost, read the winning passage, and you will usually see exactly why it won: it answered the question in one place, and you answered it in six. Fixing that is not mysterious. It is editing.",
        ],
      },
    ],
  },
  {
    slug: "what-is-generative-engine-optimization",
    title: "What is Generative Engine Optimization? A practical primer for 2026",
    excerpt:
      "GEO is the discipline of making your brand discoverable, understandable, and recommendable by AI engines. What it is, how it differs from SEO, and where a team should start.",
    category: "GEO Strategy",
    date: "2026-04-14",
    readTime: "8 min read",
    author: { name: "Maya Lindqvist", role: "Head of Research" },
    body: [
      {
        heading: "Search didn't die. It moved.",
        paragraphs: [
          "A growing share of buying research now happens inside AI assistants. Buyers ask ChatGPT to build vendor shortlists, ask Perplexity to compare pricing, ask Copilot inside the tools they already work in, and increasingly trust the answer enough to skip the ten blue links entirely. The behavior that made SEO a decades-long discipline — people asking questions before they buy — did not disappear. It moved to surfaces where there are no rankings, no impressions report, and no analytics pixel.",
          "Generative Engine Optimization is the discipline that follows the behavior. GEO is the practice of measuring and improving how AI engines — ChatGPT, Gemini, Claude, Perplexity, Copilot, Grok — discover your brand, understand what it does, recommend it to the right buyers, and cite your content as evidence. Adjacent terms overlap: AEO (answer engine optimization) emphasizes structuring content for answer extraction, and both live under the same roof in practice.",
        ],
      },
      {
        heading: "How GEO differs from SEO",
        paragraphs: [
          "SEO optimizes for a deterministic list; GEO optimizes for a synthesized answer. That single difference cascades. There is no position two in a paragraph — you are either in the answer or absent. Results are probabilistic: the same prompt can produce different answers an hour apart, so measurement requires repeated sampling rather than a single crawl. And the unit of competition changes: engines compose answers from passages and cite the sources they used, which means your real competitors on a given question include review sites, community threads, and comparison articles — not just rival vendors.",
          "There is also a second audience. SEO wrote for crawlers that indexed; GEO writes for models that read, compress, and restate. Your positioning will be paraphrased in the engine's voice, so clarity and consistency of your underlying facts — pricing, features, category, audience — matter in a way that keyword placement never did. Ambiguity in, hallucination out.",
        ],
      },
      {
        heading: "The four stages: discovery, understanding, recommendation, citation",
        paragraphs: [
          "We model GEO as a funnel with four stages. Discovery: do engines know you exist — do you appear at all in your category's answer space? Understanding: when engines describe you, are the facts right and the framing yours? Recommendation: do engines actually put you on shortlists for the prompts your buyers ask? Citation: do engines use your content as the evidence behind answers, which compounds authority over time?",
          "The funnel diagnoses where to work. A brand with discovery but weak understanding needs a facts-and-consistency program, not more content. A brand understood but rarely recommended usually has a competitive-evidence gap — engines lack proof you belong on the shortlist. A brand recommended but never cited is renting visibility from third-party sources that could churn. Each stage has its own metrics, and conflating them is the most common way GEO programs stall.",
        ],
      },
      {
        heading: "What a working GEO program looks like",
        paragraphs: [
          "Measurement comes first, because everything else is guesswork without it. A baseline scan across platforms — the job Visibility Radar does weekly — establishes where you stand on each funnel stage: your visibility score per platform, your share of voice against competitors, the accuracy of what engines say, and which sources they cite in your category.",
          "Then the improvement loop: identify the highest-value gaps (Opportunity Finder's job), fix the underlying causes — restructure pages for extraction, correct stale third-party sources, close citation gaps, publish content that answers uncovered prompts — and re-measure the following week. GEO progress is incremental and compounding; the teams that win treat it as an operating rhythm, not a one-time audit.",
        ],
      },
      {
        heading: "Where to start this quarter",
        paragraphs: [
          "Start embarrassingly small: pick the twenty prompts that most directly precede a purchase in your category and read what six engines actually say. Most teams find at least one wrong fact, one absent high-intent prompt, and one competitor winning on sources nobody was watching. Those three findings are a quarter's roadmap by themselves.",
          "Then instrument it. Manual spot-checks do not survive contact with a weekly executive meeting; a measured baseline with automatic re-scans does. Whether you build that instrumentation or use a platform like Citationly, the principle is the same one SEO learned twenty years ago: the brands that win the new search surface are the ones that started measuring it before their competitors believed it mattered.",
        ],
      },
    ],
  },
]

/** Posts sorted newest-first. */
export const sortedPosts: BlogPost[] = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1))

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug)
}

/** Up to 3 related posts: same category first, then most recent others. */
export function getRelatedPosts(slug: string): BlogPost[] {
  const current = getPostBySlug(slug)
  if (!current) return sortedPosts.slice(0, 3)
  const sameCategory = sortedPosts.filter((p) => p.slug !== slug && p.category === current.category)
  const others = sortedPosts.filter((p) => p.slug !== slug && p.category !== current.category)
  return [...sameCategory, ...others].slice(0, 3)
}
