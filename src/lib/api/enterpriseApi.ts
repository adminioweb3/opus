import apiClient from "../apiClient"

export interface SsoConnection {
  id: string
  organizationId: string
  provider: string
  domain: string
  metadataUrl: string
  entityId: string
  isEnabled: boolean
  scimEnabled: boolean
  hasScimToken: boolean
  createdAt: string
  updatedAt: string
}

export interface SsoOverview {
  configured: boolean
  connection: SsoConnection | null
  assertionConsumerServiceUrl: string
  scimBaseUrl: string
}

export interface AuditLog {
  id: string
  organizationId: string | null
  actorUserId: string | null
  actorEmail: string
  actorType: string
  action: string
  category: string
  outcome: string
  targetType: string
  targetId: string
  ipAddress: string
  userAgent: string
  metadataJson: string
  createdAt: string
}

export interface RetentionPolicy {
  id: string
  organizationId: string
  rawPromptEvidenceDays: number | null
  auditLogDays: number
  snapshotDays: number
  updatedAt: string
}

export interface DeletionPreview {
  organizationId: string
  scope: string
  mode: string
  totalRows: number
  tableCounts: Record<string, number>
}

export interface DataDeletionRequest {
  id: string
  organizationId: string
  requestedByUserId: string
  status: string
  scope: string
  reason: string
  requestedAt: string
  scheduledFor: string
  cancelledAt: string | null
  completedAt: string | null
}

export async function getSsoOverview(): Promise<SsoOverview> {
  const response = await apiClient.get<SsoOverview>("/Enterprise/sso")
  return response.data
}

export async function saveSsoConnection(request: {
  provider: string
  domain: string
  metadataUrl: string
  entityId: string
  isEnabled: boolean
}): Promise<SsoConnection> {
  const response = await apiClient.put<SsoConnection>("/Enterprise/sso", request)
  return response.data
}

export async function rotateScimToken(): Promise<{ token: string; message: string }> {
  const response = await apiClient.post<{ token: string; message: string }>("/Enterprise/sso/scim-token")
  return response.data
}

export async function getAuditLogs(limit = 50): Promise<AuditLog[]> {
  const response = await apiClient.get<AuditLog[]>("/AuditLogs", { params: { limit } })
  return response.data
}

export async function exportAuditLogs(limit = 1000): Promise<Blob> {
  const response = await apiClient.get<Blob>("/AuditLogs/export.csv", {
    params: { limit },
    responseType: "blob",
  })
  return response.data
}

export async function getRetentionPolicy(): Promise<RetentionPolicy> {
  const response = await apiClient.get<RetentionPolicy>("/DataLifecycle/retention-policy")
  return response.data
}

export async function saveRetentionPolicy(request: {
  rawPromptEvidenceDays?: number | null
  auditLogDays: number
  snapshotDays: number
}): Promise<RetentionPolicy> {
  const response = await apiClient.put<RetentionPolicy>("/DataLifecycle/retention-policy", request)
  return response.data
}

export async function getDeletionPreview(): Promise<DeletionPreview> {
  const response = await apiClient.get<DeletionPreview>("/DataLifecycle/deletion-preview")
  return response.data
}

export async function getDeletionRequests(): Promise<DataDeletionRequest[]> {
  const response = await apiClient.get<DataDeletionRequest[]>("/DataLifecycle/deletion-requests")
  return response.data
}
