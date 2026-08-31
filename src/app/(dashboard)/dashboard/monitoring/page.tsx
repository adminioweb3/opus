"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Radio, ArrowRight } from "lucide-react"

export default function MonitoringPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl items-center px-6">
      <Card className="w-full">
        <CardContent className="p-8 text-center">
          <Radio className="mx-auto mb-4 h-9 w-9 text-muted-foreground" />
          <h1 className="text-xl font-semibold">Prompt monitoring is not available yet</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Citationly will show monitored prompt responses here once the live monitoring API is available. No sample prompt data is shown as customer data.
          </p>
          <Link href="/dashboard/prompt-intelligence" className="mt-6 inline-flex h-9 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground">
            Open prompt intelligence <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
