"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

/* ---------- DATA ---------- */
const PERF_KPIS = [
  { key: "score", ic: "ti-gauge", tint: "#7C3AED", label: "Overall performance score", val: "87.4", suffix: "", trend: 5.1, desc: "Composite of visibility, citations, content & automation.", spark: [71, 73, 72, 76, 79, 81, 83, 87], color: "#7C3AED" },
  { key: "visgrowth", ic: "ti-eye", tint: "#6366F1", label: "AI visibility growth", val: "+16", suffix: "%", trend: 16, desc: "Aggregate share of voice across all engines.", spark: [40, 44, 47, 49, 53, 58, 62, 68], color: "#6366F1" },
  { key: "citegrowth", ic: "ti-quote", tint: "#16A34A", label: "Citation growth", val: "+412", suffix: "", trend: 9.4, desc: "Net new citations won in the period.", spark: [180, 210, 240, 270, 300, 340, 380, 412], color: "#16A34A" },
  { key: "revenue", ic: "ti-currency-dollar", tint: "#2563EB", label: "Revenue impact", val: "$184", suffix: "K", trend: 11, desc: "Pipeline attributed to AI-sourced traffic.", spark: [120, 128, 134, 142, 151, 163, 174, 184], color: "#2563EB" },
  { key: "mission", ic: "ti-target", tint: "#D97706", label: "Mission success rate", val: "92", suffix: "%", trend: 3.2, desc: "Initiatives completed against target outcomes.", spark: [84, 86, 85, 88, 89, 90, 91, 92], color: "#D97706" },
  { key: "agenteff", ic: "ti-robot", tint: "#06B6D4", label: "Agent efficiency", val: "94", suffix: "%", trend: 2.1, desc: "Successful autonomous executions, all agents.", spark: [88, 89, 90, 91, 92, 93, 93, 94], color: "#06B6D4" }
];

const PERF_BREAKDOWN = [
  { key: "bdvis", nm: "AI visibility", ic: "ti-eye", tint: "#6366F1", cur: 87, prev: 79, ins: "Perplexity & ChatGPT driving the lift on sourcing-intent queries." },
  { key: "bdcite", nm: "Citation", ic: "ti-quote", tint: "#16A34A", cur: 81, prev: 74, ins: "Net +412 citations; strongest on comparison prompts." },
  { key: "bdgeo", nm: "GEO", ic: "ti-world", tint: "#7C3AED", cur: 84, prev: 71, ins: "Three GEO initiatives generated 42% more citations." },
  { key: "bdseo", nm: "SEO", ic: "ti-chart-arrows-vertical", tint: "#2563EB", cur: 76, prev: 73, ins: "Schema coverage up; internal-link depth still a gap." },
  { key: "bdaeo", nm: "AEO", ic: "ti-help-circle", tint: "#16A34A", cur: 79, prev: 68, ins: "Answer-optimized FAQs winning featured snippets." },
  { key: "bdcontent", nm: "Content", ic: "ti-pencil", tint: "#D97706", cur: 88, prev: 80, ins: "Content Studio produced 29 optimized pages this month." },
  { key: "bdauth", nm: "Authority growth", ic: "ti-award", tint: "#DC2626", cur: 72, prev: 66, ins: "Third-party listicle placements lifting entity trust." },
  { key: "bdentity", nm: "Entity coverage", ic: "ti-affiliate", tint: "#06B6D4", cur: 69, prev: 61, ins: "Brand entity now resolved on 9 of 12 tracked engines." }
];

const PERF_REV = [
  { key: "rgen", l: "Est. revenue generated", ic: "ti-cash", v: "$184K", d: 11 },
  { key: "rleads", l: "AI-assisted leads", ic: "ti-users", v: "1,420", d: 18 },
  { key: "rpipe", l: "Pipeline contribution", ic: "ti-trending-up", v: "$612K", d: 9 },
  { key: "rconv", l: "Conversion improvement", ic: "ti-arrow-bounce", v: "+3.4%", d: 3.4 },
  { key: "rsave", l: "Cost savings", ic: "ti-pig-money", v: "$48K", d: 22 },
  { key: "rroi", l: "Estimated ROI", ic: "ti-percentage", v: "4.8x", d: 14 }
];

