"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CheckCircle2, Loader2 } from "lucide-react"

export default function VerifyEmailPage() {
  const [code, setCode] = useState(["", "", "", "", "", ""])
  const [isLoading, setIsLoading] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [error, setError] = useState("")
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const router = useRouter()

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return
    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)
    setError("")

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleVerify = async () => {
    const fullCode = code.join("")
    if (fullCode.length !== 6) {
      setError("Please enter the complete 6-digit code")
      return
    }
    setIsLoading(true)
    await new Promise(r => setTimeout(r, 1500))
    setIsLoading(false)
    setIsVerified(true)
    setTimeout(() => router.push("/dashboard"), 2000)
  }

  const handleResend = async () => {
    setCode(["", "", "", "", "", ""])
    setError("")
    // Mock resend
  }

  if (isVerified) {
    return (
      <div className="text-center">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground mb-2">Email verified</h2>
        <p className="text-sm text-muted-foreground">Redirecting to your dashboard...</p>
      </div>
    )
  }

  return (
    <>
      <div>
        <h2 className="mt-6 text-3xl font-bold tracking-tight text-foreground">Verify your email</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          We sent a 6-digit verification code to your email address. Enter it below to verify your account.
        </p>
      </div>
      <div className="mt-8 space-y-6">
        <div className="flex justify-center gap-3">
          {code.map((digit, i) => (
            <Input
              key={i}
              ref={(el) => { inputRefs.current[i] = el }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className="w-12 h-14 text-center text-xl font-bold"
            />
          ))}
        </div>
        {error && (
          <p className="text-sm text-destructive text-center">{error}</p>
        )}
        <Button onClick={handleVerify} className="w-full" disabled={isLoading}>
          {isLoading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Verifying...</> : "Verify email"}
        </Button>
        <p className="text-sm text-center text-muted-foreground">
          Didn&apos;t receive the code?{" "}
          <button type="button" onClick={handleResend} className="font-medium text-primary hover:text-primary/90">
            Resend code
          </button>
        </p>
      </div>
    </>
  )
}
