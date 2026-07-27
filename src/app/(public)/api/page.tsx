import type { Metadata } from "next"
import { Content } from "./content"

export const metadata: Metadata = {
  title: "Citationly AI Search API: Developer REST API Docs | Citationly",
  description:
    "Citationly AI Search API documentation. REST endpoints, authentication, request and response examples, rate limits, and error handling for AI visibility data.",
}

export default function ApiPage() {
  return <Content />
}
