import type { Metadata } from "next"
import { Content } from "./content"

export const metadata: Metadata = {
  title: "Privacy Policy | Citationly",
  description:
    "How Citationly collects, uses, protects, and retains personal information across the AI visibility platform, and the rights you have over your data.",
}

export default function PrivacyPage() {
  return <Content />
}
