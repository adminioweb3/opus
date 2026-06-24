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

export const runScan = async (organizationId: string): Promise<boolean> => {
  const response = await apiClient.post<{success: boolean}>('/metrics/run-scan', null, {
    params: { organizationId }
  });
  return response.data.success;
};
