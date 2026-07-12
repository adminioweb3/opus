"use client";

import { motion } from "framer-motion";
import React from "react";

interface RevealTextProps {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  gradientWords?: string[];
}

// Splits text into words and reveals them with a staggered, slightly-blurred rise —
// the same "editorial headline" reveal used by Linear/Vercel-tier sites.
export function RevealText({ text, className = "", delay = 0, as = "h2", gradientWords = [] }: RevealTextProps) {
  const words = text.split(" ");
  const Tag = motion[as];

  return (
    <Tag className={className}>
      {words.map((word, i) => {
        const isGradient = gradientWords.some((g) => word.replace(/[.,!?]/g, "").toLowerCase() === g.toLowerCase());
        return (
          <React.Fragment key={i}>
            <motion.span
              initial={{ opacity: 0, y: "0.6em", filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7, delay: delay + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className={`inline-block ${isGradient ? "landing-text-gradient-brand" : ""}`}
            >
              {word}
            </motion.span>
            {i < words.length - 1 && " "}
          </React.Fragment>
        );
      })}
    </Tag>
  );
}
