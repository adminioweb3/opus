"use client"

import { create } from "zustand"
import {
  getAlerts,
  markAlertRead,
  markAllAlertsRead,
  type AlertNotification,
} from "@/lib/api/alertsApi"

interface NotificationState {
  notifications: AlertNotification[]
  unreadCount: number
  isLoading: boolean
  loadNotifications: () => Promise<void>
  markAsRead: (id: string) => Promise<void>
  markAllAsRead: () => Promise<void>
  removeNotification: (id: string) => void
  clearAll: () => void
}

function unreadCount(notifications: AlertNotification[]) {
  return notifications.filter((n) => !n.isRead).length
}

export const useNotificationStore = create<NotificationState>()((set, get) => ({
  notifications: [],
  unreadCount: 0,
  isLoading: false,

  loadNotifications: async () => {
    set({ isLoading: true })
    try {
      const notifications = await getAlerts(50)
      set({ notifications, unreadCount: unreadCount(notifications) })
    } catch (err) {
      console.error("Failed to load alerts", err)
    } finally {
      set({ isLoading: false })
    }
  },

  markAsRead: async (id) => {
    const previous = get().notifications
    const notifications = previous.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    set({ notifications, unreadCount: unreadCount(notifications) })
    try {
      await markAlertRead(id)
    } catch (err) {
      console.error("Failed to mark alert read", err)
      set({ notifications: previous, unreadCount: unreadCount(previous) })
    }
  },

  markAllAsRead: async () => {
    const previous = get().notifications
    const notifications = previous.map((n) => ({ ...n, isRead: true }))
    set({ notifications, unreadCount: 0 })
    try {
      await markAllAlertsRead()
    } catch (err) {
      console.error("Failed to mark all alerts read", err)
      set({ notifications: previous, unreadCount: unreadCount(previous) })
    }
  },

  removeNotification: (id) =>
    set((state) => {
      const notifications = state.notifications.filter((n) => n.id !== id)
      return { notifications, unreadCount: unreadCount(notifications) }
    }),

  clearAll: () => set({ notifications: [], unreadCount: 0 }),
}))
