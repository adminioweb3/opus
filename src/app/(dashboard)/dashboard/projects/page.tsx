"use client";

import React, { useState } from 'react';
import { 
  Flag, DollarSign, Gauge, CheckCircle2, Sparkles, ChevronRight, 
  Zap, LayoutGrid, User, ChevronDown, Search, Target, RefreshCcw, 
  Swords, Plus, MoreVertical 
} from 'lucide-react';
import { toast } from 'sonner';

// Dummy Data
const INITIAL_PROJECTS = [
  {name:'Win back Perplexity sourcing queries', status:'In progress', cat:'GEO', impact:'High', by:'Sarah Chen', init:'SC', date:'Jun 18, 2026', progress:64, tint:'#6366F1'},
  {name:'FAQ schema rollout — top 20 pages', status:'In progress', cat:'Content', impact:'Medium', by:'Sudarshan Patil', init:'SP', date:'Jun 12, 2026', progress:40, tint:'#2563EB'},
  {name:'Gemini citation recovery', status:'Planning', cat:'Citations', impact:'High', by:'Sarah Chen', init:'SC', date:'Jun 22, 2026', progress:15, tint:'#16A34A'},
  {name:'Brand entity cleanup', status:'Done', cat:'Authority', impact:'Low', by:'Sudarshan Patil', init:'SP', date:'May 30, 2026', progress:100, tint:'#7C3AED'}
];

const INITIAL_SUGGESTED = [
  {t:'Close 3 GEO gaps on sourcing-intent queries', why:'Engines cite competitors on three high-intent queries you should own.', impact:'+$80k', tint:'#6366F1', ic: Target},
  {t:'Refresh 12 stale high-traffic pages', why:'Content older than 90 days is bleeding citations on time-sensitive prompts.', impact:'+6% citations', tint:'#2563EB', ic: RefreshCcw},
  {t:'Counter Competitor A listicle placements', why:'Competitor A picked up 4 third-party listicles now driving AI mentions.', impact:'Defend $40k', tint:'#DC2626', ic: Swords}
];

