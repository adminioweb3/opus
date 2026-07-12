"use client";

import React, { useEffect, useMemo, useState, useCallback } from "react";
import { TrendingUp, TrendingDown, ChevronDown, ShieldAlert } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { toast } from "sonner";
import { useOrganizationStore } from "@/lib/stores/organizationStore";
import { getVisibilityRadar, VisibilityRadarResponse, VisibilityPlatform } from "@/lib/api/visibilityRadarApi";
import { getPlatformLogoUrl } from "@/lib/logoUtils";
import { LogoAvatar } from "@/components/ui/logo-avatar";

// ---------------------------------------------------------------------------
// Cosmetic-only per-platform identity (color/initial) — the app has no
// concept of a platform "brand kit" in the DB, so this is a presentation
// lookup keyed by the real platform name the backend returns.
// ---------------------------------------------------------------------------
const PLATFORM_STYLE: Record<string, { initial: string; color: string }> = {
  "ChatGPT": { initial: "C", color: "#10A37F" },
  "Claude": { initial: "C", color: "#D97757" },
  "Gemini": { initial: "G", color: "#4285F4" },
  "Perplexity": { initial: "P", color: "#20808D" },
  "Google AI Overview": { initial: "G", color: "#4285F4" },
  "Microsoft Copilot": { initial: "M", color: "#0078D4" },
  "Meta AI": { initial: "M", color: "#0866FF" },
  "Grok": { initial: "X", color: "#1A1A1A" },
  "DeepSeek": { initial: "D", color: "#4D6BFE" },
};

function platformStyle(name: string) {
  return PLATFORM_STYLE[name] ?? { initial: name.charAt(0).toUpperCase(), color: "#64748B" };
}

const RANGE_OPTIONS: { label: string; value: "7D" | "30D" | "90D" }[] = [
  { label: "Last 7 days", value: "7D" },
  { label: "Last 30 days", value: "30D" },
  { label: "Last 90 days", value: "90D" },
];

const FILTERS = ["All platforms", "Strong", "Solid", "Developing", "Weak"];

function getStatus(label: string) {
  switch (label) {
    case "Strong":
      return { label: "Strong", dot: "#10B981", chip: "bg-emerald-50 text-emerald-600", spark: "#10B981" };
    case "Solid":
      return { label: "Solid", dot: "#06B6D4", chip: "bg-cyan-50 text-cyan-600", spark: "#06B6D4" };
    case "Developing":
      return { label: "Developing", dot: "#F59E0B", chip: "bg-amber-50 text-amber-600", spark: "#F59E0B" };
    default:
      return { label: "Weak", dot: "#EF4444", chip: "bg-red-50 text-red-600", spark: "#EF4444" };
  }
}

