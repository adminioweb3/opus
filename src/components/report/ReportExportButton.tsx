"use client"

import { useEffect, useRef, useState } from "react"
import { Download, RefreshCw } from "lucide-react"

type ExportState = "idle" | "preparing" | "exporting"

type ReportExportButtonProps = {
  className?: string
  label?: string
}

export default function ReportExportButton({ className, label = "Export PDF" }: ReportExportButtonProps) {
  const [state, setState] = useState<ExportState>("idle")
  const timeoutRef = useRef<number | null>(null)

  useEffect(() => {
    const clearExportState = () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
      setState("idle")
    }

    window.addEventListener("afterprint", clearExportState)
    window.addEventListener("focus", clearExportState)

    return () => {
      window.removeEventListener("afterprint", clearExportState)
      window.removeEventListener("focus", clearExportState)
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
    }
  }, [])

  const handleExport = () => {
    if (state !== "idle") return

    setState("preparing")
    window.requestAnimationFrame(() => {
      setState("exporting")
      timeoutRef.current = window.setTimeout(() => setState("idle"), 30000)
      window.print()
    })
  }

  const busy = state !== "idle"

  return (
    <button
      type="button"
      onClick={handleExport}
      disabled={busy}
      aria-busy={busy}
      className={className}
    >
      {busy ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
      <span>{busy ? "Preparing PDF" : label}</span>
    </button>
  )
}
