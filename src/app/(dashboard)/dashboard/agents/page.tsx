"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import Link from "next/link"
import {
  Activity,
  ArrowRight,
  BarChart3,
  BellRing,
  Bot,
  CalendarClock,
  CheckCircle2,
  CircleAlert,
  Clock3,
  FileEdit,
  History,
  PauseCircle,
  PlayCircle,
  RefreshCw,
  RotateCcw,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  Target,
  XCircle,
} from "lucide-react"
import {
  cancelAgentRun,
  assignAgentRecommendation,
  decideAgentApproval,
  getAgentActivity,
  getAgentApprovals,
  getAgentContentExecutions,
  getAgentImpactMeasurements,
  getAgentOverview,
  getAgentRecommendations,
  getAgentRuns,
  getAgentSchedules,
  getAgentStrategyPreference,
  requestAgentContentPublish,
  processDueAgentImpactMeasurements,
  retryAgentRun,
  updateAgentRecommendationStatus,
  updateAgentSchedule,
  updateAgentSettings,
  updateAgentStrategyPreference,
  type AgentActivityItem,
  type AgentApproval,
  type AgentContentExecution,
  type AgentImpactMeasurement,
  type AgentRecommendation,
  type AgentOverviewItem,
  type AgentOverviewResponse,
  type AgentRun,
  type AgentSchedule,
  type AgentStrategyPreference,
} from "@/lib/api/agentsApi"
import { getTeamMembers, type TeamMember } from "@/lib/api/teamApi"
import { toast } from "@/lib/toast"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { EmptyState } from "@/components/ui/empty-state"
import { SectionLoader } from "@/components/ui/loader"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type AgentCenterData = {
  overview: AgentOverviewResponse | null
  activity: AgentActivityItem[]
  approvals: AgentApproval[]
  schedules: AgentSchedule[]
  runs: AgentRun[]
  recommendations: AgentRecommendation[]
  contentExecutions: AgentContentExecution[]
  impactMeasurements: AgentImpactMeasurement[]
  teamMembers: TeamMember[]
  strategyPreference: AgentStrategyPreference | null
  failedSources: string[]
}

const EMPTY_DATA: AgentCenterData = {
  overview: null,
  activity: [],
  approvals: [],
  schedules: [],
  runs: [],
  recommendations: [],
  contentExecutions: [],
  impactMeasurements: [],
  teamMembers: [],
  strategyPreference: null,
  failedSources: [],
}

const workflow = [
  { label: "Monitor", icon: BellRing },
  { label: "Explain", icon: SearchCheck },
  { label: "Recommend", icon: Target },
  { label: "Execute", icon: FileEdit },
  { label: "Measure", icon: BarChart3 },
]

const agentPresentation: Record<string, { icon: typeof Bot; href: string; action: string }> = {
  "visibility-monitor": { icon: BellRing, href: "/dashboard/visibility-radar", action: "Open visibility" },
  "intelligence-analyst": { icon: SearchCheck, href: "/dashboard/assistant", action: "Ask Citationly" },
  "geo-strategy": { icon: Target, href: "/dashboard/opportunity-finder", action: "Review opportunities" },
  "content-execution": { icon: FileEdit, href: "/dashboard/publishing-center", action: "Open publishing" },
  "impact-reporting": { icon: BarChart3, href: "/dashboard/performance-center", action: "Open performance" },
}

const activeRunStatuses = new Set(["Queued", "Running", "WaitingForApproval", "CancellationRequested"])

function formatDate(value?: string | null): string {
  if (!value) return "Not yet"
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value))
}

function formatCost(microUsd: number): string {
  return new Intl.NumberFormat(undefined, { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 4 })
    .format(microUsd / 1_000_000)
}

function statusClass(status: string): string {
  if (["Failed", "PublishFailed", "Regressed", "Critical"].includes(status)) return "border-red-200 bg-red-50 text-red-700"
  if (["WaitingForApproval", "WaitingForData", "AwaitingApproval", "AwaitingPublishApproval", "NeedsEvidence", "NeedsBaseline", "NeedsAttention", "Pending", "Inconclusive", "High", "Medium", "Warning"].includes(status)) return "border-amber-200 bg-amber-50 text-amber-700"
  if (["Disabled", "Cancelled", "Expired", "Rejected", "Dismissed", "Neutral"].includes(status)) return "border-slate-200 bg-slate-50 text-slate-600"
  if (["Running", "Queued", "CancellationRequested", "Assigned", "InProgress"].includes(status)) return "border-blue-200 bg-blue-50 text-blue-700"
  return "border-emerald-200 bg-emerald-50 text-emerald-700"
}

function signalText(agent: AgentOverviewItem): string {
  if (agent.pendingApprovalCount > 0) return `${agent.pendingApprovalCount} approval${agent.pendingApprovalCount === 1 ? "" : "s"} waiting`
  if (agent.activeRunCount > 0) return `${agent.activeRunCount} active run${agent.activeRunCount === 1 ? "" : "s"}`
  if (agent.openFindingCount > 0) return `${agent.openFindingCount} open finding${agent.openFindingCount === 1 ? "" : "s"}`
  if (agent.lastRunStatus) return `Last run: ${agent.lastRunStatus}`
  return "No runs yet"
}

function activityIcon(kind: AgentActivityItem["kind"]) {
  if (kind === "Finding") return CircleAlert
  if (kind === "Approval") return ShieldCheck
  return Activity
}

