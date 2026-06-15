import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// --- ID Generation ---
let counter = 0
export function generateId(prefix = "id"): string {
  counter++
  return `${prefix}_${Date.now().toString(36)}_${counter.toString(36)}`
}

// --- Formatting ---
export function formatCurrency(amount: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency, minimumFractionDigits: 0 }).format(amount)
}

export function formatNumber(num: number): string {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}k`
  return num.toLocaleString()
}

export function formatDate(date: Date | string, style: "short" | "long" | "relative" = "short"): string {
  const d = typeof date === "string" ? new Date(date) : date
  if (style === "relative") {
    const now = new Date()
    const diffMs = now.getTime() - d.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    if (diffMins < 1) return "Just now"
    if (diffMins < 60) return `${diffMins}m ago`
    const diffHours = Math.floor(diffMins / 60)
    if (diffHours < 24) return `${diffHours}h ago`
    const diffDays = Math.floor(diffHours / 24)
    if (diffDays < 7) return `${diffDays}d ago`
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }
  if (style === "long") {
    return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
  }
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
}

// --- Mock API Delay ---
export function sleep(ms = 800): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// --- Permissions ---
export type UserRole = "superadmin" | "owner" | "admin" | "manager" | "analyst" | "viewer"

const PERMISSION_MATRIX: Record<string, UserRole[]> = {
  "dashboard.view": ["owner", "admin", "manager", "analyst", "viewer"],
  "monitoring.view": ["owner", "admin", "manager", "analyst", "viewer"],
  "monitoring.create": ["owner", "admin", "manager"],
  "monitoring.edit": ["owner", "admin", "manager"],
  "monitoring.delete": ["owner", "admin"],
  "brand.view": ["owner", "admin", "manager", "analyst", "viewer"],
  "competitors.view": ["owner", "admin", "manager", "analyst", "viewer"],
  "competitors.create": ["owner", "admin", "manager"],
  "competitors.edit": ["owner", "admin", "manager"],
  "competitors.delete": ["owner", "admin"],
  "reports.view": ["owner", "admin", "manager", "analyst", "viewer"],
  "reports.create": ["owner", "admin", "manager", "analyst"],
  "reports.delete": ["owner", "admin"],
  "alerts.view": ["owner", "admin", "manager", "analyst", "viewer"],
  "alerts.create": ["owner", "admin", "manager"],
  "alerts.delete": ["owner", "admin"],
  "team.view": ["owner", "admin", "manager"],
  "team.invite": ["owner", "admin"],
  "team.remove": ["owner", "admin"],
  "team.changeRole": ["owner"],
  "billing.view": ["owner", "admin"],
  "billing.manage": ["owner"],
  "integrations.view": ["owner", "admin", "manager"],
  "integrations.manage": ["owner", "admin"],
  "settings.view": ["owner", "admin", "manager"],
  "settings.manage": ["owner", "admin"],
  "apikeys.view": ["owner", "admin"],
  "apikeys.manage": ["owner", "admin"],
  "admin.access": ["owner"],
}

export function hasPermission(role: UserRole, permission: string): boolean {
  const allowed = PERMISSION_MATRIX[permission]
  if (!allowed) return false
  return allowed.includes(role)
}

// --- Data Generation ---
export function generateTimeSeriesData(
  days: number,
  baseValue: number,
  variance: number,
  trend: number = 0.5
): { date: string; value: number }[] {
  const data: { date: string; value: number }[] = []
  const now = new Date()
  let current = baseValue
  for (let i = days; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    current += (Math.random() - 0.5 + trend * 0.1) * variance
    current = Math.max(0, Math.min(100, current))
    data.push({
      date: date.toISOString().split("T")[0],
      value: Math.round(current * 10) / 10,
    })
  }
  return data
}

export function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}
