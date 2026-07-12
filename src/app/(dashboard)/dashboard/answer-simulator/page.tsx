"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  simulateAnswer,
  compareContent,
  runBattle,
  SimulateAnswerResponse,
  CompareContentResponse,
  BattleResponse,
} from "@/lib/api/answerSimulatorApi";

/* ── constants ────────────────────────────────────────── */
const PERSONAS = [
  "a budget-conscious startup founder",
  "a non-technical small business owner",
  "an enterprise IT buyer",
  "a freelance marketer",
  "a developer evaluating tools",
];

const STAGES = [
  "just starting research",
  "comparing a shortlist",
  "ready to buy",
  "looking to switch providers",
];

const REGIONS = ["United States", "India", "United Kingdom", "Global"];

const STARTER_PROMPTS = [
  "What is the best project management tool for small teams?",
  "Which CRM has the best free plan?",
  "Top alternatives to Salesforce for startups",
  "Best AI writing tools in 2026",
];

const AS_STEPS = [
  "Analyzing query intent",
  "Retrieving brand context",
  "Simulating AI engine response",
  "Evaluating visibility",
  "Generating verdict",
];

const COMPETITORS = ["Profound", "BrightEdge", "Semrush"];

const SENTIMENT_LABEL: Record<string, string> = {
  pos: "Positive",
  neu: "Neutral",
  neg: "Negative",
};

const SOURCE_STYLE: Record<string, { bg: string; color: string }> = {
  you: { bg: "#dcfce7", color: "#16a34a" },
  comp: { bg: "#fef3c7", color: "#b45309" },
  third: { bg: "#f1f5f9", color: "#64748b" },
};

