import apiClient from '../apiClient';

export interface OnboardingPayload {
  organizationId?: string;
  websiteUrl: string;
  businessName: string;
  industry: string;
  targetAudience: string;
  keywords: string;
}

export interface OnboardingAnalysisResult {
  businessSummary: { value: string; confidence: number };
  coreServices: { value: string[]; confidence: number };
  products: { value: string[]; confidence: number };
  industriesServed: { value: string[]; confidence: number };
  businessModel: { value: string; confidence: number };
  uniqueSellingProposition: { value: string; confidence: number };
  primaryTechnologies: { value: string[]; confidence: number };
  targetCustomers: { value: string[]; confidence: number };
  contentCategories: { value: string[]; confidence: number };
  seoStrength: {
    value: {
      overall: string;
      score: number;
      strengths: string[];
      weaknesses: string[];
      recommendations: string[];
    };
    confidence: number;
  };
  websiteStructure: {
    value: {
      navigationQuality: string;
      importantPages: string[];
      blogPresent: boolean;
      contactPresent: boolean;
      pricingPresent: boolean;
      faqPresent: boolean;
      mobileFriendlyEstimate: string;
      overallArchitecture: string;
    };
    confidence: number;
  };
  domainAuthorityEstimate: {
    value: {
      estimatedScore: number;
      category: string;
      reason: string;
    };
    confidence: number;
  };
  topicalAuthority: {
    value: {
      primaryTopics: string[];
      authorityLevel: string;
      reason: string;
    };
    confidence: number;
  };
  brandPositioning: { value: string; confidence: number };
  toneOfVoice: {
    value: {
      primaryTone: string;
      secondaryTone: string[];
      writingStyle: string;
      readingLevel: string;
    };
    confidence: number;
  };
  overallConfidence: number;
}

export const analyzeOnboardingData = async (payload: OnboardingPayload): Promise<OnboardingAnalysisResult> => {
  const response = await apiClient.post<OnboardingAnalysisResult>('/onboarding/analyze', payload);
  return response.data;
};

export interface CompleteOnboardingPayload {
  websiteUrl: string;
  businessName: string;
  visibilityScore: number;
  brandAuthority: number;
  contentStrength: number;
  citationScore: number;
}

export const completeOnboarding = async (payload: CompleteOnboardingPayload): Promise<void> => {
  await apiClient.post('/onboarding/complete', payload);
};

export interface AnalyzeCompetitorsPayload {
  organizationId: string;
}

export interface CompetitorAnalysisResult {
  success: boolean;
  error?: string;
  totalCompetitors: number;
}

export const analyzeCompetitors = async (payload: AnalyzeCompetitorsPayload): Promise<CompetitorAnalysisResult> => {
  const response = await apiClient.post<CompetitorAnalysisResult>('/onboarding/analyze-competitors', payload);
  return response.data;
};

export interface AnalyzeAiSearchPromptsPayload {
  organizationId: string;
}

export interface AiSearchPromptsAnalysisResult {
  success: boolean;
  error?: string;
  totalPrompts: number;
}

export const analyzeAiSearchPrompts = async (payload: AnalyzeAiSearchPromptsPayload): Promise<AiSearchPromptsAnalysisResult> => {
  const response = await apiClient.post<AiSearchPromptsAnalysisResult>('/onboarding/analyze-prompts', payload);
  return response.data;
};

export interface AnalyzeVisibilityPayload {
  organizationId: string;
}

export interface VisibilityAnalysisResult {
  success: boolean;
  error?: string;
  totalPromptsAnalyzed: number;
}

export const analyzeVisibility = async (payload: AnalyzeVisibilityPayload): Promise<VisibilityAnalysisResult> => {
  const response = await apiClient.post<VisibilityAnalysisResult>('/onboarding/analyze-visibility', payload);
  return response.data;
};

export interface AnalyzePlatformVisibilityPayload {
  organizationId: string;
}

export interface PlatformVisibilityAnalysisResult {
  success: boolean;
  error?: string;
  platformsAnalyzed: number;
}

export const analyzePlatformVisibility = async (payload: AnalyzePlatformVisibilityPayload): Promise<PlatformVisibilityAnalysisResult> => {
  const response = await apiClient.post<PlatformVisibilityAnalysisResult>('/onboarding/analyze-platform-visibility', payload);
  return response.data;
};

export interface AnalyzeCitationsPayload {
  organizationId: string;
}

export interface CitationAnalysisResult {
  success: boolean;
  error?: string;
  sourcesAnalyzed: number;
}

export const analyzeCitations = async (payload: AnalyzeCitationsPayload): Promise<CitationAnalysisResult> => {
  const response = await apiClient.post<CitationAnalysisResult>('/onboarding/analyze-citations', payload);
  return response.data;
};

export interface AnalyzePersonasPayload {
  organizationId: string;
}

export interface PersonaAnalysisResult {
  success: boolean;
  error?: string;
  personasAnalyzed: number;
}

export const analyzePersonas = async (payload: AnalyzePersonasPayload): Promise<PersonaAnalysisResult> => {
  const response = await apiClient.post<PersonaAnalysisResult>('/onboarding/analyze-personas', payload);
  return response.data;
};

export interface AnalyzeRegionsPayload {
  organizationId: string;
}

export interface RegionAnalysisResult {
  success: boolean;
  error?: string;
}

export const analyzeRegions = async (payload: AnalyzeRegionsPayload): Promise<RegionAnalysisResult> => {
  const response = await apiClient.post<RegionAnalysisResult>('/onboarding/analyze-regions', payload);
  return response.data;
};

export interface GenerateRecommendationsPayload {
  organizationId: string;
}

export interface GenerateRecommendationsResult {
  success: boolean;
  error?: string;
}

export const generateRecommendations = async (payload: GenerateRecommendationsPayload): Promise<GenerateRecommendationsResult> => {
  const response = await apiClient.post<GenerateRecommendationsResult>('/onboarding/generate-recommendations', payload);
  return response.data;
};

export interface GenerateExecutiveSummaryPayload {
  organizationId: string;
}

export interface GenerateExecutiveSummaryResult {
  success: boolean;
  error?: string;
}

export const generateExecutiveSummary = async (payload: GenerateExecutiveSummaryPayload): Promise<GenerateExecutiveSummaryResult> => {
  const response = await apiClient.post<GenerateExecutiveSummaryResult>('/onboarding/generate-executive-summary', payload);
  return response.data;
};
