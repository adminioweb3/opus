"use client";

import React, { useState } from 'react';
import {
  Plus, LayoutGrid, List, LayoutDashboard, CalendarClock, Play,
  PlayCircle, BookOpen, Bot, Zap, Quote, Clock, CheckCircle2,
  HelpCircle, Copy, Link, Swords, Code, ChevronRight, ChevronDown,
  User, CircleDot, Hexagon, FolderPlus, Search, Pencil,
  MoreVertical
} from 'lucide-react';
import { toast } from 'sonner';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
      <Card className="relative">
        <CardContent className="p-5 flex items-center gap-5">
          <span
            className="absolute top-3.5 right-4 text-xs text-slate-400 hover:text-foreground cursor-pointer z-10"
            onClick={() => setShowBanner(false)}
          >
            Hide
          </span>
          <div
            className="w-18 h-18 rounded-2xl bg-muted border border-border flex items-center justify-center text-primary text-2xl shrink-0 cursor-pointer hover:scale-[1.06] hover:border-primary transition-transform"
            onClick={() => toast.info('Playing — how agents work')}
          >
            <PlayCircle size={28} />
          </div>
          <div>
            <div className="text-foreground text-base font-bold">Citationly Agents take you from insight to execution</div>
            <div className="text-muted-foreground text-sm mt-1.5 max-w-xl leading-relaxed">
              Automate reporting, hunt opportunities, optimize content and defend citations — agents run on their own and ping your Mission Alerts when it matters.
            </div>
            <div className="flex gap-2.5 mt-3.5">
              <Button size="sm" onClick={() => toast.info('Playing walkthrough')}>
                <Play size={16} className="mr-1.5" /> See how it works
              </Button>
              <Button size="sm" variant="outline" onClick={() => toast.info('Opening Citationly University')}>
                <BookOpen size={16} className="mr-1.5" /> Explore guides
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderStrip = () => (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {[
        { label: 'Active agents', icon: Bot, value: '8', meta: 'deployed in your org', accent: '#7C3AED' },
        { label: 'Running now', icon: Zap, value: '1', meta: 'content producer, live', accent: '#6366F1' },
        { label: 'Citations won', icon: Quote, value: '+412', meta: 'last 30 days', accent: '#16A34A' },
        { label: 'Hours saved', icon: Clock, value: '64', meta: 'vs manual, this month', accent: '#2563EB' },
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
  );

  const renderBuilder = () => (
    <div className="max-w-2xl mx-auto text-center py-2">
      <div className="text-lg font-bold tracking-tight mb-4">What do you want to build?</div>
      <Card className="text-left">
        <CardContent className="p-4">
          <textarea
            rows={1}
            placeholder="Describe the agent you want — e.g. monitor Perplexity for lost snippets and draft replacement pages."
            className="w-full border-0 outline-none resize-none font-sans text-sm text-foreground bg-transparent leading-relaxed min-h-6 max-h-36 placeholder:text-slate-400"
          />
          <div className="flex items-center gap-2 mt-2.5">
            <button
              className="w-8.5 h-8.5 rounded-lg border border-border bg-card text-muted-foreground hover:bg-muted flex items-center justify-center transition-colors"
              onClick={() => toast.info('Attach context')}
            >
              <Plus size={16} />
            </button>
            <span className="text-xs font-semibold text-muted-foreground border border-border rounded-lg px-2.5 py-1.5 cursor-pointer inline-flex items-center hover:border-primary hover:text-c-orange-dark">
              <Bot size={14} className="mr-1" /> Auto <ChevronDown size={14} className="ml-1" />
            </span>
            <button
              className="ml-auto w-9.5 h-9.5 rounded-xl border-0 bg-gradient-to-br from-primary to-c-orange-mid text-white flex items-center justify-center hover:scale-[1.08] transition-transform"
              onClick={() => toast.success('Drafting your agent…')}
            >
              <Zap size={18} />
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderTemplates = (limit: number, full: boolean) => {
    const items = AG_TEMPLATES.slice(0, limit);
    return (
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold">Start from a template</span>
          {!full && (
            <span
              className="text-xs font-semibold text-c-orange-dark cursor-pointer flex items-center hover:underline"
              onClick={() => switchTab('templates')}
            >
              See all <ChevronRight size={14} className="ml-1" />
            </span>
          )}
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
          {items.map((t, i) => {
            const Icon = t.ic;
            return (
              <Card
                key={i}
                className="cursor-pointer hover:-translate-y-1 hover:shadow-lg transition-all"
                onClick={() => toast.success(`Starting from template — ${t.t}`)}
              >
                <CardContent className="p-4 flex flex-col h-full">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                    style={{ background: soft(t.tint), color: t.tint }}
                  >
                    <Icon size={20} />
                  </div>
                  <div className="text-[13.5px] font-bold leading-snug">{t.t}</div>
                  <div className="text-xs text-muted-foreground mt-1.5 leading-relaxed flex-1">{t.d}</div>
                  <div className="text-[11.5px] text-slate-400 mt-3 pt-2 flex items-center">
                    <CheckCircle2 size={14} style={{ color: t.tint }} className="mr-1" /> {t.by}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    );
  };

  const renderFavorites = () => (
    <section className="space-y-4">
      <span className="text-sm font-bold">Favorites</span>
      <div className="border border-dashed border-border rounded-xl p-4.5 text-center text-sm text-slate-400">
        No favorites yet — star an agent to pin it here.
      </div>
    </section>
  );

  const renderFilterBar = () => (
    <div className="flex flex-wrap items-center gap-2">
      <Button variant="outline" size="sm" className="h-8 px-3 text-xs font-semibold text-muted-foreground">
        <User size={14} className="mr-1.5" /> Created by <ChevronDown size={14} className="ml-1" />
      </Button>
      <Button variant="outline" size="sm" className="h-8 px-3 text-xs font-semibold text-muted-foreground">
        <CircleDot size={14} className="mr-1.5" /> Status <ChevronDown size={14} className="ml-1" />
      </Button>
      <Button variant="outline" size="sm" className="h-8 px-3 text-xs font-semibold text-muted-foreground">
        <Hexagon size={14} className="mr-1.5" /> Type <ChevronDown size={14} className="ml-1" />
      </Button>
      <div className="flex-1" />
      <Button variant="outline" size="sm" onClick={() => toast.success('New folder created')}>
        <FolderPlus size={16} className="mr-1" /> New folder
      </Button>
      <div className="flex items-center gap-2 border border-border rounded-lg px-3 py-1.5 min-w-[200px] bg-card">
        <Search size={16} className="text-slate-400" />
        <Input placeholder="Search agents…" className="border-0 h-auto p-0 shadow-none focus-visible:ring-0 text-sm" />
      </div>
    </div>
  );

  const renderAgentsTable = (list: typeof AGENTS, title: string) => (
    <section className="space-y-4">
      {title && (
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold">{title}</span>
          {activeTab !== 'all' && (
            <span
              className="text-xs font-semibold text-c-orange-dark cursor-pointer flex items-center hover:underline"
              onClick={() => switchTab('all')}
            >
              See all <ChevronRight size={14} className="ml-1" />
            </span>
          )}
        </div>
      )}
      <Card>
        <CardContent className="p-0">
          <div className="hidden lg:grid grid-cols-[minmax(0,1fr)_150px_180px_130px_44px] gap-3.5 px-4 py-2.5 text-[11px] uppercase tracking-wide text-slate-400 font-bold border-b border-border">
            <span>Agent</span><span>Status</span><span>Created by</span><span>Last modified</span><span></span>
          </div>
          <div className="divide-y divide-border/50">
            {list.map((a, i) => {
              const Icon = a.ic;
              return (
                <div
                  key={i}
                  className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_150px_180px_130px_44px] gap-2 lg:gap-3.5 items-center px-4 py-3 cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => toast.info(`Opening agent — ${a.name}`)}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: soft(a.tint), color: a.tint }}
                    >
                      <Icon size={18} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold truncate">{a.name}</div>
                      <div className="text-[11.5px] text-slate-400 mt-0.5">{a.metric}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                    <span
                      className={`w-2 h-2 rounded-full shrink-0 ${a.status === 'running' ? 'animate-pulse' : ''}`}
                      style={{ background: agColor(a.status) }}
                    />
                    {agStatusLabel(a.status)}
                  </div>
                  <div className="flex items-center gap-2 text-xs min-w-0">
                    <span className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-c-orange-mid text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                      {a.init}
                    </span>
                    <span className="text-foreground truncate">{a.by}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">{a.when}</div>
                  <button
                    className="w-7.5 h-7.5 rounded-lg border-0 bg-transparent text-slate-400 hover:bg-muted hover:text-foreground flex items-center justify-center transition-colors"
                    onClick={(e) => { e.stopPropagation(); toast.info('Agent options'); }}
                  >
                    <MoreVertical size={18} />
                  </button>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </section>
  );

  return (
    <div className="p-6 md:p-8 max-w-[1400px] mx-auto space-y-8">
      {/* HEADER */}
      <div className="flex justify-between items-start gap-6 pb-8 border-b border-border/50">
        <div className="space-y-1.5">
          <h1 className="text-3xl font-bold tracking-tight">Citationly agents</h1>
          <p className="text-muted-foreground text-sm">Go from insight to action — agents do the work and report back.</p>
        </div>
        <Button onClick={() => toast.info('Describe your agent below to start')}>
          <Plus size={16} className="mr-1" /> Create agent
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={switchTab}>
        <TabsList variant="line" className="w-full justify-start border-b border-border h-auto p-0 gap-6">
          <TabsTrigger value="overview" className="gap-2 pb-3 text-sm font-semibold">
            <LayoutGrid size={17} /> Overview
          </TabsTrigger>
          <TabsTrigger value="all" className="gap-2 pb-3 text-sm font-semibold">
            <List size={17} /> All agents
            <Badge variant="secondary" className="text-[11px]">{AGENTS.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="templates" className="gap-2 pb-3 text-sm font-semibold">
            <LayoutDashboard size={17} /> Templates
            <Badge variant="secondary" className="text-[11px]">{AG_TEMPLATES.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="scheduled" className="gap-2 pb-3 text-sm font-semibold">
            <CalendarClock size={17} /> Scheduled
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {activeTab === 'overview' && (
        <div className="space-y-8">
          {renderBanner()}
          {renderStrip()}
          {renderBuilder()}
          {renderTemplates(4, false)}
          {renderFavorites()}
          {renderAgentsTable(AGENTS, 'Your agents')}
        </div>
      )}

      {activeTab === 'all' && (
        <div className="space-y-8">
          {renderStrip()}
          {renderFilterBar()}
          {renderAgentsTable(AGENTS, '')}
        </div>
      )}

      {activeTab === 'templates' && renderTemplates(AG_TEMPLATES.length, true)}

      {activeTab === 'scheduled' && (
        renderAgentsTable(AGENTS.filter(a => a.status === 'scheduled' || a.status === 'running'), 'Scheduled & running')
      )}
    </div>
  );
}
