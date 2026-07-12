import type { Metadata } from "next"
import { Content } from "./content"

export const metadata: Metadata = {
  title: "Contact | Citationly",
  description:
    "Talk to Citationly about sales, support, or partnerships. Get a demo of the AI visibility platform that tracks how ChatGPT, Gemini, Claude, Perplexity, Copilot, and Grok discover, recommend, and cite your brand.",
}

export default function ContactPage() {
  return <Content />
}
