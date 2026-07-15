"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Sparkles, Target,
  Play, Download, ChevronDown, ChevronLeft, ChevronRight,
  Search, ListFilter, LayoutGrid, TrendingUp, ShieldAlert
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { toast } from "sonner";
import { useOrganizationStore } from "@/lib/stores/organizationStore";
import {
  getOpportunityFinder,
  runOpportunityDeepScan,
  OpportunityFinderResponse,
  Opportunity,
} from "@/lib/api/opportunityFinderApi";

function getPriorityBadgeClass(p: string) {
  if (p === "Critical") return "bg-red-100 text-red-700";
  if (p === "High") return "bg-amber-100 text-amber-700";
  if (p === "Medium") return "bg-blue-100 text-blue-700";
  return "bg-slate-100 text-slate-700";
}

function getCustomBadgeClass(badge: string) {
  if (badge.includes("Critical")) return "bg-red-100 text-red-700 border-red-200";
  if (badge.includes("Win")) return "bg-emerald-100 text-emerald-700 border-emerald-200";
  if (badge.includes("Competitive")) return "bg-purple-100 text-purple-700 border-purple-200";
  return "bg-blue-100 text-blue-700 border-blue-200";
}

function sparklinePath(points: number[]) {
  if (points.length < 2) return { line: "M0,15 L100,15", area: "M0,15 L100,15 L100,30 L0,30 Z" };
  const max = Math.max(...points);
  const min = Math.min(...points);
  const rng = max - min || 1;
  const step = 100 / (points.length - 1);
  const coords = points.map((v, i) => [i * step, 28 - ((v - min) / rng) * 26] as const);
  const line = coords.map(([x, y], i) => (i === 0 ? `M${x},${y}` : `L${x},${y}`)).join(" ");
  const area = `${line} L${coords[coords.length - 1][0]},30 L0,30 Z`;
  return { line, area };
}

const SORT_KEYS: Record<string, keyof Opportunity> = {
  title: "title",
  category: "category",
  priority: "priority",
  score: "score",
  gain: "estimatedGainPct",
  difficulty: "difficulty",
};

