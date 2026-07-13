"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  HeartPulse, ShieldCheck, MessageSquare, Award,
  AlertTriangle, MessageSquareOff, TrendingUp, TrendingDown,
  ChevronDown, Download, ArrowUpRight,
  Minus, Flag, Link as LinkIcon, Route, FileUp, ShieldAlert
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useOrganizationStore } from "@/lib/stores/organizationStore";
import { getBrandPulse, BrandPulseResponse } from "@/lib/api/brandPulseApi";
import { getPlatformLogoUrl } from "@/lib/logoUtils";
import { LogoAvatar } from "@/components/ui/logo-avatar";

const ALERT_STYLE: Record<string, { ic: typeof AlertTriangle; color: string; bg: string }> = {
  risk: { ic: AlertTriangle, color: "text-red-500", bg: "bg-red-50" },
  warning: { ic: MessageSquareOff, color: "text-amber-500", bg: "bg-amber-50" },
  win: { ic: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-50" },
};

function getSentStyle(s: string) {
  if (s === "pos") return { text: "Positive", className: "text-emerald-600 bg-emerald-50", dot: "bg-emerald-500" };
  if (s === "neg") return { text: "Negative", className: "text-red-600 bg-red-50", dot: "bg-red-500" };
  return { text: "Neutral", className: "text-slate-600 bg-slate-100", dot: "bg-slate-400" };
}

function getSparkline(data: number[]) {
  const w = 90, h = 30;
  if (data.length === 0) return `0,${h / 2} ${w},${h / 2}`;
  if (data.length === 1) return `0,${h / 2} ${w},${h / 2}`;
  const mn = Math.min(...data), mx = Math.max(...data), rng = mx - mn || 1;
  return data.map((v, i) => `${(i / (data.length - 1) * w).toFixed(1)},${(h - ((v - mn) / rng) * h).toFixed(1)}`).join(" ");
}

function deltaDirection(delta: string): "up" | "down" | "flat" {
  const trimmed = delta.trim();
  if (trimmed.startsWith("+")) return "up";
  if (trimmed.startsWith("-")) return "down";
  return "flat";
}

const RANGE_OPTIONS: Array<"7D" | "30D" | "90D"> = ["7D", "30D", "90D"];

export default function BrandPulsePage() {
  const { organizationId } = useOrganizationStore();
  const [range, setRange] = useState<"7D" | "30D" | "90D">("30D");
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<BrandPulseResponse | null>(null);

  const fetchData = useCallback(async () => {
    if (!organizationId) return;
    setIsLoading(true);
    try {
      const res = await getBrandPulse(organizationId, range);
      setData(res);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load brand pulse data");
    } finally {
      setIsLoading(false);
    }
  }, [organizationId, range]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const metrics = useMemo(() => {
    if (!data) return [];
    return [
      { ic: HeartPulse, tone: "text-emerald-500", stroke: "#10B981", label: "Brand health", val: data.brandHealth, unit: "/100", chg: data.healthDelta, trend: data.metricHistory.health },
      { ic: ShieldCheck, tone: "text-orange-500", stroke: "#F97316", label: "AI confidence", val: data.aiConfidence, unit: "%", chg: data.confidenceDelta, trend: data.metricHistory.confidence },
      { ic: MessageSquare, tone: "text-amber-500", stroke: "#F59E0B", label: "Messaging consistency", val: data.messagingConsistency, unit: "%", chg: data.messagingDelta, trend: data.metricHistory.messaging },
      { ic: Award, tone: "text-purple-500", stroke: "#A855F7", label: "Brand trust", val: data.brandTrust, unit: "/100", chg: data.trustDelta, trend: data.metricHistory.trust },
    ];
  }, [data]);

  if (!isLoading && data && !data.hasData) {
    return (
      <div className="flex-1 p-8 min-h-screen flex items-center justify-center">
        <Card className="max-w-md p-10 text-center">
          <ShieldAlert className="w-10 h-10 text-amber-500 mx-auto mb-4" />
          <h2 className="text-lg font-bold mb-2">No brand pulse data yet</h2>
          <p className="text-sm text-slate-500">
            Complete onboarding analysis for this organization first — brand pulse populates
            automatically from real prompt, competitor and visibility data once that's done.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex-1 p-8 bg-[#f8fafc] text-slate-900 min-h-screen pb-24">
      {/* PAGE HEADER */}
      <div className="flex flex-col lg:flex-row justify-between lg:items-start mb-8 gap-4">
        <div className="max-w-2xl">
          <h1 className="text-[28px] font-space-grotesk font-bold tracking-tight text-slate-900">
            Brand Pulse
          </h1>
          <p className="text-[14px] text-slate-500 mt-1 leading-relaxed">
            Real, AI-judged brand perception across every AI model you're monitored on — re-scored on a 7-day cadence.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-[13px] font-semibold">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 text-slate-600 rounded-[8px]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            {data?.modelInsights.length ?? 0} models monitored
          </div>
          <div className="flex bg-slate-200/60 p-0.5 rounded-lg">
            {RANGE_OPTIONS.map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={`px-3 py-1 rounded-md transition-colors ${range === r ? "bg-white shadow-sm text-slate-800" : "text-slate-500 hover:text-slate-700"}`}
              >
                {r}
              </button>
            ))}
          </div>
          <Button variant="outline" size="sm" onClick={() => toast.info("Export coming soon")}>
            <Download className="w-3.5 h-3.5" /> Export <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </Button>
        </div>
      </div>

      {isLoading && !data ? (
        <div className="py-24 flex flex-col items-center justify-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin" />
          <p className="text-sm text-slate-500">Loading real brand pulse data…</p>
        </div>
      ) : (
        <>
          {/* ALERTS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {(data?.alerts ?? []).map((a, i) => {
              const style = ALERT_STYLE[a.type] ?? ALERT_STYLE.warning;
              const Icon = style.ic;
              return (
                <Card key={i}>
                  <CardContent className="p-4 flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${style.bg} ${style.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[13.5px] font-bold text-slate-900">{a.title}</div>
                      <div className="text-[12px] text-slate-500 mt-0.5">{a.message}</div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
            {(data?.alerts ?? []).length === 0 && (
              <p className="text-sm text-slate-500 col-span-full text-center py-4">No alerts this scan.</p>
            )}
          </div>

          {/* SECTION: Executive Metrics */}
          <h2 className="text-[12px] font-bold text-slate-400 uppercase tracking-wider mb-4 px-1">Executive metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
            {metrics.map((m, i) => {
              const dir = deltaDirection(m.chg);
              return (
                <Card key={i} className="relative group hover:border-indigo-200 transition-colors">
                  <CardContent className="p-5 flex flex-col">
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowUpRight className="w-4 h-4 text-slate-400" />
                    </div>
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-[13.5px] font-semibold text-slate-600">{m.label}</span>
                      <m.ic className={`w-5 h-5 ${m.tone}`} />
                    </div>

                    <div className="flex items-end gap-3 mb-2">
                      <div className="text-[28px] font-space-grotesk font-bold leading-none">
                        {m.val}<span className="text-[14px] font-sans text-slate-400 font-medium ml-0.5">{m.unit}</span>
                      </div>
                    </div>

                    <div className="my-4 h-[30px] opacity-70">
                      <svg viewBox="0 0 90 30" preserveAspectRatio="none" className="w-full h-full">
                        <polyline points={getSparkline(m.trend)} fill="none" stroke={m.stroke} strokeWidth="2.5" />
                      </svg>
                    </div>

                    <div className="flex items-center gap-1.5 text-[12px] font-medium pt-3 border-t border-slate-100">
                      <span className={`flex items-center ${dir === "up" ? "text-emerald-500" : dir === "down" ? "text-amber-500" : "text-slate-400"}`}>
                        {dir === "up" ? <TrendingUp className="w-3.5 h-3.5 mr-1" /> : dir === "down" ? <TrendingDown className="w-3.5 h-3.5 mr-1" /> : <Minus className="w-3.5 h-3.5 mr-1" />}
                        {m.chg}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* SECTION: Overall Perception */}
          <h2 className="text-[12px] font-bold text-slate-400 uppercase tracking-wider mb-4 px-1">Overall perception</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-10">
            {/* Sentiment Mix */}
            <Card>
              <CardContent className="p-6">
                <div className="mb-6">
                  <h3 className="text-[15px] font-bold text-slate-900">Sentiment mix</h3>
                  <p className="text-[13px] text-slate-500">How AI answers feel about your brand across all monitored prompts.</p>
                </div>

                <div className="flex h-3 w-full rounded-full overflow-hidden mb-6">
                  <div style={{ width: `${data?.sentimentMix.positive ?? 0}%` }} className="bg-emerald-500" />
                  <div style={{ width: `${data?.sentimentMix.neutral ?? 0}%` }} className="bg-slate-300" />
                  <div style={{ width: `${data?.sentimentMix.negative ?? 0}%` }} className="bg-red-500" />
                </div>

                <div className="flex gap-6">
                  <div className="flex items-center gap-2 text-[13px] font-medium text-slate-700">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Positive {data?.sentimentMix.positive ?? 0}%
                  </div>
                  <div className="flex items-center gap-2 text-[13px] font-medium text-slate-700">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-300" /> Neutral {data?.sentimentMix.neutral ?? 0}%
                  </div>
                  <div className="flex items-center gap-2 text-[13px] font-medium text-slate-700">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500" /> Negative {data?.sentimentMix.negative ?? 0}%
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Share of perception */}
            <Card>
              <CardContent className="p-6 flex">
                <div className="flex-1">
                  <h3 className="text-[15px] font-bold text-slate-900">Share of perception</h3>
                  <p className="text-[13px] text-slate-500 mb-4">Your presence in AI answers vs. real competitors.</p>
                  <div className="flex flex-col gap-2.5">
                    {(data?.shareOfPerception ?? []).map((c, i) => (
                      <div key={i} className="flex items-center gap-2 text-[12.5px] font-medium text-slate-700">
                        <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: c.color }} />
                        <span className="w-[100px] truncate">{c.name}</span>
                        <span className="text-slate-900 font-bold">{c.value}%</span>
                      </div>
                    ))}
                    {(data?.shareOfPerception ?? []).length === 0 && (
                      <p className="text-sm text-slate-500">No competitor data yet.</p>
                    )}
                  </div>
                </div>
                {(data?.shareOfPerception ?? []).length > 0 && (
                  <div className="w-[170px] h-[170px] shrink-0 relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={data?.shareOfPerception} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={2} dataKey="value" stroke="none">
                          {(data?.shareOfPerception ?? []).map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <RechartsTooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "12px", fontWeight: "bold" }} itemStyle={{ color: "#0f172a" }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* SECTION: AI Models */}
          <h2 className="text-[12px] font-bold text-slate-400 uppercase tracking-wider mb-4 px-1">AI models</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
            {(data?.modelInsights ?? []).map((m, i) => {
              const sStyle = getSentStyle(m.sentiment);
              return (
                <Card key={i} className="relative group hover:border-indigo-200 transition-colors">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <LogoAvatar
                        logoUrl={getPlatformLogoUrl(m.platform)}
                        fallbackInitial={m.platform.charAt(0).toUpperCase()}
                        fallbackColor="#64748B"
                        className="rounded-md text-[10px]"
                        size={22}
                      />
                      <span className="text-[14px] font-bold text-slate-800">{m.platform}</span>
                      {m.flag && <span title="Accuracy flag"><AlertTriangle className="w-4 h-4 text-red-500" /></span>}
                    </div>

                    <div className="flex items-end justify-between mb-5">
                      <div className="text-[26px] font-space-grotesk font-bold leading-none">
                        {m.confidence}<span className="text-[13px] font-sans text-slate-400 font-medium ml-1">% conf.</span>
                      </div>
                      <Badge className={`text-[10px] uppercase font-bold tracking-wider ${sStyle.className}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${sStyle.dot}`} />
                        {sStyle.text}
                      </Badge>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100">
                      {m.themes.map((t, ti) => (
                        <Badge key={ti} variant="secondary" className="text-[11px] font-semibold">{t}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
            {(data?.modelInsights ?? []).length === 0 && (
              <p className="text-sm text-slate-500 col-span-full text-center py-8">No model data yet.</p>
            )}
          </div>

          {/* SECTION: Lower grids */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-10">
            {/* Accuracy & Risk */}
            <Card>
              <CardContent className="p-6">
                <div className="mb-5">
                  <h3 className="text-[15px] font-bold text-slate-900">Accuracy &amp; risk</h3>
                  <p className="text-[13px] text-slate-500">Claims in AI answers that need correction.</p>
                </div>
                <div className="flex flex-col gap-4">
                  {(data?.accuracyFlags ?? []).map((a, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100">
                      <Flag className="w-4 h-4 mt-0.5 text-slate-400 shrink-0" />
                      <div>
                        <div className="text-[13px] font-bold text-slate-900 mb-1">
                          {a.claim}
                          <Badge className={`ml-2 text-[10px] uppercase font-bold tracking-wider ${a.severity === "High" ? "bg-red-100 text-red-600" : a.severity === "Medium" ? "bg-amber-100 text-amber-600" : "bg-slate-200 text-slate-600"}`}>
                            {a.severity}
                          </Badge>
                        </div>
                        <div className="text-[12.5px] text-slate-600 leading-relaxed mb-1.5">{a.detail}</div>
                        <div className="text-[11.5px] text-slate-400 font-medium">Seen in: <span className="text-slate-600">{a.models.join(", ")}</span></div>
                      </div>
                    </div>
                  ))}
                  {(data?.accuracyFlags ?? []).length === 0 && (
                    <p className="text-sm text-slate-500 text-center py-4">No accuracy risks flagged this scan.</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Prompt evidence */}
            <Card>
              <CardContent className="p-6">
                <div className="mb-5">
                  <h3 className="text-[15px] font-bold text-slate-900">Prompt evidence</h3>
                  <p className="text-[13px] text-slate-500">Prompts shaping perception and the sources models pulled from.</p>
                </div>
                <div className="flex flex-col gap-0 divide-y divide-slate-100">
                  {(data?.promptEvidence ?? []).map((e, i) => {
                    const sStyle = getSentStyle(e.sentiment);
                    return (
                      <div key={i} className="py-4 first:pt-0 last:pb-0 flex items-start justify-between gap-4">
                        <div>
                          <div className="text-[13px] font-bold text-slate-800 mb-2 leading-snug">&quot;{e.prompt}&quot;</div>
                          <div className="flex flex-wrap gap-3">
                            {e.sources.map((s, si) => (
                              <div key={si} className="flex items-center gap-1 text-[11.5px] text-slate-500">
                                <LinkIcon className="w-3 h-3" /> {s}
                              </div>
                            ))}
                          </div>
                        </div>
                        <Badge className={`shrink-0 text-[10px] uppercase font-bold tracking-wider ${sStyle.className}`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${sStyle.dot}`} />
                          {sStyle.text}
                        </Badge>
                      </div>
                    );
                  })}
                  {(data?.promptEvidence ?? []).length === 0 && (
                    <p className="text-sm text-slate-500 text-center py-4">No prompt evidence yet.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* SECTION: Strategic Actions */}
          <Card>
            <CardContent className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-[15px] font-bold text-slate-900 mb-1">Strategic actions</h3>
                <p className="text-[13px] text-slate-500">Turn brand intelligence into an executive-ready, assignable plan.</p>
              </div>
              <div className="flex items-center gap-3">
                <Button size="sm" onClick={() => toast.info("Action plans coming soon")}>
                  <Route className="w-4 h-4" /> Create action plan
                </Button>
                <Button variant="outline" size="sm" onClick={() => toast.info("Export coming soon")}>
                  <FileUp className="w-4 h-4" /> Export executive report
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
