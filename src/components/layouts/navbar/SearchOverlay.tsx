"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X } from "lucide-react"
import { NAV_GROUPS } from "./navData"

const ALL_ITEMS = NAV_GROUPS.flatMap((g) => g.items.map((item) => ({ ...item, group: g.label })))

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("")

  const results = useMemo(() => {
    if (!query.trim()) return ALL_ITEMS.slice(0, 6)
    const q = query.toLowerCase()
    return ALL_ITEMS.filter((i) => i.title.toLowerCase().includes(q) || i.desc.toLowerCase().includes(q)).slice(0, 8)
  }, [query])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-70 flex items-start justify-center pt-[15vh] px-6 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Search"
        >
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg rounded-3xl landing-glass-dark overflow-hidden shadow-2xl"
          >
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10">
              <Search className="w-4.5 h-4.5 text-white/40" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search features, solutions, resources..."
                className="flex-1 bg-transparent outline-none text-white placeholder:text-white/30 text-[14px]"
              />
              <button onClick={onClose} aria-label="Close search" className="text-white/40 hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="max-h-80 overflow-y-auto p-2">
              {results.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center gap-3 px-3.5 py-3 rounded-xl hover:bg-white/[0.06] transition-colors"
                >
                  <item.icon className="w-4 h-4 text-indigo-300 shrink-0" />
                  <div className="min-w-0">
                    <div className="text-[13.5px] font-medium text-white/90">{item.title}</div>
                    <div className="text-[11px] text-white/35">{item.group}</div>
                  </div>
                </Link>
              ))}
              {results.length === 0 && <p className="text-center text-[13px] text-white/40 py-8">No results for &quot;{query}&quot;.</p>}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
