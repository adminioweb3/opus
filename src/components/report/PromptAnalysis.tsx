import { FullReportData } from "@/lib/api/reportApi"
import { MetricProvenanceBadge } from "@/components/ui/metric-provenance-badge"
import { MessageSquare } from "lucide-react"

export default function PromptAnalysis({ data }: { data: FullReportData }) {
  const prompts = data.prompts || []
  if (prompts.length === 0) return null

  const sortedPrompts = [...prompts].sort((a, b) => b.commercialValue - a.commercialValue).slice(0, 15)

  return (
    <section>
      <h2 className="text-xl font-bold text-slate-900 mb-6 flex flex-wrap items-center gap-2">
        <MessageSquare className="w-5 h-5 text-slate-400" /> High-Value Prompt Coverage
        <MetricProvenanceBadge kind="estimated" />
      </h2>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-wrap gap-4 justify-between items-center bg-slate-50/50">
          <h3 className="text-sm font-semibold text-slate-700">Top Queries Identified ({prompts.length})</h3>
        </div>
        <div className="overflow-x-auto max-h-[500px]">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 font-medium sticky top-0 shadow-sm">
              <tr>
                <th className="px-6 py-4 w-1/4">User Prompt</th>
                <th className="px-6 py-4">Visibility Rank</th>
                <th className="px-6 py-4">Visibility Score</th>
                <th className="px-6 py-4">Share of Voice</th>
                <th className="px-6 py-4">Mention %</th>
                <th className="px-6 py-4">
                  <span className="inline-flex items-center gap-1.5">
                    Commercial Value
                    <MetricProvenanceBadge kind="ai-inferred" />
                  </span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sortedPrompts.map((p, i) => (
                <tr key={i} className="hover:bg-blue-50/30 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-medium text-slate-900 mb-1 text-sm">{p.queryString}</p>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
                        {p.estimatedRank || "—"}
                      </span>
                      <MetricProvenanceBadge kind="estimated" />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${(p.visibilityScore || 0) >= 70 ? "bg-emerald-500" : (p.visibilityScore || 0) >= 40 ? "bg-amber-500" : "bg-rose-500"}`}
                          style={{ width: `${p.visibilityScore || 0}%` }}
                        />
                      </div>
                      <span className={`font-semibold text-sm ${(p.visibilityScore || 0) >= 70 ? "text-emerald-600" : (p.visibilityScore || 0) >= 40 ? "text-amber-600" : "text-rose-600"}`}>
                        {p.visibilityScore || 0}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-slate-900">
                      {p.shareOfVoiceContribution || 0}%
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-slate-900">
                      {p.mentionProbability || 0}%
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {/* commercialValue is an LLM's 1-10 judgment score, not a percentage - scale
                          the bar accordingly instead of rendering it against a 0-100 range. */}
                      <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${p.commercialValue >= 8 ? "bg-purple-500" : p.commercialValue >= 5 ? "bg-indigo-500" : "bg-slate-300"}`}
                          style={{ width: `${Math.min(100, p.commercialValue * 10)}%` }}
                        />
                      </div>
                      <span className="text-slate-600 font-medium text-sm">{p.commercialValue}/10</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
