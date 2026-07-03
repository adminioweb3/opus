import { FullReportData } from "@/lib/api/reportApi"
import { Globe, ShieldAlert, CheckCircle2 } from "lucide-react"
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from "recharts"

export default function PlatformAnalysis({ data }: { data: FullReportData }) {
  const platforms = data.platformVisibilities || []
  if (platforms.length === 0) return null

  const parseJsonSafe = (jsonString: string | undefined, fallback: string[] = []) => {
    try {
      if (!jsonString) return fallback
      const parsed = JSON.parse(jsonString)
      return Array.isArray(parsed) ? parsed : fallback
    } catch {
      return fallback
    }
  }

  const chartData = platforms.map(p => ({
    subject: (p.platform || '').replace('AI Overview', 'AIO').replace('Microsoft ', '').substring(0, 10),
    A: p.visibilityScore,
    fullMark: 100,
  }))

  return (
    <section>
      <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
        <Globe className="w-5 h-5 text-slate-400" /> Platform Visibility
      </h2>
      
      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-1 bg-white rounded-2xl p-6 border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] flex flex-col justify-center">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-6 text-center">Engine Balance</h3>
          <div className="h-62.5 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
                <PolarGrid stroke="#f1f5f9" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Tooltip />
                <Radar name="Visibility" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="lg:col-span-2 grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {platforms.slice(0, 6).map((p, i) => (
            <div key={i} className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm flex flex-col">
              <div className="flex justify-between items-start mb-3">
                <span className="font-semibold text-slate-900">{p.platform}</span>
                <span className={`text-sm font-bold ${p.visibilityScore >= 70 ? 'text-emerald-500' : p.visibilityScore >= 40 ? 'text-amber-500' : 'text-rose-500'}`}>
                  {p.visibilityScore}/100
                </span>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between text-xs text-slate-500 mb-1">
                  <span>Coverage</span>
                  <span>{p.promptCoverage}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-slate-300 rounded-full" style={{ width: `${p.promptCoverage}%` }} />
                </div>
              </div>

              <div className="mt-auto space-y-2">
                {parseJsonSafe(p.strengthsJson).slice(0, 1).map((s, idx) => (
                  <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-600">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="line-clamp-2">{s}</span>
                  </div>
                ))}
                {parseJsonSafe(p.weaknessesJson).slice(0, 1).map((w, idx) => (
                  <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-600">
                    <ShieldAlert className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                    <span className="line-clamp-2">{w}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
