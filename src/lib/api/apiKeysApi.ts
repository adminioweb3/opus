import apiClient from "../apiClient"

export interface ApiKeyRecord {
  id: string
  name: string
  keyPrefix: string
  last4: string
  createdAt: string
  revokedAt: string | null
  isActive: boolean
}

export interface GenerateApiKeyRequest {
  name: string
}

export interface GeneratedApiKey {
  id: string
  name: string
  prefix: string
  key: string
  last4: string
  createdAt: string
}

export interface GenerateApiKeyResponse {
  message: string
  apiKey: GeneratedApiKey
}

export async function getApiKeys(): Promise<ApiKeyRecord[]> {
  const response = await apiClient.get<ApiKeyRecord[]>("/ApiKeys")
  return response.data
}

export async function generateApiKey(request: GenerateApiKeyRequest): Promise<GenerateApiKeyResponse> {
  const response = await apiClient.post<GenerateApiKeyResponse>("/ApiKeys", request)
  return response.data
}

export async function revokeApiKey(id: string): Promise<void> {
  await apiClient.delete(`/ApiKeys/${id}`)
}
