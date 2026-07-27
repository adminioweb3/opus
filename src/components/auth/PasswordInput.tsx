"use client"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface PasswordInputProps {
  id: string
  placeholder?: string
  value: string
  onChange: (value: string) => void
  autoComplete?: string
}

export function PasswordInput({ id, placeholder = "••••••••", value, onChange, autoComplete }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="relative mt-2">
      <Input
        id={id}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        className="pr-10"
      />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
      >
        {showPassword ? (
          <EyeOff className="w-4 h-4 text-gray-500" />
        ) : (
          <Eye className="w-4 h-4 text-gray-500" />
        )}
      </Button>
    </div>
  )
}
