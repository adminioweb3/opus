import apiClient from '../apiClient';

export interface ConnectCmsRequest {
  organizationId: string;
  cmsType: string;
  apiUrl: string;
  apiKey: string;
}

export const connectCms = async (request: ConnectCmsRequest): Promise<void> => {
  await apiClient.post('/integrations/connect', request);
};
