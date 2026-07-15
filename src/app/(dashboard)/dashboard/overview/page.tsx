"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useOrganizationStore } from "@/lib/stores/organizationStore";
import {
  getCommandCenter,
  CommandCenterResponse,
  CommandCenterKpi,
  CommandCenterBreakdownCard,
} from "@/lib/api/commandCenterApi";

/* ---------- cosmetic-only lookups (backend sends real values, not styling) ---------- */
const KPI_STYLE = [
  { ic: "ti-gauge", tint: "#7C3AED", desc: "Composite of visibility, citation, sentiment & competitive scores." },
  { ic: "ti-eye", tint: "#6366F1", desc: "Real AI visibility score vs your previous scan." },
  { ic: "ti-quote", tint: "#16A34A", desc: "Real citation score vs your previous scan." },
  { ic: "ti-swords", tint: "#2563EB", desc: "Your real share of voice vs tracked competitors." },
  { ic: "ti-list-check", tint: "#D97706", desc: "Open items aggregated from Citation, Competitor, Visibility & Brand Pulse." },
  { ic: "ti-radar-2", tint: "#06B6D4", desc: "How many of your 5 weekly AI scans have run." },
];

const BREAKDOWN_STYLE: Record<string, { ic: string; tint: string }> = {
  "AI visibility": { ic: "ti-eye", tint: "#6366F1" },
  "Citation": { ic: "ti-quote", tint: "#16A34A" },
  "GEO": { ic: "ti-world", tint: "#7C3AED" },
  "SEO": { ic: "ti-chart-arrows-vertical", tint: "#2563EB" },
  "AEO": { ic: "ti-help-circle", tint: "#16A34A" },
  "Messaging consistency": { ic: "ti-message-2", tint: "#D97706" },
  "Citation authority": { ic: "ti-award", tint: "#DC2626" },
  "Entity coverage": { ic: "ti-affiliate", tint: "#06B6D4" },
};

const SEVERITY_STYLE: Record<string, { bg: string; c: string }> = {
  High: { bg: "var(--red-soft, #FEE2E2)", c: "var(--red, #DC2626)" },
  Medium: { bg: "#FEF3E2", c: "#B45309" },
  Good: { bg: "var(--green-soft, #DCFCE7)", c: "var(--green-ink, #16A34A)" },
};

const SOURCE_ICON: Record<string, string> = {
  "Citation Intelligence": "ti-quote",
  "Competitor Watch": "ti-swords",
  "Brand Pulse": "ti-heart-pulse",
  "Visibility Radar": "ti-radar-2",
};

const RANGES: Array<"7D" | "30D" | "90D"> = ["7D", "30D", "90D"];

/* ---------- helpers ---------- */
const soft = (hex: string) => {
  const r = hex.replace(/^#/, "").match(/.{2}/g)?.map((h) => parseInt(h, 16)) || [0, 0, 0];
  return `rgba(${r[0]},${r[1]},${r[2]},.13)`;
};

const pfTrendClass = (v: number) => (v > 0 ? "text-emerald-600" : v < 0 ? "text-red-600" : "text-muted-foreground");
const pfArrow = (v: number) => (v > 0 ? "▲" : v < 0 ? "▼" : "—");

function Sparkline({ points, color }: { points: number[]; color: string }) {
  const w = 100, h = 28;
  if (points.length < 2) return <div className="h-full w-full" />;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const rng = max - min || 1;
  const step = w / (points.length - 1);
  const pts = points.map((v, i) => `${(i * step).toFixed(1)},${(h - 2 - ((v - min) / rng) * (h - 5)).toFixed(1)}`);

  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ width: "100%", height: "100%", display: "block" }}>
      <polygon points={`0,${h} ${pts.join(" ")} ${w},${h}`} fill={color} opacity="0.10" />
      <polyline points={pts.join(" ")} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={w.toFixed(1)} cy={(h - 2 - ((points[points.length - 1] - min) / rng) * (h - 5)).toFixed(1)} r="2.4" fill={color} />
    </svg>
  );
}

