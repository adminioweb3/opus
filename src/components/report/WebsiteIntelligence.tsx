import { FullReportData } from "@/lib/api/reportApi"
import { Globe, Server, Users, Search } from "lucide-react"

export default function WebsiteIntelligence({ data }: { data: FullReportData }) {
  const profile = data.websiteProfile
  if (!profile) return null

  let rawData: any = {}
  try {
    if (profile.rawProfileJson) {
      rawData = JSON.parse(profile.rawProfileJson)
    }
  } catch (e) {
    console.error("Failed to parse profile JSON", e)
  }

  const {
    businessSummary = "N/A",
    coreServices = [],
    products = [],
    industriesServed = [],
    targetAudience = [],
    technologyStack = [],
    seoStrength = { score: 0, analysis: "N/A" }
  } = rawData

  const renderItem = (item: any) => {
    if (typeof item === 'string') return item;
    if (item && typeof item === 'object') {
      if (item.value) return item.value;
      if (item.name) return item.name;
    }
    return JSON.stringify(item);
  }

  const safeString = (val: any) => typeof val === 'string' ? val : renderItem(val);
  const safeNumber = (val: any) => {
    if (typeof val === 'number') return val;
    if (val && typeof val === 'object' && val.value !== undefined) return Number(val.value);
    return 0;
  }

  return (
    <section>
      <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
        <Globe className="w-5 h-5 text-slate-400" /> Website Intelligence
      </h2>
      
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Business Profile</h3>
            <p className="text-slate-800 leading-relaxed mb-6">{safeString(businessSummary)}</p>
            
            <div className="grid sm:grid-cols-2 gap-6 pt-6 border-t border-slate-100">
              <div>
                <h4 className="text-sm font-medium text-slate-900 mb-3 flex items-center gap-2">
                  <Server className="w-4 h-4 text-slate-400" /> Core Services
                </h4>
                <div className="flex flex-wrap gap-2">
                  {Array.isArray(coreServices) ? coreServices.map((s, i) => (
                    <span key={i} className="inline-flex items-center rounded-md bg-slate-50 px-2 py-1 text-xs font-medium text-slate-600 ring-1 ring-inset ring-slate-500/10">
                      {renderItem(s)}
                    </span>
                  )) : null}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-slate-900 mb-3 flex items-center gap-2">
                  <Users className="w-4 h-4 text-slate-400" /> Target Audience
                </h4>
                <div className="flex flex-wrap gap-2">
                  {Array.isArray(targetAudience) ? targetAudience.map((s, i) => (
                    <span key={i} className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                      {renderItem(s)}
                    </span>
                  )) : null}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] text-center">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-6 flex justify-center items-center gap-2">
              <Search className="w-4 h-4" /> SEO Foundation
            </h3>
            <div className="relative w-32 h-32 mx-auto mb-4">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#f1f5f9"
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="3"
                  strokeDasharray={`${safeNumber(seoStrength.score) || 0}, 100`}
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-3xl font-bold text-slate-900">{safeNumber(seoStrength.score) || 0}</span>
                <span className="text-xs text-slate-400 font-medium">/ 100</span>
              </div>
            </div>
            <p className="text-sm text-slate-600 line-clamp-3">{typeof seoStrength.analysis === 'string' ? seoStrength.analysis : renderItem(seoStrength.analysis)}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
