"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SearchX } from "lucide-react"

// Scoped to /dashboard/* so an unmatched sub-route renders inside the (dashboard) layout instead
// of bubbling past it to the root — that bubbling was unmounting AuthGuard entirely, which then
// remounted (and raced its Firebase listener into a false logout) the moment the user hit back.
export default function DashboardNotFound() {
  return (
    <div className="h-[80vh] flex items-center justify-center p-4">
      <Card className="max-w-md w-full text-center shadow-none">
        <CardHeader>
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
            <SearchX className="w-6 h-6 text-muted-foreground" />
          </div>
          <CardTitle className="text-2xl">Page not found</CardTitle>
          <CardDescription>
            That page doesn&apos;t exist or hasn&apos;t been built yet.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/dashboard/overview">
            <Button>Back to dashboard</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
