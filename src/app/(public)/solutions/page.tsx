import type { Metadata } from "next"
import { Content } from "./content"

export const metadata: Metadata = {
  title: "Solutions | Citationly",
  description:
    "How marketing, SEO, agency, and SaaS teams use Citationly to measure and improve AI visibility across ChatGPT, Gemini, Claude, Perplexity, Copilot, and Grok.",
}

export default function SolutionsPage() {
  return <Content />
}
