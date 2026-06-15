"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, CheckCircle2, Loader2 } from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSent, setIsSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise(r => setTimeout(r, 1500))
    setIsLoading(false)
    setIsSent(true)
  }

  if (isSent) {
    return (
      <>
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground mb-2">Check your email</h2>
          <p className="text-sm text-muted-foreground mb-8">
            We sent a password reset link to <span className="font-medium text-foreground">{email}</span>
          </p>
          <Link href="/login" className="inline-flex items-center justify-center w-full rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-muted transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to sign in
          </Link>
        </div>
      </>
    )
  }

  return (
    <>
      <div>
        <h2 className="mt-6 text-3xl font-bold tracking-tight text-foreground">Reset your password</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Enter your email address and we&apos;ll send you a link to reset your password.
        </p>
      </div>
      <div className="mt-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="email">Email address</Label>
            <div className="mt-2">
              <Input id="email" type="email" required placeholder="name@company.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Sending...</> : "Send reset link"}
          </Button>
          <Link href="/login" className="inline-flex items-center justify-center w-full rounded-md px-4 py-2 text-sm font-medium hover:bg-muted transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />Back to sign in
          </Link>
        </form>
      </div>
    </>
  )
}
