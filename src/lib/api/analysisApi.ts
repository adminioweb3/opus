import apiClient from '../apiClient';

export interface DashboardSnapshot {
  id: string;
  organizationId: string;
  analysisRunId: string;
  visibilityScore: number;
  citationHealth: number;
  revenueImpact: string;
  competitorRisk: string;
  
  platformVisibilitiesJson: string; 
  topCompetitorsJson: string;
  opportunityPipelineJson: string;
  executiveAlertsJson: string;
  recommendedActionsJson: string;
  knowledgeVaultJson: string;
  citationTimelineJson: string;
  agentOperationsJson: string;
  
  createdAt: string;
}

export const getLatestSnapshot = async (): Promise<DashboardSnapshot | null> => {
  try {
    const response = await apiClient.get<DashboardSnapshot>('/analysis/latest');
    return response.data; // will be empty/null if no analysis has been run
  } catch (error) {
    console.error("Failed to fetch latest snapshot", error);
    return null;
  }
};
