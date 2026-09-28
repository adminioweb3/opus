import apiClient from "../apiClient"

export type AgentOverviewItem = {
  agentKey: string
  name: string
  stage: string
  description: string
  version: string
  capabilities: string[]
  isEnabled: boolean
  autonomyLevel: "Observe" | "Assist" | "Autopilot"
  maxRunsPerDay: number
  maxCostMicroUsdPerRun: number
  allowedActions: string[]
  status: string
  activeRunCount: number
  openFindingCount: number
  pendingApprovalCount: number
  lastRunStatus: string
  lastRunAt: string | null
  nextRunAt: string | null
}

export type AgentOverviewResponse = {
  autonomyLevel: "Observe" | "Assist" | "Autopilot" | "Mixed"
  totals: {
    activeRuns: number
    openFindings: number
    pendingApprovals: number
    failedAgents: number
  }
  agents: AgentOverviewItem[]
}

export type AgentActivityItem = {
  id: string
  kind: "RunEvent" | "Finding" | "Approval"
  agentKey: string
  title: string
  message: string
  severity: string
  status: string
  runId: string | null
  referenceId: string | null
  data: Record<string, unknown> | unknown[]
  occurredAt: string
}

export type AgentApproval = {
  id: string
  runId: string
  findingId: string | null
  agentKey: string
  actionType: string
  title: string
  description: string
  payload: Record<string, unknown> | unknown[]
  riskLevel: string
  status: string
  requestedAt: string
  expiresAt: string | null
  decidedByUserId: string | null
  decidedAt: string | null
  decisionNote: string
  executedAt: string | null
}

export type AgentSchedule = {
  id: string
  organizationId: string
  agentKey: string
  triggerType: "Event" | "Cron" | "Manual"
  triggerExpression: string
  timeZone: string
  isEnabled: boolean
  lastRunAt: string | null
  nextRunAt: string | null
  createdAt: string
  updatedAt: string
}

export type AgentRun = {
  id: string
  agentKey: string
  parentRunId: string | null
  triggerType: string
  triggerReference: string
  status: string
  provider: string
  model: string
  promptTokens: number
  completionTokens: number
  costMicroUsd: number
  attempt: number
  maxAttempts: number
  errorCode: string
  errorMessage: string
  queuedAt: string
  startedAt: string | null
  completedAt: string | null
  cancelRequestedAt: string | null
  updatedAt: string
}

export type AgentRecommendation = {
  id: string
  runId: string
  findingId: string
  approvalId: string | null
  agentKey: string
  recommendationType: string
  category: string
  title: string
  summary: string
  rationale: string
  targetType: string
  targetKey: string
  evidence: Record<string, unknown> | unknown[]
  actionPlan: string[]
  validationPlan: Record<string, unknown> | unknown[]
  expectedImpact: string
  impactScore: number
  effortScore: number
  urgencyScore: number
  goalAlignmentScore: number
  confidence: number
  priorityScore: number
  status: "AwaitingApproval" | "Approved" | "Rejected" | "Assigned" | "InProgress" | "Implemented" | "Dismissed"
  assignedToUserId: string | null
  assignedToName: string
  rejectionReason: string
  createdAt: string
  updatedAt: string
  approvedAt: string | null
  assignedAt: string | null
  implementedAt: string | null
}

export type AgentStrategyPreference = {
  organizationId: string
  primaryGoal: "Balanced" | "GrowVisibility" | "ImproveCitations" | "DefendCompetitors" | "ImproveBrandAccuracy"
  createdAt: string
  updatedAt: string
}

export type AgentContentPolicyCheck = {
  key: string
  label: string
  status: "Passed" | "Warning" | "Failed"
  message: string
  blocking: boolean
}

export type AgentContentExecution = {
  id: string
  runId: string
  recommendationId: string
  contentDraftId: string | null
  knowledgeBaseId: string | null
  publishApprovalId: string | null
  status: "Preparing" | "NeedsEvidence" | "ReadyForReview" | "AwaitingPublishApproval" | "ApprovedForPublishing" | "Publishing" | "Published" | "Rejected" | "PublishFailed" | "Failed"
  brief: {
    objective?: string
    audience?: string
    searchIntent?: string
    primaryKeyword?: string
    supportingKeywords?: string[]
    outline?: string[]
    callToAction?: string
    claimsToVerify?: string[]
  }
  evidence: Array<{
    sourceNumber: number
    pageId: string
    title: string
    url: string
    relevanceScore: number
  }>
  reviewDiff: {
    baseline?: string
    changes?: Array<{
      changeType: string
      section: string
      before: string | null
      after: string
      rationale: string
    }>
  }
  policyChecks: AgentContentPolicyCheck[]
  reviewNote: string
  reviewedByUserId: string | null
  reviewedAt: string | null
  publishedAt: string | null
  createdAt: string
  updatedAt: string
  draft: {
    id: string
    title: string
    contentType: string
    wordCount: number
    status: string
    publishedUrl: string | null
    publishedAt: string | null
  } | null
}

export type AgentImpactSnapshot = {
  visibilityObservedAt: string | null
  visibilityScore: number | null
  citationObservedAt: string | null
  citationQuality: number | null
  citationSignal: number | null
  competitorObservedAt: string | null
  shareOfVoice: number | null
  averagePosition: number | null
  citationCount: number | null
  brandObservedAt: string | null
  brandHealth: number | null
}

