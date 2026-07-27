import type { Metadata } from "next"
import { Content } from "./content"

export const metadata: Metadata = {
  title: "AI Visibility for SaaS Companies | Citationly",
  description:
    "SaaS buyers ask AI engines to build their shortlists. Citationly shows whether your product makes the list, and how to earn the citations that put it there.",
}

export default function SaasSolutionPage() {
  return <Content />
}
