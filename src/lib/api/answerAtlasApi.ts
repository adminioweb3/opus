import apiClient from '../apiClient';
import { useAuthStore } from '../stores/auth-store';

export interface ScoreHistoryPoint {
  date: string;
  score: number;
}

export interface TopicRanking {
  rank: number;
  topicId: string;
  topicName: string;
  promptCount: number;
  score: number;
  shareOfVoice: number;
  averagePosition: number;
  citationCount: number;
  citationShare: number;
}

export interface RankRow {
  rank: number;
  name: string;
  owned: boolean;
  value: number;
  delta: string;
}

export interface RankBlock {
  position: number | null;
  positionDelta: number;
  rows: RankRow[];
}

export interface VisibilitySummaryResponse {
  hasData: boolean;
  compositeScore: number;
  compositeDelta: string;
  shareOfVoice: number;
  shareOfVoiceDelta: string;
  averagePosition: number;
  averagePositionDelta: string;
  scoreHistory: ScoreHistoryPoint[];
  topics: TopicRanking[];
  visibilityRank: RankBlock;
  shareOfVoiceRank: RankBlock;
}

export async function getVisibilitySummary(range: '7D' | '30D' | '90D'): Promise<VisibilitySummaryResponse> {
  const response = await apiClient.get<VisibilitySummaryResponse>('/PromptIntelligence/visibility-summary', {
    params: { range },
  });
  return response.data;
}

export interface PromptTopic {
  id: string;
  organizationId: string;
  name: string;
  description: string;
  createdAt: string;
}

export interface PromptQuestion {
  id: string;
  promptTopicId: string;
  promptText: string;
  isActive: boolean;
  region: string;
  persona: string | null;
  createdAt: string;
}

export interface PromptAnalysis {
  id: string;
  promptQuestionId: string;
  runAt: string;
  status: 'Running' | 'Completed' | 'Failed';
  errorMessage: string | null;
}

export interface PromptVisibility {
  id: string;
  promptAnalysisId: string;
  overallVisibilityScore: number;
  mentionFrequency: number;
  averagePosition: number;
  shareOfVoice: number;
  citationCount: number;
  competitorCount: number;
}

export interface QuestionWithLatest {
  question: PromptQuestion;
  latestAnalysis: PromptAnalysis | null;
  visibility: PromptVisibility | null;
}

export async function getTopics(): Promise<PromptTopic[]> {
  const response = await apiClient.get<PromptTopic[]>('/PromptIntelligence/topics');
  return response.data;
}

export async function createTopic(name: string, description: string): Promise<PromptTopic> {
  const response = await apiClient.post<PromptTopic>('/PromptIntelligence/topics', { name, description });
  return response.data;
}

export async function getQuestions(topicId: string): Promise<QuestionWithLatest[]> {
  const response = await apiClient.get<QuestionWithLatest[]>(`/PromptIntelligence/topics/${topicId}/questions`);
  return response.data;
}

export async function createQuestion(promptTopicId: string, promptText: string): Promise<PromptQuestion> {
  const response = await apiClient.post<PromptQuestion>('/PromptIntelligence/questions', { promptTopicId, promptText });
  return response.data;
}

export async function updateQuestion(
  questionId: string,
  updates: { promptText?: string; isActive?: boolean }
): Promise<PromptQuestion> {
  const response = await apiClient.patch<PromptQuestion>(`/PromptIntelligence/questions/${questionId}`, updates);
  return response.data;
}

export interface AnalysisProgress {
  step?: string;
  progress?: number;
  analysisId?: string;
  error?: string;
}

/**
 * The analyze endpoint is server-sent-events, and EventSource can't attach an Authorization
 * header, so this reads the stream manually via fetch instead, parsing each `data: ...` frame.
 * Calls onProgress for every frame and resolves with the final analysisId once the stream ends.
 */
