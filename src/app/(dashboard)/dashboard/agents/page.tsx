"use client"

import Link from "next/link"
import { ArrowRight, Bot } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function AgentsPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl items-center px-6">
      <Card className="w-full">
        <CardContent className="p-8 text-center">
          <Bot className="mx-auto mb-4 h-9 w-9 text-muted-foreground" />
          <h1 className="text-xl font-semibold">Agents are not available yet</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Agent activity will appear here when the managed-agent service is connected. Citationly does not show sample runs as customer data.
          </p>
          <Link href="/dashboard/prompt-intelligence" className="mt-6 inline-flex h-9 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground">
            Open prompt intelligence <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
