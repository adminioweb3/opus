import type { Metadata } from "next"
import { Content } from "./content"

export const metadata: Metadata = {
  title: "Case Studies | Citationly",
  description:
    "Real teams winning AI search with Citationly — how Northwind Cloud, Fielder, Larkspur Group, and Meridian Health measured and moved their visibility across ChatGPT, Gemini, Claude, Perplexity, Copilot, and Grok.",
}

export default function CaseStudiesPage() {
  return <Content />
}
