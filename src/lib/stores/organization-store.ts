"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

interface OnboardingState {
  currentStep: number
  completed: boolean
  data: {
    companyName: string
    companyDomain: string
    industry: string
    competitors: string[]
    brandKeywords: string[]
    aiPlatforms: string[]
    invitedEmails: string[]
    dashboardWidgets: string[]
  }
}

interface OrganizationState {
  orgId: string
  orgName: string
  orgDomain: string
  industry: string
  plan: "starter" | "growth" | "business" | "enterprise"
  onboarding: OnboardingState

  // Actions
  updateOnboardingStep: (step: number) => void
  updateOnboardingData: (data: Partial<OnboardingState["data"]>) => void
  completeOnboarding: () => void
  resetOnboarding: () => void
  updateOrg: (data: Partial<{ orgName: string; orgDomain: string; industry: string }>) => void
  upgradePlan: (plan: OrganizationState["plan"]) => void
}

export const useOrganizationStore = create<OrganizationState>()(
  persist(
    (set) => ({
      orgId: "org_acme_001",
      orgName: "Acme Corporation",
      orgDomain: "acmecorp.com",
      industry: "Enterprise Software",
      plan: "business",
      onboarding: {
        currentStep: 1,
        completed: true,
        data: {
          companyName: "Acme Corporation",
          companyDomain: "acmecorp.com",
          industry: "Enterprise Software",
          competitors: ["tryprofound.com", "brightedge.com", "semrush.com"],
          brandKeywords: ["Acme", "AcmeCorp", "Acme Corporation", "OPUS"],
          aiPlatforms: ["chatgpt", "gemini", "claude", "perplexity", "grok"],
          invitedEmails: [],
          dashboardWidgets: ["visibility", "mentions", "sentiment", "citations"],
        },
      },

      updateOnboardingStep: (step) =>
        set((state) => ({
          onboarding: { ...state.onboarding, currentStep: step },
        })),

      updateOnboardingData: (data) =>
        set((state) => ({
          onboarding: {
            ...state.onboarding,
            data: { ...state.onboarding.data, ...data },
          },
        })),

      completeOnboarding: () =>
        set((state) => ({
          onboarding: { ...state.onboarding, completed: true, currentStep: 8 },
        })),

      resetOnboarding: () =>
        set((state) => ({
          onboarding: {
            ...state.onboarding,
            completed: false,
            currentStep: 1,
            data: {
              companyName: "",
              companyDomain: "",
              industry: "",
              competitors: [],
              brandKeywords: [],
              aiPlatforms: [],
              invitedEmails: [],
              dashboardWidgets: [],
            },
          },
        })),

      updateOrg: (data) => set((state) => ({ ...state, ...data })),

      upgradePlan: (plan) => set({ plan }),
    }),
    { name: "opus-organization" }
  )
)
