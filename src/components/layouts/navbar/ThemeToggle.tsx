"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function ThemeToggle({ dark }: { dark: boolean }) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid SSR/client theme mismatch flash.
  useEffect(() => setMounted(true), [])

  if (!mounted) return <div className="w-9 h-9" />

  const isDarkMode = resolvedTheme === "dark"

  return (
    <button
      onClick={() => setTheme(isDarkMode ? "light" : "dark")}
      aria-label={isDarkMode ? "Switch to light theme" : "Switch to dark theme"}
      className={`relative w-9 h-9 rounded-full flex items-center justify-center transition-colors overflow-hidden ${
        dark ? "hover:bg-white/10 text-white/70" : "hover:bg-black/5 text-foreground/70"
      }`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDarkMode ? "moon" : "sun"}
          initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
          transition={{ duration: 0.25 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {isDarkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
