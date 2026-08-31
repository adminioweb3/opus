"use client"

import Link from "next/link"
import { ArrowRight, FolderKanban } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function ProjectsPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl items-center px-6">
      <Card className="w-full">
        <CardContent className="p-8 text-center">
          <FolderKanban className="mx-auto mb-4 h-9 w-9 text-muted-foreground" />
          <h1 className="text-xl font-semibold">Projects are not available yet</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Project planning will appear here once it is backed by an organization-scoped service. No example projects are shown as customer work.
          </p>
          <Link href="/dashboard/command-center" className="mt-6 inline-flex h-9 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground">
            Open command center <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
