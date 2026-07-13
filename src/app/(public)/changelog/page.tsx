import type { Metadata } from "next"
import { Content } from "./content"

export const metadata: Metadata = {
  title: "Changelog & Roadmap | Citationly",
  description:
    "Every improvement to Citationly's AI visibility platform, in the open — recent releases across Visibility Radar, Citation Intelligence, Brand Pulse, and Opportunity Finder, plus what's coming next.",
}

export default function ChangelogPage() {
  return <Content />
}