const PERF_ATTR = [
  { n: "GEO Engine", pc: 34, c: "#7C3AED" },
  { n: "Content Studio", pc: 27, c: "#D97706" },
  { n: "Citationly Agents", pc: 21, c: "#06B6D4" },
  { n: "Visibility Intel", pc: 11, c: "#6366F1" },
  { n: "Other", pc: 7, c: "#94A3B8" }
];

const PERF_MISSIONS = [
  { key: "m1", nm: "Win back Perplexity sourcing queries", ic: "ti-target", tint: "#6366F1", status: "Completed", roi: "4.2x", time: "9 days", detail: { tasks: 24, agents: 3, citations: "+86", value: "$42K" } },
  { key: "m2", nm: "FAQ schema rollout — top 20 pages", ic: "ti-help-circle", tint: "#16A34A", status: "Running", roi: "2.8x", time: "in progress", detail: { tasks: 18, agents: 2, citations: "+38", value: "$21K" } },
  { key: "m3", nm: "Gemini citation recovery", ic: "ti-refresh", tint: "#2563EB", status: "Pending", roi: "—", time: "queued", detail: { tasks: 12, agents: 1, citations: "0", value: "$0" } },
  { key: "m4", nm: "Brand entity cleanup", ic: "ti-affiliate", tint: "#7C3AED", status: "Completed", roi: "3.1x", time: "14 days", detail: { tasks: 31, agents: 4, citations: "+54", value: "$31K" } }
];

const PERF_MISSION_STATS = [
  { key: "mcomp", l: "Completed", ic: "ti-circle-check", tint: "#16A34A", v: "18", meta: "all-time" },
  { key: "mrun", l: "Running", ic: "ti-player-play", tint: "#D97706", v: "3", meta: "active now" },
  { key: "mpend", l: "Pending", ic: "ti-clock", tint: "#94A3B8", v: "5", meta: "in queue" },
  { key: "mavg", l: "Avg completion", ic: "ti-hourglass", tint: "#2563EB", v: "11", meta: "days" },
  { key: "msucc", l: "Success rate", ic: "ti-trophy", tint: "#7C3AED", v: "92", meta: "% on target" },
  { key: "mtop", l: "Top mission", ic: "ti-star", tint: "#16A34A", v: "4.2x", meta: "Perplexity win-back" },
  { key: "mroi", l: "Mission ROI", ic: "ti-percentage", tint: "#06B6D4", v: "3.4x", meta: "blended" },
  { key: "mval", l: "Value created", ic: "ti-cash", tint: "#2563EB", v: "$94K", meta: "attributed" }
];

const PERF_ALERTS = [
  { key: "al1", t: "Visibility drop", s: "ChatGPT share fell 4% on \"lead gen tools\" prompts.", when: "2h ago", ic: "ti-eye-off", tint: "#DC2626", sev: "High", sevbg: "#FEE2E2", sevc: "#EF4444" },
  { key: "al2", t: "Citation lost", s: "Competitor A took a snippet on \"yacht rental dubai\".", when: "5h ago", ic: "ti-quote-off", tint: "#DC2626", sev: "High", sevbg: "#FEE2E2", sevc: "#EF4444" },
  { key: "al3", t: "Mission failed", s: "Gemini recovery run errored — auth token expired.", when: "Yesterday", ic: "ti-flag-off", tint: "#D97706", sev: "Med", sevbg: "#FEF3E2", sevc: "#B45309" },
  { key: "al4", t: "Agent offline", s: "Schema Builder paused after 3 failed executions.", when: "Yesterday", ic: "ti-robot-off", tint: "#D97706", sev: "Med", sevbg: "#FEF3E2", sevc: "#B45309" },
  { key: "al5", t: "Revenue spike", s: "AI-assisted pipeline up 18% week-on-week.", when: "2d ago", ic: "ti-trending-up", tint: "#16A34A", sev: "Good", sevbg: "#D1FAE5", sevc: "#047857" },
  { key: "al6", t: "Competitor activity", s: "Competitor B published 4 new listicle placements.", when: "2d ago", ic: "ti-swords", tint: "#D97706", sev: "Watch", sevbg: "#F8FAFC", sevc: "#64748B" },
  { key: "al7", t: "Authority improvement", s: "Brand entity now resolved on Copilot & Claude.", when: "3d ago", ic: "ti-award", tint: "#16A34A", sev: "Good", sevbg: "#D1FAE5", sevc: "#047857" },
  { key: "al8", t: "Critical recommendation", s: "Refresh 12 stale pages bleeding citations on time-sensitive prompts.", when: "3d ago", ic: "ti-bulb", tint: "#6366F1", sev: "Action", sevbg: "#EEF0FE", sevc: "#4F46E5" }
];

