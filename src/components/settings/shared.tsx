"use client"

import { Pencil } from "lucide-react"

// A label/value row with an edit affordance — the recurring building block across every
// settings section (matches the reference design's row pattern).
export function SettingsRow({
  label,
  value,
  onClick,
}: {
  label: string
  value: React.ReactNode
  onClick?: () => void
}) {
  return (
    <div
      className={`flex items-center justify-between py-3 border-b border-border/60 last:border-0 ${onClick ? "cursor-pointer group" : ""}`}
      onClick={onClick}
    >
      <div className="min-w-0">
        <div className="text-xs font-medium text-muted-foreground mb-0.5">{label}</div>
        <div className="text-sm font-medium truncate">{value ?? <span className="text-muted-foreground/60">Not set</span>}</div>
      </div>
      {onClick && (
        <Pencil className="w-4 h-4 text-muted-foreground/0 group-hover:text-muted-foreground transition-colors shrink-0 ml-4" />
      )}
    </div>
  )
}

const STATUS_STYLES: Record<string, string> = {
  ok: "bg-emerald-50 text-emerald-700 border-emerald-200",
  warn: "bg-amber-50 text-amber-700 border-amber-200",
  bad: "bg-red-50 text-red-700 border-red-200",
  neutral: "bg-slate-100 text-slate-600 border-slate-200",
  info: "bg-blue-50 text-blue-700 border-blue-200",
}

export function StatusPill({ kind, text }: { kind: keyof typeof STATUS_STYLES; text: string }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full border text-xs font-medium ${STATUS_STYLES[kind]}`}>
      {text}
    </span>
  )
}

export function SectionHead({ title, sub, action }: { title: string; sub?: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <div>
        <div className="flex items-center gap-1.5 text-sm font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
          {title}
        </div>
        {sub && <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>}
      </div>
      {action}
    </div>
  )
}

export function EmptyState({ icon: Icon, message }: { icon: React.ComponentType<{ className?: string }>; message: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-10 text-center">
      <Icon className="w-8 h-8 text-muted-foreground/40" />
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  )
}
