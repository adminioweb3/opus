import { FullReportData } from "@/lib/api/reportApi"
import { Target } from "lucide-react"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"

export default function CompetitorAnalysis({ data }: { data: FullReportData }) {
  const competitors = data.competitors || []
  if (competitors.length === 0) return null

  const parsedCompetitors = competitors.map(c => {
    let parsed: any = {};
    try {
      parsed = JSON.parse(c.rawJson || '{}');
    } catch (e) {}

    return {
      ...c,
      estimatedAIVisibility: parsed?.estimatedAIVisibility?.score || 0,
      seoStrength: parsed?.estimatedSEOStrength?.score || 0,
      brandAuthorityScore: parsed?.estimatedBrandAuthority?.score || 0
    }
  });

  const chartData = parsedCompetitors.slice(0, 10).map(c => ({
    name: c.name.substring(0, 15) + (c.name.length > 15 ? '...' : ''),
    similarity: c.similarityScore,
    visibility: c.estimatedAIVisibility
  }))

  return (
    <section>
      <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
        <Target className="w-5 h-5 text-slate-400" /> Competitor Intelligence
      </h2>
      
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Top Competitors</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 font-medium">
                <tr>
                  <th className="px-6 py-4">Competitor</th>
                  <th className="px-6 py-4">Similarity</th>
                  <th className="px-6 py-4">AI Visibility</th>
                  <th className="px-6 py-4">SEO Strength</th>
                  <th className="px-6 py-4">Brand Auth</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {parsedCompetitors.slice(0, 8).map((c, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">{c.name}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500" style={{ width: `${c.similarityScore}%` }} />
                        </div>
                        <span className="text-slate-500 text-xs">{c.similarityScore}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{c.estimatedAIVisibility}</td>
                    <td className="px-6 py-4 text-slate-600">{c.seoStrength}</td>
                    <td className="px-6 py-4 text-slate-600">{c.brandAuthorityScore}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-6">Visibility Comparison</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical" margin={{ top: 0, right: 20, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} width={90} />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="visibility" name="AI Visibility" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={16} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  )
}
