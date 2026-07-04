"use client";

import React, { useState } from "react";
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

const YOU = {
  id:'acme', name:'Acme', logo:'A', color:'#6366F1', you:true,
  sov:41, sovChg:3, vis:74, visChg:5, threat:'low', rank:2,
  tagline:'Your brand',
  models:{ChatGPT:82,Claude:84,Gemini:71,Perplexity:78,Copilot:69,Grok:58},
  citations:{total:'1,910', share:'24%'},
  content:{velocity:'9 / wk'},
  trend:[33,34,35,36,37,38,38,39,40,40,41,41]
};

const COMPS = [
  {
    id:'profound', name:'Profound', logo:'P', color:'#7C3AED', you:false,
    sov:48, sovChg:6, vis:82, visChg:4, threat:'high', rank:1,
    tagline:'Category leader · AEO analytics',
    models:{ChatGPT:88,Claude:79,Gemini:85,Perplexity:90,Copilot:72,Grok:61},
    citations:{total:'2,840', share:'29%'},
    content:{velocity:'18 / wk'},
    trend:[40,41,42,43,44,45,45,46,47,47,48,48]
  },
  {
    id:'brightedge', name:'BrightEdge', logo:'B', color:'#2563EB', you:false,
    sov:33, sovChg:-2, vis:69, visChg:1, threat:'med', rank:3,
    tagline:'Incumbent SEO → AEO',
    models:{ChatGPT:80,Claude:64,Gemini:72,Perplexity:66,Copilot:78,Grok:52},
    citations:{total:'2,110', share:'22%'},
    content:{velocity:'11 / wk'},
    trend:[36,36,35,35,34,34,34,33,33,33,33,33]
  },
  {
    id:'conductor', name:'Conductor', logo:'C', color:'#14B8A6', you:false,
    sov:27, sovChg:1, vis:63, visChg:2, threat:'med', rank:4,
    tagline:'Content intelligence',
    models:{ChatGPT:72,Claude:66,Gemini:64,Perplexity:60,Copilot:65,Grok:49},
    citations:{total:'1,540', share:'16%'},
    content:{velocity:'14 / wk'},
    trend:[24,24,25,25,26,26,26,27,27,27,27,27]
  },
  {
    id:'seoclarity', name:'seoClarity', logo:'S', color:'#D97706', you:false,
    sov:19, sovChg:0, vis:55, visChg:-1, threat:'low', rank:5,
    tagline:'Enterprise SEO suite',
    models:{ChatGPT:66,Claude:52,Gemini:58,Perplexity:50,Copilot:62,Grok:44},
    citations:{total:'990', share:'10%'},
    content:{velocity:'7 / wk'},
    trend:[19,19,19,19,19,19,19,19,19,19,19,19]
  },
  {
    id:'otterly', name:'Otterly AI', logo:'O', color:'#DC2626', you:false,
    sov:14, sovChg:4, vis:51, visChg:7, threat:'low', rank:6,
    tagline:'AEO challenger · fast riser',
    models:{ChatGPT:54,Claude:58,Gemini:46,Perplexity:60,Copilot:42,Grok:48},
    citations:{total:'480', share:'5%'},
    content:{velocity:'12 / wk'},
    trend:[8,9,9,10,11,11,12,12,13,13,14,14]
  }
];

const competitors = [YOU, ...COMPS].sort((a,b) => b.sov - a.sov);

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

// Transform trend data for Recharts
const chartData = Array.from({length: 12}).map((_, i) => {
  const point: any = { name: `Wk ${i+1}` };
  competitors.forEach(c => {
    point[c.name] = c.trend[i];
  });
  return point;
});

function getSparkline(data: number[]) {
  const w = 80, h = 24;
  const mn = Math.min(...data), mx = Math.max(...data), rng = mx - mn || 1;
  return data.map((v, i) => `${(i / (data.length - 1) * w).toFixed(1)},${(h - ((v - mn) / rng) * h).toFixed(1)}`).join(' ');
}

