"use client";

import React, { useEffect, useState, Suspense } from "react";
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
  ChevronRight,
  AlertTriangle,
  Loader2,
  Play,
  Sparkles,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useOrganizationStore } from "@/lib/stores/organizationStore";
import { useAuthStore } from "@/lib/stores/auth-store";
import { getLatestSnapshot, DashboardSnapshot } from "@/lib/api/analysisApi";
import { getFullReport, FullReportData } from "@/lib/api/reportApi";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";

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

    const url = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8088"}/api/Analysis/stream${websiteId ? `?websiteId=${websiteId}` : ""}`;

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
    <div className="space-y-8 max-w-350 mx-auto pb-8 relative font-sans text-slate-900">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-7">
        <div>
          <h1 className="text-[26px] font-semibold tracking-[0.2px] font-space-grotesk">
            Executive war room
          </h1>
          <p className="text-[13.5px] text-slate-500 mt-1">
            Real-time command center for AI visibility operations
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3.5">
          <div className="flex items-center gap-1.5 text-[12px] text-emerald-500 bg-emerald-500/10 px-3 py-1.5 rounded-full font-semibold font-mono tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-[pulse_1.8s_infinite] shadow-[0_0_0_0_rgba(16,185,129,0.7)]" /> LIVE MONITORING
          </div>
          {snapshot && (
            <div className="text-[12px] text-slate-400 font-mono uppercase">
              UPDATED {new Date(snapshot.createdAt).toLocaleTimeString()}
            </div>
          )}
          <div className="text-[13px] bg-white border border-slate-200 px-3 py-1.5 rounded-lg flex items-center gap-2 cursor-pointer">
            {domainName} <ChevronDown className="w-2.5 h-2.5 text-slate-400" />
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
          <Button onClick={startAnalysis} className="shadow-lg shadow-primary/20">
            <Play className="w-4 h-4 fill-current" /> Run Full AI Analysis
          </Button>
        </div>
      ) : (
        <>
          {/* SECTION 1: EXECUTIVE KPIS */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-8"
          >
            <motion.div variants={item}>
              <Card className="relative overflow-hidden h-full">
                <CardContent className="p-4.5">
                  <div className="flex justify-between items-start mb-3.5">
                    <div className="w-8.5 h-8.5 rounded-md bg-emerald-500/10 text-emerald-500 flex items-center justify-center text-base">
                      ◎
                    </div>
                    <Badge className="text-[10.5px] font-semibold bg-emerald-500/10 text-emerald-500 tracking-[0.03em] uppercase">
                      Excellent
                    </Badge>
                  </div>
                  <div className="text-[12.5px] text-slate-500 mb-1.5">
                    Visibility health
                  </div>
                  <div className="font-space-grotesk text-[28px] font-semibold tracking-[-0.3px]">
                    {visibilityScore.toFixed(1)}
                  </div>
                  <div className="text-[12px] font-mono mt-2 flex items-center gap-1.5 text-emerald-500">
                    ▲ 3.2 pts vs last week
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="relative overflow-hidden h-full">
                <CardContent className="p-4.5">
                  <div className="flex justify-between items-start mb-3.5">
                    <div className="w-8.5 h-8.5 rounded-md bg-indigo-500/10 text-indigo-600 flex items-center justify-center text-base">
                      $
                    </div>
                    <Badge className="text-[10.5px] font-semibold bg-indigo-500/10 text-indigo-600 tracking-[0.03em] uppercase">
                      Growing
                    </Badge>
                  </div>
                  <div className="text-[12.5px] text-slate-500 mb-1.5">
                    Revenue impact
                  </div>
                  <div className="font-space-grotesk text-[28px] font-semibold tracking-[-0.3px]">
                    {revenueImpact}
                  </div>
                  <div className="text-[12px] font-mono mt-2 flex items-center gap-1.5 text-emerald-500">
                    ▲ 11% attributed to AI traffic
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="relative overflow-hidden h-full">
                <CardContent className="p-4.5">
                  <div className="flex justify-between items-start mb-3.5">
                    <div className="w-8.5 h-8.5 rounded-md bg-cyan-500/10 text-cyan-500 flex items-center justify-center text-base">
                      ❖
                    </div>
                    <Badge className="text-[10.5px] font-semibold bg-cyan-500/10 text-cyan-500 tracking-[0.03em] uppercase">
                      Stable
                    </Badge>
                  </div>
                  <div className="text-[12.5px] text-slate-500 mb-1.5">
                    Citation health
                  </div>
                  <div className="font-space-grotesk text-[28px] font-semibold tracking-[-0.3px]">
                    {citationHealth.toFixed(0)}
                  </div>
                  <div className="text-[12px] font-mono mt-2 flex items-center gap-1.5 text-slate-500">
                    — 0.4% vs last week
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="relative overflow-hidden h-full">
                <CardContent className="p-4.5">
                  <div className="flex justify-between items-start mb-3.5">
                    <div className="w-8.5 h-8.5 rounded-md bg-amber-500/10 text-amber-500 flex items-center justify-center text-base">
                      ▲
                    </div>
                    <Badge className="text-[10.5px] font-semibold bg-amber-500/10 text-amber-500 tracking-[0.03em] uppercase">
                      Watch
                    </Badge>
                  </div>
                  <div className="text-[12.5px] text-slate-500 mb-1.5">
                    Competitor risk
                  </div>
                  <div className="font-space-grotesk text-[28px] font-semibold tracking-[-0.3px]">
                    {competitorRisk}
                  </div>
                  <div className="text-[12px] font-mono mt-2 flex items-center gap-1.5 text-amber-500">
                    ▲ 2 new threats this week
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* SECTION 2: AI VISIBILITY */}
          <div className="mb-8">
            <div className="flex items-baseline justify-between mb-3.5">
              <h2 className="font-space-grotesk text-[15px] font-semibold tracking-[0.3px] uppercase text-slate-500">
                AI visibility
              </h2>
              <span className="text-[12px] text-slate-400 font-mono">
                7 platforms scanned
              </span>
            </div>
            <Card className="flex-row flex-wrap gap-x-6 gap-y-4 items-center">
              <CardContent className="p-4.5 flex flex-wrap gap-x-6 gap-y-4 items-center w-full">
              <div className="text-center pr-6 border-r border-slate-100">
                <div className="font-space-grotesk text-[34px] font-semibold leading-none">
                  {visibilityScore.toFixed(1)}
                </div>
                <div className="text-[11px] text-slate-400 font-mono mt-1">
                  /100 composite
                </div>
                <div className="text-[11.5px] text-emerald-500 font-semibold mt-1.5">
                  ▲ 3.2 pts
                </div>
              </div>
              <div className="flex-1 min-w-60 grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                  <span className="text-[12.5px] font-medium flex-1">Strong (80%+)</span>
                  <span className="font-mono text-[12px] text-slate-500">2</span>
                </div>
                <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="w-2 h-2 rounded-full bg-cyan-500 shrink-0" />
                  <span className="text-[12.5px] font-medium flex-1">Solid (65–79%)</span>
                  <span className="font-mono text-[12px] text-slate-500">1</span>
                </div>
                <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                  <span className="text-[12.5px] font-medium flex-1">Developing (45–64%)</span>
                  <span className="font-mono text-[12px] text-slate-500">2</span>
                </div>
                <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
                  <span className="text-[12.5px] font-medium flex-1">Weak (under 45%)</span>
                  <span className="font-mono text-[12px] text-slate-500">2</span>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={() => {}} className="self-center">
                View platform breakdown <ChevronRight className="w-3.5 h-3.5" />
              </Button>
              </CardContent>
            </Card>
          </div>

          {/* SECTION 4 + 5: CITATION + AGENT SUMMARIES */}
          <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-4 mb-8">
            <Card>
              <CardContent className="p-4.5">
              <h3 className="font-space-grotesk text-[13.5px] font-semibold uppercase tracking-[0.3px] text-slate-500 mb-3.5">Citation activity</h3>
              <div className="flex gap-5.5 flex-wrap mb-3.5">
                <div>
                  <div className="font-space-grotesk text-[24px] font-semibold leading-none">1,284</div>
                  <div className="text-[11.5px] text-slate-500 mt-1">citations today</div>
                </div>
                <div>
                  <div className="font-space-grotesk text-[24px] font-semibold leading-none">7</div>
                  <div className="text-[11.5px] text-slate-500 mt-1">models active</div>
                </div>
              </div>
              <div className="text-[12.5px] text-slate-400 mb-3.5">Latest: <b className="text-slate-900 font-semibold">ChatGPT</b> cited FAQ — &quot;AI visibility metrics&quot; at 10:35.</div>
              <Button variant="outline" size="sm">
                Open Citation Intelligence <ChevronRight className="w-3.5 h-3.5" />
              </Button>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4.5">
              <h3 className="font-space-grotesk text-[13.5px] font-semibold uppercase tracking-[0.3px] text-slate-500 mb-3.5">Agent operations</h3>
              <div className="flex gap-5.5 flex-wrap mb-3.5">
                <div>
                  <div className="font-space-grotesk text-[24px] font-semibold leading-none">3</div>
                  <div className="text-[11.5px] text-slate-500 mt-1">running</div>
                </div>
                <div>
                  <div className="font-space-grotesk text-[24px] font-semibold leading-none">1</div>
                  <div className="text-[11.5px] text-slate-500 mt-1">completed</div>
                </div>
                <div>
                  <div className="font-space-grotesk text-[24px] font-semibold leading-none">1</div>
                  <div className="text-[11.5px] text-slate-500 mt-1">idle</div>
                </div>
              </div>
              <div className="text-[12.5px] text-slate-400 mb-3.5">Content, Citation, Authority, Technical and Revenue agents are configured for this workspace.</div>
              <Button variant="outline" size="sm">
                Open Citationly agents <ChevronRight className="w-3.5 h-3.5" />
              </Button>
              </CardContent>
            </Card>
          </div>

          {/* SECTION 6: EXECUTIVE ALERTS */}
          <div className="mb-8">
            <div className="flex items-baseline justify-between mb-3.5">
              <h2 className="font-space-grotesk text-[15px] font-semibold tracking-[0.3px] uppercase text-slate-500">
                Executive alerts
              </h2>
              <span className="text-[12px] text-slate-400 font-mono">
                {executiveAlerts.length} active
              </span>
            </div>
            <div className="flex flex-col gap-2.5">
              {executiveAlerts.map((rec, i) => (
                <Card key={i} className="p-3.5">
                  <div className="grid grid-cols-[4px_auto_1fr_auto] gap-3.5 items-stretch">
                  <div className={`rounded ${i === 1 ? 'bg-amber-500' : 'bg-red-500'}`}></div>
                  <div className={`w-7.5 h-7.5 rounded-lg flex items-center justify-center text-[14px] self-start ${i === 1 ? 'bg-amber-500/10 text-amber-500' : 'bg-red-500/10 text-red-500'}`}>
                    {i === 1 ? '▲' : '!'}
                  </div>
                  <div className="flex flex-col gap-0.75">
                    <div className="text-[13.5px] font-semibold">{rec.title}</div>
                    <div className="text-[12px] text-slate-500">Est. impact: {rec.estimatedImpact}</div>
                    <div className="text-[11.5px] text-slate-400 italic">Suggested: {rec.description}</div>
                  </div>
                  <Button variant="outline" size="sm" className="self-center">
                    Resolve
                  </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* SECTION 7: RECOMMENDED ACTIONS */}
          <div className="mb-8">
            <div className="flex items-baseline justify-between mb-3.5">
              <h2 className="font-space-grotesk text-[15px] font-semibold tracking-[0.3px] uppercase text-slate-500">
                Recommended actions
              </h2>
              <span className="text-[12px] text-slate-400 font-mono">
                AI-generated
              </span>
            </div>
            <Card>
              <CardContent className="p-4.5 flex items-center justify-between gap-4 flex-wrap">
              <div>
                <div className="text-[14px] font-semibold">{recommendedActions.length} AI-recommended actions ready</div>
                <div className="text-[12.5px] text-slate-500 mt-1">Top priority: Improve Gemini citation coverage · +14% impact</div>
              </div>
              <Button>
                <Sparkles className="w-4 h-4" /> Review with Assistant
              </Button>
              </CardContent>
            </Card>
          </div>

          {/* SECTION 8: OPPORTUNITY PIPELINE */}
          <div className="mb-8">
            <div className="flex items-baseline justify-between mb-3.5">
              <h2 className="font-space-grotesk text-[15px] font-semibold tracking-[0.3px] uppercase text-slate-500">
                Opportunity pipeline
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <Card className="text-center hover:-translate-y-0.5 hover:shadow-sm transition-all cursor-default p-4">
                <div className="w-9 h-9 rounded-[10px] mx-auto mb-2.5 bg-emerald-500/10 text-emerald-500 flex items-center justify-center text-[16px]">$</div>
                <div className="font-space-grotesk text-[20px] font-semibold">{opportunityPipeline.revenue}</div>
                <div className="text-[11.5px] text-slate-500 mt-1">Revenue</div>
              </Card>
              <Card className="text-center hover:-translate-y-0.5 hover:shadow-sm transition-all cursor-default p-4">
                <div className="w-9 h-9 rounded-[10px] mx-auto mb-2.5 bg-cyan-500/10 text-cyan-500 flex items-center justify-center text-[16px]">↗</div>
                <div className="font-space-grotesk text-[20px] font-semibold">{opportunityPipeline.traffic}</div>
                <div className="text-[11.5px] text-slate-500 mt-1">Traffic</div>
              </Card>
              <Card className="text-center hover:-translate-y-0.5 hover:shadow-sm transition-all cursor-default p-4">
                <div className="w-9 h-9 rounded-[10px] mx-auto mb-2.5 bg-indigo-500/10 text-indigo-600 flex items-center justify-center text-[16px]">❝</div>
                <div className="font-space-grotesk text-[20px] font-semibold">{opportunityPipeline.citations}</div>
                <div className="text-[11.5px] text-slate-500 mt-1">Citation</div>
              </Card>
              <Card className="text-center hover:-translate-y-0.5 hover:shadow-sm transition-all cursor-default p-4">
                <div className="w-9 h-9 rounded-[10px] mx-auto mb-2.5 bg-amber-500/10 text-amber-500 flex items-center justify-center text-[16px]">◆</div>
                <div className="font-space-grotesk text-[20px] font-semibold">{opportunityPipeline.authority}</div>
                <div className="text-[11.5px] text-slate-500 mt-1">Authority</div>
              </Card>
              <Card className="text-center hover:-translate-y-0.5 hover:shadow-sm transition-all cursor-default p-4">
                <div className="w-9 h-9 rounded-[10px] mx-auto mb-2.5 bg-red-500/10 text-red-500 flex items-center justify-center text-[16px]">▣</div>
                <div className="font-space-grotesk text-[20px] font-semibold">{opportunityPipeline.coverage}</div>
                <div className="text-[11.5px] text-slate-500 mt-1">AI coverage</div>
              </Card>
            </div>
          </div>

          {/* SECTION 9: COMPETITOR SNAPSHOT */}
          <div className="mb-8">
            <div className="flex items-baseline justify-between mb-3.5">
              <h2 className="font-space-grotesk text-[15px] font-semibold tracking-[0.3px] uppercase text-slate-500">
                Competitor snapshot
              </h2>
              <span className="text-[12px] text-slate-400 font-mono">
                Share of voice
              </span>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-[11px] uppercase tracking-[0.04em] text-slate-400 font-semibold px-3 pb-2.5">Brand</TableHead>
                  <TableHead className="text-[11px] uppercase tracking-[0.04em] text-slate-400 font-semibold px-3 pb-2.5">Visibility</TableHead>
                  <TableHead className="text-[11px] uppercase tracking-[0.04em] text-slate-400 font-semibold px-3 pb-2.5">Share</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="p-3 text-[13px]">
                    <div className="font-semibold flex items-center gap-2">
                      {domainName} <Badge className="text-[10px] bg-indigo-50 text-indigo-600 font-semibold">You</Badge>
                    </div>
                  </TableCell>
                  <TableCell className="p-3 text-[13px]">
                    <div className="h-1.25 rounded bg-slate-200 w-22.5 overflow-hidden inline-block align-middle mr-2">
                      <div className="h-full rounded bg-indigo-600" style={{ width: `${visibilityScore}%` }}></div>
                    </div>
                    {visibilityScore.toFixed(1)}
                  </TableCell>
                  <TableCell className="p-3 text-[13px]">41%</TableCell>
                </TableRow>
                {topCompetitors.map((comp, i) => (
                  <TableRow key={i}>
                    <TableCell className="p-3 text-[13px]">
                      <div className="font-semibold flex items-center gap-2">{comp.name}</div>
                    </TableCell>
                    <TableCell className="p-3 text-[13px]">
                      <div className="h-1.25 rounded bg-slate-200 w-22.5 overflow-hidden inline-block align-middle mr-2">
                        <div className="h-full rounded bg-slate-400" style={{ width: `${comp.visibility}%` }}></div>
                      </div>
                      {comp.visibility.toFixed(1)}
                    </TableCell>
                    <TableCell className="p-3 text-[13px]">{comp.share}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
