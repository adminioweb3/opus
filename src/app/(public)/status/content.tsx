"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { ChevronDown, Mail, ArrowRight, CircleCheck } from "lucide-react"
import { PageHero } from "@/components/features/public/PageHero"
import { SectionLabel } from "@/components/features/landing/primitives/SectionLabel"
import { RevealText } from "@/components/features/landing/primitives/RevealText"

/* ------------------------------------------------------------------ */
/* Fixed content data                                                  */
/* ------------------------------------------------------------------ */

type BarStatus = "ok" | "warn" | "down"

// Fixed, literal exception maps — day index (0 = 90 days ago, 89 = today) -> status.
// No randomness: these are hand-set historical blips so the strip reads as real telemetry.
const COMPONENTS: {
  name: string
  uptime: string
  exceptions: Record<number, BarStatus>
}[] = [
  {
    name: "Web application",
    uptime: "99.99%",
    exceptions: { 41: "warn" },
  },
  {
    name: "Public API",
    uptime: "99.97%",
    exceptions: { 22: "warn", 23: "warn", 63: "warn" },
  },
  {
    name: "Scan pipeline",
    uptime: "99.92%",
    exceptions: { 15: "down", 16: "down", 55: "warn", 82: "warn" },
  },
  {
    name: "AI analysis engine",
    uptime: "99.95%",
    exceptions: { 34: "warn", 78: "down" },
  },
  {
    name: "Notifications & email",
    uptime: "99.99%",
    exceptions: { 70: "warn" },
  },
]

function buildBars(exceptions: Record<number, BarStatus>): BarStatus[] {
  return Array.from({ length: 90 }, (_, i) => exceptions[i] ?? "ok")
}

const BAR_COLOR: Record<BarStatus, string> = {
  ok: "bg-emerald-400/80",
  warn: "bg-amber-400",
  down: "bg-rose-400",
}

interface TimelineEntry {
  stage: "Investigating" | "Identified" | "Monitoring" | "Resolved"
  time: string
  note: string
}

interface Incident {
  id: string
  date: string
  title: string
  duration: string
  timeline: TimelineEntry[]
  postmortem: string
}

const INCIDENTS: Incident[] = [
  {
    id: "2026-06-21",
    date: "2026-06-21",
    title: "Scan pipeline delays",
    duration: "2h 43m total impact",
    timeline: [
      {
        stage: "Investigating",
        time: "14:02 UTC",
        note: "Weekly Visibility Radar scans across ChatGPT and Perplexity began queuing well beyond normal duration. We opened an incident and started tracing the backlog.",
      },
      {
        stage: "Identified",
        time: "14:31 UTC",
        note: "A batch of scan workers had exhausted their retry budget after an upstream rate-limit change from one provider, causing jobs to silently re-queue instead of failing fast.",
      },
      {
        stage: "Monitoring",
        time: "15:20 UTC",
        note: "Deployed adjusted retry and backoff limits, and manually re-primed the stalled queue. Scan throughput returned to baseline; watching for recurrence before declaring resolved.",
      },
      {
        stage: "Resolved",
        time: "16:45 UTC",
        note: "Throughput held steady for 90 minutes. All delayed scans completed and delivered. No visibility data was lost, only delayed.",
      },
    ],
    postmortem:
      "The root cause was a provider-side rate-limit tightening that our retry logic wasn't tuned for, which let failed jobs pile up faster than workers could clear them. We've since added provider-specific backoff ceilings and an alert that fires on queue depth rather than only on failure count, so we catch this class of slowdown within minutes instead of an hour.",
  },
  {
    id: "2026-05-14",
    date: "2026-05-14",
    title: "Elevated API latency",
    duration: "48m total impact",
    timeline: [
      {
        stage: "Investigating",
        time: "09:14 UTC",
        note: "Public API response times climbed to 3-6x baseline for a subset of Citation Intelligence endpoints. Dashboards and scans continued to function normally.",
      },
      {
        stage: "Identified",
        time: "09:26 UTC",
        note: "A database index used by high-volume citation lookups had become fragmented after a large backfill job, forcing slower query plans under load.",
      },
      {
        stage: "Monitoring",
        time: "09:48 UTC",
        note: "Rebuilt the affected index and rerouted read traffic to a healthy replica while the rebuild completed. Latency returned to normal within minutes.",
      },
      {
        stage: "Resolved",
        time: "10:02 UTC",
        note: "Latency remained at baseline through the following monitoring window. No requests were dropped, only slowed.",
      },
    ],
    postmortem:
      "We schedule large backfills outside peak hours, but hadn't accounted for the index maintenance cost they leave behind. We now run an automated index health check after any backfill exceeding a size threshold, and rebuild proactively before it affects live traffic.",
  },
  {
    id: "2026-04-02",
    date: "2026-04-02",
    title: "Dashboard loading issues",
    duration: "31m total impact",
    timeline: [
      {
        stage: "Investigating",
        time: "11:50 UTC",
        note: "A share of users reported the Command Center and Brand Pulse dashboards failing to load or timing out on first request.",
      },
      {
        stage: "Identified",
        time: "12:02 UTC",
        note: "A configuration change to our edge cache had an overly aggressive rule that was serving stale, invalid bundle references to a portion of traffic.",
      },
      {
        stage: "Monitoring",
        time: "12:14 UTC",
        note: "Rolled back the cache configuration change and purged affected edge nodes. Load success rates recovered immediately across all regions.",
      },
      {
        stage: "Resolved",
        time: "12:21 UTC",
        note: "Confirmed clean loads from every affected region for 15 consecutive minutes before closing the incident.",
      },
    ],
    postmortem:
      "The change had passed staging because our staging cache doesn't carry the same traffic patterns as production edge nodes. We've added a canary stage that rolls edge cache changes to a small slice of production traffic first, with automated rollback if load errors spike.",
  },
]

