import { Navbar } from "@/components/layouts/Navbar"
import { Footer } from "@/components/layouts/Footer"
import { SmoothScroll } from "@/components/features/landing/primitives/SmoothScroll"
import { Hero } from "@/components/features/landing/Hero"
import { SocialProof } from "@/components/features/landing/SocialProof"
import { HowItWorks } from "@/components/features/landing/HowItWorks"
import { ProductShowcase } from "@/components/features/landing/ProductShowcase"
import { PlatformWall } from "@/components/features/landing/PlatformWall"
import { FeatureShowcase } from "@/components/features/landing/FeatureShowcase"
import { ComparisonSection } from "@/components/features/landing/ComparisonTable"
import { UseCases } from "@/components/features/landing/UseCases"
import { Testimonials } from "@/components/features/landing/Testimonials"
import { Pricing } from "@/components/features/landing/Pricing"
import { FaqSection } from "@/components/features/landing/Faq"
import { FinalCta } from "@/components/features/landing/FinalCta"
import Script from "next/script"

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "name": "Citationly",
        "url": "https://citationly.com",
        "logo": "https://citationly.com/logo.png",
        "sameAs": [
          "https://twitter.com/citationly_hq",
          "https://linkedin.com/company/citationly-hq"
        ]
      },
      {
        "@type": "Product",
        "name": "Citationly AI Visibility Intelligence Platform",
        "description": "Enterprise platform for measuring, monitoring, and improving how AI platforms discover, understand, recommend, and cite your brand.",
        "brand": {
          "@type": "Brand",
          "name": "Citationly"
        },
        "offers": {
          "@type": "Offer",
          "priceCurrency": "USD",
          "price": "299.00"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is AI Visibility Tracking?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "AI Visibility Tracking monitors how often and in what context your brand is cited by major LLMs like ChatGPT, Gemini, and Claude."
            }
          },
          {
            "@type": "Question",
            "name": "How does Generative Engine Optimization (GEO) work?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "GEO involves optimizing your content so that AI engines are more likely to select it as training data and cite it as a source in their generated responses."
            }
          }
        ]
      }
    ]
  }

  return (
    <>
      <Script
        id="schema-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SmoothScroll>
        <main className="min-h-screen relative selection:bg-primary/30">
          <Navbar heroVariant="dark" />
          <Hero />
          <SocialProof />
          <HowItWorks />
          <ProductShowcase />
          <PlatformWall />
          <FeatureShowcase />
          <ComparisonSection />
          <UseCases />
          <Testimonials />
          <Pricing />
          <FaqSection />
          <FinalCta />
          <Footer />
        </main>
      </SmoothScroll>
    </>
  )
}