const PERF_INSIGHTS = [
  "AI Visibility increased by <b>16%</b> across all monitored engines.",
  "Revenue attribution improved by <b>11%</b>, now $184K from AI-sourced traffic.",
  "Three GEO initiatives generated <b>42% more citations</b> this period.",
  "Citationly Agents saved approximately <b>82 working hours</b> this month.",
  "Content Studio produced <b>29 optimized pages</b>, lifting AEO score 11 pts.",
  "Perplexity is now your <b>strongest engine</b> at 87% share of voice."
];

const RANGES = [
  { val: "7d", label: "7D" },
  { val: "30d", label: "30D" },
  { val: "qtr", label: "QTR" },
  { val: "yr", label: "YR" }
];

/* ---------- HELPERS ---------- */
const soft = (hex: string) => {
  const r = hex.replace(/^#/, "").match(/.{2}/g)?.map((h) => parseInt(h, 16)) || [0, 0, 0];
  return `rgba(${r[0]},${r[1]},${r[2]},.13)`;
};

const pfTrendClass = (v: number) => (v > 0 ? "up" : v < 0 ? "down" : "flat");
const pfArrow = (v: number) => (v > 0 ? "▲" : v < 0 ? "▼" : "—");
const trendToneClass = (tone: string) =>
  tone === "up" ? "bg-emerald-100 text-emerald-700" : tone === "down" ? "bg-red-100 text-red-500" : "bg-muted text-muted-foreground";

function Sparkline({ points, color, fill }: { points: number[]; color: string; fill: boolean }) {
  const w = 100, h = 28;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const rng = max - min || 1;
  const step = w / (points.length - 1);
  const pts = points.map((v, i) => `${(i * step).toFixed(1)},${(h - 2 - ((v - min) / rng) * (h - 5)).toFixed(1)}`);

  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ width: "100%", height: "100%", display: "block" }}>
      {fill && (
        <polygon points={`0,${h} ${pts.join(" ")} ${w},${h}`} fill={color} opacity="0.10" />
      )}
      <polyline points={pts.join(" ")} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={w.toFixed(1)} cy={(h - 2 - ((points[points.length - 1] - min) / rng) * (h - 5)).toFixed(1)} r="2.4" fill={color} />
    </svg>
  );
}

function SectionHead({ ic, title, meta }: { ic: string; title: string; meta?: string }) {
  return (
    <div className="flex items-center justify-between gap-3 mb-3.5">
      <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground flex items-center gap-2">
        <i className={`ti ${ic} text-primary text-base`} /> {title}
      </span>
      {meta && <span className="text-xs text-slate-400">{meta}</span>}
    </div>
  );
}