function buildSparkPoints(scores: number[]): string {
  if (scores.length === 0) return "0,14 100,14";
  if (scores.length === 1) return "0,14 100,14";
  const min = Math.min(...scores);
  const max = Math.max(...scores);
  const range = max - min || 1;
  return scores
    .map((s, i) => {
      const x = (i / (scores.length - 1)) * 100;
      const y = 25 - ((s - min) / range) * 22;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

function buildHistoryPoints(history: { date: string; score: number }[]): string {
  if (history.length === 0) return "0,80 600,80";
  if (history.length === 1) return "0,80 600,80";
  const min = Math.min(...history.map((h) => h.score));
  const max = Math.max(...history.map((h) => h.score));
  const range = max - min || 1;
  return history
    .map((h, i) => {
      const x = (i / (history.length - 1)) * 600;
      const y = 140 - ((h.score - min) / range) * 120;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

function timeAgo(dateStr: string): string {
  const then = new Date(dateStr + "T00:00:00Z").getTime();
  const now = Date.now();
  const days = Math.floor((now - then) / (1000 * 60 * 60 * 24));
  if (days <= 0) return "today";
  if (days === 1) return "1 day ago";
  return `${days} days ago`;
}

// ---------------------------------------------------------------------------
// Radar chart geometry (computed, not hand-placed)
// ---------------------------------------------------------------------------
const VB = 400; // svg viewBox size
const CENTER = VB / 2;
const MAX_R = 150;
const RING_FRACTIONS = [0.25, 0.5, 0.75, 1];

function polarPoint(angle: number, radius: number) {
  return {
    x: CENTER + Math.cos(angle) * radius,
    y: CENTER + Math.sin(angle) * radius,
  };
}

function useRadarGeometry(platforms: VisibilityPlatform[]) {
  return useMemo(() => {
    const angleStep = platforms.length > 0 ? (2 * Math.PI) / platforms.length : 0;
    const startAngle = -Math.PI / 2; // first axis points straight up
    const ringLabelAngle = -Math.PI / 2 + (platforms.length > 0 ? Math.PI / platforms.length : 0);

    const nodes = platforms.map((p, i) => {
      const angle = startAngle + i * angleStep;
      const dataPoint = polarPoint(angle, (p.score / 100) * MAX_R);
      const labelPoint = polarPoint(angle, MAX_R + 34);
      const spokeEnd = polarPoint(angle, MAX_R);
      return { ...p, angle, dataPoint, labelPoint, spokeEnd };
    });

    const polygonPoints = nodes.map((n) => `${n.dataPoint.x},${n.dataPoint.y}`).join(" ");

    return { nodes, polygonPoints, ringLabelAngle };
  }, [platforms]);
}

export default function VisibilityRadarPage() {
  const { organizationId } = useOrganizationStore();
  const [activeFilter, setActiveFilter] = useState("All platforms");
  const [range, setRange] = useState<"7D" | "30D" | "90D">("30D");
  const [rangeOpen, setRangeOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<VisibilityRadarResponse | null>(null);

  const rangeLabel = RANGE_OPTIONS.find((r) => r.value === range)?.label ?? "Last 30 days";

  const fetchData = useCallback(async () => {
    if (!organizationId) return;
    setIsLoading(true);
    try {
      const res = await getVisibilityRadar(organizationId, range);
      setData(res);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load visibility radar data");
    } finally {
      setIsLoading(false);
    }
  }, [organizationId, range]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const platforms = useMemo(() => data?.platforms ?? [], [data]);

  const filteredPlatforms = useMemo(() => {
    if (activeFilter === "All platforms") return platforms;
    return platforms.filter((p) => p.status === activeFilter);
  }, [activeFilter, platforms]);

  const { nodes, polygonPoints, ringLabelAngle } = useRadarGeometry(platforms);
  const highlightedNames = useMemo(() => new Set(filteredPlatforms.map((p) => p.name)), [filteredPlatforms]);

  const legendCounts = useMemo(() => {
    const counts: Record<string, number> = { Strong: 0, Solid: 0, Developing: 0, Weak: 0 };
    platforms.forEach((p) => {
      if (counts[p.status] !== undefined) counts[p.status]++;
    });
    return counts;
  }, [platforms]);

  const toggleFilter = (label: string) => {
    setActiveFilter((prev) => (prev === label ? "All platforms" : label));
  };

  const compositeScore = data?.compositeScore ?? 0;
  const isPositiveDelta = !(data?.compositeDelta ?? "").startsWith("-");
  const historyPoints = buildHistoryPoints(data?.scoreHistory ?? []);

  if (!isLoading && data && !data.hasData) {
    return (
      <div className="flex-1 p-6 sm:p-8 min-h-screen flex items-center justify-center">
        <Card className="max-w-md p-10 text-center">
          <ShieldAlert className="w-10 h-10 text-amber-500 mx-auto mb-4" />
          <h2 className="text-lg font-bold mb-2">No visibility data yet</h2>
          <p className="text-sm text-slate-500">
            Complete onboarding analysis for this organization first — the visibility radar populates
            automatically from your real AI search prompt data once that's done.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 sm:p-8 text-slate-900 bg-[#f8fafc] min-h-screen">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-[28px] font-space-grotesk font-bold tracking-tight text-slate-900">
            Visibility radar
          </h1>
          <p className="text-[14px] text-slate-500 mt-1">
            Track where your brand shows up across every AI platform, and how
            strong each signal is
          </p>
        </div>
        <div className="flex items-center gap-4 text-[11px] font-semibold tracking-[0.04em]">
          <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-[8px] font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            7-DAY AUTO SCAN
          </div>
          <div className="text-slate-400 uppercase whitespace-nowrap">
            {data?.lastScanDate ? `Scanned ${timeAgo(data.lastScanDate)}` : "No scan yet"}
          </div>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            onClick={() => (filter === "All platforms" ? setActiveFilter("All platforms") : toggleFilter(filter))}
            aria-pressed={activeFilter === filter}
            className={`px-4 py-1.5 text-[13.5px] font-semibold rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
              activeFilter === filter ? "bg-indigo-600 text-white" : "bg-transparent text-slate-600 hover:bg-slate-100"
            }`}
          >
            {filter}
          </button>
        ))}
        {activeFilter !== "All platforms" && (
          <span className="text-[12.5px] text-slate-400 font-medium">
            Showing {filteredPlatforms.length} of {platforms.length}
          </span>
        )}
        <div className="flex-1" />
        <div className="relative">
          <button
            onClick={() => setRangeOpen((o) => !o)}
            className="px-4 py-1.5 text-[13.5px] font-semibold bg-transparent text-slate-600 rounded-full hover:bg-slate-100 flex items-center gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            {rangeLabel} <ChevronDown className="w-4 h-4" />
          </button>
          {rangeOpen && (
            <div className="absolute right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-30 min-w-[140px]">
              {RANGE_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => {
                    setRange(opt.value);
                    setRangeOpen(false);
                  }}
                  className="w-full text-left px-3 py-1.5 text-[13.5px] text-slate-600 hover:bg-slate-50"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {isLoading && !data ? (
        <div className="py-24 flex flex-col items-center justify-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin" />
          <p className="text-sm text-slate-500">Loading real visibility data…</p>
        </div>
      ) : (
        <>
          {/* RADAR HERO */}
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
            <Card className="relative overflow-hidden p-6 flex items-center justify-center">
              <div className="relative w-full max-w-[440px] aspect-square">
                <svg viewBox={`0 0 ${VB} ${VB}`} className="w-full h-full overflow-visible">
                  {/* grid rings */}
                  {RING_FRACTIONS.map((f) => (
                    <circle key={f} cx={CENTER} cy={CENTER} r={MAX_R * f} fill="none" stroke="#e2e8f0" strokeWidth="1" />
                  ))}
                  {/* ring % labels */}
                  {RING_FRACTIONS.map((f) => {
                    const { x, y } = polarPoint(ringLabelAngle, MAX_R * f);
                    return (
                      <text key={`label-${f}`} x={x} y={y} textAnchor="middle" dominantBaseline="middle" fontSize="9" fill="#94a3b8" fontFamily="monospace">
                        {f * 100}%
                      </text>
                    );
                  })}
                  {/* spokes */}
                  {nodes.map((n) => (
                    <line key={`spoke-${n.name}`} x1={CENTER} y1={CENTER} x2={n.spokeEnd.x} y2={n.spokeEnd.y} stroke="#e2e8f0" strokeWidth="1" />
                  ))}
                  {/* rotating sweep, pure CSS animation */}
                  <g className="radar-sweep motion-reduce:animate-none" style={{ mixBlendMode: "multiply" }}>
                    <path
                      d={`M ${CENTER} ${CENTER} L ${CENTER} ${CENTER - MAX_R} A ${MAX_R} ${MAX_R} 0 0 1 ${CENTER + MAX_R} ${CENTER} Z`}
                      fill="rgba(79,70,229,0.08)"
                    />
                  </g>
                  {/* data polygon */}
                  <polygon points={polygonPoints} fill="rgba(79,70,229,0.12)" stroke="#4F46E5" strokeWidth="2" />
                  {/* data point markers */}
                  {nodes.map((n) => {
                    const status = getStatus(n.status);
                    const dimmed = !highlightedNames.has(n.name);
                    return (
                      <circle
                        key={`node-${n.name}`}
                        cx={n.dataPoint.x}
                        cy={n.dataPoint.y}
                        r={dimmed ? 5 : 7}
                        fill={status.dot}
                        stroke="#fff"
                        strokeWidth="3"
                        opacity={dimmed ? 0.25 : 1}
                      />
                    );
                  })}
                  {/* center hub */}
                  <rect x={CENTER - 38} y={CENTER - 22} width="76" height="44" rx="8" fill="#fff" stroke="#4F46E5" strokeWidth="2" />
                  <text x={CENTER} y={CENTER - 3} fontSize="10" fontWeight="700" textAnchor="middle" letterSpacing="0.5">
                    VISIBILITY
                  </text>
                  <text x={CENTER} y={CENTER + 12} fontSize="9" fill="#94a3b8" fontFamily="monospace" textAnchor="middle">
                    {compositeScore} avg
                  </text>
                </svg>

                {/* labels as HTML overlay so text never gets skewed by SVG scaling */}
                {nodes.map((n) => {
                  const leftPct = (n.labelPoint.x / VB) * 100;
                  const topPct = (n.labelPoint.y / VB) * 100;
                  const dimmed = !highlightedNames.has(n.name);
                  return (
                    <div
                      key={`overlay-${n.name}`}
                      className="absolute flex flex-col items-center gap-0.5 transition-opacity"
                      style={{ left: `${leftPct}%`, top: `${topPct}%`, transform: "translate(-50%, -50%)", opacity: dimmed ? 0.35 : 1 }}
                    >
                      <div className="text-[11px] font-semibold whitespace-nowrap">{n.name}</div>
                      <div className="text-[9px] text-slate-400 font-mono">{n.score}%</div>
                    </div>
                  );
                })}
              </div>
            </Card>

            <div className="flex flex-col gap-6">
              <Card className="p-8 text-center">
                <div className="text-[11.5px] text-slate-400 uppercase tracking-[0.04em] font-semibold mb-2">
                  Composite visibility score
                </div>
                <div className="font-space-grotesk text-[56px] sm:text-[64px] font-bold leading-none mb-4">
                  {compositeScore}
                  <span className="text-[24px] text-slate-400 font-normal ml-1">/100</span>
                </div>
                <div className={`font-semibold flex items-center justify-center gap-1 text-[14px] ${isPositiveDelta ? "text-emerald-500" : "text-red-500"}`}>
                  {isPositiveDelta ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  {data?.compositeDelta}
                </div>
              </Card>

              <Card className="p-8 flex-1">
                <h3 className="mb-6 text-[14px] uppercase tracking-[0.5px] text-slate-500 font-semibold">Status legend</h3>
                <div className="flex flex-col gap-4">
                  {[
                    { label: "Strong (80%+)", color: "bg-emerald-500", key: "Strong" },
                    { label: "Solid (65–79%)", color: "bg-cyan-500", key: "Solid" },
                    { label: "Developing (45–64%)", color: "bg-amber-500", key: "Developing" },
                    { label: "Weak (under 45%)", color: "bg-red-500", key: "Weak" },
                  ].map((item) => (
                    <button
                      key={item.key}
                      onClick={() => toggleFilter(item.key)}
                      aria-pressed={activeFilter === item.key}
                      className={`flex items-center justify-between text-left rounded-md -mx-1 px-1 py-0.5 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                        activeFilter === item.key ? "bg-indigo-50" : ""
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${item.color}`} />
                        <span className="font-semibold text-[14px]">{item.label}</span>
                      </div>
                      <span className="text-[14px] font-mono text-slate-400 font-medium">{legendCounts[item.key]}</span>
                    </button>
                  ))}
                </div>
              </Card>
            </div>
          </div>

          {/* PLATFORM BREAKDOWN */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[18px] font-bold text-slate-900">Platform breakdown</h2>
              <span className="text-[13px] text-slate-500 font-medium">
                {filteredPlatforms.length} of {platforms.length} platforms · {rangeLabel.toLowerCase()} trend
              </span>
            </div>

            <Card className="py-0 overflow-hidden">
              <div className="overflow-x-auto">
                <Table className="min-w-[640px]">
                  <TableHeader>
                    <TableRow className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      <TableHead className="p-4">Platform</TableHead>
                      <TableHead className="p-4">Score</TableHead>
                      <TableHead className="p-4">Trend</TableHead>
                      <TableHead className="p-4">Citations</TableHead>
                      <TableHead className="p-4">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPlatforms.map((p) => {
                      const status = getStatus(p.status);
                      const style = platformStyle(p.name);
                      return (
                        <TableRow key={p.name}>
                          <TableCell className="p-4">
                            <div className="flex items-center gap-3 font-semibold text-[14px] text-slate-900">
                              <LogoAvatar
                                logoUrl={getPlatformLogoUrl(p.name)}
                                fallbackInitial={style.initial}
                                fallbackColor={style.color}
                                className="rounded-md text-[10px]"
                                size={24}
                              />
                              {p.name}
                            </div>
                          </TableCell>
                          <TableCell className="p-4 font-mono font-medium text-[14px] text-slate-700">{p.score}%</TableCell>
                          <TableCell className="p-4">
                            <svg viewBox="0 0 100 28" preserveAspectRatio="none" className="w-24 h-7">
                              <polyline points={buildSparkPoints(p.sparkline)} fill="none" stroke={status.spark} strokeWidth="2.5" />
                            </svg>
                          </TableCell>
                          <TableCell className="p-4 font-mono text-[14px] text-slate-600">{p.citations}</TableCell>
                          <TableCell className="p-4">
                            <Badge className={`text-[11px] font-bold ${status.chip}`}>{status.label}</Badge>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    {filteredPlatforms.length === 0 && (
                      <TableRow>
                        <TableCell className="p-8 text-center text-sm text-slate-500" colSpan={5}>
                          No platforms match this filter.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </div>

          {/* TWO COL: SCORE HISTORY + SIGNAL MIX */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <Card className="p-6">
              <h3 className="text-[15px] font-bold mb-6 text-slate-800">Composite score history</h3>
              <div className="relative h-40">
                <svg viewBox="0 0 600 160" preserveAspectRatio="none" className="w-full h-full">
                  <line x1="0" y1="40" x2="600" y2="40" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4 4" />
                  <line x1="0" y1="80" x2="600" y2="80" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4 4" />
                  <line x1="0" y1="120" x2="600" y2="120" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4 4" />
                  <polyline points={historyPoints} fill="none" stroke="#4F46E5" strokeWidth="3" />
                </svg>
                <div className="flex justify-between text-[12px] text-slate-400 font-medium mt-3">
                  <span>{rangeLabel} ago</span>
                  <span>Today</span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-[15px] font-bold mb-6 text-slate-800">Signal mix</h3>
              <div className="flex flex-col gap-5 mt-4">
                {(data?.signalMix ?? []).map((s, idx) => {
                  const colors = ["bg-indigo-600", "bg-cyan-500", "bg-emerald-500", "bg-amber-500"];
                  return (
                    <div key={s.label} className="flex items-center gap-4">
                      <span className="w-40 shrink-0 text-[13.5px] text-slate-600 font-medium">{s.label}</span>
                      <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${colors[idx % colors.length]}`} style={{ width: `${s.pct}%` }} />
                      </div>
                      <span className="w-12 shrink-0 text-right font-mono text-[14px] text-slate-700 font-bold">{s.pct}%</span>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
