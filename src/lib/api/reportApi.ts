import apiClient from '../apiClient';

export interface WebsiteProfile {
  id: string;
  organizationId: string;
  websiteUrl: string;
  rawProfileJson: string; // Parse this on client
  createdAt: string;
}

export interface ExecutiveSummaryData {
  id: string;
  organizationId: string;
  businessOverview: string;
  currentAIVisibility: string;
  competitorPosition: string;
  platformPerformance: string;
  topicPerformance: string;
  promptPerformance: string;
  citationSummary: string;
  strengthsJson: string; // Parse this
  weaknessesJson: string; // Parse this
  opportunitiesJson: string; // Parse this
  threatsJson: string; // Parse this
  overallGEOScore: number;
  overallAIVisibilityScore: number;
  overallSEOScore: number;
  overallBrandAuthority: number;
  overallContentScore: number;
  overallAssessment: string;
  topPriorityRecommendation: string;
  expectedBusinessImpact: string;
  nextStepsJson: string; // Parse this
  createdAt: string;
}

export interface Competitor {
  id: string;
  organizationId: string;
  name: string;
  websiteUrl: string;
  similarityScore: number;
  rawJson: string;
  country: string;
  createdAt: string;
}

export interface AiSearchPrompt {
  id: string;
  organizationId: string;
  queryString: string;
  searchEngine: string;
  topic?: string;
  intent?: string;
  difficulty?: string;
  persona?: string;
  commercialValue: number;
  rawJson: string;
  visibilityScore: number;
  estimatedRank?: string;
  confidence: number;
  appearsInAnswer: boolean;
  shareOfVoiceContribution: number;
  mentionProbability: number;
  brandStrength: number;
  contentStrength: number;
  createdAt: string;
}

export interface VisibilitySummary {
  id: string;
  organizationId: string;
  overallVisibilityScore: number;
  averageMentionRate: number;
  averageRank: number;
  shareOfVoice: number;
  createdAt: string;
}

export interface PlatformVisibility {
  id: string;
  organizationId: string;
  platform: string;
  visibilityScore: number;
  averageRank: number;
  promptCoverage: number;
  strengthsJson: string; // Parse this
  weaknessesJson: string; // Parse this
  createdAt: string;
}

export interface CitationSummary {
  id: string;
  organizationId: string;
  averageAuthorityScore: number;
  totalCitationSources: number;
  mostInfluentialSource: string;
  createdAt: string;
}

export interface CitationSource {
  id: string;
  organizationId: string;
  source: string;
  category: string;
  authorityScore: number;
  influenceScore: number;
  citationFrequency: number;
  competitorCoverage: number;
  opportunityScore: number;
  mentionProbability: number;
  reason: string;
  createdAt: string;
}

export interface PersonaAnalysisSummary {
  id: string;
  organizationId: string;
  overallVisibility: number;
  strongestPersona: string;
  weakestPersona: string;
  createdAt: string;
}

export interface PersonaScore {
  id: string;
  organizationId: string;
  personaName: string;
  visibilityScore: number;
  shareOfVoice: number;
  topCompetitorsJson: string; // Parse this
  recommendedContentJson: string; // Parse this
  createdAt: string;
}

export interface RegionAnalysisSummary {
  id: string;
  organizationId: string;
  overallGlobalVisibility: number;
  strongestRegion: string;
  weakestRegion: string;
  createdAt: string;
}

export interface RegionScore {
  id: string;
  organizationId: string;
  region: string;
  visibility: number;
  ranking: string;
  competitorLeader: string;
  shareOfVoice: number;
  contentOpportunityJson: string;
  reason: string;
  createdAt: string;
}

export interface GeoRecommendationSummary {
  id: string;
  organizationId: string;
  totalRecommendations: number;
  criticalRecommendations: number;
  overallPriority: string;
  estimatedOverallImpact: string;
  createdAt: string;
}

export interface GeoRecommendation {
  id: string;
  organizationId: string;
  title: string;
  category: string;
  description: string;
  estimatedImpact: string;
  estimatedDifficulty: string;
  implementationTime: string;
  actionItemsJson: string; // Parse this
  priorityScore: number;
  createdAt: string;
}

export interface FullReportData {
  websiteProfile?: WebsiteProfile;
  executiveSummary?: ExecutiveSummaryData;
  competitors?: Competitor[];
  prompts?: AiSearchPrompt[];
  visibilitySummary?: VisibilitySummary;
  platformVisibilities?: PlatformVisibility[];
  citationSummary?: CitationSummary;
  citationSources?: CitationSource[];
  personaSummary?: PersonaAnalysisSummary;
  personaScores?: PersonaScore[];
  regionSummary?: RegionAnalysisSummary;
  regionScores?: RegionScore[];
  recommendationSummary?: GeoRecommendationSummary;
  recommendations?: GeoRecommendation[];
}

export const getFullReport = async (organizationId: string): Promise<FullReportData> => {
  const response = await apiClient.get<FullReportData>(`/report/${organizationId}`);
  return response.data;
};
