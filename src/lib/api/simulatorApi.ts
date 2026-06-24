import apiClient from '../apiClient';

export interface SearchResult {
  embedding: {
    id: string;
    referenceId: string;
    referenceType: string;
    textContent: string;
    createdAt: string;
  };
  similarityScore: number;
}

export interface SimulatorSearchRequest {
  organizationId: string;
  queryText: string;
  topK: number;
}

export const searchSimilar = async (request: SimulatorSearchRequest): Promise<SearchResult[]> => {
  const response = await apiClient.post<SearchResult[]>('/simulator/search', request);
  return response.data;
};
