import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface OrganizationState {
  organizationId: string;
  needsOnboarding: boolean;
  planType: string;
  trialEndsAt: string | null;
  isTrialExpired: boolean;
  setOrganizationId: (id: string) => void;
  setSyncResult: (result: {
    organizationId: string;
    needsOnboarding: boolean;
    planType: string;
    trialEndsAt: string | null;
    isTrialExpired: boolean;
  }) => void;
}

// Default dummy Organization ID for demo purposes
const DUMMY_ORG_ID = '3fa85f64-5717-4562-b3fc-2c963f66afa6';

export const useOrganizationStore = create<OrganizationState>()(
  persist(
    (set) => ({
      organizationId: DUMMY_ORG_ID,
      needsOnboarding: false,
      planType: 'Trial',
      trialEndsAt: null,
      isTrialExpired: false,
      setOrganizationId: (id: string) => set({ organizationId: id }),
      setSyncResult: (result) =>
        set({
          organizationId: result.organizationId,
          needsOnboarding: result.needsOnboarding,
          planType: result.planType,
          trialEndsAt: result.trialEndsAt,
          isTrialExpired: result.isTrialExpired,
        }),
    }),
    {
      name: 'citationly-organization-store',
    }
  )
);
