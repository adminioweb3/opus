"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Award, Cpu, TrendingUp, TrendingDown, Sparkles,
  Clock, ExternalLink, Info, PieChart,
  History, Lightbulb, ChevronDown, ShieldAlert
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useOrganizationStore } from "@/lib/stores/organizationStore";
import { getPlatformLogoUrl } from "@/lib/logoUtils";
import { LogoAvatar } from "@/components/ui/logo-avatar";
import {
  getCitationIntelligence,
  CitationIntelligenceResponse,
} from "@/lib/api/citationIntelligenceApi";

const PLATFORM_COLOR: Record<string, string> = {
  "ChatGPT": "#10A37F", "Claude": "#D97757", "Gemini": "#4285F4",
  "Perplexity": "#20808D", "Google AI Overview": "#4285F4",
  "Microsoft Copilot": "#0078D4", "Meta AI": "#0866FF",
  "Grok": "#1A1A1A", "DeepSeek": "#4D6BFE",
};

function platformColor(name: string) {
  return PLATFORM_COLOR[name] ?? "#64748B";
}

function getMatColor(v: number) {
  return v >= 80 ? "#16A34A" : v >= 65 ? "#6366F1" : v >= 45 ? "#D97706" : "#EF4444";
}

function statusChip(status: string) {
  switch (status) {
    case "Strong": return "bg-emerald-50 text-emerald-600";
    case "Solid": return "bg-cyan-50 text-cyan-600";
    case "Developing": return "bg-amber-50 text-amber-600";
    default: return "bg-red-50 text-red-600";
  }
}

function getSparkline(data: number[]) {
  const w = 90, h = 30;
  if (data.length === 0) return `0,${h / 2} ${w},${h / 2}`;
  if (data.length === 1) return `0,${h / 2} ${w},${h / 2}`;
  const mn = Math.min(...data), mx = Math.max(...data), rng = mx - mn || 1;
  return data.map((v, i) => `${(i / (data.length - 1) * w).toFixed(1)},${(h - ((v - mn) / rng) * h).toFixed(1)}`).join(" ");
}

const RANGE_OPTIONS: { label: string; value: "7D" | "30D" | "90D" }[] = [
  { label: "7D", value: "7D" },
  { label: "30D", value: "30D" },
  { label: "90D", value: "90D" },
];

