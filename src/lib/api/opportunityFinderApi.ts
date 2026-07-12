import apiClient from '../apiClient';

export interface Opportunity {
  id: string;
  category: string;
  title: string;
  summary: string;
  whyItMatters: string;
  score: number;
  effort: number;
  difficulty: 'Low' | 'Medium' | 'High';
  estimatedGainPct: number;
  eta: string;
  competitorContext: string;
  checklist: string[];
  quadrant: 'high-low' | 'high-high' | 'low-low' | 'low-high';
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  badge: string;
}

export interface OpportunityKpis {
  totalOpportunities: number;
  estimatedImpactScore: number;
  criticalCount: number;
  quickWinsCount: number;
}

export interface OpportunityForecastPoint {
  date: string;
  avgScore: number;
  count: number;
}

export interface OpportunityForecast {
  potentialGainPct: number;
  trend: OpportunityForecastPoint[];
}

export interface OpportunityFinderResponse {
  hasData: boolean;
  lastScanDate: string;
  canRunDeepScan: boolean;
  nextEligibleDate: string;
  daysUntilEligible: number;
  opportunities: Opportunity[];
  kpis: OpportunityKpis;
  forecast: OpportunityForecast;
}

export async function getOpportunityFinder(organizationId: string, range: '7D' | '30D' | '90D'): Promise<OpportunityFinderResponse> {
  const response = await apiClient.get<OpportunityFinderResponse>('/Dashboard/opportunity-finder', {
    params: { organizationId, range },
  });
  return response.data;
}

export async function runOpportunityDeepScan(organizationId: string): Promise<OpportunityFinderResponse> {
  const response = await apiClient.post<OpportunityFinderResponse>(
    '/Dashboard/opportunity-finder/deep-scan',
    null,
    { params: { organizationId } },
  );
  return response.data;
}
