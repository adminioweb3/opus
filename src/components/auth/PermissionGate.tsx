"use client"

import { useAuthStore } from "@/lib/stores/auth-store"
import { hasPermission, type UserRole } from "@/lib/utils"

interface PermissionGateProps {
  permission: string
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function PermissionGate({ permission, children, fallback = null }: PermissionGateProps) {
  const { user } = useAuthStore()
  
  if (!user) return <>{fallback}</>
  
  if (!hasPermission(user.role, permission)) {
    return <>{fallback}</>
  }

  return <>{children}</>
}

// Hook version for programmatic checks
export function usePermission(permission: string): boolean {
  const { user } = useAuthStore()
  if (!user) return false
  return hasPermission(user.role, permission)
}
