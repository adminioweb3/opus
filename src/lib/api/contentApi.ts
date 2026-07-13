import apiClient from '../apiClient';

export interface ContentDraft {
  id: string;
  organizationId: string;
  title: string;
  contentType: string;
  content: string;
  wordCount: number;
  status: string;
  requestJson: string;
  competitorUrl?: string | null;
  publishedUrl?: string | null;
  publishedAt?: string | null;
  integrationId?: string | null;
  publishError?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface GenerateContentRequest {
  prompt: string;
  keywords?: string;
  contentType: string;
  tone: string;
  language: string;
  audience: string;
  outputLength: string;
  brandVoice: string;
  outputFormat: string;
  creativity: number;
  targetKeyword?: string;
  businessName?: string;
  targetAudience?: string;
  searchIntent?: string;
  goal?: string;
  cta?: string;
  referenceUrls?: string;
  secondaryAngle?: string;
  competitorUrl?: string;
  competitorInsights?: string;
  model?: string;
}

export interface CompetitorAnalysisResult {
  title?: string | null;
  wordCount: number;
  opportunity: string;
  gapSignals: string[];
  recommendedAngle: string;
}

export async function getContentDrafts(): Promise<ContentDraft[]> {
  const response = await apiClient.get<ContentDraft[]>('/Content');
  return response.data;
}

export async function getContentDraft(id: string): Promise<ContentDraft> {
  const response = await apiClient.get<ContentDraft>(`/Content/${id}`);
  return response.data;
}

export async function generateContent(request: GenerateContentRequest): Promise<ContentDraft> {
  const response = await apiClient.post<ContentDraft>('/Content/generate', request);
  return response.data;
}

export async function analyzeCompetitor(url: string): Promise<CompetitorAnalysisResult> {
  const response = await apiClient.post<CompetitorAnalysisResult>('/Content/analyze-competitor', { url });
  return response.data;
}

export async function rewriteContent(id: string, instruction: string): Promise<ContentDraft> {
  const response = await apiClient.post<ContentDraft>(`/Content/${id}/rewrite`, { instruction });
  return response.data;
}

export async function updateContentDraft(id: string, content: string, status?: string): Promise<ContentDraft> {
  const response = await apiClient.put<ContentDraft>(`/Content/${id}`, { content, status });
  return response.data;
}

export interface ContentOptimizationRequest {
  primaryKeyword: string;
  goal: string;
  audience: string;
  notes?: string;
  depth: number;
}

export interface OptimizationRecommendation {
  title: string;
  meta: string;
}

export interface ContentOptimization {
  id: string;
  contentDraftId: string;
  organizationId: string;
  seoScore: number;
  readabilityScore: number;
  humanizedScore: number;
  aiScore: number;
  keywordDensity: number;
  primaryKeyword: string;
  recommendationsJson: string;
  internalLinksJson: string;
  citationRecsJson: string;
  optimizedContent: string;
  createdAt: string;
}

export async function optimizeContent(id: string, request: ContentOptimizationRequest): Promise<ContentOptimization> {
  const response = await apiClient.post<ContentOptimization>(`/Content/${id}/optimize`, request);
  return response.data;
}

export interface PublishContentResult {
  success: boolean;
  message: string;
  publishedUrl?: string | null;
}

export async function publishContentDraft(id: string): Promise<PublishContentResult> {
  const response = await apiClient.post<PublishContentResult>(`/Content/${id}/publish`);
  return response.data;
}

export interface PublishingSummary {
  totalDrafts: number;
  draftCount: number;
  optimizedCount: number;
  publishedCount: number;
  failedCount: number;
  publishedToday: number;
  connectedIntegrations: number;
}

export async function getPublishingSummary(): Promise<PublishingSummary> {
  const response = await apiClient.get<PublishingSummary>('/Content/publishing-summary');
  return response.data;
}
