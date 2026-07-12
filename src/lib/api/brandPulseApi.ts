import apiClient from '../apiClient';

export interface BrandPulseAlert {
  type: 'risk' | 'warning' | 'win';
  title: string;
  message: string;
}

export interface ModelInsight {
  platform: string;
  confidence: number;
  sentiment: 'pos' | 'neu' | 'neg';
  themes: string[];
  flag: boolean;
}

export interface AccuracyFlag {
  claim: string;
  severity: 'High' | 'Medium' | 'Low';
  detail: string;
  models: string[];
}

export interface PromptEvidenceItem {
  prompt: string;
  sentiment: 'pos' | 'neu' | 'neg';
  sources: string[];
}

export interface SharePerceptionItem {
  name: string;
  value: number;
  color: string;
}

export interface MetricHistory {
  health: number[];
  confidence: number[];
  messaging: number[];
  trust: number[];
}

export interface BrandPulseResponse {
  hasData: boolean;
  brandHealth: number;
  aiConfidence: number;
  messagingConsistency: number;
  brandTrust: number;
  healthDelta: string;
  confidenceDelta: string;
  messagingDelta: string;
  trustDelta: string;
  metricHistory: MetricHistory;
  sentimentMix: { positive: number; neutral: number; negative: number };
  shareOfPerception: SharePerceptionItem[];
  modelInsights: ModelInsight[];
  alerts: BrandPulseAlert[];
  accuracyFlags: AccuracyFlag[];
  promptEvidence: PromptEvidenceItem[];
  lastScanDate: string;
}

export async function getBrandPulse(organizationId: string, range: '7D' | '30D' | '90D'): Promise<BrandPulseResponse> {
  const response = await apiClient.get<BrandPulseResponse>('/Dashboard/brand-pulse', {
    params: { organizationId, range },
  });
  return response.data;
}
