"use client";

import React, { useState, useCallback, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "@/lib/toast";
import {
  getContentDrafts,
  optimizeContent,
  updateContentDraft,
  ContentDraft,
  ContentOptimization,
  OptimizationRecommendation,
} from "@/lib/api/contentApi";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const CS_CARD = "border-border bg-card shadow-sm";
const CS_FIELD = "h-10 rounded-lg border-input text-foreground focus-visible:border-ring focus-visible:ring-ring/50";
const CS_SIDE = "rounded-lg border border-border bg-muted/30 p-4";

/* ── option data ─────────────────────────────────────── */
const OPT_GOALS = [
  "Improve SEO performance",
  "Increase AI visibility",
  "Boost readability",
  "Expand topical coverage",
] as const;

const OPT_AUDIENCES = [
  "SEO Managers",
  "Marketing Teams",
  "Agency Owners",
] as const;

/* ── helpers ──────────────────────────────────────────── */
function parseJsonArray<T>(raw: string | undefined): T[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/* ── page component ──────────────────────────────────── */
export default function ContentOptimizerPage() {
  return (
    <Suspense fallback={<div className="p-6 md:p-8" />}>
      <ContentOptimizerContent />
    </Suspense>
  );
}

function ContentOptimizerContent() {
  const searchParams = useSearchParams();

  /* real drafts loaded from the backend */
  const [drafts, setDrafts] = useState<ContentDraft[]>([]);
  const [selectedDraftId, setSelectedDraftId] = useState<string>("");
  const selectedDraft = drafts.find((d) => d.id === selectedDraftId) || null;

  /* optimization input */
  const [primaryKeyword, setPrimaryKeyword] = useState("");
  const [optGoal, setOptGoal] = useState<string>(OPT_GOALS[0]);
  const [optAudience, setOptAudience] = useState<string>(OPT_AUDIENCES[0]);
  const [optNotes, setOptNotes] = useState("");
  const [optDepth, setOptDepth] = useState(56);

  /* optimization result (real, from backend) */
  const [optimization, setOptimization] = useState<ContentOptimization | null>(null);
  const [showOptimized, setShowOptimized] = useState(true);

  /* loading / status */
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optStatus, setOptStatus] = useState("Optimization ready");

  useEffect(() => {
    getContentDrafts()
      .then((result) => {
        setDrafts(result);
        const draftIdParam = searchParams.get("draftId");
        const preselect = draftIdParam && result.some((d) => d.id === draftIdParam)
          ? draftIdParam
          : result[0]?.id || "";
        setSelectedDraftId(preselect);
      })
      .catch((err) => {
        console.error("Failed to load content drafts:", err);
        toast.error("Failed to load your content drafts");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const recommendations = parseJsonArray<OptimizationRecommendation>(optimization?.recommendationsJson);
  const internalLinks = parseJsonArray<string>(optimization?.internalLinksJson);
  const citationRecs = parseJsonArray<string>(optimization?.citationRecsJson);

  /* ── handlers ────────────────────────────────────────── */
  const handleRunOptimization = useCallback(async () => {
    if (!selectedDraft) {
      toast.error("Select a draft to optimize first");
      return;
    }
    if (!primaryKeyword.trim()) {
      toast.error("Enter a primary keyword first");
      return;
    }
    setIsOptimizing(true);
    setOptStatus("Optimizing…");
    try {
      const result = await optimizeContent(selectedDraft.id, {
        primaryKeyword,
        goal: optGoal,
        audience: optAudience,
        notes: optNotes || undefined,
        depth: optDepth,
      });
      setOptimization(result);
      setShowOptimized(true);
      setOptStatus("Optimization complete");
      toast.success("SEO optimization applied");
    } catch (err) {
      console.error(err);
      setOptStatus("Optimization failed");
      toast.error("Failed to optimize this draft");
    } finally {
      setIsOptimizing(false);
    }
  }, [selectedDraft, primaryKeyword, optGoal, optAudience, optNotes, optDepth]);

  const handleCompareVersions = useCallback(() => {
    if (!optimization) {
      toast.error("Run an optimization first");
      return;
    }
    setShowOptimized((v) => !v);
  }, [optimization]);

  const handleAcceptSuggestions = useCallback(async () => {
    if (!selectedDraft || !optimization) {
      toast.error("Run an optimization first");
      return;
    }
    try {
      const updated = await updateContentDraft(selectedDraft.id, optimization.optimizedContent, "Optimized");
      setDrafts((prev) => prev.map((d) => (d.id === updated.id ? updated : d)));
      toast.success("Optimized draft saved");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save the optimized draft");
    }
  }, [selectedDraft, optimization]);

  /* ── render ──────────────────────────────────────────── */
  return (
    <div className="p-6 md:p-8 max-w-[1400px] mx-auto">
      <div className="space-y-8">
        {/* ── header ───────────────────────────────── */}
        <div className="flex items-start justify-between gap-3.5 flex-wrap">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-semibold uppercase text-primary">
              <span className="h-2 w-2 rounded-full bg-primary" />
              Content studio
            </div>
            <h1 className="mt-3 text-3xl font-bold tracking-tight">Content Optimizer</h1>
            <p className="mt-2 max-w-[760px] text-sm leading-relaxed text-muted-foreground">
              Purpose: improve existing content. This screen is now shaped
              around SEO optimization, keyword density analysis, readability
              scoring, AI visibility scoring, citation recommendations, content
              gap analysis, competitor comparison, and internal linking
              suggestions.
            </p>
          </div>

          <div className="grid min-w-[260px] gap-2">
            <span className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-xs font-medium text-muted-foreground">
              <strong className="text-foreground">Objective</strong> Improve existing content
            </span>
            <span className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-xs font-medium text-muted-foreground">
              <strong className="text-foreground">Status</strong> Optimization ready
            </span>
            <span className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-xs font-medium text-muted-foreground">
              <strong className="text-foreground">Mode</strong> SEO and AI visibility analysis
            </span>
          </div>
        </div>

        {/* ── metric strip ─────────────────────────── */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          <Card className={`${CS_CARD} p-4`}>
            <div className="text-xs font-semibold uppercase text-muted-foreground">SEO optimization</div>
            <div className="mt-2 text-3xl font-bold leading-none tracking-tight">{optimization ? optimization.seoScore : "—"}</div>
            <div className="mt-1.5 text-xs text-muted-foreground">
              {optimization ? "Based on your last optimization run" : "Run an optimization to see this score"}
            </div>
          </Card>
          <Card className={`${CS_CARD} p-4`}>
            <div className="text-xs font-semibold uppercase text-muted-foreground">Readability score</div>
            <div className="mt-2 text-3xl font-bold leading-none tracking-tight">{optimization ? `${optimization.readabilityScore}%` : "—"}</div>
            <div className="mt-1.5 text-xs text-muted-foreground">
              {optimization ? "Flesch Reading Ease, computed from your draft" : "Run an optimization to see this score"}
            </div>
            {optimization && (
              <div className="flex items-center gap-2 flex-wrap mt-2">
                <span className="inline-flex items-center rounded-full border border-border bg-secondary px-2 py-1 text-[11px] font-medium text-secondary-foreground">
                  Humanized Score: {optimization.humanizedScore}%
                </span>
                <span className="inline-flex items-center rounded-full border border-border bg-secondary px-2 py-1 text-[11px] font-medium text-secondary-foreground">AI Score: {optimization.aiScore}%</span>
              </div>
            )}
          </Card>
        </section>

        {/* ── optimization input + scorecard ────────── */}
        <section className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(280px,.9fr)] gap-4">
          <Card className={CS_CARD}>
            <div className="p-5 pb-0">
              <h2 className="text-xl font-semibold tracking-tight">Optimization Input</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                Choose the existing draft, target keyword, and optimization
                depth before applying improvements.
              </p>
            </div>

            <div className="grid gap-4 p-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="grid gap-2">
                  <Label htmlFor="csOptDraft" className="text-sm font-medium">Draft Source</Label>
                  <select
                    id="csOptDraft"
                    className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none transition-colors focus:border-ring focus:ring-3 focus:ring-ring/50"
                    value={selectedDraftId}
                    onChange={(e) => { setSelectedDraftId(e.target.value); setOptimization(null); }}
                  >
                    {drafts.length === 0 ? (
                      <option value="">No drafts yet — generate one first</option>
                    ) : (
                      drafts.map((d) => (
                        <option key={d.id} value={d.id}>
                          {d.title || d.contentType} ({d.wordCount} words)
                        </option>
                      ))
                    )}
                  </select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="csOptKeyword" className="text-sm font-medium">Primary Keyword</Label>
                  <Input
                    id="csOptKeyword"
                    type="text"
                    className={CS_FIELD}
                    value={primaryKeyword}
                    onChange={(e) => setPrimaryKeyword(e.target.value)}
                  />
                </div>
                <SelectField
                  id="csOptGoal"
                  label="Optimization Goal"
                  value={optGoal}
                  onChange={setOptGoal}
                  options={OPT_GOALS}
                />
                <SelectField
                  id="csOptAudience"
                  label="Audience"
                  value={optAudience}
                  onChange={setOptAudience}
                  options={OPT_AUDIENCES}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="csOptNotes" className="text-sm font-medium">Optimization Notes</Label>
                <Textarea
                  id="csOptNotes"
                  placeholder="Call out weak sections, missing proof points, tone issues, or CTA problems."
                  className={`${CS_FIELD} min-h-[210px] leading-relaxed`}
                  value={optNotes}
                  onChange={(e) => setOptNotes(e.target.value)}
                />
              </div>

              {/* depth slider */}
              <div className="rounded-lg border border-border bg-muted/30 p-4">
                <div className="mb-2.5 flex items-center justify-between text-sm font-medium">
                  <span>Optimization Depth</span>
                  <span className="text-primary">{optDepth}%</span>
                </div>
                <input
                  id="csOptIntensity"
                  type="range"
                  min={0}
                  max={100}
                  value={optDepth}
                  onChange={(e) => setOptDepth(Number(e.target.value))}
                  className="w-full accent-primary"
                />
              </div>

              <div className="flex items-center flex-wrap gap-2.5">
                <Button
                  disabled={isOptimizing}
                  onClick={handleRunOptimization}
                >
                  {isOptimizing && <LoadingSpinner />}
                  Run SEO Optimization
                </Button>
                <Button
                  variant="outline"
                  onClick={handleCompareVersions}
                >
                  Compare Versions
                </Button>
              </div>
            </div>
          </Card>

          {/* scorecard sidebar */}
          <Card className={CS_CARD}>
            <div className="p-5 pb-0">
              <h2 className="text-xl font-semibold tracking-tight">Optimization Scorecard</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                Immediate snapshot of the metrics this optimizer is
                responsible for improving.
              </p>
            </div>

            <div className="grid gap-3 p-5">
              <div className={CS_SIDE}>
                <h4 className="mb-2 text-sm font-bold">Keyword Density Analysis</h4>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {optimization
                    ? `"${optimization.primaryKeyword}" appears at ${optimization.keywordDensity}% density. Target range is typically 1% to 2.5% with placement in the intro, one heading, and the CTA block.`
                    : "Run an optimization to see how often your primary keyword appears relative to the target density range."}
                </p>
              </div>
              <div className={CS_SIDE}>
                <h4 className="mb-2 text-sm font-bold">Readability Score</h4>
                {optimization && (
                  <div className="flex flex-wrap gap-2.5 mb-3">
                    <span className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground">Humanized Score {optimization.humanizedScore}%</span>
                    <span className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground">AI Score {optimization.aiScore}%</span>
                  </div>
                )}
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {optimization
                    ? `Flesch Reading Ease of ${optimization.readabilityScore}/100, computed directly from your draft's sentence and word structure.`
                    : "Run an optimization to compute a real Flesch Reading Ease score from your draft."}
                </p>
              </div>
              <div className={CS_SIDE}>
                <h4 className="mb-2 text-sm font-bold">AI Visibility Score</h4>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {optimization
                    ? "GPT's assessment of how well this draft performs in AI-generated answers — see Priority Recommendations below for specifics."
                    : "Add direct answers, structured explanations, entity clarity, and proof-based claims so the content performs better in AI-generated responses."}
                </p>
              </div>
            </div>
          </Card>
        </section>

        {/* ── priority recommendations + linking ────── */}
        <section className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(280px,.9fr)] gap-4">
          <Card className={CS_CARD}>
            <div className="flex flex-wrap items-start justify-between gap-3.5 p-5 pb-0">
              <div>
                <h2 className="text-xl font-semibold tracking-tight">Priority Recommendations</h2>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  These are the main optimization tasks for improving the
                  current draft.
                </p>
              </div>
              <span className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-3 py-2 text-xs font-medium text-secondary-foreground">
                <strong className="text-foreground">{recommendations.length}</strong> Core optimizer checks
              </span>
            </div>

            <div className="p-5">
              <div className="grid gap-4.5">
                {recommendations.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Run an optimization to generate priority recommendations for this draft.</p>
                ) : (
                  recommendations.map((rec, i) => (
                    <div key={i} className={`${CS_SIDE} transition-colors hover:border-primary/40`}>
                      <div className="text-sm font-semibold text-foreground">{rec.title}</div>
                      <div className="mt-1 text-xs text-muted-foreground">{rec.meta}</div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </Card>

          <Card className={CS_CARD}>
            <div className="p-5 pb-0">
              <h2 className="text-xl font-semibold tracking-tight">Linking and Citation Actions</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                Focused recommendations for trust, context, and distribution
                inside the existing content.
              </p>
            </div>

            <div className="grid gap-3 p-5">
              <div className={CS_SIDE}>
                <h4 className="mb-2 text-sm font-bold">Internal Linking Suggestions</h4>
                {internalLinks.length === 0 ? (
                  <p className="text-sm leading-relaxed text-muted-foreground">Run an optimization to see internal linking suggestions.</p>
                ) : (
                  <ul className="list-disc pl-4.5 text-sm leading-relaxed text-muted-foreground">
                    {internalLinks.map((link, i) => (
                      <li key={i}>{link}</li>
                    ))}
                  </ul>
                )}
              </div>
              <div className={CS_SIDE}>
                <h4 className="mb-2 text-sm font-bold">Citation Recommendations</h4>
                {citationRecs.length === 0 ? (
                  <p className="text-sm leading-relaxed text-muted-foreground">Run an optimization to see citation suggestions.</p>
                ) : (
                  <ul className="list-disc pl-4.5 text-sm leading-relaxed text-muted-foreground">
                    {citationRecs.map((rec, i) => (
                      <li key={i}>{rec}</li>
                    ))}
                  </ul>
                )}
              </div>
              <div className={CS_SIDE}>
                <h4 className="mb-2 text-sm font-bold">Revision Preview</h4>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  The optimized version should read cleaner, include stronger
                  evidence, use better internal link placement, and answer
                  search intent more directly.
                </p>
              </div>
            </div>
          </Card>
        </section>

        {/* ── optimization output preview ──────────── */}
        <Card className={CS_CARD}>
          <div className="flex flex-wrap items-start justify-between gap-3.5 p-5 pb-0">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">Optimization Output Preview</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                Final architecture for the improved draft after keyword,
                readability, visibility, and citation fixes are applied.
              </p>
            </div>
            <Button
              variant="outline"
              onClick={handleAcceptSuggestions}
            >
              Accept Suggestions
            </Button>
          </div>

          <div className="p-5">
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.08fr)_minmax(280px,.92fr)] gap-4">
              <div className="rounded-lg border border-border bg-background p-5" style={{ minHeight: 360 }}>
                <div className="flex items-center justify-between gap-3 flex-wrap mb-4">
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight">{showOptimized ? "Optimized Draft" : "Original Draft"}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {optimization
                        ? "Toggle with Compare Versions to see the original draft side-by-side."
                        : "Cleaner structure, stronger keyword placement, proof-led sections, and better answer formatting."}
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">
                    {optStatus}
                  </div>
                </div>

                {isOptimizing ? (
                  <div className="grid gap-4.5 mt-4.5">
                    <div className="h-3 rounded-full bg-primary/15 w-[30%]" />
                    <div className="grid gap-2.5">
                      <div className="h-3 rounded-full bg-primary/15 w-full" />
                      <div className="h-3 rounded-full bg-primary/15 w-full" />
                      <div className="h-3 rounded-full bg-primary/15 w-[58%]" />
                    </div>
                    <div className="h-3 rounded-full bg-primary/15 w-[30%]" />
                    <div className="grid gap-2.5">
                      <div className="h-3 rounded-full bg-primary/15 w-full" />
                      <div className="h-3 rounded-full bg-primary/15 w-full" />
                      <div className="h-3 rounded-full bg-primary/15 w-full" />
                      <div className="h-3 rounded-full bg-primary/15 w-[58%]" />
                    </div>
                  </div>
                ) : optimization ? (
                  <div style={{ whiteSpace: "pre-wrap", fontSize: 14, lineHeight: 1.6, maxHeight: 420, overflowY: "auto" }}>
                    {showOptimized ? optimization.optimizedContent : (selectedDraft?.content || "")}
                  </div>
                ) : selectedDraft ? (
                  <div style={{ whiteSpace: "pre-wrap", fontSize: 14, lineHeight: 1.6, maxHeight: 420, overflowY: "auto" }}>
                    {selectedDraft.content}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">Select a draft and run an optimization to see results here.</p>
                )}
              </div>

              <aside className="grid gap-3">
                <div className={CS_SIDE}>
                  <h4 className="mb-2 text-sm font-bold">Optimization Tips</h4>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Running optimization applies target density filters, adjusts
                    readability weights, and injects supporting internal link
                    suggestions automatically.
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

/* ── sub-components ─────────────────────────────────── */

function LoadingSpinner() {
  return <i className="ti ti-loader st-spin" style={{ marginRight: 4 }} />;
}

interface SelectFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
}

function SelectField({
  id,
  label,
  value,
  onChange,
  options,
}: SelectFieldProps) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id} className="text-sm font-medium">{label}</Label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none transition-colors focus:border-ring focus:ring-3 focus:ring-ring/50"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

