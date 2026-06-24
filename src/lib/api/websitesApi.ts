import apiClient from '../apiClient';

export interface Website {
  id: string;
  organizationId: string;
  domainUrl: string;
  platformName: string;
  healthScore: number;
  visibilityScore: number;
  status: string;
  lastSyncAt: string | null;
  createdAt: string;
}

export const fetchWebsites = async (): Promise<Website[]> => {
  const response = await apiClient.get<Website[]>('/websites');
  return response.data;
};

export const connectWebsite = async (domainUrl: string, platformName: string): Promise<Website> => {
  const response = await apiClient.post<Website>('/websites/connect', { domainUrl, platformName });
  return response.data;
};