export default function CompetitorWatchPage() {
  const [range, setRange] = useState('30D');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const L = competitors[0];
  const gap = YOU.vis - L.vis;
  const activeThreats = COMPS.filter(c => c.threat === 'high' || (c.threat === 'med' && c.sovChg > 0)).length;

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
          <div className="flex bg-slate-200/60 p-0.5 rounded-[8px]">
            {['7D', '30D', '90D'].map(r => (
              <button 
                key={r} 
                onClick={() => setRange(r)}
                className={`px-3 py-1 rounded-[6px] transition-colors ${range === r ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}
              >
                {r}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-[8px] text-slate-700 hover:bg-slate-50 shadow-sm">
            <Download className="w-3.5 h-3.5" /> Export <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>
      </div>

      {/* SECTION 1 — KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
        {kpis.map((k, i) => (
          <div key={i} className="bg-white border border-slate-200 p-5 rounded-[14px] shadow-sm flex flex-col relative group hover:border-indigo-200 transition-colors cursor-pointer">
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

            {/* Faux Sparkline based on previous values if you wanted one, but sticking to the clean data for now. */}
            {k.key === 'sov' && (
              <div className="absolute bottom-4 right-5 opacity-40">
                <svg viewBox="0 0 80 24" preserveAspectRatio="none" className="w-[60px] h-[20px]">
                  <polyline points={getSparkline(YOU.trend)} fill="none" stroke="#6366F1" strokeWidth="2" />
                </svg>
              </div>
            )}
          </div>
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
          
          <div className="bg-white border border-slate-200 rounded-[14px] shadow-sm overflow-hidden divide-y divide-slate-100">
            {competitors.map((c, i) => {
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
                      <div className="w-9 h-9 rounded-md text-white flex items-center justify-center font-bold text-[15px] shrink-0" style={{ backgroundColor: c.color }}>
                        {c.logo}
                      </div>
                      <div className="truncate">
                        <div className="text-[14.5px] font-bold text-slate-900 flex items-center gap-2">
                          {c.name} {isYou && <span className="bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded-[4px] text-[10px] font-bold">YOU</span>}
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
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider
                        ${c.threat==='high' ? 'bg-red-50 text-red-600' : c.threat==='med' ? 'bg-amber-50 text-amber-600' : 'bg-slate-100 text-slate-600'}
                      `}>
                        <div className={`w-1.5 h-1.5 rounded-full ${c.threat==='high' ? 'bg-red-500' : c.threat==='med' ? 'bg-amber-500' : 'bg-slate-400'}`}></div>
                        {c.threat}
                      </span>
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
                      
                      <button className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white rounded-[8px] text-[12.5px] font-semibold hover:bg-indigo-700 shadow-sm transition-colors">
                        <Sidebar className="w-4 h-4" /> View full analysis
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* AI VISIBILITY SNAPSHOT */}
        <div>
          <div className="mb-4">
            <h2 className="text-[17px] font-bold flex items-center gap-2 text-slate-900"><TrendingUp className="w-5 h-5 text-indigo-500"/> Visibility Snapshot</h2>
            <p className="text-[13px] text-slate-500">Share of voice trend across all tracked brands.</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-[14px] p-5 shadow-sm">
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
                  {competitors.map(c => (
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
              {competitors.map(c => (
                <div key={c.id} className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-600">
                  <div className={`w-2 h-2 rounded-full`} style={{ backgroundColor: c.color }}></div>
                  {c.name}
                </div>
              ))}
            </div>
          </div>
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
          <div className="bg-white border border-slate-200 rounded-[14px] shadow-sm flex flex-col">
            <div className="flex flex-col divide-y divide-slate-100">
              {OPPS.map((o, i) => (
                <div key={i} className="p-4 flex gap-4 hover:bg-slate-50 transition-colors cursor-pointer group">
                  <div className={`w-10 h-10 rounded-[10px] shrink-0 flex items-center justify-center ${o.bg} ${o.tint}`}>
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
            <button className="w-full p-3 text-[13px] font-semibold text-indigo-600 hover:text-indigo-700 bg-slate-50 rounded-b-[14px] border-t border-slate-100">
              View all opportunities
            </button>
          </div>
        </div>

        {/* ACTIVITY FEED */}
        <div>
          <div className="mb-4">
            <h2 className="text-[17px] font-bold flex items-center gap-2 text-slate-900"><Zap className="w-5 h-5 text-amber-500"/> Activity feed</h2>
            <p className="text-[13px] text-slate-500">Competitive timeline and smart alerts.</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-[14px] shadow-sm flex flex-col">
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
            <button className="w-full p-3 text-[13px] font-semibold text-indigo-600 hover:text-indigo-700 bg-slate-50 rounded-b-[14px] border-t border-slate-100">
              View complete timeline
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
