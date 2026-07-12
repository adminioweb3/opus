import type { Metadata } from "next"
import { Content } from "./content"

export const metadata: Metadata = {
  title: "Blog | Citationly",
  description:
    "Insights on AI search and brand visibility — GEO strategy, AI search research, and product updates from the team measuring how AI engines discover, recommend, and cite brands.",
}

export default function BlogPage() {
  return <Content />
}
