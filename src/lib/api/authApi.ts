import apiClient from '../apiClient';

export interface SyncUserResponse {
  userId: string;
  organizationId: string;
  role: string;
}

export const syncUserToBackend = async (): Promise<SyncUserResponse> => {
  // We use apiClient which automatically attaches the token from auth-store
  const response = await apiClient.post<SyncUserResponse>('/auth/sync');
  return response.data;
};
