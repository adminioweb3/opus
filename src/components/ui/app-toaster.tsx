"use client"

import { Toaster } from "sonner"

export function AppToaster() {
  return (
    <Toaster
      closeButton
      expand
      richColors={false}
      position="top-right"
      toastOptions={{
        classNames: {
          toast:
            "group rounded-lg border border-border bg-card text-card-foreground shadow-lg",
          title: "text-sm font-semibold",
          description: "text-xs text-muted-foreground",
          actionButton: "bg-primary text-primary-foreground",
          cancelButton: "bg-muted text-muted-foreground",
          success: "border-emerald-200 bg-emerald-50 text-emerald-950",
          error: "border-red-200 bg-red-50 text-red-950",
          warning: "border-amber-200 bg-amber-50 text-amber-950",
          info: "border-blue-200 bg-blue-50 text-blue-950",
        },
      }}
    />
  )
}
