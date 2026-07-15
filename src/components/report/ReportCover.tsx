import { FullReportData } from "@/lib/api/reportApi"
import { getDomainLogoUrl } from "@/lib/logoUtils"
import { LogoAvatar } from "@/components/ui/logo-avatar"

export default function ReportCover({ data }: { data: FullReportData }) {
  const profile = data.websiteProfile
  const exec = data.executiveSummary
  const date = exec?.createdAt ? new Date(exec.createdAt).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' }) : new Date().toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <section className="bg-white rounded-3xl p-10 md:p-16 shadow-[0_2px_20px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-end relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-blue-50/80 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />

      <div className="space-y-6 relative z-10 max-w-2xl">
        <div className="flex items-center gap-3">
          <LogoAvatar
            logoUrl={getDomainLogoUrl(profile?.websiteUrl)}
            fallbackInitial={(profile?.websiteUrl || "?").replace(/^https?:\/\//i, "").charAt(0).toUpperCase()}
            fallbackColor="#2563EB"
            className="rounded-xl border border-slate-100 shadow-sm"
            size={48}
          />
          <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-800">
            Executive GEO Report
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
          Generative Engine Optimization <span className="text-blue-600">Analysis</span>
        </h1>
        <div className="space-y-1">
          <p className="text-xl text-slate-600 font-medium">{profile?.websiteUrl || "Unknown Domain"}</p>
          <p className="text-slate-500">Prepared on {date} • Version 1.0</p>
        </div>
      </div>

      <div className="mt-10 md:mt-0 flex gap-6 relative z-10">
        <div className="text-center p-6 bg-slate-50 rounded-2xl border border-slate-100 min-w-[140px]">
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">GEO Score</p>
          <p className="text-4xl font-black text-slate-900">{exec?.overallGEOScore || 0}<span className="text-lg text-slate-400 font-medium">/100</span></p>
        </div>
        <div className="text-center p-6 bg-blue-50 rounded-2xl border border-blue-100 min-w-[140px]">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">AI Visibility</p>
          <p className="text-4xl font-black text-blue-700">{exec?.overallAIVisibilityScore || 0}<span className="text-lg text-blue-400 font-medium">/100</span></p>
        </div>
      </div>
    </section>
  )
}
