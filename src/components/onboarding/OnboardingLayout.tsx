"use client"

import { Loader2, Sparkles } from "lucide-react"
import { ProgressSidebar, ONBOARDING_STEPS } from "./ProgressSidebar"
import { Logo } from "@/components/ui/logo"

interface OnboardingCta {
  label: string
  onClick: () => void
  disabled?: boolean
  loading?: boolean
}

interface OnboardingLayoutProps {
  currentStep: number
  rightPanel?: React.ReactNode
  children: React.ReactNode
  /** Renders a sticky bottom CTA bar on mobile only — desktop steps render their own inline button. */
  cta?: OnboardingCta | null
}

// Shared shell for the whole onboarding flow: desktop is a 3-column layout (step rail, form,
// live preview); mobile collapses to a top progress bar + stacked card + sticky bottom CTA.
export function OnboardingLayout({ currentStep, rightPanel, children, cta }: OnboardingLayoutProps) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      <ProgressSidebar currentStep={currentStep} />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile top bar: logo + horizontal step progress */}
        <div className="lg:hidden sticky top-0 z-20 bg-[#F8FAFC]/90 backdrop-blur-xl border-b border-black/5 px-5 pt-5 pb-4">
          <Logo imgClassName="h-6 w-auto mb-4" />
          <div className="flex items-center gap-1.5">
            {ONBOARDING_STEPS.map((step) => (
              <div
                key={step.id}
                className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${
                  step.id < currentStep
                    ? "bg-[#22C55E]"
                    : step.id === currentStep
                      ? "bg-[#5B5CEB]"
                      : "bg-black/10"
                }`}
              />
            ))}
          </div>
          <div className="mt-2 text-[12px] font-medium text-muted-foreground">
            Step {currentStep} of {ONBOARDING_STEPS.length} &middot; {ONBOARDING_STEPS[currentStep - 1]?.title}
          </div>
        </div>

        <div className="flex-1 flex flex-col lg:flex-row">
          <main className="flex-1 flex items-center justify-center px-5 sm:px-8 lg:px-10 py-6 lg:py-8 min-w-0">
            <div className="w-full max-w-lg pb-24 lg:pb-0">{children}</div>
          </main>

          {rightPanel && (
            <aside className="hidden xl:flex w-[22rem] shrink-0 items-center justify-center px-6 py-10 bg-gradient-to-br from-[#5B5CEB]/[0.04] via-transparent to-[#7C3AED]/[0.04]">
              {rightPanel}
            </aside>
          )}
        </div>
      </div>

      {/* Sticky mobile CTA */}
      {cta && (
        <div className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-white/95 backdrop-blur-xl border-t border-black/5 px-5 py-4">
          <button
            onClick={cta.onClick}
            disabled={cta.disabled || cta.loading}
            className="w-full h-13 rounded-2xl bg-gradient-to-r from-[#5B5CEB] to-[#7C3AED] text-white font-semibold text-[15px] flex items-center justify-center gap-2 shadow-[0_10px_30px_-8px_rgba(91,92,235,0.5)] transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {cta.loading ? (
              <Loader2 className="w-4.5 h-4.5 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4" />
            )}
            {cta.label}
          </button>
        </div>
      )}
    </div>
  )
}
