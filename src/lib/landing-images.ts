// Curated, verified real photography (Unsplash CDN) — no illustrations, no stock icon art.
// Each entry is a real, licensed-for-use photo id resolved directly from images.unsplash.com.

function unsplash(id: string, w: number, q = 80) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=${q}`;
}

export const LANDING_PHOTOS = {
  heroWorkspace: (w = 1600) => unsplash("1522071820081-009f0129c71c", w),
  teamCollab: (w = 1200) => unsplash("1552664730-d307ca884978", w),
  teamMeeting: (w = 1200) => unsplash("1521737604893-d14cc237f11d", w),
  officeInterior: (w = 1200) => unsplash("1600880292203-757bb62b4baf", w),
  executiveMeeting: (w = 1200) => unsplash("1517245386807-bb43f82c33c4", w),
  teamTable: (w = 1200) => unsplash("1531482615713-2afd69097998", w),
  darkAnalyticsRoom: (w = 1200) => unsplash("1460925895917-afdab827c52f", w),
  workspaceDesk: (w = 1200) => unsplash("1573164713988-8665fc963095", w),
  teamAtMonitor: (w = 1200) => unsplash("1573497491208-6b1acb260507", w),
  teamWorking: (w = 1200) => unsplash("1551434678-e076c223a692", w),
  modernDesk: (w = 1200) => unsplash("1551288049-bebda4e38f71", w),
  developerDark: (w = 1200) => unsplash("1487017159836-4e23ece2e4cf", w),
  startupOffice: (w = 1200) => unsplash("1556761175-5973dc0f32e7", w),
  teamSuccess: (w = 1200) => unsplash("1519389950473-47ba0277781c", w),
  boardroom: (w = 1200) => unsplash("1519085360753-af0119f7cbe7", w),
} as const;

export const TESTIMONIAL_PORTRAITS = {
  p1: unsplash("1494790108377-be9c29b29330", 200),
  p2: unsplash("1560250097-0b93528c311a", 200),
  p3: unsplash("1573497019940-1c28c88b4f3e", 200),
  p4: unsplash("1500648767791-00dcc994a43e", 200),
  p5: unsplash("1519244703995-f4e0f30006d5", 200),
  p6: unsplash("1580489944761-15a19d654956", 200),
} as const;
