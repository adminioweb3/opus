"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Link, ClipboardList, Globe, Sparkles, Target, Bot,
  Lightbulb, Download, FlaskConical, CheckCircle2,
  Code, ChevronDown, ChevronRight, Copy
} from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  analyzePage,
  generateSchema,
  GeoOptimizationResponse,
} from "@/lib/api/geoOptimizerApi";

/* ── constants ────────────────────────────── */
const ANALYSIS_STEPS = [
  "Crawling content structure",
  "Analyzing semantic relevance",
  "Checking entity coverage",
  "Evaluating authority signals",
  "Scoring against AI engine preferences"
];

const SEVERITY_STYLE: Record<string, { icon: string; badge: string }> = {
  high: { icon: "bg-red-500/10 text-red-500", badge: "bg-red-500/10 text-red-600 border-red-200" },
  medium: { icon: "bg-amber-500/10 text-amber-500", badge: "bg-amber-500/10 text-amber-600 border-amber-200" },
  low: { icon: "bg-orange-500/10 text-orange-500", badge: "bg-orange-500/10 text-orange-600 border-orange-200" },
};

function severityStyle(impact: string) {
  return SEVERITY_STYLE[impact.toLowerCase()] ?? SEVERITY_STYLE.medium;
}

function subMetricColor(score: number) {
  if (score >= 70) return "#10b981";
  if (score >= 45) return "#f59e0b";
  return "#ef4444";
}

const SCHEMA_TYPES = [
  "Article",
  "FAQPage",
  "HowTo",
  "Product",
  "Organization",
  "BreadcrumbList",
  "Review",
  "VideoObject",
  "Event"
];

