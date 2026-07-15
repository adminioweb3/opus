"use client"

import { Suspense, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuthStore } from "@/lib/stores/auth-store"
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
  const { register, isLoading, error, clearError } = useAuthStore()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password !== confirmPassword) {
      return
    }

    const success = await register(name, email, password)
    if (success) {
      // New registrations always need onboarding. We redirect unconditionally
      // because reading needsOnboarding from the store right here is a race —
      // the async setSyncResult inside `register` may not have settled yet.
      router.push("/onboarding")
    }
  }

  return (
    <>
      <div>
        <h2 className="mt-6 text-3xl font-bold tracking-tight text-foreground">Create your account</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-primary hover:text-primary/90 transition-colors">
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label htmlFor="name">Full name</Label>
            <div className="mt-2">
              <Input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Jane Doe"
                value={name}
                onChange={(e) => { setName(e.target.value); clearError() }}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email">Work email</Label>
            <div className="mt-2">
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="jane@company.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); clearError() }}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <div className="mt-2">
              <Input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Minimum 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="confirm-password">Confirm password</Label>
            <div className="mt-2">
              <Input
                id="confirm-password"
                name="confirm-password"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            {password && confirmPassword && password !== confirmPassword && (
              <p className="text-xs text-destructive mt-1">Passwords do not match</p>
            )}
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-sm text-destructive">
              {error}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isLoading || (!!confirmPassword && password !== confirmPassword)}>
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Creating account...
              </>
            ) : (
              "Start free trial"
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center leading-relaxed">
            By creating an account, you agree to our{" "}
            <Link href="#" className="text-primary hover:underline">Terms of Service</Link> and{" "}
            <Link href="#" className="text-primary hover:underline">Privacy Policy</Link>.
          </p>
        </form>
      </div>
    </>
  )
}
