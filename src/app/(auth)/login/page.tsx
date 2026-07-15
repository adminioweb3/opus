"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuthStore } from "@/lib/stores/auth-store"
import { useOrganizationStore } from "@/lib/stores/organizationStore"
import { Loader2 } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { login, loginWithGoogle, loginWithGithub, isLoading, error, clearError } = useAuthStore()
  const router = useRouter()

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

  const handleGoogleLogin = async () => {
    const success = await loginWithGoogle()
    if (success) routeAfterLogin()
  }

  const handleGithubLogin = async () => {
    const success = await loginWithGithub()
    if (success) routeAfterLogin()
  }

  return (
    <>
      <div>
        <h2 className="mt-6 text-3xl font-bold tracking-tight text-foreground">Sign in to your account</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-medium text-primary hover:text-primary/90 transition-colors">
            Start a 14-day free trial
          </Link>
        </p>
      </div>

      <div className="mt-8">
        <div>
          <div>
            <p className="text-sm font-medium leading-6 text-foreground">Sign in with</p>
            <div className="mt-2 grid grid-cols-2 gap-3">
              <Button variant="outline" className="w-full" onClick={handleGoogleLogin} disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                ) : (
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                )}
                Google
              </Button>
              <Button variant="outline" className="w-full" onClick={handleGithubLogin} disabled={isLoading}>
                <svg className="w-5 h-5 mr-2 text-foreground" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                GitHub
              </Button>
            </div>
          </div>

          <div className="relative mt-6">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm font-medium leading-6">
              <span className="bg-background px-6 text-muted-foreground">Or continue with</span>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <form onSubmit={handleDemoSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email">Email address</Label>
              <div className="mt-2">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); clearError() }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <div className="text-sm leading-6">
                  <Link href="/forgot-password" className="font-semibold text-primary hover:text-primary/90">
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); clearError() }}
                />
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-sm text-destructive">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
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
      </div>
    </>
  )
}
