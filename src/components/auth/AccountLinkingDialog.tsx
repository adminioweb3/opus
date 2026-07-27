"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

interface AccountLinkingDialogProps {
  open: boolean
  email: string
  newProvider: string
  linkedProviders: string[]
  onConfirm: () => void
  onCancel: () => void
  isLoading?: boolean
}

export function AccountLinkingDialog({
  open,
  email,
  newProvider,
  linkedProviders,
  onConfirm,
  onCancel,
  isLoading = false,
}: AccountLinkingDialogProps) {
  const providerNames: Record<string, string> = {
    email: "Email/Password",
    google: "Google",
    github: "GitHub",
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onCancel()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-600" />
            Link Your Accounts
          </DialogTitle>
          <DialogDescription>
            We found an existing account with this email address
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-900">
              <strong>{email}</strong> is already registered with:
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {linkedProviders.map((provider) => (
                <span
                  key={provider}
                  className="px-3 py-1 bg-blue-200 text-blue-900 rounded-full text-sm font-medium"
                >
                  {providerNames[provider]}
                </span>
              ))}
            </div>
          </div>

          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-gray-900">
              You can now link your <strong>{providerNames[newProvider]}</strong> account to this email. You'll be able to use either method to sign in.
            </p>
          </div>

          <div className="text-sm text-gray-600">
            <p>✓ Access your account from multiple providers</p>
            <p>✓ Same organization and data</p>
            <p>✓ Seamless account management</p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onCancel} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={onConfirm} disabled={isLoading}>
            {isLoading ? "Linking..." : "Link Accounts"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
