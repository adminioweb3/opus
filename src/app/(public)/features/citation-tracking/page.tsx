import type { Metadata } from "next"
import { Content } from "./content"

export const metadata: Metadata = {
  title: "AI Citation Tracking | Citationly",
  description:
    "Track every citation AI engines give your content across ChatGPT, Gemini, Perplexity, and more. Turn citation intelligence into content strategy.",
}

export default function CitationTrackingPage() {
  return <Content />
}
