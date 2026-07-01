"use client";

import React, { useState } from 'react';
import { 
  Plus, LayoutGrid, List, LayoutDashboard, CalendarClock, Play,
  PlayCircle, BookOpen, Bot, Zap, Quote, Clock, CheckCircle2,
  HelpCircle, Copy, Link, Swords, Code, ChevronRight, ChevronDown,
  User, CircleDot, Hexagon, FolderPlus, Search, Pencil,
  MoreVertical, FileCode2
} from 'lucide-react';
import { toast } from 'sonner';

// Dummy Data
const AG_TEMPLATES = [
  {ic: HelpCircle, tint:'#6366F1', t:'AEO-Optimized FAQ Generator', d:'Builds an answer-optimized FAQ by extracting the questions buyers actually ask AI.', by:'Citationly'},
  {ic: Bot, tint:'#475569', t:'Robots.txt & LLMs.txt Auditor', d:'Fetches a domain’s robots.txt and llms.txt, then flags what blocks AI crawlers.', by:'Community'},
  {ic: Copy, tint:'#2563EB', t:'Above & Below the Fold Copy', d:'Scrapes a product page and rewrites it around the highest-volume AI prompts.', by:'Citationly'},
  {ic: Link, tint:'#16A34A', t:'Internal Link Booster', d:'Takes an existing article and adds relevant internal links to lift topical authority.', by:'Citationly'},
  {ic: Swords, tint:'#DC2626', t:'Competitor Snippet Tracker', d:'Watches who wins your target snippets across engines and alerts on changes.', by:'Citationly'},
  {ic: Code, tint:'#7C3AED', t:'Schema Markup Builder', d:'Generates valid JSON-LD schema so engines parse your pages with confidence.', by:'Community'}
];

const AGENTS = [
  {name:'IOWEB3 AEO Content Producer', ic: Pencil, tint:'#7C3AED', status:'running', by:'Sudarshan Patil', init:'SP', when:'running now', metric:'12 pages in queue'},
  {name:'AEO-Optimized FAQ Generator', ic: HelpCircle, tint:'#6366F1', status:'published', by:'Sudarshan Patil', init:'SP', when:'1d ago', metric:'+38 citations won'},
  {name:'Competitor snippet watch', ic: Swords, tint:'#DC2626', status:'scheduled', by:'Sarah Chen', init:'SC', when:'runs daily · 9:00', metric:'2 alerts this week'},
  {name:'Untitled agent', ic: Bot, tint:'#64748B', status:'draft', by:'Sudarshan Patil', init:'SP', when:'1d ago', metric:'—'}
];

