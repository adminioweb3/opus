"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useJourneyStore } from "@/lib/stores/journey-store"
import { Sparkles, Search, FileText, Target, Globe, Quote, Lightbulb, AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

const SCAN_STEPS = [
  { id: "analysis", label: "Analyzing website & business...", icon: FileText },
  { id: "competitors", label: "Discovering competitors...", icon: Target },
  { id: "prompts", label: "Generating AI search prompts...", icon: Search },
  { id: "visibility", label: "Checking AI & platform visibility...", icon: Sparkles },
  { id: "citations", label: "Analyzing citation sources...", icon: Quote },
  { id: "personas", label: "Mapping personas & regions...", icon: Globe },
  { id: "recommendations", label: "Generating GEO roadmap & report...", icon: Lightbulb },
]

export default function AnalysisSimulationPage() {
  const router = useRouter()
  const { websiteUrl, setState } = useJourneyStore()
  const [activeStepIndex, setActiveStepIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [hasError, setHasError] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isRetrying, setIsRetrying] = useState(false)

  const runAnalysis = async () => {
    setHasError(false)
    setErrorMessage(null)
    setIsRetrying(false)
    setActiveStepIndex(0)
    setProgress(0)

    try {
      const {
        analyzeOnboardingData,
        analyzeCompetitors,
        analyzeAiSearchPrompts,
        analyzeVisibility,
        analyzePlatformVisibility,
        analyzeCitations,
        analyzePersonas,
        analyzeRegions,
        generateRecommendations,
        generateExecutiveSummary,
        completeOnboarding,
      } = await import("@/lib/api/onboardingApi")
      const storeState = useJourneyStore.getState()
      const orgStore = (await import("@/lib/stores/organizationStore")).useOrganizationStore.getState()

      const orgId = orgStore.organizationId || undefined;

      // STEP 0: Analysis
      setActiveStepIndex(0)
      setProgress(5)

      const finalIndustry = storeState.industry === "Other" && storeState.customIndustry
        ? storeState.customIndustry
        : storeState.industry;

      const result = await analyzeOnboardingData({
        websiteUrl: storeState.websiteUrl,
        businessName: storeState.businessName,
        industry: finalIndustry,
        targetAudience: storeState.targetAudience,
        keywords: storeState.keywords,
        whoDoYouSellTo: storeState.whoDoYouSellTo,
        knownCompetitors: storeState.knownCompetitors,
        mainOffering: storeState.mainOffering
      })
      storeState.setAnalysisResult(result)

      if (orgId) {
        // STEP 1: Competitors
        setActiveStepIndex(1)
        setProgress(20)
        await analyzeCompetitors()

        // STEP 2: Prompts
        setActiveStepIndex(2)
        setProgress(35)
        await analyzeAiSearchPrompts()

        // STEP 3: Visibility & Platforms
        setActiveStepIndex(3)
        setProgress(50)
        await analyzeVisibility()
        setProgress(60)
        await analyzePlatformVisibility()

        // STEP 4: Citations
        setActiveStepIndex(4)
        setProgress(70)
        await analyzeCitations()

        // STEP 5: Personas & Regions
        setActiveStepIndex(5)
        setProgress(80)
        await analyzePersonas()
        setProgress(85)
        await analyzeRegions()

        // STEP 6: Recommendations & Executive Summary
        setActiveStepIndex(6)
        setProgress(90)
        await generateRecommendations()
        setProgress(95)
        await generateExecutiveSummary()

        // BUG FIX: Mark onboarding complete so auth/sync returns needsOnboarding=false
        await completeOnboarding({
          websiteUrl: storeState.websiteUrl,
          businessName: storeState.businessName,
          visibilityScore: 0,
          brandAuthority: 0,
          contentStrength: 0,
          citationScore: 0,
        })
      }

      setProgress(100)

      setTimeout(() => {
        // BUG FIX: Always redirect to dashboard, not /report/:id (which needs pre-loaded data)
        router.push("/dashboard")
        setTimeout(() => {
          storeState.resetJourney()
        }, 1000)
      }, 1000)

    } catch (err: unknown) {
      console.error("Analysis failed", err)
      // BUG FIX: Show a retry UI instead of silently sending user to paywall
      const message = err instanceof Error ? err.message : "An unexpected error occurred."
      setErrorMessage(message)
      setHasError(true)
    }
  }

  useEffect(() => {
    runAnalysis()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (hasError) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-md relative">
          <div className="absolute -inset-10 bg-destructive/10 blur-[100px] rounded-full z-0 pointer-events-none" />
          <div className="relative z-10 glass-card border border-border p-10 rounded-3xl shadow-2xl text-center space-y-6">
            <div className="w-20 h-20 mx-auto bg-destructive/10 rounded-full flex items-center justify-center">
              <AlertCircle className="w-10 h-10 text-destructive" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight mb-2">Analysis Interrupted</h1>
              <p className="text-muted-foreground text-sm">
                Something went wrong while analyzing your website. This is usually a temporary issue.
              </p>
              {errorMessage && (
                <p className="mt-3 text-xs text-muted-foreground font-mono bg-muted/50 rounded-lg p-3 text-left break-all">
                  {errorMessage}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-3">
              <Button
                onClick={() => {
                  setIsRetrying(true)
                  runAnalysis()
                }}
                disabled={isRetrying}
                className="w-full"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isRetrying ? "animate-spin" : ""}`} />
                Try Again
              </Button>
              <Button
                variant="ghost"
                onClick={() => router.push("/dashboard")}
                className="w-full text-muted-foreground"
              >
                Skip & Go to Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-md relative">
        <div className="absolute -inset-10 bg-primary/20 blur-[100px] rounded-full z-0 pointer-events-none" />
        
        <div className="relative z-10 glass-card border border-border p-10 rounded-3xl shadow-2xl text-center space-y-8">
          <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center relative">
            <Sparkles className="w-10 h-10 text-primary animate-pulse" />
            <div className="absolute inset-0 border-2 border-primary/30 rounded-full animate-ping" style={{ animationDuration: '2s' }} />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight mb-2">Analyzing Website</h1>
            <p className="text-muted-foreground font-mono text-sm">{websiteUrl || "your domain"}</p>
          </div>

          <div className="space-y-4 text-left border rounded-xl p-4 bg-muted/30">
            {SCAN_STEPS.map((step, index) => {
              const Icon = step.icon
              const isActive = index === activeStepIndex
              const isPast = index < activeStepIndex
              
              return (
                <div key={step.id} className={`flex items-center gap-3 transition-opacity duration-500 ${isPast ? "opacity-50" : isActive ? "opacity-100 scale-105 transform translate-x-2" : "opacity-30"}`}>
                  <Icon className={`w-4 h-4 ${isActive ? "text-primary animate-spin" : "text-muted-foreground"}`} style={{ animationDuration: isActive && step.id !== "recommendations" ? "3s" : "0s" }} />
                  <span className={`text-sm font-medium ${isActive ? "text-foreground" : "text-muted-foreground"}`}>{step.label}</span>
                  {isPast && <div className="ml-auto w-2 h-2 rounded-full bg-emerald-500" />}
                </div>
              )
            })}
          </div>

          <div>
            <div className="flex justify-between text-sm mb-2 font-medium">
              <span className="text-muted-foreground">Analysis Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
              <div 
                className="bg-primary h-full rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${progress}%` }} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