/* ---------- PAGE ---------- */
export default function CommandCenterPage() {
  const router = useRouter();
  const { organizationId } = useOrganizationStore();
  const [range, setRange] = useState<"7D" | "30D" | "90D">("30D");
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<CommandCenterResponse | null>(null);
  const [search, setSearch] = useState("");

  const fetchData = useCallback(async () => {
    if (!organizationId) return;
    setIsLoading(true);
    try {
      const res = await getCommandCenter(organizationId, range);
      setData(res);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load command center data");
    } finally {
      setIsLoading(false);
    }
  }, [organizationId, range]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const kpis = useMemo<(CommandCenterKpi & { ic: string; tint: string; desc: string })[]>(
    () => (data?.kpis ?? []).map((k, i) => ({ ...k, ...(KPI_STYLE[i] ?? KPI_STYLE[0]) })),
    [data],
  );

  const breakdown = useMemo<(CommandCenterBreakdownCard & { ic: string; tint: string })[]>(
    () => (data?.breakdown ?? []).map((b) => ({ ...b, ...(BREAKDOWN_STYLE[b.name] ?? { ic: "ti-chart-bar", tint: "#64748B" }) })),
    [data],
  );

  const query = search.trim().toLowerCase();
  const filteredActionItems = useMemo(
    () => (data?.actionItems ?? []).filter((a) => !query || a.title.toLowerCase().includes(query) || a.detail.toLowerCase().includes(query) || a.source.toLowerCase().includes(query)),
    [data, query],
  );
  const filteredAlerts = useMemo(
    () => (data?.alerts ?? []).filter((al) => !query || al.title.toLowerCase().includes(query) || al.message.toLowerCase().includes(query)),
    [data, query],
  );

  const handleExport = useCallback(() => {
    if (!data) {
      toast.error("Nothing to export yet — run a scan first");
      return;
    }

    const rows: string[] = ["Metric,Value,Change"];
    kpis.forEach((k) => rows.push(`${k.label},${k.val}${k.suffix ?? ""},${k.delta}`));
    rows.push("");
    rows.push("Category,Current,Previous");
    breakdown.forEach((b) => rows.push(`${b.name},${b.cur},${b.prev}`));
    rows.push("");
    rows.push("Action Item,Severity,Source");
    (data.actionItems ?? []).forEach((a) => rows.push(`"${a.title.replace(/"/g, '""')}",${a.severity},${a.source}`));
    rows.push("");
    rows.push("Alert,Severity");
    (data.alerts ?? []).forEach((al) => rows.push(`"${al.title.replace(/"/g, '""')}",${al.severity}`));

    const csv = rows.join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `command-center-${range}-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success("Command center report exported");
  }, [data, kpis, breakdown, range]);

  const handleShare = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard");
    } catch {
      toast.error("Couldn't copy link — copy it from the address bar instead");
    }
  }, []);

  if (!isLoading && data && !data.hasData) {
    return (
      <div className="p-6 md:p-8 max-w-[1400px] mx-auto flex items-center justify-center min-h-[60vh]">
        <Card className="max-w-md p-10 text-center">
          <i className="ti ti-shield-exclamation text-4xl text-amber-500 block mb-4" />
          <h2 className="text-lg font-bold mb-2">No data yet</h2>
          <p className="text-sm text-muted-foreground">
            Complete onboarding analysis for this organization first — Command Center populates
            automatically from the real GEO, Competitor, Visibility, Citation and Brand Pulse scans once that's done.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 max-w-[1400px] mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-300">
      {/* HERO */}
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Executive Intelligence · {data?.lastScanDate ? `scanned ${data.lastScanDate}` : "loading"}
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Command center</h1>
          <p className="text-muted-foreground text-base max-w-2xl">
            The real, AI-analyzed state of your visibility, GEO, citations, competitors and brand
            perception — aggregated from every scan you're running, in one executive view.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 shrink-0">
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => router.push("/dashboard/agents")}>
              <i className="ti ti-robot mr-2" /> Agents
            </Button>
            <Button variant="outline" onClick={() => router.push(organizationId ? `/report/${organizationId}` : "/dashboard/overview")}>
              <i className="ti ti-file-analytics mr-2" /> Reports
            </Button>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleExport}>
              <i className="ti ti-download mr-2" /> Export
            </Button>
            <Button variant="secondary" onClick={handleShare}>
              <i className="ti ti-share mr-2" /> Share
            </Button>
          </div>
        </div>
      </div>

      {/* TOOLBAR */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between pb-6 border-b border-border/50">
        <div className="relative w-full md:max-w-md">
          <i className="ti ti-search absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-9 h-10"
            placeholder="Search reports, action items, alerts..."
            autoComplete="off"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center rounded-md border p-1 bg-muted/20">
            {RANGES.map((r) => (
              <Button
                key={r}
                variant={range === r ? "secondary" : "ghost"}
                size="sm"
                className={`h-7 px-3 text-xs ${range === r ? "shadow-sm" : ""}`}
                onClick={() => setRange(r)}
              >
                {r}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {isLoading && !data ? (
        <div className="py-24 flex flex-col items-center justify-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          <p className="text-sm text-muted-foreground">Loading real command center data…</p>
        </div>
      ) : (
        <>
          {/* SECTION: KPIs */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
                <i className="ti ti-gauge text-muted-foreground" /> Executive KPIs
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {kpis.map((k, i) => (
                <Card key={i} className="group hover:border-primary/40 transition-colors">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div className="p-2.5 rounded-lg transition-transform group-hover:scale-105" style={{ backgroundColor: soft(k.tint), color: k.tint }}>
                      <i className={`ti ${k.ic} text-lg`} />
                    </div>
                    <Badge variant={k.delta > 0 ? "default" : k.delta < 0 ? "destructive" : "secondary"} className={k.delta > 0 ? "bg-emerald-500/15 text-emerald-700 hover:bg-emerald-500/25 border-emerald-200" : ""}>
                      {pfArrow(k.delta)} {Math.abs(k.delta)}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm font-medium text-muted-foreground mb-1">{k.label}</div>
                    <div className="text-3xl font-bold tracking-tight mb-2">
                      {k.val}{k.suffix && <span className="text-lg font-medium text-muted-foreground ml-1">{k.suffix}</span>}
                    </div>
                    <p className="text-xs text-muted-foreground mb-4 h-8">{k.desc}</p>
                    {k.spark.length > 1 && (
                      <div className="h-10 w-full opacity-80 group-hover:opacity-100 transition-opacity">
                        <Sparkline points={k.spark} color={k.tint} />
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* SECTION: BREAKDOWN */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
                <i className="ti ti-layout-grid text-muted-foreground" /> Performance breakdown
              </h2>
              <span className="text-sm text-muted-foreground">Current vs previous scan</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {breakdown.map((b, i) => {
                const g = b.cur - b.prev;
                return (
                  <Card key={i}>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2.5 rounded-lg shrink-0" style={{ backgroundColor: soft(b.tint), color: b.tint }}>
                          <i className={`ti ${b.ic} text-lg`} />
                        </div>
                        <div>
                          <div className="font-semibold text-[15px]">{b.name}</div>
                          <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Performance</div>
                        </div>
                      </div>
                      <div className="flex items-end justify-between mb-3">
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-bold tracking-tighter">{b.cur}</span>
                          <span className="text-sm font-medium text-muted-foreground line-through decoration-muted-foreground/40">{b.prev}</span>
                        </div>
                        <Badge variant="outline" className={g > 0 ? "text-emerald-700 border-emerald-200 bg-emerald-50" : g < 0 ? "text-red-700 border-red-200 bg-red-50" : ""}>
                          {pfArrow(g)} {Math.abs(g)} pts
                        </Badge>
                      </div>
                      <div className="h-2 w-full bg-secondary rounded-full overflow-hidden mb-4">
                        <div className="h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${b.cur}%`, backgroundColor: b.tint }} />
                      </div>
                      <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg flex gap-2">
                        <i className="ti ti-bulb text-amber-500 shrink-0 mt-0.5 text-[15px]" />
                        <span className="leading-relaxed">{b.insight}</span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* SECTION: ACTION ITEMS */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
                <i className="ti ti-list-check text-muted-foreground" /> Action items
              </h2>
              <span className="text-sm text-muted-foreground">Aggregated from all 4 feature scans</span>
            </div>
            <div className="space-y-3">
              {filteredActionItems.map((a, i) => {
                const sev = SEVERITY_STYLE[a.severity] ?? SEVERITY_STYLE.Medium;
                return (
                  <Card key={i} className="cursor-pointer hover:border-primary/40 transition-colors" onClick={() => (window.location.href = a.link)}>
                    <CardContent className="p-4 flex items-start gap-4">
                      <div className="p-2.5 rounded-lg shrink-0 mt-0.5 bg-muted/50 text-muted-foreground">
                        <i className={`ti ${SOURCE_ICON[a.source] ?? "ti-bulb"} text-lg`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1 gap-2">
                          <div className="font-semibold text-[15px]">{a.title}</div>
                          <Badge variant="outline" className="border-0 shrink-0 font-semibold" style={{ backgroundColor: sev.bg, color: sev.c }}>
                            {a.severity}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground line-clamp-2 mb-2 leading-relaxed">{a.detail}</div>
                        <div className="text-[11px] font-medium text-muted-foreground/70 uppercase tracking-wider">{a.source}</div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
              {filteredActionItems.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-8">
                  {query ? "No action items match your search." : "No open action items — everything's looking healthy."}
                </p>
              )}
            </div>
          </section>

          {/* SECTION: ALERTS & INSIGHTS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* ALERTS */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
                  <i className="ti ti-bell-ringing text-muted-foreground" /> Alert center
                </h2>
              </div>
              <div className="space-y-3">
                {filteredAlerts.map((al, i) => {
                  const sev = SEVERITY_STYLE[al.severity] ?? SEVERITY_STYLE.Medium;
                  return (
                    <Card key={i}>
                      <CardContent className="p-4 flex items-start gap-4">
                        <div className="p-2.5 rounded-lg shrink-0 mt-0.5" style={{ backgroundColor: sev.bg, color: sev.c }}>
                          <i className="ti ti-alert-triangle text-lg" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-1 gap-2">
                            <div className="font-semibold text-[15px] truncate pr-2">{al.title}</div>
                            <Badge variant="outline" className="border-0 shrink-0 font-semibold" style={{ backgroundColor: sev.bg, color: sev.c }}>
                              {al.severity}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{al.message}</div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
                {filteredAlerts.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    {query ? "No alerts match your search." : "No alerts — nothing regressed since your last scan."}
                  </p>
                )}
              </div>
            </section>

            {/* INSIGHTS */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
                  <i className="ti ti-bulb text-muted-foreground" /> Business insights
                </h2>
                <span className="text-sm text-muted-foreground">AI-generated</span>
              </div>
              <Card className="bg-gradient-to-br from-primary/5 via-primary/5 to-transparent border-primary/20 overflow-hidden h-fit">
                <CardHeader className="pb-4 flex flex-row items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/20 shadow-sm">
                    <i className="ti ti-sparkles text-2xl" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Executive Summary</CardTitle>
                    <CardDescription>Generated from your latest real scan data</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2.5">
                    {(data?.insights ?? []).map((ins, i) => (
                      <div key={i} className="flex items-start gap-3 bg-background/80 backdrop-blur-sm p-3.5 rounded-lg border border-border/50 shadow-sm">
                        <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                          <i className="ti ti-check text-[10px]" />
                        </div>
                        <span className="text-[14px] leading-relaxed" dangerouslySetInnerHTML={{ __html: ins }} />
                      </div>
                    ))}
                    {(data?.insights ?? []).length === 0 && (
                      <p className="text-sm text-muted-foreground text-center py-4">No insights generated yet.</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        </>
      )}
    </div>
  );
}
