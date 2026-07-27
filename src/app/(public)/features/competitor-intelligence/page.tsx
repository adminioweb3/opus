import type { Metadata } from "next"
import { Content } from "./content"

export const metadata: Metadata = {
  title: "Competitor Intelligence for AI Search | Citationly",
  description:
    "See which competitors win AI answers in your category. Track their citations, visibility, and positioning across six engines with Citationly.",
}

export default function CompetitorIntelligencePage() {
  return <Content />
}
