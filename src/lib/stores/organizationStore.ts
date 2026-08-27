import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface OrganizationState {
  organizationId: string;
  organizationName: string;
  websiteDomain: string;
  needsOnboarding: boolean;
  planType: string;
  trialEndsAt: string | null;
  isTrialExpired: boolean;
  industry: string | null;
  setOrganizationId: (id: string) => void;
  setSyncResult: (result: {
    organizationId: string;
    organizationName?: string;
    websiteDomain?: string;
    needsOnboarding: boolean;
    planType: string;
    trialEndsAt: string | null;
    isTrialExpired: boolean;
    industry?: string | null;
  }) => void;
}

// Default empty string for Organization ID
const DUMMY_ORG_ID = '';

export const useOrganizationStore = create<OrganizationState>()(
  persist(
    (set) => ({
      organizationId: DUMMY_ORG_ID,
      organizationName: '',
      websiteDomain: '',
      needsOnboarding: false,
      planType: 'Trial',
      trialEndsAt: null,
      isTrialExpired: false,
      industry: null,
      setOrganizationId: (id: string) => set({ organizationId: id }),
      setSyncResult: (result) =>
        set({
          organizationId: result.organizationId,
          organizationName: result.organizationName ?? '',
          websiteDomain: result.websiteDomain ?? '',
          needsOnboarding: result.needsOnboarding,
          planType: result.planType,
          trialEndsAt: result.trialEndsAt,
          isTrialExpired: result.isTrialExpired,
          industry: result.industry ?? null,
        }),
    }),
    {
      name: 'citationly-organization-store',
    }
  )
);
