import type { Metadata } from "next"
import { Content } from "./content"

export const metadata: Metadata = {
  title: "Features | Citationly",
  description:
    "Explore the Citationly platform: AI visibility dashboards, citation tracking, brand monitoring, share of voice, competitor intelligence, and GEO/AEO optimization across ChatGPT, Gemini, Claude, Perplexity, Copilot, and Grok.",
}

export default function FeaturesPage() {
  return <Content />
}
