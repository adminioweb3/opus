"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, FileText, Scale, ShieldCheck } from "lucide-react"
import { PageHero } from "@/components/features/public/PageHero"

/* ------------------------------------------------------------------ */
/* Table of contents                                                   */
/* ------------------------------------------------------------------ */

const SECTIONS: { id: string; number: string; title: string }[] = [
  { id: "agreement", number: "01", title: "Agreement & Definitions" },
  { id: "service", number: "02", title: "The Service" },
  { id: "accounts", number: "03", title: "Accounts" },
  { id: "trial", number: "04", title: "Free Trial" },
  { id: "billing", number: "05", title: "Subscriptions & Billing" },
  { id: "acceptable-use", number: "06", title: "Acceptable Use" },
  { id: "ai-disclaimer", number: "07", title: "AI-Generated Content" },
  { id: "ip", number: "08", title: "Intellectual Property" },
  { id: "confidentiality", number: "09", title: "Confidentiality" },
  { id: "liability", number: "10", title: "Disclaimers & Liability" },
  { id: "termination", number: "11", title: "Termination" },
  { id: "governing-law", number: "12", title: "Governing Law & Changes" },
]

/* ------------------------------------------------------------------ */
/* Small building blocks                                               */
/* ------------------------------------------------------------------ */

function LegalSection({
  id,
  number,
  title,
  children,
}: {
  id: string
  number: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-32 pb-14 md:pb-16 border-b border-black/5 last:border-0 last:pb-0">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-baseline gap-3 mb-5">
          <span className="text-sm font-semibold tracking-widest text-indigo-500/70">{number}</span>
          <h2 className="text-xl md:text-2xl font-semibold tracking-[-0.01em] text-foreground">{title}</h2>
        </div>
        <div className="space-y-4 text-[15px] leading-relaxed text-muted-foreground [&_strong]:text-foreground [&_strong]:font-medium">
          {children}
        </div>
      </motion.div>
    </section>
  )
}

