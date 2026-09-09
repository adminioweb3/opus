import apiClient from "../apiClient"

export interface BetaFeedback {
  id: string
  organizationId: string
  userId: string | null
  pagePath: string
  feedbackType: string
  rating: number | null
  message: string
  contextId: string
  status: string
  createdAt: string
  updatedAt: string
}

export interface CreateFeedbackRequest {
  pagePath: string
  feedbackType: string
  rating?: number | null
  message: string
  contextId: string
}

export async function submitFeedback(request: CreateFeedbackRequest): Promise<{ id: string; message: string }> {
  const response = await apiClient.post<{ id: string; message: string }>("/Feedback", request)
  return response.data
}

export async function getFeedback(limit = 25): Promise<BetaFeedback[]> {
  const response = await apiClient.get<BetaFeedback[]>("/Feedback", { params: { limit } })
  return response.data
}
