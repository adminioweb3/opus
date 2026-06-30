"use client";

import React, { useEffect, useState, Suspense } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  DollarSign,
  Globe,
  ShieldAlert,
  Rocket,
  Target,
  FileText,
  ChevronDown,
  AlertTriangle,
  Loader2,
  Play,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useOrganizationStore } from "@/lib/stores/organizationStore";
import { useAuthStore } from "@/lib/stores/auth-store";
import { getLatestSnapshot, DashboardSnapshot } from "@/lib/api/analysisApi";
import { getFullReport, FullReportData } from "@/lib/api/reportApi";

// Define interfaces for parsed JSON objects
interface PlatformData {
  platform: string;
  score: number;
  citations: number;
  change: string;
  bg: string;
}

interface CompetitorData {
  name: string;
  visibility: number;
  share: number;
}

interface AlertData {
  title: string;
  estimatedImpact: string;
  description: string;
}

interface RecommendedAction {
  title: string;
  estimatedImpact: string;
  priority: string;
}

export default function WarRoomPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center p-20">
          <Loader2 className="animate-spin w-8 h-8 text-primary" />
        </div>
      }
    >
      <WarRoomContent />
    </Suspense>
  );
}

function WarRoomContent() {
  const { organizationId } = useOrganizationStore();
  const { token: firebaseToken } = useAuthStore();
  const searchParams = useSearchParams();
  const orgId = searchParams.get("orgId") || organizationId;

  const [snapshot, setSnapshot] = useState<DashboardSnapshot | null>(null);
  const [reportData, setReportData] = useState<FullReportData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Streaming State
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [streamMessages, setStreamMessages] = useState<string[]>([]);

  useEffect(() => {
    let isMounted = true;
    const doLoadData = async () => {
      if (!orgId) return;
      try {
        setIsLoading(true);
        const [snapData, repData] = await Promise.all([
          getLatestSnapshot(),
          getFullReport(orgId),
        ]);
        if (isMounted) {
          if (snapData) setSnapshot(snapData);
          if (repData) setReportData(repData);
        }
      } catch (error) {
        console.error("Failed to load metrics", error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    doLoadData();
    return () => {
      isMounted = false;
    };
  }, [orgId]);

  const startAnalysis = async () => {
    if (!firebaseToken) return;
    setIsAnalyzing(true);
    setStreamMessages([]);

    // Fallback website ID if needed
    const websiteId = reportData?.websiteProfile?.id || "";

    const url = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5100"}/api/Analysis/stream${websiteId ? `?websiteId=${websiteId}` : ""}`;

    try {
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${firebaseToken}` },
      });

      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") {
              // Finished - Reload the UI with new snapshot manually here
              if (orgId) {
                const snapData = await getLatestSnapshot();
                if (snapData) setSnapshot(snapData);
              }
              setTimeout(() => setIsAnalyzing(false), 2000);
            } else if (data.trim() !== "") {
              setStreamMessages((prev) => [...prev, data]);
            }
          }
        }
      }
    } catch (error) {
      console.error("Stream failed", error);
      setIsAnalyzing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center p-20">
        <Loader2 className="animate-spin w-8 h-8 text-primary" />
      </div>
    );
  }

  // --- Map Executive KPIs ---
  const visibilityScore = snapshot?.visibilityScore || 0;
  const citationHealth = snapshot?.citationHealth || 0;
  const revenueImpact = snapshot?.revenueImpact || "$0";
  const competitorRisk = snapshot?.competitorRisk || "Low";

  // Extract domain name
  let domainName = "Website";
  if (reportData?.websiteProfile?.websiteUrl) {
    try {
      domainName = new URL(
        reportData.websiteProfile.websiteUrl,
      ).hostname.replace("www.", "");
      domainName = domainName.charAt(0).toUpperCase() + domainName.slice(1);
    } catch {
      // Ignored
    }
  }

  // Parse Snapshot JSONs safely
  const parseJson = (str: string | undefined, fallback: unknown) => {
    if (!str) return fallback;
    try {
      return JSON.parse(str);
    } catch {
      return fallback;
    }
  };

  const platforms = parseJson(
    snapshot?.platformVisibilitiesJson,
    [],
  ) as PlatformData[];
  const topCompetitors = parseJson(
    snapshot?.topCompetitorsJson,
    [],
  ) as CompetitorData[];
  const opps = parseJson(snapshot?.opportunityPipelineJson, {}) as Record<
    string,
    string | number
  >;
  const opportunityPipeline = {
    revenue: opps.Revenue || opps.revenue || "$0",
    traffic: opps.Traffic || opps.traffic || "0",
    citations: opps.Citations || opps.citations || 0,
    authority: opps.Authority || opps.authority || 0,
    coverage: opps.Coverage || opps.coverage || 0,
  };
  const executiveAlerts = parseJson(
    snapshot?.executiveAlertsJson,
    [],
  ) as AlertData[];
  const recommendedActions = parseJson(
    snapshot?.recommendedActionsJson,
    [],
  ) as RecommendedAction[];

  // Radar chart node calculations
  const getRadarClass = (score: number) => {
    if (score >= 80) return "fill-emerald-500";
    if (score >= 65) return "fill-cyan-500";
    if (score >= 45) return "fill-amber-500";
    return "fill-destructive";
  };

  const radarNodes = platforms
    .slice(0, 7)
    .map((p: PlatformData, i: number, arr: PlatformData[]) => {
      const angle = i * (360 / arr.length) * (Math.PI / 180);
      const r = 170 - (p.score / 100) * 115;
      const cx = 210 + Math.sin(angle) * r;
      const cy = 210 - Math.cos(angle) * r;

      return { ...p, cx, cy, fillClass: getRadarClass(p.score) };
    });

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1 },
  };

  return (
    <div className="space-y-6 max-w-350 mx-auto pb-8 relative">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            Executive war room
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Real-time command center for AI visibility operations
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={startAnalysis}
            disabled={isAnalyzing}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {isAnalyzing ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Play className="w-4 h-4 fill-current" />
            )}
            Analyze Website
          </button>

          <div className="flex items-center gap-1.5 text-xs text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 px-3 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-900 font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />{" "}
            Live monitoring
          </div>
          {snapshot && (
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Updated {new Date(snapshot.createdAt).toLocaleTimeString()}
            </div>
          )}
          <div className="text-sm font-semibold flex items-center gap-1 cursor-pointer hover:text-primary transition-colors">
            {domainName} <ChevronDown className="w-4 h-4" />
          </div>
        </div>
      </div>

      {!snapshot && !isAnalyzing ? (
        <div className="flex flex-col items-center justify-center p-20 border border-dashed rounded-xl border-border bg-card">
          <Globe className="w-12 h-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-bold">No Analysis Data Available</h3>
          <p className="text-muted-foreground text-sm max-w-md text-center mt-2 mb-6">
            Click &quot;Analyze Website&quot; to generate the initial executive
            snapshot based on your website&apos;s crawled data.
          </p>
          <button
            onClick={startAnalysis}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
          >
            <Play className="w-4 h-4 fill-current" /> Run Full AI Analysis
          </button>
        </div>
      ) : (
        <>
          {/* SECTION 1: EXECUTIVE KPIS */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            <motion.div variants={item}>
              <Card className="hover:-translate-y-1 hover:shadow-lg transition-all duration-250 cursor-pointer overflow-hidden group border-border">
                <CardContent className="p-5 flex flex-col justify-between h-full relative">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                      <Globe className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-500 px-2.5 py-1 rounded-md">
                      Excellent
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                      Visibility health
                    </p>
                    <div className="flex items-baseline gap-2 mt-1.5">
                      <span className="text-3xl font-black">
                        {visibilityScore.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="hover:-translate-y-1 hover:shadow-lg transition-all duration-250 cursor-pointer overflow-hidden group border-border">
                <CardContent className="p-5 flex flex-col justify-between h-full relative">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
                      <DollarSign className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-500 px-2.5 py-1 rounded-md">
                      Growing
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                      Revenue impact
                    </p>
                    <div className="flex items-baseline gap-2 mt-1.5">
                      <span className="text-3xl font-black">
                        {revenueImpact}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="hover:-translate-y-1 hover:shadow-lg transition-all duration-250 cursor-pointer overflow-hidden group border-border">
                <CardContent className="p-5 flex flex-col justify-between h-full relative">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center">
                      <Activity className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-500 px-2.5 py-1 rounded-md">
                      Stable
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                      Citation health
                    </p>
                    <div className="flex items-baseline gap-2 mt-1.5">
                      <span className="text-3xl font-black">
                        {citationHealth.toFixed(0)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="hover:-translate-y-1 hover:shadow-lg transition-all duration-250 cursor-pointer overflow-hidden group border-border">
                <CardContent className="p-5 flex flex-col justify-between h-full relative">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                      <ShieldAlert className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-500 px-2.5 py-1 rounded-md">
                      Watch
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                      Competitor risk
                    </p>
                    <div className="flex items-baseline gap-2 mt-1.5">
                      <span className="text-3xl font-black">
                        {competitorRisk}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6">
            {/* SECTION 2: BRAND VISIBILITY MAP (RADAR) */}
            <Card className="flex flex-col border-border shadow-sm overflow-hidden">
              <div className="p-5 pb-0 flex justify-between items-center">
                <h3 className="font-bold text-lg">Brand visibility map</h3>
                <span className="text-xs text-muted-foreground">
                  {platforms.length} platforms scanned
                </span>
              </div>
              <CardContent className="p-5 grow flex items-center justify-center flex-col sm:flex-row gap-8">
                <div className="relative w-full max-w-105 aspect-square shrink-0">
                  <svg
                    viewBox="0 0 420 420"
                    className="w-full h-full drop-shadow-sm"
                  >
                    <circle
                      cx="210"
                      cy="210"
                      r="180"
                      fill="none"
                      className="stroke-border"
                      strokeWidth="1"
                    />
                    <circle
                      cx="210"
                      cy="210"
                      r="135"
                      fill="none"
                      className="stroke-border"
                      strokeWidth="1"
                    />
                    <circle
                      cx="210"
                      cy="210"
                      r="90"
                      fill="none"
                      className="stroke-border"
                      strokeWidth="1"
                    />
                    <circle
                      cx="210"
                      cy="210"
                      r="45"
                      fill="none"
                      className="stroke-border"
                      strokeWidth="1"
                    />

                    <g
                      style={{ transformOrigin: "210px 210px" }}
                      className="animate-[spin_8s_linear_infinite]"
                    >
                      <path
                        d="M210,210 L210,30 A180,180 0 0,1 330,75 Z"
                        fill="url(#sweepGrad)"
                        opacity="0.3"
                      />
                    </g>
                    <defs>
                      <radialGradient id="sweepGrad">
                        <stop
                          offset="0%"
                          stopColor="hsl(var(--primary))"
                          stopOpacity="0.8"
                        />
                        <stop
                          offset="100%"
                          stopColor="hsl(var(--primary))"
                          stopOpacity="0"
                        />
                      </radialGradient>
                    </defs>

                    <circle
                      cx="210"
                      cy="210"
                      r="34"
                      className="fill-card stroke-primary"
                      strokeWidth="3"
                    />
                    <text
                      x="210"
                      y="206"
                      textAnchor="middle"
                      className="fill-foreground font-bold text-[11px] uppercase tracking-wider"
                    >
                      {domainName.toUpperCase()}
                    </text>
                    <text
                      x="210"
                      y="222"
                      textAnchor="middle"
                      className="fill-muted-foreground font-semibold text-[10px]"
                    >
                      {visibilityScore.toFixed(1)}
                    </text>

                    {radarNodes.map((node, i) => (
                      <g key={i}>
                        <circle
                          cx={node.cx}
                          cy={node.cy}
                          r={node.score > 70 ? 11 : node.score > 45 ? 9 : 7}
                          className={node.fillClass}
                        />
                        <text
                          x={node.cx}
                          y={node.cy - 18}
                          textAnchor="middle"
                          className="fill-foreground font-bold text-xs"
                          style={{
                            paintOrder: "stroke",
                            stroke: "hsl(var(--card))",
                            strokeWidth: "4px",
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                          }}
                        >
                          {node.platform}
                        </text>
                        <text
                          x={node.cx}
                          y={node.cy + 22}
                          textAnchor="middle"
                          className="fill-muted-foreground font-semibold text-[11px]"
                          style={{
                            paintOrder: "stroke",
                            stroke: "hsl(var(--card))",
                            strokeWidth: "4px",
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                          }}
                        >
                          {node.score}%
                        </text>
                      </g>
                    ))}
                  </svg>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center gap-8">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                      <span className="text-sm font-semibold">
                        Strong (80%+)
                      </span>
                    </div>
                    <span className="text-sm font-bold text-muted-foreground">
                      {platforms.filter((p) => p.score >= 80).length} platforms
                    </span>
                  </div>
                  <div className="flex justify-between items-center gap-8">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-cyan-500"></div>
                      <span className="text-sm font-semibold">
                        Solid (65–79%)
                      </span>
                    </div>
                    <span className="text-sm font-bold text-muted-foreground">
                      {
                        platforms.filter((p) => p.score >= 65 && p.score < 80)
                          .length
                      }{" "}
                      platform
                    </span>
                  </div>
                  <div className="flex justify-between items-center gap-8">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                      <span className="text-sm font-semibold">
                        Developing (45–64%)
                      </span>
                    </div>
                    <span className="text-sm font-bold text-muted-foreground">
                      {
                        platforms.filter((p) => p.score >= 45 && p.score < 65)
                          .length
                      }{" "}
                      platforms
                    </span>
                  </div>
                  <div className="flex justify-between items-center gap-8">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-destructive"></div>
                      <span className="text-sm font-semibold">
                        Weak (under 45%)
                      </span>
                    </div>
                    <span className="text-sm font-bold text-muted-foreground">
                      {platforms.filter((p) => p.score < 45).length} platforms
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* SECTION 3: AI VISIBILITY COVERAGE */}
            <Card className="flex flex-col border-border shadow-sm">
              <div className="p-5 pb-0 flex justify-between items-center">
                <h3 className="font-bold text-lg">AI visibility coverage</h3>
              </div>
              <CardContent className="p-5 pt-4">
                <div className="grid grid-cols-2 gap-3">
                  {platforms.slice(0, 4).map((p, i) => (
                    <div
                      key={i}
                      className="border border-border rounded-xl p-3 flex flex-col gap-2 hover:-translate-y-0.5 hover:shadow-md transition-all cursor-default bg-card"
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-4 h-4 rounded"
                            style={{ backgroundColor: p.bg }}
                          ></div>
                          <span className="font-bold text-sm">
                            {p.platform}
                          </span>
                        </div>
                      </div>
                      <div>
                        <div className="text-2xl font-black">{p.score}%</div>
                        <div className="text-xs text-muted-foreground">
                          {p.citations} citations
                        </div>
                        <div
                          className={
                            "text-xs font-bold mt-1 " +
                            (p.change?.includes("-")
                              ? "text-destructive"
                              : "text-emerald-500")
                          }
                        >
                          {p.change}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-border shadow-sm">
              <div className="p-5 pb-3">
                <h3 className="font-bold text-lg">Executive alerts</h3>
              </div>
              <CardContent className="p-5 pt-0 flex flex-col gap-5 mt-2">
                {executiveAlerts.map((rec, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 border-l-2 border-destructive pl-4 relative"
                  >
                    <div className="absolute -left-4.25 top-0 w-8 h-8 rounded-full bg-card flex items-center justify-center">
                      <div className="w-6 h-6 rounded-full bg-destructive/10 text-destructive flex items-center justify-center">
                        <AlertTriangle className="w-3 h-3" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-sm">{rec.title}</h4>
                      <p className="text-xs font-bold text-destructive mt-1">
                        Est. impact: {rec.estimatedImpact}
                      </p>
                      <p className="text-[11px] font-medium text-muted-foreground mt-1.5">
                        {rec.description}
                      </p>
                    </div>
                    <button className="text-[11px] font-bold border border-border rounded px-3 py-1.5 hover:bg-muted transition-colors shrink-0">
                      Resolve
                    </button>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-border shadow-sm flex flex-col">
              <div className="p-5 pb-3 flex justify-between items-center">
                <h3 className="font-bold text-lg">Recommended actions</h3>
              </div>
              <CardContent className="p-5 pt-0 grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
                {recommendedActions.map((rec, i) => (
                  <div
                    key={i}
                    className="border border-border rounded-xl p-4 hover:border-amber-500/30 hover:shadow-sm transition-all bg-card flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[10px] font-bold bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded-full">
                        {rec.priority}
                      </span>
                      <h4 className="font-bold text-sm mt-3 mb-3 leading-snug">
                        {rec.title}
                      </h4>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-muted-foreground">
                          Impact{" "}
                          <b className="text-foreground ml-1">
                            {rec.estimatedImpact}
                          </b>
                        </span>
                      </div>
                    </div>
                    <button className="w-full mt-4 text-xs font-bold border border-border bg-card py-1.5 rounded-lg hover:bg-muted transition-colors">
                      Start task
                    </button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-border shadow-sm">
              <div className="p-5 pb-3">
                <h3 className="font-bold text-lg">Opportunity pipeline</h3>
              </div>
              <CardContent className="p-5 pt-0">
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  <div className="flex flex-col items-center justify-center p-4 border border-border bg-card rounded-xl hover:-translate-y-1 hover:shadow-md transition-all cursor-default">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-2">
                      <DollarSign className="w-4 h-4" />
                    </div>
                    <div className="font-black text-xl">
                      {opportunityPipeline.revenue}
                    </div>
                    <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mt-1">
                      Revenue
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center p-4 border border-border bg-card rounded-xl hover:-translate-y-1 hover:shadow-md transition-all cursor-default">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-500 flex items-center justify-center mb-2">
                      <Rocket className="w-4 h-4" />
                    </div>
                    <div className="font-black text-xl">
                      {opportunityPipeline.traffic}
                    </div>
                    <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mt-1">
                      Traffic
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center p-4 border border-border bg-card rounded-xl hover:-translate-y-1 hover:shadow-md transition-all cursor-default">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-2">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div className="font-black text-xl">
                      {opportunityPipeline.citations}
                    </div>
                    <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mt-1">
                      Citation
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center p-4 border border-border bg-card rounded-xl hover:-translate-y-1 hover:shadow-md transition-all cursor-default">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center mb-2">
                      <Target className="w-4 h-4" />
                    </div>
                    <div className="font-black text-xl">
                      {opportunityPipeline.authority}
                    </div>
                    <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mt-1">
                      Authority
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center p-4 border border-border bg-card rounded-xl hover:-translate-y-1 hover:shadow-md transition-all cursor-default">
                    <div className="w-8 h-8 rounded-lg bg-destructive/10 text-destructive flex items-center justify-center mb-2">
                      <Globe className="w-4 h-4" />
                    </div>
                    <div className="font-black text-xl">
                      {opportunityPipeline.coverage}
                    </div>
                    <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mt-1">
                      AI coverage
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border shadow-sm flex flex-col">
              <div className="p-5 pb-3">
                <h3 className="font-bold text-lg">Competitor snapshot</h3>
              </div>
              <CardContent className="p-5 pt-0">
                <div className="w-full overflow-x-auto border border-border rounded-xl">
                  <table className="w-full text-sm text-left">
                    <thead className="text-[11px] text-muted-foreground bg-muted/40 uppercase tracking-wider border-b border-border">
                      <tr>
                        <th className="px-4 py-3 font-bold rounded-tl-xl">
                          Brand
                        </th>
                        <th className="px-4 py-3 font-bold">Visibility</th>
                        <th className="px-4 py-3 font-bold text-right">
                          Share
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      <tr className="hover:bg-muted/20 transition-colors bg-card">
                        <td className="px-4 py-3 font-bold flex items-center gap-2 whitespace-nowrap">
                          {domainName}{" "}
                          <span className="bg-primary/10 text-primary text-[9px] px-1.5 py-0.5 rounded uppercase tracking-wider border border-primary/20">
                            You
                          </span>
                        </td>
                        <td className="px-4 py-3 min-w-30">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                              <div
                                className="bg-primary h-full"
                                style={{ width: visibilityScore + "%" }}
                              ></div>
                            </div>
                            <span className="font-bold text-xs w-8">
                              {visibilityScore.toFixed(0)}%
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-right font-semibold">
                          41%
                        </td>
                      </tr>
                      {topCompetitors.map((comp, i) => (
                        <tr
                          key={i}
                          className="hover:bg-muted/20 transition-colors bg-card"
                        >
                          <td className="px-4 py-3 font-bold whitespace-nowrap text-muted-foreground">
                            {comp.name}
                          </td>
                          <td className="px-4 py-3 min-w-30">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                                <div
                                  className="bg-muted-foreground h-full"
                                  style={{ width: comp.visibility + "%" }}
                                ></div>
                              </div>
                              <span className="font-bold text-xs text-muted-foreground w-8">
                                {comp.visibility}%
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-right font-semibold text-muted-foreground">
                            {comp.share}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}

      {/* SSE STREAMING MODAL OVERLAY */}
      <AnimatePresence>
        {isAnalyzing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-card border border-border shadow-2xl rounded-2xl p-6 max-w-md w-full"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center relative">
                  <Loader2 className="w-6 h-6 animate-spin" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">AI Analysis Engine</h3>
                  <p className="text-sm text-muted-foreground">
                    Processing database insights...
                  </p>
                </div>
              </div>

              <div className="space-y-3 max-h-60 overflow-y-auto pr-2 mb-2 font-mono text-xs">
                {streamMessages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-start gap-2"
                  >
                    <span className="text-primary mt-0.5">❯</span>
                    <span className="text-muted-foreground">{msg}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
