"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuthStore } from "@/lib/stores/auth-store"
import { Loader2 } from "lucide-react"

export default function RegisterPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
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