/* ---------- PAGE ---------- */
export default function PerformanceCenterPage() {
  const [range, setRange] = useState("30d");
  const [expandedMissions, setExpandedMissions] = useState<Record<string, boolean>>({});

  const toggleMission = (key: string) => {
    setExpandedMissions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="p-6 md:p-8 max-w-[1400px] mx-auto space-y-6">
      {/* HERO */}
      <Card>
        <CardContent className="p-6 md:p-7 flex flex-col md:flex-row items-start justify-between gap-5">
          <div className="max-w-xl">
            <div className="text-[11px] font-bold uppercase tracking-[.12em] text-slate-500 flex items-center gap-2 mb-2.5">
              <span className="relative flex h-1.75 w-1.75">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.75 w-1.75 bg-emerald-500" />
              </span>
              Executive Intelligence · Last 30 Days
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Performance Centre</h1>
            <p className="text-muted-foreground text-sm mt-2 leading-relaxed">
              The business impact of your AI visibility, GEO, citations, content
              and automation — in one executive view.
            </p>
          </div>
          <div className="flex flex-col gap-2 shrink-0 items-end">
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => toast.info("Agents")}>
                <i className="ti ti-robot" /> Agents
              </Button>
              <Button variant="outline" size="sm" onClick={() => toast.info("Forecast")}>
                <i className="ti ti-chart-dots" /> Forecast
              </Button>
              <Button variant="outline" size="sm" onClick={() => toast.info("Reports")}>
                <i className="ti ti-file-analytics" /> Reports
              </Button>
            </div>
            <div className="flex gap-2">
              <Button size="sm" onClick={() => toast.success("Exporting PDF...")}>
                <i className="ti ti-download" /> Export
              </Button>
              <Button variant="outline" size="sm" onClick={() => toast.success("Share link copied")}>
                <i className="ti ti-share" /> Share
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* TOOLBAR */}
      <div className="flex items-center gap-2.5 flex-wrap">
        <div className="flex items-center gap-2 border border-border rounded-lg px-3.5 py-2.5 flex-1 min-w-60 bg-card">
          <i className="ti ti-search text-slate-400 text-lg" />
          <Input
            placeholder="Search reports, missions, agents, performance, revenue…"
            autoComplete="off"
            className="border-0 h-auto p-0 shadow-none focus-visible:ring-0 text-sm"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex bg-card border border-border rounded-lg p-0.5 gap-0.5">
            {RANGES.map((r) => (
              <button
                key={r.val}
                className={`px-3.5 py-1.5 rounded-md text-xs font-semibold transition-colors ${range === r.val ? "bg-c-orange-soft text-c-orange-dark" : "text-muted-foreground hover:text-foreground"}`}
                onClick={() => setRange(r.val)}
              >
                {r.label}
              </button>
            ))}
          </div>
          <Button variant="outline" size="sm" onClick={() => toast.info("Filter Website")}>
            <i className="ti ti-world-www" /> Website <i className="ti ti-chevron-down" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => toast.info("Filter Model")}>
            <i className="ti ti-cpu" /> AI model <i className="ti ti-chevron-down" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => toast.info("More Filters")}>
            <i className="ti ti-filter" /> Filters <i className="ti ti-chevron-down" />
          </Button>
        </div>
      </div>

      {/* SECTION: KPIs */}
      <section>
        <SectionHead ic="ti-gauge" title="Executive KPIs" meta="Click any card for detail" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {PERF_KPIS.map((k) => (
            <Card
              key={k.key}
              className="relative overflow-hidden cursor-pointer hover:-translate-y-1 hover:shadow-lg transition-all"
              onClick={() => toast.info(`Viewing ${k.label}`)}
            >
              <CardContent className="p-4.5 pb-0">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg" style={{ background: soft(k.tint), color: k.tint }}>
                    <i className={`ti ${k.ic}`} />
                  </div>
                  <Badge className={`text-[11.5px] font-bold ${trendToneClass(pfTrendClass(k.trend))}`}>
                    {pfArrow(k.trend)} {Math.abs(k.trend)}%
                  </Badge>
                </div>
                <div className="text-[12.5px] text-muted-foreground font-semibold">{k.label}</div>
                <div className="text-[30px] font-bold tracking-tight mt-1 leading-none">
                  {k.val}
                  {k.suffix && <small className="text-[15px] text-slate-400 font-semibold">{k.suffix}</small>}
                </div>
                <div className="text-[11.5px] text-slate-400 mt-1.5 leading-snug">{k.desc}</div>
                <div className="-mx-4.5 mt-3 h-10.5">
                  <Sparkline points={k.spark} color={k.color} fill={true} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* SECTION: BREAKDOWN */}
      <section>
        <SectionHead ic="ti-layout-grid" title="Performance breakdown" meta="Current vs previous period" />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3.5">
          {PERF_BREAKDOWN.map((b) => {
            const g = b.cur - b.prev;
            const tone = pfTrendClass(g);
            return (
              <Card
                key={b.key}
                className="relative overflow-hidden cursor-pointer hover:-translate-y-1 hover:shadow-lg transition-all"
                onClick={() => toast.info(`Viewing ${b.nm}`)}
              >
                <div className="absolute left-0 top-0 bottom-0 w-[3px] opacity-85" style={{ background: b.tint }} />
                <CardContent className="p-4">
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base shrink-0" style={{ background: soft(b.tint), color: b.tint }}>
                      <i className={`ti ${b.ic}`} />
                    </div>
                    <div className="text-[13px] font-bold leading-tight">
                      {b.nm}
                      <br />
                      <span className="text-[11px] font-semibold text-slate-400">performance</span>
                    </div>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold tracking-tight">{b.cur}</span>
                    <span className="text-xs text-slate-400 line-through">{b.prev}</span>
                  </div>
                  <Badge className={`text-[11.5px] font-bold mt-1.5 ${trendToneClass(tone)}`}>
                    {pfArrow(g)} {Math.abs(g)} pts
                  </Badge>
                  <div className="h-[5px] rounded-full bg-muted overflow-hidden mt-2.5">
                    <div className="h-full rounded-full bg-gradient-to-r from-primary to-c-orange-mid" style={{ width: `${b.cur}%` }} />
                  </div>
                  <div className="text-[11.5px] text-muted-foreground mt-2 leading-snug flex gap-1.5">
                    <i className="ti ti-bulb text-primary text-[13px] mt-0.5 shrink-0" />
                    <span>{b.ins}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* SECTION: REVENUE */}
      <section>
        <SectionHead ic="ti-currency-dollar" title="Revenue impact" />
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-3.5 items-start">
          <Card>
            <CardContent className="p-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {PERF_REV.map((r) => {
                  const tone = pfTrendClass(r.d);
                  return (
                    <div
                      key={r.key}
                      className="p-3.5 border border-border rounded-lg bg-muted cursor-pointer hover:-translate-y-0.5 hover:shadow-md hover:bg-card transition-all"
                      onClick={() => toast.info(`Viewing ${r.l}`)}
                    >
                      <div className="text-[11.5px] text-muted-foreground font-semibold flex items-center gap-1.5">
                        <i className={`ti ${r.ic} text-slate-400`} /> {r.l}
                      </div>
                      <div className="text-[22px] font-bold tracking-tight mt-1">{r.v}</div>
                      <div className={`text-[11px] font-bold mt-0.5 ${tone === "up" ? "text-emerald-700" : "text-red-500"}`}>
                        {pfArrow(r.d)} {Math.abs(r.d)}%
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <div className="text-[11.5px] font-bold uppercase tracking-wide text-slate-400 mb-3 flex items-center gap-1.5">
                <i className="ti ti-chart-pie text-primary text-[15px]" /> Revenue attribution
              </div>
              {PERF_ATTR.map((a, i) => (
                <div key={i} className="flex items-center gap-2.5 py-2">
                  <span className="text-[12.5px] font-semibold w-[110px] shrink-0">{a.n}</span>
                  <span className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                    <span className="block h-full rounded-full" style={{ width: `${a.pc}%`, background: a.c }} />
                  </span>
                  <span className="text-xs font-bold text-muted-foreground w-10.5 text-right">{a.pc}%</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* SECTION: MISSIONS */}
      <section id="pf-missions">
        <SectionHead ic="ti-target" title="Mission performance" meta="Expand a row for detail" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3.5">
          {PERF_MISSION_STATS.map((s) => (
            <Card
              key={s.key}
              className="cursor-pointer hover:-translate-y-0.5 hover:shadow-md transition-all"
              onClick={() => toast.info(`Mission stat: ${s.l}`)}
            >
              <CardContent className="p-3.5">
                <div className="text-[11.5px] text-muted-foreground font-semibold flex items-center gap-1.5">
                  <i className={`ti ${s.ic}`} style={{ color: s.tint }} /> {s.l}
                </div>
                <div className="text-[23px] font-bold tracking-tight mt-1 leading-none">{s.v}</div>
                <div className="text-[11px] text-slate-400 mt-1">{s.meta}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-2">
          {PERF_MISSIONS.map((m) => {
            const sc = m.status === "Completed" ? "#047857" : m.status === "Running" ? "#4F46E5" : "#64748B";
            const isOpen = expandedMissions[m.key];
            return (
              <Card key={m.key} className="overflow-hidden py-0 gap-0">
                <div
                  className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_120px_110px_90px_30px] gap-3 items-center px-4 py-3.5 cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => toggleMission(m.key)}
                >
                  <div className="text-[13.5px] font-semibold flex items-center gap-2.5 min-w-0">
                    <div className="w-7.5 h-7.5 rounded-lg flex items-center justify-center text-sm shrink-0" style={{ background: soft(m.tint), color: m.tint }}>
                      <i className={`ti ${m.ic}`} />
                    </div>
                    <span className="truncate">{m.nm}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm font-semibold">
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ background: sc }} />
                    {m.status}
                  </div>
                  <div className="text-[12.5px] text-muted-foreground">{m.time}</div>
                  <div className="text-sm font-bold text-emerald-700">{m.roi}</div>
                  <i className={`ti ti-chevron-down text-lg text-slate-400 transition-transform text-center ${isOpen ? "rotate-180 text-primary" : ""}`} />
                </div>
                <div className="overflow-hidden transition-[max-height] duration-350" style={{ maxHeight: isOpen ? 500 : 0 }}>
                  <div className="px-4 pb-4 pt-3.5 border-t border-border">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                      <div className="bg-muted rounded-lg px-3 py-2.5">
                        <div className="text-[11px] text-muted-foreground font-semibold">Tasks</div>
                        <div className="text-[15px] font-bold mt-0.5">{m.detail.tasks}</div>
                      </div>
                      <div className="bg-muted rounded-lg px-3 py-2.5">
                        <div className="text-[11px] text-muted-foreground font-semibold">Agents</div>
                        <div className="text-[15px] font-bold mt-0.5">{m.detail.agents}</div>
                      </div>
                      <div className="bg-muted rounded-lg px-3 py-2.5">
                        <div className="text-[11px] text-muted-foreground font-semibold">Citations</div>
                        <div className="text-[15px] font-bold mt-0.5">{m.detail.citations}</div>
                      </div>
                      <div className="bg-muted rounded-lg px-3 py-2.5">
                        <div className="text-[11px] text-muted-foreground font-semibold">Value</div>
                        <div className="text-[15px] font-bold mt-0.5">{m.detail.value}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* SECTION: ALERTS */}
      <section>
        <SectionHead ic="ti-bell-ringing" title="Alert center" meta="System alerts & recommendations" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {PERF_ALERTS.map((al) => (
            <Card
              key={al.key}
              className="relative cursor-pointer hover:translate-x-1 hover:shadow-md transition-all"
              onClick={() => toast.info(`Viewing alert: ${al.t}`)}
            >
              <div className="absolute left-0 top-2.5 bottom-2.5 w-[3px] rounded-sm" style={{ background: al.sevc }} />
              <CardContent className="p-3.5 flex gap-3 items-start">
                <div className="w-8.5 h-8.5 rounded-lg flex items-center justify-center text-base shrink-0" style={{ background: soft(al.tint), color: al.tint }}>
                  <i className={`ti ${al.ic}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-semibold">{al.t}</div>
                  <div className="text-[11.5px] text-muted-foreground mt-0.5 leading-snug">{al.s}</div>
                  <div className="text-[11px] text-slate-400 mt-1">{al.when}</div>
                </div>
                <Badge className="text-[10px] font-bold uppercase shrink-0" style={{ background: al.sevbg, color: al.sevc }}>
                  {al.sev}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* SECTION: INSIGHTS */}
      <section>
        <SectionHead ic="ti-bulb" title="Business insights" meta="AI-generated observations" />
        <Card className="bg-gradient-to-br from-[#F8FAFF] to-white">
          <CardContent className="p-6">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-c-orange-mid text-white flex items-center justify-center text-xl shrink-0">
                <i className="ti ti-sparkles" />
              </div>
              <div>
                <div className="text-[14.5px] font-bold">Executive Summary</div>
                <div className="text-xs text-muted-foreground mt-0.5">Generated from your latest data</div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2.5">
              {PERF_INSIGHTS.map((ins, i) => (
                <div key={i} className="flex gap-2.5 text-sm text-slate-700 leading-relaxed items-start">
                  <i className="ti ti-check text-emerald-700 text-base mt-0.5 shrink-0" />
                  <span dangerouslySetInnerHTML={{ __html: ins }} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