/* ── component ───────────────────────────────────────── */
export default function AnswerSimulatorPage() {
  // Config
  const [prompt, setPrompt] = useState("");
  const [persona, setPersona] = useState(PERSONAS[0]);
  const [stage, setStage] = useState(STAGES[1]);
  const [region, setRegion] = useState(REGIONS[0]);
  const [brand, setBrand] = useState("Acme Corp");

  // Main Simulation State
  const [isSimulating, setIsSimulating] = useState(false);
  const [result, setResult] = useState<SimulateAnswerResponse | null>(null);
  const [stepIndex, setStepIndex] = useState(0);

  // Compare State
  const [pageContent, setPageContent] = useState("");
  const [isComparing, setIsComparing] = useState(false);
  const [compareResult, setCompareResult] = useState<CompareContentResponse | null>(null);

  // Battle State
  const [competitor, setCompetitor] = useState("");
  const [isBattling, setIsBattling] = useState(false);
  const [battleData, setBattleData] = useState<BattleResponse | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup timers
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleGrow = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
    const el = e.target;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 120) + "px";
  };

  const handlePickStarter = (starter: string) => {
    setPrompt(starter);
    if (textareaRef.current) {
      textareaRef.current.value = starter;
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 120) + "px";
      textareaRef.current.focus();
    }
  };

  const handleRun = useCallback(async () => {
    if (!prompt.trim()) {
      toast.error("Type a question first");
      return;
    }

    setIsSimulating(true);
    setResult(null);
    setCompareResult(null);
    setBattleData(null);
    setCompetitor("");
    setStepIndex(0);

    let i = 0;
    timerRef.current = setInterval(() => {
      i++;
      if (i < AS_STEPS.length) setStepIndex(i);
    }, 1300);

    try {
      const data = await simulateAnswer({
        prompt: prompt.trim(),
        persona,
        stage,
        region,
        brand: brand.trim(),
      });
      setResult(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to simulate an answer — please try again");
    } finally {
      if (timerRef.current) clearInterval(timerRef.current);
      setIsSimulating(false);
      setTimeout(() => {
        const resEl = document.getElementById("asResults");
        if (resEl) resEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    }
  }, [prompt, persona, stage, region, brand]);

  const handleRunDiff = useCallback(async () => {
    if (!result) {
      toast.error("Run a simulation first");
      return;
    }
    if (!pageContent.trim()) {
      toast.error("Paste your page content first");
      return;
    }

    setIsComparing(true);
    setCompareResult(null);
    try {
      const data = await compareContent({
        prompt: prompt.trim(),
        brand: brand.trim(),
        pageContent: pageContent.trim(),
      });
      setCompareResult(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to compare — please try again");
    } finally {
      setIsComparing(false);
    }
  }, [result, pageContent, prompt, brand]);

  const handleRunBattle = useCallback(async (comp: string) => {
    setCompetitor(comp);
    if (!comp) {
      setBattleData(null);
      return;
    }

    setIsBattling(true);
    setBattleData(null);
    try {
      const data = await runBattle({
        prompt: prompt.trim(),
        brand: brand.trim(),
        competitor: comp,
      });
      setBattleData(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to run battle mode — please try again");
    } finally {
      setIsBattling(false);
    }
  }, [prompt, brand]);

  const hasResults = result !== null;
  const consistency = result?.consistencyOutOfFive ?? 0;
  const consistencyPct = (consistency / 5) * 100;
  const gaugeCircumference = 280;
  const gaugeOffset = gaugeCircumference * (1 - consistencyPct / 100);

  const verdictLabel = result
    ? result.sentiment === "pos" && result.mentioned
      ? "Highly Recommended"
      : result.mentioned
        ? "Mentioned, Mixed Standing"
        : "Not Surfacing"
    : "";

  return (
    <div className="p-6 md:p-8 max-w-[1400px] mx-auto">
      <div>
        {/* ── header ───────────────────────────────── */}
        <div className="flex items-start justify-between flex-wrap gap-3 mb-5">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Answer simulator</h1>
            <p className="text-c-muted text-sm mt-1.5">
              A sandbox to stress-test any question before you publish — control
              who’s asking, simulate the live answer, and see how to win it.
            </p>
          </div>
        </div>

        {/* ── console ──────────────────────────────── */}
        <Card className="mb-4">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 text-[11.5px] font-semibold tracking-wide text-slate-500 uppercase mb-3">
              <i className="ti ti-flask-2 text-[15px]" />
              Simulation console
            </div>

            <div className="flex items-end gap-2.5 bg-slate-50 border-[1.5px] border-slate-200 rounded-xl p-3.5 focus-within:border-primary focus-within:bg-white transition-colors">
              <textarea
                ref={textareaRef}
                id="asPrompt"
                rows={1}
                placeholder="Ask the question a buyer would type into AI…"
                value={prompt}
                onChange={handleGrow}
                className="flex-1 border-0 bg-transparent outline-none resize-none text-slate-800 text-[14.5px] font-sans leading-relaxed max-h-[120px] min-h-6 placeholder:text-slate-400"
              />
              <Button
                id="asRunBtn"
                onClick={handleRun}
                disabled={isSimulating}
                className="shrink-0 bg-gradient-to-br from-primary to-c-purple hover:shadow-[0_8px_22px_rgba(99,102,241,0.45)]"
                style={{ opacity: isSimulating ? 0.6 : 1 }}
              >
                <i className="ti ti-player-play" />
                Simulate
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-2.5 mt-3.5">
              <div>
                <label className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                  <i className="ti ti-user text-[13px]" />
                  Who’s asking
                </label>
                <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-lg px-3 focus-within:border-primary focus-within:bg-white transition-colors">
                  <select
                    value={persona}
                    onChange={(e) => setPersona(e.target.value)}
                    className="flex-1 border-0 bg-transparent outline-none text-slate-800 text-[13px] py-2.5 appearance-none cursor-pointer"
                  >
                    {PERSONAS.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                  <i className="ti ti-chevron-down text-slate-400 text-[15px] pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                  <i className="ti ti-stairs text-[13px]" />
                  Buying stage
                </label>
                <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-lg px-3 focus-within:border-primary focus-within:bg-white transition-colors">
                  <select
                    value={stage}
                    onChange={(e) => setStage(e.target.value)}
                    className="flex-1 border-0 bg-transparent outline-none text-slate-800 text-[13px] py-2.5 appearance-none cursor-pointer"
                  >
                    {STAGES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <i className="ti ti-chevron-down text-slate-400 text-[15px] pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                  <i className="ti ti-map-pin text-[13px]" />
                  Region
                </label>
                <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-lg px-3 focus-within:border-primary focus-within:bg-white transition-colors">
                  <select
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="flex-1 border-0 bg-transparent outline-none text-slate-800 text-[13px] py-2.5 appearance-none cursor-pointer"
                  >
                    {REGIONS.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                  <i className="ti ti-chevron-down text-slate-400 text-[15px] pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                  <i className="ti ti-building-store text-[13px]" />
                  Your brand
                </label>
                <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 focus-within:border-primary focus-within:bg-white transition-colors">
                  <i className="ti ti-tag text-slate-400 text-[15px]" />
                  <input
                    id="asBrand"
                    placeholder="Your brand name"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="border-0 bg-transparent outline-none text-slate-800 text-[13px] py-2.5 w-full placeholder:text-slate-400"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-[11.5px] text-slate-500 mt-3">
              <i className="ti ti-bolt text-primary text-sm" />
              Answers are generated live by AI for your exact scenario. Try a
              starter:
            </div>
            <div className="flex flex-wrap gap-2 mt-2.5">
              {STARTER_PROMPTS.map((starter, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-c-muted bg-white border border-c-line rounded-full px-3 py-1.5 cursor-pointer"
                  onClick={() => handlePickStarter(starter)}
                >
                  <i className="ti ti-sparkles text-primary text-sm" />
                  {starter}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* ── loading state ────────────────────────── */}
        {isSimulating && (
          <div className="flex flex-col items-center justify-center py-12.5 px-5 gap-3.5">
            <div className="w-10 h-10 border-[3px] border-c-line border-t-primary rounded-full animate-spin" />
            <p className="text-[13.5px] text-c-muted font-medium">Running your scenario through the AI…</p>
            <div className="text-xs text-c-orange-dark font-semibold">{AS_STEPS[stepIndex]}</div>
          </div>
        )}

        {/* ── results ──────────────────────────────── */}
        {hasResults && result && (
          <div id="asResults">
            <div className="flex flex-wrap gap-2 mb-4" id="asRecap">
              Scenario: <b>{persona}</b> · <b>{stage}</b> · <b>{region}</b>
            </div>

            {/* Visibility Consistency */}
            <Card className="mb-4">
              <CardContent className="p-5">
              <div className="flex items-center justify-between gap-3 mb-3.5">
                <div className="text-[15px] font-bold flex items-center gap-2">
                  <i className="ti ti-target-arrow text-primary text-lg" />
                  Visibility consistency
                </div>
                <span className="text-xs text-slate-400">
                  estimated from this run's real signal, not a literal re-query
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4.5 items-center mb-4">
                <div className="relative w-[170px] h-[170px] mx-auto">
                  <svg width="170" height="170" viewBox="0 0 170 170">
                    <path
                      d="M 25 130 A 65 65 0 1 1 145 130"
                      fill="none"
                      stroke="#f1f5f9"
                      strokeWidth="12"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 25 130 A 65 65 0 1 1 145 130"
                      fill="none"
                      stroke={consistency >= 4 ? "#10b981" : consistency >= 3 ? "#f59e0b" : "#ef4444"}
                      strokeWidth="12"
                      strokeLinecap="round"
                      strokeDasharray={gaugeCircumference}
                      strokeDashoffset={gaugeOffset}
                      style={{ transition: "stroke-dashoffset 1s ease-out" }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <b className="text-[38px] font-extrabold leading-none tracking-tight">{consistency}</b>
                    <span className="text-[11px] text-slate-400 font-semibold mt-1 tracking-wide">OF 5 RUNS</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="text-[13px] font-bold mb-1">What this means</div>
                  <p className="text-[13px] text-slate-600 leading-relaxed">
                    {result.summary || "No summary returned for this scenario."}
                  </p>
                  <div className="flex items-center gap-2 mt-1 text-[12.5px] font-semibold">
                    <span className="text-slate-500">Sentiment:</span>
                    <span
                      className={
                        result.sentiment === "pos"
                          ? "text-emerald-600"
                          : result.sentiment === "neg"
                            ? "text-red-500"
                            : "text-slate-500"
                      }
                    >
                      {SENTIMENT_LABEL[result.sentiment] ?? "Neutral"}
                    </span>
                  </div>
                </div>
              </div>
              </CardContent>
            </Card>

            {/* Live Answer */}
            <div className="grid grid-cols-1 lg:grid-cols-[1.55fr_1fr] gap-3.5 mb-4">
              <Card className="py-0 gap-0 overflow-hidden">
                <div className="flex items-center gap-2.5 px-4.5 py-3.5 border-b border-c-line bg-c-bg">
                  <div className="w-8.5 h-8.5 rounded-lg grid place-items-center text-white text-sm font-bold" style={{ background: "#10b981" }}>
                    A
                  </div>
                  <div>
                    <div className="text-sm font-bold">Live AI answer</div>
                    <div className="text-[11.5px] text-c-muted">for your scenario</div>
                  </div>
                </div>
                <div className="p-4.5 text-sm leading-relaxed text-[#23304D] whitespace-pre-wrap">
                  {result.answer}
                </div>
              </Card>

              <div>
                <Card className="mb-3.5">
                  <CardContent className="p-4.5">
                    <div className="flex items-center gap-1.5 text-[13px] font-bold mb-3 pb-3 border-b border-slate-100">
                      <i className="ti ti-gavel text-primary text-base" /> Verdict
                    </div>
                    <div className="text-sm text-slate-800 font-medium">
                      {verdictLabel}
                    </div>
                    <div className="text-[13px] text-slate-500 mt-1">
                      Position: {result.position} · Share of answer: {result.sharePct}%
                    </div>
                    {result.competitors.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-slate-100 space-y-1.5">
                        {result.competitors.map((c, i) => (
                          <div key={i} className="flex items-center justify-between text-[12.5px]">
                            <span className="text-slate-600">{c.name}</span>
                            <span className="font-semibold text-slate-700">{c.sharePct}%</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4.5">
                    <div className="flex items-center gap-1.5 text-[13px] font-bold mb-3">
                      <i className="ti ti-link text-primary text-base" /> Sources referenced
                    </div>
                    <div>
                      {result.sources.length === 0 ? (
                        <p className="text-[12.5px] text-slate-500">No specific sources were named in this answer.</p>
                      ) : (
                        result.sources.map((src, i) => {
                          const style = SOURCE_STYLE[src.type] ?? SOURCE_STYLE.third;
                          return (
                            <div
                              key={i}
                              className={`flex items-center justify-between py-1.5 text-[13px] ${i < result.sources.length - 1 ? "border-b border-slate-100" : ""}`}
                            >
                              <span className="text-slate-700">{src.name}</span>
                              <span
                                className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded"
                                style={{ background: style.bg, color: style.color }}
                              >
                                {src.type}
                              </span>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Compare Content */}
            <Card className="mb-4">
              <CardContent className="p-5">
              <div className="flex items-center justify-between gap-3 mb-3.5">
                <div className="text-[15px] font-bold flex items-center gap-2">
                  <i className="ti ti-git-compare text-primary text-lg" />
                  Win / lose diff
                </div>
                <span className="text-xs text-slate-400">
                  paste your page content to see if it changes the answer
                </span>
              </div>
              <textarea
                placeholder="Paste your page content or key claims here, then click Compare…"
                value={pageContent}
                onChange={(e) => setPageContent(e.target.value)}
                className="w-full border border-c-line bg-c-bg rounded-xl px-3.5 py-3 text-[13px] leading-relaxed resize-y min-h-[84px] outline-none text-c-ink font-sans mb-3"
              />
              <Button
                onClick={handleRunDiff}
                disabled={isComparing}
                className="mb-3.5"
                style={{ opacity: isComparing ? 0.6 : 1 }}
              >
                <i className="ti ti-git-compare" />
                Compare with vs without
              </Button>

              <div>
                {isComparing ? (
                  <div className="text-center text-c-muted text-[13px] leading-relaxed p-4.5">
                    <div className="w-6.5 h-6.5 border-[2.5px] border-c-line border-t-primary rounded-full animate-spin mx-auto mb-2.5" />
                    Simulating both answers…
                  </div>
                ) : compareResult ? (
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 text-sm leading-relaxed space-y-3">
                    <div>
                      <strong>Without your content:</strong> {compareResult.without}
                    </div>
                    <div>
                      <strong>With your content:</strong> {compareResult.with}
                    </div>
                    <div className="pt-2 border-t border-slate-200 text-[12.5px] text-slate-600">
                      {compareResult.verdict}
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-c-muted text-[13px] leading-relaxed p-4.5">
                    <i className="ti ti-git-compare text-3xl text-slate-400 block mb-2.5" />
                    Paste your content above to simulate the answer with and
                    without it.
                  </div>
                )}
              </div>
              </CardContent>
            </Card>

            {/* Battle Mode */}
            <Card>
              <CardContent className="p-5">
              <div className="flex items-center justify-between gap-3 mb-3.5">
                <div className="text-[15px] font-bold flex items-center gap-2">
                  <i className="ti ti-swords text-primary text-lg" />
                  Battle mode
                </div>
                <span className="text-xs text-slate-400">
                  simulate the same question framed to favor a rival
                </span>
              </div>
              <div className="flex items-center gap-3 flex-wrap mb-3.5">
                <span className="text-[12.5px] text-c-muted">
                  Pit your brand against:
                </span>
                <div className="flex items-center gap-2 bg-c-bg border border-c-line rounded-lg px-3">
                  <i className="ti ti-swords text-destructive text-base" />
                  <select
                    value={competitor}
                    onChange={(e) => handleRunBattle(e.target.value)}
                    className="border-0 bg-transparent outline-none text-[13px] text-c-ink py-2.5 cursor-pointer appearance-none"
                  >
                    <option value="">Choose a competitor…</option>
                    {COMPETITORS.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                {isBattling ? (
                  <div className="text-center text-c-muted text-[13px] leading-relaxed p-4.5">
                    <div className="w-6.5 h-6.5 border-[2.5px] border-c-line border-t-primary rounded-full animate-spin mx-auto mb-2.5" />
                    Simulating a {competitor}-framed answer…
                  </div>
                ) : battleData ? (
                  <div className="rounded-lg p-4 border border-slate-200 bg-slate-50 space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[12.5px] font-semibold">
                        <span>{brand || "You"}</span>
                        <span>{battleData.youPct}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
                        <div className="h-full rounded-full bg-primary" style={{ width: `${battleData.youPct}%` }} />
                      </div>
                      <div className="flex items-center justify-between text-[12.5px] font-semibold">
                        <span>{competitor}</span>
                        <span>{battleData.compPct}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
                        <div className="h-full rounded-full bg-destructive" style={{ width: `${battleData.compPct}%` }} />
                      </div>
                    </div>
                    <div className="pt-2 border-t border-slate-200 text-[13px] text-[#9f1239] flex items-start gap-2">
                      <i className="ti ti-alert-triangle mt-0.5 shrink-0" />
                      {battleData.note}
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-c-muted text-[13px] leading-relaxed p-4.5">
                    <i className="ti ti-swords text-3xl text-slate-400 block mb-2.5" />
                    Pick a competitor to see how the answer shifts when framed in
                    their favor.
                  </div>
                )}
              </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
