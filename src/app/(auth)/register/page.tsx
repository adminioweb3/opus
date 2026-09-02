"use client"

import { Suspense, useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuthStore } from "@/lib/stores/auth-store"
import { SocialLoginButtons } from "@/components/auth/SocialLoginButtons"
import { Divider } from "@/components/auth/Divider"
import { PasswordInput } from "@/components/auth/PasswordInput"
import { Loader2 } from "lucide-react"

export default function RegisterPage() {
  return (
    <Suspense>
      <RegisterForm />
    </Suspense>
  )
}

function RegisterForm() {
  const searchParams = useSearchParams()
  const [name, setName] = useState("")
  // Pre-filled from a team invite link (?email=...) — the actual org/role linking happens
  // server-side by matching this email against a pending invite, not by anything in the URL.
  const [email, setEmail] = useState(() => searchParams.get("email") || "")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const { register, isLoading, error, clearError, isAuthenticated } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    clearError()
  }, [clearError])

  // Watch for successful auth (handles both email and social registration)
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      // New registrations always need onboarding
      router.push("/onboarding")
    }
  }, [isAuthenticated, isLoading, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      return
    }

    const success = await register(name, email, password)
    if (success) {
      // useEffect will handle the redirect via isAuthenticated state
    }
  }

  return (
    <>
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Start your free trial</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-primary hover:text-primary/90 transition-colors">
            Sign in
          </Link>
        </p>
      </div>

      <div className="space-y-6">
        <SocialLoginButtons fullWidth />

        <Divider text="or create with email" />

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label htmlFor="name" className="text-sm font-medium">Full name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Jane Doe"
              value={name}
              onChange={(e) => { setName(e.target.value); clearError() }}
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-sm font-medium">Work email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="jane@company.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value); clearError() }}
              className="mt-2"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="password" className="text-sm font-medium">Password</Label>
              <PasswordInput
                id="password"
                value={password}
                onChange={(value) => {
                  setPassword(value)
                  clearError()
                }}
                autoComplete="new-password"
              />
            </div>

            <div>
              <Label htmlFor="confirm-password" className="text-sm font-medium">Confirm</Label>
              <PasswordInput
                id="confirm-password"
                value={confirmPassword}
                onChange={(value) => {
                  setConfirmPassword(value)
                  clearError()
                }}
                autoComplete="new-password"
              />
            </div>
          </div>
          {password && confirmPassword && password !== confirmPassword && (
            <p className="text-xs text-destructive font-medium">Passwords do not match</p>
          )}

          {error && (
            <div className="p-3 rounded-md bg-destructive/10 border border-destructive/20 text-xs text-destructive font-medium">
              {error}
            </div>
          )}

          <Button type="submit" className="w-full mt-6" size="lg" disabled={isLoading || (!!confirmPassword && password !== confirmPassword)}>
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Creating account...
              </>
            ) : (
              "Start free trial"
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center leading-relaxed pt-2">
            By creating an account, you agree to our{" "}
            <Link href="#" className="font-medium text-primary hover:underline">Terms of Service</Link> and{" "}
            <Link href="#" className="font-medium text-primary hover:underline">Privacy Policy</Link>.
          </p>
        </form>
      </div>
    </>
  )
}
