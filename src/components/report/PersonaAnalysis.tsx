import { FullReportData } from "@/lib/api/reportApi"
import { Users, FileText } from "lucide-react"

export default function PersonaAnalysis({ data }: { data: FullReportData }) {
  const personas = data.personaScores || []
  if (personas.length === 0) return null

  const parseJsonSafe = (jsonString: string | undefined, fallback: string[] = []) => {
    try {
      if (!jsonString) return fallback
      const parsed = JSON.parse(jsonString)
      return Array.isArray(parsed) ? parsed : fallback
    } catch {
      return fallback
    }
  }

  // Sort by visibility score
  const sortedPersonas = [...personas].sort((a, b) => b.visibilityScore - a.visibilityScore).slice(0, 6)

  return (
    <section>
      <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
        <Users className="w-5 h-5 text-slate-400" /> Buyer Persona Visibility
      </h2>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedPersonas.map((p, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-bold text-slate-900 text-lg">{p.personaName}</h3>
              <div className="flex flex-col items-end">
                <span className={`text-xl font-black ${p.visibilityScore >= 70 ? 'text-emerald-600' : p.visibilityScore >= 40 ? 'text-amber-600' : 'text-rose-600'}`}>
                  {p.visibilityScore}
                </span>
                <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Visibility</span>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex justify-between text-xs text-slate-500 mb-1">
                <span>Share of Voice</span>
                <span className="font-medium text-slate-700">{p.shareOfVoice}%</span>
              </div>
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${p.shareOfVoice}%` }} />
              </div>
            </div>

            <div className="mt-auto space-y-4">
              <div>
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Content Gap</h4>
                <ul className="space-y-1.5">
                  {parseJsonSafe(p.recommendedContentJson).slice(0, 2).map((c, idx) => (
                    <li key={idx} className="flex items-start gap-1.5 text-sm text-slate-600">
                      <FileText className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
