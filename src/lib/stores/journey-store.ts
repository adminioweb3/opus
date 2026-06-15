"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import { Recommendation, MOCK_RECOMMENDATIONS } from "../mock-data/journey"

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
  competitors: string[]
  rankingGoal: string
  
  // State
  currentState: JourneyState
  hasSubscribed: boolean
  
  // Recommendations
  tasks: Recommendation[]
  
  // Actions
  updateOnboardingData: (data: Partial<Omit<AIJourneyStore, "currentState" | "hasSubscribed" | "tasks" | "updateOnboardingData" | "setState" | "setSubscribed" | "addCompetitor" | "removeCompetitor" | "updateTaskStatus" | "deleteTask">>) => void
  addCompetitor: (competitor: string) => void
  removeCompetitor: (competitor: string) => void
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
  competitors: [],
  rankingGoal: "",
  currentState: "not_started" as JourneyState,
  hasSubscribed: false,
  tasks: MOCK_RECOMMENDATIONS,
}

export const useJourneyStore = create<AIJourneyStore>()(
  persist(
    (set) => ({
      ...initialState,

      updateOnboardingData: (data) =>
        set((state) => ({ ...state, ...data })),

      addCompetitor: (competitor) =>
        set((state) => ({ competitors: [...state.competitors, competitor] })),

      removeCompetitor: (competitor) =>
        set((state) => ({ competitors: state.competitors.filter(c => c !== competitor) })),

      setState: (currentState) => set({ currentState }),
      
      setSubscribed: (hasSubscribed) => set({ hasSubscribed }),

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
    { name: "opus-journey" }
  )
)
