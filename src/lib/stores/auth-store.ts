"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { UserRole } from "@/lib/utils"
import { MOCK_USERS, DEMO_CREDENTIALS, type MockUser } from "@/lib/mock-data/users"

interface AuthState {
  user: MockUser | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  sessionStartedAt: string | null
  registeredUsers: MockUser[]
  registeredCredentials: Record<string, string>

  // Actions
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  clearError: () => void
  switchRole: (role: UserRole) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      sessionStartedAt: null,
      registeredUsers: [],
      registeredCredentials: {},

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null })
        // Simulate API delay
        await new Promise(r => setTimeout(r, 1000))

        // Check demo credentials
        const matchedDemoUser = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase())
        if (matchedDemoUser && (password === DEMO_CREDENTIALS.password || password === "demo1234")) {
          set({
            user: { ...matchedDemoUser, lastActive: new Date().toISOString() },
            isAuthenticated: true,
            isLoading: false,
            error: null,
            sessionStartedAt: new Date().toISOString(),
          })
          return true
        }

        // Check registered users
        const matchedRegisteredUser = get().registeredUsers.find(u => u.email.toLowerCase() === email.toLowerCase())
        if (matchedRegisteredUser && get().registeredCredentials[email.toLowerCase()] === password) {
          set({
            user: { ...matchedRegisteredUser, lastActive: new Date().toISOString() },
            isAuthenticated: true,
            isLoading: false,
            error: null,
            sessionStartedAt: new Date().toISOString(),
          })
          return true
        }

        set({ isLoading: false, error: "Invalid email or password. Try demo credentials." })
        return false
      },

      register: async (name: string, email: string, password: string) => {
        set({ isLoading: true, error: null })
        await new Promise(r => setTimeout(r, 1200))

        const lowerEmail = email.toLowerCase()

        // Check if email already exists
        if (MOCK_USERS.find(u => u.email.toLowerCase() === lowerEmail) || get().registeredUsers.find(u => u.email.toLowerCase() === lowerEmail)) {
          set({ isLoading: false, error: "An account with this email already exists." })
          return false
        }

        const newUser: MockUser = {
          id: `usr_new_${Date.now()}`,
          email,
          name,
          avatar: name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2),
          role: "owner",
          title: "Founder",
          department: "Leadership",
          lastActive: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          isVerified: false,
          twoFactorEnabled: false,
        }

        set((state) => ({
          user: newUser,
          isAuthenticated: true,
          isLoading: false,
          error: null,
          sessionStartedAt: new Date().toISOString(),
          registeredUsers: [...state.registeredUsers, newUser],
          registeredCredentials: { ...state.registeredCredentials, [lowerEmail]: password }
        }))
        return true
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
          sessionStartedAt: null,
        })
      },

      clearError: () => set({ error: null }),

      // Dev helper: switch role for testing permissions
      switchRole: (role: UserRole) => {
        const current = get().user
        if (current) {
          const matchedUser = MOCK_USERS.find(u => u.role === role)
          if (matchedUser) {
            set({ user: { ...matchedUser, lastActive: new Date().toISOString() } })
          }
        }
      },
    }),
    {
      name: "opus-auth",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        sessionStartedAt: state.sessionStartedAt,
        registeredUsers: state.registeredUsers,
        registeredCredentials: state.registeredCredentials,
      }),
    }
  )
)
