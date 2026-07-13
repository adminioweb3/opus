"use client"

import { motion } from "framer-motion"
import { Check, Globe, Building2, Sparkles, LayoutDashboard } from "lucide-react"
import { Logo } from "@/components/ui/logo"

export interface OnboardingStepDef {
  id: number
  title: string
  desc: string
  icon: React.ElementType<{ className?: string }>
}

export const ONBOARDING_STEPS: OnboardingStepDef[] = [
  { id: 1, title: "Website", desc: "Tell us where to look", icon: Globe },
  { id: 2, title: "Business Details", desc: "A little about you", icon: Building2 },
  { id: 3, title: "AI Analysis", desc: "We scan every platform", icon: Sparkles },
  { id: 4, title: "Dashboard", desc: "Your workspace is ready", icon: LayoutDashboard },
]

// Left rail shown on desktop; the same step data drives a horizontal top bar on mobile
// (see OnboardingLayout). `currentStep` only ever reaches 1 or 2 here — steps 3/4 live on
// separate real routes (/onboarding/analysis, /report/[organizationId]) reached after this
// form completes, but are shown for orientation so the user knows what's still ahead.
export function ProgressSidebar({ currentStep }: { currentStep: number }) {
  return (
    <div className="hidden lg:flex w-72 shrink-0 flex-col border-r border-black/5 bg-white/60 backdrop-blur-xl px-6 py-8">
      <div className="mb-10">
        <Logo imgClassName="h-6 w-auto" />
      </div>

      <nav className="flex-1">
        <ol className="relative space-y-1">
          {ONBOARDING_STEPS.map((step, i) => {
            const isDone = step.id < currentStep
            const isActive = step.id === currentStep
            const isLast = i === ONBOARDING_STEPS.length - 1

            return (
              <li key={step.id} className="relative flex gap-3 pb-7 last:pb-0">
                {!isLast && (
                  <span
                    className={`absolute left-[17px] top-9 w-px h-[calc(100%-1.25rem)] transition-colors duration-500 ${
                      isDone ? "bg-[#22C55E]" : "bg-black/10"
                    }`}
                  />
                )}

                <span
                  className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                    isDone
                      ? "bg-[#22C55E] border-[#22C55E]"
                      : isActive
                        ? "bg-[#5B5CEB] border-[#5B5CEB] shadow-[0_0_0_5px_rgba(91,92,235,0.14)]"
                        : "bg-white border-black/10"
                  }`}
                >
                  {isDone ? (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 18 }}
                    >
                      <Check className="w-4 h-4 text-white" strokeWidth={3} />
                    </motion.span>
                  ) : (
                    <step.icon className={`w-4 h-4 ${isActive ? "text-white" : "text-muted-foreground"}`} />
                  )}
                </span>

                <div className="pt-1">
                  <div
                    className={`text-[11.5px] font-semibold tracking-[-0.01em] transition-colors ${
                      isActive ? "text-foreground" : isDone ? "text-foreground/80" : "text-muted-foreground"
                    }`}
                  >
                    Step {step.id}
                  </div>
                  <div className={`text-[13.5px] font-semibold mt-0.5 ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                    {step.title}
                  </div>
                  <div className="text-[11.5px] text-muted-foreground mt-0.5">{step.desc}</div>
                </div>
              </li>
            )
          })}
        </ol>
      </nav>

      <div className="text-[11px] text-muted-foreground/70 pt-6 border-t border-black/5">
        Your data is encrypted and never shared.
      </div>
    </div>
  )
}
