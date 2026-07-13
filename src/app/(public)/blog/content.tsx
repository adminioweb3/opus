"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, ArrowUpRight, Clock } from "lucide-react"
import { PageHero } from "@/components/features/public/PageHero"
import { CtaBand } from "@/components/features/public/CtaBand"
import { SectionLabel } from "@/components/features/landing/primitives/SectionLabel"
import {
  sortedPosts,
  blogCategories,
  formatPostDate,
  authorInitials,
  type BlogCategory,
  type BlogPost,
} from "./posts"

const CATEGORY_STYLES: Record<BlogCategory, string> = {
  "GEO Strategy": "bg-indigo-500/10 text-indigo-600 border-indigo-500/15",
  "AI Search": "bg-purple-500/10 text-purple-600 border-purple-500/15",
  Product: "bg-emerald-500/10 text-emerald-600 border-emerald-500/15",
  Research: "bg-sky-500/10 text-sky-600 border-sky-500/15",
}

function CategoryBadge({ category }: { category: BlogCategory }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-[0.08em] uppercase border ${CATEGORY_STYLES[category]}`}
    >
      {category}
    </span>
  )
}

function AuthorAvatar({ name }: { name: string }) {
  return (
    <span className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500/15 to-purple-500/15 border border-indigo-500/15 text-indigo-600 text-[11px] font-semibold flex items-center justify-center shrink-0">
      {authorInitials(name)}
    </span>
  )
}

// Fixed literal data for the featured card's mini "weekly scan" mockup.
const SCAN_ROWS = [
  { platform: "ChatGPT", score: 74, delta: "+6" },
  { platform: "Perplexity", score: 81, delta: "+4" },
  { platform: "Gemini", score: 62, delta: "+9" },
  { platform: "Claude", score: 68, delta: "+3" },
  { platform: "Copilot", score: 57, delta: "+5" },
  { platform: "Grok", score: 49, delta: "+8" },
]

function FeaturedScanMockup() {
  return (
    <div className="relative h-full min-h-[280px] rounded-2xl border border-black/5 bg-gradient-to-br from-indigo-50/80 via-white to-purple-50/50 p-6 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 80% 0%, rgba(91,91,255,0.10), transparent 70%)",
        }}
      />
      <div className="relative">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-indigo-600">
              Visibility Radar
            </p>
            <p className="text-[13px] text-muted-foreground mt-0.5">Weekly scan · all platforms</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-semibold text-foreground leading-none">65</p>
            <p className="text-[11px] font-medium text-emerald-600 mt-1">+5.8 this week</p>
          </div>
        </div>
        <div className="space-y-2.5">
          {SCAN_ROWS.map((row, i) => (
            <div key={row.platform} className="flex items-center gap-3">
              <span className="w-20 text-[12px] font-medium text-foreground/70 shrink-0">
                {row.platform}
              </span>
              <div className="flex-1 h-2 rounded-full bg-black/[0.05] overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${row.score}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.25 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                />
              </div>
              <span className="w-7 text-[12px] font-semibold text-foreground text-right shrink-0">
                {row.score}
              </span>
              <span className="w-8 text-[11px] font-medium text-emerald-600 text-right shrink-0">
                {row.delta}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function FeaturedPostCard({ post }: { post: BlogPost }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        href={`/blog/${post.slug}`}
        className="group grid grid-cols-1 lg:grid-cols-2 gap-8 rounded-[1.5rem] border border-black/5 bg-white p-6 md:p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_40px_-16px_rgba(15,15,40,0.12)] hover:shadow-[0_1px_2px_rgba(0,0,0,0.04),0_20px_60px_-16px_rgba(91,91,255,0.22)] transition-shadow duration-300"
      >
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-5">
            <CategoryBadge category={post.category} />
            <span className="text-[11px] font-semibold tracking-[0.12em] uppercase text-muted-foreground">
              Latest post
            </span>
          </div>
          <h2 className="text-2xl md:text-[1.75rem] font-semibold tracking-[-0.02em] leading-snug text-foreground mb-4 group-hover:text-indigo-600 transition-colors">
            {post.title}
          </h2>
          <p className="text-[15px] text-muted-foreground leading-relaxed mb-6 line-clamp-3">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-3">
            <AuthorAvatar name={post.author.name} />
            <div className="min-w-0">
              <p className="text-[13px] font-medium text-foreground leading-tight">
                {post.author.name}
              </p>
              <p className="text-[12px] text-muted-foreground leading-tight">{post.author.role}</p>
            </div>
            <span className="mx-1 h-6 w-px bg-black/8" />
            <p className="text-[13px] text-muted-foreground">
              {formatPostDate(post.date)} · {post.readTime}
            </p>
          </div>
          <div className="mt-7 inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600">
            Read the announcement
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
        <FeaturedScanMockup />
      </Link>
    </motion.div>
  )
}

function PostCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
    >
      <Link
        href={`/blog/${post.slug}`}
        className="group flex flex-col h-full rounded-2xl border border-black/5 bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_40px_-12px_rgba(91,91,255,0.20)] hover:-translate-y-1 transition-all duration-300"
      >
        <div className="flex items-center justify-between mb-5">
          <CategoryBadge category={post.category} />
          <ArrowUpRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-indigo-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
        </div>
        <h3 className="text-lg font-semibold tracking-[-0.01em] leading-snug text-foreground mb-3 group-hover:text-indigo-600 transition-colors">
          {post.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-6">
          {post.excerpt}
        </p>
        <div className="mt-auto pt-5 border-t border-black/5 flex items-center gap-3">
          <AuthorAvatar name={post.author.name} />
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-medium text-foreground leading-tight truncate">
              {post.author.name}
            </p>
            <p className="text-[12px] text-muted-foreground leading-tight">
              {formatPostDate(post.date)}
            </p>
          </div>
          <span className="inline-flex items-center gap-1 text-[12px] text-muted-foreground shrink-0">
            <Clock className="w-3.5 h-3.5" />
            {post.readTime}
          </span>
        </div>
      </Link>
    </motion.article>
  )
}

export function Content() {
  const [activeCategory, setActiveCategory] = useState<BlogCategory | "All">("All")

  const featured = sortedPosts[0]
  const gridPosts =
    activeCategory === "All"
      ? sortedPosts.slice(1)
      : sortedPosts.filter((p) => p.category === activeCategory)

  return (
    <div className="bg-background">
      <PageHero
        eyebrow="Blog"
        title="Insights on AI search and brand visibility."
        gradientWords={["AI"]}
        description="Field notes, research, and product updates from the team measuring how AI engines discover, understand, recommend, and cite brands."
      />

      {/* Featured post */}
      <section className="pb-16 md:pb-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <FeaturedPostCard post={featured} />
        </div>
      </section>

      {/* All posts + category filter */}
      <section className="pb-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div>
              <SectionLabel dark={false}>All articles</SectionLabel>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground">
                Browse by topic
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {(["All", ...blogCategories] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-[13px] font-medium border transition-all ${
                    activeCategory === cat
                      ? "bg-indigo-600 border-indigo-600 text-white shadow-[0_4px_16px_-4px_rgba(91,91,255,0.5)]"
                      : "bg-white border-black/8 text-muted-foreground hover:border-indigo-500/30 hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Keyed by category so cards re-animate when the filter changes */}
          <div key={activeCategory} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gridPosts.map((post, i) => (
              <PostCard key={post.slug} post={post} index={i} />
            ))}
          </div>

          {gridPosts.length === 0 && (
            <div className="rounded-2xl border border-dashed border-black/10 bg-white p-12 text-center">
              <p className="text-sm text-muted-foreground">
                No articles in this category yet. Check back soon.
              </p>
            </div>
          )}
        </div>
      </section>

      <CtaBand />
    </div>
  )
}
