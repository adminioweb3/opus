import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface OrganizationState {
  organizationId: string;
  setOrganizationId: (id: string) => void;
}

// Default dummy Organization ID for demo purposes
const DUMMY_ORG_ID = '3fa85f64-5717-4562-b3fc-2c963f66afa6';

export const useOrganizationStore = create<OrganizationState>()(
  persist(
    (set) => ({
      organizationId: DUMMY_ORG_ID,
      setOrganizationId: (id: string) => set({ organizationId: id }),
    }),
    {
      name: 'opus-organization-store',
    }
  )
);
