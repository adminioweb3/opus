"use client";

import { motion } from "framer-motion";

export function SectionLabel({ children, dark = true }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-semibold tracking-[0.14em] uppercase mb-5 border ${
        dark
          ? "bg-white/5 border-white/10 text-indigo-200"
          : "bg-indigo-500/5 border-indigo-500/15 text-indigo-600"
      }`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dark ? "bg-indigo-400" : "bg-indigo-500"}`} />
      {children}
    </motion.div>
  );
}