/* ── page component ──────────────────────────────────── */
export default function GeoOptimizerPage() {
  /* mode */
  const [mode, setMode] = useState<"url" | "paste">("url");

  /* inputs */
  const [url, setUrl] = useState("");
  const [content, setContent] = useState("");
  const [target, setTarget] = useState("");
  const [engine, setEngine] = useState("");

  /* analysis state */
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [results, setResults] = useState<GeoOptimizationResponse | null>(null);
  const [appliedFixes, setAppliedFixes] = useState<Set<number>>(new Set());

  const hasResults = results !== null;

  const handleApplyFix = useCallback((idx: number) => {
    setAppliedFixes((prev) => new Set(prev).add(idx));
    toast.success("Marked as applied");
  }, []);

  /* schema generator */
  const [schemaType, setSchemaType] = useState("Article");
  const [schemaOutput, setSchemaOutput] = useState<string | null>(null);
  const [isGeneratingSchema, setIsGeneratingSchema] = useState(false);

  /* refs for interval */
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleLoadSample = useCallback(() => {
    setMode("url");
    setUrl("https://acmecorp.com/guide/best-project-management-tools");
    setTarget("best project management tools for teams");
    setEngine("ChatGPT, Perplexity, AI Overviews");
  }, []);

  const handleAnalyze = async () => {
    const hasInput = mode === "url" ? url.trim() : content.trim();
    if (!hasInput) {
      toast.error("Enter a URL or paste content first");
      return;
    }
    if (!target.trim() || !engine.trim()) {
      toast.error("Target query and Engine are required");
      return;
    }

    setResults(null);
    setAppliedFixes(new Set());
    setIsAnalyzing(true);
    setStepIndex(0);

    let i = 0;
    timerRef.current = setInterval(() => {
      i++;
      if (i < ANALYSIS_STEPS.length) {
        setStepIndex(i);
      }
    }, 1500); // Slower interval for real API call

    try {
      const data = await analyzePage({
        url: mode === "url" ? url : "",
        content: mode === "paste" ? content : "",
        targetKeyword: target,
        engine: engine,
      });
      setResults(data);
    } catch (err) {
      console.error(err);
      toast.error("An error occurred during analysis");
    } finally {
      if (timerRef.current) clearInterval(timerRef.current);
      setStepIndex(ANALYSIS_STEPS.length - 1);
      setTimeout(() => {
        setIsAnalyzing(false);
        setTimeout(() => {
          const resultsEl = document.getElementById("goptResults");
          if (resultsEl) resultsEl.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 50);
      }, 500);
    }
  };

  const handleGenerateSchema = async () => {
    const hasInput = mode === "url" ? url.trim() : content.trim();
    if (!hasInput) {
      toast.error("Enter a URL or paste content first to generate schema");
      return;
    }

    setSchemaOutput(null);
    setIsGeneratingSchema(true);

    try {
      const data = await generateSchema({
        url: mode === "url" ? url : "",
        content: mode === "paste" ? content : "",
        schemaType: schemaType,
      });
      setSchemaOutput(data.jsonLd);
      toast.success(`${schemaType} schema generated`);
    } catch (err) {
      console.error(err);
      toast.error("An error occurred during schema generation");
    } finally {
      setIsGeneratingSchema(false);
    }
  };

  const handleCopySchema = useCallback(() => {
    if (schemaOutput) {
      navigator.clipboard.writeText(schemaOutput);
      toast.success("Copied to clipboard");
    }
  }, [schemaOutput]);

  const handleExport = useCallback(() => {
    toast.info("Export coming soon");
  }, []);

  return (
    <div className="p-6 md:p-8 max-w-[1400px] mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-300">
      
      {/* ── header ───────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-border/50">
        <div className="space-y-1.5">
          <h1 className="text-3xl font-bold tracking-tight">GEO Optimizer</h1>
          <p className="text-muted-foreground text-[15px] max-w-2xl">
            Audit a page and optimize it to get cited, quoted, and surfaced by
            AI search engines.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Button variant="outline" onClick={handleLoadSample}>
            <FlaskConical className="w-4 h-4 mr-2" />
            Load sample
          </Button>
          <Button
            onClick={handleExport}
            disabled={!hasResults}
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* ── inputs ───────────────────────────────── */}
      <div className="space-y-6 max-w-4xl">
        
        {/* Tabs */}
        <div className="flex items-center p-1 bg-muted/40 rounded-lg w-fit border border-border/50">
          <Button
            variant={mode === "url" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setMode("url")}
            className={`text-[13px] font-medium px-4 py-1.5 h-auto ${mode === "url" ? "shadow-sm" : "text-muted-foreground"}`}
          >
            <Link className="w-4 h-4 mr-2" />
            Analyze URL
          </Button>
          <Button
            variant={mode === "paste" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setMode("paste")}
            className={`text-[13px] font-medium px-4 py-1.5 h-auto ${mode === "paste" ? "shadow-sm" : "text-muted-foreground"}`}
          >
            <ClipboardList className="w-4 h-4 mr-2" />
            Paste content
          </Button>
        </div>

        {/* Input Areas */}
        <div className="space-y-4">
          {mode === "url" && (
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Globe className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  className="pl-10 h-11 text-[15px] bg-background shadow-sm border-border/80 focus-visible:ring-primary/20"
                  placeholder="https://yourdomain.com/blog/best-crm-software"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
                />
              </div>
              <Button size="lg" className="h-11 px-8 shadow-sm" onClick={handleAnalyze}>
                <Sparkles className="w-4 h-4 mr-2" />
                Analyze
              </Button>
            </div>
          )}

          {mode === "paste" && (
            <div className="space-y-3">
              <Textarea
                className="min-h-[160px] text-[15px] resize-y bg-background shadow-sm border-border/80 focus-visible:ring-primary/20"
                placeholder="Paste your article, landing page copy, or markdown here…"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <div className="flex justify-end">
                <Button size="lg" className="h-11 px-8 shadow-sm" onClick={handleAnalyze}>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Analyze content
                </Button>
              </div>
            </div>
          )}

          {/* Targets */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Target className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="pl-10 h-11 bg-background shadow-sm border-border/80 focus-visible:ring-primary/20"
                placeholder="Target query — e.g. best CRM for small business"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
              />
            </div>
            <div className="relative">
              <Bot className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="pl-10 h-11 bg-background shadow-sm border-border/80 focus-visible:ring-primary/20"
                placeholder="Optimize for — ChatGPT, Perplexity, Gemini..."
                value={engine}
                onChange={(e) => setEngine(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-[13px] text-muted-foreground pt-1">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            Scores how likely AI engines are to cite this page, then gives exact fixes ranked by impact.
          </div>
        </div>
      </div>

      {/* ── loading state ────────────────────────── */}
      {isAnalyzing && (
        <div className="py-16 flex flex-col items-center justify-center space-y-4 animate-in fade-in">
          <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          <div className="text-center space-y-1">
            <p className="font-medium text-[15px]">Analyzing page for AI citation readiness…</p>
            <p className="text-sm text-muted-foreground">{ANALYSIS_STEPS[Math.min(stepIndex, ANALYSIS_STEPS.length - 1)]}</p>
          </div>
        </div>
      )}

      {/* ── results ──────────────────────────────── */}
      <div id="goptResults" className={`space-y-6 transition-all duration-500 ${hasResults && !isAnalyzing ? 'opacity-100 block' : 'opacity-0 hidden'}`}>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Score Card */}
          <Card className="flex flex-col overflow-hidden items-center text-center">
            <CardHeader className="w-full pb-2">
              <CardTitle className="text-lg">GEO score</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col items-center justify-center p-6 space-y-4 w-full">
              <div className="relative w-[160px] h-[160px]">
                <svg viewBox="0 0 160 160" className="w-full h-full">
                  <circle cx="80" cy="80" r="70" fill="none" stroke="hsl(var(--muted))" strokeWidth="14" />
                  {hasResults && (
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      fill="none"
                      stroke={(results?.score || 0) >= 70 ? "#10b981" : (results?.score || 0) >= 45 ? "#f59e0b" : "#ef4444"}
                      strokeWidth="14"
                      strokeLinecap="round"
                      strokeDasharray={2 * Math.PI * 70}
                      strokeDashoffset={2 * Math.PI * 70 * (1 - (results?.score || 0) / 100)}
                      transform="rotate(-90 80 80)"
                      style={{ transition: "stroke-dashoffset 1.5s ease-out" }}
                    />
                  )}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-bold tracking-tighter leading-none">{hasResults ? results?.score : "0"}</span>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">OF 100</span>
                </div>
              </div>
              <div className="space-y-1 w-full pt-4 border-t border-border/50">
                <div className={`font-semibold text-[15px] ${(results?.score || 0) >= 70 ? "text-emerald-600" : "text-amber-600"}`}>
                  {hasResults ? results?.verdict : "Needs work"}
                </div>
                <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                  {hasResults ? results?.statusText : "Ready for AI distribution"}
                </div>
              </div>

              {hasResults && results && results.subMetrics.length > 0 && (
                <div className="w-full pt-4 border-t border-border/50 space-y-3">
                  {results.subMetrics.map((m, idx) => (
                    <div key={idx}>
                      <div className="flex items-center justify-between text-[12.5px] mb-1.5">
                        <span className="font-semibold">{m.label}</span>
                        <span className="text-muted-foreground font-semibold">{m.score}</span>
                      </div>
                      <div className="h-[7px] rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700 ease-out"
                          style={{ width: `${m.score}%`, background: subMetricColor(m.score) }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Fixes */}
          <Card className="lg:col-span-2 flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg">Fix recommendations</CardTitle>
              <Badge variant="secondary" className="text-xs">{results?.fixRecommendations?.length || 0} issues</Badge>
            </CardHeader>
            <CardContent className="flex-1 p-0">
              <div className="divide-y divide-border/50">
                {results?.fixRecommendations?.map((fix, idx) => {
                  const style = severityStyle(fix.impact);
                  const applied = appliedFixes.has(idx);
                  return (
                    <div key={idx} className="flex items-start gap-3.5 p-4 hover:bg-muted/20 transition-colors">
                      <div className={`shrink-0 w-[34px] h-[34px] rounded-[9px] grid place-items-center ${style.icon}`}>
                        <i className={`ti ${fix.icon || "ti-alert-circle"} text-[18px]`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[13.5px] font-semibold">{fix.title}</span>
                          <Badge variant="outline" className={`text-[10px] uppercase font-bold tracking-wider px-1.5 py-0 ${style.badge}`}>
                            {fix.impact}
                          </Badge>
                        </div>
                        {fix.description && (
                          <p className="text-[12.5px] text-muted-foreground mt-1 leading-relaxed">{fix.description}</p>
                        )}
                        {fix.delta && (
                          <span className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-emerald-600 mt-1.5">
                            <i className="ti ti-trending-up text-sm" />
                            {fix.delta}
                          </span>
                        )}
                      </div>
                      <Button
                        variant="secondary"
                        size="sm"
                        className={`shrink-0 h-auto py-1.5 px-3 text-[11.5px] ${applied ? "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/10" : ""}`}
                        disabled={applied}
                        onClick={() => handleApplyFix(idx)}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />
                        {applied ? "Applied" : "Apply"}
                      </Button>
                    </div>
                  );
                })}
                {(!results?.fixRecommendations || results.fixRecommendations.length === 0) && hasResults && (
                  <div className="text-sm text-muted-foreground text-center p-8">
                    No critical issues found! Great job.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* LEFT HALF */}
          <div className="space-y-6">
            
            {/* Competitor Gap */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-[17px]">Competitor citation gap</CardTitle>
                <CardDescription>Who AI cites for this query</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border/50">
                  {results?.competitorGap?.map((comp, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 hover:bg-muted/20 transition-colors">
                      <span className="text-[14px] font-medium">{comp.name}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-[13px] font-semibold text-muted-foreground">{comp.coverage}</span>
                        <span className={`text-[11px] font-bold uppercase tracking-wider ${comp.status.toLowerCase() === "strong" ? "text-emerald-600" : comp.status.toLowerCase() === "moderate" ? "text-amber-500" : "text-red-500"}`}>
                          {comp.status}
                        </span>
                      </div>
                    </div>
                  ))}
                  {(!results?.competitorGap || results.competitorGap.length === 0) && hasResults && (
                    <div className="text-sm text-muted-foreground text-center p-8">
                      No competitor data available.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Prompt Coverage */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-[17px]">Prompt coverage</CardTitle>
                <CardDescription>
                  {results && results.promptCoverage.length > 0
                    ? `${results.promptCoverage.filter((p) => p.coverage.toLowerCase() === "full").length} answered · ${results.promptCoverage.filter((p) => p.coverage.toLowerCase() === "partial").length} partial · ${results.promptCoverage.filter((p) => p.coverage.toLowerCase() === "none").length} missing`
                    : "Buyer questions"}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border/50">
                  {results?.promptCoverage?.map((p, idx) => {
                    const cov = p.coverage.toLowerCase();
                    const covStyle =
                      cov === "full"
                        ? { icon: "ti-circle-check", bg: "bg-emerald-500/10", text: "text-emerald-600" }
                        : cov === "partial"
                          ? { icon: "ti-circle-dashed", bg: "bg-amber-500/10", text: "text-amber-600" }
                          : { icon: "ti-circle-x", bg: "bg-red-500/10", text: "text-red-500" };
                    return (
                      <div key={idx} className="flex items-start gap-3 p-4 hover:bg-muted/20 transition-colors">
                        <div className={`shrink-0 w-8 h-8 rounded-full grid place-items-center ${covStyle.bg} ${covStyle.text}`}>
                          <i className={`ti ${covStyle.icon} text-base`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-[13px] font-medium">{p.question}</span>
                          <p className="text-[12px] text-muted-foreground mt-0.5 leading-relaxed">{p.note}</p>
                        </div>
                      </div>
                    );
                  })}
                  {(!results?.promptCoverage || results.promptCoverage.length === 0) && hasResults && (
                    <div className="text-sm text-muted-foreground text-center p-8">
                      No buyer-question data available.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* RIGHT HALF */}
          <div className="space-y-6">
            
            {/* Authority */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-[17px]">Citation gap analysis</CardTitle>
                <CardDescription>Authority signals</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border/50">
                  {results?.citationGap?.map((c, idx) => {
                    const tone = c.score >= 70 ? "text-emerald-600 bg-emerald-500/10" : c.score >= 40 ? "text-amber-600 bg-amber-500/10" : "text-red-500 bg-red-500/10";
                    return (
                      <div key={idx} className="flex items-center justify-between gap-3 p-4 hover:bg-muted/20 transition-colors">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="shrink-0 w-8 h-8 rounded-lg bg-muted/50 grid place-items-center">
                            <i className={`ti ${c.icon || "ti-link"} text-base text-muted-foreground`} />
                          </div>
                          <div className="min-w-0">
                            <div className="text-[13px] font-medium">{c.title}</div>
                            <div className="text-[12px] text-muted-foreground">{c.status}</div>
                          </div>
                        </div>
                        <span className={`shrink-0 text-[11.5px] font-bold px-2 py-1 rounded-md ${tone}`}>{c.score}/100</span>
                      </div>
                    );
                  })}
                  {(!results?.citationGap || results.citationGap.length === 0) && hasResults && (
                    <div className="text-sm text-muted-foreground text-center p-8">
                      No authority signal data available.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Schema Generator */}
            <Card>
              <CardHeader className="pb-4 border-b border-border/50">
                <CardTitle className="text-[17px]">Schema generator</CardTitle>
                <CardDescription>JSON-LD structured data</CardDescription>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-end gap-3 p-4 bg-muted/20 rounded-lg border border-border/50">
                  <div className="flex-1 space-y-1.5">
                    <label className="text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">Schema type</label>
                    <div className="relative">
                      <Code className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <select
                        className="w-full h-10 pl-9 pr-8 text-[14px] rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none cursor-pointer"
                        value={schemaType}
                        onChange={(e) => setSchemaType(e.target.value)}
                      >
                        {SCHEMA_TYPES.map((key) => (
                          <option key={key} value={key}>{key}</option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>
                  <Button onClick={handleGenerateSchema} disabled={isGeneratingSchema} className="w-full sm:w-auto">
                    <Sparkles className="w-4 h-4 mr-2" />
                    {isGeneratingSchema ? "Wait..." : "Generate"}
                  </Button>
                </div>

                <div>
                  {isGeneratingSchema ? (
                    <div className="py-8 flex flex-col items-center justify-center space-y-3 bg-muted/10 rounded-lg border border-dashed border-border">
                      <div className="w-6 h-6 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                      <span className="text-sm font-medium text-muted-foreground">Generating {schemaType} schema…</span>
                    </div>
                  ) : schemaOutput ? (
                    <div className="rounded-lg border border-border overflow-hidden bg-muted/30">
                      <div className="flex items-center justify-between px-4 py-2 bg-muted/50 border-b border-border">
                        <span className="text-[13px] font-semibold flex items-center gap-1.5 text-foreground">
                          <i className="ti ti-braces text-muted-foreground" /> {schemaType} schema
                        </span>
                        <Button variant="ghost" size="sm" className="h-7 px-2 text-[12px]" onClick={handleCopySchema}>
                          <Copy className="w-3.5 h-3.5 mr-1.5" />
                          Copy
                        </Button>
                      </div>
                      <pre className="p-4 text-[13px] text-muted-foreground overflow-x-auto font-mono whitespace-pre-wrap break-words max-h-[300px] overflow-y-auto custom-scrollbar">
                        {schemaOutput}
                      </pre>
                    </div>
                  ) : (
                    <div className="py-10 px-6 text-center flex flex-col items-center gap-3 bg-muted/10 rounded-lg border border-dashed border-border">
                      <div className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center">
                        <Code className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <p className="text-[14px] text-muted-foreground leading-relaxed max-w-[250px]">
                        Pick a schema type and hit Generate to get copy-ready JSON-LD customized to your content.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
      
    </div>
  );
}