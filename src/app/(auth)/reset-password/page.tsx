"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle2, Loader2 } from "lucide-react"

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isReset, setIsReset] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) return
    setIsLoading(true)
    await new Promise(r => setTimeout(r, 1500))
    setIsLoading(false)
    setIsReset(true)
    setTimeout(() => router.push("/login"), 2000)
  }

  if (isReset) {
    return (
      <div className="text-center">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground mb-2">Password updated</h2>
        <p className="text-sm text-muted-foreground">Redirecting you to sign in...</p>
      </div>
    )
  }

  return (
    <>
      <div>
        <h2 className="mt-6 text-3xl font-bold tracking-tight text-foreground">Set new password</h2>
        <p className="mt-2 text-sm text-muted-foreground">Your new password must be at least 8 characters.</p>
      </div>
      <div className="mt-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label htmlFor="password">New password</Label>
            <div className="mt-2">
              <Input id="password" type="password" required placeholder="Minimum 8 characters" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
          </div>
          <div>
            <Label htmlFor="confirm">Confirm new password</Label>
            <div className="mt-2">
              <Input id="confirm" type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
            {password && confirmPassword && password !== confirmPassword && (
              <p className="text-xs text-destructive mt-1">Passwords do not match</p>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={isLoading || (!!confirmPassword && password !== confirmPassword)}>
            {isLoading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Resetting...</> : "Reset password"}
          </Button>
        </form>
      </div>
    </>
  )
}
