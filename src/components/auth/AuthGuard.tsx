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
    let cancelled = false

    // Listen to Firebase auth state to rehydrate the user object on reload
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      let isDemo = isAuthenticated && useAuthStore.getState().token === "demo-token"
      
      if (firebaseUser) {
        const token = await firebaseUser.getIdToken(true) // Force network refresh
        setAuthData(firebaseUser, token)
        isDemo = false
      } else if (isAuthenticated && !isDemo) {
        // If Firebase says no user but our store says authenticated (and not a demo user), the token likely expired
        logout()
      }
      
      // If we are authenticated (either via fresh Firebase token or valid demo token)
      if (useAuthStore.getState().isAuthenticated) {
        if (isDemo) {
          if (!cancelled) setOnboardingChecked(true)
        } else {
          try {
            const result = await syncUserToBackend()
            if (cancelled) return
            useOrganizationStore.getState().setSyncResult(result)
            if (result.needsOnboarding) {
              setOnboardingChecked(true)
              if (window.location.pathname !== "/onboarding") {
                router.replace("/onboarding")
              }
            } else {
              setOnboardingChecked(true)
            }
          } catch (err: any) {
            console.error("Onboarding status check failed:", err)
            if (!cancelled) {
              if (err?.response?.status === 401) {
                logout()
              } else {
                setOnboardingChecked(true)
              }
            }
          }
        }
      }

      if (!cancelled) setAuthChecked(true)
    })

    return () => {
      cancelled = true
      unsubscribe()
    }
  }, [router, isAuthenticated, setAuthData, logout])

  useEffect(() => {
    if (isHydrated && authChecked && !isAuthenticated) {
      router.replace("/login")
    }
  }, [isHydrated, authChecked, isAuthenticated, router])

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
