"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, RefreshCcw } from "lucide-react"

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error("Dashboard error:", error)
  }, [error])

  return (
    <div className="h-[80vh] flex items-center justify-center p-4">
      <Card className="max-w-md w-full text-center border-destructive/20 bg-destructive/5 shadow-none">
        <CardHeader>
          <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-6 h-6 text-destructive" />
          </div>
          <CardTitle className="text-2xl">Something went wrong!</CardTitle>
          <CardDescription>
            We encountered an unexpected error while loading this dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm bg-background/50 border border-border p-3 rounded-md text-left text-muted-foreground overflow-x-auto">
            {error.message || "An unknown error occurred."}
          </div>
          <div className="flex gap-3 justify-center">
            <Button onClick={() => window.location.href = "/dashboard" } variant="outline">
              Go Home
            </Button>
            <Button onClick={() => reset()} className="gap-2">
              <RefreshCcw className="w-4 h-4" /> Try again
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
