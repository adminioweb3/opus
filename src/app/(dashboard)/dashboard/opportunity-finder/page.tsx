"use client";

import React, { useState } from "react";
import { 
  Target, AlertTriangle, Sparkles, DollarSign,
  Play, Download, ChevronDown, ChevronUp, ChevronLeft, ChevronRight,
  Search, Filter, ListFilter, LayoutGrid, TrendingUp, CheckCircle2
} from "lucide-react";

const MISSIONS = [
  {
    id: 'OM-001', title: 'Resolve Pricing Discrepancy on Gemini', category: 'GEO Accuracy',
    score: 96, gain: 8.2, difficulty: 'Low', eta: '2 hours', confidence: 98, priority: 'Critical',
    badge: '🚨 Critical', status: 'Open', summary: 'Gemini currently cites our starting price as $29/mo instead of the updated $39/mo.',
    why: 'Gemini\'s grounding index is referencing a cached version of our pricing page from Q1.',
    competitors: [
      { name: 'Acme (You)', val: 30, status: 'Incorrect ($29/mo)' },
      { name: 'Profound', val: 95, status: 'Correct ($49/mo)' },
      { name: 'BrightEdge', val: 95, status: 'Correct ($99/mo)' }
    ],
    pages: ['https://acme.com/pricing'], entities: ['Pricing Schema', 'Gemini Grounding'],
    citations: '12,000+ monthly queries affected by incorrect pricing.',
    checklist: [{ text: 'Update JSON-LD pricing schema on pricing page', done: false }],
    timeline: 'Phase 1: Schema Update (1 hr) | Phase 2: Crawler Submission (1 hr)',
    roi: '$24,000 in pipeline protection.', quadrant: 'high-low'
  },
  {
    id: 'OM-002', title: 'Build Product Comparison Pages vs Profound', category: 'AI Visibility',
    score: 92, gain: 14.5, difficulty: 'Medium', eta: '5 days', confidence: 92, priority: 'Critical',
    badge: '🏆 Competitive Gap', status: 'Open', summary: 'Profound ranks for "vs Acme" queries on Perplexity.',
    why: 'We lack dedicated landing pages comparing our features to Profound.',
    competitors: [
      { name: 'Acme (You)', val: 20, status: 'Weak citation share' },
      { name: 'Profound', val: 85, status: 'Dominates comparison queries' },
      { name: 'BrightEdge', val: 45, status: 'Moderate mentions' }
    ],
    pages: ['https://acme.com/vs/profound'], entities: ['Profound Competitor', 'Feature Matrix'],
    citations: '8,500+ monthly comparison prompts targeting this gap.',
    checklist: [{ text: 'Conduct feature gap audit vs Profound', done: false }],
    timeline: 'Phase 1: Content Drafting (3 days)',
    roi: '$48,000 ARR from recapturing high-intent evaluation traffic.', quadrant: 'high-low'
  },
  {
    id: 'OM-003', title: 'Deploy FAQ Schema on High-Traffic Docs', category: 'GEO Optimization',
    score: 89, gain: 6.8, difficulty: 'Low', eta: '1 day', confidence: 95, priority: 'High',
    badge: '⚡ Quick Win', status: 'Open', summary: 'Add structured FAQ data to top documentation pages.',
    why: 'AI crawlers favor Q&A formatted content for answering direct user queries.',
    competitors: [
      { name: 'Acme (You)', val: 40, status: 'Unstructured text only' },
      { name: 'Profound', val: 90, status: 'Full FAQ schema deployed' }
    ],
    pages: ['https://acme.com/docs/getting-started'], entities: ['FAQ Schema', 'AI Crawlers'],
    citations: '15,000+ monthly informational queries targeted.',
    checklist: [{ text: 'Identify top 10 high-traffic documentation pages', done: false }],
    timeline: 'Phase 1: Question Selection (4 hrs)',
    roi: '+18% citation frequency on developer-focused prompts.', quadrant: 'high-low'
  },
  {
    id: 'OM-004', title: 'Secure Placements in Top 5 Industry Listicles', category: 'Authority',
    score: 85, gain: 11.0, difficulty: 'High', eta: '14 days', confidence: 88, priority: 'High',
    badge: '💰 Revenue Opportunity', status: 'Open', summary: 'Drive citations from high-DR third-party roundups.',
    why: 'AI engines use external listicles as primary sources.',
    competitors: [
      { name: 'Acme (You)', val: 15, status: 'Featured in 1 listicle' },
      { name: 'Profound', val: 90, status: 'Featured in 5 listicles' }
    ],
    pages: ['https://acme.com/press'], entities: ['AEO Listicles', 'Brand Mentions'],
    citations: '6,000+ monthly search queries referencing these listicles.',
    checklist: [{ text: 'Identify target listicles', done: false }],
    timeline: 'Phase 1: Listicle Audit (3 days)',
    roi: 'Defend $40,000 in active sales pipeline.', quadrant: 'high-high'
  },
  {
    id: 'OM-005', title: 'Optimize Above-the-Fold Copy for Sourcing Prompts', category: 'Entity Coverage',
    score: 81, gain: 7.5, difficulty: 'Medium', eta: '3 days', confidence: 90, priority: 'High',
    badge: '🤖 AI Boost', status: 'Open', summary: 'Align homepage copy with natural language query patterns.',
    why: 'AI models require clear, direct noun-phrase definitions to resolve our brand entities.',
    competitors: [
      { name: 'Acme (You)', val: 50, status: 'Jargon-heavy copy' },
      { name: 'Profound', val: 80, status: 'Direct entity definitions' }
    ],
    pages: ['https://acme.com/'], entities: ['Brand Entity Definition', 'NLP'],
    citations: '20,000+ monthly brand discovery prompts affected.',
    checklist: [{ text: 'Rewrite hero copy to include direct noun-phrase definitions', done: false }],
    timeline: 'Phase 1: Prompt Analysis (1 day)',
    roi: '+7.5% increase in AI citation probability.', quadrant: 'high-high'
  },
  {
    id: 'OM-006', title: 'Add Organization Schema to Homepage', category: 'Entity Coverage',
    score: 78, gain: 4.2, difficulty: 'Low', eta: '1 day', confidence: 97, priority: 'Medium',
    badge: '⚡ Quick Win', status: 'Open', summary: 'Deploy comprehensive Organization JSON-LD schema.',
    why: 'Without explicit organization schema, models confuse Acme with other brands.',
    competitors: [
      { name: 'Acme (You)', val: 30, status: 'Missing social profile schema' },
      { name: 'Profound', val: 100, status: 'Complete Org schema' }
    ],
    pages: ['https://acme.com/'], entities: ['Organization Entity', 'JSON-LD Schema'],
    citations: 'Brand entity resolution improved across all 7 models.',
    checklist: [{ text: 'Generate Organization JSON-LD with SameAs links', done: false }],
    timeline: '4 hours total implementation and validation time.',
    roi: 'Prevents brand entity confusion.', quadrant: 'low-low'
  },
  {
    id: 'OM-007', title: 'Publish Customer Case Study for E-E-A-T', category: 'Authority',
    score: 75, gain: 8.5, difficulty: 'Medium', eta: '7 days', confidence: 85, priority: 'Medium',
    badge: '📈 Momentum', status: 'Open', summary: 'Publish a data-dense case study showing AEO growth.',
    why: 'AI models require verifiable proof to back up claims of being enterprise-grade.',
    competitors: [
      { name: 'Acme (You)', val: 40, status: '2 case studies published' },
      { name: 'Profound', val: 85, status: '8 case studies published' }
    ],
    pages: ['https://acme.com/customers'], entities: ['Customer Proof', 'E-E-A-T Signals'],
    citations: 'Adds highly quotable metrics for "enterprise AEO" prompts.',
    checklist: [{ text: 'Interview enterprise customer and secure approval', done: false }],
    timeline: 'Phase 1: Interview & Draft (4 days)',
    roi: 'Estimated $32,000 in pipeline velocity increase.', quadrant: 'high-high'
  },
  {
    id: 'OM-008', title: 'Fix Broken Internal Links on Blog', category: 'Authority',
    score: 72, gain: 3.0, difficulty: 'Low', eta: '2 days', confidence: 94, priority: 'Medium',
    badge: '⚡ Quick Win', status: 'Open', summary: 'Identify and resolve 14 broken internal links.',
    why: 'Broken links disrupt AI crawler paths.',
    competitors: [
      { name: 'Acme (You)', val: 60, status: '14 broken links found' },
      { name: 'Profound', val: 95, status: 'Clean internal link profile' }
    ],
    pages: ['https://acme.com/blog'], entities: ['Internal Link Graph', 'Crawler Pathing'],
    citations: 'Ensures AI crawlers index new pages faster.',
    checklist: [{ text: 'Run internal link audit across blog', done: false }],
    timeline: '1.5 days auditing and updating links.',
    roi: 'Improves indexation speed of newly published content.', quadrant: 'low-low'
  },
  {
    id: 'OM-009', title: 'Add llms.txt to Guide AI Crawlers', category: 'GEO Optimization',
    score: 68, gain: 5.5, difficulty: 'Low', eta: '1 day', confidence: 96, priority: 'Medium',
    badge: '🤖 AI Boost', status: 'Open', summary: 'Deploy a structured llms.txt file in the root directory.',
    why: 'llms.txt is an emerging standard designed for LLMs to read during retrieval.',
    competitors: [
      { name: 'Acme (You)', val: 0, status: 'No llms.txt' },
      { name: 'Profound', val: 100, status: 'llms.txt deployed' }
    ],
    pages: ['https://acme.com/llms.txt'], entities: ['llms.txt Standard', 'LLM Crawling'],
    citations: 'Improves citation accuracy on complex technical prompts.',
    checklist: [{ text: 'Draft llms.txt containing clean markdown links', done: false }],
    timeline: '4 hours drafting and deploying.',
    roi: 'Secures cleaner summarization.', quadrant: 'low-low'
  },
  {
    id: 'OM-010', title: 'Create Glossary Hub for Definitional Queries', category: 'Content',
    score: 64, gain: 4.0, difficulty: 'Medium', eta: '10 days', confidence: 82, priority: 'Low',
    badge: '📈 Momentum', status: 'Open', summary: 'Publish 20 definitional terms related to AEO.',
    why: 'Definitional queries are frequently answered by AI overviews.',
    competitors: [
      { name: 'Acme (You)', val: 20, status: 'No glossary' },
      { name: 'Profound', val: 80, status: 'Comprehensive glossary hub' }
    ],
    pages: ['https://acme.com/glossary'], entities: ['Glossary Schema', 'Definitional Intents'],
    citations: 'Captures early-stage funnel awareness.',
    checklist: [{ text: 'Identify top 20 industry terms', done: false }],
    timeline: 'Phase 1: Keyword Research (2 days)',
    roi: 'Steady organic traffic growth.', quadrant: 'low-high'
  }
];

