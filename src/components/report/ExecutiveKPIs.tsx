import { FullReportData } from "@/lib/api/reportApi"
import { Activity, ShieldCheck, Target, Quote, TrendingUp } from "lucide-react"

export default function ExecutiveKPIs({ data }: { data: FullReportData }) {
  const exec = data.executiveSummary
  const vis = data.visibilitySummary

  const kpis = [
    {
      title: "AI Visibility Score",
      value: exec?.overallAIVisibilityScore || 0,
      description: "Overall presence across AI platforms",
      icon: Activity,
      color: "text-blue-600",
      bg: "bg-blue-50",
      barColor: "bg-blue-600"
    },
    {
      title: "SEO Strength",
      value: exec?.overallSEOScore || 0,
      description: "Technical & content foundation",
      icon: TrendingUp,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      barColor: "bg-emerald-600"
    },
    {
      title: "Brand Authority",
      value: exec?.overallBrandAuthority || 0,
      description: "Entity recognition & trust",
      icon: ShieldCheck,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      barColor: "bg-indigo-600"
    },
    {
      title: "Content Score",
      value: exec?.overallContentScore || 0,
      description: "Depth and relevance",
      icon: Target,
      color: "text-amber-600",
      bg: "bg-amber-50",
      barColor: "bg-amber-600"
    },
    {
      title: "Citation Strength",
      value: data.citationSummary?.averageAuthorityScore || 0,
      description: "Third-party validation",
      icon: Quote,
      color: "text-rose-600",
      bg: "bg-rose-50",
      barColor: "bg-rose-600"
    },
    {
      title: "Share of Voice",
      value: vis?.shareOfVoice || 0,
      description: "Estimated market capture",
      icon: Activity,
      color: "text-cyan-600",
      bg: "bg-cyan-50",
      barColor: "bg-cyan-600",
      suffix: "%"
    }
  ]

  return (
    <section>
      <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
        <Activity className="w-5 h-5 text-slate-400" /> Executive Metrics
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon
          return (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-[0_2px_10px_rgb(0,0,0,0.02)] border border-slate-100 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl ${kpi.bg}`}>
                  <Icon className={`w-6 h-6 ${kpi.color}`} />
                </div>
                <span className="text-3xl font-bold text-slate-900">
                  {kpi.value}{kpi.suffix ? <span className="text-xl text-slate-400 ml-1">{kpi.suffix}</span> : null}
                </span>
              </div>
              <h3 className="font-semibold text-slate-800">{kpi.title}</h3>
              <p className="text-sm text-slate-500 mb-4">{kpi.description}</p>
              
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${kpi.barColor} rounded-full transition-all duration-1000 ease-out`}
                  style={{ width: `${Math.min(100, Math.max(0, kpi.value))}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
