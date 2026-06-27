import { FullReportData } from "@/lib/api/reportApi"
import { LayoutDashboard, CheckCircle2 } from "lucide-react"

export default function RecommendationsKanban({ data }: { data: FullReportData }) {
  const recommendations = data.recommendations || []
  if (recommendations.length === 0) return null

  const parseJsonSafe = (jsonString: string | undefined, fallback: string[] = []) => {
    try {
      if (!jsonString) return fallback
      const parsed = JSON.parse(jsonString)
      return Array.isArray(parsed) ? parsed : fallback
    } catch {
      return fallback
    }
  }

  // Sort by priority score
  const sorted = [...recommendations].sort((a, b) => b.priorityScore - a.priorityScore)
  const critical = sorted.filter(r => r.priorityScore >= 80)
  const high = sorted.filter(r => r.priorityScore >= 60 && r.priorityScore < 80)
  const medium = sorted.filter(r => r.priorityScore < 60)

  const KanbanColumn = ({ title, items, colorClass, dotClass }: { title: string, items: any[], colorClass: string, dotClass: string }) => (
    <div className="bg-slate-50/50 rounded-2xl p-4 border border-slate-100 flex-1 min-w-[300px]">
      <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2 px-2">
        <span className={`w-2.5 h-2.5 rounded-full ${dotClass}`} /> {title} ({items.length})
      </h3>
      <div className="space-y-4">
        {items.map((r, i) => (
          <div key={i} className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-2">
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${colorClass}`}>
                {r.category}
              </span>
              <span className="text-xs text-slate-400 font-medium">{r.implementationTime}</span>
            </div>
            <h4 className="font-semibold text-slate-900 leading-snug mb-2">{r.title}</h4>
            <p className="text-sm text-slate-600 mb-4 line-clamp-3">{r.description}</p>
            
            <div className="space-y-2 pt-4 border-t border-slate-100">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Action Items</p>
              {parseJsonSafe(r.actionItemsJson).slice(0, 3).map((a, idx) => (
                <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-600">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                  <span className="line-clamp-2">{a}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-4 flex gap-2">
              <span className="inline-flex items-center rounded-md bg-slate-50 px-2 py-1 text-[10px] font-medium text-slate-500 ring-1 ring-inset ring-slate-500/10">
                Impact: {r.estimatedImpact}
              </span>
              <span className="inline-flex items-center rounded-md bg-slate-50 px-2 py-1 text-[10px] font-medium text-slate-500 ring-1 ring-inset ring-slate-500/10">
                Diff: {r.estimatedDifficulty}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <section>
      <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
        <LayoutDashboard className="w-5 h-5 text-slate-400" /> Optimization Roadmap
      </h2>
      
      <div className="flex flex-col lg:flex-row gap-6 overflow-x-auto pb-4">
        <KanbanColumn 
          title="Critical Priority" 
          items={critical} 
          colorClass="bg-rose-50 text-rose-700" 
          dotClass="bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]" 
        />
        <KanbanColumn 
          title="High Priority" 
          items={high} 
          colorClass="bg-amber-50 text-amber-700" 
          dotClass="bg-amber-500" 
        />
        <KanbanColumn 
          title="Medium Priority" 
          items={medium} 
          colorClass="bg-blue-50 text-blue-700" 
          dotClass="bg-blue-500" 
        />
      </div>
    </section>
  )
}
