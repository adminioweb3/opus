import type { Metadata } from "next"
import { Content } from "./content"

export const metadata: Metadata = {
  title: "About Citationly | The Enterprise AI Visibility Platform",
  description:
    "Learn why Citationly exists, the mission behind our AI visibility platform, and how we help enterprises measure and improve their presence in AI search.",
}

export default function AboutPage() {
  return <Content />
}
