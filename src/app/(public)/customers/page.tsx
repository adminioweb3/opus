import type { Metadata } from "next"
import { Content } from "./content"

export const metadata: Metadata = {
  title: "Customers | Citationly",
  description:
    "See how marketing, growth, and SEO teams at companies like Northwind Cloud, Fielder, and Larkspur Group use Citationly to measure, monitor, and win AI visibility.",
}

export default function CustomersPage() {
  return <Content />
}
