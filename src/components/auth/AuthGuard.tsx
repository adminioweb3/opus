"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/lib/stores/auth-store"
import { Skeleton } from "@/components/ui/skeleton"
import { auth } from "@/lib/firebase"
import { onAuthStateChanged } from "firebase/auth"

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, setAuthData, logout } = useAuthStore()
  const router = useRouter()
  const [isHydrated, setIsHydrated] = useState(false)
  const [authChecked, setAuthChecked] = useState(false)

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

  if (!isHydrated || !authChecked) {
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
