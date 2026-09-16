import apiClient from '../apiClient';

export interface Integration {
  id: string;
  platformName: string;
  apiUrl: string;
  authType: string;
  status: "Connected" | "Error" | string;
  credentialHint: string;
  lastVerifiedAt: string | null;
  lastError: string | null;
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

export interface TestIntegrationResult {
  found: boolean;
  connected: boolean;
  message: string;
  verifiedAt: string | null;
}

export async function testIntegration(id: string): Promise<TestIntegrationResult> {
  const response = await apiClient.post<TestIntegrationResult>(`/Integrations/${id}/test`);
  return response.data;
}

export async function disconnectIntegration(id: string): Promise<void> {
  await apiClient.delete(`/Integrations/${id}`);
}
