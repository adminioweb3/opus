import { FullReportData } from "@/lib/api/reportApi"
import { Quote, ExternalLink } from "lucide-react"

export default function CitationAnalysis({ data }: { data: FullReportData }) {
  const sources = data.citationSources || []
  const summary = data.citationSummary
  if (sources.length === 0) return null

  // Sort by authority score
  const sortedSources = [...sources].sort((a, b) => b.authorityScore - a.authorityScore).slice(0, 10)

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Quote className="w-5 h-5 text-slate-400" /> Citation Intelligence
        </h2>
        <div className="text-sm text-slate-500 font-medium">
          Authority Score: <span className="text-slate-900 font-bold">{summary?.averageAuthorityScore || 0}/100</span>
        </div>
      </div>
      
      <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 font-medium">
              <tr>
                <th className="px-6 py-4">Source Domain</th>
                <th className="px-6 py-4">Authority</th>
                <th className="px-6 py-4">Influence</th>
                <th className="px-6 py-4">Frequency</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sortedSources.map((s, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-slate-900">{s.source}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-500" style={{ width: `${s.authorityScore}%` }} />
                      </div>
                      <span className="text-slate-600 font-medium">{s.authorityScore}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{s.influenceScore}/100</td>
                  <td className="px-6 py-4 text-slate-500">{s.citationFrequency}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      s.opportunityScore >= 70 ? 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20' : 
                      s.opportunityScore >= 40 ? 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20' : 
                      'bg-slate-50 text-slate-600 ring-1 ring-inset ring-slate-500/20'
                    }`}>
                      {s.opportunityScore >= 70 ? 'High' : s.opportunityScore >= 40 ? 'Medium' : 'Low'}
                    </span>
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
