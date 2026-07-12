import apiClient from '../apiClient';

export interface GeoOptimizationRequest {
  url?: string;
  content?: string;
  targetKeyword: string;
  engine: string;
}

export interface FixRecommendation {
  title: string;
  impact: string;
  icon: string;
  description: string;
  delta: string;
}

export interface GeoSubMetric {
  label: string;
  score: number;
}

export interface CompetitorGap {
  name: string;
  coverage: string;
  status: string;
}

export interface PromptCoverageItem {
  question: string;
  coverage: string;
  note: string;
}

export interface CitationSignal {
  icon: string;
  title: string;
  status: string;
  score: number;
}

export interface GeoOptimizationResponse {
  score: number;
  verdict: string;
  statusText: string;
  subMetrics: GeoSubMetric[];
  fixRecommendations: FixRecommendation[];
  competitorGap: CompetitorGap[];
  promptCoverage: PromptCoverageItem[];
  citationGap: CitationSignal[];
}

export async function analyzePage(request: GeoOptimizationRequest): Promise<GeoOptimizationResponse> {
  const response = await apiClient.post<GeoOptimizationResponse>('/GeoOptimizer/analyze', request);
  return response.data;
}

export interface SchemaGenerationRequest {
  url?: string;
  content?: string;
  schemaType: string;
}

export interface SchemaGenerationResponse {
  jsonLd: string;
}

export async function generateSchema(request: SchemaGenerationRequest): Promise<SchemaGenerationResponse> {
  const response = await apiClient.post<SchemaGenerationResponse>('/GeoOptimizer/generate-schema', request);
  return response.data;
}
