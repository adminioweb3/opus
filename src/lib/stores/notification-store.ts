"use client"

import { create } from "zustand"
import { MOCK_NOTIFICATIONS, type AlertNotification } from "@/lib/mock-data/alerts"

interface NotificationState {
  notifications: AlertNotification[]
  unreadCount: number

  // Actions
  addNotification: (notification: Omit<AlertNotification, "id" | "createdAt" | "read">) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  removeNotification: (id: string) => void
  clearAll: () => void
}

export const useNotificationStore = create<NotificationState>()((set, get) => ({
  notifications: MOCK_NOTIFICATIONS,
  unreadCount: MOCK_NOTIFICATIONS.filter((n) => !n.read).length,

  addNotification: (notification) => {
    const newNotification: AlertNotification = {
      ...notification,
      id: `not_${Date.now()}`,
      createdAt: new Date().toISOString(),
      read: false,
    }
    set((state) => ({
      notifications: [newNotification, ...state.notifications],
      unreadCount: state.unreadCount + 1,
    }))
  },

  markAsRead: (id) =>
    set((state) => {
      const notifications = state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      )
      return {
        notifications,
        unreadCount: notifications.filter((n) => !n.read).length,
      }
    }),

  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
      unreadCount: 0,
    })),

  removeNotification: (id) =>
    set((state) => {
      const notifications = state.notifications.filter((n) => n.id !== id)
      return {
        notifications,
        unreadCount: notifications.filter((n) => !n.read).length,
      }
    }),

  clearAll: () => set({ notifications: [], unreadCount: 0 }),
}))
