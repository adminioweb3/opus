"use client"

import { create } from "zustand"

interface UIState {
  commandPaletteOpen: boolean
  sidebarCollapsed: boolean
  activeDateRange: "7d" | "30d" | "90d" | "1y"
  activeModal: string | null
  isPageLoading: boolean
  toasts: Toast[]

  // Actions
  toggleCommandPalette: () => void
  setCommandPaletteOpen: (open: boolean) => void
  toggleSidebar: () => void
  setDateRange: (range: UIState["activeDateRange"]) => void
  openModal: (id: string) => void
  closeModal: () => void
  setPageLoading: (loading: boolean) => void
  addToast: (toast: Omit<Toast, "id">) => void
  removeToast: (id: string) => void
}

export interface Toast {
  id: string
  title: string
  description?: string
  variant: "default" | "success" | "error" | "warning"
  duration?: number
}

export const useUIStore = create<UIState>()((set) => ({
  commandPaletteOpen: false,
  sidebarCollapsed: false,
  activeDateRange: "30d",
  activeModal: null,
  isPageLoading: false,
  toasts: [],

  toggleCommandPalette: () =>
    set((state) => ({ commandPaletteOpen: !state.commandPaletteOpen })),

  setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),

  toggleSidebar: () =>
    set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

  setDateRange: (range) => set({ activeDateRange: range }),

  openModal: (id) => set({ activeModal: id }),

  closeModal: () => set({ activeModal: null }),

  setPageLoading: (loading) => set({ isPageLoading: loading }),

  addToast: (toast) => {
    const id = `toast_${Date.now()}`
    set((state) => ({
      toasts: [...state.toasts, { ...toast, id }],
    }))
    // Auto-dismiss after duration
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }))
    }, toast.duration ?? 4000)
  },

  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}))
