"use client";

import React, { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useOrganizationStore } from "@/lib/stores/organizationStore";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getGeoDashboard, GeoDashboardData } from "@/lib/api/dashboardApi";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

/* ── data ────────────────────────────────────────────── */
const DATE_RANGES = [
  { k: "7D", lbl: "7 days" },
  { k: "30D", lbl: "30 days" },
  { k: "90D", lbl: "90 days" },
  { k: "1Y", lbl: "12 months" },
] as const;

interface ScoreCard {
  label: string;
  icon: string;
  iconColor: string;
  value: number;
  change: string;
  direction: "up" | "down";
  delay: number;
}

const SCORE_META: {
  label: string;
  icon: string;
  iconColor: string;
  delay: number;
  key: string;
}[] = [
  {
    label: "AI Visibility Score",
    icon: "ti-eye",
    iconColor: "#6366F1",
    delay: 0,
    key: "visibilityScore",
  },
  {
    label: "Citation Score",
    icon: "ti-quote",
    iconColor: "#16A34A",
    delay: 50,
    key: "citationScore",
  },
  {
    label: "Sentiment Score",
    icon: "ti-mood-smile",
    iconColor: "#2563EB",
    delay: 100,
    key: "sentimentScore",
  },
  {
    label: "Competitor Score",
    icon: "ti-swords",
    iconColor: "#7C3AED",
    delay: 150,
    key: "competitorScore",
  },
  {
    label: "Hallucination Risk",
    icon: "ti-alert-triangle",
    iconColor: "#B45309",
    delay: 200,
    key: "hallucinationRisk",
  },
  {
    label: "SEO Health",
    icon: "ti-world",
    iconColor: "#0EA5E9",
    delay: 250,
    key: "seoHealth",
  },
  {
    label: "AEO Readiness",
    icon: "ti-search",
    iconColor: "#DB2777",
    delay: 300,
    key: "aeoReadiness",
  },
  {
    label: "GEO Readiness",
    icon: "ti-target",
    iconColor: "#16A34A",
    delay: 350,
    key: "geoReadiness",
  },
];

/* ── helpers ──────────────────────────────────────────── */
function formatTimestamp(iso: string): string {
  const now = new Date();
  const ts = new Date(iso);
  const diffMs = now.getTime() - ts.getTime();
  const diffH = Math.floor(diffMs / (1000 * 60 * 60));
  const diffD = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffH < 1) return "Just now";
  if (diffH < 24) return `${diffH}h ago`;
  if (diffD === 1) return "Yesterday";
  return `${diffD}d ago`;
}

