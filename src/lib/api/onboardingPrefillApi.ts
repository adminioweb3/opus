import apiClient from "../apiClient"

export interface PrefillSuggestions {
  industry?: string
  description?: string
  targetAudience?: string
  suggestedKeywords: string[]
  confidence: number
}

export async function getOnboardingPrefillSuggestions(
  websiteUrl: string,
  businessName: string,
  scraperJobId?: string
): Promise<PrefillSuggestions> {
  try {
    const response = await apiClient.post("/onboarding/prefill-suggestions", {
      websiteUrl,
      businessName,
      scraperJobId,
    })
    return response.data
  } catch (error) {
    console.error("Failed to get prefill suggestions:", error)
    throw error
  }
}

export async function suggestKeywordsFromWebsite(
  websiteUrl: string,
  businessName: string,
  industry?: string
): Promise<string[]> {
  try {
    const response = await apiClient.post("/onboarding/suggest-keywords", {
      websiteUrl,
      businessName,
      industry,
    })
    return response.data.keywords || []
  } catch (error) {
    console.error("Failed to get keyword suggestions:", error)
    return []
  }
}

export async function detectIndustryFromWebsite(
  websiteUrl: string,
  businessName: string
): Promise<{ industry: string; alternatives: string[]; confidence: number }> {
  try {
    const response = await apiClient.post("/onboarding/detect-industry", {
      websiteUrl,
      businessName,
    })
    return response.data
  } catch (error) {
    console.error("Failed to detect industry:", error)
    return { industry: "", alternatives: [], confidence: 0 }
  }
}
