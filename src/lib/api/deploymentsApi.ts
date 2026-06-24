import apiClient from '../apiClient';

export interface DeployRecommendationRequest {
  organizationId: string;
  recommendationId: string;
  integrationId: string;
  status?: string;
}

export interface DeployRecommendationResponse {
  deployedUrl: string;
  status: string;
}

export const deployRecommendation = async (request: DeployRecommendationRequest): Promise<DeployRecommendationResponse> => {
  const response = await apiClient.post<DeployRecommendationResponse>('/deployments/execute', request);
  return response.data;
};
