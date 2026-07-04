"use client";

import React, { useState } from "react";
import { 
  HeartPulse, ShieldCheck, MessageSquare, Award, 
  MessageCircle, Sparkles, Diamond, Search, Monitor, Zap, Code,
  AlertTriangle, MessageSquareOff, TrendingUp, TrendingDown,
  Building, ChevronDown, Download, RefreshCcw, ArrowUpRight,
  Minus, Flag, Link as LinkIcon, Route, FileUp
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';

const metrics = [
  { key:'health', ic: HeartPulse, tone:'text-emerald-500', stroke:'#10B981', bg:'bg-emerald-50', label:'Brand health', val:'87', unit:'/100', status:'Excellent', pct:87, dir:'up', chg:'+3 pts', sentiment:'pos', trend:[78,79,77,80,82,81,83,84,82,85,86,87] },
  { key:'confidence', ic: ShieldCheck, tone:'text-orange-500', stroke:'#F97316', bg:'bg-orange-50', label:'AI confidence', val:'91', unit:'%', status:'High', pct:91, dir:'up', chg:'+2%', sentiment:'pos', trend:[84,85,86,85,87,88,88,89,90,90,91,91] },
  { key:'messaging', ic: MessageSquare, tone:'text-amber-500', stroke:'#F59E0B', bg:'bg-amber-50', label:'Messaging consistency', val:'82', unit:'%', status:'Watch', pct:82, dir:'down', chg:'-1%', sentiment:'neu', trend:[86,85,85,84,84,83,84,83,82,83,82,82] },
  { key:'trust', ic: Award, tone:'text-purple-500', stroke:'#A855F7', bg:'bg-purple-50', label:'Brand trust', val:'89', unit:'/100', status:'Strong', pct:89, dir:'up', chg:'+1 pt', sentiment:'pos', trend:[83,84,84,85,86,86,87,87,88,88,89,89] }
];

const models = [
  { name:'ChatGPT', ic: MessageCircle, conf:92, sentiment:'pos', themes:['Governance','Citations'] },
  { name:'Claude', ic: Sparkles, conf:90, sentiment:'pos', themes:['Trust','Documentation'] },
  { name:'Gemini', ic: Diamond, conf:88, sentiment:'neu', themes:['Accuracy','Expertise'], flag: true },
  { name:'Perplexity', ic: Search, conf:86, sentiment:'pos', themes:['Research','Transparency'] },
  { name:'Copilot', ic: Monitor, conf:87, sentiment:'neu', themes:['Workflow','Governance'], flag: true },
  { name:'Grok', ic: Zap, conf:80, sentiment:'neu', themes:['Freshness','Speed'], flag: true },
  { name:'DeepSeek', ic: Code, conf:83, sentiment:'neu', themes:['Engineering'] }
];

const perception = { pos:62, neu:30, neg:8 };

const competitors = [
  { name:'Your brand', value:34, color:'#6366F1' },
  { name:'Profound', value:24, color:'#2563EB' },
  { name:'BrightEdge', value:18, color:'#7C3AED' },
  { name:'Semrush', value:14, color:'#16A34A' },
  { name:'Others', value:10, color:'#CBD5E1' }
];

const alerts = [
  { type:'risk', ic: AlertTriangle, title:'Outdated pricing on Gemini', sub:'Gemini cites $29/mo (now $39/mo)', color:'text-red-500', bg:'bg-red-50' },
  { type:'warn', ic: MessageSquareOff, title:'Messaging divergence widening', sub:'Gemini leans price vs. quality-led message', color:'text-amber-500', bg:'bg-amber-50' },
  { type:'win', ic: TrendingUp, title:'Brand trust up 1 pt', sub:'New high-authority citations detected', color:'text-emerald-500', bg:'bg-emerald-50' }
];

const accuracy = [
  { claim:'Starting price stated as $29/mo', models:['Gemini'], severity:'High', detail:'Pricing updated to $39/mo in Q2. Update the pricing page and request a re-crawl.' },
  { claim:'Competitor feature attributed to the brand', models:['Copilot'], severity:'Medium', detail:'Entity confusion in multi-tool prompts. Reinforce a distinct brand entity page.' },
  { claim:'Brand described as "primarily SMB-focused"', models:['Grok'], severity:'Low', detail:'Enterprise customers are under-represented in source content. Publish enterprise proof.' }
];

const evidence = [
  { prompt:'What is the best AI brand-visibility platform for enterprises?', sentiment:'pos', sources:['Official docs','G2','Forrester'] },
  { prompt:'How much does the platform cost?', sentiment:'neu', sources:['Pricing page (cached)','Reddit'] },
  { prompt:'Is it better than its competitors?', sentiment:'neu', sources:['Blog','G2'] },
  { prompt:'Who uses this for AI governance?', sentiment:'pos', sources:['Microsoft Learn','Official docs'] }
];

function getSentStyle(s: string) {
  if (s === 'pos') return { text: 'Positive', className: 'text-emerald-600 bg-emerald-50', dot: 'bg-emerald-500' };
  if (s === 'neg') return { text: 'Negative', className: 'text-red-600 bg-red-50', dot: 'bg-red-500' };
  return { text: 'Neutral', className: 'text-slate-600 bg-slate-100', dot: 'bg-slate-400' };
}

function getSparkline(data: number[]) {
  const w = 90, h = 30;
  const mn = Math.min(...data), mx = Math.max(...data), rng = mx - mn || 1;
  return data.map((v, i) => `${(i / (data.length - 1) * w).toFixed(1)},${(h - ((v - mn) / rng) * h).toFixed(1)}`).join(' ');
}

export default function BrandPulsePage() {
  const [range, setRange] = useState('30D');

  return (
    <div className="flex-1 p-8 bg-[#f8fafc] text-slate-900 min-h-screen pb-24">
      {/* PAGE HEADER */}
      <div className="flex flex-col lg:flex-row justify-between lg:items-start mb-8 gap-4">
        <div className="max-w-2xl">
          <h1 className="text-[28px] font-space-grotesk font-bold tracking-tight text-slate-900">
            Brand Pulse
          </h1>
          <p className="text-[14px] text-slate-500 mt-1 leading-relaxed">
            Interactive executive AI brand intelligence workspace. Scanning 7 AI models for the latest brand perception.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-[13px] font-semibold">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 text-slate-600 rounded-[8px]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            7 models monitored
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-[8px] text-slate-700 hover:bg-slate-50 shadow-sm">
            <Building className="w-4 h-4 text-slate-400" /> Citationly HQ <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>
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

      {/* ALERTS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        {alerts.map((a, i) => (
          <div key={i} className={`flex items-start gap-3 p-4 rounded-[12px] border border-slate-200 bg-white cursor-pointer hover:shadow-sm transition-shadow`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${a.bg} ${a.color}`}>
              <a.ic className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[13.5px] font-bold text-slate-900">{a.title}</div>
              <div className="text-[12px] text-slate-500 mt-0.5">{a.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* SECTION: Executive Metrics */}
      <h2 className="text-[12px] font-bold text-slate-400 uppercase tracking-wider mb-4 px-1">Executive metrics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
        {metrics.map((m, i) => {
          const sStyle = getSentStyle(m.sentiment);
          return (
            <div key={i} className="bg-white border border-slate-200 p-5 rounded-[14px] shadow-sm flex flex-col relative group hover:border-indigo-200 transition-colors cursor-pointer">
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
                <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-bold mb-1 ${sStyle.className}`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${sStyle.dot}`}></div>
                  {sStyle.text}
                </div>
              </div>

              {/* Sparkline */}
              <div className="my-4 h-[30px] opacity-70">
                <svg viewBox="0 0 90 30" preserveAspectRatio="none" className="w-full h-full">
                  <polyline points={getSparkline(m.trend)} fill="none" stroke={m.stroke} strokeWidth="2.5" />
                </svg>
              </div>

              <div className="flex items-center gap-1.5 text-[12px] font-medium pt-3 border-t border-slate-100">
                <span className={`flex items-center ${m.dir === 'up' ? 'text-emerald-500' : m.dir === 'down' ? 'text-amber-500' : 'text-slate-400'}`}>
                  {m.dir === 'up' ? <TrendingUp className="w-3.5 h-3.5 mr-1" /> : m.dir === 'down' ? <TrendingDown className="w-3.5 h-3.5 mr-1" /> : <Minus className="w-3.5 h-3.5 mr-1" />}
                  {m.chg}
                </span>
                <span className="text-slate-400">vs last period</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* SECTION: Overall Perception */}
      <h2 className="text-[12px] font-bold text-slate-400 uppercase tracking-wider mb-4 px-1">Overall perception</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-10">
        
        {/* Sentiment Mix */}
        <div className="bg-white border border-slate-200 rounded-[14px] p-6 shadow-sm">
          <div className="mb-6">
            <h3 className="text-[15px] font-bold text-slate-900">Sentiment mix</h3>
            <p className="text-[13px] text-slate-500">How AI answers feel about your brand across all monitored prompts.</p>
          </div>
          
          <div className="flex h-3 w-full rounded-full overflow-hidden mb-6">
            <div style={{ width: `${perception.pos}%` }} className="bg-emerald-500"></div>
            <div style={{ width: `${perception.neu}%` }} className="bg-slate-300"></div>
            <div style={{ width: `${perception.neg}%` }} className="bg-red-500"></div>
          </div>
          
          <div className="flex gap-6">
            <div className="flex items-center gap-2 text-[13px] font-medium text-slate-700">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div> Positive {perception.pos}%
            </div>
            <div className="flex items-center gap-2 text-[13px] font-medium text-slate-700">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div> Neutral {perception.neu}%
            </div>
            <div className="flex items-center gap-2 text-[13px] font-medium text-slate-700">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div> Negative {perception.neg}%
            </div>
          </div>
        </div>

        {/* Share of perception */}
        <div className="bg-white border border-slate-200 rounded-[14px] p-6 shadow-sm flex">
          <div className="flex-1">
            <h3 className="text-[15px] font-bold text-slate-900">Share of perception</h3>
            <p className="text-[13px] text-slate-500 mb-4">Your presence in AI answers vs. competitors.</p>
            <div className="flex flex-col gap-2.5">
              {competitors.map((c, i) => (
                <div key={i} className="flex items-center gap-2 text-[12.5px] font-medium text-slate-700">
                  <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: c.color }}></div> 
                  <span className="w-[100px]">{c.name}</span>
                  <span className="text-slate-900 font-bold">{c.value}%</span>
                </div>
              ))}
            </div>
          </div>
          <div className="w-[170px] h-[170px] shrink-0 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={competitors} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={2} dataKey="value" stroke="none">
                  {competitors.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px', fontWeight: 'bold' }} itemStyle={{ color: '#0f172a' }} />
              </PieChart>
            </ResponsiveContainer>
            {/* Center text for doughnut chart can be added here if needed */}
          </div>
        </div>

      </div>

      {/* SECTION: AI Models */}
      <h2 className="text-[12px] font-bold text-slate-400 uppercase tracking-wider mb-4 px-1">AI models</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
        {models.map((m, i) => {
          const sStyle = getSentStyle(m.sentiment);
          return (
            <div key={i} className="bg-white border border-slate-200 p-5 rounded-[14px] shadow-sm relative group hover:border-indigo-200 transition-colors cursor-pointer">
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight className="w-4 h-4 text-slate-400" />
              </div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[14px] font-bold text-slate-800">{m.name}</span>
                {m.flag && <AlertTriangle className="w-4 h-4 text-red-500" title="Accuracy flag" />}
              </div>
              
              <div className="flex items-end justify-between mb-5">
                <div>
                  <div className="text-[26px] font-space-grotesk font-bold leading-none">{m.conf}<span className="text-[13px] font-sans text-slate-400 font-medium ml-1">% conf.</span></div>
                </div>
                <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider ${sStyle.className}`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${sStyle.dot}`}></div>
                  {sStyle.text}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100">
                {m.themes.map((t, ti) => (
                  <span key={ti} className="px-2 py-1 rounded-[6px] bg-slate-100 text-slate-600 text-[11px] font-semibold border border-slate-200/60">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* SECTION: Lower grids */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-10">
        
        {/* Accuracy & Risk */}
        <div className="bg-white border border-slate-200 rounded-[14px] p-6 shadow-sm">
          <div className="mb-5">
            <h3 className="text-[15px] font-bold text-slate-900">Accuracy &amp; risk</h3>
            <p className="text-[13px] text-slate-500">Claims in AI answers that need correction.</p>
          </div>
          <div className="flex flex-col gap-4">
            {accuracy.map((a, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-[10px] bg-slate-50 border border-slate-100">
                <Flag className="w-4 h-4 mt-0.5 text-slate-400 shrink-0" />
                <div>
                  <div className="text-[13px] font-bold text-slate-900 mb-1">
                    {a.claim} 
                    <span className={`ml-2 px-1.5 py-0.5 rounded-[4px] text-[10px] uppercase font-bold tracking-wider ${a.severity === 'High' ? 'bg-red-100 text-red-600' : a.severity === 'Medium' ? 'bg-amber-100 text-amber-600' : 'bg-slate-200 text-slate-600'}`}>
                      {a.severity}
                    </span>
                  </div>
                  <div className="text-[12.5px] text-slate-600 leading-relaxed mb-1.5">{a.detail}</div>
                  <div className="text-[11.5px] text-slate-400 font-medium">Seen in: <span className="text-slate-600">{a.models.join(', ')}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Prompt evidence */}
        <div className="bg-white border border-slate-200 rounded-[14px] p-6 shadow-sm">
          <div className="mb-5">
            <h3 className="text-[15px] font-bold text-slate-900">Prompt evidence</h3>
            <p className="text-[13px] text-slate-500">Prompts shaping perception and the sources models pulled from.</p>
          </div>
          <div className="flex flex-col gap-0 divide-y divide-slate-100">
            {evidence.map((e, i) => {
              const sStyle = getSentStyle(e.sentiment);
              return (
                <div key={i} className="py-4 first:pt-0 last:pb-0 flex items-start justify-between gap-4">
                  <div>
                    <div className="text-[13px] font-bold text-slate-800 mb-2 leading-snug">"{e.prompt}"</div>
                    <div className="flex flex-wrap gap-3">
                      {e.sources.map((s, si) => (
                        <div key={si} className="flex items-center gap-1 text-[11.5px] text-slate-500 hover:text-indigo-600 cursor-pointer transition-colors">
                          <LinkIcon className="w-3 h-3" /> {s}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className={`shrink-0 flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider ${sStyle.className}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${sStyle.dot}`}></div>
                    {sStyle.text}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* SECTION: Strategic Actions */}
      <div className="bg-white border border-slate-200 rounded-[14px] p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-[15px] font-bold text-slate-900 mb-1">Strategic actions</h3>
          <p className="text-[13px] text-slate-500">Turn brand intelligence into an executive-ready, assignable plan.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white rounded-[8px] text-[13px] font-semibold hover:bg-indigo-700 shadow-sm transition-colors">
            <Route className="w-4 h-4" /> Create action plan
          </button>
          <button className="flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-[8px] text-[13px] font-semibold hover:bg-slate-50 shadow-sm transition-colors">
            <FileUp className="w-4 h-4" /> Export executive report
          </button>
        </div>
      </div>

    </div>
  );
}
