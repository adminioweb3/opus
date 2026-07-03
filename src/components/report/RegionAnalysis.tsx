import { FullReportData } from "@/lib/api/reportApi"
import { MapPin, TrendingUp } from "lucide-react"

export default function RegionAnalysis({ data }: { data: FullReportData }) {
  const regions = data.regionScores || []
  if (regions.length === 0) return null

  // Sort by visibility score
//  const sortedRegions = [...regions].sort((a, b) => b.visibilityScore - a.visibilityScore).slice(0, 8)

const sortedRegions = [...regions].sort((a, b) => b.visibility - a.visibility)
  return (
    <section>
      <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
        <MapPin className="w-5 h-5 text-slate-400" /> Geographic AI Dominance
      </h2>
      
      <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 font-medium">
              <tr>
                <th className="px-6 py-4">Region</th>
                <th className="px-6 py-4">Visibility</th>
                <th className="px-6 py-4">Avg Rank</th>
                <th className="px-6 py-4">Local Leader</th>
                <th className="px-6 py-4">Opportunity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sortedRegions.map((r, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">{r.region}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${(r.visibility || 0) >= 70 ? 'bg-emerald-500' : (r.visibility || 0) >= 40 ? 'bg-amber-500' : 'bg-slate-300'}`} 
                          style={{ width: `${r.visibility || 0}%` }} 
                        />
                      </div>
                      <span className="text-slate-600 font-medium">{r.visibility || 0}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{r.ranking || '-'}</td>
                  <td className="px-6 py-4 text-slate-600">{r.competitorLeader || 'Unknown'}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-xs font-medium ${
                      (r.reason || '').toLowerCase().includes('high') ? 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20' : 
                      (r.reason || '').toLowerCase().includes('medium') ? 'bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-600/20' : 
                      'bg-slate-50 text-slate-600 ring-1 ring-inset ring-slate-500/20'
                    }`}>
                      {(r.reason || '').toLowerCase().includes('high') && <TrendingUp className="w-3 h-3" />}
                      {r.reason || 'Low'}
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
