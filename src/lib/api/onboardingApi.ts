import apiClient from '../apiClient';

export interface OnboardingPayload {
  organizationId?: string;
  websiteUrl: string;
  businessName: string;
  industry: string;
  targetAudience: string;
  keywords: string;
  competitors: string; // Join array with comma if needed
  rankingGoal: string;
}

export interface OnboardingAnalysisResult {
  visibilityScore: number;
  brandAuthority: number;
  contentStrength: number;
  citationScore: number;
}

export const analyzeOnboardingData = async (payload: OnboardingPayload): Promise<OnboardingAnalysisResult> => {
  const response = await apiClient.post<OnboardingAnalysisResult>('/onboarding/analyze', payload);
  return response.data;
};

export interface CompleteOnboardingPayload {
  websiteUrl: string;
  businessName: string;
  competitors: string;
  visibilityScore: number;
  brandAuthority: number;
  contentStrength: number;
  citationScore: number;
}

export const completeOnboarding = async (payload: CompleteOnboardingPayload): Promise<void> => {
  await apiClient.post('/onboarding/complete', payload);
};
