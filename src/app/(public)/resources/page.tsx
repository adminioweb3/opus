import type { Metadata } from "next"
import { Content } from "./content"

export const metadata: Metadata = {
  title: "Resources | Citationly",
  description:
    "Guides, documentation, an API, integrations, and a help center for building your AI visibility program with Citationly.",
}

export default function ResourcesPage() {
  return <Content />
}
