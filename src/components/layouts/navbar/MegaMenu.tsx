"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import type { NavGroup } from "./navData"

const panelVariants = {
  hidden: { opacity: 0, y: 8, scale: 0.98, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
}

export function MegaMenu({ group, dark }: { group: NavGroup; dark: boolean }) {
  return (
    <motion.div
      variants={panelVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      className="absolute left-1/2 top-full mt-3 -translate-x-1/2 w-[min(760px,90vw)] z-40"
      role="menu"
      aria-label={`${group.label} menu`}
    >
      <div
        className={`relative rounded-3xl border p-3 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.35)] overflow-hidden ${
          dark
            ? "bg-[#0a0a12]/95 backdrop-blur-2xl border-white/[0.08]"
            : "bg-white/95 backdrop-blur-2xl border-black/[0.06]"
        }`}
      >
        {dark && <div className="landing-noise rounded-3xl" />}
        <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-1 p-2">
          {group.items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.03 * i, duration: 0.25 }}
            >
              <Link
                href={item.href}
                role="menuitem"
                className={`group flex items-start gap-3.5 rounded-2xl p-3.5 transition-colors ${
                  dark ? "hover:bg-white/[0.06]" : "hover:bg-black/[0.035]"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3 ${
                    dark ? "bg-white/[0.06] text-indigo-300" : "bg-indigo-500/8 text-indigo-600"
                  }`}
                >
                  <item.icon className="w-[18px] h-[18px]" />
                </div>
                <div className="min-w-0">
                  <div className={`text-[13.5px] font-semibold mb-0.5 ${dark ? "text-white/90" : "text-foreground"}`}>{item.title}</div>
                  <div className={`text-[12px] leading-relaxed ${dark ? "text-white/45" : "text-muted-foreground"}`}>{item.desc}</div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {group.footer && (
          <div className={`relative mt-1 mx-2 mb-1 rounded-2xl border-t ${dark ? "border-white/8" : "border-black/5"}`}>
            <Link
              href={group.footer.href}
              className={`flex items-center justify-between px-3.5 py-3.5 text-[13px] font-medium transition-colors group ${
                dark ? "text-indigo-300 hover:text-indigo-200" : "text-indigo-600 hover:text-indigo-700"
              }`}
            >
              {group.footer.label}
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        )}
      </div>
    </motion.div>
  )
}
