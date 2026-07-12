import type { Metadata } from "next"
import { Content } from "./content"

export const metadata: Metadata = {
  title: "Privacy Policy | Citationly",
  description:
    "How Citationly collects, uses, and protects your data — including AI processing, subprocessors, retention, and your privacy rights.",
}

export default function PrivacyPage() {
  return <Content />
}
