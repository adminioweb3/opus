import type { Metadata } from "next"
import Content from "./content"

export const metadata: Metadata = {
  title: "Pricing | Citationly",
  description:
    "Simple plans for AI visibility intelligence. Starter $99/mo, Professional $299/mo, Enterprise $999/mo — every plan starts with a 7-day free trial, no credit card required.",
}

export default function PricingPage() {
  return <Content />
}
