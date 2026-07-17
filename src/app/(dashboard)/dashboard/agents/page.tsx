"use client";

import React, { useMemo, useState } from 'react';
import {
  Plus, LayoutGrid, List, LayoutDashboard, CalendarClock, Play,
  PlayCircle, BookOpen, Bot, Zap, Quote, Clock, CheckCircle2,
  HelpCircle, Copy, Link, Swords, Code, ChevronRight, ChevronDown,
  User, CircleDot, Hexagon, FolderPlus, Search, Pencil,
  MoreVertical, Pause, Trash2, Copy as DuplicateIcon, X
} from 'lucide-react';
import { toast } from 'sonner';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type AgentStatus = 'running' | 'published' | 'scheduled' | 'draft';
type AgentType = 'Content' | 'Monitoring' | 'Reporting' | 'Optimization';

interface AgentItem {
  id: string;
  name: string;
  ic: typeof Bot;
  tint: string;
  status: AgentStatus;
  type: AgentType;
  by: string;
  init: string;
  when: string;
  metric: string;
}

// Dummy Data
const AG_TEMPLATES = [
  {ic: HelpCircle, tint:'#6366F1', t:'AEO-Optimized FAQ Generator', d:'Builds an answer-optimized FAQ by extracting the questions buyers actually ask AI.', by:'Citationly'},
  {ic: Bot, tint:'#475569', t:'Robots.txt & LLMs.txt Auditor', d:'Fetches a domain’s robots.txt and llms.txt, then flags what blocks AI crawlers.', by:'Community'},
  {ic: Copy, tint:'#2563EB', t:'Above & Below the Fold Copy', d:'Scrapes a product page and rewrites it around the highest-volume AI prompts.', by:'Citationly'},
  {ic: Link, tint:'#16A34A', t:'Internal Link Booster', d:'Takes an existing article and adds relevant internal links to lift topical authority.', by:'Citationly'},
  {ic: Swords, tint:'#DC2626', t:'Competitor Snippet Tracker', d:'Watches who wins your target snippets across engines and alerts on changes.', by:'Citationly'},
  {ic: Code, tint:'#7C3AED', t:'Schema Markup Builder', d:'Generates valid JSON-LD schema so engines parse your pages with confidence.', by:'Community'}
];

const INITIAL_AGENTS: AgentItem[] = [
  {id:'a1', name:'IOWEB3 AEO Content Producer', ic: Pencil, tint:'#7C3AED', status:'running', type:'Content', by:'Sudarshan Patil', init:'SP', when:'running now', metric:'12 pages in queue'},
  {id:'a2', name:'AEO-Optimized FAQ Generator', ic: HelpCircle, tint:'#6366F1', status:'published', type:'Content', by:'Sudarshan Patil', init:'SP', when:'1d ago', metric:'+38 citations won'},
  {id:'a3', name:'Competitor snippet watch', ic: Swords, tint:'#DC2626', status:'scheduled', type:'Monitoring', by:'Sarah Chen', init:'SC', when:'runs daily · 9:00', metric:'2 alerts this week'},
  {id:'a4', name:'Untitled agent', ic: Bot, tint:'#64748B', status:'draft', type:'Reporting', by:'Sudarshan Patil', init:'SP', when:'1d ago', metric:'—'}
];

