import type { Metadata } from "next"
import { Content } from "./content"

export const metadata: Metadata = {
  title: "AI Visibility Dashboard | Citationly",
  description:
    "Measure your AI visibility across ChatGPT, Gemini, Perplexity, and more. One dashboard for mentions, citations, and Share of Voice. Start a free analysis.",
}

export default function AIVisibilityDashboardPage() {
  return <Content />
}
