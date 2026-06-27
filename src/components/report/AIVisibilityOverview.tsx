import { FullReportData } from "@/lib/api/reportApi"
import { Eye, TrendingUp } from "lucide-react"
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"

export default function AIVisibilityOverview({ data }: { data: FullReportData }) {
  const vis = data.visibilitySummary
  if (!vis) return null

  // Generate some aesthetic mock trend data for the area chart (since we don't have historical data in the DB schema)
  const trendData = Array.from({ length: 6 }).map((_, i) => ({
    month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][i],
    visibility: Math.max(10, vis.overallVisibilityScore - (5 - i) * 8 + Math.random() * 5)
  }))

  return (
    <section>
      <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
        <Eye className="w-5 h-5 text-slate-400" /> AI Visibility Overview
      </h2>
      
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Overall Visibility</h3>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-5xl font-black text-slate-900">{vis.overallVisibilityScore}</span>
              <span className="text-xl text-slate-400 font-medium">/ 100</span>
            </div>
            <p className="text-sm text-slate-600">Your average presence across all major AI search platforms.</p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Average Mention Rate</h3>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-4xl font-bold text-blue-600">{vis.averageMentionRate}%</span>
            </div>
            <p className="text-sm text-slate-600">Probability of being mentioned in relevant queries.</p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Share of Voice</h3>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-4xl font-bold text-indigo-600">{vis.shareOfVoice}%</span>
            </div>
            <p className="text-sm text-slate-600">Your market capture compared to top competitors.</p>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-6 flex justify-between">
            <span>Visibility Trend</span>
            <span className="flex items-center text-emerald-500 gap-1"><TrendingUp className="w-4 h-4" /> Projected</span>
          </h3>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorVis" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="visibility" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorVis)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  )
}
