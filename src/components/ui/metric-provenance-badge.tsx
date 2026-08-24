export type MetricProvenanceKind = "observed" | "derived" | "estimated" | "ai-inferred" | "unavailable"

const PROVENANCE_STYLES: Record<MetricProvenanceKind, string> = {
  observed: "border-emerald-200 bg-emerald-50 text-emerald-700",
  derived: "border-sky-200 bg-sky-50 text-sky-700",
  estimated: "border-amber-200 bg-amber-50 text-amber-700",
  "ai-inferred": "border-violet-200 bg-violet-50 text-violet-700",
  unavailable: "border-slate-200 bg-slate-50 text-slate-500",
}

const PROVENANCE_LABELS: Record<MetricProvenanceKind, string> = {
  observed: "Observed",
  derived: "Derived",
  estimated: "Estimated",
  "ai-inferred": "AI-inferred",
  unavailable: "Not available",
}

export function MetricProvenanceBadge({
  kind,
  className = "",
}: {
  kind: MetricProvenanceKind
  className?: string
}) {
  return (
    <span
      title={`${PROVENANCE_LABELS[kind]} metric`}
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${PROVENANCE_STYLES[kind]} ${className}`}
    >
      {PROVENANCE_LABELS[kind]}
    </span>
  )
}
