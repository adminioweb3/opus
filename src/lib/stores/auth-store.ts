"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import { auth, googleProvider, githubProvider } from "@/lib/firebase"
import { signInWithPopup, signOut, User, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth"
import type { UserRole } from "@/lib/utils"
import { MOCK_USERS, DEMO_CREDENTIALS, type MockUser } from "@/lib/mock-data/users"
import { syncUserToBackend } from "@/lib/api/authApi"

interface AuthState {
  user: User | MockUser | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null

  // Actions
  loginWithGoogle: () => Promise<boolean>
  loginWithGithub: () => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  login: (email: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
  clearError: () => void
  setAuthData: (user: User | MockUser | null, token: string | null) => void
  switchRole: (role: UserRole) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      loginWithGoogle: async () => {
        set({ isLoading: true, error: null })
        try {
          const result = await signInWithPopup(auth, googleProvider)
          const token = await result.user.getIdToken()
          
          set({
            user: result.user,
            token,
          })

          try {
            const syncRes = await syncUserToBackend()
            import('@/lib/stores/organizationStore').then(({ useOrganizationStore }) => {
              if (syncRes.organizationId) {
                useOrganizationStore.getState().setOrganizationId(syncRes.organizationId)
              }
            })
          } catch (syncError) {
            console.error("Backend sync failed:", syncError)
          }

          set({
            isAuthenticated: true,
            isLoading: false,
            error: null,
          })
          return true
        } catch (error: unknown) {
          console.error("Google Sign In Error:", error)
          const errorMessage = error instanceof Error ? error.message : "Failed to sign in with Google."
          set({ isLoading: false, error: errorMessage })
          return false
        }
      },

      loginWithGithub: async () => {
        set({ isLoading: true, error: null })
        try {
          const result = await signInWithPopup(auth, githubProvider)
          const token = await result.user.getIdToken()
          
          set({
            user: result.user,
            token,
          })

          try {
            const syncRes = await syncUserToBackend()
            import('@/lib/stores/organizationStore').then(({ useOrganizationStore }) => {
              if (syncRes.organizationId) {
                useOrganizationStore.getState().setOrganizationId(syncRes.organizationId)
              }
            })
          } catch (syncError) {
            console.error("Backend sync failed:", syncError)
          }

          set({
            isAuthenticated: true,
            isLoading: false,
            error: null,
          })
          return true
        } catch (error: unknown) {
          console.error("Github Sign In Error:", error)
          const err = error as Error & { code?: string }
          let errorMessage = err.message || "Failed to sign in with Github."
          
          if (err.code === 'auth/account-exists-with-different-credential') {
            errorMessage = "An account already exists with the same email address but different sign-in credentials. Please sign in using Google instead."
          }

          set({ isLoading: false, error: errorMessage })
          return false
        }
      },

      register: async (name: string, email: string, password: string) => {
        set({ isLoading: true, error: null })
        try {
          const result = await createUserWithEmailAndPassword(auth, email, password)
          
          if (result.user) {
            await updateProfile(result.user, { displayName: name })
          }

          const token = await result.user.getIdToken()
          
          set({
            user: result.user,
            token,
          })

          try {
            const syncRes = await syncUserToBackend()
            import('@/lib/stores/organizationStore').then(({ useOrganizationStore }) => {
              if (syncRes.organizationId) {
                useOrganizationStore.getState().setOrganizationId(syncRes.organizationId)
              }
            })
          } catch (syncError) {
            console.error("Backend sync failed:", syncError)
          }

          set({
            isAuthenticated: true,
            isLoading: false,
            error: null,
          })
          return true
        } catch (error: unknown) {
          console.error("Register Error:", error)
          const err = error as Error & { code?: string }
          let errorMessage = err.message || "Failed to create account."
          
          if (err.code === 'auth/email-already-in-use') {
            errorMessage = "An account with this email already exists. Please log in instead."
          } else if (err.code === 'auth/weak-password') {
            errorMessage = "The password is too weak. Please use at least 6 characters."
          } else if (err.code === 'auth/invalid-email') {
            errorMessage = "The email address is invalid."
          } else if (err.code === 'auth/operation-not-allowed') {
            errorMessage = "Email/Password sign-in is not enabled in the Firebase Console. Please enable it."
          }

          set({ isLoading: false, error: errorMessage })
          return false
        }
      },

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null })
        
        // 1. Check Demo Credentials fallback
        const matchedDemoUser = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase())
        if (matchedDemoUser && (password === DEMO_CREDENTIALS.password || password === "demo1234")) {
          set({
            user: { ...matchedDemoUser, lastActive: new Date().toISOString() },
            token: "demo-token",
            isAuthenticated: true,
            isLoading: false,
            error: null,
          })
          return true
        }

        // 2. Real Firebase Auth
        try {
          const result = await signInWithEmailAndPassword(auth, email, password)
          const token = await result.user.getIdToken()

          set({
            user: result.user,
            token,
          })

          try {
            const syncRes = await syncUserToBackend()
            import('@/lib/stores/organizationStore').then(({ useOrganizationStore }) => {
              if (syncRes.organizationId) {
                useOrganizationStore.getState().setOrganizationId(syncRes.organizationId)
              }
            })
          } catch (syncError) {
            console.error("Backend sync failed:", syncError)
          }

          set({
            isAuthenticated: true,
            isLoading: false,
            error: null,
          })
          return true
        } catch (error: unknown) {
          console.error("Login Error:", error)
          const err = error as Error & { code?: string }
          let errorMessage = err.message || "Invalid email or password."
          
          if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
            errorMessage = "Invalid email or password."
          } else if (err.code === 'auth/operation-not-allowed') {
            errorMessage = "Email/Password sign-in is not enabled in the Firebase Console. Please enable it."
          }

          set({ isLoading: false, error: errorMessage })
          return false
        }
      },

      logout: async () => {
        set({ isLoading: true })
        try {
          await signOut(auth)
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          })
        } catch (error) {
          console.error("Logout error", error)
          set({ isLoading: false })
        }
      },

      clearError: () => set({ error: null }),
      
      setAuthData: (user: User | MockUser | null, token: string | null) => {
        set({
          user,
          token,
          isAuthenticated: !!user,
        })
      },

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
      name: "opus-firebase-auth",
      partialize: (state) => ({
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)
