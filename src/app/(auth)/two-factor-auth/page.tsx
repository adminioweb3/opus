"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ShieldCheck, Loader2, Smartphone } from "lucide-react"

export default function TwoFactorAuthPage() {
  const [code, setCode] = useState(["", "", "", "", "", ""])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const router = useRouter()

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return
    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)
    setError("")
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
    router.push("/dashboard")
  }

  return (
    <>
      <div>
        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
          <ShieldCheck className="w-7 h-7 text-primary" />
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Two-factor authentication</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Enter the 6-digit code from your authenticator app to continue.
        </p>
      </div>

      <div className="mt-8 space-y-6">
        <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50 border border-border">
          <Smartphone className="w-5 h-5 text-muted-foreground shrink-0" />
          <p className="text-sm text-muted-foreground">Open your authenticator app (Google Authenticator, Authy, etc.) and enter the 6-digit code.</p>
        </div>

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

        {error && <p className="text-sm text-destructive text-center">{error}</p>}

        <Button onClick={handleVerify} className="w-full" disabled={isLoading}>
          {isLoading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Verifying...</> : "Verify and continue"}
        </Button>

        <p className="text-sm text-center text-muted-foreground">
          Lost access to your authenticator?{" "}
          <button type="button" className="font-medium text-primary hover:text-primary/90">
            Use a recovery code
          </button>
        </p>
      </div>
    </>
  )
}
