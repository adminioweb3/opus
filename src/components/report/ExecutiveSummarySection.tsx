import { FullReportData } from "@/lib/api/reportApi"
import { BookOpen, AlertTriangle, Lightbulb, TrendingUp } from "lucide-react"

export default function ExecutiveSummarySection({ data }: { data: FullReportData }) {
  const exec = data.executiveSummary
  if (!exec) return null

  // Safely parse JSON fields
  const parseJsonSafe = (jsonString: string | undefined, fallback: string[] = []) => {
    try {
      if (!jsonString) return fallback
      const parsed = JSON.parse(jsonString)
      return Array.isArray(parsed) ? parsed : fallback
    } catch {
      return fallback
    }
  }

  const strengths = parseJsonSafe(exec.strengthsJson)
  const opportunities = parseJsonSafe(exec.opportunitiesJson)
  const risks = parseJsonSafe(exec.threatsJson)

  return (
    <section>
      <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
        <BookOpen className="w-5 h-5 text-slate-400" /> Executive Summary
      </h2>
      
      <div className="bg-white rounded-2xl shadow-[0_2px_10px_rgb(0,0,0,0.02)] border border-slate-100 overflow-hidden">
        <div className="p-8 md:p-10 border-b border-slate-100">
          <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-4">Business Overview</h3>
          <p className="text-lg text-slate-700 leading-relaxed max-w-4xl">{exec.businessOverview}</p>
        </div>

        <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x border-b border-slate-100">
          <div className="p-8 md:p-10 bg-slate-50/50">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Overall Assessment</h3>
            <p className="text-slate-800 leading-relaxed">{exec.overallAssessment}</p>
          </div>
          <div className="p-8 md:p-10 bg-blue-50/30">
            <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" /> Top Recommendation
            </h3>
            <p className="text-slate-800 font-medium leading-relaxed">{exec.topPriorityRecommendation}</p>
            <p className="text-sm text-slate-500 mt-4 border-t border-slate-200/60 pt-4">
              <span className="font-semibold text-slate-700">Expected Impact:</span> {exec.expectedBusinessImpact}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x">
          <div className="p-6 md:p-8">
            <h4 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" /> Key Strengths
            </h4>
            <ul className="space-y-3">
              {strengths.slice(0, 4).map((s, i) => (
                <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                  <span className="text-emerald-500 mt-0.5">•</span> {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-6 md:p-8">
            <h4 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-500" /> Opportunities
            </h4>
            <ul className="space-y-3">
              {opportunities.slice(0, 4).map((o, i) => (
                <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                  <span className="text-amber-500 mt-0.5">•</span> {o}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-6 md:p-8">
            <h4 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-500" /> Primary Risks
            </h4>
            <ul className="space-y-3">
              {risks.slice(0, 4).map((r, i) => (
                <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                  <span className="text-rose-500 mt-0.5">•</span> {r}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

function ShieldCheck(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
}
