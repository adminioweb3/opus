import apiClient from '../apiClient';

export interface SimulateAnswerRequest {
  prompt: string;
  persona: string;
  stage: string;
  region: string;
  brand: string;
}

export interface CompetitorShare {
  name: string;
  sharePct: number;
}

export interface SourceReference {
  name: string;
  type: 'you' | 'comp' | 'third';
}

export interface SimulateAnswerResponse {
  answer: string;
  mentioned: boolean;
  position: string;
  sentiment: 'pos' | 'neu' | 'neg';
  sharePct: number;
  competitors: CompetitorShare[];
  sources: SourceReference[];
  summary: string;
  consistencyOutOfFive: number;
}

export async function simulateAnswer(request: SimulateAnswerRequest): Promise<SimulateAnswerResponse> {
  const response = await apiClient.post<SimulateAnswerResponse>('/AnswerSimulator/simulate', request);
  return response.data;
}

export interface CompareContentRequest {
  prompt: string;
  brand: string;
  pageContent: string;
}

export interface CompareContentResponse {
  without: string;
  with: string;
  changed: boolean;
  verdict: string;
}

export async function compareContent(request: CompareContentRequest): Promise<CompareContentResponse> {
  const response = await apiClient.post<CompareContentResponse>('/AnswerSimulator/compare', request);
  return response.data;
}

export interface BattleRequest {
  prompt: string;
  brand: string;
  competitor: string;
}

export interface BattleResponse {
  youPct: number;
  compPct: number;
  note: string;
}

export async function runBattle(request: BattleRequest): Promise<BattleResponse> {
  const response = await apiClient.post<BattleResponse>('/AnswerSimulator/battle', request);
  return response.data;
}
