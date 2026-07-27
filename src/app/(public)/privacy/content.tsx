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
    id: "introduction",
    title: "1. Introduction",
    body: (
      <>
        <p>
          This Privacy Policy explains how Citationly (&ldquo;Citationly,&rdquo; &ldquo;we,&rdquo;
          &ldquo;us&rdquo;) collects, uses, shares, and protects personal information when you use
          the Citationly AI visibility platform, visit our website, or communicate with us. We have
          written this policy to be readable. By using our services, you acknowledge the practices
          described here.
        </p>
        <p>
          This policy applies to visitors to our marketing site, registered users of the Citationly
          dashboard, and the organizations (&ldquo;Customers&rdquo;) that subscribe to Citationly on
          behalf of their teams. If you are a Customer, your organization&apos;s administrator
          controls certain workspace settings, such as team membership and integrations, as
          described in your organization&apos;s agreement with us.
        </p>
      </>
    ),
  },
  {
    id: "information-we-collect",
    title: "2. Information we collect",
    body: (
      <>
        <p>
          <span className="font-medium text-foreground">Information you provide.</span> This
          includes:
        </p>
        <ul className="list-disc pl-5 space-y-3 marker:text-indigo-400">
          <li>
            <span className="font-medium text-foreground">Account information.</span> When you sign
            in with Google, we receive your name, email address, and profile picture from Google.
            We do not receive your Google password, and we request only the minimum scopes needed
            to authenticate you.
          </li>
          <li>
            <span className="font-medium text-foreground">Billing information.</span> If you
            subscribe to a paid plan, our payment processor collects your billing details, such as
            payment method and billing address, to process the transaction. Citationly does not
            store full payment card numbers.
          </li>
          <li>
            <span className="font-medium text-foreground">Platform configuration.</span> The
            brands, competitors, topics, and questions you set up for monitoring, along with any
            content or documents you upload for analysis.
          </li>
          <li>
            <span className="font-medium text-foreground">Communications.</span> Messages you send
            us through the contact form, support requests, or email, including their content and
            any attachments.
          </li>
        </ul>
        <p>
          <span className="font-medium text-foreground">Information collected automatically.</span>{" "}
          This includes:
        </p>
        <ul className="list-disc pl-5 space-y-3 marker:text-indigo-400">
          <li>
            <span className="font-medium text-foreground">Usage data.</span> Which features you
            use, pages you visit, and how you interact with the platform.
          </li>
          <li>
            <span className="font-medium text-foreground">Device and connection data.</span> Your
            IP address, browser and device type, and similar technical identifiers, collected
            automatically when you use the Service.
          </li>
          <li>
            <span className="font-medium text-foreground">Cookies.</span> Data collected through
            cookies and similar technologies, described in the Cookies section below.
          </li>
        </ul>
        <p>
          <span className="font-medium text-foreground">Information from platform monitoring.</span>{" "}
          The core function of the platform is querying public AI engines and analyzing their
          answers. This monitoring data consists of AI-generated responses about brands, products,
          and topics. It is business information rather than personal information in most cases,
          but where an AI answer happens to mention an individual, for example a company executive,
          that mention is stored as part of the collected answer.
        </p>
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
          <li>
            <span className="font-medium text-foreground">Provide the service.</span> Run the
            monitoring, analysis, and reporting that power the platform, including querying AI
            engines and generating your visibility results.
          </li>
          <li>
            <span className="font-medium text-foreground">Support you.</span> Respond to support
            requests, troubleshoot issues, and help you get value from your account.
          </li>
          <li>
            <span className="font-medium text-foreground">Improve the platform.</span> Understand
            how the platform is used so we can fix problems, refine features, and build what
            customers need next.
          </li>
          <li>
            <span className="font-medium text-foreground">Communicate.</span> Send you
            transactional and account communications, such as scan alerts, weekly digests, and
            billing notices, plus product updates if you have opted in to receive them.
          </li>
          <li>
            <span className="font-medium text-foreground">Protect the service.</span> Detect,
            investigate, and prevent fraud, abuse, unauthorized access, and violations of our Terms
            of Service.
          </li>
          <li>
            <span className="font-medium text-foreground">Meet legal obligations.</span> Comply
            with applicable law, respond to lawful requests, and enforce our agreements.
          </li>
        </ul>
        <p>We do not sell personal information, and we never will.</p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "4. Cookies and similar technologies",
    body: (
      <>
        <ul className="list-disc pl-5 space-y-2.5 marker:text-indigo-400">
          <li>
            <span className="font-medium text-foreground">Essential cookies.</span> Required for
            the platform to function, such as keeping you signed in and maintaining security.
          </li>
          <li>
            <span className="font-medium text-foreground">Preference cookies.</span> Remember
            settings and choices so you do not have to re-enter them on each visit.
          </li>
          <li>
            <span className="font-medium text-foreground">Analytics cookies.</span> Help us
            understand how the platform is used in aggregate, so we can improve it.
          </li>
          <li>
            <span className="font-medium text-foreground">Marketing cookies.</span> Used on our
            marketing site to measure the effectiveness of campaigns.
          </li>
        </ul>
        <p>You can control non-essential cookies through your browser settings.</p>
      </>
    ),
  },
  {
    id: "ai-processing",
    title: "5. AI processing",
    body: (
      <p>
        Because Citationly is a platform for measuring AI systems, we want to be explicit about our
        own use of AI. The platform uses automated and AI-assisted processing to extract mentions,
        citations, sentiment, and topics from collected AI engine answers. Customer data, including
        your account information, brand configurations, and monitoring results, is not used to
        train AI models, whether our own or third parties&apos;. Where third-party AI services are
        used in processing, they act as service providers under contractual restrictions.
      </p>
    ),
  },
  {
    id: "third-party-services",
    title: "6. Third-party services",
    body: (
      <p>
        We share personal information only with service providers that help us operate:
        infrastructure and hosting providers, payment processors, communication tools, analytics
        providers, and AI service providers used in answer processing. Each provider is bound by
        contractual obligations covering confidentiality and data protection. We may also disclose
        information if required by law, to enforce our agreements, or to protect the rights,
        property, or safety of Citationly, our customers, or the public.
      </p>
    ),
  },
  {
    id: "data-retention",
    title: "7. Data retention",
    body: (
      <ul className="list-disc pl-5 space-y-2.5 marker:text-indigo-400">
        <li>
          <span className="font-medium text-foreground">Account and configuration data.</span>{" "}
          Retained for as long as your account is active, so your workspace and monitoring setup
          remain intact.
        </li>
        <li>
          <span className="font-medium text-foreground">Monitoring history.</span> Retained for the
          life of the account, since historical trends are central to the value of the platform. If
          you close your account or request deletion, we delete your personal data and associated
          monitoring data from production systems within 30 days.
        </li>
        <li>
          <span className="font-medium text-foreground">Billing records.</span> Retained for as
          long as required to meet tax, accounting, and legal obligations, even after an account
          closes.
        </li>
        <li>
          <span className="font-medium text-foreground">Support communications.</span> Retained for
          a limited period after resolution, so we can handle follow-up questions and improve
          support quality.
        </li>
        <li>
          <span className="font-medium text-foreground">Backups.</span> Deleted data is removed
          from backups on their normal rotation schedule, shortly after the production deletion
          window closes.
        </li>
      </ul>
    ),
  },
  {
    id: "your-rights",
    title: "8. Your rights",
    body: (
      <>
        <p>
          Depending on where you live, you may have rights under laws such as the GDPR (European
          Economic Area and UK) or the CCPA (California) with respect to your personal information,
          including the right to:
        </p>
        <ul className="list-disc pl-5 space-y-2.5 marker:text-indigo-400">
          <li>
            <span className="font-medium text-foreground">Access.</span> Request access to the
            personal information we hold about you.
          </li>
          <li>
            <span className="font-medium text-foreground">Correction.</span> Ask us to correct
            inaccurate or incomplete information.
          </li>
          <li>
            <span className="font-medium text-foreground">Deletion.</span> Request deletion of your
            personal information, subject to the retention terms in Section 7.
          </li>
          <li>
            <span className="font-medium text-foreground">Portability.</span> Export your data in a
            portable format, including monitoring history and reports.
          </li>
          <li>
            <span className="font-medium text-foreground">Objection and restriction.</span> Object
            to, or request that we restrict, certain processing of your information.
          </li>
          <li>
            <span className="font-medium text-foreground">Consent withdrawal.</span> Withdraw
            consent at any time where we rely on consent to process your information.
          </li>
          <li>
            <span className="font-medium text-foreground">Complaint.</span> Lodge a complaint with
            your local data protection authority if you believe we have not handled your
            information properly.
          </li>
        </ul>
        <p>
          To exercise any of these rights, email{" "}
          <a href="mailto:privacy@citationly.io" className="text-indigo-600 font-medium hover:underline">
            privacy@citationly.io
          </a>
          . We will respond within the timeframe required by applicable law, and we will never
          charge a fee to process a valid request.
        </p>
      </>
    ),
  },
  {
    id: "international-transfers",
    title: "9. International data transfers",
    body: (
      <p>
        Citationly operates internationally, and your information may be processed in countries
        other than your own, including the United States. Where personal information is
        transferred across borders, we rely on recognized safeguards, such as Standard Contractual
        Clauses, to protect it.
      </p>
    ),
  },
  {
    id: "children",
    title: "10. Children",
    body: (
      <p>
        The Citationly platform is a business tool intended for professional use. It is not
        directed at children, and we do not knowingly collect personal information from anyone
        under 18. If you believe a child has provided us with personal information, please contact
        us at{" "}
        <a href="mailto:privacy@citationly.io" className="text-indigo-600 font-medium hover:underline">
          privacy@citationly.io
        </a>{" "}
        and we will delete it promptly.
      </p>
    ),
  },
  {
    id: "security",
    title: "11. Security",
    body: (
      <p>
        We protect personal information using the technical and organizational measures described
        on our{" "}
        <Link href="/security" className="text-indigo-600 font-medium hover:underline">
          Security page
        </Link>
        , including encryption in transit and at rest, access controls, and tenant isolation. No
        system is completely secure, but we design and audit the Service to meet the standard our
        customers depend on.
      </p>
    ),
  },
  {
    id: "changes",
    title: "12. Changes to this policy",
    body: (
      <p>
        We may update this policy as our practices or legal requirements change. Material changes
        will be communicated through the platform or by email before they take effect. The
        &ldquo;Last updated&rdquo; date at the top of this page always reflects the most recent
        version.
      </p>
    ),
  },
  {
    id: "contact",
    title: "13. Contact us",
    body: (
      <p>
        Questions about this policy or how we handle your data? Contact our privacy team at{" "}
        <a href="mailto:privacy@citationly.io" className="text-indigo-600 font-medium hover:underline">
          privacy@citationly.io
        </a>
        , or reach out through our{" "}
        <Link href="/contact" className="text-indigo-600 font-medium hover:underline">
          contact page
        </Link>
        .
      </p>
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
