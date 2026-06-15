export interface PricingPlan {
  id: string
  name: string
  price: number
  interval: "month" | "year"
  description: string
  features: string[]
  limits: { prompts: number; competitors: number; seats: number; apiCalls: number }
  popular: boolean
  cta: string
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "plan_starter",
    name: "Starter",
    price: 49,
    interval: "month",
    description: "For individuals and small teams getting started with AI visibility.",
    features: [
      "3 monitored prompts",
      "2 competitors tracked",
      "ChatGPT + Gemini monitoring",
      "Weekly reports",
      "Email alerts",
      "1 team seat",
      "Community support",
    ],
    limits: { prompts: 3, competitors: 2, seats: 1, apiCalls: 1000 },
    popular: false,
    cta: "Start Free Trial",
  },
  {
    id: "plan_growth",
    name: "Growth",
    price: 149,
    interval: "month",
    description: "For growing teams scaling their AI presence strategy.",
    features: [
      "15 monitored prompts",
      "5 competitors tracked",
      "All 5 AI platforms",
      "Daily reports",
      "Real-time alerts",
      "5 team seats",
      "API access (10k calls/mo)",
      "Slack integration",
      "Priority support",
    ],
    limits: { prompts: 15, competitors: 5, seats: 5, apiCalls: 10000 },
    popular: true,
    cta: "Start Free Trial",
  },
  {
    id: "plan_business",
    name: "Business",
    price: 399,
    interval: "month",
    description: "For established teams needing advanced analytics and integrations.",
    features: [
      "50 monitored prompts",
      "15 competitors tracked",
      "All 5 AI platforms",
      "Real-time monitoring",
      "Custom reports + scheduling",
      "25 team seats",
      "API access (100k calls/mo)",
      "All integrations",
      "SSO / SAML",
      "Dedicated account manager",
    ],
    limits: { prompts: 50, competitors: 15, seats: 25, apiCalls: 100000 },
    popular: false,
    cta: "Contact Sales",
  },
  {
    id: "plan_enterprise",
    name: "Enterprise",
    price: 0,
    interval: "month",
    description: "Custom deployment for large organizations with advanced needs.",
    features: [
      "Unlimited prompts",
      "Unlimited competitors",
      "All AI platforms + custom",
      "Real-time + predictive analytics",
      "White-label reports",
      "Unlimited seats",
      "Unlimited API access",
      "All integrations + custom",
      "SSO / SAML / SCIM",
      "SLA guarantee",
      "On-premise option",
      "24/7 premium support",
    ],
    limits: { prompts: -1, competitors: -1, seats: -1, apiCalls: -1 },
    popular: false,
    cta: "Contact Sales",
  },
]

export interface Invoice {
  id: string
  date: string
  amount: number
  status: "paid" | "pending" | "failed"
  plan: string
  downloadUrl: string
}

export const MOCK_INVOICES: Invoice[] = [
  { id: "inv_001", date: "2025-06-01", amount: 399, status: "paid", plan: "Business", downloadUrl: "#" },
  { id: "inv_002", date: "2025-05-01", amount: 399, status: "paid", plan: "Business", downloadUrl: "#" },
  { id: "inv_003", date: "2025-04-01", amount: 399, status: "paid", plan: "Business", downloadUrl: "#" },
  { id: "inv_004", date: "2025-03-01", amount: 399, status: "paid", plan: "Business", downloadUrl: "#" },
  { id: "inv_005", date: "2025-02-01", amount: 149, status: "paid", plan: "Growth", downloadUrl: "#" },
  { id: "inv_006", date: "2025-01-01", amount: 149, status: "paid", plan: "Growth", downloadUrl: "#" },
  { id: "inv_007", date: "2024-12-01", amount: 149, status: "paid", plan: "Growth", downloadUrl: "#" },
  { id: "inv_008", date: "2024-11-01", amount: 149, status: "paid", plan: "Growth", downloadUrl: "#" },
]

export const MOCK_PAYMENT_METHODS = [
  { id: "pm_001", type: "visa" as const, last4: "4242", expiry: "12/27", isDefault: true },
  { id: "pm_002", type: "mastercard" as const, last4: "8888", expiry: "09/26", isDefault: false },
]

export const BILLING_USAGE = {
  prompts: { used: 32, limit: 50, percentage: 64 },
  competitors: { used: 6, limit: 15, percentage: 40 },
  seats: { used: 5, limit: 25, percentage: 20 },
  apiCalls: { used: 42850, limit: 100000, percentage: 42.85 },
}