function List({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="space-y-2.5 pl-1">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-indigo-400" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

/* ------------------------------------------------------------------ */
/* Page                                                                 */
/* ------------------------------------------------------------------ */

export function Content() {
  const [activeId, setActiveId] = useState<string>(SECTIONS[0].id)

  useEffect(() => {
    const elements = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el !== null
    )
    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) {
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="bg-background">
      <PageHero
        eyebrow="Legal"
        title="Terms of Service"
        description="Last updated: July 1, 2026."
      />

      <section className="pb-24 md:pb-28">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-14 lg:gap-20 items-start">
            {/* ---------------------------------------------------- */}
            {/* Sticky TOC                                            */}
            {/* ---------------------------------------------------- */}
            <aside className="hidden lg:block sticky top-32 self-start">
              <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-muted-foreground/60 mb-4 px-3">
                On this page
              </div>
              <nav className="space-y-0.5">
                {SECTIONS.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className={`block px-3 py-1.5 rounded-lg text-[13.5px] leading-relaxed transition-colors ${
                      activeId === s.id
                        ? "text-indigo-600 bg-indigo-50 font-medium"
                        : "text-muted-foreground hover:text-foreground hover:bg-black/3"
                    }`}
                  >
                    <span className="tabular-nums text-[11px] mr-2 opacity-60">{s.number}</span>
                    {s.title}
                  </a>
                ))}
              </nav>
              <div className="mt-8 px-3 pt-6 border-t border-black/5">
                <p className="text-[13px] text-muted-foreground/70 leading-relaxed">
                  Questions about these terms? Reach the team at{" "}
                  <a href="mailto:legal@citationly.io" className="text-indigo-600 hover:underline">
                    legal@citationly.io
                  </a>
                  .
                </p>
              </div>
            </aside>

            {/* Mobile TOC */}
            <div className="lg:hidden -mx-6 px-6 overflow-x-auto">
              <div className="flex gap-2 pb-2 w-max">
                {SECTIONS.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="shrink-0 px-3.5 py-1.5 rounded-full text-[13px] font-medium border border-black/10 text-muted-foreground hover:text-foreground hover:border-black/20 transition-colors"
                  >
                    {s.title}
                  </a>
                ))}
              </div>
            </div>

            {/* ---------------------------------------------------- */}
            {/* Content                                               */}
            {/* ---------------------------------------------------- */}
            <div>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-[15px] leading-relaxed text-muted-foreground mb-12 pb-12 border-b border-black/5"
              >
                These Terms of Service (&ldquo;Terms&rdquo;) form a binding agreement between you and
                Citationly, Inc. (&ldquo;Citationly,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;) governing
                your access to and use of the Citationly platform, including Command Center, Visibility
                Radar, Citation Intelligence, Brand Pulse, Competitor Watch, Opportunity Finder, GEO
                Optimizer, Answer Simulator, Content Generator, Publishing Center, Knowledge Vault, Reports,
                and all related services (together, the &ldquo;Service&rdquo;). By creating an account,
                starting a trial, or otherwise using the Service, you accept these Terms on behalf of
                yourself and, if applicable, the organization you represent.
              </motion.p>

              <LegalSection id="agreement" number="01" title="Agreement & Definitions">
                <p>
                  &ldquo;Workspace&rdquo; means the Citationly account and its associated data, brands,
                  users, and settings created for your organization. &ldquo;Authorized User&rdquo; means
                  anyone your organization invites into a Workspace under a role you assign. &ldquo;Your
                  Content&rdquo; means the brand information, URLs, competitor lists, and other inputs you
                  provide, along with the reports and configurations you create inside the Service.
                </p>
                <p>
                  If you use the Service on behalf of a company or other legal entity, you represent that
                  you have authority to bind that entity, and &ldquo;you&rdquo; refers to that entity. If
                  you don&apos;t have that authority, please don&apos;t accept these Terms and don&apos;t
                  use the Service.
                </p>
                <p>
                  If you enter into a separate written agreement with us (an order form or master services
                  agreement) that conflicts with these Terms, that agreement controls for the subject
                  matter it covers.
                </p>
              </LegalSection>

              <LegalSection id="service" number="02" title="The Service">
                <p>
                  Citationly is an AI visibility intelligence platform. We scan your public web presence
                  and simulate the questions real buyers ask AI assistants — ChatGPT, Gemini, Claude,
                  Perplexity, Copilot, and Grok — to measure how those platforms discover, describe,
                  recommend, and cite your brand. We then surface prioritized opportunities and tools to
                  improve that visibility, including page-level fixes, content generation, and publishing
                  workflows.
                </p>
                <p>
                  The Service depends on third-party AI platforms that we do not control. Their models,
                  answers, citation behavior, rate limits, and terms of access can change at any time, and
                  those changes can affect scan availability, scoring, and the accuracy of historical
                  comparisons. We work to keep scans current and representative, but we cannot guarantee
                  any particular AI platform&apos;s behavior, uptime, or continued accessibility.
                </p>
                <p>
                  We may add, modify, or retire individual modules or features as the Service evolves. We
                  will provide reasonable notice before retiring a feature that materially reduces the
                  functionality of a paid plan.
                </p>
              </LegalSection>

              <LegalSection id="accounts" number="03" title="Accounts">
                <p>
                  You can create a Workspace using a Google account or another supported sign-in method.
                  You agree to provide accurate, current information during signup and to keep it up to
                  date — including the brand and domain information used to run scans on your behalf.
                </p>
                <p>
                  The person who creates a Workspace is its <strong>owner</strong> by default and is
                  responsible for the organization&apos;s use of the Service, including the actions of
                  every Authorized User they invite, the accuracy of billing information, and compliance
                  with these Terms across the account. Owners can transfer or share this responsibility
                  through the Team & Roles settings, but Citationly will treat the current registered owner
                  as authoritative for account-level decisions until a transfer is confirmed.
                </p>
                <p>
                  You&apos;re responsible for maintaining the security of your login credentials and for
                  all activity that occurs under your account. Notify us immediately at{" "}
                  <a href="mailto:legal@citationly.io" className="text-indigo-600 hover:underline">
                    legal@citationly.io
                  </a>{" "}
                  if you suspect unauthorized access.
                </p>
              </LegalSection>

              <LegalSection id="trial" number="04" title="Free Trial">
                <p>
                  Every new Workspace starts with a 7-day free trial with full access to every plan
                  feature — Visibility Radar, Citation Intelligence, Brand Pulse, Competitor Watch,
                  Opportunity Finder, GEO Optimizer, Answer Simulator, and the rest of the platform. No
                  credit card is required to start a trial.
                </p>
                <p>
                  When your trial period ends without an active paid subscription, your Workspace moves
                  into a <strong>read-limited state</strong>: you retain access to view scans, reports, and
                  data already generated during the trial, but scheduled scans pause, new deep scans and
                  content generation are disabled, and Authorized User invitations are frozen until you
                  choose a plan. Your data is preserved and nothing is deleted solely because a trial ends.
                </p>
                <p>
                  We may modify trial length, features included, or eligibility for future trials at our
                  discretion, including to prevent abuse of repeated trial signups.
                </p>
              </LegalSection>

              <LegalSection id="billing" number="05" title="Subscriptions & Billing">
                <p>
                  Paid plans — Starter, Professional, and Enterprise — are billed monthly or annually in
                  advance, based on the billing cycle you select at checkout. Annual plans are billed once
                  per year at the discounted annual rate and are non-refundable for partial periods except
                  as described below or as required by law.
                </p>
                <p>
                  <strong>Plan changes.</strong> Upgrading takes effect immediately, with the difference in
                  price prorated for the remainder of your current billing cycle. Downgrading takes effect
                  at the start of your next billing cycle, and any features exclusive to your prior plan
                  (for example, deeper Opportunity Finder scan frequency or additional Knowledge Vault
                  capacity) become unavailable at that point.
                </p>
                <p>
                  <strong>Non-payment.</strong> If a payment fails, we&apos;ll attempt to retry it and
                  notify the Workspace owner. If payment isn&apos;t resolved within a reasonable grace
                  period, we may suspend the Workspace to the same read-limited state used at trial expiry,
                  and may terminate the subscription entirely for prolonged non-payment.
                </p>
                <p>
                  All fees are exclusive of taxes, which we may collect where required. Prices are subject
                  to change with at least 30 days&apos; notice before your next renewal.
                </p>
              </LegalSection>

              <LegalSection id="acceptable-use" number="06" title="Acceptable Use">
                <p>You agree not to, and not to permit any Authorized User or third party to:</p>
                <List
                  items={[
                    <>
                      Use scraping, scanning, or automation against Citationly infrastructure in a manner
                      that abuses rate limits, degrades service for other customers, or circumvents usage
                      restrictions on your plan;
                    </>,
                    <>
                      Run Visibility Radar, Competitor Watch, or Brand Pulse monitoring against brands,
                      domains, or individuals you have no legitimate business interest in monitoring — for
                      example, to build unsolicited profiles of unrelated third parties;
                    </>,
                    <>
                      Reverse engineer, decompile, or attempt to extract the underlying prompts, scoring
                      methodology, or source code of the Service, except to the extent applicable law
                      prohibits this restriction;
                    </>,
                    <>
                      Resell, sublicense, or provide the Service (or reports generated by it) to third
                      parties as a standalone commercial offering without a separate written agency or
                      reseller agreement with us; and
                    </>,
                    <>
                      Use the Service to violate any law, infringe any third party&apos;s rights, or
                      transmit malicious code.
                    </>,
                  ]}
                />
                <p>
                  We may suspend or terminate access for any Workspace that violates this section, with
                  notice where practical.
                </p>
              </LegalSection>

              <LegalSection id="ai-disclaimer" number="07" title="AI-Generated Content Disclaimer">
                <p>
                  Visibility scores, citation findings, simulated answers, and generated content within
                  Citationly — including outputs from Visibility Radar, Answer Simulator, GEO Optimizer, and
                  Content Generator — are AI-assisted estimates built from sampled interactions with
                  third-party AI platforms. They are <strong>not guarantees</strong> of how any AI platform
                  will behave for a given user, prompt, or point in time.
                </p>
                <p>
                  AI platforms are non-deterministic and change frequently and without notice. A finding
                  that was accurate at the time of a scan may not hold true days or even hours later. You
                  should independently verify any analysis before relying on it for high-stakes decisions —
                  including public claims, investor communications, competitive statements, or legal or
                  compliance matters.
                </p>
                <p>
                  Content produced by Content Generator is a starting draft, not a finished, verified
                  publication. You are responsible for reviewing, fact-checking, and approving any content
                  before it is published through Publishing Center or elsewhere.
                </p>
              </LegalSection>

              <LegalSection id="ip" number="08" title="Intellectual Property">
                <p>
                  <strong>Your data stays yours.</strong> As between you and Citationly, you own Your
                  Content — your brand information, source material, and the reports and configurations you
                  create. You grant us a limited license to host, process, and analyze Your Content solely
                  to provide and improve the Service to you.
                </p>
                <p>
                  <strong>Our platform stays ours.</strong> Citationly owns the Service itself — the
                  software, scoring methodology, scan infrastructure, user interface, and all underlying
                  technology, along with any improvements we make from aggregated, de-identified usage data
                  that cannot be traced back to a specific Workspace. We grant you a limited, non-exclusive,
                  non-transferable license to access and use the Service during your subscription, solely
                  for your internal business purposes.
                </p>
                <p>
                  Nothing in these Terms transfers ownership of either party&apos;s pre-existing
                  intellectual property to the other.
                </p>
              </LegalSection>

              <LegalSection id="confidentiality" number="09" title="Confidentiality">
                <p>
                  Each party may access non-public information of the other — including Your Content,
                  usage data, security practices, and pricing not otherwise made public — that a reasonable
                  person would understand to be confidential (&ldquo;Confidential Information&rdquo;). Each
                  party agrees to use the other&apos;s Confidential Information only to perform its
                  obligations under these Terms, and to protect it with the same degree of care it uses for
                  its own confidential information, and no less than reasonable care.
                </p>
                <p>
                  These obligations don&apos;t apply to information that is or becomes public through no
                  fault of the receiving party, was already known to it without a duty of confidentiality,
                  or is independently developed without reference to the disclosing party&apos;s
                  Confidential Information.
                </p>
              </LegalSection>

              <LegalSection id="liability" number="10" title="Disclaimers & Limitation of Liability">
                <p>
                  The Service is provided &ldquo;as is&rdquo; and &ldquo;as available.&rdquo; To the maximum
                  extent permitted by law, Citationly disclaims all warranties, express or implied,
                  including merchantability, fitness for a particular purpose, and non-infringement, and
                  does not warrant that scan results, visibility scores, or generated content will be
                  accurate, complete, or uninterrupted, or that any AI platform will behave in a particular
                  way at any given time.
                </p>
                <p>
                  To the maximum extent permitted by law, neither party will be liable for any indirect,
                  incidental, special, consequential, or punitive damages, or for any loss of profits,
                  revenue, data, or goodwill, arising out of or related to these Terms or the Service, even
                  if advised of the possibility of such damages.
                </p>
                <p>
                  Each party&apos;s total liability arising out of or related to these Terms will not
                  exceed the total fees you actually paid to Citationly in the twelve (12) months preceding
                  the event giving rise to the claim. This limitation does not apply to a party&apos;s
                  breach of the Confidentiality section, a party&apos;s indemnification obligations, or
                  either party&apos;s gross negligence or willful misconduct.
                </p>
              </LegalSection>

              <LegalSection id="termination" number="11" title="Termination">
                <p>
                  You may cancel your subscription at any time from Workspace billing settings; cancellation
                  takes effect at the end of your current billing cycle unless you request immediate
                  cancellation. We may suspend or terminate your access for breach of these Terms,
                  non-payment, or if required by law, with notice where practical.
                </p>
                <p>
                  Upon termination, your right to access the Service ends, but you will have a{" "}
                  <strong>30-day export window</strong> to download Your Content, reports, and scan history
                  before it is permanently deleted from our systems. We recommend exporting anything you
                  need through Reports before this window closes.
                </p>
                <p>
                  Sections that by their nature should survive termination — including Intellectual
                  Property, Confidentiality, Disclaimers & Limitation of Liability, and Governing Law — will
                  survive.
                </p>
              </LegalSection>

              <LegalSection id="governing-law" number="12" title="Governing Law & Changes">
                <p>
                  These Terms are governed by the laws of the State of Delaware, without regard to its
                  conflict of laws principles, and any dispute arising out of or relating to these Terms or
                  the Service will be subject to the exclusive jurisdiction of the state and federal courts
                  located in Delaware.
                </p>
                <p>
                  We may update these Terms from time to time to reflect changes to the Service, legal
                  requirements, or our business practices. If we make a material change, we&apos;ll notify
                  Workspace owners by email or in-product notice at least 14 days before the change takes
                  effect. Continued use of the Service after a change takes effect constitutes acceptance
                  of the updated Terms.
                </p>
                <p>
                  Questions about these Terms can be sent to{" "}
                  <a href="mailto:legal@citationly.io" className="text-indigo-600 hover:underline">
                    legal@citationly.io
                  </a>
                  .
                </p>
              </LegalSection>

              {/* -------------------------------------------------- */}
              {/* Closing links card                                  */}
              {/* -------------------------------------------------- */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.6 }}
                className="mt-14 rounded-2xl border border-black/5 bg-indigo-50/40 p-8 md:p-10"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="shrink-0 w-11 h-11 rounded-xl bg-white border border-black/5 text-indigo-600 flex items-center justify-center shadow-[0_1px_3px_rgba(15,15,35,0.05)]">
                    <Scale className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-lg mb-1">
                      Related reading
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">
                      For details on what data we collect and how it&apos;s used, see our Privacy Policy.
                      For anything else, our team is glad to help.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/privacy"
                    className="group inline-flex items-center justify-center gap-2 h-11 px-6 rounded-full font-medium text-[14px] bg-white border border-black/10 text-foreground hover:border-black/20 transition-colors"
                  >
                    <FileText className="w-4 h-4" />
                    Read the Privacy Policy
                  </Link>
                  <Link
                    href="/contact"
                    className="group inline-flex items-center justify-center gap-2 h-11 px-6 rounded-full font-medium text-[14px] bg-[#050508] text-white hover:bg-[#1a1a24] transition-colors"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    Contact legal & support
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
