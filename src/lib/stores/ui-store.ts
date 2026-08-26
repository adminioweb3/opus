"use client"

import { create } from "zustand"

interface UIState {
  commandPaletteOpen: boolean
  sidebarCollapsed: boolean
  activeDateRange: "7d" | "30d" | "90d" | "1y"
  activeModal: string | null
  isPageLoading: boolean

  // Actions
  toggleCommandPalette: () => void
  setCommandPaletteOpen: (open: boolean) => void
  toggleSidebar: () => void
  setDateRange: (range: UIState["activeDateRange"]) => void
  openModal: (id: string) => void
  closeModal: () => void
  setPageLoading: (loading: boolean) => void
}

export const useUIStore = create<UIState>()((set) => ({
  commandPaletteOpen: false,
  sidebarCollapsed: false,
  activeDateRange: "30d",
  activeModal: null,
  isPageLoading: false,

  toggleCommandPalette: () =>
    set((state) => ({ commandPaletteOpen: !state.commandPaletteOpen })),

  setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),

  toggleSidebar: () =>
    set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

  setDateRange: (range) => set({ activeDateRange: range }),

  openModal: (id) => set({ activeModal: id }),

  closeModal: () => set({ activeModal: null }),

  setPageLoading: (loading) => set({ isPageLoading: loading }),
}))
