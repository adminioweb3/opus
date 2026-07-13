"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Check, Loader2 } from "lucide-react"

interface AnimatedLoaderProps {
  stages: string[]
  /** Index of the stage currently in progress (0-based). Everything before it is complete. */
  currentIndex: number
}

// Stage-list progress used during the real website-scrape wait (Step 1). Each row animates
// through pending -> active (spinner) -> done (checkmark) as `currentIndex` advances.
export function AnimatedLoader({ stages, currentIndex }: AnimatedLoaderProps) {
  return (
    <div className="w-full max-w-md mx-auto" role="status" aria-live="polite">
      <ul className="space-y-3">
        {stages.map((stage, i) => {
          const done = i < currentIndex
          const active = i === currentIndex
          return (
            <motion.li
              key={stage}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: done || active ? 1 : 0.4, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
              className="flex items-center gap-3"
            >
              <span
                className={`relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
                  done
                    ? "bg-[#22C55E] border-[#22C55E]"
                    : active
                      ? "border-[#5B5CEB] bg-[#5B5CEB]/10"
                      : "border-black/10 bg-black/[0.02]"
                }`}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {done ? (
                    <motion.span
                      key="done"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    >
                      <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                    </motion.span>
                  ) : active ? (
                    <motion.span key="active" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <Loader2 className="w-3.5 h-3.5 text-[#5B5CEB] animate-spin" />
                    </motion.span>
                  ) : (
                    <motion.span key="pending" className="w-1.5 h-1.5 rounded-full bg-black/20" />
                  )}
                </AnimatePresence>
              </span>
              <span
                className={`text-[13.5px] font-medium transition-colors duration-300 ${
                  done ? "text-foreground/70" : active ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {stage}
              </span>
            </motion.li>
          )
        })}
      </ul>
    </div>
  )
}