// Helper functions
const soft = (hex: string) => {
  const r = hex.replace(/^#/, '').match(/.{2}/g)?.map(h => parseInt(h, 16)) || [0,0,0];
  return `rgba(${r[0]},${r[1]},${r[2]},.13)`;
};
const agStatusLabel = (s: string) => ({running:'Running', published:'Published', scheduled:'Scheduled', draft:'Draft'})[s] || s;
const agColor = (s: string) => ({running:'var(--orange)', published:'var(--green)', scheduled:'#2563EB', draft:'#94A3B8'})[s] || '#94A3B8';

export default function AgentsPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showBanner, setShowBanner] = useState(true);

  const switchTab = (t: string) => {
    setActiveTab(t);
  };

  const renderBanner = () => {
    if (!showBanner) return null;
    return (
      <div className="ag-banner">
        <div className="bhide" onClick={() => setShowBanner(false)}>Hide</div>
        <div className="play" onClick={() => toast.info('Playing — how agents work')}>
          <PlayCircle size={28} />
        </div>
        <div className="bmain">
          <div className="bt">Citationly Agents take you from insight to execution</div>
          <div className="bs">Automate reporting, hunt opportunities, optimize content and defend citations — agents run on their own and ping your Mission Alerts when it matters.</div>
          <div className="bbtns">
            <span className="bbtn solid flex items-center" onClick={() => toast.info('Playing walkthrough')}>
              <Play size={16} className="mr-1.5" /> See how it works
            </span>
            <span className="bbtn flex items-center" onClick={() => toast.info('Opening Citationly University')}>
              <BookOpen size={16} className="mr-1.5" /> Explore guides
            </span>
          </div>
        </div>
      </div>
    );
  };

  const renderStrip = () => (
    <div className="v-strip">
      <div className="v-stat" style={{'--accent': '#7C3AED'} as React.CSSProperties}>
        <div className="vl"><Bot size={15} /> Active agents</div>
        <div className="vv">8</div>
        <div className="vmeta">deployed in your org</div>
      </div>
      <div className="v-stat" style={{'--accent': '#6366F1'} as React.CSSProperties}>
        <div className="vl"><Zap size={15} /> Running now</div>
        <div className="vv">1</div>
        <div className="vmeta">content producer, live</div>
      </div>
      <div className="v-stat" style={{'--accent': '#16A34A'} as React.CSSProperties}>
        <div className="vl"><Quote size={15} /> Citations won</div>
        <div className="vv">+412</div>
        <div className="vmeta">last 30 days</div>
      </div>
      <div className="v-stat" style={{'--accent': '#2563EB'} as React.CSSProperties}>
        <div className="vl"><Clock size={15} /> Hours saved</div>
        <div className="vv">64</div>
        <div className="vmeta">vs manual, this month</div>
      </div>
    </div>
  );

  const renderBuilder = () => (
    <div className="ag-build-wrap">
      <div className="ag-build-q">What do you want to build?</div>
      <div className="ag-builder">
        <textarea 
          rows={1} 
          placeholder="Describe the agent you want — e.g. monitor Perplexity for lost snippets and draft replacement pages."
        ></textarea>
        <div className="bar">
          <button className="mini" onClick={() => toast.info('Attach context')}><Plus size={16} /></button>
          <span className="mchip2"><Bot size={14} className="mr-1" /> Auto <ChevronDown size={14} className="ml-1" /></span>
          <button className="gobtn ml-auto" onClick={() => toast.success('Drafting your agent…')}><Zap size={18} /></button>
        </div>
      </div>
    </div>
  );

  const renderTemplates = (limit: number, full: boolean) => {
    const items = AG_TEMPLATES.slice(0, limit);
    return (
      <>
        <div className="sec-head">
          <span className="st-t">Start from a template</span>
          {!full && (
            <span className="see flex items-center" onClick={() => switchTab('templates')}>
              See all <ChevronRight size={14} className="ml-1" />
            </span>
          )}
        </div>
        <div className="tpl-grid">
          {items.map((t, i) => {
            const Icon = t.ic;
            return (
              <div key={i} className="tpl" style={{animationDelay: `${i*55}ms`} as React.CSSProperties} onClick={() => toast.success(`Starting from template — ${t.t}`)}>
                <div className="tpl-ic" style={{background: soft(t.tint), color: t.tint}}>
                  <Icon size={20} />
                </div>
                <div className="tpl-t">{t.t}</div>
                <div className="tpl-d">{t.d}</div>
                <div className="tpl-by mt-auto pt-2">
                  <CheckCircle2 size={14} style={{color: t.tint}} className="mr-1" /> {t.by}
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  };

  const renderFavorites = () => (
    <>
      <div className="sec-head"><span className="st-t">Favorites</span></div>
      <div className="empty-line">No favorites yet — star an agent to pin it here.</div>
    </>
  );

  const renderFilterBar = () => (
    <div className="filterbar">
      <span className="fchip"><User size={14} /> Created by <ChevronDown size={14} /></span>
      <span className="fchip"><CircleDot size={14} /> Status <ChevronDown size={14} /></span>
      <span className="fchip"><Hexagon size={14} /> Type <ChevronDown size={14} /></span>
      <div className="spacer"></div>
      <button className="btn" onClick={() => toast.success('New folder created')}>
        <FolderPlus size={16} className="inline mr-1" style={{verticalAlign: '-2px'}} /> New folder
      </button>
      <div className="tsearch">
        <Search size={16} />
        <input placeholder="Search agents…" />
      </div>
    </div>
  );

  const renderAgentsTable = (list: typeof AGENTS, title: string) => (
    <>
      {title && (
        <div className="sec-head">
          <span className="st-t">{title}</span>
          {activeTab !== 'all' && (
            <span className="see flex items-center" onClick={() => switchTab('all')}>
              See all <ChevronRight size={14} className="ml-1" />
            </span>
          )}
        </div>
      )}
      <div className="tbl-scroll">
        <div className="lhead ahead">
          <span>Agent</span><span>Status</span><span>Created by</span><span>Last modified</span><span></span>
        </div>
        {list.map((a, i) => {
          const Icon = a.ic;
          return (
            <div key={i} className="lrow arow" onClick={() => toast.info(`Opening agent — ${a.name}`)}>
              <div className="l-main">
                <div className="l-ic" style={{background: soft(a.tint), color: a.tint}}>
                  <Icon size={18} />
                </div>
                <div style={{minWidth: 0}}>
                  <div className="l-nm">{a.name}</div>
                  <div className="l-sub">{a.metric}</div>
                </div>
              </div>
              <div className={`statusdot ${a.status === 'running' ? 'run' : ''}`}>
                <span className="d" style={{background: agColor(a.status)}}></span>
                {agStatusLabel(a.status)}
              </div>
              <div className="mav">
                <span className="a">{a.init}</span>
                <span className="nm">{a.by}</span>
              </div>
              <div className="l-when">{a.when}</div>
              <button className="src-kebab" onClick={(e) => { e.stopPropagation(); toast.info('Agent options'); }}>
                <MoreVertical size={18} />
              </button>
            </div>
          );
        })}
      </div>
    </>
  );

  return (
    <div className="view opus-scope">
      <div className="page-head">
        <div>
          <h1>Citationly agents</h1>
          <p>Go from insight to action — agents do the work and report back.</p>
        </div>
        <div className="head-tools">
          <button className="btn primary" onClick={() => toast.info('Describe your agent below to start')}>
            <Plus size={16} className="inline mr-1" style={{verticalAlign: '-2px'}} /> Create agent
          </button>
        </div>
      </div>

      <div className="v-tabs">
        <div className={`v-tab ${activeTab === 'overview' ? 'on' : ''}`} onClick={() => switchTab('overview')}>
          <LayoutGrid size={17} /> Overview
        </div>
        <div className={`v-tab ${activeTab === 'all' ? 'on' : ''}`} onClick={() => switchTab('all')}>
          <List size={17} /> All agents <span className="cnt">{AGENTS.length}</span>
        </div>
        <div className={`v-tab ${activeTab === 'templates' ? 'on' : ''}`} onClick={() => switchTab('templates')}>
          <LayoutDashboard size={17} /> Templates <span className="cnt">{AG_TEMPLATES.length}</span>
        </div>
        <div className={`v-tab ${activeTab === 'scheduled' ? 'on' : ''}`} onClick={() => switchTab('scheduled')}>
          <CalendarClock size={17} /> Scheduled
        </div>
      </div>

      {activeTab === 'overview' && (
        <>
          {renderBanner()}
          {renderStrip()}
          {renderBuilder()}
          {renderTemplates(4, false)}
          {renderFavorites()}
          {renderAgentsTable(AGENTS, 'Your agents')}
        </>
      )}

      {activeTab === 'all' && (
        <>
          {renderStrip()}
          {renderFilterBar()}
          {renderAgentsTable(AGENTS, '')}
        </>
      )}

      {activeTab === 'templates' && renderTemplates(AG_TEMPLATES.length, true)}

      {activeTab === 'scheduled' && (
        renderAgentsTable(AGENTS.filter(a => a.status === 'scheduled' || a.status === 'running'), 'Scheduled & running')
      )}
    </div>
  );
}
