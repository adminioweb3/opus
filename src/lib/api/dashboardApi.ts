import apiClient from '../apiClient';

export interface DailyMetricsResult {
  totalWebsites: number;
  totalPagesCrawled: number;
  totalRecommendations: number;
  highPriorityRecommendations: number;
}

export interface TrendData {
  date: string;
  citations: number;
}

export interface ShareOfVoiceData {
  name: string;
  value: number;
  color: string;
}

export interface ExecutiveMetricsResult {
  visibilityScore: number;
  visibilityChange: number;
  citationScore: number;
  citationChange: number;
  sentimentScore: number;
  sentimentChange: number;
  competitorScore: number;
  competitorChange: number;
  trend: TrendData[];
  shareOfVoice: ShareOfVoiceData[];
}

export interface CompetitorResult {
  id: string;
  name: string;
  websiteUrl: string;
  industry: string;
}

export const getTopCompetitors = async (organizationId: string): Promise<CompetitorResult[]> => {
  const response = await apiClient.get<CompetitorResult[]>('/Dashboard/top-competitors', {
    params: { organizationId }
  });
  return response.data;
};

export const getDailyMetrics = async (organizationId: string): Promise<DailyMetricsResult> => {
  const response = await apiClient.get<DailyMetricsResult>('/metrics/daily', {
    params: { organizationId }
  });
  return response.data;
};

export const getExecutiveMetrics = async (organizationId: string): Promise<ExecutiveMetricsResult> => {
  const response = await apiClient.get<ExecutiveMetricsResult>('/metrics/executive', {
    params: { organizationId }
  });
  return response.data;
};

export interface RunScanResult {
  success: boolean;
  message: string;
}

export const runScan = async (organizationId: string): Promise<RunScanResult> => {
  const response = await apiClient.post<RunScanResult>('/metrics/run-scan', null, {
    params: { organizationId }
  });
  return response.data;
};

export interface ScoreEntry {
  value: number;
  change: string;
  direction: 'up' | 'down';
}

export interface GeoScoreCard {
  visibilityScore: ScoreEntry;
  citationScore: ScoreEntry;
  sentimentScore: ScoreEntry;
  competitorScore: ScoreEntry;
  hallucinationRisk: ScoreEntry;
  seoHealth: ScoreEntry;
  aeoReadiness: ScoreEntry;
  geoReadiness: ScoreEntry;
}

export interface GeoDashboardHeader {
  compositeScore: number;
  grade: string;
  industryAverage: number;
  deltaVsIndustry: number;
  compositeChange: string;
  enginesScanned: number;
  promptsTracked: number;
  status: string;
}

export interface GeoPillar {
  key: string;
  label: string;
  description: string;
  score: number;
}

export interface GeoInsight {
  message: string;
  ctaLabel: string;
  ctaLink: string;
}

export interface WeakestPillarInsight extends GeoInsight {
  pillarKey: string;
  score: number;
}

export interface PromptTypeCoverage {
  type: string;
  example: string;
  note: string;
  percentage: number;
  direction: string;
}

export interface WinLossEvent {
  type: string;
  title: string;
  engine: string;
  timestamp: string;
}

export interface TrendPoint {
  day: number;
  score: number;
}

export interface ShareOfVoiceEntry {
  name: string;
  value: number;
  color: string;
}

export interface GeoDashboardData {
  hasData: boolean;
  scores: GeoScoreCard;
  trend: TrendPoint[];
  shareOfVoice: ShareOfVoiceEntry[];
  header: GeoDashboardHeader;
  pillars: GeoPillar[];
  weakestPillarInsight: WeakestPillarInsight | null;
  promptTypeCoverage: PromptTypeCoverage[];
  opportunityInsight: GeoInsight | null;
  winsAndLosses: WinLossEvent[];
  verifyInsight: GeoInsight;
}

export const getGeoDashboard = async (organizationId: string, range: string): Promise<GeoDashboardData> => {
  const response = await apiClient.get<GeoDashboardData>('/dashboard/geo-dashboard', {
    params: { organizationId, range }
  });
  return response.data;
};