function findingEvidence(data: AgentActivityItem["data"]) {
  if (!data || Array.isArray(data) || typeof data !== "object") return null

  const record = data as Record<string, unknown>
  const previous = record.previous
  const current = record.current
  if (!previous || Array.isArray(previous) || typeof previous !== "object") return null
  if (!current || Array.isArray(current) || typeof current !== "object") return null

  const previousRecord = previous as Record<string, unknown>
  const currentRecord = current as Record<string, unknown>
  const previousValue = previousRecord.value
  const currentValue = currentRecord.value
  if ((typeof previousValue !== "number" && typeof previousValue !== "string") ||
      (typeof currentValue !== "number" && typeof currentValue !== "string")) return null

  return {
    metric: typeof record.metric === "string" ? record.metric : "measured signal",
    previousValue,
    currentValue,
    previousDate: typeof previousRecord.observedAt === "string" ? previousRecord.observedAt : null,
    currentDate: typeof currentRecord.observedAt === "string" ? currentRecord.observedAt : null,
    rule: typeof record.deterministicRule === "string" ? record.deterministicRule : null,
    actionUrl: typeof record.actionUrl === "string" ? record.actionUrl : null,
  }
}

export default function AgentsPage() {
  const [data, setData] = useState<AgentCenterData>(EMPTY_DATA)
  const [isLoading, setIsLoading] = useState(true)
  const [busyKey, setBusyKey] = useState<string | null>(null)

  const loadAgentCenter = useCallback(async () => {
    const results = await Promise.allSettled([
      getAgentOverview(),
      getAgentActivity(100),
      getAgentApprovals(undefined, 100),
      getAgentSchedules(),
      getAgentRuns(100),
      getAgentRecommendations(undefined, 100),
      getTeamMembers(),
      getAgentStrategyPreference(),
      getAgentContentExecutions(undefined, 100),
      getAgentImpactMeasurements(undefined, 100),
    ])
    const sourceNames = ["overview", "activity", "approvals", "schedules", "run history", "recommendations", "team members", "strategy preference", "content executions", "impact measurements"]
    const failedSources = results
      .map((result, index) => result.status === "rejected" ? sourceNames[index] : null)
      .filter((name): name is string => Boolean(name))

    setData({
      overview: results[0].status === "fulfilled" ? results[0].value : null,
      activity: results[1].status === "fulfilled" ? results[1].value : [],
      approvals: results[2].status === "fulfilled" ? results[2].value : [],
      schedules: results[3].status === "fulfilled" ? results[3].value : [],
      runs: results[4].status === "fulfilled" ? results[4].value : [],
      recommendations: results[5].status === "fulfilled" ? results[5].value : [],
      teamMembers: results[6].status === "fulfilled" ? results[6].value : [],
      strategyPreference: results[7].status === "fulfilled" ? results[7].value : null,
      contentExecutions: results[8].status === "fulfilled" ? results[8].value : [],
      impactMeasurements: results[9].status === "fulfilled" ? results[9].value : [],
      failedSources,
    })
    setIsLoading(false)
  }, [])

  useEffect(() => {
    // State updates happen after the control-plane API requests resolve.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadAgentCenter()
  }, [loadAgentCenter])

  const refreshAgentCenter = () => {
    setIsLoading(true)
    void loadAgentCenter()
  }

  const pendingApprovals = useMemo(
    () => data.approvals.filter((approval) => approval.status === "Pending"),
    [data.approvals],
  )

  const handleApproval = async (approval: AgentApproval, decision: "Approved" | "Rejected") => {
    let note = ""
    if (decision === "Approved" && approval.actionType === "content.publish") {
      const confirmed = window.confirm(`Approve “${approval.title}”? This will publish the reviewed draft to the connected live WordPress site.`)
      if (!confirmed) return
    } else if (decision === "Approved") {
      const confirmed = window.confirm(`Approve “${approval.title}”? This allows the associated agent run to continue.`)
      if (!confirmed) return
    } else {
      const reason = window.prompt(`Why are you rejecting “${approval.title}”?`, "")
      if (reason === null) return
      note = reason.trim()
    }

    setBusyKey(`approval:${approval.id}`)
    try {
      await decideAgentApproval(approval.id, decision, note)
      toast.success(decision === "Approved" ? "Agent action approved" : "Agent action rejected")
      await loadAgentCenter()
    } catch {
      toast.error("Could not update this approval")
    } finally {
      setBusyKey(null)
    }
  }

  const handleScheduleToggle = async (schedule: AgentSchedule) => {
    if (!schedule.isEnabled) {
      const confirmed = window.confirm(`Enable ${schedule.agentKey} automation for “${schedule.triggerExpression}”?`)
      if (!confirmed) return
    }

    setBusyKey(`schedule:${schedule.id}`)
    try {
      await updateAgentSchedule(schedule.agentKey, {
        triggerType: schedule.triggerType,
        triggerExpression: schedule.triggerExpression,
        timeZone: schedule.timeZone,
        isEnabled: !schedule.isEnabled,
        nextRunAt: schedule.nextRunAt,
      })
      toast.success(schedule.isEnabled ? "Agent trigger paused" : "Agent trigger enabled")
      await loadAgentCenter()
    } catch {
      toast.error("Could not update this trigger")
    } finally {
      setBusyKey(null)
    }
  }

  const handleAgentToggle = async (agent: AgentOverviewItem) => {
    if (!agent.isEnabled) {
      const confirmed = window.confirm(`Enable ${agent.name}? Its configured triggers will be allowed to create runs.`)
      if (!confirmed) return
    }

    setBusyKey(`agent:${agent.agentKey}`)
    try {
      await updateAgentSettings(agent.agentKey, {
        isEnabled: !agent.isEnabled,
        autonomyLevel: agent.autonomyLevel,
        maxRunsPerDay: agent.maxRunsPerDay,
        maxCostMicroUsdPerRun: agent.maxCostMicroUsdPerRun,
        allowedActions: agent.allowedActions,
      })
      toast.success(agent.isEnabled ? "Agent disabled" : "Agent enabled")
      await loadAgentCenter()
    } catch {
      toast.error("Could not update this agent")
    } finally {
      setBusyKey(null)
    }
  }

  const handleRunAction = async (run: AgentRun, action: "cancel" | "retry") => {
    if (action === "retry") {
      const confirmed = window.confirm("Retry this run? The retry will count against the workspace agent-run quota.")
      if (!confirmed) return
    }

    setBusyKey(`run:${run.id}`)
    try {
      if (action === "retry") await retryAgentRun(run.id)
      else await cancelAgentRun(run.id)
      toast.success(action === "retry" ? "Agent run queued for retry" : "Agent run cancellation requested")
      await loadAgentCenter()
    } catch {
      toast.error(action === "retry" ? "Could not retry this run" : "Could not cancel this run")
    } finally {
      setBusyKey(null)
    }
  }

  const handleRecommendationDecision = async (recommendation: AgentRecommendation, decision: "Approved" | "Rejected") => {
    if (!recommendation.approvalId) {
      toast.error("This recommendation has no active approval request")
      return
    }

    const approval = data.approvals.find((item) => item.id === recommendation.approvalId)
    if (!approval || approval.status !== "Pending") {
      toast.error("This approval is no longer pending")
      return
    }
    await handleApproval(approval, decision)
  }

  const handleRecommendationAssignment = async (recommendation: AgentRecommendation, userId: string) => {
    setBusyKey(`recommendation:${recommendation.id}`)
    try {
      await assignAgentRecommendation(recommendation.id, userId || null)
      toast.success(userId ? "Recommendation assigned" : "Recommendation unassigned")
      await loadAgentCenter()
    } catch {
      toast.error("Could not update this assignment")
    } finally {
      setBusyKey(null)
    }
  }

  const handleRecommendationStatus = async (recommendation: AgentRecommendation, status: "InProgress" | "Implemented" | "Dismissed") => {
    let note = ""
    if (status === "Dismissed") {
      const reason = window.prompt("Why are you dismissing this approved recommendation?", "")
      if (reason === null) return
      note = reason.trim()
    } else {
      const confirmed = window.confirm(status === "Implemented"
        ? "Mark this recommendation implemented? This will make it eligible for impact measurement."
        : "Start work on this recommendation?")
      if (!confirmed) return
    }

    setBusyKey(`recommendation:${recommendation.id}`)
    try {
      await updateAgentRecommendationStatus(recommendation.id, status, note)
      toast.success(status === "Implemented" ? "Recommendation marked implemented" : status === "InProgress" ? "Recommendation started" : "Recommendation dismissed")
      await loadAgentCenter()
    } catch {
      toast.error("Could not update this recommendation")
    } finally {
      setBusyKey(null)
    }
  }

  const handleStrategyGoal = async (primaryGoal: AgentStrategyPreference["primaryGoal"]) => {
    setBusyKey("strategy-goal")
    try {
      await updateAgentStrategyPreference(primaryGoal)
      toast.success("Strategy goal updated for future recommendations")
      await loadAgentCenter()
    } catch {
      toast.error("Could not update the strategy goal")
    } finally {
      setBusyKey(null)
    }
  }

  const handlePublishRequest = async (execution: AgentContentExecution) => {
    const confirmed = window.confirm("Submit this reviewed draft for a separate manager approval before WordPress publishing?")
    if (!confirmed) return

    setBusyKey(`content:${execution.id}`)
    try {
      await requestAgentContentPublish(execution.id)
      toast.success("Live publishing approval requested")
      await loadAgentCenter()
    } catch {
      toast.error("This draft could not be submitted for publishing approval")
    } finally {
      setBusyKey(null)
    }
  }

  const handleProcessDueImpacts = async () => {
    setBusyKey("impact:process")
    try {
      const result = await processDueAgentImpactMeasurements()
      toast.success(result.measured > 0
        ? `Measured ${result.measured} due recommendation${result.measured === 1 ? "" : "s"}`
        : "No due measurements have a new follow-up scan yet")
      await loadAgentCenter()
    } catch {
      toast.error("Could not process due impact measurements")
    } finally {
      setBusyKey(null)
    }
  }

  const totals = data.overview?.totals ?? { activeRuns: 0, openFindings: 0, pendingApprovals: 0, failedAgents: 0 }
  const activeRecommendations = data.recommendations.filter((item) => !["Rejected", "Implemented", "Dismissed"].includes(item.status))

  return (
    <div className="dashboard-page space-y-7">
      <header className="flex flex-col gap-5 border-b border-border/60 pb-7 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            <Bot className="size-4 text-primary" /> Agent operations
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Agent Center</h1>
          <p className="text-sm leading-6 text-muted-foreground">
            Monitor agent runs, review evidence, control schedules, approve consequential actions, and inspect costs and failures from one organization-scoped control plane.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={refreshAgentCenter} disabled={isLoading}>
            <RefreshCw className={isLoading ? "animate-spin" : ""} /> Refresh
          </Button>
          <Button render={<Link href="/dashboard/assistant" />}>
            <Sparkles /> Ask Citationly
          </Button>
        </div>
      </header>

      <Card className="border-primary/15 bg-linear-to-br from-primary/[0.07] via-card to-card">
        <CardContent className="py-5">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <div className="flex items-center gap-2 font-semibold">
                <ShieldCheck className="size-5 text-primary" /> {data.overview?.autonomyLevel ?? "Assist"} mode
              </div>
              <p className="mt-1 text-sm text-muted-foreground">Publishing and other external actions remain approval-gated, including in Autopilot.</p>
            </div>
            <div className="flex min-w-0 items-center gap-1 overflow-x-auto pb-1 xl:pb-0">
              {workflow.map(({ label, icon: Icon }, index) => (
                <div key={label} className="flex items-center">
                  <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-xs font-semibold shadow-xs">
                    <Icon className="size-3.5 text-primary" /> {label}
                  </div>
                  {index < workflow.length - 1 && <ArrowRight className="mx-1 size-4 shrink-0 text-muted-foreground" />}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {data.failedSources.length > 0 && !isLoading && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Some control-plane sources could not be loaded: {data.failedSources.join(", ")}. Available data is shown below.
        </div>
      )}

      {isLoading ? (
        <SectionLoader className="min-h-80" label="Loading agent control plane..." />
      ) : (
        <Tabs defaultValue="overview" className="gap-5">
          <TabsList variant="line" className="max-w-full overflow-x-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations {activeRecommendations.length > 0 && `(${activeRecommendations.length})`}</TabsTrigger>
            <TabsTrigger value="content">Content work {data.contentExecutions.length > 0 && `(${data.contentExecutions.length})`}</TabsTrigger>
            <TabsTrigger value="impact">Impact {data.impactMeasurements.length > 0 && `(${data.impactMeasurements.length})`}</TabsTrigger>
            <TabsTrigger value="approvals">Approvals {pendingApprovals.length > 0 && `(${pendingApprovals.length})`}</TabsTrigger>
            <TabsTrigger value="schedules">Schedules</TabsTrigger>
            <TabsTrigger value="history">Run history</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-5">
            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[
                { label: "Active runs", value: totals.activeRuns, detail: "Queued, running, or awaiting approval" },
                { label: "Open findings", value: totals.openFindings, detail: "Evidence-backed items requiring attention" },
                { label: "Pending approvals", value: totals.pendingApprovals, detail: "Actions waiting for an authorized user" },
                { label: "Failed agents", value: totals.failedAgents, detail: "Agents whose latest run failed" },
              ].map((metric) => (
                <Card key={metric.label} size="sm">
                  <CardContent>
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{metric.label}</p>
                    <p className="mt-2 text-2xl font-bold">{metric.value}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{metric.detail}</p>
                  </CardContent>
                </Card>
              ))}
            </section>

            {!data.overview ? (
              <EmptyState icon={<Bot className="size-7" />} title="Agent control plane unavailable" description="The API could not load agent definitions and workspace settings." />
            ) : (
              <section className="grid gap-4 lg:grid-cols-2">
                {data.overview.agents.map((agent) => {
                  const presentation = agentPresentation[agent.agentKey] ?? { icon: Bot, href: "/dashboard/assistant", action: "Open Assistant" }
                  const Icon = presentation.icon
                  return (
                    <Card key={agent.agentKey} className="transition-colors hover:border-primary/25">
                      <CardHeader className="grid-cols-[1fr_auto]">
                        <div className="flex gap-3">
                          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"><Icon className="size-5" /></div>
                          <div>
                            <div className="mb-1 flex flex-wrap items-center gap-2">
                              <CardTitle>{agent.name}</CardTitle>
                              <Badge variant="outline" className={statusClass(agent.status)}>{agent.status}</Badge>
                            </div>
                            <CardDescription>{agent.stage} · v{agent.version}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm leading-6 text-muted-foreground">{agent.description}</p>
                        <div className="grid gap-3 rounded-lg border border-border bg-muted/25 p-3 sm:grid-cols-2">
                          <div>
                            <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Control-plane signal</p>
                            <p className="mt-1 text-sm font-medium">{signalText(agent)}</p>
                          </div>
                          <div>
                            <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Guardrails</p>
                            <p className="mt-1 text-sm font-medium">{agent.autonomyLevel} · {agent.maxRunsPerDay}/day · {formatCost(agent.maxCostMicroUsdPerRun)}/run</p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {agent.capabilities.map((capability) => <Badge key={capability} variant="secondary">{capability}</Badge>)}
                        </div>
                        <div className="flex flex-col gap-3 border-t border-border pt-3 sm:flex-row sm:items-center sm:justify-between">
                          <div className="text-xs text-muted-foreground">
                            <p>Last run: {formatDate(agent.lastRunAt)}</p>
                            {agent.nextRunAt && <p>Next run: {formatDate(agent.nextRunAt)}</p>}
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              disabled={busyKey === `agent:${agent.agentKey}`}
                              onClick={() => void handleAgentToggle(agent)}
                            >
                              {agent.isEnabled ? <PauseCircle /> : <PlayCircle />}{agent.isEnabled ? "Disable" : "Enable"}
                            </Button>
                            <Link href={presentation.href} className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
                              {presentation.action} <ArrowRight className="size-3.5" />
                            </Link>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </section>
            )}
          </TabsContent>

          <TabsContent value="activity">
            {data.activity.length === 0 ? (
              <EmptyState icon={<Activity className="size-7" />} title="No persisted agent activity yet" description="Run events, findings, and approval decisions will appear here without synthetic customer data." />
            ) : (
              <Card>
                <CardHeader><CardTitle>Agent activity</CardTitle><CardDescription>Evidence-linked findings, run events, and approval decisions across this workspace.</CardDescription></CardHeader>
                <CardContent className="divide-y divide-border">
                  {data.activity.map((item) => {
                    const Icon = activityIcon(item.kind)
                    const evidence = item.kind === "Finding" ? findingEvidence(item.data) : null
                    return (
                      <div key={`${item.kind}:${item.id}`} className="flex gap-3 py-4 first:pt-0 last:pb-0">
                        <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground"><Icon className="size-4" /></div>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2"><p className="font-semibold">{item.title}</p><Badge variant="outline" className={statusClass(item.status)}>{item.status}</Badge></div>
                          {item.message && <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.message}</p>}
                          {evidence && (
                            <div className="mt-3 rounded-lg border border-border bg-muted/40 p-3 text-xs text-muted-foreground">
                              <p><span className="font-semibold text-foreground">Evidence:</span> {evidence.metric} moved from {evidence.previousValue} to {evidence.currentValue}{evidence.previousDate && evidence.currentDate ? ` (${evidence.previousDate} to ${evidence.currentDate})` : ""}.</p>
                              <div className="mt-2 flex flex-wrap items-center gap-3">
                                {evidence.rule && <span>Rule: {evidence.rule}</span>}
                                {evidence.actionUrl && <Link href={evidence.actionUrl} className="font-semibold text-primary hover:underline">Open source dashboard</Link>}
                              </div>
                            </div>
                          )}
                          <p className="mt-2 text-xs text-muted-foreground">{item.agentKey} · {item.kind} · {formatDate(item.occurredAt)}</p>
                        </div>
                      </div>
                    )
                  })}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-4">
            <Card>
              <CardContent className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold">Primary strategy goal</p>
                  <p className="mt-1 text-sm text-muted-foreground">This client-selected goal contributes to the deterministic priority score for future recommendations.</p>
                </div>
                <select
                  aria-label="Primary strategy goal"
                  value={data.strategyPreference?.primaryGoal ?? "Balanced"}
                  disabled={busyKey === "strategy-goal" || !data.strategyPreference}
                  onChange={(event) => void handleStrategyGoal(event.target.value as AgentStrategyPreference["primaryGoal"])}
                  className="h-9 rounded-lg border border-input bg-transparent px-3 text-sm"
                >
                  <option value="Balanced">Balanced growth</option>
                  <option value="GrowVisibility">Grow AI visibility</option>
                  <option value="ImproveCitations">Improve citations</option>
                  <option value="DefendCompetitors">Defend against competitors</option>
                  <option value="ImproveBrandAccuracy">Improve brand accuracy</option>
                </select>
              </CardContent>
            </Card>
            {data.recommendations.length === 0 ? (
              <EmptyState icon={<Target className="size-7" />} title="No GEO recommendations yet" description="High-confidence analyst findings will be converted into deduplicated, evidence-linked recommendations here." />
            ) : (
              data.recommendations.map((recommendation) => {
                const isBusy = busyKey === `recommendation:${recommendation.id}` || busyKey === `approval:${recommendation.approvalId}`
                return (
                  <Card key={recommendation.id}>
                    <CardHeader className="grid-cols-[1fr_auto] gap-4">
                      <div>
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                          <Badge variant="outline">{recommendation.category}</Badge>
                          <Badge variant="outline" className={statusClass(recommendation.status)}>{recommendation.status}</Badge>
                          <Badge variant="secondary">Priority {recommendation.priorityScore.toFixed(1)}</Badge>
                        </div>
                        <CardTitle>{recommendation.title}</CardTitle>
                        <CardDescription className="mt-2 leading-6">{recommendation.summary}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
                        {[
                          ["Impact", recommendation.impactScore],
                          ["Confidence", Math.round(recommendation.confidence * 100)],
                          ["Effort", recommendation.effortScore],
                          ["Urgency", recommendation.urgencyScore],
                          ["Goal fit", recommendation.goalAlignmentScore],
                        ].map(([label, value]) => (
                          <div key={label} className="rounded-lg border border-border bg-muted/25 p-3">
                            <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{label}</p>
                            <p className="mt-1 text-lg font-bold">{value}/100</p>
                          </div>
                        ))}
                      </div>

                      <div className="grid gap-4 lg:grid-cols-2">
                        <div className="rounded-lg border border-border p-4">
                          <p className="text-sm font-semibold">Action plan</p>
                          <ol className="mt-3 space-y-2 text-sm leading-6 text-muted-foreground">
                            {recommendation.actionPlan.map((step, index) => <li key={`${recommendation.id}:step:${index}`}>{index + 1}. {step}</li>)}
                          </ol>
                        </div>
                        <div className="rounded-lg border border-border p-4 text-sm">
                          <p className="font-semibold">Expected impact</p>
                          <p className="mt-2 leading-6 text-muted-foreground">{recommendation.expectedImpact}</p>
                          <p className="mt-3 text-xs text-muted-foreground">Target: {recommendation.targetType} / {recommendation.targetKey}</p>
                          <p className="mt-1 text-xs text-muted-foreground">Evidence finding: {recommendation.findingId}</p>
                          {recommendation.assignedToName && <p className="mt-2 font-medium">Assigned to {recommendation.assignedToName}</p>}
                          {recommendation.rejectionReason && <p className="mt-2 text-red-700">Reason: {recommendation.rejectionReason}</p>}
                        </div>
                      </div>

                      <div className="flex flex-col gap-3 border-t border-border pt-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="text-xs text-muted-foreground">Updated {formatDate(recommendation.updatedAt)} · {recommendation.recommendationType}</div>
                        <div className="flex flex-wrap items-center gap-2">
                          {recommendation.status === "AwaitingApproval" && (
                            <>
                              <Button size="sm" variant="outline" disabled={isBusy || !recommendation.approvalId} onClick={() => void handleRecommendationDecision(recommendation, "Rejected")}><XCircle /> Reject</Button>
                              <Button size="sm" disabled={isBusy || !recommendation.approvalId} onClick={() => void handleRecommendationDecision(recommendation, "Approved")}><CheckCircle2 /> Approve</Button>
                            </>
                          )}
                          {["Approved", "Assigned"].includes(recommendation.status) && (
                            <>
                              <select
                                aria-label={`Assign ${recommendation.title}`}
                                value={recommendation.assignedToUserId ?? ""}
                                disabled={isBusy}
                                onChange={(event) => void handleRecommendationAssignment(recommendation, event.target.value)}
                                className="h-8 rounded-lg border border-input bg-transparent px-2.5 text-sm"
                              >
                                <option value="">Unassigned</option>
                                {data.teamMembers.map((member) => <option key={member.id} value={member.id}>{member.displayName || member.email}</option>)}
                              </select>
                              <Button size="sm" disabled={isBusy} onClick={() => void handleRecommendationStatus(recommendation, "InProgress")}><PlayCircle /> Start work</Button>
                              <Button size="sm" variant="outline" disabled={isBusy} onClick={() => void handleRecommendationStatus(recommendation, "Dismissed")}><XCircle /> Dismiss</Button>
                            </>
                          )}
                          {recommendation.status === "InProgress" && (
                            <>
                              <Button size="sm" disabled={isBusy} onClick={() => void handleRecommendationStatus(recommendation, "Implemented")}><CheckCircle2 /> Mark implemented</Button>
                              <Button size="sm" variant="outline" disabled={isBusy} onClick={() => void handleRecommendationStatus(recommendation, "Dismissed")}><XCircle /> Dismiss</Button>
                            </>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })
            )}
          </TabsContent>

          <TabsContent value="content" className="space-y-4">
            {data.contentExecutions.length === 0 ? (
              <EmptyState
                icon={<FileEdit className="size-7" />}
                title="No content executions yet"
                description="Approve a GEO recommendation to let the Content Execution Agent build a Knowledge Vault-grounded brief and reviewable draft."
              />
            ) : (
              data.contentExecutions.map((execution) => {
                const recommendation = data.recommendations.find((item) => item.id === execution.recommendationId)
                const blockingFailure = execution.policyChecks.some((check) => check.blocking && check.status === "Failed")
                return (
                  <Card key={execution.id}>
                    <CardHeader className="gap-3">
                      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                        <div>
                          <div className="mb-2 flex flex-wrap items-center gap-2">
                            <Badge variant="outline" className={statusClass(execution.status)}>{execution.status}</Badge>
                            {execution.draft && <Badge variant="secondary">{execution.draft.wordCount} words</Badge>}
                            <Badge variant="outline">{execution.evidence.length} sources</Badge>
                          </div>
                          <CardTitle>{execution.draft?.title ?? recommendation?.title ?? "Content execution"}</CardTitle>
                          <CardDescription className="mt-2 leading-6">
                            {execution.brief.objective ?? recommendation?.summary ?? "The execution record is being prepared."}
                          </CardDescription>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {execution.contentDraftId && (
                            <Button variant="outline" render={<Link href={`/dashboard/publishing-center?draftId=${execution.contentDraftId}`} />}>
                              Review draft <ArrowRight />
                            </Button>
                          )}
                          {execution.status === "NeedsEvidence" && (
                            <Button variant="outline" render={<Link href="/dashboard/knowledge-vault" />}>
                              Add evidence <ArrowRight />
                            </Button>
                          )}
                          {execution.status === "ReadyForReview" && (
                            <Button
                              disabled={blockingFailure || busyKey === `content:${execution.id}`}
                              onClick={() => void handlePublishRequest(execution)}
                            >
                              <ShieldCheck /> Request publish approval
                            </Button>
                          )}
                          {execution.status === "Published" && execution.draft?.publishedUrl && (
                            <Button render={<a href={execution.draft.publishedUrl} target="_blank" rel="noreferrer" />}>
                              Open live page <ArrowRight />
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-5">
                      <div className="grid gap-3 md:grid-cols-3">
                        <div className="rounded-lg border border-border/70 p-3">
                          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Audience</p>
                          <p className="mt-1 text-sm">{execution.brief.audience || "Review required"}</p>
                        </div>
                        <div className="rounded-lg border border-border/70 p-3">
                          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Search intent</p>
                          <p className="mt-1 text-sm">{execution.brief.searchIntent || "Review required"}</p>
                        </div>
                        <div className="rounded-lg border border-border/70 p-3">
                          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Primary keyword</p>
                          <p className="mt-1 text-sm">{execution.brief.primaryKeyword || recommendation?.targetKey || "Review required"}</p>
                        </div>
                      </div>

                      <div>
                        <p className="mb-2 text-sm font-semibold">Policy checks</p>
                        <div className="grid gap-2 lg:grid-cols-2">
                          {execution.policyChecks.map((check) => (
                            <div key={check.key} className="flex items-start gap-3 rounded-lg border border-border/70 p-3">
                              {check.status === "Passed"
                                ? <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                                : <CircleAlert className={check.status === "Failed" ? "mt-0.5 size-4 shrink-0 text-red-600" : "mt-0.5 size-4 shrink-0 text-amber-600"} />}
                              <div>
                                <div className="flex items-center gap-2">
                                  <p className="text-sm font-medium">{check.label}</p>
                                  <Badge variant="outline" className={statusClass(check.status)}>{check.status}</Badge>
                                </div>
                                <p className="mt-1 text-xs leading-5 text-muted-foreground">{check.message}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="grid gap-3 lg:grid-cols-2">
                        <details className="rounded-lg border border-border/70 p-4">
                          <summary className="cursor-pointer text-sm font-semibold">Knowledge Vault evidence ({execution.evidence.length})</summary>
                          <div className="mt-3 space-y-2">
                            {execution.evidence.map((source) => (
                              <a
                                key={source.pageId}
                                href={source.url}
                                target="_blank"
                                rel="noreferrer"
                                className="block rounded-md border border-border/60 p-3 text-sm hover:bg-muted/50"
                              >
                                <span className="font-medium">Source {source.sourceNumber}: {source.title}</span>
                                <span className="mt-1 block truncate text-xs text-muted-foreground">{source.url}</span>
                              </a>
                            ))}
                            {execution.evidence.length === 0 && <p className="text-sm text-muted-foreground">No indexed source was available.</p>}
                          </div>
                        </details>
                        <details className="rounded-lg border border-border/70 p-4">
                          <summary className="cursor-pointer text-sm font-semibold">Review diff ({execution.reviewDiff.changes?.length ?? 0} changes)</summary>
                          <div className="mt-3 space-y-2">
                            {execution.reviewDiff.changes?.map((change, index) => (
                              <div key={`${execution.id}:change:${index}`} className="rounded-md border border-border/60 p-3">
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline">{change.changeType}</Badge>
                                  <p className="text-sm font-medium">{change.section}</p>
                                </div>
                                <p className="mt-2 text-xs leading-5 text-muted-foreground">{change.rationale}</p>
                              </div>
                            ))}
                          </div>
                        </details>
                      </div>

                      {execution.reviewNote && (
                        <p className="rounded-lg border border-border/70 bg-muted/40 px-3 py-2 text-sm">{execution.reviewNote}</p>
                      )}
                      <p className="text-xs text-muted-foreground">
                        Updated {formatDate(execution.updatedAt)} · Publishing requires a separate high-risk manager approval and never occurs from recommendation approval alone.
                      </p>
                    </CardContent>
                  </Card>
                )
              })
            )}
          </TabsContent>

          <TabsContent value="impact" className="space-y-4">
            <Card>
              <CardContent className="flex flex-col gap-4 py-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="font-semibold">Measured recommendation outcomes</p>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    Baselines are captured when work is marked implemented. Due comparisons use later persisted scans and report association, never unproven causation.
                  </p>
                </div>
                <Button
                  variant="outline"
                  disabled={busyKey === "impact:process"}
                  onClick={() => void handleProcessDueImpacts()}
                >
                  <RefreshCw className={busyKey === "impact:process" ? "animate-spin" : ""} /> Check due measurements
                </Button>
              </CardContent>
            </Card>

            {data.impactMeasurements.length === 0 ? (
              <EmptyState
                icon={<BarChart3 className="size-7" />}
                title="No impact baselines yet"
                description="Mark an approved recommendation implemented to capture its current baseline and schedule a follow-up measurement."
              />
            ) : (
              data.impactMeasurements.map((measurement) => {
                const recommendation = data.recommendations.find((item) => item.id === measurement.recommendationId)
                const metrics = measurement.report.metrics ?? []
                return (
                  <Card key={measurement.id}>
                    <CardHeader className="gap-3">
                      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                        <div>
                          <div className="mb-2 flex flex-wrap items-center gap-2">
                            <Badge variant="outline" className={statusClass(measurement.status)}>{measurement.status}</Badge>
                            <Badge variant="outline" className={statusClass(measurement.outcome)}>{measurement.outcome}</Badge>
                            {measurement.confidence > 0 && <Badge variant="secondary">{Math.round(measurement.confidence * 100)}% evidence coverage</Badge>}
                          </div>
                          <CardTitle>{measurement.report.title ?? recommendation?.title ?? "Recommendation impact"}</CardTitle>
                          <CardDescription className="mt-2 leading-6">
                            {measurement.report.executiveSummary ??
                              (measurement.status === "Pending"
                                ? `Baseline captured. Follow-up is due ${formatDate(measurement.measurementDueAt)}.`
                                : "Waiting for a comparable post-window scan.")}
                          </CardDescription>
                        </div>
                        <Button variant="outline" render={<Link href="/dashboard/performance-center" />}>
                          Performance Center <ArrowRight />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-5">
                      {metrics.length > 0 && (
                        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                          {metrics.map((metric) => (
                            <div key={metric.label} className="rounded-lg border border-border/70 p-3">
                              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{metric.label}</p>
                              <div className="mt-2 flex items-baseline gap-2">
                                <span className="text-sm text-muted-foreground">{metric.baseline}</span>
                                <ArrowRight className="size-3.5 text-muted-foreground" />
                                <span className="text-lg font-semibold">{metric.followup}</span>
                                <span className={`text-xs font-semibold ${metric.delta > 0 ? "text-emerald-600" : metric.delta < 0 ? "text-red-600" : "text-muted-foreground"}`}>
                                  {metric.delta > 0 ? "+" : ""}{metric.delta}
                                </span>
                              </div>
                              <p className="mt-1 text-[11px] text-muted-foreground">
                                {metric.baselineObservedAt ?? "Unknown date"} to {metric.followupObservedAt ?? "Unknown date"}
                                {metric.lowerIsBetter ? " · lower raw value is better" : ""}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                      {measurement.report.agencySummary && (
                        <div className="rounded-lg border border-border/70 bg-muted/30 p-4">
                          <p className="text-sm font-semibold">Agency-ready explanation</p>
                          <p className="mt-2 text-sm leading-6 text-muted-foreground">{measurement.report.agencySummary}</p>
                        </div>
                      )}

                      <div className="grid gap-3 md:grid-cols-3">
                        <div className="rounded-lg border border-border/70 p-3">
                          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Baseline captured</p>
                          <p className="mt-1 text-sm">{formatDate(measurement.baselineCapturedAt)}</p>
                        </div>
                        <div className="rounded-lg border border-border/70 p-3">
                          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Measurement due</p>
                          <p className="mt-1 text-sm">{formatDate(measurement.measurementDueAt)}</p>
                        </div>
                        <div className="rounded-lg border border-border/70 p-3">
                          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Measured</p>
                          <p className="mt-1 text-sm">{formatDate(measurement.measuredAt)}</p>
                        </div>
                      </div>

                      {measurement.errorMessage && (
                        <p className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">{measurement.errorMessage}</p>
                      )}
                      <p className="text-xs text-muted-foreground">
                        {measurement.report.delivery?.note ?? "Reports stay inside Citationly until external delivery is explicitly configured."}
                      </p>
                    </CardContent>
                  </Card>
                )
              })
            )}
          </TabsContent>

          <TabsContent value="approvals" className="space-y-4">
            <Card>
              <CardHeader><CardTitle>Approval policy</CardTitle><CardDescription>Publishing, live-site changes, external delivery, destructive operations, and unusually expensive work remain human-controlled.</CardDescription></CardHeader>
            </Card>
            {data.approvals.length === 0 ? (
              <EmptyState icon={<ShieldCheck className="size-7" />} title="Nothing is waiting for approval" description="Typed action requests will appear here when an agent reaches a consequential step." />
            ) : (
              <div className="space-y-3">
                {data.approvals.map((approval) => (
                  <Card key={approval.id}>
                    <CardContent className="flex flex-col gap-4 py-5 lg:flex-row lg:items-start lg:justify-between">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="font-semibold">{approval.title}</p>
                          <Badge variant="outline" className={statusClass(approval.status)}>{approval.status}</Badge>
                          <Badge variant="outline">{approval.riskLevel} risk</Badge>
                        </div>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">{approval.description}</p>
                        <p className="mt-2 text-xs text-muted-foreground">{approval.agentKey} · {approval.actionType} · requested {formatDate(approval.requestedAt)}</p>
                      </div>
                      {approval.status === "Pending" && (
                        <div className="flex shrink-0 gap-2">
                          <Button variant="outline" disabled={busyKey === `approval:${approval.id}`} onClick={() => void handleApproval(approval, "Rejected")}><XCircle /> Reject</Button>
                          <Button disabled={busyKey === `approval:${approval.id}`} onClick={() => void handleApproval(approval, "Approved")}><CheckCircle2 /> Approve</Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="schedules">
            {data.schedules.length === 0 ? (
              <EmptyState icon={<CalendarClock className="size-7" />} title="No agent triggers configured" description="Default event and schedule triggers are created when the workspace control plane initializes." />
            ) : (
              <Card>
                <CardHeader><CardTitle>Automation triggers</CardTitle><CardDescription>Managers can pause or enable persisted triggers. Every future execution remains subject to agent settings, plan limits, and approval policy.</CardDescription></CardHeader>
                <CardContent className="divide-y divide-border">
                  {data.schedules.map((schedule) => (
                    <div key={schedule.id} className="grid gap-3 py-4 first:pt-0 last:pb-0 md:grid-cols-[1.1fr_1.4fr_0.8fr_auto] md:items-center">
                      <div><p className="font-semibold">{schedule.agentKey}</p><p className="mt-1 text-xs text-muted-foreground">{schedule.triggerType}</p></div>
                      <div><p className="text-sm font-medium">{schedule.triggerExpression}</p><p className="mt-1 text-xs text-muted-foreground">Time zone: {schedule.timeZone}</p></div>
                      <div className="text-xs text-muted-foreground"><p>Last: {formatDate(schedule.lastRunAt)}</p><p>Next: {formatDate(schedule.nextRunAt)}</p></div>
                      <Button size="sm" variant={schedule.isEnabled ? "outline" : "default"} disabled={busyKey === `schedule:${schedule.id}`} onClick={() => void handleScheduleToggle(schedule)}>
                        {schedule.isEnabled ? <PauseCircle /> : <PlayCircle />}{schedule.isEnabled ? "Pause" : "Enable"}
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="history">
            {data.runs.length === 0 ? (
              <EmptyState icon={<History className="size-7" />} title="No agent runs yet" description="Queued and completed runs will appear here with their trigger, cost, attempts, timestamps, and failure details." />
            ) : (
              <Card>
                <CardHeader><CardTitle>Run history</CardTitle><CardDescription>Organization-scoped execution history with usage and recovery controls.</CardDescription></CardHeader>
                <CardContent className="divide-y divide-border">
                  {data.runs.map((run) => {
                    const canRetry = ["Failed", "Cancelled"].includes(run.status) && run.attempt < run.maxAttempts
                    const canCancel = activeRunStatuses.has(run.status)
                    return (
                      <div key={run.id} className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0 xl:flex-row xl:items-start xl:justify-between">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2"><p className="font-semibold">{run.agentKey}</p><Badge variant="outline" className={statusClass(run.status)}>{run.status}</Badge><Badge variant="outline">Attempt {run.attempt}/{run.maxAttempts}</Badge></div>
                          <p className="mt-2 text-sm text-muted-foreground">{run.triggerType}{run.triggerReference ? ` · ${run.triggerReference}` : ""}</p>
                          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                            <span><Clock3 className="mr-1 inline size-3.5" />Queued {formatDate(run.queuedAt)}</span>
                            <span>{run.promptTokens + run.completionTokens} tokens</span>
                            <span>{formatCost(run.costMicroUsd)}</span>
                            {(run.provider || run.model) && <span>{[run.provider, run.model].filter(Boolean).join(" / ")}</span>}
                          </div>
                          {run.errorMessage && <p className="mt-2 text-sm text-red-700">{run.errorCode ? `${run.errorCode}: ` : ""}{run.errorMessage}</p>}
                        </div>
                        {(canCancel || canRetry) && (
                          <div className="flex shrink-0 gap-2">
                            {canCancel && <Button size="sm" variant="outline" disabled={busyKey === `run:${run.id}`} onClick={() => void handleRunAction(run, "cancel")}><PauseCircle /> Cancel</Button>}
                            {canRetry && <Button size="sm" disabled={busyKey === `run:${run.id}`} onClick={() => void handleRunAction(run, "retry")}><RotateCcw /> Retry</Button>}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      )}

      <Card className="border-dashed">
        <CardContent className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-3">
            <ShieldCheck className="mt-0.5 size-5 shrink-0 text-emerald-600" />
            <div><p className="font-semibold">Organization-scoped and audit-ready</p><p className="mt-1 text-sm text-muted-foreground">Agent state, evidence, approvals, schedules, costs, retries, and cancellations are persisted without presenting synthetic customer activity.</p></div>
          </div>
          <Link href="/dashboard/assistant" className="shrink-0 text-sm font-semibold text-primary hover:underline">Open Assistant</Link>
        </CardContent>
      </Card>
    </div>
  )
}
