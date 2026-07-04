"use client";

import React from "react";
import { 
  Quote, Award, Cpu, TrendingUp, TrendingDown, 
  DollarSign, HelpCircle, Code, Box, FileText, File, 
  Clock, ExternalLink, ArrowRight, Info, PieChart, 
  History, Lightbulb, ChevronDown, Download, RefreshCcw
} from "lucide-react";

const kpis = [
  { label: 'Total AI Citations', val: '24,817', ic: Quote, color: '#6366F1', trend: '+18.4%', dir: 'up', chip: 'Healthy', chipc: 'bg-emerald-50 text-emerald-600', spark: [120,135,128,150,165,158,180,176,195,210,205,230] },
  { label: 'Citation Quality Score', val: '87.4', ic: Award, color: '#10B981', trend: '+3.2 pts', dir: 'up', chip: 'Strong', chipc: 'bg-emerald-50 text-emerald-600', spark: [78,80,79,82,81,83,84,85,84,86,87,87] },
  { label: 'AI Models Referencing You', val: '7 / 7', ic: Cpu, color: '#2563EB', trend: 'Full coverage', dir: 'up', chip: 'Complete', chipc: 'bg-blue-50 text-blue-600', spark: [4,4,5,5,6,6,6,7,7,7,7,7] },
  { label: '30-Day Citation Growth', val: '+22.6%', ic: TrendingUp, color: '#7C3AED', trend: 'vs prior 30d', dir: 'up', chip: 'Accelerating', chipc: 'bg-emerald-50 text-emerald-600', spark: [100,108,112,120,118,130,138,145,150,162,170,178] }
];

const platforms = [
  { name: 'ChatGPT', cites: '8,942', visibility: 91, quality: 88, growth: '+14.2%', dir: 'up', status: 'Strong', sc: 'bg-emerald-50 text-emerald-600', color: '#10A37F' },
  { name: 'Claude', cites: '5,318', visibility: 88, quality: 90, growth: '+19.8%', dir: 'up', status: 'Strong', sc: 'bg-emerald-50 text-emerald-600', color: '#D97757' },
  { name: 'Gemini', cites: '4,107', visibility: 76, quality: 81, growth: '+9.1%', dir: 'up', status: 'Solid', sc: 'bg-cyan-50 text-cyan-600', color: '#4285F4' },
  { name: 'Perplexity', cites: '2,946', visibility: 58, quality: 74, growth: '+6.4%', dir: 'up', status: 'Developing', sc: 'bg-amber-50 text-amber-600', color: '#20808D' },
  { name: 'Microsoft Copilot', cites: '1,884', visibility: 61, quality: 79, growth: '+11.5%', dir: 'up', status: 'Developing', sc: 'bg-amber-50 text-amber-600', color: '#0078D4' },
  { name: 'Grok', cites: '1,012', visibility: 34, quality: 62, growth: '-3.2%', dir: 'down', status: 'Weak', sc: 'bg-red-50 text-red-600', color: '#1A1A1A' },
  { name: 'DeepSeek', cites: '608', visibility: 29, quality: 58, growth: '+1.1%', dir: 'up', status: 'Weak', sc: 'bg-red-50 text-red-600', color: '#4D6BFE' }
];

