import apiClient from "../apiClient"

export interface SubscriptionRecord {
  id: string
  organizationId: string
  stripeSubscriptionId: string | null
  cashfreeSubscriptionId: string | null
  planKey: string
  status: string
  currentPeriodStart: string | null
  currentPeriodEnd: string | null
  cancelAtPeriodEnd: boolean
  createdAt: string
  updatedAt: string
}

export interface GetSubscriptionResponse {
  billingConfigured: boolean
  subscription: SubscriptionRecord | null
}

export interface BillingUsageMetric {
  label: string
  metricKey: string
  currentUsage: number
  limit: number | null
  unit: string
}

export interface BillingUsageResponse {
  planKey: string
  periodStart: string
  periodEnd: string
  monthlyPeriodStart: string
  monthlyPeriodEnd: string
  aiCalls: BillingUsageMetric
  estimatedAiSpend: BillingUsageMetric
  publicApiCalls: BillingUsageMetric
  openRouterSpend: BillingUsageMetric
  exaSpend: BillingUsageMetric
  recurringScanIntervalDays: number | null
}

export interface InvoiceRecord {
  id: string
  organizationId: string
  stripeInvoiceId: string | null
  amountDueCents: number
  amountPaidCents: number
  currency: string
  status: string
  hostedInvoiceUrl: string | null
  issuedAt: string | null
  createdAt: string
}

export interface PaymentMethodRecord {
  id: string
  organizationId: string
  stripePaymentMethodId: string | null
  brand: string | null
  last4: string | null
  expMonth: number | null
  expYear: number | null
  isDefault: boolean
  createdAt: string
}

export async function getSubscription(): Promise<GetSubscriptionResponse> {
  const response = await apiClient.get<GetSubscriptionResponse>("/Billing/subscription")
  return response.data
}

export async function getBillingUsage(): Promise<BillingUsageResponse> {
  const response = await apiClient.get<BillingUsageResponse>("/Billing/usage")
  return response.data
}

export async function getInvoices(): Promise<InvoiceRecord[]> {
  const response = await apiClient.get<InvoiceRecord[]>("/Billing/invoices")
  return response.data
}

export async function getPaymentMethods(): Promise<PaymentMethodRecord[]> {
  const response = await apiClient.get<PaymentMethodRecord[]>("/Billing/payment-methods")
  return response.data
}

export interface CashfreeSubscriptionSession {
  subscriptionId: string
  sessionId: string
  status: string
  environment: "sandbox" | "production"
}

export async function createSubscriptionSession(
  planKey: string,
  customerName: string,
  customerEmail: string,
  customerPhone: string,
): Promise<CashfreeSubscriptionSession> {
  const origin = window.location.origin
  const response = await apiClient.post<CashfreeSubscriptionSession>("/Billing/subscription-session", {
    planKey,
    customerName,
    customerEmail,
    customerPhone,
    returnUrl: `${origin}/dashboard/settings?billing=return`,
  })
  return response.data
}

export async function cancelSubscription(): Promise<void> {
  await apiClient.post("/Billing/subscription/cancel")
}

/** Surfaces the real backend message (e.g. "Billing is not configured yet...") instead of a
 * generic failure string, so a 501 reads as an honest status, not a broken button. */
export function extractBillingErrorMessage(err: unknown, fallback: string): string {
  const maybeAxiosError = err as { response?: { data?: { message?: string } } }
  return maybeAxiosError?.response?.data?.message ?? fallback
}
