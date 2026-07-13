import apiClient from '../apiClient';

export interface KnowledgeBaseDto {
  id: string;
  organizationId: string;
  name: string;
  icon: string;
  tint: string;
  bg: string;
  description?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateKnowledgeBaseRequest {
  name: string;
  icon?: string;
  tint?: string;
  bg?: string;
  description?: string;
}

export async function getKnowledgeBases(): Promise<KnowledgeBaseDto[]> {
  const response = await apiClient.get<KnowledgeBaseDto[]>('/KnowledgeBase');
  return response.data;
}

export async function createKnowledgeBase(request: CreateKnowledgeBaseRequest): Promise<KnowledgeBaseDto> {
  const response = await apiClient.post<KnowledgeBaseDto>('/KnowledgeBase', request);
  return response.data;
}

export interface KnowledgeBaseAnswerSource {
  pageId: string;
  title: string;
  url: string;
}

export interface KnowledgeBaseAnswer {
  answer: string;
  sources: KnowledgeBaseAnswerSource[];
}

export async function askKnowledgeBase(knowledgeBaseId: string, question: string): Promise<KnowledgeBaseAnswer> {
  const response = await apiClient.post<KnowledgeBaseAnswer>(`/KnowledgeBase/${knowledgeBaseId}/ask`, { question });
  return response.data;
}