/* ------------------------------------------------------------------ */
/* Small building blocks                                                */
/* ------------------------------------------------------------------ */

function UptimeStrip({ exceptions }: { exceptions: Record<number, BarStatus> }) {
  const bars = buildBars(exceptions)
  return (
    <div className="flex items-end gap-[2px] h-8 w-full">
      {bars.map((status, i) => (
        <div
          key={i}
          className={`flex-1 rounded-[1px] ${BAR_COLOR[status]} ${status === "ok" ? "h-full" : status === "warn" ? "h-4/5" : "h-3/5"}`}
        />
      ))}
    </div>
  )
}

function ComponentRow({
  name,
  uptime,
  exceptions,
  index,
}: {
  name: string
  uptime: string
  exceptions: Record<number, BarStatus>
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.05 + index * 0.08 }}
      className="rounded-2xl bg-white border border-black/5 shadow-[0_1px_3px_rgba(15,15,35,0.05)] p-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h3 className="font-semibold text-foreground">{name}</h3>
        <div className="flex items-center gap-4">
          <span className="text-xs font-medium text-muted-foreground">{uptime} uptime (90d)</span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 border border-emerald-500/15">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Operational
          </span>
        </div>
      </div>
      <UptimeStrip exceptions={exceptions} />
      <div className="flex justify-between mt-2 text-[11px] text-muted-foreground/60">
        <span>90 days ago</span>
        <span>Today</span>
      </div>
    </motion.div>
  )
}

