"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowRight,
  ChevronDown,
  Filter,
  Gauge,
  KeyRound,
  Lock,
  Plug,
  ShieldAlert,
  Webhook,
  type LucideIcon,
} from "lucide-react"
import { PageHero } from "@/components/features/public/PageHero"
import { CtaBand } from "@/components/features/public/CtaBand"
import { SectionLabel } from "@/components/features/landing/primitives/SectionLabel"
import { RevealText } from "@/components/features/landing/primitives/RevealText"
import { MagneticButton } from "@/components/features/landing/primitives/MagneticButton"

/* ------------------------------------------------------------------ */
/* Fixed content data                                                  */
/* ------------------------------------------------------------------ */

interface EndpointRow {
  resource: string
  path: string
  purpose: string
}

const ENDPOINTS: EndpointRow[] = [
  { resource: "Mentions", path: "/v1/mentions", purpose: "Retrieve brand and competitor mentions across engines." },
  {
    resource: "Citations",
    path: "/v1/citations",
    purpose: "Retrieve citation records, including the citing engine and source.",
  },
  { resource: "Visibility", path: "/v1/visibility", purpose: "Retrieve visibility scores over time." },
  {
    resource: "Share of Voice",
    path: "/v1/share-of-voice",
    purpose: "Retrieve Share of Voice against your competitor set.",
  },
  { resource: "Questions", path: "/v1/questions", purpose: "Manage the question library a workspace monitors." },
  { resource: "Reports", path: "/v1/reports", purpose: "Retrieve report data for export." },
]

const RATE_LIMIT_HEADERS: { header: string; desc: string }[] = [
  { header: "X-RateLimit-Limit", desc: "The total number of requests allowed in the current window." },
  { header: "X-RateLimit-Remaining", desc: "How many requests are left before you hit the limit." },
  { header: "X-RateLimit-Reset", desc: "When the current window resets, as a Unix timestamp." },
]

const STATUS_CODES: { code: string; label: string }[] = [
  { code: "200", label: "Success" },
  { code: "400", label: "Bad request" },
  { code: "401", label: "Unauthorized" },
  { code: "404", label: "Not found" },
  { code: "429", label: "Rate limited" },
  { code: "500", label: "Server error" },
]

const BEST_PRACTICES: { icon: LucideIcon; text: string }[] = [
  { icon: Lock, text: "Store keys securely and rotate them periodically." },
  { icon: Filter, text: "Request only the data you need using filters." },
  { icon: Gauge, text: "Read the rate-limit headers and pace requests." },
  { icon: Webhook, text: "Prefer webhooks for event-driven needs." },
  { icon: ShieldAlert, text: "Handle errors by code rather than by parsing messages." },
]

const FAQS: { q: string; a: React.ReactNode }[] = [
  {
    q: "What kind of API is this?",
    a: (
      <>
        The Citationly AI Search API is a REST API. Requests use standard HTTP methods, resources are
        addressed by predictable paths, and every response is JSON. If you have used a modern SaaS REST
        API before, the conventions here will feel familiar.
      </>
    ),
  },
  {
    q: "How do I authenticate requests?",
    a: (
      <>
        Every request carries your API key in the{" "}
        <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded">Authorization</code> header as
        a bearer token. Keys are generated per workspace from platform settings and can be scoped to
        limit what they can read or write.
      </>
    ),
  },
  {
    q: "Are there rate limits?",
    a: (
      <>
        Yes. Limits apply per API key, and every response includes headers showing your current limit,
        remaining requests, and when the limit resets. If you expect sustained high volume, use the
        reporting endpoints or webhooks instead of polling.
      </>
    ),
  },
  {
    q: "Does the API support webhooks?",
    a: (
      <>
        Where available, yes. Webhooks let you receive events, like a new citation or a visibility score
        change, as they happen instead of polling an endpoint on a schedule. That is the preferred
        approach for event-driven integrations.
      </>
    ),
  },
  {
    q: "What format do responses use?",
    a: (
      <>
        All responses are JSON, structured as a{" "}
        <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded">data</code> object holding the
        requested records and a{" "}
        <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded">meta</code> object describing
        the result. Errors follow the same JSON convention with a machine-readable code and a message.
      </>
    ),
  },
  {
    q: "Do I need to use the API to integrate Citationly?",
    a: (
      <>
        No. Most teams connect Citationly to their stack through the built-in{" "}
        <Link href="/integrations" className="text-indigo-600 font-medium hover:underline">
          integrations
        </Link>
        , without writing any code. The API is for teams building custom workflows or pulling data into
        systems Citationly does not connect to directly.
      </>
    ),
  },
]