const STATUS_OPTIONS: AgentStatus[] = ['running', 'published', 'scheduled', 'draft'];
const TYPE_OPTIONS: AgentType[] = ['Content', 'Monitoring', 'Reporting', 'Optimization'];

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
  const [agents, setAgents] = useState<AgentItem[]>(INITIAL_AGENTS);
  const [folders, setFolders] = useState<string[]>([]);
  const [showNewFolder, setShowNewFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [builderText, setBuilderText] = useState("");

  // Filters (All agents tab)
  const [filterCreatedBy, setFilterCreatedBy] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<AgentStatus | null>(null);
  const [filterType, setFilterType] = useState<AgentType | null>(null);
  const [search, setSearch] = useState("");

  const creators = useMemo(() => Array.from(new Set(agents.map((a) => a.by))), [agents]);

  const switchTab = (t: string) => {
    setActiveTab(t);
  };

  const focusBuilder = () => {
    switchTab('overview');
  };

  const applyTemplate = (title: string, description: string) => {
    setBuilderText(`${title}: ${description}`);
    focusBuilder();
    toast.success(`Loaded template — ${title}`);
  };

  const handleGenerateAgent = () => {
    if (!builderText.trim()) {
      toast.error("Describe the agent you want to build first");
      return;
    }
    const newAgent: AgentItem = {
      id: `a_${Date.now()}`,
      name: builderText.trim().slice(0, 60),
      ic: Bot,
      tint: '#64748B',
      status: 'draft',
      type: 'Content',
      by: 'You',
      init: 'Y',
      when: 'just now',
      metric: '—',
    };
    setAgents((prev) => [newAgent, ...prev]);
    setBuilderText("");
    toast.success("Draft agent created — find it under Your agents");
  };

  const createFolder = () => {
    if (!newFolderName.trim()) return;
    setFolders((prev) => [...prev, newFolderName.trim()]);
    setNewFolderName("");
    setShowNewFolder(false);
    toast.success(`Folder "${newFolderName.trim()}" created`);
  };

  const updateAgentStatus = (id: string, status: AgentStatus) => {
    setAgents((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
    toast.success(`Agent ${status === 'running' ? 'resumed' : 'paused'}`);
  };

  const duplicateAgent = (agent: AgentItem) => {
    const copy: AgentItem = { ...agent, id: `a_${Date.now()}`, name: `${agent.name} (copy)`, status: 'draft', when: 'just now' };
    setAgents((prev) => [copy, ...prev]);
    toast.success("Agent duplicated");
  };

  const deleteAgent = (id: string) => {
    setAgents((prev) => prev.filter((a) => a.id !== id));
    toast.success("Agent deleted");
  };

  const filteredAgents = useMemo(() => {
    const q = search.trim().toLowerCase();
    return agents.filter((a) => {
      if (filterCreatedBy && a.by !== filterCreatedBy) return false;
      if (filterStatus && a.status !== filterStatus) return false;
      if (filterType && a.type !== filterType) return false;
      if (q && !a.name.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [agents, filterCreatedBy, filterStatus, filterType, search]);

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
            onClick={() => window.open('/#how-it-works', '_blank', 'noopener')}
          >
            <PlayCircle size={28} />
          </div>
          <div>
            <div className="text-foreground text-base font-bold">Citationly Agents take you from insight to execution</div>
            <div className="text-muted-foreground text-sm mt-1.5 max-w-xl leading-relaxed">
              Automate reporting, hunt opportunities, optimize content and defend citations — agents run on their own and ping your Mission Alerts when it matters.
            </div>
            <div className="flex gap-2.5 mt-3.5">
              <Button size="sm" onClick={() => window.open('/#how-it-works', '_blank', 'noopener')}>
                <Play size={16} className="mr-1.5" /> See how it works
              </Button>
              <Button size="sm" variant="outline" onClick={() => window.open('/resources', '_blank', 'noopener')}>
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
        { label: 'Active agents', icon: Bot, value: `${agents.length}`, meta: 'deployed in your org', accent: '#7C3AED' },
        { label: 'Running now', icon: Zap, value: `${agents.filter(a => a.status === 'running').length}`, meta: 'content producer, live', accent: '#6366F1' },
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
            value={builderText}
            onChange={(e) => setBuilderText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleGenerateAgent();
              }
            }}
            placeholder="Describe the agent you want — e.g. monitor Perplexity for lost snippets and draft replacement pages."
            className="w-full border-0 outline-none resize-none font-sans text-sm text-foreground bg-transparent leading-relaxed min-h-6 max-h-36 placeholder:text-slate-400"
          />
          <div className="flex items-center gap-2 mt-2.5">
            <button
              className="w-8.5 h-8.5 rounded-lg border border-border bg-card text-muted-foreground hover:bg-muted flex items-center justify-center transition-colors"
              onClick={() => toast.info('Attaching context coming soon')}
            >
              <Plus size={16} />
            </button>
            <span className="text-xs font-semibold text-muted-foreground border border-border rounded-lg px-2.5 py-1.5 cursor-pointer inline-flex items-center hover:border-primary hover:text-c-orange-dark">
              <Bot size={14} className="mr-1" /> Auto <ChevronDown size={14} className="ml-1" />
            </span>
            <button
              className="ml-auto w-9.5 h-9.5 rounded-xl border-0 bg-gradient-to-br from-primary to-c-orange-mid text-white flex items-center justify-center hover:scale-[1.08] transition-transform disabled:opacity-50"
              onClick={handleGenerateAgent}
              disabled={!builderText.trim()}
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
                onClick={() => applyTemplate(t.t, t.d)}
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
      <DropdownMenu>
        <DropdownMenuTrigger render={
          <Button variant="outline" size="sm" className="h-8 px-3 text-xs font-semibold text-muted-foreground">
            <User size={14} className="mr-1.5" /> {filterCreatedBy || "Created by"} <ChevronDown size={14} className="ml-1" />
          </Button>
        } />
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setFilterCreatedBy(null)}>All creators</DropdownMenuItem>
          {creators.map((c) => (
            <DropdownMenuItem key={c} onClick={() => setFilterCreatedBy(c)}>{c}</DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger render={
          <Button variant="outline" size="sm" className="h-8 px-3 text-xs font-semibold text-muted-foreground">
            <CircleDot size={14} className="mr-1.5" /> {filterStatus ? agStatusLabel(filterStatus) : "Status"} <ChevronDown size={14} className="ml-1" />
          </Button>
        } />
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setFilterStatus(null)}>All statuses</DropdownMenuItem>
          {STATUS_OPTIONS.map((s) => (
            <DropdownMenuItem key={s} onClick={() => setFilterStatus(s)}>{agStatusLabel(s)}</DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger render={
          <Button variant="outline" size="sm" className="h-8 px-3 text-xs font-semibold text-muted-foreground">
            <Hexagon size={14} className="mr-1.5" /> {filterType || "Type"} <ChevronDown size={14} className="ml-1" />
          </Button>
        } />
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setFilterType(null)}>All types</DropdownMenuItem>
          {TYPE_OPTIONS.map((t) => (
            <DropdownMenuItem key={t} onClick={() => setFilterType(t)}>{t}</DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {folders.map((f) => (
        <Badge key={f} variant="secondary" className="text-xs gap-1.5">
          {f}
          <button onClick={() => setFolders((prev) => prev.filter((x) => x !== f))}><X size={12} /></button>
        </Badge>
      ))}

      <div className="flex-1" />

      {showNewFolder ? (
        <div className="flex items-center gap-1.5">
          <Input
            autoFocus
            placeholder="Folder name"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && createFolder()}
            className="h-8 text-xs w-36"
          />
          <Button size="sm" className="h-8" onClick={createFolder}>Add</Button>
          <Button size="sm" variant="ghost" className="h-8" onClick={() => { setShowNewFolder(false); setNewFolderName(""); }}><X size={14} /></Button>
        </div>
      ) : (
        <Button variant="outline" size="sm" onClick={() => setShowNewFolder(true)}>
          <FolderPlus size={16} className="mr-1" /> New folder
        </Button>
      )}
      <div className="flex items-center gap-2 border border-border rounded-lg px-3 py-1.5 min-w-[200px] bg-card">
        <Search size={16} className="text-slate-400" />
        <Input
          placeholder="Search agents…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border-0 h-auto p-0 shadow-none focus-visible:ring-0 text-sm"
        />
      </div>
    </div>
  );

  const renderAgentsTable = (list: AgentItem[], title: string) => (
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
            {list.length === 0 && (
              <div className="px-4 py-10 text-center text-sm text-muted-foreground">No agents match these filters.</div>
            )}
            {list.map((a) => {
              const Icon = a.ic;
              return (
                <div
                  key={a.id}
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
                  <DropdownMenu>
                    <DropdownMenuTrigger render={
                      <button
                        className="w-7.5 h-7.5 rounded-lg border-0 bg-transparent text-slate-400 hover:bg-muted hover:text-foreground flex items-center justify-center transition-colors"
                        onClick={(e: React.MouseEvent) => e.stopPropagation()}
                      >
                        <MoreVertical size={18} />
                      </button>
                    } />
                    <DropdownMenuContent onClick={(e) => e.stopPropagation()}>
                      {a.status === 'running' ? (
                        <DropdownMenuItem onClick={() => updateAgentStatus(a.id, 'draft')}><Pause size={14} className="mr-2" /> Pause</DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem onClick={() => updateAgentStatus(a.id, 'running')}><Play size={14} className="mr-2" /> Resume</DropdownMenuItem>
                      )}
                      <DropdownMenuItem onClick={() => duplicateAgent(a)}><DuplicateIcon size={14} className="mr-2" /> Duplicate</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => deleteAgent(a.id)} className="text-destructive"><Trash2 size={14} className="mr-2" /> Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
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
        <Button onClick={focusBuilder}>
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
            <Badge variant="secondary" className="text-[11px]">{agents.length}</Badge>
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
          {renderAgentsTable(agents, 'Your agents')}
        </div>
      )}

      {activeTab === 'all' && (
        <div className="space-y-8">
          {renderStrip()}
          {renderFilterBar()}
          {renderAgentsTable(filteredAgents, '')}
        </div>
      )}

      {activeTab === 'templates' && renderTemplates(AG_TEMPLATES.length, true)}

      {activeTab === 'scheduled' && (
        renderAgentsTable(agents.filter(a => a.status === 'scheduled' || a.status === 'running'), 'Scheduled & running')
      )}
    </div>
  );
}
