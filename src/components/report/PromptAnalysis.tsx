import { FullReportData } from "@/lib/api/reportApi"
import { MessageSquare, ArrowRight } from "lucide-react"

export default function PromptAnalysis({ data }: { data: FullReportData }) {
  const prompts = data.prompts || []
  if (prompts.length === 0) return null

  // Sort by commercial value
  const sortedPrompts = [...prompts].sort((a, b) => b.commercialValue - a.commercialValue).slice(0, 15)

  return (
    <section>
      <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
        <MessageSquare className="w-5 h-5 text-slate-400" /> High-Value Prompt Coverage
      </h2>
      
      <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-wrap gap-4 justify-between items-center bg-slate-50/50">
          <h3 className="text-sm font-semibold text-slate-700">Top Queries Identified ({prompts.length})</h3>
        </div>
        <div className="overflow-x-auto max-h-[500px]">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 font-medium sticky top-0 shadow-sm">
              <tr>
                <th className="px-6 py-4 w-2/5">User Prompt</th>
                <th className="px-6 py-4">Intent</th>
                <th className="px-6 py-4">Commercial Value</th>
                <th className="px-6 py-4">Est. Visibility</th>
                <th className="px-6 py-4">Target Persona</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sortedPrompts.map((p, i) => (
                <tr key={i} className="hover:bg-blue-50/30 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-medium text-slate-900 mb-1">{p.queryString}</p>
                    <p className="text-xs text-slate-500">{p.topic}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
                      {p.intent}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${p.commercialValue >= 80 ? 'bg-emerald-500' : p.commercialValue >= 50 ? 'bg-amber-500' : 'bg-slate-300'}`} 
                          style={{ width: `${p.commercialValue}%` }} 
                        />
                      </div>
                      <span className="text-slate-600 font-medium">{p.commercialValue}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`font-medium ${(p.visibilityScore || 0) >= 70 ? 'text-emerald-600' : (p.visibilityScore || 0) >= 40 ? 'text-amber-600' : 'text-rose-600'}`}>
                      {p.visibilityScore || 0}%
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{p.persona}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
