"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useJourneyStore } from "@/lib/stores/journey-store"
import { Sparkles, Search, FileText, Target, Globe, Quote, Lightbulb } from "lucide-react"

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

    useEffect(() => {
      // Call real API
      const runAnalysis = async () => {
        try {
          const { analyzeOnboardingData, analyzeCompetitors, analyzeAiSearchPrompts, analyzeVisibility, analyzePlatformVisibility, analyzeCitations, analyzePersonas, analyzeRegions, generateRecommendations, generateExecutiveSummary } = await import("@/lib/api/onboardingApi")
          const storeState = useJourneyStore.getState()
          const orgStore = (await import("@/lib/stores/organizationStore")).useOrganizationStore.getState()
          
          const orgId = orgStore.organizationId || undefined;

          // STEP 0: Analysis
          setActiveStepIndex(0)
          setProgress(5)
          const result = await analyzeOnboardingData({
            organizationId: orgId,
            websiteUrl: storeState.websiteUrl,
            businessName: storeState.businessName,
            industry: storeState.industry,
            targetAudience: storeState.targetAudience,
            keywords: storeState.keywords
          })
          storeState.setAnalysisResult(result)

          if (orgId) {
            // STEP 1: Competitors
            setActiveStepIndex(1)
            setProgress(20)
            await analyzeCompetitors({ organizationId: orgId })
            
            // STEP 2: Prompts
            setActiveStepIndex(2)
            setProgress(35)
            await analyzeAiSearchPrompts({ organizationId: orgId })

            // STEP 3: Visibility & Platforms
            setActiveStepIndex(3)
            setProgress(50)
            await analyzeVisibility({ organizationId: orgId })
            setProgress(60)
            await analyzePlatformVisibility({ organizationId: orgId })

            // STEP 4: Citations
            setActiveStepIndex(4)
            setProgress(70)
            await analyzeCitations({ organizationId: orgId })

            // STEP 5: Personas & Regions
            setActiveStepIndex(5)
            setProgress(80)
            await analyzePersonas({ organizationId: orgId })
            setProgress(85)
            await analyzeRegions({ organizationId: orgId })

            // STEP 6: Recommendations & Executive Summary
            setActiveStepIndex(6)
            setProgress(90)
            await generateRecommendations({ organizationId: orgId })
            setProgress(95)
            await generateExecutiveSummary({ organizationId: orgId })
          }
          
          setProgress(100)
          
          setTimeout(() => {
            router.push(`/report/${orgId}`)
          }, 1000)

        } catch (err) {
          console.error("Analysis failed", err)
          setState("paywall")
        }
      }

      runAnalysis()

  }, [router, setState])

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
