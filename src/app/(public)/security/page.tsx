import type { Metadata } from "next"
import { Content } from "./content"

export const metadata: Metadata = {
  title: "Security at Citationly | How We Protect Your Data",
  description:
    "How Citationly secures the data behind your AI brand monitoring: infrastructure, encryption, access controls, and our approach to responsible AI.",
}

export default function SecurityPage() {
  return <Content />
}
