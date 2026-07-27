import type { Metadata } from "next"
import { Content } from "./content"

export const metadata: Metadata = {
  title: "AI Brand Monitoring | Citationly",
  description:
    "Monitor how ChatGPT, Gemini, Perplexity, and other AI engines describe your brand. Catch inaccuracies early and protect your reputation in AI search.",
}

export default function BrandMonitoringPage() {
  return <Content />
}
