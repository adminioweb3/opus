import type { Metadata } from "next"
import { Content } from "./content"

export const metadata: Metadata = {
  title: "AI Search Reports | Citationly",
  description:
    "Turn AI search analytics into reports leadership reads: scheduled exports, executive summaries, and client-ready reporting across six AI engines.",
}

export default function ReportsPage() {
  return <Content />
}
