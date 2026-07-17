"use client";

import React, { useMemo, useState } from 'react';
import {
  Flag, DollarSign, Gauge, CheckCircle2, Sparkles, ChevronRight,
  Zap, LayoutGrid, User, ChevronDown, Search, Target, RefreshCcw,
  Swords, Plus, MoreVertical, Pause, Trash2, Copy as DuplicateIcon
} from 'lucide-react';
import { toast } from 'sonner';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Impact = 'High' | 'Medium' | 'Low';
type Status = 'In progress' | 'Planning' | 'Done';

interface ProjectItem {
  name: string; status: Status; cat: string; impact: Impact;
  by: string; init: string; date: string; progress: number; tint: string;
}

// Dummy Data
const INITIAL_PROJECTS: ProjectItem[] = [
  {name:'Win back Perplexity sourcing queries', status:'In progress', cat:'GEO', impact:'High', by:'Sarah Chen', init:'SC', date:'Jun 18, 2026', progress:64, tint:'#6366F1'},
  {name:'FAQ schema rollout — top 20 pages', status:'In progress', cat:'Content', impact:'Medium', by:'Sudarshan Patil', init:'SP', date:'Jun 12, 2026', progress:40, tint:'#2563EB'},
  {name:'Gemini citation recovery', status:'Planning', cat:'Citations', impact:'High', by:'Sarah Chen', init:'SC', date:'Jun 22, 2026', progress:15, tint:'#16A34A'},
  {name:'Brand entity cleanup', status:'Done', cat:'Authority', impact:'Low', by:'Sudarshan Patil', init:'SP', date:'May 30, 2026', progress:100, tint:'#7C3AED'}
];

const INITIAL_SUGGESTED = [
  {t:'Close 3 GEO gaps on sourcing-intent queries', why:'Engines cite competitors on three high-intent queries you should own.', impact:'+$80k', tint:'#6366F1', ic: Target},
  {t:'Refresh 12 stale high-traffic pages', why:'Content older than 90 days is bleeding citations on time-sensitive prompts.', impact:'+6% citations', tint:'#2563EB', ic: RefreshCcw},
  {t:'Counter Competitor A listicle placements', why:'Competitor A picked up 4 third-party listicles now driving AI mentions.', impact:'Defend $40k', tint:'#DC2626', ic: Swords},
  {t:'Add FAQ schema to the pricing page', why:'Missing structured data means engines skip your pricing details entirely.', impact:'+4% citations', tint:'#16A34A', ic: Target},
  {t:'Consolidate 5 duplicate blog posts', why:'Overlapping content is splitting authority signals across near-identical pages.', impact:'+$15k', tint:'#7C3AED', ic: RefreshCcw},
];

const CATEGORY_OPTIONS = ['GEO', 'Content', 'Citations', 'Authority'];
const IMPACT_OPTIONS: Impact[] = ['High', 'Medium', 'Low'];