/* ------------------------------------------------------------------ */
/* Small building blocks                                              */
/* ------------------------------------------------------------------ */

function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="flex flex-col gap-3">
      {FAQS.map((item, i) => {
        const isOpen = open === i
        return (
          <motion.div
            key={item.q}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.05 }}
            className={`rounded-2xl border bg-white transition-colors ${
              isOpen ? "border-indigo-500/25 shadow-[0_12px_40px_-24px_rgba(91,91,255,0.4)]" : "border-black/5"
            }`}
          >
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className="text-[15px] font-medium text-foreground">{item.q}</span>
              <ChevronDown
                className={`h-4.5 w-4.5 shrink-0 text-muted-foreground transition-transform duration-300 ${
                  isOpen ? "rotate-180 text-indigo-600" : ""
                }`}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-5 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )
      })}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export function Content() {
  const router = useRouter()

  return (
    <div className="bg-background">
      <PageHero
        eyebrow="Developer API"
        title="The Citationly AI Search API"
        gradientWords={["API"]}
        description="Pull AI visibility, citation, and Share of Voice data into your own systems. This is a REST API that returns JSON, uses standard authentication, and follows predictable conventions."
      >
        <MagneticButton
          onClick={() => router.push("/register")}
          className="group h-12 px-7 rounded-full font-medium text-[15px] text-white bg-linear-to-r from-indigo-600 via-indigo-500 to-violet-500 shadow-[0_10px_30px_-8px_rgba(91,91,255,0.5)] hover:shadow-[0_14px_40px_-8px_rgba(91,91,255,0.65)] transition-shadow inline-flex items-center gap-2"
        >
          Get API Access
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </MagneticButton>
        <Link
          href="/docs"
          className="h-12 px-7 rounded-full font-medium text-[15px] text-foreground border border-black/10 bg-white/70 hover:bg-black/5 transition-colors inline-flex items-center gap-2"
        >
          View Documentation
        </Link>
      </PageHero>

      {/* ---------------------------------------------------------- */}
      {/* Section 1 - API overview                                     */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-4">
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="flex justify-center mb-6"
            >
              <span className="w-14 h-14 rounded-2xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center">
                <Plug className="w-6 h-6" />
              </span>
            </motion.div>
            <div className="flex justify-center">
              <SectionLabel dark={false}>Overview</SectionLabel>
            </div>
            <RevealText
              as="h2"
              text="What the AI Search API does"
              gradientWords={["API"]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-4"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-5 text-muted-foreground leading-relaxed text-[15px] md:text-base max-w-2xl mx-auto text-center"
          >
            <p>
              The Citationly AI Search API gives developers programmatic access to the data the platform
              collects: brand mentions, citations, visibility scores, and Share of Voice across the
              supported engines. It is a REST API: requests use standard HTTP methods, responses return
              JSON, and resources follow consistent naming.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 2 - Authentication (dark accent card)                */}
      {/* ---------------------------------------------------------- */}
      <section className="py-4 md:py-6">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-[2rem] bg-[#050508] px-8 py-16 md:px-14 md:py-20"
          >
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(45% 55% at 15% 10%, rgba(91,91,255,0.22), transparent 70%), radial-gradient(40% 50% at 90% 20%, rgba(168,85,247,0.14), transparent 70%), radial-gradient(55% 60% at 50% 110%, rgba(59,130,246,0.10), transparent 70%)",
              }}
            />
            <div className="landing-noise" />

            <div className="relative max-w-3xl mx-auto text-center">
              <div className="flex justify-center">
                <SectionLabel>Security</SectionLabel>
              </div>
              <RevealText
                as="h2"
                text="API authentication"
                className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-white mb-8"
              />

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-5 text-left text-white/55 leading-relaxed text-[15px] md:text-base"
              >
                <p>
                  The API uses key-based authentication. Every request must include your API key in the{" "}
                  <code className="font-mono text-sm bg-white/10 text-white/80 px-1.5 py-0.5 rounded">
                    Authorization
                  </code>{" "}
                  header. Keys are issued per workspace and can be scoped. Keep keys server-side; if a key
                  is exposed, revoke and reissue it from platform settings.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-8 flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-6 py-5 text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-white/10 text-indigo-300 flex items-center justify-center shrink-0">
                  <KeyRound className="w-5 h-5" />
                </div>
                <code className="font-mono text-[13px] text-white/70 overflow-x-auto">
                  Authorization: Bearer ctly_live_••••••••••••
                </code>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 3 - Endpoint reference table                         */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24 bg-indigo-50/40 border-y border-black/5">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="flex justify-center">
              <SectionLabel dark={false}>Reference</SectionLabel>
            </div>
            <RevealText
              as="h2"
              text="API endpoints"
              gradientWords={["endpoints"]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-4"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-6%" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-x-auto rounded-2xl border border-black/5 bg-white shadow-[0_10px_30px_-16px_rgba(15,15,40,0.10)]"
          >
            <table className="w-full min-w-150 border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-black/5">
                  <th className="w-[38%] px-6 py-4 font-semibold text-foreground">Resource</th>
                  <th className="px-6 py-4 font-semibold text-foreground">Purpose</th>
                </tr>
              </thead>
              <tbody>
                {ENDPOINTS.map((row) => (
                  <tr key={row.resource} className="border-t border-black/[0.04]">
                    <td className="px-6 py-4 align-top">
                      <div className="font-medium text-foreground mb-1">{row.resource}</div>
                      <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded">{row.path}</code>
                    </td>
                    <td className="px-6 py-4 align-top text-muted-foreground">{row.purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center text-muted-foreground max-w-xl mx-auto mt-8"
          >
            Each endpoint supports filtering by engine, date range, and competitor where relevant.
          </motion.p>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 4 - Request examples                                 */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-16 items-center">
            <div>
              <SectionLabel dark={false}>Requests</SectionLabel>
              <RevealText
                as="h2"
                text="Request examples"
                gradientWords={["examples"]}
                className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-6"
              />
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="space-y-5 text-muted-foreground leading-relaxed text-[15px] md:text-base"
              >
                <p>
                  A request retrieves a resource with your key in the header and optional filters as query
                  parameters. Requests that create or update data send a JSON body describing the
                  resource.
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="relative overflow-hidden rounded-2xl bg-[#050508] border border-white/10"
            >
              <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/10">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                <span className="ml-2 text-xs text-white/40 font-mono">request-examples.sh</span>
              </div>
              <pre className="text-[12.5px] leading-relaxed p-6 overflow-x-auto font-mono">
                <code>
                  <span className="text-white/40"># Retrieve a resource</span>
                  {"\n"}
                  <span className="text-emerald-400">GET</span>{" "}
                  <span className="text-sky-300">/v1/mentions?engine=chatgpt&amp;start_date=2026-06-01</span>
                  {"\n"}
                  <span className="text-white/40">Authorization: </span>
                  <span className="text-amber-300">Bearer ctly_live_••••••••••••</span>
                  {"\n\n"}
                  <span className="text-white/40"># Create a resource</span>
                  {"\n"}
                  <span className="text-emerald-400">POST</span> <span className="text-sky-300">/v1/questions</span>
                  {"\n"}
                  <span className="text-white/40">Authorization: </span>
                  <span className="text-amber-300">Bearer ctly_live_••••••••••••</span>
                  {"\n"}
                  <span className="text-white/40">Content-Type: application/json</span>
                  {"\n\n"}
                  <span className="text-white/80">{"{"}</span>
                  {"\n"}
                  {"  "}
                  <span className="text-sky-300">&quot;text&quot;</span>
                  <span className="text-white/60">: </span>
                  <span className="text-emerald-300">&quot;Best AI visibility platforms&quot;</span>
                  <span className="text-white/60">,</span>
                  {"\n"}
                  {"  "}
                  <span className="text-sky-300">&quot;engines&quot;</span>
                  <span className="text-white/60">: [</span>
                  <span className="text-emerald-300">&quot;chatgpt&quot;</span>
                  <span className="text-white/60">, </span>
                  <span className="text-emerald-300">&quot;perplexity&quot;</span>
                  <span className="text-white/60">]</span>
                  {"\n"}
                  <span className="text-white/80">{"}"}</span>
                </code>
              </pre>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 5 - Response examples                                */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24 bg-indigo-50/40 border-y border-black/5">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="relative overflow-hidden rounded-2xl bg-[#050508] border border-white/10 order-2 lg:order-1"
            >
              <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/10">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                <span className="ml-2 text-xs text-white/40 font-mono">response-200.json</span>
              </div>
              <pre className="text-[12.5px] leading-relaxed p-6 overflow-x-auto font-mono">
                <code>
                  <span className="text-white/80">{"{"}</span>
                  {"\n"}
                  {"  "}
                  <span className="text-sky-300">&quot;data&quot;</span>
                  <span className="text-white/60">: [</span>
                  {"\n"}
                  {"    "}
                  <span className="text-white/80">{"{"}</span>
                  {"\n"}
                  {"      "}
                  <span className="text-sky-300">&quot;id&quot;</span>
                  <span className="text-white/60">: </span>
                  <span className="text-emerald-300">&quot;mnt_8f2a1c&quot;</span>
                  <span className="text-white/60">,</span>
                  {"\n"}
                  {"      "}
                  <span className="text-sky-300">&quot;engine&quot;</span>
                  <span className="text-white/60">: </span>
                  <span className="text-emerald-300">&quot;chatgpt&quot;</span>
                  <span className="text-white/60">,</span>
                  {"\n"}
                  {"      "}
                  <span className="text-sky-300">&quot;sentiment&quot;</span>
                  <span className="text-white/60">: </span>
                  <span className="text-emerald-300">&quot;positive&quot;</span>
                  {"\n"}
                  {"    "}
                  <span className="text-white/80">{"}"}</span>
                  {"\n"}
                  {"  "}
                  <span className="text-white/60">],</span>
                  {"\n"}
                  {"  "}
                  <span className="text-sky-300">&quot;meta&quot;</span>
                  <span className="text-white/60">: {"{"}</span>
                  {"\n"}
                  {"    "}
                  <span className="text-sky-300">&quot;total&quot;</span>
                  <span className="text-white/60">: </span>
                  <span className="text-amber-300">214</span>
                  <span className="text-white/60">,</span>
                  {"\n"}
                  {"    "}
                  <span className="text-sky-300">&quot;next_cursor&quot;</span>
                  <span className="text-white/60">: </span>
                  <span className="text-emerald-300">&quot;eyJvZmZzZXQiOjI1fQ&quot;</span>
                  {"\n"}
                  {"  "}
                  <span className="text-white/60">{"}"}</span>
                  {"\n"}
                  <span className="text-white/80">{"}"}</span>
                </code>
              </pre>
            </motion.div>

            <div className="order-1 lg:order-2">
              <SectionLabel dark={false}>Responses</SectionLabel>
              <RevealText
                as="h2"
                text="Response examples"
                gradientWords={["examples"]}
                className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-6"
              />
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="space-y-5 text-muted-foreground leading-relaxed text-[15px] md:text-base"
              >
                <p>
                  Responses return JSON with a consistent structure: a{" "}
                  <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded">data</code> object
                  containing the requested records and{" "}
                  <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded">meta</code> describing
                  the result, such as the total count and pagination cursors.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 6 - Rate limits                                      */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="flex justify-center">
              <SectionLabel dark={false}>Limits</SectionLabel>
            </div>
            <RevealText
              as="h2"
              text="Rate limits"
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-4"
            />
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground leading-relaxed"
            >
              Requests are rate limited per API key. Each response includes headers showing your current
              limit, remaining requests, and reset time. High-volume use cases are better served by the
              reporting endpoints and, where available, webhooks.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {RATE_LIMIT_HEADERS.map((item, i) => (
              <motion.div
                key={item.header}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.08 * i }}
                className="rounded-2xl bg-white border border-black/5 shadow-[0_1px_3px_rgba(15,15,35,0.05)] p-6"
              >
                <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded block w-fit mb-3">
                  {item.header}
                </code>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 7 - Error handling                                   */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24 bg-indigo-50/40 border-y border-black/5">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="flex justify-center">
              <SectionLabel dark={false}>Errors</SectionLabel>
            </div>
            <RevealText
              as="h2"
              text="Error handling"
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-4"
            />
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground leading-relaxed"
            >
              The API uses standard HTTP status codes and returns a JSON error body with a
              machine-readable code and a human-readable message.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden rounded-2xl bg-[#050508] border border-white/10"
            >
              <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/10">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                <span className="ml-2 text-xs text-white/40 font-mono">response-401.json</span>
              </div>
              <pre className="text-[12.5px] leading-relaxed p-6 overflow-x-auto font-mono">
                <code>
                  <span className="text-white/80">{"{"}</span>
                  {"\n"}
                  {"  "}
                  <span className="text-sky-300">&quot;error&quot;</span>
                  <span className="text-white/60">: {"{"}</span>
                  {"\n"}
                  {"    "}
                  <span className="text-sky-300">&quot;code&quot;</span>
                  <span className="text-white/60">: </span>
                  <span className="text-emerald-300">&quot;invalid_api_key&quot;</span>
                  <span className="text-white/60">,</span>
                  {"\n"}
                  {"    "}
                  <span className="text-sky-300">&quot;message&quot;</span>
                  <span className="text-white/60">: </span>
                  <span className="text-emerald-300">&quot;The API key provided is invalid.&quot;</span>
                  {"\n"}
                  {"  "}
                  <span className="text-white/60">{"}"}</span>
                  {"\n"}
                  <span className="text-white/80">{"}"}</span>
                </code>
              </pre>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="rounded-2xl bg-white border border-black/5 shadow-[0_1px_3px_rgba(15,15,35,0.05)] p-6"
            >
              <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-muted-foreground/70 mb-4">
                Common status codes
              </div>
              <div className="grid grid-cols-2 gap-3">
                {STATUS_CODES.map((item) => (
                  <div key={item.code} className="flex items-center gap-2.5">
                    <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded">{item.code}</code>
                    <span className="text-sm text-muted-foreground">{item.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 8 - Best practices (dark accent card)                */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-[2rem] bg-[#050508] px-8 py-16 md:px-14 md:py-20"
          >
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(45% 55% at 15% 10%, rgba(91,91,255,0.22), transparent 70%), radial-gradient(40% 50% at 90% 20%, rgba(168,85,247,0.14), transparent 70%), radial-gradient(55% 60% at 50% 110%, rgba(59,130,246,0.10), transparent 70%)",
              }}
            />
            <div className="landing-noise" />

            <div className="relative">
              <div className="text-center mb-14">
                <div className="flex justify-center">
                  <SectionLabel>Best practices</SectionLabel>
                </div>
                <RevealText
                  as="h2"
                  text="Best practices for the AI Search API"
                  gradientWords={["API"]}
                  className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10 max-w-4xl mx-auto">
                {BEST_PRACTICES.map((item, i) => (
                  <motion.div
                    key={item.text}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: 0.08 * i }}
                    className="flex gap-4"
                  >
                    <div className="shrink-0 w-10 h-10 rounded-xl bg-indigo-500/15 border border-white/10 text-indigo-300 flex items-center justify-center">
                      <item.icon className="w-4.5 h-4.5" />
                    </div>
                    <p className="text-white/70 text-[15px] leading-relaxed">{item.text}</p>
                  </motion.div>
                ))}
              </div>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-center text-white/45 max-w-xl mx-auto mt-12"
              >
                For details on connecting Citationly to your other tools, see the{" "}
                <Link href="/integrations" className="text-indigo-300 font-medium hover:text-indigo-200 underline underline-offset-4 decoration-indigo-300/40 transition-colors">
                  Integrations guide
                </Link>
                .
              </motion.p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Section 9 - FAQ                                              */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="flex justify-center">
              <SectionLabel dark={false}>FAQ</SectionLabel>
            </div>
            <RevealText
              as="h2"
              text="Answers before you write a line of code."
              gradientWords={["code"]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-4"
            />
          </div>

          <div className="max-w-3xl mx-auto">
            <FaqAccordion />
          </div>
        </div>
      </section>

      <CtaBand
        title="Start building with the API"
        description="Get an API key, make your first authenticated request, and pull your AI visibility data wherever your team already works."
        primaryLabel="Get API Access"
        primaryHref="/register"
      />

      <div className="pb-20 md:pb-24 -mt-8">
        <div className="container mx-auto px-6 max-w-6xl flex items-center justify-center gap-6 text-sm">
          <Link href="/docs" className="text-muted-foreground hover:text-indigo-600 transition-colors">
            View Documentation
          </Link>
          <span className="text-black/15">•</span>
          <Link href="/contact" className="text-muted-foreground hover:text-indigo-600 transition-colors">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  )
}
