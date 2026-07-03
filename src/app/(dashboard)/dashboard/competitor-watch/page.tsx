import React from "react";
import { Target, Plus, Sparkles } from "lucide-react";

export default function CompetitorWatchPage() {
  return (
    <div className="flex-1 p-8 text-slate-900 bg-[#f8fafc] min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <div className="flex-1">
          <h1 className="text-[28px] font-space-grotesk font-bold tracking-tight text-slate-900">Competitor watch</h1>
          <p className="text-[14px] text-slate-500 mt-1">
            Track competitive share of voice and identify threats in search results
          </p>
        </div>
        <button className="flex items-center gap-2 bg-white text-slate-900 border border-slate-200 px-4 py-2.5 rounded-[12px] text-[13px] font-semibold hover:bg-slate-50 transition-colors shadow-sm">
          <Plus className="w-4 h-4" /> Add Competitor
        </button>
      </div>

      <div className="flex flex-col items-center justify-center py-20 px-6 text-center border border-dashed border-slate-300 rounded-[14px] bg-slate-50/50">
        <div className="w-16 h-16 bg-indigo-50 rounded-[16px] flex items-center justify-center mb-6 text-indigo-600">
          <Target className="w-8 h-8" />
        </div>
        <h2 className="text-[20px] font-semibold mb-2">Competitor module active</h2>
        <p className="text-slate-500 max-w-100 text-[14px] leading-relaxed mb-8">
          Frontend scaffolding is ready. Connect this view to your competitor intelligence data to analyze relative ranking performance.
        </p>
        <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-900 px-6 py-3 rounded-[12px] text-[14px] font-semibold shadow-[0_1px_3px_rgba(0,0,0,0.05)] hover:bg-slate-50 transition-colors">
          <Sparkles className="w-4 h-4 text-indigo-600" /> Generate Mock Data
        </button>
      </div>
    </div>
  );
}
