import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowUpRight, Quote } from "lucide-react"
import { CtaBand } from "@/components/features/public/CtaBand"
import { caseStudies, getStudyBySlug, getOtherStudies } from "../studies"

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const study = getStudyBySlug(slug)
  if (!study) {
    return { title: "Case study not found | Citationly" }
  }
  return {
    title: `${study.company} | Citationly Case Studies`,
    description: study.excerpt,
  }
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const study = getStudyBySlug(slug)
  if (!study) notFound()

  const otherStudies = getOtherStudies(study.slug)
  const heroMetrics = [study.headlineMetric, ...study.secondaryMetrics]

  return (
    <div className="bg-background">
      {/* Header — light on purpose so the floating navbar reads dark-on-light */}
      <header className="relative overflow-hidden pt-40 pb-14 md:pb-16">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 45% at 50% -5%, rgba(91,91,255,0.10), transparent), radial-gradient(ellipse 40% 30% at 85% 0%, rgba(168,85,247,0.06), transparent)",
          }}
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-105 bg-grid-pattern opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent)]" />

        <div className="container relative mx-auto px-6 max-w-4xl">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-indigo-600 transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to case studies
          </Link>

          <div className="flex items-center gap-4 mb-6">
            <span
              className={`w-14 h-14 rounded-2xl bg-linear-to-br ${study.gradient} flex items-center justify-center text-white font-semibold text-xl shadow-[0_4px_14px_rgba(91,91,255,0.25)]`}
            >
              {study.logoInitials}
            </span>
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold tracking-[-0.02em] text-foreground leading-tight">
                {study.company}
              </h1>
              <span className="inline-flex items-center mt-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-[0.08em] uppercase border bg-indigo-500/10 text-indigo-600 border-indigo-500/15">
                {study.industry}
              </span>
            </div>
          </div>

          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">{study.excerpt}</p>
        </div>
      </header>

      {/* Headline metric hero row */}
      <section className="pb-16 md:pb-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {heroMetrics.map((metric, i) => (
              <div
                key={metric.label}
                className={`rounded-2xl border p-6 ${
                  i === 0
                    ? "bg-indigo-50/60 border-indigo-100"
                    : "bg-white border-black/5 shadow-[0_1px_3px_rgba(15,15,35,0.05)]"
                }`}
              >
                <div
                  className={`text-2xl md:text-3xl font-semibold tracking-[-0.02em] ${
                    i === 0 ? "text-indigo-600" : "text-foreground"
                  }`}
                >
                  {metric.value}
                </div>
                <p className="mt-2 text-[13px] text-muted-foreground leading-relaxed">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenge */}
      <section className="pb-16 md:pb-20">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-xl md:text-2xl font-semibold tracking-[-0.02em] text-foreground mb-5">
            The challenge
          </h2>
          <div className="space-y-5">
            {study.challenge.map((paragraph, i) => (
              <p key={i} className="text-[17px] leading-[1.8] text-foreground/75">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="bg-indigo-50/40 border-y border-black/5 py-16 md:py-20">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-xl md:text-2xl font-semibold tracking-[-0.02em] text-foreground mb-8">
            The approach
          </h2>
          <div className="space-y-8">
            {study.approach.map((step, i) => (
              <div key={step.title} className="flex gap-5">
                <span className="shrink-0 w-9 h-9 rounded-full bg-white border border-indigo-200 text-indigo-600 font-semibold text-sm flex items-center justify-center shadow-[0_1px_3px_rgba(91,91,255,0.15)]">
                  {i + 1}
                </span>
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h3 className="font-semibold text-foreground text-lg">{step.title}</h3>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold tracking-[0.04em] bg-white border border-indigo-500/15 text-indigo-600">
                      {step.module}
                    </span>
                  </div>
                  <p className="text-[15px] text-foreground/75 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-xl md:text-2xl font-semibold tracking-[-0.02em] text-foreground mb-5">
            The results
          </h2>
          <div className="space-y-5">
            {study.results.map((paragraph, i) => (
              <p key={i} className="text-[17px] leading-[1.8] text-foreground/75">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Pull quote */}
      <section className="pb-20 md:pb-24">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="relative rounded-[1.5rem] bg-white border border-black/5 shadow-[0_1px_3px_rgba(15,15,35,0.05)] px-8 py-10 md:px-12 md:py-12">
            <Quote className="w-8 h-8 text-indigo-200 mb-5" />
            <p className="text-xl md:text-2xl font-medium tracking-[-0.01em] leading-[1.5] text-foreground mb-7">
              &ldquo;{study.pullQuote.quote}&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <span
                className={`w-10 h-10 rounded-full bg-linear-to-br ${study.gradient} flex items-center justify-center text-white text-[13px] font-semibold shrink-0`}
              >
                {study.logoInitials}
              </span>
              <div>
                <p className="text-sm font-medium text-foreground leading-tight">{study.pullQuote.name}</p>
                <p className="text-[13px] text-muted-foreground leading-tight">
                  {study.pullQuote.role}, {study.pullQuote.company}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* More stories */}
      <section className="pb-8">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-[-0.02em] text-foreground">
              More stories
            </h2>
            <p className="text-muted-foreground mt-2">
              How other teams are measuring and moving their AI visibility.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherStudies.map((rel) => (
              <Link
                key={rel.slug}
                href={`/case-studies/${rel.slug}`}
                className="group flex flex-col rounded-2xl border border-black/5 bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_40px_-12px_rgba(91,91,255,0.20)] hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-5">
                  <span
                    className={`w-9 h-9 rounded-lg bg-linear-to-br ${rel.gradient} flex items-center justify-center text-white text-xs font-semibold`}
                  >
                    {rel.logoInitials}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-indigo-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
                <h3 className="text-lg font-semibold tracking-[-0.01em] leading-snug text-foreground mb-1 group-hover:text-indigo-600 transition-colors">
                  {rel.company}
                </h3>
                <span className="text-[13px] text-muted-foreground mb-3">{rel.industry}</span>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{rel.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </div>
  )
}
