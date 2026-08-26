# Frontend Loading And Toast Guide

Last updated: 2026-08-26

## Canonical Toast Pattern

- Use `import { toast } from "@/lib/toast"` in application code.
- Do not import `toast` directly from `sonner` outside `frontend/src/lib/toast.ts`.
- The only mounted toaster is `AppToaster` in `frontend/src/components/ui/app-toaster.tsx`, rendered from `frontend/src/app/layout.tsx`.
- Keep toast copy short and action-oriented:
  - Success: `toast.success("Report exported")`
  - Error: `toast.error("Failed to load visibility data")`
  - Info: `toast.info("Nothing to configure for this chart")`

## Canonical Loading Pattern

- Use `frontend/src/components/ui/loader.tsx` for new loading states.
- `PageLoader`: full-page or route guard loading, such as auth/admin/report pages.
- `SectionLoader`: dashboard panels, tables, cards, and data sections waiting for API data.
- `InlineLoader`: inside buttons or compact rows when text should stay inline.
- `Spinner`: icon-only loading state when the surrounding component already supplies context.

## Implementation Notes

- `frontend/src/lib/stores/ui-store.ts` no longer owns a toast queue. Global notifications should go through `@/lib/toast`.
- Loading states should be distinct from empty states. Use loaders while data is in flight and `EmptyState` only after loading completes with no records.
- Prefer ASCII ellipses (`...`) in loading text to avoid mojibake from mixed file encodings.

## Changes Made

- Added `AppToaster` and mounted it once in the root layout.
- Added `@/lib/toast` as the single toast facade.
- Added shared `Spinner`, `InlineLoader`, `SectionLoader`, and `PageLoader` components.
- Replaced direct `sonner` imports across frontend application code.
- Replaced prominent custom loaders in report, admin, dashboard overview, visibility radar, citation intelligence, brand pulse, opportunity finder, publishing center, and selected settings sections.
