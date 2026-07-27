import type { Metadata } from "next"
import { Content } from "./content"

export const metadata: Metadata = {
  title: "Share of Voice in AI Search | Citationly",
  description:
    "Measure your Share of Voice across ChatGPT, Gemini, Perplexity, and more. See what percentage of AI answers in your category mention your brand.",
}

export default function ShareOfVoicePage() {
  return <Content />
}
