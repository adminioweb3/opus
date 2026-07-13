import type { Metadata } from "next"
import { Content } from "./content"

export const metadata: Metadata = {
  title: "System Status | Citationly",
  description:
    "Live status and uptime for Citationly's web application, public API, scan pipeline, AI analysis engine, and notifications — plus a history of past incidents.",
}

export default function StatusPage() {
  return <Content />
}