const topContent = [
  { name: 'Enterprise Pricing & Plans', type: 'Pricing Page', ic: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-100', cites: '3,284', models: ['ChatGPT','Claude','Gemini','Perplexity'], when: '12 min ago', quality: 92, fresh: 96 },
  { name: 'AI Visibility FAQ', type: 'FAQ', ic: HelpCircle, color: 'text-indigo-600', bg: 'bg-indigo-100', cites: '2,917', models: ['ChatGPT','Gemini','Copilot'], when: '34 min ago', quality: 89, fresh: 88 },
  { name: 'API Reference & Quickstart', type: 'Documentation', ic: Code, color: 'text-purple-600', bg: 'bg-purple-100', cites: '2,648', models: ['ChatGPT','Claude','Perplexity'], when: '1h ago', quality: 90, fresh: 82 },
  { name: 'Citation Intelligence Overview', type: 'Product Page', ic: Box, color: 'text-blue-600', bg: 'bg-blue-100', cites: '2,193', models: ['Claude','Gemini'], when: '2h ago', quality: 85, fresh: 79 },
  { name: 'How AI Models Cite Brands', type: 'Blog Article', ic: FileText, color: 'text-orange-600', bg: 'bg-orange-100', cites: '1,876', models: ['ChatGPT','Perplexity','Grok'], when: '3h ago', quality: 83, fresh: 74 },
  { name: 'Acme vs Profound — Case Study', type: 'Case Study', ic: File, color: 'text-red-600', bg: 'bg-red-100', cites: '1,544', models: ['Claude','ChatGPT'], when: '5h ago', quality: 88, fresh: 91 }
];

const timeline = [
  { time: '10:35 AM', model: 'ChatGPT', content: 'FAQ — AI Visibility', action: 'cited', imp: 'High', impc: 'bg-emerald-50 text-emerald-600', color: '#10A37F' },
  { time: '09:52 AM', model: 'Gemini', content: 'Pricing Page', action: 'referenced', imp: 'High', impc: 'bg-emerald-50 text-emerald-600', color: '#4285F4' },
  { time: '08:41 AM', model: 'Claude', content: 'Acme vs Profound Case Study', action: 'summarized', imp: 'Medium', impc: 'bg-blue-50 text-blue-600', color: '#D97757' },
  { time: '08:13 AM', model: 'Perplexity', content: 'API Reference', action: 'cited', imp: 'Medium', impc: 'bg-blue-50 text-blue-600', color: '#20808D' },
  { time: '07:48 AM', model: 'Microsoft Copilot', content: 'Citation Intelligence Overview', action: 'recommended', imp: 'High', impc: 'bg-emerald-50 text-emerald-600', color: '#0078D4' },
  { time: 'Yesterday', model: 'Perplexity', content: 'How AI Models Cite Brands (Blog)', action: 'cited', imp: 'Low', impc: 'bg-slate-100 text-slate-600', color: '#20808D' },
  { time: 'Yesterday', model: 'Grok', content: 'Enterprise Pricing & Plans', action: 'referenced', imp: 'Medium', impc: 'bg-blue-50 text-blue-600', color: '#1A1A1A' },
  { time: 'Yesterday', model: 'Claude', content: 'Documentation — Quickstart', action: 'summarized', imp: 'High', impc: 'bg-emerald-50 text-emerald-600', color: '#D97757' }
];

const opportunities = [
  { name: 'Comparison Pages (vs competitors)', cur: '412', pot: '2,100', pct: 80, prio: 'Critical', prioc: 'bg-red-50 text-red-600', impact: 'High-intent evaluation queries are surfacing competitors first.', accent: 'bg-red-500' },
  { name: 'Integration Documentation', cur: '688', pot: '1,850', pct: 65, prio: 'High', prioc: 'bg-amber-50 text-amber-600', impact: 'Engines lack structured how-to content for connector setup.', accent: 'bg-orange-500' },
  { name: 'Security & Compliance Hub', cur: '241', pot: '1,200', pct: 55, prio: 'High', prioc: 'bg-amber-50 text-amber-600', impact: 'Enterprise buyers ask AI about SOC2 / GDPR posture.', accent: 'bg-orange-500' },
  { name: 'Industry Solution Pages', cur: '520', pot: '1,460', pct: 48, prio: 'Medium', prioc: 'bg-blue-50 text-blue-600', impact: 'Vertical-specific prompts route citations elsewhere.', accent: 'bg-blue-500' }
];

const ENGINE: Record<string, string> = {
  'ChatGPT': '#10A37F', 'Claude': '#D97757', 'Gemini': '#4285F4', 
  'Perplexity': '#20808D', 'Microsoft Copilot': '#0078D4', 
  'Copilot': '#0078D4', 'Grok': '#111827', 'DeepSeek': '#4D6BFE'
};

function getSparkline(data: number[]) {
  const w = 90, h = 30;
  const mn = Math.min(...data), mx = Math.max(...data), rng = mx - mn || 1;
  return data.map((v, i) => `${(i / (data.length - 1) * w).toFixed(1)},${(h - ((v - mn) / rng) * h).toFixed(1)}`).join(' ');
}

function getMatColor(v: number) {
  return v >= 80 ? '#16A34A' : v >= 65 ? '#6366F1' : v >= 45 ? '#D97706' : '#EF4444';
}

export default function CitationIntelligencePage() {
  return (
    <div className="flex-1 p-8 bg-[#f8fafc] text-slate-900 min-h-screen pb-24">
      {/* PAGE HEADER */}
      <div className="flex flex-col lg:flex-row justify-between lg:items-start mb-8 gap-4">
        <div className="max-w-2xl">
          <h1 className="text-[28px] font-space-grotesk font-bold tracking-tight text-slate-900">
            Citation Intelligence
          </h1>
          <p className="text-[14px] text-slate-500 mt-1 leading-relaxed">
            Monitor where AI models cite your brand, evaluate citation quality, discover your highest-performing content, and uncover opportunities to strengthen AI visibility.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-[13px] font-semibold">
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-[8px] text-slate-700 hover:bg-slate-50 shadow-sm">
            Citationly HQ <ChevronDown className="w-4 h-4 text-slate-400" />
          </button>
          <div className="flex bg-slate-100 p-0.5 rounded-[8px]">
            {['7D', '30D', '90D', '1Y'].map(r => (
              <button key={r} className={`px-3 py-1 rounded-[6px] transition-colors ${r === '30D' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}>
                {r}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-[8px] text-slate-700 hover:bg-slate-50 shadow-sm">
            <RefreshCcw className="w-3.5 h-3.5" /> Refresh
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white rounded-[8px] hover:bg-indigo-700 shadow-sm">
            <Download className="w-3.5 h-3.5" /> Export Report
          </button>
        </div>
      </div>

      {/* SECTION 1 — KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
        {kpis.map((k, i) => (
          <div key={i} className="bg-white border border-slate-200 p-5 rounded-[14px] shadow-sm flex flex-col justify-between h-[150px] relative overflow-hidden group hover:border-slate-300 transition-colors cursor-pointer">
            <div className="flex justify-between items-start mb-2">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-50" style={{ color: k.color }}>
                <k.ic className="w-5 h-5" />
              </div>
              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${k.chipc}`}>
                {k.chip}
              </span>
            </div>
            <div>
              <div className="text-[13px] font-medium text-slate-500 mb-0.5">{k.label}</div>
              <div className="text-[26px] font-space-grotesk font-bold tracking-tight">{k.val}</div>
            </div>
            
            {/* Sparkline & Trend */}
            <div className="absolute bottom-4 right-5 flex items-end gap-3 text-right">
              <div className={`text-[12px] font-semibold flex items-center gap-1 ${k.dir === 'up' ? 'text-emerald-500' : 'text-red-500'}`}>
                {k.dir === 'up' ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />} 
                {k.trend}
              </div>
              <svg viewBox="0 0 90 30" preserveAspectRatio="none" className="w-[60px] h-[24px] opacity-70">
                <polyline points={getSparkline(k.spark)} fill="none" stroke={k.color} strokeWidth="2.5" />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* SECTION 2 — Platform distribution */}
      <div className="mb-10">
        <div className="mb-4">
          <h2 className="text-[17px] font-bold flex items-center gap-2"><PieChart className="w-5 h-5 text-indigo-500"/> AI Citation Distribution</h2>
          <p className="text-[13px] text-slate-500">How each AI platform cites your brand — count, visibility, quality and momentum.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {platforms.map((p, i) => (
            <div key={i} className="bg-white border border-slate-200 p-5 rounded-[14px] shadow-sm cursor-pointer hover:shadow-md transition-shadow group">
              <div className="flex items-center gap-3 mb-5">
                <div className={`w-9 h-9 rounded-md text-white flex items-center justify-center font-bold text-[15px] ${p.name === 'Grok' ? 'border border-slate-700' : ''}`} style={{ backgroundColor: p.color }}>
                  {p.name[0]}
                </div>
                <div>
                  <div className="text-[14.5px] font-bold">{p.name}</div>
                  <div className="text-[12px] text-slate-500">{p.cites} citations</div>
                </div>
              </div>
              
              <div className="flex flex-col gap-3 mb-5">
                <div>
                  <div className="flex justify-between text-[12px] font-semibold text-slate-600 mb-1.5">
                    <span>Visibility</span><span>{p.visibility}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${p.visibility}%`, backgroundColor: p.color }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[12px] font-semibold text-slate-600 mb-1.5">
                    <span>Citation quality</span><span>{p.quality}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${p.quality}%`, backgroundColor: getMatColor(p.quality) }}></div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${p.sc}`}>{p.status}</span>
                <span className={`text-[12px] font-semibold flex items-center gap-1 ${p.dir === 'up' ? 'text-emerald-500' : 'text-red-500'}`}>
                  {p.dir === 'up' ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />} {p.growth}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3 — Top cited content */}
      <div className="mb-10">
        <div className="flex items-end justify-between mb-4">
          <div>
            <h2 className="text-[17px] font-bold flex items-center gap-2"><Award className="w-5 h-5 text-amber-500"/> Top Cited Content</h2>
            <p className="text-[13px] text-slate-500">The pages and assets AI models reference most often.</p>
          </div>
          <button className="text-[13px] font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
            View all content <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {topContent.map((c, i) => (
            <div key={i} className="bg-white border border-slate-200 p-5 rounded-[14px] shadow-sm hover:border-indigo-200 cursor-pointer transition-colors relative">
              <div className="flex items-start gap-3 mb-5">
                <div className={`w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0 ${c.bg} ${c.color}`}>
                  <c.ic className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0 pr-6">
                  <div className="text-[14.5px] font-bold truncate text-slate-900">{c.name}</div>
                  <div className="text-[12.5px] text-slate-500">{c.type}</div>
                </div>
              </div>

              <div className="flex items-center justify-between bg-slate-50 rounded-[8px] p-3 mb-4">
                <div>
                  <div className="text-[18px] font-space-grotesk font-bold text-slate-900 leading-none">{c.cites}</div>
                  <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 mt-1">total citations</div>
                </div>
                <div className="flex -space-x-1.5">
                  {c.models.map((m, mi) => (
                    <div key={mi} title={m} className={`w-6 h-6 rounded-full text-[10px] font-bold text-white flex items-center justify-center border-2 border-slate-50 ${m==='Grok'?'border-slate-700':''}`} style={{ backgroundColor: ENGINE[m] || '#94A3B8' }}>
                      {m[0]}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 mb-5">
                <div className="flex-1">
                  <div className="text-[11px] font-semibold text-slate-500 mb-1">Quality</div>
                  <div className="text-[15px] font-mono font-bold" style={{ color: getMatColor(c.quality) }}>{c.quality}</div>
                </div>
                <div className="flex-1">
                  <div className="text-[11px] font-semibold text-slate-500 mb-1">Freshness</div>
                  <div className="text-[15px] font-mono font-bold" style={{ color: getMatColor(c.fresh) }}>{c.fresh}</div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="text-[12px] text-slate-500 flex items-center gap-1.5 font-medium">
                  <Clock className="w-3.5 h-3.5" /> {c.when}
                </div>
                <button className="text-[12px] font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1 bg-white border border-slate-200 px-3 py-1.5 rounded-[6px]">
                  <ExternalLink className="w-3.5 h-3.5" /> Inspect
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 4 & 5 GRID: Timeline + Opportunities */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* TIMELINE */}
        <div className="xl:col-span-2">
          <div className="mb-4">
            <h2 className="text-[17px] font-bold flex items-center gap-2"><History className="w-5 h-5 text-indigo-500"/> Citation Timeline</h2>
            <p className="text-[13px] text-slate-500">Live chronological feed of AI citation activity.</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-[14px] shadow-sm overflow-hidden">
            <div className="max-h-[460px] overflow-y-auto">
              {timeline.map((t, i) => (
                <div key={i} className="flex gap-4 p-4 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors cursor-pointer group relative">
                  <div className="w-20 pt-1 text-[12px] font-medium text-slate-400 text-right shrink-0">{t.time}</div>
                  <div className="relative flex-1 pl-4 border-l-2 border-slate-100 group-hover:border-indigo-200 transition-colors">
                    {/* dot */}
                    <div className="absolute left-[-5px] top-[9px] w-2 h-2 rounded-full bg-slate-300 group-hover:bg-indigo-400 transition-colors"></div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-5 h-5 rounded-md text-[10px] text-white flex items-center justify-center font-bold ${t.model==='Grok'?'border border-slate-700':''}`} style={{ backgroundColor: t.color }}>
                          {t.model[0]}
                        </div>
                        <span className="text-[13.5px] text-slate-700">
                          <b className="text-slate-900">{t.model}</b> {t.action} <span className="font-medium text-indigo-600">{t.content}</span>
                        </span>
                      </div>
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${t.impc}`}>
                        {t.imp}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* OPPORTUNITIES (Sidebar style) */}
        <div>
          <div className="mb-4">
            <h2 className="text-[17px] font-bold flex items-center gap-2"><Lightbulb className="w-5 h-5 text-amber-500"/> Opportunities</h2>
            <p className="text-[13px] text-slate-500">Highest potential for new citations.</p>
          </div>
          <div className="flex flex-col gap-4">
            {opportunities.map((o, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-[14px] p-5 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow cursor-pointer">
                <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: o.accent }}></div>
                <div className="flex justify-between items-start mb-3">
                  <div className="font-bold text-[14px] text-slate-900 w-[70%] group-hover:text-indigo-600 transition-colors">{o.name}</div>
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${o.prioc}`}>{o.prio}</span>
                </div>
                
                <div className="flex justify-between text-[11px] font-semibold text-slate-500 mb-1.5 mt-4">
                  <span>Current: <span className="text-slate-900 font-mono text-[13px]">{o.cur}</span></span>
                  <span>Potential: <span className="text-indigo-600 font-mono text-[13px]">{o.pot}</span></span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden mb-3">
                  <div className="h-full rounded-full" style={{ width: `${o.pct}%`, backgroundColor: o.accent }}></div>
                </div>
                
                <div className="text-[12px] text-slate-500 flex items-start gap-1.5 mt-3 leading-relaxed">
                  <Info className="w-3.5 h-3.5 mt-0.5 shrink-0 text-slate-400" /> {o.impact}
                </div>
                
                <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Est. +{o.pct}% capture</span>
                  <button className="text-[12px] font-semibold text-indigo-600 group-hover:text-indigo-700 flex items-center gap-1">
                    Take action <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
