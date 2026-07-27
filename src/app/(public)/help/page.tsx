import type { Metadata } from "next"
import { Content } from "./content"

export const metadata: Metadata = {
  title: "Citationly Help Center | Citationly",
  description:
    "The Citationly Help Center. Get started, manage your account, read dashboard and report guides, resolve billing questions, and troubleshoot common issues.",
}

export default function HelpCenterPage() {
  return <Content />
}
