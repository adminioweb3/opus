import type { Metadata } from "next"
import { Content } from "./content"

export const metadata: Metadata = {
  title: "AI Search Analytics | Citationly",
  description:
    "Citationly converts AI engine answers into structured analytics: mentions, citations, sentiment, and trends your team can query, segment, and act on.",
}

export default function AiSearchAnalyticsPage() {
  return <Content />
}
