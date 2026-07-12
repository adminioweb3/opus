import apiClient from '../apiClient';

export interface CitationPlatform {
  name: string;
  citations: number;
  visibility: number;
  quality: number;
  growthPct: number;
  status: string;
}

export interface CitationSourceItem {
  source: string;
  category: string;
  authorityScore: number;
  influenceScore: number;
  citationFrequency: number;
  reason: string;
}

export interface CitationOpportunity {
  source: string;
  category: string;
  opportunityScore: number;
  competitorCoverage: number;
  reason: string;
}

export interface CitationHistoryPoint {
  date: string;
  score: number;
}

export interface CitationIntelligenceResponse {
  hasData: boolean;
  compositeQualityScore: number;
  qualityDelta: string;
  citationSignal: number;
  signalDelta: string;
  modelsReferencing: number;
  modelsTracked: number;
  avgOpportunityScore: number;
  lastScanDate: string;
  qualityHistory: CitationHistoryPoint[];
  signalHistory: CitationHistoryPoint[];
  platforms: CitationPlatform[];
  topSources: CitationSourceItem[];
  opportunities: CitationOpportunity[];
}

export async function getCitationIntelligence(organizationId: string, range: '7D' | '30D' | '90D'): Promise<CitationIntelligenceResponse> {
  const response = await apiClient.get<CitationIntelligenceResponse>('/Dashboard/citation-intelligence', {
    params: { organizationId, range },
  });
  return response.data;
}
