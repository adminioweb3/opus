'use client'

import { FullReportData, getUnifiedCompetitors, UnifiedCompetitor } from "@/lib/api/reportApi"
import { Target } from "lucide-react"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"
import { useEffect, useState } from "react"

export default function CompetitorAnalysis({ data }: { data: FullReportData }) {
  const [unifiedCompetitors, setUnifiedCompetitors] = useState<UnifiedCompetitor[]>([])
  const [includedOrgs, setIncludedOrgs] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const competitors = data.competitors || []

  useEffect(() => {
    const fetchUnified = async () => {
      if (!data.websiteProfile?.organizationId) return
      setLoading(true)
      const result = await getUnifiedCompetitors(data.websiteProfile.organizationId)
      if (result.success && result.competitors) {
        setUnifiedCompetitors(result.competitors)
        setIncludedOrgs(result.includedOrganizations || [])
      }
      setLoading(false)
    }
    fetchUnified()
  }, [data.websiteProfile?.organizationId])

  // Use unified competitors if available, otherwise fall back to original
  const competitorsToShow: UnifiedCompetitor[] = unifiedCompetitors.length > 0 ? unifiedCompetitors : competitors.map(c => {
    let parsed: any = {};
    try {
      parsed = JSON.parse(c.rawJson || '{}');
    } catch (e) {}
    return {
      name: c.name,
      websiteUrl: c.websiteUrl,
      similarityScore: c.similarityScore,
      confidence: parsed?.confidence ?? 0,
      reason: parsed?.reason,
      sourceOrganization: 'Current organization'
    }
  })

  if (competitorsToShow.length === 0) return null

  const parsedCompetitors = competitorsToShow.map(c => ({
    ...c,
    confidence: c.confidence ?? 0,
    reason: c.reason ?? null,
    isYourCompany: false
  }));

  // Extract your company info from websiteProfile
  let yourCompany = null;
  if (data.websiteProfile) {
    try {
      const profileData = JSON.parse(data.websiteProfile.rawProfileJson || '{}');
      yourCompany = {
        id: 'your-company',
        name: profileData.businessName || 'Your Company',
        similarityScore: 100,
        confidence: 100,
        reason: 'Your company',
        isYourCompany: true,
        webUrl: ''
      };
    } catch (e) {}
  }

  // Combine your company with competitors
  const allCompanies = yourCompany ? [yourCompany, ...parsedCompetitors] : parsedCompetitors;

  const chartData = allCompanies.slice(0, 11).map(c => ({
    name: c.name.substring(0, 15) + (c.name.length > 15 ? '...' : ''),
    similarity: c.similarityScore,
    isYourCompany: c.isYourCompany
  }))

  return (
    <section>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Target className="w-5 h-5 text-slate-400" /> Competitor Intelligence
        </h2>
        {unifiedCompetitors.length > 0 && (
          <p className="text-xs text-slate-500 mt-2">
            Unified view: {unifiedCompetitors.length} competitors across {includedOrgs?.length || 1} organizations
          </p>
        )}
        {loading && <p className="text-xs text-blue-500 mt-2">Loading unified view...</p>}
      </div>
      
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
                  <th className="px-6 py-4">Confidence</th>
                  <th className="px-6 py-4">Why</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {allCompanies.slice(0, 41).map((c, i) => (
                  <tr key={i} className={`transition-colors ${c.isYourCompany ? 'bg-blue-50 hover:bg-blue-50' : 'hover:bg-slate-50/50'}`}>
                    <td className={`px-6 py-4 font-medium ${c.isYourCompany ? 'text-blue-900' : 'text-slate-900'}`}>
                      {c.name}
                      {c.isYourCompany && <span className="ml-2 text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded">YOUR COMPANY</span>}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full" style={{
                            width: `${c.similarityScore}%`,
                            backgroundColor: c.isYourCompany ? '#0ea5e9' : '#3b82f6'
                          }} />
                        </div>
                        <span className="text-slate-500 text-xs">{c.similarityScore}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{c.confidence}%</td>
                    <td className="px-6 py-4 text-slate-500 text-xs max-w-xs truncate" title={c.reason ?? undefined}>{c.reason ?? '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-6">Similarity Comparison</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical" margin={{ top: 0, right: 20, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} width={90} />
                <Tooltip
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value, name, props) => {
                    const isYourCompany = props.payload.isYourCompany;
                    return [value, isYourCompany ? 'Your Company' : 'Similarity'];
                  }}
                />
                <Bar dataKey="similarity" name="Similarity" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={16} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  )
}