export default function OpportunityFinderPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [difficulty, setDifficulty] = useState('all');
  const [sortCol, setSortCol] = useState('score');
  const [sortDesc, setSortDesc] = useState(true);
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const [expandedId, setExpandedId] = useState<string | null>(null);

  const kpis = [
    { label: 'Total Opportunities', val: '28', trend: '+4 new', desc: 'identified this week', tag: 'Active', tagClass: 'bg-blue-100 text-blue-700', trendIcon: TrendingUp, trendColor: 'text-emerald-500' },
    { label: 'Critical Gaps', val: '5', trend: 'High Risk', desc: 'direct brand threats', tag: 'Action Required', tagClass: 'bg-red-100 text-red-700', trendIcon: AlertTriangle, trendColor: 'text-red-500' },
    { label: 'Potential AI Gain', val: '+18.4%', trend: 'Average', desc: 'visibility increase', tag: 'AEO Lift', tagClass: 'bg-emerald-100 text-emerald-700', trendIcon: Sparkles, trendColor: 'text-emerald-500' },
    { label: 'Estimated Impact', val: '$142k', trend: 'Business Value', desc: 'from closed search gaps', tag: 'ARR Pipeline', tagClass: 'bg-purple-100 text-purple-700', trendIcon: DollarSign, trendColor: 'text-amber-500' }
  ];

  // Filtering & Sorting
  let filtered = MISSIONS.filter(m => {
    const s = search.toLowerCase();
    const matchS = m.title.toLowerCase().includes(s) || m.id.toLowerCase().includes(s);
    const matchC = category === 'all' || m.category === category;
    const matchD = difficulty === 'all' || m.difficulty === difficulty;
    return matchS && matchC && matchD;
  });

  filtered.sort((a: any, b: any) => {
    let valA = a[sortCol];
    let valB = b[sortCol];
    if (typeof valA === 'string') {
      return sortDesc ? valB.localeCompare(valA) : valA.localeCompare(valB);
    }
    return sortDesc ? valB - valA : valA - valB;
  });

  const total = filtered.length;
  const totalPages = Math.ceil(total / pageSize);
  const pageList = filtered.slice((page - 1) * pageSize, page * pageSize);

  const handleSort = (col: string) => {
    if (sortCol === col) setSortDesc(!sortDesc);
    else { setSortCol(col); setSortDesc(true); }
  };

  const getPriorityBadgeClass = (p: string) => {
    if (p === 'Critical') return 'bg-red-100 text-red-700';
    if (p === 'High') return 'bg-amber-100 text-amber-700';
    if (p === 'Medium') return 'bg-blue-100 text-blue-700';
    return 'bg-slate-100 text-slate-700';
  };

  const getCustomBadgeClass = (badge: string) => {
    if (badge.includes('Critical')) return 'bg-red-100 text-red-700 border-red-200';
    if (badge.includes('Win')) return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    if (badge.includes('Revenue')) return 'bg-purple-100 text-purple-700 border-purple-200';
    return 'bg-blue-100 text-blue-700 border-blue-200';
  };

  const matrixQuads = {
    'high-low': MISSIONS.filter(m => m.quadrant === 'high-low').slice(0,3),
    'high-high': MISSIONS.filter(m => m.quadrant === 'high-high').slice(0,3),
    'low-low': MISSIONS.filter(m => m.quadrant === 'low-low').slice(0,3),
    'low-high': MISSIONS.filter(m => m.quadrant === 'low-high').slice(0,3),
  };

  return (
    <div className="flex-1 p-8 bg-[#f8fafc] text-slate-900 min-h-screen pb-24">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row justify-between lg:items-start mb-8 gap-4">
        <div className="max-w-2xl">
          <h1 className="text-[28px] font-space-grotesk font-bold tracking-tight text-slate-900 flex items-center gap-2">
            Opportunity Finder
          </h1>
          <p className="text-[14px] text-slate-500 mt-1 leading-relaxed">
            AI-driven content gap analysis and optimization missions prioritizing visibility, authority, and brand coverage.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white rounded-[8px] text-[13px] font-semibold hover:bg-indigo-700 shadow-sm transition-colors">
            <Search className="w-4 h-4" /> Run Deep Scan
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 rounded-[8px] text-slate-700 hover:bg-slate-50 shadow-sm">
            <Download className="w-4 h-4" /> Export Report <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
        {kpis.map((k, i) => (
          <div key={i} className="bg-white border border-slate-200 p-5 rounded-[14px] shadow-sm flex flex-col">
            <div className="flex justify-between items-start mb-3">
              <span className="text-[13px] font-bold text-slate-600">{k.label}</span>
              <span className={`px-2 py-0.5 rounded-[4px] text-[10px] font-bold uppercase tracking-wider ${k.tagClass}`}>{k.tag}</span>
            </div>
            <div className="text-[28px] font-space-grotesk font-bold leading-none text-slate-900 mb-4">{k.val}</div>
            <div className="flex items-center gap-1.5 text-[12px] font-medium pt-3 border-t border-slate-100">
              <span className={`flex items-center ${k.trendColor}`}>
                <k.trendIcon className="w-3.5 h-3.5 mr-1" /> {k.trend}
              </span>
              <span className="text-slate-400">{k.desc}</span>
            </div>
          </div>
        ))}
      </div>

      {/* PRIORITY MISSIONS (Top 5 by score) */}
      <div className="mb-10">
        <h2 className="text-[16px] font-bold text-slate-900 mb-4">Priority Missions</h2>
        <div className="flex overflow-x-auto gap-4 pb-2 snap-x">
          {MISSIONS.slice(0, 5).map((m, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-[14px] p-5 shadow-sm min-w-[320px] max-w-[360px] flex-shrink-0 snap-start flex flex-col justify-between hover:border-indigo-200 transition-colors cursor-pointer">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[12px] font-bold text-slate-400">{m.id}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold border ${getCustomBadgeClass(m.badge)}`}>{m.badge}</span>
                </div>
                <h3 className="text-[15px] font-bold text-slate-900 leading-snug mb-4 line-clamp-2" title={m.title}>{m.title}</h3>
                
                <div className="flex justify-between items-center bg-slate-50 p-3 rounded-[8px] border border-slate-100 mb-4">
                  <div>
                    <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-0.5">Score</div>
                    <div className="text-[16px] font-space-grotesk font-bold text-amber-500">{m.score}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-0.5">AI Gain</div>
                    <div className="text-[16px] font-space-grotesk font-bold text-emerald-600">+{m.gain}%</div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 text-[12.5px] text-slate-600 mb-5">
                  <div className="flex justify-between"><span>Difficulty:</span> <span className="font-bold text-slate-900">{m.difficulty}</span></div>
                  <div className="flex justify-between"><span>ETA:</span> <span className="font-bold text-slate-900">{m.eta}</span></div>
                  <div className="flex justify-between"><span>Confidence:</span> <span className="font-bold text-slate-900">{m.confidence}%</span></div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 mt-auto">
                <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-indigo-600 text-white rounded-[8px] text-[12.5px] font-semibold hover:bg-indigo-700 transition-colors">
                  <Play className="w-3.5 h-3.5 fill-white" /> Execute
                </button>
                <button className="px-3 py-2 bg-slate-100 text-slate-700 rounded-[8px] text-[12.5px] font-semibold hover:bg-slate-200 transition-colors">
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* EXPLORER TABLE & MATRIX */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Table */}
        <div className="xl:col-span-2">
          <div className="bg-white border border-slate-200 rounded-[14px] shadow-sm overflow-hidden flex flex-col h-full">
            <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2 text-[16px] font-bold text-slate-900">
                <ListFilter className="w-5 h-5 text-indigo-500" /> Opportunity Explorer
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-48">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Search missions..." 
                    className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded-[8px] text-[13px] outline-none focus:border-indigo-500 transition-colors"
                    value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
                  />
                </div>
                <select className="border border-slate-200 rounded-[8px] text-[13px] px-2 py-1.5 bg-white outline-none focus:border-indigo-500 transition-colors" value={difficulty} onChange={e => { setDifficulty(e.target.value); setPage(1); }}>
                  <option value="all">Any Difficulty</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] uppercase tracking-wider text-slate-500">
                    <th className="p-4 font-bold cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => handleSort('title')}>
                      <div className="flex items-center justify-between">Mission <ChevronDown className="w-3.5 h-3.5 opacity-50"/></div>
                    </th>
                    <th className="p-4 font-bold cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => handleSort('category')}>
                      <div className="flex items-center justify-between">Category <ChevronDown className="w-3.5 h-3.5 opacity-50"/></div>
                    </th>
                    <th className="p-4 font-bold cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => handleSort('priority')}>
                      <div className="flex items-center justify-between">Priority <ChevronDown className="w-3.5 h-3.5 opacity-50"/></div>
                    </th>
                    <th className="p-4 font-bold cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => handleSort('score')}>
                      <div className="flex items-center justify-between">Score <ChevronDown className="w-3.5 h-3.5 opacity-50"/></div>
                    </th>
                    <th className="p-4 font-bold cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => handleSort('gain')}>
                      <div className="flex items-center justify-between">AI Gain <ChevronDown className="w-3.5 h-3.5 opacity-50"/></div>
                    </th>
                    <th className="p-4 font-bold cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => handleSort('difficulty')}>
                      <div className="flex items-center justify-between">Difficulty <ChevronDown className="w-3.5 h-3.5 opacity-50"/></div>
                    </th>
                    <th className="p-4 font-bold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {pageList.map(m => (
                    <tr key={m.id} className="hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => setExpandedId(expandedId === m.id ? null : m.id)}>
                      <td className="p-4 min-w-[200px]">
                        <div className="text-[11px] font-bold text-slate-400 mb-0.5">{m.id}</div>
                        <div className="text-[13.5px] font-bold text-slate-900">{m.title}</div>
                      </td>
                      <td className="p-4"><span className="px-2 py-0.5 rounded-[4px] bg-slate-100 text-slate-600 text-[11px] font-bold border border-slate-200/60">{m.category}</span></td>
                      <td className="p-4"><span className={`px-2 py-0.5 rounded-[4px] text-[11px] font-bold border ${getPriorityBadgeClass(m.priority)} border-transparent`}>{m.priority}</span></td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className="text-[13px] font-bold text-slate-700 w-6">{m.score}</span>
                          <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden w-12">
                            <div className="h-full bg-amber-500 rounded-full" style={{ width: `${m.score}%` }}></div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-[13px] font-bold text-emerald-600">+{m.gain}%</td>
                      <td className="p-4 text-[13px] font-bold text-slate-900">{m.difficulty}</td>
                      <td className="p-4 text-right">
                        <button className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white rounded-[6px] text-[12px] font-semibold hover:bg-indigo-700 transition-colors shadow-sm" onClick={e => e.stopPropagation()}>
                          <Play className="w-3 h-3 fill-white" /> Execute
                        </button>
                      </td>
                    </tr>
                  ))}
                  {pageList.length === 0 && (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-slate-500 text-[13.5px]">No opportunities match your filters.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <span className="text-[12.5px] text-slate-500 font-medium">
                Showing {total > 0 ? (page - 1) * pageSize + 1 : 0}-{Math.min(page * pageSize, total)} of {total} opportunities
              </span>
              <div className="flex items-center gap-2">
                <button disabled={page <= 1} onClick={() => setPage(p => p - 1)} className="p-1.5 rounded-[6px] bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-700 disabled:opacity-50 transition-colors">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button disabled={page >= totalPages} onClick={() => setPage(p => p + 1)} className="p-1.5 rounded-[6px] bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-700 disabled:opacity-50 transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Matrix & Forecast */}
        <div className="flex flex-col gap-8">
          
          <div className="bg-white border border-slate-200 rounded-[14px] shadow-sm p-6">
            <div className="flex items-center gap-2 text-[16px] font-bold text-slate-900 mb-1">
              <LayoutGrid className="w-5 h-5 text-indigo-500" /> Opportunity Matrix
            </div>
            <p className="text-[13px] text-slate-500 mb-6">Prioritizing difficulty vs AI visibility impact.</p>
            
            <div className="grid grid-cols-2 gap-3">
              {/* Quick Wins */}
              <div className="bg-emerald-50/50 border border-emerald-100 rounded-[10px] p-3 flex flex-col gap-2">
                <div>
                  <div className="text-[12.5px] font-bold text-emerald-800">⚡ Quick Wins</div>
                  <div className="text-[10px] uppercase font-bold tracking-wider text-emerald-600/70">High Impact, Low Effort</div>
                </div>
                {matrixQuads['high-low'].map(m => (
                  <div key={m.id} className="text-[11.5px] font-medium text-emerald-900 bg-white border border-emerald-100/60 p-2 rounded-[6px] truncate shadow-sm cursor-pointer hover:border-emerald-300" title={m.title}>
                    {m.id}: {m.title}
                  </div>
                ))}
              </div>

              {/* Strategic Projects */}
              <div className="bg-blue-50/50 border border-blue-100 rounded-[10px] p-3 flex flex-col gap-2">
                <div>
                  <div className="text-[12.5px] font-bold text-blue-800">🎯 Strategic Projects</div>
                  <div className="text-[10px] uppercase font-bold tracking-wider text-blue-600/70">High Impact, High Effort</div>
                </div>
                {matrixQuads['high-high'].map(m => (
                  <div key={m.id} className="text-[11.5px] font-medium text-blue-900 bg-white border border-blue-100/60 p-2 rounded-[6px] truncate shadow-sm cursor-pointer hover:border-blue-300" title={m.title}>
                    {m.id}: {m.title}
                  </div>
                ))}
              </div>

              {/* Fill-Ins */}
              <div className="bg-slate-50/80 border border-slate-200 rounded-[10px] p-3 flex flex-col gap-2">
                <div>
                  <div className="text-[12.5px] font-bold text-slate-700">🔧 Fill-Ins</div>
                  <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500/70">Low Impact, Low Effort</div>
                </div>
                {matrixQuads['low-low'].map(m => (
                  <div key={m.id} className="text-[11.5px] font-medium text-slate-700 bg-white border border-slate-200/60 p-2 rounded-[6px] truncate shadow-sm cursor-pointer hover:border-slate-300" title={m.title}>
                    {m.id}: {m.title}
                  </div>
                ))}
              </div>

              {/* Thankless Tasks */}
              <div className="bg-amber-50/50 border border-amber-100 rounded-[10px] p-3 flex flex-col gap-2">
                <div>
                  <div className="text-[12.5px] font-bold text-amber-800">⏳ Thankless Tasks</div>
                  <div className="text-[10px] uppercase font-bold tracking-wider text-amber-600/70">Low Impact, High Effort</div>
                </div>
                {matrixQuads['low-high'].map(m => (
                  <div key={m.id} className="text-[11.5px] font-medium text-amber-900 bg-white border border-amber-100/60 p-2 rounded-[6px] truncate shadow-sm cursor-pointer hover:border-amber-300" title={m.title}>
                    {m.id}: {m.title}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-[14px] shadow-sm p-6">
            <div className="flex items-center gap-2 text-[16px] font-bold text-slate-900 mb-1">
              <TrendingUp className="w-5 h-5 text-indigo-500" /> Business Forecast
            </div>
            <p className="text-[13px] text-slate-500 mb-6">Projected performance lift over next 90 days.</p>

            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                <div>
                  <div className="text-[11.5px] font-bold uppercase tracking-wider text-slate-400 mb-1">Potential AI Growth</div>
                  <div className="text-[20px] font-space-grotesk font-bold text-slate-900 leading-none mb-1.5">+24.8%</div>
                  <div className="text-[11.5px] font-medium text-emerald-600 flex items-center gap-1"><TrendingUp className="w-3.5 h-3.5" /> Projected visibility lift</div>
                </div>
                <div className="w-24 h-8 opacity-70">
                  <svg viewBox="0 0 100 30"><path d="M0,25 Q15,22 30,18 T60,10 T80,8 T100,2" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round"/><path d="M0,25 Q15,22 30,18 T60,10 T80,8 T100,2 L100,30 L0,30 Z" fill="rgba(16,185,129,0.06)"/></svg>
                </div>
              </div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                <div>
                  <div className="text-[11.5px] font-bold uppercase tracking-wider text-slate-400 mb-1">Estimated Leads</div>
                  <div className="text-[20px] font-space-grotesk font-bold text-slate-900 leading-none mb-1.5">+340/mo</div>
                  <div className="text-[11.5px] font-medium text-emerald-600 flex items-center gap-1"><TrendingUp className="w-3.5 h-3.5" /> Additional conversions</div>
                </div>
                <div className="w-24 h-8 opacity-70">
                  <svg viewBox="0 0 100 30"><path d="M0,28 Q20,24 40,16 T70,12 T100,4" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round"/><path d="M0,28 Q20,24 40,16 T70,12 T100,4 L100,30 L0,30 Z" fill="rgba(16,185,129,0.06)"/></svg>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[11.5px] font-bold uppercase tracking-wider text-slate-400 mb-1">Revenue Potential</div>
                  <div className="text-[20px] font-space-grotesk font-bold text-slate-900 leading-none mb-1.5">+$168,000</div>
                  <div className="text-[11.5px] font-medium text-emerald-600 flex items-center gap-1"><TrendingUp className="w-3.5 h-3.5" /> Projected ARR impact</div>
                </div>
                <div className="w-24 h-8 opacity-70">
                  <svg viewBox="0 0 100 30"><path d="M0,26 Q15,22 30,20 T60,12 T90,6 T100,2" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round"/><path d="M0,26 Q15,22 30,20 T60,12 T90,6 T100,2 L100,30 L0,30 Z" fill="rgba(16,185,129,0.06)"/></svg>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
