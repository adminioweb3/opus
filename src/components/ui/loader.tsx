import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"

type LoaderSize = "sm" | "md" | "lg"

const sizeClasses: Record<LoaderSize, string> = {
  sm: "size-3.5",
  md: "size-5",
  lg: "size-8",
}

export function Spinner({
  className,
  size = "md",
}: {
  className?: string
  size?: LoaderSize
}) {
  return (
    <Loader2
      aria-hidden="true"
      className={cn("animate-spin text-primary", sizeClasses[size], className)}
    />
  )
}

export function InlineLoader({
  label,
  className,
}: {
  label?: string
  className?: string
}) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <Spinner size="sm" />
      {label && <span>{label}</span>}
    </span>
  )
}

export function SectionLoader({
  label = "Loading...",
  className,
}: {
  label?: string
  className?: string
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "flex min-h-40 flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border/80 bg-muted/30 p-8 text-center",
        className
      )}
    >
      <Spinner size="lg" />
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  )
}

export function PageLoader({
  label = "Loading...",
  className,
}: {
  label?: string
  className?: string
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "flex min-h-[60vh] flex-col items-center justify-center gap-3 p-8 text-center",
        className
      )}
    >
      <Spinner size="lg" />
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
    </div>
  )
}
