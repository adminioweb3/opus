"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/lib/stores/auth-store"
import { PageLoader } from "@/components/ui/loader"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { user, isAuthenticated, isLoading } = useAuthStore()

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push("/login")
      } else if ((user as { role?: string })?.role !== "superadmin") {
        router.push("/dashboard")
      }
    }
  }, [isAuthenticated, isLoading, user, router])

  if (isLoading || !isAuthenticated || (user as { role?: string })?.role !== "superadmin") {
    return <PageLoader className="min-h-screen" label="Checking admin access..." />
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="p-8 max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  )
}
