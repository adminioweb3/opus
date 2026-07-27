import type { Metadata } from "next"
import { Content } from "./content"

export const metadata: Metadata = {
  title: "AI Search Academy: Learn GEO & AEO Step by Step | Citationly",
  description:
    "Free structured courses on AI search optimization. Learn Generative Engine Optimization, Answer Engine Optimization, and AI visibility from beginner to advanced.",
}

export default function AcademyPage() {
  return <Content />
}
