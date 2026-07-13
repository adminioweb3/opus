import apiClient from '../apiClient';

export interface SourceFolderDto {
  id: string;
  knowledgeBaseId: string;
  name: string;
  createdAt: string;
}

export async function getSourceFolders(knowledgeBaseId: string): Promise<SourceFolderDto[]> {
  const response = await apiClient.get<SourceFolderDto[]>('/SourceFolder', {
    params: { knowledgeBaseId },
  });
  return response.data;
}

export async function createSourceFolder(knowledgeBaseId: string, name: string): Promise<SourceFolderDto> {
  const response = await apiClient.post<SourceFolderDto>('/SourceFolder', {
    knowledgeBaseId,
    name,
  });
  return response.data;
}