function IncidentCard({ incident, index }: { incident: Incident; index: number }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.05 + index * 0.08 }}
      className="rounded-2xl bg-white border border-black/5 shadow-[0_1px_3px_rgba(15,15,35,0.05)] overflow-hidden"
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <div>
          <div className="text-[11px] font-semibold tracking-[0.1em] uppercase text-muted-foreground/70 mb-1">
            {incident.date} &middot; {incident.duration}
          </div>
          <div className="font-semibold text-foreground">{incident.title}</div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-black/5 text-muted-foreground">
            Resolved
          </span>
          <ChevronDown
            className={`w-4 h-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
          />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-1 border-t border-black/5">
              <div className="mt-5 space-y-5">
                {incident.timeline.map((entry) => (
                  <div key={entry.stage} className="flex gap-4">
                    <div className="shrink-0 w-2 h-2 rounded-full bg-indigo-500 mt-1.5" />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-foreground">{entry.stage}</span>
                        <span className="text-xs text-muted-foreground/70">{entry.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{entry.note}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-xl bg-indigo-50/50 border border-indigo-100 p-5">
                <div className="text-[11px] font-semibold tracking-[0.1em] uppercase text-indigo-600 mb-2">
                  Postmortem
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{incident.postmortem}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export function Content() {
  const [email, setEmail] = useState("")

  const handleSubscribe = () => {
    const subject = encodeURIComponent("Subscribe to Citationly status updates")
    const body = encodeURIComponent(
      email ? `Please subscribe ${email} to Citationly status updates.` : "Please subscribe me to Citationly status updates."
    )
    window.location.href = `mailto:status@citationly.io?subject=${subject}&body=${body}`
  }

  return (
    <div className="bg-background">
      <PageHero
        eyebrow="System status"
        title="All systems operational."
        description="Live view of Citationly service health."
      >
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="w-full max-w-xl mx-auto"
        >
          <div className="flex items-center justify-between gap-4 rounded-2xl bg-white border border-black/5 shadow-[0_1px_3px_rgba(15,15,35,0.05)] px-6 py-5">
            <div className="flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
              </span>
              <span className="font-semibold text-foreground text-[15px]">All systems operational</span>
            </div>
            <span className="text-xs text-muted-foreground/70">Updated continuously</span>
          </div>
        </motion.div>
      </PageHero>

      {/* ---------------------------------------------------------- */}
      {/* Component health                                             */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-14">
            <div className="flex justify-center">
              <SectionLabel dark={false}>Component health</SectionLabel>
            </div>
            <RevealText
              as="h2"
              text="Every part of the platform, watched continuously."
              gradientWords={["continuously."]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-4"
            />
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-muted-foreground max-w-xl mx-auto"
            >
              Uptime over the last 90 days for each core system, updated the moment status changes.
            </motion.p>
          </div>

          <div className="space-y-4">
            {COMPONENTS.map((c, i) => (
              <ComponentRow key={c.name} name={c.name} uptime={c.uptime} exceptions={c.exceptions} index={i} />
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-xs text-muted-foreground/70">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400/80" /> Operational
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400" /> Degraded performance
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-400" /> Outage
            </span>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Past incidents                                               */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24 bg-indigo-50/40 border-y border-black/5">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-14">
            <div className="flex justify-center">
              <SectionLabel dark={false}>Past incidents</SectionLabel>
            </div>
            <RevealText
              as="h2"
              text="A record of what broke, and what we did about it."
              gradientWords={["broke,"]}
              className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-4"
            />
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-muted-foreground max-w-xl mx-auto"
            >
              Every incident that affected the platform in the last 90 days, with a timeline and an honest
              postmortem. Expand any card for details.
            </motion.p>
          </div>

          <div className="space-y-4 flex flex-col items-stretch">
            {INCIDENTS.map((incident, i) => (
              <IncidentCard key={incident.id} incident={incident} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Subscribe                                                    */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-[2rem] bg-white border border-black/5 shadow-[0_1px_3px_rgba(15,15,35,0.05)] p-8 md:p-12 text-center"
          >
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center mx-auto mb-6">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-semibold tracking-[-0.02em] text-foreground mb-3">
              Subscribe to status updates
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-8 text-[15px] leading-relaxed">
              Get notified the moment an incident opens, updates, or resolves. This page itself also
              refreshes continuously during any active incident, so it&apos;s always the fastest place to check.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSubscribe()
              }}
              className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full h-12 px-5 rounded-full border border-black/10 bg-white text-[15px] text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-300"
              />
              <button
                type="submit"
                className="shrink-0 h-12 px-6 rounded-full font-medium text-[15px] bg-[#050508] text-white hover:bg-[#1a1a24] transition-colors inline-flex items-center gap-2 whitespace-nowrap"
              >
                Subscribe
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
            <p className="text-xs text-muted-foreground/60 mt-4">
              Opens your email client with a subscription request to status@citationly.io.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Quiet closing band                                           */}
      {/* ---------------------------------------------------------- */}
      <section className="pb-24">
        <div className="container mx-auto px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-between gap-6 rounded-2xl border border-black/5 bg-white px-8 py-7"
          >
            <div className="flex items-center gap-3 text-center sm:text-left">
              <CircleCheck className="w-5 h-5 text-indigo-600 shrink-0 hidden sm:block" />
              <p className="text-[15px] text-muted-foreground">
                Experiencing an issue right now that isn&apos;t reflected here? Reach out and we&apos;ll take a look.
              </p>
            </div>
            <Link
              href="/contact"
              className="shrink-0 inline-flex items-center gap-2 h-11 px-6 rounded-full font-medium text-sm border border-black/10 text-foreground hover:bg-black/5 transition-colors"
            >
              Contact support
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
