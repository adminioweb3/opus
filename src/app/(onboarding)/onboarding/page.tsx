"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useJourneyStore } from "@/lib/stores/journey-store"
import { useOrganizationStore } from "@/lib/stores/organizationStore"
import { startScraping, getScrapeStatus } from "@/lib/api/scraperApi"
import { Check, ChevronRight, ArrowLeft, Globe, Building2, Sparkles, Loader2 } from "lucide-react"

const steps = [
  { id: 1, title: "Website", icon: Globe },
  { id: 2, title: "Business Info", icon: Building2 },
]

export default function JourneyOnboardingPage() {
  const router = useRouter()
  const { 
    websiteUrl, businessName, industry, country, targetAudience, services, products, keywords,
    updateOnboardingData, setState 
  } = useJourneyStore()
  const { organizationId } = useOrganizationStore()
  
  const [currentStep, setCurrentStep] = useState(1)
  const [isScraping, setIsScraping] = useState(false)
  const [scrapeError, setScrapeError] = useState<string | null>(null)
  const [scrapeProgress, setScrapeProgress] = useState(0)

  const goNext = async () => {
    if (currentStep === 1) {
      setScrapeError(null)
      if (organizationId) {
        try {
          setIsScraping(true)
          setScrapeProgress(10)
          const formattedUrl = websiteUrl.startsWith("http") ? websiteUrl : `https://${websiteUrl}`;
          const result = await startScraping({
            organizationId: organizationId,
            url: formattedUrl,
            scrapeType: "Website",
            maxPages: 5
          })
          
          let currentStatus = result.status;
          let attempts = 0;
          while (currentStatus === "Pending" || currentStatus === "Processing") {
             await new Promise(resolve => setTimeout(resolve, 2000));
             attempts++;
             
             setScrapeProgress(Math.min(90, 10 + attempts * 15))
             
             try {
               const statusRes = await getScrapeStatus(result.jobId);
               currentStatus = statusRes.status;
             } catch (e) {
               console.warn("Polling error ignored", e)
             }
             
             if (attempts > 30) {
               throw new Error("Scraping timed out");
             }
          }
          
          if (currentStatus === "Failed") {
             throw new Error("Scraping failed on the server.");
          }
          
          setScrapeProgress(100)
          await new Promise(resolve => setTimeout(resolve, 500));
          setCurrentStep(2)
        } catch (err) {
          console.error("Failed to start scraping", err)
          setScrapeError("Failed to connect to the scraping service or task failed. Please try again.")
        } finally {
          setIsScraping(false)
          setScrapeProgress(0)
        }
      } else {
        setCurrentStep(2)
      }
    } else if (currentStep < 2) {
      setCurrentStep(currentStep + 1)
    }
  }

  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const finish = () => {
    setState("analyzing")
    router.push("/onboarding/analysis")
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar Progress */}
      <div className="hidden lg:flex w-80 border-r bg-card p-8 flex-col">
        <div className="flex items-center gap-2 mb-12">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="font-bold text-primary-foreground text-xl leading-none">O</span>
          </div>
          <span className="font-bold text-xl tracking-tight">CITATIONLY</span>
        </div>

        <nav className="flex-1 space-y-1">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors ${
                step.id === currentStep
                  ? "bg-primary/10 text-primary font-medium"
                  : step.id < currentStep
                  ? "text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0 ${
                step.id < currentStep
                  ? "bg-primary text-primary-foreground"
                  : step.id === currentStep
                  ? "bg-primary/10 text-primary border-2 border-primary"
                  : "bg-muted text-muted-foreground"
              }`}>
                {step.id < currentStep ? <Check className="w-3.5 h-3.5" /> : <step.icon className="w-3.5 h-3.5" />}
              </div>
              {step.title}
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative p-8">
        <div className="absolute top-8 right-8">
          <Button variant="ghost" onClick={() => router.push('/login')} className="text-muted-foreground hover:text-foreground">
            Already have an account? Log in
          </Button>
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="w-full max-w-xl">
          {/* Mobile Progress */}
          {!isScraping && (
            <div className="lg:hidden mb-8">
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                <span>Step {currentStep} of 2</span>
                <span>{Math.round((currentStep / 2) * 100)}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full transition-all duration-300" style={{ width: `${(currentStep / 2) * 100}%` }} />
              </div>
            </div>
          )}

          {isScraping ? (
            <div className="flex flex-col items-center justify-center space-y-8 py-16 animate-in fade-in zoom-in-95 duration-500">
              <div className="relative">
                <div className="w-24 h-24 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Globe className="w-8 h-8 text-primary animate-pulse" />
                </div>
              </div>
              <div className="text-center space-y-3">
                <h3 className="text-3xl font-bold tracking-tight">Scanning Your Website</h3>
                <p className="text-muted-foreground text-lg">We are analyzing your pages to understand your business entity...</p>
              </div>
              <div className="w-full max-w-md bg-muted rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-primary h-full transition-all duration-500 ease-out"
                  style={{ width: `${scrapeProgress}%` }}
                />
              </div>
              <p className="text-sm text-muted-foreground font-medium tracking-wide">{scrapeProgress}% Complete</p>
            </div>
          ) : (
            <>
              {/* Step 1: Website */}
              {currentStep === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <Globe className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Let&apos;s start with your website</h1>
                <p className="mt-3 text-muted-foreground text-lg">Enter your primary domain to initialize your AI SEO workspace.</p>
              </div>
              <div className="space-y-4 pt-4">
                <div>
                  <Label>Website URL</Label>
                  <Input 
                    className="mt-2 text-lg py-6" 
                    placeholder="https://company.com" 
                    value={websiteUrl} 
                    onChange={e => updateOnboardingData({ websiteUrl: e.target.value })} 
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Business Info */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Tell us about your business</h2>
                <p className="mt-2 text-muted-foreground">The more details you provide, the better AI models can understand your brand entity.</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 sm:col-span-1">
                  <Label>Organization Name</Label>
                  <Input className="mt-2" placeholder="Acme Corp" value={businessName} onChange={e => updateOnboardingData({ businessName: e.target.value })} />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <Label>Industry</Label>
                  <Input className="mt-2" placeholder="e.g. B2B SaaS" value={industry} onChange={e => updateOnboardingData({ industry: e.target.value })} />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <Label>Country</Label>
                  <Input className="mt-2" placeholder="e.g. United States" value={country} onChange={e => updateOnboardingData({ country: e.target.value })} />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <Label>Target Audience</Label>
                  <Input className="mt-2" placeholder="e.g. Enterprise IT Managers" value={targetAudience} onChange={e => updateOnboardingData({ targetAudience: e.target.value })} />
                </div>
                <div className="col-span-2">
                  <Label>Core Products / Services</Label>
                  <Textarea className="mt-2" placeholder="What do you sell?" value={products} onChange={e => updateOnboardingData({ products: e.target.value })} />
                </div>
                <div className="col-span-2">
                  <Label>Keywords</Label>
                  <Input className="mt-2" placeholder="Comma separated keywords" value={keywords} onChange={e => updateOnboardingData({ keywords: e.target.value })} />
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex flex-col gap-3 mt-12 pt-6 border-t border-border">
            {scrapeError && (
              <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-sm text-destructive text-center mb-2">
                {scrapeError}
              </div>
            )}
            <div className="flex gap-3">
              {currentStep > 1 && (
                <Button variant="outline" onClick={goBack} className="w-32">
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back
                </Button>
              )}
              <div className="flex-1" />
              {currentStep < 2 ? (
                <Button onClick={goNext} className="w-40" disabled={currentStep === 1 && (!websiteUrl || isScraping)}>
                  {isScraping ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : "Continue"} {!isScraping && <ChevronRight className="w-4 h-4 ml-2" />}
                </Button>
              ) : (
                <Button onClick={finish} className="w-56 bg-blue-600 hover:bg-blue-700 text-white" disabled={!businessName}>
                  Run AI Visibility Analysis <Sparkles className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
            </>
          )}
          </div>
        </div>
      </div>
    </div>
  )
}
