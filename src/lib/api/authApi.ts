import apiClient from '../apiClient';

export interface SyncUserResponse {
  userId: string;
  organizationId: string;
  role: string;
  organizationName: string;
  websiteDomain: string;
  needsOnboarding: boolean;
  planType: string;
  trialEndsAt: string | null;
  isTrialExpired: boolean;
  industry: string | null;
  isNewUser: boolean;
}

export const syncUserToBackend = async (): Promise<SyncUserResponse> => {
  // We use apiClient which automatically attaches the token from auth-store
  const response = await apiClient.post<SyncUserResponse>('/auth/sync');
  return response.data;
};

export interface AccountLinkCheckResponse {
  exists: boolean;
  email: string;
  linkedProviders: string[];
}

export const checkAccountLink = async (email: string): Promise<AccountLinkCheckResponse> => {
  const response = await apiClient.get<AccountLinkCheckResponse>('/auth/check-account', {
    params: { email }
  });
  return response.data;
};
