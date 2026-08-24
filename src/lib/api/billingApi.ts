import apiClient from "../apiClient"

export interface SubscriptionRecord {
  id: string
  organizationId: string
  stripeSubscriptionId: string | null
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

export async function getInvoices(): Promise<InvoiceRecord[]> {
  const response = await apiClient.get<InvoiceRecord[]>("/Billing/invoices")
  return response.data
}

export async function getPaymentMethods(): Promise<PaymentMethodRecord[]> {
  const response = await apiClient.get<PaymentMethodRecord[]>("/Billing/payment-methods")
  return response.data
}

export async function createCheckoutSession(planKey: string): Promise<{ url: string }> {
  const origin = window.location.origin
  const response = await apiClient.post<{ url: string }>("/Billing/checkout-session", {
    planKey,
    successUrl: `${origin}/dashboard/settings?billing=success`,
    cancelUrl: `${origin}/dashboard/settings?billing=cancelled`,
  })
  return response.data
}

export async function createPortalSession(): Promise<{ url: string }> {
  const origin = window.location.origin
  const response = await apiClient.post<{ url: string }>("/Billing/portal-session", {
    returnUrl: `${origin}/dashboard/settings`,
  })
  return response.data
}

/** Surfaces the real backend message (e.g. "Billing is not configured yet...") instead of a
 * generic failure string, so a 501 reads as an honest status, not a broken button. */
export function extractBillingErrorMessage(err: unknown, fallback: string): string {
  const maybeAxiosError = err as { response?: { data?: { message?: string } } }
  return maybeAxiosError?.response?.data?.message ?? fallback
}
