"use client"

import Link from "next/link"
import { motion } from "framer-motion"

// logo-light.png (dark wordmark) renders on light/white backgrounds; logo-dark.png (white
// wordmark) renders on dark backgrounds — both are real transparent-background assets, so no
// card wrapper or filter tricks are needed, just a straight swap on the navbar's `dark` state.
export function AnimatedLogo({ dark, compact }: { dark: boolean; compact: boolean }) {
  return (
    <Link href="/" className="group flex items-center shrink-0" aria-label="Citationly home">
      <motion.div
        animate={{ scale: compact ? 0.88 : 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative"
      >
        <div
          className={`absolute -inset-2 rounded-2xl bg-gradient-to-br from-indigo-500 via-violet-500 to-blue-500 blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-500`}
        />
        <motion.div
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
          className="relative"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={dark ? "/images/logo-dark.png" : "/images/logo-light.png"}
            alt="Citationly"
            className="h-6 sm:h-7 w-auto object-contain"
          />
        </motion.div>
      </motion.div>
    </Link>
  )
}
