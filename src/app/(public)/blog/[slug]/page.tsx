import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowUpRight, Clock } from "lucide-react"
import { CtaBand } from "@/components/features/public/CtaBand"
import {
  posts,
  getPostBySlug,
  getRelatedPosts,
  formatPostDate,
  authorInitials,
  type BlogCategory,
} from "../posts"

const CATEGORY_STYLES: Record<BlogCategory, string> = {
  "GEO Strategy": "bg-indigo-500/10 text-indigo-600 border-indigo-500/15",
  "AI Search": "bg-purple-500/10 text-purple-600 border-purple-500/15",
  Product: "bg-emerald-500/10 text-emerald-600 border-emerald-500/15",
  Research: "bg-sky-500/10 text-sky-600 border-sky-500/15",
}

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) {
    return { title: "Post not found | Citationly" }
  }
  return {
    title: `${post.title} | Citationly`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const related = getRelatedPosts(post.slug)

  return (
    <div className="bg-background">
      {/* Article header — light on purpose so the floating navbar reads dark-on-light */}
      <header className="relative overflow-hidden pt-40 pb-12 md:pb-14">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 45% at 50% -5%, rgba(91,91,255,0.10), transparent), radial-gradient(ellipse 40% 30% at 85% 0%, rgba(168,85,247,0.06), transparent)",
          }}
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-105 bg-grid-pattern opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent)]" />

        <div className="container relative mx-auto px-6 max-w-3xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-indigo-600 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to blog
          </Link>

          <div className="mb-6">
            <span
              className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-[0.08em] uppercase border ${CATEGORY_STYLES[post.category]}`}
            >
              {post.category}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-semibold tracking-[-0.03em] leading-[1.12] text-foreground mb-6">
            {post.title}
          </h1>

          <p className="text-lg text-muted-foreground leading-relaxed mb-8">{post.excerpt}</p>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-3 pb-8 border-b border-black/5">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500/15 to-purple-500/15 border border-indigo-500/15 text-indigo-600 text-[13px] font-semibold flex items-center justify-center">
                {authorInitials(post.author.name)}
              </span>
              <div>
                <p className="text-sm font-medium text-foreground leading-tight">
                  {post.author.name}
                </p>
                <p className="text-[13px] text-muted-foreground leading-tight">
                  {post.author.role}
                </p>
              </div>
            </div>
            <span className="hidden sm:block h-6 w-px bg-black/8" />
            <p className="text-[13px] text-muted-foreground">{formatPostDate(post.date)}</p>
            <span className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
          </div>
        </div>
      </header>

      {/* Article body */}
      <article className="pb-20">
        <div className="container mx-auto px-6 max-w-3xl">
          {post.body.map((section) => (
            <section key={section.heading} className="mb-12 last:mb-0">
              <h2 className="text-xl md:text-2xl font-semibold tracking-[-0.02em] text-foreground mb-5">
                {section.heading}
              </h2>
              <div className="space-y-5">
                {section.paragraphs.map((paragraph, i) => (
                  <p key={i} className="text-[17px] leading-[1.8] text-foreground/75">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}

          <div className="mt-14 pt-8 border-t border-black/5 flex items-center justify-between">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to blog
            </Link>
            <p className="text-[13px] text-muted-foreground">
              Published {formatPostDate(post.date)}
            </p>
          </div>
        </div>
      </article>

      {/* Related posts */}
      <section className="pb-8">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-[-0.02em] text-foreground">
              Keep reading
            </h2>
            <p className="text-muted-foreground mt-2">
              More from the Citationly team on AI search and brand visibility.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((rel) => (
              <Link
                key={rel.slug}
                href={`/blog/${rel.slug}`}
                className="group flex flex-col rounded-2xl border border-black/5 bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_40px_-12px_rgba(91,91,255,0.20)] hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-5">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-[0.08em] uppercase border ${CATEGORY_STYLES[rel.category]}`}
                  >
                    {rel.category}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-indigo-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
                <h3 className="text-lg font-semibold tracking-[-0.01em] leading-snug text-foreground mb-3 group-hover:text-indigo-600 transition-colors">
                  {rel.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-6">
                  {rel.excerpt}
                </p>
                <div className="mt-auto pt-4 border-t border-black/5 flex items-center justify-between">
                  <p className="text-[12px] text-muted-foreground">{formatPostDate(rel.date)}</p>
                  <span className="inline-flex items-center gap-1 text-[12px] text-muted-foreground">
                    <Clock className="w-3.5 h-3.5" />
                    {rel.readTime}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </div>
  )
}
