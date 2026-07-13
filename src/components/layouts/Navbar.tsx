"use client"

import Link from "next/link"
import { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion"
import { Search, Menu } from "lucide-react"
import { AnimatedLogo } from "./navbar/AnimatedLogo"
import { MegaMenu } from "./navbar/MegaMenu"
import { MobileMenu } from "./navbar/MobileMenu"
import { SearchOverlay } from "./navbar/SearchOverlay"
import { ThemeToggle } from "./navbar/ThemeToggle"
import { NAV_GROUPS } from "./navbar/navData"

// `heroVariant="dark"` is opt-in (only the new homepage passes it, since it opens on a
// full-bleed dark hero). Every other public page defaults to "light" and the navbar starts
// dark-text-on-transparent, which reads correctly against their white page tops.
export function Navbar({ heroVariant = "light" }: { heroVariant?: "dark" | "light" }) {
  const router = useRouter()
  const [scrolled, setScrolled] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => setScrolled(latest > 50))

  const atTop = !scrolled
  // Once scrolled at all, the navbar always settles into a dark glass card with light text —
  // that reads correctly over any section color behind it. Only at the very top of the page
  // does it adapt to what's actually behind it (the dark hero vs. every other page's white top).
  const dark = atTop ? heroVariant === "dark" : true

  const openMenu = (key: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setActiveMenu(key)
  }
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setActiveMenu(null), 180)
  }
  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
  }

  return (
    <>
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-4 sm:top-5 inset-x-0 z-50 flex justify-center px-4"
        onKeyDown={(e) => e.key === "Escape" && setActiveMenu(null)}
      >
        <motion.nav
          animate={{ height: scrolled ? 64 : 76 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className={`relative w-full max-w-6xl rounded-3xl border transition-colors duration-500 ${
            atTop
              ? "bg-transparent border-transparent"
              : dark
                ? "bg-[#050508]/85 backdrop-blur-2xl border-white/[0.08] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]"
                : "bg-white/98 backdrop-blur-2xl border-black/[0.06] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.12)]"
          }`}
        >
          <div className="h-full flex items-center justify-between px-5 sm:px-7">
            <AnimatedLogo dark={dark} compact={scrolled} />

            {/* Center nav — desktop only */}
            <div
              className="hidden lg:flex items-center gap-1"
              onMouseLeave={scheduleClose}
              onMouseEnter={cancelClose}
            >
              {NAV_GROUPS.map((group) => (
                <div key={group.key} className="relative">
                  <button
                    onMouseEnter={() => openMenu(group.key)}
                    onFocus={() => openMenu(group.key)}
                    onClick={() => (activeMenu === group.key ? setActiveMenu(null) : openMenu(group.key))}
                    aria-haspopup="true"
                    aria-expanded={activeMenu === group.key}
                    className={`group relative px-4 py-2 text-[13.5px] font-medium rounded-full transition-colors ${
                      dark ? "text-white/75 hover:text-white" : "text-foreground/70 hover:text-foreground"
                    }`}
                  >
                    {group.label}
                    <span
                      className={`pointer-events-none absolute left-4 right-4 -bottom-0.5 h-px origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${
                        dark ? "bg-white/60" : "bg-foreground/60"
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {activeMenu === group.key && <MegaMenu group={group} dark={dark} />}
                  </AnimatePresence>
                </div>
              ))}
              <Link
                href="/pricing"
                className={`px-4 py-2 text-[13.5px] font-medium rounded-full transition-colors ${
                  dark ? "text-white/75 hover:text-white" : "text-foreground/70 hover:text-foreground"
                }`}
              >
                Pricing
              </Link>
            </div>

            {/* Right controls */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Search"
                className={`hidden sm:flex w-9 h-9 rounded-full items-center justify-center transition-colors ${
                  dark ? "hover:bg-white/10 text-white/70" : "hover:bg-black/5 text-foreground/70"
                }`}
              >
                <Search className="w-4 h-4" />
              </button>

              <ThemeToggle dark={dark} />

              <Link
                href="/login"
                className={`hidden md:block px-3.5 py-2 text-[13.5px] font-medium transition-colors ${
                  dark ? "text-white/75 hover:text-white" : "text-foreground/70 hover:text-foreground"
                }`}
              >
                Log in
              </Link>

              <button
                onClick={() => router.push("/register")}
                className={`hidden sm:inline-flex h-9 px-4 rounded-full text-[13px] font-medium items-center transition-colors ${
                  dark ? "bg-white/10 text-white hover:bg-white/15 border border-white/15" : "bg-black/5 text-foreground hover:bg-black/10 border border-black/5"
                }`}
              >
                Book Demo
              </button>

              <button
                onClick={() => router.push("/register")}
                className="group relative hidden sm:inline-flex h-9 px-4.5 rounded-full text-[13px] font-semibold items-center overflow-hidden bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-500 text-white shadow-[0_8px_24px_-6px_rgba(99,102,241,0.6)] transition-shadow hover:shadow-[0_8px_32px_-4px_rgba(99,102,241,0.75)]"
              >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                <span className="relative">Start Free Analysis</span>
              </button>

              <button
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
                className={`lg:hidden w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                  dark ? "text-white/80 hover:bg-white/10" : "text-foreground/80 hover:bg-black/5"
                }`}
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.nav>
      </motion.div>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
