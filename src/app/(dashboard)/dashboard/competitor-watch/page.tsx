"use client";

import React, { useState, useEffect } from "react";
import { 
  Trophy, PieChart as PieChartIcon, Eye, ShieldAlert,
  ChevronDown, ChevronUp, Sidebar, Download, RefreshCcw,
  ArrowUpRight, TrendingUp, TrendingDown, Minus,
  Layers as Versions, FileCode, Link2, Target, Zap, MessageCircle,
  AlertTriangle, CheckCircle2, LayoutTemplate, Search
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useOrganizationStore } from "@/lib/stores/organizationStore";
import apiClient from "@/lib/apiClient";
import { getDomainLogoUrl } from "@/lib/logoUtils";
import { LogoAvatar } from "@/components/ui/logo-avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const OPPS = [
  {ic: Versions, tint:'text-red-600', bg:'bg-red-50', t:'Publish comparison pages vs Profound', why:'They just took 3 "vs" queries you ranked for on Perplexity.', impact:'+$28k'},
  {ic: FileCode, tint:'text-blue-600', bg:'bg-blue-50', t:'Add FAQ schema to high-intent guides', why:'BrightEdge guides outrank you but lack structured answers — an opening.', impact:'+$22k'},
  {ic: Link2, tint:'text-purple-600', bg:'bg-purple-50', t:'Earn 3 third-party listicle placements', why:'Listicles drive the most AI citations; Profound leads here.', impact:'+$40k'},
  {ic: Target, tint:'text-teal-600', bg:'bg-teal-50', t:'Defend tooling queries from seoClarity', why:'Strengthen entity pages before their AI module matures.', impact:'+$9k'},
];

const ACTIVITY = [
  {type:'risk', ic: AlertTriangle, tint:'text-red-600', bg:'bg-red-50', t:'Profound published 4 comparison pages', d:'Targeting "vs" queries you win on Perplexity.', time:'2h ago'},
  {type:'risk', ic: TrendingUp, tint:'text-red-600', bg:'bg-red-50', t:'Otterly AI share rose 4% this month', d:'Steepest growth curve in the tracked set.', time:'5h ago'},
  {type:'win', ic: CheckCircle2, tint:'text-emerald-600', bg:'bg-emerald-50', t:'Acme citation share up 2% on Claude', d:'New entity page resolved brand identity.', time:'1d ago'},
  {type:'move', ic: Versions, tint:'text-blue-600', bg:'bg-blue-50', t:'BrightEdge republished flagship guide', d:'Updated for AI overviews — no schema added (opening).', time:'4d ago'},
  {type:'risk', ic: Link2, tint:'text-red-600', bg:'bg-red-50', t:'Profound gained 3 listicle placements', d:'Now driving fresh AI citations on high-intent queries.', time:'1w ago'}
];

const MODEL_ORDER = ['ChatGPT','Claude','Gemini','Perplexity'];

function getSparkline(data: number[]) {
  const w = 80, h = 24;
  const mn = Math.min(...data), mx = Math.max(...data), rng = mx - mn || 1;
  return data.map((v, i) => `${(i / (data.length - 1) * w).toFixed(1)},${(h - ((v - mn) / rng) * h).toFixed(1)}`).join(' ');
}

const LEADERBOARD_PAGE_SIZE = 10;

