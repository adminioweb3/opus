import apiClient from '../apiClient';

export interface OnboardingPayload {
  websiteUrl: string;
  businessName: string;
  industry: string;
  targetAudience: string;
  keywords: string;
  whoDoYouSellTo: string;
  knownCompetitors: string;
  mainOffering: string;
}

export interface OnboardingAnalysisResult {
  sourceContext: {
    websiteUrl: string;
    businessName: string;
    industry: string;
    targetAudience: string;
    keywords: string;
    whoDoYouSellTo: string;
    knownCompetitors: string;
    mainOffering: string;
    scrapeJobId?: string | null;
    scrapeCompletedAt?: string | null;
    crawledPageCount: number;
    crawledPageUrls: string[];
    crawlStatus: string;
    analysisBasis: string;
  };
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

export interface DashboardBaselineStatus {
  ready: boolean;
  promptEvidenceReady: boolean;
  geoDashboardReady: boolean;
  competitorWatchReady: boolean;
}

export const waitForDashboardBaseline = async (timeoutMs = 300_000): Promise<DashboardBaselineStatus> => {
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    const response = await apiClient.get<DashboardBaselineStatus>('/onboarding/dashboard-baseline-status');
    if (response.data.ready) return response.data;
    await new Promise((resolve) => setTimeout(resolve, 2_500));
  }

  throw new Error('Your measured dashboard baseline is still being prepared. Please try again.');
};

export interface AnalyzeCompetitorsPayload {
}

export interface CompetitorAnalysisResult {
  success: boolean;
  error?: string;
  totalCompetitors: number;
}

export const analyzeCompetitors = async (): Promise<CompetitorAnalysisResult> => {
  const response = await apiClient.post<CompetitorAnalysisResult>('/onboarding/analyze-competitors');
  return response.data;
};

export interface AnalyzeAiSearchPromptsPayload {
}

export interface AiSearchPromptsAnalysisResult {
  success: boolean;
  error?: string;
  totalPrompts: number;
}

export const analyzeAiSearchPrompts = async (): Promise<AiSearchPromptsAnalysisResult> => {
  const response = await apiClient.post<AiSearchPromptsAnalysisResult>('/onboarding/analyze-prompts');
  return response.data;
};

export interface AnalyzeVisibilityPayload {
}

export interface VisibilityAnalysisResult {
  success: boolean;
  error?: string;
  totalPromptsAnalyzed: number;
}

export const analyzeVisibility = async (): Promise<VisibilityAnalysisResult> => {
  const response = await apiClient.post<VisibilityAnalysisResult>('/onboarding/analyze-visibility');
  return response.data;
};

export interface AnalyzePlatformVisibilityPayload {
}

export interface PlatformVisibilityAnalysisResult {
  success: boolean;
  error?: string;
  platformsAnalyzed: number;
}

export const analyzePlatformVisibility = async (): Promise<PlatformVisibilityAnalysisResult> => {
  const response = await apiClient.post<PlatformVisibilityAnalysisResult>('/onboarding/analyze-platform-visibility');
  return response.data;
};

export interface AnalyzeCitationsPayload {
}

export interface CitationAnalysisResult {
  success: boolean;
  error?: string;
  sourcesAnalyzed: number;
}

export const analyzeCitations = async (): Promise<CitationAnalysisResult> => {
  const response = await apiClient.post<CitationAnalysisResult>('/onboarding/analyze-citations');
  return response.data;
};

export interface AnalyzePersonasPayload {
}

export interface PersonaAnalysisResult {
  success: boolean;
  error?: string;
  personasAnalyzed: number;
}

export const analyzePersonas = async (): Promise<PersonaAnalysisResult> => {
  const response = await apiClient.post<PersonaAnalysisResult>('/onboarding/analyze-personas');
  return response.data;
};

export interface AnalyzeRegionsPayload {
}

export interface RegionAnalysisResult {
  success: boolean;
  error?: string;
}

export const analyzeRegions = async (): Promise<RegionAnalysisResult> => {
  const response = await apiClient.post<RegionAnalysisResult>('/onboarding/analyze-regions');
  return response.data;
};

export interface GenerateRecommendationsPayload {
}

export interface GenerateRecommendationsResult {
  success: boolean;
  error?: string;
}

export const generateRecommendations = async (): Promise<GenerateRecommendationsResult> => {
  const response = await apiClient.post<GenerateRecommendationsResult>('/onboarding/generate-recommendations');
  return response.data;
};

export interface GenerateExecutiveSummaryPayload {
}

export interface GenerateExecutiveSummaryResult {
  success: boolean;
  error?: string;
}

export const generateExecutiveSummary = async (): Promise<GenerateExecutiveSummaryResult> => {
  const response = await apiClient.post<GenerateExecutiveSummaryResult>('/onboarding/generate-executive-summary');
  return response.data;
};