// Helper functions
const soft = (hex: string) => {
  const r = hex.replace(/^#/, '').match(/.{2}/g)?.map(h => parseInt(h, 16)) || [0,0,0];
  return `rgba(${r[0]},${r[1]},${r[2]},.13)`;
};
const prColor = (s: string) => ({'In progress':'var(--orange)','Planning':'#2563EB','Done':'var(--green)'})[s] || '#94A3B8';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<ProjectItem[]>(INITIAL_PROJECTS);
  const [suggested, setSuggested] = useState(INITIAL_SUGGESTED);
  const [showAllSuggested, setShowAllSuggested] = useState(false);
  const SUGGESTED_PREVIEW_COUNT = 3;
  const visibleSuggested = showAllSuggested ? suggested : suggested.slice(0, SUGGESTED_PREVIEW_COUNT);

  // Filters
  const [filterImpact, setFilterImpact] = useState<Impact | null>(null);
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [filterCreatedBy, setFilterCreatedBy] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  // New project dialog
  const [showNewProject, setShowNewProject] = useState(false);
  const [newName, setNewName] = useState("");
  const [newCategory, setNewCategory] = useState<string>(CATEGORY_OPTIONS[0]);
  const [newImpact, setNewImpact] = useState<Impact>('Medium');

  const creators = useMemo(() => Array.from(new Set(projects.map((p) => p.by))), [projects]);

  const active = projects.filter(p => p.status !== 'Done').length;
  const done = projects.filter(p => p.status === 'Done').length;

  const trackSuggested = (index: number) => {
    const s = suggested[index];
    if (!s) return;
    const newProject: ProjectItem = {
      name: s.t, status: 'Planning', cat: 'GEO', impact: 'High',
      by: 'Sarah Chen', init: 'SC', date: 'Just now', progress: 5, tint: s.tint
    };
    setProjects([newProject, ...projects]);
    setSuggested(suggested.filter((_, i) => i !== index));
    toast.success(`Tracking "${s.t}"`);
  };

  const createProject = () => {
    if (!newName.trim()) {
      toast.error("Give the project a name first");
      return;
    }
    const newProject: ProjectItem = {
      name: newName.trim(),
      status: 'Planning',
      cat: newCategory,
      impact: newImpact,
      by: 'You',
      init: 'Y',
      date: 'Just now',
      progress: 0,
      tint: '#6366F1',
    };
    setProjects([newProject, ...projects]);
    setNewName("");
    setNewCategory(CATEGORY_OPTIONS[0]);
    setNewImpact('Medium');
    setShowNewProject(false);
    toast.success(`Project "${newProject.name}" created`);
  };

  const impactPillClass = (impact: string) => {
    if (impact === 'High') return 'bg-red-50 text-red-600';
    if (impact === 'Medium') return 'bg-c-orange-soft text-c-orange-dark';
    return 'bg-muted text-muted-foreground';
  };

  const updateProjectStatus = (index: number, status: Status) => {
    setProjects((prev) => prev.map((p, i) => (i === index ? { ...p, status, progress: status === 'Done' ? 100 : p.progress } : p)));
    toast.success(status === 'Done' ? "Marked as done" : "Project paused");
  };

  const duplicateProject = (p: ProjectItem) => {
    setProjects((prev) => [{ ...p, name: `${p.name} (copy)`, status: 'Planning', progress: 0, date: 'Just now' }, ...prev]);
    toast.success("Project duplicated");
  };

  const deleteProject = (index: number) => {
    setProjects((prev) => prev.filter((_, i) => i !== index));
    toast.success("Project deleted");
  };

  const filteredProjects = useMemo(() => {
    const q = search.trim().toLowerCase();
    return projects.filter((p) => {
      if (filterImpact && p.impact !== filterImpact) return false;
      if (filterCategory && p.cat !== filterCategory) return false;
      if (filterCreatedBy && p.by !== filterCreatedBy) return false;
      if (q && !p.name.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [projects, filterImpact, filterCategory, filterCreatedBy, search]);

  return (
    <div className="p-6 md:p-8 max-w-[1400px] mx-auto space-y-8">
      {/* HEADER */}
      <div className="flex justify-between items-start gap-6 pb-8 border-b border-border/50">
        <div className="space-y-1.5">
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground text-sm">Turn visibility insights into tracked, accountable initiatives.</p>
        </div>
        <Button onClick={() => setShowNewProject(true)}>
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
          {suggested.length === 0 ? (
            <span className="text-xs text-slate-400">No more suggestions right now</span>
          ) : suggested.length > SUGGESTED_PREVIEW_COUNT && (
            <span
              className="text-xs font-semibold text-c-orange-dark cursor-pointer flex items-center hover:underline"
              onClick={() => setShowAllSuggested((v) => !v)}
            >
              {showAllSuggested ? "Show less" : "See all"} <ChevronRight size={14} className="ml-1" />
            </span>
          )}
        </div>

        {suggested.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {visibleSuggested.map((s) => {
              const i = suggested.indexOf(s);
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
        ) : (
          <div className="border border-dashed border-border rounded-xl p-4.5 text-center text-sm text-slate-400">
            You&apos;ve tracked every current suggestion — check back soon for more.
          </div>
        )}
      </section>

      {/* TRACKED PROJECTS */}
      <section className="space-y-4">
        <h2 className="text-sm font-bold">Tracked projects</h2>

        <div className="flex flex-wrap items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger render={
              <Button variant="outline" size="sm" className="h-8 px-3 text-xs font-semibold text-muted-foreground">
                <Zap size={14} className="mr-1.5" /> {filterImpact || "Impact"} <ChevronDown size={14} className="ml-1" />
              </Button>
            } />
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setFilterImpact(null)}>All impact levels</DropdownMenuItem>
              {IMPACT_OPTIONS.map((i) => (
                <DropdownMenuItem key={i} onClick={() => setFilterImpact(i)}>{i}</DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger render={
              <Button variant="outline" size="sm" className="h-8 px-3 text-xs font-semibold text-muted-foreground">
                <LayoutGrid size={14} className="mr-1.5" /> {filterCategory || "Category"} <ChevronDown size={14} className="ml-1" />
              </Button>
            } />
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setFilterCategory(null)}>All categories</DropdownMenuItem>
              {CATEGORY_OPTIONS.map((c) => (
                <DropdownMenuItem key={c} onClick={() => setFilterCategory(c)}>{c}</DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger render={
              <Button variant="outline" size="sm" className="h-8 px-3 text-xs font-semibold text-muted-foreground">
                <User size={14} className="mr-1.5" /> {filterCreatedBy || "Created by"} <ChevronDown size={14} className="ml-1" />
              </Button>
            } />
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setFilterCreatedBy(null)}>Everyone</DropdownMenuItem>
              {creators.map((c) => (
                <DropdownMenuItem key={c} onClick={() => setFilterCreatedBy(c)}>{c}</DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex-1" />
          <div className="flex items-center gap-2 border border-border rounded-lg px-3 py-1.5 min-w-[200px] bg-card">
            <Search size={16} className="text-slate-400" />
            <Input
              placeholder="Search projects…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-0 h-auto p-0 shadow-none focus-visible:ring-0 text-sm"
            />
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="hidden lg:grid grid-cols-[minmax(0,1fr)_92px_120px_165px_120px_44px] gap-3.5 px-4 py-2.5 text-[11px] uppercase tracking-wide text-slate-400 font-bold border-b border-border">
              <span>Project</span><span>Impact</span><span>Category</span><span>Created by</span><span>Date added</span><span></span>
            </div>
            <div className="divide-y divide-border/50">
              {filteredProjects.length === 0 && (
                <div className="px-4 py-10 text-center text-sm text-muted-foreground">No projects match these filters.</div>
              )}
              {filteredProjects.map((p) => {
                const i = projects.indexOf(p);
                return (
                <div
                  key={`${p.name}-${i}`}
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
                      {p.status !== 'Done' ? (
                        <DropdownMenuItem onClick={() => updateProjectStatus(i, 'Done')}><CheckCircle2 size={14} className="mr-2" /> Mark done</DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem onClick={() => updateProjectStatus(i, 'In progress')}><Pause size={14} className="mr-2" /> Reopen</DropdownMenuItem>
                      )}
                      <DropdownMenuItem onClick={() => duplicateProject(p)}><DuplicateIcon size={14} className="mr-2" /> Duplicate</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => deleteProject(i)} className="text-destructive"><Trash2 size={14} className="mr-2" /> Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              );})}
            </div>
          </CardContent>
        </Card>
      </section>

      <Dialog open={showNewProject} onOpenChange={setShowNewProject}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New project</DialogTitle>
            <DialogDescription>Track a new initiative alongside your other visibility work.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div>
              <Label>Project name</Label>
              <Input
                autoFocus
                className="mt-1.5"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g. Recover ChatGPT sourcing on pricing pages"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Category</Label>
                <DropdownMenu>
                  <DropdownMenuTrigger render={
                    <Button variant="outline" className="mt-1.5 w-full justify-between font-normal">
                      {newCategory} <ChevronDown size={14} />
                    </Button>
                  } />
                  <DropdownMenuContent>
                    {CATEGORY_OPTIONS.map((c) => (
                      <DropdownMenuItem key={c} onClick={() => setNewCategory(c)}>{c}</DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div>
                <Label>Impact</Label>
                <DropdownMenu>
                  <DropdownMenuTrigger render={
                    <Button variant="outline" className="mt-1.5 w-full justify-between font-normal">
                      {newImpact} <ChevronDown size={14} />
                    </Button>
                  } />
                  <DropdownMenuContent>
                    {IMPACT_OPTIONS.map((i) => (
                      <DropdownMenuItem key={i} onClick={() => setNewImpact(i)}>{i}</DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewProject(false)}>Cancel</Button>
            <Button onClick={createProject}>Create project</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
