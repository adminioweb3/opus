import apiClient from "../apiClient"
import type { FullReportData } from "./reportApi"

export interface Agency {
  id: string
  ownerOrganizationId: string
  name: string
  createdAt: string
}

export interface AgencyClient {
  id: string
  agencyId: string
  clientOrganizationId: string
  clientName: string
  role: string
  createdAt: string
}

export interface WhiteLabelSettings {
  id: string
  agencyId: string
  brandName: string
  logoUrl: string
  primaryColor: string
  updatedAt: string
}

export interface AgencyOverview {
  configured: boolean
  agency: Agency | null
  clients: AgencyClient[]
  whiteLabel: WhiteLabelSettings | null
}

export interface ReportShareLink {
  id: string
  token: string
  expiresAt: string
  apiUrl: string
  shareUrl: string
}

export interface SharedReportResponse {
  provenance: string
  reportType: string
  expiresAt: string
  whiteLabel: WhiteLabelSettings | null
  report: FullReportData
}

export async function getAgencyOverview(): Promise<AgencyOverview> {
  const response = await apiClient.get<AgencyOverview>("/Agency")
  return response.data
}

export async function saveAgency(name: string): Promise<Agency> {
  const response = await apiClient.post<Agency>("/Agency", { name })
  return response.data
}

export async function addAgencyClient(request: {
  clientOrganizationId: string
  clientName: string
  role?: string
}): Promise<AgencyClient> {
  const response = await apiClient.post<AgencyClient>("/Agency/clients", request)
  return response.data
}

export async function saveWhiteLabel(request: {
  brandName: string
  logoUrl?: string
  primaryColor: string
}): Promise<WhiteLabelSettings> {
  const response = await apiClient.put<WhiteLabelSettings>("/Agency/white-label", request)
  return response.data
}

export async function createReportShareLink(request: {
  organizationId?: string
  reportType?: string
  expiresInDays?: number
}): Promise<ReportShareLink> {
  const response = await apiClient.post<ReportShareLink>("/Agency/report-links", request)
  return response.data
}

export async function revokeReportShareLink(id: string): Promise<void> {
  await apiClient.delete(`/Agency/report-links/${encodeURIComponent(id)}`)
}

export async function getSharedReport(token: string): Promise<SharedReportResponse> {
  const response = await apiClient.get<SharedReportResponse>(`/Agency/public/reports/${encodeURIComponent(token)}`)
  return response.data
}
