import type { Metadata } from "next"
import { Content } from "./content"

export const metadata: Metadata = {
  title: "Security | Citationly",
  description:
    "How Citationly protects your data: TLS 1.2+ and AES-256 encryption, Firebase-backed authentication, strict tenant isolation, least-privilege access, SOC 2-aligned controls, and GDPR-aligned data rights.",
}

export default function SecurityPage() {
  return <Content />
}