// Helper functions
const soft = (hex: string) => {
  const r = hex.replace(/^#/, '').match(/.{2}/g)?.map(h => parseInt(h, 16)) || [0,0,0];
  return `rgba(${r[0]},${r[1]},${r[2]},.13)`;
};
const prColor = (s: string) => ({'In progress':'var(--orange)','Planning':'#2563EB','Done':'var(--green)'})[s] || '#94A3B8';
const impClass = (i: string) => i==='High'?'high':(i==='Medium'?'med':'low');

export default function ProjectsPage() {
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [suggested, setSuggested] = useState(INITIAL_SUGGESTED);

  const active = projects.filter(p => p.status !== 'Done').length;
  const done = 12; // Static in original HTML

  const trackSuggested = (index: number) => {
    const s = suggested[index];
    if (!s) return;
    const newProject = {
      name: s.t, status: 'Planning', cat: 'GEO', impact: 'High', 
      by: 'Sarah Chen', init: 'SC', date: 'Just now', progress: 5, tint: s.tint
    };
    setProjects([newProject, ...projects]);
    setSuggested(suggested.filter((_, i) => i !== index));
    toast.success(`Tracking "${s.t}"`);
  };

  const openNewProject = () => {
    toast.info('New project dialog would open here');
  };

  return (
    <div className="view opus-scope">
      <div className="page-head">
        <div>
          <h1>Projects</h1>
          <p>Turn visibility insights into tracked, accountable initiatives.</p>
        </div>
        <div className="head-tools">
          <button className="btn primary" onClick={openNewProject}>
            <Plus size={16} className="inline mr-1" style={{verticalAlign: '-2px'}} /> 
            New project
          </button>
        </div>
      </div>

      <div className="v-strip">
        <div className="v-stat" style={{'--accent': '#6366F1'} as React.CSSProperties}>
          <div className="vl"><Flag size={15} /> Active projects</div>
          <div className="vv">{active}</div>
          <div className="vmeta">in flight right now</div>
        </div>
        <div className="v-stat" style={{'--accent': '#16A34A'} as React.CSSProperties}>
          <div className="vl"><DollarSign size={15} /> Pipeline in play</div>
          <div className="vv">$240<small>k</small></div>
          <div className="vmeta">tied to open projects</div>
        </div>
        <div className="v-stat" style={{'--accent': '#2563EB'} as React.CSSProperties}>
          <div className="vl"><Gauge size={15} /> Avg impact</div>
          <div className="vv">High</div>
          <div className="vmeta">across active work</div>
        </div>
        <div className="v-stat" style={{'--accent': '#7C3AED'} as React.CSSProperties}>
          <div className="vl"><CheckCircle2 size={15} /> Completed</div>
          <div className="vv">{done}</div>
          <div className="vmeta">shipped all-time</div>
        </div>
      </div>

      <div className="sec-head">
        <span className="st-t flex items-center">
          <Sparkles size={16} style={{color: 'var(--orange)'}} className="mr-2" /> 
          Suggested by Citationly
        </span>
        <span className="see flex items-center">
          See all <ChevronRight size={14} className="ml-1" />
        </span>
      </div>

      <div className="sg-grid">
        {suggested.map((s, i) => {
          const Icon = s.ic;
          return (
            <div key={i} className="sg-card" style={{'--accent': s.tint, animationDelay: `${i * 70}ms`} as React.CSSProperties}>
              <div className="sg-ic" style={{background: soft(s.tint), color: s.tint}}>
                <Icon size={18} />
              </div>
              <div className="sg-t">{s.t}</div>
              <div className="sg-why">{s.why}</div>
              <div className="sg-foot">
                <span className="sg-impact">{s.impact}</span>
                <button 
                  className="btn primary flex items-center" 
                  style={{fontSize: '12px', padding: '6px 13px'}}
                  onClick={() => trackSuggested(i)}
                >
                  <Plus size={14} className="mr-1" /> Track
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="sec-head"><span className="st-t">Tracked projects</span></div>
      
      <div className="filterbar">
        <span className="fchip"><Zap size={14} /> Impact <ChevronDown size={14} /></span>
        <span className="fchip"><LayoutGrid size={14} /> Category <ChevronDown size={14} /></span>
        <span className="fchip"><User size={14} /> Created by <ChevronDown size={14} /></span>
        <div className="spacer"></div>
        <div className="tsearch">
          <Search size={16} />
          <input placeholder="Search projects…" />
        </div>
      </div>

      <div className="tbl-scroll">
        <div className="lhead phead">
          <span>Project</span><span>Impact</span><span>Category</span><span>Created by</span><span>Date added</span><span></span>
        </div>
        {projects.map((p, i) => (
          <div key={i} className="lrow prow" onClick={() => toast.info(`Opening project — ${p.name}`)}>
            <div className="l-main">
              <div className="l-ic" style={{background: soft(p.tint), color: p.tint}}>
                <Flag size={18} />
              </div>
              <div style={{minWidth: 0, flex: 1}}>
                <div className="l-nm">{p.name}</div>
                <div className="statusdot" style={{marginTop: '5px'}}>
                  <span className="d" style={{background: prColor(p.status)}}></span>
                  {p.status} · {p.progress}%
                </div>
                <div className="l-prog">
                  <i style={{width: `${p.progress}%`}}></i>
                </div>
              </div>
            </div>
            <div><span className={`impact-pill ${impClass(p.impact)}`}>{p.impact}</span></div>
            <div><span className="cat-tag">{p.cat}</span></div>
            <div className="mav">
              <span className="a">{p.init}</span>
              <span className="nm">{p.by}</span>
            </div>
            <div className="l-when">{p.date}</div>
            <button className="src-kebab" onClick={(e) => { e.stopPropagation(); toast.info('Project options'); }}>
              <MoreVertical size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
