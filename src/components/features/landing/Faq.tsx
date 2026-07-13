"use client"

import { useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Search } from "lucide-react"
import { SectionLabel } from "./primitives/SectionLabel"

const FAQS = [
  { q: "What is AI visibility tracking?", a: "It's the practice of measuring how often, and how favorably, AI platforms like ChatGPT, Gemini, and Claude mention, cite, or recommend your brand in response to real user prompts." },
  { q: "How is this different from traditional SEO tools?", a: "Traditional SEO tools measure rankings on Google's search results page. Citationly measures presence inside AI-generated answers themselves — a fundamentally different, and increasingly more important, surface." },
  { q: "Which AI platforms do you support?", a: "ChatGPT, Google AI Overview, Gemini, Claude, Perplexity, Microsoft Copilot, Meta AI, Grok, and DeepSeek — with new platforms added as they gain meaningful search share." },
  { q: "How often does my visibility score update?", a: "Every tracked organization gets an automatic re-scan every 7 days across all five core features — visibility, citations, competitors, brand pulse, and opportunities — with no manual trigger required." },
  { q: "Do you offer a free trial?", a: "Yes — every new account starts on a 7-day free trial with full access, no credit card required to begin." },
  { q: "Can agencies manage multiple client accounts?", a: "Yes, our Enterprise plan supports unlimited organizations with white-labelled reporting for agency use." },
]

export function FaqSection() {
  const [query, setQuery] = useState("")
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const filtered = useMemo(() => {
    if (!query.trim()) return FAQS
    const q = query.toLowerCase()
    return FAQS.filter((f) => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q))
  }, [query])

  return (
    <section className="relative py-32 bg-background">
      <div className="container mx-auto px-6 max-w-2xl">
        <div className="text-center mb-12">
          <div className="flex justify-center">
            <SectionLabel dark={false}>FAQ</SectionLabel>
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground">Questions, answered.</h2>
        </div>

        <div className="relative mb-8">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search questions..."
            className="w-full h-12 pl-11 pr-4 rounded-full border border-border bg-card text-sm outline-none focus:border-primary/40 transition-colors"
          />
        </div>

        <div className="flex flex-col gap-3">
          {filtered.map((faq, i) => {
            const isOpen = openIndex === i
            return (
              <div key={faq.q} className="rounded-2xl border border-border bg-card overflow-hidden">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-[15px] font-medium text-foreground">{faq.q}</span>
                  <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
                    <ChevronDown className="w-4.5 h-4.5 text-muted-foreground shrink-0" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-[14px] text-muted-foreground leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
          {filtered.length === 0 && (
            <p className="text-center text-sm text-muted-foreground py-10">No questions match &quot;{query}&quot;.</p>
          )}
        </div>
      </div>
    </section>
  )
}