export default function CitationIntelligencePage() {
  const { organizationId } = useOrganizationStore();
  const [range, setRange] = useState<"7D" | "30D" | "90D">("30D");
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<CitationIntelligenceResponse | null>(null);

  const fetchData = useCallback(async () => {
    if (!organizationId) return;
    setIsLoading(true);
    try {
      const res = await getCitationIntelligence(organizationId, range);
      setData(res);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load citation intelligence data");
    } finally {
      setIsLoading(false);
    }
  }, [organizationId, range]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const qualitySpark = useMemo(() => (data?.qualityHistory ?? []).map((p) => p.score), [data]);
  const signalSpark = useMemo(() => (data?.signalHistory ?? []).map((p) => p.score), [data]);

  const isPositive = (delta: string) => !delta.trim().startsWith("-");

  if (!isLoading && data && !data.hasData) {
    return (
      <div className="flex-1 p-8 min-h-screen flex items-center justify-center">
        <Card className="max-w-md p-10 text-center">
          <ShieldAlert className="w-10 h-10 text-amber-500 mx-auto mb-4" />
          <h2 className="text-lg font-bold mb-2">No citation data yet</h2>
          <p className="text-sm text-slate-500">
            Complete onboarding analysis for this organization first — citation intelligence
            populates automatically from real AI-judged source data once that's done.
          </p>
        </Card>
      </div>
    );
  }

  const kpis = data
    ? [
        { label: "Citation Quality Score", val: `${data.compositeQualityScore}`, ic: Award, color: "#10B981", trend: data.qualityDelta, spark: qualitySpark, chip: data.compositeQualityScore >= 70 ? "Strong" : data.compositeQualityScore >= 45 ? "Developing" : "Weak" },
        { label: "Citation Signal", val: `${data.citationSignal}`, ic: Sparkles, color: "#6366F1", trend: data.signalDelta, spark: signalSpark, chip: data.citationSignal >= 70 ? "Healthy" : data.citationSignal >= 45 ? "Building" : "Low" },
        { label: "AI Models Referencing You", val: `${data.modelsReferencing} / ${data.modelsTracked}`, ic: Cpu, color: "#2563EB", trend: data.modelsReferencing === data.modelsTracked ? "Full coverage" : `${data.modelsTracked - data.modelsReferencing} not yet referencing`, spark: [], chip: data.modelsReferencing === data.modelsTracked ? "Complete" : "Partial" },
        { label: "Avg. Opportunity Score", val: `${data.avgOpportunityScore}`, ic: TrendingUp, color: "#7C3AED", trend: "across top real sources", spark: [], chip: data.avgOpportunityScore >= 60 ? "High upside" : "Moderate" },
      ]
    : [];

  return (
    <div className="flex-1 p-8 bg-[#f8fafc] text-slate-900 min-h-screen pb-24">
      {/* PAGE HEADER */}
      <div className="flex flex-col lg:flex-row justify-between lg:items-start mb-8 gap-4">
        <div className="max-w-2xl">
          <h1 className="text-[28px] font-space-grotesk font-bold tracking-tight text-slate-900">
            Citation Intelligence
          </h1>
          <p className="text-[14px] text-slate-500 mt-1 leading-relaxed">
            Real, AI-judged sources most likely to influence how AI engines cite your brand —
            re-scored on a 7-day cadence.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-[13px] font-semibold">
          <div className="flex bg-slate-100 p-0.5 rounded-lg">
            {RANGE_OPTIONS.map((r) => (
              <button
                key={r.value}
                onClick={() => setRange(r.value)}
                className={`px-3 py-1 rounded-md transition-colors ${r.value === range ? "bg-white shadow-sm text-slate-800" : "text-slate-500 hover:text-slate-700"}`}
              >
                {r.label}
              </button>
            ))}
          </div>
          <div className="text-slate-400 text-[12px] uppercase font-bold whitespace-nowrap">
            {data?.lastScanDate ? `Scanned ${data.lastScanDate}` : "No scan yet"}
          </div>
        </div>
      </div>

      {isLoading && !data ? (
        <div className="py-24 flex flex-col items-center justify-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin" />
          <p className="text-sm text-slate-500">Loading real citation data…</p>
        </div>
      ) : (
        <>
          {/* SECTION 1 — KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
            {kpis.map((k, i) => (
              <Card key={i} className="h-[150px] relative overflow-hidden group hover:border-slate-300 transition-colors">
                <CardContent className="p-5 flex flex-col justify-between h-full">
                  <div className="flex justify-between items-start mb-2">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-50" style={{ color: k.color }}>
                      <k.ic className="w-5 h-5" />
                    </div>
                    <Badge className="text-[11px] font-bold bg-slate-100 text-slate-600">{k.chip}</Badge>
                  </div>
                  <div>
                    <div className="text-[13px] font-medium text-slate-500 mb-0.5">{k.label}</div>
                    <div className="text-[26px] font-space-grotesk font-bold tracking-tight">{k.val}</div>
                  </div>
                  <div className="absolute bottom-4 right-5 flex items-end gap-3 text-right">
                    <div className={`text-[12px] font-semibold flex items-center gap-1 ${isPositive(k.trend) ? "text-emerald-500" : "text-red-500"}`}>
                      {isPositive(k.trend) ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                      {k.trend}
                    </div>
                    {k.spark.length > 0 && (
                      <svg viewBox="0 0 90 30" preserveAspectRatio="none" className="w-[60px] h-[24px] opacity-70">
                        <polyline points={getSparkline(k.spark)} fill="none" stroke={k.color} strokeWidth="2.5" />
                      </svg>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* SECTION 2 — Platform distribution */}
          <div className="mb-10">
            <div className="mb-4">
              <h2 className="text-[17px] font-bold flex items-center gap-2"><PieChart className="w-5 h-5 text-indigo-500" /> AI Citation Distribution</h2>
              <p className="text-[13px] text-slate-500">How each AI platform cites your brand — real per-platform visibility and quality.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {(data?.platforms ?? []).map((p, i) => (
                <Card key={i}>
                  <CardContent className="p-5">
                    <div className="flex items-center gap-3 mb-5">
                      <LogoAvatar
                        logoUrl={getPlatformLogoUrl(p.name)}
                        fallbackInitial={p.name[0]}
                        fallbackColor={platformColor(p.name)}
                        className="rounded-md text-[15px]"
                        size={36}
                      />
                      <div>
                        <div className="text-[14.5px] font-bold">{p.name}</div>
                        <div className="text-[12px] text-slate-500">{p.citations} citation signal</div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 mb-5">
                      <div>
                        <div className="flex justify-between text-[12px] font-semibold text-slate-600 mb-1.5">
                          <span>Visibility</span><span>{p.visibility}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${p.visibility}%`, backgroundColor: platformColor(p.name) }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-[12px] font-semibold text-slate-600 mb-1.5">
                          <span>Citation quality</span><span>{p.quality}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${p.quality}%`, backgroundColor: getMatColor(p.quality) }} />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <Badge className={`text-[11px] font-bold ${statusChip(p.status)}`}>{p.status}</Badge>
                      <span className={`text-[12px] font-semibold flex items-center gap-1 ${p.growthPct >= 0 ? "text-emerald-500" : "text-red-500"}`}>
                        {p.growthPct >= 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />} {p.growthPct}%
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {(data?.platforms ?? []).length === 0 && (
                <p className="text-sm text-slate-500 col-span-full text-center py-8">No platform data yet.</p>
              )}
            </div>
          </div>

          {/* SECTION 3 — Top citation sources */}
          <div className="mb-10">
            <div className="flex items-end justify-between mb-4">
              <div>
                <h2 className="text-[17px] font-bold flex items-center gap-2"><Award className="w-5 h-5 text-amber-500" /> Top Citation Sources</h2>
                <p className="text-[13px] text-slate-500">The real external sources AI models are most likely to cite for your industry.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {(data?.topSources ?? []).map((c, i) => (
                <Card key={i}>
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="min-w-0">
                        <div className="text-[14.5px] font-bold truncate text-slate-900">{c.source}</div>
                        <div className="text-[12.5px] text-slate-500">{c.category}</div>
                      </div>
                      <a href={`https://${c.source.replace(/^https?:\/\//, "")}`} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 text-slate-400 hover:text-indigo-600 shrink-0" />
                      </a>
                    </div>

                    <div className="flex gap-4 mb-4">
                      <div className="flex-1">
                        <div className="text-[11px] font-semibold text-slate-500 mb-1">Authority</div>
                        <div className="text-[15px] font-mono font-bold" style={{ color: getMatColor(c.authorityScore) }}>{c.authorityScore}</div>
                      </div>
                      <div className="flex-1">
                        <div className="text-[11px] font-semibold text-slate-500 mb-1">Influence</div>
                        <div className="text-[15px] font-mono font-bold" style={{ color: getMatColor(c.influenceScore) }}>{c.influenceScore}</div>
                      </div>
                      <div className="flex-1">
                        <div className="text-[11px] font-semibold text-slate-500 mb-1">Cite freq.</div>
                        <div className="text-[15px] font-mono font-bold" style={{ color: getMatColor(c.citationFrequency) }}>{c.citationFrequency}</div>
                      </div>
                    </div>

                    <p className="text-[12px] text-slate-500 leading-relaxed pt-3 border-t border-slate-100">{c.reason}</p>
                  </CardContent>
                </Card>
              ))}
              {(data?.topSources ?? []).length === 0 && (
                <p className="text-sm text-slate-500 col-span-full text-center py-8">No source data yet.</p>
              )}
            </div>
          </div>

          {/* SECTION 4 & 5 GRID: Scan history + Opportunities */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* SCAN HISTORY */}
            <div className="xl:col-span-2">
              <div className="mb-4">
                <h2 className="text-[17px] font-bold flex items-center gap-2"><History className="w-5 h-5 text-indigo-500" /> Citation Scan History</h2>
                <p className="text-[13px] text-slate-500">Real weekly re-scores of citation quality over time.</p>
              </div>
              <Card className="overflow-hidden py-0">
                <div className="max-h-[460px] overflow-y-auto">
                  {(data?.qualityHistory ?? []).slice().reverse().map((h, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 border-b border-slate-50 last:border-0">
                      <div className="w-24 pt-1 text-[12px] font-medium text-slate-400 shrink-0 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" /> {h.date}
                      </div>
                      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full bg-indigo-500" style={{ width: `${h.score}%` }} />
                      </div>
                      <div className="w-10 text-right font-mono text-[13px] font-bold text-slate-700">{h.score}</div>
                    </div>
                  ))}
                  {(data?.qualityHistory ?? []).length === 0 && (
                    <p className="text-sm text-slate-500 text-center py-8">No scan history yet — check back after the next weekly scan.</p>
                  )}
                </div>
              </Card>
            </div>

            {/* OPPORTUNITIES */}
            <div>
              <div className="mb-4">
                <h2 className="text-[17px] font-bold flex items-center gap-2"><Lightbulb className="w-5 h-5 text-amber-500" /> Opportunities</h2>
                <p className="text-[13px] text-slate-500">Real sources with the highest AI-judged upside for new citations.</p>
              </div>
              <div className="flex flex-col gap-4">
                {(data?.opportunities ?? []).map((o, i) => (
                  <Card key={i} className="relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-amber-500" />
                    <CardContent className="p-5">
                      <div className="flex justify-between items-start mb-3">
                        <div className="font-bold text-[14px] text-slate-900 w-[70%]">{o.source}</div>
                        <Badge className="text-[10px] font-bold uppercase bg-amber-50 text-amber-600">{o.category}</Badge>
                      </div>

                      <div className="flex justify-between text-[11px] font-semibold text-slate-500 mb-1.5 mt-4">
                        <span>Opportunity: <span className="text-indigo-600 font-mono text-[13px]">{o.opportunityScore}</span></span>
                        <span>Competitor coverage: <span className="text-slate-900 font-mono text-[13px]">{o.competitorCoverage}</span></span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden mb-3">
                        <div className="h-full rounded-full bg-amber-500" style={{ width: `${o.opportunityScore}%` }} />
                      </div>

                      <div className="text-[12px] text-slate-500 flex items-start gap-1.5 mt-3 leading-relaxed">
                        <Info className="w-3.5 h-3.5 mt-0.5 shrink-0 text-slate-400" /> {o.reason}
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {(data?.opportunities ?? []).length === 0 && (
                  <p className="text-sm text-slate-500 text-center py-8">No opportunities identified yet.</p>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