const soft = (hex: string) => {
  const r = hex.replace(/^#/, "").match(/.{2}/g)?.map((h) => parseInt(h, 16)) || [0, 0, 0];
  return `rgba(${r[0]},${r[1]},${r[2]},.13)`;
};

/* ── page component ──────────────────────────────────── */
export default function GeoDashboardPage() {
  const [activeRange, setActiveRange] = useState<string>("30D");
  const organizationId = useOrganizationStore((state) => state.organizationId);
  const router = useRouter();
  const [scoreCards, setScoreCards] = useState<ScoreCard[]>([]);
  const [trendData, setTrendData] = useState<{ day: number; score: number }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasData, setHasData] = useState<boolean | null>(null);

  // API sections
  const [header, setHeader] = useState<{
    compositeScore: number;
    grade: string;
    industryAverage: number;
    deltaVsIndustry: number;
    compositeChange: string;
    enginesScanned: number;
    promptsTracked: number;
    status: string;
  } | null>(null);

  const [pillars, setPillars] = useState<
    { key: string; label: string; description: string; score: number }[]
  >([]);

  const [weakestPillarInsight, setWeakestPillarInsight] = useState<{
    pillarKey: string;
    score: number;
    message: string;
    ctaLabel: string;
    ctaLink: string;
  } | null>(null);

  const [promptCoverage, setPromptCoverage] = useState<
    {
      type: string;
      example: string;
      note: string;
      percentage: number;
      direction: string;
    }[]
  >([]);

  const [opportunityInsight, setOpportunityInsight] = useState<{
    message: string;
    ctaLabel: string;
    ctaLink: string;
  } | null>(null);

  const [winsAndLosses, setWinsAndLosses] = useState<
    { type: string; title: string; engine: string; timestamp: string }[]
  >([]);

  const [verifyInsight, setVerifyInsight] = useState<{
    message: string;
    ctaLabel: string;
    ctaLink: string;
  } | null>(null);

  useEffect(() => {
    if (!organizationId) return;

    async function fetchData() {
      setIsLoading(true);
      try {
        const data: GeoDashboardData = await getGeoDashboard(organizationId as string, activeRange);

        setHasData(data.hasData);

        const cards: ScoreCard[] = SCORE_META.map((meta) => {
          const entry = (data.scores as unknown as Record<string, { value: number; change: string; direction: "up" | "down" }>)[meta.key];
          return {
            label: meta.label,
            icon: meta.icon,
            iconColor: meta.iconColor,
            delay: meta.delay,
            value: entry?.value ?? 0,
            change: entry?.change ?? "+0%",
            direction: entry?.direction ?? "up",
          };
        });
        setScoreCards(cards);

        setTrendData(data.trend || []);
        setHeader(data.header || null);
        setPillars(data.pillars || []);
        setWeakestPillarInsight(data.weakestPillarInsight || null);
        setPromptCoverage(data.promptTypeCoverage || []);
        setOpportunityInsight(data.opportunityInsight || null);
        setWinsAndLosses(data.winsAndLosses || []);
        setVerifyInsight(data.verifyInsight || null);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load the GEO dashboard");
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [organizationId, activeRange]);

  const handleExport = useCallback(() => {
    if (!header) {
      toast.error("Nothing to export yet — run a GEO scan first");
      return;
    }

    const rows: string[] = ["Metric,Value,Change"];
    SCORE_META.forEach((meta, i) => {
      const card = scoreCards[i];
      if (card) rows.push(`${card.label},${card.value},${card.change}`);
    });
    rows.push("");
    rows.push(`Composite Score,${header.compositeScore},${header.compositeChange}`);
    rows.push(`Grade,${header.grade},`);
    rows.push(`Industry Average,${header.industryAverage},`);
    rows.push("");
    rows.push("Pillar,Score");
    pillars.forEach((p) => rows.push(`${p.label},${p.score}`));
    rows.push("");
    rows.push("Prompt Type,Coverage %,Direction");
    promptCoverage.forEach((p) => rows.push(`${p.type},${p.percentage},${p.direction}`));

    const csv = rows.join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `geo-dashboard-${activeRange}-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success("GEO dashboard report exported");
  }, [header, scoreCards, pillars, promptCoverage, activeRange]);

  const handleInsightClick = useCallback((link?: string) => {
    if (link) router.push(link);
  }, [router]);

  const activeRangeObj = DATE_RANGES.find((r) => r.k === activeRange) || DATE_RANGES[1];

  const comp = header?.compositeScore ?? 0;
  const grade = header?.grade ?? "—";
  const industryAvg = header?.industryAverage ?? 0;
  const deltaVsIndustry = header?.deltaVsIndustry ?? 0;

  const r = 44;
  const circ = 2 * Math.PI * r;
  const off = circ * (1 - comp / 100);

  return (
    <div className="p-6 md:p-8 max-w-[1400px] mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-300">
      
      {/* HERO SECTION */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-8 border-b border-border/50">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
          
          {/* Ring Chart */}
          <div className="relative w-[110px] h-[110px] shrink-0">
            <svg viewBox="0 0 110 110" className="w-full h-full drop-shadow-sm">
              <circle cx="55" cy="55" r={r} fill="none" stroke="currentColor" className="text-muted/30" strokeWidth="9" />
              <circle
                cx="55"
                cy="55"
                r={r}
                fill="none"
                stroke="url(#gxGrad)"
                strokeWidth="9"
                strokeLinecap="round"
                strokeDasharray={circ}
                strokeDashoffset={off}
                transform="rotate(-90 55 55)"
                style={{ transition: "stroke-dashoffset 1s ease-in-out" }}
              />
              <defs>
                <linearGradient id="gxGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#6366F1" />
                  <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
              </defs>
              <text x="55" y="52" textAnchor="middle" className="text-3xl font-bold fill-foreground tracking-tighter">
                {comp}
              </text>
              <text x="55" y="68" textAnchor="middle" className="text-[11px] font-semibold fill-muted-foreground">
                /100
              </text>
            </svg>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-muted/50 border border-border/50">
                <span className={`w-2 h-2 rounded-full ${header?.status === "live" ? "bg-emerald-500 animate-pulse" : "bg-amber-500"}`} />
                {header?.status === "live" ? "LIVE" : "STALE"}
              </div>
              EXECUTIVE GEO DASHBOARD
            </div>
            <h1 className="text-3xl font-bold tracking-tight">GEO composite: grade {grade}</h1>
            <p className="text-muted-foreground text-[15px] max-w-2xl leading-relaxed">
              Your Generative Engine Optimization performance over the last {activeRangeObj.lbl} — industry average is <b className="text-foreground font-semibold">{industryAvg}</b>, you&apos;re <b className={`font-semibold ${deltaVsIndustry >= 0 ? "text-emerald-600" : "text-red-600"}`}>{deltaVsIndustry >= 0 ? "+" : ""}{deltaVsIndustry}</b> {deltaVsIndustry >= 0 ? "ahead" : "behind"}.
            </p>
            
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-1">
              <Badge variant="secondary" className="bg-primary/5 text-primary hover:bg-primary/10 transition-colors py-1 px-2.5">
                <i className="ti ti-trending-up mr-1.5 text-sm" /> {header?.compositeChange ?? "+0%"} composite
              </Badge>
              <Badge variant="secondary" className="bg-primary/5 text-primary hover:bg-primary/10 transition-colors py-1 px-2.5">
                <i className="ti ti-cpu mr-1.5 text-sm" /> {header?.enginesScanned ?? 0} engines scanned
              </Badge>
              <Badge variant="secondary" className="bg-primary/5 text-primary hover:bg-primary/10 transition-colors py-1 px-2.5">
                <i className="ti ti-message-2 mr-1.5 text-sm" /> {header?.promptsTracked ?? 0} prompts tracked
              </Badge>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 items-center lg:items-end">
          <div className="flex items-center rounded-lg border p-1 bg-muted/20">
            {DATE_RANGES.map((r) => (
              <Button
                key={r.k}
                variant={activeRange === r.k ? "secondary" : "ghost"}
                size="sm"
                className={`h-8 px-4 text-xs font-medium ${activeRange === r.k ? 'shadow-sm' : ''}`}
                onClick={() => setActiveRange(r.k)}
              >
                {r.k}
              </Button>
            ))}
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button variant="outline" className="flex-1 lg:flex-none" onClick={handleExport}>
              <i className="ti ti-download mr-2" /> Export
            </Button>
          </div>
        </div>
      </div>

      {!isLoading && hasData === false && (
        <Card className="border-amber-500/30 bg-amber-500/5">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-amber-500/15 text-amber-600 flex items-center justify-center shrink-0">
              <i className="ti ti-alert-circle text-xl" />
            </div>
            <div className="text-sm">
              <div className="font-semibold text-foreground mb-0.5">No GEO analysis yet</div>
              Complete onboarding analysis for this organization — your first GEO scan runs automatically and refreshes every 7 days after that.
            </div>
          </CardContent>
        </Card>
      )}

      {/* SCORECARD GRID */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
            <i className="ti ti-gauge text-muted-foreground" /> GEO scorecard
          </h2>
          <span className="text-sm text-muted-foreground hidden sm:block">Click any score for drivers & fixes</span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {scoreCards.map((card) => {
            const good = card.label === "Hallucination Risk" ? card.change.startsWith("-") : card.change.startsWith("+");

            return (
              <Card key={card.label} className="cursor-pointer hover:border-primary/40 transition-all duration-300 group">
                <CardContent className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[13px] font-semibold text-muted-foreground">{card.label}</span>
                    <div className="p-1.5 rounded-md shrink-0 transition-transform group-hover:scale-110" style={{ backgroundColor: soft(card.iconColor), color: card.iconColor }}>
                      <i className={`ti ${card.icon} text-sm`} />
                    </div>
                  </div>

                  <div className="flex items-baseline gap-1 mb-3">
                    <span className="text-3xl font-bold tracking-tighter">{card.value}</span>
                    <span className="text-sm font-medium text-muted-foreground/60">/100</span>
                  </div>

                  <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden mb-4">
                    <div className="h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${card.value}%`, backgroundColor: card.iconColor }} />
                  </div>

                  <div className={`text-xs font-semibold flex items-center gap-1 ${good ? 'text-emerald-600' : 'text-red-600'}`}>
                    <i className={`ti ti-trending-${good ? "up" : "down"} text-sm`} />
                    {card.change} <span className="text-muted-foreground font-medium ml-1">vs prev {activeRangeObj.lbl}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* TWO COLUMN SECTIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* LEFT COLUMN */}
        <div className="space-y-6">
          
          <Card className="flex flex-col overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">AI visibility trend</CardTitle>
              <CardDescription>Composite score across the selected timeframe, vs industry average.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 p-0 px-2 pb-4">
              <div className="h-[260px] w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  {trendData.length > 0 ? (
                    <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="geoTrendGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#6366F1" stopOpacity={0.15} />
                          <stop offset="100%" stopColor="#6366F1" stopOpacity={0.02} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="day" tick={{ fill: "#94A3B8", fontSize: 10 }} axisLine={false} tickLine={false} interval="preserveStartEnd" />
                      <YAxis domain={[0, 100]} tick={{ fill: "#94A3B8", fontSize: 11 }} axisLine={false} tickLine={false} tickCount={5} />
                      <Tooltip
                        contentStyle={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12, boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                        labelFormatter={(v) => "Day " + v}
                        formatter={(v) => ["Score: " + v, ""]}
                      />
                      <Area type="monotone" dataKey="score" stroke="#6366F1" strokeWidth={2.5} fill="url(#geoTrendGrad)" dot={false} />
                    </AreaChart>
                  ) : (
                    <div className="flex items-center justify-center h-full text-muted-foreground text-sm">No trend data yet.</div>
                  )}
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-lg">GEO pillars — site-wide</CardTitle>
              <CardDescription>Aggregate across all indexed pages. The Page auditor scores these per-URL.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5 flex-1">
              {pillars.map((p) => {
                const tone = p.score >= 80 ? "text-emerald-600" : p.score >= 65 ? "text-amber-500" : "text-red-600";
                const bgTone = p.score >= 80 ? "bg-emerald-500" : p.score >= 65 ? "bg-amber-500" : "bg-red-500";
                return (
                  <div key={p.key} className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex flex-col">
                        <span className="font-semibold">{p.label}</span>
                        <span className="text-muted-foreground text-xs">{p.description}</span>
                      </div>
                      <span className={`font-bold text-lg ${tone}`}>{p.score}</span>
                    </div>
                    <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${bgTone}`} style={{ width: `${p.score}%` }} />
                    </div>
                  </div>
                );
              })}
            </CardContent>
            {weakestPillarInsight && (
              <div className="bg-primary/5 p-4 flex items-center justify-between border-t border-primary/10 cursor-pointer hover:bg-primary/10 transition-colors group" onClick={() => handleInsightClick(weakestPillarInsight.ctaLink)}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0">
                    <i className="ti ti-stethoscope text-lg" />
                  </div>
                  <div className="text-sm">
                    Weakest pillar: <b className="font-semibold">{pillars.find((p) => p.key === weakestPillarInsight.pillarKey)?.label ?? weakestPillarInsight.pillarKey} ({weakestPillarInsight.score})</b> — {weakestPillarInsight.message}
                  </div>
                </div>
                <div className="text-xs font-bold text-primary shrink-0 group-hover:translate-x-1 transition-transform">
                  {weakestPillarInsight.ctaLabel} &rarr;
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-lg">Prompt-type coverage</CardTitle>
              <CardDescription>Where you show up across the five buyer-intent prompt families.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5 flex-1">
              {promptCoverage.map((p) => {
                const isGood = p.percentage >= 75;
                const isWarn = p.percentage >= 55 && p.percentage < 75;
                const tone = isGood ? "text-emerald-600" : isWarn ? "text-amber-500" : "text-red-600";
                const bgTone = isGood ? "bg-emerald-500" : isWarn ? "bg-amber-500" : "bg-red-500";
                const arr = p.direction === "up" ? "ti-trending-up" : p.direction === "down" ? "ti-trending-down" : "ti-minus";
                
                return (
                  <div key={p.type} className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex flex-col">
                        <span className="font-semibold flex items-center gap-1.5">
                          {p.type} <i className={`ti ${arr} ${tone} text-xs`} />
                        </span>
                        <span className="text-muted-foreground text-xs">{p.example} — {p.note}</span>
                      </div>
                      <span className={`font-bold text-lg ${tone}`}>{p.percentage}%</span>
                    </div>
                    <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${bgTone}`} style={{ width: `${p.percentage}%` }} />
                    </div>
                  </div>
                );
              })}
            </CardContent>
            {opportunityInsight && (
              <div className="bg-primary/5 p-4 flex items-center justify-between border-t border-primary/10 cursor-pointer hover:bg-primary/10 transition-colors group" onClick={() => handleInsightClick(opportunityInsight.ctaLink)}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0">
                    <i className="ti ti-bulb text-lg" />
                  </div>
                  <div className="text-sm">
                    {opportunityInsight.message}
                  </div>
                </div>
                <div className="text-xs font-bold text-primary shrink-0 group-hover:translate-x-1 transition-transform">
                  {opportunityInsight.ctaLabel} &rarr;
                </div>
              </div>
            )}
          </Card>

          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-lg">Wins & losses</CardTitle>
              <CardDescription>Recent answer-slot movements across engines.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 space-y-3">
              {winsAndLosses.map((m, i) => (
                <div key={i} className={`flex items-start gap-4 p-3 rounded-lg border ${m.type === "win" ? "bg-emerald-500/5 border-emerald-500/20" : "bg-red-500/5 border-red-500/20"}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${m.type === "win" ? "bg-emerald-500/10 text-emerald-600" : "bg-red-500/10 text-red-600"}`}>
                    <i className={`ti ti-arrow-${m.type === "win" ? "up" : "down"}-right text-lg`} />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-[14px] leading-snug">{m.title}</span>
                    <span className="text-xs text-muted-foreground mt-1">
                      <span className="font-medium text-foreground uppercase tracking-wider">{m.engine}</span> &middot; {formatTimestamp(m.timestamp)}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
            {verifyInsight && (
              <div className="bg-primary/5 p-4 flex items-center justify-between border-t border-primary/10 cursor-pointer hover:bg-primary/10 transition-colors group" onClick={() => handleInsightClick(verifyInsight.ctaLink)}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0">
                    <i className="ti ti-flask text-lg" />
                  </div>
                  <div className="text-sm">
                    {verifyInsight.message}
                  </div>
                </div>
                <div className="text-xs font-bold text-primary shrink-0 group-hover:translate-x-1 transition-transform">
                  {verifyInsight.ctaLabel} &rarr;
                </div>
              </div>
            )}
          </Card>

        </div>
      </div>
      
    </div>
  );
}
