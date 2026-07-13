import type { Metadata } from "next"
import { Content } from "./content"

export const metadata: Metadata = {
  title: "About | Citationly",
  description:
    "Citationly makes AI visibility measurable. Meet the team building the intelligence platform that tracks how ChatGPT, Gemini, Claude, Perplexity, Copilot, and Grok discover, recommend, and cite your brand.",
}

export default function AboutPage() {
  return <Content />
}