export default function CompetitorWatch() {
  const router = useRouter();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showAllCompetitors, setShowAllCompetitors] = useState(false);
  const [range, setRange] = useState('30D');
  
  const { organizationId } = useOrganizationStore();
  const [YOU, setYOU] = useState<any>(null);
  const [COMPS, setCOMPS] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [rescanning, setRescanning] = useState(false);

  const fetchData = React.useCallback(async () => {
    if (!organizationId) return;
    try {
      setLoading(true);
      const res = await apiClient.get(`/Dashboard/competitor-watch`, { params: { organizationId } });
      setYOU(res.data.you);
      setCOMPS(res.data.comps);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [organizationId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleRescan = async () => {
    if (!organizationId || rescanning) return;
    setRescanning(true);
    try {
      const res = await apiClient.post(`/Dashboard/competitor-watch/rescan`, null, { params: { organizationId } });
      setYOU(res.data.you);
      setCOMPS(res.data.comps);
      toast.success("Competitor scan refreshed");
    } catch (err) {
      console.error(err);
      toast.error("Rescan failed — try again in a moment");
    } finally {
      setRescanning(false);
    }
  };

  const handleExport = () => {
    if (!YOU) {
      toast.error("Nothing to export yet");
      return;
    }
    const all = [YOU, ...COMPS].sort((a, b) => a.rank - b.rank);
    const rows = ["Rank,Name,Share of Voice %,SOV Change,Visibility,Threat"];
    all.forEach((c) => rows.push(`${c.rank},"${(c.name as string).replace(/"/g, '""')}",${c.sov},${c.sovChg},${c.vis},${c.threat ?? ""}`));

    const csv = rows.join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `competitor-watch-${range}-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success("Competitor report exported");
  };

  if (loading) {
    return (
      <div className="flex-1 p-8 bg-[#f8fafc] text-slate-900 min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <RefreshCcw className="w-8 h-8 text-indigo-500 animate-spin mb-4" />
          <p className="text-slate-500 font-medium">Gathering competitor intelligence...</p>
        </div>
      </div>
    );
  }

  if (!YOU) {
    return (
      <div className="flex-1 p-8 bg-[#f8fafc] text-slate-900 min-h-screen flex items-center justify-center">
        <Card className="max-w-md border-amber-500/30 bg-amber-500/5">
          <CardContent className="p-6 text-center">
            <ShieldAlert className="w-10 h-10 text-amber-500 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-900 mb-1.5">No competitor analysis yet</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Complete onboarding analysis for this organization — your first competitor scan runs
              automatically and refreshes every 7 days after that.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const competitors = [YOU, ...COMPS].sort((a,b) => a.rank - b.rank);
  const L = competitors[0];
  const gap = YOU.vis - L.vis;
  const activeThreats = COMPS.filter(c => c.threat === 'high' || (c.threat === 'med' && c.sovChg > 0)).length;

  // With dozens of real tracked competitors, rendering every row unconditionally makes the
  // page unusably long — show a manageable top slice by default (always including "you" even
  // if your rank falls outside it), and let "Show all" reveal the complete list on demand.
  const topSlice = competitors.slice(0, LEADERBOARD_PAGE_SIZE);
  const visibleCompetitors = showAllCompetitors
    ? competitors
    : topSlice.some(c => c.you)
      ? topSlice
      : [...topSlice.slice(0, LEADERBOARD_PAGE_SIZE - 1), YOU].sort((a, b) => a.rank - b.rank);

  const chartData = Array.from({length: 12}).map((_, i) => {
    const point: any = { name: `Wk ${i+1}` };
    visibleCompetitors.forEach(c => {
      point[c.name] = c.trend[i];
    });
    return point;
  });

  const kpis = [
    { key:'position', label:'Competitive position', val:`#${YOU.rank}`, sub:`of ${competitors.length} brands tracked`, tone:'text-amber-500', bg:'bg-amber-50', ic: Trophy, chg: null },
    { key:'sov', label:'Share of voice', val:`${YOU.sov}%`, chg:`${YOU.sovChg >= 0 ? '+' : ''}${YOU.sovChg}%`, dir: YOU.sovChg >= 0 ? 'up' : 'down', sub:'of AI answer mentions', tone:'text-indigo-500', bg:'bg-indigo-50', ic: PieChartIcon },
    { key:'gap', label:'Gap vs leader', val:`${gap >= 0 ? '+' : ''}${gap} pts`, sub:`vs ${L.name} visibility`, tone: gap >= 0 ? 'text-emerald-500' : 'text-amber-500', bg: gap >= 0 ? 'bg-emerald-50' : 'bg-amber-50', ic: Eye, chg: null },
    { key:'threats', label:'Active threats', val: activeThreats, sub:'competitors gaining ground', tone:'text-red-500', bg:'bg-red-50', ic: ShieldAlert, chg: null }
  ];

  return (
    <div className="flex-1 p-8 bg-[#f8fafc] text-slate-900 min-h-screen pb-24">
      {/* PAGE HEADER */}
      <div className="flex flex-col lg:flex-row justify-between lg:items-start mb-8 gap-4">
        <div className="max-w-2xl">
          <h1 className="text-[28px] font-space-grotesk font-bold tracking-tight text-slate-900">
            Competitor Watch
          </h1>
          <p className="text-[14px] text-slate-500 mt-1 leading-relaxed">
            Executive view of where you stand across AI answer engines vs. your top competitors.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-[13px] font-semibold">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 text-slate-600 rounded-[8px]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Live
          </div>
          <div className="flex bg-slate-200/60 p-0.5 rounded-lg">
            {['7D', '30D', '90D'].map(r => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={`px-3 py-1 rounded-lg transition-colors ${range === r ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}
              >
                {r}
              </button>
            ))}
          </div>
          <Button variant="outline" size="sm" onClick={handleRescan} disabled={rescanning}>
            <RefreshCcw className={`w-3.5 h-3.5 ${rescanning ? "animate-spin" : ""}`} /> {rescanning ? "Rescanning…" : "Rescan"}
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="w-3.5 h-3.5" /> Export <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </Button>
        </div>
      </div>

      {/* SECTION 1 — KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
        {kpis.map((k, i) => (
          <Card key={i} className="relative group hover:border-indigo-200 transition-colors cursor-pointer">
            <CardContent className="p-5 flex flex-col">
              <div className="flex justify-between items-start mb-3">
                <span className="text-[13.5px] font-semibold text-slate-600">{k.label}</span>
                <k.ic className={`w-5 h-5 ${k.tone}`} />
              </div>

              <div className="flex items-end gap-2 mb-1">
                <div className="text-[26px] font-space-grotesk font-bold leading-none text-slate-900">
                  {k.val}
                </div>
                {k.chg && (
                  <div className={`text-[12px] font-bold mb-0.5 ${k.dir === 'up' ? 'text-emerald-500' : 'text-red-500'}`}>
                    {k.chg}
                  </div>
                )}
              </div>
              <div className="text-[12.5px] text-slate-500">{k.sub}</div>

              {k.key === 'sov' && (
                <div className="absolute bottom-4 right-5 opacity-40">
                  <svg viewBox="0 0 80 24" preserveAspectRatio="none" className="w-[60px] h-[20px]">
                    <polyline points={getSparkline(YOU.trend)} fill="none" stroke="#6366F1" strokeWidth="2" />
                  </svg>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* SECTION 2 — Lower Section Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-10">
        
        {/* LEADERBOARD (2 cols wide) */}
        <div className="xl:col-span-2">
          <div className="mb-4">
            <h2 className="text-[17px] font-bold flex items-center gap-2 text-slate-900"><Trophy className="w-5 h-5 text-amber-500"/> Competitor Leaderboard</h2>
            <p className="text-[13px] text-slate-500">Ranked by share of voice in AI answers. Expand a row for a snapshot.</p>
          </div>
          
          <Card className="overflow-hidden py-0 gap-0">
            <div className="divide-y divide-slate-100">
            {visibleCompetitors.map((c, i) => {
              const isExpanded = expandedId === c.id;
              const isYou = c.you;
              
              return (
                <div key={c.id} className={`${isYou ? 'bg-indigo-50/30' : ''} transition-colors`}>
                  {/* Row Header */}
                  <div 
                    onClick={() => setExpandedId(isExpanded ? null : c.id)}
                    className="flex items-center gap-4 p-4 hover:bg-slate-50 cursor-pointer select-none"
                  >
                    <div className="w-6 text-center text-[13px] font-bold text-slate-400 shrink-0">{c.rank}</div>
                    
                    <div className="flex-1 flex items-center gap-3 min-w-0">
                      <LogoAvatar
                        logoUrl={getDomainLogoUrl(c.websiteUrl)}
                        fallbackInitial={c.logo}
                        fallbackColor={c.color}
                        className="rounded-md text-[15px]"
                        size={36}
                      />
                      <div className="truncate">
                        <div className="text-[14.5px] font-bold text-slate-900 flex items-center gap-2">
                          {c.name} {isYou && <Badge className="bg-indigo-100 text-indigo-700 text-[10px] font-bold">YOU</Badge>}
                        </div>
                        <div className="text-[12px] text-slate-500 truncate">{c.tagline}</div>
                      </div>
                    </div>
                    
                    {/* SOV Col */}
                    <div className="w-24 shrink-0 text-right">
                      <div className="text-[14px] font-bold text-slate-900">{c.sov}%</div>
                      <div className={`text-[11.5px] font-semibold ${c.sovChg >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                        {c.sovChg >= 0 ? '+' : ''}{c.sovChg}%
                      </div>
                    </div>

                    {/* Vis Col */}
                    <div className="w-24 shrink-0 text-right hidden sm:block">
                      <div className="text-[14px] font-bold text-slate-900">{c.vis}</div>
                      <div className={`text-[11.5px] font-semibold ${c.visChg >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                        {c.visChg >= 0 ? '+' : ''}{c.visChg} pts
                      </div>
                    </div>

                    {/* Threat Col */}
                    <div className="w-24 shrink-0 text-right hidden md:block">
                      <Badge className={`text-[10px] uppercase font-bold tracking-wider ${c.threat==='high' ? 'bg-red-50 text-red-600' : c.threat==='med' ? 'bg-amber-50 text-amber-600' : 'bg-slate-100 text-slate-600'}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${c.threat==='high' ? 'bg-red-500' : c.threat==='med' ? 'bg-amber-500' : 'bg-slate-400'}`}></div>
                        {c.threat}
                      </Badge>
                    </div>

                    <div className="w-6 shrink-0 flex justify-end text-slate-400">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>

                  {/* Expanded Detail View */}
                  {isExpanded && (
                    <div className="p-5 border-t border-slate-100 bg-slate-50/50">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div>
                          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Share of voice</div>
                          <div className="text-[18px] font-space-grotesk font-bold text-slate-900 leading-none mb-1">{c.sov}%</div>
                          <div className={`text-[11px] font-medium ${c.sovChg >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>{c.sovChg >= 0 ? '+' : ''}{c.sovChg}% this period</div>
                        </div>
                        <div>
                          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">AI Visibility</div>
                          <div className="text-[18px] font-space-grotesk font-bold text-slate-900 leading-none mb-1">{c.vis}</div>
                          <div className={`text-[11px] font-medium ${c.visChg >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>{c.visChg >= 0 ? '+' : ''}{c.visChg} pts this period</div>
                        </div>
                        <div>
                          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Citation share</div>
                          <div className="text-[18px] font-space-grotesk font-bold text-slate-900 leading-none mb-1">{c.citations.share}</div>
                          <div className="text-[11px] font-medium text-slate-500">{c.citations.total} total</div>
                        </div>
                        <div>
                          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Content velocity</div>
                          <div className="text-[18px] font-space-grotesk font-bold text-slate-900 leading-none mb-1">{c.content.velocity.split(' ')[0]}</div>
                          <div className="text-[11px] font-medium text-slate-500">pages / week</div>
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <div className="text-[12px] font-bold text-slate-900 mb-3">AI visibility by model (Top 4)</div>
                        <div className="flex flex-col gap-3">
                          {MODEL_ORDER.map(m => {
                            const val = (c.models as any)[m] || 0;
                            return (
                              <div key={m} className="flex items-center gap-3">
                                <span className="w-[75px] text-[12px] font-semibold text-slate-700">{m}</span>
                                <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                                  <div className="h-full rounded-full transition-all" style={{ width: `${val}%`, backgroundColor: c.color }}></div>
                                </div>
                                <span className="w-8 text-right text-[12px] font-bold text-slate-900">{val}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      
                      <Button size="sm">
                        <Sidebar className="w-4 h-4" /> View full analysis
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
            </div>
            {competitors.length > LEADERBOARD_PAGE_SIZE && (
              <button
                onClick={() => setShowAllCompetitors((v) => !v)}
                className="w-full p-3 text-[13px] font-semibold text-indigo-600 hover:text-indigo-700 bg-slate-50 border-t border-slate-100"
              >
                {showAllCompetitors ? 'Show top 10 only' : `Show all ${competitors.length} competitors`}
              </button>
            )}
          </Card>
        </div>

        {/* AI VISIBILITY SNAPSHOT */}
        <div>
          <div className="mb-4">
            <h2 className="text-[17px] font-bold flex items-center gap-2 text-slate-900"><TrendingUp className="w-5 h-5 text-indigo-500"/> Visibility Snapshot</h2>
            <p className="text-[13px] text-slate-500">Share of voice trend across all tracked brands.</p>
          </div>
          <Card>
            <CardContent className="p-5">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px', fontWeight: 'bold' }}
                      itemStyle={{ color: '#0f172a' }}
                    />
                    {visibleCompetitors.map(c => (
                      <Line
                        key={c.id}
                        type="monotone"
                        dataKey={c.name}
                        stroke={c.color}
                        strokeWidth={c.you ? 3 : 1.5}
                        dot={false}
                        activeDot={{ r: 4 }}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-4 flex flex-wrap gap-x-3 gap-y-2 justify-center">
                {visibleCompetitors.map(c => (
                  <div key={c.id} className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-600">
                    <div className={`w-2 h-2 rounded-full`} style={{ backgroundColor: c.color }}></div>
                    {c.name}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

      </div>

      {/* SECTION 3 — Growth & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* GROWTH OPPORTUNITIES */}
        <div>
          <div className="mb-4">
            <h2 className="text-[17px] font-bold flex items-center gap-2 text-slate-900"><Target className="w-5 h-5 text-emerald-500"/> Growth opportunities</h2>
            <p className="text-[13px] text-slate-500">Content gaps prioritized by estimated impact.</p>
          </div>
          <Card className="py-0 gap-0 overflow-hidden">
            <div className="flex flex-col divide-y divide-slate-100">
              {OPPS.map((o, i) => (
                <div key={i} className="p-4 flex gap-4 hover:bg-slate-50 transition-colors cursor-pointer group">
                  <div className={`w-10 h-10 rounded-lg shrink-0 flex items-center justify-center ${o.bg} ${o.tint}`}>
                    <o.ic className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[14px] font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{o.t}</div>
                    <div className="text-[12.5px] text-slate-500 mt-1 leading-relaxed">{o.why}</div>
                  </div>
                  <div className="shrink-0 text-right">
                    <div className="text-[14px] font-bold text-emerald-600">{o.impact}</div>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => router.push("/dashboard/opportunity-finder")}
              className="w-full p-3 text-[13px] font-semibold text-indigo-600 hover:text-indigo-700 bg-slate-50 border-t border-slate-100"
            >
              View all opportunities
            </button>
          </Card>
        </div>

        {/* ACTIVITY FEED */}
        <div>
          <div className="mb-4">
            <h2 className="text-[17px] font-bold flex items-center gap-2 text-slate-900"><Zap className="w-5 h-5 text-amber-500"/> Activity feed</h2>
            <p className="text-[13px] text-slate-500">Competitive timeline and smart alerts.</p>
          </div>
          <Card className="py-0 gap-0 overflow-hidden">
            <div className="flex flex-col divide-y divide-slate-100">
              {ACTIVITY.map((a, i) => (
                <div key={i} className="p-4 flex gap-4 hover:bg-slate-50 transition-colors cursor-pointer group">
                  <div className={`w-10 h-10 rounded-full shrink-0 flex items-center justify-center ${a.bg} ${a.tint}`}>
                    <a.ic className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[14px] font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{a.t}</div>
                    <div className="text-[12.5px] text-slate-500 mt-1">{a.d}</div>
                  </div>
                  <div className="shrink-0 text-[11.5px] font-semibold text-slate-400 mt-0.5">
                    {a.time}
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => toast.info("Full activity timeline coming soon")}
              className="w-full p-3 text-[13px] font-semibold text-indigo-600 hover:text-indigo-700 bg-slate-50 border-t border-slate-100"
            >
              View complete timeline
            </button>
          </Card>
        </div>

      </div>

    </div>
  );
}
