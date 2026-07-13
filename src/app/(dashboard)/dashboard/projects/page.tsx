"use client";

import React, { useState } from 'react';
import {
  Flag, DollarSign, Gauge, CheckCircle2, Sparkles, ChevronRight,
  Zap, LayoutGrid, User, ChevronDown, Search, Target, RefreshCcw,
  Swords, Plus, MoreVertical
} from 'lucide-react';
import { toast } from 'sonner';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

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

  const impactPillClass = (impact: string) => {
    if (impact === 'High') return 'bg-red-50 text-red-600';
    if (impact === 'Medium') return 'bg-c-orange-soft text-c-orange-dark';
    return 'bg-muted text-muted-foreground';
  };

  return (
    <div className="p-6 md:p-8 max-w-[1400px] mx-auto space-y-8">
      {/* HEADER */}
      <div className="flex justify-between items-start gap-6 pb-8 border-b border-border/50">
        <div className="space-y-1.5">
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground text-sm">Turn visibility insights into tracked, accountable initiatives.</p>
        </div>
        <Button onClick={openNewProject}>
          <Plus size={16} className="mr-1" /> New project
        </Button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Active projects', icon: Flag, value: active, meta: 'in flight right now', accent: '#6366F1' },
          { label: 'Pipeline in play', icon: DollarSign, value: <>$240<small className="text-sm text-slate-400 font-semibold">k</small></>, meta: 'tied to open projects', accent: '#16A34A' },
          { label: 'Avg impact', icon: Gauge, value: 'High', meta: 'across active work', accent: '#2563EB' },
          { label: 'Completed', icon: CheckCircle2, value: done, meta: 'shipped all-time', accent: '#7C3AED' },
        ].map((stat) => (
          <Card key={stat.label} className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-[3px] opacity-80" style={{ background: stat.accent }} />
            <CardContent className="p-4">
              <div className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                <stat.icon size={15} style={{ color: stat.accent }} /> {stat.label}
              </div>
              <div className="text-2xl font-bold tracking-tight mt-1.5">{stat.value}</div>
              <div className="text-[11.5px] text-slate-400 mt-1">{stat.meta}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* SUGGESTED */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold flex items-center">
            <Sparkles size={16} className="text-primary mr-2" /> Suggested by Citationly
          </span>
          <span className="text-xs font-semibold text-c-orange-dark cursor-pointer flex items-center hover:underline">
            See all <ChevronRight size={14} className="ml-1" />
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {suggested.map((s, i) => {
            const Icon = s.ic;
            return (
              <Card key={i} className="relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-[3px]" style={{ background: s.tint }} />
                <CardContent className="p-4">
                  <div
                    className="w-9.5 h-9.5 rounded-lg flex items-center justify-center mb-3"
                    style={{ background: soft(s.tint), color: s.tint }}
                  >
                    <Icon size={18} />
                  </div>
                  <div className="text-sm font-bold leading-snug">{s.t}</div>
                  <div className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{s.why}</div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm font-bold text-emerald-700">{s.impact}</span>
                    <Button size="sm" onClick={() => trackSuggested(i)}>
                      <Plus size={14} className="mr-1" /> Track
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* TRACKED PROJECTS */}
      <section className="space-y-4">
        <h2 className="text-sm font-bold">Tracked projects</h2>

        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 px-3 text-xs font-semibold text-muted-foreground">
            <Zap size={14} className="mr-1.5" /> Impact <ChevronDown size={14} className="ml-1" />
          </Button>
          <Button variant="outline" size="sm" className="h-8 px-3 text-xs font-semibold text-muted-foreground">
            <LayoutGrid size={14} className="mr-1.5" /> Category <ChevronDown size={14} className="ml-1" />
          </Button>
          <Button variant="outline" size="sm" className="h-8 px-3 text-xs font-semibold text-muted-foreground">
            <User size={14} className="mr-1.5" /> Created by <ChevronDown size={14} className="ml-1" />
          </Button>
          <div className="flex-1" />
          <div className="flex items-center gap-2 border border-border rounded-lg px-3 py-1.5 min-w-[200px] bg-card">
            <Search size={16} className="text-slate-400" />
            <Input placeholder="Search projects…" className="border-0 h-auto p-0 shadow-none focus-visible:ring-0 text-sm" />
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="hidden lg:grid grid-cols-[minmax(0,1fr)_92px_120px_165px_120px_44px] gap-3.5 px-4 py-2.5 text-[11px] uppercase tracking-wide text-slate-400 font-bold border-b border-border">
              <span>Project</span><span>Impact</span><span>Category</span><span>Created by</span><span>Date added</span><span></span>
            </div>
            <div className="divide-y divide-border/50">
              {projects.map((p, i) => (
                <div
                  key={i}
                  className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_92px_120px_165px_120px_44px] gap-2 lg:gap-3.5 items-center px-4 py-3 cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => toast.info(`Opening project — ${p.name}`)}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: soft(p.tint), color: p.tint }}
                    >
                      <Flag size={18} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-semibold truncate">{p.name}</div>
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground mt-1">
                        <span className="w-2 h-2 rounded-full shrink-0" style={{ background: prColor(p.status) }} />
                        {p.status} · {p.progress}%
                      </div>
                      <div className="h-[5px] rounded-full bg-muted overflow-hidden mt-1.5 max-w-[220px]">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-primary to-c-orange-mid"
                          style={{ width: `${p.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  <div><Badge className={impactPillClass(p.impact)}>{p.impact}</Badge></div>
                  <div><Badge variant="outline" className="text-muted-foreground font-semibold">{p.cat}</Badge></div>
                  <div className="flex items-center gap-2 text-xs min-w-0">
                    <span className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-c-orange-mid text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                      {p.init}
                    </span>
                    <span className="text-foreground truncate">{p.by}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">{p.date}</div>
                  <button
                    className="w-7.5 h-7.5 rounded-lg border-0 bg-transparent text-slate-400 hover:bg-muted hover:text-foreground flex items-center justify-center transition-colors"
                    onClick={(e) => { e.stopPropagation(); toast.info('Project options'); }}
                  >
                    <MoreVertical size={18} />
                  </button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
