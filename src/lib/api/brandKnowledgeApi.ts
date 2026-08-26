import apiClient from '../apiClient';

export interface BrandClaim {
  id: string;
  organizationId: string;
  promptAnalysisId: string;
  promptResponseId: string;
  promptQuestionId: string;
  platform: string;
  claimType: string;
  claimText: string;
  evidenceQuote: string;
  observedAt: string;
}

export interface BrandFactCheck {
  id: string;
  organizationId: string;
  brandClaimId: string;
  verificationStatus: 'Verified' | 'Incorrect' | 'Unverified';
  verifiedFact: string;
  explanation: string;
  checkedAt: string;
}

export interface BrandKnowledgeResult {
  hasData: boolean;
  claims: BrandClaim[];
  factChecks: BrandFactCheck[];
  incorrectCount: number;
  unverifiedCount: number;
}

export interface CrossEngineConsensusInsight {
  id: string;
  organizationId: string;
  promptAnalysisId: string;
  insightType: string;
  summary: string;
  platformsJson: string;
  evidenceJson: string;
  createdAt: string;
}

export interface CrossEngineConsensusResult {
  hasIndependentProviders: boolean;
  status: string;
  insights: CrossEngineConsensusInsight[];
}

export async function getFactAccuracy(lookbackDays = 30): Promise<BrandKnowledgeResult> {
  const response = await apiClient.get<BrandKnowledgeResult>('/BrandKnowledge/fact-accuracy', {
    params: { lookbackDays },
  });
  return response.data;
}

export async function refreshFactAccuracy(lookbackDays = 30): Promise<BrandKnowledgeResult> {
  const response = await apiClient.post<BrandKnowledgeResult>('/BrandKnowledge/fact-accuracy/refresh', null, {
    params: { lookbackDays },
  });
  return response.data;
}

export async function getConsensus(lookbackDays = 30): Promise<CrossEngineConsensusResult> {
  const response = await apiClient.get<CrossEngineConsensusResult>('/BrandKnowledge/consensus', {
    params: { lookbackDays },
  });
  return response.data;
}

export async function refreshConsensus(lookbackDays = 30): Promise<CrossEngineConsensusResult> {
  const response = await apiClient.post<CrossEngineConsensusResult>('/BrandKnowledge/consensus/refresh', null, {
    params: { lookbackDays },
  });
  return response.data;
}
