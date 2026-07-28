"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuthStore } from "@/lib/stores/auth-store"
import { useOrganizationStore } from "@/lib/stores/organizationStore"
import { SocialLoginButtons } from "@/components/auth/SocialLoginButtons"
import { Divider } from "@/components/auth/Divider"
import { PasswordInput } from "@/components/auth/PasswordInput"
import { Loader2 } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { login, loginWithGoogle, loginWithGithub, isLoading, error, clearError, isAuthenticated } = useAuthStore()
  const { needsOnboarding } = useOrganizationStore()
  const router = useRouter()

  // Watch for successful auth and redirect
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      const { needsOnboarding: orgNeedsOnboarding } = useOrganizationStore.getState()
      router.push(orgNeedsOnboarding ? "/onboarding" : "/dashboard")
    }
  }, [isAuthenticated, isLoading, router])

  // Read fresh from the store rather than a destructured value — auth-store's login
  // functions update this store asynchronously via setSyncResult, and by the time the
  // awaited login() call above resolves, the real (not stale-render) value is what matters.
  const routeAfterLogin = () => {
    const { needsOnboarding } = useOrganizationStore.getState()
    router.push(needsOnboarding ? "/onboarding" : "/dashboard")
  }

  const handleDemoSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const success = await login(email, password)
    if (success) routeAfterLogin()
  }

  return (
    <>
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Welcome back</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-semibold text-primary hover:text-primary/90 transition-colors">
            Create one for free
          </Link>
        </p>
      </div>

      <div className="space-y-6">
        <SocialLoginButtons fullWidth />

        <Divider text="or continue with email" />

        <form onSubmit={handleDemoSubmit} className="space-y-5">
          <div>
            <Label htmlFor="email" className="text-sm font-medium">Email address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="name@company.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value); clearError() }}
              className="mt-2"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <Label htmlFor="password" className="text-sm font-medium">Password</Label>
              <Link href="/forgot-password" className="text-xs font-semibold text-primary hover:text-primary/90 transition-colors">
                Forgot?
              </Link>
            </div>
            <PasswordInput
              id="password"
              value={password}
              onChange={(val) => { setPassword(val); clearError() }}
              autoComplete="current-password"
            />
          </div>

          {error && (
            <div className="p-3 rounded-md bg-destructive/10 border border-destructive/20 text-xs text-destructive font-medium">
              {error}
            </div>
          )}

          <Button type="submit" className="w-full mt-6" disabled={isLoading} size="lg">
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </Button>
        </form>
      </div>
    </>
  )
}
