"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/lib/stores/auth-store"
import { useOrganizationStore } from "@/lib/stores/organizationStore"
import { syncUserToBackend } from "@/lib/api/authApi"
import { Skeleton } from "@/components/ui/skeleton"
import { auth } from "@/lib/firebase"
import { onAuthStateChanged } from "firebase/auth"

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, setAuthData, logout } = useAuthStore()
  const router = useRouter()
  const [isHydrated, setIsHydrated] = useState(false)
  const [authChecked, setAuthChecked] = useState(false)
  const [onboardingChecked, setOnboardingChecked] = useState(false)

  useEffect(() => {
    setIsHydrated(true)

    // Listen to Firebase auth state to rehydrate the user object on reload
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const token = await firebaseUser.getIdToken()
        setAuthData(firebaseUser, token)
      } else if (isAuthenticated && useAuthStore.getState().token !== "demo-token") {
        // If Firebase says no user but our store says authenticated (and not a demo user), the token likely expired
        logout()
      }
      setAuthChecked(true)
    })

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    if (isHydrated && authChecked && !isAuthenticated) {
      router.replace("/login")
    }
  }, [isHydrated, authChecked, isAuthenticated, router])

  // Re-checks onboarding status against the real backend on every dashboard load (not just at
  // login) — closes the gap where a user could reach /dashboard directly (bookmark, stale tab,
  // browser history) without ever completing onboarding, since a stale persisted "needsOnboarding:
  // false" from a previous session would otherwise never get corrected.
  useEffect(() => {
    if (!authChecked || !isAuthenticated) return
    if (useAuthStore.getState().token === "demo-token") {
      setOnboardingChecked(true)
      return
    }

    let cancelled = false
    syncUserToBackend()
      .then((result) => {
        if (cancelled) return
        useOrganizationStore.getState().setSyncResult(result)
        if (result.needsOnboarding) {
          router.replace("/onboarding")
        } else {
          setOnboardingChecked(true)
        }
      })
      .catch((err) => {
        console.error("Onboarding status check failed:", err)
        if (!cancelled) setOnboardingChecked(true)
      })

    return () => {
      cancelled = true
    }
  }, [authChecked, isAuthenticated, router])

  if (!isHydrated || !authChecked || (isAuthenticated && !onboardingChecked)) {
    return (
      <div className="flex-1 p-8 space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-72" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32 rounded-xl" />
          ))}
        </div>
        <Skeleton className="h-72 rounded-xl" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}
