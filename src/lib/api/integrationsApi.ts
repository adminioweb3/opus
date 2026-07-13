import apiClient from '../apiClient';

export interface Integration {
  id: string;
  platformName: string;
  apiUrl: string;
  createdAt: string;
  updatedAt: string;
}

export async function getIntegrations(): Promise<Integration[]> {
  const response = await apiClient.get<Integration[]>('/Integrations');
  return response.data;
}

export interface UpsertIntegrationRequest {
  platformName: string;
  apiUrl: string;
  apiKey: string;
}

export interface UpsertIntegrationResult {
  message: string;
  integrationId: string;
}

export async function upsertIntegration(request: UpsertIntegrationRequest): Promise<UpsertIntegrationResult> {
  const response = await apiClient.post<UpsertIntegrationResult>('/Integrations', request);
  return response.data;
}
