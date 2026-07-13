"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ShieldCheck, FileText } from "lucide-react"
import { PageHero } from "@/components/features/public/PageHero"

/* ------------------------------------------------------------------ */
/* Fixed content data                                                  */
/* ------------------------------------------------------------------ */

interface Section {
  id: string
  title: string
  body: React.ReactNode
}

const SECTIONS: Section[] = [
  {
    id: "who-we-are",
    title: "1. Who we are",
    body: (
      <>
        <p>
          Citationly (&ldquo;Citationly,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) operates
          the Citationly AI visibility intelligence platform, including our website, dashboard, and related
          services (together, the &ldquo;Service&rdquo;). This Privacy Policy explains what information we
          collect when you use the Service, how we use and share it, and the choices and rights available to you.
        </p>
        <p>
          This policy applies to visitors to our marketing site, registered users of the Citationly dashboard,
          and the organizations (&ldquo;Customers&rdquo;) that subscribe to Citationly on behalf of their teams.
          If you are a Customer, your organization&apos;s admin controls certain settings — such as team
          membership and integrations — described in your organization&apos;s agreement with us.
        </p>
      </>
    ),
  },
  {
    id: "information-we-collect",
    title: "2. Information we collect",
    body: (
      <>
        <p>We collect information in four categories:</p>
        <ul className="list-disc pl-5 space-y-3 marker:text-indigo-400">
          <li>
            <span className="font-medium text-foreground">Account information.</span> When you sign in with
            Google, we receive your name, email address, and profile image from Google. We do not receive your
            Google password, and we only request the minimum scopes needed to authenticate you.
          </li>
          <li>
            <span className="font-medium text-foreground">Organization and website details you provide.</span>{" "}
            This includes your company name, the domains and pages you ask us to analyze, competitor names you
            add to Competitor Watch, brand terms you configure for Brand Pulse, and any content, prompts, or
            documents you upload to the Knowledge Vault.
          </li>
          <li>
            <span className="font-medium text-foreground">Scan and analysis data we generate.</span> To power
            Visibility Radar, Citation Intelligence, the GEO Optimizer, and the Answer Simulator, we crawl your
            public website and query AI platforms with prompts relevant to your industry, then store the
            resulting scores, citations, and recommendations in your account.
          </li>
          <li>
            <span className="font-medium text-foreground">Usage analytics and cookies.</span> We collect
            standard technical data — IP address, browser and device type, pages visited, and feature usage —
            through first-party analytics and functional cookies, so we can secure the Service, remember your
            preferences, and understand which features are useful.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "how-we-use-information",
    title: "3. How we use information",
    body: (
      <>
        <p>We use the information described above to:</p>
        <ul className="list-disc pl-5 space-y-2.5 marker:text-indigo-400">
          <li>Run the scans, scores, and recommendations that power every module of the Service — Command Center, Visibility Radar, Citation Intelligence, Brand Pulse, Competitor Watch, Opportunity Finder, and the GEO Optimizer.</li>
          <li>Maintain, secure, and improve the Service, including diagnosing bugs, monitoring performance, and preventing abuse.</li>
          <li>Send you transactional and account communications — scan alerts, weekly digests, billing notices — and, where you&apos;ve opted in, product updates.</li>
          <li>Detect, investigate, and prevent fraud, unauthorized access, and violations of our Terms of Service.</li>
        </ul>
        <p>
          We do not use your account information or the content you provide to sell you to advertisers, and we
          do not run third-party ad networks on the Service.
        </p>
      </>
    ),
  },
  {
    id: "ai-processing",
    title: "4. AI processing",
    body: (
      <>
        <p>
          Citationly&apos;s scans work by analyzing your public web content and querying AI platforms on your
          behalf. To do this, we send publicly available web content, your configured prompts, and relevant
          inputs you&apos;ve provided to third-party AI providers — such as OpenAI — solely to generate your
          analyses, scores, and recommendations.
        </p>
        <p>
          These providers process your data under contractual terms that prohibit them from using it to train
          their own foundation models, and we do not use your account content to train any AI models ourselves.
          Data sent for analysis is used exclusively to produce the outputs shown back to you inside your
          Citationly account.
        </p>
      </>
    ),
  },
  {
    id: "sharing",
    title: "5. Sharing",
    body: (
      <>
        <p>
          We do not sell your personal information, and we never will. We share information only with the
          following categories of subprocessors, each bound by a data processing agreement:
        </p>
        <ul className="list-disc pl-5 space-y-2.5 marker:text-indigo-400">
          <li><span className="font-medium text-foreground">Cloud hosting and infrastructure providers</span> that store your account data and power our application.</li>
          <li><span className="font-medium text-foreground">AI providers</span> (such as OpenAI) engaged to generate the analyses described in Section 4.</li>
          <li><span className="font-medium text-foreground">Email and communications providers</span> used to deliver transactional and marketing messages.</li>
        </ul>
        <p>
          We may also disclose information if required by law, to enforce our agreements, or to protect the
          rights, property, or safety of Citationly, our customers, or the public. If Citationly is involved in
          a merger, acquisition, or asset sale, your information may be transferred as part of that transaction,
          subject to this policy.
        </p>
      </>
    ),
  },
  {
    id: "data-retention",
    title: "6. Data retention",
    body: (
      <p>
        We retain your account information and scan history for as long as your account remains active, so
        that Command Center trendlines and historical scans stay meaningful over time. If you close your
        account or request deletion, we delete your personal data and associated scan data within 30 days,
        except where we are required to retain limited records for legal, tax, or security purposes.
      </p>
    ),
  },
  {
    id: "your-rights",
    title: "7. Your rights",
    body: (
      <>
        <p>
          Depending on where you live, you may have rights under laws such as the GDPR (European Economic Area
          and UK) or the CCPA (California) with respect to your personal information, including the right to:
        </p>
        <ul className="list-disc pl-5 space-y-2.5 marker:text-indigo-400">
          <li>Access the personal information we hold about you.</li>
          <li>Export your data in a portable format, including scan history and reports.</li>
          <li>Correct inaccurate or incomplete information.</li>
          <li>Request deletion of your personal information, subject to the retention terms in Section 6.</li>
          <li>Opt out of non-essential communications at any time.</li>
        </ul>
        <p>
          To exercise any of these rights, email <a href="mailto:privacy@citationly.io" className="text-indigo-600 font-medium hover:underline">privacy@citationly.io</a>. We will respond within the timeframe required by applicable law, and we will never charge a fee to process a valid request.
        </p>
      </>
    ),
  },
  {
    id: "security",
    title: "8. Security",
    body: (
      <p>
        We use industry-standard technical and organizational safeguards — including encryption in transit,
        access controls, and continuous monitoring — to protect your information. No system is completely
        secure, but we design and audit the Service to meet the standard our customers depend on. Details on
        our security practices, certifications, and how to report a vulnerability are available on our{" "}
        <Link href="/security" className="text-indigo-600 font-medium hover:underline">Security page</Link>.
      </p>
    ),
  },
  {
    id: "international-transfers",
    title: "9. International transfers",
    body: (
      <p>
        Citationly and our subprocessors operate globally, which means your information may be transferred to,
        stored, and processed in countries other than the one in which you reside — including the United
        States. Where required, we rely on appropriate safeguards, such as Standard Contractual Clauses, to
        ensure your information receives an adequate level of protection wherever it is processed.
      </p>
    ),
  },
  {
    id: "children",
    title: "10. Children",
    body: (
      <p>
        The Service is intended for business use and is not directed to individuals under 16 years of age. We
        do not knowingly collect personal information from anyone under 16. If you believe a child has provided
        us with personal information, please contact us at{" "}
        <a href="mailto:privacy@citationly.io" className="text-indigo-600 font-medium hover:underline">privacy@citationly.io</a> and we will delete it promptly.
      </p>
    ),
  },
  {
    id: "changes-contact",
    title: "11. Changes & contact",
    body: (
      <>
        <p>
          We may update this Privacy Policy from time to time to reflect changes in our practices or for legal
          or operational reasons. If we make material changes, we&apos;ll notify active account holders by
          email or an in-app notice before the changes take effect. The &ldquo;Last updated&rdquo; date at the
          top of this page always reflects the most recent version.
        </p>
        <p>
          Questions about this policy or how we handle your data? Contact our privacy team at{" "}
          <a href="mailto:privacy@citationly.io" className="text-indigo-600 font-medium hover:underline">privacy@citationly.io</a>, or reach out through our{" "}
          <Link href="/contact" className="text-indigo-600 font-medium hover:underline">contact page</Link>.
        </p>
      </>
    ),
  },
]

/* ------------------------------------------------------------------ */
/* Sticky table of contents with scroll-spy                            */
/* ------------------------------------------------------------------ */

function TableOfContents() {
  const [activeId, setActiveId] = useState<string>(SECTIONS[0].id)

  useEffect(() => {
    const headings = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el !== null
    )

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
    )

    headings.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <nav aria-label="Table of contents" className="hidden lg:block">
      <div className="sticky top-32">
        <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-muted-foreground/70 mb-4 px-1">
          On this page
        </div>
        <ul className="space-y-0.5 border-l border-black/8">
          {SECTIONS.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className={`block pl-4 pr-2 py-1.5 -ml-px border-l text-[13px] leading-snug transition-colors ${
                  activeId === section.id
                    ? "border-indigo-500 text-indigo-600 font-medium"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {section.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export function Content() {
  return (
    <div className="bg-background">
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description="Last updated: July 1, 2026. How Citationly collects, uses, and protects your data."
      />

      <section className="pb-24 md:pb-28">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-12 lg:gap-16">
            <TableOfContents />

            <div className="max-w-3xl">
              {SECTIONS.map((section, i) => (
                <motion.div
                  key={section.id}
                  id={section.id}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.5, delay: i === 0 ? 0 : 0.05 }}
                  className="scroll-mt-32 pb-10 mb-10 border-b border-black/5 last:border-b-0 last:pb-0 last:mb-0"
                >
                  <h2 className="text-xl md:text-2xl font-semibold tracking-[-0.01em] text-foreground mb-4">
                    {section.title}
                  </h2>
                  <div className="space-y-4 text-muted-foreground leading-relaxed text-[15px] md:text-base">
                    {section.body}
                  </div>
                </motion.div>
              ))}

              <div className="rounded-2xl border border-black/5 bg-indigo-50/40 p-7 md:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-8">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1.5">Related documents</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Read our Terms of Service for the legal terms of using Citationly, or visit our Security
                      page for details on how we protect your data.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                    <Link
                      href="/terms"
                      className="inline-flex items-center gap-2 h-11 px-5 rounded-full font-medium text-[14px] bg-white border border-black/8 text-foreground hover:bg-black/2.5 transition-colors"
                    >
                      <FileText className="w-4 h-4 text-indigo-500" />
                      Terms of Service
                    </Link>
                    <Link
                      href="/security"
                      className="inline-flex items-center gap-2 h-11 px-5 rounded-full font-medium text-[14px] bg-white border border-black/8 text-foreground hover:bg-black/2.5 transition-colors"
                    >
                      <ShieldCheck className="w-4 h-4 text-indigo-500" />
                      Security
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
