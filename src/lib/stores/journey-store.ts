"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import { Recommendation, MOCK_RECOMMENDATIONS } from "../mock-data/journey"
import { type OnboardingAnalysisResult } from "../api/onboardingApi"

export type JourneyState = "not_started" | "onboarding" | "analyzing" | "paywall" | "subscribed"

interface AIJourneyStore {
  // Onboarding Data
  websiteUrl: string
  businessName: string
  industry: string
  country: string
  targetAudience: string
  services: string
  products: string
  keywords: string
  
  // State
  currentState: JourneyState
  hasSubscribed: boolean
  analysisResult: OnboardingAnalysisResult | null
  
  // Recommendations
  tasks: Recommendation[]
  
  // Actions
  updateOnboardingData: (data: Partial<Omit<AIJourneyStore, "currentState" | "hasSubscribed" | "tasks" | "updateOnboardingData" | "setState" | "setSubscribed" | "updateTaskStatus" | "deleteTask" | "analysisResult" | "setAnalysisResult">>) => void
  setAnalysisResult: (result: OnboardingAnalysisResult) => void
  setState: (state: JourneyState) => void
  setSubscribed: (val: boolean) => void
  updateTaskStatus: (id: string, status: Recommendation["status"]) => void
  deleteTask: (id: string) => void
  resetJourney: () => void
}

const initialState = {
  websiteUrl: "",
  businessName: "",
  industry: "",
  country: "",
  targetAudience: "",
  services: "",
  products: "",
  keywords: "",
  currentState: "not_started" as JourneyState,
  hasSubscribed: false,
  analysisResult: null as OnboardingAnalysisResult | null,
  tasks: MOCK_RECOMMENDATIONS,
}

export const useJourneyStore = create<AIJourneyStore>()(
  persist(
    (set) => ({
      ...initialState,

      updateOnboardingData: (data) =>
        set((state) => ({ ...state, ...data })),

      setState: (currentState) => set({ currentState }),
      
      setSubscribed: (hasSubscribed) => set({ hasSubscribed }),

      setAnalysisResult: (analysisResult) => set({ analysisResult }),

      updateTaskStatus: (id, status) =>
        set((state) => ({
          tasks: state.tasks.map(t => t.id === id ? { ...t, status } : t)
        })),

      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter(t => t.id !== id)
        })),

      resetJourney: () => set(initialState),
    }),
    { name: "citationly-journey" }
  )
)