export default function OpportunityFinderPage() {
  const { organizationId } = useOrganizationStore();
  const [isLoading, setIsLoading] = useState(true);
  const [isScanning, setIsScanning] = useState(false);
  const [data, setData] = useState<OpportunityFinderResponse | null>(null);

  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("all");
  const [sortCol, setSortCol] = useState("score");
  const [sortDesc, setSortDesc] = useState(true);
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!organizationId) return;
    setIsLoading(true);
    try {
      const res = await getOpportunityFinder(organizationId, "30D");
      setData(res);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load opportunity finder data");
    } finally {
      setIsLoading(false);
    }
  }, [organizationId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDeepScan = async () => {
    if (!organizationId || !data?.canRunDeepScan) return;
    setIsScanning(true);
    try {
      const res = await runOpportunityDeepScan(organizationId);
      setData(res);
      toast.success("Deep scan complete — opportunities refreshed");
    } catch (err: any) {
      const message = err?.response?.data?.message ?? "Deep scan failed — please try again";
      toast.error(message);
      fetchData();
    } finally {
      setIsScanning(false);
    }
  };

  const opportunities = data?.opportunities ?? [];

  const handleExport = () => {
    if (opportunities.length === 0) {
      toast.error("Nothing to export yet — run a scan first");
      return;
    }
    const rows = ["Title,Category,Priority,Score,Effort,Difficulty,Estimated Gain %,ETA"];
    opportunities.forEach((o) =>
      rows.push(`"${o.title.replace(/"/g, '""')}",${o.category},${o.priority},${o.score},${o.effort},${o.difficulty},${o.estimatedGainPct},${o.eta}`)
    );
    const csv = rows.join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `opportunity-finder-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success("Opportunities exported");
  };

  const filtered = useMemo(() => {
    let list = opportunities.filter((m) => {
      const s = search.toLowerCase();
      const matchS = m.title.toLowerCase().includes(s) || m.id.toLowerCase().includes(s);
      const matchD = difficulty === "all" || m.difficulty === difficulty;
      return matchS && matchD;
    });
    const key = SORT_KEYS[sortCol] ?? "score";
    list = [...list].sort((a, b) => {
      const valA = a[key];
      const valB = b[key];
      if (typeof valA === "string" && typeof valB === "string") {
        return sortDesc ? valB.localeCompare(valA) : valA.localeCompare(valB);
      }
      return sortDesc ? (valB as number) - (valA as number) : (valA as number) - (valB as number);
    });
    return list;
  }, [opportunities, search, difficulty, sortCol, sortDesc]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const pageList = filtered.slice((page - 1) * pageSize, page * pageSize);

  const handleSort = (col: string) => {
    if (sortCol === col) setSortDesc(!sortDesc);
    else {
      setSortCol(col);
      setSortDesc(true);
    }
  };

  const matrixQuads = useMemo(
    () => ({
      "high-low": opportunities.filter((m) => m.quadrant === "high-low").slice(0, 3),
      "high-high": opportunities.filter((m) => m.quadrant === "high-high").slice(0, 3),
      "low-low": opportunities.filter((m) => m.quadrant === "low-low").slice(0, 3),
      "low-high": opportunities.filter((m) => m.quadrant === "low-high").slice(0, 3),
    }),
    [opportunities],
  );

  const scoreTrend = useMemo(() => (data?.forecast.trend ?? []).map((t) => t.avgScore), [data]);
  const countTrend = useMemo(() => (data?.forecast.trend ?? []).map((t) => t.count), [data]);

  if (!isLoading && data && !data.hasData) {
    return (
      <div className="flex-1 p-3 min-h-screen flex items-center justify-center">
        <Card className="max-w-md p-10 text-center">
          <ShieldAlert className="w-10 h-10 text-amber-500 mx-auto mb-4" />
          <h2 className="text-lg font-bold mb-2">No opportunities yet</h2>
          <p className="text-sm text-slate-500">
            Complete onboarding analysis for this organization first — Opportunity Finder
            populates automatically from your real profile, competitor, citation and visibility data.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex-1 p-3 text-slate-900 min-h-screen pb-24">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row justify-between lg:items-start mb-8 gap-4">
        <div className="max-w-2xl">
          <h1 className="text-[28px] font-space-grotesk font-bold tracking-tight text-slate-900 flex items-center gap-2">
            Opportunity Finder
          </h1>
          <p className="text-[14px] text-slate-500 mt-1 leading-relaxed">
            AI-driven content gap analysis and optimization opportunities prioritizing visibility, authority, and brand coverage.
          </p>
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <div className="flex items-center gap-3">
            <Button size="sm" onClick={handleDeepScan} disabled={!data?.canRunDeepScan || isScanning}>
              <Search className="w-4 h-4" /> {isScanning ? "Scanning…" : "Run Deep Scan"}
            </Button>
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="w-4 h-4" /> Export Report <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </Button>
          </div>
          {data && !data.canRunDeepScan && (
            <span className="text-[12px] text-slate-400">
              Next deep scan available in {data.daysUntilEligible} day{data.daysUntilEligible === 1 ? "" : "s"} ({data.nextEligibleDate})
            </span>
          )}
        </div>
      </div>

      {isLoading && !data ? (
        <div className="py-24 flex flex-col items-center justify-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin" />
          <p className="text-sm text-slate-500">Loading real opportunities…</p>
        </div>
      ) : (
        <>
          {/* KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
            {[
              { label: "Total Opportunities", val: `${data?.kpis.totalOpportunities ?? 0}`, tag: "Active", tagClass: "bg-blue-100 text-blue-700", icon: Target, iconColor: "text-blue-500", desc: "identified in latest scan" },
              { label: "Critical Gaps", val: `${data?.kpis.criticalCount ?? 0}`, tag: "Action Required", tagClass: "bg-red-100 text-red-700", icon: ShieldAlert, iconColor: "text-red-500", desc: "direct brand threats" },
              { label: "Quick Wins", val: `${data?.kpis.quickWinsCount ?? 0}`, tag: "Low Effort", tagClass: "bg-emerald-100 text-emerald-700", icon: Sparkles, iconColor: "text-emerald-500", desc: "high impact, low effort" },
              { label: "Estimated Impact Score", val: `${data?.kpis.estimatedImpactScore ?? 0}`, tag: "AI Score", tagClass: "bg-purple-100 text-purple-700", icon: TrendingUp, iconColor: "text-amber-500", desc: "avg. across opportunities" },
            ].map((k, i) => (
              <Card key={i}>
                <CardContent className="p-5 flex flex-col">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[13px] font-bold text-slate-600">{k.label}</span>
                    <Badge className={`text-[10px] font-bold uppercase tracking-wider ${k.tagClass}`}>{k.tag}</Badge>
                  </div>
                  <div className="text-[28px] font-space-grotesk font-bold leading-none text-slate-900 mb-4">{k.val}</div>
                  <div className="flex items-center gap-1.5 text-[12px] font-medium pt-3 border-t border-slate-100">
                    <span className={`flex items-center ${k.iconColor}`}>
                      <k.icon className="w-3.5 h-3.5 mr-1" />
                    </span>
                    <span className="text-slate-400">{k.desc}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* PRIORITY MISSIONS */}
          <div className="mb-10">
            <h2 className="text-[16px] font-bold text-slate-900 mb-4">Priority Opportunities</h2>
            <div className="flex overflow-x-auto gap-4 pb-2 snap-x">
              {opportunities.slice(0, 5).map((m) => (
                <Card key={m.id} className="min-w-[280px] max-w-[320px] flex-shrink-0 snap-start hover:border-indigo-200 transition-colors">
                  <CardContent className="p-5 flex flex-col justify-between h-full">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[12px] font-bold text-slate-400">{m.id}</span>
                        <Badge variant="outline" className={`text-[11px] font-bold ${getCustomBadgeClass(m.badge)}`}>{m.badge}</Badge>
                      </div>
                      <h3 className="text-[15px] font-bold text-slate-900 leading-snug mb-4 line-clamp-2" title={m.title}>{m.title}</h3>

                      <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-100 mb-4">
                        <div>
                          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-0.5">Score</div>
                          <div className="text-[16px] font-space-grotesk font-bold text-amber-500">{m.score}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-0.5">AI Gain</div>
                          <div className="text-[16px] font-space-grotesk font-bold text-emerald-600">+{m.estimatedGainPct}%</div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 text-[12.5px] text-slate-600 mb-5">
                        <div className="flex justify-between"><span>Difficulty:</span> <span className="font-bold text-slate-900">{m.difficulty}</span></div>
                        <div className="flex justify-between"><span>ETA:</span> <span className="font-bold text-slate-900">{m.eta}</span></div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-auto">
                      <Button size="sm" className="flex-1" onClick={() => toast.info("Execute coming soon")}>
                        <Play className="w-3.5 h-3.5 fill-white" /> Execute
                      </Button>
                      <Button variant="secondary" size="sm" onClick={() => setExpandedId(expandedId === m.id ? null : m.id)}>
                        Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* EXPLORER TABLE & MATRIX */}
          <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] gap-6">
            {/* Table */}
            <div>
              <Card className="py-0 gap-0 overflow-hidden h-full">
                <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="flex items-center gap-2 text-[16px] font-bold text-slate-900">
                    <ListFilter className="w-5 h-5 text-indigo-500" /> Opportunity Explorer
                  </div>
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-48">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 z-10" />
                      <Input
                        type="text"
                        placeholder="Search opportunities..."
                        className="pl-9 text-[13px]"
                        value={search}
                        onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                      />
                    </div>
                    <select className="border border-slate-200 rounded-lg text-[13px] px-2 py-1.5 bg-white outline-none focus:border-indigo-500 transition-colors" value={difficulty} onChange={(e) => { setDifficulty(e.target.value); setPage(1); }}>
                      <option value="all">Any Difficulty</option>
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                </div>

                <div className="overflow-x-auto flex-1">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-slate-50/80 text-[11px] uppercase tracking-wider text-slate-500">
                        <TableHead className="p-4 font-bold cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => handleSort("title")}>
                          <div className="flex items-center justify-between">Opportunity <ChevronDown className="w-3.5 h-3.5 opacity-50" /></div>
                        </TableHead>
                        <TableHead className="p-4 font-bold cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => handleSort("category")}>
                          <div className="flex items-center justify-between">Category <ChevronDown className="w-3.5 h-3.5 opacity-50" /></div>
                        </TableHead>
                        <TableHead className="p-4 font-bold cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => handleSort("priority")}>
                          <div className="flex items-center justify-between">Priority <ChevronDown className="w-3.5 h-3.5 opacity-50" /></div>
                        </TableHead>
                        <TableHead className="p-4 font-bold cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => handleSort("score")}>
                          <div className="flex items-center justify-between">Score <ChevronDown className="w-3.5 h-3.5 opacity-50" /></div>
                        </TableHead>
                        <TableHead className="p-4 font-bold cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => handleSort("gain")}>
                          <div className="flex items-center justify-between">AI Gain <ChevronDown className="w-3.5 h-3.5 opacity-50" /></div>
                        </TableHead>
                        <TableHead className="p-4 font-bold cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => handleSort("difficulty")}>
                          <div className="flex items-center justify-between">Difficulty <ChevronDown className="w-3.5 h-3.5 opacity-50" /></div>
                        </TableHead>
                        <TableHead className="p-4 font-bold text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pageList.map((m) => (
                        <React.Fragment key={m.id}>
                          <TableRow className="cursor-pointer" onClick={() => setExpandedId(expandedId === m.id ? null : m.id)}>
                            <TableCell className="p-4 min-w-[200px]">
                              <div className="text-[11px] font-bold text-slate-400 mb-0.5">{m.id}</div>
                              <div className="text-[13.5px] font-bold text-slate-900">{m.title}</div>
                            </TableCell>
                            <TableCell className="p-4"><Badge variant="outline" className="text-[11px] font-bold">{m.category}</Badge></TableCell>
                            <TableCell className="p-4"><Badge className={`text-[11px] font-bold ${getPriorityBadgeClass(m.priority)}`}>{m.priority}</Badge></TableCell>
                            <TableCell className="p-4">
                              <div className="flex items-center gap-2">
                                <span className="text-[13px] font-bold text-slate-700 w-6">{m.score}</span>
                                <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden w-12">
                                  <div className="h-full bg-amber-500 rounded-full" style={{ width: `${m.score}%` }} />
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="p-4 text-[13px] font-bold text-emerald-600">+{m.estimatedGainPct}%</TableCell>
                            <TableCell className="p-4 text-[13px] font-bold text-slate-900">{m.difficulty}</TableCell>
                            <TableCell className="p-4 text-right">
                              <Button size="sm" onClick={(e) => { e.stopPropagation(); toast.info("Execute coming soon"); }}>
                                <Play className="w-3 h-3 fill-white" /> Execute
                              </Button>
                            </TableCell>
                          </TableRow>
                          {expandedId === m.id && (
                            <TableRow>
                              <TableCell colSpan={7} className="p-5 bg-slate-50/60 border-t-0">
                                <div className="space-y-2">
                                  <p className="text-[13px] text-slate-700"><b>Summary:</b> {m.summary}</p>
                                  <p className="text-[13px] text-slate-700"><b>Why it matters:</b> {m.whyItMatters}</p>
                                  <p className="text-[13px] text-slate-700"><b>Context:</b> {m.competitorContext}</p>
                                  {m.checklist.length > 0 && (
                                    <ul className="list-disc list-inside text-[13px] text-slate-600 space-y-1 pt-1">
                                      {m.checklist.map((c, ci) => <li key={ci}>{c}</li>)}
                                    </ul>
                                  )}
                                </div>
                              </TableCell>
                            </TableRow>
                          )}
                        </React.Fragment>
                      ))}
                      {pageList.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={7} className="p-8 text-center text-slate-500 text-[13.5px]">No opportunities match your filters.</TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>

                <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
                  <span className="text-[12.5px] text-slate-500 font-medium">
                    Showing {total > 0 ? (page - 1) * pageSize + 1 : 0}-{Math.min(page * pageSize, total)} of {total} opportunities
                  </span>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </div>

            {/* Matrix & Forecast */}
            <div className="flex flex-col gap-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-[16px] font-bold text-slate-900 mb-1">
                    <LayoutGrid className="w-5 h-5 text-indigo-500" /> Opportunity Matrix
                  </div>
                  <p className="text-[13px] text-slate-500 mb-6">Prioritizing effort vs AI visibility impact.</p>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-emerald-50/50 border border-emerald-100 rounded-[12px] p-3 flex flex-col gap-2">
                      <div>
                        <div className="text-[12.5px] font-bold text-emerald-800">⚡ Quick Wins</div>
                        <div className="text-[10px] uppercase font-bold tracking-wider text-emerald-600/70">High Impact, Low Effort</div>
                      </div>
                      {matrixQuads["high-low"].map((m) => (
                        <div key={m.id} className="text-[11.5px] font-medium text-emerald-900 bg-white border border-emerald-100/60 p-2 rounded-[8px] truncate shadow-sm" title={m.title}>
                          {m.id}: {m.title}
                        </div>
                      ))}
                      {matrixQuads["high-low"].length === 0 && <div className="text-[11px] text-emerald-700/60 italic">None right now.</div>}
                    </div>

                    <div className="bg-blue-50/50 border border-blue-100 rounded-[12px] p-3 flex flex-col gap-2">
                      <div>
                        <div className="text-[12.5px] font-bold text-blue-800">🎯 Strategic Projects</div>
                        <div className="text-[10px] uppercase font-bold tracking-wider text-blue-600/70">High Impact, High Effort</div>
                      </div>
                      {matrixQuads["high-high"].map((m) => (
                        <div key={m.id} className="text-[11.5px] font-medium text-blue-900 bg-white border border-blue-100/60 p-2 rounded-[8px] truncate shadow-sm" title={m.title}>
                          {m.id}: {m.title}
                        </div>
                      ))}
                      {matrixQuads["high-high"].length === 0 && <div className="text-[11px] text-blue-700/60 italic">None right now.</div>}
                    </div>

                    <div className="bg-slate-50/80 border border-slate-200 rounded-[12px] p-3 flex flex-col gap-2">
                      <div>
                        <div className="text-[12.5px] font-bold text-slate-700">🔧 Fill-Ins</div>
                        <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500/70">Low Impact, Low Effort</div>
                      </div>
                      {matrixQuads["low-low"].map((m) => (
                        <div key={m.id} className="text-[11.5px] font-medium text-slate-700 bg-white border border-slate-200/60 p-2 rounded-[8px] truncate shadow-sm" title={m.title}>
                          {m.id}: {m.title}
                        </div>
                      ))}
                      {matrixQuads["low-low"].length === 0 && <div className="text-[11px] text-slate-500/60 italic">None right now.</div>}
                    </div>

                    <div className="bg-amber-50/50 border border-amber-100 rounded-[12px] p-3 flex flex-col gap-2">
                      <div>
                        <div className="text-[12.5px] font-bold text-amber-800">⏳ Thankless Tasks</div>
                        <div className="text-[10px] uppercase font-bold tracking-wider text-amber-600/70">Low Impact, High Effort</div>
                      </div>
                      {matrixQuads["low-high"].map((m) => (
                        <div key={m.id} className="text-[11.5px] font-medium text-amber-900 bg-white border border-amber-100/60 p-2 rounded-[8px] truncate shadow-sm" title={m.title}>
                          {m.id}: {m.title}
                        </div>
                      ))}
                      {matrixQuads["low-high"].length === 0 && <div className="text-[11px] text-amber-700/60 italic">None right now.</div>}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-[16px] font-bold text-slate-900 mb-1">
                    <TrendingUp className="w-5 h-5 text-indigo-500" /> Opportunity Forecast
                  </div>
                  <p className="text-[13px] text-slate-500 mb-6">Real trend across your weekly opportunity scans.</p>

                  <div className="flex flex-col gap-5">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                      <div>
                        <div className="text-[11.5px] font-bold uppercase tracking-wider text-slate-400 mb-1">Potential AI Growth</div>
                        <div className="text-[20px] font-space-grotesk font-bold text-slate-900 leading-none mb-1.5">+{data?.forecast.potentialGainPct ?? 0}%</div>
                        <div className="text-[11.5px] font-medium text-emerald-600 flex items-center gap-1"><TrendingUp className="w-3.5 h-3.5" /> Avg. across open opportunities</div>
                      </div>
                      <div className="w-24 h-8 opacity-70">
                        <svg viewBox="0 0 100 30">
                          <path d={sparklinePath(scoreTrend).line} fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" />
                          <path d={sparklinePath(scoreTrend).area} fill="rgba(16,185,129,0.06)" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                      <div>
                        <div className="text-[11.5px] font-bold uppercase tracking-wider text-slate-400 mb-1">Opportunities Tracked</div>
                        <div className="text-[20px] font-space-grotesk font-bold text-slate-900 leading-none mb-1.5">{data?.kpis.totalOpportunities ?? 0}</div>
                        <div className="text-[11.5px] font-medium text-emerald-600 flex items-center gap-1"><TrendingUp className="w-3.5 h-3.5" /> Per weekly scan</div>
                      </div>
                      <div className="w-24 h-8 opacity-70">
                        <svg viewBox="0 0 100 30">
                          <path d={sparklinePath(countTrend).line} fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" />
                          <path d={sparklinePath(countTrend).area} fill="rgba(16,185,129,0.06)" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-[11.5px] font-bold uppercase tracking-wider text-slate-400 mb-1">Avg. Opportunity Score</div>
                        <div className="text-[20px] font-space-grotesk font-bold text-slate-900 leading-none mb-1.5">{data?.kpis.estimatedImpactScore ?? 0}</div>
                        <div className="text-[11.5px] font-medium text-emerald-600 flex items-center gap-1"><TrendingUp className="w-3.5 h-3.5" /> Trending across scans</div>
                      </div>
                      <div className="w-24 h-8 opacity-70">
                        <svg viewBox="0 0 100 30">
                          <path d={sparklinePath(scoreTrend).line} fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" />
                          <path d={sparklinePath(scoreTrend).area} fill="rgba(16,185,129,0.06)" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