export type AgentImpactMeasurement = {
  id: string
  recommendationId: string
  baselineRunId: string
  measurementRunId: string | null
  status: "Pending" | "WaitingForData" | "NeedsBaseline" | "Measured" | "Failed" | "Cancelled"
  outcome: "Pending" | "Improved" | "Neutral" | "Regressed" | "Inconclusive"
  monitoringWindowDays: number
  baselineCapturedAt: string
  measurementDueAt: string
  measuredAt: string | null
  baseline: Partial<AgentImpactSnapshot>
  followup: Partial<AgentImpactSnapshot>
  delta: {
    visibilityScore?: number | null
    citationQuality?: number | null
    citationSignal?: number | null
    shareOfVoice?: number | null
    averagePosition?: number | null
    citationCount?: number | null
    brandHealth?: number | null
  }
  evidence: Record<string, unknown>
  report: {
    title?: string
    outcome?: string
    confidence?: number
    executiveSummary?: string
    agencySummary?: string
    metrics?: Array<{
      label: string
      baseline: number
      followup: number
      delta: number
      lowerIsBetter: boolean
      baselineObservedAt: string | null
      followupObservedAt: string | null
    }>
    delivery?: {
      status?: string
      externalDelivery?: boolean
      note?: string
    }
  }
  confidence: number
  errorMessage: string
  createdAt: string
  updatedAt: string
}

export type UpdateAgentSettingsRequest = {
  isEnabled: boolean
  autonomyLevel: "Observe" | "Assist" | "Autopilot"
  maxRunsPerDay: number
  maxCostMicroUsdPerRun: number
  allowedActions: string[]
}

export type UpdateAgentScheduleRequest = {
  triggerType: "Event" | "Cron" | "Manual"
  triggerExpression: string
  timeZone: string
  isEnabled: boolean
  nextRunAt?: string | null
}

export async function getAgentOverview(): Promise<AgentOverviewResponse> {
  const response = await apiClient.get<AgentOverviewResponse>("/agents/overview")
  return response.data
}

export async function getAgentActivity(limit = 50): Promise<AgentActivityItem[]> {
  const response = await apiClient.get<AgentActivityItem[]>("/agents/activity", { params: { limit } })
  return response.data
}

export async function getAgentApprovals(status?: string, limit = 50): Promise<AgentApproval[]> {
  const response = await apiClient.get<AgentApproval[]>("/agents/approvals", { params: { status, limit } })
  return response.data
}

export async function decideAgentApproval(id: string, decision: "Approved" | "Rejected", note = ""): Promise<AgentApproval> {
  const response = await apiClient.post<AgentApproval>(`/agents/approvals/${id}/decision`, { decision, note })
  return response.data
}

export async function getAgentSchedules(): Promise<AgentSchedule[]> {
  const response = await apiClient.get<AgentSchedule[]>("/agents/schedules")
  return response.data
}

export async function updateAgentSchedule(agentKey: string, request: UpdateAgentScheduleRequest): Promise<AgentSchedule> {
  const response = await apiClient.put<AgentSchedule>(`/agents/schedules/${agentKey}`, request)
  return response.data
}

export async function updateAgentSettings(agentKey: string, request: UpdateAgentSettingsRequest) {
  const response = await apiClient.put(`/agents/settings/${agentKey}`, request)
  return response.data
}

export async function getAgentRuns(limit = 50, agentKey?: string, status?: string): Promise<AgentRun[]> {
  const response = await apiClient.get<AgentRun[]>("/agents/runs", { params: { limit, agentKey, status } })
  return response.data
}

export async function cancelAgentRun(id: string): Promise<void> {
  await apiClient.post(`/agents/runs/${id}/cancel`)
}

export async function retryAgentRun(id: string): Promise<AgentRun> {
  const response = await apiClient.post<AgentRun>(`/agents/runs/${id}/retry`)
  return response.data
}

export async function getAgentRecommendations(status?: string, limit = 100): Promise<AgentRecommendation[]> {
  const response = await apiClient.get<AgentRecommendation[]>("/agents/recommendations", { params: { status, limit } })
  return response.data
}

export async function assignAgentRecommendation(id: string, assignedToUserId: string | null): Promise<AgentRecommendation> {
  const response = await apiClient.put<AgentRecommendation>(`/agents/recommendations/${id}/assignment`, { assignedToUserId })
  return response.data
}

export async function updateAgentRecommendationStatus(id: string, status: "InProgress" | "Implemented" | "Dismissed", note = ""): Promise<AgentRecommendation> {
  const response = await apiClient.put<AgentRecommendation>(`/agents/recommendations/${id}/status`, { status, note })
  return response.data
}

export async function getAgentStrategyPreference(): Promise<AgentStrategyPreference> {
  const response = await apiClient.get<AgentStrategyPreference>("/agents/strategy-preference")
  return response.data
}

export async function updateAgentStrategyPreference(primaryGoal: AgentStrategyPreference["primaryGoal"]): Promise<AgentStrategyPreference> {
  const response = await apiClient.put<AgentStrategyPreference>("/agents/strategy-preference", { primaryGoal })
  return response.data
}

export async function getAgentContentExecutions(status?: string, limit = 100): Promise<AgentContentExecution[]> {
  const response = await apiClient.get<AgentContentExecution[]>("/agents/content-executions", { params: { status, limit } })
  return response.data
}

export async function requestAgentContentPublish(id: string): Promise<AgentContentExecution> {
  const response = await apiClient.post<AgentContentExecution>(`/agents/content-executions/${id}/request-publish`)
  return response.data
}

export async function getAgentImpactMeasurements(status?: string, limit = 100): Promise<AgentImpactMeasurement[]> {
  const response = await apiClient.get<AgentImpactMeasurement[]>("/agents/impact-measurements", { params: { status, limit } })
  return response.data
}

export async function processDueAgentImpactMeasurements(): Promise<{ measured: number }> {
  const response = await apiClient.post<{ measured: number }>("/agents/impact-measurements/process-due")
  return response.data
}
