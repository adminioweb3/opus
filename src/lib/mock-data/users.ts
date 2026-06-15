import type { UserRole } from "@/lib/utils"

export interface MockUser {
  id: string
  email: string
  name: string
  avatar: string
  role: UserRole
  title: string
  department: string
  lastActive: string
  createdAt: string
  isVerified: boolean
  twoFactorEnabled: boolean
}

export const MOCK_USERS: MockUser[] = [
  {
    id: "usr_owner_001",
    email: "sarah.chen@acmecorp.com",
    name: "Sarah Chen",
    avatar: "SC",
    role: "owner",
    title: "VP of Marketing",
    department: "Marketing",
    lastActive: new Date().toISOString(),
    createdAt: "2024-03-15T10:00:00Z",
    isVerified: true,
    twoFactorEnabled: true,
  },
  {
    id: "usr_admin_002",
    email: "james.wright@acmecorp.com",
    name: "James Wright",
    avatar: "JW",
    role: "admin",
    title: "Head of Digital",
    department: "Marketing",
    lastActive: new Date(Date.now() - 3600000).toISOString(),
    createdAt: "2024-04-20T14:30:00Z",
    isVerified: true,
    twoFactorEnabled: true,
  },
  {
    id: "usr_mgr_003",
    email: "maria.garcia@acmecorp.com",
    name: "Maria Garcia",
    avatar: "MG",
    role: "manager",
    title: "SEO Manager",
    department: "Growth",
    lastActive: new Date(Date.now() - 7200000).toISOString(),
    createdAt: "2024-06-01T09:15:00Z",
    isVerified: true,
    twoFactorEnabled: false,
  },
  {
    id: "usr_analyst_004",
    email: "david.kim@acmecorp.com",
    name: "David Kim",
    avatar: "DK",
    role: "analyst",
    title: "AI Visibility Analyst",
    department: "Analytics",
    lastActive: new Date(Date.now() - 86400000).toISOString(),
    createdAt: "2024-08-10T11:00:00Z",
    isVerified: true,
    twoFactorEnabled: false,
  },
  {
    id: "usr_viewer_005",
    email: "emily.johnson@acmecorp.com",
    name: "Emily Johnson",
    avatar: "EJ",
    role: "viewer",
    title: "Content Strategist",
    department: "Content",
    lastActive: new Date(Date.now() - 172800000).toISOString(),
    createdAt: "2024-09-22T16:45:00Z",
    isVerified: true,
    twoFactorEnabled: false,
  },
]

export const DEMO_CREDENTIALS = {
  email: "sarah.chen@acmecorp.com",
  password: "demo1234",
}

export const MOCK_ORGANIZATION = {
  id: "org_acme_001",
  name: "Acme Corporation",
  domain: "acmecorp.com",
  industry: "Enterprise Software",
  plan: "business" as const,
  seats: 25,
  usedSeats: 5,
  createdAt: "2024-03-15T10:00:00Z",
  brandKeywords: ["Acme", "AcmeCorp", "Acme Corporation", "Acme Software", "Acme Platform"],
  trackedPlatforms: ["chatgpt", "gemini", "claude", "perplexity", "grok"],
  competitors: ["comp_001", "comp_002", "comp_003", "comp_004", "comp_005", "comp_006"],
  onboardingCompleted: true,
  onboardingStep: 8,
}