export async function streamAnalysis(
  questionId: string,
  onProgress: (progress: AnalysisProgress) => void
): Promise<string | null> {
  const token = useAuthStore.getState().token;
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8088/api';

  const response = await fetch(`${baseUrl}/PromptIntelligence/analyze/stream/${questionId}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  if (!response.ok || !response.body) {
    throw new Error(`Analysis stream failed with status ${response.status}`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let lastAnalysisId: string | null = null;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const frames = buffer.split('\n\n');
    buffer = frames.pop() ?? '';

    for (const frame of frames) {
      const line = frame.trim();
      if (!line.startsWith('data:')) continue;
      const payload = line.slice(5).trim();
      if (payload === '[DONE]') continue;

      try {
        const parsed: AnalysisProgress = JSON.parse(payload);
        if (parsed.analysisId) lastAnalysisId = parsed.analysisId;
        onProgress(parsed);
      } catch {
        // Non-JSON keepalive frame — ignore.
      }
    }
  }

  return lastAnalysisId;
}

// ---------------------------------------------------------------------------
// Platforms tab
// ---------------------------------------------------------------------------

export interface PlatformSummaryRow {
  platform: string;
  score: number;
  shareOfVoice: number;
  averagePosition: number;
  citationShare: number;
}

export interface PlatformMatrixRow {
  name: string;
  owned: boolean;
  values: number[];
}

export interface PlatformMatrix {
  platformNames: string[];
  rows: PlatformMatrixRow[];
}

export interface PlatformsSummaryResponse {
  hasData: boolean;
  platforms: PlatformSummaryRow[];
  matrix?: PlatformMatrix;
}

export async function getPlatformsSummary(range: '7D' | '30D' | '90D'): Promise<PlatformsSummaryResponse> {
  const response = await apiClient.get<PlatformsSummaryResponse>('/PromptIntelligence/platforms-summary', { params: { range } });
  return response.data;
}

// ---------------------------------------------------------------------------
// Regions / Personas tabs (Enterprise-gated)
// ---------------------------------------------------------------------------

export interface GroupedSummaryRow {
  name: string;
  promptCount: number;
  score: number;
  shareOfVoice: number;
  averagePosition: number;
  citationCount: number;
}

export interface GroupedSummaryResponse {
  hasData: boolean;
  groups: GroupedSummaryRow[];
}

export class PlanGateError extends Error {
  planType: string | null;
  constructor(message: string, planType: string | null) {
    super(message);
    this.planType = planType;
  }
}

async function getGroupedSummary(path: string, range: '7D' | '30D' | '90D'): Promise<GroupedSummaryResponse> {
  try {
    const response = await apiClient.get<GroupedSummaryResponse>(path, { params: { range } });
    return response.data;
  } catch (err) {
    const axiosErr = err as { response?: { status?: number; data?: { error?: string; planType?: string | null } } };
    if (axiosErr.response?.status === 403) {
      throw new PlanGateError(axiosErr.response.data?.error ?? 'This view requires the Enterprise plan.', axiosErr.response.data?.planType ?? null);
    }
    throw err;
  }
}

export function getRegionsSummary(range: '7D' | '30D' | '90D') {
  return getGroupedSummary('/PromptIntelligence/regions-summary', range);
}

export function getPersonasSummary(range: '7D' | '30D' | '90D') {
  return getGroupedSummary('/PromptIntelligence/personas-summary', range);
}

// ---------------------------------------------------------------------------
// Sentiment tab
// ---------------------------------------------------------------------------

export interface SentimentQuote {
  quote: string;
  sentiment: 'pos' | 'neu' | 'neg';
  platform: string;
  runAt: string;
}

export interface SentimentSummaryResponse {
  hasData: boolean;
  positivePct: number;
  neutralPct: number;
  negativePct: number;
  quotes: SentimentQuote[];
}

export async function getSentimentSummary(range: '7D' | '30D' | '90D'): Promise<SentimentSummaryResponse> {
  const response = await apiClient.get<SentimentSummaryResponse>('/PromptIntelligence/sentiment-summary', { params: { range } });
  return response.data;
}

// ---------------------------------------------------------------------------
// Citations tab
// ---------------------------------------------------------------------------

export interface CitationDomain {
  domain: string;
  category: string;
  share: number;
}

export interface CitationCategory {
  category: string;
  share: number;
}

export interface CitationPage {
  url: string;
  domain: string;
  category: string;
  share: number;
  firstSeen: string;
}

export interface CitationsSummaryResponse {
  hasData: boolean;
  topDomains: CitationDomain[];
  categories: CitationCategory[];
  topPages: CitationPage[];
}

export async function getCitationsSummary(range: '7D' | '30D' | '90D'): Promise<CitationsSummaryResponse> {
  const response = await apiClient.get<CitationsSummaryResponse>('/PromptIntelligence/citations-summary', { params: { range } });
  return response.data;
}

// ---------------------------------------------------------------------------
// Query Fanouts tab
// ---------------------------------------------------------------------------

export interface PromptFanout {
  id: string;
  promptQuestionId: string;
  fanoutText: string;
  engine: string;
  createdAt: string;
}

export async function getFanouts(questionId: string): Promise<PromptFanout[]> {
  const response = await apiClient.get<PromptFanout[]>(`/PromptIntelligence/questions/${questionId}/fanouts`);
  return response.data;
}

export async function generateFanouts(questionId: string): Promise<PromptFanout[]> {
  const response = await apiClient.post<PromptFanout[]>(`/PromptIntelligence/questions/${questionId}/fanouts/generate`);
  return response.data;
}

export interface FanoutOverviewRow {
  questionId: string;
  promptText: string;
  fanoutCount: number;
  avgQueriesPerExecution: number;
}

export interface FanoutsOverviewResponse {
  hasData: boolean;
  prompts: FanoutOverviewRow[];
}

export async function getFanoutsOverview(): Promise<FanoutsOverviewResponse> {
  const response = await apiClient.get<FanoutsOverviewResponse>('/PromptIntelligence/fanouts-overview');
  return response.data;
}

// ---------------------------------------------------------------------------
// Prompt Designer: AI-generated prompts + execution history
// ---------------------------------------------------------------------------

export async function generateTopicPrompts(topicId: string, count: number): Promise<PromptQuestion[]> {
  const response = await apiClient.post<PromptQuestion[]>(`/PromptIntelligence/topics/${topicId}/generate-prompts`, { count });
  return response.data;
}

export interface ExecutionHistoryRow {
  analysisId: string;
  runAt: string;
  status: string;
  overallVisibilityScore: number | null;
  shareOfVoice: number | null;
  averagePosition: number | null;
}

export async function getQuestionHistory(questionId: string): Promise<ExecutionHistoryRow[]> {
  const response = await apiClient.get<ExecutionHistoryRow[]>(`/PromptIntelligence/questions/${questionId}/history`);
  return response.data;
}
