"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ArrowRight, X } from "lucide-react"
import { NAV_GROUPS } from "./navData"

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[60] landing-root overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
        >
          <div className="landing-noise" />
          <div className="relative z-10 min-h-screen px-6 pt-8 pb-16">
            <div className="flex items-center justify-between mb-10">
              <span className="text-lg font-semibold text-white tracking-tight">Citationly</span>
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="w-10 h-10 rounded-full landing-glass-dark flex items-center justify-center text-white/70 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col gap-1">
              {NAV_GROUPS.map((group, i) => {
                const isOpen = expanded === group.key
                return (
                  <motion.div
                    key={group.key}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.4 }}
                    className="border-b border-white/8"
                  >
                    <button
                      onClick={() => setExpanded(isOpen ? null : group.key)}
                      className="w-full flex items-center justify-between py-5"
                      aria-expanded={isOpen}
                    >
                      <span className="text-2xl font-semibold text-white tracking-tight">{group.label}</span>
                      <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
                        <ChevronDown className="w-5 h-5 text-white/50" />
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="grid grid-cols-1 gap-1 pb-5">
                            {group.items.map((item) => (
                              <Link
                                key={item.title}
                                href={item.href}
                                onClick={onClose}
                                className="flex items-center gap-3 py-2.5 text-white/60 hover:text-white transition-colors"
                              >
                                <item.icon className="w-4 h-4 text-indigo-300 shrink-0" />
                                <span className="text-[15px] font-medium">{item.title}</span>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )
              })}

              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="py-5 border-b border-white/8">
                <Link href="/pricing" onClick={onClose} className="text-2xl font-semibold text-white tracking-tight">
                  Pricing
                </Link>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="flex flex-col gap-3 mt-10"
            >
              <Link
                href="/login"
                onClick={onClose}
                className="h-13 rounded-full landing-glass-dark text-white font-medium flex items-center justify-center text-[15px]"
              >
                Log in
              </Link>
              <Link
                href="/register"
                onClick={onClose}
                className="h-13 rounded-full bg-white text-[#050508] font-medium flex items-center justify-center gap-2 text-[15px]"
              >
                Start Free Analysis <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
