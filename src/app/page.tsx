import { Navbar } from "@/components/layouts/Navbar"
import { Footer } from "@/components/layouts/Footer"
import { Hero } from "@/components/features/landing/Hero"
import { HowItWorks } from "@/components/features/landing/HowItWorks"
import { ProductShowcase } from "@/components/features/landing/ProductShowcase"
import { EnterpriseSecurity } from "@/components/features/landing/EnterpriseSecurity"
import { 
  TrustedCompanies, 
  Statistics, 
  AiMonitoring, 
  CompetitiveIntelligence, 
  Faq, 
  CtaBanner 
} from "@/components/features/landing/LandingSections"
import { 
  BrandTracking, 
  CitationTracking, 
  ShareOfVoice, 
  PlatformComparison, 
  UseCases 
} from "@/components/features/landing/LandingSections2"
import { Pricing } from "@/components/features/landing/Pricing"
import { Testimonials } from "@/components/features/landing/Testimonials"
import Script from "next/script"

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "name": "CITATIONLY",
        "url": "https://citationly.com",
        "logo": "https://citationly.com/logo.png",
        "sameAs": [
          "https://twitter.com/citationly_hq",
          "https://linkedin.com/company/citationly-hq"
        ]
      },
      {
        "@type": "Product",
        "name": "CITATIONLY AI Visibility Tracker",
        "description": "Enterprise platform for AI Search Optimization, ChatGPT SEO, and Share of Voice monitoring.",
        "brand": {
          "@type": "Brand",
          "name": "CITATIONLY"
        },
        "offers": {
          "@type": "Offer",
          "priceCurrency": "USD",
          "price": "999.00"
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
      <main className="min-h-screen bg-background relative selection:bg-primary/30">
        <Navbar />
        <Hero />
        <TrustedCompanies />
        <HowItWorks />
        <ProductShowcase />
        <Statistics />
        <AiMonitoring />
        <BrandTracking />
        <CitationTracking />
        <EnterpriseSecurity />
        <CompetitiveIntelligence />
        <ShareOfVoice />
        <PlatformComparison />
        <UseCases />
        <Testimonials />
        <Pricing />
        <Faq />
        <CtaBanner />
        <Footer />
      </main>
    </>
  )
}
