"use client";

import React, { useEffect, useMemo, useState, useCallback, useRef } from "react";
import Link from "next/link";
import {
  Compass,
  Eye,
  MessageSquare,
  GitBranch,
  Layers,
  Globe,
  Users,
  Smile,
  Quote,
  Lock,
  Sparkles,
  ChevronDown,
  ChevronRight,
  ShieldAlert,
  Plus,
  Loader2,
  X,
  History as HistoryIcon,
  Upload,
  Download,
  Wand2,
  ArrowUpRight,
  Search,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { toast } from "sonner";
import { useOrganizationStore } from "@/lib/stores/organizationStore";
import {
  getVisibilitySummary,
  getTopics,
  getQuestions,
  createTopic,
  createQuestion,
  updateQuestion,
  streamAnalysis,
  getPlatformsSummary,
  getRegionsSummary,
  getPersonasSummary,
  getSentimentSummary,
  getCitationsSummary,
  getFanouts,
  generateFanouts,
  getFanoutsOverview,
  generateTopicPrompts,
  getQuestionHistory,
  PlanGateError,
  VisibilitySummaryResponse,
  PlatformsSummaryResponse,
  PlatformMatrix,
  GroupedSummaryResponse,
  SentimentSummaryResponse,
  CitationsSummaryResponse,
  PromptFanout,
  FanoutOverviewRow,
  ExecutionHistoryRow,
  RankBlock,
  TopicRanking,
  PromptTopic,
  QuestionWithLatest,
} from "@/lib/api/answerAtlasApi";

const RANGE_OPTIONS: { label: string; value: "7D" | "30D" | "90D" }[] = [
  { label: "Last 7 Days", value: "7D" },
  { label: "Last 30 Days", value: "30D" },
  { label: "Last 90 Days", value: "90D" },
];

const TABS = [
  { key: "visibility", label: "Visibility", icon: Eye },
  { key: "prompts", label: "Prompts", icon: MessageSquare },
  { key: "fanouts", label: "Query Fanouts", icon: GitBranch },
  { key: "platforms", label: "Platforms", icon: Layers },
  { key: "regions", label: "Regions", icon: Globe, lock: true },
  { key: "personas", label: "Personas", icon: Users, lock: true },
  { key: "sentiment", label: "Sentiment", icon: Smile },
  { key: "citations", label: "Citations", icon: Quote },
] as const;

type TabKey = (typeof TABS)[number]["key"];

function isPositive(delta: string) {
  return !delta.startsWith("-");
}

function buildHistoryPoints(history: { date: string; score: number }[]): { current: string; previous: string } {
  if (history.length <= 1) return { current: "0,80 600,80", previous: "0,80 600,80" };
  const mid = Math.ceil(history.length / 2);
  const previous = history.slice(0, mid);
  const current = history.slice(mid - 1); // overlap by one point so the lines visually connect
  const all = history.map((h) => h.score);
  const min = Math.min(...all);
  const max = Math.max(...all);
  const range = max - min || 1;
  const toPoints = (slice: { score: number }[], offset: number) =>
    slice
      .map((h, i) => {
        const x = ((offset + i) / (history.length - 1)) * 600;
        const y = 140 - ((h.score - min) / range) * 120;
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(" ");
  return { current: toPoints(current, mid - 1), previous: toPoints(previous, 0) };
}

// Deterministic color + initials for a competitor name, since arbitrary tracked
// competitors have no brand-kit logo in this app.
const LOGO_COLORS = ["#6366F1", "#0F172A", "#8B5CF6", "#F59E0B", "#EF4444", "#10B981", "#EC4899", "#14B8A6", "#0EA5E9", "#F97316"];
function logoColor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  return LOGO_COLORS[hash % LOGO_COLORS.length];
}
function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase() || "?";
}

function RankDelta({ value }: { value: number }) {
  if (value === 0) return <span className="text-[12px] font-mono text-slate-400">–</span>;
  const up = value > 0;
  return (
    <span className={`text-[12px] font-mono font-semibold ${up ? "text-emerald-600" : "text-red-600"}`}>
      {up ? "↑" : "↓"} {Math.abs(value)}
    </span>
  );
}

function ValueDelta({ delta }: { delta: string }) {
  if (delta === "+0" || delta === "0") return <span className="text-[13px] font-mono text-slate-400">–</span>;
  const positive = isPositive(delta);
  return <span className={`text-[13px] font-mono font-semibold ${positive ? "text-emerald-600" : "text-red-600"}`}>{delta}</span>;
}

// ---------------------------------------------------------------------------
// Saved views — real, localStorage-backed named presets (tab + range + topic
// filter). No backend needed for this; it's purely a client-side convenience.
// ---------------------------------------------------------------------------

interface SavedView {
  name: string;
  tab: TabKey;
  range: "7D" | "30D" | "90D";
}

const SAVED_VIEWS_KEY = "answerAtlas.savedViews";

function loadSavedViews(): SavedView[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(SAVED_VIEWS_KEY);
    return raw ? (JSON.parse(raw) as SavedView[]) : [];
  } catch {
    return [];
  }
}

