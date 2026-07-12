import apiClient from '../apiClient';

export interface VisibilityPlatform {
  name: string;
  score: number;
  citations: number;
  status: string;
  sparkline: number[];
}

export interface SignalMixItem {
  label: string;
  pct: number;
}

export interface ScoreHistoryPoint {
  date: string;
  score: number;
}

export interface VisibilityRadarResponse {
  hasData: boolean;
  compositeScore: number;
  compositeDelta: string;
  lastScanDate: string;
  platforms: VisibilityPlatform[];
  signalMix: SignalMixItem[];
  scoreHistory: ScoreHistoryPoint[];
}

export async function getVisibilityRadar(organizationId: string, range: '7D' | '30D' | '90D'): Promise<VisibilityRadarResponse> {
  const response = await apiClient.get<VisibilityRadarResponse>('/Dashboard/visibility-radar', {
    params: { organizationId, range },
  });
  return response.data;
}
