import type { Metadata } from "next"
import { Content } from "./content"

export const metadata: Metadata = {
  title: "Citationly Documentation: AI Search Platform Guide | Citationly",
  description:
    "Official Citationly documentation. Get started, configure your workspace, run reports, and manage settings for AI visibility monitoring across six engines.",
}

export default function DocsPage() {
  return <Content />
}