function persistSavedViews(views: SavedView[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(SAVED_VIEWS_KEY, JSON.stringify(views));
}

export default function AnswerAtlasPage() {
  const { organizationId } = useOrganizationStore();
  const [tab, setTab] = useState<TabKey>("visibility");
  const [showDesigner, setShowDesigner] = useState(false);
  const [range, setRange] = useState<"7D" | "30D" | "90D">("30D");
  const [rangeOpen, setRangeOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [summary, setSummary] = useState<VisibilitySummaryResponse | null>(null);
  const [topics, setTopics] = useState<PromptTopic[]>([]);
  const [topicsLoaded, setTopicsLoaded] = useState(false);
  const [savedViews, setSavedViews] = useState<SavedView[]>([]);
  const [historyQuestionId, setHistoryQuestionId] = useState<string | null>(null);

  useEffect(() => {
    setSavedViews(loadSavedViews());
  }, []);

  const saveCurrentView = () => {
    const name = window.prompt("Name this view");
    if (!name || !name.trim()) return;
    const next = [...savedViews.filter((v) => v.name !== name.trim()), { name: name.trim(), tab, range }];
    setSavedViews(next);
    persistSavedViews(next);
    toast.success(`Saved view "${name.trim()}"`);
  };

  const applyView = (view: SavedView) => {
    setTab(view.tab);
    setRange(view.range);
    setShowDesigner(false);
  };

  const removeView = (name: string) => {
    const next = savedViews.filter((v) => v.name !== name);
    setSavedViews(next);
    persistSavedViews(next);
  };

  const rangeLabel = RANGE_OPTIONS.find((r) => r.value === range)?.label ?? "Last 30 Days";
  const totalPrompts = useMemo(
    () => summary?.topics.reduce((sum, t) => sum + t.promptCount, 0) ?? 0,
    [summary]
  );

  const fetchSummary = useCallback(async () => {
    if (!organizationId) return;
    setIsLoading(true);
    try {
      const res = await getVisibilitySummary(range);
      setSummary(res);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load Answer Atlas visibility data");
    } finally {
      setIsLoading(false);
    }
  }, [organizationId, range]);

  const fetchTopics = useCallback(async () => {
    if (!organizationId) return;
    try {
      const res = await getTopics();
      setTopics(res);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load prompt topics");
    } finally {
      setTopicsLoaded(true);
    }
  }, [organizationId]);

  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);

  useEffect(() => {
    if (tab === "prompts" || showDesigner) fetchTopics();
  }, [tab, showDesigner, fetchTopics]);

  if (showDesigner) {
    return (
      <PromptDesigner
        topics={topics}
        topicsLoaded={topicsLoaded}
        onBack={() => setShowDesigner(false)}
        onTopicsChanged={fetchTopics}
      />
    );
  }

  return (
    <div className="flex-1 p-6 sm:p-8 text-slate-900 bg-[#f8fafc] min-h-screen">
      {/* BANNER */}
      <div
        className="relative rounded-2xl px-6 py-5 mb-4 overflow-hidden text-white"
        style={{ background: "linear-gradient(120deg, #111633 0%, #1E1B4B 55%, #312E81 100%)" }}
      >
        <div
          className="absolute -right-16 -top-20 w-72 h-72 rounded-full opacity-35 pointer-events-none"
          style={{ background: "radial-gradient(circle, #A855F7 0%, transparent 62%)" }}
        />
        <div
          className="absolute inset-0 opacity-35 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,.14) 1px, transparent 1px)",
            backgroundSize: "18px 18px",
          }}
        />
        <div className="relative">
          <div className="flex items-center gap-2 text-[10.5px] font-bold tracking-[0.14em] text-indigo-200">
            <Compass className="w-3.5 h-3.5" /> ANSWER ATLAS
          </div>
          <h1 className="font-space-grotesk text-[23px] font-bold mt-1.5 mb-1">Every AI answer, mapped.</h1>
          <p className="text-[12.5px] text-indigo-100/80 max-w-xl leading-relaxed">
            Where {organizationId ? "your brand" : "Citationly"} appears across answer engines, which prompts drive
            it, and exactly where to gain ground next.
          </p>
          <div className="flex items-center gap-2.5 mt-3.5 flex-wrap">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-indigo-100 bg-white/[0.09] border border-white/15 rounded-full px-2.5 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              ON-DEMAND ANALYSIS
            </span>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-indigo-100 bg-white/[0.09] border border-white/15 rounded-full px-2.5 py-1">
              <MessageSquare className="w-3 h-3" /> {totalPrompts} prompts · {summary?.topics.length ?? 0} topics
            </span>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-indigo-100 bg-white/[0.09] border border-white/15 rounded-full px-2.5 py-1">
              <Layers className="w-3 h-3" /> 3 platforms
            </span>
            <div className="flex-1" />
            <Link
              href="/dashboard/assistant"
              className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-indigo-100 bg-white/[0.09] border border-white/15 rounded-full px-2.5 py-1 hover:bg-white/[0.15] transition-colors"
            >
              <Sparkles className="w-3 h-3" /> Assistant
            </Link>
          </div>
        </div>
      </div>

      {savedViews.length > 0 && (
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span className="text-[11.5px] text-slate-400 font-medium">Saved views:</span>
          {savedViews.map((v) => (
            <span
              key={v.name}
              className="inline-flex items-center gap-1.5 text-[12px] font-medium text-slate-700 bg-white border border-slate-200 rounded-full pl-2.5 pr-1.5 py-1"
            >
              <button onClick={() => applyView(v)} className="hover:text-indigo-600">
                {v.name}
              </button>
              <button onClick={() => removeView(v.name)} className="text-slate-300 hover:text-slate-600">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* TAB BAR */}
      <div className="flex items-center gap-1.5 p-1.5 mb-5 bg-slate-100 border border-slate-200 rounded-xl overflow-x-auto">
        {TABS.map((t) => {
          const Icon = t.icon;
          const active = tab === t.key;
          return (
            <button
              key={t.key}
              onClick={() => {
                setTab(t.key);
                setShowDesigner(false);
              }}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-[12.5px] font-medium rounded-lg whitespace-nowrap transition-colors ${
                active ? "bg-white text-indigo-700 shadow-sm ring-1 ring-slate-200" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <Icon className="w-[15px] h-[15px]" />
              {t.label}
              {"lock" in t && t.lock && <Lock className="w-3 h-3 text-slate-400 ml-0.5" />}
            </button>
          );
        })}
      </div>

      {tab === "visibility" && (
        <VisibilityTab
          isLoading={isLoading}
          summary={summary}
          range={range}
          rangeLabel={rangeLabel}
          rangeOpen={rangeOpen}
          setRangeOpen={setRangeOpen}
          setRange={setRange}
          onOpenDesigner={() => setShowDesigner(true)}
          onSaveView={saveCurrentView}
          onGoToPlatforms={() => setTab("platforms")}
        />
      )}
      {tab === "prompts" && (
        <PromptsTab
          topics={topics}
          topicsLoaded={topicsLoaded}
          onOpenDesigner={() => setShowDesigner(true)}
          onOpenHistory={setHistoryQuestionId}
          summary={summary}
          onAnalyzed={fetchSummary}
        />
      )}
      {tab === "fanouts" && <QueryFanoutsTab topics={topics} topicsLoaded={topicsLoaded} onOpenDesigner={() => setShowDesigner(true)} />}
      {tab === "platforms" && <PlatformsTab range={range} />}
      {tab === "sentiment" && <SentimentTab range={range} />}
      {tab === "citations" && <CitationsTab range={range} />}
      {tab === "regions" && <GroupedTab range={range} fetcher={getRegionsSummary} label="Region" />}
      {tab === "personas" && <GroupedTab range={range} fetcher={getPersonasSummary} label="Persona" />}

      {historyQuestionId && (
        <ExecutionHistoryDrawer questionId={historyQuestionId} onClose={() => setHistoryQuestionId(null)} />
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Shared bits
// ---------------------------------------------------------------------------

function MetricSectionHeader({
  title,
  subtitle,
  showPreviousPeriod,
  setShowPreviousPeriod,
  showCompetitors,
  setShowCompetitors,
}: {
  title: string;
  subtitle: string;
  showPreviousPeriod?: boolean;
  setShowPreviousPeriod?: (v: boolean) => void;
  showCompetitors?: boolean;
  setShowCompetitors?: (v: boolean) => void;
}) {
  const [open, setOpen] = useState(false);
  const interactive = setShowPreviousPeriod !== undefined || setShowCompetitors !== undefined;

  return (
    <div className="flex items-end justify-between gap-3 mt-7 mb-3">
      <div>
        <div className="font-space-grotesk text-[16.5px] font-bold text-slate-900">{title}</div>
        <div className="text-[12.5px] text-slate-500 mt-0.5">{subtitle}</div>
      </div>
      <div className="relative shrink-0">
        <button
          onClick={() => (interactive ? setOpen(!open) : toast.info("Nothing to configure for this chart"))}
          className="inline-flex items-center gap-1 text-[12.5px] font-medium text-slate-700 bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 hover:bg-slate-50"
        >
          Chart Config <ChevronDown className="w-3.5 h-3.5" />
        </button>
        {open && interactive && (
          <div className="absolute right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg p-3 z-30 min-w-[200px] space-y-2">
            {setShowPreviousPeriod && (
              <label className="flex items-center gap-2 text-[12.5px] text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showPreviousPeriod}
                  onChange={(e) => setShowPreviousPeriod(e.target.checked)}
                  className="accent-indigo-600"
                />
                Show previous period
              </label>
            )}
            {setShowCompetitors && (
              <label className="flex items-center gap-2 text-[12.5px] text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showCompetitors}
                  onChange={(e) => setShowCompetitors(e.target.checked)}
                  className="accent-indigo-600"
                />
                Compare competitors
              </label>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function RankPane({ title, block, unit }: { title: string; block: RankBlock; unit: string }) {
  return (
    <div className="p-5">
      <span className="text-[12px] text-slate-500 font-medium border-b border-dashed border-slate-300 pb-px">{title}</span>
      <div className="font-mono text-[24px] font-semibold mt-2 flex items-center gap-2">
        {block.position ? `#${block.position}` : "—"} <RankDelta value={block.positionDelta} />
      </div>
      <table className="w-full mt-3.5 text-[13px]">
        <thead>
          <tr className="text-[11px] text-slate-400 font-medium">
            <th className="text-left pb-1.5 w-6"></th>
            <th className="text-left pb-1.5">Asset</th>
            <th className="text-right pb-1.5">{unit === "%" ? title.replace(" Rank", "") : title.replace(" Rank", "")}</th>
          </tr>
        </thead>
        <tbody>
          {block.rows.slice(0, 6).map((r) => (
            <tr key={r.name} className={r.owned ? "bg-indigo-50/60" : ""}>
              <td className="text-[12px] text-slate-400 py-2">{r.rank}.</td>
              <td className="py-2">
                <span className="inline-flex items-center gap-2 font-medium">
                  <span
                    className="w-5 h-5 rounded-md inline-flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                    style={{ background: logoColor(r.name) }}
                  >
                    {initials(r.name)}
                  </span>
                  {r.name}
                  {r.owned && (
                    <span className="text-[9.5px] font-bold text-slate-500 bg-slate-100 border border-slate-200 rounded px-1.5 py-0.5">
                      Owned
                    </span>
                  )}
                </span>
              </td>
              <td className="py-2 text-right font-mono whitespace-nowrap">
                {r.value}
                {unit} <ValueDelta delta={r.delta} />
              </td>
            </tr>
          ))}
          {block.rows.length === 0 && (
            <tr>
              <td colSpan={3} className="text-center text-slate-400 text-[12.5px] py-6">
                No competitor data yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Visibility tab
// ---------------------------------------------------------------------------

function VisibilityTab({
  isLoading,
  summary,
  range,
  rangeLabel,
  rangeOpen,
  setRangeOpen,
  setRange,
  onOpenDesigner,
  onSaveView,
  onGoToPlatforms,
}: {
  isLoading: boolean;
  summary: VisibilitySummaryResponse | null;
  range: "7D" | "30D" | "90D";
  rangeLabel: string;
  rangeOpen: boolean;
  setRangeOpen: (v: boolean) => void;
  setRange: (v: "7D" | "30D" | "90D") => void;
  onOpenDesigner: () => void;
  onSaveView: () => void;
  onGoToPlatforms: () => void;
}) {
  const [topicFilter, setTopicFilter] = useState<string | null>(null);
  const [topicFilterOpen, setTopicFilterOpen] = useState(false);
  const [showPreviousPeriod, setShowPreviousPeriod] = useState(true);
  const [showCompetitors, setShowCompetitors] = useState(true);

  if (isLoading && !summary) {
    return (
      <div className="py-24 flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin" />
        <p className="text-sm text-slate-500">Loading real Answer Atlas data…</p>
      </div>
    );
  }

  if (summary && !summary.hasData) {
    return (
      <Card className="max-w-lg mx-auto p-10 text-center mt-8">
        <ShieldAlert className="w-10 h-10 text-amber-500 mx-auto mb-4" />
        <h2 className="text-lg font-bold mb-2">No prompt analyses yet</h2>
        <p className="text-sm text-slate-500 mb-6">
          Answer Atlas populates once you run your first prompt analysis. Open Prompt Designer, pick a prompt, and
          click Analyze to see it show up here with real per-engine results.
        </p>
        <Button onClick={onOpenDesigner} className="gap-2">
          <Sparkles className="w-4 h-4" /> Open Prompt Designer
        </Button>
      </Card>
    );
  }

  const history = buildHistoryPoints(summary?.scoreHistory ?? []);
  const visibleTopics = (summary?.topics ?? []).filter((t) => !topicFilter || t.topicId === topicFilter);

  return (
    <>
      {/* FILTER BAR */}
      <div className="flex items-center gap-2 mb-5 flex-wrap">
        <button
          onClick={onSaveView}
          className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-slate-500 bg-white border border-dashed border-slate-300 rounded-lg px-2.5 py-1.5"
        >
          <Plus className="w-3.5 h-3.5" /> Save view
        </button>
        <div className="relative">
          <button
            onClick={() => setRangeOpen(!rangeOpen)}
            className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-slate-700 bg-white border border-slate-200 rounded-lg px-2.5 py-1.5"
          >
            {rangeLabel} <span className="text-slate-400 font-normal">vs.</span> Prev. Period <ChevronDown className="w-3.5 h-3.5" />
          </button>
          {rangeOpen && (
            <div className="absolute left-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-30 min-w-[160px]">
              {RANGE_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => {
                    setRange(opt.value);
                    setRangeOpen(false);
                  }}
                  className="w-full text-left px-3 py-1.5 text-[13px] text-slate-600 hover:bg-slate-50"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="relative">
          <button
            onClick={() => setTopicFilterOpen(!topicFilterOpen)}
            className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-slate-700 bg-white border border-slate-200 rounded-lg px-2.5 py-1.5"
          >
            # {topicFilter ? summary?.topics.find((t) => t.topicId === topicFilter)?.topicName : "Topics"}
          </button>
          {topicFilterOpen && (
            <div className="absolute left-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-30 min-w-[220px] max-h-64 overflow-y-auto">
              <button
                onClick={() => {
                  setTopicFilter(null);
                  setTopicFilterOpen(false);
                }}
                className="w-full text-left px-3 py-1.5 text-[13px] text-slate-600 hover:bg-slate-50"
              >
                All topics
              </button>
              {(summary?.topics ?? []).map((t) => (
                <button
                  key={t.topicId}
                  onClick={() => {
                    setTopicFilter(t.topicId);
                    setTopicFilterOpen(false);
                  }}
                  className="w-full text-left px-3 py-1.5 text-[13px] text-slate-600 hover:bg-slate-50"
                >
                  {t.topicName}
                </button>
              ))}
            </div>
          )}
        </div>
        <button
          onClick={onGoToPlatforms}
          className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-slate-700 bg-white border border-slate-200 rounded-lg px-2.5 py-1.5"
        >
          <Layers className="w-3.5 h-3.5 text-slate-400" /> Platforms
        </button>
      </div>

      {/* VISIBILITY SCORE */}
      <MetricSectionHeader
        title="Visibility Score"
        subtitle="How often you appear in AI-generated answers"
        showPreviousPeriod={showPreviousPeriod}
        setShowPreviousPeriod={setShowPreviousPeriod}
        showCompetitors={showCompetitors}
        setShowCompetitors={setShowCompetitors}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 border border-slate-200 rounded-2xl bg-white overflow-hidden divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
        <div className="p-5">
          <span className="text-[12px] text-slate-500 font-medium border-b border-dashed border-slate-300 pb-px">
            Visibility Score
          </span>
          <div className="font-mono text-[26px] font-semibold mt-2 flex items-baseline gap-2.5">
            {summary?.compositeScore}% <ValueDelta delta={summary?.compositeDelta ?? "+0"} />
          </div>
          <div className="relative h-[200px] mt-3">
            <svg viewBox="0 0 600 160" preserveAspectRatio="none" className="w-full h-full">
              <line x1="0" y1="40" x2="600" y2="40" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="0" y1="80" x2="600" y2="80" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="0" y1="120" x2="600" y2="120" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4 4" />
              {showPreviousPeriod && (
                <polyline points={history.previous} fill="none" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="5 4" />
              )}
              <polyline points={history.current} fill="none" stroke="#3B82F6" strokeWidth="2.5" />
            </svg>
          </div>
          <div className="flex gap-3.5 mt-3 text-[12px] text-slate-500 flex-wrap">
            <span className="inline-flex items-center gap-1.5"><span className="w-3 h-0.5 bg-[#3B82F6] inline-block rounded-full" /> Current period</span>
            {showPreviousPeriod && (
              <span className="inline-flex items-center gap-1.5"><span className="w-3 h-0.5 bg-slate-300 inline-block rounded-full" style={{ borderTop: "1.5px dashed #CBD5E1" }} /> Previous period</span>
            )}
          </div>
        </div>
        {summary && showCompetitors && <RankPane title="Visibility Score Rank" block={summary.visibilityRank} unit="%" />}
      </div>

      {/* SHARE OF VOICE */}
      <MetricSectionHeader
        title="Share of Voice"
        subtitle="Your mentions in AI-generated answers relative to competitors"
        showCompetitors={showCompetitors}
        setShowCompetitors={setShowCompetitors}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 border border-slate-200 rounded-2xl bg-white overflow-hidden divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
        <div className="p-5">
          <span className="text-[12px] text-slate-500 font-medium border-b border-dashed border-slate-300 pb-px">
            Share of Voice
          </span>
          <div className="font-mono text-[26px] font-semibold mt-2 flex items-baseline gap-2.5">
            {summary?.shareOfVoice}% <ValueDelta delta={summary?.shareOfVoiceDelta ?? "+0"} />
          </div>
          {showCompetitors && (
            <div className="grid grid-cols-2 gap-3 mt-6">
              {(summary?.shareOfVoiceRank.rows ?? []).slice(0, 6).map((r) => (
                <div key={r.name} className="flex items-center gap-2 text-[12.5px]">
                  <span className="w-3 h-3 rounded-sm shrink-0" style={{ background: logoColor(r.name) }} />
                  <span className="truncate text-slate-700">{r.name}</span>
                  <span className="ml-auto font-mono text-slate-500 shrink-0">{r.value}%</span>
                </div>
              ))}
            </div>
          )}
        </div>
        {summary && showCompetitors && <RankPane title="Share of Voice Rank" block={summary.shareOfVoiceRank} unit="%" />}
      </div>

      {/* AVERAGE POSITION */}
      <MetricSectionHeader title="Average Position" subtitle="Your average rank in AI-generated answers" />
      <div className="border border-slate-200 rounded-2xl bg-white p-5">
        <span className="text-[12px] text-slate-500 font-medium border-b border-dashed border-slate-300 pb-px">
          Average Position
        </span>
        <div className="font-mono text-[26px] font-semibold mt-2 flex items-baseline gap-2.5">
          {summary?.averagePosition} <ValueDelta delta={summary?.averagePositionDelta ?? "+0"} />
        </div>
        <p className="text-[12px] text-slate-400 mt-2">
          Competitor position ranking isn&apos;t tracked yet — only your own average is shown.
        </p>
      </div>

      {/* TOPIC RANKINGS */}
      <MetricSectionHeader
        title="Visibility Rankings By Topic"
        subtitle="Your visibility rankings across topics"
      />
      <Card className="py-0 overflow-hidden">
        <div className="overflow-x-auto">
          <Table className="min-w-[720px]">
            <TableHeader>
              <TableRow className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                <TableHead className="p-4">Topic</TableHead>
                <TableHead className="p-4">Prompts</TableHead>
                <TableHead className="p-4">Score</TableHead>
                <TableHead className="p-4">Share of voice</TableHead>
                <TableHead className="p-4">Avg. position</TableHead>
                <TableHead className="p-4">Citation share</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visibleTopics.map((t) => (
                <TableRow key={t.topicId}>
                  <TableCell className="p-4 font-semibold text-[14px] text-slate-900">
                    {t.topicName}
                    <Badge className={`ml-2 text-[10px] ${t.rank === 1 ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}>
                      {t.rank === 1 ? "Leader" : "Needs work"}
                    </Badge>
                  </TableCell>
                  <TableCell className="p-4 font-mono text-[14px] text-slate-600">{t.promptCount}</TableCell>
                  <TableCell className="p-4 font-mono font-medium text-[14px] text-slate-700">{t.score}</TableCell>
                  <TableCell className="p-4 font-mono text-[14px] text-slate-600">{t.shareOfVoice}%</TableCell>
                  <TableCell className="p-4 font-mono text-[14px] text-slate-600">{t.averagePosition}</TableCell>
                  <TableCell className="p-4 font-mono text-[14px] text-slate-600">{t.citationShare}%</TableCell>
                </TableRow>
              ))}
              {visibleTopics.length === 0 && (
                <TableRow>
                  <TableCell className="p-8 text-center text-sm text-slate-500" colSpan={6}>
                    No topic data in this range yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </>
  );
}

// ---------------------------------------------------------------------------
// Prompts tab — topic rows expand to their questions; each question can be
// re-analyzed inline, or opened in the real execution-history drawer.
// ---------------------------------------------------------------------------

function PromptsTab({
  topics,
  topicsLoaded,
  onOpenDesigner,
  onOpenHistory,
  summary,
  onAnalyzed,
}: {
  topics: PromptTopic[];
  topicsLoaded: boolean;
  onOpenDesigner: () => void;
  onOpenHistory: (questionId: string) => void;
  summary: VisibilitySummaryResponse | null;
  onAnalyzed: () => Promise<void>;
}) {
  const [expandedTopicId, setExpandedTopicId] = useState<string | null>(null);
  const [questionsByTopic, setQuestionsByTopic] = useState<Record<string, QuestionWithLatest[]>>({});
  const [questionsLoaded, setQuestionsLoaded] = useState(false);
  const [analyzingId, setAnalyzingId] = useState<string | null>(null);
  const [progressByQuestion, setProgressByQuestion] = useState<Record<string, string>>({});
  const [promptFilter, setPromptFilter] = useState<"all" | "analyzed" | "pending">("all");
  const [search, setSearch] = useState("");
  const [columnsOpen, setColumnsOpen] = useState(false);
  const [visibleCols, setVisibleCols] = useState({ rank: true, score: true, sov: true, pos: true, citation: true });

  useEffect(() => {
    if (topics.length === 0) {
      setQuestionsLoaded(true);
      return;
    }
    setQuestionsLoaded(false);
    Promise.all(topics.map((t) => getQuestions(t.id).then((qs) => [t.id, qs] as const)))
      .then((entries) => {
        const map: Record<string, QuestionWithLatest[]> = {};
        entries.forEach(([id, qs]) => {
          map[id] = qs;
        });
        setQuestionsByTopic(map);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load prompts");
      })
      .finally(() => setQuestionsLoaded(true));
  }, [topics]);

  const reloadTopic = useCallback(async (topicId: string) => {
    try {
      const res = await getQuestions(topicId);
      setQuestionsByTopic((prev) => ({ ...prev, [topicId]: res }));
    } catch (err) {
      console.error(err);
      toast.error("Failed to refresh prompts for this topic");
    }
  }, []);

  const toggleTopic = (topicId: string) => {
    setExpandedTopicId((prev) => (prev === topicId ? null : topicId));
  };

  const analyze = async (topicId: string, questionId: string) => {
    setAnalyzingId(questionId);
    setProgressByQuestion((prev) => ({ ...prev, [questionId]: "Starting…" }));
    try {
      await streamAnalysis(questionId, (progress) => {
        if (progress.error) {
          toast.error(progress.error);
          return;
        }
        if (progress.step) {
          setProgressByQuestion((prev) => ({ ...prev, [questionId]: progress.step! }));
        }
      });
      toast.success("Analysis complete");
      // reloadTopic refreshes this one topic's per-question rows; the score/rank rollup shown
      // in "Visibility Rankings By Topic" comes from a separate summary fetch owned by the
      // parent, which otherwise stays stale until the date range changes or the page reloads.
      await Promise.all([reloadTopic(topicId), onAnalyzed()]);
    } catch (err) {
      console.error(err);
      toast.error("Analysis failed to run");
    } finally {
      setAnalyzingId(null);
      setProgressByQuestion((prev) => {
        const next = { ...prev };
        delete next[questionId];
        return next;
      });
    }
  };

  const allQuestions = useMemo(() => Object.values(questionsByTopic).flat(), [questionsByTopic]);
  const totalPrompts = allQuestions.length;
  const analyzedCount = allQuestions.filter((q) => q.latestAnalysis?.status === "Completed").length;
  const pendingCount = totalPrompts - analyzedCount;
  const ringPct = totalPrompts === 0 ? 0 : analyzedCount / totalPrompts;

  const summaryByTopicId = useMemo(() => {
    const map: Record<string, TopicRanking> = {};
    (summary?.topics ?? []).forEach((t) => {
      map[t.topicId] = t;
    });
    return map;
  }, [summary]);

  const filteredTopics = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return topics;
    return topics.filter(
      (t) => t.name.toLowerCase().includes(q) || (questionsByTopic[t.id] ?? []).some((qq) => qq.question.promptText.toLowerCase().includes(q))
    );
  }, [topics, search, questionsByTopic]);

  const questionMatchesFilter = (q: QuestionWithLatest) => {
    if (promptFilter === "analyzed") return q.latestAnalysis?.status === "Completed";
    if (promptFilter === "pending") return q.latestAnalysis?.status !== "Completed";
    return true;
  };

  const handleExport = () => {
    const rows = [
      ["Topic", "Visibility Rank", "Visibility Score", "Share of Voice", "Average Position", "Citation Share", "Prompts"],
      ...filteredTopics.map((t) => {
        const s = summaryByTopicId[t.id];
        return [t.name, s?.rank ? `#${s.rank}` : "–", s?.score ?? "–", s?.shareOfVoice ?? "–", s?.averagePosition ?? "–", s?.citationShare ?? "–", (questionsByTopic[t.id] ?? []).length];
      }),
    ];
    const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "prompt-analysis.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  if (topicsLoaded && topics.length === 0) {
    return (
      <Card className="max-w-lg mx-auto p-10 text-center mt-8">
        <ShieldAlert className="w-10 h-10 text-amber-500 mx-auto mb-4" />
        <h2 className="text-lg font-bold mb-2">No prompt topics yet</h2>
        <p className="text-sm text-slate-500 mb-6">
          Once your organization has generated AI search prompts, they&apos;ll show up here automatically, grouped by
          topic. You can also add prompts manually.
        </p>
        <Button onClick={onOpenDesigner} className="gap-2">
          <Sparkles className="w-4 h-4" /> Open Prompt Designer
        </Button>
      </Card>
    );
  }

  const ringR = 10;
  const ringC = 2 * Math.PI * ringR;

  return (
    <>
      {/* HEADER */}
      <div className="flex items-center justify-between gap-4 flex-wrap mb-4">
        <div>
          <div className="font-space-grotesk text-[16.5px] font-bold text-slate-900">Prompt Analysis</div>
          <div className="text-[12.5px] text-slate-500 mt-0.5">
            {totalPrompts} prompts across {topics.length} topics, analyzed on demand
          </div>
        </div>
        <div className="flex items-center gap-3">
          <svg viewBox="0 0 26 26" className="w-[26px] h-[26px]">
            <circle cx="13" cy="13" r={ringR} fill="none" stroke="#E2E8F0" strokeWidth="3.5" />
            <circle
              cx="13"
              cy="13"
              r={ringR}
              fill="none"
              stroke="#0F172A"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeDasharray={ringC}
              strokeDashoffset={ringC * (1 - ringPct)}
              transform="rotate(-90 13 13)"
            />
          </svg>
          <span className="text-[11.5px] text-slate-500">
            {analyzedCount} / {totalPrompts} analyzed
          </span>
          <Button size="sm" className="gap-1.5 bg-slate-900 hover:bg-slate-800" onClick={onOpenDesigner}>
            Modify Prompts <ArrowUpRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* CHIP FILTERS */}
      <div className="flex items-center justify-between gap-3 flex-wrap mb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPromptFilter(promptFilter === "analyzed" ? "all" : "analyzed")}
            className={`text-[12px] font-semibold rounded-lg border px-2.5 py-1.5 ${
              promptFilter === "analyzed" ? "border-slate-300 bg-slate-100 text-slate-900" : "border-slate-200 bg-white text-slate-500"
            }`}
          >
            Analyzed <b className="text-slate-900">{analyzedCount}</b>
          </button>
          <button
            onClick={() => setPromptFilter(promptFilter === "pending" ? "all" : "pending")}
            className={`text-[12px] font-semibold rounded-lg border px-2.5 py-1.5 ${
              promptFilter === "pending" ? "border-slate-300 bg-slate-100 text-slate-900" : "border-slate-200 bg-white text-slate-500"
            }`}
          >
            Pending <b className="text-slate-900">{pendingCount}</b>
          </button>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-slate-700 bg-white border border-slate-200 rounded-lg px-2.5 py-1.5">
            Group by: Topic
          </span>
          <div className="relative">
            <button
              onClick={() => setColumnsOpen(!columnsOpen)}
              className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-slate-700 bg-white border border-slate-200 rounded-lg px-2.5 py-1.5"
            >
              Customize Columns <ChevronDown className="w-3.5 h-3.5" />
            </button>
            {columnsOpen && (
              <div className="absolute right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg p-3 z-30 min-w-[180px] space-y-2">
                {(
                  [
                    ["rank", "Visibility Rank"],
                    ["score", "Visibility Score"],
                    ["sov", "Share of Voice"],
                    ["pos", "Average Position"],
                    ["citation", "Citation Share"],
                  ] as const
                ).map(([key, label]) => (
                  <label key={key} className="flex items-center gap-2 text-[12.5px] text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={visibleCols[key]}
                      onChange={(e) => setVisibleCols((prev) => ({ ...prev, [key]: e.target.checked }))}
                      className="accent-indigo-600"
                    />
                    {label}
                  </label>
                ))}
              </div>
            )}
          </div>
          <button onClick={handleExport} className="w-8 h-8 flex items-center justify-center bg-white border border-slate-200 rounded-lg text-slate-500 hover:bg-slate-50">
            <Download className="w-3.5 h-3.5" />
          </button>
          <div className="inline-flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 min-w-[180px]">
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Topics"
              className="text-[12.5px] outline-none flex-1 min-w-0"
            />
          </div>
        </div>
      </div>

      {/* TABLE */}
      <Card className="py-0 overflow-hidden">
        <div className="overflow-x-auto">
          <Table className="min-w-[860px]">
            <TableHeader>
              <TableRow className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                <TableHead className="p-4 w-[32%]">Topic</TableHead>
                {visibleCols.rank && <TableHead className="p-4">Visibility Rank</TableHead>}
                {visibleCols.score && <TableHead className="p-4">Visibility Score</TableHead>}
                {visibleCols.sov && <TableHead className="p-4">Share of Voice</TableHead>}
                {visibleCols.pos && <TableHead className="p-4">Average Position</TableHead>}
                {visibleCols.citation && <TableHead className="p-4">Citation Share</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTopics.map((topic) => {
                const questions = (questionsByTopic[topic.id] ?? []).filter(questionMatchesFilter);
                const expanded = expandedTopicId === topic.id;
                const s = summaryByTopicId[topic.id];
                const colSpan = 1 + Object.values(visibleCols).filter(Boolean).length;
                return (
                  <React.Fragment key={topic.id}>
                    <TableRow className="cursor-pointer" onClick={() => toggleTopic(topic.id)}>
                      <TableCell className="p-4 text-[14px] text-slate-900">
                        <div className="flex items-center gap-2 font-semibold">
                          {expanded ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
                          {topic.name}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5 pl-6">{(questionsByTopic[topic.id] ?? []).length} prompts</div>
                      </TableCell>
                      {visibleCols.rank && <TableCell className="p-4 font-mono text-[13.5px] text-slate-700">{s?.rank ? `#${s.rank}` : "–"}</TableCell>}
                      {visibleCols.score && <TableCell className="p-4 font-mono font-medium text-[13.5px] text-slate-700">{s ? `${s.score}%` : "–"}</TableCell>}
                      {visibleCols.sov && <TableCell className="p-4 font-mono text-[13.5px] text-slate-600">{s ? `${s.shareOfVoice}%` : "–"}</TableCell>}
                      {visibleCols.pos && <TableCell className="p-4 font-mono text-[13.5px] text-slate-600">{s ? s.averagePosition : "–"}</TableCell>}
                      {visibleCols.citation && <TableCell className="p-4 font-mono text-[13.5px] text-slate-600">{s ? `${s.citationShare}%` : "–"}</TableCell>}
                    </TableRow>
                    {expanded && (
                      <TableRow>
                        <TableCell colSpan={colSpan} className="p-0 bg-slate-50/60 border-t-0">
                          {!questionsLoaded ? (
                            <div className="p-6 text-sm text-slate-500 flex items-center gap-2">
                              <Loader2 className="w-4 h-4 animate-spin" /> Loading prompts…
                            </div>
                          ) : (
                            <div className="divide-y divide-slate-200">
                              {questions.map((q) => (
                                <div key={q.question.id} className="p-4 flex items-center justify-between gap-4 pl-10">
                                  <div className="min-w-0">
                                    <p className="text-[13.5px] text-slate-800 truncate">{q.question.promptText}</p>
                                    <p className="text-[11.5px] text-slate-400 mt-0.5">
                                      {q.latestAnalysis
                                        ? `Last run: ${new Date(q.latestAnalysis.runAt).toLocaleDateString()} · ${q.latestAnalysis.status}`
                                        : "Never analyzed"}
                                      {q.visibility ? ` · Score ${q.visibility.overallVisibilityScore}%` : ""}
                                    </p>
                                  </div>
                                  <div className="shrink-0 flex items-center gap-3">
                                    {progressByQuestion[q.question.id] && (
                                      <span className="text-[11.5px] text-indigo-600 font-medium">{progressByQuestion[q.question.id]}</span>
                                    )}
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        onOpenHistory(q.question.id);
                                      }}
                                      className="gap-1.5"
                                    >
                                      <HistoryIcon className="w-3.5 h-3.5" />
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="secondary"
                                      disabled={analyzingId === q.question.id}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        analyze(topic.id, q.question.id);
                                      }}
                                      className="gap-1.5"
                                    >
                                      {analyzingId === q.question.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                                      Analyze
                                    </Button>
                                  </div>
                                </div>
                              ))}
                              {questions.length === 0 && <div className="p-6 text-sm text-slate-500 text-center">No prompts match this filter.</div>}
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                );
              })}
              {filteredTopics.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="p-8 text-center text-sm text-slate-500">
                    No topics match your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </>
  );
}

// ---------------------------------------------------------------------------
// Enterprise gate — real plan-tier restriction (Organizations.PlanType), not
// cosmetic. "Request access" opens a real pre-filled email to sales.
// ---------------------------------------------------------------------------

function EnterpriseGate({ tabLabel, planType }: { tabLabel: string; planType: string | null }) {
  const subject = encodeURIComponent(`Enterprise access request — ${tabLabel}`);
  const body = encodeURIComponent(
    `Hi,\n\nWe'd like to enable the ${tabLabel} breakdown in Answer Atlas for our workspace (currently on the ${planType ?? "Trial"} plan).\n\nThanks!`
  );

  return (
    <div className="relative border border-slate-200 rounded-2xl overflow-hidden min-h-[420px] bg-white flex items-center justify-center">
      <div className="absolute inset-0 opacity-40 blur-sm pointer-events-none p-6">
        <div className="h-6 w-40 bg-slate-200 rounded mb-4" />
        <div className="grid grid-cols-3 gap-4">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="h-24 bg-slate-100 rounded-lg" />
          ))}
        </div>
      </div>
      <Card className="relative z-10 max-w-sm p-6 text-left shadow-xl">
        <div className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-slate-500">
          <Lock className="w-3.5 h-3.5" /> Enterprise
        </div>
        <h2 className="font-space-grotesk text-[19px] font-bold mt-3 mb-2">{tabLabel} breakdown</h2>
        <p className="text-[12.5px] text-slate-500 leading-relaxed mb-5">
          {tabLabel} segmentation is available on the Enterprise plan. You&apos;re currently on {planType ?? "Trial"}.
        </p>
        <a href={`mailto:sales@citationly.ai?subject=${subject}&body=${body}`}>
          <Button className="w-full">Request access</Button>
        </a>
      </Card>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Platforms tab — no new AI, pure aggregation over data already captured.
// ---------------------------------------------------------------------------

function PlatformsTab({ range }: { range: "7D" | "30D" | "90D" }) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<PlatformsSummaryResponse | null>(null);

  useEffect(() => {
    setIsLoading(true);
    getPlatformsSummary(range)
      .then(setData)
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load platform breakdown");
      })
      .finally(() => setIsLoading(false));
  }, [range]);

  if (isLoading && !data) {
    return (
      <div className="py-24 flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (data && !data.hasData) {
    return (
      <Card className="max-w-lg mx-auto p-10 text-center mt-8">
        <ShieldAlert className="w-10 h-10 text-amber-500 mx-auto mb-4" />
        <h2 className="text-lg font-bold mb-2">No platform data yet</h2>
        <p className="text-sm text-slate-500">Run a prompt analysis to see per-platform breakdown here.</p>
      </Card>
    );
  }

  return (
    <>
      <div className="mb-4">
        <div className="font-space-grotesk text-[16.5px] font-bold text-slate-900">Matrix View</div>
        <div className="text-[12.5px] text-slate-500 mt-0.5">Analyze your brand&apos;s presence across multiple AI platforms by different dimensions</div>
      </div>
      {data?.matrix && <PlatformMatrixTable matrix={data.matrix} />}

      <div className="mt-8 mb-3">
        <div className="font-space-grotesk text-[16.5px] font-bold text-slate-900">Platform breakdown</div>
        <div className="text-[12.5px] text-slate-500 mt-0.5">Your own visibility, share of voice, and citations per platform</div>
      </div>
      <Card className="py-0 overflow-hidden">
        <div className="overflow-x-auto">
          <Table className="min-w-[640px]">
            <TableHeader>
              <TableRow className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                <TableHead className="p-4">Platform</TableHead>
                <TableHead className="p-4">Score</TableHead>
                <TableHead className="p-4">Share of voice</TableHead>
                <TableHead className="p-4">Avg. position</TableHead>
                <TableHead className="p-4">Citation share</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(data?.platforms ?? []).map((p) => (
                <TableRow key={p.platform}>
                  <TableCell className="p-4 font-semibold text-[14px] text-slate-900 flex items-center gap-2">
                    <span
                      className="w-6 h-6 rounded-md inline-flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                      style={{ background: logoColor(p.platform) }}
                    >
                      {initials(p.platform)}
                    </span>
                    {p.platform}
                  </TableCell>
                  <TableCell className="p-4 font-mono font-medium text-[14px] text-slate-700">{p.score}</TableCell>
                  <TableCell className="p-4 font-mono text-[14px] text-slate-600">{p.shareOfVoice}%</TableCell>
                  <TableCell className="p-4 font-mono text-[14px] text-slate-600">{p.averagePosition}</TableCell>
                  <TableCell className="p-4 font-mono text-[14px] text-slate-600">{p.citationShare}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </>
  );
}

// Heat-map color interpolation matching the mockup's `heat()` function exactly: light blue
// (low) to dark navy (high), 45% treated as the practical ceiling for this metric.
function heatStyle(value: number): React.CSSProperties {
  const max = 45;
  const t = Math.max(0, Math.min(1, value / max));
  const light = [239, 246, 255];
  const dark = [11, 59, 140];
  const rgb = light.map((l, i) => Math.round(l + (dark[i] - l) * t));
  return { background: `rgb(${rgb.join(",")})`, color: t > 0.55 ? "#fff" : "#1E3A5F" };
}

function PlatformMatrixTable({ matrix }: { matrix: PlatformMatrix }) {
  return (
    <Card className="py-0 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-[11.5px] text-slate-400 font-medium bg-slate-50">
              <th className="text-left p-3.5 pl-4">Competitors</th>
              {matrix.platformNames.map((p) => (
                <th key={p} className="p-3.5 text-center whitespace-nowrap">
                  <span className="inline-flex items-center gap-1.5">
                    <span
                      className="w-[17px] h-[17px] rounded-md inline-flex items-center justify-center text-[8px] font-bold text-white shrink-0"
                      style={{ background: logoColor(p) }}
                    >
                      {p[0]}
                    </span>
                    {p}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {matrix.rows.map((r) => (
              <tr key={r.name} className="border-t border-slate-100">
                <td className="p-3.5 pl-4 text-[13px] font-medium whitespace-nowrap">
                  <span className="inline-flex items-center gap-2">
                    <span
                      className="w-5 h-5 rounded-md inline-flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                      style={{ background: logoColor(r.name) }}
                    >
                      {initials(r.name)}
                    </span>
                    {r.name}
                    {r.owned && (
                      <span className="text-[9.5px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-200 rounded px-1.5 py-0.5">
                        Selected
                      </span>
                    )}
                  </span>
                </td>
                {r.values.map((v, i) => (
                  <td key={i} className="p-0">
                    <div className="h-10 flex items-center justify-center font-mono text-[12.5px] font-semibold" style={heatStyle(v)}>
                      {v.toFixed(1)}%
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// Sentiment tab — real LLM-classified sentiment per response.
// ---------------------------------------------------------------------------

function SentimentTab({ range }: { range: "7D" | "30D" | "90D" }) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<SentimentSummaryResponse | null>(null);

  useEffect(() => {
    setIsLoading(true);
    getSentimentSummary(range)
      .then(setData)
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load sentiment data");
      })
      .finally(() => setIsLoading(false));
  }, [range]);

  if (isLoading && !data) {
    return (
      <div className="py-24 flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (data && !data.hasData) {
    return (
      <Card className="max-w-lg mx-auto p-10 text-center mt-8">
        <ShieldAlert className="w-10 h-10 text-amber-500 mx-auto mb-4" />
        <h2 className="text-lg font-bold mb-2">No sentiment data yet</h2>
        <p className="text-sm text-slate-500">
          Sentiment is classified by AI whenever an analysis finds your brand mentioned. Run a few analyses to
          populate this view.
        </p>
      </Card>
    );
  }

  const bars = [
    { label: "Positive", pct: data?.positivePct ?? 0, color: "bg-emerald-500" },
    { label: "Neutral", pct: data?.neutralPct ?? 0, color: "bg-slate-400" },
    { label: "Negative", pct: data?.negativePct ?? 0, color: "bg-red-500" },
  ];

  const sentimentChip: Record<string, string> = { pos: "bg-emerald-50 text-emerald-700", neu: "bg-slate-100 text-slate-600", neg: "bg-red-50 text-red-700" };
  const sentimentLabel: Record<string, string> = { pos: "Positive", neu: "Neutral", neg: "Negative" };

  return (
    <>
      <Card className="p-6 mb-6">
        <h3 className="text-[15px] font-bold mb-6 text-slate-800">Sentiment mix</h3>
        <div className="space-y-4">
          {bars.map((b) => (
            <div key={b.label} className="flex items-center gap-4">
              <span className="w-20 shrink-0 text-[13px] text-slate-600 font-medium">{b.label}</span>
              <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${b.color}`} style={{ width: `${b.pct}%` }} />
              </div>
              <span className="w-14 shrink-0 text-right font-mono text-[13px] text-slate-700 font-bold">{b.pct}%</span>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {(data?.quotes ?? []).map((q, i) => (
          <Card key={i} className="p-4">
            <Badge className={`text-[10px] mb-2.5 ${sentimentChip[q.sentiment]}`}>{sentimentLabel[q.sentiment]}</Badge>
            <p className="text-[13px] text-slate-700 leading-relaxed">&quot;{q.quote}&quot;</p>
            <p className="text-[11px] text-slate-400 mt-2.5">{q.platform} · {q.runAt}</p>
          </Card>
        ))}
        {(data?.quotes ?? []).length === 0 && (
          <p className="text-sm text-slate-500 col-span-full text-center py-8">No quotes captured yet.</p>
        )}
      </div>
    </>
  );
}

// ---------------------------------------------------------------------------
// Citations tab — real domains extracted from captured AI responses.
// ---------------------------------------------------------------------------

const CATEGORY_COLORS: Record<string, string> = { Owned: "#6366F1", Social: "#F59E0B", Institution: "#10B981", Other: "#94A3B8" };

function CitationsTab({ range }: { range: "7D" | "30D" | "90D" }) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<CitationsSummaryResponse | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [categoryOpen, setCategoryOpen] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getCitationsSummary(range)
      .then(setData)
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load citation data");
      })
      .finally(() => setIsLoading(false));
  }, [range]);

  if (isLoading && !data) {
    return (
      <div className="py-24 flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (data && !data.hasData) {
    return (
      <Card className="max-w-lg mx-auto p-10 text-center mt-8">
        <ShieldAlert className="w-10 h-10 text-amber-500 mx-auto mb-4" />
        <h2 className="text-lg font-bold mb-2">No citations found yet</h2>
        <p className="text-sm text-slate-500">
          Citations are real URLs extracted from captured AI responses. Run a few analyses to populate this view.
        </p>
      </Card>
    );
  }

  const allCategories = Array.from(new Set((data?.topDomains ?? []).map((d) => d.category)));
  const domains = (data?.topDomains ?? []).filter((d) => !categoryFilter || d.category === categoryFilter);
  const pages = (data?.topPages ?? []).filter((p) => !categoryFilter || p.category === categoryFilter);
  // Simple real bubble layout (circles sized by citation share, arranged on a circle) in place
  // of a physics-based force graph — honest simplification of the visualization technique only,
  // the underlying share data is real.
  const bubbleRadius = 140;
  const center = 170;

  return (
    <>
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <div className="relative">
          <button
            onClick={() => setCategoryOpen(!categoryOpen)}
            className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-slate-700 bg-white border border-slate-200 rounded-lg px-2.5 py-1.5"
          >
            {categoryFilter ? `Category: ${categoryFilter}` : "Citation Categories"} <ChevronDown className="w-3.5 h-3.5" />
          </button>
          {categoryOpen && (
            <div className="absolute left-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-30 min-w-[180px]">
              <button
                onClick={() => {
                  setCategoryFilter(null);
                  setCategoryOpen(false);
                }}
                className="w-full text-left px-3 py-1.5 text-[13px] text-slate-600 hover:bg-slate-50"
              >
                All categories
              </button>
              {allCategories.map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    setCategoryFilter(c);
                    setCategoryOpen(false);
                  }}
                  className="w-full text-left px-3 py-1.5 text-[13px] text-slate-600 hover:bg-slate-50"
                >
                  {c}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 border border-indigo-200 bg-indigo-50/60 rounded-xl px-4 py-3 mb-6">
        <Quote className="w-4 h-4 text-indigo-600 shrink-0" />
        <span className="text-[12.5px] text-slate-700 flex-1">
          Per-model citation records, timelines and exports live in the full <b>Citation intelligence</b> module.
        </span>
        <Link href="/dashboard/citation-intelligence" className="text-[12.5px] font-semibold text-indigo-600 hover:text-indigo-700 whitespace-nowrap">
          Open Citation intelligence →
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card className="p-6">
          <h3 className="text-[15px] font-bold mb-4 text-slate-800">Top cited domains</h3>
          <div className="space-y-2.5">
            {domains.map((d) => (
              <div key={d.domain} className="flex items-center gap-3 text-[13px]">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: CATEGORY_COLORS[d.category] ?? "#94A3B8" }} />
                <span className="text-slate-700 truncate flex-1">{d.domain}</span>
                <span className="font-mono text-slate-500 shrink-0">{d.share}%</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-[15px] font-bold mb-4 text-slate-800">Citation categories</h3>
          <div className="flex h-6 rounded-lg overflow-hidden mb-4">
            {(data?.categories ?? []).map((c) => (
              <div
                key={c.category}
                style={{ width: `${c.share}%`, background: CATEGORY_COLORS[c.category] ?? "#94A3B8" }}
                title={`${c.category}: ${c.share}%`}
              />
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            {(data?.categories ?? []).map((c) => (
              <span key={c.category} className="inline-flex items-center gap-1.5 text-[12px] text-slate-600">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: CATEGORY_COLORS[c.category] ?? "#94A3B8" }} />
                {c.category} ({c.share}%)
              </span>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-6 mb-6">
        <h3 className="text-[15px] font-bold mb-4 text-slate-800">Citation relationships</h3>
        <div className="relative h-[360px] flex items-center justify-center">
          <svg viewBox="0 0 340 340" className="w-full h-full max-w-[360px]">
            {domains.map((d, i) => {
              const angle = (i / Math.max(domains.length, 1)) * Math.PI * 2;
              const x = center + Math.cos(angle) * bubbleRadius;
              const y = center + Math.sin(angle) * bubbleRadius;
              return <line key={`l-${d.domain}`} x1={center} y1={center} x2={x} y2={y} stroke="#E2E8F0" strokeWidth="1.5" />;
            })}
            <circle cx={center} cy={center} r={22} fill="#6366F1" />
            <text x={center} y={center + 4} textAnchor="middle" fontSize="9" fill="#fff" fontWeight="700">
              You
            </text>
            {domains.map((d, i) => {
              const angle = (i / Math.max(domains.length, 1)) * Math.PI * 2;
              const x = center + Math.cos(angle) * bubbleRadius;
              const y = center + Math.sin(angle) * bubbleRadius;
              const r = 10 + d.share * 0.8;
              return (
                <g key={d.domain}>
                  <circle cx={x} cy={y} r={r} fill={CATEGORY_COLORS[d.category] ?? "#94A3B8"} opacity={0.85} />
                  <title>{`${d.domain}: ${d.share}%`}</title>
                </g>
              );
            })}
          </svg>
        </div>
      </Card>

      <Card className="py-0 overflow-hidden">
        <div className="overflow-x-auto">
          <Table className="min-w-[640px]">
            <TableHeader>
              <TableRow className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                <TableHead className="p-4">Page</TableHead>
                <TableHead className="p-4">Category</TableHead>
                <TableHead className="p-4">First seen</TableHead>
                <TableHead className="p-4">Share</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pages.map((p) => (
                <TableRow key={p.url}>
                  <TableCell className="p-4 text-[13.5px] text-slate-800 max-w-[360px] truncate">{p.url}</TableCell>
                  <TableCell className="p-4 text-[13px] text-slate-600">{p.category}</TableCell>
                  <TableCell className="p-4 font-mono text-[13px] text-slate-500">{p.firstSeen}</TableCell>
                  <TableCell className="p-4 font-mono text-[13px] text-slate-600">{p.share}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </>
  );
}

// ---------------------------------------------------------------------------
// Regions / Personas tabs — share the same rollup shape, gated by real
// Organizations.PlanType (Enterprise only).
// ---------------------------------------------------------------------------

function GroupedTab({
  range,
  fetcher,
  label,
}: {
  range: "7D" | "30D" | "90D";
  fetcher: (range: "7D" | "30D" | "90D") => Promise<GroupedSummaryResponse>;
  label: string;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<GroupedSummaryResponse | null>(null);
  const [gateError, setGateError] = useState<PlanGateError | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setGateError(null);
    fetcher(range)
      .then(setData)
      .catch((err) => {
        if (err instanceof PlanGateError) {
          setGateError(err);
        } else {
          console.error(err);
          toast.error(`Failed to load ${label.toLowerCase()} breakdown`);
        }
      })
      .finally(() => setIsLoading(false));
  }, [range, fetcher, label]);

  if (isLoading && !data && !gateError) {
    return (
      <div className="py-24 flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (gateError) {
    return <EnterpriseGate tabLabel={label + "s"} planType={gateError.planType} />;
  }

  if (data && !data.hasData) {
    return (
      <Card className="max-w-lg mx-auto p-10 text-center mt-8">
        <ShieldAlert className="w-10 h-10 text-amber-500 mx-auto mb-4" />
        <h2 className="text-lg font-bold mb-2">No {label.toLowerCase()} data yet</h2>
        <p className="text-sm text-slate-500">
          Assign a {label.toLowerCase()} to a prompt in Prompt Designer and run an analysis to populate this view.
        </p>
      </Card>
    );
  }

  return (
    <Card className="py-0 overflow-hidden">
      <div className="overflow-x-auto">
        <Table className="min-w-[640px]">
          <TableHeader>
            <TableRow className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              <TableHead className="p-4">{label}</TableHead>
              <TableHead className="p-4">Prompts</TableHead>
              <TableHead className="p-4">Score</TableHead>
              <TableHead className="p-4">Share of voice</TableHead>
              <TableHead className="p-4">Avg. position</TableHead>
              <TableHead className="p-4">Citations</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(data?.groups ?? []).map((g) => (
              <TableRow key={g.name}>
                <TableCell className="p-4 font-semibold text-[14px] text-slate-900">{g.name}</TableCell>
                <TableCell className="p-4 font-mono text-[14px] text-slate-600">{g.promptCount}</TableCell>
                <TableCell className="p-4 font-mono font-medium text-[14px] text-slate-700">{g.score}</TableCell>
                <TableCell className="p-4 font-mono text-[14px] text-slate-600">{g.shareOfVoice}%</TableCell>
                <TableCell className="p-4 font-mono text-[14px] text-slate-600">{g.averagePosition}</TableCell>
                <TableCell className="p-4 font-mono text-[14px] text-slate-600">{g.citationCount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// Query Fanouts tab — real LLM-generated sub-query variations per prompt.
// ---------------------------------------------------------------------------

function QueryFanoutsTab({
  topics,
  topicsLoaded,
  onOpenDesigner,
}: {
  topics: PromptTopic[];
  topicsLoaded: boolean;
  onOpenDesigner: () => void;
}) {
  const [allQuestions, setAllQuestions] = useState<QuestionWithLatest[]>([]);
  const [overview, setOverview] = useState<FanoutOverviewRow[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [fanoutsByQuestion, setFanoutsByQuestion] = useState<Record<string, PromptFanout[]>>({});
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(null);
  const [generatingId, setGeneratingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [bannerDismissed, setBannerDismissed] = useState(false);

  const loadOverview = useCallback(async () => {
    try {
      const res = await getFanoutsOverview();
      setOverview(res.prompts);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load query fanout overview");
    }
  }, []);

  useEffect(() => {
    if (topics.length === 0) {
      setLoaded(true);
      return;
    }
    Promise.all([Promise.all(topics.map((t) => getQuestions(t.id))), getFanoutsOverview()])
      .then(([lists, res]) => {
        setAllQuestions(lists.flat());
        setOverview(res.prompts);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load prompts");
      })
      .finally(() => setLoaded(true));
  }, [topics]);

  const overviewByQuestionId = useMemo(() => {
    const map: Record<string, FanoutOverviewRow> = {};
    overview.forEach((o) => {
      map[o.questionId] = o;
    });
    return map;
  }, [overview]);

  const rows = useMemo(
    () =>
      allQuestions.map((q) => ({
        questionId: q.question.id,
        promptText: q.question.promptText,
        fanoutCount: overviewByQuestionId[q.question.id]?.fanoutCount ?? 0,
        avgQueriesPerExecution: overviewByQuestionId[q.question.id]?.avgQueriesPerExecution ?? 0,
      })),
    [allQuestions, overviewByQuestionId]
  );

  const filteredRows = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((r) => r.promptText.toLowerCase().includes(q));
  }, [rows, search]);

  const toggleQuestion = async (questionId: string) => {
    const next = expandedQuestionId === questionId ? null : questionId;
    setExpandedQuestionId(next);
    if (next && !fanoutsByQuestion[next]) {
      try {
        const res = await getFanouts(next);
        setFanoutsByQuestion((prev) => ({ ...prev, [next]: res }));
      } catch (err) {
        console.error(err);
        toast.error("Failed to load fanouts");
      }
    }
  };

  const generate = async (questionId: string) => {
    setGeneratingId(questionId);
    try {
      const res = await generateFanouts(questionId);
      setFanoutsByQuestion((prev) => ({ ...prev, [questionId]: res }));
      setExpandedQuestionId(questionId);
      toast.success(`Generated ${res.length} fanout queries`);
      await loadOverview();
    } catch (err) {
      console.error(err);
      toast.error("Fanout generation failed");
    } finally {
      setGeneratingId(null);
    }
  };

  const handleExport = () => {
    const csvRows = [
      ["Prompt", "Query Count", "Avg Queries per Execution"],
      ...filteredRows.map((r) => [r.promptText, r.fanoutCount, r.avgQueriesPerExecution]),
    ];
    const csv = csvRows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "query-fanouts.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  if (topicsLoaded && topics.length === 0) {
    return (
      <Card className="max-w-lg mx-auto p-10 text-center mt-8">
        <ShieldAlert className="w-10 h-10 text-amber-500 mx-auto mb-4" />
        <h2 className="text-lg font-bold mb-2">No prompts yet</h2>
        <Button onClick={onOpenDesigner} className="gap-2 mt-2">
          <Sparkles className="w-4 h-4" /> Open Prompt Designer
        </Button>
      </Card>
    );
  }

  return (
    <>
      {!bannerDismissed && (
        <div className="flex items-start gap-2.5 border border-slate-200 bg-slate-50 rounded-xl px-4 py-3.5 mb-5">
          <MessageSquare className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
          <div className="flex-1">
            <div className="text-[12.5px] font-semibold text-slate-800">Query fanout data is not guaranteed</div>
            <div className="text-[12px] text-slate-500 mt-0.5">
              Fanouts are generated on demand per prompt — coverage varies until you click Generate below.
            </div>
          </div>
          <button onClick={() => setBannerDismissed(true)} className="text-slate-300 hover:text-slate-600 shrink-0">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="flex items-center justify-between gap-4 flex-wrap mb-3">
        <div>
          <div className="font-space-grotesk text-[16.5px] font-bold text-slate-900">Query Fanouts by Prompt</div>
          <div className="text-[12.5px] text-slate-500 mt-0.5">Understand the queries generated for each prompt</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="inline-flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 min-w-[200px]">
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for a prompt"
              className="text-[12.5px] outline-none flex-1 min-w-0"
            />
          </div>
          <button onClick={handleExport} className="w-8 h-8 flex items-center justify-center bg-white border border-slate-200 rounded-lg text-slate-500 hover:bg-slate-50">
            <Download className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <Card className="py-0 overflow-hidden">
        <div className="overflow-x-auto">
          <Table className="min-w-[640px]">
            <TableHeader>
              <TableRow className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                <TableHead className="p-4 w-[62%]">Prompt</TableHead>
                <TableHead className="p-4">Query Count</TableHead>
                <TableHead className="p-4">Avg Queries per Execution</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!loaded ? (
                <TableRow>
                  <TableCell colSpan={3} className="p-8 text-center text-sm text-slate-500">
                    <Loader2 className="w-4 h-4 animate-spin inline mr-2" /> Loading…
                  </TableCell>
                </TableRow>
              ) : (
                filteredRows.map((r) => {
                  const expanded = expandedQuestionId === r.questionId;
                  const fanouts = fanoutsByQuestion[r.questionId] ?? [];
                  return (
                    <React.Fragment key={r.questionId}>
                      <TableRow className="cursor-pointer" onClick={() => toggleQuestion(r.questionId)}>
                        <TableCell className="p-4 text-[13.5px] text-slate-800">
                          <div className="flex items-center gap-2">
                            {expanded ? <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" /> : <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />}
                            <span className="truncate">{r.promptText}</span>
                          </div>
                          <div className="text-[11px] text-slate-400 mt-0.5 pl-6">{r.fanoutCount} query fanout variations</div>
                        </TableCell>
                        <TableCell className="p-4 font-mono text-[13.5px] text-slate-700">{r.fanoutCount}</TableCell>
                        <TableCell className="p-4 font-mono text-[13.5px] text-slate-600">{r.avgQueriesPerExecution}</TableCell>
                      </TableRow>
                      {expanded && (
                        <TableRow>
                          <TableCell colSpan={3} className="p-0 bg-slate-50/60 border-t-0">
                            <div className="divide-y divide-slate-200">
                              {fanouts.map((f) => (
                                <div key={f.id} className="px-4 py-2.5 pl-10 flex items-center gap-3 text-[12.5px] text-slate-700">
                                  <GitBranch className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                                  <span className="flex-1">{f.fanoutText}</span>
                                  <span className="text-[10.5px] font-semibold text-slate-500 bg-slate-100 rounded px-1.5 py-0.5 shrink-0">
                                    {f.engine}
                                  </span>
                                </div>
                              ))}
                              <div className="p-3.5 pl-10">
                                <Button
                                  size="sm"
                                  variant="secondary"
                                  disabled={generatingId === r.questionId}
                                  onClick={() => generate(r.questionId)}
                                  className="gap-1.5"
                                >
                                  {generatingId === r.questionId ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Wand2 className="w-3.5 h-3.5" />}
                                  {fanouts.length > 0 ? "Regenerate" : "Generate"}
                                </Button>
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  );
                })
              )}
              {loaded && filteredRows.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} className="p-8 text-center text-sm text-slate-500">
                    No prompts match your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </>
  );
}

// ---------------------------------------------------------------------------
// Execution history drawer — real per-run history for a single prompt.
// ---------------------------------------------------------------------------

function ExecutionHistoryDrawer({ questionId, onClose }: { questionId: string; onClose: () => void }) {
  const [isLoading, setIsLoading] = useState(true);
  const [history, setHistory] = useState<ExecutionHistoryRow[]>([]);

  useEffect(() => {
    setIsLoading(true);
    getQuestionHistory(questionId)
      .then(setHistory)
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load execution history");
      })
      .finally(() => setIsLoading(false));
  }, [questionId]);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl overflow-y-auto">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
          <h3 className="font-space-grotesk text-[16px] font-bold text-slate-900">Execution history</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-5">
          {isLoading ? (
            <div className="py-12 flex justify-center">
              <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />
            </div>
          ) : history.length === 0 ? (
            <p className="text-sm text-slate-500 text-center py-12">No runs yet for this prompt.</p>
          ) : (
            <div className="space-y-3">
              {history.map((h) => (
                <div key={h.analysisId} className="border border-slate-200 rounded-lg p-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-semibold text-slate-800">{new Date(h.runAt).toLocaleString()}</span>
                    <Badge
                      className={`text-[10px] ${
                        h.status === "Completed"
                          ? "bg-emerald-50 text-emerald-700"
                          : h.status === "Failed"
                            ? "bg-red-50 text-red-700"
                            : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {h.status}
                    </Badge>
                  </div>
                  {h.overallVisibilityScore !== null && (
                    <div className="flex gap-4 mt-2 text-[12px] text-slate-600 font-mono">
                      <span>Score: {h.overallVisibilityScore}</span>
                      <span>SoV: {h.shareOfVoice}%</span>
                      <span>Pos: {h.averagePosition}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Prompt Designer — full-screen sub-view for managing the underlying prompt set.
// ---------------------------------------------------------------------------

function PromptDesigner({
  topics,
  topicsLoaded,
  onBack,
  onTopicsChanged,
}: {
  topics: PromptTopic[];
  topicsLoaded: boolean;
  onBack: () => void;
  onTopicsChanged: () => void;
}) {
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [questions, setQuestions] = useState<QuestionWithLatest[]>([]);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [newPromptText, setNewPromptText] = useState("");
  const [newTopicName, setNewTopicName] = useState("");
  const [savingText, setSavingText] = useState<Record<string, string>>({});
  const [generating, setGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!selectedTopicId && topics.length > 0) setSelectedTopicId(topics[0].id);
  }, [topics, selectedTopicId]);

  const loadQuestions = useCallback(async (topicId: string) => {
    setLoadingQuestions(true);
    try {
      const res = await getQuestions(topicId);
      setQuestions(res);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load prompts");
    } finally {
      setLoadingQuestions(false);
    }
  }, []);

  useEffect(() => {
    if (selectedTopicId) loadQuestions(selectedTopicId);
  }, [selectedTopicId, loadQuestions]);

  const handleAddTopic = async () => {
    if (!newTopicName.trim()) return;
    try {
      const topic = await createTopic(newTopicName.trim(), "");
      setNewTopicName("");
      onTopicsChanged();
      setSelectedTopicId(topic.id);
    } catch (err) {
      console.error(err);
      toast.error("Failed to create topic");
    }
  };

  const handleAddPrompt = async () => {
    if (!selectedTopicId || !newPromptText.trim()) return;
    try {
      await createQuestion(selectedTopicId, newPromptText.trim());
      setNewPromptText("");
      await loadQuestions(selectedTopicId);
    } catch (err) {
      console.error(err);
      toast.error("Failed to add prompt");
    }
  };

  const handleToggleActive = async (questionId: string, isActive: boolean) => {
    try {
      await updateQuestion(questionId, { isActive });
      if (selectedTopicId) await loadQuestions(selectedTopicId);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update prompt");
    }
  };

  const handleSaveText = async (questionId: string) => {
    const text = savingText[questionId];
    if (text === undefined) return;
    try {
      await updateQuestion(questionId, { promptText: text });
      setSavingText((prev) => {
        const next = { ...prev };
        delete next[questionId];
        return next;
      });
      if (selectedTopicId) await loadQuestions(selectedTopicId);
      toast.success("Prompt updated — applies from the next analysis run");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save prompt");
    }
  };

  const handleGenerate = async () => {
    if (!selectedTopicId) return;
    setGenerating(true);
    try {
      const created = await generateTopicPrompts(selectedTopicId, 8);
      toast.success(`Generated ${created.length} new prompts`);
      await loadQuestions(selectedTopicId);
    } catch (err) {
      console.error(err);
      toast.error("Prompt generation failed");
    } finally {
      setGenerating(false);
    }
  };

  const handleBulkUploadFile = async (file: File) => {
    if (!selectedTopicId) return;
    const text = await file.text();
    const lines = text
      .split(/\r?\n/)
      .map((l) => l.replace(/^,|,$/g, "").trim().replace(/^"|"$/g, ""))
      .filter((l) => l.length > 0);

    if (lines.length === 0) {
      toast.error("No prompt lines found in that file");
      return;
    }

    let created = 0;
    for (const line of lines) {
      try {
        await createQuestion(selectedTopicId, line);
        created++;
      } catch (err) {
        console.error(err);
      }
    }
    toast.success(`Added ${created} of ${lines.length} prompts`);
    await loadQuestions(selectedTopicId);
  };

  const handleExport = () => {
    const rows = [["Prompt", "Active", "Created"], ...questions.map((q) => [q.question.promptText, q.question.isActive ? "Yes" : "No", q.question.createdAt])];
    const csv = rows.map((r) => r.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `prompts-${selectedTopicId ?? "export"}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex-1 p-6 sm:p-8 text-slate-900 bg-[#f8fafc] min-h-screen">
      <button onClick={onBack} className="text-[13.5px] text-slate-500 hover:text-slate-800 mb-4 flex items-center gap-1">
        <ChevronRight className="w-4 h-4 rotate-180" /> Back to Answer Atlas
      </button>
      <div className="flex items-start justify-between gap-4 mb-1 flex-wrap">
        <h1 className="text-[24px] font-space-grotesk font-bold tracking-tight text-slate-900">Prompt Designer</h1>
        <div className="flex items-center gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,.txt"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleBulkUploadFile(file);
              e.target.value = "";
            }}
          />
          <Button variant="secondary" size="sm" className="gap-1.5" onClick={() => fileInputRef.current?.click()} disabled={!selectedTopicId}>
            <Upload className="w-3.5 h-3.5" /> Bulk upload
          </Button>
          <Button variant="secondary" size="sm" className="gap-1.5" onClick={handleExport} disabled={questions.length === 0}>
            <Download className="w-3.5 h-3.5" /> Export
          </Button>
          <Button size="sm" className="gap-1.5" onClick={handleGenerate} disabled={!selectedTopicId || generating}>
            {generating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Wand2 className="w-3.5 h-3.5" />}
            Generate
          </Button>
        </div>
      </div>
      <p className="text-[14px] text-slate-500 mb-6">
        We run these prompts across AI platforms to generate the insights you see across Answer Atlas.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
        {/* Topic rail */}
        <Card className="p-4 h-fit">
          <h3 className="text-[12px] font-semibold text-slate-400 uppercase tracking-wide mb-3">Topics</h3>
          <div className="flex flex-col gap-1 mb-4">
            {!topicsLoaded && <p className="text-sm text-slate-400 px-2 py-1.5">Loading…</p>}
            {topics.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedTopicId(t.id)}
                className={`text-left px-2.5 py-1.5 rounded-md text-[13.5px] font-medium transition-colors ${
                  selectedTopicId === t.id ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {t.name}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              value={newTopicName}
              onChange={(e) => setNewTopicName(e.target.value)}
              placeholder="New topic name"
              className="text-[13px]"
              onKeyDown={(e) => e.key === "Enter" && handleAddTopic()}
            />
            <Button size="sm" variant="secondary" onClick={handleAddTopic}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </Card>

        {/* Prompt table for selected topic */}
        <Card className="p-0 overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex gap-2">
            <Input
              value={newPromptText}
              onChange={(e) => setNewPromptText(e.target.value)}
              placeholder="Add a new prompt…"
              disabled={!selectedTopicId}
              onKeyDown={(e) => e.key === "Enter" && handleAddPrompt()}
            />
            <Button onClick={handleAddPrompt} disabled={!selectedTopicId || !newPromptText.trim()} className="gap-1.5 shrink-0">
              <Plus className="w-4 h-4" /> Add prompt
            </Button>
          </div>

          {loadingQuestions ? (
            <div className="p-8 text-center text-sm text-slate-500 flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" /> Loading prompts…
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {questions.map((q) => (
                <div key={q.question.id} className="p-4 flex items-start gap-4">
                  <Input
                    defaultValue={q.question.promptText}
                    onChange={(e) => setSavingText((prev) => ({ ...prev, [q.question.id]: e.target.value }))}
                    onBlur={() => savingText[q.question.id] !== undefined && handleSaveText(q.question.id)}
                    onKeyDown={(e) => e.key === "Enter" && handleSaveText(q.question.id)}
                    className={`flex-1 text-[13.5px] ${q.question.isActive ? "" : "opacity-50"}`}
                  />
                  <div className="flex items-center gap-2 shrink-0 pt-1.5">
                    <span className="text-[11.5px] text-slate-400 w-16 text-right">
                      {q.question.isActive ? "Active" : "Inactive"}
                    </span>
                    <Switch
                      checked={q.question.isActive}
                      onCheckedChange={(checked) => handleToggleActive(q.question.id, checked)}
                    />
                  </div>
                </div>
              ))}
              {questions.length === 0 && !loadingQuestions && (
                <div className="p-8 text-center text-sm text-slate-500">No prompts in this topic yet — add one above.</div>
              )}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
