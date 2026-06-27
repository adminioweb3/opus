import { FullReportData } from "@/lib/api/reportApi"
import { Award, CheckCircle2 } from "lucide-react"

export default function FinalScorecard({ data }: { data: FullReportData }) {
  const exec = data.executiveSummary
  if (!exec) return null

  const ScoreCircle = ({ score, label, color }: { score: number, label: string, color: string }) => (
    <div className="flex flex-col items-center">
      <div className="relative w-24 h-24 mb-3">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            className="text-slate-100"
          />
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeDasharray={`${score || 0}, 100`}
            className={`transition-all duration-1000 ease-out ${color}`}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <span className="text-xl font-bold text-slate-900">{score || 0}</span>
        </div>
      </div>
      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">{label}</span>
    </div>
  )

  const parseJsonSafe = (jsonString: string | undefined, fallback: string[] = []) => {
    try {
      if (!jsonString) return fallback
      const parsed = JSON.parse(jsonString)
      return Array.isArray(parsed) ? parsed : fallback
    } catch {
      return fallback
    }
  }

  const nextSteps = parseJsonSafe(exec.nextStepsJson)

  return (
    <section className="bg-slate-900 rounded-3xl p-10 md:p-16 shadow-xl relative overflow-hidden text-white">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      
      <div className="relative z-10 grid lg:grid-cols-2 gap-16">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight mb-4 flex items-center gap-3">
            <Award className="w-8 h-8 text-blue-400" /> Executive Scorecard
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed mb-10">
            A high-level summary of your Generative Engine Optimization readiness and strategic next steps.
          </p>

          <div className="space-y-6">
            <h3 className="text-sm font-semibold text-blue-400 uppercase tracking-wider">Immediate Next Steps</h3>
            <ul className="space-y-4">
              {nextSteps.map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-blue-400" />
                  </div>
                  <span className="text-slate-200 leading-relaxed">{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Overall GEO Rating</p>
            <div className="flex items-end justify-center gap-2">
              <span className="text-6xl font-black text-white">{exec.overallGEOScore}</span>
              <span className="text-2xl text-slate-500 font-medium pb-1">/100</span>
            </div>
            <div className="mt-4 inline-flex items-center rounded-full bg-blue-500/20 px-3 py-1 text-sm font-medium text-blue-300 ring-1 ring-inset ring-blue-500/30">
              {exec.overallGEOScore >= 80 ? 'Excellent Position' : exec.overallGEOScore >= 50 ? 'Moderate Opportunity' : 'Critical Action Required'}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-white/10">
            <ScoreCircle score={exec.overallAIVisibilityScore} label="AI Visibility" color="text-blue-400" />
            <ScoreCircle score={exec.overallSEOScore} label="SEO Strength" color="text-emerald-400" />
            <ScoreCircle score={exec.overallBrandAuthority} label="Brand Auth" color="text-indigo-400" />
            <ScoreCircle score={exec.overallContentScore} label="Content" color="text-amber-400" />
          </div>
        </div>
      </div>
    </section>
  )
}
